import { NextRequest, NextResponse } from "next/server";
import { cleanOCRText } from "@/lib/ocr-cleaner";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const REQUEST_TIMEOUT = 30000; // 30 seconds

interface OCRApiResponse {
  msg: string;
  status: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided", status: false },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Unsupported file type: ${file.type}. Only JPG, PNG, and PDF are allowed.`,
          status: false,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds 10MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`,
          status: false,
        },
        { status: 400 }
      );
    }

    // Check for required environment variables
    const apiUrl = process.env.OCR_API_URL;
    const apiUsername = process.env.OCR_API_USERNAME;
    const apiSecretKey = process.env.OCR_API_SECRET_KEY;

    if (!apiUrl || !apiUsername || !apiSecretKey) {
      console.error("Missing OCR API configuration");
      return NextResponse.json(
        {
          error: "OCR service is not configured properly",
          status: false,
        },
        { status: 500 }
      );
    }

    // Create FormData for the external API
    const externalFormData = new FormData();
    externalFormData.append("file", file);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      // Forward request to EBC OCR API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-Username": apiUsername,
          "X-Secret-Key": apiSecretKey,
        },
        body: externalFormData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = "OCR service returned an error";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorData.msg || errorMessage;
          console.error(`OCR API error (${response.status}):`, errorData);
        } catch (e) {
          const errorText = await response.text();
          console.error(`OCR API returned status ${response.status}:`, errorText);
          if (errorText) errorMessage = errorText;
        }

        return NextResponse.json(
          {
            error: errorMessage,
            status: false,
          },
          { status: response.status }
        );
      }

      const data: OCRApiResponse = await response.json();

      // Validate response structure
      if (typeof data.status === "undefined" || typeof data.msg === "undefined") {
        console.error("Invalid OCR API response structure", data);
        return NextResponse.json(
          {
            error: "Invalid response from OCR service",
            status: false,
          },
          { status: 500 }
        );
      }

      // Return the OCR result
      return NextResponse.json({
        text: cleanOCRText(data.msg),
        status: data.status,
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          {
            error: "OCR request timed out. Please try again.",
            status: false,
          },
          { status: 504 }
        );
      }

      console.error("OCR API request failed:", fetchError);
      return NextResponse.json(
        {
          error: "Failed to connect to OCR service",
          status: false,
        },
        { status: 503 }
      );
    }
  } catch (error: unknown) {
    console.error("OCR endpoint error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unexpected error occurred",
        status: false,
      },
      { status: 500 }
    );
  }
}

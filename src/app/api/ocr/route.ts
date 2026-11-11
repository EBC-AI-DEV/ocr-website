import { NextRequest, NextResponse } from "next/server";
import { cleanOCRText } from "@/lib/ocr-cleaner";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const REQUEST_TIMEOUT = 30000; // 30 seconds

interface OCRApiResponse {
  msg?: string;
  text?: string;
  status?: boolean;
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

    if (!apiUrl) {
      console.error("Missing OCR API configuration: OCR_API_URL is not set");
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
    externalFormData.append("file", file, file.name);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      // Build request headers (auth headers are optional)
      const headers: Record<string, string> = {
        accept: "*/*",
      };
      if (apiUsername) {
        headers["X-Username"] = apiUsername;
      }
      if (apiSecretKey) {
        headers["X-Secret-Key"] = apiSecretKey;
      }

      // Check for optional mode parameter
      const mode =
        (formData.get("mode") as string | null) ||
        request.nextUrl.searchParams.get("mode");

      let endpointUrl = apiUrl;
      if (mode) {
        try {
          const parsedUrl = new URL(apiUrl);
          parsedUrl.searchParams.set("mode", mode);
          endpointUrl = parsedUrl.toString();
        } catch {
          endpointUrl = apiUrl;
        }
      }

      // Forward request to OCR API
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers,
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
          console.error(`OCR API returned status ${response.status}:`, errorText, e);
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

      const contentType = response.headers.get("content-type") || "";
      if (mode === "events" || contentType.includes("ndjson") || contentType.includes("event-stream")) {
        return new Response(response.body, {
          status: response.status,
          headers: {
            "Content-Type": contentType || "application/x-ndjson",
            "Cache-Control": "no-cache",
            "Transfer-Encoding": "chunked",
          },
        });
      }

      const data: OCRApiResponse = await response.json();

      const rawText = data.msg ?? data.text ?? "";
      const isSuccess = typeof data.status === "boolean" ? data.status : true;

      // Validate response structure
      if (typeof data.status === "undefined" && typeof data.msg === "undefined" && typeof data.text === "undefined") {
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
        text: cleanOCRText(rawText),
        status: isSuccess,
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

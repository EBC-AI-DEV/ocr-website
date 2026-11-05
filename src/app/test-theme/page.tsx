"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/Button";

export default function DesignSystemPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)" }}>
      {/* Header */}
      <header style={{
        position: "sticky",
        top: 0,
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 50,
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, margin: 0 }}>
          Design System Showcase
        </h1>
        <button
          onClick={toggleTheme}
          className="button button-secondary"
          style={{ minHeight: "40px", padding: "0 16px", fontSize: "14px" }}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Typography Section */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "24px",
            color: "var(--ink)"
          }}>
            Typography
          </h2>

          <div style={{
            background: "var(--surface)",
            padding: "32px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            marginBottom: "24px"
          }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px", color: "var(--blue)" }}>
              FONT FAMILIES
            </h3>

            <div style={{ display: "grid", gap: "20px" }}>
              <div>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "8px" }}>
                  Kantumruy Pro (Khmer Primary)
                </p>
                <p className="khmer" style={{ fontSize: "24px", fontWeight: 600 }}>
                  ការវាយអក្សរខ្មែរ - Khmer Typing
                </p>
              </div>

              <div>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "8px" }}>
                  Inter (Latin & Numbers)
                </p>
                <p className="latin" style={{ fontSize: "24px", fontWeight: 600 }}>
                  The quick brown fox jumps - 0123456789
                </p>
              </div>

              <div>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "8px" }}>
                  Moul (Display Decorative)
                </p>
                <p className="khmer-display" style={{ fontSize: "32px" }}>
                  ខ្មែរីស្ម
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: "var(--surface)",
            padding: "32px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px", color: "var(--blue)" }}>
              HEADING SCALES
            </h3>

            <div style={{ display: "grid", gap: "16px" }}>
              <h1 style={{ fontSize: "48px", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                Heading 1 - Hero Title
              </h1>
              <h2 style={{ fontSize: "32px", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                Heading 2 - Section Title
              </h2>
              <h3 style={{ fontSize: "24px", fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                Heading 3 - Subsection
              </h3>
              <p style={{ fontSize: "16px", lineHeight: 1.7, margin: 0, color: "var(--muted)" }}>
                Body text with proper line height for readability. This is the standard paragraph text used throughout the application.
              </p>
            </div>
          </div>
        </section>

        {/* Color Tokens Section */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "24px",
            color: "var(--ink)"
          }}>
            Color Tokens
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {/* Brand Colors */}
            <div style={{
              background: "var(--surface)",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--border)"
            }}>
              <h4 style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", color: "var(--muted)" }}>
                BRAND COLORS
              </h4>
              <div style={{ display: "grid", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--blue)",
                    borderRadius: "8px"
                  }} />
                  <span style={{ fontSize: "14px" }}>--blue</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--blue-dark)",
                    borderRadius: "8px"
                  }} />
                  <span style={{ fontSize: "14px" }}>--blue-dark</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--blue-soft)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)"
                  }} />
                  <span style={{ fontSize: "14px" }}>--blue-soft</span>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div style={{
              background: "var(--surface)",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--border)"
            }}>
              <h4 style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", color: "var(--muted)" }}>
                STATUS COLORS
              </h4>
              <div style={{ display: "grid", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--green)",
                    borderRadius: "8px"
                  }} />
                  <span style={{ fontSize: "14px" }}>--green (success)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--red)",
                    borderRadius: "8px"
                  }} />
                  <span style={{ fontSize: "14px" }}>--red (error)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--gold)",
                    borderRadius: "8px"
                  }} />
                  <span style={{ fontSize: "14px" }}>--gold (warning)</span>
                </div>
              </div>
            </div>

            {/* Surface Colors */}
            <div style={{
              background: "var(--surface)",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--border)"
            }}>
              <h4 style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", color: "var(--muted)" }}>
                SURFACES
              </h4>
              <div style={{ display: "grid", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--bg)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)"
                  }} />
                  <span style={{ fontSize: "14px" }}>--bg</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--surface)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)"
                  }} />
                  <span style={{ fontSize: "14px" }}>--surface</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--surface-2)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)"
                  }} />
                  <span style={{ fontSize: "14px" }}>--surface-2</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "24px",
            color: "var(--ink)"
          }}>
            Buttons
          </h2>

          <div style={{
            background: "var(--surface)",
            padding: "32px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)"
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>

            <div style={{
              padding: "20px",
              background: "var(--blue-soft)",
              borderRadius: "12px",
              border: "1px solid var(--blue)",
              marginTop: "24px"
            }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--blue)", margin: 0 }}>
                ⚠️ Critical Design Constraint: Primary button ALWAYS uses <code style={{
                  background: "var(--surface)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontFamily: "monospace"
                }}>#1a75bb</code> background in both light and dark modes for proper contrast with white text.
              </p>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "24px",
            color: "var(--ink)"
          }}>
            Component Examples
          </h2>

          <div style={{ display: "grid", gap: "24px" }}>
            {/* Card */}
            <div style={{
              background: "var(--surface)",
              padding: "32px",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)"
            }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                Card Component
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                This is a standard card using surface background, border, and shadow tokens. It responds to theme changes automatically.
              </p>
            </div>

            {/* Alert - Success */}
            <div style={{
              background: "var(--green-soft)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid var(--green)",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}>
              <div style={{
                width: "24px",
                height: "24px",
                background: "var(--green)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                flexShrink: 0
              }}>✓</div>
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--green)", margin: "0 0 4px 0" }}>
                  Success Message
                </h4>
                <p style={{ fontSize: "13px", color: "var(--green)", margin: 0 }}>
                  Your operation completed successfully.
                </p>
              </div>
            </div>

            {/* Alert - Error */}
            <div style={{
              background: "var(--red-soft)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid var(--red)",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}>
              <div style={{
                width: "24px",
                height: "24px",
                background: "var(--red)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                flexShrink: 0
              }}>!</div>
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--red)", margin: "0 0 4px 0" }}>
                  Error Message
                </h4>
                <p style={{ fontSize: "13px", color: "var(--red)", margin: 0 }}>
                  Something went wrong. Please try again.
                </p>
              </div>
            </div>

            {/* Badge Examples */}
            <div style={{
              background: "var(--surface)",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--border)"
            }}>
              <h4 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>
                Status Badges
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <span style={{
                  padding: "6px 12px",
                  background: "var(--green-soft)",
                  color: "var(--green)",
                  border: "1px solid var(--green)",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 700
                }}>
                  Active
                </span>
                <span style={{
                  padding: "6px 12px",
                  background: "var(--blue-soft)",
                  color: "var(--blue)",
                  border: "1px solid var(--blue)",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 700
                }}>
                  Processing
                </span>
                <span style={{
                  padding: "6px 12px",
                  background: "var(--gold-soft)",
                  color: "var(--gold)",
                  border: "1px solid var(--gold)",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 700
                }}>
                  Warning
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Khmer Typography Showcase */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "24px",
            color: "var(--ink)"
          }}>
            ការបង្ហាញអក្សរខ្មែរ (Khmer Typography)
          </h2>

          <div style={{
            background: "var(--surface)",
            padding: "32px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)"
          }}>
            <h3 className="khmer-heading" style={{
              fontSize: "28px",
              fontWeight: 700,
              marginBottom: "16px",
              lineHeight: 1.6
            }}>
              ប្រព័ន្ធស្កេន OCR ភាសាខ្មែរ
            </h3>
            <p className="khmer-body" style={{
              fontSize: "16px",
              color: "var(--muted)",
              lineHeight: 1.8,
              marginBottom: "24px"
            }}>
              វាយបញ្ចូលអត្ថបទខ្មែរដោយស្វ័យប្រវត្តិពីរូបភាព។ ប្រព័ន្ធនេះអាចស្គាល់អក្សរខ្មែរបានត្រឹមត្រូវ និងរក្សាទម្រង់ដើមឱ្យបានល្អបំផុត។
            </p>

            <div style={{
              padding: "20px",
              background: "var(--blue-soft)",
              borderRadius: "12px",
              marginTop: "16px"
            }}>
              <p style={{ fontSize: "13px", color: "var(--blue)", margin: 0, lineHeight: 1.7 }}>
                💡 Khmer text uses line-height: 1.6-1.8 to prevent subscripts (ជើង) and upper vowels (ស្រៈលើ) from overlapping.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

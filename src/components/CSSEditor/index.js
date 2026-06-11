import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-markup"; // ไฮไลท์สำหรับ HTML
import "prismjs/components/prism-css"; // ไฮไลท์สำหรับ CSS
import "prismjs/themes/prism-okaidia.css";

export default function CSSEditor({ defaultHTML = "", defaultCSS = "" }) {
    const [html, setHtml] = useState(defaultHTML);
    const [css, setCss] = useState(defaultCSS);

    // ผสานโค้ดเพื่อส่งให้ iFrame แสดงผล
    const srcDoc = `
    <html>
      <head>
        <style>
          body { margin: 0; padding: 20px; font-family: sans-serif; background: #23272a; color: #fff; }
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

    return (
        // แก้ไขใน src/components/CSSEditor/index.js
        <div
            style={{
                display: "flex",
                border: "2px solid #444",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#2d2d2d",

                /* 🛠️ เปลี่ยนจาก 600px เป็น 75vh หรือ 80vh (Viewport Height) เพื่อยืดลงล่างตามขนาดหน้าจอ */
                height: "75vh",

                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
        >
            {/* คอลัมน์ที่ 1: HTML Editor */}
            <div
                style={{
                    flex: 1,
                    borderRight: "2px solid #444",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <strong
                    style={{
                        color: "#61dafb",
                        marginBottom: "8px",
                        fontSize: "14px",
                    }}
                >
                    📄 HTML Editor
                </strong>
                <div
                    style={{
                        flex: 1,
                        overflow: "auto",
                        backgroundColor: "#2d2d2d",
                        borderRadius: "4px",
                        border: "1px solid #555",
                    }}
                >
                    <Editor
                        value={html}
                        onValueChange={(code) => setHtml(code)}
                        highlight={(code) =>
                            Prism.highlight(
                                code,
                                Prism.languages.markup,
                                "html",
                            )
                        }
                        padding={15}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                            minHeight: "100%",
                        }}
                    />
                </div>
            </div>

            {/* คอลัมน์ที่ 2: CSS Editor */}
            <div
                style={{
                    flex: 1,
                    borderRight: "2px solid #444",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <strong
                    style={{
                        color: "#ffb74d",
                        marginBottom: "8px",
                        fontSize: "14px",
                    }}
                >
                    🎨 CSS Editor
                </strong>
                <div
                    style={{
                        flex: 1,
                        overflow: "auto",
                        backgroundColor: "#2d2d2d",
                        borderRadius: "4px",
                        border: "1px solid #555",
                    }}
                >
                    <Editor
                        value={css}
                        onValueChange={(code) => setCss(code)}
                        highlight={(code) =>
                            Prism.highlight(code, Prism.languages.css, "css")
                        }
                        padding={15}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                            minHeight: "100%",
                        }}
                    />
                </div>
            </div>

            {/* คอลัมน์ที่ 3: Live Result Preview */}
            <div
                style={{
                    flex: 1,
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <strong
                    style={{
                        color: "#4caf50",
                        marginBottom: "8px",
                        fontSize: "14px",
                    }}
                >
                    💻 Live Result
                </strong>
                <iframe
                    srcDoc={srcDoc}
                    title="W3Schools-like Preview"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    style={{
                        backgroundColor: "#23272a",
                        flex: 1,
                        borderRadius: "4px",
                        border: "1px solid #555",
                        width: "100%",
                    }}
                />
            </div>
        </div>
    );
}

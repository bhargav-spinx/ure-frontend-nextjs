"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 16px",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <h1>Application error</h1>
            <p>A critical error occurred. Please try again.</p>
            <button onClick={reset} style={{ marginTop: 24 }}>
              Try again
            </button>
            {error.digest && <p style={{ marginTop: 24, opacity: 0.6 }}>Reference: {error.digest}</p>}
          </div>
        </section>
      </body>
    </html>
  );
}

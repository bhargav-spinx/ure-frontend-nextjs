"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error("[error.tsx]", error);
  }, [error]);

  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 16px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <h1>Something went wrong</h1>
        <p>We hit an unexpected error loading this page.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
          <button onClick={reset}>Try again</button>
          <Link href="/">Go home</Link>
        </div>
        {error.digest && <p style={{ marginTop: 24, opacity: 0.6 }}>Reference: {error.digest}</p>}
      </div>
    </section>
  );
}

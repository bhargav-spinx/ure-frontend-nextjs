import Link from "next/link";

export default function NotFound() {
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
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" style={{ display: "inline-block", marginTop: 24 }}>
          Go home
        </Link>
      </div>
    </section>
  );
}

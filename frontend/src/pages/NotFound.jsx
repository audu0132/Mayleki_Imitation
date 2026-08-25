import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [floatY, setFloatY] = useState(0);

  // Floating animation for the 404 number
  useEffect(() => {
    let frame;
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 1000;
      setFloatY(Math.sin(elapsed * 1.5) * 12);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={styles.container}>
      {/* Background glow blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Floating 404 */}
        <div
          style={{
            ...styles.errorCode,
            transform: `translateY(${floatY}px)`,
          }}
        >
          404
        </div>

        {/* Divider line */}
        <div style={styles.divider} />

        {/* Message */}
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.subtitle}>
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div style={styles.buttonGroup}>
          <Link to="/" style={styles.primaryBtn}>
            🏠 Back to Home
          </Link>
          <Link to="/products" style={styles.secondaryBtn}>
            🛍️ Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    top: "-120px",
    left: "-120px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    bottom: "-120px",
    right: "-120px",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "60px 48px",
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
    maxWidth: "520px",
    width: "90%",
  },
  errorCode: {
    fontSize: "clamp(80px, 15vw, 130px)",
    fontWeight: "900",
    background: "linear-gradient(135deg, #a855f7, #6366f1, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1,
    letterSpacing: "-4px",
    marginBottom: "20px",
    display: "inline-block",
  },
  divider: {
    height: "2px",
    background: "linear-gradient(to right, transparent, rgba(168,85,247,0.6), transparent)",
    margin: "0 auto 28px",
    width: "60%",
    borderRadius: "2px",
  },
  title: {
    fontSize: "clamp(20px, 4vw, 28px)",
    fontWeight: "700",
    color: "#f1f5f9",
    margin: "0 0 14px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "15px",
    color: "rgba(200,210,230,0.75)",
    lineHeight: "1.7",
    margin: "0 0 36px",
    maxWidth: "380px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonGroup: {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "inline-block",
    padding: "12px 28px",
    background: "linear-gradient(135deg, #a855f7, #6366f1)",
    color: "#fff",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "15px",
    textDecoration: "none",
    boxShadow: "0 4px 20px rgba(168,85,247,0.4)",
  },
  secondaryBtn: {
    display: "inline-block",
    padding: "12px 28px",
    background: "rgba(255,255,255,0.07)",
    color: "#e2e8f0",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "15px",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
  },
};

export default NotFound;

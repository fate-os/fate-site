"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f6f6f6",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row", // Default to column for smaller screens
          maxWidth: "1000px",
          width: "90%", // Ensure it scales on smaller screens
          backgroundColor: "white",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "30px",
            color: "#333",
            lineHeight: "1.8",
          }}
        >
          <h2 style={{ color: "#b30059" }}>谶曰：</h2>
          <p>无城无府 无尔无我</p>
          <p>天下一家 治臻大化</p>
          <h2 style={{ color: "#b30059", marginTop: "2rem" }}>颂曰：</h2>
          <p>一人为大 世界之福</p>
          <p>手执签筒 拔去竹木</p>
          <p>红黄黑白 不分上下</p>
          <p>东南西北 尽和为一</p>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/tbt59.jpg"
            alt="推背图第59像"
            style={{
              maxWidth: "100%",
              height: "auto",
              padding: "20px",
            }}
            width={400}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}

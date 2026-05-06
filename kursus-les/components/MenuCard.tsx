import Link from "next/link";

type MenuCardProps = {
  title: string;
  link: string;
  icon: string;
};

export default function MenuCard({ title, link, icon }: MenuCardProps) {
  return (
    <Link href={link} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "28px" }}>{icon}</span>
        <h3 style={{ margin: 0, color: "#4c1d95" }}>{title}</h3>
      </div>
    </Link>
  );
}
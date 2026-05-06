"use client";
import Link from "next/link";

export default function MenuCard({
  title,
  link,
  icon,
}: {
  title: string;
  link: string;
  icon: string;
}) {
  return (
    <Link href={link} className="card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
    </Link>
  );
}
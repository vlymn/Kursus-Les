import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Siswa | Kursus Les",
  description: "Data siswa yang mengikuti kursus",
};

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
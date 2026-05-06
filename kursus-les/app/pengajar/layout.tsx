import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Pengajar | Kursus Les",
  description: "Manajemen data pengajar",
};

export default function PengajarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
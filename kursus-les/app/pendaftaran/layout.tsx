import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Siswa | Kursus Les",
  description: "Pendaftaran siswa ke kursus",
};

export default function PendaftaranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
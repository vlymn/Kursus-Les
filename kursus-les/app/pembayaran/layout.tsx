import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pembayaran | Kursus Les",
  description: "Pembayaran kursus siswa",
};

export default function PembayaranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
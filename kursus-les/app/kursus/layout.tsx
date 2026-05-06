import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Kursus | Kursus Les",
  description: "Manajemen data kursus",
};

export default function KursusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
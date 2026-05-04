import "./globals.css";

export const metadata = {
  title: "Kursus Les",
  description: "Website Kursus Les Sederhana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
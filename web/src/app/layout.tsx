import "./globals.css";

export const metadata = {
  title: "JWT Authentication",
  description: "JWT Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

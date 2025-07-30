import "./globals.css";

export const metadata = { title: "App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}

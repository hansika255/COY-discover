import "./globals.css";

export const metadata = {
  title: "Coy Discover",
  description: "Meet someone new today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}


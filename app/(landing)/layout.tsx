import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SplitAt — Make space work harder",
  description:
    "Discover flexible commercial spaces, share unused space, and grow your business with SplitAt.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

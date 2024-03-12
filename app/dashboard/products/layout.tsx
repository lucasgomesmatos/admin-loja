import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}

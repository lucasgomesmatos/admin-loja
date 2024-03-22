import Sidebar from "@/components/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col ">{children}</div>
    </section>
  );
}

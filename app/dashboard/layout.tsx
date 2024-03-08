import { SideBar } from '@/components/side-bar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

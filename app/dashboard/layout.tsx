import { SideBar } from "@/components/side-bar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid min-h-screen w-full ">
      <SideBar />
      <div className="flex flex-col lg:ml-[270px]">{children}</div>
    </section>
  );
}

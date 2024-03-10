import { ProductContextProvider } from './context/product-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ProductContextProvider>{children}</ProductContextProvider>
    </section>
  );
}

import { SideBar } from '@/components/side-bar';
import { GET_PROFILE } from '@/utils/functions/api';

interface UserProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

async function fetchProfile(): Promise<UserProps> {
  const params = GET_PROFILE();
  const response = await fetch(params.url, {
    credentials: 'include',
    ...params,
  });

  const profile = await response.json();

  return profile;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchProfile();

  return (
    <section className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <SideBar name={user.name} email={user.email} />
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

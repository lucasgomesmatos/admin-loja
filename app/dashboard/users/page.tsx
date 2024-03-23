import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

import { fetchUsers } from "@/app/actions/users/get-all-users";
import { NoResults } from "@/components/no-results";
import { Pagination } from "@/components/pagination";
import { CONSTANTS } from "@/utils/functions/constants";
import { Metadata } from "next";
import { Suspense } from "react";
import { ButtonCreateUsers } from "./components/button-create-category";
import { ButtonUpdateUser } from "./components/button-update-category";
import DialogCreateUser from "./components/dialog-create-user";
import DialogUpdateUser from "./components/dialog-update-user";
import { SearchUsers } from "./components/search-users";

export const metadata: Metadata = {
  title: "Usuários",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);
  const query = String(searchParams.search ?? "");

  const { users, total } = await fetchUsers(page, query);

  return (
    <>
      <Suspense>
        <SearchUsers />
      </Suspense>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>

          <ButtonCreateUsers />
        </div>
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-flow-row">
          {users?.map((user) => (
            <Card key={user.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-ellipsis font-semibold">
                  {user.name}
                </CardTitle>

                <User className="size-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 mt-8">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-bold">E-mail:</span> {user.email}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-bold">CPF:</span> {user.cpf}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-bold">Telefone:</span> {user.phone}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="space-x-4">
                <ButtonUpdateUser userId={user.id} user={user} />
              </CardFooter>
            </Card>
          ))}
        </div>
        {!users?.length && <NoResults />}
        {total > CONSTANTS.POR_PAGES && (
          <Pagination
            pageIndex={page - 1}
            perPage={CONSTANTS.POR_PAGES}
            totalCount={total}
            result={users}
          />
        )}
        <DialogCreateUser />
        <DialogUpdateUser />
      </main>
    </>
  );
}

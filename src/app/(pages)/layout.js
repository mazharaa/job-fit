import { getLogUser } from "@/services/loguser";
import { LogoutForm } from "./form";

export default async function Layout({ children }) {
  const logUser = await getLogUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-lg font-semibold pl-8">
          Hello,
          {logUser.name}!
        </h1>
        <LogoutForm />
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}

import { getLogUser } from "@/services/loguser";
import { LogoutForm } from "./form";

export default async function Layout({ children }) {
  const logUser = await getLogUser();

  return (
    <div className="space-y-4">
      <header className="flex justify-between items-center p-4 border-b border-e-zinc-100">
        <div>Job Fit</div>
        <div className="flex gap-4 items-center">
          <div>Hello, {logUser.name}!</div>
          <LogoutForm />
        </div>
      </header>
      <main className="max-w-4xl m-auto">{children}</main>
    </div>
  );
}

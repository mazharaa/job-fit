import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px]">
        <div>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
        <div>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Created by @tremik
      </footer>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="max-w-md w-full p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold text-center mb-4">Login to JobFit</h2>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-600">
            <Button>Login</Button>
          </Link>
        </div>
        <div className="text-center my-3 text-sm text-gray-400">or</div>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Created by @tremik
      </footer> */}
    </div>
  );
}

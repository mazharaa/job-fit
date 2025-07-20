import { Card } from "@/components/ui/card";
import { RegisterForm } from "../form";
import SocialLogin from "../_components/social-login";
import { Link } from "lucide-react";

export default async function Page() {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Register to JobFit
      </h2>
      <RegisterForm />
      <div className="my-4 text-center text-sm text-gray-500">or</div>
      <SocialLogin />
      <div className="mt-4 text-sm text-center">
        Already have an account?
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}

import { LoginForm } from "../form";
import SocialLogin from "../_components/social-login";
import { Link } from "lucide-react";

export default async function Page() {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Login to JobFit
      </h2>
      <LoginForm />
      <div className="my-4 text-center text-sm text-gray-500">or</div>

      <SocialLogin />
      <div className="mt-4 text-sm text-center">
        Don't have an account?
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}

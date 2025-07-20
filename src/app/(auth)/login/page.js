import { Card } from "@/components/ui/card";
import { LoginForm } from "../form";
import SocialLogin from "../_components/social-login";

export default async function Page() {
  return (
    <div className="space-y-4 py-4">
      <Card>
        <LoginForm />
        <SocialLogin />
        <section>
          <p>
            Do not have an account? <Link href="/register">Register</Link>
          </p>
        </section>
      </Card>
    </div>
  );
}

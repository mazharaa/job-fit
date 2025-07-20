import { Card } from "@/components/ui/card";
import { RegisterForm } from "../form";
import SocialLogin from "../_components/social-login";

export default async function Page() {
  return (
    <div className="space-y-4 py-4">
      <Card>
        <RegisterForm />
        <SocialLogin />
        <section>
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </section>
      </Card>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { LoginForm } from "./form";

export default async function Page() {
  return (
    <div className="space-y-4 py-4">
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}

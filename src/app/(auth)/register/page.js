import { Card } from "@/components/ui/card";
import { RegisterForm } from "./form";

export default async function Page() {
  return (
    <div className="space-y-4 py-4">
      <Card>
        <RegisterForm />
      </Card>
    </div>
  );
}

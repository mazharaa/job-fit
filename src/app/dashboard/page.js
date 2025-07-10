import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Page() {
  return (
    <div className="space-y-12">
      <form>
        <Input name="CV" placeholder="Input CV" />
        <Button>Enter</Button>
      </form>
    </div>
  );
}

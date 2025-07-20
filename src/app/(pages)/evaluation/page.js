import CredibilityResult from "./_components/credibilityresult";

export default async function Page() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Job Evaluation Result</h2>
      <CredibilityResult />
    </div>
  );
}

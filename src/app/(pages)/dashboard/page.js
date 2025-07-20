import { UploadForm } from "./form";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-2xl font-semibold mb-6">JobFit</div>
      <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-md text-center">
        <h2 className="text-lg font-medium mb-1">Evaluation Job</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter a job vacancy image to get a credibility analysis
        </p>
        <UploadForm />
      </div>
    </div>
  );
}

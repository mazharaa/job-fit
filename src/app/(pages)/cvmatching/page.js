import CvForm from "./form";

export default async function Page() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">CV Matching</h2>
      <p className="text-sm text-gray-600 mb-6">
        Upload your CV to check compatibility with the selected job post.
      </p>
      <CvForm />
    </div>
  );
}

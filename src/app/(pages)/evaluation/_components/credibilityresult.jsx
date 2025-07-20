"use client";

import Link from "next/link";

const CredibilityResult = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <button className="text-sm text-gray-500 mb-4">
          Evaluation Result
        </button>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Job Title</h2>
          <p className="text-sm text-gray-500">Job Location</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
          <div>
            <strong>Salary</strong>
          </div>
          <div>
            <strong>Job Info</strong> Fulltime/Intern
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-md">
            <div className="text-2xl font-bold text-green-600 mb-2">
              Percentage%
            </div>
            <div className="text-sm text-green-700 font-medium bg-green-100 px-3 py-1 rounded inline-block mb-4">
              CREDIBLE JOB POSTING
            </div>
            <button className="block w-full border py-2 rounded hover:bg-gray-100 text-sm">
              View Job Details
            </button>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="text-sm font-semibold mb-2">
              Credibility Indicators
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>List 1</li>
              <li>List 2</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded flex justify-between items-center">
          <span className="text-sm">
            Try this feature to increase your chances of passing the CV
            screening.
          </span>
          <button className="px-3 py-2 text-blue-600 border rounded hover:bg-blue-100 text-sm">
            <Link to="/cvmatching"> Try CV Matching</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CredibilityResult;

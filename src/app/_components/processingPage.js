import { Card, CardContent } from "@/components/ui/card";
import { Check, LoaderCircle } from "lucide-react";
import { useRealtimeRun } from "@trigger.dev/react-hooks";
import { redirect } from "next/navigation";

export function ProcessingPage({ runId, publicAccessToken }) {
  const { run, error } = useRealtimeRun(runId, {
    accessToken: publicAccessToken,
    enabled: !!runId && !!publicAccessToken,
  });

  if (error) {
    return (
      <main className="flex flex-col min-h-screen max-w-2xl m-auto justify-center items-center pb-45">
        <p className="text-red-500">Error: {error.message}</p>
      </main>
    );
  }

  if (!run || !run.metadata || !run.metadata.status) {
    return (
      <main className="flex flex-col min-h-screen max-w-2xl m-auto justify-center items-center pb-45">
        <p className="text-gray-500">Memulai proses...</p>
      </main>
    );
  }

  if (run?.output?.jobOpeningId) {
    console.log("Job Opening ID:", run.output.jobOpeningId);
    redirect(`/job/analyzing/result/${run.output.jobOpeningId}`);
  }

  const status = run.metadata?.status;
  return (
    <main className="flex flex-col min-h-screen max-w-2xl m-auto justify-center items-center pb-45">
      <Card className="w-full min-h-[185px] max-w-[352px] p-4">
        <CardContent className="p-0 space-y-4">
          {status.label === "Job evaluation completed!" ? (
            <h2 className="text-[18px] font-medium"> Selesai Menganalisis</h2>
          ) : (
            <h2 className="text-[18px] font-medium"> Sedang Menganalisis...</h2>
          )}

          <div className="space-y-2">
            {status.gettingData === "PROCESSING" && (
              <div className="flex space-x-2">
                <LoaderCircle className="text-[#335CFF] animate-spin size-5" />
                <p className="text-[14px] text-[#335CFF]">
                  Mengambil Data Lowongan...
                </p>
              </div>
            )}
            {status.gettingData === "COMPLETED" && (
              <div className="flex space-x-2">
                <Check className="text-[#1FC16B] size-5" />
                <p className="text-[14px] text-[#1FC16B]">
                  Mengambil Data Lowongan
                </p>
              </div>
            )}

            {status.jobInformation === "PROCESSING" && (
              <div className="flex space-x-2">
                <LoaderCircle className="text-[#335CFF] animate-spin size-5" />
                <p className="text-[14px] text-[#335CFF]">
                  Memeriksa Detail Lowongan...
                </p>
              </div>
            )}
            {status.jobInformation === "COMPLETED" && (
              <div className="flex space-x-2">
                <Check className="text-[#1FC16B] size-5" />
                <p className="text-[14px] text-[#1FC16B]">
                  Memeriksa Detail Lowongan
                </p>
              </div>
            )}

            {status.credibility === "PROCESSING" && (
              <div className="flex space-x-2">
                <LoaderCircle className="text-[#335CFF] animate-spin size-5" />
                <p className="text-[14px] text-[#335CFF]">
                  Menganalisis Kredibilitas Lowongan...
                </p>
              </div>
            )}
            {status.credibility === "COMPLETED" && (
              <div className="flex space-x-2">
                <Check className="text-[#1FC16B] size-5" />
                <p className="text-[14px] text-[#1FC16B]">
                  Menganalisis Kredibilitas Lowongan
                </p>
              </div>
            )}

            {status.assessmentSummary === "PROCESSING" && (
              <div className="flex space-x-2">
                <LoaderCircle className="text-[#335CFF] animate-spin size-5" />
                <p className="text-[14px] text-[#335CFF]">
                  Membuat Kesimpulan...
                </p>
              </div>
            )}
            {status.assessmentSummary === "COMPLETED" && (
              <div className="flex space-x-2">
                <Check className="text-[#1FC16B] size-5" />
                <p className="text-[14px] text-[#1FC16B]">Membuat Kesimpulan</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

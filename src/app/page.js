"use client";

import { ProcessingPage } from "./_components/processingPage";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { evaluateJobAction } from "./action";

export default function Page() {
  const [state, action, pending] = useActionState(evaluateJobAction, null);
  const [hasFile, setHasFile] = useState(false);

  const handleFileChange = (e) => {
    setHasFile(e.target.files && e.target.files.length > 0);
  };

  if (pending) {
    return (
      <main className="flex flex-col min-h-screen max-w-2xl m-auto justify-center items-center pb-45">
        <p className="text-gray-500">Memulai proses...</p>
      </main>
    );
  } else if (state !== null) {
    return (
      <ProcessingPage
        runId={state.runId}
        publicAccessToken={state.publicAccessToken}
      />
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center max-w-2xl m-auto justify-center space-y-5 pb-45">
      <h1 className="text-4xl font-medium">JobFit</h1>
      <Card className="w-full max-w-140 p-4">
        <CardContent className="p-0">
          <form action={action}>
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-[18px] font-medium">
                  Evaluasi Lowongan Kerja
                </h2>
                <p className="text-sm text-muted-foreground">
                  Masukkan gambar lowongan kerja untuk mendapatkan analisis
                  kredibilitas
                </p>
              </div>
              <Input
                className="h-10"
                name="job-image"
                type="file"
                multiple
                onChange={handleFileChange}
              />
              <Button
                type="submit"
                className="w-full h-10 bg-[#335CFF] hover:bg-[#2543CC] text-sm"
                disabled={!hasFile}
              >
                Mulai Evaluasi
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div>
        <p className="text-sm text-[#5C5C5C] w-full max-w-75 text-center">
          Mendukung LinkedIn, Jobstreet, Kalibrr, dan platform lainnya
        </p>
      </div>
    </main>
  );
}

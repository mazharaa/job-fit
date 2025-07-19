import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/utils/prisma";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  ArrowLeft,
  ChevronRight,
  CircleCheck,
  FileText,
  ListTodo,
  NotebookPen,
  Star,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Page({ params }) {
  const { id } = await params;

  const jobOpening = await prisma.jobOpening.findUnique({
    where: {
      id,
    },
  });

  return (
    <div className="max-w-2xl m-auto space-y-6">
      <header className="flex space-x-2 mt-12">
        <Link href="/">
          <ArrowLeft className="text-neutral-600" />
        </Link>
        <p className="text-neutral-600">Hasil Evaluasi</p>
      </header>
      <main>
        <Card className="min-h-[185px] w-[673px] p-4">
          <CardContent className="p-0 space-y-4">
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cv-matching">CV Matching</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-base font-medium">
                      {jobOpening.companyName}
                    </h2>
                    <p className="text-sm text-neutral-600">
                      {jobOpening.companyLocation}
                    </p>
                  </div>
                  <h1 className="text-xl font-medium">{jobOpening.jobTitle}</h1>
                  <div className="flex space-x-3 p-3 bg-gray-100 rounded-lg">
                    <div className="space-y-2 w-full">
                      <h3 className="text-xs text-neutral-600 font-medium">
                        ESTIMASI GAJI
                      </h3>
                      <p className="text-sm font-medium">
                        {jobOpening.salaryEstimation}
                      </p>
                    </div>
                    <div className="space-y-2 w-full">
                      <h3 className="text-xs text-neutral-600 font-medium">
                        KONTRAK
                      </h3>
                      <p className="text-sm font-medium">
                        {jobOpening.contractType} - {jobOpening.workArrangement}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="p-3 space-y-4 h-fit border rounded-lg border-gray-200 w-full">
                      <div className="flex space-x-2">
                        <NotebookPen className="text-neutral-600" />
                        <h2 className="text-base font-medium">
                          Skor Kredeibilitas Keseluruhan
                        </h2>
                      </div>
                      <Separator />
                      <div className="flex flex-col items-center space-y-4">
                        <p
                          className={`text-[32px] font-medium ${
                            jobOpening.credibilityLabel === "KREDIBEL"
                              ? "text-green-500"
                              : jobOpening.credibilityLabel === "MERAGUKAN"
                              ? "text-amber-400"
                              : "text-rose-500"
                          }`}
                        >
                          {jobOpening.credibilityScore}%
                        </p>
                        <div
                          className={`flex px-2.5 py-1 rounded-full w-fit space-x-1 ${
                            jobOpening.credibilityLabel === "KREDIBEL"
                              ? "bg-green-100"
                              : jobOpening.credibilityLabel === "MERAGUKAN"
                              ? "bg-yellow-50"
                              : "bg-rose-50"
                          }`}
                        >
                          <p className="text-xs font-medium">
                            {jobOpening.credibilityLabel === "KREDIBEL"
                              ? "✅ LOWONGAN KREDIBEL"
                              : jobOpening.credibilityLabel === "MERAGUKAN"
                              ? "⚠️ HATI HATI"
                              : "‼️ JANGAN DILAMAR"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 space-y-4 border rounded-lg border-gray-200 w-full">
                      <div className="flex space-x-2">
                        <ListTodo className="text-neutral-600" />
                        <h2 className="text-base font-medium">
                          Indikator Kredibilitas
                        </h2>
                      </div>
                      <Separator />
                      {jobOpening.reasoningPoint.map((reason, index) => (
                        <div key={index}>
                          {jobOpening.credibilityLabel === "KREDIBEL" ? (
                            <div className="flex space-x-2">
                              <CircleCheck className="size-5 text-white bg-green-500 rounded-full flex-shrink-0" />
                              <p className="text-sm font-medium">{reason}</p>
                            </div>
                          ) : jobOpening.credibilityLabel === "MERAGUKAN" ? (
                            <div className="flex space-x-2">
                              <TriangleAlert className="size-5 text-amber-400 flex-shrink-0" />
                              <p className="text-sm font-medium">{reason}</p>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <TriangleAlert className="size-5 text-rose-500 flex-shrink-0" />
                              <p className="text-sm font-medium">{reason}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-10 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-[10px]">
                      <div className="flex size-10 bg-gradient-to-b from-blue-200/50 to-blue-200/0 rounded-full flex-shrink-0 items-center justify-center">
                        <div className="flex size-7 bg-white rounded-full flex-shrink-0 items-center justify-center">
                          <Star className="text-blue-600 size-3.5" />
                        </div>
                      </div>
                      <p className="text-sm">
                        Cobain fitur ini agar peluang kamu lolos screening CV
                        lebih tinggi.
                      </p>
                    </div>
                    <Button className="h-full bg-white border border-blue-600 space-x-1 p-[10px]">
                      <FileText className="text-blue-600" />
                      <p className="text-sm font-medium text-blue-600">
                        Coba CV Matching
                      </p>
                      <ChevronRight className="text-blue-600" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

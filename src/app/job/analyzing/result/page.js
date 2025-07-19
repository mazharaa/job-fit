import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  ArrowLeft,
  ChevronRight,
  CircleCheck,
  FileText,
  ListTodo,
  NotebookPen,
  SquareCheckBig,
} from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="max-w-2xl m-auto space-y-6">
      <header className="flex space-x-2 mt-12">
        <ArrowLeft className="text-neutral-600" />
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
                    <h2 className="text-base font-medium">Nama Perusahaan</h2>
                    <p className="text-sm text-neutral-600">
                      Lokasi Perusahaan
                    </p>
                  </div>
                  <h1 className="text-xl font-medium">Job Title</h1>
                  <div className="flex space-x-3 p-3 bg-gray-100 rounded-lg">
                    <div className="space-y-2 w-full">
                      <h3 className="text-xs text-neutral-600 font-medium">
                        ESTIMASI GAJI
                      </h3>
                      <p className="text-sm font-medium">
                        Rp15,000,000 - 25,000,000
                      </p>
                    </div>
                    <div className="space-y-2 w-full">
                      <h3 className="text-xs text-neutral-600 font-medium">
                        KONTRAK
                      </h3>
                      <p className="text-sm font-medium">Working Arrangement</p>
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
                        <p className="text-[32px] font-medium text-green-500">
                          85%
                        </p>
                        <div className="flex px-2.5 py-1 bg-green-100 rounded-full w-fit space-x-1">
                          <SquareCheckBig className="h-4 w-4 text-green-500" />
                          <p className="text-xs font-medium">
                            LOWONGAN KREDIBEL
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
                      <div className="flex space-x-2">
                        <CircleCheck className="w-5 h-5 text-white bg-green-500 rounded-full" />
                        <p className="text-sm font-medium">LOWONGAN KREDIBEL</p>
                      </div>
                      <div className="flex space-x-2">
                        <CircleCheck className="w-5 h-5 text-white bg-green-500 rounded-full" />
                        <p className="text-sm font-medium">LOWONGAN KREDIBEL</p>
                      </div>
                      <div className="flex space-x-2">
                        <CircleCheck className="w-5 h-5 text-white bg-green-500 rounded-full" />
                        <p className="text-sm font-medium">LOWONGAN KREDIBEL</p>
                      </div>
                      <div className="flex space-x-2">
                        <CircleCheck className="w-5 h-5 text-white bg-green-500 rounded-full" />
                        <p className="text-sm font-medium">LOWONGAN KREDIBEL</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-10 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-[10px]">
                      <div className="size-10 bg-blue-600 rounded-full flex-shrink-0"></div>
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

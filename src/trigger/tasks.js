import { openai } from "@/utils/openai";
import { prisma } from "@/utils/prisma";
import { metadata, schemaTask, task } from "@trigger.dev/sdk/v3";
import { zodTextFormat } from "openai/helpers/zod";
import z from "zod";

export const generateCredibilityTask = task({
  id: "generate-credibility",
  maxDuration: 120,
  run: async (payload, { ctx }) => {
    const JobCredibilityResult = z.object({
      jobInformation: z.object({
        companyName: z.string(),
        companyLocation: z.string(),
        jobTitle: z.string(),
        salaryEstimation: z.string(),
        contractType: z.string(),
        workArrangements: z.string(),
        jobDescription: z.array(z.string()),
        jobRequirements: z.array(z.string()),
      }),
      credibility: z.object({
        credibilityLabel: z.enum(["KREDIBEL", "MERAGUKAN", "PENIPUAN"]),
        credibilityScore: z.number().min(0).max(100),
        reasoningPoint: z.array(z.string()),
      }),
      assessmentSummary: z.string(),
    });

    const promptContent = [
      {
        type: "input_text",
        text: "Sekarang analisis job description gambar berikut ini",
      },
    ];

    for (const base64Image of payload.base64Images) {
      promptContent.push({
        type: "input_image",
        image_url: `data:image/jpeg;base64,${base64Image}`,
      });
    }

    let accumulatedText = "";

    metadata.set("status", {
      progress: 0,
      label: "Getting Data...",
      gettingData: "PROCESSING",
      jobInformation: "PENDING",
      credibility: "PENDING",
      assessmentSummary: "PENDING",
    });

    // Helper function to detect and update section status
    const updateSectionStatus = async (text) => {
      const currentStatus = metadata.get("status") || {};

      if (
        text.includes('"jobInformation"') &&
        currentStatus.jobInformation === "PENDING"
      ) {
        metadata.set("status", {
          ...currentStatus,
          progress: 25,
          label: "Processing Job Information...",
          gettingData: "COMPLETED",
          jobInformation: "PROCESSING",
        });
      }

      if (
        text.includes('"credibility"') &&
        currentStatus.credibility === "PENDING"
      ) {
        metadata.set("status", {
          ...currentStatus,
          progress: 50,
          label: "Processing Credibility Analysis...",
          jobInformation: "COMPLETED",
          credibility: "PROCESSING",
        });
      }

      if (
        text.includes('"assessmentSummary"') &&
        currentStatus.assessmentSummary === "PENDING"
      ) {
        metadata.set("status", {
          ...currentStatus,
          progress: 75,
          label: "Processing Assessment Summary...",
          credibility: "COMPLETED",
          assessmentSummary: "PROCESSING",
        });
      }
    };

    const response = openai.responses
      .stream({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: `Kamu adalah asisten AI yang mengevaluasi kredibilitas lowongan kerja berdasarkan job description dalam gambar. Gunakan kriteria berikut:

          1. Identitas Perusahaan
          2. Deskripsi Pekerjaan
          3. Gaya Bahasa
          4. Sumber Platform (opsional)

          ATURAN KHUSUS untuk:
          1. Reasoning Point
          - Sebutkan empat alasan singkat yang membuat lowongan tersebut KREDIBEL, MERAGUKAN, ataupun PENIPUAN
          2. Salary Estimation, sebutkan kira-kira range estimasi gaji berdasarkan:
          - Pengalaman yang dibutuhkan
          - Lokasi perusahaan
          - Job Title
          - Tipe kontrak
          - Job Description
          - Job Requirements
          - Contoh output: IDR 8,000,000 - 15,000,000
          

          Output dalam format JSON:
          {
            jobInformation: {
              companyName: string,
              companyLocation: string,
              jobTitle: string,
              salaryEstimation: string,
              contractType: string,
              workArrangements: string,
              jobDescription: [string]
              jobRequirements: [string]
            },
            credibility: {
              credibilityLabel: "KREDIBEL" | "MERAGUKAN" | "PENIPUAN",
              credibilityScore: number (0-100),
              reasoningPoints: [string]  
            },
            assessmentSummary: string (menggunakan bahasa indonesia)
          }
          `,
          },
          {
            role: "user",
            content: promptContent,
          },
        ],
        text: {
          format: zodTextFormat(JobCredibilityResult, "job_credibility"),
        },
      })
      .on("response.refusal.delta", (event) => {
        // Only accumulate text for status tracking, don't print
        accumulatedText += event.delta;
        updateSectionStatus(accumulatedText);
      })
      .on("response.output_text.delta", async (event) => {
        // process.stdout.write(event.delta);
        accumulatedText += event.delta;

        // Update section status based on accumulated text
        await updateSectionStatus(accumulatedText);
      })
      .on("response.output_text.done", async () => {
        metadata.set("status", {
          progress: 100,
          label: "Job evaluation completed!",
          gettingData: "COMPLETED",
          jobInformation: "COMPLETED",
          credibility: "COMPLETED",
          assessmentSummary: "COMPLETED",
        });
      })
      .on("response.error", (event) => {
        console.error("❌ Error during processing:", event.error);
        metadata.set("status", {
          progress: 0,
          label: "Error occurred during processing",
          error: event.error.message,
        });
      });

    const result = (await response.finalResponse()).output_parsed;
    const jobOpening = await prisma.jobOpening.create({
      data: {
        companyName: result.jobInformation.companyName,
        companyLocation: result.jobInformation.companyLocation,
        jobTitle: result.jobInformation.jobTitle,
        salaryEstimation: result.jobInformation.salaryEstimation,
        contractType: result.jobInformation.contractType,
        workArrangement: result.jobInformation.workArrangements,
        jobDescription: result.jobInformation.jobDescription,
        jobRequirements: result.jobInformation.jobRequirements,
        credibilityLabel: result.credibility.credibilityLabel,
        credibilityScore: result.credibility.credibilityScore,
        reasoningPoint: result.credibility.reasoningPoint,
      },
    });

    // console.log(jobOpening);

    return {
      jobOpeningId: jobOpening.id,
    };
  },
});

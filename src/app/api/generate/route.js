import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import crypto from "crypto";
import { saveData, initDb } from "@/lib/db";

const API_KEY = process.env.GOOGLE_API_KEY;
console.log("Using API Key:", API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(request) {
  try {
    console.log("Received POST request to /api/generate");

    await initDb(); // Ensure database table is created

    const { userInput, dataCount, language } = await request.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    console.log("Model initialized");

    const prompt = `
      Generate a JSON object that represents mock data for a business. 
      The data should include the following:
      
      ${userInput}
      
      Please generate ${dataCount} entries of this data structure.
      Each entry should be unique and realistic.
      The data should be consistent across all entries.
      Use ${language} for all text values, with the following specifications:
      - If the language is set to "中文", use Traditional Chinese (繁體中文) instead of Simplified Chinese.
      - Brand names or proper nouns should remain in their original form (e.g., "Apple" should not be translated).
      Our data properties or keys should be in English.
      Provide the output as a valid JSON array of objects.
    `;

    console.log("Sending request to Gemini API");
    const result = await model.generateContent(prompt);
    console.log("Received response from Gemini API");

    const generatedData = JSON.parse(result.response.text());

    const dataHash = crypto.randomBytes(4).toString("hex");
    const expirationTime = Date.now() + 3600000; // 1 hour later

    await saveData(dataHash, generatedData, expirationTime);

    console.log(`Data generated and stored with hash: ${dataHash}`);

    return NextResponse.json({
      data: generatedData,
      api_url: `/api/${dataHash}`,
      expirationTime,
    });
  } catch (error) {
    console.error("Detailed error in generate route:", error);
    return NextResponse.json(
      { error: "Failed to generate data", details: error.message },
      { status: 500 }
    );
  }
}

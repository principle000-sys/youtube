import { GoogleGenAI, Type } from "@google/genai";
import { ViralResponse } from '../types';

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateViralScript = async (
  originalScript: string,
  newTopic: string
): Promise<ViralResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const prompt = `
    You are an expert YouTube Strategist and Scriptwriter. 
    
    TASK:
    1. Analyze the provided "Original Viral Script". Identify why it was successful (the "Hook", the pacing, the retention strategies, the emotional arc, and the call-to-action structure).
    2. Write a COMPLETELY NEW script about the "New Topic" that strictly follows the structural and stylistic formula of the original script.
    
    INPUTS:
    - Original Viral Script: "${originalScript}"
    - New Topic: "${newTopic}"
    
    OUTPUT REQUIREMENTS:
    - Return the result in JSON format.
    - The new script must be in Korean (Hangul).
    - The new script must be engaging, natural for spoken video, and formatted with Markdown (bolding key emphasis).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class YouTube consultant. You analyze successful videos and replicate their formula for new topics.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.OBJECT,
              properties: {
                hookStrategy: { type: Type.STRING, description: "Analysis of how the original script grabs attention in the first 30 seconds." },
                pacingAndTone: { type: Type.STRING, description: "Description of the speed, energy, and emotional tone of the original." },
                structureBreakdown: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "Step-by-step breakdown of the script's flow (e.g., Intro, Conflict, Resolution)."
                },
                keyViralFactors: { type: Type.STRING, description: "The core reasons why this script likely performed well (e.g., curiosity gap, relatability)." }
              },
              required: ["hookStrategy", "pacingAndTone", "structureBreakdown", "keyViralFactors"]
            },
            newScript: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "A click-worthy YouTube title for the new script." },
                scriptContent: { type: Type.STRING, description: "The full script text in Markdown format, ready for reading." }
              },
              required: ["title", "scriptContent"]
            }
          },
          required: ["analysis", "newScript"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini.");
    }

    return JSON.parse(text) as ViralResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
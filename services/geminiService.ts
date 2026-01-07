
import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult } from "../types";

const SYSTEM_INSTRUCTION = `You are an elite Senior Smart Contract Auditor, specializing in Solidity security and logic verification.
Your sole purpose is to analyze provided Solidity code against a "User Claim" and determine if the code's actual behavior matches the user's stated intent.
You must look beyond obvious syntax errors and analyze the deep logic, state changes, and potential attack vectors.

Respond ONLY in JSON format with the following structure:
{
  "status": "VERIFIED MATCH" | "CRITICAL MISMATCH",
  "summary": "A single, clear sentence explaining the verdict to a non-technical user.",
  "analysis": "Explain exactly how the code works in technical terms.",
  "proof": "Explain the exact lines of code that prove or disprove the claim.",
  "riskAssessment": "The practical consequence of a mismatch."
}`;

const FIX_SYSTEM_INSTRUCTION = `You are an expert Solidity Developer. 
Given a piece of Solidity code and a user's intended behavior (User Claim), your task is to rewrite the code so it strictly follows the User Claim while maintaining security best practices (e.g., adding reentrancy guards, proper access control, etc.).
Ensure you provide the full contract. Use comments to highlight where the fix was applied.`;

export const performAudit = async (code: string, claim: string): Promise<AuditResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
CODE:
${code}

USER CLAIM:
"${claim}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.1,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    const result = JSON.parse(response.text || '{}');
    return {
      status: result.status || 'CRITICAL MISMATCH',
      summary: result.summary || 'Failed to parse summary.',
      analysis: result.analysis || 'No analysis provided.',
      proof: result.proof || 'No technical proof provided.',
      riskAssessment: result.riskAssessment || 'No risk assessment provided.'
    };
  } catch (error) {
    console.error("Audit failed:", error);
    throw new Error("Audit service failed to process request. Ensure the code is valid Solidity.");
  }
};

export const fixCode = async (code: string, claim: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
ORIGINAL CODE:
${code}

USER INTENDED CLAIM:
"${claim}"

Please provide the corrected Solidity code.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: FIX_SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });

    return response.text || '// Error: No code generated.';
  } catch (error) {
    console.error("Fix failed:", error);
    throw new Error("Failed to generate fix.");
  }
};

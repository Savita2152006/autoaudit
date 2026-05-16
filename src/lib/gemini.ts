import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getAuditChatResponse = async (message: string, history: { role: string; content: string }[] = []) => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `You are AutoAudit AI, a professional financial compliance and audit expert.
  You specialize in:
  - GST (Goods and Services Tax) regulations.
  - Financial anomaly detection.
  - Audit trail best practices.
  - Compliance workflows.
  
  Provide precise, authoritative, and helpful answers. If someone asks about a specific regulation, try to provide the general context and state that for specific legal advice they should consult a chartered accountant.
  Maintain a professional and trustworthy tone.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: "user", parts: [{ text: systemInstruction }] },
        ...history.map(h => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

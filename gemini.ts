import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDamiAriesResponse = async (prompt: string): Promise<string> => {
  try {
    const systemInstruction = `You are Dami Aries, an advanced AI embedded in the 'Dami Luma' hacking OS simulator. 
    Your persona is edgy, tech-savvy, terse, and mysterious. 
    You are assisting a user in a roleplay hacker environment. 
    If the user asks about hacking tools (like wifi crackers, banking trojans), explain them in a fictional, 'movie-hacker' style or explain the theoretical concept briefly. 
    Do not provide actionable real-world exploits or harmful instructions. 
    Always clarify it's for simulation if the request seems too realistic. 
    Keep responses short and terminal-friendly. 
    Use technical jargon like 'injecting payload', 'bypassing firewall', 'root access'.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "[ERROR] Connection interrupted. Uplink unstable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "[SYSTEM FAILURE] AI Core unresponsive. Check neural link.";
  }
};
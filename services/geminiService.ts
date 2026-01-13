
import { GoogleGenAI } from "@google/genai";

export const summarizeLesson = async (lessonTitle: string, description: string): Promise<string> => {
  try {
    // Initialize GoogleGenAI strictly following the guideline: const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres PsicSugey AI, un asistente educativo experto en psicología. 
      Resume de forma clara y motivadora la siguiente lección:
      Título: ${lessonTitle}
      Contexto: ${description}
      Por favor, genera un resumen en 3 puntos clave y una pregunta de reflexión para el estudiante.`,
    });
    
    // Access the text property directly on the response object
    return response.text || "No se pudo generar el resumen.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al conectar con la IA de PsicSugey.";
  }
};

import { client } from "./api";

export const ASK_GEMINI_MUTATION = `
  mutation AskGemini($question: String!) {
    askGemini(question: $question)
  }
`;

export const askGemini = async (question: string): Promise<string | null> => {
  try {
    interface AskGeminiResponse {
      askGemini: string;
    }

    const variables = { question };
    const data = await client.request<AskGeminiResponse>(
      ASK_GEMINI_MUTATION,
      variables
    );

    return data.askGemini;
  } catch (error) {
    console.error("❌ Error calling askGemini:", error);
    return null;
  }
};

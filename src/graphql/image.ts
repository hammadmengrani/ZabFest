import { client } from "./api";

// ------------------- GENERATE AND STORE IMAGE -------------------
export const GENERATE_AND_STORE_IMAGE_MUTATION = `
  mutation GenerateAndStoreImage($email: String!, $prompt: String!, $mode: String!) {
    generateAndStoreImage(email: $email, input: { prompt: $prompt, mode: $mode }) {
      id
      imageUrl    # use camelCase as backend expects
      prompt
    }
  }
`;

export interface GeneratedImage {
  id: string;
  imageUrl: string;   // camelCase for frontend use
  prompt: string;
}

export const generateAndStoreImage = async (
  prompt: string,
  email: string,
  mode: "product_name" | "custom_prompt"
): Promise<GeneratedImage | null> => {
  try {
    const variables = { prompt, email, mode };

    interface GenerateImageResponse {
      generateAndStoreImage: GeneratedImage;
    }

    const data = await client.request<GenerateImageResponse>(
      GENERATE_AND_STORE_IMAGE_MUTATION,
      variables
    );

    return data.generateAndStoreImage;
  } catch (error) {
    console.error("❌ Error generating and storing image:", error);
    return null;
  }
};

import { client } from "./api";

interface AskResponse {
  ask: {
    answer: string;
    chatId: string;
    id: string;
  };
}

interface GetQuestionsResponse {
  getQuestions: Array<{ question: string; answer: string; id: string }>;
}

interface GetChatsResponse {
  getChats: Array<{ chatId: string; email: string; topic:string }>;
}

// **Query: Get All Chats**
export const getChats = async (email: string): Promise<GetChatsResponse["getChats"]> => {
  const query = `
    query GetChats($email: String!) {
      getChats(email: $email) {
        chatId
        email
        topic   

      }
    }
  `;

  try {
    const data = await client.request<GetChatsResponse>(query, { email });
    return data.getChats;
  } catch (error) {
    // console.error("Error fetching chats:", error);
    return [];
  }
};


// **Query: Get Questions and Answers for a Chat**
export const getQuestions = async (
  email: string,
  chat_id: string
): Promise<GetQuestionsResponse["getQuestions"]> => {
  const query = `
    query GetQuestions($email: String!, $chat_id: String!) {
      getQuestions(email: $email, chatId: $chat_id) {
        question
        answer
        id
      }
    }
  `;

  try {
    const data = await client.request<GetQuestionsResponse>(query, {
      email,
      chat_id,
    });
    return data.getQuestions;
  } catch (error) {
    // console.error("Error fetching questions:", error);
    return [];
  }
};


// **Mutation: Delete a Chat**
export const deletechat = async (chatId: string): Promise<boolean> => {
  const mutation = `
    mutation DeleteChat($chatId: String!) {
      deleteChat(chatId: $chatId)
    }
  `;

  try {
    const data = await client.request<{ deleteChat: boolean }>(mutation, {
      chatId,
    });
    return data.deleteChat;
  } catch (error) {
    // console.error("Error deleting chat:", error);
    return false;
  }
};



// **Mutation: Rename a Chat**
export const renameChat = async (chatId: string, newTopic: string): Promise<boolean> => {
  const mutation = `
    mutation RenameChat($chatId: String!, $newTopic: String!) {
      renameChat(chatId: $chatId, newTopic: $newTopic)
    }
  `;

  try {
    // console.log(`📡 Sending GraphQL Mutation: renameChat`);
    // console.log(`🔹 chatId: ${chatId}`);
    // console.log(`🔹 newTopic: ${newTopic}`);

    const variables = { chatId, newTopic };
    // console.log("🛜 Mutation Variables:", variables);

    const data = await client.request<{ renameChat: boolean }>(mutation, variables);

    // console.log("✅ GraphQL Response:", data);

    return data.renameChat;
  } catch (error: any) {
    // console.error("🔥 GraphQL renameChat Error:", error);

    if (error.response) {
      // console.error("🚨 GraphQL Response Error:", error.response);
    }

    return false;
  }
};

export const ASK_GEMINI_MUTATION = `
  mutation AskGemini($question: String!, $email: String!, $chatId: String!) {
    askGemini(question: $question, email: $email, chatId: $chatId) {
      answer
      chatId
      id
    }
  }
`;

interface AskGeminiResponse {
  askGemini: {
    answer: string;
    chatId: string;
    id: string;
  };
}

export const askGemini = async (email: string, question: string, chatId: string): Promise<{answer: string, chatId: string, id: string} | null> => {
  try {
    const variables = { question, email, chatId };
    const data = await client.request<AskGeminiResponse>(ASK_GEMINI_MUTATION, variables);
    return data.askGemini;
  } catch (error) {
    console.error("❌ Error calling askGemini:", error);
    return null;
  }
};


import { client } from "./api";

// ------------------- REGISTER STORE -------------------
export const REGISTER_STORE_MUTATION = `
  mutation RegisterStore(
    $storeName: String!
    $ownerName: String!
    $email: String!
    $password: String!
    $category: [String!]!
  ) {
    registerStore(
      storeName: $storeName
      ownerName: $ownerName
      email: $email
      password: $password
      category: $category
    ) {
      id
      storeName
      ownerName
      email
      category
      createdAt
    }
  }
`;


export interface Store {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  category: string[];
  createdAt?: string;
}


export const registerStore = async (
  storeName: string,
  ownerName: string,
  email: string,
  password: string,
  category: string[]
): Promise<Store | null> => {
  try {
    const variables = { storeName, ownerName, email, password, category };

    interface RegisterResponse {
      registerStore: Store;
    }

    const data = await client.request<RegisterResponse>(REGISTER_STORE_MUTATION, variables);
    return data.registerStore;
  } catch (error) {
    console.error("❌ Error registering store:", error);
    return null;
  }
};

// ------------------- LOGIN STORE -------------------
export const LOGIN_STORE_MUTATION = `
  mutation LoginStore($email: String!, $password: String!) {
    loginStore(email: $email, password: $password) {
      storeName
      ownerName
      email
      category
    }
  }
`;

export interface StoreDashboard {
  storeName: string;
  ownerName: string;
  email: string;
  category: string[];
}


export const loginStore = async (
  email: string,
  password: string
): Promise<StoreDashboard | null> => {
  try {
    const variables = { email, password };
    interface LoginResponse {
      loginStore: StoreDashboard;
    }

    const data = await client.request<LoginResponse>(LOGIN_STORE_MUTATION, variables);
    return data.loginStore;
  } catch (error) {
    console.error("❌ Error logging in store:", error);
    return null;
  }
};

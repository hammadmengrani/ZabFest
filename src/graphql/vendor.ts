import { client } from "./api";

// ------------------- Types -------------------

export interface ProductInput {
  productName: string;
  quantity: number;
  price: number;
  salePrice: number;
}

export interface GeneratedEmailType {
  email: string;
  brand: string;
  generatedEmail: string;
  attachment: string;
  createdAt: string;
}

// ------------------- GraphQL Mutation -------------------

export const GENERATE_SEND_STORE_EMAIL_MUTATION = `
  mutation GenerateSendStoreEmail(
    $email: String!,
    $brand: String!,
    $products: [ProductInput!]!,
    $vendorName: String!,
    $companyName: String!,
    $shippingAddress: String!,
    $cityStateZip: String!,
    $tax: Float!,
    $shippingRate: Float!,
    $paymentMethod: String!,
    $paymentDate: String!,
    $note: String,
    $phoneNumber: String,
    $contactName: String!,
    $contactTitle: String!,
    $contactEmail: String!
  ) {
    generateSendStoreEmail(
      email: $email,
      brand: $brand,
      products: $products,
      vendorName: $vendorName,
      companyName: $companyName,
      shippingAddress: $shippingAddress,
      cityStateZip: $cityStateZip,
      tax: $tax,
      shippingRate: $shippingRate,
      paymentMethod: $paymentMethod,
      paymentDate: $paymentDate,
      note: $note,
      phoneNumber: $phoneNumber,
      contactName: $contactName,
      contactTitle: $contactTitle,
      contactEmail: $contactEmail
    ) {
      email
      brand
      generatedEmail
      attachment
      createdAt
    }
  }
`;

interface GenerateSendStoreEmailMutationResponse {
  generateSendStoreEmail: GeneratedEmailType;
}

// ------------------- Mutation Function -------------------

interface GenerateSendStoreEmailInput {
  email: string;
  brand: string;
  products: ProductInput[];
  vendorName: string;
  companyName: string;
  shippingAddress: string;
  cityStateZip: string;
  tax: number;
  shippingRate: number;
  paymentMethod: string;
  paymentDate: string;
  note?: string;
  phoneNumber?: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
}

export const generateSendStoreEmail = async (
  input: GenerateSendStoreEmailInput
): Promise<GeneratedEmailType | null> => {
  try {
    const data = await client.request<GenerateSendStoreEmailMutationResponse>(
      GENERATE_SEND_STORE_EMAIL_MUTATION,
      input
    );
    return data.generateSendStoreEmail;
  } catch (error) {
    console.error("❌ Error generating and sending store email:", error);
    return null;
  }
};

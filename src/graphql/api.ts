import { GraphQLClient } from "graphql-request";

// ✅ GraphQL API Endpoint
const API_ENDPOINT = "http://localhost:8000/graphql";

// ✅ Initialize GraphQL Client
export const client = new GraphQLClient(API_ENDPOINT, {
  headers: {},
});

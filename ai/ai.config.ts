import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getAgentModel() {
  const openrouterProvider = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const modelId = process.env.OPENROUTER_DEFAULT_MODEL;

  return openrouterProvider(modelId);
}

// src/ai/flows/personalized-recommendations.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized recommendations
 *   to users based on their browsing history and saved searches.
 *
 * - personalizedRecommendations - A function that retrieves personalized clothing item recommendations.
 * - PersonalizedRecommendationsInput - The input type for the personalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the personalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  browsingHistory: z.array(z.string()).describe('List of clothing item IDs the user has viewed.'),
  savedSearches: z.array(z.string()).describe('List of the user\u2019s saved search queries.'),
  userProfile: z
    .object({
      userId: z.string().describe('The unique identifier for the user.'),
      location: z.string().optional().describe('The user\u2019s general location (e.g., city, state).'),
      stylePreferences: z.array(z.string()).optional().describe('The user\u2019s preferred clothing styles (e.g., vintage, modern, minimalist).'),
      sizePreferences: z.array(z.string()).optional().describe('The user\u2019s preferred sizes (e.g., S, M, L).'),
    })
    .describe('The user profile, containing ID, location, and style/size preferences.'),
  availableItems: z.array(z.string()).describe('List of available clothing item IDs.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedItems: z
    .array(z.string())
    .describe('A list of clothing item IDs recommended for the user.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function personalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in providing personalized clothing recommendations.

  Based on the user's browsing history, saved searches, user profile, and available items, recommend a list of clothing items that the user is most likely to be interested in.

  Browsing History: {{browsingHistory}}
  Saved Searches: {{savedSearches}}
  User Profile: {{userProfile}}
  Available Items: {{availableItems}}

  Consider the user's location, style preferences, and size preferences when making recommendations.

  Return only a list of item IDs in the recommendedItems field.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

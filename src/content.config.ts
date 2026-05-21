import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  faq,
  portfolio,
};
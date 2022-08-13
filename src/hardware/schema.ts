import { z } from 'zod';

export const instanceSchema = z.object({
  provider: z.string(),
  instance: z.string(),
  cpu: z.number(),
  memory: z.number()
});

export type Instance = z.infer<typeof instanceSchema>;

import { z } from 'zod';

export const instanceSchema = z.object({
  provider: z.string(),
  instance: z.string(),
  cpu: z.number(),
  memory: z.number()
});

export const octomizeSchema = z.object({
  hardware: z.array(instanceSchema)
});

export type Instance = z.infer<typeof instanceSchema>;
export type Octomize = z.infer<typeof octomizeSchema>;

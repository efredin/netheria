import { z } from 'zod';
import { uniqWith } from 'lodash';
import { instanceSchema } from '../hardware';

export const octomizeSchema = z.object({
  hardware: z.array(instanceSchema).min(1)
    // require unique provider+instance combinations
    .refine(
      val => uniqWith(val, (a, b) => a.provider === b.provider && a.instance === b.instance ).length === val.length,
      { message: 'Duplicate hardware detected' }
    )
});

export type Octomize = z.infer<typeof octomizeSchema>;

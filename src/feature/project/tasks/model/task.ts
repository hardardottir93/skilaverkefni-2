import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  projectId: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

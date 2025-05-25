import { z } from "zod";

export const TodoListSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  done: z.boolean().optional().default(false),
});

import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export const ValidateBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ status: "error", error: result.error.format() });
      return;
    }
    next();
  };

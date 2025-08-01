import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequestMiddleware = (schema: ZodSchema<any>, type: "body" | "params" | "query" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type]);
    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: result.error.format(),
      });
    }
    req[type] = result.data;
    next();
  };
};
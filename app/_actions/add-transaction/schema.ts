// app/_actions/schema.ts (ou schema.ts)
import { z } from "zod";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const addTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
      const n = Number(val);
      return Number.isFinite(n) ? n : val;
    }
    return val;
  }, z.number().positive()),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number")
      return new Date(val);
    return val;
  }, z.date()),
});

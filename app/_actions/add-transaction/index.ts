// app/_actions/add-transaction.ts
"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { addTransactionSchema } from "./schema"; // seu zod preprocess já aplicado

export const addTransaction = async (params: unknown) => {
  const parsed = addTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const created = await db.transaction.create({
    data: {
      name: parsed.name,
      amount: parsed.amount, // number ou string dependendo do seu schema
      type: parsed.type,
      category: parsed.category,
      paymentMethod: parsed.paymentMethod,
      date: parsed.date,
      userId,
    },
  });

  revalidatePath("/transactions");

  // Retorne SOMENTE primitivos — NÃO retorne `created` direto.
  return { id: created.id };
};

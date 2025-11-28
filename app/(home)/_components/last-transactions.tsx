import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  if (!lastTransactions || lastTransactions.length === 0) {
    return (
      <div className="col-span-1 flex items-center justify-center rounded-md border p-6 text-sm text-muted-foreground">
        Nenhuma transação recente
      </div>
    );
  }

  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) return "text-red-500";
    if (transaction.type === TransactionType.DEPOSIT) return "text-primary";
    return "text-white";
  };

  const getAmountPrefix = (transaction: Transaction) =>
    transaction.type === TransactionType.DEPOSIT ? "+" : "-";

  return (
    <div className="col-span-1 h-full rounded-md border">
      <CardHeader className="px-4 pt-4">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col px-4 pb-4">
        <div className="scroll-dark-transparent max-h-[440px] flex-1 overflow-auto md:max-h-[550px] lg:max-h-[650px]">
          <div className="flex flex-col gap-4">
            {lastTransactions.map((transaction) => {
              const iconSrc =
                TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod];

              return (
                <div
                  key={transaction.id}
                  className="w-full rounded-md px-2 py-3"
                  aria-label={`${transaction.name} - ${formatCurrency(
                    Number(transaction.amount),
                  )}`}
                >
                  {/* Grid: ícone | conteúdo (truncável) | valor */}
                  <div className="grid grid-cols-[40px_1fr_96px] items-center gap-3">
                    {/* Coluna 1: ícone (fixo) */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-opacity-[3%] text-white">
                      <Image
                        src={`/${iconSrc}`}
                        width={20}
                        height={20}
                        alt={transaction.paymentMethod ?? "meio de pagamento"}
                        priority={false}
                      />
                    </div>

                    {/* Coluna 2: conteúdo principal (truncável) */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {transaction.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    {/* Coluna 3: valor (fixo, alinhado à direita) */}
                    <div className="flex justify-end">
                      <p
                        className={`text-sm font-bold tabular-nums ${getAmountColor(transaction)}`}
                      >
                        {getAmountPrefix(transaction)}
                        {formatCurrency(Number(transaction.amount))}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer opcional — ficará sempre colado à borda inferior */}
        {/* <div className="mt-4">Rodapé do card</div> */}
      </CardContent>
    </div>
  );
};

export default LastTransactions;

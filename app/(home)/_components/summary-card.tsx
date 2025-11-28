import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${
            size === "small" ? "text-muted-foreground" : "text-white opacity-70"
          }`}
        >
          {title}
        </p>
      </CardHeader>

      {/* Responsivo: column em telas pequenas, row em sm+ */}
      <CardContent className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          // mt cria espaço apenas em telas pequenas; sm:mt-0 remove em sm+
          <div className="mt-2 sm:mt-0">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;

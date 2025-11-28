import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  if (!expensesPerCategory || expensesPerCategory.length === 0) {
    return (
      <div className="col-span-2 flex h-full items-center justify-center rounded-md border p-6 text-sm text-muted-foreground">
        Sem dados para o período selecionado
      </div>
    );
  }

  const sorted = [...expensesPerCategory].sort(
    (a, b) => b.percentageOfTotal - a.percentageOfTotal,
  );

  return (
    // Garante que o container do card ocupe toda a altura da célula do grid
    <div className="col-span-2 h-full">
      {/* ScrollArea também ocupa 100% para que a borda inferior fique alinhada */}
      <ScrollArea className="h-full rounded-md border bg-card">
        {/* Header permanece com padding superior */}
        <CardHeader className="px-4 pt-4">
          <CardTitle className="text-base font-bold">
            Gastos por Categoria
          </CardTitle>
        </CardHeader>

        {/* Faz o CardContent ser um flex column e ocupar o espaço restante */}
        <CardContent className="flex flex-col px-4 pb-4">
          {/* Lista deve crescer para empurrar possíveis footers/bordas */}
          <div className="flex flex-1 flex-col gap-4">
            {sorted.map((category) => (
              <div
                key={category.category}
                className="w-full"
                aria-label={`${TRANSACTION_CATEGORY_LABELS[category.category]}: ${category.percentageOfTotal}%`}
              >
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium">
                    {TRANSACTION_CATEGORY_LABELS[category.category]}
                  </p>
                  <p className="flex-shrink-0 text-sm font-semibold">
                    {category.percentageOfTotal}%
                  </p>
                </div>

                <div className="mt-2 w-full">
                  <Progress
                    value={category.percentageOfTotal}
                    className="h-2 md:h-3"
                    aria-label={`${TRANSACTION_CATEGORY_LABELS[category.category]} progresso`}
                    aria-valuenow={category.percentageOfTotal}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Se quiser um footer no card, coloque aqui.
              Ele ficará sempre colado na borda inferior por causa do flex-1 acima. */}
        </CardContent>
      </ScrollArea>
    </div>
  );
};

export default ExpensesPerCategory;

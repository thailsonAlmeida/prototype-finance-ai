// app/(your-path)/home/page.tsx (ou onde estiver seu Home component)
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  return (
    <>
      <Navbar />
      {/* REMOVED overflow-hidden so the page/document can scroll normally */}
      <div className="flex min-h-[calc(100vh-64px)] flex-col gap-6 p-4 md:p-6">
        {/* Header: empilha no mobile, alinha horizontal somente em >1024px */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>

        {/* Main grid: mobile 1 coluna. Em telas maiores que 1024px (lg+) usamos 2 colunas 2fr/1fr */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr]">
          {/* Main column */}
          <div className="flex flex-col gap-6">
            {/* Summary cards: responsivo dentro do próprio componente */}
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />

            {/* Charts area:
              - mobile até 1024px: stacked (1 coluna)
              - >1024px: grid de 3 colunas, com o Pie ocupando 2 colunas
            */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* TransactionsPieChart ocupa 2 colunas em lg+ para ficar maior */}
              <div className="lg:col-span-2">
                <TransactionsPieChart {...dashboard} />
              </div>

              <div className="lg:col-span-1">
                <ExpensesPerCategory
                  expensesPerCategory={dashboard.totalExpensePerCategory}
                />
              </div>
            </div>
          </div>

          {/* Sidebar / last transactions — ficará abaixo em resoluções <=1024px */}
          <div className="w-full">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

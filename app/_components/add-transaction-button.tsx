"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const ariaLabel = userCanAddTransaction
    ? "Adicionar transação"
    : "Adicionar transação (bloqueado)";

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* 
              - mobile: botão compacto só-ícone (h-9 w-9)
              - sm+: botão com texto + ícone, padding padrão
              - usamos `sr-only`/`hidden sm:inline` para esconder o texto em mobile
            */}
            <Button
              aria-label={ariaLabel}
              className={
                "flex items-center gap-2 rounded-full font-bold " +
                "h-9 w-9 justify-center p-0 sm:h-auto sm:w-auto sm:px-4 sm:py-2" +
                "transition-colors disabled:opacity-60"
              }
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              {/* texto visível em sm+ apenas */}
              <span className="hidden p-3 sm:inline">Adicionar transação</span>

              {/* ícone sempre visível; tamanho controlado */}
              <ArrowDownUpIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            {!userCanAddTransaction
              ? "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas."
              : "Adicionar transação"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;

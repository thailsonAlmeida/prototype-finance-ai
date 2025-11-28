import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* ESQUERDA: conteúdo principal */}
      <div className="flex w-full items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[550px]">
          <div className="mb-8">
            <Image
              src="/logo.svg"
              alt="Finance AI"
              width={173}
              height={39}
              className="block"
              priority
            />
          </div>

          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Bem Vindo</h1>

          <p className="mb-6 text-sm text-muted-foreground sm:text-base">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>

          <div className="mt-4 w-full md:mt-6">
            <SignInButton>
              <Button className="w-full md:w-auto" variant="outline">
                <LogInIcon className="mr-2" />
                Fazer login ou Criar conta
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* DIREITA: imagem decorativa — escondida em telas pequenas */}
      <div className="relative hidden md:block">
        <Image
          src="/login.png"
          alt="Faça Login"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default LoginPage;

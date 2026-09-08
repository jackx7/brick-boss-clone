import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Crown, TrendingUp } from "lucide-react";
import { useState } from "react";

const PRO_URL = "https://pay.cakto.com.br/w8qn83q_863323";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — BriqueFlow" },
      {
        name: "description",
        content: "Comece grátis no BriqueFlow: até 2 produtos na Beta.",
      },
      { property: "og:title", content: "Criar conta — BriqueFlow" },
      {
        property: "og:description",
        content: "Comece grátis no BriqueFlow: até 2 produtos na Beta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CadastroPage,
});

function CadastroPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <div className="w-full max-w-sm space-y-6 mx-auto">
          <div className="text-center">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold">Criar conta</h1>
              <span className="rounded-full bg-warning/15 text-warning px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                Beta
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Comece grátis · até 2 produtos na Beta
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Senha</label>
              <input
                type="password"
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              Criar conta grátis (Beta)
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            <span>ou pule a Beta</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <a
            href={PRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors h-10 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-500/90 hover:to-amber-600/90 shadow-lg shadow-amber-500/20 border-0 w-full gap-2 font-semibold"
          >
            <Crown className="h-4 w-4" />
            Assinar o Pro agora
          </a>
        </div>

        <div className="w-full">
          <div className="relative rounded-2xl p-6 border bg-card/60 backdrop-blur-sm border-amber-500/50 shadow-xl shadow-amber-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg">
              Recomendado
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-bold">BriqueFlow Pro</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Todas as funções liberadas, sem limites.
            </p>
            <ul className="space-y-2 mb-5">
              {[
                "Produtos ilimitados (sem limite de 2)",
                "Vendas e estoque ilimitados",
                "Dashboard completo sem restrições",
                "Histórico ilimitado de vendas",
                "Filtros avançados por período",
                "Suporte prioritário",
                "Acesso antecipado a novos recursos",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={PRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors h-10 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-500/90 hover:to-amber-600/90 shadow-lg shadow-amber-500/20 border-0 w-full gap-2 font-semibold"
            >
              <Crown className="h-4 w-4" />
              Fazer Upgrade para Pro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

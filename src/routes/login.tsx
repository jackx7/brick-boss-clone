import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar no BriqueFlow" },
      { name: "description", content: "Acesse sua conta de revenda no BriqueFlow." },
      { property: "og:title", content: "Entrar no BriqueFlow" },
      { property: "og:description", content: "Acesse sua conta de revenda no BriqueFlow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">Entrar no BriqueFlow</h1>
            <span className="rounded-full bg-warning/15 text-warning px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Beta
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Acesse sua conta de revenda</p>
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Não tem conta?{" "}
          <Link to="/cadastro" className="text-primary font-medium hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}

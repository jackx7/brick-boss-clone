import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Boxes,
  DollarSign,
  Package,
  Percent,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — BriqueFlow" },
      {
        name: "description",
        content: "Faturamento, lucro, margem, estoque e vendas da sua revenda em tempo real.",
      },
      { property: "og:title", content: "Dashboard — BriqueFlow" },
      {
        property: "og:description",
        content: "Faturamento, lucro, margem, estoque e vendas da sua revenda em tempo real.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

const kpis = [
  { label: "Faturamento", value: brl(0), icon: DollarSign },
  { label: "Lucro", value: brl(0), icon: TrendingUp },
  { label: "Margem", value: "0%", icon: Percent },
  { label: "Vendas", value: "0", icon: ShoppingCart },
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">BriqueFlow</span>
            <span className="rounded-full bg-warning/15 text-warning px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Beta
            </span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
          >
            Sair
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Resumo da sua revenda em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {label}
                </span>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Vendas recentes</h2>
            </div>
            <p className="text-sm text-muted-foreground">Nenhuma venda registrada ainda.</p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Boxes className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Estoque</h2>
            </div>
            <p className="text-sm text-muted-foreground">Nenhum produto cadastrado.</p>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Melhores produtos por lucro</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Cadastre produtos para ver a análise de lucro e margem.
          </p>
        </div>
      </main>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Crown, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppShell, PRO_URL, brl } from "@/components/AppShell";

export const Route = createFileRoute("/produtos")({
  component: Produtos,
  head: () => ({
    meta: [
      { title: "Produtos — BriqueFlow" },
      {
        name: "description",
        content:
          "Cadastre e acompanhe seus produtos de revenda: compra, venda, lucro, margem e tempo de venda.",
      },
      { property: "og:title", content: "Produtos — BriqueFlow" },
      {
        property: "og:description",
        content: "Gerencie os produtos da sua revenda no BriqueFlow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const products = [
  {
    name: "PRO3 ( AirPods 1 )",
    category: "Eletrônicos",
    buy: 59.15,
    sell: 80,
    profit: 20.85,
    margin: "35.3%",
    days: "20 dias",
  },
  {
    name: "Controle Ps4",
    category: "Eletrônicos",
    buy: 38.99,
    sell: 50,
    profit: 11.01,
    margin: "28.2%",
    days: "8 dias",
  },
];

function Produtos() {
  const [query, setQuery] = useState("");
  const list = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            2 de 2 produtos cadastrados
            <span className="rounded bg-warning/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-warning">
              BETA
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-md bg-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground opacity-60">
            <Plus className="h-4 w-4" />
            Novo Produto
          </button>
          <a
            href={PRO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md bg-warning px-4 py-2 text-sm font-semibold text-warning-foreground transition-opacity hover:opacity-90"
          >
            <Crown className="h-4 w-4" />
            Upgrade Pro
          </a>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-warning/40 bg-gradient-to-r from-warning/10 to-transparent p-4">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold">Você atingiu o limite da Beta (2 produtos)</div>
          <div className="text-sm text-muted-foreground">
            Faça upgrade para o{" "}
            <span className="font-semibold text-warning">BriqueFlow Pro</span> e cadastre
            produtos ilimitados, com todas as funções liberadas.
          </div>
        </div>
        <a
          href={PRO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-md bg-warning px-4 py-2.5 text-sm font-semibold text-warning-foreground transition-opacity hover:opacity-90"
        >
          <Crown className="h-4 w-4" />
          Fazer Upgrade para Pro
        </a>
      </div>

      <div className="mb-5 flex flex-wrap gap-4">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome ou categoria..."
            className="w-full rounded-md border border-border bg-card py-2.5 pr-3 pl-9 text-sm outline-none focus:border-primary"
          />
        </div>
        <select className="rounded-md border border-border bg-card px-3 py-2.5 text-sm">
          <option>Todos</option>
          <option>Vendido</option>
          <option>Em estoque</option>
        </select>
      </div>

      <div className="glass-card overflow-x-auto rounded-xl">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-border text-xs tracking-wider text-muted-foreground uppercase">
              <th className="px-5 py-4 text-left font-semibold">Produto</th>
              <th className="px-3 py-4 text-left font-semibold">Status</th>
              <th className="px-3 py-4 text-right font-semibold">Compra</th>
              <th className="px-3 py-4 text-right font-semibold">Venda</th>
              <th className="px-3 py-4 text-right font-semibold">Lucro</th>
              <th className="px-3 py-4 text-right font-semibold">Margem</th>
              <th className="px-3 py-4 text-right font-semibold">Tempo venda</th>
              <th className="px-5 py-4 text-right font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.name} className="border-b border-border last:border-0">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-md bg-secondary" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
                    Vendido
                  </span>
                </td>
                <td className="px-3 py-4 text-right font-medium">{brl(p.buy)}</td>
                <td className="px-3 py-4 text-right font-medium">{brl(p.sell)}</td>
                <td className="px-3 py-4 text-right font-semibold text-primary">
                  {brl(p.profit)}
                </td>
                <td className="px-3 py-4 text-right font-medium">{p.margin}</td>
                <td className="px-3 py-4 text-right text-muted-foreground">{p.days}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-3">
                    <button
                      aria-label="Editar"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Excluir"
                      className="text-destructive transition-colors hover:opacity-80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

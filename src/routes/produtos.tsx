import { createFileRoute } from "@tanstack/react-router";
import { Crown, Pencil, Plus, Search, Trash2, X } from "lucide-react";
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

type Product = {
  name: string;
  category: string;
  buy: number;
  sell: number;
  status: "Vendido" | "Em estoque";
  days: string;
};

const initialProducts: Product[] = [
  {
    name: "PRO3 ( AirPods 1 )",
    category: "Eletrônicos",
    buy: 59.15,
    sell: 80,
    status: "Vendido",
    days: "20 dias",
  },
  {
    name: "Controle Ps4",
    category: "Eletrônicos",
    buy: 38.99,
    sell: 50,
    status: "Vendido",
    days: "8 dias",
  },
];

const emptyForm = { name: "", category: "", buy: "", sell: "", status: "Em estoque" as Product["status"], days: "" };

function Produtos() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const list = products.filter(
    (p) =>
      (statusFilter === "Todos" || p.status === statusFilter) &&
      (p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())),
  );

  const profit = (p: Product) => p.sell - p.buy;
  const margin = (p: Product) =>
    p.buy > 0 ? `${(((p.sell - p.buy) / p.buy) * 100).toFixed(1)}%` : "—";

  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditing(p.name);
    setForm({
      name: p.name,
      category: p.category,
      buy: String(p.buy),
      sell: String(p.sell),
      status: p.status,
      days: p.days,
    });
    setShowForm(true);
  }

  function save() {
    const buy = parseFloat(form.buy.replace(",", ".")) || 0;
    const sell = parseFloat(form.sell.replace(",", ".")) || 0;
    const product: Product = {
      name: form.name.trim() || "Sem nome",
      category: form.category.trim() || "Geral",
      buy,
      sell,
      status: form.status,
      days: form.days.trim() || "—",
    };
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.name === editing ? product : p)));
    } else {
      setProducts((prev) => [...prev, product]);
    }
    setShowForm(false);
  }

  function remove(name: string) {
    setProducts((prev) => prev.filter((p) => p.name !== name));
  }

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {products.length} produto{products.length === 1 ? "" : "s"} cadastrado
            {products.length === 1 ? "" : "s"} — ilimitado
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={openNew}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-border bg-card px-3 py-2.5 text-sm"
        >
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
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      p.status === "Vendido"
                        ? "bg-primary/15 text-primary"
                        : "bg-warning/15 text-warning"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-3 py-4 text-right font-medium">{brl(p.buy)}</td>
                <td className="px-3 py-4 text-right font-medium">{brl(p.sell)}</td>
                <td className="px-3 py-4 text-right font-semibold text-primary">
                  {brl(profit(p))}
                </td>
                <td className="px-3 py-4 text-right font-medium">{margin(p)}</td>
                <td className="px-3 py-4 text-right text-muted-foreground">{p.days}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-3">
                    <button
                      aria-label="Editar"
                      onClick={() => openEdit(p)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Excluir"
                      onClick={() => remove(p.name)}
                      className="text-destructive transition-colors hover:opacity-80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-muted-foreground">
                  Nenhum produto encontrado. Clique em "Novo Produto" para cadastrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="glass-card w-full max-w-md rounded-xl p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editing ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button
                aria-label="Fechar"
                onClick={() => setShowForm(false)}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Nome</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ex: iPhone 12"
                  className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Categoria</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Ex: Eletrônicos"
                  className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Preço de compra</label>
                  <input
                    value={form.buy}
                    onChange={(e) => setForm({ ...form, buy: e.target.value })}
                    placeholder="0,00"
                    inputMode="decimal"
                    className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Preço de venda</label>
                  <input
                    value={form.sell}
                    onChange={(e) => setForm({ ...form, sell: e.target.value })}
                    placeholder="0,00"
                    inputMode="decimal"
                    className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value as Product["status"] })
                    }
                    className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
                  >
                    <option>Em estoque</option>
                    <option>Vendido</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Tempo de venda</label>
                  <input
                    value={form.days}
                    onChange={(e) => setForm({ ...form, days: e.target.value })}
                    placeholder="Ex: 10 dias"
                    className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={save}
                className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {editing ? "Salvar alterações" : "Cadastrar produto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

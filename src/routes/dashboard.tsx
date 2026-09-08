import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  DollarSign,
  Megaphone,
  Package,
  Percent,
  ShoppingCart,
  Target,
  Trophy,
  TrendingUp,
  Hash,
} from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, ProBanner, brl } from "@/components/AppShell";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — BriqueFlow" },
      {
        name: "description",
        content:
          "Acompanhe faturamento, lucro, margem e estoque da sua revenda em um painel único.",
      },
      { property: "og:title", content: "Dashboard — BriqueFlow" },
      {
        property: "og:description",
        content: "Acompanhe seus resultados de revenda no BriqueFlow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const sales = [
  { date: "07/09/2026", label: "Controle Ps4", revenue: 50, profit: 11.01 },
  { date: "08/09/2026", label: "PRO3 ( AirPods 1 )", revenue: 80, profit: 20.85 },
];

function buildSeries() {
  const end = new Date(2026, 8, 8);
  const out: { day: string; faturamento: number; lucro: number }[] = [];
  for (let i = 30; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const day = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
    const s = sales.find((x) => x.date.slice(0, 5) === day);
    out.push({ day, faturamento: s?.revenue ?? 0, lucro: s?.profit ?? 0 });
  }
  return out;
}

const series = buildSeries();

function Kpi({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: typeof DollarSign;
  highlight?: boolean;
}) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div
        className={`mt-3 text-3xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe seus resultados de revenda
          </p>
        </div>
        <select className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
          <option>Últimos 30 dias</option>
          <option>Últimos 7 dias</option>
          <option>Este mês</option>
        </select>
      </div>

      <ProBanner
        title={
          <span className="flex items-center gap-2">
            Desbloqueie o BriqueFlow Pro
            <span className="rounded bg-warning/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-warning">
              PRO
            </span>
          </span>
        }
      >
        Produtos ilimitados e todos os recursos liberados.
      </ProBanner>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Faturamento" value={brl(130)} icon={DollarSign} highlight />
        <Kpi label="Lucro Total" value={brl(31.86)} icon={TrendingUp} />
        <Kpi label="Nº de Vendas" value="2" icon={ShoppingCart} />
        <Kpi label="Briques" value="2" icon={Hash} />
        <Kpi label="Ticket Médio" value={brl(65)} icon={Target} />
        <Kpi label="Margem Média" value="32.5%" icon={Percent} />
        <Kpi label="Em Estoque" value="0" icon={Package} />
        <Kpi label="Anúncios Ativos" value="0" icon={Megaphone} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="glass-card rounded-xl p-5 lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">Faturamento &amp; Lucro</h2>
            <div className="flex gap-2 text-xs">
              <span className="rounded-md border border-border px-2 py-1 text-muted-foreground">
                Faturamento — 0.0%
              </span>
              <span className="rounded-md border border-border px-2 py-1 text-muted-foreground">
                Lucro — 0.0%
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="day"
                  interval={1}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  stroke="var(--color-border)"
                />
                <YAxis
                  tickFormatter={(v: number) => `R$${v}`}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  stroke="var(--color-border)"
                />
                <Line
                  type="monotone"
                  dataKey="faturamento"
                  stroke="oklch(0.7 0.148 162.5)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="lucro"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-2 font-semibold">Resumo do Estoque</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ name: "Vendido", value: 2 }]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  isAnimationActive={false}
                  innerRadius={58}
                  outerRadius={82}
                  stroke="var(--color-card)"
                >
                  <Cell fill="#3b82f6" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center">
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
              Vendido: 2
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <Clock className="h-4 w-4" />
            Vendas Recentes
          </h2>
          <div className="divide-y divide-border">
            {[...sales].reverse().map((s) => (
              <div key={s.label} className="flex items-start justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary">{brl(s.revenue)}</div>
                  <div className="text-xs text-muted-foreground">+{brl(s.profit)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <Trophy className="h-4 w-4 text-warning" />
            Maior Lucro
          </h2>
          <ol className="space-y-3">
            {[
              { n: "PRO3 ( AirPods 1 )", v: brl(20.85) },
              { n: "Controle Ps4", v: brl(11.01) },
            ].map((r, i) => (
              <li key={r.n} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{i + 1}.</span>
                  {r.n}
                </span>
                <span className="font-semibold text-primary">{r.v}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <Trophy className="h-4 w-4 text-warning" />
            Maior Margem
          </h2>
          <ol className="space-y-3">
            {[
              { n: "PRO3 ( AirPods 1 )", v: "35%" },
              { n: "Controle Ps4", v: "28%" },
            ].map((r, i) => (
              <li key={r.n} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{i + 1}.</span>
                  {r.n}
                </span>
                <span className="font-semibold text-primary">{r.v}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AppShell>
  );
}

import { Link, useNavigate } from "@tanstack/react-router";
import { Crown, LayoutGrid, LogOut, Package, PanelLeft, TrendingUp } from "lucide-react";
import { useState, type ReactNode } from "react";

export const PRO_URL = "https://pay.cakto.com.br/w8qn83q_863323";
export const USER_EMAIL = "nitroconta860@gmail.com";

function NavItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: typeof LayoutGrid;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground [&.active]:bg-sidebar-accent [&.active]:text-primary"
      activeProps={{ className: "active" }}
      activeOptions={{ exact: true }}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      {open && (
        <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
          <div className="flex items-center gap-2 px-4 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">BriqueFlow</span>
            <span className="rounded bg-warning/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-warning">
              BETA
            </span>
          </div>

          <nav className="flex flex-col gap-1 px-3">
            <NavItem to="/dashboard" icon={LayoutGrid} label="Dashboard" />
            <NavItem to="/produtos" icon={Package} label="Produtos" />
          </nav>

          <div className="mt-auto space-y-3 p-4">
            <a
              href={PRO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-warning px-4 py-2.5 text-sm font-semibold text-warning-foreground transition-opacity hover:opacity-90"
            >
              <Crown className="h-4 w-4" />
              Upgrade Pro
            </a>
            <p className="truncate text-xs text-muted-foreground">{USER_EMAIL}</p>
            <button
              onClick={() => navigate({ to: "/login" })}
              className="flex items-center gap-2 rounded-md px-1 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </aside>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border px-4 py-3">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Alternar menu"
            className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
          <span className="truncate text-sm text-muted-foreground">
            Controle de Revenda — Marketplace
          </span>
          <span className="rounded bg-warning/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-warning">
            BETA
          </span>
          <a
            href={PRO_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-auto flex items-center gap-2 rounded-md bg-warning px-4 py-2 text-sm font-semibold text-warning-foreground transition-opacity hover:opacity-90"
          >
            <Crown className="h-4 w-4" />
            Upgrade Pro
          </a>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export function ProBanner({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-warning/40 bg-gradient-to-r from-warning/10 to-transparent p-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning">
          <Crown className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold">{title}</div>
          <div className="text-sm text-muted-foreground">{children}</div>
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
  );
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

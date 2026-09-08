import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Check, Crown, Shield, TrendingUp, Zap } from "lucide-react";

const PRO_URL = "https://pay.cakto.com.br/w8qn83q_863323";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BriqueFlow — Controle total da sua revenda" },
      {
        name: "description",
        content:
          "Gerencie produtos, vendas, lucro e estoque do seu brique no Marketplace do Facebook com uma ferramenta profissional e intuitiva.",
      },
      { property: "og:title", content: "BriqueFlow — Controle total da sua revenda" },
      {
        property: "og:description",
        content: "Produtos, vendas, lucro e estoque da sua revenda em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 text-warning px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
              Versão Beta · até 2 produtos por conta
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Controle total da sua <span className="text-primary">revenda</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8">
              Gerencie produtos, vendas, lucro e estoque do seu brique no Marketplace do Facebook com
              uma ferramenta profissional e intuitiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/cadastro"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 gap-2"
              >
                <Zap className="h-4 w-4" />
                Testar a Beta grátis
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8"
              >
                Já tenho conta
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="glass-card rounded-xl p-6 text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Dashboard completo</h3>
              <p className="text-sm text-muted-foreground">
                Faturamento, lucro, margem, estoque e vendas em tempo real.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Dados seguros</h3>
              <p className="text-sm text-muted-foreground">
                Cada usuário tem seus próprios dados isolados e protegidos.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Análise de lucro</h3>
              <p className="text-sm text-muted-foreground">
                Veja seus melhores produtos por lucro e margem automaticamente.
              </p>
            </div>
          </div>

          <section id="planos" className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
                Escolha o seu plano
              </h2>
              <p className="text-muted-foreground">
                Comece grátis na Beta ou desbloqueie tudo com o Pro.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <div className="rounded-2xl p-6 border border-border bg-card/60 backdrop-blur-sm flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold">Beta</h3>
                  <span className="rounded-full bg-warning/15 text-warning px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    Grátis
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Para testar a plataforma.</p>
                <ul className="space-y-2 mb-5 text-sm flex-1">
                  <li>✓ Até 2 produtos cadastrados</li>
                  <li>✓ Dashboard básico</li>
                  <li>✓ Controle de vendas e estoque</li>
                  <li className="text-muted-foreground">✗ Recursos avançados limitados</li>
                </ul>
                <Link
                  to="/cadastro"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                >
                  Começar grátis
                </Link>
              </div>

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
          </section>
        </div>
      </main>
    </div>
  );
}

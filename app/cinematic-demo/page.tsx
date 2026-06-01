import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function CinematicHeroDemo() {
  return (
    <div className="overflow-x-hidden w-full min-h-screen">
      <CinematicHero
        brandName="SharpAI"
        tagline1="Engenharia que pensa,"
        tagline2="código que entrega."
        cardHeading="IA em produção, não em tese."
        cardDescription={
          <>
            <span className="font-semibold" style={{ color: "#FF6B00" }}>SharpAI</span>{" "}
            é um estúdio de engenharia de IA e automação. Construímos sistemas
            testáveis, observáveis e em produção — para times que medem deploy,
            não slides.
          </>
        }
        metricValue={40}
        metricLabel="Sistemas · Produção"
        ctaHeading="Pronto para construir?"
        ctaDescription="Aceitando 2 projetos por trimestre. Diagnóstico em 5 dias, spike funcional em 2 semanas, produto em produção em 8."
        primaryCtaLabel="Iniciar projeto"
        primaryCtaHref="#contato"
        secondaryCtaLabel="Ver cases"
        secondaryCtaHref="#trabalho"
      />
    </div>
  );
}

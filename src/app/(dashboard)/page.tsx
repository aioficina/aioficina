import { HeroInternal } from "@/components/ui/HeroInternal";
import { ContentRow } from "@/components/ui/ContentRow";

export default function Home() {
  return (
    <div className="max-w-[1600px] mx-auto animate-fade-in">
      <HeroInternal />

      <div className="space-y-4">
        <ContentRow title="Continuar Assistindo" />
        <ContentRow title="Recomendados para Você" />
        <ContentRow title="Novidades da Semana" />
        <ContentRow title="Mais Populares" />
      </div>
    </div>
  );
}

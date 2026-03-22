"use client";

import { useState, useEffect, use } from "react";
import { SHOWS, STAGES } from "@/data/lineup";
import Link from "next/link";
import html2canvas from "html2canvas";

interface RecapPageProps {
  params: Promise<{ id: string }>;
}

type Template = "dreamy" | "neon" | "candy";

export default function RecapPage({ params }: RecapPageProps) {
  const { id } = use(params);
  const [nickname, setNickname] = useState("");
  const [attendedShows, setAttendedShows] = useState<number[]>([]);
  const [template, setTemplate] = useState<Template>("dreamy");
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setNickname(localStorage.getItem("user_nickname") || "Show Lover");
    const saved = localStorage.getItem(`festival_attended_${id}`);
    if (saved) {
      setAttendedShows(JSON.parse(saved));
    }
  }, [id]);

  const myShows = SHOWS.filter(s => attendedShows.includes(s.id));
  
  const stats = {
    count: myShows.length,
    hours: myShows.length * 0.75,
    topStage: myShows.reduce((acc, s) => {
      acc[s.stage] = (acc[s.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    stagesCount: new Set(myShows.map(s => s.stage)).size
  };

  const topStageId = Object.entries(stats.topStage).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topStage = STAGES.find(s => s.id === topStageId);

  const handleDownload = async () => {
    const element = document.getElementById("recap-poster");
    if (!element) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `show-yuppie-recap-${nickname}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu Recap do Show Yuppie! 🎪",
          text: `Vi ${stats.count} shows no Lollapalooza 2026!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setToast("🔗 Link copiado!");
      } catch {
        setToast("Hmm, não deu pra copiar 😵");
      }
      setTimeout(() => setToast(null), 2200);
    }
  };

  const templateStyles = {
    dreamy: "bg-gradient-to-b from-[var(--yp-lilac)] via-[var(--yp-pink)] to-[var(--yp-bg)] text-text",
    neon: "bg-gradient-to-b from-[#1F1225] to-[#0B0710] text-white",
    candy: "bg-gradient-to-br from-[var(--yp-mint)] via-[var(--yp-lemon)] to-[var(--yp-peach)] text-text",
  };

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center py-xl px-md gap-xl">
      <header className="w-full max-w-[400px] flex items-center justify-between">
        <Link
          href={`/festival/${id}`}
          className="w-11 h-11 rounded-full bg-bg-sk border-2 border-border flex items-center justify-center text-text active:scale-95 transition-all"
          aria-label="Voltar"
        >
          ⬅️
        </Link>
        <h1 className="text-h2 font-fredoka font-bold text-text">Meu Recap ✨</h1>
        <div className="w-11 h-11" />
      </header>

      <div className="flex bg-bg-sk p-xs rounded-md gap-xs">
        {(["dreamy", "neon", "candy"] as Template[]).map(t => (
          <button
            key={t}
            onClick={() => setTemplate(t)}
            className={`px-md py-sm rounded-md text-tiny font-nunito font-bold capitalize transition-all border-2 ${
              template === t ? "bg-lilac text-white border-lilac" : "bg-transparent text-text-sf border-border hover:bg-bg-el"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div 
        id="recap-poster"
        className={`w-full max-w-[360px] aspect-[9/16] rounded-xl shadow-2xl p-xl flex flex-col gap-xl relative overflow-hidden ${templateStyles[template]}`}
      >
        <div className="absolute top-8 right-8 opacity-25 text-[44px]">🎶</div>
        <div className="absolute bottom-16 left-6 opacity-25 text-[56px]">✨</div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="text-center mb-xl">
            <h2 className={`text-h1 font-fredoka font-bold ${template === "neon" ? "text-[var(--yp-lilac)]" : "text-text"}`}>
              Show Yuppie 🎪
            </h2>
            <p className="text-tiny font-nunito font-bold uppercase tracking-widest opacity-70">
              Domingo, 22 de Março de 2026
            </p>
          </div>

          <div className="mb-xl">
            <p className="text-body font-nunito italic mb-xs opacity-80">O festival de:</p>
            <h3 className={`text-[32px] font-fredoka font-bold leading-tight ${template === "neon" ? "text-[var(--yp-pink)]" : "text-lilac-dk"}`}>
              {nickname}
            </h3>
          </div>

          <div className="flex-1 flex flex-col gap-md overflow-hidden">
            <p className="text-tiny font-nunito font-bold uppercase tracking-wider opacity-60">Eu estava lá:</p>
            <div className="flex flex-col gap-sm overflow-hidden">
              {myShows.slice(0, 8).map(show => (
                <div key={show.id} className="flex items-center gap-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-lilac" />
                  <div className="flex-1 min-w-0">
                    <p className="font-fredoka font-semibold truncate">{show.artist}</p>
                    <p className="text-[10px] font-nunito opacity-70">
                      {STAGES.find(s => s.id === show.stage)?.emoji} {show.start}
                    </p>
                  </div>
                </div>
              ))}
              {myShows.length > 8 && (
                <p className="text-tiny font-nunito italic opacity-60">+ {myShows.length - 8} outros shows!</p>
              )}
            </div>
          </div>

          <div className={`mt-auto p-md rounded-lg border-2 ${template === "neon" ? "bg-[#1F1225]/70 border-white/20" : "bg-bg-el border-border"} backdrop-blur-md`}>
            <div className="grid grid-cols-2 gap-md">
              <div className="flex flex-col items-center text-center">
                <div className="mb-xs text-[18px]">⏰</div>
                <p className="text-[20px] font-fredoka font-bold">{stats.count}</p>
                <p className="text-[10px] font-nunito uppercase font-bold opacity-60">Shows vistos</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-xs text-[18px]">📍</div>
                <p className="text-[20px] font-fredoka font-bold truncate w-full px-xs">
                  {topStage?.name.split(' ')[1] || "Vários"}
                </p>
                <p className="text-[10px] font-nunito uppercase font-bold opacity-60">Palco Favorito</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[360px] flex gap-md">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex-1 h-11 bg-lilac border-2 border-lilac text-white font-nunito font-bold rounded-md active:scale-95 transition-all disabled:opacity-50"
          aria-label="Salvar imagem"
        >
          {isGenerating ? "Gerando..." : "📸 Salvar imagem"}
        </button>
        <button
          onClick={handleShare}
          className="w-11 h-11 bg-bg-el border-2 border-border rounded-md text-text active:scale-95 transition-all flex items-center justify-center"
          aria-label="Compartilhar"
        >
          📲
        </button>
      </div>

      {toast && (
        <div role="status" aria-live="polite" className="fixed top-[84px] left-1/2 -translate-x-1/2 bg-mint border-2 border-mint rounded-md px-4 py-2 text-mint-dk font-nunito font-bold z-[120]">
          {toast}
        </div>
      )}
    </main>
  );
}

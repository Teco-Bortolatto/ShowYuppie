"use client";

import { useState, useEffect, use } from "react";
import { SHOWS, STAGES, Show } from "@/data/lineup";
import { ChevronLeft, Download, Share2, Sparkles, Music, Clock, MapPin } from "lucide-react";
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
    hours: myShows.length * 0.75, // Simplified
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
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado! 🔗");
    }
  };

  const templateStyles = {
    dreamy: "bg-gradient-to-b from-lilac-lt via-pink-lt to-bg text-text",
    neon: "bg-gradient-to-b from-[#1a1a1a] to-[#2D2235] text-white",
    candy: "bg-gradient-to-br from-mint-lt via-yellow-lt to-peach-lt text-text",
  };

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center py-xl px-md gap-xl">
      <header className="w-full max-w-[400px] flex items-center justify-between">
        <Link href={`/festival/${id}`} className="p-sm rounded-md hover:bg-bg-sk transition-colors">
          <ChevronLeft size={24} className="text-text-sf" />
        </Link>
        <h1 className="text-h2 font-fredoka font-bold text-text">Meu Recap ✨</h1>
        <div className="w-10" />
      </header>

      {/* Template Toggles */}
      <div className="flex bg-bg-sk p-xs rounded-md gap-xs">
        {(["dreamy", "neon", "candy"] as Template[]).map(t => (
          <button
            key={t}
            onClick={() => setTemplate(t)}
            className={`px-md py-sm rounded-sm text-tiny font-nunito font-bold capitalize transition-all ${
              template === t ? "bg-lilac text-white shadow-sm" : "text-text-sf hover:bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* The Poster */}
      <div 
        id="recap-poster"
        className={`w-full max-w-[360px] aspect-[9/16] rounded-xl shadow-2xl p-xl flex flex-col gap-xl relative overflow-hidden ${templateStyles[template]}`}
      >
        {/* Decorations */}
        <div className="absolute top-10 right-10 opacity-20"><Music size={60} /></div>
        <div className="absolute bottom-20 left-10 opacity-20"><Sparkles size={80} /></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="text-center mb-xl">
            <h2 className={`text-h1 font-fredoka font-bold ${template === 'neon' ? 'text-lilac' : 'text-text'}`}>
              Show Yuppie 🎪
            </h2>
            <p className="text-tiny font-nunito font-bold uppercase tracking-widest opacity-70">
              Domingo, 22 de Março de 2026
            </p>
          </div>

          <div className="mb-xl">
            <p className="text-body font-nunito italic mb-xs opacity-80">O festival de:</p>
            <h3 className={`text-[32px] font-fredoka font-bold leading-tight ${template === 'neon' ? 'text-pink' : 'text-lilac-dk'}`}>
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

          <div className={`mt-auto p-md rounded-lg border-2 ${template === 'neon' ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/60'} backdrop-blur-md`}>
            <div className="grid grid-cols-2 gap-md">
              <div className="flex flex-col items-center text-center">
                <Clock size={20} className="mb-xs text-lilac" />
                <p className="text-[20px] font-fredoka font-bold">{stats.count}</p>
                <p className="text-[10px] font-nunito uppercase font-bold opacity-60">Shows vistos</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <MapPin size={20} className="mb-xs text-pink" />
                <p className="text-[20px] font-fredoka font-bold truncate w-full px-xs">
                  {topStage?.name.split(' ')[1] || "Vários"}
                </p>
                <p className="text-[10px] font-nunito uppercase font-bold opacity-60">Palco Favorito</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-[360px] flex gap-md">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex-1 bg-lilac text-white font-nunito font-bold py-md px-xl rounded-md bounce-hover flex items-center justify-center gap-sm disabled:opacity-50"
        >
          <Download size={20} />
          {isGenerating ? "Gerando..." : "Salvar imagem"}
        </button>
        <button
          onClick={handleShare}
          className="bg-white border-2 border-border p-md rounded-md bounce-hover text-text-sf"
        >
          <Share2 size={24} />
        </button>
      </div>
    </main>
  );
}

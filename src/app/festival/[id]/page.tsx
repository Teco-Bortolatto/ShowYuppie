"use client";

import { use, useEffect, useState } from "react";
import { Board } from "@/components/Board";
import { NicknameModal } from "@/components/NicknameModal";
import { RankingModal } from "@/components/RankingModal";
import { RecapModal } from "@/components/RecapModal";
import { Link as LinkIcon, ChevronLeft, Clapperboard, Settings, Trash2, X } from "lucide-react";
import Link from "next/link";

interface FestivalPageProps {
  params: Promise<{ id: string }>;
}

export default function FestivalPage({ params }: FestivalPageProps) {
  const { id } = use(params);
  const [festivalName, setFestivalName] = useState("Lollapalooza 2026 🤘");
  const [toast, setToast] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isRecapOpen, setIsRecapOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [votes, setVotes] = useState<any>({});

  useEffect(() => {
    const savedName = localStorage.getItem("user_nickname");
    if (savedName) setNickname(savedName);

    const savedFestival = localStorage.getItem(`festival_${id}`);
    if (savedFestival) {
      const data = JSON.parse(savedFestival);
      setFestivalName(data.name);
    }

    const savedVotes = localStorage.getItem(`festival_votes_${id}`);
    if (savedVotes) setVotes(JSON.parse(savedVotes));

    const handleStorageChange = () => {
      const updatedVotes = localStorage.getItem(`festival_votes_${id}`);
      if (updatedVotes) setVotes(JSON.parse(updatedVotes));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("🔗 Link copiado!");
    } catch {
      setToast("Hmm, não deu pra copiar 😵");
    }
    setTimeout(() => setToast(null), 2200);
  };

  const clearVotes = () => {
    if (confirm("Tem certeza que quer limpar TODOS os seus votos? 🥺 (Heurística #5)")) {
      localStorage.removeItem(`festival_votes_${id}`);
      setVotes({});
      setIsSettingsOpen(false);
      window.location.reload();
    }
  };

  return (
    <main className="h-screen bg-bg flex flex-col overflow-hidden safe-pt safe-pb">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b-1.5 border-border px-6 py-5 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-sm rounded-full hover:bg-bg-sk transition-colors active:scale-90">
            <ChevronLeft size={20} className="text-text-sf" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-body font-fredoka font-bold text-text truncate max-w-[140px] md:max-w-md">
              {festivalName}
            </h1>
            <p className="text-[10px] font-nunito text-text-sf uppercase font-bold tracking-widest">
              Lollapalooza 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-sm rounded-full bg-bg-sk text-text-sf hover:scale-110 active:scale-95 transition-all"
            title="Configurações"
            aria-label="Configurações"
          >
            <Settings size={20} />
          </button>

          <button
            onClick={() => setIsRecapOpen(true)}
            className="p-sm rounded-full bg-pink-lt text-pink-dk hover:scale-110 active:scale-95 transition-all"
            title="Recap"
            aria-label="Recap"
          >
            <Clapperboard size={20} />
          </button>

          <button
            onClick={() => {
              const currentVotes = localStorage.getItem(`festival_votes_${id}`);
              if (currentVotes) setVotes(JSON.parse(currentVotes));
              setIsRankingOpen(true);
            }}
            className="p-sm rounded-full bg-yellow-lt text-yellow-dk hover:scale-110 active:scale-95 transition-all"
            title="Ranking"
            aria-label="Ranking"
          >
            <span className="text-[18px] leading-none">🏆</span>
          </button>

          <button
            onClick={copyLink}
            className="p-sm rounded-full bg-lilac-lt text-lilac-dk hover:scale-110 active:scale-95 transition-all"
            title="Compartilhar"
            aria-label="Compartilhar"
          >
            <LinkIcon size={20} />
          </button>
        </div>
      </header>

      {/* Settings Menu (Heuristic #3) */}
      {isSettingsOpen && (
        <div className="absolute top-[72px] right-4 bg-white border-2 border-border rounded-xl shadow-xl z-50 p-md animate-bounce-in w-[200px]">
          <div className="flex items-center justify-between mb-sm pb-xs border-b border-border">
            <span className="font-fredoka font-bold text-text text-sm">Ações</span>
            <button onClick={() => setIsSettingsOpen(false)}><X size={14} /></button>
          </div>
          <button 
            onClick={clearVotes}
            className="w-full flex items-center gap-sm p-sm rounded-md text-pink-dk hover:bg-pink-lt/30 transition-colors text-sm font-nunito font-bold"
          >
            <Trash2 size={16} />
            Limpar Votos
          </button>
        </div>
      )}

      {/* Board with Timeline labels */}
      <div className="flex-1 flex flex-row gap-0 overflow-hidden relative">
        {/* Timeline Labels */}
        <div className="w-[44px] flex flex-col pt-[52px] bg-bg-sk/50 border-r border-border/50 text-center sticky left-0 z-20 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-[80px] text-[10px] font-nunito text-text-mt font-bold pt-1">
              {12 + i}h
            </div>
          ))}
        </div>

        {/* The Board */}
        <Board />
      </div>

      <NicknameModal onSave={setNickname} />

      {isRankingOpen && (
        <RankingModal 
          votes={votes} 
          onClose={() => setIsRankingOpen(false)} 
        />
      )}

      {isRecapOpen && (
        <RecapModal 
          festivalId={id} 
          onClose={() => setIsRecapOpen(false)} 
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-[84px] left-1/2 -translate-x-1/2 bg-lilac text-white rounded-md px-lg py-sm font-nunito font-bold animate-bounce-in z-[120] shadow-lg"
        >
          {toast}
        </div>
      )}
    </main>
  );
}

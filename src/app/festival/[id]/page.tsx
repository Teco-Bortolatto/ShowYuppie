"use client";

import { use, useEffect, useState } from "react";
import { Board } from "@/components/Board";
import { NicknameModal } from "@/components/NicknameModal";
import { RecapModal } from "@/components/RecapModal";
import Link from "next/link";

interface FestivalPageProps {
  params: Promise<{ id: string }>;
}

export default function FestivalPage({ params }: FestivalPageProps) {
  const { id } = use(params);
  const [festivalName, setFestivalName] = useState("Lollapalooza 2026 🤘");
  const [toast, setToast] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [isRecapOpen, setIsRecapOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("user_nickname");
    if (savedName) setNickname(savedName);

    const savedFestival = localStorage.getItem(`festival_${id}`);
    if (savedFestival) {
      const data = JSON.parse(savedFestival);
      setFestivalName(data.name);
    }
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

  return (
    <main className="h-screen bg-bg flex flex-col overflow-hidden safe-pt safe-pb">
      {/* Header */}
      <header className="bg-bg-el border-b-2 border-border px-6 py-5 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-11 h-11 rounded-full bg-bg-sk border-2 border-border flex items-center justify-center text-text hover:bg-bg-el active:scale-95 transition-all" aria-label="Voltar">
            ⬅️
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
            onClick={() => setIsRecapOpen(true)}
            className="w-11 h-11 rounded-full bg-pink-lt border-2 border-pink text-pink-dk hover:bg-pink active:scale-95 transition-all flex items-center justify-center"
            title="Recap"
            aria-label="Recap"
          >
            🎬
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className="w-11 h-11 rounded-full bg-lilac-lt border-2 border-lilac text-lilac-dk hover:bg-pink-lt active:scale-95 transition-all flex items-center justify-center"
            title="Compartilhar"
            aria-label="Compartilhar"
          >
            🔗
          </button>
        </div>
      </header>

      {/* Board with Timeline labels */}
      <div className="flex-1 flex flex-row gap-0 overflow-hidden relative">
        {/* Timeline Labels */}
        <div className="w-[44px] flex flex-col pt-[52px] bg-bg-sk border-r border-border text-center sticky left-0 z-20 pointer-events-none">
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

      {isRecapOpen && (
        <RecapModal 
          festivalId={id} 
          onClose={() => setIsRecapOpen(false)} 
        />
      )}

      {isShareOpen && (
        <div className="fixed inset-0 z-[120] bg-bg flex items-end justify-center p-4">
          <div
            className="w-full max-w-[420px] border-2 rounded-xl p-4 animate-bounce-in shadow-2xl"
            style={{ backgroundColor: "var(--yp-surface)", borderColor: "var(--yp-lilac)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="text-h3 font-fredoka font-bold text-text">
                  🔗 Chama a galera
                </div>
                <div className="text-small font-nunito text-text-sf">
                  Copia o link e manda no grupo pra todo mundo votar junto
                </div>
              </div>
              <button
                onClick={() => setIsShareOpen(false)}
                className="w-11 h-11 rounded-full border-2 bg-bg-el text-text flex items-center justify-center active:scale-95 transition-all"
                style={{ borderColor: "var(--yp-lilac)" }}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <input
                readOnly
                value={typeof window !== "undefined" ? window.location.href : ""}
                className="w-full bg-bg-el border-2 rounded-md px-3 py-3 text-small font-nunito text-text"
                style={{ borderColor: "var(--yp-lilac)" }}
                aria-label="Link do festival"
              />
              <div className="flex gap-3">
                <button
                  onClick={copyLink}
                  className="flex-1 bg-lilac text-white border-2 rounded-md py-3 text-body font-nunito font-bold active:scale-95 transition-all"
                  style={{ borderColor: "var(--yp-lilac)" }}
                >
                  Link convite 🔗
                </button>
                <button
                  onClick={() => setIsShareOpen(false)}
                  className="flex-1 bg-bg-el border-2 text-lilac-dk rounded-md py-3 text-body font-nunito font-bold active:scale-95 transition-all"
                  style={{ borderColor: "var(--yp-lilac)" }}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
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

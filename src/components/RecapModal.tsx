"use client";

import { useEffect, useState } from "react";
import { SHOWS, STAGES } from "@/data/lineup";
import { useRouter } from "next/navigation";

export function RecapModal({ 
  festivalId, 
  onClose 
}: { 
  festivalId: string; 
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [selectedShows, setSelectedShows] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const nickname = localStorage.getItem("user_nickname");
    const votes = JSON.parse(localStorage.getItem(`festival_votes_${festivalId}`) || "{}");
    const preSelected = SHOWS.filter((s) =>
      votes[s.id]?.some((v: any) => v.nickname === nickname && v.type === "vou")
    ).map((s) => s.id);
    setSelectedShows(preSelected);
  }, [festivalId]);

  const handleToggle = (id: number) => {
    setSelectedShows(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    localStorage.setItem(`festival_attended_${festivalId}`, JSON.stringify(selectedShows));
    router.push(`/festival/${festivalId}/recap`);
  };

  return (
    <div className="fixed inset-0 bg-bg z-[100] flex items-center justify-center p-xl">
      <div className="bg-bg-el border-2 border-lilac rounded-xl w-full max-w-[500px] shadow-2xl animate-bounce-in flex flex-col max-h-[80vh] overflow-hidden">
        
        {step === 1 ? (
          <div className="p-xl flex flex-col gap-lg items-center text-center">
            <div className="w-20 h-20 bg-pink-lt border-2 border-pink rounded-full flex items-center justify-center text-[28px]">
              🎬
            </div>
            <div className="flex flex-col gap-sm">
              <h2 className="text-h1 font-fredoka font-bold text-text">
                Acabou o show? 🥺
              </h2>
              <p className="text-body font-nunito text-text-sf">
                Tem certeza? Isso vai encerrar o festival pra todo mundo (pelo menos no seu recap)!
              </p>
            </div>
            <div className="flex gap-md w-full">
              <button 
                onClick={onClose}
                className="flex-1 h-11 bg-bg-sk border-2 border-border rounded-md font-nunito font-bold text-text active:scale-95 transition-all"
              >
                Ainda não!
              </button>
              <button 
                onClick={() => setStep(2)}
                className="flex-1 h-11 bg-lilac border-2 border-lilac text-white rounded-md font-nunito font-bold active:scale-95 transition-all"
              >
                Acabou sim 🫡
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="p-xl border-b border-border bg-bg-sk flex items-center justify-between">
              <h2 className="text-h2 font-fredoka font-bold text-text">
                Onde você estava? 🎵
              </h2>
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full border-2 border-border bg-bg-el text-text flex items-center justify-center active:scale-95 transition-all"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-xl flex flex-col gap-sm custom-scrollbar">
              <p className="text-small font-nunito text-text-sf mb-md">
                Marca os shows que você REALMENTE foi! Seus votos de "Vou!" já estão marcados.
              </p>
              {SHOWS.map(show => {
                const stage = STAGES.find(s => s.id === show.stage);
                const isSelected = selectedShows.includes(show.id);
                return (
                  <button
                    key={show.id}
                    onClick={() => handleToggle(show.id)}
                    className={`flex items-center gap-md p-md rounded-lg border-2 transition-all text-left ${
                      isSelected ? "bg-bg-el border-lilac scale-[1.02]" : "bg-bg-sk border-border opacity-90"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-md flex items-center justify-center transition-all border-2 ${
                      isSelected ? "bg-lilac text-white border-lilac" : "bg-bg-el border-border text-text"
                    }`}>
                      {isSelected ? "✅" : ""}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-fredoka font-semibold text-text truncate">{show.artist}</p>
                      <p className="text-tiny font-nunito text-text-sf">
                        {stage?.emoji} {stage?.name} • {show.start}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-xl border-t border-border bg-bg-sk">
              <button 
                onClick={handleFinish}
                className="w-full h-11 bg-lilac border-2 border-lilac text-white rounded-md font-nunito font-bold active:scale-95 transition-all"
              >
                Gerar minha arte ✨
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

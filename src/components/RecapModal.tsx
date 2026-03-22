"use client";

import { useState } from "react";
import { SHOWS, STAGES, Show } from "@/data/lineup";
import { X, Check, Music } from "lucide-react";
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

  useState(() => {
    const nickname = localStorage.getItem("user_nickname");
    const votes = JSON.parse(localStorage.getItem(`festival_votes_${festivalId}`) || "{}");
    const preSelected = SHOWS.filter(s => 
      votes[s.id]?.some((v: any) => v.nickname === nickname && v.type === "vou")
    ).map(s => s.id);
    setSelectedShows(preSelected);
  });

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
    <div className="fixed inset-0 bg-text/40 backdrop-blur-sm z-[100] flex items-center justify-center p-xl">
      <div className="bg-bg-el border-2 border-border rounded-xl w-full max-w-[500px] shadow-lg animate-bounce-in flex flex-col max-h-[80vh]">
        
        {step === 1 ? (
          <div className="p-xl flex flex-col gap-lg items-center text-center">
            <div className="w-2xl h-2xl bg-pink-lt rounded-full flex items-center justify-center text-pink-dk animate-pulse">
              <Music size={40} />
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
                className="flex-1 bg-bg-sk border-1.5 border-border py-md px-xl rounded-md font-nunito font-bold text-text-sf bounce-hover"
              >
                Ainda não!
              </button>
              <button 
                onClick={() => setStep(2)}
                className="flex-1 bg-pink text-white py-md px-xl rounded-md font-nunito font-bold bounce-hover"
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
              <button onClick={onClose} className="p-xs text-text-mt hover:text-text-sf transition-colors">
                <X size={24} />
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
                      isSelected ? "bg-white border-lilac scale-[1.02]" : "bg-bg-sk border-border opacity-70"
                    }`}
                  >
                    <div className={`w-xl h-xl rounded-md flex items-center justify-center transition-all ${
                      isSelected ? "bg-lilac text-white" : "bg-white border border-border"
                    }`}>
                      {isSelected && <Check size={20} />}
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
                className="w-full bg-lilac text-white py-[14px] px-xl rounded-md font-nunito font-bold bounce-hover flex items-center justify-center gap-sm"
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

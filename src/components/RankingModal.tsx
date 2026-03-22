"use client";

import { SHOWS, STAGES } from "@/data/lineup";
import { X, AlertTriangle } from "lucide-react";

interface Vote {
  nickname: string;
  type: "vou" | "curtia" | "meh" | null;
}

interface FestivalVotes {
  [showId: number]: Vote[];
}

export function RankingModal({ 
  votes, 
  onClose 
}: { 
  votes: FestivalVotes; 
  onClose: () => void;
}) {
  const getScore = (type: string | null) => {
    if (type === "vou") return 3;
    if (type === "curtia") return 2;
    if (type === "meh") return 1;
    return 0;
  };

  const rankedShows = SHOWS.map(show => {
    const showVotes = votes[show.id] || [];
    const totalScore = showVotes.reduce((acc, v) => acc + getScore(v.type), 0);
    const voteCount = showVotes.filter(v => v.type).length;
    return { ...show, totalScore, voteCount };
  }).sort((a, b) => b.totalScore - a.totalScore);

  const checkConflict = (showId: number) => {
    const show = SHOWS.find(s => s.id === showId)!;
    const sameTimeShows = SHOWS.filter(s => s.id !== showId && s.start === show.start);
    return sameTimeShows.length > 0;
  };

  return (
    <div className="fixed inset-0 bg-text/40 backdrop-blur-sm z-[100] flex items-center justify-center p-xl">
      <div className="bg-bg-el border-2 border-border rounded-xl w-full max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col shadow-lg animate-bounce-in">
        <div className="p-xl border-b border-border flex items-center justify-between bg-bg-sk">
          <div className="flex items-center gap-sm">
            <span className="text-[20px]">🏆</span>
            <h2 className="text-h1 font-fredoka font-semibold text-text">
              Ranking da Galera 🏆
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-sm rounded-md hover:bg-white transition-colors text-text-sf"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-xl custom-scrollbar">
          <div className="flex flex-col gap-md">
            {rankedShows.map((show, index) => {
              const stage = STAGES.find(s => s.id === show.stage);
              const isTop3 = index < 3;
              const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;
              const hasConflict = checkConflict(show.id);

              return (
                <div 
                  key={show.id}
                  className={`flex items-center gap-md p-md rounded-lg border-2 transition-all ${
                    isTop3 ? "bg-white border-lilac-lt scale-[1.02]" : "bg-bg-sk border-border"
                  }`}
                >
                  <div className={`w-xl h-xl flex items-center justify-center font-fredoka font-bold text-lg ${
                    index === 0 ? "text-yellow-dk" : index === 1 ? "text-text-sf" : index === 2 ? "text-peach-dk" : "text-text-mt"
                  }`}>
                    {medal || index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-xs">
                      <h3 className="font-fredoka font-semibold text-text truncate">
                        {show.artist}
                      </h3>
                      {hasConflict && (
                        <span title="Conflito de horário">
                          <AlertTriangle size={14} className="text-yellow-dk flex-shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-tiny font-nunito text-text-sf flex items-center gap-xs">
                      {stage?.emoji} {stage?.name} • {show.start}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-h3 font-fredoka font-bold text-lilac-dk">
                      {show.totalScore} pts
                    </div>
                    <div className="text-tiny font-nunito text-text-mt uppercase font-bold tracking-wider">
                      {show.voteCount} votos
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

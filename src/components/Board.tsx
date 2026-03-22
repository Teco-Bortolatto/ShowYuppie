"use client";

import { useState, useEffect, useRef } from "react";
import { STAGES, SHOWS, Show, Stage } from "@/data/lineup";
import { ArtistPopover } from "@/components/ArtistPopover";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useParams } from "next/navigation";
import { HelpCircle } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type VoteType = "vou" | "curtia" | "meh" | null;

interface Vote {
  nickname: string;
  type: VoteType;
}

interface FestivalVotes {
  [showId: number]: Vote[];
}

export function ShowCard({ 
  show, 
  index, 
  allVotes, 
  onVote,
  isLeader,
}: { 
  show: Show; 
  index: number; 
  allVotes: FestivalVotes;
  onVote: (showId: number, type: VoteType) => void;
  isLeader: boolean;
}) {
  const stage = STAGES.find((s: Stage) => s.id === show.stage);
  const [nickname, setNickname] = useState<string | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setNickname(localStorage.getItem("user_nickname"));
  }, []);

  useEffect(() => {
    if (!isPopoverOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (popoverWrapRef.current && popoverWrapRef.current.contains(target)) return;
      setIsPopoverOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => document.removeEventListener("pointerdown", onPointerDown, { capture: true } as any);
  }, [isPopoverOpen]);

  if (!stage) return null;

  const showVotes = allVotes[show.id] || [];
  const myVote = showVotes.find(v => v.nickname === nickname)?.type || null;

  // Calculate position/height
  const startParts = show.start.split(":").map(Number);
  const endParts = show.end.split(":").map(Number);
  const durationInMinutes = (endParts[0] * 60 + endParts[1]) - (startParts[0] * 60 + startParts[1]);
  const height = (durationInMinutes / 60) * 80;
  const top = ((startParts[0] - 12) * 60 + startParts[1]) / 60 * 80;

  const handleVote = (type: VoteType) => {
    const newType = myVote === type ? null : type;
    onVote(show.id, newType);
    if (newType) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 600);
    }
  };

  const groupedVotes = showVotes.reduce((acc, v) => {
    if (v.type) {
      if (!acc[v.type]) acc[v.type] = [];
      acc[v.type].push(v.nickname);
    }
    return acc;
  }, {} as Record<string, string[]>);

  const formatNames = (names: string[]) => {
    const sliced = names.slice(0, 2);
    const suffix = names.length > 2 ? ` +${names.length - 2}` : "";
    return `${sliced.join(", ")}${suffix}`;
  };

  const voteSummaryParts: string[] = [];
  if (groupedVotes.vou?.length) voteSummaryParts.push(`🤩 ${formatNames(groupedVotes.vou)}`);
  if (groupedVotes.curtia?.length) voteSummaryParts.push(`😊 ${formatNames(groupedVotes.curtia)}`);
  if (groupedVotes.meh?.length) voteSummaryParts.push(`😐 ${formatNames(groupedVotes.meh)}`);
  const voteSummary = voteSummaryParts.join(" · ");

  return (
    <div
      className={cn(
        "absolute w-[calc(100%-12px)] left-[6px] border-2 rounded-lg p-2 transition-all bounce-hover animate-bounce-in shadow-md flex flex-col gap-1",
        "hover:translate-y-[-2px] hover:border-lilac z-10",
        isExploding && "scale-105",
        isLeader && "shadow-xl"
      )}
      style={{
        top: `${top}px`,
        minHeight: `${height}px`,
        backgroundColor: isLeader ? stage.bgColor : "var(--bg-el)",
        borderColor: stage.color,
        borderWidth: isLeader ? 3 : 2,
        borderLeftWidth: isLeader ? 8 : 6,
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex flex-col justify-between overflow-visible relative min-h-[40px]">
        <div ref={popoverWrapRef} className="absolute -top-1 -right-1">
          <button 
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="p-1 text-text-mt hover:text-lilac transition-colors"
            aria-label="Sobre o artista"
          >
            <HelpCircle size={14} />
          </button>

          {isPopoverOpen && (
            <ArtistPopover show={show} onClose={() => setIsPopoverOpen(false)} />
          )}
        </div>

        <h3 className="text-tiny font-fredoka font-bold text-text leading-tight truncate pr-4">
          {show.artist}
        </h3>
        <div className="flex items-center gap-1">
          <p className="text-[10px] font-nunito text-text-sf">
            {show.start}
          </p>
        </div>
      </div>

      {/* Vote Buttons - More compact for mobile */}
      <div className="flex gap-1 mt-auto">
        <button
          onClick={() => handleVote("vou")}
          className={cn(
            "flex-1 py-1 px-0 rounded-sm text-[10px] font-nunito font-bold transition-all active:scale-95 border border-border",
            myVote === "vou" ? "bg-mint-lt text-mint-dk border-mint" : "bg-white text-text-sf"
          )}
        >
          🤩
        </button>
        <button
          onClick={() => handleVote("curtia")}
          className={cn(
            "flex-1 py-1 px-0 rounded-sm text-[10px] font-nunito font-bold transition-all active:scale-95 border border-border",
            myVote === "curtia" ? "bg-yellow-lt text-yellow-dk border-yellow" : "bg-white text-text-sf"
          )}
        >
          😊
        </button>
        <button
          onClick={() => handleVote("meh")}
          className={cn(
            "flex-1 py-1 px-0 rounded-sm text-[10px] font-nunito font-bold transition-all active:scale-95 border border-border",
            myVote === "meh" ? "bg-bg-sk text-text-mt border-border" : "bg-white text-text-sf"
          )}
        >
          😐
        </button>
      </div>

      {/* Who Voted - Minimal for mobile */}
      {showVotes.length > 0 && (
        <div className="mt-1">
          <div className="flex -space-x-1">
            {showVotes.slice(0, 3).map((v, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-4 h-4 rounded-full border border-white flex items-center justify-center text-[8px] font-bold shadow-sm",
                  v.type === "vou"
                    ? "bg-mint-lt text-mint-dk border-mint"
                    : v.type === "curtia"
                      ? "bg-yellow-lt text-yellow-dk border-yellow"
                      : "bg-bg-sk text-text-sf border-border"
                )}
                title={v.nickname}
              >
                {v.nickname.trim().slice(0, 1)}
              </div>
            ))}
            {showVotes.length > 3 && (
              <div className="w-4 h-4 rounded-full border border-white bg-bg-sk flex items-center justify-center text-[8px] font-bold text-text-sf">
                +{showVotes.length - 3}
              </div>
            )}
          </div>
          {voteSummary && (
            <div className="text-[9px] font-nunito text-text-sf leading-tight mt-1">
              {voteSummary}
            </div>
          )}
        </div>
      )}

      {/* Explosion Effect */}
      {isExploding && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl animate-ping">
            {myVote === "vou" ? "🤩" : myVote === "curtia" ? "😊" : "😐"}
          </span>
        </div>
      )}
    </div>
  );
}

export function StageColumn({ 
  stage, 
  allVotes, 
  onVote,
  leaderShowIds,
}: { 
  stage: Stage; 
  allVotes: FestivalVotes;
  onVote: (showId: number, type: VoteType) => void;
  leaderShowIds: Set<number>;
}) {
  const stageShows = SHOWS.filter((s: Show) => s.stage === stage.id);

  return (
    <div className="flex-shrink-0 w-[80vw] snap-center flex flex-col h-full border-r border-border/50">
      <div
        className="h-[52px] flex items-center justify-center gap-sm px-md py-sm sticky top-0 z-30"
        style={{ backgroundColor: stage.color }}
      >
        <span className="text-[18px]">{stage.emoji}</span>
        <h2 className="text-body font-fredoka font-bold text-text truncate">
          {stage.name.split(' ').slice(1).join(' ')}
        </h2>
      </div>

      <div
        className="relative min-h-[960px] flex-1"
        style={{ backgroundColor: stage.bgColor }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-border/30 pointer-events-none"
            style={{ top: `${i * 80}px`, height: "80px" }}
          />
        ))}

        {stageShows.map((show: Show, index: number) => (
          <ShowCard 
            key={show.id} 
            show={show} 
            index={index} 
            allVotes={allVotes}
            onVote={onVote}
            isLeader={leaderShowIds.has(show.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function Board() {
  const params = useParams();
  const festivalId = params.id as string;
  const [votes, setVotes] = useState<FestivalVotes>({});
  const [conflictToast, setConflictToast] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // For demo, let's say it's 16:30
    setCurrentTime(((16 - 12) * 60 + 30) / 60 * 80);

    const saved = localStorage.getItem(`festival_votes_${festivalId}`);
    if (saved) {
      const parsed = JSON.parse(saved) as FestivalVotes;
      const total = Object.values(parsed).reduce((acc, arr) => acc + (arr?.length || 0), 0);
      if (total > 0) {
        setVotes(parsed);
        return;
      }
    } else {
      // Mock initial votes for demo
      const mockUsers = [
        { name: "Juh ✨", style: "vou" as VoteType },
        { name: "Pedrão 🤘", style: "curtia" as VoteType },
        { name: "Mari 🌸", style: "vou" as VoteType }
      ];
      
      const initialMockVotes: FestivalVotes = {};
      SHOWS.forEach(show => {
        // Randomly assign votes to about 60% of shows
        if (Math.random() > 0.4) {
          const votersCount = Math.floor(Math.random() * 3) + 1;
          const voters = [...mockUsers].sort(() => 0.5 - Math.random()).slice(0, votersCount);
          initialMockVotes[show.id] = voters.map(v => ({ 
            nickname: v.name, 
            type: Math.random() > 0.3 ? v.style : (Math.random() > 0.5 ? "curtia" : "meh") as VoteType
          }));
        }
      });
      setVotes(initialMockVotes);
      localStorage.setItem(`festival_votes_${festivalId}`, JSON.stringify(initialMockVotes));
      return;
    }

    const mockUsers = [
      { name: "Juh ✨", style: "vou" as VoteType },
      { name: "Pedrão 🤘", style: "curtia" as VoteType },
      { name: "Mari 🌸", style: "vou" as VoteType }
    ];
    const initialMockVotes: FestivalVotes = {};
    SHOWS.forEach(show => {
      if (Math.random() > 0.4) {
        const votersCount = Math.floor(Math.random() * 3) + 1;
        const voters = [...mockUsers].sort(() => 0.5 - Math.random()).slice(0, votersCount);
        initialMockVotes[show.id] = voters.map(v => ({ 
          nickname: v.name, 
          type: Math.random() > 0.3 ? v.style : (Math.random() > 0.5 ? "curtia" : "meh") as VoteType
        }));
      }
    });
    setVotes(initialMockVotes);
    localStorage.setItem(`festival_votes_${festivalId}`, JSON.stringify(initialMockVotes));
  }, [festivalId]);

  const handleVote = (showId: number, type: VoteType) => {
    const nickname = localStorage.getItem("user_nickname");
    if (!nickname) return;

    setVotes(prev => {
      const newVotes = { ...prev };
      if (!newVotes[showId]) newVotes[showId] = [];
      
      const userVoteIndex = newVotes[showId].findIndex(v => v.nickname === nickname);
      
      if (userVoteIndex > -1) {
        if (type === null) {
          newVotes[showId].splice(userVoteIndex, 1);
        } else {
          newVotes[showId][userVoteIndex].type = type;
        }
      } else if (type !== null) {
        newVotes[showId].push({ nickname, type });
      }

      localStorage.setItem(`festival_votes_${festivalId}`, JSON.stringify(newVotes));
      
      // Check for conflicts
      if (type === "vou") {
        checkConflicts(showId, nickname, newVotes);
      }

      return newVotes;
    });
  };

  const checkConflicts = (newShowId: number, nickname: string, currentVotes: FestivalVotes) => {
    const newShow = SHOWS.find(s => s.id === newShowId)!;
    const myVouShows = SHOWS.filter(s => 
      s.id !== newShowId && 
      currentVotes[s.id]?.some(v => v.nickname === nickname && v.type === "vou")
    );

    const parseTime = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const newStart = parseTime(newShow.start);
    const newEnd = parseTime(newShow.end);

    const conflict = myVouShows.find(s => {
      const sStart = parseTime(s.start);
      const sEnd = parseTime(s.end);
      return (newStart < sEnd && newEnd > sStart);
    });

    if (conflict) {
      setConflictToast(`Opa, ${newShow.artist} e ${conflict.artist} são no mesmo horário! 😱 Bora ver o que a galera votou?`);
      setTimeout(() => setConflictToast(null), 4000);
    }
  };

  const getScore = (type: VoteType) => {
    if (type === "vou") return 3;
    if (type === "curtia") return 2;
    if (type === "meh") return 1;
    return 0;
  };

  const showScores = SHOWS.map((show) => {
    const showVotes = votes[show.id] || [];
    return showVotes.reduce((acc, v) => acc + getScore(v.type), 0);
  });
  const maxScore = showScores.length ? Math.max(...showScores) : 0;
  const leaderShowIds = new Set<number>(
    maxScore > 0
      ? SHOWS.filter((show) => (votes[show.id] || []).reduce((acc, v) => acc + getScore(v.type), 0) === maxScore).map(
          (s) => s.id
        )
      : []
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      {conflictToast && (
        <div 
          onClick={() => setConflictToast(null)}
          className="bg-pink-lt border-2 border-pink border-t-0 rounded-b-xl px-md py-sm text-pink-dk font-nunito font-bold text-center animate-bounce-in cursor-pointer z-[60] mx-auto max-w-[90%] mb-2 shadow-md text-xs"
        >
          {conflictToast}
        </div>
      )}
      
      <div className="flex-1 overflow-x-auto snap-x-mandatory scroll-smooth pb-10 custom-scrollbar relative">
        {/* Current Time Indicator (Heuristic #1) */}
        <div 
          className="absolute left-0 right-0 border-t-2 border-pink z-40 pointer-events-none flex items-center"
          style={{ top: `${currentTime + 52}px` }}
        >
          <span className="bg-pink text-white text-[8px] font-bold px-1 rounded-r-sm">AGORA</span>
        </div>

        <div className="flex gap-0 min-w-max h-full">
          {STAGES.map((stage: Stage) => (
            <StageColumn 
              key={stage.id} 
              stage={stage} 
              allVotes={votes}
              onVote={handleVote}
              leaderShowIds={leaderShowIds}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

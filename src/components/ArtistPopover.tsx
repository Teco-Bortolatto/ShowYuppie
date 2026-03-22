"use client";

import { Show } from "@/data/lineup";

export function ArtistPopover({ 
  show, 
  onClose 
}: { 
  show: Show; 
  onClose: () => void;
}) {
  return (
    <div className="absolute top-2 right-2 z-[80] animate-bounce-in">
      <div className="bg-bg-el border-2 border-border rounded-lg p-3 shadow-2xl w-[240px] relative">
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-bg-el border-2 border-border rounded-full w-8 h-8 text-text hover:scale-110 active:scale-95 transition-transform shadow-md flex items-center justify-center"
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-col gap-1">
            <div className="bg-lilac-lt text-lilac-dk text-[9px] font-nunito font-bold px-2 py-[1px] rounded-full w-fit uppercase tracking-wider">
              {show.genre}
            </div>
            <h4 className="text-sm font-fredoka font-bold text-text">
              {show.artist}
            </h4>
          </div>

          <p className="text-[11px] font-nunito text-text-sf leading-tight">
            {show.bio}
          </p>

          <div className="flex gap-2 mt-1">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(show.artist)}+musica`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 bg-bg-sk border-2 border-border rounded-md py-2 text-[10px] font-nunito font-bold text-text hover:bg-pink-lt active:scale-95 transition-all"
            >
              🔍 Googlar
            </a>
            <a
              href={`https://open.spotify.com/search/${encodeURIComponent(show.artist)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 bg-bg-sk border-2 border-border rounded-md py-2 text-[10px] font-nunito font-bold text-text hover:bg-mint-lt active:scale-95 transition-all"
            >
              🎧 Ouvir
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

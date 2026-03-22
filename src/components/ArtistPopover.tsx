"use client";

import { Show } from "@/data/lineup";
import { X, Search, Headphones } from "lucide-react";

export function ArtistPopover({ 
  show, 
  onClose 
}: { 
  show: Show; 
  onClose: () => void;
}) {
  return (
    <div className="absolute top-2 right-2 z-[1] animate-bounce-in">
      <div className="bg-white border-2 border-lilac rounded-lg p-3 shadow-2xl w-[220px] relative z-[1]">
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white border-2 border-lilac rounded-full p-1 text-lilac-dk hover:scale-110 active:scale-90 transition-transform shadow-md"
        >
          <X size={12} />
        </button>

        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-col gap-1">
            <span className="bg-lilac-lt text-lilac-dk text-[9px] font-nunito font-bold px-2 py-[1px] rounded-full w-fit uppercase tracking-wider">
              {show.genre}
            </span>
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
              className="flex-1 flex items-center justify-center gap-1 bg-bg-sk border border-border rounded-md py-1.5 text-[10px] font-nunito font-bold text-text-sf hover:bg-white hover:border-lilac active:scale-95 transition-all"
            >
              <Search size={12} />
              Google
            </a>
            <a
              href={`https://open.spotify.com/search/${encodeURIComponent(show.artist)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 bg-bg-sk border border-border rounded-md py-1.5 text-[10px] font-nunito font-bold text-text-sf hover:bg-white hover:border-lilac active:scale-95 transition-all"
            >
              <Headphones size={12} />
              Spotify
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

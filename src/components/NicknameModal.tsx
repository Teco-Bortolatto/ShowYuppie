"use client";

import { useState, useEffect } from "react";

export function NicknameModal({ onSave }: { onSave: (name: string) => void }) {
  const [nickname, setNickname] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user_nickname");
    if (!saved) {
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      localStorage.setItem("user_nickname", nickname.trim());
      onSave(nickname.trim());
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-bg z-[100] flex items-center justify-center p-xl">
      <div className="bg-bg-el border-2 border-lilac rounded-xl p-xl w-full max-w-[400px] shadow-2xl animate-bounce-in">
        <h2 className="text-h1 font-fredoka font-semibold text-text mb-md text-center">
          Como a galera te chama? 🎤
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          <input
            type="text"
            autoFocus
            placeholder="Seu apelido fofo..."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="bg-bg-sk border-2 border-border rounded-md px-md h-[48px] font-nunito text-text focus:border-lilac outline-none"
            required
          />
          <button
            type="submit"
            className="bg-lilac border-2 border-lilac text-white font-nunito font-bold py-[14px] px-xl rounded-md active:scale-95 transition-all"
          >
            Bora! ✨
          </button>
        </form>
      </div>
    </div>
  );
}

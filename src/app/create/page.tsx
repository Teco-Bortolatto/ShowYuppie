"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

export default function CreateFestival() {
  const [name, setName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const createFestival = (festivalName: string) => {
    setShowToast(true);
    const id = nanoid(6).toUpperCase();
    const festivalData = {
      name: festivalName,
      createdAt: new Date().toISOString(),
      votes: {},
      status: "active"
    };
    localStorage.setItem(`festival_${id}`, JSON.stringify(festivalData));

    setTimeout(() => {
      router.push(`/festival/${id}`);
    }, 1500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createFestival(name.trim());
  };

  return (
    <main className="min-h-screen bg-bg-sk flex flex-col items-center justify-center p-xl relative overflow-hidden">
      <div className="absolute top-10 left-10 text-[28px]">✨</div>
      <div className="absolute bottom-20 right-10 text-[22px]">💖</div>
      <div className="absolute top-40 right-20 text-[34px]">🎶</div>

      <div className="bg-bg-el border-1.5 border-border rounded-xl p-xl w-full max-w-[400px] shadow-sm relative z-10">
        <h1 className="text-h1 font-fredoka font-semibold text-text mb-xl text-center">
          Novo Festival 🎪
        </h1>

        <form onSubmit={handleCreate} className="flex flex-col gap-lg">
          <div className="flex flex-col gap-sm">
            <label className="text-body font-nunito font-semibold text-text-sf">
              Nome do festival
            </label>
            <input
              type="text"
              placeholder="Lollapalooza 2026 🤘"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-bg-sk border-1.5 border-border rounded-md px-md h-[48px] font-nunito text-text focus:border-lilac focus:ring-3 focus:ring-lilac-lt outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-sm">
            <label className="text-body font-nunito font-semibold text-text-sf">
              Lineup (opcional)
            </label>
            <div 
              onClick={() => {
                if (!name.trim()) return;
                createFestival(name.trim());
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!name.trim()) return;
                  createFestival(name.trim());
                }
              }}
              className="border-2 border-dashed border-border rounded-md p-xl flex flex-col items-center justify-center gap-sm cursor-pointer hover:border-lilac hover:bg-lilac-lt transition-all"
              role="button"
              tabIndex={0}
              aria-label="Arrasta a lineup aqui (PDF, JPG ou link)"
            >
              <div className="text-[22px]">📎</div>
              <p className="text-body font-nunito text-text-sf text-center">
                Arrasta a lineup aqui
                <div className="text-tiny text-text-mt">(PDF, JPG ou link)</div>
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-lilac text-white font-nunito font-bold py-[14px] px-xl rounded-md bounce-hover mt-md"
          >
            Montar board ✨
          </button>
        </form>
      </div>

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-mint-lt border-2 border-mint rounded-md px-xl py-md text-mint-dk font-nunito font-bold animate-bounce-in z-50 shadow-lg">
          ✨ lineup carregada!
        </div>
      )}
    </main>
  );
}

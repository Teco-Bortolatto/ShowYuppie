"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { Upload, Star } from "lucide-react";

export default function CreateFestival() {
  const [name, setName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    // Simulate upload/creation
    setShowToast(true);
    const id = nanoid(6).toUpperCase();
    
    // In a real app, we'd save the name to localStorage here
    const festivalData = {
      name,
      createdAt: new Date().toISOString(),
      votes: {},
      status: "active"
    };
    localStorage.setItem(`festival_${id}`, JSON.stringify(festivalData));

    setTimeout(() => {
      router.push(`/festival/${id}`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-bg-sk flex flex-col items-center justify-center p-xl relative overflow-hidden">
      {/* Decorative stars */}
      <Star className="absolute top-10 left-10 text-lilac-lt animate-pulse" size={32} />
      <Star className="absolute bottom-20 right-10 text-pink-lt animate-pulse delay-150" size={24} />
      <Star className="absolute top-40 right-20 text-mint-lt animate-pulse delay-300" size={40} />

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
              onClick={handleCreate}
              className="border-2 border-dashed border-border rounded-md p-xl flex flex-col items-center justify-center gap-sm cursor-pointer hover:border-lilac hover:bg-lilac-lt/20 transition-all group"
            >
              <Upload className="text-text-mt group-hover:text-lilac transition-colors" size={24} />
              <p className="text-body font-nunito text-text-sf text-center">
                Arrasta a lineup aqui <br />
                <span className="text-tiny text-text-mt">(PDF, JPG ou link)</span>
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

      {/* Toast */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-mint-lt border-2 border-mint rounded-md px-xl py-md text-mint-dk font-nunito font-bold animate-bounce-in z-50 shadow-lg">
          ✨ lineup carregada!
        </div>
      )}
    </main>
  );
}

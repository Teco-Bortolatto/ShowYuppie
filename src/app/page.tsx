"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleEnterCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      router.push(`/festival/${code}`);
    }
  };

  return (
    <main className="min-h-screen bg-pattern flex flex-col items-center justify-center p-xl text-center">
      <header className="mb-2xl">
        <h1 className="text-[32px] font-fredoka font-bold text-text mb-sm flex items-center justify-center gap-xs">
          Show Yuppie <span className="text-[24px]">🎪</span>
        </h1>
        <p className="text-body font-nunito text-text-sf">
          monta a lineup dos seus sonhos com a galera
        </p>
      </header>

      <div className="flex flex-col gap-lg w-full max-w-[320px]">
        <Link
          href="/create"
          className="bg-lilac text-white font-nunito font-bold py-[14px] px-xl rounded-md bounce-hover flex items-center justify-center"
        >
          Criar festival ✨
        </Link>

        <div className="flex flex-col gap-sm mt-md">
          <form onSubmit={handleEnterCode} className="flex gap-sm">
            <input
              type="text"
              placeholder="Código"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="bg-bg-sk border-1.5 border-border rounded-sm px-md py-sm font-nunito text-text focus:border-lilac focus:ring-3 focus:ring-lilac-lt outline-none flex-1 uppercase text-center"
            />
            <button
              type="submit"
              disabled={code.length !== 6}
              className="bg-white border-1.5 border-border text-text font-nunito font-bold py-sm px-md rounded-md bounce-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Entrar
            </button>
          </form>
          <span className="text-tiny font-nunito text-text-mt uppercase tracking-wider">
            ou entre com um código
          </span>
        </div>
      </div>
    </main>
  );
}

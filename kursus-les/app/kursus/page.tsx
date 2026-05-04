"use client";
import { useState } from "react";

export default function KursusPage() {
  const [kursus, setKursus] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const tambah = () => {
    if (!input.trim()) return;
    if (kursus.some(k => k.toLowerCase() === input.toLowerCase())) {
      alert("Kursus sudah ada");
      return;
    }
    setKursus([...kursus, input]);
    setInput("");
  };

  return (
    <div>
      <h1>📘 Kursus Tersedia</h1>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={tambah}>Tambah</button>

      <ul>
        {kursus.map((k, i) => <li key={i}>{k}</li>)}
      </ul>
    </div>
  );
}
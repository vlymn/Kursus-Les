"use client";

import { useState } from "react";

export default function PengajarPage() {
  const [pengajar, setPengajar] = useState<string[]>([]);
  const [nama, setNama] = useState("");

  const tambahPengajar = () => {
    if (!nama.trim()) return;

    const sudahAda = pengajar.some(
      (p) => p.toLowerCase() === nama.toLowerCase()
    );

    if (sudahAda) {
      alert("❌ Pengajar sudah ada");
      return;
    }

    setPengajar([...pengajar, nama]);
    setNama("");
  };

  const hapusPengajar = (i: number) => {
    setPengajar(pengajar.filter((_, index) => index !== i));
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>👩‍🏫 Data Pengajar</h1>

      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama pengajar"
      />
      <button onClick={tambahPengajar}>Tambah</button>

      <ul>
        {pengajar.map((p, i) => (
          <li key={i}>
            {p}
            <button onClick={() => hapusPengajar(i)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
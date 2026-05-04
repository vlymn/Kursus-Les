"use client";
import { useState } from "react";

export default function PembayaranPage() {
  const [data, setData] = useState<any[]>([]);
  const [nama, setNama] = useState("");
  const [kursus, setKursus] = useState("");

  const bayar = () => {
    if (!nama || !kursus) return;

    if (data.some(d => d.nama === nama && d.kursus === kursus)) {
      alert("Sudah dibayar");
      return;
    }

    setData([...data, { nama, kursus }]);
  };

  return (
    <div>
      <h1>💳 Pembayaran</h1>
      <input placeholder="Nama siswa" onChange={e => setNama(e.target.value)} />
      <input placeholder="Kursus" onChange={e => setKursus(e.target.value)} />
      <button onClick={bayar}>Bayar</button>

      <ul>
        {data.map((d, i) => (
          <li key={i}>{d.nama} - {d.kursus}</li>
        ))}
      </ul>
    </div>
  );
}
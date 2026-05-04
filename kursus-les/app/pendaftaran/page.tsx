"use client";
import { useState } from "react";

export default function PendaftaranPage() {
  const kursusTersedia = ["Web", "Mobile", "UI/UX"];
  const [nama, setNama] = useState("");
  const [kursus, setKursus] = useState("");
  const [data, setData] = useState<any[]>([]);

  const daftar = () => {
    if (!nama || !kursus) return;

    if (data.some(d => d.nama === nama && d.kursus === kursus)) {
      alert("Sudah terdaftar");
      return;
    }

    setData([...data, { nama, kursus }]);
    setNama("");
    setKursus("");
  };

  return (
    <div>
      <h1>📝 Pendaftaran</h1>

      <input
        placeholder="Nama siswa"
        value={nama}
        onChange={e => setNama(e.target.value)}
      />

      <select value={kursus} onChange={e => setKursus(e.target.value)}>
        <option value="">Pilih Kursus</option>
        {kursusTersedia.map((k, i) => (
          <option key={i} value={k}>{k}</option>
        ))}
      </select>

      <button onClick={daftar}>Daftar</button>

      <ul>
        {data.map((d, i) => (
          <li key={i}>{d.nama} - {d.kursus}</li>
        ))}
      </ul>
    </div>
  );
}
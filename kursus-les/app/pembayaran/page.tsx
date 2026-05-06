"use client";

import { useEffect, useState } from "react";

type Pendaftaran = {
  nama: string;
  email: string;
  kursus: string;
};

type Siswa = Pendaftaran & {
  harga: string;
};

export default function PembayaranPage() {
  const [mounted, setMounted] = useState(false);

  const [pendaftaran, setPendaftaran] = useState<Pendaftaran[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [harga, setHarga] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const daftar = localStorage.getItem("pendaftaran");
    if (daftar) setPendaftaran(JSON.parse(daftar));
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("pendaftaran", JSON.stringify(pendaftaran));
    }
  }, [pendaftaran, mounted]);

  if (!mounted) return null;

  const bayar = () => {
    if (selectedIndex === null || !harga) {
      alert("Pilih siswa dan isi harga");
      return;
    }

    const data = pendaftaran[selectedIndex];

    const siswaBaru: Siswa = {
      ...data,
      harga,
    };

    // simpan ke siswa
    const siswaSaved = localStorage.getItem("siswa");
    const siswa = siswaSaved ? JSON.parse(siswaSaved) : [];
    localStorage.setItem("siswa", JSON.stringify([...siswa, siswaBaru]));

    // hapus dari pendaftaran
    const sisa = pendaftaran.filter((_, i) => i !== selectedIndex);
    setPendaftaran(sisa);

    // reset form
    setSelectedIndex(null);
    setHarga("");
  };

  return (
    <div className="card">
      <h1>Pembayaran</h1>

      {/* PILIH SISWA */}
      <select
        value={selectedIndex ?? ""}
        onChange={(e) => setSelectedIndex(Number(e.target.value))}
      >
        <option value="">-- Pilih Siswa --</option>
        {pendaftaran.map((d, i) => (
          <option key={i} value={i}>
            {d.nama} - {d.kursus}
          </option>
        ))}
      </select>

      {/* INPUT HARGA */}
      <input
        type="text"
        placeholder="Masukkan Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
      />

      <button onClick={bayar} className="btn-danger">
        Bayar
      </button>
    </div>
  );
}
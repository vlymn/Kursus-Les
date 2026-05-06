"use client";

import { useEffect, useState } from "react";

type Kursus = {
  nama: string;
  kategori: string;
};

export default function KursusPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Kursus[]>([]);
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const saved = localStorage.getItem("kursus");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("kursus", JSON.stringify(data));
    }
  }, [data, mounted]);

  if (!mounted) return null;

  // ➕ TAMBAH / UPDATE
  const submit = () => {
    if (!nama || !kategori) return;

    const duplikat = data.some(
      (d, i) =>
        d.nama.toLowerCase() === nama.toLowerCase() &&
        i !== editIndex
    );

    if (duplikat) {
      alert("❌ Kursus sudah ada");
      return;
    }

    if (editIndex !== null) {
      const copy = [...data];
      copy[editIndex] = { nama, kategori };
      setData(copy);
      setEditIndex(null);
    } else {
      setData([...data, { nama, kategori }]);
    }

    setNama("");
    setKategori("");
  };

  // ✏️ EDIT
  const edit = (i: number) => {
    setNama(data[i].nama);
    setKategori(data[i].kategori);
    setEditIndex(i);
  };

  // 🗑️ HAPUS + SYNC PENGAJAR
  const hapus = (i: number) => {
    if (!confirm("Hapus kursus ini?")) return;

    const kursusDihapus = data[i].nama;

    const newKursus = [...data];
    newKursus.splice(i, 1);
    setData(newKursus);
    localStorage.setItem("kursus", JSON.stringify(newKursus));

    const savedPengajar = localStorage.getItem("pengajar");
    if (savedPengajar) {
      const pengajar = JSON.parse(savedPengajar);

      const filtered = pengajar.filter(
        (p: any) => p.kursus !== kursusDihapus
      );

      localStorage.setItem("pengajar", JSON.stringify(filtered));
    }
  };

  return (
    <div>
      <h1>Data Kursus</h1>

      {/* FORM (TIDAK DIUBAH) */}
      <input
        placeholder="Nama Kursus"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        placeholder="Kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />

      <button onClick={submit}>
        {editIndex !== null ? "Update" : "Tambah"}
      </button>

      {/* TABLE (TIDAK DIUBAH) */}
      <table border={1}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.nama}</td>
              <td>{d.kategori}</td>

              {/* 🔥 HANYA TOMBOL DIUBAH */}
              <td>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => edit(i)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => hapus(i)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
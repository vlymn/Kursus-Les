"use client";

import { useEffect, useState } from "react";

type Pengajar = {
  nama: string;
  kursus: string;
};

type Kursus = {
  nama: string;
  kategori: string;
};

export default function PengajarPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Pengajar[]>([]);
  const [listKursus, setListKursus] = useState<string[]>([]);
  const [nama, setNama] = useState("");
  const [kursus, setKursus] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const savedKursus = localStorage.getItem("kursus");
    const savedPengajar = localStorage.getItem("pengajar");

    let kursusNames: string[] = [];

    if (savedKursus) {
      const parsedKursus: Kursus[] = JSON.parse(savedKursus);
      kursusNames = parsedKursus.map((k) => k.nama);
      setListKursus(kursusNames);
    }

    if (savedPengajar) {
      const parsedPengajar: Pengajar[] = JSON.parse(savedPengajar);

      const filtered = parsedPengajar.filter((p) =>
        kursusNames.includes(p.kursus)
      );

      setData(filtered);
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("pengajar", JSON.stringify(data));
    }
  }, [data, mounted]);

  if (!mounted) return null;

  const submit = () => {
    if (!nama || !kursus) return;

    const kursusDipakai = data.some(
      (d, i) => d.kursus === kursus && i !== editIndex
    );

    if (kursusDipakai) {
      alert("❌ Kursus ini sudah memiliki pengajar!");
      return;
    }

    if (editIndex !== null) {
      const copy = [...data];
      copy[editIndex] = { nama, kursus };
      setData(copy);
      setEditIndex(null);
    } else {
      setData([...data, { nama, kursus }]);
    }

    setNama("");
    setKursus("");
  };

  const edit = (i: number) => {
    setNama(data[i].nama);
    setKursus(data[i].kursus);
    setEditIndex(i);
  };

  const hapus = (i: number) => {
    if (!confirm("Hapus data pengajar?")) return;

    const copy = [...data];
    copy.splice(i, 1);
    setData(copy);
  };

  return (
    <div className="container">
      <h1>👨‍🏫 Data Pengajar</h1>

      {/* FORM */}
      <input
        placeholder="Nama Pengajar"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <select value={kursus} onChange={(e) => setKursus(e.target.value)}>
        <option value="">Pilih Kursus</option>

        {listKursus.map((k, i) => (
          <option key={i} value={k}>
            {k}
          </option>
        ))}
      </select>

      <button onClick={submit}>
        {editIndex !== null ? "Update" : "Tambah"}
      </button>

      {/* TABLE */}
      <table border={1}>
        <thead>
          <tr>
            <th>Nama Pengajar</th>
            <th>Kursus</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p, i) => (
            <tr key={i}>
              <td>{p.nama}</td>
              <td>{p.kursus}</td>

              {/* 🔥 BUTTON RAPI + SOLID */}
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
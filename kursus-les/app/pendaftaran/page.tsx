"use client";

import { useEffect, useState } from "react";

type Pendaftaran = {
  nama: string;
  email: string;
  kursus: string;
};

type Siswa = {
  nama: string;
  email: string;
  kursus: string;
  harga: string;
};

export default function PendaftaranPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Pendaftaran[]>([]);
  const [kursusList, setKursusList] = useState<string[]>([]);
  const [siswaList, setSiswaList] = useState<Siswa[]>([]);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [kursus, setKursus] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const saved = localStorage.getItem("pendaftaran");
    if (saved) setData(JSON.parse(saved));

    const kursusSaved = localStorage.getItem("kursus");
    if (kursusSaved) {
      const parsed = JSON.parse(kursusSaved);
      setKursusList(parsed.map((k: any) => k.nama));
    }

    const siswaSaved = localStorage.getItem("siswa");
    if (siswaSaved) setSiswaList(JSON.parse(siswaSaved));
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("pendaftaran", JSON.stringify(data));
    }
  }, [data, mounted]);

  if (!mounted) return null;

  const submit = () => {
    if (!nama || !email || !kursus) return;

    const siswaAda = siswaList.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (siswaAda) {
      if (siswaAda.kursus === kursus) {
        alert("❌ Siswa sudah terdaftar di kursus ini");
        return;
      }

      if (siswaAda.nama.toLowerCase() !== nama.toLowerCase()) {
        alert("⚠️ Nama tidak sesuai dengan data siswa");
        return;
      }
    }

    const duplikat = data.some(
      (d, i) =>
        d.nama.toLowerCase() === nama.toLowerCase() &&
        d.email.toLowerCase() === email.toLowerCase() &&
        d.kursus === kursus &&
        i !== editIndex
    );

    if (duplikat) {
      alert("⚠️ Data pendaftaran sudah ada");
      return;
    }

    if (editIndex !== null) {
      const copy = [...data];
      copy[editIndex] = { nama, email, kursus };
      setData(copy);
      setEditIndex(null);
    } else {
      setData([...data, { nama, email, kursus }]);
    }

    setNama("");
    setEmail("");
    setKursus("");
  };

  const edit = (i: number) => {
    setNama(data[i].nama);
    setEmail(data[i].email);
    setKursus(data[i].kursus);
    setEditIndex(i);
  };

  const hapus = (i: number) => {
    if (!confirm("Hapus data pendaftaran?")) return;

    const copy = [...data];
    copy.splice(i, 1);
    setData(copy);
  };

  return (
    <div>
      <h1>Pendaftaran Siswa</h1>

      <input
        placeholder="Nama Siswa"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select value={kursus} onChange={(e) => setKursus(e.target.value)}>
        <option value="">-- Pilih Kursus --</option>
        {kursusList.map((k, i) => (
          <option key={i} value={k}>
            {k}
          </option>
        ))}
      </select>

      <button onClick={submit}>
        {editIndex !== null ? "Update" : "Daftar"}
      </button>

      <table border={1} style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Kursus</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.nama}</td>
              <td>{d.email}</td>
              <td>{d.kursus}</td>
              <td>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => edit(i)}>Edit</button>
                  <button onClick={() => hapus(i)}>Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
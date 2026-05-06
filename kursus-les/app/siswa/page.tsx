"use client";

import { useEffect, useState } from "react";

type Siswa = {
  nama: string;
  email: string;
  kursus: string;
  harga: string;
  kode: string;
};

export default function SiswaPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Siswa[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [form, setForm] = useState<Siswa>({
    nama: "",
    email: "",
    kursus: "",
    harga: "",
    kode: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const saved = localStorage.getItem("siswa");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    const hasil = parsed.map((s: any) => ({
      ...s,
      kode: generateKode(s.nama, s.email),
    }));

    setData(hasil);
  }, [mounted]);

  const saveToStorage = (newData: Siswa[]) => {
    localStorage.setItem("siswa", JSON.stringify(newData));
    setData(newData);
  };

  const handleDelete = (index: number) => {
    const confirmDelete = confirm("Yakin mau hapus data ini?");
    if (!confirmDelete) return;

    const newData = [...data];
    newData.splice(index, 1);
    saveToStorage(newData);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setForm(data[index]);
  };

  const handleUpdate = () => {
    if (editIndex === null) return;

    const newData = [...data];

    newData[editIndex] = {
      ...form,
      kode: generateKode(form.nama, form.email),
    };

    saveToStorage(newData);
    setEditIndex(null);

    setForm({
      nama: "",
      email: "",
      kursus: "",
      harga: "",
      kode: "",
    });
  };

  if (!mounted) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Data Siswa</h1>

      {/* FORM EDIT */}
      {editIndex !== null && (
        <div style={{ marginBottom: "20px", maxWidth: "300px" }}>
          <h3>Edit Siswa</h3>

          <input
            placeholder="Nama"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Kursus"
            value={form.kursus}
            onChange={(e) => setForm({ ...form, kursus: e.target.value })}
          />

          <input
            placeholder="Harga"
            value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
          />

          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditIndex(null)}>Batal</button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <table
        border={1}
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Kursus</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.kode}</td>
              <td>{d.nama}</td>
              <td>{d.email}</td>
              <td>{d.kursus}</td>

              {/* 🔥 BUTTON SOLID + SEJAJAR */}
              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => handleEdit(i)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#3b82f6", // 🔵 solid biru
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(i)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ef4444", // 🔴 solid merah
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
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

/* 🔐 GENERATE KODE */
function generateKode(nama: string, email: string) {
  const base = nama.toLowerCase() + email.toLowerCase();
  let hash = 0;

  for (let i = 0; i < base.length; i++) {
    hash = base.charCodeAt(i) + ((hash << 5) - hash);
  }

  return "SIS-" + Math.abs(hash).toString().slice(0, 5);
}
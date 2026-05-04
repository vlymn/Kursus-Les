"use client";

export default function SiswaPage() {
  const siswa = [
    { nama: "Andi", kursus: "Web" },
    { nama: "Budi", kursus: "Mobile" }
  ];

  return (
    <div>
      <h1>👨‍🎓 Data Siswa</h1>
      <ul>
        {siswa.map((s, i) => (
          <li key={i}>{s.nama} - {s.kursus}</li>
        ))}
      </ul>
    </div>
  );
}
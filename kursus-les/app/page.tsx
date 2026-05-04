import MenuCard from "../components/MenuCard";

export default function Home() {
  return (
    <main className="home">
      <h1 className="title">Kursus Les</h1>
      <p className="subtitle">Sistem Informasi Kursus Les</p>

      <div className="grid">
        <MenuCard title="Pengajar" link="/pengajar" icon="👨‍🏫" />
        <MenuCard title="Materi" link="/materi" icon="📘" />
        <MenuCard title="Pendaftaran" link="/pendaftaran" icon="📝" />
        <MenuCard title="Pembayaran" link="/pembayaran" icon="💳" />
        <MenuCard title="Kursus" link="/kursus" icon="🎓" />
      </div>
    </main>
  );
}
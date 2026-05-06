import MenuCard from "../components/MenuCard";

export default function Home() {
  return (
    <main className="home">
      <h1>Kursus Les</h1>

      <div className="grid">
        <MenuCard title="Kursus" link="/kursus" icon="🎓" />
        <MenuCard title="Pendaftaran" link="/pendaftaran" icon="📝" />
        <MenuCard title="Pembayaran" link="/pembayaran" icon="💳" />
        <MenuCard title="Siswa" link="/siswa" icon="👩‍🎓" />
        <MenuCard title="Pengajar" link="/pengajar" icon="👨‍🏫" />
      </div>
    </main>
  );
}
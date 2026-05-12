export type MenuItem = {
  title: string;
  link: string;
  icon: string;
};

export const menuData: MenuItem[] = [
  {
    title: "Kursus",
    link: "/kursus",
    icon: "🎓",
  },
  {
    title: "Pendaftaran",
    link: "/pendaftaran",
    icon: "📝",
  },
  {
    title: "Pembayaran",
    link: "/pembayaran",
    icon: "💳",
  },
  {
    title: "Siswa",
    link: "/siswa",
    icon: "👩‍🎓",
  },
  {
    title: "Pengajar",
    link: "/pengajar",
    icon: "👨‍🏫",
  },
];
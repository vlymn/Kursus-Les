import Link from "next/link";

type MenuCardProps = {
  title: string;
  link: string;
  icon: string;
};

export default function MenuCard({ title, link, icon }: MenuCardProps) {
  return (
    <Link href={link} className="card">
      <span className="icon">{icon}</span>
      <h3>{title}</h3>
    </Link>
  );
}
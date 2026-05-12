import MenuCard from "@/components/MenuCard";
import { menuData, MenuItem } from "./data/dummyData";

export default function Home() {
  return (
    <main>
      <h1>Kursus Les</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {menuData.map((menu: MenuItem, index: number) => (
          <MenuCard
            key={index}
            title={menu.title}
            link={menu.link}
            icon={menu.icon}
          />
        ))}
      </div>
    </main>
  );
}
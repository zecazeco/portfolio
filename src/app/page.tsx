import { VitrinePage } from "@/components/VitrinePage";
import { homeVitrine } from "@/data/vitrines";

export default function Home() {
  return <VitrinePage vitrine={homeVitrine} />;
}

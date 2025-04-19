import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Navbar_offer_card from "@/components/Navbar_offer_card";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar_offer_card />
      <Navbar />
      <Banner />
    </div>
  );
}

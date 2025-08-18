// components/NavBar.jsx
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <header className="fixed top-0 left-[17%] w-[calc(100%-240px)] h-16 bg-white text-white px-20 flex items-center justify-between shadow-md z-10 font-poppins">
      <h1 className="text-lg text-[#1e1e2f] font-semibold">Gestion de depense</h1>
      <Button className="text-white bg-[#1e1e2f]  hover:bg-white hover:text-green-500 hover:border-black">
        Déconnexion
      </Button>
    </header>
  );
}

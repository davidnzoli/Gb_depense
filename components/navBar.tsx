// components/NavBar.jsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="fixed top-0 left-[17%] items-center justify-center w-[calc(100%-240px)] h-16 bg-white text-white px-20 shadow-md z-10 font-poppins">
      <div className="w-[98%] flex gap-10 h-16 items-center justify-end ">
        {/* <Button className="text-white bg-[#1e1e2f]  hover:bg-white hover:text-green-500 hover:border-black">
        Déconnexion
      </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-end gap-2 cursor-pointer">
              <Image src="/user-round.svg" alt="Mon profil" width={40} height={40} />
              <span className="text-sm font-medium text-gray-900">Mon Profil</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuLabel className="text-gray-500">My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer font-base text-md">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer font-base text-md">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer font-base text-md">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

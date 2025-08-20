// components/Sidebar.jsx
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LayoutDashboard, Users, CalendarDays, LogOut, Wallet, FolderKanban } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Package,
  Archive,
  ShoppingCart,
  Calculator,
  Truck,
  UserCog,
  UserCircle,
  Settings,
  FileText,
  Building2,
  Network,
} from "lucide-react";

import { ChevronDown } from "lucide-react";

const menuItems = [
  {
    text: "DASHBOARD",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    text: "GERER LES DEPENSES",
    icon: <Wallet className="h-5 w-5" />,
    subItems: [
      {
        text: "DEPENSES",
        icon: <Wallet className="h-5 w-5" />,
        href: "/dashboard/depenses/listdepenses",
      },
      {
        text: "CATEGORIES",
        icon: <Archive className="h-5 w-5" />,
        href: "/dashboard/depenses/categories",
      },
    ],
  },
  {
    text: "SERVICES",
    icon: <Building2 className="h-5 w-5" />,
    href: "/dashboard/service",
  },
  {
    text: "PROJETS",
    icon: <FolderKanban className="h-5 w-5" />,
    href: "/dashboard/projets",
  },
  {
    text: "FOURNISSEURS",
    icon: <Truck className="h-5 w-5" />,
    href: "/dashboard/fournisseurs",
  },
  {
    text: "RAPORTS",
    icon: <FileText className="h-5 w-5" />,
    subItems: [
      { text: "RAPPORTS DES DEPENSES", href: "/dashboard/rapports/depenses" },
      { text: "RAPPORTS DES PROJETS", href: "/dashboard/rapports/projets" },
    ],
  },
  {
    text: "COMPTABILITE",
    icon: <Calculator className="h-5 w-5" />,
    subItems: [
      { text: "PLAN COMPTABLE", href: "/dashboard/comptabilite/plan" },
      { text: "BILAN", href: "/dashboard/comptabilite/bilan" },
      { text: "RUBRIQUE COMPTABLE", href: "/dashboard/comptabilite/rubrique" },
    ],
  },
  {
    text: "UTULISATEURS",
    icon: <UserCog className="h-5 w-5" />,
    href: "/dashboard/utilisateurs",
  },
  {
    text: "MON COMPTE",
    icon: <UserCircle className="h-5 w-5" />,
    href: "/dashboard/profile",
  },
  {
    text: "PARAMETRE",
    icon: <Settings className="h-5 w-5" />,
    href: "/dashboard/parametres",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen fixed left-0 pt-16 pb-20 top-0 gap-9 items-center  bg-[#1e1e2f] text-white font-poppins font-bold flex flex-col justify-between">
      <h1 className="text-[20px] text-green-500 font-bold">GB-DEPENSES</h1>
      <ScrollArea className="h-full w-[99%]">
        <nav className="p-4 flex flex-col justify-center items-start gap-2 font-bold ">
          {menuItems.map((item, index) =>
            item.subItems ? (
              <Collapsible key={index}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-normal text-left text-gray-200 text-base hover:bg-[#2e2e40]  hover:text-white cursor-pointer mb-2"
                  >
                    <div className="flex items-center space-x-3 ">
                      <span className="mr-6">{item.icon}</span>
                      {item.text}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link key={subIndex} href={subItem.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-normal text-sm text-gray-200 hover:bg-[#2e2e40] hover:text-white cursor-pointer"
                      >
                        {subItem.text}
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link key={index} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal text-left text-base text-gray-200 hover:bg-[#2e2e40] hover:text-white cursor-pointer mb-2"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.text}
                </Button>
              </Link>
            )
          )}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start text-left text-gray-200 hover:bg-[#2e2e40] hover:text-white cursor-pointer"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}

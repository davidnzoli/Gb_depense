// components/Sidebar.jsx
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LayoutDashboard, Users, CalendarDays, LogOut } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Package,
  ShoppingCart,
  Calculator,
  Truck,
  UserCog,
  UserCircle,
  Settings,
  BadgeEuro,
  BookOpen,
  Book,
  FileText,
  ClipboardList,
  CalendarCheck,
  Landmark,
  Archive,
} from "lucide-react";

import { ChevronDown } from "lucide-react";

const menuItems = [
  {
    text: "dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    text: "depenses",
    icon: <Package className="h-5 w-5" />,
    subItems: [
      {
        text: "Tous les produits",
        icon: <Package className="h-5 w-5" />,
        href: "/Dashboard/produits/list",
      },
      {
        text: "Catégories",
        icon: <Archive className="h-5 w-5" />,
        href: "/Dashboard/produits/category",
      },
    ],
  },
  {
    text: "Projets",
    icon: <ShoppingCart className="h-5 w-5" />,
    href: "/dashboard/projets",
  },
  {
    text: "comptabilite",
    icon: <Calculator className="h-5 w-5" />,
    subItems: [
      { text: "Exercices comptable", href: "/Dashboard/comptab/exercice" },
      { text: "Plan comptable", href: "/Dashboard/comptab/plan" },
      { text: "Journaux comptable", href: "/Dashboard/comptab/journaux" },
      { text: "Grand livre", href: "/Dashboard/comptab/livre" },
      { text: "Bilan", href: "/Dashboard/comptab/bilan" },
      {
        text: "Periodes & clôtures",
        href: "/Dashboard/comptab/cloture",
      },
      { text: "Immobilisation", href: "/Dashboard/comptab/immobilisation" },
    ],
  },
  {
    text: "Clients",
    icon: <Users className="h-5 w-5" />,
    subItems: [
      { text: "Liste des clients", href: "/Dashboard/clients/list" },
      { text: "Importer liste clients", href: "/Dashboard/clients/import" },
      {
        text: "Demande crédit",
        href: "/Dashboard/clients/credit",
      },
    ],
  },
  {
    text: "Fournisseurs",
    icon: <Truck className="h-5 w-5" />,
    href: "/dashboard/fournisseurs",
  },
  {
    text: "Utilisateurs",
    icon: <UserCog className="h-5 w-5" />,
    href: "/Dashboard/utilisateur",
  },
  {
    text: "Mon compte",
    icon: <UserCircle className="h-5 w-5" />,
    href: "/Dashboard/profile",
  },
  {
    text: "Paramètre",
    icon: <Settings className="h-5 w-5" />,
    href: "/adminseting",
    subItems: [
      { text: "Rôle", href: "/adminseting/role" },
      { text: "Permission", href: "/adminseting/permission" },
      { text: "Pays", href: "/adminseting/pays" },
      { text: "Rubrique Comptable", href: "/adminseting/rubrique" },
      { text: "Département", href: "/adminseting/departement" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen fixed left-0 pt-16 pb-20 top-0 gap-9 items-center  bg-[#1e1e2f] text-white font-poppins flex flex-col justify-between">
      <h1 className="text-[20px] text-green-500 font-bold">GB-DEPENSES</h1>
      <ScrollArea className="h-full w-[99%]">
        <nav className="p-4 flex flex-col justify-center items-start ">
          {menuItems.map((item, index) =>
            item.subItems ? (
              <Collapsible key={index}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-left text-white hover:bg-[#2e2e40] hover:text-white cursor-pointer mb-2"
                  >
                    <div className="flex items-center font-normal space-x-3">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link key={subIndex} href={subItem.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-normal text-sm text-white hover:bg-[#2e2e40] hover:text-white cursor-pointer"
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
                  className="w-full justify-start font-normal  text-left text-white hover:bg-[#2e2e40] hover:text-white cursor-pointer mb-2"
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
            className="w-full justify-start text-left text-white hover:bg-[#2e2e40] hover:text-white cursor-pointer"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}
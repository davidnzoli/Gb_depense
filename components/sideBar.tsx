// "use client";

// import { useState } from "react";
// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import Link from "next/link";
// import { LayoutDashboard, Users, CalendarDays, LogOut, Wallet, FolderKanban } from "lucide-react";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import {
//   Package,
//   Archive,
//   ShoppingCart,
//   Calculator,
//   Truck,
//   UserCog,
//   UserCircle,
//   Settings,
//   FileText,
//   Building2,
//   Network,
//     Menu,
//   X,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import Image from "next/image";

// import { ChevronDown } from "lucide-react";

// const menuItems = [
//   {
//     text: "DASHBOARD",
//     icon: <LayoutDashboard className="h-5 w-5" />,
//     href: "/dashboard",
//   },
//   {
//     text: "GERER LES DEPENSES",
//     icon: <Wallet className="h-5 w-5" />,
//     subItems: [
//       {
//         text: "DEPENSES",
//         icon: <Wallet className="h-5 w-5" />,
//         href: "/dashboard/depenses/listdepenses",
//       },
//       {
//         text: "CATEGORIES",
//         icon: <Archive className="h-5 w-5" />,
//         href: "/dashboard/depenses/categories",
//       },
//     ],
//   },
//   {
//     text: "SERVICES",
//     icon: <Building2 className="h-5 w-5" />,
//     href: "/dashboard/service",
//   },
//   {
//     text: "PROJETS",
//     icon: <FolderKanban className="h-5 w-5" />,
//     href: "/dashboard/projets",
//   },
//   {
//     text: "FOURNISSEURS",
//     icon: <Truck className="h-5 w-5" />,
//     href: "/dashboard/fournisseurs",
//   },
//   {
//     text: "RAPORTS",
//     icon: <FileText className="h-5 w-5" />,
//     subItems: [
//       { text: "RAPPORTS DES DEPENSES", href: "/dashboard/rapports/depenses" },
//       { text: "RAPPORTS DES PROJETS", href: "/dashboard/rapports/projets" },
//     ],
//   },
//   {
//     text: "COMPTABILITE",
//     icon: <Calculator className="h-5 w-5" />,
//     subItems: [
//       { text: "PLAN COMPTABLE", href: "/dashboard/comptabilite/plan" },
//       { text: "BILAN", href: "/dashboard/comptabilite/bilan" },
//       { text: "RUBRIQUE COMPTABLE", href: "/dashboard/comptabilite/rubrique" },
//     ],
//   },
//   {
//     text: "UTULISATEURS",
//     icon: <UserCog className="h-5 w-5" />,
//     href: "/dashboard/utilisateurs",
//   },
//   {
//     text: "MON COMPTE",
//     icon: <UserCircle className="h-5 w-5" />,
//     href: "/dashboard/profile",
//   },
//   {
//     text: "PARAMETRE",
//     icon: <Settings className="h-5 w-5" />,
//     href: "/dashboard/parametres",
//   },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <>

//            <header className="fixed top-0 left-0 right-0 h-16  bg-white flex items-center justify-between px-4 shadow-md text-white z-200">
//         <div className="w-[100%] flex items-center justify-between gap-2">
//           <div className="flex items-center justify-end gap-2 cursor-pointer">
//                 <Button
//             className="block lg:hidden p-2"
//             onClick={() => setIsOpen(true)}
//           >
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </Button>
//           <Image src="/LOGO_KIND_.svg" alt="logo" width={70} height={20} />
//               </div>
//         <DropdownMenu >
          
//           <DropdownMenuTrigger asChild>
//             <div className="flex items-center justify-end gap-2">
              
//              <div className="w-[100%] flex items-center justify-end gap-2 cursor-pointer">
//                <Image src="/user-round.svg" alt="Mon profil" width={40} height={40} />

//               <span className="text-sm font-medium text-gray-900">Mon Profil</span>
//              </div>
             
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-40" align="start">
//             <DropdownMenuLabel className="text-gray-500">My Account</DropdownMenuLabel>
//             <DropdownMenuGroup>
//               <DropdownMenuItem className="cursor-pointer font-base text-md">
//                 Profile
//                 <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//               </DropdownMenuItem>
//               <DropdownMenuItem className="cursor-pointer font-base text-md">
//                 Settings
//                 <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="cursor-pointer font-base text-md">
//               Log out
//               <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       </header>
//       {isOpen && (
// <aside className=" hidden lg:flex w-72 h-screen fixed left-0 pt-16 pb-20 top-0 gap-9 items-center  bg-[#1e1e2f] text-white font-poppins font-bold flex-col justify-between z-990">
//       {/* <h1 className="text-[20px] text-green-500 font-bold">GB-DEPENSES</h1> */}
//       <div className="flex items-center justify-end gap-2 cursor-pointer">
//         <Image
//           src="/LOGO_KIND_.svg"
//           alt="Mon profil"
//           width={200}
//           height={300}
//           className="rounded-4xl border-1"
//         />
//       </div>
//       <ScrollArea className="h-full w-[99%]">
//         <nav className="p-4 flex flex-col justify-center items-start gap-2 font-bold ">
//           {menuItems.map((item, index) =>
//             item.subItems ? (
//               <Collapsible key={index}>
//                 <CollapsibleTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="w-full justify-between font-normal text-left text-gray-200 text-base hover:bg-[#2e2e40]  hover:text-white cursor-pointer mb-2"
//                   >
//                     <div className="flex items-center space-x-3 ">
//                       <span className="mr-6">{item.icon}</span>
//                       {item.text}
//                     </div>
//                     <ChevronDown className="h-4 w-4" />
//                   </Button>
//                 </CollapsibleTrigger>
//                 <CollapsibleContent className="pl-8 space-y-1">
//                   {item.subItems.map((subItem, subIndex) => (
//                     <Link key={subIndex} href={subItem.href}>
//                       <Button
//                         variant="ghost"
//                         className="w-full justify-start font-normal text-sm text-gray-200 hover:bg-[#2e2e40] hover:text-white cursor-pointer"
//                       >
//                         {subItem.text}
//                       </Button>
//                     </Link>
//                   ))}
//                 </CollapsibleContent>
//               </Collapsible>
//             ) : (
//               <Link key={index} href={item.href}>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start font-normal text-left text-base text-gray-200 hover:bg-[#2e2e40] hover:text-white cursor-pointer mb-2"
//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   {item.text}
//                 </Button>
//               </Link>
//             )
//           )}
//         </nav>
//         <div className="p-4 border-t border-white/10">
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-left text-gray-200 hover:bg-[#2e2e40] hover:text-white cursor-pointer"
//           >
//             <LogOut className="h-5 w-5 mr-3" />
//             Déconnexion
//           </Button>
//         </div>
//       </ScrollArea>
//     </aside>
//       )}
    
//     </>
    
//   );
// }

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import Link from "next/link";
// import {
//   LayoutDashboard,
//   LogOut,
//   Wallet,
//   FolderKanban,
//   Archive,
//   Calculator,
//   Truck,
//   UserCog,
//   UserCircle,
//   Settings,
//   FileText,
//   Building2,
//   Menu,
//   X,
//   ChevronDown,
// } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import Image from "next/image";

// const menuItems = [
//   { text: "DASHBOARD", icon: <LayoutDashboard className="h-5 w-5" />, href: "/dashboard" },
//   {
//     text: "GERER LES DEPENSES",
//     icon: <Wallet className="h-5 w-5" />,
//     subItems: [
//       { text: "DEPENSES", href: "/dashboard/depenses/listdepenses" },
//       { text: "CATEGORIES", href: "/dashboard/depenses/categories" },
//     ],
//   },
//   { text: "SERVICES", icon: <Building2 className="h-5 w-5" />, href: "/dashboard/service" },
//   { text: "PROJETS", icon: <FolderKanban className="h-5 w-5" />, href: "/dashboard/projets" },
//   { text: "FOURNISSEURS", icon: <Truck className="h-5 w-5" />, href: "/dashboard/fournisseurs" },
//   {
//     text: "RAPPORTS",
//     icon: <FileText className="h-5 w-5" />,
//     subItems: [
//       { text: "RAPPORTS DES DEPENSES", href: "/dashboard/rapports/depenses" },
//       { text: "RAPPORTS DES PROJETS", href: "/dashboard/rapports/projets" },
//     ],
//   },
//   {
//     text: "COMPTABILITE",
//     icon: <Calculator className="h-5 w-5" />,
//     subItems: [
//       { text: "PLAN COMPTABLE", href: "/dashboard/comptabilite/plan" },
//       { text: "BILAN", href: "/dashboard/comptabilite/bilan" },
//       { text: "RUBRIQUE COMPTABLE", href: "/dashboard/comptabilite/rubrique" },
//     ],
//   },
//   { text: "UTULISATEURS", icon: <UserCog className="h-5 w-5" />, href: "/dashboard/utilisateurs" },
//   { text: "MON COMPTE", icon: <UserCircle className="h-5 w-5" />, href: "/dashboard/profile" },
//   { text: "PARAMETRE", icon: <Settings className="h-5 w-5" />, href: "/dashboard/parametres" },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-4 shadow-md z-50">
//         <Button
//           variant="ghost"
//           className="block lg:hidden p-2"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </Button>
//         <Image src="/LOGO_KIND_.svg" alt="logo" width={70} height={20} />
//       </header>

//       <aside
//         className={`fixed top-0 left-0 h-screen w-72 bg-[#1e1e2f] text-white font-poppins font-bold flex flex-col justify-between z-40 transform transition-transform duration-300
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         lg:translate-none lg:translate-x-none lg:flex-row lg:block lg:translate-0 lg:static`}
        
//       >
        
//               <div className={`${isOpen ? "hidden" : "hidden"} flex items-center justify-center gap-2 cursor-pointer` }>
//         <Image
//           src="/LOGO_KIND_.svg"
//           alt="Mon profil"
//           width={200}
//           height={300}
//           className="rounded-4xl border-1"
//         />
//       </div>

//         <ScrollArea className={` ${isOpen ? "pt-30" : "pt-30" } h-full w-full`}>
//           <nav className="p-4 flex flex-col gap-2">
//             {menuItems.map((item, index) =>
//               item.subItems ? (
//                 <Collapsible key={index}>
//                   <CollapsibleTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className="w-full justify-between font-normal text-left text-gray-200 text-base hover:bg-[#2e2e40] hover:text-white"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <span className="mr-6">{item.icon}</span>
//                         {item.text}
//                       </div>
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent className="pl-8 space-y-1">
//                     {item.subItems.map((subItem, subIndex) => (
//                       <Link key={subIndex} href={subItem.href}>
//                         <Button
//                           variant="ghost"
//                           className="w-full justify-start font-normal text-sm text-gray-200 hover:bg-[#2e2e40] hover:text-white"
//                           onClick={() => setIsOpen(false)} // ferme sidebar en mobile
//                         >
//                           {subItem.text}
//                         </Button>
//                       </Link>
//                     ))}
//                   </CollapsibleContent>
//                 </Collapsible>
//               ) : (
//                 <Link key={index} href={item.href}>
//                   <Button
//                     variant="ghost"
//                     className="w-full justify-start font-normal text-left text-base text-gray-200 hover:bg-[#2e2e40] hover:text-white"
//                     onClick={() => setIsOpen(false)} // ferme sidebar en mobile
//                   >
//                     <span className="mr-3">{item.icon}</span>
//                     {item.text}
//                   </Button>
//                 </Link>
//               )
//             )}
//           </nav>
//           <div className="p-4 border-t border-white/10">
//             <Button
//               variant="ghost"
//               className="w-full justify-start text-gray-200 hover:bg-[#2e2e40] hover:text-white"
//             >
//               <LogOut className="h-5 w-5 mr-3" />
//               Déconnexion
//             </Button>
//           </div>
//         </ScrollArea>
//       </aside>
//     </>
//   );
// }


      //         </div>
      //   <DropdownMenu >
          
      //     <DropdownMenuTrigger asChild>
      //       <div className="flex items-center justify-end gap-2">
              
      //        <div className="w-[100%] flex items-center justify-end gap-2 cursor-pointer">
      //          <Image src="/user-round.svg" alt="Mon profil" width={40} height={40} />

      //         <span className="text-sm font-medium text-gray-900">Mon Profil</span>
      //        </div>
             
      //       </div>
      //     </DropdownMenuTrigger>
      //     <DropdownMenuContent className="w-40" align="start">
      //       <DropdownMenuLabel className="text-gray-500">My Account</DropdownMenuLabel>
      //       <DropdownMenuGroup>
      //         <DropdownMenuItem className="cursor-pointer font-base text-md">
      //           Profile
      //           <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      //         </DropdownMenuItem>
      //         <DropdownMenuItem className="cursor-pointer font-base text-md">
      //           Settings
      //           <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      //         </DropdownMenuItem>
      //       </DropdownMenuGroup>
      //       <DropdownMenuSeparator />
      //       <DropdownMenuItem className="cursor-pointer font-base text-md">
      //         Log out
      //         <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      //       </DropdownMenuItem>
      //     </DropdownMenuContent>
      //   </DropdownMenu>
      // </div>

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Wallet,
  FolderKanban,
  Archive,
  Calculator,
  Truck,
  UserCog,
  UserCircle,
  Settings,
  FileText,
  Building2,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

const menuItems = [
  { text: "DASHBOARD", icon: <LayoutDashboard className="h-5 w-5" />, href: "/dashboard" },
  {
    text: "GERER LES DEPENSES",
    icon: <Wallet className="h-5 w-5" />,
    subItems: [
      { text: "DEPENSES", href: "/dashboard/depenses/listdepenses" },
      { text: "CATEGORIES", href: "/dashboard/depenses/categories" },
    ],
  },
  { text: "SERVICES", icon: <Building2 className="h-5 w-5" />, href: "/dashboard/service" },
  { text: "PROJETS", icon: <FolderKanban className="h-5 w-5" />, href: "/dashboard/projets" },
  { text: "FOURNISSEURS", icon: <Truck className="h-5 w-5" />, href: "/dashboard/fournisseurs" },
  {
    text: "RAPPORTS",
    icon: <FileText className="h-5 w-5" />,
    href:"dashboard/rapport"
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
  { text: "UTULISATEURS", icon: <UserCog className="h-5 w-5" />, href: "/dashboard/utilisateurs" },
  { text: "MON COMPTE", icon: <UserCircle className="h-5 w-5" />, href: "/dashboard/profile" },
  { text: "PARAMETRE", icon: <Settings className="h-5 w-5" />, href: "/dashboard/parametres" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between lg:pr-15 pr-12 lg:pl-5 pl-2 shadow-md z-50 ">
        <Button
          variant="ghost"
          className="p-2 w-16 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-24 w-24 cursor-pointer" /> : <Menu className="h-24 w-24 cursor-pointer" />}
        </Button>
    
                    
        <DropdownMenu >
          
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-end gap-2">
              
             <div className="w-[100%] flex items-center justify-end gap-2 cursor-pointer">
               <Image src="/user-round.svg" alt="Mon profil" width={40} height={40} />

              <span className="lg:text-sm text-[12px] font-medium text-gray-900">Mon Profil</span>
             </div>
             
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
     

      </header>

      {/* ✅ Sidebar en mode desktop (toujours affiché) */}
      <aside className="hidden lg:flex w-72 h-screen fixed left-0 top-0 bg-[#1e1e2f] text-white font-poppins font-bold flex-col justify-between z-200">
        <ScrollArea className="h-full w-full pt-16">
          <SidebarContent />
        </ScrollArea>
      </aside>

      {/* ✅ Sidebar en mode mobile (slide-in) */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-72 bg-[#1e1e2f] text-white font-poppins font-bold flex flex-col justify-between z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ScrollArea className="h-full w-full pt-16">
          <SidebarContent onClickLink={() => setIsOpen(false)} />
        </ScrollArea>
      </aside>
    </>
  );
}

/* ✅ Extraction du contenu du sidebar (utilisé par desktop + mobile) */
function SidebarContent({ onClickLink }: { onClickLink?: () => void }) {
  return (
    <>
      <div className="flex items-center justify-center p-4">
        <Image
          src="/LOGO_KIND_.svg"
          alt="Mon profil"
          width={160}
          height={50}
          className="rounded-4xl"
        />
      </div>
      <nav className="p-4 flex flex-col gap-2">
        {menuItems.map((item, index) =>
          item.subItems ? (
            <Collapsible key={index}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between font-normal text-left text-gray-200 text-base hover:bg-[#2e2e40] hover:text-white"
                >
                  <div className="flex items-center space-x-3">
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
                      className="w-full justify-start font-normal text-sm text-gray-200 hover:bg-[#2e2e40] hover:text-white"
                      onClick={onClickLink}
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
                className="w-full justify-start font-normal text-left text-base text-gray-200 hover:bg-[#2e2e40] hover:text-white"
                onClick={onClickLink}
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
          className="w-full justify-start text-gray-200 hover:bg-[#2e2e40] hover:text-white"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </Button>
      </div>
    </>
  );
}

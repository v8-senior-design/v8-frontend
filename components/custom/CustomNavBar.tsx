import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import { IconHomeEco, IconScoreboard, IconUser } from "@tabler/icons-react";

const CustomNavBar = () => {
  const links = [
    {
      title: "Leaderboard",
      icon: (
        <IconScoreboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/private/leaderboard",
    },
    {
      title: "Home",
      icon: (
        <IconHomeEco className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/private/home",
    },
    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/private/profile",
    },
  ];
  return <FloatingDock items={links} />;
};

export default CustomNavBar;

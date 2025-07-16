"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "../sidebar";

type BaseSidebarItem = {
  icon: ReactNode;
  label: string;
};

type UrlSidebarItem = BaseSidebarItem & {
  url: string;
  onclick?: never;
};

type ActionSidebarItem = BaseSidebarItem & {
  url?: never;
  onclick: () => void;
};

type SidebarItem = UrlSidebarItem | ActionSidebarItem;

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    role="button"
    onClick={onClick}
    className={`
    flex items-center p-1 rounded-full cursor-pointer w-full gap-4
    ${active ? "bg-primary-light text-sidebar-primary" : "hover:bg-primary-light/10"}
  `}
  >
    <span className=" bg-card h-10 w-10 flex items-center justify-center">
      {React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<any>, { active })
        : icon}
    </span>
    <span
      className={` ${active && " bg-gradientText bg-clip-text text-transparent"} text-sm font-medium text-primary-light`}
    >
      {label}
    </span>
  </button>
);

const SambhaSidebar = ({ sidebarItems }: { sidebarItems: SidebarItem[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<SidebarItem | undefined>(() =>
    sidebarItems?.find((item) => item.url === pathname)
  );

  useEffect(() => {
    if (pathname) {
      setActiveItem(
        sidebarItems?.find((item) => item.url && pathname.includes(item.url))
      );
    }
  }, [pathname]);

  return (
    <Sidebar className="!bg-primary-darkPurple  overflow-hidden block w-full lg:w-[20.625rem]">
      <section className=" text-sidebar-foreground md:rounded-xl shadow-[0px_0px_4px_0px_#0000001A] p-4  overflow-y-auto h-full md:h-[calc(100vh-70px)] no-scrollbar w-full">
        <div className="flex items-center mb-6 gap-3">
          <div>
            <h2 className="font-normal bg-gradientText bg-clip-text text-transparent font-semibold mt-2 text-4xl">
              Sambha
            </h2>
          </div>
        </div>

        <div className="space-y-2 mt-20">
          {sidebarItems.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              active={activeItem?.label === item.label}
              onClick={() => {
                setActiveItem(item);
                if ("url" in item && item.url) {
                  router.push(item.url);
                }
              }}
            />
          ))}
        </div>
      </section>
    </Sidebar>
  );
};

export default SambhaSidebar;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { useUser } from "@/stores/useUser";
import { tabs, type TabType } from "@/data/website/navbar";
import { LuChevronDown } from "react-icons/lu";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/global/ui/popover";

type NavbarProps = {
  variant?: "bar" | "inline";
  className?: string;
};

function Navbar({ variant = "bar", className = "" }: NavbarProps) {
  // const { checkPermissions } = useUser();
  const location = useLocation();
  const [openPopovers, setOpenPopovers] = useState<string[]>([]);

  const togglePopover = (tabLabel: string) => {
    setOpenPopovers((prev) =>
      prev.includes(tabLabel)
        ? prev.filter((label) => label !== tabLabel)
        : [...prev.filter((label) => label !== tabLabel), tabLabel]
    );
  };

  const closePopover = (tabLabel: string) => {
    setOpenPopovers((prev) => prev.filter((label) => label !== tabLabel));
  };

  const isPathMatch = (item: TabType): boolean => {
    if (item.to) {
      // Handle both absolute and relative paths
      const itemPath = item.to.startsWith("/") ? item.to : `/${item.to}`;
      if (itemPath === location.pathname) return true;
    }
    if (item.submenu) return item.submenu.some(isPathMatch);
    return false;
  };

  const hasPermission = (_permissions: string[]) => {
    return true;
    // return permissions.length === 0 || checkPermissions(permissions);
  };

  const renderSubMenu = (items: TabType[], level = 0) => {
    return items
      .filter((item) => hasPermission(item.permission))
      .map((item, index) => {
        // Check if this specific item is the current path
        const isCurrentPath = item.to
          ? (item.to.startsWith("/") ? item.to : `/${item.to}`) ===
            location.pathname
          : false;
        // Check if any descendant is the current path
        const hasCurrentChild = item.submenu
          ? item.submenu.some(isPathMatch)
          : false;
        const isOpen = openPopovers.includes(`${item.label}-${level}`);

        if (item.submenu) {
          return (
            <Popover
              key={index}
              open={isOpen}
              onOpenChange={(open) => {
                if (open) {
                  togglePopover(`${item.label}-${level}`);
                } else {
                  closePopover(`${item.label}-${level}`);
                }
              }}
            >
              <PopoverTrigger asChild>
                <button
                  className={`flex items-center border-b border-secondary-border last:border-b-0 justify-between w-full px-4 py-2 text-right transition-colors cursor-pointer duration-200 ${
                    isCurrentPath || hasCurrentChild
                      ? "text-primary font-medium"
                      : isOpen
                      ? " !text-size16"
                      : "text-inverse-fg hover:text-secondary !text-size16"
                  }`}
                >
                  <span className="text-right flex-1">{item.label}</span>
                  <LuChevronDown
                    className={`size-[16px] mr-2 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="left"
                align="start"
                className="w-56 ml-1 !bg-quaternary-bg !p-0 rounded-[8px]"
                sideOffset={5}
              >
                <div className="space-y-1">
                  {renderSubMenu(item.submenu, level + 1)}
                </div>
              </PopoverContent>
            </Popover>
          );
        }

        return item.to ? (
          <Link
            key={index}
            to={item.to}
            onClick={() => setOpenPopovers([])}
            className={`flex items-center border-b border-secondary-border last:border-b-0 justify-between w-full px-4 py-2 text-right transition-colors cursor-pointer duration-200 ${
              isCurrentPath ? "text-tertiary-bg " : "text-tertiary-bg"
            }`}
          >
            {item.label}
          </Link>
        ) : (
          <span
            key={index}
            className={`group flex flex-col items-center text-size18 text-inverse-fg cursor-pointer  ${
              isCurrentPath ? "text-tertiary-bg" : "text-tertiary-bg"
            }`}
          >
            {item.label}
          </span>
        );
      });
  };

  const containerClasses =
    variant === "inline"
      ? `h-full bg-transparent shadow-none flex items-center gap-4xl px-0 ${className}`
      : `w-full bg-quaternary-bg h-6xl shadow-navbar-shadow flex items-center gap-3xl px-15 ${className}`;

  return (
    <nav className={containerClasses}>
      {tabs
        .filter((tab) => hasPermission(tab.permission))
        .map((tab, index) => {
          // Check if this specific tab is the current path
          const isCurrentPath = tab.to
            ? (tab.to.startsWith("/") ? tab.to : `/${tab.to}`) ===
              location.pathname
            : false;
          // Check if any descendant is the current path
          const hasCurrentChild = tab.submenu
            ? tab.submenu.some(isPathMatch)
            : false;
          const isOpen = openPopovers.includes(tab.label);

          if (tab.submenu) {
            return (
              <Popover
                key={index}
                open={isOpen}
                onOpenChange={(open) => {
                  if (open) {
                    togglePopover(tab.label);
                  } else {
                    closePopover(tab.label);
                  }
                }}
              >
                <PopoverTrigger asChild>
                  <button
                    aria-label={`Toggle ${tab.label}`}
                    title={tab.label}
                    className={`group text-inverse-fg flex  flex-col items-center gap-xxs transition-colors cursor-pointer text-size18 duration-[0.3s] focus:outline-none active:scale-[0.97] active:opacity-90 ${
                      isCurrentPath || hasCurrentChild
                        ? "p-sm border-b-2 border-golden-medium"
                        : isOpen
                        ? " text-size18 "
                        : " text-size18"
                    }`}
                  >
                    <div className="flex items-center gap-md">
                      <span className="transition-colors duration-[0.3s] text-nowrap">
                        {tab.label}
                      </span>
                      <LuChevronDown
                        className={`size-[14px] transition-transform duration-[0.3s]] ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-35 mt-0 border-none bg-golden-medium !p-0 rounded-[8px]"
                  sideOffset={8}
                >
                  <div className="space-y-1">{renderSubMenu(tab.submenu)}</div>
                </PopoverContent>
              </Popover>
            );
          }

          return tab.to ? (
            <Link
              key={index}
              to={tab.to}
              className={`group text-inverse-fg  flex flex-col gap-xxs items-center transition-colors text-size18 duration-[0.3s]] focus:outline-none active:scale-[0.97] active:opacity-90 ${
                isCurrentPath
                  ? "p-sm px-lg  border-b-2 border-golden-medium "
                  : "text-inverse-fg "
              }`}
            >
              <div className="flex items-center gap-md">
                {tab.icon && (
                  <tab.icon className="size-[16px] transition-colors duration-[0.3s]" />
                )}
                <span className="transition-colors duration-[0.3s]">
                  {tab.label}
                </span>
              </div>
            </Link>
          ) : (
            <span
              key={index}
              className={`group flex flex-col items-center text-size18 text-inverse-fg cursor-pointer active:scale-[0.97] active:opacity-90 ${
                isCurrentPath ? "font-medium" : ""
              }`}
            >
              <div className="flex items-center gap-md">
                {tab.icon && <tab.icon className="size-[16px]" />}
                <span>{tab.label}</span>
              </div>
              <span className="h-xxs w-full rounded-full bg-transparent" />
            </span>
          );
        })}
    </nav>
  );
}

export default Navbar;

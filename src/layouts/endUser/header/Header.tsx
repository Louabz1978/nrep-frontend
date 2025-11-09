import { Link, useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import logo from "@/assets/images/new_logo.png";
import { useUser } from "@/stores/useUser";
import { useMemo, useRef, useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { Popover, PopoverContent } from "@/components/global/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { PiGear, PiSignOut, PiUser } from "react-icons/pi";
import useLogoutMutation from "@/hooks/global/logout/useLogoutMutation";
import { useModal } from "@/hooks/global/use-modal";
import { SideModal } from "@/components/global/ui/side-modal";
import Settings from "@/components/global/settings/Settings";
import Navbar from "../navbar/Navbar";
import { userTabs, type UserTabType } from "@/data/endUser/navBar";
import { HiOutlineMenu, HiOutlineChevronDown } from "react-icons/hi";
import { generateReadablePDF } from "@/utils/generatePDF";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/global/tooltip/Tooltiop";

type UserProps = {
  user: ReturnType<typeof useUser>["user"];
  onLogout: () => void;
  onLoginClick: () => void;
};

const UserActions: React.FC<UserProps> = ({ user, onLogout, onLoginClick }) => {
  return (
    <div className="px-4 pt-4 pb-4 border-b border-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <CgProfile className="size-[26px]" />
        <span className="text-size18 font-semibold truncate max-w-[180px]">
          {user
            ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
              user.email
            : "الضيف"}
        </span>
      </div>
      {user ? (
        <button
          className="flex items-center gap-2 text-size14 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full"
          onClick={onLogout}
        >
          <PiSignOut className="size-[16px]" />
          خروج
        </button>
      ) : (
        <button
          className="flex items-center gap-2 text-size14 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full"
          onClick={onLoginClick}
        >
          <LuLogIn className="size-[16px]" />
          دخول
        </button>
      )}
    </div>
  );
};

type NavProps = {
  navItems: UserTabType[];
  openGroups: string[];
  toggleGroup: (label: string) => void;
  navigate: ReturnType<typeof useNavigate>;
  locationPath: string;
  onNavigate: () => void;
};

const Nav: React.FC<NavProps> = ({
  navItems,
  openGroups,
  toggleGroup,
  navigate,
  locationPath,
  onNavigate,
}) => {
  const isPathMatchLocal = (item: UserTabType): boolean => {
    if (item.to) {
      const itemPath = item.to.startsWith("/") ? item.to : `/${item.to}`;
      if (itemPath === locationPath) return true;
    }
    if (item.submenu) return item.submenu.some(isPathMatchLocal);
    return false;
  };

  return (
    <nav className="flex-1 overflow-y-auto py-2">
      {navItems.map((tab, idx) => {
        const isGroup = !!tab.submenu;
        const open = openGroups.includes(tab.label);
        const isActive = tab.to
          ? (tab.to.startsWith("/") ? tab.to : `/${tab.to}`) === locationPath
          : false;
        const hasCurrentChild = tab.submenu
          ? tab.submenu.some(isPathMatchLocal)
          : false;
        return (
          <div key={idx} className="px-3">
            <button
              onClick={() =>
                isGroup
                  ? toggleGroup(tab.label)
                  : (navigate(tab.to || "/"), onNavigate())
              }
              className={`w-full flex items-center justify-between gap-3 text-right transition-colors rounded-full px-4 py-2 mt-3 ${
                open || isActive || hasCurrentChild
                  ? "bg-golden-medium text-tertiary-bg"
                  : "hover:bg-white/10 active:bg-white/15"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.icon ? <tab.icon className="size-[18px]" /> : null}
                <span className="text-size18">{tab.label}</span>
              </span>
              {isGroup ? (
                <HiOutlineChevronDown
                  title={tab.label}
                  className={`${
                    open || hasCurrentChild ? "rotate-180" : ""
                  } transition-transform size-[18px]`}
                />
              ) : null}
            </button>
            {isGroup && open ? (
              <div className="mt-1 mb-1 pl-2 pr-2">
                {tab.submenu?.map((sub: UserTabType, sidx) => {
                  const subPath = sub.to
                    ? sub.to.startsWith("/")
                      ? sub.to
                      : `/${sub.to}`
                    : "";
                  const subActive = Boolean(sub.to) && subPath === locationPath;
                  return (
                    <Link
                      key={sidx}
                      to={sub.to || "/"}
                      onClick={onNavigate}
                      className={`block text-right text-size16 rounded-md px-4 py-2 mt-2 ${
                        subActive
                          ? "bg-golden-bold text-tertiary-bg"
                          : "text-white/90 bg-transparent hover:bg-white/10"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
};

function Header() {
  // user info
  const { user, hasPermissions } = useUser();
  // search value
  const [search, setSearch] = useState("");
  //navigate
  const navigate = useNavigate();

  // modal control method
  const { openModal } = useModal();

  // logout mutations
  const { handleLogout, isLoggingOut } = useLogoutMutation();
  const [isPrinting, setIsPrinting] = useState(false);
  const [isMobileMounted, setIsMobileMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const location = useLocation();

  const contentRef = useRef<HTMLDivElement>(null);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  // 4. Create the handler function
  const handlePrintClick = async () => {
    setIsPrinting(true);
    try {
      // We pass the ID of the *content area*
      await generateReadablePDF("document.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsPrinting(false);
    }
  };

  const navItems = useMemo(() => userTabs, []);

  const openMobile = () => {
    setIsMobileMounted(true);
    requestAnimationFrame(() => setIsSidebarOpen(true));
  };

  const closeMobile = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setIsMobileMounted(false), 300);
  };

  const isRealtor = hasPermissions(["realtor"]);

  return (
    // header container
    <header
      ref={contentRef}
      className="w-full bg-layout-bg max-md:overflow-hidden h-7xl flex  items-center justify-between md:px-container-padding-desktop px-container-padding-mobile py-sm "
    >
      {/* brand + inline nav */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={openMobile}
          className="md:hidden flex items-center justify-center p-2 text-inverse-fg hover:bg-white/10 rounded-full transition-colors"
          aria-label="Open menu"
        >
          <HiOutlineMenu className="size-6" />
        </button>
        {/* Desktop nav */}
        <div className="max-md:hidden">
          <Navbar variant="inline" />
        </div>
      </div>
      <Link to="/end-user" className="flex items-center gap-3 ml-10">
        {/* Logo container */}

        {/* Titles container */}
        <div>
          <div className="font-medium text-size13 text-golden-medium">
            المنصة الوطنية الرقمية للعقارات - حمص
          </div>
          <div className="font-medium text-size14 text-golden-medium">
            National Real Estate Platform - Homs
          </div>
        </div>
        <div className="w-7xl h-7xl flex-shrink-0">
          <img src={logo} alt="NREP" className="size-full object-contain " />
        </div>
      </Link>

      <SideModal size="sm" title={"إعدادات الموقع"} id={`settings`}>
        <Settings />
      </SideModal>

      {/* Mobile screen */}
      {isMobileMounted && (
        <div className="md:hidden fixed inset-0 z-50 ">
          {/* backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMobile}
          />

          <aside
            className={`absolute right-0 top-0 h-full w-[300px] bg-layout-bg text-inverse-fg shadow-2xl flex flex-col transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close button */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <button
                onClick={closeMobile}
                className="flex items-center justify-center p-2 text-inverse-fg hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <AiOutlineClose className="size-6" />
              </button>
            </div>
            <UserActions
              user={user}
              onLogout={() => {
                closeMobile();
                if (!isLoggingOut) handleLogout();
              }}
              onLoginClick={() => {
                closeMobile();
                navigate("/login");
              }}
            />
            <Nav
              navItems={navItems}
              openGroups={openGroups}
              toggleGroup={toggleGroup}
              navigate={navigate}
              locationPath={location.pathname}
              onNavigate={closeMobile}
            />
          </aside>
        </div>
      )}
    </header>
  );
}

export default Header;

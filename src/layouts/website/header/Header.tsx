import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose, AiOutlineBell } from "react-icons/ai";
import logo from "../../../assets/images/logo.png";

function Header() {
  return (
    <header className="w-full bg-[#1C2026] h-20 flex items-center px-12 justify-between border-b border-amber-50">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="h-16 w-auto" />
        </Link>
      </div>

      <div className="flex items-center gap-4 text-white">
        <Link to="/login" aria-label="Profile">
          <CgProfile className="h-8 w-9 text-white cursor-pointer" />
        </Link>

        <Link
          to="/notifications"
          aria-label="Notifications"
          className="relative"
        >
          <AiOutlineBell className="h-8 w-9 text-white cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0D151D]"></span>
        </Link>

        <div className="relative">
          <label htmlFor="search" className="sr-only">
            البحث
          </label>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="البحث"
            className="h-7 w-64 bg-white rounded-2xl pr-4 pl-10 text-right text-black focus:outline-none"
          />
          <span className="absolute inset-y-0 left-3 flex items-center">
            <button className="cursor-pointer bg-white">
              <AiOutlineClose className="h-4 w-4 text-black" />
            </button>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;

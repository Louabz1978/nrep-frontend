import { Outlet } from "react-router-dom";

function GlobalLayout() {
  return (
    <div className="w-full h-full flex flex-col overflow-auto bg-[#f0f6fe]">
      <Outlet />
    </div>
  );
}

export default GlobalLayout;

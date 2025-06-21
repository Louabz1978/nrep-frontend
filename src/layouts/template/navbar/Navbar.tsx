import NAVBAR from "@/data/template/template/navbar";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center gap-2 px-8">
      {NAVBAR?.map((item, index) => {
        return (
          <Link to={item?.route} key={index}>
            {item?.label}
          </Link>
        );
      })}
    </div>
  );
}

export default Navbar;

import React, { useContext } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import ToggleMenuProvider from "../../shop/ToggleMenuContext";


const Header = () => {
  const menuContext = useContext(ToggleMenuProvider)

  return (
    <div
      className={`bg-purple-400 h-28 w-full flex gap-x-1.5 content-center items-center ease-in-out duration-300 ${menuContext.menuOpen ? "pl-64" : "pl-24" }`} 
      style={{
        backgroundImage: "url(" + require("../../images/header-bg1.png") + ")",
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <div className={`text-cyan-800  flex-none ${menuContext.menuOpen ? "rotate-0" : "rotate-180"}`} onClick={() => menuContext.changeMenuOpen(!menuContext.menuOpen)}>
        <MenuOpenIcon />
      </div>
      <div className="flex-1">
        <div className="text-center">
          <div className="relative inline-block left-7 z-10">
            <SearchIcon />
          </div>

          <input type="text" placeholder="search" className="pl-8 py-2 lg:w-1/3 w-1/2 rounded-xl drop-shadow focus-visible:outline-cyan-light" />
        </div>
      </div>
    </div>
  );
};

export default Header;

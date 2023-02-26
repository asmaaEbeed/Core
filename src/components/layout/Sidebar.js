import { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import SidebarList from "./SidebarList";
import ToggleMenuProvider from "../../shop/ToggleMenuContext";

const Sidebar = () => {
  const menuContext = useContext(ToggleMenuProvider)
  return (
    <div className={`absolute bg-cyan-light left-4 ease-in-out duration-300 border-transparent top-3 min-h-[calc(100vh-24px)] border rounded-3xl pt-3 ${menuContext.menuOpen ? " w-56" : "w-16"}`}>
      <div className="text-center">
        {/* Logo div */}
        <div className="text-cyan-800 font-extrabold">LOGO</div>
        {/* profile data */}
        <div className=" w-12 mx-auto h-12 mt-2 rounded-full border-2 border-emerald-300 p-2px">
          <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden text-slate-800 text-9xl leading-3 border border-slate-200">
            <PersonIcon fontSize="large" />
          </div>
        </div>
        {menuContext.menuOpen && <h3 className="font-semibold text-slate-500 mt-2">welcome back,</h3> }
        {menuContext.menuOpen && <h5 className="font-semibold text-slate-800 text-sm">User Name</h5>}
        
      </div>
      {/* List Item */}
      <div className={`mt-4 font-semibold text-slate-800 text-md-xs overflow-hidden ${menuContext.menuOpen ? " pl-3" : "pl-1"} `}>
        <SidebarList />
      </div>
    </div>
  );
};

export default Sidebar;

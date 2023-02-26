import {  useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ToggleMenuProvider from "../../shop/ToggleMenuContext";

const Main = (props) => {
  // const [menuIsOpen, setMenuIsOpen ] = useState(true);
  // const updateMenuIsOpen = () => {
  //   setMenuIsOpen(!menuIsOpen);
  //   console.log({menuIsOpen});
  const menuContext = useContext(ToggleMenuProvider)
  // }
  return (
    <div className="wrapper relative">
      <div>
        {/* <Header updateMenuIsOpen={updateMenuIsOpen} menuIsOpen={menuIsOpen} /> */}
        <Header />
      </div>
      <div>
        {/* <Sidebar menuIsOpen={menuIsOpen} /> */}
        <Sidebar />
      </div>
      <div className={`page-content ${menuContext.menuOpen ? "pl-64" : "pl-24" } ease-in-out duration-300`}>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Main;

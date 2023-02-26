import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const ActionMenu = (({handleClick, row, toView, toEdit}) => {
  const actionDropMenu = false;

  return (
    <div className="action-wrapper relative">
      <Button type="button" btnStyle="plain-icon" handleClick={(e) => {
          const actionWrapper = e.target.closest(".action-wrapper");
          const actionsMenu = actionWrapper.querySelector(".export-drop-menu");
          actionsMenu.classList.toggle("hidden");
          handleClick(actionsMenu);
        }} icon={<MoreVertOutlinedIcon />} />
      
      <ul
        className={`absolute last-relative rounded-lg shadow-md z-40 export-drop-menu w-32 right-9 bg-white  ${actionDropMenu ? "block" : "hidden"}`}
      >
        <li className="hover:bg-cyan-light p-2">
          <Link className="block" to={`${toEdit}/${row[0]}`}>Edit</Link>
        </li>
        <li className="hover:bg-cyan-light p-2">
          <Link className="block" to={`${toView}/${row[0]}`}>View Details</Link>
        </li>
        
      </ul>
    </div>
  );
});

export default ActionMenu;

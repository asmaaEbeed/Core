import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const SidebarList = () => {
  return (
    <div>
      <ul className="whitespace-nowrap">
        <CustomLink to="/dashboard">
          <DashboardOutlinedIcon /> <span className="pl-4"> Dashboard</span>
        </CustomLink>
        <CustomLink to="/company">
          <AccountBalanceOutlinedIcon /> <span className="pl-4"> Company</span>
        </CustomLink>
        <CustomLink to="/departments">
          <AccountTreeOutlinedIcon /> <span className="pl-4"> Departments</span>
        </CustomLink>

        <CustomLink to="/groups">
          <GroupOutlinedIcon /> <span className="pl-4"> Groups</span>
        </CustomLink>
        <CustomLink to="/employees">
          <BadgeOutlinedIcon />
          <span className="pl-4"> Employees</span>
        </CustomLink>
        <CustomLink to="/users">
          <PersonOutlineOutlinedIcon /> <span className="pl-4"> Users</span>
        </CustomLink>
        <CustomLink to="/notifications">
          <NotificationsNoneOutlinedIcon />
          <span className="pl-4"> Notification</span>
        </CustomLink>

        <CustomLink to="/profile-setting">
          <NotificationsNoneOutlinedIcon />
          <span className="pl-4"> Profile Setting</span>
        </CustomLink>

        <li className="pl-4 py-2 mt-px hover:bg-white hover:shadow rounded-tl-2xl rounded-bl-2xl hover:text-cyan-800 cursor-pointer">
          <SettingsOutlinedIcon /> <span className="pl-4">App Setting</span>
        </li>
        <li className="pl-4 py-2 mt-px hover:bg-white hover:shadow rounded-tl-2xl rounded-bl-2xl hover:text-cyan-800 cursor-pointer">
          <LoginOutlinedIcon /> <span className="pl-4"> Log Out</span>
        </li>
      </ul>
    </div>
  );
};

const CustomLink = ({ to, children, ...props }) => {
  // const path = window.location.pathname;
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: false });

  return (
    <li
      className={`pl-4 py-2 mt-px hover:bg-white hover:shadow rounded-tl-2xl rounded-bl-2xl hover:text-cyan-800 cursor-pointer ease-in-out duration-300 ${
        isActive ? "bg-white shadow text-cyan-800" : ""
      }`}
    >
      <Link to={to} style={{ display: "block" }}>
        {children}
      </Link>
    </li>
  );
};

export default SidebarList;

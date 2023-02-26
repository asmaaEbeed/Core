import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Company from '../pages/company/Company';
import AddCompany from '../pages/company/AddCompany';
import CompanyDetails from '../pages/company/CompanyDetails';
import Departments from '../pages/departments/Departments';
import AddDepartments from '../pages/departments/AddDepartment';
import DepartmentDetails from '../pages/departments/DepartmentDetails';
import Employees from '../pages/employees/Employees';
import AddEmployee from '../pages/employees/AddEmployee';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Groups from '../pages/groups/Groups';
import GroupDetails from '../pages/groups/GroupDetails';
import NotFound from '../pages/NotFound';
import AddGroup from '../pages/groups/AddGroup';
import EmployeeDetails from '../pages/employees/EmployeeDetails';
import Users from '../pages/users/Users';
import AddUser from '../pages/users/AddUser';
import UserDetails from '../pages/users/UserDetails';
import Notifications from '../pages/notifications/Notifications';
import ProfileSetting from '../pages/profile_setting/ProfileSetting';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          {/* Company Routes */}
          <Route path="/company" exact  element={<Company />} />
          <Route path="/company/:id" exact  element={<CompanyDetails />} />
          <Route path="/company/edit/:id" exact  element={<AddCompany />} />
          <Route path="/company/add-company" exact element={<AddCompany />} />
          {/* Departments Routes */}
          <Route path="/departments"  element={<Departments />} />
          <Route path="/departments/:id"  element={<DepartmentDetails  />} />
          <Route path="/departments/edit/:id"  element={<AddDepartments />} />
          <Route path="/departments/add-department"  element={<AddDepartments />} />

          <Route path="/groups"  element={<Groups />} />
          <Route path="/groups/:id"  element={<GroupDetails />} />
          <Route path="/groups/edit/:id"  element={<AddGroup />} />
          <Route path="/groups/add-group"  element={<AddGroup />} />
          
          <Route path="/employees" exact element={<Employees />} />
          <Route path="/employees/add-employee"  element={<AddEmployee />} />
          <Route path="/employees/:id"  element={<EmployeeDetails />} />
          <Route path="/employees/edit/:id"  element={<AddEmployee />} />

          <Route path="/users" exact element={<Users />} />
          <Route path="/users/add-user" element={<AddUser />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/edit/:id" element={<AddUser />} />
          
          <Route path="/notifications"  element={<Notifications />} />

          <Route path="/profile-setting" element={<ProfileSetting /> } />

          <Route path='*' exact={true} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

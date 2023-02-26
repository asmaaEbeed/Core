import { useEffect, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../../components/layout/Main";
import Card from "../../components/Card";
import Button from "../../components/Button";
import * as EmployeeApi from "../../API/EmployeesApi";

const EmployeeDetails = () => {
  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";
  const { id } = useParams();
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [empName, setEmpName] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  // const [fileList, setFileList] = useState(null);
  const [employeeNote, setEmployeeNote] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    if (id) {
      const getEmployeeData = async () => {
        const fetchedEmployee = await EmployeeApi.getOne(id);
        console.log(fetchedEmployee);
        if (fetchedEmployee === null) {
          console.log("Employee id not found");
          navigate("/not-found");
        } else {
          setEmployeeData(fetchedEmployee);
        }
      };
      getEmployeeData();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(employeeData).length !== 0) {
      setEmpId(employeeData.id);
      setCreatedDate(employeeData.creationDate);
      setEmpName(employeeData.name);
      setEmpPhone(employeeData.phone);
      setSelectedCompany(employeeData.company);
      setSelectedGroup(employeeData.group);
      setSelectedDepartment(employeeData.department);
      setSelectedRole(employeeData.role);
      setEmployeeNote(employeeData.note);
      setAddressLine(employeeData.addressLine1);
      setAddressLine2(employeeData.addressLine2);
      setCountry(employeeData.country);
      setCity(employeeData.city);
      setZipCode(employeeData.zipCode);
      setState(employeeData.state);
      setUserName(employeeData.userName);
      setEmail(employeeData.email);
      setPassword(employeeData.password);
    }
  }, [employeeData]);

  return (
    <Main>
      <Card title="Personal Info">
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="employeeName"
              placeholder="Employee Name"
              value={empName}
              readonly disabled
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="employeeId"
            >
              Employee Name
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="tel"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="empPhone"
              required
              placeholder="Phone"
              value={empPhone}
              readonly disabled
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="empPhone"
            >
              Phone
            </label>
            <div className="h-5 px-2"></div>
          </div>
        </div>
      </Card>
      <Card title="Employee Info">
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="employeeId"
              placeholder="Employee-ID"
              value={empId}
              readonly disabled
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="employeeId"
            >
              Employee-ID
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="date"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="createdDate"
              required
              placeholder="created Date"
              value={createdDate}
              readonly disabled
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="createdDate"
            >
              Created Date
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="company"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="company"
              value={selectedCompany}
              disabled
              readonly
            >
              <option disabled value="">
                {" "}
                -- Select Company --
              </option>
              <option>{selectedCompany}</option>
            </select>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="company"
            >
              Company
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="group"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={selectedGroup}
              id="group"
              readonly
              disabled
            >
              <option disabled value="">
                {" "}
                -- Select Group --
              </option>
              <option value={selectedGroup}>{selectedGroup}</option>
            </select>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="group"
            >
              Group
            </label>
          </div>

          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="department"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={selectedDepartment}
              id="department"
              disabled
              readonly
            >
              <option disabled value="">
                {" "}
                -- Select Department --
              </option>
              <option value={selectedDepartment}>{selectedDepartment}</option>
            </select>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="department"
            >
              Department
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="role"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={selectedRole}
              disabled
              readonly
              id="role"
            >
              <option disabled value="">
                {" "}
                -- Select Roles --
              </option>
              <option value={selectedRole}>{selectedRole}</option>
            </select>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="role"
            >
              Group
            </label>
          </div>
          <div className="form-row w-full inline-block">
            <textarea
              type="text"
              rows="4"
              className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold"
              id="employeeNote"
              placeholder="Employee Note"
              value={employeeNote} disabled readonly
            ></textarea>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="employeeNote"
            >
              Employee Note
            </label>
          </div>
        </div>
      </Card>
      <Card title="Adress Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={addressLine}
                id="addressLine"
                placeholder="Address Line" readonly disabled
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="addressLine"
              >
                Address Line
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="address2"
                value={addressLine2}
                readonly disabled
                placeholder="Address Line 2"
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="address2"
              >
                Address Line 2
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <select
                name="country"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="country"
                value={country} disabled readonly
              >
                <option value="country 1">Country 1</option>
                <option value="country 2">Country 2</option>
              </select>
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="country"
              >
                Country
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <select
                name="City"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={city} readonly disabled 
                id="city"
              >
                <option value="city 1">City 1</option>
                <option value="city 2">City 2</option>
              </select>
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="city"
              >
                City
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="state"
                value={state} readonly disabled
                placeholder="State"
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="state"
              >
                State
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={zipCode} readonly disabled
                id="zipCode"
                placeholder="Zip Code"
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
            </div>

          </div>
        </Card>
        <Card title="Account Info">
          <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className = {`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={userName} readonly disabled
                id="userName"
                placeholder="User Name"
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="userName"
              >
                User Name
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className = {`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={email} readonly disabled
                id="email"
                placeholder="Email"
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="email"
              >
                Email
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="password"
                className = {`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={password} disabled readonly
                id="password"
                placeholder="Password"
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="password"
              >
                Password
              </label>
            </div>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right mb-5">
        <Button
          title="Edit"
          behavior="link"
          to={`/employees/edit/${id}`}
          btnStyle="cyanBg"
          action="noClickAction"
        />
        <Button
          behavior="link"
          to="/employees"
          title="Back"
          btnStyle="cyan-outline"
        />
      </div>
    </Main>
  );
};

export default EmployeeDetails;

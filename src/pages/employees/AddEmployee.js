import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../../components/layout/Main";
import Card from "../../components/Card";
import * as EmployeeApi from "../../API/EmployeesApi";
import * as CompanyApi from "../../API/CompaniesApi";
import * as GroupApi from "../../API/GroupsApi";
import * as departmentApi from "../../API/DepartmentsApi";
import * as rolesApi from "../../API/RolesApi";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import NotificationSound from "../../sounds/notification-tone.mp3";
import Notification from "../../components/Notification";
import Button from "../../components/Button";

const AddEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }

  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";

  const [idError, setIdError] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [groups, setGroups] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [empId, setEmpId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [empName, setEmpName] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [fileList, setFileList] = useState(null);
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

  const [requestStatus, setRequestStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [editEmp, setEditEmp] = useState("");


  const files = fileList ? [...fileList] : [];
  // 👇 Create new FormData object and append files
  const data = new FormData();

  const handleFileChange = (e) => {
    console.log({ data });
    console.log({ files });
    setFileList(e.target.files);
    handleUploadClick();
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
  };

  useEffect(() => {
    if (!id) {
      getEmployees();
    }
    getCompanies();
    getGroups();
    getDepartments();
    getRoles();
  }, [id]);

  useEffect(() => {
    if (id) {
      const getEmp = async () => {
        const fetchedEmoployee = await EmployeeApi.getOne(id);
        console.log(fetchedEmoployee);
        if (fetchedEmoployee === null) {
          console.log("dept id not found");
          navigate("/not-found");
        } else {
          setEditEmp(fetchedEmoployee);
          setIsUpdating(true);
        }
      };
      getEmp();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(editEmp).length !== 0) {
      console.log(editEmp);
      setEmpId(editEmp.id);
      setCreatedDate(editEmp.creationDate);
      setEmpName(editEmp.name);
      setEmpPhone(editEmp.phone);
      setSelectedCompany(editEmp.company);
      setSelectedGroup(editEmp.group);
      setSelectedRole(editEmp.role);
      setSelectedDepartment(editEmp.department);
      setEmployeeNote(editEmp.note);
      setAddressLine(editEmp.addressLine1);
      setAddressLine2(editEmp.addressLine2);
      setCountry(editEmp.country);
      setCity(editEmp.city);
      setState(editEmp.state);
      setZipCode(editEmp.zipCode);
      setUserName(editEmp.userName);
      setEmail(editEmp.email);
      setPassword(editEmp.password);

    }
  }, [editEmp])

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const getEmployees = async () => {
    const allEmployeeData = await EmployeeApi.getAll();
    setEmployeesData(allEmployeeData);
  };
  const getCompanies = async () => {
    const allCompanies = await CompanyApi.getAll();
    setCompanies(allCompanies);
  };
  const getGroups = async () => {
    const allGroupData = await GroupApi.getAll();
    setGroups(allGroupData);
  };
  const getDepartments = async () => {
    const allDepartmentData = await departmentApi.getAll();
    setDepartments(allDepartmentData);
  };
  const getRoles = async () => {
    const allRolesData = await rolesApi.getAll();
    setRoles(allRolesData);
  };

  const inputId = (e) => {
    setIdError(false);
    employeesData.map((employee) => employee.id === e && setIdError(true));
    !idError && setEmpId(e);
  };
  const handleCreatedDate = (e) => {
    setCreatedDate(e);
  };

  const handleEmpName = (e) => {
    setEmpName(e);
  };

  const handleEmpPhone = (e) => {
    setEmpPhone(e);
  };

  const handleSelectedCompany = (e) => {
    setSelectedCompany(e);
  };

  const handleSelectedGroup = async (e) => {
    setSelectedGroup(e);
  };

  const handleSelectedDepartment = async (e) => {
    setSelectedDepartment(e);
  };

  const handleSelectedRoles = async (e) => {
    setSelectedRole(e);
  };
  const handleEmployeeNote = async (e) => {
    setEmployeeNote(e);
  };

  const handleAddressLine = async (e) => {
    setAddressLine(e);
  };
  const handleAddressLine2 = async (e) => {
    setAddressLine2(e);
  };
  const handleCountry = async (e) => {
    setCountry(e);
  };
  const handleCity = async (e) => {
    setCity(e);
  };
  const handleState = async (e) => {
    setState(e);
  }
  const handleZipCode = async (e) => {
    setZipCode(e)
  }
  const handleUserName = async (e) => {
    setUserName(e);
  }
  const handleEmail = async (e) => {
    setEmail(e);
  }
  const handlePassword = async (e) => {
    setPassword(e);
  }
  const addEmployeeData = async (e) => {
    e.preventDefault();
    setRequestStatus("pending");
    const body = {
      id: empId,
      name: empName,
      phone: empPhone,
      creationDate: createdDate,
      company: selectedCompany,
      group: selectedGroup,
      role: selectedRole,
      note: employeeNote,
      addressLine1: addressLine,
      addressLine2: addressLine2,
      country: country,
      city: city,
      state: state,
      zipCode: zipCode,
      userName: userName,
      email: email,
      password: password,
      filesUploaded: data
    };
    console.log(body);
    if (!idError && !isUpdating) {
      // Add Employee to users first then get user ID and add to 
      const empAdded = await EmployeeApi.addItem(body);
      console.log(empAdded);
      if (empAdded) {
        setRequestStatus("success");
        playAudio();
        const newEmpData = employeesData.concat([empAdded]);
        setEmployeesData(newEmpData);
        resetFormData();
      } else {
        setRequestStatus("error");
      }
    } else if (isUpdating) {
      const empUpdated = await EmployeeApi.updateOne(editEmp, body);
      if (empUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
          navigate("/employees");
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }
  };
  const resetFormData = () => {
    setEmpId("");
    setEmpName("");
    setEmpPhone("");
    setCreatedDate("");
    setSelectedCompany("");
    setSelectedGroup("");
    setSelectedRole("");
    setEmployeeNote("");
    setAddressLine("");
    setAddressLine2("");
    setCountry("");
    setCity("");
    setState("");
    setZipCode("");
    setUserName("");
    setEmail("");
    setPassword("");
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending Message...",
      message: "Your message is on its way!",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Company Data Added Succesfully",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: "Unable to add data.",
    };
  }
  

  return (
    <Main>
      <form onSubmit={addEmployeeData}>
        <Card title="Personal Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="employeeName"
                placeholder="Employee Name"
                value={empName}
                onChange={(event) => handleEmpName(event.target.value)}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(event) => handleEmpPhone(event.target.value)}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
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
            <div className="form-row md:w-1/2 w-full inline-block c">
              <input
                type="text"
                className={`${
                  idError
                    ? "border-red-800 focus-visible:outline-red-800"
                    : "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle} ${
                  isUpdating && "bg-slate-200 cursor-not-allowed"
                }`}
                id="employeeId"
                placeholder="Employee-ID"
                value={empId}
                onChange={(event) => inputId(event.target.value)}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="employeeId"
              >
                Employee-ID
              </label>
              <div className="h-5 px-2">
                {idError && !isUpdating ? (
                  <span className="block text-xxs text-red-800">
                    This Id is Exist
                  </span>
                ) : (
                  !isUpdating && (
                    <span className="block text-xxs text-green-800 italic">
                      To auto generate ID keep it empty.
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="date"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="createdDate"
                required
                placeholder="created Date"
                value={createdDate}
                onChange={(event) => handleCreatedDate(event.target.value)}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(event) => handleSelectedCompany(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- Select Company --
                </option>
                {companies.map((company) => (
                  <option value={company.companyName} key={company.id}>
                    {company.companyName}
                  </option>
                ))}
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(e) => handleSelectedGroup(e.target.value)}
                id="group"
              >
                <option disabled value="">
                  {" "}
                  -- Select Group --
                </option>
                {groups.map((group) => (
                  <option value={group.groupName} key={group.id}>
                    {group.groupName}
                  </option>
                ))}
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(e) => handleSelectedDepartment(e.target.value)}
                id="department"
              >
                <option disabled value="">
                  {" "}
                  -- Select Department --
                </option>
                {departments.map((department) => (
                  <option value={department.departmentName} key={department.id}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(e) => handleSelectedRoles(e.target.value)}
                id="role"
              >
                <option disabled value="">
                  {" "}
                  -- Select Roles --
                </option>
                {roles.map((role) => (
                  <option value={role.name} key={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="role"
              >
                Group
              </label>
            </div>

            <div className="form-row md:w-1/2 w-full inline-block relative align-top">
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light
                 ${inputStyle}`}
                id="attachImage"
                placeholder="Attach image"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="attachImage"
              >
                Attach Image
              </label>

              <ul>
                {files.map((file, i) => (
                  <li key={i}>
                    {file.name} - {file.type}
                  </li>
                ))}
              </ul>

              <button onClick={handleUploadClick}>Upload</button>
              <div className="absolute right-10 top-3 z-10 text-cyan-800">
                <AttachmentOutlinedIcon />
              </div>
            </div>
            <div className="form-row w-full inline-block">
              <textarea
                type="text"
                rows="4"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold"
                id="employeeNote"
                placeholder="Employee Note"
                value={employeeNote}
                onChange={(event) => handleEmployeeNote(event.target.value)}
              ></textarea>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="employeeNote"
              >
                Employee Note
              </label>
            </div>
          </div>
        </Card>
        <Card title="Address Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={addressLine}
                onChange={(e) => handleAddressLine(e.target.value)}
                id="addressLine"
                placeholder="Address Line"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(e) => {
                  handleAddressLine2(e.target.value);
                }}
                placeholder="Address Line 2"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
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
                value={country}
                onChange={(e) => {
                  handleCountry(e.target.value);
                }}
              >
                <option value="country 1">Country 1</option>
                <option value="country 2">Country 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(e) => handleCity(e.target.value)}
                value={city}
                id="city"
              >
                <option value="city 1">City 1</option>
                <option value="city 2">City 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
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
                value={state}
                onChange={(e) => {
                  handleState(e.target.value);
                }}
                placeholder="State"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
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
                value={zipCode}
                onChange={(e) => handleZipCode(e.target.value)}
                id="zipCode"
                placeholder="Zip Code"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(e) => handleUserName(e.target.value)}
                value={userName}
                id="userName"
                placeholder="User Name"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="userName"
              >
                User Name
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className = {`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                onChange={(e) => handleEmail(e.target.value)}
                value={email}
                id="email"
                placeholder="Email"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(e) => handlePassword(e.target.value)}
                value={password}
                id="password"
                placeholder="Password"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="password"
              >
                Password
              </label>
            </div>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right mb-5">
          <Button title="Save" btnStyle="cyanBg" action="noClickAction" />
          <Button
            behavior="link"
            to="/employees"
            title="Cancel"
            btnStyle="cyan-outline"
          />
          <audio ref={audioPlayer} src={NotificationSound} />
        </div>

      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </Main>
  );
};

export default AddEmployee;

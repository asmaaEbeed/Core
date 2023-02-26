import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Main from "../../components/layout/Main";
import Button from "../../components/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  getAll,
  addDeptartment,
  getOne,
  updateDepartment,
} from "../../API/DepartmentsApi";
import * as SubDepartments from "../../API/SubDepartmentApi";
import Notification from "../../components/Notification";
import NotificationSound from "../../sounds/notification-tone.mp3";

import MultiSelect from "../../components/MultiSelect";



const AddDepartments = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleMultiSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSubDeps(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(selectedSubDeps);
  };

  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }
  const [idError, setIdError] = useState(false);
  const [deptId, setDeptId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptManager, setDeptManager] = useState("");
  const [subDepartment, setSubDept] = useState("");
  const [deptDescription, setDeptDesc] = useState("");
  const [checked, setChecked] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [subDeptsData, setSubDeptsData] = useState([]);
  const [selectedSubDeps, setSelectedSubDeps] = useState([]);
  const [requestStatus, setRequestStatus] = useState("");
  const [editDept, setEditDept] = useState("");

  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";

  useEffect(() => {
    if (!id) {
      getDepartments();
    }
  }, [id]);
  const getDepartments = async () => {
    const allDeptData = await getAll();
    setDepartmentData(allDeptData);
  };

  useEffect(() => {
    if (id) {
      const getDept = async () => {
        const fetchedDepartment = await getOne(id);
        console.log(fetchedDepartment);
        if (fetchedDepartment === null) {
          console.log("dept id not found");
          navigate("/not-found");
        } else {
          setEditDept(fetchedDepartment);
          setIsUpdating(true);
        }
      };
      getDept();
    }
  }, [id, navigate]);

  useEffect(() => {
    getSubDepartments();
  }, []);

  const getSubDepartments = async () => {
    const allSubDeptData = await SubDepartments.getAll();
    console.log(allSubDeptData);
    setSubDeptsData(allSubDeptData);
  };

  useLayoutEffect(() => {
    if (Object.keys(editDept).length !== 0) {
      setDeptId(editDept.id);
      setDeptName(editDept.departmentName);
      if (editDept.status === "Active") {
        setChecked(true);
      } else {
        setChecked(false);
      }
      setCreatedDate(editDept.creationDate);
      setDeptManager(editDept.departmentMngr);
      setSubDept(editDept.subDepartment);
      setDeptDesc(editDept.deptDescription);
      if (editDept.selectedSubDeps) {
        setSelectedSubDeps(editDept.selectedSubDeps);
      } else {
        setSelectedSubDeps([]);
      }
    }
  }, [editDept]);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };

  const inputId = (e) => {
    setIdError(false);
    departmentData.map((department) => department.id === e && setIdError(true));
    !idError && setDeptId(e);
  };
  const inputDate = (e) => {
    setCreatedDate(e);
  };
  const inputDeptName = (e) => {
    setDeptName(e);
    console.log(deptName);
  };
  const selectDeptManager = (e) => {
    setDeptManager(e);
    console.log(deptManager);
  };

  const deptDesc = (e) => {
    setDeptDesc(e);
  };

  const addDepartmentData = async (event) => {
    event.preventDefault();
    setRequestStatus("pending");
    const body = {
      id: deptId,
      departmentName: deptName,
      status: checked ? "Active" : "Deactive",
      departmentMngr: deptManager,
      subDepartment: subDepartment,
      deptDescription: deptDescription,
      creationDate: createdDate,
      selectedSubDeps: selectedSubDeps,
    };

    if (!idError && !isUpdating) {
      const deptAdded = await addDeptartment(body);
      console.log(deptAdded);
      if (deptAdded) {
        setRequestStatus("success");
        playAudio();
        const newDeptData = departmentData.concat([deptAdded]);
        setDepartmentData(newDeptData);
        resetFormData();
      } else {
        setRequestStatus("error");
      }
    } else if (isUpdating) {
      const deptUpdated = await updateDepartment(editDept, body);
      if (deptUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
          navigate("/departments");
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }
  };

  const resetFormData = () => {
    setDeptId("");
    setDeptName("");
    setChecked(true);
    setDeptManager("");
    setSubDept("");
    setDeptDesc("");
    setCreatedDate("");
    setSelectedSubDeps([]);
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
      <form onSubmit={addDepartmentData}>
        <Card title="Department Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`${
                  idError
                    ? "border-red-800 focus-visible:outline-red-800"
                    : "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle} ${
                  isUpdating && "bg-slate-200 cursor-not-allowed"
                }`}
                id="departmentId"
                placeholder="Department-ID"
                value={deptId}
                onChange={(event) => inputId(event.target.value)}
                
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="departmentId"
              >
                Department-ID
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
                onChange={(event) => inputDate(event.target.value)}
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
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="deptartmentName"
                placeholder="Department Name"
                value={deptName}
                onChange={(event) => inputDeptName(event.target.value)}
                required
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="departmentName"
              >
                Department Name
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <select
                name="departmentManager"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="departmentManager"
                value={deptManager}
                onChange={(event) => selectDeptManager(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- Select manager --
                </option>
                <option value="manager 1">Department Manager 1</option>
                <option value="manager 2">Department Manager 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="departmentManager"
              >
                Department Manager
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block">
            <MultiSelect optionsData={subDeptsData} title="SubDepartments" selectedData={selectedSubDeps} handleMultiSelectChange={handleMultiSelectChange} />
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block">
              <textarea
                type="text"
                rows="7"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold"
                id="departmentDescription"
                placeholder="Department Description"
                value={deptDescription}
                onChange={(event) => deptDesc(event.target.value)}
              ></textarea>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="departmentDescription"
              >
                Deapartment Description
              </label>
            </div>
            <FormGroup>
              <div className="flex text-gray-400 font-normal">
                <label className="leading-8 text-cyan-800 font-semibold pr-2">
                  Status:{" "}
                </label>

                <FormControlLabel
                  control={<Switch checked={checked} onChange={handleChange} />}
                  label={checked ? "Deactive" : "Active"}
                />
              </div>
            </FormGroup>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right mb-5">
          <Button title="Save" btnStyle="cyanBg" action="noClickAction" />
          <Button
            behavior="link"
            to="/departments"
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

export default AddDepartments;

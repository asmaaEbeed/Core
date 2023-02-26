import { useEffect, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Main from "../../components/layout/Main";
import { getOne } from "../../API/DepartmentsApi";
import Card from "../../components/Card";
import Button from "../../components/Button";

import MultiSelect from "../../components/MultiSelect";

const DepartmentDetails = () => {
  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";
  const [deptId, setDeptId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptManager, setDeptManager] = useState("");
  const [deptDescription, setDeptDesc] = useState("");
  const [checked, setChecked] = useState(true);
  const [departmentData, setDepartmentData] = useState([]);
  const [selectedSubDeps, setSelectedSubDeps] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getDepartment = async () => {
        const fetchedDept = await getOne(id);
        console.log(fetchedDept);
        if (fetchedDept === null) {
          console.log("Department id not found");
          navigate("/not-found");
        } else {
          setDepartmentData(fetchedDept);
        }
      };
      getDepartment();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(departmentData).length !== 0) {
      setDeptId(departmentData.id);
      setDeptName(departmentData.departmentName);
      if (departmentData.status === "Active") {
        setChecked(true);
      } else {
        setChecked(false);
      }
      setCreatedDate(departmentData.creationDate);
      setDeptManager(departmentData.departmentMngr);
      setDeptDesc(departmentData.deptDescription);
      if (departmentData.selectedSubDeps) {
        setSelectedSubDeps(departmentData.selectedSubDeps);
      } else {
        setSelectedSubDeps([]);
      }
    }
  }, [departmentData]);

  return (
    <Main>
      <Card title={`Department ${departmentData.departmentName} Data`}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="departmentId"
              placeholder="Department-ID"
              value={deptId}
              readOnly
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="departmentId"
            >
              Department-ID
            </label>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="date"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="createdDate"
              placeholder="created Date"
              value={createdDate}
              readOnly
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
            <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="deptartmentName"
              placeholder="Department Name"
              value={deptName}
              readOnly
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
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
              readOnly
              disabled
            >
              <option disabled value="">
                {" "}
                -- Select manager --
              </option>
              <option value="manager 1">Department Manager 1</option>
              <option value="manager 2">Department Manager 2</option>
            </select>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="departmentManager"
            >
              Department Manager
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row w-full inline-block">
              <MultiSelect title="SubDepartments" selectedSubDeps={selectedSubDeps} disabled={true} />

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
              readOnly
              disabled
            ></textarea>
            <label
              className="label-helper visible text-cyan-800 font-normal"
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
                control={<Switch checked={checked} disabled />}
                label={checked ? "Deactive" : "Active"}
              />
            </div>
          </FormGroup>
        </div>
      </Card>
      <div className="md:w-10/12 w-11/12 mx-auto text-right mb-5">
        <Button
          title="Edit"
          behavior="link"
          to={`/departments/edit/${id}`}
          btnStyle="cyanBg"
          action="noClickAction"
        />
        <Button
          behavior="link"
          to="/departments"
          title="Back"
          btnStyle="cyan-outline"
        />
      </div>
    </Main>
  );
};

export default DepartmentDetails;

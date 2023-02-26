import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Main from "../../components/layout/Main";
import Button from "../../components/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import * as GroupsApi from "../../API/GroupsApi";
import * as EmployeesApi from "../../API/EmployeesApi";
import MultiSelect from "../../components/MultiSelect";
import Notification from "../../components/Notification";
import NotificationSound from "../../sounds/notification-tone.mp3";

const AddGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";

  const [isUpdating, setIsUpdating] = useState(false);
  const [idError, setIdError] = useState(false);
  const [groupsData, setGroupsData] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupManager, setGroupManager] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedGrpMember, setSelectedGrpMember] = useState([]);
  /*Prepare employees for multiselect*/
  const [selectEmployeesList, setSelectEmployeesList] = useState([]);
  const [groupDescription, setGroupDescription] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [editGroup, setEditGroup] = useState("");

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    if (!id) {
      getGroups();
    }
    getEmployees();
  }, [id]);

  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }

  const getGroups = async () => {
    const allGroupsData = await GroupsApi.getAll();
    setGroupsData(allGroupsData);
  };
  const getEmployees = async () => {
    const allEmployeesData = await EmployeesApi.getAll();
    setAllEmployees(allEmployeesData);
  };

  useEffect(() => {
    if (id) {
      const getGroup = async () => {
        const fetchedGroup = await GroupsApi.getOne(id);
        console.log(fetchedGroup);
        if (fetchedGroup === null) {
          console.log("dept id not found");
          navigate("/not-found");
        } else {
          setEditGroup(fetchedGroup);
          setIsUpdating(true);
        }
      };
      getGroup();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(editGroup).length !== 0) {
      console.log(editGroup);
      setGroupId(editGroup.id);
      setGroupName(editGroup.groupName);
      setCreatedDate(editGroup.creationDate);
      setGroupDescription(editGroup.groupDescription);
      setSelectedGrpMember(editGroup.groupMembers);
      setGroupManager(editGroup.groupManager);
      if (editGroup.status === "Active") {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  }, [editGroup]);
  // Prepare data of employees for multi select (id, value, label)
  useEffect(() => {
    addEmployessListItems();
  }, []);
  const addEmployessListItems = async () => {
    const allEmployeesData = await EmployeesApi.getAll();
    let selectEmployeeListItem = [];
    if (allEmployeesData.length > 0) {
      allEmployeesData.map((employee) =>
        selectEmployeeListItem.push({
          id: employee.id,
          value: employee.name,
          label: employee.name,
        })
      );
      setSelectEmployeesList(selectEmployeeListItem);
    }
  };

  const inputId = (e) => {
    setIdError(false);
    groupsData.map((group) => group.id === e && setIdError(true));
    !idError && setGroupId(e);
  };
  const inputDate = (e) => {
    setCreatedDate(e);
  };
  const inputGroupName = (e) => {
    setGroupName(e);
  };
  const selectGroupManager = (e) => {
    setGroupManager(e);
    console.log(groupManager);
  };

  const handleMultiSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedGrpMember(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const groupDesc = (e) => {
    setGroupDescription(e);
  };

  const addGroupData = async (e) => {
    setRequestStatus("pending");
    e.preventDefault();
    const body = {
      id: groupId,
      groupName: groupName,
      status: checked ? "Active" : "Deactive",
      groupManager: groupManager,
      groupDescription: groupDescription,
      creationDate: createdDate,
      groupMembers: selectedGrpMember,
      NoOfMembers: selectedGrpMember.length,
    };
    if (!idError && !isUpdating) {
      const groupAdded = await GroupsApi.addGroup(body);
      console.log(groupAdded);
      if (groupAdded) {
        setRequestStatus("success");
        playAudio();
        const newGroupData = groupsData.concat([groupAdded]);
        setGroupsData(newGroupData);
        resetFormData();
      } else {
        setRequestStatus("error");
      }
    } else if (isUpdating) {
      const groupUpdated = await GroupsApi.updateGroup(editGroup, body);
      if (groupUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
          navigate("/groups");
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }
  };
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const resetFormData = () => {
    setGroupId("");
    setGroupName("");
    setChecked(true);
    setGroupManager("");
    setGroupDescription("");
    setCreatedDate("");
    setSelectedGrpMember([]);
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
      <form onSubmit={addGroupData}>
        {/* Group Info */}
        <Card title="Group Info">
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
                id="groupId"
                placeholder="Group ID"
                value={groupId}
                onChange={(event) => inputId(event.target.value)}
                readOnly={isUpdating}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="groupId"
              >
                Group-ID
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
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="groupName"
                placeholder="Group Name"
                value={groupName}
                onChange={(event) => inputGroupName(event.target.value)}
                required
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="groupName"
              >
                Group Name
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <select
                name="groupManager"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="groupManager"
                value={groupManager}
                onChange={(event) => selectGroupManager(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- Select manager --
                </option>
                {allEmployees.map(
                  (employee) =>
                    employee.role === "manager" && (
                      <option value={employee.name} key={employee.id}>
                        {employee.name}
                      </option>
                    )
                )}
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="groupManager"
              >
                Group Manager
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block align-top">
              <MultiSelect
                optionsData={selectEmployeesList}
                title="Employees"
                selectedData={selectedGrpMember}
                handleMultiSelectChange={handleMultiSelectChange}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="groupMembers"
              >
                Group Member
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block align-top">
              <textarea
                type="text"
                rows="7"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold"
                id="groupDescription"
                placeholder="Group Description"
                value={groupDescription}
                onChange={(event) => groupDesc(event.target.value)}
              ></textarea>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="groupDescription"
              >
                Group Description
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
            to="/groups"
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

export default AddGroup;

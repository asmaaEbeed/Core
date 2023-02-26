import { useEffect, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Main from "../../components/layout/Main";
import * as GroupsApi from "../../API/GroupsApi";
import Card from "../../components/Card";
import Button from "../../components/Button";

import MultiSelect from "../../components/MultiSelect";

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";

  const [groupId, setGroupId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupManager, setGroupManager] = useState("");
  const [selectedGrpMember, setSelectedGrpMember] = useState([]);
  const [groupDescription, setGroupDescription] = useState("");
  const [editGroup, setEditGroup] = useState("");

  const [checked, setChecked] = useState(true);

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

  return (
    <Main>
      <Card title={`Group ${editGroup.groupName} Data`}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`${"mb-2 border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="departmentId"
              placeholder="Department-ID"
              value={groupId}
              readOnly
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="groupId"
            >
              Group-ID
            </label>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top mb-2">
            <input
              type="date"
              className={`mb-2 border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="createdDate"
              required
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
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top mb-2">
              <input
                type="text"
                className={`mb-2 border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="groupName"
                placeholder="Group Name"
                value={groupName}
                required
                readOnly
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="groupName"
              >
                Group Name
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top mb-2">
              <select
                name="groupManager"
                className={`mb-2 border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="groupManager"
                value={groupManager}
                readOnly disabled
              >
                <option >
                  {groupManager}
                </option>
                
              </select>
              <label
                className="label-helper visible text-cyan-800 font-normal"
                htmlFor="groupManager"
              >
                Group Manager
              </label>
            </div>
            <div className="form-row w-full inline-block align-top">
              <MultiSelect
                title="Employees"
                selectedData={selectedGrpMember} disabled={true}
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
                readOnly
              ></textarea>
              <label
                className="label-helper visible text-cyan-800 font-normal"
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
          to={`/groups/edit/${id}`}
          btnStyle="cyanBg"
          action="noClickAction"
        />
        <Button
          behavior="link"
          to="/groups"
          title="Back"
          btnStyle="cyan-outline"
        />
      </div>
    </Main>
  );
};

export default GroupDetails;

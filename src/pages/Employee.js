import React from "react";
import Card from "../components/Card";
import Main from "../components/layout/Main";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import Button from "../components/Button";

const Employee = () => {
  return (
    <Main>
      <form>
        {/* Personal Info */}
        <Card title="Personal Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="employeeName"
                placeholder="Employee Name"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="employeeName"
              >
                Employee Name
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="phone"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="phone"
                placeholder="Phone"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="phone"
              >
                Phone
              </label>
            </div>
          </div>
        </Card>

        {/* Employee Info */}
        <Card title="Emplyee Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="employeeId"
                placeholder="Employee-ID"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="employeeId"
              >
                Employee-ID
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="date"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="joinDate"
                placeholder="Join Date"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="joinDate"
              >
                Join Date
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <select
                name="comapny"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="company"
              >
                <option value="company 1">Company 1</option>
                <option value="company 2">Company 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="company"
              >
                Company
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <select
                name="group"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="group"
              >
                <option value="group 1">group 1</option>
                <option value="group 2">group 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="group"
              >
                Group
              </label>
            </div>
            <div className="form-row w-full inline-block relative">
              <input
                type="file"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold"
                id="attachFiles"
                placeholder="Attach files"
                multiple
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="attachFiles"
              >
                Attach File
              </label>
              <div className="absolute right-10 top-3 z-10 text-cyan-800">
                <AttachmentOutlinedIcon />
              </div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block mt-5">
              <select
                name="department"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="department"
              >
                <option value="department1">Department 1</option>
                <option value="department2">Department 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="department"
              >
                Department
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block mt-5">
              <select
                name="job role"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="jobRole"
              >
                <option value="Role 1">Role 1</option>
                <option value="Role 2">Role 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="jobRole"
              >
                Job Role
              </label>
            </div>
            <div className="form-row w-full inline-block">
              <textarea
                type="text"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold"
                id="notes"
                placeholder="Enter Notes"
              ></textarea>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="notes"
              >
                Notes
              </label>
            </div>
          </div>
        </Card>
        {/* address Info */}
        <Card title="Address Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="address1"
                placeholder="Address Line 1"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="address1"
              >
                Address Line 1
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="address2"
                placeholder="Address Line 2"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="address2"
              >
                Address Line 2
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <select
                name="country"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="country"
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
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <select
                name="City"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
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
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <select
                name="state"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="state"
              >
                <option value="state 1">State 1</option>
                <option value="state 2">State 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="state"
              >
                State
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
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
        {/* Account Info */}
        <Card title="Account Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
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
                type="email"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="email"
                placeholder="Email"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="Password"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-11/12 text-slate-700 text-md-xs font-semibold"
                id="password"
                placeholder="Password"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="password"
              >
                password
              </label>
            </div>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right mb-5">
          <Button title="Add" btnStyle="cyanBg" />
          <Button title="cancel" btnStyle="cyan-outline" />
        </div>
      </form>
    </Main>
  )
}

export default Employee
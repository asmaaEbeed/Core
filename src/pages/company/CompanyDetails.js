import React, { useEffect, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../../components/layout/Main";
import { getOne } from "../../API/CompaniesApi";
import Card from "../../components/Card";
import Button from "../../components/Button";

const CompanyDetails = () => {
  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";

  const [coId, setCoId] = useState("");
  const [coName, setCoName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [coManager, setCoManager] = useState("");
  const [coType, setCoType] = useState("");
  const [coOwner, setCoOwner] = useState("");
  const [coDescription, setCoDescription] = useState("");
  const [companyInfo, setCompanyInfo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getCompany = async () => {
        const fetchedCompany = await getOne(id);
        console.log(fetchedCompany);
        if (fetchedCompany === null) {
          console.log("co id not found");
          navigate("/not-found");
        } else {
          setCompanyInfo(fetchedCompany);
        }
      };
      getCompany();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(companyInfo).length !== 0) {
      setCoId(companyInfo.id);
      setCoName(companyInfo.companyName);
      setCoManager(companyInfo.companyManager);
      setCreatedDate(companyInfo.creationDate);
      setCoType(companyInfo.companyType);
      setCoOwner(companyInfo.companyOwner);
      setCoDescription(companyInfo.companyDescription);
    }
  }, [companyInfo]);

  return (
    <Main>
      <Card title={`View company ${coName} information.`}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="companyId"
              placeholder="Company-ID"
              value={coId}
              readOnly
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="companyId"
            >
              Company-ID
            </label>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="date"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="createdDate"
              readOnly
              placeholder="created Date"
              defaultValue={createdDate}
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="createdDate"
            >
              Created Date
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="companyName"
              placeholder="Company Name"
              defaultValue={coName}
              readOnly
            />
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top"></div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <select
              name="companyManager"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="companyManager"
              defaultValue={coManager}
              readOnly
              disabled
            >
              <option disabled value="">
                {" "}
                -- Select Co manager --
              </option>
              <option value="Manager1">Company Manager 1</option>
              <option value="Manager2">Company Manager 2</option>
            </select>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="companyManager"
            >
              Company Manager
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <select
              name="companyType"
              id="companyType"
              value={coType}
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              readOnly
              disabled
            >
              <option disabled value="">
                {" "}
                -- Select Co Type --
              </option>
              <option value="companyType1">Company Type 1</option>
              <option value="companyType2">Company Type 2</option>
            </select>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="companyType"
            >
              Company Type
            </label>
          </div>
          <div className="form-row w-full inline-block align-top">
            <select
              name="companyOwner"
              className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold "
              id="companyOwner"
              value={coOwner}
              readOnly
              disabled
            >
              <option disabled value="">
                {" "}
                -- Select Co. Owners --
              </option>
              <option disabled>Company Owners/Collaborators</option>
              <option value="member1">Owners 1</option>
              <option value="member2">Owners 2</option>
            </select>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="companyOwner"
            >
              Company Owners
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row w-full inline-block align-top">
            <textarea
              type="text"
              className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-none w-96-percent text-slate-700 text-md-xs font-semibold"
              id="companyDescription"
              placeholder="Company Description" readOnly
              value={coDescription}
            ></textarea>
            <label
              className="label-helper visible text-cyan-800 font-normal"
              htmlFor="companyDescription"
            >
              Company Description
            </label>
            
          </div>
        </div>
      </Card>
      <div className="md:w-10/12 w-11/12 mx-auto text-right mb-5">
          <Button title="Edit" behavior="link" to={`/company/edit/${id}`} btnStyle="cyanBg" action="noClickAction" />
          <Button
            behavior="link"
            to="/company"
            title="Back"
            btnStyle="cyan-outline"
          />
        </div>
    </Main>
  );
};

export default CompanyDetails;

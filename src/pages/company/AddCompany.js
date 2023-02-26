import React, { useEffect, useLayoutEffect, useState } from "react";
import Main from "../../components/layout/Main";
import Card from "../../components/Card";
import Button from "../../components/Button";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import {
  getAll,
  addCompany,
  updateCompany,
  getOne,
} from "../../API/CompaniesApi";
import Notification from "../../components/Notification";
import { useParams, useNavigate } from "react-router-dom";

const AddCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";
  const [coId, setCoId] = useState("");
  const [idError, setIdError] = useState(false);
  const [coName, setCoName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [coManager, setCoManager] = useState("");
  const [coType, setCoType] = useState("");
  const [coOwner, setCoOwner] = useState("");
  const [coDescription, setCoDescription] = useState("");
  const [companiesData, setCompaniesData] = useState([]);
  const [requestStatus, setRequestStatus] = useState("");
  const [editCompany, setEditCompany] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    getAll().then((res) => setCompaniesData(res));
  }, []);

  useEffect(() => {
    if (id) {
      const getCompany = async () => {
        const fetchedCompany = await getOne(id);
        console.log(fetchedCompany);
        if (fetchedCompany === null) {
          console.log("co id not found");
          navigate("/not-found");
        } else {
          setEditCompany(fetchedCompany);
          setIsUpdating(true)
        }
      };
      getCompany();
    }
  }, [id, navigate]);
  useLayoutEffect(() => {
    if (Object.keys(editCompany).length !== 0) {
      setCoId(editCompany.id);
      setCoName(editCompany.companyName);
      setCoManager(editCompany.companyManager);
      setCreatedDate(editCompany.creationDate);
      setCoType(editCompany.companyType);
      setCoOwner(editCompany.companyOwner);
      setCoDescription(editCompany.companyDescription);
    }
  }, [editCompany]);

  
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const inputId = (e) => {
    setIdError(false);
    companiesData.map((company) => company.id === e && setIdError(true));
    !idError && setCoId(e);
  };
  const inputDate = (e) => {
    setCreatedDate(e);
  };

  const inputCompanyName = (e) => {
    setCoName(e);
  };

  const inputImageAttach = (e) => {
    setImageUploadError(false);
    if (
      e.type === "image/png" ||
      e.type === "image/gif" ||
      e.type === "image/jpeg" ||
      e.type === "image/jpg"
    ) {
      setImageUploadError(false);
      setImageUpload(e);
    } else {
      setImageUploadError(true);
    }
  };

  const selectCoManager = (e) => {
    setCoManager(e);
  };

  const selectCoType = (e) => {
    console.log({ e });
    setCoType(e);
  };

  const selectCoOwner = (e) => {
    setCoOwner(e);
  };

  const inputCoDescription = (e) => {
    setCoDescription(e);
  };

  const resetFormData = () => {
    setCoId("");
    setCoName("");
    setCoManager("");
    setCoDescription("");
    setCoOwner("");
    setCoType("");
    document.getElementById("attachImage").value = "";
    setCreatedDate("");
  };
  const addCompanyData = (event) => {
    event.preventDefault();
    console.log("as");
    console.log(imageUpload);
    setRequestStatus("pending");

    const body = {
      id: coId,
      companyName: coName,
      companyType: coType,
      creationDate: createdDate,
      imageUpload: imageUpload,
      companyManager: coManager,
      companyOwner: coOwner,
      companyDescription: coDescription,
    };

    if (!idError && !imageUploadError && !isUpdating) {
      addCompany(body).then((res) => {
        if (res.ok) {
          res.json();
          setRequestStatus("success");
          resetFormData();
        } else {
          setRequestStatus("error");
        }
      });
    } else if(isUpdating && !imageUploadError) {
      updateCompany(editCompany, body).then((res) => {
        if (res.ok) {
          let timer;
          clearTimeout(timer)
          console.log(res);
          const newData  = res.json();
          console.log(newData.id);
          setRequestStatus("success");
          // resetFormData();
          timer = setTimeout(() => {
            navigate('/company');
          }, 3000);
        } else {
          setRequestStatus("error");
        }
      });
    }
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
      <form onSubmit={addCompanyData}>
        {/* Group Info */}
        <Card title="Company Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`${
                  idError
                    ? "border-red-800 focus-visible:outline-red-800"
                    : "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle} ${isUpdating && "bg-slate-200 cursor-not-allowed"}`}
                id="companyId"
                disabled={isUpdating}
                placeholder="Company-ID"
                value={coId}
                onChange={(event) => inputId(event.target.value)}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="companyId"
              >
                Company-ID
              </label>
              <div className="h-5 px-2">
                {idError && !isUpdating ? (
                  <span className="block text-xxs text-red-800">
                    This Id is Exist
                  </span>
                ) : ( !isUpdating &&
                  <span className="block text-xxs text-green-800 italic">
                    To auto generate ID keep it empty.
                  </span>
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="companyName"
                placeholder="Company Name"
                value={coName}
                onChange={(event) => inputCompanyName(event.target.value)}
                required
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="companyName"
              >
                Company Name
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block relative align-top">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                className={`${
                  idError
                    ? "border-red-800 focus-visible:outline-red-800"
                    : "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle}`}
                id="attachImage"
                placeholder="Attach image"
                onChange={(event) => inputImageAttach(event.target.files[0])}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="attachImage"
              >
                Attach Image
              </label>
              <div className="absolute right-10 top-3 z-10 text-cyan-800">
                <AttachmentOutlinedIcon />
              </div>
              <div className="h-5 px-2">
                {imageUploadError && (
                  <span className="block text-xxs text-red-800">
                    Only support .jpg, .jpeg, .png, .gif
                  </span>
                )}
              </div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <select
                name="companyManager"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="companyManager"
                value={coManager}
                onChange={(event) => selectCoManager(event.target.value)}
              >
                <option value="Manager1">Company Manager 1</option>
                <option value="Manager2">Company Manager 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
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
                onChange={(event) => selectCoType(event.target.value)}
              >
                <option value="companyType1">Company Type 1</option>
                <option value="companyType2">Company Type 2</option>
              </select>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="companyType"
              >
                Company Type
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block align-top">
              <select
                name="companyOwner"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold "
                id="companyOwner"
                value={coOwner}
                onChange={(event) => selectCoOwner(event.target.value)}
              >
                <option disabled>Company Owners/Collaborators</option>
                <option value="member1">Owners 1</option>
                <option value="member2">Owners 2</option>
              </select>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block align-top">
              <textarea
                type="text"
                rows="7"
                className="input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold"
                id="companyDescription"
                placeholder="Company Description"
                value={coDescription}
                onChange={(event) => inputCoDescription(event.target.value)}
              ></textarea>
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="companyDescription"
              >
                Company Description
              </label>
            </div>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right mb-5">
          <Button title="Add" btnStyle="cyanBg" action="noClickAction" />
          <Button
            behavior="link"
            to="/company"
            title="Cancel"
            btnStyle="cyan-outline"
          />
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

export default AddCompany;

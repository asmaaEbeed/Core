import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Main from "../../components/layout/Main";
import Button from "../../components/Button";
import * as UsersApi from "../../API/UsersApi";
import NotificationSound from "../../sounds/notification-tone.mp3";
import Notification from "../../components/Notification";

const AddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }

  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";

  const [isUpdating, setIsUpdating] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usersData, setUsersData] = useState([]);
  // const [userId, setUserId] = useState("");
  // const [createdDate, setCreatedDate] = useState("");
  const [phone, setPhone] = useState("");
  const [personalName, setPersonalName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [requestStatus, setRequestStatus] = useState("");
  const [editUser, setEditUser] = useState("");


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

  useEffect(() => {
    if (!id) {
      getUsers();
    }
  }, [id]);

  const getUsers = async () => {
    const allUsersData = await UsersApi.getAll();
    setUsersData(allUsersData);
  };

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const fetchedUser = await UsersApi.getOne(id);
        console.log(fetchedUser);
        if (fetchedUser === null) {
          console.log("User not found");
          navigate("/not-found");
        } else {
          setEditUser(fetchedUser);
          setIsUpdating(true);
        }
      };
      getUser();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(editUser).length !== 0) {
      console.log(editUser);
      setPhone(editUser.phone);
      setPersonalName(editUser.personal_name);
      setAddressLine1(editUser.addressLine1);
      setAddressLine2(editUser.addressLine2);
      setCountry(editUser.country);
      setCity(editUser.city);
      setState(editUser.state);
      setZipCode(editUser.zipCode);
      setUserName(editUser.userName);
      setEmail(editUser.email);
      setPassword(editUser.password);

    }
  }, [editUser])

  const handlePersonalName = async (e) => {
    setPersonalName(e);
  };
  const handleUserPhone = async (e) => {
    setPhone(e);
  };

  const handleAddressLine1 = async (e) => {
    setAddressLine1(e);
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
  };
  const handleZipCode = async (e) => {
    setZipCode(e);
  };

  const handleUserName = async (e) => {
    setUserName(e);
  };

  const handleEmail = async (e) => {
    setEmailError(false);
    usersData.map((user) => user.email === e && setEmailError(true));
    !emailError && setEmail(e);
  };

  const handlePassword = async (e) => {
    setPassword(e);
  };

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  var today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const addUserData = async (e) => {
    e.preventDefault();
    setRequestStatus("pending");
    const body = {
      personal_name: personalName,
      phone: phone,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      creationDate: date,
      country: country,
      city: city,
      state: state,
      zipCode: zipCode,
      userName: userName,
      email: email,
      password: password
    }

    console.log(body);
    if (!emailError && !isUpdating) {
      // Add Employee to users first then get user ID and add to 
      const userAdded = await UsersApi.addOne(body);
      console.log(userAdded);
      if (userAdded) {
        setRequestStatus("success");
        playAudio();
        const newUserData = usersData.concat([userAdded]);
        setUsersData(newUserData);
        // resetFormData();
      } else {
        setRequestStatus("error");
      }
    } else if (isUpdating) {
      const userUpdated = await UsersApi.updateOne(editUser, body);
      if (userUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
          navigate("/users");
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }

  };

  return (
    <Main>
      <form onSubmit={addUserData}>
        <Card title="User Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="personalName"
                placeholder="User Name"
                value={personalName}
                onChange={(event) => handlePersonalName(event.target.value)}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="personalName"
              >
                User Name
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="tel"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="userPhone"
                required
                placeholder="Phone"
                value={phone}
                onChange={(event) => handleUserPhone(event.target.value)}
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="userPhone"
              >
                Phone
              </label>
              <div className="h-5 px-2"></div>
            </div>
          </div>
        </Card>
        <Card title="Address Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={addressLine1}
                onChange={(e) => handleAddressLine1(e.target.value)}
                id="addressLine"
                placeholder="Address Line"
              />
              <label
                className="label-helper text-cyan-800 font-normal"
                htmlFor="addressLine"
              >
                Address Line 1
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <select
                name="country"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="country"
                value={country}
                onChange={(e) => {
                  handleCountry(e.target.value);
                }}
              >
                <option disabled value="">
                {" "}
                -- Select Country --
              </option>
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <select
                name="City"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                onChange={(e) => handleCity(e.target.value)}
                value={city}
                id="city"
              >
                <option disabled value="">
                {" "}
                -- Select City --
              </option>
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
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
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                required
                className={`${
                  emailError
                    ? "border-red-800 focus-visible:outline-red-800"
                    : "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle} ${
                  isUpdating && "bg-slate-200 cursor-not-allowed"
                }`}
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
              <div className="h-5 px-2">
              {(emailError && !isUpdating) && (
                  <span className="block text-xxs text-red-800">
                    This email is Exist
                  </span>
                ) }
              </div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="password"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
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
            to="/users"
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

export default AddUser;

import { useEffect, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../../components/layout/Main";
import * as UsersApi from "../../API/UsersApi";
import Card from "../../components/Card";
import Button from "../../components/Button";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const inputStyle =
    "input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold";

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
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const fetchedUser = await UsersApi.getOne(id);
        console.log(fetchedUser);
        if (fetchedUser === null) {
          console.log("User not found");
          navigate("/not-found");
        } else {
          setUserDetails(fetchedUser);
        }
      };
      getUser();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(userDetails).length !== 0) {
      console.log(userDetails);
      setPhone(userDetails.phone);
      setPersonalName(userDetails.personal_name);
      setAddressLine1(userDetails.addressLine1);
      setAddressLine2(userDetails.addressLine2);
      setCountry(userDetails.country);
      setCity(userDetails.city);
      setState(userDetails.state);
      setZipCode(userDetails.zipCode);
      setUserName(userDetails.userName);
      setEmail(userDetails.email);
      setPassword(userDetails.password);
    }
  }, [userDetails]);

  return (
    <Main>
        <Card title="User Info">
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="personalName"
                placeholder="User Name"
                value={personalName} readonly disabled
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
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
                value={phone} readonly disabled
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
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
                value={addressLine1} readonly disabled
                id="addressLine"
                placeholder="Address Line"
              />
              <label
                className="label-helper visible text-cyan-800 font-normal"
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
                value={addressLine2} readonly disabled
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <select
                name="country"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="country"
                value={country} readonly disabled
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <select
                name="City"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                readonly disabled
                value={city}
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
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
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                required
                className={`${
                  "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle}`} disabled readonly
                value={email}
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
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="password"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={password}
                id="password"
                placeholder="Password" readonly disabled
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
          to={`/users/edit/${id}`}
          btnStyle="cyanBg"
          action="noClickAction"
        />
        <Button
          behavior="link"
          to="/users"
          title="Back"
          btnStyle="cyan-outline"
        />
      </div>
    </Main>
  );
};

export default UserDetails;

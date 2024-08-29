import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postReq, updateReq } from "../Redux/Action/action";
import "./Form.css";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

// const Form = ({ data, onClose }) => {
const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = location.state || {};
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    city: "",
    state: "",
    pinCode: "",
    checkBox: false,
  });

  const [error, setError] = useState({
    firstErr: "",
    lastErr: "",
    userErr: "",
    cityErr: "",
    stateErr: "",
    pinErr: "",
    checkErr: "",
  });

  const [cities, setCities] = useState([]);

  const stateCityMap = {
    TamilNadu: ["Chennai", "Madurai", "Trichy"],
    Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
    Karnataka: ["Bangalore", "Musur", "Hubli"],
    Andhra: ["Hyderabad", "Vijayawada", "Tirupati"],
  };

  useEffect(() => {
    setCities(stateCityMap[values.state] || []);
  }, [values.state]);

  useEffect(() => {
    if (data) {
      setValues({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        userName: data.userName || "",
        city: data.city || "",
        state: data.state || "",
        pinCode: data.pinCode || "",
        checkBox: data.checkBox || false,
      });
    }
  }, [data]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const validation = (values) => {
    let hasErr = false;
    const newErrors = {};

    if (values.firstName.length < 3) {
      newErrors.firstErr = "First Name must be at least 3 characters";
      hasErr = true;
    }
    if (values.lastName.length < 3) {
      newErrors.lastErr = "Last Name must be at least 3 characters";
      hasErr = true;
    }
    if (!values.userName.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.userErr = "Please enter a valid email address";
      hasErr = true;
    }
    if (values.city.length < 3) {
      newErrors.cityErr = "City must be at least 3 characters";
      hasErr = true;
    }
    if (!values.state) {
      newErrors.stateErr = "State is required";
      hasErr = true;
    }
    if (!/^\d{6}$/.test(values.pinCode)) {
      newErrors.pinErr = "Pin Code must be 6 digits";
      hasErr = true;
    }
    // Uncomment if you want to require checkbox
    // if (!values.checkBox) {
    //   newErrors.checkBoxErr = "You must agree to the terms and conditions";
    //   hasErr = true;
    // }

    setError(newErrors);
    return hasErr;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasError = validation(values);
    if (!hasError) {
      if (data) {
        dispatch(updateReq({ ...values, id: data.id }));
        navigate("/Table");
        await new Promise((Resolve) => {
          toast.success("Updated Successfully", {
            theme: "dark",
            position: "top-right",
            onClose: Resolve,
          });
        });
      } else {
        dispatch(postReq(values));
        navigate("/Table");
        await new Promise((Resolve) => {
          toast.success("Posted Successfully", {
            theme: "dark",
            position: "top-right",
            onClose: Resolve,
          });
        });
      }

      setValues({
        firstName: "",
        lastName: "",
        userName: "",
        city: "",
        state: "",
        pinCode: "",
        checkBox: false,
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <h1 className="text-white text-center ">Form</h1>
          <form
            className="row g-3 w-50 mt-2 mx-auto needs-validation"
            onSubmit={handleSubmit}
          >
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">
                <b> First name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
              {error.firstErr && <p className="error">{error.firstErr}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">
                <b>Last name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              {error.lastErr && <p className="error">{error.lastErr}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="userName" className="form-label">
                <b>Email</b>
              </label>
              <div className="input-group">
                <span className="input-group-text" id="userName">
                  @
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="userName"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  aria-describedby="inputGroupPrepend"
                />
                {error.userErr && <p className="error">{error.userErr}</p>}
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="state" className="form-label">
                <b>State</b>
              </label>
              <select
                className="form-select"
                id="state"
                name="state"
                value={values.state}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="TamilNadu">TamilNadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Andhra">Andhra</option>
              </select>
              {error.stateErr && <p className="error">{error.stateErr}</p>}
            </div>

            <div className="col-md-6">
              <label htmlFor="city" className="form-label">
                <b>City</b>
              </label>
              <select
                className="form-select"
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Choose...
                </option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {error.cityErr && <p className="error">{error.cityErr}</p>}
            </div>

            <div className="col-md-3">
              <label htmlFor="pinCode" className="form-label">
                <b>Pin</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="pinCode"
                name="pinCode"
                value={values.pinCode}
                onChange={handleChange}
              />
              {error.pinErr && <p className="error">{error.pinErr}</p>}
            </div>

            <div className=" mx-auto d-block">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkBox"
                  name="checkBox"
                  checked={values.checkBox}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="checkBox">
                  Agree to terms and conditions
                </label>
                {error.checkErr && <p className="error">{error.checkErr}</p>}
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn formBtn text-light d-block mx-auto"
                type="submit"
              >
                {data ? "Update" : "Submit"}Form
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;

import React, { useState } from "react";
import Joi from "joi";
import Form from "./common/form";
import auth from "../services/authService";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    // username: "Username is required.",
  });

  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  const onSubmit = async () => {
    try {
      // Wasted all this time just to find out i can't pass user to the protected route, maybe smth to do with async or
      // the fact it checks the token before it's set. anyway.
      await auth.login(data.username, data.password);
      // console.log("Reload");
      // navigate(0);
      // console.log("Redirecting");
      // console.log(location ? true : false);
      const redirect = location.state ? location.state.from : "/";
      window.location = redirect;
      // navigate(location.state.from || "/", {
      //   state: { from: location.pathname },
      // });
      // navigate(-1);

      // console.log(state.from);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = { ...errors };
        newErrors.username = ex.response.data;
        setErrors(newErrors);
      }
    }
  };

  const fields = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password", type: "password" },
  ];

  if (auth.getCurrentUser()) return <Navigate to="/" />;

  return (
    <Form
      formName="Login"
      btnName="Login"
      schema={schema}
      data={data}
      setData={setData}
      errors={errors}
      setErrors={setErrors}
      onSubmit={onSubmit}
      fields={fields}
    />
  );
};

export default LoginForm;

import React, { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().min(5).required().label("Name"),
    phone: Joi.number().min(10e7).max(10e16).required().label("Phone Number"),
  });

  const onSubmit = async () => {
    try {
      const response = await userService.register(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errorsCopy = { ...errors };
        errorsCopy.username = ex.response.data;
        setErrors(errorsCopy);
      }
    }
  };

  const fields = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password", type: "password" },
    { name: "name", label: "Name" },
    { name: "phone", label: "Phone Number" },
  ];

  return (
    <Form
      formName="Register"
      btnName="Register"
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

export default RegisterForm;

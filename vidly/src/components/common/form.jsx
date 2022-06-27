import React from "react";
import Input from "./input";
import Select from "./select";

const Form = ({
  formName,
  btnName,
  schema,
  data,
  setData,
  errors,
  setErrors,
  onSubmit,
  fields,
}) => {
  const validate = () => {
    const ops = { abortEarly: false };
    const { error } = schema.validate(data, ops);
    if (!error) return null;

    const newErr = {};
    for (let item of error.details) {
      newErr[item.path[0]] = item.message;
    }
    // console.log(data);
    // console.log(newErr);
    return newErr;
  };

  const validateProperty = ({ name, value }) => {
    //   computed property, key is set when run
    // const obj = { [name]: value };
    // don't need the object, just the value to validate
    const { error } = schema.extract(name).validate(value);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    //   e.preventDefault prevents a full page reload and submission immediately
    e.preventDefault();

    const newErr = validate();
    // console.log(newErr);
    // if (newErr) console.log("truthy");
    const toSet = newErr || {};
    // console.log(toSet);
    setErrors(toSet);
    // console.log(errors);

    if (Object.keys(errors).length !== 0) {
      console.log("Errors");
      return;
    }

    onSubmit(e);
  };

  // onChange passes an Event object which contains a currentTarget object, which we destructure to obtain values from the inputs
  const handleChange = ({ currentTarget: input }) => {
    const newErr = { ...errors };
    const errorMsg = validateProperty(input);
    console.log(errorMsg);
    if (errorMsg) newErr[input.name] = errorMsg;
    else delete newErr[input.name];
    setErrors(newErr);

    const newAcc = { ...data };
    newAcc[input.name] = input.value;
    setData(newAcc);
  };

  const renderFormElement = (formField) => {
    let field;
    switch (formField.inputType) {
      case "select":
        field = (
          <Select
            key={formField.name}
            name={formField.name}
            value={data[formField.name]}
            label={formField.label}
            onChange={handleChange}
            error={errors[formField.name]}
            options={formField.options}
          />
        );
        break;
      default:
        field = (
          <Input
            key={formField.name}
            name={formField.name}
            value={data[formField.name]}
            label={formField.label}
            onChange={handleChange}
            error={errors[formField.name]}
            type={formField.type || "text"}
          />
        );
    }
    return field;
  };
  return (
    <>
      <h1>{formName}</h1>
      <form action="" onSubmit={handleSubmit}>
        {fields.map((f) => renderFormElement(f))}
        <button className="btn btn-primary" disabled={validate()}>
          {btnName}
        </button>
      </form>
    </>
  );
};

export default Form;

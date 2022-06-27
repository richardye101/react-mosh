import Joi from "joi";
import { min } from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Form from "./common/form";

const MovieForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [data, setData] = useState({
    // _id: "",
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const populateGenres = async () => {
    const genres = await getGenres();
    setGenres(genres);
  };
  const populateData = async () => {
    try {
      if (params.id === "new") return;
      const existingData = await getMovie(params.id);
      const movie = {
        _id: existingData._id,
        title: existingData.title,
        genreId: existingData.genre._id,
        numberInStock: existingData.numberInStock,
        dailyRentalRate: existingData.dailyRentalRate,
      };
      setData(movie);
    } catch (ex) {
      // console.log(ex.response.status);
      // if (ex.response.status === 404) { // checks if an id is not found
      if (ex.response.status) {
        //if we get any errors, we'll just send to not found
        navigate("not-found", { replace: true });
      }
    }
  };

  useEffect(() => {
    const setStates = async () => {
      await populateGenres();
      await populateData();
    };
    if (state && state.from === "/login") navigate(-3);

    setStates();
  }, [navigate, params.id]);

  const fields = [
    { name: "title", label: "Title" },
    { name: "genreId", label: "Genre", inputType: "select", options: genres },
    { name: "numberInStock", label: "Number In Stock", type: "number" },
    { name: "dailyRentalRate", label: "Rate", type: "number" },
  ];

  const schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().min(5).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  });

  const doSubmit = (e) => {
    // e.preventDefault();
    // const submission = new FormData(e.target);

    // const newMovie = {
    //   _id: params.id || "",
    //   title: submission.get("title"),
    //   genreId: submission.get("genreId"),
    //   numberInStock: submission.get("numberInStock"),
    //   dailyRentalRate: submission.get("rate"),
    // };
    console.log(data);
    saveMovie(data);
    navigate("/movies");
  };

  return (
    <>
      <Form
        formName="Movie Form"
        btnName="Save"
        schema={schema}
        data={data}
        setData={setData}
        errors={errors}
        setErrors={setErrors}
        onSubmit={doSubmit}
        fields={fields}
      />
      {/* <h1>Movie Form {params.id}</h1> */}
      {/* <button className="btn btn-primary" onClick={() => navigate("/")}>
        Save
      </button> */}
    </>
  );
};

export default MovieForm;

import {useFormik} from "formik";
import {initialValues} from "./utils/addStockIV";
import {addStockSchema} from "./addStockSchema";
import {Button, TextField} from "@mui/material";

const chartColorsPalette = {
  orange: "rgba(255, 159, 64, 0.7)",
  lightPink: "rgba(255, 99, 132, 0.7)",
  lightYellow: "rgba(255, 205, 86, 0.7)",
  shadowYellow: "rgba(255, 205, 86, 0.4)",
  tealBlue2: "rgba(75, 192, 192, 0.7)",
  shadowtealBlue2: "rgba(75, 192, 192, 0.4)",
  blue: "rgba(22, 41, 56)",
  skyBlue: "rgba(208, 228, 233)",
  tealBlue: "#367588",
};

export default function AddStockFormView({onSubmit}) {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: addStockSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{width: 250}}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        id="name"
        label={errors.name ? errors.name : "Stock Name"}
        variant="outlined"
        className={errors.name && touched.name ? "textfield-error" : ""}
      />
      <TextField
        sx={{width: 250}}
        value={values.country}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        id="country"
        label="Country"
        variant="outlined"
      />
      <TextField
        sx={{width: 250}}
        value={values.ticker}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        id="ticker"
        label={errors.ticker ? errors.ticker : "Ticker"}
        variant="outlined"
        className={errors.ticker && touched.ticker ? "textfield-error" : ""}
      />
      <TextField
        sx={{width: 250}}
        value={values.type}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        id="type"
        label="Type"
        variant="outlined"
      />
      <TextField
        sx={{width: 250}}
        value={values.sector}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        id="sector"
        label="Sector"
        variant="outlined"
      />
      <TextField
        sx={{width: 250}}
        value={values.industry}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        id="industry"
        label="Industry"
        variant="outlined"
      />
      <Button
        variant="contained"
        sx={{
          marginTop: 4,
          color: chartColorsPalette.skyBlue,
          bgcolor: chartColorsPalette.blue,
          border: "2px solid " + chartColorsPalette.blue,
          borderTopLeftRadius: 16,
          borderBottomRightRadius: 16,
          transition: "0.2s",
          ":hover": {
            color: chartColorsPalette.blue,
            bgcolor: chartColorsPalette.skyBlue,
            boxShadow: "0px 5px 0px 0px" + chartColorsPalette.blue,
          },
        }}
        disabled={isSubmitting}
        type="submit"
      >
        Add
      </Button>
    </form>
  );
}
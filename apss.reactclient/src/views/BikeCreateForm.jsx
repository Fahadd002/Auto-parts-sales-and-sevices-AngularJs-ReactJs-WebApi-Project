import {
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "./ProductList.css";
import {
  getCategories,
  postBike,
  uploadProductImages,
} from "../services/ProductService";
const BikeCreateForm = () => {
  //States
  ////////////////////////////////////////////////
  const [seletedFiles, seteSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState("");
  //Form validation & initial values
  ///////////////////////////////////////////////
  const validationSchema = Yup.object({
    productName: Yup.string().required("Product name is requred"),
    price: Yup.number().required("Price is required"),
    shortDescription: Yup.string().required("Short description is requred"),
    productCategoryId: Yup.number().required("Category is required"),
    picture: Yup.array(Yup.string().required("Picture is required")).min(
      1,
      "One picture required"
    ),
    productDetails: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required("Label is required"),
        value: Yup.string().required("Value is required"),
      })
    ),
  });
  const initialValues = {
    productName: "",
    price: "",
    shortDescription: "",
    productCategoryId: "",
    picture: [""],
    productDetails: [
      {
        label: "",
        value: "",
      },
    ],
  };
  // Form hooks
  const fileInputRef = useRef(null);
  ////////////////////////
  // Data hooks
  //////////////////////////////////////////
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
    console.log(data);
  };
  //Handlers
  ////////////////////////////////////
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log(values);
    let part = {
      productName: values.productName,
      price: values.price,
      productCategoryId: values.productCategoryId,
      shortDescription: values.shortDescription,
      productDetails: [...values.productDetails],
    };
    console.log(part);
    const { data } = await postBike(part);
    uploadFiles(data.productId, resetForm);
  };
  const uploadFiles = async (id, resetForm) => {
    //console.log(id);
    const { data } = await uploadProductImages(id, seletedFiles);
    console.log(data);
    resetForm();
    setMessage("Data saved successfully");
    setNotificationOpen(true);
    seteSelectedFiles([]);
  };

  const onFilechange = (e, sf) => {
    /*Selected files data can be collected here.*/
    console.log(e.target.files);

    let f = [];
    for (let i = 0; i < e.target.files.length; i++) {
      f.push(e.target.files[i].name);
    }
    console.log(f);
    seteSelectedFiles(e.target.files);
    sf("picture", f);
  };
  const getPicFieldValue = () => {
    let fn =
      seletedFiles.length > 0 && seletedFiles.length > 1
        ? " +[" + (seletedFiles.length - 1) + "]"
        : "";
    return seletedFiles.length > 0 ? seletedFiles[0].name + fn : "";
  };
  const handleClose = () => {
    setNotificationOpen(false);
  };
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values, handleChange }) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Parts form</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="productName"
                    label="Product Name"
                    variant="standard"
                    helperText={<ErrorMessage name="productName" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="price"
                    label="Price"
                    variant="standard"
                    helperText={<ErrorMessage name="price" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="shortDescription"
                    label="Short Description"
                    variant="standard"
                    helperText={<ErrorMessage name="shortDescription" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* <InputLabel id='catId'>Category</InputLabel> */}
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="productCategoryId"
                    label="Category"
                    variant="standard"
                    select
                    onChange={(e) =>
                      (values.productCategoryId = e.target.value)
                    }
                  >
                    {categories.map((cat, index) => {
                      return (
                        <MenuItem key={index} value={cat.productCategoryId}>
                          {cat.productCategoryName}
                        </MenuItem>
                      );
                    })}
                  </Field>
                  <FormHelperText>
                    <ErrorMessage name="productCategoryId" />
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="picture"
                    label="Pictures"
                    value={getPicFieldValue()}
                    helperText={<ErrorMessage name="picture" />}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={() => {
                              fileInputRef.current.click();
                              setFieldValue("picture", "a");
                            }}
                          >
                            <AttachFileIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </Grid>

                <FieldArray name="productDetails">
                  {(arrayHelpers) => {
                    return (
                      <>
                        <Grid item xs={12}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography variant="h5">Details</Typography>
                            <Button
                              type="button"
                              variant="contained"
                              startIcon={<AddIcon />}
                              onClick={() =>
                                arrayHelpers.push({ label: "", value: "" })
                              }
                            >
                              Add
                            </Button>
                          </div>
                        </Grid>
                        {values.productDetails.map((pd, index) => {
                          return (
                            <Grid
                              container
                              key={index}
                              spacing={4}
                              paddingLeft={2}
                            >
                              <Grid item xs={5}>
                                <Field
                                  as={TextField}
                                  fullWidth={true}
                                  name={`productDetails.${index}.label`}
                                  label="Label"
                                  variant="standard"
                                  helperText={
                                    <ErrorMessage
                                      name={`productDetails.${index}.label`}
                                    />
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Field
                                  as={TextField}
                                  fullWidth={true}
                                  name={`productDetails.${index}.value`}
                                  label="Value"
                                  variant="standard"
                                  helperText={
                                    <ErrorMessage
                                      name={`productDetails.${index}.value`}
                                    />
                                  }
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          );
                        })}
                      </>
                    );
                  }}
                </FieldArray>
                <Grid
                  item
                  xs={11}
                  style={{ justifyContent: "flex-end", display: "flex" }}
                >
                  <Button type="submit" color="primary" variant="contained">
                    Submit
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ justifyContent: "flex-start", display: "flex" }}
                >
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    href="/Bikes"
                  >
                    Back to List
                  </Button>
                </Grid>
              </Grid>
              <input
                multiple
                type="file"
                ref={fileInputRef}
                onChange={(e) => onFilechange(e, setFieldValue)}
                style={{ display: "none" }}
              />
            </Form>
          );
        }}
      </Formik>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={2000}
        message={message}
        action={"Undo"}
        onClose={handleClose}
      />
    </Container>
  );
};
export default BikeCreateForm;

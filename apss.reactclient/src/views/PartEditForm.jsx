import {
  Avatar,
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { apiUrl } from "../models/app-constants";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import "./ProductList.css";
import {
  getCategories,
  getPartById,
  deletePicture,
  uploadProductImages,
  updateProduct,
  getProductPicures,
} from "../services/ProductService";
import { useParams } from "react-router-dom";
const PartEditForm = () => {
  //States
  ////////////////////////////////////////////////
  const [seletedFiles, seteSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [part, setPart] = useState([]);
  const [pictures, setPictures] = useState([]);
  //Route params
  /////////////////////////////////
  const { id } = useParams();

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
    ...part,
  };
  // Form hooks
  const fileInputRef = useRef(null);
  ////////////////////////
  // Data hooks
  //////////////////////////////////////////

  useEffect(() => {
    fetchCategories();
    fetchPart();
  }, []);

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
    console.log(data);
  };
  const fetchPart = async () => {
   // console.log(id);

    const { data } = await getPartById(id);
    setPart(data);
    setPictures(data.productPictures);
    console.log("part ", data);
  };
  const fetchPictures = async (id)=>{
    const {data}= await getProductPicures(id);
    setPictures(data);
  }
  //Handlers
  ////////////////////////////////////
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    /* let part = {
        productName: values.productName,
        price: values.price,
        productCategoryId: 7,
        shortDescription: values.shortDescription,
        productDetails: [...values.productDetails],
      };
      console.log(part);
      const { data } = await postBike(part);
      uploadFiles(data.productId, resetForm); */
    const { data } = await updateProduct(part.productId, {
      productId: part.productId,
      productName: values.productName,
      price: values.price,
      shortDescription: values.shortDescription,
      productCategoryId: values.productCategoryId,
      productDetails: [...values.productDetails],
    });
    fetchPictures(part.productId);
    //setPart(part);
    //console.log(data);
    if(seletedFiles && seletedFiles.length> 0){
        uploadFiles(part.productId, resetForm);
        
    }
    else{
        setMessage("Data saved successfully");
        setNotificationOpen(true);
       // seteSelectedFiles([]);
    }
  };
  const uploadFiles = async (id, resetForm) => {
    //console.log(id);
    const { data } = await uploadProductImages(id, seletedFiles);
    console.log(data);
    //resetForm();
    setMessage("Data saved successfully");
    setNotificationOpen(true);
    seteSelectedFiles([]);
  };
  const delPictureHandler = (id) => {
    deleteImage(id);
  };

  const deleteImage = async (id) => {
    try {
      await deletePicture(id);
      setMessage("Picture deleted");
      setNotificationOpen(true);
      fetchPictures(part.productId);
    } catch (e) {
      setMessage("Failed to delete picture");
      setNotificationOpen(true);
    }
  };
  const getPictureUrl = (pic) => {
    return `${apiUrl}/Images/${pic}`;
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
        enableReinitialize={true}
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
                    variant="standard"
                    helperText={<ErrorMessage name="productName" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="price"
                    variant="standard"
                    helperText={<ErrorMessage name="price" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="shortDescription"
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
                    defaultValue={""}
                    value={values.productCategoryId ?? ""}
                    select
                    onChange={(e) =>
                      (values.productCategoryId = e.target.value ?? "")
                    }
                  >
                    {categories?.map((cat, index) => {
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
                <Grid item xs={12}>
                  <Typography variant="h5">Current pictures</Typography>
                </Grid>
                <Grid item xs={12}>
                  <List dense={true}>
                    {pictures.map((p, index) => {
                      console.log("pcic", p.picture);
                      return (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              onClick={() =>
                                delPictureHandler(p.productPictureId)
                              }
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <Avatar>
                            <img src={getPictureUrl(p.picture)} />
                          </Avatar>

                          <ListItemText sx={{ ml: 4 }}>
                            {p.picture}
                          </ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
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
                        {values.productDetails?.map((pd, index) => {
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
export default PartEditForm;

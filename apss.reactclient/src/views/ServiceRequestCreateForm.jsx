import {
    Button,
    Container,
    FormHelperText,
    Grid,
    IconButton,
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
import { getserviceTypes, postServiceRequest } from "../services/ServiceRequestService";

  const ServiceRequestCreateForm = () => {
    //States
    ////////////////////////////////////////////////
    const [serviceTypes, setserviceTypes] = useState([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");
    //Form validation & initial values
    ///////////////////////////////////////////////
    const validationSchema = Yup.object({
        customerName: Yup.string().required("Customer name is requred"),
        phone: Yup.string().required("Phone is required"),
        email: Yup.string().required("Email is requred"),
      serviceTypeId: Yup.number().required("Service Type is required"),
      serviceDetails: Yup.array().of(
        Yup.object().shape({
            description: Yup.string().required("Description is required"),
            requestDate: Yup.date().required("RequestDate is required"),
            proposedServiceDate: Yup.date().required("ProposedServiceDate is required"),
        })
      ),
    });
    const initialValues = {
        customerName: "",
        phone: "",
        email: "",
        serviceTypeId: "",
        serviceDetails: [
        {
            description: "",
            requestDate: "",
            proposedServiceDate: "",
        },
      ],
    };
    // Form hooks
    const fileInputRef = useRef(null);
    ////////////////////////
    // Data hooks
    //////////////////////////////////////////
    useEffect(() => {
        fetchserviceTypes();
    }, []);
    const fetchserviceTypes = async () => {
      const { data } = await getserviceTypes();
      setserviceTypes(data);
      console.log(data);
    };
    //Handlers
    ////////////////////////////////////
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      // console.log(values);
      let part = {
        customerName: values.customerName,
        phone: values.phone,
        email: values.email,
        serviceTypeId: values.serviceTypeId,
        
        serviceDetails: [...values.serviceDetails],
      };
      console.log(part);
      const { data } = await postServiceRequest(part);
      resetForm();
      setMessage("Data saved successfully");
      setNotificationOpen(true);
  
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
                    <Typography variant="h3">Service Request form</Typography>
                  </Grid>
  
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="customerName"
                      label="Customer Name"
                      variant="standard"
                      helperText={<ErrorMessage name="customerName" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="phone"
                      label="Phone"
                      variant="standard"
                      helperText={<ErrorMessage name="phone" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="email"
                      label="Email"
                      variant="standard"
                      helperText={<ErrorMessage name="email" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {/* <InputLabel id='catId'>Category</InputLabel> */}
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="serviceTypeId"
                      label="Service Type"
                      variant="standard"
                      select
                      onChange={(e) =>
                        (values.serviceTypeId = e.target.value)
                      }
                    >
                      {serviceTypes.map((cat, index) => {
                        return (
                          <MenuItem key={index} value={cat.serviceTypeId}>
                            {cat.serviceName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                    <FormHelperText>
                      <ErrorMessage name="serviceTypeId" />
                    </FormHelperText>
                  </Grid>

                  <FieldArray name="serviceDetails">
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
                                  arrayHelpers.push({ description: "", requestDate: "",proposedServiceDate: "" })
                                }
                              >
                                Add
                              </Button>
                            </div>
                          </Grid>
                          {values.serviceDetails.map((pd, index) => {
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
                                    name={`serviceDetails.${index}.description`}
                                    label="Description"
                                    variant="standard"
                                    helperText={
                                      <ErrorMessage
                                        name={`serviceDetails.${index}.description`}
                                      />
                                    }
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name={`serviceDetails.${index}.requestDate`}
                                    label="Request Date"
                                    variant="standard"
                                    type="date"
                                    helperText={
                                      <ErrorMessage
                                        name={`serviceDetails.${index}.requestDate`}
                                      />
                                    }
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name={`serviceDetails.${index}.proposedServiceDate`}
                                    label="Proposed Service Date"
                                    type="date"
                                    variant="standard"
                                    helperText={
                                      <ErrorMessage
                                        name={`serviceDetails.${index}.proposedServiceDate`}
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
                      href="/ServiceRequests"
                    >
                      Back to List
                    </Button>
                  </Grid>
                </Grid>
                {/* <input
                  multiple
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => onFilechange(e, setFieldValue)}
                  style={{ display: "none" }}
                /> */}
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
  export default ServiceRequestCreateForm;
  
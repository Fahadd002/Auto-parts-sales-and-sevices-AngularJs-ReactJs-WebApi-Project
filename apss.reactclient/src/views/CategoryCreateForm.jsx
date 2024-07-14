import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { ErrorMessage, Field, Form, Formik } from "formik";
  import * as Yup from "yup";
  import { postCategories } from "../services/ProductCategoryService";
import { DisplaySettings } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";

  const CategoryCreateForm = () => {
    const validationSchema = Yup.object({
      productCategoryName: Yup.string().required("Product Category name is requred"),
    });
    const initialValues = {
      productCategoryName: "",
      vehicleTypeId:2
    };
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      let part = {
        productCategoryId: values.productCategoryId,
        productCategoryName: values.productCategoryName,
        vehicleTypeId:values.vehicleTypeId

      }
      console.log(part);
      await postCategories(part);
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
                    <Typography variant="h6">Products Category form</Typography>
                  </Grid>
  
                  <Grid item xs={7}>
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="productCategoryName"
                      label="Product Category"
                      variant="standard"
                      helperText={<ErrorMessage name="productCategoryName" />}
                    />
                  </Grid>

                  <Grid item xs={7} style={{justifyContent:"flex-end",display:"flex"}}>
                    <Button type="submit" color="primary" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12} style={{justifyContent:"flex-start",display:"flex"}}>
                  <Button type="button" color="primary" variant="contained" href="/Categories">
                      Back to List
                    </Button>


                  </Grid>




                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Container>
    );
  };
  export default CategoryCreateForm;
  
import { useEffect, useState } from "react";
import { deleteProduct, getBikeDetails, getBikeDtos } from "../services/ProductService";
import MUIDataTable from "mui-datatables";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiUrl } from "../models/app-constants";
import "./ProductList.css"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";


const ProductList = () => {
 
  const [bikes, setBikes] = useState([]);
  const [details, setDetails]= useState([]);
  const [detailOpen, setDetailOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [delId, setDelId] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchBikes();
  }, []);
  const fetchBikes = async () => {
    try {
      const { data } = await getBikeDtos();
      console.log(data);
      setBikes(data);
    } catch (e) {
      console.log(e);
      
    }
  };
  const fetchBikeDeatils =async (id)=>{
    try {
        const { data } = await getBikeDetails(id);
        console.log(data);
        setDetails(data);
      } catch (e) {
        console.log(e);
      }
  }
  const getPictureUrl = (pic) => {
    return `${apiUrl}/Images/${pic}`;
  };
  const showDetailClick=(id)=>{
    fetchBikeDeatils(id);
    setDetailOpen(true);
  }
  const handleClose = () => {
    setDetailOpen(false);
  };
  const handleAlretClose = ()=>{
    setAlertOpen(false)
  }
  const handleYes = ()=>{
    doDeleteProduct();
  }
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };
  const doDeleteProduct = async ()=>{
    try
    {
      console.log(delId);
      const {res} = await deleteProduct(delId);
      const b = bikes.filter(x=> x.productId == delId);
      console.log(b);
      setBikes(b);
      setDelId('');
      setAlertOpen(false);
      setMessage('Product deleted');
      setNotificationOpen(true);
    }
    catch(e){
      console.log(e);
    }
    
  }
  const columns = [
    {
      name: "productPicture",
      label: "Picture",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            console.log(getPictureUrl(value))
          return (
           
              <img className="circle-image" src={getPictureUrl(value)} />
            
          );
        },
      },
    },
    {
      name: "productName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "productCategoryName",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "shortDescription",
      label: "Short Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
        name:'productId',
        label:'Details',
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value,tableMeta, updateValue)=>{
                return (
                    <Button onClick={()=>showDetailClick(value)} variant="text">Sale</Button>
                )
            }
          },

    },
    {
      name: 'productId',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta, updateValue)=>{
            return (
                // <Button href={`/part-edit/${value}`} color="primary"  variant="contained"><EditIcon sx={{mr:1}}/></Button>
                <Fab sx={{ml: 1}} variant="extended" size="medium" href={`/part-edit/${value}`} ><EditIcon sx={{ color: green[700] }}/></Fab>
                
            )
        }
      },

    },    {
      name: 'productId',
      label: 'Delete',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta, updateValue)=>{
            return (
                <IconButton color="warning"
                onClick={()=> {
                  setDelId(value);
                  setAlertOpen(true)
                }}
                  ><DeleteIcon /></IconButton>
            )
        }
      },
    }
  ];
  const detailsColumns=[
    {
        name: 'label',
        label: 'label',
        options:{
            filter:true,
            sort:true
        }
    },
    {
        name: 'value',
        label: 'VALUE',
        options:{
            filter:false,
            sort:false
        }
    }
  ]
  return (
    <>
      <MUIDataTable title={"Bike List"} data={bikes} columns={columns}
      options={{
        selectableRows: false, hover: false,
        customToolbar: () => <Fab sx={{ml: 1}} variant="extended" size="medium" href="/bike-create" color="primary"><AddIcon sx={{mr:1}}/> Add New</Fab>,

      }}
       />
      
      <Dialog open={detailOpen} fullWidth={true}>
        <DialogTitle>Parts details</DialogTitle>
        <MUIDataTable title={'Details'} columns={detailsColumns} data={details}
        options={{
          selectableRows: false,
          elevation: 0 
        }}
        />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={alertOpen}
        onClose={handleAlretClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlretClose}>No</Button>
          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={2000}
        message={message}
        action={"DISMISS"}
        onClose={handleNotificationClose}
      />
    </>
  );
  }

export default ProductList;

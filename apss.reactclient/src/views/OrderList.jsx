import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import { format } from "date-fns";
import { getOrderDetails, getOrderDtos } from "../services/OrderService";

const OrderList = () => {
 
  const [orders, setOrders] = useState([]);
  const [details, setDetails]= useState([]);
  const [detailOpen, setDetailOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [delId, setDelId] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const { data } = await getOrderDtos();
      console.log(data);
      setOrders(data);
    } catch (e) {
      console.log(e);
      
    }
  };
  const fetchOrderDetails =async (id)=>{
    try {
        const { data } = await getOrderDetails(id);
        console.log(data);
        setDetails(data);
      } catch (e) {
        console.log(e);
      }
  }

  const showDetailClick=(id)=>{
    fetchOrderDetails(id);
    setDetailOpen(true);
  }
  const handleClose = () => {
    setDetailOpen(false);
  };
  const handleAlretClose = ()=>{
    setAlertOpen(false)
  }
  const handleYes = ()=>{
    doDeleteService();
  }
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };
  const doDeleteService = async ()=>{
    try
    {
      console.log(delId);
      const {res} = await deleteOrder(delId);
      const b = orders.filter(x=> x.orderId == delId);
      console.log(b);
      setOrders(b);
      setDelId('');
      setAlertOpen(false);
      setMessage('Order is deleted');
      setNotificationOpen(true);
    }
    catch(e){
      console.log(e);
    }
    
  }
  const columns = [

    {
      name: "orderDate",
      label: "Order Date",
      type:"date",
      options: {
        filter: true,
        sort: true,
      },
      customBodyRender: (value,tableMeta,updateValue) =>{
        return(
          <span>{format(value, "yyyy-MM-dd")}</span>
        )
      }

    },
    {
      name: "customerName",
      label: "Customer Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    
    {
        name:'orderId',
        label:'Details',
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value,tableMeta, updateValue)=>{
                return (
                    <Button onClick={()=>showDetailClick(value)} variant="text">Order Detail</Button>
                )
            }
          },

    },
    {
      name: 'orderId',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta, updateValue)=>{
            return (
                // <Button href={`/part-edit/${value}`} color="primary"  variant="contained"><EditIcon sx={{mr:1}}/></Button>
                <Fab sx={{ml: 1}} variant="extended" size="medium" href={`/order-edit/${value}`} ><EditIcon sx={{ color: green[700] }}/></Fab>
                
            )
        }
      },

    },    {
      name: 'orderId',
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
        name: 'quantity',
        label: 'Quantity',
        options:{
            filter:true,
            sort:true
        }
    },
    {
        name: "productName",
        label: "Product Name",
        options: {
          filter: true,
          sort: true,
        },
      }
  
  ]
  return (
    <>
      <MUIDataTable title={"Order"} data={orders} columns={columns}
      options={{
        selectableRows: false, hover: false,
        customToolbar: () => <Fab sx={{ml: 1}} variant="extended" size="medium" href="/order-create" color="primary"><AddIcon sx={{mr:1}}/> Add New</Fab>,

      }}
       />
      
      <Dialog open={detailOpen} fullWidth={true}>
        <DialogTitle>Order details</DialogTitle>
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

export default OrderList;

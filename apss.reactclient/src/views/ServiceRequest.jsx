import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import { deleteServiceRequest, getServiceDetails, getServiceDtos } from "../services/ServiceRequestService";
import { compareAsc, format } from "date-fns";

const ServiceRequestList = () => {
 
  const [services, setServices] = useState([]);
  const [details, setDetails]= useState([]);
  const [detailOpen, setDetailOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [delId, setDelId] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchServices();
  }, []);
  const fetchServices = async () => {
    try {
      const { data } = await getServiceDtos();
      console.log(data);
      setServices(data);
    } catch (e) {
      console.log(e);
      
    }
  };
  const fetchServiceDetails =async (id)=>{
    try {
        const { data } = await getServiceDetails(id);
        console.log(data);
        setDetails(data);
      } catch (e) {
        console.log(e);
      }
  }

  const showDetailClick=(id)=>{
    fetchServiceDetails(id);
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
      const {res} = await deleteServiceRequest(delId);
      const b = services.filter(x=> x.serviceRequestId == delId);
      console.log(b);
      setServices(b);
      setDelId('');
      setAlertOpen(false);
      setMessage('Service Request is deleted');
      setNotificationOpen(true);
    }
    catch(e){
      console.log(e);
    }
    
  }
  const columns = [

    {
      name: "customerName",
      label: "Customer Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        },
      },
    {
      name: "serviceName",
      label: "Service Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    
    {
        name:'serviceRequestId',
        label:'Details',
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value,tableMeta, updateValue)=>{
                return (
                    <Button onClick={()=>showDetailClick(value)} variant="text">Service Detail</Button>
                )
            }
          },

    },
    {
      name: 'serviceRequestId',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta, updateValue)=>{
            return (
                // <Button href={`/part-edit/${value}`} color="primary"  variant="contained"><EditIcon sx={{mr:1}}/></Button>
                <Fab sx={{ml: 1}} variant="extended" size="medium" href={`/serviceRequest-edit/${value}`} ><EditIcon sx={{ color: green[700] }}/></Fab>
                
            )
        }
      },

    },    {
      name: 'serviceRequestId',
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
        name: 'description',
        label: 'Description',
        options:{
            filter:true,
            sort:true
        }
    },
    {
        name: 'requestDate',
        label: 'RequestDate',
        type:"date",
        options:{
            filter:false,
            sort:false
        },
        customBodyRender: (value,tableMeta,updateValue) =>{
          return(
            <span>{format(value, "yyyy-MM-dd")}</span>
          )
        }
    },
    {
        name: 'proposedServiceDate',
        label: 'ProposedServiceDate',
        type:"date",
        options:{
            filter:false,
            sort:false
        },
        customBodyRender: (value,tableMeta,updateValue) =>{
          return(
            <span>{format(value, "yyyy-MM-dd")}</span>
          )
        }

    }
  ]
  return (
    <>
      <MUIDataTable title={"Service Request"} data={services} columns={columns}
      options={{
        selectableRows: false, hover: false,
        customToolbar: () => <Fab sx={{ml: 1}} variant="extended" size="medium" href="/serviceRequest-create" color="primary"><AddIcon sx={{mr:1}}/> Add New</Fab>,

      }}
       />
      
      <Dialog open={detailOpen} fullWidth={true}>
        <DialogTitle>Service details</DialogTitle>
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

export default ServiceRequestList;

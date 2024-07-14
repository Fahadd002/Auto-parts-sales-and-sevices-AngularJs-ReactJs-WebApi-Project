
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
//import NavBarComponent from './components/NavBarComponent';
import HomeComponent from './views/HomeComponent';
import './App.css'
import NavBarComponent from './components/NavBarComponent';
import ProductList from './views/ProductList';
import BikeCreateForm from './views/BikeCreateForm';
import ProductCategory from './views/ProductCategory';
import CategoryCreateForm from './views/CategoryCreateForm';
import  PartEditForm  from "./views/PartEditForm";
import ServiceRequestList from './views/ServiceRequest';
import ServiceRequestCreateForm from './views/ServiceRequestCreateForm';
import ServiceRequestEditForm from './views/ServiceRequestEditForm';
import OrderList from './views/OrderList';

function App() {
  return (
      <>
          { <NavBarComponent></NavBarComponent> }
          
          <Box sx={{ px: 2, py: 1 }}>
              <Routes>
                  <Route path="/" element={<HomeComponent />} />
                  <Route path="/Bikes" element={<ProductList />} />
                  <Route path="/bike-create" element={<BikeCreateForm />} />
                  <Route path="/Categories" element={<ProductCategory />} />
                  <Route path="/category-create" element={<CategoryCreateForm />} />
                  <Route path="/part-edit/:id" element={<PartEditForm/>} />
                  <Route path="/ServiceRequests" element={<ServiceRequestList/>} />
                  <Route path="/serviceRequest-create" element={<ServiceRequestCreateForm />} />
                  <Route path="/serviceRequest-edit/:id" element={<ServiceRequestEditForm/>} />
                  <Route path="/OrderList" element={<OrderList/>} />
                  {/* <Route path="/order-create" element={<OrderCreateForm />} />
                  <Route path="/order-edit/:id" element={<OrderEditForm/>} /> */}

              </Routes>
          </Box>
    </>
  )
}

export default App

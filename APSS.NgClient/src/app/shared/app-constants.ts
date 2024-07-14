export const apiUrl= "http://localhost:5050";
export const navItems = [
    {
        label: 'Home',
        icon: 'home',
        link: '/home',
    },
    {
        label: 'Category',
        link: '/categories',
        icon: 'category'
    },
    {
        label: 'Vehicle-Types',
        link: '/vehiclesTypes',
        icon: 'commute'
    },
    {
        label: 'CommonDetails',
        link: '/commonDetails',
        icon: 'list_alt'
    },
    {
        label: 'ServiceRequest',
        link: '/serviceRequest',
        icon: 'list_alt'
    },
    {
        label: 'Car Parts',
        icon: 'local_taxi',
        link: '#',
        items:[
            // {
            //     label: 'Category',
            //     link: '/categories',
            //     icon: 'category'
            // },
            {
                label: 'Parts',
                link: '/car-parts',
                icon: 'hardware'
            }
        
        ]

    },
    {
        label: 'Bike Parts',
        icon: 'directions_bike',
        link: '#',
        items:[
            // {
            //     label: 'Category',
            //     link: '/categories',
            //     icon: 'category'
            // },
            {
                label: 'Parts',
                link: '/bike-parts',
                icon: 'hardware'
            }
        
        ]

    },
    {
        label: 'Customers',
        icon: 'people',
        link: '/customers',
    },
    {
        label: 'Orders',
        icon: 'shopping_cart',
        link: '/order',
    },
    {
        label: 'Order Details',
        icon: 'details',
        link: '/orderdetails',
    }



];
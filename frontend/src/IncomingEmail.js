import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from "./AuthContext";
import { determineUserRole } from "./Worker"
import OrderDetails from './OrderDetails'
import { useNavigate } from 'react-router-dom';


export default function IncomingEmail(){
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  console.log(currentUser)


  const testOrder = {}
  // filter email/orders based on role 
    const columns = [
        { field: 'OrderID', headerName: 'Order ID', width: 70 },
        { field: 'CompanyName', headerName: 'Company name', width: 150 },
        // {
        //   field: 'Date',
        //   headerName: 'Date',
        //   type: 'date',
        //   format:"dd/MM/yyyy",
        //   width: 130,
        // },
        { field: 'Status', headerName: 'Order Status', width: 100 },
        {
            field: " ",
            headerName: " ",
            sortable: false,
            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
        
                const api = params.api;
                const thisRow = {};
        
                api
                  .getAllColumns()
                  .filter((c) => c.field !== "__check__" && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                  );
                
                // do stuff here 
                navigate(`/order/${thisRow.OrderID}`)
                return (
                  <OrderDetails order={thisRow}/> 
                ); 
              };
        
              return <Button onClick={onClick} variant="outlined">Details</Button>;
            }
          },
      ];
      
      const rows = [
        { id: 1, OrderID: 'O001', CompanyName: 'Apple inc', Status: 'Pending' },
        { id: 2, OrderID: 'O002', CompanyName: 'Orange inc', Status: 'Pending' },
        { id: 3, OrderID: 'O003', CompanyName: 'Pineapple inc', Status: 'Pending' },
        { id: 4, OrderID: 'O004', CompanyName: 'Pizza inc', Status: 'Pending' },
        
      ];

    return(
        <div style={{ height: "400px", width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
    )
}
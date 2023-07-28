import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllInventory, loadInventoryIntoCallback } from "./Worker";

export default function InventoryStatus(){
    const [rows, setRows] = useState(null);
    useEffect(()=>{
      loadInventoryIntoCallback(setRows)

    },[])

    const columns = [
        { field: 'IngredientID', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Ingredient Name', width: 200 },
        { field: 'PricePerUnit', headerName: 'Price/Unit (RM)', width: 130 },
        {
          field: 'Quantity',
          headerName: 'Quantity',
          type: 'number',
          width: 90,
        },
        { field: 'Unit', headerName: 'Unit', width: 130 },
    
    
      ];
      

    return(
        <div>
            <p>Insert data visualisation here</p>
            <div style={{ height: "400px", width: '100%' }}>
                    
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    />
                    </div>
        </div>
    )
}
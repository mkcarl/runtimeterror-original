import { Grid, Paper } from "@mui/material"
import { useAuth } from "./AuthContext";
import { determineUserRole } from "./Worker";

function Chart(){
    return(<p>Chart</p>)
}

function Orders(){
    return(<p>Orders</p>)

}

function Summary(){
    return(<p>Summary</p>)

}

export default function GenerateReport() {
    const {currentUser} = useAuth()

    if (determineUserRole(currentUser) == "Inventory Controller"){
        return (
            <div>
              <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <Orders />
                  </Paper>
                </Grid>
      
                {/* Recent Deposits */}
      
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Summary />
                  </Paper>
                </Grid>
      
                {/* Chart */}
      
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          );
    }

}
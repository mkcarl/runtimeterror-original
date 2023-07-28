import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"

export default function OrderRejection(props){

    return(
        <Container sx={{padding:'15px'}}>
            <Typography variant="p" color={"text.secondary"}>
                Do state a reason for rejecting the order. Please provide explicit advice for the restaurant owners. 
            </Typography>
            <TextField 
                variant="outlined"
                label="Reason"
                multiline
                fullWidth
                sx={{marginTop:'15px'}}
            />
            <Grid container align='center' >
                <Grid item xs={12}>
                    <Button variant="contained" onClick={props.onBack} sx={{margin:'10px'}}>Back</Button>
                    <Button variant="contained" color="success" sx={{margin:'10px'}}>Send</Button>

                </Grid>
            </Grid>

        </Container>
    )
}
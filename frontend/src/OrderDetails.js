import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IncomingEmail from './IncomingEmail';
import { Button, Card, CardContent, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import OrderRejection from './OrderRejection';
import SimpleDialog from './SimpleDialog';


// please delete this in production

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Runtime Terror
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

function OrderDetailsContent(props) {
  const [open, setOpen] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState()
  const handleClickOpen = () => {
    console.log(dialogOpen)
    setDialogOpen(true);
  };

  const handleClose = (value) => {
    setDialogOpen(false);
    setSelectedValue(value);
  };
  let { orderID } = useParams()
  let navigate = useNavigate()
  

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
  
  const rows = [
    { id: 1, IngredientID: '1', PricePerUnit: '20', Quantity: 352 , Unit:"KG", Name:"Coriander"},
    { id: 2, IngredientID: '2', PricePerUnit: '15', Quantity: 350 , Unit:"KG", Name:"Onion"},
    { id: 3, IngredientID: '3', PricePerUnit: '35', Quantity: 300 , Unit:"KG", Name:"Garlic"},
    
  ];

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={!open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {orderID}
            </Typography>
            <Chip 
            variant='filled' 
            // color={
            //   props.order.Status === "Pending" ? 
            //   'info' : props.order.Status === "Approved" ? 
            //   'success' : props.order.Status === "Reject" ? 'error' : 'info'}
              />
          </Toolbar>
        </AppBar>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            <Card variant={"elevation"}>
                <CardContent>
                    <Typography variant='h3'>title here</Typography>
                    <Typography variant='p' color={"text.secondary"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis congue pellentesque. Sed eleifend massa auctor massa suscipit, tincidunt fringilla massa laoreet. Nunc vel nunc sem. Maecenas sit amet arcu vel erat tincidunt porttitor. Aenean non pretium urna, in vulputate lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris at tellus facilisis, facilisis sem id, commodo dui. Sed vitae pharetra magna. Quisque rutrum scelerisque sollicitudin. Nunc leo odio, ultricies interdum nisl sit amet, lacinia hendrerit ex.
                    </Typography>
                </CardContent>
            </Card>

            <Card variant='elevation' sx={{marginTop:"20px"}}>
                <CardContent>
                    <Typography variant='h3'>Attachment Data</Typography> 
                    <div style={{ height: "400px", width: '100%' }}>
                    
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    />
                    </div>
                </CardContent>
            </Card>

            <Card variant='elevation' sx={{marginTop:"20px"}}>
                <CardContent>
                    <Typography variant='h3'>Extracted Data</Typography> 
                    <div style={{ height: "400px", width: '100%' }}>
                    
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    />
                    </div>
                </CardContent>
            </Card>
            <Grid container columnSpacing={2} sx={{marginTop:"20px"}} align='center'>
              <Grid item>
                <Button variant='contained' onClick={()=>navigate(-1)}>BACK</Button>
              </Grid>
              <Grid item xs={8}/> 
              <Grid item>
                <Button color='error' variant='outlined' onClick={() => handleClickOpen()}>REJECT</Button>
              </Grid>
              <Grid item>
                <Button color='success' variant='outlined'>APPROVE</Button>
              </Grid>
            </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      <SimpleDialog
        dialogTitle="Reject order"
        selectedValue={selectedValue}
        open={dialogOpen}
        onClose={handleClose}>
          <OrderRejection onBack={handleClose}/>
        </SimpleDialog>

    </ThemeProvider>
  );
}


export default function OrderDetails() {
  return <OrderDetailsContent />;
}
import { Dialog, DialogTitle, Typography } from "@mui/material";
import OrderRejection from "./OrderRejection";

export default function SimpleDialog(props){
    const { onClose, selectedValue, open, dialogTitle} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return(
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {props.children}
    </Dialog>
  )

}
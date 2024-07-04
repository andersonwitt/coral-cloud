/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function Uploader({ toggle, open }) {
  const handleToggle = (isOpen) => () => {
    toggle(isOpen);
  };
  return (
    <Dialog open={open} onClose={handleToggle(false)}>
      <DialogTitle>Something</DialogTitle>
      <DialogContent>Something Else</DialogContent>
      <DialogActions>Nothing else matters</DialogActions>
    </Dialog>
  );
}

export default Uploader;

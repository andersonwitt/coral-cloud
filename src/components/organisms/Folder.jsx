/* eslint-disable react/prop-types */
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FolderTree from "../atoms/FolderTree";
import { useContext, useState } from "react";
import { FilesContext } from "../contexts/FilesContext";
import { useSnackbar } from "notistack";

function Folder({ toggle, open }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { dbConnection } = useContext(FilesContext);
  const responsive = useMediaQuery(theme.breakpoints.down("sm"));
  const [folder, setFolder] = useState({ folderName: "", previous: "root" });

  const resetFolderState = () => {
    setFolder({ folderName: "", previous: "root" });
  };

  const handleToggle = (isOpen) => () => {
    toggle(isOpen);
    if (!isOpen) {
      resetFolderState();
    }
  };

  const handleAddFolder = async () => {
    try {
      if (!folder.folderName?.trim()) {
        enqueueSnackbar("Nome não pode ser vazio e ser válido!", {
          variant: "error",
        });
        return;
      }

      const something = await dbConnection.getAllFolders();

      if (something.some((item) => item.name === folder.folderName)) {
        enqueueSnackbar(
          `Já existe uma pasta com o nome: "${folder.folderName}"`,
          { variant: "error" }
        );
        return;
      }

      const file = {
        name: folder.folderName.trim(),
        previous: folder.previous,
        next: "",
      };

      await dbConnection.addFolder(file);
      handleToggle(false)();
      enqueueSnackbar("Pasta Criada!", { variant: "success" });
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Não foi possível criar a pasta!", { variant: "error" });
    }
  };

  const handleFieldchanged = (e) => {
    setFolder({ ...folder, [e.target.name]: e.target.value });
  };

  const handlePreviousFolderChanged = (name) => {
    setFolder({ ...folder, previous: name });
  };

  return (
    <Dialog
      fullScreen={responsive}
      open={open}
      onClose={handleToggle(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ p: 0 }}>
        <AppBar position="relative">
          <Toolbar>
            <Typography>Criar Pasta</Typography>
          </Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="folderName"
                inputProps={{ form: "folder-form" }}
                fullWidth
                label="Nome da Pasta"
                onChange={handleFieldchanged}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Criar a partir da pasta:</Typography>
              <FolderTree onSelectedChanged={handlePreviousFolderChanged} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle(false)} variant="contained" color="error">
          Cancelar
        </Button>
        <Button onClick={handleAddFolder} variant="contained" color="success">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Folder;

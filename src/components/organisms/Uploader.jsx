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
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FolderTree from "../atoms/FolderTree";
import { useContext, useState } from "react";
import { CloudUploadOutlined } from "@mui/icons-material";
import { FilesContext } from "../contexts/FilesContext";
import { blobToArrayBuffer } from "../../utils/FileUtils";
import { useSnackbar } from "notistack";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Uploader({ toggle, open }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { dbConnection } = useContext(FilesContext);
  const responsive = useMediaQuery(theme.breakpoints.down("sm"));
  const [folder, setFolder] = useState({ folderName: "root" });
  const [file, setFile] = useState(null);

  const resetState = () => {
    setFolder({ folderName: "root" });
    setFile(null);
  };

  const handleAddFile = async () => {
    try {
      if (!file) {
        enqueueSnackbar("Arquivo não pode ser vazio!", { variant: "error" });
        return;
      }

      const fileResult = await dbConnection.getAllFiles();

      if (fileResult.some((item) => item.name === file.name)) {
        enqueueSnackbar("Arquivo ja existente!", { variant: "error" });
        return;
      }

      const buffer = await blobToArrayBuffer(file);

      const payload = {
        name: file.name,
        extension: file.name.split(".").at(-1),
        size: file.size,
        type: file.type,
        buffer,
        folderName: folder.folderName,
      };

      dbConnection.addFile(payload);
      handleToggle(false)();
      enqueueSnackbar("Arquivo Carregado!", { variant: "success" });
    } catch {
      enqueueSnackbar("Erro ao carregar arquivo!", { variant: "error" });
    }
  };

  const handleFileChanged = async (e) => {
    const file = e?.target?.files?.[0] || null;

    if (file?.size > 1048576 * 10) {
      enqueueSnackbar("Arquivo deve ter no máximo 10MB", {
        variant: "error",
      });
      return;
    }

    setFile(file);
  };

  const handleToggle = (isOpen) => () => {
    toggle(isOpen);
    if (!isOpen) {
      resetState();
    }
  };

  const handleFolderChanged = (name) => {
    setFolder({ ...folder, folderName: name });
  };

  return (
    <Dialog
      fullScreen={responsive}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleToggle(false)}
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
              <Box display="flex" flexDirection="column" gap={3}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadOutlined />}
                >
                  Carregar Arquivo
                  <VisuallyHiddenInput
                    onChange={handleFileChanged}
                    type="file"
                  />
                </Button>
                {file?.name}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography>Criar a partir da pasta:</Typography>
              <FolderTree onSelectedChanged={handleFolderChanged} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle(false)} variant="contained" color="error">
          Cancelar
        </Button>
        <Button onClick={handleAddFile} variant="contained" color="success">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Uploader;

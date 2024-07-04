import FileCardList from "../molecules/FileCardList";
import { Typography } from "@mui/material";
import Layout from "../templates/Layout";

function Home() {
  return (
    <Layout>
      <Typography>Home</Typography>
      <FileCardList
        files={"1"
          .repeat(50)
          .split("")
          .map((_, index) => ({
            id: index,
            extension: "xlsm",
            size: 1024,
            name: "Trabalho de Português",
          }))}
      />
    </Layout>
  );
}

export default Home;

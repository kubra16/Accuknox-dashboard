import { Box } from "@mui/material";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#ebedef ",
        height: "100%",
        width: "100%",
        position: "fixed",
        overflow: "auto",
      }}
    >
      <Dashboard />;
    </Box>
  );
}

export default App;

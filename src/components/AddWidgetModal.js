import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import useStore from "../store/useStore";

const AddWidgetModal = ({ open, handleClose }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const { categories, addWidget } = useStore();

  const handleAddWidget = () => {
    if (!widgetName || !widgetText || selectedCategory === -1) {
      alert("Please fill in all fields.");
      return;
    }

    const widgetId = Date.now().toString();
    const newWidget = { id: widgetId, name: widgetName, text: widgetText };
    addWidget(categories[selectedCategory].id, newWidget);
    handleClose();
    setWidgetName("");
    setWidgetText("");
    setSelectedCategory(0);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          height: "100%",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: 0,
        },
      }}
    >
      <DialogTitle
        sx={{
          width: "100%",
          height: "20px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#0D47A1",
          color: "white",
          fontWeight: "500",
          fontSize: "1.2rem",
        }}
      >
        Add new Widget
      </DialogTitle>
      <DialogContent>
        <Tabs
          value={selectedCategory}
          onChange={(e, newValue) => setSelectedCategory(newValue)}
          variant="fullWidth"
          aria-label="category tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#0D47A1",
            },
            "& .MuiTab-root": {
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#0D47A1",
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={category.id}
              label={
                category.name.length > 10
                  ? `${category.name.slice(0, 5)}`
                  : category.name
              }
            />
          ))}
        </Tabs>
        <Box mt={2}>
          <TextField
            autoFocus
            margin="dense"
            label="Widget Name"
            type="text"
            fullWidth
            variant="outlined"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Widget Text"
            type="text"
            fullWidth
            variant="outlined"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ color: "#0D47A1", borderColor: "#0D47A1" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddWidget}
          variant="contained"
          sx={{ backgroundColor: "#0D47A1" }}
        >
          Add Widget
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWidgetModal;

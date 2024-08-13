import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useStore from "../store/useStore";

const AddWidgetModal = ({ open, handleClose }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories, addWidget } = useStore();

  const handleAddWidget = () => {
    if (!widgetName || !widgetName || !selectedCategory) {
      alert("please fill in all feilds");
      return;
    }
    const widgetId = Date.now().toString();
    const newWidget = { id: widgetId, name: widgetName, text: widgetText };
    addWidget(selectedCategory, newWidget);
    handleClose();
    setWidgetName("");
    setWidgetText("");
    setSelectedCategory("");
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new Widget</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel id="select-category-label">Select Category</InputLabel>
          <Select
            labelId="select-category-label"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Select Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          label="widget Text"
          type="text"
          fullWidth
          variant="outlined"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddWidget} variant="contained" color="primary">
            Add Widget
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetModal;

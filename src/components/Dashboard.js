import React, { useState } from "react";
import useStore from "../store/useStore";
import { Box, Button, Input, InputAdornment } from "@mui/material";
import AddWidgetModal from "./AddWidgetModal";
import SearchIcon from "@mui/icons-material/Search";

const Dashboard = () => {
  const { categories, searchText, searchWidget } = useStore();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenModal = (categoryId) => {
    setSelectedCategory(categoryId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
  };

  const handleSearch = (e) => {
    searchWidget(e.target.value);
  };

  const filteredWidgets = (widgets) => {
    return widgets.filter(
      (widget) =>
        widget.name.toLowerCase().includes(searchText.toLowerCase()) ||
        widget.text.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredCategories = searchText
    ? categories.filter(
        (category) => filteredWidgets(category.widgets).length > 0
      )
    : categories;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Input
          type="text"
          placeholder="Search widgets..."
          onChange={handleSearch}
          value={searchText}
          sx={{
            marginTop: ".5rem",
            width: "50%",
            height: "35px",
            padding: "8px",
            border: "1px solid #808080",
            borderRadius: "4px",
            color: "#808080",
            backgroundColor: "#fff",
            fontSize: "16px",
            "&::placeholder": {
              color: "#808080",
              opacity: 0.8,
            },
            "&:focus": {
              borderColor: "#808080",
              outline: "none",
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#808080" }} />
            </InputAdornment>
          }
        />
      </Box>

      {filteredCategories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <Box
            sx={{
              padding: "2rem",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(3, 1fr)",
                width: "100%",
              }}
            >
              {(searchText
                ? filteredWidgets(category.widgets)
                : category.widgets
              ).map((widget) => (
                <Box
                  key={widget.id}
                  sx={{
                    height: "10rem",
                    border: "1px solid gray",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <h3>{widget.name}</h3>
                  <p>{widget.text}</p>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      useStore.getState().removeWidget(category.id, widget.id)
                    }
                  >
                    X
                  </Button>
                </Box>
              ))}

              <Box
                sx={{
                  height: "10rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid gray",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
                variant="contained"
                onClick={() => handleOpenModal(category.id)}
              >
                + Add Widget
              </Box>
            </Box>
          </Box>
        </div>
      ))}

      <AddWidgetModal
        open={openModal}
        handleClose={handleCloseModal}
        categoryId={selectedCategory}
      />
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import useStore from "../store/useStore";
import { Box, Button, Input, InputAdornment, Typography } from "@mui/material";
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
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, pl: 4 }}>
          Dashboard
        </Typography>

        <Input
          type="text"
          placeholder="Search widgets..."
          onChange={handleSearch}
          value={searchText}
          sx={{
            marginTop: ".5rem",
            width: "30%",
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
          <Typography variant="subtitle1" sx={{ fontWeight: 600, pl: 4 }}>
            {category.name}
          </Typography>

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
                    height: "12rem",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      borderBottom: "1px solid #e0e0e0",
                      backgroundColor: "#f7f7f7",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500, pl: 4 }}
                    >
                      {widget.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() =>
                        useStore.getState().removeWidget(category.id, widget.id)
                      }
                      sx={{
                        minWidth: "28px",
                        height: "28px",
                        p: 0,
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#ffebee",
                        "&:hover": {
                          backgroundColor: "#ffcdd2",
                        },
                      }}
                    >
                      X
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {widget.text}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Box
                sx={{
                  height: "12rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: "1rem",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
                variant="contained"
                onClick={() => handleOpenModal(category.id)}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    border: "2px solid #e0e0e0",
                    padding: "0.3rem 1rem",
                    borderRadius: ".5rem",
                  }}
                >
                  + Add Widget
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      ))}

      <AddWidgetModal
        open={openModal}
        handleClose={handleCloseModal}
        initialCategory={selectedCategory}
      />
    </div>
  );
};

export default Dashboard;

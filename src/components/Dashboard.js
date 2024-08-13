import React, { useState } from "react";
import useStore from "../store/useStore";

import { Button, Input } from "@mui/material";
import AddWidgetModal from "./AddWidgetModal";

const Dashboard = () => {
  const { categories, searchText, searchWidget } = useStore();
  const [openModal, setOpenModal] = useState(false);
  console.log(categories);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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

  return (
    <div>
      <Input
        type="text"
        placeholder="Search widgets..."
        onChange={handleSearch}
        value={searchText}
      />
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <Button variant="contained" onClick={handleOpenModal}>
            + Add Widget
          </Button>
          <div>
            {(searchText
              ? filteredWidgets(category.widgets)
              : category.widgets
            ).map((widget) => (
              <div key={widget.id}>
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
              </div>
            ))}
          </div>
        </div>
      ))}
      <AddWidgetModal open={openModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;

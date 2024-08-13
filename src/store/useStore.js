import create from "zustand";

const useStore = create((set) => ({
  categories: [
    {
      id: "1",
      name: "CSPM Executive Dashboard",
      widgets: [],
    },
    {
      id: "2",
      name: "Sales Overview",
      widgets: [],
    },
    {
      id: "3",
      name: "Image",
      widgets: [],
    },
    {
      id: "4",
      name: "Ticket",
      widgets: [],
    },
  ],

  searchText: "",

  addWidget: (categoryId, widget) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, widget] }
          : category
      ),
    })),

  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      ),
    })),
  searchWidget: (searchText) => set({ searchText }),
}));

export default useStore;

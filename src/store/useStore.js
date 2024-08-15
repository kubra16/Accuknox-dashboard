import create from "zustand";

const useStore = create((set) => ({
  categories: [
    {
      id: "1",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "1-1",
          name: "Security Alerts",
          text: "Overview of active security alerts.",
        },
      ],
    },
    {
      id: "2",
      name: "Sales Overview",
      widgets: [
        {
          id: "2-1",
          name: "Monthly Sales",
          text: "Sales data for the current month.",
        },
      ],
    },
    {
      id: "3",
      name: "Image",
      widgets: [
        { id: "3-1", name: "Logo", text: "Company logo and branding." },
      ],
    },
    {
      id: "4",
      name: "Ticket",
      widgets: [
        {
          id: "4-1",
          name: "Open Tickets",
          text: "List of unresolved support tickets.",
        },
      ],
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

import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from "./EmployeeReducer";
import MaterialReducer from "./MaterialReducer";

export const store = configureStore({
  reducer: {
    employees: EmployeeReducer,
    materials: MaterialReducer,
  },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const response = await axios.get("http://localhost:3000/employes");
    return response.data;
  }
);

export const addEmployeeAPI = createAsyncThunk(
  "employee/addEmployeeAPI",
  async (employee) => {
    const response = await axios.post(
      "http://localhost:3000/employes",
      employee
    );
    return response.data;
  }
);

export const deleteEmployeeAPI = createAsyncThunk(
  "employee/deleteEmployeeAPI",
  async (id) => {
    await axios.delete(`http://localhost:3000/employes/${id}`);
    return id;
  }
);

export const editEmployeeAPI = createAsyncThunk(
  "employee/editEmployeeAPI",
  async (employee) => {
    console.log("Attempting to edit employee with ID:", employee.id);
    console.log("Employee Data:", employee);
    const response = await axios.put(
      `http://localhost:3000/employes/${employee.id}`,
      employee
    );
    return response.data;
  }
);

const initialState = {
  employees: [],
  statut: "idle",
  erreur: null,
};

const EmployeeReducer = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployees.pending, (state) => {
        state.statut = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.statut = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.statut = "failed";
        state.erreur = action.error.message;
      })
      .addCase(addEmployeeAPI.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(deleteEmployeeAPI.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(editEmployeeAPI.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      });
  },
});

export default EmployeeReducer.reducer;

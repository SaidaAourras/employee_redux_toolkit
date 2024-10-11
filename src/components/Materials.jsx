import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFormDataAsync } from "../redux/MaterialReducer";
import "bootstrap/dist/css/bootstrap.min.css";

const categories = [
  { value: "category1", label: "Category 1" },
  { value: "category2", label: "Category 2" },
  { value: "category3", label: "Category 3" },
];

const Materials = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.materials.data);
  const loading = useSelector((state) => state.materials.loading);
  const error = useSelector((state) => state.materials.error);

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && category) {
      dispatch(addFormDataAsync({ date, category }));
      setDate("");
      setCategory("");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Form with Redux Toolkit</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">
            Date
          </label>
          <input
            id="dateInput"
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">
            Category
          </label>
          <select
            id="categorySelect"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Confirm"
          )}
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      <h3>Submitted Data:</h3>
      <ul className="list-group">
        {formData.map((item, index) => (
          <li key={index} className="list-group-item">
            {`Date: ${item.date}, Category: ${item.category}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Materials;

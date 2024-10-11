import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Form from "./form";
import { deleteEmployeeAPI, fetchEmployees } from "../redux/EmployeeReducer";

function Employees() {
  const dispatch = useDispatch();
  const { employees, statut, erreur } = useSelector((state) => state.employees);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployeeAPI(id));
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee(null);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.departement.toLowerCase().includes(departmentFilter.toLowerCase())
  );

  if (statut === "loading") {
    return <div>Loading...</div>;
  }

  if (statut === "failed") {
    return <div>Error: {erreur}</div>;
  }

  return (
    <div className="table-responsive w-75 mx-auto">
      {isModalOpen && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(128, 128, 128, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
          }}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Edit Employé
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Form
                  currentEmployee={currentEmployee}
                  setCurrentEmployee={setCurrentEmployee}
                  closeModal={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Filter Input */}
      <div className="mb-3">
        <label htmlFor="departmentFilter" className="form-label">
          Filter by Department:
        </label>
        <input
          type="text"
          className="form-control"
          id="departmentFilter"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          placeholder="Enter department"
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Département</th>
            <th scope="col">Poste</th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.nom}</td>
              <td>{employee.prenom}</td>
              <td>{employee.departement}</td>
              <td>{employee.post}</td>
              <td className="text-center">
                <button
                  className="btn btn-outline-info btn-sm mx-1"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm mx-1"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;

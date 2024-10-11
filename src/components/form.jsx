import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEmployeeAPI, editEmployeeAPI } from "../redux/EmployeeReducer";
import { v4 as uuidv4 } from "uuid";

const Form = ({ currentEmployee, setCurrentEmployee, closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    departement: "",
    post: "",
  });

  useEffect(() => {
    if (currentEmployee) {
      setFormData(currentEmployee);
    } else {
      setFormData({
        nom: "",
        prenom: "",
        departement: "",
        post: "",
      });
    }
  }, [currentEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEmployee) {
      dispatch(editEmployeeAPI(formData));
    } else {
      dispatch(addEmployeeAPI({ ...formData, id: uuidv4() }));
    }

    console.log("employé soumis:", formData);

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">
        {currentEmployee ? "Modifier Employé" : "Ajouter Employé"}
      </h2>
      <div className="form-group">
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          className="form-control"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="prenom">Prénom:</label>
        <input
          type="text"
          className="form-control"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="departement">Département:</label>
        <input
          type="text"
          className="form-control"
          id="departement"
          name="departement"
          value={formData.departement}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="post">Poste:</label>
        <input
          type="text"
          className="form-control"
          id="post"
          name="post"
          value={formData.post}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {currentEmployee ? "Modifier" : "Confirmer"}
      </button>
    </form>
  );
};

export default Form;

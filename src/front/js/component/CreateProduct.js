import React, { useEffect, useState } from "react";
const CreateProduct = () => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(
      "https://3001-4geeksacade-reactflaskh-xsignswlrsm.ws-eu85.gitpod.io/api/category"
    )
      .then((res) => res.json())
      .then((data) => {
        
        setCategories(data)
    });
  }, []);
  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    console.log(formData);
    fetch(
      "https://3001-4geeksacade-reactflaskh-xsignswlrsm.ws-eu85.gitpod.io/api/product",
      {
        method: "POST", //
        body: JSON.stringify(formData), // objeto del nuevo producto
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status !== 400) {
          res.json();
        }
      })
      .then((data) => console.log("Success:", data));
  };
  return (
    <>
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="name"
            className="form-control"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="price"
            className="form-control"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="form-label">Stock</label>
          <input
            type="stock"
            className="form-control"
            name="stock"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="form-label">Imagen</label>
          <input
            type="img"
            className="form-control"
            name="img"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="form-label">Categoria</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="category"
            onChange={handleChange}
          >
            <option selected>Open this select menu</option>
            {categories.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-secondary" onClick={handleClick}>
          Agregar producto
        </button>
      </form>
    </>
  );
};
export default CreateProduct;

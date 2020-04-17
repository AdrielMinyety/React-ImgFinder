import React, { useState } from 'react';

export function Browser({setBusqueda, setPaginaActual}) {

  // declarar el estado
  // set State
  const [ usuarioPeticion, setUsuarioPeticion] = useState('');

  // leer datos del formulario
  // read form's data
  const handleChange = e => {
    setUsuarioPeticion(e.target.value);
  }

  // pasar los datos al componente padre
  // pass data to father component
  const handleClick = () => {
    if (usuarioPeticion.trim() !== '') {
      setBusqueda(usuarioPeticion);
      setPaginaActual(1);
    }
  }


  return (
    <div className="container-fluid bg-white text-center p-4 rounded-bottom shadow">
        <h1>Get Images for Free</h1>
        <nav className="navbar navbar-light bg-light p-4 mx-auto">
            <p className="navbar-brand font-weight-bold">PixyBay-API</p>
            
            <input 
                className="form-control"
                type="search"
                placeholder="Write what you are loking for..."
                aria-label="Search"
                onChange = {handleChange}
            />

            <button 
                className="btn btn-outline-warning btn-block mt-3" 
                type="submit"
                onClick={handleClick}
              >Search</button>
        </nav>
    </div>
  );
};
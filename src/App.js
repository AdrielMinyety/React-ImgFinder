import React, { useState, useEffect } from 'react';
import { Browser } from "./components/Browser";
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // States
  const [Busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // detectar cambios en los states (Busqueda y PaginaActual).
  // detect changes in the states (Busqueda y PaginaActual).
  useEffect(() => {
    if(Busqueda === '') return;

    const consultarAPI = async () => {
      const imgPorPagina = 15;
      const key = "16046955-7e7bedc44b56eb945e2a4db3d";

      const url = `https://pixabay.com/api/?key=${key}&q=${Busqueda}&per_page=${imgPorPagina}&page=${paginaActual}`;

      const consulta = await fetch(url);
      const respuesta = await consulta.json();

      // Si hay error, mostrar error
      // if there is an error, show error
      if(respuesta.hits === [] || respuesta.hits.length === 0){
        setError(true)
        return;
      }

      setLoading(true);

      // guardar datos en el state.
      // save data in the state.
      setImagenes(respuesta.hits);
      
      // cargar elemento, pero ocultarlo unos segundos.
      // load element, but hide it for seconds.
      const listados = document.getElementsByClassName("listadoImagenes");
      listados[0].style.opacity = 0;

      // mover pantalla hasta arriba
      // move the screen to the top
      const app = document.querySelector(".App");
      app.scrollIntoView({behavior : 'smooth'});      
      // cargar Spinner de "cargando"
      // Load spinner of "Loading"
      const loading = setTimeout(() => {
        listados[0].style.opacity = 1;
        setLoading(false);
        setError(false);
        // calcular total de paginas
        // calculate total pages
        let calcularPaginaActual = Math.ceil(respuesta.totalHits / imgPorPagina);
        setTotalPaginas(calcularPaginaActual);
      }, 2500);
      return () => clearTimeout(loading);
    }
    consultarAPI();
  }, [Busqueda, paginaActual]); /*UseEffect*/

  // Pagina siguiente y/o anterior
  // next and/or previous page
  const previousPage = () => {
    if(paginaActual === 1) return;
    setPaginaActual(paginaActual - 1);
  }
  const nextPage = () => {
    if(paginaActual === totalPaginas) return;
    setPaginaActual(paginaActual + 1);
  }

  return (
    <div className="App">
      <Browser 
        setBusqueda = {setBusqueda}
        setPaginaActual = {setPaginaActual}
      />

      {/* Si el estado esta cargando, mostrar spinner */}
      {/* If the state is loading, show spinner */}
      { loading === true 
      ? 
        <div className="spinner"></div> 
      : 
        null  
      }
      
      {/* Si hay un error, mostrar mensaje */}
      {/* If there is an error, show message */}
      { error === true
      ?
        <div className="w-75 mx-auto alert alert-warning alert-dismissible fade show mt-5" role="alert">
          <strong>Ups!</strong> We could not find what you are looking for... Try in another way :>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      :
        null
      }

      <div className="listadoImagenes container my-5 p-5 ">
        <ListadoImagenes
            imagenes = {imagenes}
            />
      </div>

      {/* si hay imagenes, mostrar paginador*/}
      {/* If there are images, show paginador*/}
      {imagenes.length !== 0 ?
        <div className="container paginador text-center mx-auto mb-5">
          { (paginaActual === 1) ? null : (
            <button 
              type="button"
              id="back"
              className="btn btn-outline-warning"
              onClick={previousPage}
              >
              <i className="fas fa-angle-left"></i>
            </button>
          )}
          <p>{paginaActual}</p>
          { (paginaActual === totalPaginas)? null :(
            <button
              type="button"
              id="next"
              className="btn btn-outline-warning"
              onClick={nextPage}
              >
              <i className="fas fa-angle-right"></i>
            </button>
          )}
        </div>
      : null
      }

      <div className="footer shadow-lg bg-light fixed-bottom">
        <h6 className="text-center text-muted">Web made by Adriel Minyety Gonzalez ©</h6>
      </div>
    </div>
  );
}

export default App;

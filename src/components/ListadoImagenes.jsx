import React from 'react';
import Imagen from './Imagen';

export default function ListadoImagenes({imagenes}) {
    return (
        <div className="card-columns">
            {/* Crear un componente por cada imagen*/}
            {/* Make a component for each image*/}
            {imagenes.map(imagen => (
                <Imagen
                    key = {imagen.id}
                    imagen = {imagen}
                />
            ))}
        </div>
    )
}

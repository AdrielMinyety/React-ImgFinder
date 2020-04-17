import React from 'react';

export default function Imagen({imagen}) {

    // tomar los datos de la API, pasados por props.
    // take api's data, passed throw props.
    const {largeImageURL, tags, views, likes,user} = imagen;

    return (
        <div className="card my-4 card-img shadow">
            <img 
                src={largeImageURL}
                className="card-img-top"
                alt={tags} 
            />

            <div className="card-body w-100 pt-0 card-info">
                <div className="toggleBtn text-center">
                    <i className="d-block fas fa-angle-up"></i>
                    <i className="d-block fas fa-angle-down"></i>
                </div>

                <div className="card-text">
                    <h5 className="card-title text-capitalize m-0 p-0"><i className="far fa-user-circle"></i> {user}</h5>

                    <div className="row">
                        <p className="col m-0">{likes} <i className="far fa-heart"></i></p>
                        <p className="col m-0">{views} <i className="far fa-eye"></i></p>
                    </div>
                    <a 
                        className="btn btn-outline-warning btn-sm btn-block" 
                        href={largeImageURL} 
                        target="_blank" 
                        rel="noopener noreferrer">
                            Descargar <i className="fas fa-download"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}
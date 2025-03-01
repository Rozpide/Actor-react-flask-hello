import React from "react";

const ActorList = ({ actors, deleteActor }) => {
    return (
        <div>
            <h2>Lista de Actores</h2>
            {actors.length === 0 ? (
                <p>No hay actores disponibles.</p>
            ) : (
                <ul className="list-group">
                    {actors.map((actor) => (
                        <li key={actor.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                <strong>{actor.name}</strong> - {actor.nationality}
                            </span>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteActor(actor.id)}>
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ActorList;

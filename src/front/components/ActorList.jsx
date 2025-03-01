import React, { useState, useEffect } from "react";

const ActorList = () => {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch("/api/actor")
            .then((response) => response.json())
            .then((data) => setActors(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div>
            <h1>Lista de Actores</h1>
            <ul>
                {actors.map((actor) => (
                    <li key={actor.id}>
                        {actor.name} - {actor.nationality}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActorList;

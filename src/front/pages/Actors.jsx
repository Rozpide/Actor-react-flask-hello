import React, { useState, useEffect } from "react";
import ActorList from "../components/ActorList";

export const Actors = () => {
    const [actors, setActors] = useState([]);
    const [formData, setFormData] = useState({ name: "", nationality: "" });

    const BACKEND_URL = "https://curly-space-palm-tree-gv6qxj9jq6q39rgx-3001.app.github.dev";
    const loadActors = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/actor`);
            if (response.ok) {
                const data = await response.json();
                setActors(data);
            } else {
                console.error("Error loading actors:", response.statusText);
            }
        } catch (error) {
            console.error("Error loading actors:", error);
        }
    };

    const addActor = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/actor`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({ name: "", nationality: "" }); // Limpiar formulario
                loadActors(); // Recargar lista
            } else {
                const errorData = await response.json();
                console.error("Error adding actor:", errorData);
            }
        } catch (error) {
            console.error("Error adding actor:", error);
        }
    };

    const deleteActor = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/actor/${id}`, { method: "DELETE" });
            if (response.ok) {
                loadActors(); // Recargar lista
            } else {
                const errorData = await response.json();
                console.error("Error deleting actor:", errorData);
            }
        } catch (error) {
            console.error("Error deleting actor:", error);
        }
    };

    useEffect(() => {
        loadActors();
    }, []);

    return (
        <div className="container">
            <h1 className="my-4 text-center">Manage Actors</h1>

            {/* Formulario estilizado */}
            <form className="mb-4" onSubmit={addActor}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter actor's name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="nationality" className="form-label">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            className="form-control"
                            placeholder="Enter actor's nationality"
                            value={formData.nationality}
                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3 w-100">Add Actor</button>
            </form>

            {/* Lista de actores */}
            <ActorList actors={actors} deleteActor={deleteActor} />
        </div>
    );
};

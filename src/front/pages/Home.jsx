import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined");

            const response = await fetch(backendUrl + "/api/hello");
            const data = await response.json();

            if (response.ok) dispatch({ type: "set_hello", payload: data.message });
        } catch (error) {
            console.error("Error loading backend message:", error);
        }
    };

    useEffect(() => {
        loadMessage();
    }, []);

    return (
        <div className="container text-center mt-5">
            <h1>Welcome to the Actor Manager</h1>
            <p className="lead">
                Manage your actor database easily and effectively.
            </p>
            <div className="alert alert-info">
                {store.message ? store.message : "Loading message from the backend..."}
            </div>
        </div>
    );
};

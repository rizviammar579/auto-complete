import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "./Loader.jsx";

function ProtectedRoute() {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        fetch(`${BACKEND_URL}/auth/me`, {
            credentials: "include"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Not authenticated");
                }

                return response.json();
            })
            .then(() => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    if (isAuthenticated === null) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;

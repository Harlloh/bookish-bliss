import { useAuthStore } from "@/stores/authStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteM({ children }: { children: ReactNode }) {
    const { user, isAuthenticated } = useAuthStore()
    if (!user || !isAuthenticated) {
        return <Navigate to='/' replace />
    }
    return (
        <>
            {children}
        </>
    );
}

export default ProtectedRouteM;
import { createContext , useContext , useState } from "react";

const AccessDeniedContext = createContext();

export function AccessDeniedProvider({ children }) {
    const [show, setShow] = useState(false);

    const showAccessDenied = () => {
        setShow(true);

        setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    return (
        <AccessDeniedContext.Provider value={{ show, showAccessDenied }}>
            {children}
        </AccessDeniedContext.Provider>
    );
}

export function useAccessDenied() {
    return useContext(AccessDeniedContext);
}
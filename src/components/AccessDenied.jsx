import { useAccessDenied } from "../context/AccessDeniedContext.jsx";

function AccessDenied() {
    
    const { show } = useAccessDenied();

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="rounded-xl border border-gray-200 bg-white px-10 py-8 text-center shadow-xl">
                <h2 className="text-xl font-bold text-gray-900">
                    Access Restricted
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    You don't have permission to perform this action.
                </p>
            </div>
        </div>
    );
}

export default AccessDenied;
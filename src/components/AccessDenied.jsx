import { useAccessDenied } from "../context/AccessDeniedContext.jsx";

function AccessDenied() {

    const { show } = useAccessDenied();

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-10 py-8 text-center shadow-xl w-xl">
                <h2 className="text-4xl font-bold text-red-500 flex justify-center items-center gap-2">
                    <img src="../access-denied.png" alt="" className="w-[50px]" /> Action Restricted!
                </h2>

                <p className="mt-2 text-xl text-gray-800">
                    You don't have permission to perform this action.
                </p>
                <p className="mt-2 text-sm text-gray-600 mt-8">
                    Your account has view-only access to Auto-Complete. Actions that modify assignments or data are restricted to authorized accounts.
                </p>
            </div>
        </div>
    );
}

export default AccessDenied;
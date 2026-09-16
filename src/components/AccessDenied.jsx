import { useAccessDenied } from "../context/AccessDeniedContext.jsx";

function AccessDenied() {

    const { show } = useAccessDenied();

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm ">
            <div className="w-[70vw] dx:w-md hx:w-xl flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white cx:px-10 px-4 cx:py-8 py-4 text-center shadow-xl">
                <h2 className="text-xl ex:text-2xl fx:text-3xl hx:text-4xl font-bold text-red-500 flex justify-center items-center gap-2">
                    <img src="../access-denied.png" alt="" className="w-[25px] ex:w-[30px] fx:w-[40px] hx:w-[50px]" /> Action Restricted!
                </h2>

                <p className="w-[100%] flex items-center justify-center text-[14px] ex:text-[16px] fx:text-lg hx:text-xl text-gray-800 mt-2">
                    You don't have permission to perform this action.
                </p>
                <p className="w-[100%] flex items-center justify-center text-[10px] ex:text-[12px] fx:text-[14px] hx:text-sm text-gray-600 mt-8 mb-4 text-center">
                    Your account has view-only access to Auto-Complete. Actions that modify assignments or data are restricted to authorized accounts.
                </p>
            </div>
        </div>
    );
}

export default AccessDenied;
import useKiosk from "@/hooks/useKiosk";
import Layout from "@/layout/Layout"
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import validateOrder from "@/helpers/validation";
import { formatMoney } from "@/helpers";



function Total() {

    const { order, clientName, setClientName, total, saveOrderInDB, loadings: { isCreatingOrder } } = useKiosk();

    const [errorMsg, setErrorMsg] = useState('');
    const [isValidOrder, setIsValidOrder] = useState(false);


    const handleOrderValidation = () => {
        const { isValid, errorMsg } = validateOrder(order, clientName);

        setIsValidOrder(isValid);
        setErrorMsg(errorMsg);


    }

    useEffect(() => {
        handleOrderValidation();
    }, [order, clientName]);



    const handleSubmit = (e) => {
        e.preventDefault();
        handleOrderValidation();
        if (!isValidOrder) {
            toast.error(errorMsg);
            return;
        }

        saveOrderInDB();


    }
    return (
        <Layout page="Total Pedido">
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>

            <form
                onSubmit={handleSubmit}
            >
                <div>
                    <label
                        className="block uppercase text-slate-800 font-bold text-xl"
                        htmlFor="name"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-200 w-full lg:w-1/3 max-w-sm mt-3 p-2 rounded-md"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a pagar {''} <span className="font-bold">{formatMoney(total)}</span></p>
                </div>

                <div className="mt-5">
                    <input
                        type="submit"
                        value="Confirmar Pedido"
                        className={`w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center transition-colors bg-indigo-600 hover:bg-indigo-800  
                        ${!isValidOrder || isCreatingOrder ? 'opacity-40 hover:cursor-not-allowed' : 'hover:cursor-pointer'}`}
                        disabled={!isValidOrder || isCreatingOrder}
                    />
                </div>

            </form>
        </Layout>
    )
}

export default Total
import AdminLayout from "@/layout/AdminLayout";
import OrderCompleted from "@/components/admin/OrderCompleted";
import Spinner from "@/components/Spinner";
import useKiosk from "@/hooks/useKiosk";
import { useEffect } from "react";

function Completed() {


    const { completedOrders, getCompletedOrders, loadings: { isLoadingCompletedOrders } } = useKiosk();

    useEffect(() => {
        getCompletedOrders();
    }, [])

    const existData = completedOrders && completedOrders.length > 0;

    return (
        <AdminLayout page="Admin">
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-2xl my-10">Administra las ordenes</p>

            {
                isLoadingCompletedOrders
                    ?
                    (
                        <Spinner />
                    )
                    :
                    (
                        existData
                            ?
                            (
                                completedOrders.map(order => (
                                    <OrderCompleted
                                        key={order.id}
                                        _order={order}
                                    />
                                ))
                            )
                            :
                            (
                                <p>No hay ordenes completadas</p>
                            )
                    )

            }
        </AdminLayout>
    )
}

export default Completed
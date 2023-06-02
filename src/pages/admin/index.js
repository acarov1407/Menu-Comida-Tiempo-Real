import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "@/layout/AdminLayout"
import Order from "@/components/admin/Order";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import useKiosk from "@/hooks/useKiosk";

function Admin() {

    const fetcher = () => axios('/api/orders').then(data => data.data);
    const { data: initialPendingOrders, error, isLoading } = useSWR('/api/orders', fetcher, {
        refreshInterval: 10000
    });

    const { pendingOrders, setPendingOrders } = useKiosk();

    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    useEffect(() => {
        setPendingOrders(initialPendingOrders);
    }, [initialPendingOrders])

    useEffect(() => {
        if (pendingOrders) setIsLoadingOrders(false);
        else setIsLoadingOrders(true);
    }, [pendingOrders])



    const existData = pendingOrders && pendingOrders.length > 0;
    return (
        <AdminLayout page="Admin">
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-2xl my-10">Administra las ordenes</p>

            {
                isLoadingOrders
                    ?
                    (
                        <Spinner />
                    )
                    :
                    (
                        existData
                            ?
                            (
                                pendingOrders.map(order => (
                                    <Order
                                        key={order.id}
                                        _order={order}
                                    />
                                ))
                            )
                            :
                            (
                                <p>No hay ordenes pendientes</p>
                            )
                    )

            }
        </AdminLayout>
    )

}

export default Admin
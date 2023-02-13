import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "@/layout/AdminLayout"
import Order from "@/components/Order";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

function Admin() {

    const fetcher = () => axios('/api/orders').then(data => data.data);
    const { data: pendingOrders, error, isLoading } = useSWR('/api/orders', fetcher, {
        refreshInterval: 100
    });

    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    useEffect(() => {
        if (pendingOrders) setIsLoadingOrders(false);
        else setIsLoadingOrders(true);
    }, [pendingOrders])

    const existData = pendingOrders && pendingOrders.length > 0;
    return (
        <AdminLayout page={"Admin"}>
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
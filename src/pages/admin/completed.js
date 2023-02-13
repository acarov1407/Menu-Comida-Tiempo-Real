import axios from "axios";
import useSWR from 'swr';
import AdminLayout from "@/layout/AdminLayout";
import Order from "@/components/admin/Order";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";

function Completed() {

    const fetcher = () => axios('/api/orders_completed').then(data => data.data);
    const { data: completedOrders} = useSWR('/api/orders_completed', fetcher, {
        refreshInterval: 3000
    });

    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    useEffect(() => {
        if (completedOrders) setIsLoadingOrders(false);
        else setIsLoadingOrders(true);
    }, [completedOrders])

    const existData = completedOrders && completedOrders.length > 0;

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
                                completedOrders.map(order => (
                                    <Order
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
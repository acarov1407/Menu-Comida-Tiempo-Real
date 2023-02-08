import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "@/layout/AdminLayout"
import Order from "@/components/Order";

function Admin() {

    const fetcher = () => axios('/api/orders').then(data => data.data);
    const { data, error, isLoading } = useSWR('/api/orders', fetcher, {
        refreshInterval: 100
    });

    const existData = data && data.length > 0;
    return (
        <AdminLayout page={"Admin"}>
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-2xl my-10">Administra las ordenes</p>

            {
                existData
                    ?
                    (
                        data.map(order => (
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
            }
        </AdminLayout>
    )
}

export default Admin
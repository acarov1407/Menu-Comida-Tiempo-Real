import AdminLayout from "@/layout/AdminLayout"
import SalesStats from "@/components/admin/SalesStats"
import useSWR from 'swr'
import axios from 'axios'

function Stats() {
  const fetcher = () => axios('/api/orders_completed').then(data => data.data);
  const { data: completedOrders } = useSWR('/api/orders_completed', fetcher, {
    refreshInterval: 3000
  });
  return (
    <AdminLayout page="Admin">
      <h1 className="text-4xl font-black">Panel de Administración</h1>
      <p className="text-2xl my-10">Admnistra las estadísticas de las ordenes vendidas</p>
      <SalesStats
        completedOrders={completedOrders}
      />
    </AdminLayout>
  )
}

export default Stats
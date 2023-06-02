import AdminLayout from "@/layout/AdminLayout"
import SalesStats from "@/components/admin/SalesStats"
import useKiosk from "@/hooks/useKiosk"
import { useEffect } from "react"
import Spinner from "@/components/Spinner"

function Stats() {

  const { completedOrders, getCompletedOrders, loadings: { isLoadingCompletedOrders } } = useKiosk();

  useEffect(() => {
    if (completedOrders.length === 0) {
      getCompletedOrders();
    }
  }, [])
  return (
    <AdminLayout page="Admin">
      <h1 className="text-4xl font-black">Panel de Administración</h1>
      <p className="text-2xl my-10">Admnistra las estadísticas de las ordenes vendidas</p>
      {
        isLoadingCompletedOrders
          ?
          <Spinner />
          :
          <SalesStats
            completedOrders={completedOrders}
          />
      }

    </AdminLayout>
  )
}

export default Stats
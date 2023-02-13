import { formatMoney } from "@/helpers";


function SalesStats({completedOrders}) {
  
  const calculateTotalSold = () => {
    const total = completedOrders?.reduce((total, order) => (order.total + total), 0);
    return total;
  }
  return (
    <div className="border p-10 space-y-5">
        <p className="font-bold text-xl text-gray-700">Ordenes Vendidas: 
        <span className="text-black"> {completedOrders?.length}</span>
        </p>
        <p className="text-2xl font-bold text-amber-500">
          Total Vendido: {formatMoney(calculateTotalSold())}
          </p>
    </div>
  )
}

export default SalesStats
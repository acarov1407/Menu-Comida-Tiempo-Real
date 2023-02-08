import Layout from "@/layout/Layout"
import useKiosk from "@/hooks/useKiosk"
import ProductSummary from "@/components/ProductSummary";

function Summary() {

  const {order} = useKiosk();
  const isOrderEmpty = order.length === 0;

  return (
    <Layout page="Resumen">
        <h1 className="text-4xl font-black">Resumen</h1>
        <p className="text-2xl my-10">Revisa tu Pedido</p>
        {
         isOrderEmpty ? 
         (
          <p className="text-center text-2xl">No hay elementos en tu pedido</p>
         )
         :
         (
          order.map(product => (
            <ProductSummary
            key={product.id}
            product={product}
            />
          ))
         )
        }
    </Layout>
  )
}

export default Summary
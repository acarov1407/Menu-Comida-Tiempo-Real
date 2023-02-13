import Layout from "@/layout/Layout"
import Product from "@/components/Product";
import Spinner from "@/components/Spinner";
import useKiosk from "@/hooks/useKiosk"

export default function Home() {
  const { currentCategory, isLoadingCurrentCategory } = useKiosk();

  return (
    isLoadingCurrentCategory
      ?
      (
        <Spinner />
      )
      :
      (
        <Layout page={`Menú ${currentCategory?.name}`}>
          <h1 className="text-4xl font-black">{currentCategory?.name}</h1>
          <p className="text-2xl my-10">
            Elige y personaliza tu pedido a continuación:
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {

              currentCategory?.products?.map(_product => (
                <Product key={_product.id} product={_product} />
              ))

            }
          </div>

        </Layout>
      )


  )
}


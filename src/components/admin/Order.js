import { formatMoney } from "@/helpers";
import Image from "next/image";

function Order({_order}) {
    const { id, orderedBy, state, total, order } = _order;
  return (
    <div className="border p-10 space-y-5">
            <h3 className="text-2xl font-bold text-gray-600">Orden: {id}</h3>
            <p className="text-lg font-bold text-gray-600">Cliente: {orderedBy}</p>

            <div>
                {
                    order.map(product => (
                        <div
                            key={product.id}
                            className="py-3 flex border-b last-of-type:border-0 items-center"
                        >
                            <div className="w-32">
                                <Image
                                    width={300}
                                    height={400}
                                    src={`/assets/img/${product.image}.jpg`}
                                    alt={`Image ${product.name}`}
                                />
                            </div>

                            <div className="p-5 space-y-2">
                                <h4 className="text-xl font-bold text-amber-400">{product.name}</h4>
                                <p className="text-lg font-bold text-gray-600">Cantidad: {product.amount}</p>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-2xl text-amber-500">Total Pagado: {formatMoney(total)}</p>
            </div>
        </div>
  )
}

export default Order
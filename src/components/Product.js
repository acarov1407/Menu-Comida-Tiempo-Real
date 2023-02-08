import Image from "next/image"
import { formatMoney } from "@/helpers";
import useKiosk from "@/hooks/useKiosk";

function Product({ product }) {
    const {handleChangeModal, handleClickProduct} = useKiosk();
    const { name, price, image } = product;
    return (
        <div className="border p-3 max-w-sm mx-auto md:m-0">
            <Image
                className="w-full"
                height={200}
                width={300}
                src={`/assets/img/${image}.jpg`}
                alt={`Food Image ${name}`} />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatMoney(price)}
                </p>

                <button
                className="bg-indigo-600 hover:bg-indigo-800 text-white
                w-full mt-5 p-3 uppercase font-bold"
                onClick={() =>{
                    handleChangeModal()
                    handleClickProduct(product)
                }}
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default Product
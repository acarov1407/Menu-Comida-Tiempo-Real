import Image from "next/image";
import { formatMoney } from "@/helpers";
import useKiosk from "@/hooks/useKiosk";

function ProductSummary({ product }) {

    const { id, name, image, amount, price } = product;
    const { handleEditProduct, handleDeleteProduct } = useKiosk();
    return (
        <div className="shadow p-5 mb-3 flex gap-10 items-center">
            <div className="md:w-1/6">
                <Image
                    width={300}
                    height={400}
                    src={`/assets/img/${image}.jpg`}
                    alt={`Image Product ${name}`}
                />
            </div>

            <div className="md:w-3/6 xl:4/6">
                <p className="text-3xl font-bold">{name}</p>
                <p className="text-xl font-bold mt-2">Cantidad: {amount}</p>
                <p className="text-xl font-bold mt-2 text-amber-500">Precio: {formatMoney(price)}</p>
                <p className="text-md mt-2 text-gray-700">Subtotal: {formatMoney(price * amount)}</p>
            </div>

            <div className="md:w-2/6 xl:1/6 flex items-end flex-col">
                <button
                    type="button"
                    className="bg-sky-700 flex px-5 py-2 text-white rounded-md
                uppercase font-bold shadow-md hover:bg-sky-900 text-center w-36
                transition-colors duration-300 items-center gap-2 text-sm"
                    onClick={() => {
                        handleEditProduct(id);
                    }}
                >
                    <Image
                        width={24}
                        height={24}
                        src="/assets/icon/edit_icon.svg"
                        alt="edit icon"
                    />
                    Editar
                </button>
                <button
                    type="button"
                    className="bg-red-700 flex px-5 py-2 text-white rounded-md
                uppercase font-bold shadow-md hover:bg-red-900 text-center w-36
                transition-colors duration-300 mt-2 items-center gap-2 text-sm"
                    onClick={() => handleDeleteProduct(id)}
                >
                    <Image
                        width={24}
                        height={24}
                        src="/assets/icon/delete_icon.svg"
                        alt="delete icon"
                    />
                    Eliminar
                </button>
            </div>

        </div>
    )
}

export default ProductSummary
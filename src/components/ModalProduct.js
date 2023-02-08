import Modal from "react-modal"
import useKiosk from "@/hooks/useKiosk";
import Image from "next/image";
import { formatMoney } from "@/helpers";
import { useEffect, useState } from "react";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

Modal.setAppElement("#__next");

function ModalProduct() {

    const {
        handleChangeModal,
        modal,
        product,
        handleAddOrder,
        order
    } = useKiosk();

    const [amount, setAmount] = useState(1);
    const [edition, setEdition] = useState(false);

    useEffect(() => {
        updateAmount();
    }, [product, order]);

    const updateAmount = () => {
        const isInOrder = order.some(_product => _product.id === product.id);
        if (isInOrder) {
            const editionProduct = order.find(_product => _product.id === product.id);
            setEdition(true);
            setAmount(editionProduct.amount);

        } else {
            setEdition(false);
            setAmount(1);
        }
    }

    const handleAddAmount = () => {
        if (amount < 5) {
            setAmount(amount + 1);
        }

    }

    const handleRemoveAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    return (
        <Modal
            isOpen={modal}
            style={customStyles}
        >
            <div className="md:flex gap-10">
                <div className="md:w-1/3">
                    <Image
                        width={300}
                        height={400}
                        src={`/assets/img/${product.image}.jpg`}
                        alt={`Image Product ${product.name}`}
                    />
                </div>
                <div className="md:w-2/3">
                    <div className="flex justify-end">
                        <button
                            onClick={() => handleChangeModal()}
                        >
                            <Image
                                width={30}
                                height={30}
                                src={"/assets/icon/close_icon.svg"}
                                alt="close icon"
                            />
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold mt-5">{product.name}</h1>
                    <p className="mt-5 font-black text-5xl text-amber-500">
                        {formatMoney(product.price)}
                    </p>
                    <div className="mt-6 flex gap-4 items-center">
                        <button
                            type="button"
                            onClick={() => handleRemoveAmount()}
                        >
                            <Image
                                width={30}
                                height={30}
                                src={"assets/icon/minus_icon.svg"}
                                alt="minus icon"
                            />
                        </button>
                        <p className="text-2xl">{amount}</p>
                        <button
                            type="button"
                            onClick={() => handleAddAmount()}
                        >
                            <Image
                                width={30}
                                height={30}
                                src={"assets/icon/plus_icon.svg"}
                                alt="plus icon"
                            />

                        </button>
                    </div>
                    <button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white px-5 py-2 mt-5 
                    uppercase font-bold rounded"
                        onClick={() => {
                            handleAddOrder({ ...product, amount });
                        
                        }}
                    >
                        {edition ? "Guardar Cambios" : "Añadir al pedido"}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalProduct
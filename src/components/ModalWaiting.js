import Modal from "react-modal"
import useKiosk from "@/hooks/useKiosk";
import Spinner from "./Spinner";

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

function ModalWaiting() {
    const { waitingModal} = useKiosk();

    return (
        <Modal
            isOpen={waitingModal}
            style={customStyles}
        >

            <div className="p-16 mx-auto">
                <p className="text-center text-xl font-bold">Realizando Pedido...</p>
                <Spinner />
            </div>
        </Modal>
    )
}

export default ModalWaiting
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const KioskContext = createContext();

function KioskProvider({ children }) {

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});
    const [isLoadingCurrentCategory, setIsLoadingCurrentCategory] = useState(true);

    const [product, setProduct] = useState({});
    const [modal, setModal] = useState(false);
    const [waitingModal, setWaitingModal] = useState(false);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);

    const [clientName, setClientName] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (currentCategory) setIsLoadingCurrentCategory(false);
        else setIsLoadingCurrentCategory(true);

    }, [currentCategory]);

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios("api/categories");
            setCategories(data);
        }
        
        getCategories();
    }, []);

    useEffect(() => {
        setCurrentCategory(categories[0]);
    }, [categories])

    useEffect(() => {
        calculateTotal();
    }, [order])

    const handleClickCategory = (id) => {
        router.push("/");
        const category = categories.filter(_category => _category.id === id);
        setCurrentCategory(category[0]);
    }

    const handleClickProduct = (product) => {
        setProduct(product);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }


    const handleAddOrder = ({ categoryId, ...product }) => {
        const isInOrder = order.some(_product => _product.id === product.id);
        if (isInOrder) {
            const updatedOrder = order.map(_product => _product.id === product.id ? product : _product);
            setOrder(updatedOrder);
            toast.success('Guardado Correctamente')
        } else {
            setOrder([...order, product]);
            toast.success('Agregado al pedido')
        }

        setModal(false);

    }

    const handleEditProduct = (id) => {
        setModal(!modal);
        const updatedProduct = order.filter(_product => _product.id === id);
        setProduct(updatedProduct[0]);

    }

    const handleDeleteProduct = (id) => {
        const updatedOrder = order.filter(_product => _product.id !== id);
        setOrder(updatedOrder);
        toast.success('Eliminado Correctamente');
    }

    const calculateTotal = () => {
        const updatedTotal = order.reduce((_total, _product) => (_product.price * _product.amount) + _total, 0);
        setTotal(updatedTotal);
    }

    const resetApp = () => {
        setCurrentCategory(categories[0]);
        setOrder([]);
        setClientName('');
        setTotal(0);

        toast.success('Pedido Realizado Correctamente');

        setTimeout(() => {
            router.push("/");
        }, 2500)

    }

    const saveOrderInDB = async () => {
        try {
            setWaitingModal(true);
            await axios.post('/api/orders',
                {
                    orderedBy: clientName,
                    date: Date.now().toString(),
                    total,
                    order
                });

            resetApp();
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingModal(false);
        }
    }




    return (
        <KioskContext.Provider
            value={{
                categories,
                currentCategory,
                isLoadingCurrentCategory,
                handleClickCategory,
                product,
                handleClickProduct,
                modal,
                handleChangeModal,
                waitingModal,
                handleAddOrder,
                order,
                handleEditProduct,
                handleDeleteProduct,
                clientName,
                setClientName,
                saveOrderInDB,
                total,
            }}
        >
            {children}
        </KioskContext.Provider>
    )
}

export {
    KioskProvider
}

export default KioskContext
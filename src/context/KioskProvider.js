import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const KioskContext = createContext();


function KioskProvider({ children }) {

    const [modal, setModal] = useState(false);
    const [waitingModal, setWaitingModal] = useState(false);

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});

    const [isLoadingCurrentCategory, setIsLoadingCurrentCategory] = useState(true);
    const [loadings, setLoadings] = useState({
        isCreatingOrder: false,
        isCompletingOrder: false,
        isLoadingOrders: false,
        isLoadingCompletedOrders: true
    })

    const [product, setProduct] = useState({});

    const [order, setOrder] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const [total, setTotal] = useState(0);
    const [clientName, setClientName] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (currentCategory) setIsLoadingCurrentCategory(false);
        else setIsLoadingCurrentCategory(true);

    }, [currentCategory]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios("api/categories");
                setCategories(data);
            } catch (error) {
                console.log(error)
            }

        }

        if (!router.pathname.includes('/admin')) {
            getCategories();
        }

    }, []);

    useEffect(() => {
        if (!router.pathname.includes('/admin')) {
            setCurrentCategory(categories[0]);
        }
    }, [categories])

    useEffect(() => {
        const calculateTotal = () => {
            const updatedTotal = order.reduce((_total, _product) => (_product.price * _product.amount) + _total, 0);
            setTotal(updatedTotal);
        }
        calculateTotal();

    }, [order])

    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleClickCategory = (id) => {
        router.push("/");
        const category = categories.filter(_category => _category.id === id);
        setCurrentCategory(category[0]);
    }

    // ############################### PRODUCT ###############################

    const handleClickProduct = (product) => {
        setProduct(product);
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

    // ############################### ORDER ###############################

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

    const saveOrderInDB = async () => {
        setLoadings({ ...loadings, isCreatingOrder: true });
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
            setLoadings({ ...loadings, isCreatingOrder: false });
        }
    }

    const completeOrder = async (id) => {
        setLoadings({ ...loadings, isCompletingOrder: true });
        try {
            await axios.post(`/api/orders/${id}`);

            //update state
            const updatedPendingOrders = pendingOrders?.filter(_order => _order.id !== id);
            setPendingOrders(updatedPendingOrders);
            toast.success('Orden Lista');
        } catch (error) {

            toast.error('Hubo un error');
        } finally {
            setLoadings({ ...loadings, isCompletingOrder: false });
        }
    }

    const getCompletedOrders = async () => {
        setLoadings({ ...loadings, isLoadingCompletedOrders: true });
        try {
            const { data } = await axios('/api/orders_completed');
            setCompletedOrders(data);
        } catch (error) {
            toast.error('Ha ocurrido un error al intentar obtener las ordenes');
        } finally {
            setLoadings({ ...loadings, isLoadingCompletedOrders: false });
        }
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



    return (
        <KioskContext.Provider
            value={{
                loadings,
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
                completedOrders,
                getCompletedOrders,
                completeOrder,
                pendingOrders,
                setPendingOrders
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
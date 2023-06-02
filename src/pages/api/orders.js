import prisma from "./_base";


export default async function handler(req, res) {
    const handlerInfo = {
        req,
        res,
        prisma
    }

    if (req.method === 'POST') {
        return insertOrder(handlerInfo);
    } else if (req.method === 'GET') {
        return getOrders(handlerInfo)
    }
}

async function insertOrder(handlerInfo) {
    const { req, res, prisma } = handlerInfo;

    const { orderedBy, date, total, order } = req.body;

    try {
        const orderCreated = await prisma.order.create({
            data: {
                orderedBy,
                date,
                total,
                order
            }
        })
        return res.status(200).json(orderCreated);
    } catch (error) {
        return res.status(400).json({ msg: 'Ha ocurrido un error al intentar agregar la orden' });
    }


}

async function getOrders(handlerInfo) {
    const { res, prisma } = handlerInfo;

    try {
        const orders = await prisma.order.findMany({
            where: {
                state: false
            }
        });

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).json({ msg: 'Ha ocurrido un error al intentar obtener las ordenes' });
    }

}
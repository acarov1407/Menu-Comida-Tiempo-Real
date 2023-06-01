import { PrismaClient } from "@prisma/client"


export default async function handler(req, res) {
    const prisma = new PrismaClient();
    const handlerInfo = {
        req,
        res,
        prisma
    }

    if (req.method === 'POST') {
        return insertOrder(handlerInfo);
    } else if(req.method === 'GET'){
        return getOrders(handlerInfo)
    }
}

async function insertOrder(handlerInfo) {
    const { req, res, prisma } = handlerInfo;

    const { orderedBy, date, total, order } = req.body;
    const orderCreated = await prisma.order.create({
        data: {
            orderedBy,
            date,
            total,
            order
        }
    })
    return res.json(orderCreated);

}

async function getOrders(handlerInfo){
    const {res, prisma } = handlerInfo;

    const orders = await prisma.order.findMany({
        where: {
            state : false
        }
    });

    console.log(orders)

    return res.status(200).json(orders);
}
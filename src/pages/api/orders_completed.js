import prisma from "./_base";

export default async function getCategories(req, res) {

    const completedOrders = await prisma.order.findMany({
        where: {
            state: true
        }
    })
    return res.status(200).json(completedOrders);
}

import { PrismaClient } from "@prisma/client"

export default async function getCategories(req, res) {
    const prisma = new PrismaClient();
    const completedOrders = await prisma.order.findMany({
        where: {
            state: true
        }
    })
    res.status(200).json(completedOrders);
}

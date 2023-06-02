import prisma from "./_base";

export default async function getCategories(req, res) {

    try {
        const completedOrders = await prisma.order.findMany({
            where: {
                state: true
            }
        });

        return res.status(200).json(completedOrders);
    } catch (error) {
        return res.status(400).json({ msg: 'Ha ocurrido un error al obtener las categorias' });
    }


}

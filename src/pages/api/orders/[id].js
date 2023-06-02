import prisma from "../_base";

export default async function handler(req, res){
    if(req.method === 'POST'){
        const {id} = req.query;
        const updatedOrder = await prisma.order.update({
            where : {
                id: parseInt(id)
            },
            data: {
                state: true
            }
        })

        return res.status(200).json(updatedOrder);
    }
}
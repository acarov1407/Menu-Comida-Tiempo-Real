import { PrismaClient } from "@prisma/client"

export default async function getCategories(req, res) {
    const prisma = new PrismaClient();

    try {
        const categories = await prisma.category.findMany({
            include: {
                products: true
            }
        });
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json({ error })
    }

}


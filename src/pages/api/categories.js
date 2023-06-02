import prisma from "./_base";

export const config = {
    api: {
        externalResolver: true
    }
}

export default async function getCategories(req, res) {
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


const { categories } = require("./data/categories")
const { products } = require("./data/products")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

const main = async () => {
    try {
        await prisma.category.createMany({
            data: categories
        })

        await prisma.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}

main();
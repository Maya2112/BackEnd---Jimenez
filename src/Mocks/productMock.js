import { faker } from "@faker-js/faker";

export const productMock = (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push({
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.alphanumeric(3),
            price: faker.commerce.price({ min: 5, max: 100 }),
            status: true,
            stock: faker.number.int({ min: 1, max: 1000 }),
            category: faker.commerce.productAdjective(),
            thumbnails: [faker.image.url()],
        });
    }
    res.json(products);
}
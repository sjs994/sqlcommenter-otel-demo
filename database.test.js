const db = require("./database");

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

afterAll(async () => {
    await db.sequelize.close();
});

test("create book", async () => {
    expect.assertions(1);
    const book1 = await db.Book.create({
        id: 1,
        name: "testbook1",
        authorName: "testAuthor1",
        count: 100
    });
    const book2 = await db.Book.create({
        id: 2,
        name: "testbook2",
        authorName: "testAuthor2",
        count: 200
    });
    expect(book1.id).toEqual(1);
});
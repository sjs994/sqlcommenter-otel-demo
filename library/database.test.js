const db = require("./database");

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

afterAll(async () => {
    await db.sequelize.close();
});

test("create book", async () => {
    expect.assertions(1);
    const book = await db.Book.create({
        id: 1,
        name: "testbook1",
        authorName: "testAuthor1"
    });
    expect(book.id).toEqual(1);
});
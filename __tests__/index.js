
const supertest = require("supertest")
const server = require("../index")
const db = require("../data/config")

beforeEach(async () => {
    await db.seed.run()
})

afterAll( async () => {
    await db.destroy()
})

const user = {
    name: 'test1234',
    password: 'test'
}


describe("Auth integration tests", () => {

    it("Creates a new account", async () => {
        const data = { name: "CDuenas", password: "abc123" }
        const res = await supertest(server).post("/auth/register").send(data)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
    })

    it("Logs in", async () => {
        await supertest(server).post("/auth/register").send(user)
        const res = await supertest(server).post("/auth/login").send(user)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
    })

    it("Logs out", async () => {
        await supertest(server).post("/auth/register").send(user)
        await supertest(server).post("/auth/login").send(user)
            .then(async user => {
                const res = await supertest(server).get("/auth/logout").set('token', user.body.token)

                expect(res.statusCode).toBe(200)
                expect(res.type).toBe("application/json")
            })
        
    })
})
const request = require("supertest")
const app = require("../app")
const User = require("./user-model")

const ADMIN = {
	email: "admin@gmail.com",
	password: "admin",
	cpf: "12345678910",
	isAdmin: true
}

const USER = {
	email: "user@gmail.com",
	password: "user",
	cpf: "12345678911"
}

describe("/users", () => {
	afterEach(async () => {
		await User.collection.drop()
	})
	describe("/register", () => {
		it("should add a ADMIN to the database", async () => {
			const response = await request(app)
				.post("/users/register")
				.send(ADMIN)

			const userDb = await User.findOne({ cpf: ADMIN.cpf })

			expect(response.status).toBe(200)
			expect(userDb.cpf).toBe(ADMIN.cpf)
			expect(userDb.isAdmin).toBe(true)
		})
		it("should add a common USER to the database", async () => {
			const response = await request(app)
				.post("/users/register")
				.send(USER)

			const userDb = await User.findOne({ cpf: USER.cpf })

			expect(response.status).toBe(200)
			expect(userDb.cpf).toBe(USER.cpf)
			expect(userDb.isAdmin).toBe(false)
		})
		it("should NOT register a existing EMAIL", async () => {
			await request(app)
				.post("/users/register")
				.send(USER)
			const response = await request(app)
				.post("/users/register")
				.send(USER)

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Esse email já foi cadastrado")
		})
		it("should NOT register a existing CPF", async () => {
			await request(app)
				.post("/users/register")
				.send(USER)
			const response = await request(app)
				.post("/users/register")
				.send({ ...USER, email: "newUser@gmail.com" })

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Esse cpf já foi cadastrado")
		})
	})
	describe("/auth", () => {
		beforeEach(async () => {
			await request(app)
				.post("/users/register")
				.send(USER)
		})
		it("should authenticate a valid User", async () => {
			const response = await request(app)
				.post("/users/auth")
				.send({ email: USER.email, password: USER.password })

			expect(response.status).toBe(200)
			expect(response.body.email).toBe(USER.email)
			expect(response.body.cpf).toBe(USER.cpf)
		})
		it("should NOT authenticate a User with a wrong password", async () => {
			const response = await request(app)
				.post("/users/auth")
				.send({ email: USER.email, password: "12345678" })

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Email ou senha incorreta")
		})
		it("should NOT authenticate a non existent email", async () => {
			const response = await request(app)
				.post("/users/auth")
				.send({ email: "non-existent@gmail.com", password: USER.password })

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Email ou senha incorreta")
		})
	})
})

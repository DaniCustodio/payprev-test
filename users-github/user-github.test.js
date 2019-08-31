const request = require("supertest")
const app = require("../app")
const UserGithub = require("./user-github-model")
const userGithubService = require("./user-github-service")

const GITHUBUSERS = [
	{
		login: "DaniCustodio",
		name: "Danielle Custodio",
		bio: "Estudante de Análise e Desenvolvimento de Sistemas",
		location: "Rio de Janeiro, Brasil",
		html_url: "https://github.com/DaniCustodio"
	},
	{
		login: "oliver",
		name: "Oliver Gerlich",
		bio: null,
		location: null,
		html_url: "https://github.com/oliver"
	},
	{
		login: "RicardoOliveira",
		name: "Ricardo",
		bio: "Developer and IoT enthusiast.",
		location: "Portugal",
		html_url: "https://github.com/RicardoOliveira"
	}
]

const ADMIN = {
	email: "admin@gmail.com",
	password: "admin",
	cpf: "12345678910",
	isAdmin: true
}

const authUser = async () => {
	await request(app)
		.post("/users/register")
		.send(ADMIN)
	const response = await request(app)
		.post("/users/auth")
		.send({
			email: ADMIN.email,
			password: ADMIN.password
		})
	token = response.body.token
}

let token

describe("/github", () => {
	describe("/", () => {
		it("should return a list of github users in the database", async () => {
			if (!token) await authUser()

			await userGithubService.create(GITHUBUSERS[0])
			await userGithubService.create(GITHUBUSERS[1])
			await userGithubService.create(GITHUBUSERS[2])

			const response = await request(app)
				.get("/github")
				.set("Authorization", `Bearer ${token}`)

			expect(response.status).toBe(200)
			expect(response.body.length).toBe(3)

			await UserGithub.collection.drop()
		})
	})

	describe("/search", () => {
		it("should search for a github user given his login", async () => {
			await authUser()
			const response = await request(app)
				.get("/github/search?login=danicustodio")
				.set("Authorization", `Bearer ${token}`)
			// expect(response.status).toBe(200)
			expect(response.body).toEqual(GITHUBUSERS[0])
		})
	})

	describe("/add", () => {
		afterEach(async () => {
			await UserGithub.collection.drop()
		})
		it("should add a github user to the database", async () => {
			await authUser()
			const response = await request(app)
				.post("/github/add")
				.set("Authorization", `Bearer ${token}`)
				.send(GITHUBUSERS[0])

			const dbGithub = await UserGithub.findOne({ login: GITHUBUSERS[0].login })

			expect(response.status).toBe(200)
			expect(dbGithub.login).toBe(GITHUBUSERS[0].login)
			expect(dbGithub.html_url).toBe(GITHUBUSERS[0].html_url)
		})
		it("should NOT add a already existent github user to the database", async () => {
			await authUser()
			await userGithubService.create(GITHUBUSERS[0])

			const response = await request(app)
				.post("/github/add")
				.set("Authorization", `Bearer ${token}`)
				.send(GITHUBUSERS[0])

			expect(response.status).toBe(400)
			expect(response.body.message).toBe(
				`O usuário ${GITHUBUSERS[0].login} já foi adcionado ao banco de dados`
			)
		})
	})
})

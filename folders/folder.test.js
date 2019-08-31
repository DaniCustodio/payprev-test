const request = require("supertest")
const app = require("../app")
const Folder = require("./folder-model")
const folderService = require("./folder-service")

const User = require("../users/user-model")
const userService = require("../users/user-service")
const UserGithub = require("../users-github/user-github-model")
const userGithubService = require("../users-github/user-github-service")

const USER = {
	email: "userFolder@gmail.com",
	password: "userFolder",
	cpf: "12345678913"
}

const GITHUBUSER = {
	login: "ulrich",
	name: "Ulrich VACHON",
	bio: "Software developer @docker ",
	location: "Paris",
	html_url: "https://github.com/ulrich"
}

describe("/folders", () => {
	let userDb
	let userGithubDb

	beforeAll(async () => {
		await userService.create(USER)
		await userGithubService.create(GITHUBUSER)

		userDb = await User.findOne({ email: USER.email })
		userGithubDb = await UserGithub.findOne({ login: GITHUBUSER.login })
	})

	afterAll(async () => {
		await UserGithub.collection.drop()
		await User.collection.drop()
	})

	afterEach(async () => {
		await Folder.collection.drop()
	})

	it("should return a list of the user's folders", async () => {
		await folderService.create({ name: "folder1", user: userDb.id })
		await folderService.create({ name: "folder2", user: userDb.id })

		const response = await request(app)
			.post("/folders")
			.send({ idUser: userDb.id })

		expect(response.status).toBe(200)
		expect(response.body.length).toBe(2)
	})

	describe("/create", () => {
		it("should create a folder", async () => {
			const response = await request(app)
				.post("/folders/create")
				.send({ name: "create folder", user: userDb.id })

			const folderDb = await Folder.findOne({
				name: "create folder",
				user: userDb.id
			})

			expect(response.status).toBe(200)
			expect(folderDb.name).toBe("create folder")
		})
		it("should NOT create a folder with a existent name", async () => {
			await folderService.create({ name: "create folder", user: userDb.id })

			const response = await request(app)
				.post("/folders/create")
				.send({ name: "create folder", user: userDb.id })

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("A pasta create folder já existe")
		})
	})

	describe("/update", () => {
		it("should update folder name", async () => {
			await folderService.create({ name: "folder", user: userDb.id })

			const folderDb = await Folder.findOne({
				name: "folder",
				user: userDb.id
			})

			const response = await request(app)
				.post("/folders/update")
				.send({ id: folderDb.id, folder: { name: "new folder" } })

			const newFolderDb = await Folder.findById(folderDb.id)

			expect(response.status).toBe(200)
			expect(newFolderDb.name).toBe("new folder")
		})
		xit("should NOT update a non existent folder", async () => {
			Folder.createCollection()
			const response = await request(app)
				.post("/folders/update")
				.send({ id: "5d6941976c6dd23300d3dani", folder: { name: "folder1" } })

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Esta pasta não existe")
		})

		it("should NOT update a folder with a existent name", async () => {
			await folderService.create({ name: "folder1", user: userDb.id })

			await folderService.create({ name: "folder", user: userDb.id })

			const folderDb = await Folder.findOne({
				name: "folder",
				user: userDb.id
			})

			const response = await request(app)
				.post("/folders/update")
				.send({ id: folderDb.id, folder: { name: "folder1" } })

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("A pasta folder1 já existe")
		})
	})

	describe("/addItem", () => {
		it("should add a github user to the folder", async () => {
			await folderService.create({ name: "folder", user: userDb.id })

			const folderDb = await Folder.findOne({
				name: "folder",
				user: userDb.id
			})

			const response = await request(app)
				.post("/folders/additem")
				.send({ idFolder: folderDb.id, idUserGithub: userGithubDb.id })

			const newFolderDb = await Folder.findById(folderDb.id)

			expect(response.status).toBe(200)
			expect(folderDb.items.length).toBe(0)
			expect(newFolderDb.items.length).toBe(1)
		})

		it("should NOT add a github user to a non existent folder", async () => {
			Folder.createCollection()
			const response = await request(app)
				.post("/folders/additem")
				.send({
					idFolder: "5d6941976c6dd23300d3ac44",
					idUserGithub: userGithubDb.id
				})

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Esta pasta não existe")
		})

		it("should NOT add the same github user to a folder twice", async () => {
			await folderService.create({ name: "folder", user: userDb.id })

			const folderDb = await Folder.findOne({
				name: "folder",
				user: userDb.id
			})

			await folderService.addItem(folderDb.id, userGithubDb.id)

			const response = await request(app)
				.post("/folders/additem")
				.send({
					idFolder: folderDb.id,
					idUserGithub: userGithubDb.id
				})

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Este usuário já esta na pasta")
		})
	})

	describe("/removeItem", () => {
		it("should remove a github user from the folder", async () => {
			await folderService.create({ name: "folder", user: userDb.id })

			const folderDb = await Folder.findOne({
				name: "folder",
				user: userDb.id
			})

			await folderService.addItem(folderDb.id, userGithubDb.id)

			const folderDb1 = await Folder.findById(folderDb.id)

			const response = await request(app)
				.post("/folders/removeitem")
				.send({ idFolder: folderDb.id, idUserGithub: userGithubDb.id })

			const folderDb0 = await Folder.findById(folderDb.id)

			expect(response.status).toBe(200)
			expect(folderDb1.items.length).toBe(1)
			expect(folderDb0.items.length).toBe(0)
		})
	})
})

const app = Sammy("#main", function () {
	this.use("Handlebars", "hbs");

	// Home
	this.get("#/home", function (context) {
		context.partial("../views/home.hbs");
	});

	this.get("#/recipes", function (context) {
		const recipes = [
			{
				id: 1,
				name: "Spaghetti",
				imageURL: "../images/pasta.png",
				ingredients: [
					"test1",
					"test2",
					"test3",
					"test4",
					"test5",
					"test6",
				],
				details:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			},
			{
				id: 2,
				name: "Spaghetti",
				imageURL: "../images/pasta.png",
				ingredients: [
					"test1",
					"test2",
					"test3",
					"test4",
					"test5",
					"test6",
				],
				details:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			},
			{
				id: 3,
				name: "Spaghetti",
				imageURL: "../images/pasta.png",
				ingredients: [
					"test1",
					"test2",
					"test3",
					"test4",
					"test5",
					"test6",
				],
				details:
					"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			},
		];
		context.recipes = recipes;

		context.partial("../views/recipes.hbs");
	});

	this.get("#/login", function (context) {
		context.partial("../views/login.hbs");
	});
	// User
	this.get("#/register", function (context) {
		context.partial("../views/registration.hbs");
	});

	// this.post("#/register", userController.postRegister);
	// this.post("#/login", userController.postLogin);
});

(() => {
	app.run("#/home");
})();

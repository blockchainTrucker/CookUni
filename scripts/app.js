const app = Sammy("#main", function () {
	this.use("Handlebars", "hbs");

	// Home
	this.get("#/home", function (context) {
		context
			.loadPartials({
				header: "../views/header.hbs",
				footer: "../views/footer.hbs",
			})
			.then(function () {
				this.partial("../views/home.hbs");
			});
	});

	this.get("#/recipes", function (context) {
		const recipes = [
			{
				id: "-MmFhxK7MGD9dlghOtzK",
				description: "lots of words",
				imageURL: "../images/pasta.png",
				ingredients: ["test1", "test2", "test3", "test4"],
				name: "Spaghetti",
			},
		];
		context.recipes = recipes;

		context
			.loadPartials({
				header: "../views/header.hbs",
				footer: "../views/footer.hbs",
			})
			.then(function () {
				this.partial("../views/recipes.hbs");
			});
	});

	this.get("#/details/:id", function (context) {
		const recipe = {
			id: "-MmFhxK7MGD9dlghOtzK",
			description: "lots of words",
			imageURL: "../images/pasta.png",
			ingredients: ["test1", "test2", "test3", "test4"],
			name: "Spaghetti",
		};
		context.name = recipe.name;
		context.description = recipe.description;
		context.imageURL = recipe.imageURL;
		context.ingredients = recipe.ingredients;
		context
			.loadPartials({
				header: "../views/header.hbs",
				footer: "../views/footer.hbs",
			})
			.then(function () {
				this.partial("../views/details.hbs");
			});
	});

	this.get("#/profile", function (context) {
		const recipes = [
			{
				id: "-MmFhxK7MGD9dlghOtzK",
				description: "lots of words",
				imageURL: "../images/pasta.png",
				ingredients: ["test1", "test2", "test3", "test4"],
				name: "Spaghetti",
			},
		];

		context.recipes = recipes;

		const user = {
			firstName: "John",
			lastName: "Doe",
			email: "john@example.com",
		};

		context.firstName = user.firstName;
		context.lastName = user.lastName;
		context.email = user.email;

		context
			.loadPartials({
				header: "../views/header.hbs",
				footer: "../views/footer.hbs",
			})
			.then(function () {
				this.partial("../views/profile.hbs");
			});
	});

	this.get("#/login", function (context) {
		context
			.loadPartials({
				header: "../views/header.hbs",
				footer: "../views/footer.hbs",
			})
			.then(function () {
				this.partial("../views/login.hbs");
			});
	});
	// User
	this.get("#/register", function (context) {
		context
			.loadPartials({
				header: "../views/header.hbs",
				footer: "../views/footer.hbs",
			})
			.then(function () {
				this.partial("../views/registration.hbs");
			});
	});

	this.post("#/register", function () {
		// console.log(this.params);
		let data = {
			firstName: this.params.regFirst,
			lastName: this.params.regLast,
			username: this.params.regUser,
			password: this.params.regPass,
		};
		let url = "https://cookuni96-default-rtdb.firebaseio.com/users.json";
		let headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};
		fetch(url, headers)
			.then(function (response) {
				if (response.status == 200) {
					window.location.hash = "#/profile";
				} else {
					console.log(response.status);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	});

	this.get("#/create", function (context) {
		context
			.loadPartials({
				header: "../views/header.hbs",
				footer: "../views/footer.hbs",
			})
			.then(function () {
				this.partial("../views/create.hbs");
			});
	});

	this.post("#/create", function (context) {
		let data = {
			name: this.params.name,
			imageURL: this.params.imageURL,
			description: this.params.description,
			ingredients: this.params.ingredients,
		};
		let url = "https://cookuni96-default-rtdb.firebaseio.com/recipes.json";
		let headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};
		fetch(url, headers)
			.then(function (response) {
				if (response.status == 200) {
					window.location.hash = "#/profile";
				} else {
					console.log(response.status);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	});
});

(() => {
	app.run("#/home");
})();

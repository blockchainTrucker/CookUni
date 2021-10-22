const app = Sammy("#main", function () {
	this.use("Handlebars", "hbs");

	let user = "";

	this.get("#/home", function (context) {
		if (user.length != 0) {
			context.loggedIn = true;
		} else {
			context.loggedIn = false;
		}
		context.user = user;

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
		fetch("https://cookuni96-default-rtdb.firebaseio.com/recipes.json")
			.then(function (response) {
				console.log(response);
				return response.json();
			})
			.then(function (data) {
				console.log(data);

				let recipesArray = Object.entries(data);

				recipesArray = recipesArray.map(function (innerArray) {
					let [recipesID, recipesObject] = innerArray;
					recipesObject.id = recipesID;
					return recipesObject;
				});
				context.recipes = recipesArray;
				if (user.length != 0) {
					context.loggedIn = true;
				} else {
					context.loggedIn = false;
				}
				context.user = user;

				context
					.loadPartials({
						header: "../views/header.hbs",
						footer: "../views/footer.hbs",
					})
					.then(function () {
						this.partial(
							"../views/recipes.hbs",
							function (details) {
								console.log("went home!");
							}
						);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	});

	this.get("#/details/:id", function (context) {
		let recipeID = this.params.id;
		fetch(
			`https://cookuni96-default-rtdb.firebaseio.com/recipes/${recipeID}.json`
		)
			.then(function (response) {
				console.log(response);
				return response.json();
			})
			.then(function (data) {
				console.log(data);

				let recipe = data;
				context.recipe = recipe;

				if (user.length != 0) {
					context.loggedIn = true;
				} else {
					context.loggedIn = false;
				}
				context.user = user;

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
			})
			.catch((err) => {
				console.log(err);
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

		context.firstName = user.firstName;
		context.lastName = user.lastName;
		context.email = user.email;

		if (user.length != 0) {
			context.loggedIn = true;
		} else {
			context.loggedIn = false;
		}
		context.user = user;

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
		if (user.length != 0) {
			context.loggedIn = true;
		} else {
			context.loggedIn = false;
		}
		context.user = user;

		context
			.loadPartials({
				header: "../views/header.hbs",
				footer: "../views/footer.hbs",
			})
			.then(function () {
				this.partial("../views/login.hbs");
			});
	});

	this.get("#/register", function (context) {
		if (user.length != 0) {
			context.loggedIn = true;
		} else {
			context.loggedIn = false;
		}
		context.user = user;

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
		if (user.length != 0) {
			context.loggedIn = true;
		} else {
			context.loggedIn = false;
		}
		context.user = user;

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

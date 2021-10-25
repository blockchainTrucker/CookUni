const app = Sammy("#main", function () {
	this.use("Handlebars", "hbs");

	let user = {
		firstName: "",
		lastName: "",
		username: "",
	};
	let login = false;

	this.get("#/home", function (context) {
		if (user.firstName != "") {
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
				if (user.firstName != "") {
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
						this.partial("../views/recipes.hbs");
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

				if (user.firstName != "") {
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
		if (user.firstName == "") {
			context.redirect("#/login");
		} else {
			context.loggedIn = login;
			fetch("https://cookuni96-default-rtdb.firebaseio.com/recipes.json")
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					let recipesArray = Object.entries(data);
					recipesArray = recipesArray
						.map(function (innerArray) {
							let [recipeID, recipeObject] = innerArray;
							recipeObject.id = recipeID;
							return recipeObject;
						})
						.filter(function (recipe) {
							return user.username == recipe.user;
						});
					console.log(recipesArray);
					context.recipes = recipesArray;
				});
			context.firstName = user.firstName;
			context.lastName = user.lastName;
			context.username = user.username;
			if (user.firstName != "") {
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
		}
	});

	this.get("#/login", function (context) {
		if (user.firstName != "") {
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

	this.post("#/login", function (context) {
		let username = this.params.username;
		let password = this.params.password;

		fetch("https://cookuni96-default-rtdb.firebaseio.com/users/.json")
			.then((response) => {
				return response.json();
			})
			.then((users) => {
				let userArray = Object.entries(users);
				let hasUser = userArray.find((user) => {
					let [userID, userObj] = user;
					return userObj.username == username;
				});
				console.log(hasUser);
				if (hasUser != undefined) {
					if (hasUser[1].password == password) {
						console.log(hasUser[1]);
						user = hasUser[1];
						login = true;
						context.redirect("#/profile");
					} else {
						// document
						// 	.getElementById("password")
						// 	.classList.add("is-invalid");
					}
				} else {
					//send error to the front end
					// document
					// 	.getElementById("username")
					// 	.classList.add("is-invalid");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	this.get("#/register", function (context) {
		if (user.firstName != "") {
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

	this.post("#/register", function (context) {
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
					console.log(`${data.firstName} is registered!`);
					user.firstName = data.firstName;
					user.lastName = data.lastName;
					user.username = data.username;
					login = true;
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
		if (user.firstName == "") {
			context.redirect("#/login");
		} else {
			if (user.firstName != "") {
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
		}
	});

	this.post("#/create", function (context) {
		let data = {
			name: this.params.name,
			imageURL: this.params.imageURL,
			description: this.params.description,
			ingredients: this.params.ingredients,
			user: this.params.user,
		};
		let url = "https://cookuni96-default-rtdb.firebaseio.com/recipes.json";
		let headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};
		if (
			data.name !== "" &&
			data.imageURL !== "" &&
			data.description !== "" &&
			data.ingredients !== ""
		) {
			fetch(url, headers)
				.then(function (response) {
					if (response.status == 200) {
						window.location.hash = "#/profile";
						console.log(`${data.name} recipe created!`);
					} else {
						console.log(response.status);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.error("Form Incomplete");
		}
	});

	this.get("#/logout", function (context) {
		user = {
			firstName: "",
			lastName: "",
			username: "",
		};
		context.redirect("#/home");
	});
});

(() => {
	app.run("#/home");
})();

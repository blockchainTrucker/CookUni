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
				return response.json();
			})
			.then(function (data) {
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
				console.error(err);
			});
	});

	this.get("#/details/:id", function (context) {
		let recipeID = this.params.id;
		fetch(
			`https://cookuni96-default-rtdb.firebaseio.com/recipes/${recipeID}.json`
		)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
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
				console.error(err);
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
					context.recipes = recipesArray;
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
				if (hasUser != undefined) {
					if (hasUser[1].password == password) {
						user = hasUser[1];
						login = true;
						context.redirect("#/profile");
						let message = document.getElementById("alertMessage");
						message.innerHTML = `Welcome back, ${hasUser[1].firstName}!`;
						let alert = document.getElementById("alert");
						alert.style.display = "block";
					} else {
						let error = document.getElementById("loginError");
						error.style.display = "block";
					}
				} else {
					let error = document.getElementById("loginError");
					error.style.display = "block";
				}
			})
			.catch((err) => {
				console.error(err);
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
		let userRegex = new RegExp(/[A-z]{1}[A-z0-9_]{2,24}/);
		let nameRegex = new RegExp(/[a-zA-Z]{2,24}/);
		let passRegex = new RegExp(/[\S+]{6,24}/);
		let firstName = document.getElementById("regFirst");
		let lastName = document.getElementById("regLast");
		let user = document.getElementById("regUser");
		let pass = document.getElementById("regPass");
		let passRep = document.getElementById("regPassRep");
		let firstGood = false;
		let lastGood = false;
		let userGood = false;
		let passGood = false;
		let passRepGood = false;

		if (nameRegex.test(firstName.value) == false) {
			let fnError = document.getElementById("fnError");
			fnError.style.display = "block";
		} else {
			let fnError = document.getElementById("fnError");
			fnError.style.display = "none";
			firstGood = true;
		}

		if (nameRegex.test(lastName.value) == false) {
			let lnError = document.getElementById("lnError");
			lnError.style.display = "block";
		} else {
			let lnError = document.getElementById("lnError");
			lnError.style.display = "none";
			lastGood = true;
		}

		if (userRegex.test(user.value) == false) {
			let usernameError = document.getElementById("usernameError");
			usernameError.style.display = "block";
		} else {
			let usernameError = document.getElementById("usernameError");
			usernameError.style.display = "none";
			userGood = true;
		}

		if (passRegex.test(pass.value) == false) {
			let passError = document.getElementById("passError");
			passError.style.display = "block";
		} else {
			let passError = document.getElementById("passError");
			passError.style.display = "none";
			passGood = true;
		}
		if (passRep.value !== pass.value) {
			let passRep = document.getElementById("passRepError");
			passRep.style.display = "block";
		} else {
			let passRep = document.getElementById("passRepError");
			passRep.style.display = "none";
			passRepGood = true;
		}

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
		if (firstGood && lastGood && userGood && passGood && passRepGood) {
			fetch(url, headers)
				.then(function (response) {
					if (response.status == 200) {
						user.firstName = data.firstName;
						user.lastName = data.lastName;
						user.username = data.username;
						login = true;
						let message = document.getElementById("alertMessage");
						message.innerHTML = `Welcome ${user.firstName}, you are registered!`;
						let alert = document.getElementById("alert");
						alert.style.display = "block";
						window.location.hash = "#/profile";
					} else {
						console.error(response.status);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
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
						let message = document.getElementById("alertMessage");
						message.innerHTML = `Recipe Created!`;
						let alert = document.getElementById("alert");
						alert.style.display = "block";
					} else {
						console.error(response.status);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			console.error("Form Incomplete");
		}
	});

	this.get("#/delete/:id", function (context) {
		let id = this.params.id;
		let url = `https://cookuni96-default-rtdb.firebaseio.com/recipes/${id}.json`;
		let headers = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(url, headers)
			.then(function (response) {
				if (response.status == 200) {
					context.redirect("#/profile");
					let message = document.getElementById("alertMessage");
					message.innerHTML = `Recipe Deleted!`;
					let alert = document.getElementById("alert");
					alert.style.display = "block";
				}
			})
			.catch(function (error) {
				console.error(error);
			});
	});

	this.get("#/logout", function (context) {
		user = {
			firstName: "",
			lastName: "",
			username: "",
		};
		context.redirect("#/home");
		let message = document.getElementById("alertMessage");
		message.innerHTML = `Logged out!`;
		let alert = document.getElementById("alert");
		alert.style.display = "block";
	});
});

(() => {
	app.run("#/home");
})();

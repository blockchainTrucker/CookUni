const app = Sammy("#main", function () {
	this.use("Handlebars", "hbs");

	// Home
	this.get("#/home", function (context) {
		context.partial("../views/home.hbs");
	});

	this.get("#/recipes", function (context) {
		context.partial("../views/recipes.hbs");
	});
	this.get("#/login", function (context) {
		context.partial("../views/login.hbs");
	});
	// User
	this.get("#/register", function (context) {
		context.partial("../views/registration.hbs");
	});
	// this.get("#/login", userController.getLogin);

	// this.post("#/register", userController.postRegister);
	// this.post("#/login", userController.postLogin);
	// this.get("#/logout", userController.logout);
});

(() => {
	app.run("#/home");
})();

const app = Sammy("#main", function () {
	this.use("Handlebars", "hbs");
	console.log("test");
	this.get("#/home", home);

	this.get("#/details/:id", function (context) {});

	this.get("#/login", function (context) {});

	this.post("#/login", function (context) {});

	this.get("#/register", function (context) {});

	this.post("#/register", function (context) {});

	this.get("#/profile", function (context) {});

	this.post("#/delete/:id", function (context) {});

	this.get("#/create", function (context) {});

	this.post("#/create", function (context) {});
});

(() => {
	app.run("#/home");
})();

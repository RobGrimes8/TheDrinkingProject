const { render } = require("ejs");

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    flash = require("connect-flash");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.use(flash());
app.use(require("express-session")({
    secret: "Lotr is the beast of franchises",
    resave: false,
    saveUninitialized: false
}));

const recipeSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image: String,
    catagory: String,
    difficulty: String,
    ingredients: [{ name: String, quantity: String }],
    method: [String]
});
const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose.connect('mongodb+srv://' + process.env.MONGO_LOGIN + '@cluster0-rkzfs.mongodb.net/The_Drinking_Project?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Db connected")

    // const newRecipe = new Recipe({
    //     name: "Gin Fizz",
    //     desc: "Mix a sparkling gin fizz cocktail (or two) for when you're entertaining. With just a handful of ingredients you can create a refreshing drink that evokes summer",
    //     image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/02/gin-fizz.jpg?itok=cZqpr4H4",
    //     catagory: "Gin",
    //     difficulty: "Easy",
    //     ingredients: [{ name: "Gin", quantity: "50ml" }, { name: "Lemon juice", quantity: "25ml" }, { name: "Sugar syrup", quantity: "2 tsp" }, { name: "Ice", quantity: "" }, { name: "Sparkling water", quantity: "" }, { name: "Lemon slice", quantity: "" }],
    //     method: ["Pour the gin, lemon juice and sugar syrup in a cocktail shaker and fill up with ice cubes. Shake well until the outside of the shaker feels cold then strain into a tall glass filled with more ice and top up with sparkling water. Garnish with a lemon slice."]
    // })
    // newRecipe.save(function(err, recipe) {
    //         if (err) return console.log(err);
    //         console.log(recipe);
    //     })
    // Comment.find(function(err, comments) {
    //     if (err) return console.error(err);
    //     console.log(comments);
    // });
    // Comment.find({ name: "Beth" }, function(err, comments) {
    //     if (err) return console.log(err);
    //     console.log(comments);
    // });
});

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/drinks/:drinkCatagory", function(req, res) {
    Recipe.find({ catagory: req.params.drinkCatagory }, function(err, recipes) {
        if (err) return console.log(err);
        res.render("drinkIndex", { drinks: recipes });
    });
});

app.get("/drinks/:drinkCatagory/:drinkID", function(req, res) {
    Recipe.findById(req.params.drinkID, function(err, recipe) {
        if (err) return console.log(err);
        res.render("drink", { drink: recipe })
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("server is running");
});
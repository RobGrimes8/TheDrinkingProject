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
    catagory: [String],
    difficulty: String,
    ingredients: [{ name: String, quantity: String }],
    method: [String],
    deletable: Boolean
});
const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose.connect('mongodb+srv://' + process.env.MONGO_LOGIN + '@cluster0-rkzfs.mongodb.net/The_Drinking_Project?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Db connected")


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

app.get("/drinks/new", function(req, res) {
    res.render("newDrink");
});

app.post("/drinks", function(req, res) {


    let step1 = req.body.newDrinkMethod1;
    let step2 = req.body.newDrinkMethod2;
    let step3 = req.body.newDrinkMethod3;

    let newMethod = [step1, step2, step3];
    let newName = req.body.newDrinkName;
    let newDesc = req.body.newDrinkDescription;
    let newImage = req.body.newDrinkImg;
    let newCatagories = req.body.newDrinkCatagories;
    let newDifficulty = req.body.newDrinkDifficulty;
    let newIngredients = stringIntoArrayOfObjects(req.body.newDrinkIngredients);

    const newRecipe = new Recipe({
        name: newName,
        desc: newDesc,
        image: newImage,
        catagory: newCatagories.toLowerCase(),
        difficulty: newDifficulty,
        ingredients: newIngredients,
        method: newMethod
    })
    newRecipe.save(function(err, recipe) {
        if (err) return console.log(err);
        console.log(recipe);
    })

    res.redirect("/");

});

app.get("/drinks", function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) return console.log(err);
        res.render("drinkIndex", { drinks: recipes });
    })
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

function stringIntoArrayOfObjects(str) {
    let arrayOfDrinkObjects = [];
    "Vodka,50ml-Rum,25ml-Gin,50ml"
    let drinkArray = str.split(",");
    ["Vodka,50ml", "Rum,25ml", "Gin,50ml"]
    for (let i = 0; i < drinkArray.length; i++) {
        let singleDrinkArray = drinkArray[i].split("-");
        ["Vodka", "50ml"]
        let singleDrinkObject = { name: singleDrinkArray[0], quantity: singleDrinkArray[1] }
        arrayOfDrinkObjects[i] = singleDrinkObject;
    }
    return arrayOfDrinkObjects;
}
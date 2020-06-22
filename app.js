const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(flash());
app.use(require("express-session")({
    secret: "Lotr is the beast of franchises",
    resave: false,
    saveUninitialized: false
}));

app.get("/", function(req, res) {
    res.render("landing");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("server is running");
});
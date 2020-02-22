var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/*
//reads website registry
fs.readFile("register.json", (err, data) => {
  let a = JSON.parse(data);
  //name of the restaurant I want
  let name = "taberna_belga";
  //type of service I want
  let type = "restaurante";
  a.forEach(website => {
    //if the name of the restaurant is the one I want
    if (website.name == name) {
      //then I check if this restaurant has the type of service I want
      website.children.forEach(t => {
        //if it does
        if (t.name == type) {
          //then for each menu (file) in this directory, prints the full path of the file I want
          t.children.forEach(menu => {
            console.log(`websites/${website.name}/${t.name}/${menu.name}`);
          });
        }
      });
    }
  });
});
*/
module.exports = app;

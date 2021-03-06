const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port=process.env.PORT||3000;
//define paths for express config
const pdpath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set up handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(pdpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Chaithra Bhadran",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Chaithra Bhadran",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Chaithra Bhadran",
    message: "This is the help text sample",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Chaithra Bhadran",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Chaithra Bhadran",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port "+port);
});

var express = require("express");
var router = express.Router();
var funcs = require("../functions/funcs");
const jsonfile = require("jsonfile");

/* Home page */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/nearme", async (req, res, next) => {
  let data = funcs.getRegister();
  data.forEach((item) => {
    item.children = item.children.filter(
      (child) => child.name !== "metadata.json"
    );
    let metadata = jsonfile.readFileSync(`websites/${item.name}/metadata.json`);
    item.metadata = metadata;
    item.saneName = item.name.split("_").join(" ");
  });
  res.render("nearme", { data });
});

router.get("/getinfo", async (req, res, next) => {
  let data = funcs.getRegister();
  let searchResults = funcs.searchRegister(data, req.query.searchTerm);

  searchResults.forEach((result) => {
    result.saneName = result.item.name.split("_").join(" ");
  });

  let restaurantMatch = searchResults.find(
    (result) => result.item.name === req.query.name
  );

  //remove metadata.json from restaurant children
  restaurantMatch.item.children = restaurantMatch.item.children.filter(
    (item) => item.name !== "metadata.json"
  );

  let resDepartment = restaurantMatch.matches.find(
    (item) => item.key === "children.name" && item.value !== "metadata.json"
  );
  let restaurantDepartment = resDepartment ? resDepartment.value : null;

  if (!restaurantDepartment) {
    if (!Array.isArray(restaurantMatch)) {
      restaurantMatch = [restaurantMatch];
    }
    res.render("other_details", { restaurantMatch });
  } else {
    let metadataPath = restaurantMatch.item.children.find(
      (child) => child.name === restaurantDepartment
    );

    let departmentMetadata = jsonfile.readFileSync(
      `websites/${req.query.name}/${restaurantDepartment}/${metadataPath.children[0].name}`
    );

    let restaurantMetadata = funcs.getRestaurantMetadata(
      restaurantMatch.item.name
    );

    /****/
    //checks if restaurant is open and current time
    let d = new Date();
    let day = d.getDay();
    let hours = restaurantMetadata.schedule[day]; //horario do dia actual, assim: [9-19] (aberto, fechado)
    if (d.getHours() >= hours[0] && d.getHours() < hours[1]) {
      restaurantMetadata["open"] = true;
    } else {
      restaurantMetadata["open"] = false;
    }
    /****/

    restaurantMetadata["dayOfTheWeek"] = day;
    console.log({
      //departmentMetadata: departmentMetadata,
      //restaurantMetadata: restaurantMetadata,
      //restaurantMatch: restaurantMatch,
      //restaurantmatches: restaurantMatch.matches,
      //department: restaurantDepartment,
    });

    res.render("detailspage", {
      departmentMetadata: departmentMetadata,
      restaurantMetadata: restaurantMetadata,
      restaurantMatch,
      department: restaurantDepartment,
    });
  }
});

router.get("/search", async (req, res, next) => {
  try {
    let searchTerm = req.query.q;
    if (searchTerm) {
      let data = funcs.getRegister();
      let searchResults = funcs.searchRegister(data, searchTerm);
      searchResults.forEach((result) => {
        result.saneName = result.item.name.split("_").join(" ");
      });
      res.render("resultspage", {
        searchTerm: searchTerm,
        results: searchResults,
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

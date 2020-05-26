var express = require("express");
var router = express.Router();
var funcs = require("../functions/funcs");
const jsonfile = require("jsonfile");

/* Home page */
router.get("/", function (req, res, next) {
  res.render("index");
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

  let resDepartment = restaurantMatch.matches.find(
    (item) => item.key === "children.name"
  );
  let restaurantDepartment = resDepartment ? resDepartment.value : null;

  if (!restaurantDepartment) {
    if (!Array.isArray(restaurantMatch)) {
      restaurantMatch = [restaurantMatch];
    }
    console.log(restaurantMatch[0].item.children);
    res.render("other_details", { restaurantMatch });
  } else {
    let metadataPath = restaurantMatch.item.children.find(
      (child) => child.name === restaurantDepartment
    );

    let metadata = jsonfile.readFileSync(
      `websites/${req.query.name}/${restaurantDepartment}/${metadataPath.children[0].name}`
    );
    console.log({
      metadata: metadata,
      restaurantMatch,
      department: restaurantDepartment,
    });
    res.render("detailspage", {
      metadata: metadata,
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

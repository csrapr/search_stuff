var express = require("express");
var router = express.Router();
var Fuse = require("fuse.js");
/* Home page */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/search", (req, res, next) => {
  let searchTerm = req.query.q;
  if (searchTerm) {
    let register = [
      {
        name: "taberna_belga",
        type: "directory",
        children: [
          {
            name: "restaurante",
            type: "directory",
            children: [{ name: "restaurante_metadata.json", type: "file" }]
          }
        ]
      },
      {
        name: "tasquinha_bracarense",
        type: "directory",
        children: [
          {
            name: "bar",
            type: "directory",
            children: [{ name: "bar_metadata.json", type: "file" }]
          },
          {
            name: "diaria",
            type: "directory",
            children: [{ name: "diaria_metadata.json", type: "file" }]
          }
        ]
      }
    ];

    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name", "children.name"]
    };
    var fuse = new Fuse(register, options); // "list" is the item array
    var result = fuse.search(searchTerm);
    res.jsonp(result);
  } else {
    res.redirect("/");
  }
});

module.exports = router;

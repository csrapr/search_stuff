const jsonfile = require("jsonfile");
const Fuse = require("fuse.js");

const getRegister = () => {
  let data = jsonfile.readFileSync("register.json");
  return data;
};

const searchRegister = (data, searchTerm) => {
  let options = {
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: ["name", "children.name"],
  };
  var fuse = new Fuse(data, options); // "list" is the item array
  var result = fuse.search(searchTerm);
  return result;
};

const getRestaurantMetadata = (restaurantName) => {
  let data = jsonfile.readFileSync(`websites/${restaurantName}/metadata.json`);
  return data;
};

exports.getRegister = getRegister;
exports.searchRegister = searchRegister;
exports.getRestaurantMetadata = getRestaurantMetadata;
/*
pesquisa por "bar"
[
  {
    item: {
      name: "tasquinha_bracarense",
      type: "directory",
      children: [
        {
          name: "bar",
          type: "directory",
          children: [{ name: "bar_metadata.json", type: "file" }],
        },
        {
          name: "diaria",
          type: "directory",
          children: [{ name: "diaria_metadata.json", type: "file" }],
        },
      ],
    },
    matches: [
      {
        indices: [
          [1, 1],
          [8, 8],
          [10, 12],
          [14, 15],
        ],
        value: "tasquinha_bracarense",
        key: "name",
        arrayIndex: 0,
      },
      { indices: [[0, 2]], value: "bar", key: "children.name", arrayIndex: 0 },
      {
        indices: [
          [2, 3],
          [5, 5],
        ],
        value: "diaria",
        key: "children.name",
        arrayIndex: 1,
      },
    ],
    score: 0,
    saneName: "tasquinha bracarense",
  },
  {
    item: {
      name: "taberna_belga",
      type: "directory",
      children: [
        {
          name: "restaurante",
          type: "directory",
          children: [{ name: "restaurante_metadata.json", type: "file" }],
        },
      ],
    },
    matches: [
      {
        indices: [
          [1, 2],
          [4, 4],
          [6, 6],
          [8, 8],
          [12, 12],
        ],
        value: "taberna_belga",
        key: "name",
        arrayIndex: 0,
      },
    ],
    score: 0.35333333333333333,
    saneName: "taberna belga",
  },
];


[
  {
    a: "tasquinha_bracarense",
    b: "a",
    c: {
      item: {
        name: "tasquinha_bracarense",
        type: "directory",
        children: [
          {
            name: "bar",
            type: "directory",
            children: [{ name: "bar_metadata.json", type: "file" }],
          },
          {
            name: "diaria",
            type: "directory",
            children: [{ name: "diaria_metadata.json", type: "file" }],
          },
        ],
      },
      matches: [
        {
          indices: [[1, 1]],
          value: "tasquinha_bracarense",
          key: "name",
          arrayIndex: 0,
        },
        {
          indices: [[1, 1]],
          value: "bar",
          key: "children.name",
          arrayIndex: 0,
        },
        {
          indices: [[2, 2]],
          value: "diaria",
          key: "children.name",
          arrayIndex: 1,
        },
      ],
      score: 0.0000020000000000000003,
    },
  },
];
*/

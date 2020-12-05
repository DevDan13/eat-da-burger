let express = require("express");

let router = express.Router();

// Import the model (cat.js) to use its database functions.
let burger = require("../models/burger.js");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create all our routes and set up logic within those routes where required.
router.get("/burgers", function (req, res) {
    burger.all(function (data) {
        res.json({ burgers: data });
    });
});

router.post("/burgers", function (req, res) {
    console.log("hittt");
    burger.create(
        req.body.burger_name,
        function (result) {
            console.log("burger", result)
            //does this need to be fixed?
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

//change burger devour from false to true. use id to grab that id?
router.put("/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devour: req.params.devour
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.json({ id: req.params.id});
      }
    });
  });

router.delete("/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;
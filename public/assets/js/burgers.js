// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {
    console.log('data frontend', data.burgers)
    var devouredElem = $("#devoured");
    var toDevourElem = $("#to-devour");

    var eatBurgers = data.burgers;
    var len = eatBurgers.length;

    //add classes to dynamic buttons and make in a subrow > sub column 3. the text is 9.
    for (var i = 0; i < len; i++) {
      let new_elem;
      if (eatBurgers[i].devoured) {
        new_elem = "<div class= 'devour-styling'>" + eatBurgers[i].id + ". "
          + eatBurgers[i].burger_name + "     " +
          "   <button class='btn btn-danger delete-burger' data-id='" +
          eatBurgers[i].id +
          "'>DELETE!</button></div>";
        console.log(new_elem);
        devouredElem.append(new_elem);
      } else {
        new_elem =
          "<div class= 'devour-styling'>" +
          eatBurgers[i].id +
          ". " + eatBurgers[i].burger_name + "      " +
          "   <button class='btn btn-primary devour-burger' data-id='" +
          eatBurgers[i].id +
          "' data-newsleep='" +
          !eatBurgers[i].devoured +
          "'>";
        new_elem += "Devour!</button></div>";
        console.log(new_elem);
        toDevourElem.append(new_elem);
      }
    }
  });

  $(document).on("click", ".devour-burger", function (event) {
    var id = $(this).data("id");

    // Send the PUT request.
    $.ajax("/burgers/" + id, {
      type: "PUT",
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".add-burger").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger_name")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      console.log("created new cat");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log("devoured burger yummy!", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});

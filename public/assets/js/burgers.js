// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
        console.log('data frontend', data.burgers)
      var sleepyElem = $("#sleepyCats");
      var nosleepyElem = $("#notSleepyCats");
  
      var cats = data.burgers;
      var len = cats.length;
  
      for (var i = 0; i < len; i++) {
        var new_elem =
          "<li>" +
          cats[i].id + 
          ". "+cats[i].burger_name +
          "<button class='change-sleep' data-id='" +
          cats[i].id +
          "' data-newsleep='" +
          !cats[i].devoured +
          "'>";
  

          new_elem += "Devour!";
        
        if (cats[i].devoured) {
          sleepyElem.append(new_elem);
        } else {
          nosleepyElem.append(new_elem);
        }
      }
    });
  
    $(document).on("click", ".change-sleep", function(event) {
      var id = $(this).data("id");

      // Send the PUT request.
      $.ajax("/burgers/" + id, {
        type: "PUT",
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#ca")
          .val()
          .trim(),
      };
  
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newBurger),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(document).on("click", ".delete-cat", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/burgers/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("devoured burger yummy!", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  });
  
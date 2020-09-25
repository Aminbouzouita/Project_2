$(document).ready(function () {
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  // Make a get request to our api route that will return every book
  // When user clicks add-btn
  $("#add-btn").on("click", function (event) {
    event.preventDefault();
    //console.log(event);
    var user_entry = $("#user-entry").val().trim();
    var selected_option = $("#role_choices").val();
    //console.log(selected_option);
    // Make a newBook object
    if (selected_option === "1") {
      var newEmployee = {
        first_name: $("#user-entry").val().trim(),
        // last_name: $("#last_name").val().trim(),
        // title: $("#title").val().trim(),
        // email: $("#email").val().trim(),
      };
      $.get("/api/searchemployee/", newEmployee).then(function (data) {
        // Log the data we found
        // console.log(
        //   "tercero",
        //   data.id,
        //   data.first_name,
        //   data.email,
        //   data.role_id,
        //   data
        // );
        var employees = $("<div>").addClass("employees");
        $(".answer-search").append(employees);
        $(".answer-search").append(
          `first name:<input id=first_name value=` + data.first_name + `></br>`
        );
        $(`.answer-search`).append(
          `last name:<input id=last_name value= ` + data.last_name + `></br>`
        );
        $(`.answer-search`).append(
          `title:<input id=role_id value= ` + data.role_id + `></br>`
        );
        $(`.answer-search`).append(
          `email:<input id=email value= ` + data.email + `></br>`
        );
      });
    } else if (selected_option === "2") {
      var newEmployee = {
        //first_name: $("#user-entry").val().trim(),
        last_name: $("#user-entry").val().trim(),
        // title: $("#title").val().trim(),
        // email: $("#email").val().trim(),
      };
      $.get("/api/searchemployeelast/", newEmployee).then(function (data) {
        //Log the data we found
        // console.log(
        //   "tercero",
        //   data.id,
        //   data.first_name,
        //   data.email,
        //   data.role_id,
        //   data
        // );
        var employees = $("<div>").addClass("employees");
        $(".answer-search").append(employees);
        $(".answer-search").append(
          `first name:<input id=first_name value=` + data.first_name + `></br>`
        );
        $(`.answer-search`).append(
          `last name:<input id=last_name value= ` + data.last_name + `></br>`
        );
        $(`.answer-search`).append(
          `title:<input id=role_id value= ` + data.role_id + `></br>`
        );
        $(`.answer-search`).append(
          `email:<input id=email value= ` + data.email + `></br>`
        );
      });
    }
    // Send an AJAX POST-request with jQuery
    // Empty each input box by replacing the value with an empty string
    $("#first_name").val("");
    // $("#last_name").val("");
    // $("#title").val("");
    // $("#email").val("");
  });
});

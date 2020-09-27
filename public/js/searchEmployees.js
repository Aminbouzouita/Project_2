$(document).ready(function () {
  $.get("/api/allEmployees", function (response) {
    $.get("/api/user_data").then(function (data) {
      //console.log(data);
      $(".member-email").text(data.email);
      var email = $(".member-email").text();
      var id;
      console.log("here", email, response);
      for (var i = 0; i < response.length; i++) {
        if (response[i].email === email) {
          //console.log("found it", response[i].id);
          id = response[i].id;
        }
      }

      var userPost = { id: id };
      //console.log(userPost);

      $.get("/api/userPosts/", userPost).then(function (data) {
        //console.log("data email");
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
          var employees = $("<div>")
            .addClass("messagePost")
            .attr("id", "employee" + i);
          $(".pure-u-3-4").append(employees);
          $(`#employee` + i).append(
            `<p>Sender ID: ` + data[i].sender_id + `</p>`
          );
          $(`#employee` + i).append(`<p>` + data[i].post + `</p></br>`);
        }
      });
      for (var i = 0; i < response.length; i++) {
        if (response[i].id != id) {
          //console.log(response[i].id);
          $("#role_choices").append(
            `<option value="` +
              response[i].id +
              `">` +
              response[i].first_name +
              ` ` +
              response[i].last_name +
              `</option></br>`
          );
        } else {
          $(".member-name").text(response[i].first_name);
          $(".member-id").text(id);
        }
      }
    });
  });

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

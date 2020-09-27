$(document).ready(function () {
  $.get("/api/allEmployees", function (response) {
    $.get("/api/user_data").then(function (data) {
      console.log(data);
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

  function addtilesToSelectOptions() {
    $.get("/api/allRoles", function (res) {
      for (var i = 0; i < res.length; i++) {
        var titles = $("#role_choices").append(
          `<option value="` + res[i].id + `">` + res[i].title + `</option></br>`
        );
      }
    });
  }

  addtilesToSelectOptions();

  $.get("/api/searchemployee/manager_id", function (response) {
    for (var i = 0; i < response.length; i++) {
      if ((response[i].is_manager = true)) {
        $("#manager_id").append(
          `<option value="` +
            1 +
            `">` +
            response[i].first_name +
            ` ` +
            response[i].last_name +
            `</option></br>`
        );
      }
    }
  });
});
$("#add-btn").on("click", function (event) {
  event.preventDefault();
  console.log($("#is_manager").val());
  console.log($("#is_admin").val());
  console.log($("#is_active").val());
  var newEmployee = {
    first_name: $("#first_name").val().trim(),
    last_name: $("#last_name").val().trim(),
    role_id: $("#role_choices").val().trim(),
    hourly_paid: $("#hourly_paid").val().trim(),
    email: $("#email").val().trim(),
    street: $("#street").val().trim(),
    city: $("#city").val().trim(),
    zip_code: $("#zip_code").val().trim(),
    country: $("#country").val().trim(),
    is_manager: $("#is_manager").val(),
    manager_id: $("#manager_id").val().trim(),
    is_admin: $("#is_admin").val(),
    is_active: $("#is_active").val(),
  };
  $.post("/api/newEmployees", newEmployee).then(function (data) {
    console.log(data);
  });
  $("#first_name").val("");
  $("#last_name").val("");
  $("#role_choices").val("");
  $("#hourly_paid").val("");
  $("#email").val("");
  $("#street").val("");
  $("#city").val("");
  $("#zip_code").val("");
  $("#country").val("");
  $("#is_manager").val("");
  $("#manager_id").val("");
  $("#is_admin").val("");
  $("#is_active").val("");
});

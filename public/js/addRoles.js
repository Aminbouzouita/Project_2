$(document).ready(function () {
  $.get("/api/allEmployees", function (response) {
    $.get("/api/user_data").then(function (data) {
      //console.log(data);
      $(".member-email").text(data.email);
      var email = $(".member-email").text();
      var id;
      //console.log("here", email, response);
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

  $.get("/api/allDepartments", function (res) {
    let roles = [];
    for (var i = 0; i < res.length; i++) {
      roles.push({ name: `${res[i].department_name}`, value: `${res[i].id}` });
    }
    for (var i = 0; i < roles.length; i++) {
      $("#department_choices").append(
        `<option value="` +
          roles[i].value +
          `">` +
          roles[i].name +
          `</option></br>`
      );
    }

    $("#add-btn").on("click", function (event) {
      event.preventDefault();
      var newRole = {
        title: $("#title").val().trim(),
        salary: $("#salary").val().trim(),
        department_id: $("#department_choices").val().trim(),
      };

      $.post("/api/newRoles", newRole).then(function (data) {
        // console.log(data);
      });

      $("#title").val("");
      $("#salary").val("");
      $("#department_id").val("");
    });
  });
});

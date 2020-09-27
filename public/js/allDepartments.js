$(document).ready(function () {
  //start posts
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

  //end post

  $.get("/api/allDepartments", function (data) {
    for (var i = 0; i < data.length; i++) {
      var departments = $("<div>")
        .addClass("departments")
        .attr("id", "department" + i);
      $("#departments-section").append(departments);
      $("#department" + i).append(
        `Department Name:<input id=department_name` +
          i +
          ` value=` +
          data[i].department_name +
          `></br>`
      );
      $("#department" + i).append(
        `<button class=delete_btn id=${i}>Delete</button>`
      );
      $("#department" + i).append(
        `<button  class=edit_btn id=${i}>Edit</button></br></br>`
      );
    }

    $(".edit_btn").on("click", function (event) {
      event.stopPropagation();
      var id = this.id;
      var name = $("#department_name" + id).val();
      var namep = {
        id: data[id].id,
        department_name: name,
      };
      console.log(namep);
      $.ajax({
        method: "PUT",
        url: "/api/updateDep/",
        data: namep,
      }).then(function (result) {
        console.log("Success Updating Employee");
      });
      location.reload();
    });

    $(".delete_btn").on("click", function (event) {
      event.preventDefault();
      var id = this.id;
      console.log(id);
      $.ajax({
        method: "DELETE",
        url: "/api/Departments/" + data[id].id,
      }).then(function (resutlt) {
        // console.log(resutlt);
        location.reload();
      });
    });
  });
});

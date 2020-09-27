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

  $.get("/api/allRoles", function (data) {
    for (var i = 0; i < data.length; i++) {
      var roles = $("<div>")
        .addClass("roles")
        .attr("id", "role" + i);
      $("#roles-section").append(roles);
      $(`#role` + i).append(
        `Title:<input id=title` + i + ` value=` + data[i].title + `></br>`
      );
      $(`#role` + i).append(
        `Salary:<input id=salary` + i + ` value= ` + data[i].salary + `></br>`
      );
      $(`#role` + i).append(
        `Department Name:<input id=department_id` +
          i +
          ` value= ` +
          data[i].Department.department_name +
          `></br>`
      );
      $(`#role` + i).append(`<button class=delete_btn id=${i}>Delete</button>`);
      $(`#role` + i).append(
        `<button  class=edit_btn id=${i}>Edit</button></br></br>`
      );
    }

    $(".edit_btn").on("click", function (event) {
      event.stopPropagation();
      var id = this.id;
      var titles = $("#title" + id).val();
      var salaries = $("#salary" + id).val();
      var departments = $("#department_id" + id)
        .val()
        .trim();
      var namep = {
        id: data[id].id,
        title: titles,
        salary: salaries,
        department_id: departments,
      };
      console.log(namep);
      $.ajax({
        method: "PUT",
        url: "/api/updateRole/",
        data: namep,
      }).then(function (result) {
        console.log("Success Updating Employee");
      });
      location.reload();
    });

    $(`.delete_btn`).on(`click`, function (event) {
      event.stopPropagation();
      var id = this.id;
      console.log(id);
      $.ajax({
        method: "DELETE",
        url: "/api/Roles/" + data[id].id,
      }).then(function (resutlt) {
        console.log(resutlt);
        location.reload();
      });
    });
  });
});

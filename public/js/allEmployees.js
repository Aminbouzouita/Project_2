$(document).ready(function () {
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);

  });
  // Make a get request to our api route that will return every book
  $.get("/api/allEmployees", function (data) {
    for (var i = 0; i < data.length; i++) {
      var employees = $("<div>").addClass("employees").attr("id", "employee" + i);;
      $("#employees-section").append(employees);
      $("#employee" + i).append(`first name:<input id=first_name` + i +` value=` + data[i].first_name + `></br>`);
      $(`#employee` + i).append(`last name:<input id=last_name` + i +` value= ` + data[i].last_name + `></br>`);
      $(`#employee` + i).append(`title:<input id=role_id` + i +` value= ` + data[i].role_id + `></br>`);
      $(`#employee` + i).append(`email:<input id=email` + i +` value= ` + data[i].email + `></br>`);
      $(`#employee` + i).append(`<button class=delete_btn id=${i}>Delete</button>`);
      $(`#employee` + i).append(`<button  class=edit_btn id=${i}>Edit</button></br></br>`);
    }
    // console.log(data)
    $(`.delete_btn`).on(`click`, function (event) {
      event.stopPropagation();
      var id = this.id;
      console.log(id);
      $.ajax({
        method: "DELETE",
        url: "/api/Employees/" + data[id].id
      }).then(function (resutlt) {
        // console.log(resutlt);
        location.reload();
      });
    });

    $(".edit_btn").on("click", function (event) {
      event.stopPropagation();
      var id = this.id;
      var first = $("#first_name" + id).val();
      var last = $("#last_name" + id).val();
      var role = $("#role_id" + id).val().trim();
      var email = $("#email" + id).val();
      console.log(role);
      var namep = {
        id: data[id].id,
        first_name: first,
        last_name: last,
        role_id: role,
        email: email,
      };
      console.log(namep);
      $.ajax({
        method: "PUT",
        url: "/api/updateEmp/",
        data: namep,
      }).then(function (result) {
        console.log("Success Updating Employee");
      });
      location.reload();
    });
  });
});
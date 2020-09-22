$(document).ready(function () {
  $.get("/api/allRoles", function (res) {
    let roles = [];
    for (var i = 0; i < res.length; i++) {
      roles.push({ name: `${res[i].title}`, value: `${res[i].id}` });
    }
    for (var i = 0; i < roles.length; i++) {
      $("#role_choices").append(`<option value="` + roles[i].value + `">` + roles[i].name + `</option></br>`);
    }

    $("#add-btn").on("click", function (event) {
      event.preventDefault();
      var newEmployee = {
        first_name: $("#first_name").val().trim(),
        last_name: $("#last_name").val().trim(),
        role_id:$("#role_choices").val().trim(),
        email: $("#email").val().trim()
      };
      $.post("/api/newEmployees", newEmployee)
        .then(function (data) {
          // console.log(data);
        });
      $("#first_name").val("");
      $("#last_name").val("");
      $("#role_choices").val("");
      $("#email").val("");
    });
  });
});
$(document).ready(function () {
  $.get("/api/allRoles", function (res) {
    let roles = [];
    for (var i = 0; i < res.length; i++) {
      roles.push({ name: `${res[i].title}`, value: `${res[i].id}` });
    }
    for (var i = 0; i < roles.length; i++) {
      $("#role_choices").append(`<option value="` + roles[i].value + `">` + roles[i].name + `</option></br>`);
    } 
    console.log(roles);
  });
    $("#add-btn").on("click", function (event) {
      event.preventDefault();
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
        is_manager: $("#is_manager").val().trim(),
        manager_id: $("#manager_id").val().trim(),
        is_admin: $("#is_admin").val().trim(),
        is_active: $("#is_active").val().trim()
      };
      $.post("/api/newEmployees", newEmployee)
        .then(function (data) {
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
});
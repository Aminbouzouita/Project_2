$(document).ready(function () {

  $.get("/api/allDepartments", function (res) {
    let roles = [];
    for (var i = 0; i < res.length; i++) {
      roles.push({ name: `${res[i].department_name}`, value: `${res[i].id}` });
    }
    for (var i = 0; i < roles.length; i++) {
      $("#department_choices").append(`<option value="` + roles[i].value + `">` + roles[i].name + `</option></br>`);
    }

    $("#add-btn").on("click", function (event) {
      event.preventDefault();
      var newRole = {
        title: $("#title").val().trim(),
        salary: $("#salary").val().trim(),
        department_id: $("#department_choices").val().trim()
      };

      $.post("/api/newRoles", newRole)
        .then(function (data) {
          // console.log(data);
        });

      $("#title").val("");
      $("#salary").val("");
      $("#department_id").val("");
    });
  });
});
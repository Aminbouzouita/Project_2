$(document).ready(function () {
  $("#add-btn").on("click", function (event) {
    event.preventDefault();
    var departmentNameInput = $("#department_name");

    var newDepartment = {
      department_name: departmentNameInput.val().trim()
    };

    $.post("/api/newDepartments", newDepartment)
      .then(function (data) {

      });

    $("#department_name").val("");

  });
});
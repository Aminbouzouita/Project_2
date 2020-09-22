$(document).ready(function () {
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);

  });
  // When user clicks add-btn
  $("#add-btn").on("click", function (event) {
    event.preventDefault();

    // Make a newBook object
    var newDepartment = {
      department_name: $("#department_name").val().trim()
    };

    // Send an AJAX POST-request with jQuery
    $.post("/api/newDepartments", newDepartment)
      // On success, run the following code
      .then(function (data) {
        // Log the data we found
        // console.log(data);
      });

    // Empty each input box by replacing the value with an empty string
    $("#department_name").val("");

  });
});
$(document).ready(function () {
  $.get("/api/user_data").then(function (data) {
    var employeeEmail = data.email;
    $.get("/api/allEmployees", function (res) {
      var sender_id;
      for (var i = 0; i < res.length; i++) {
        if (res[i].email === employeeEmail) {
          sender_id = res[i].id;
        }
      }
  
      // for (var i = 0; i < res.length; i++) {
      //   if (res[i].is_manager = true) {
        
      //   }
      // }
var choices = $("#option").val().trim();
console.log(choices);

      $("#add-btn").on("click", function (event) {
        event.preventDefault();
        var newPost = {
          sender_id: sender_id,
          receiver_id: ("#receiver").val().trim(),
          Post: $("#post").val().trim()
        };
        $.post("/api/newPost", newPost)
          .then(function (data) {

          });
        $("#Post").val("");

      });
    });
  });
});
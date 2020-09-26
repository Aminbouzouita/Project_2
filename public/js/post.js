$(document).ready(function () {
  $.get("/api/allEmployees", function (response) {
    $.get("/api/user_data").then(function (data) {
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
      //start

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
        //finish
      });

      //finish
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
  $("#add-btn").on("click", function (event) {
    event.preventDefault();
    //console.log("rendering  html)");
    var newPost = {
      sender_id: $(".member-id").text(),
      receiver_id: $("#role_choices").val(),
      post: $(".message").val(),
    };
    //console.log(newPost);
    $.post("/api/newPost", newPost).then(function (data) {
      console.log("success adding post");
      //console.log("data", data);
    });
    $(".member-id").val("");
    $("#role_choices").val("");
    $(".message").val("");
  });
});

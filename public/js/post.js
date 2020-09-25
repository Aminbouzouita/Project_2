$(document).ready(function () {
  $.get("/api/user_data").then(function (data) {
    var employeeEmail = { email: data.email };
    console.log(employeeEmail);
    $.get("/api/searchemployee/email", employeeEmail).then(function (res) {
      var sender_id = res.id;
      var sender_firstName = res.first_name;
      var sender_lastName = res.last_name;
      console.log(sender_id);
      $("#search").on("click", function (event) {
        var receiver = $("#receiver").val().trim();
        var spaceindex = receiver.indexOf(" ");
         if(spaceindex != null){
        var length = receiver.length;
        var first_name = receiver.slice(0, spaceindex);
        var last_name = receiver.slice(spaceindex + 1, length);
        var receiver_id;
        var newreceiver = {
          first_name: first_name,
          last_name: last_name
        };
         $.get("/api/searchemployee/fullname", newreceiver).then( function (response) {
         receiver_id = response.id;
         console.log(receiver_id);
         });
         }
         else if(receiver_id = null ){
        $.get("/api/searchemployee/?", { first: receiver }).then(function (response) {
          console.log(response);
        });
         }
         $.get("/api/searchemployeelast/?",{ last: receiver } ).then(function (res) {
             console.log(res)
         });
      

      });
    });
  });
});

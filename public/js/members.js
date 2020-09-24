$(document).ready(function () {
  $("#currenttime").append(moment().format('MMMM Do YYYY, hh:mm:ss'));
  $.get("/api/user_data").then(function (data) {
    var employeeEmail = data.email;
    console.log(data);
    $.get("/api/allEmployees", function (res) {
      var employee_id;
      var employeeName;
      for (var i = 0; i < res.length; i++) {
        if (res[i].email === employeeEmail) {
          employee_id = res[i].id;
          employeeName = res[i].first_name + " " + res[i].last_name;
        }
      }
   
      $(".member-name").append(employeeName);
      $(`#start`).on(`click`, function (event) {
        event.stopPropagation();

        $(`#start`).text("Stop")
        var starttime = moment().format('hh:mm');

        $("#start").on("click", function (event) {
          event.stopPropagation();
       
          $(`#start`).text("Start");
          var date = moment().format('MMMM DD YYYY');
          var stoptime = moment().format('hh:mm');

          var stophours = parseInt(stoptime.slice(0, 2));
          var stopminitues = parseInt(stoptime.slice(3, 5));

          var starthours = parseInt(starttime.slice(0, 2));
          var startminitues = parseInt(starttime.slice(3, 5));
          
          var totalmonthlytimes=`0:0`;
          var totaldayhours = stophours - starthours;
          var totaldayminutes = stopminitues - startminitues;
          if(totaldayhours < 10){
            totaldayhours=`0${totaldayhours}`
          }
          console.log(totaldayhours)
          if(totaldayminutes < 10){
            totaldayminutes=`0${totaldayminutes}`
          }
          console.log(totaldayminutes);
          var workedtime = `${totaldayhours}:${totaldayminutes}`;
          var totalmonthlyhours= parseInt(totalmonthlytimes.slice(0, 2));
          var totalmonthlyminutes= parseInt(totalmonthlytimes.slice(4, 5));
          var newtotalmonthlyhours= totalmonthlyhours + totaldayhours;
          var newtotalmonthlyminutes = totalmonthlyminutes + totaldayminutes;
         
          if(newtotalmonthlyhours < 10){
            newtotalmonthlyhours=`0${newtotalmonthlyhours}`
          }
          if(newtotalmonthlyminutes < 10){
            newtotalmonthlyminutes=`0${newtotalmonthlyminutes}`
          }
          var totalmonthlytime = `${newtotalmonthlyhours}:${newtotalmonthlyminutes}`
    
         
          
          // console.log(workedtime.slice(0, 1));
          // console.log(workedtime.slice(2, 3))
          // $.get("/api/allTimer", function (data) {
            // console.log(data);
            var newTimer = {
              employee_id: employee_id,
              date: date,
              starttime: starttime,
              stoptime: stoptime,
              workedtime: workedtime,
              totalmonthlytime: totalmonthlytime,
            };

            $.post("/api/newTimer", newTimer)
              .then(function (data) {
                console.log(data);
              });
          // });
        });
      });
    });
  });
});

          // var namep = {
          //   employee_id: employee_id,
          //   starttime: starttime,
          //   stoptime: stoptime,
          //   workedtime: workedtime,
          //   totaltime: totaltime
          // };
          // console.log(namep);
          // $.ajax({
          //   method: "PUT",
          //   url: "/api/updateTimer/",
          //   data: namep,
          // }).then(function (result) {
          //   console.log("Success Updating Employee");
          // });
          // location.reload();
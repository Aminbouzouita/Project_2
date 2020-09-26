$(document).ready(function () {
  $("#currenttime").append(moment().format("MMMM Do YYYY, hh:mm:ss a"));

  // Data for User
  $.get("/api/user_data").then(function (data) {
    var employeeEmail = data.email;
    $.get("/api/allEmployees", function (res) {
      var employee_id;
      var employeeName;
      var paidperhour;
      for (var i = 0; i < res.length; i++) {
        if (res[i].email === employeeEmail) {
          employee_id = res[i].id;
          employeeName = res[i].first_name + " " + res[i].last_name;
          paidperhour = res[i].hourly_paid;
        }
      }

      $(".member-name").append(employeeName);
      $.get("/api/allTimer").then(function (response) {
        console.log(response);
        var dateforloop = moment().format(`YYYY-MM`);
        var holemonthlyworkinghours = [];
        for (var i = 0; i < response.length; i++) {
          if (response[i].employee_id === employee_id) {
            if (response[i].createdAt.slice(0, 7) === dateforloop) {
              holemonthlyworkinghours.push(response[i].totalmonthlytime);
              var totalmonthlytimes =
                holemonthlyworkinghours[holemonthlyworkinghours.length - 1];
              var totalmonthlyhours = parseInt(totalmonthlytimes.slice(0, 2));
              var totalmonthlyminutes = parseInt(totalmonthlytimes.slice(4, 5));
              var currentbalance =
                totalmonthlyhours * paidperhour +
                (totalmonthlyminutes * paidperhour) / 60;
              $(`#balance`).append(currentbalance);
            }
          } else {
            holemonthlyworkinghours.push("00:00");
            $(`#balance`).append(`0`);
          }
        }

        $(`#start`).on(`click`, function (event) {
          event.stopPropagation();
          $(`#start`).text("Stop");
          var starttime = moment().format("hh:mm");
          var starthours = parseInt(moment().format("hh"));
          var startminitues = parseInt(moment().format("mm"));
          $("#start").on("click", function (event) {
            event.stopPropagation();
            $(`#start`).text("Start");
            var date = moment().format("Do MMMM YYYY");
            var stoptime = moment().format("hh:mm");
            var stophours = parseInt(moment().format("hh"));
            var stopminitues = parseInt(moment().format("mm"));
            var totaldayhours = stophours - starthours;
            var totaldayminutes = stopminitues - startminitues;
            var newtotalmonthlyhours = totalmonthlyhours + totaldayhours;
            var newtotalmonthlyminutes = totalmonthlyminutes + totaldayminutes;
            var newbalance =
              newtotalmonthlyhours * paidperhour +
              (newtotalmonthlyminutes * paidperhour) / 60;
            $(`#balance`).append(newbalance);
            if (totaldayhours < 10) {
              totaldayhours = `0${totaldayhours}`;
            }
            if (totaldayminutes < 10) {
              totaldayminutes = `0${totaldayminutes}`;
            }
            if (newtotalmonthlyhours < 10) {
              newtotalmonthlyhours = `0${newtotalmonthlyhours}`;
            }
            if (newtotalmonthlyminutes < 10) {
              newtotalmonthlyminutes = `0${newtotalmonthlyminutes}`;
            }

            var totalmonthlytime = `${newtotalmonthlyhours}:${newtotalmonthlyminutes}`;
            if (totalmonthlytime === `NaN:NaN`) {
              totalmonthlytime = `00:00`;
            }
            var workedtime = `${totaldayhours}:${totaldayminutes}`;
            var newTimer = {
              employee_id: employee_id,
              date: date,
              starttime: starttime,
              stoptime: stoptime,
              workedtime: workedtime,
              totalmonthlytime: totalmonthlytime,
            };
            location.reload();
            $.post("/api/newTimer", newTimer).then(function (data) {
              console.log(data);
            });
          });
        });
      });
    });
  });
});

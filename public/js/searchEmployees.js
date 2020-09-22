$(document).ready(function () {
    
    $.get("/api/allDepartments", function (data) {
      for (var i = 0; i < data.length; i++) {
        var departments = $("<div>").addClass("departments").attr("id", "department" + i);;
        $("#departments-section").append(departments);
        $("#department" + i).append(`Department Name:<input id=value${i} value=` + data[i].department_name + `></br>`);
        $("#department" + i).append(`<button class=delete_btn id=${i}>Delete</button>`);
        $("#department" + i).append(`<button  class=edit_btn id=${i}>Edit</button></br></br>`);
      }
    });
});  
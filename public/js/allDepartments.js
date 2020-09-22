$(document).ready(function () {
  $.get("/api/allDepartments", function (data) {
    for (var i = 0; i < data.length; i++) {
      var departments = $("<div>").addClass("departments").attr("id", "department" + i);;
      $("#departments-section").append(departments);
      $("#department" + i).append(`Department Name:<input id=value${i} value=` + data[i].department_name + `></br>`);
      $("#department" + i).append(`<button class=delete_btn id=${i}>Delete</button>`);
      $("#department" + i).append(`<button  class=edit_btn id=${i}>Edit</button></br></br>`);
    }

    $(".edit_btn").on("click", function (event) {
      event.preventDefault();
      var editedvalues=[];
      for (var i = 0; i < data.length; i++) {
       editedvalues.push($(`#value${i}`).val());
      }
      // console.log(editedvalues);
        var id = this.id;
        console.log(id);
        $.ajax({
          method: "PUT",
          url: "/api/Departments",
          data: editedvalues
        }).then(function(resutlt){
        // console.log(resutlt);
         location.reload();
        }); 
    });

    
    $(".delete_btn").on("click", function (event) {
      event.preventDefault();
      var id = this.id;
      console.log(id);
      $.ajax({
        method: "DELETE",
        url: "/api/Departments/" + data[id].id
      }).then(function (resutlt) {
        // console.log(resutlt);
        location.reload();

      });
    });
  });
});
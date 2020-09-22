$(document).ready(function () {
  $.get("/api/allDepartments", function (data) {
    for (var i = 0; i < data.length; i++) {
      var departments = $("<div>").addClass("departments").attr("id", "department" + i);;
      $("#departments-section").append(departments);
      $("#department" + i).append(`Department Name:<input id=department_name` + i +` value=` + data[i].department_name + `></br>`);
      $("#department" + i).append(`<button class=delete_btn id=${i}>Delete</button>`);
      $("#department" + i).append(`<button  class=edit_btn id=${i}>Edit</button></br></br>`);
    }

    $(".edit_btn").on("click", function (event) {
      event.stopPropagation();
      var id = this.id;
      var name = $("#department_name" + id).val();
      var namep = {
        id: data[id].id,
        department_name : name,
      };
      console.log(namep);
      $.ajax({
        method: "PUT",
        url: "/api/updateDep/",
        data: namep,
      }).then(function (result) {
        console.log("Success Updating Employee");
      });
      location.reload();
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
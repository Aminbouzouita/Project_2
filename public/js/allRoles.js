$(document).ready(function () {
  $.get("/api/allRoles", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var roles = $("<div>").addClass("roles").attr("id", "role" + i);;
      $("#roles-section").append(roles);
      $(`#role` + i).append(`Title:<input id=title` + i + ` value=` + data[i].title + `></br>`);
      $(`#role` + i).append(`Salary:<input id=salary` + i + ` value= ` + data[i].salary + `></br>`);
      $(`#role` + i).append(`Department Name:<input id=department_id` + i + ` value= ` + data[i].Department.department_name + `></br>`);
      $(`#role` + i).append(`<button class=delete_btn id=${i}>Delete</button>`);
      $(`#role` + i).append(`<button  class=edit_btn id=${i}>Edit</button></br></br>`);
    }


    $(".edit_btn").on("click", function (event) {
      event.stopPropagation();
      var id = this.id;
      var titles = $("#title" + id).val();
      var salaries = $("#salary" + id).val();
      var departments = $("#department_id" + id).val().trim();
      var namep = {
        id: data[id].id,
        title: titles,
        salary: salaries,
        department_id: departments,
      };
      console.log(namep);
      $.ajax({
        method: "PUT",
        url: "/api/updateRole/",
        data: namep,
      }).then(function (result) {
        console.log("Success Updating Employee");
      });
      location.reload();
    });

    $(`.delete_btn`).on(`click`, function (event) {
      event.stopPropagation();
      var id = this.id;
      console.log(id);
      $.ajax({
        method: "DELETE",
        url: "/api/Roles/" + data[id].id
      }).then(function (resutlt) {
        console.log(resutlt);
        location.reload();
      });
    });
  });
});
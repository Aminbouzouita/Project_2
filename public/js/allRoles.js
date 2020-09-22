$(document).ready(function () {
$.get("/api/allRoles", function(data) {
    for (var i = 0; i < data.length; i++) {
      var roles = $("<div>").addClass("roles").attr("id", "role" + i);;
      $("#roles-section").append(roles);
      $("#role" + i).append("Title:<input id=title value=" + data[i].title+ "></br>");
      $("#role" + i).append("Salary:<input id=salary value= " + data[i].salary + "></br>");
      $("#role" + i).append("Department Name:<input id=department_id value= " + data[i].department_id+ "></br>");
      $("#role" + i).append(`<button class=delete_btn id=${i}>Delete</button>`);
      $("#role" + i).append(`<button  class=edit_btn id=${i}>Edit</button></br></br>`);
    }
  $(".delete_btn").on("click", function(event){
      event.stopPropagation();
      var id = this.id;
      console.log(id);
      $.ajax({
        method: "DELETE",
        url: "/api/Roles/" + data[id].id
      }).then(function(resutlt){
       console.log(resutlt);
       location.reload();
      });
    });
    $(".edit_btn").on("click", function(event){
      event.stopPropagation();
      var id = this.id;
      console.log(id);
      // var last_name = $("#last_name")[id].value;
      // var title = $("#title")[id].value;
      // var email = $("#email")[id].value;
      // $.ajax({
      //   method: "PUT",
      //   url: "/api/employee/",
      //   data: [$("#first_name")[id].val().trim(),$("#last_name")[id].val().trim(),$("#title")[id].val().trim(),$("#email")[id].val().trim()]
      // }).then(function(resutlt){
      //  console.log(resutlt);
      //  location.reload();
      // });
    });
  });
});
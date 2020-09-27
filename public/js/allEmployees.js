$(document).ready(function () {
  $.get("/api/allEmployees", function (response) {
    $.get("/api/user_data").then(function (data) {
      console.log(data);
      $(".member-email").text(data.email);
      var email = $(".member-email").text();
      var id;
      console.log("here", email, response);
      for (var i = 0; i < response.length; i++) {
        if (response[i].email === email) {
          //console.log("found it", response[i].id);
          id = response[i].id;
        }
      }

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
      });
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

  $.get("/api/allRoles", function (res) {
    $.get("/api/allEmployees", function (data) {
      var roles = [];
      for (var i = 0; i < res.length; i++) {
        roles.push({ name: `${res[i].title}`, value: `${res[i].id}` });
      }
      function getRoles(roles) {
        var displayrole = [];
        var role = [];
        for (var i = 0; i < roles.length; i++) {
          displayrole = `<option value=${roles[i].value}>${roles[i].name}</option>`;
          role.push(displayrole);
        }
        return role;
      }
      function getactivesecondOption(data) {
        var option;
        for (var i = 0; i < data.length; i++) {
          if ((data[i].is_active = true)) {
            option = `<option value=false >false</option>`;
          } else {
            option = `<option value=true >true</option>`;
          }
        }
        return option;
      }
      function getmanagersecondOption(data) {
        var option;
        for (var i = 0; i < data.length; i++) {
          if ((data[i].is_manager = true)) {
            option = `<option value=false >false</option>`;
          } else {
            option = `<option value=true >true</option>`;
          }
        }
        return option;
      }
      function getadminsecondOption(data) {
        var option;
        for (var i = 0; i < data.length; i++) {
          if ((data[i].is_admin = true)) {
            option = `<option value=false >false</option>`;
          } else {
            option = `<option value=true >true</option>`;
          }
        }
        return option;
      }

      for (var i = 0; i < data.length; i++) {
        var employees = $("<div>")
          .addClass("employees")
          .attr("id", "employee" + i);
        $("#employees-section").append(employees);
        $(`#employee` + i).append(
          `Active:<select id=is_active` +
            i +
            `><option>` +
            data[i].is_active +
            `</option>` +
            getactivesecondOption(data) +
            `</select></br>`
        );
        $("#employee" + i).append(
          `First Name:<input id=first_name` +
            i +
            ` value=` +
            data[i].first_name +
            `></br>`
        );
        $(`#employee` + i).append(
          `Last Name:<input id=last_name` +
            i +
            ` value= ` +
            data[i].last_name +
            `></br>`
        );
        $(`#employee` + i).append(
          `Job Title:<select id=role_id` +
            i +
            `><option value=` +
            data[i].role_id +
            `>` +
            data[i].Role.title +
            `</option>` +
            getRoles(roles) +
            `</select></br>`
        );
        $(`#employee` + i).append(
          `Hourly Paid Amount:<input id=hourly_paid` +
            i +
            ` value= ` +
            data[i].hourly_paid +
            `></br>`
        );
        $(`#employee` + i).append(
          `Email Adress:<input id=email` +
            i +
            ` value= ` +
            data[i].email +
            `></br>`
        );
        $(`#employee` + i).append(
          `Salary:<input id=salary` +
            i +
            ` value= ` +
            data[i].Role.salary +
            `></br>`
        );
        $(`#employee` + i).append(
          `Street:<input id=street` + i + ` value= ` + data[i].street + `></br>`
        );
        $(`#employee` + i).append(
          `City:<input id=city` + i + ` value= ` + data[i].city + `></br>`
        );
        $(`#employee` + i).append(
          `Zip Code:<input id=zip_code` +
            i +
            ` value= ` +
            data[i].zip_code +
            `></br>`
        );
        $(`#employee` + i).append(
          `Country:<input id=country` +
            i +
            ` value= ` +
            data[i].country +
            `></br>`
        );
        $(`#employee` + i).append(
          `Manager:<input id=manager_id` +
            i +
            ` value= ` +
            data[i].manager_id +
            `></br>`
        );
        $(`#employee` + i).append(
          `Is Manager:<select id=is_manager` +
            i +
            `><option value=` +
            data[i].is_manager +
            `>` +
            data[i].is_manager +
            `</option>` +
            getmanagersecondOption(data) +
            `</select></br>`
        );
        $(`#employee` + i).append(
          `Is Admin:<select id=is_admin` +
            i +
            `><option value=` +
            data[i].is_admin +
            `>` +
            data[i].is_admin +
            `</option>` +
            getadminsecondOption(data) +
            `</select></br>`
        );
        $(`#employee` + i).append(
          `<button class=delete_btn id=${i}>Delete</button>`
        );
        $(`#employee` + i).append(
          `<button  class=edit_btn id=${i}>Edit</button></br></br>`
        );
      }
      // console.log(data)
      $(`.delete_btn`).on(`click`, function (event) {
        event.stopPropagation();
        var id = this.id;
        console.log(id);
        $.ajax({
          method: "DELETE",
          url: "/api/Employees/" + data[id].id,
        }).then(function (resutlt) {
          // console.log(resutlt);
          location.reload();
        });
      });

      $(".edit_btn").on("click", function (event) {
        event.preventDefault();

        var id = this.id;
        var first = $("#first_name" + id)
          .val()
          .trim();
        var last = $("#last_name" + id)
          .val()
          .trim();
        var role = $("#role_id" + id)
          .val()
          .trim();
        var hourly_paid = $("#hourly_paid" + id)
          .val()
          .trim();
        var email = $("#email" + id)
          .val()
          .trim();
        var street = $("#street" + id)
          .val()
          .trim();
        var city = $("#city" + id)
          .val()
          .trim();
        var zip_code = $("#zip_code" + id)
          .val()
          .trim();
        var country = $("#country" + id)
          .val()
          .trim();
        var is_manager = $("#is_manager" + id)
          .val()
          .trim();
        var manager_id = $("#manager_id" + id)
          .val()
          .trim();
        var is_admin = $("#is_admin" + id)
          .val()
          .trim();
        var is_active = $("#is_active" + id)
          .val()
          .trim();
        var namep = {
          id: data[id].id,
          first_name: first,
          last_name: last,
          role_id: role,
          hourly_paid: hourly_paid,
          email: email,
          street: street,
          city: city,
          zip_code: zip_code,
          country: country,
          is_manager: is_manager,
          manager_id: manager_id,
          is_admin: is_admin,
          is_active: is_active,
        };
        // console.log(namep);
        $.ajax({
          method: "PUT",
          url: "/api/updateEmp/",
          data: namep,
        }).then(function (result) {
          console.log("Success Updating Employee");
        });
        location.reload();
      });
    });
  });
});

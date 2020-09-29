$(document).ready(function () {
  $("#search").on("click", function (event) {
    var employee = $("#employee").val().trim();
    var spaceindex = employee.indexOf(" ");
    if (spaceindex != -1) {
      var length = employee.length;
      var first_name = employee.slice(0, spaceindex);
      var last_name = employee.slice(spaceindex + 1, length);
      var newemployee = {
        first_name: first_name,
        last_name: last_name
      };
      $.get("/api/searchemployee/fullname", newemployee).then(function (data) {
        var roles = [];
        $.get("/api/allRoles", function (res) {
          for (var i = 0; i < res.length; i++) {
            roles.push({ name: `${res[i].title}`, value: `${res[i].id}` });
          }
        });   
        console.log(roles);
        function getRoles(roles) {
          var displayrole = [];
          var role = [];
          for (var i = 0; i < roles.length; i++) {
            displayrole = `<option value=${roles.value}>${roles.name}</option>`
            role.push(displayrole);
          }
          return role;
        }


        function getactivesecondOption(data) {
          var option;
            if (data.is_active = true) {
              option = `<option value=false >false</option>`;
            }
            else if (data.is_active = false){
              option = `<option value=true >true</option>`;
            }
            return option
        }
       
        function getmanagersecondOption(data) {
          var option;
            if (data.is_manager = true) {
              option = `<option value=false >false</option>`;
            }
            else if (data.is_manager = false) {
              option = `<option value=true >true</option>`;
            }
            return option
        }
        function getadminsecondOption(data) {
          var option;
            if (data.is_admin = true) {
              option = `<option value=false >false</option>`;
            }
            else if (data.is_admin = false) {
              option = `<option value=true >true</option>`;
            }
            return option
        }      
       
          $(`#employees-section`).append(`Active:<select id=is_active><option>` + data.is_active + `</option>` + getactivesecondOption(data) + `</select></br>`);
          $("#employees-section").append(`First Name:<input id=first_name value=` + data.first_name + `></br>`);
          $(`#employees-section`).append(`Last Name:<input id=last_name value= ` + data.last_name + `></br>`);
          $(`#employees-section`).append(`Job Title:<select id=role_id><option value=` + data.role_id + `>` + data.Role.title + `</option>` + getRoles(roles) + `</select></br>`);
          $(`#employees-section`).append(`Hourly Paid Amount:<input id=hourly_paid value= ` + data.hourly_paid + `></br>`);
          $(`#employees-section`).append(`Email Adress:<input id=email value= ` + data.email + `></br>`);
          $(`#employees-section`).append(`Salary:<input id=salary value= ` + data.Role.salary + `></br>`);
          $(`#employees-section`).append(`Street:<input id=street value= ` + data.street + `></br>`);
          $(`#employees-section`).append(`City:<input id=city value= ` + data.city + `></br>`);
          $(`#employees-section`).append(`Zip Code:<input id=zip_code value= ` + data.zip_code + `></br>`);
          $(`#employees-section`).append(`Country:<input id=country value= ` + data.country + `></br>`);
          $(`#employees-section`).append(`Manager:<input id=manager_id value= ` + data.manager_id + `></br>`);
          $(`#employees-section`).append(`Is Manager:<select id=is_manager><option value=` + data.is_manager + `>` + data.is_manager + `</option>` + getmanagersecondOption(data) + `</select></br>`);
          $(`#employees-section`).append(`Is Admin:<select id=is_admin><option value=` + data.is_admin + `>` + data.is_admin + `</option>` + getadminsecondOption(data) + `</select></br>`);
          $(`#employees-section`).append(`<button class=delete_btn >Delete</button>`);
          $(`#employees-section`).append(`<button  class=edit_btn >Edit</button></br></br>`);
    
        // console.log(data)
        $(`.delete_btn`).on(`click`, function (event) {
          event.stopPropagation();
          var id = this.id;
          console.log(id);
          $.ajax({
            method: "DELETE",
            url: "/api/Employees/" + data[id].id
          }).then(function (resutlt) {
            // console.log(resutlt);
            location.reload();
          });
        });

        $(".edit_btn").on("click", function (event) {
          event.preventDefault();

          var id = this.id;
          var first = $("#first_name").val().trim();
          var last = $("#last_name").val().trim();
          var role = $("#role_id").val().trim();
          var hourly_paid = $("#hourly_paid").val().trim();
          var email = $("#email").val().trim();
          var street = $("#street").val().trim();
          var city = $("#city").val().trim();
          var zip_code = $("#zip_code").val().trim();
          var country = $("#country").val().trim();
          var is_manager = $("#is_manager").val().trim();
          var manager_id = $("#manager_id").val().trim();
          var is_admin = $("#is_admin").val().trim();
          var is_active = $("#is_active").val().trim();
          var namep = {
            id:id,
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
    }
    else {
     
      $.get("/api/searchemployee/?", { first_name: employee }).then(function (data) {
        if (data != null) {
          console.log(data);
          var roles = [];
          $.get("/api/allRoles", function (res) {
            for (var i = 0; i < res.length; i++) {
              roles.push({ name: `${res[i].title}`, value: `${res[i].id}` });
            }
          });   
          console.log(roles);
          function getRoles(roles) {
            var displayrole = [];
            var role = [];
            for (var i = 0; i < roles.length; i++) {
              displayrole = `<option value=${roles.value}>${roles.name}</option>`
              role.push(displayrole);
            }
            return role;
          }
  
  
          function getactivesecondOption(data) {
            var option;
              if (data.is_active = true) {
                option = `<option value=false >false</option>`;
              }
              else if (data.is_active = false){
                option = `<option value=true >true</option>`;
              }
              return option
          }
         
          function getmanagersecondOption(data) {
            var option;
              if (data.is_manager = true) {
                option = `<option value=false >false</option>`;
              }
              else if (data.is_manager = false) {
                option = `<option value=true >true</option>`;
              }
              return option
          }
          function getadminsecondOption(data) {
            var option;
              if (data.is_admin = true) {
                option = `<option value=false >false</option>`;
              }
              else if (data.is_admin = false) {
                option = `<option value=true >true</option>`;
              }
              return option
          }      
         
            $(`#employees-section`).append(`Active:<select id=is_active><option>` + data.is_active + `</option>` + getactivesecondOption(data) + `</select></br>`);
            $("#employees-section").append(`First Name:<input id=first_name value=` + data.first_name + `></br>`);
            $(`#employees-section`).append(`Last Name:<input id=last_name value= ` + data.last_name + `></br>`);
            $(`#employees-section`).append(`Job Title:<select id=role_id><option value=` + data.role_id + `>` + data.Role.title + `</option>` + getRoles(roles) + `</select></br>`);
            $(`#employees-section`).append(`Hourly Paid Amount:<input id=hourly_paid value= ` + data.hourly_paid + `></br>`);
            $(`#employees-section`).append(`Email Adress:<input id=email value= ` + data.email + `></br>`);
            $(`#employees-section`).append(`Salary:<input id=salary value= ` + data.Role.salary + `></br>`);
            $(`#employees-section`).append(`Street:<input id=street value= ` + data.street + `></br>`);
            $(`#employees-section`).append(`City:<input id=city value= ` + data.city + `></br>`);
            $(`#employees-section`).append(`Zip Code:<input id=zip_code value= ` + data.zip_code + `></br>`);
            $(`#employees-section`).append(`Country:<input id=country value= ` + data.country + `></br>`);
            $(`#employees-section`).append(`Manager:<input id=manager_id value= ` + data.manager_id + `></br>`);
            $(`#employees-section`).append(`Is Manager:<select id=is_manager><option value=` + data.is_manager + `>` + data.is_manager + `</option>` + getmanagersecondOption(data) + `</select></br>`);
            $(`#employees-section`).append(`Is Admin:<select id=is_admin><option value=` + data.is_admin + `>` + data.is_admin + `</option>` + getadminsecondOption(data) + `</select></br>`);
            $(`#employees-section`).append(`<button class=delete_btn >Delete</button>`);
            $(`#employees-section`).append(`<button  class=edit_btn >Edit</button></br></br>`);
      
          // console.log(data)
          $(`.delete_btn`).on(`click`, function (event) {
            event.stopPropagation();
            var id = this.id;
            console.log(id);
            $.ajax({
              method: "DELETE",
              url: "/api/Employees/" + data[id].id
            }).then(function (resutlt) {
              // console.log(resutlt);
              location.reload();
            });
          });
  
          $(".edit_btn").on("click", function (event) {
            event.preventDefault();
  
            var id = this.id;
            var first = $("#first_name").val().trim();
            var last = $("#last_name").val().trim();
            var role = $("#role_id").val().trim();
            var hourly_paid = $("#hourly_paid").val().trim();
            var email = $("#email").val().trim();
            var street = $("#street").val().trim();
            var city = $("#city").val().trim();
            var zip_code = $("#zip_code").val().trim();
            var country = $("#country").val().trim();
            var is_manager = $("#is_manager").val().trim();
            var manager_id = $("#manager_id").val().trim();
            var is_admin = $("#is_admin").val().trim();
            var is_active = $("#is_active").val().trim();
            var namep = {
              id:id,
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
          })
        }
        else {
          $.get("/api/searchemployeelast/?", { last_name: employee }).then(function (data) {
            console.log(data);
            var roles = [];
            $.get("/api/allRoles", function (res) {
              for (var i = 0; i < res.length; i++) {
                roles.push({ name: `${res[i].title}`, value: `${res[i].id}` });
              }
            });   
            console.log(roles);
            function getRoles(roles) {
              var displayrole = [];
              var role = [];
              for (var i = 0; i < roles.length; i++) {
                displayrole = `<option value=${roles.value}>${roles.name}</option>`
                role.push(displayrole);
              }
              return role;
            }
    
    
            function getactivesecondOption(data) {
              var option;
                if (data.is_active = true) {
                  option = `<option value=false >false</option>`;
                }
                else if (data.is_active = false){
                  option = `<option value=true >true</option>`;
                }
                return option
            }
           
            function getmanagersecondOption(data) {
              var option;
                if (data.is_manager = true) {
                  option = `<option value=false >false</option>`;
                }
                else if (data.is_manager = false) {
                  option = `<option value=true >true</option>`;
                }
                return option
            }
            function getadminsecondOption(data) {
              var option;
                if (data.is_admin = true) {
                  option = `<option value=false >false</option>`;
                }
                else if (data.is_admin = false) {
                  option = `<option value=true >true</option>`;
                }
                return option
            }      
           
              $(`#employees-section`).append(`Active:<select id=is_active><option>` + data.is_active + `</option>` + getactivesecondOption(data) + `</select></br>`);
              $("#employees-section").append(`First Name:<input id=first_name value=` + data.first_name + `></br>`);
              $(`#employees-section`).append(`Last Name:<input id=last_name value= ` + data.last_name + `></br>`);
              $(`#employees-section`).append(`Job Title:<select id=role_id><option value=` + data.role_id + `>` + data.Role.title + `</option>` + getRoles(roles) + `</select></br>`);
              $(`#employees-section`).append(`Hourly Paid Amount:<input id=hourly_paid value= ` + data.hourly_paid + `></br>`);
              $(`#employees-section`).append(`Email Adress:<input id=email value= ` + data.email + `></br>`);
              $(`#employees-section`).append(`Salary:<input id=salary value= ` + data.Role.salary + `></br>`);
              $(`#employees-section`).append(`Street:<input id=street value= ` + data.street + `></br>`);
              $(`#employees-section`).append(`City:<input id=city value= ` + data.city + `></br>`);
              $(`#employees-section`).append(`Zip Code:<input id=zip_code value= ` + data.zip_code + `></br>`);
              $(`#employees-section`).append(`Country:<input id=country value= ` + data.country + `></br>`);
              $(`#employees-section`).append(`Manager:<input id=manager_id value= ` + data.manager_id + `></br>`);
              $(`#employees-section`).append(`Is Manager:<select id=is_manager><option value=` + data.is_manager + `>` + data.is_manager + `</option>` + getmanagersecondOption(data) + `</select></br>`);
              $(`#employees-section`).append(`Is Admin:<select id=is_admin><option value=` + data.is_admin + `>` + data.is_admin + `</option>` + getadminsecondOption(data) + `</select></br>`);
              $(`#employees-section`).append(`<button class=delete_btn >Delete</button>`);
              $(`#employees-section`).append(`<button  class=edit_btn >Edit</button></br></br>`);
        
            // console.log(data)
            $(`.delete_btn`).on(`click`, function (event) {
              event.stopPropagation();
              var id = this.id;
              console.log(id);
              $.ajax({
                method: "DELETE",
                url: "/api/Employees/" + data[id].id
              }).then(function (resutlt) {
                // console.log(resutlt);
                location.reload();
              });
            });
    
            $(".edit_btn").on("click", function (event) {
              event.preventDefault();
    
              var id = this.id;
              var first = $("#first_name").val().trim();
              var last = $("#last_name").val().trim();
              var role = $("#role_id").val().trim();
              var hourly_paid = $("#hourly_paid").val().trim();
              var email = $("#email").val().trim();
              var street = $("#street").val().trim();
              var city = $("#city").val().trim();
              var zip_code = $("#zip_code").val().trim();
              var country = $("#country").val().trim();
              var is_manager = $("#is_manager").val().trim();
              var manager_id = $("#manager_id").val().trim();
              var is_admin = $("#is_admin").val().trim();
              var is_active = $("#is_active").val().trim();
              var namep = {
                id:id,
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
            })
          })
        }
      });
    }
  });
});

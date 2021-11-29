"use strict";
let userData;

$(document).ready(function () {
  $(".nav > li > a").click(function (e) {
    $(".nav > li > a").removeClass("active");
    $(this).addClass("active");
  });

  //Ajax call
  $.ajax({
    url: "../login.json",
    dataType: "json",
    type: "get",
    data: {},
    success: function (data) {
      userData = data;
    },
    error: function () {
      alert("Unable to login");
    },
  });

  // Modal button
  $("#add-btn").click(function () {
    $.map(userData, function (Obj) {
      if (
        Obj.email == $("#email").val() &&
        Obj.password == $("#password").val()
      ) {
        localStorage.setItem("name", Obj.firstname);
        localStorage.setItem("lname", Obj.lastname);
        localStorage.setItem("email", Obj.email);
        localStorage.setItem("mobile", Obj.mobile);
        localStorage.setItem("loginName", Obj.loginName);

        // Redirecting to home page
        window.location = "index.html";
      } else {
        $("#email").css("border", "1px solid red");
        $("#password").css("border", "1px solid red");
      }
    });
  });

  // Logout function
  $(".logout-btn").click(function () {
    if (localStorage.length > 0) {
      localStorage.clear();
      window.location = "index.html";
    }
  });

  // Reset function
  function resetInputs() {
    $("#fname").val("");
    $("#lname").val("");
    $("#emailId").val("");
    $("#mobno").val("");
    $("#city").val("");
  }
  //Search contacts
  $("#search").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#table-body tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Adding contacts
  let index = 1;
  $("#contact-btn").click(function (e) {
    e.preventDefault();
    let fName = document.getElementById("fname").value;
    let lName = document.getElementById("lname").value;
    let emailId = document.getElementById("emailId").value;
    let mobNumber = document.getElementById("mobno").value;
    let cityVal = document.getElementById("city").value;

    let myArray = [];

    let myObj = {
      firstName: fName,
      lastName: lName,
      eMailId: emailId,
      mobileNo: mobNumber,
      cityName: cityVal,
    };
    if (
      fName == "" ||
      lName == "" ||
      emailId == "" ||
      mobNumber == "" ||
      cityVal == ""
    ) {
      return;
    }

    myArray.push(myObj);
    buildTable(myObj);

    function buildTable(data) {
      resetInputs();
      let table = document.getElementById("table-body");
      let row = "";

      for (var i = 0; i <= myArray.length; i++) {
        row = `<tr id=${index}_index>
        <td >${index}</td>
        <td id=${index}firstName>${myArray[i]["firstName"]}</td>
        <td id=${index}lastName>${myArray[i]["lastName"]}</td>
        <td id=${index}eMailId>${myArray[i]["eMailId"]}</td>
        <td id=${index}mobileNo>${myArray[i]["mobileNo"]}</td>
        <td id=${index}cityName>${myArray[i]["cityName"]}</td>
        <td id=${index}_icon><i class="fas fa-edit" onClick="edit(${index});"></i></td>
        <td id=${index}_icon><i class="fas fa-trash" onClick="del(${index});"></i></td>
        </tr>`;

        table.innerHTML += row;
        index += 1;
      }
    }
  });
});
// Edit button
function edit(index) {
  let x = document.getElementById(index + "_index");
  if (x.contentEditable == "true") {
    x.contentEditable = "false";
  } else {
    x.contentEditable = "true";
  }
}

// Delete button
function del(index) {
  document.getElementById(index + "_index").style.display = "none";
}

setTimeout(function () {
  document.addEventListener("DOMContentLoaded", function () {
    let username = "test";
    let password = "test";

    let usernameField = document.getElementById("loginform-email");
    let passwordField = document.getElementById("password");

    if (usernameField && passwordField) {
      console.log(
        "Autofilling login form with username:",
        username,
        "and password:",
        password
      );

      usernameField.value = username;
      passwordField.value = password;
    } else {
      console.log(
        "Could not find username and/or password input fields on page."
      );
    }
  });
}, 4500); 


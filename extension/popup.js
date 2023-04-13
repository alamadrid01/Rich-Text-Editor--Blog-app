document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log(username);

    chrome.runtime.sendMessage(
      { username: username, password: password },
      function (response) {
        if (response.success) {
              chrome.tabs.query(
                { active: true, currentWindow: true },
                (tabs) => {
                  chrome.tabs.create({
                    url: "https://members.helium10.com/user/signin",
                    index: tabs[0].index + 1,
                  });
                }
              );
        } else {
          alert("Invalid login credentials.");
        }
      }
    );
  });
});

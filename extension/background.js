chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  fetch("http://localhost:5001/api/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: request.username,
      password: request.password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false });
      }
    })
    .catch((error) => {
      sendResponse({ success: false });
    });

  return true;
});

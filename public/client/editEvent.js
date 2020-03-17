const result = document.getElementById('response');
socket.on('updated', (userdata) => {
  const {
    requestId, user, loggedInUser, managerId,
  } = userdata;
  if (loggedInUser.id === user.id || managerId === loggedInUser.id) {
    notifyMe(requestId, user.email, user.firstName);
    const newEl = document.createElement('li');
    newEl.innerHTML += `<div id="new">${userdata.notify}</div>`;
    result.prepend(newEl);
  }
});


const notifyMe = (requestId, message, user) => {
  if (Notification.permission === 'granted') {
    const options = {
      body: message,
      dir: 'ltr',
    };
    const notification = new Notification(`${user} modified a trip request`, options);
    notification.onclick = (event) => {
      event.preventDefault();
      window.open(`http://${window.location.host}/api/v1/trips/request/${requestId}`, '_blank');
    };
  }
};


const socket = io();
if (!('Notification' in window)) {
  alert('This browser does not support desktop notification');
} else if (Notification.permission !== 'denied') {
  Notification.requestPermission((permission) => {
    if (!('permission' in Notification)) {
      Notification.permission = permission;
    }
  });
}


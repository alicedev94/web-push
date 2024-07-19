import './style.css'

const PUBLIC_VAPID_KEY: string = "BFzXUz1v9U0fNreD5B7-iFLlvolYyegV8zOvPPhybQm0Cq0jNeYn7hD_O-L-LXqPzTNiyHZYQjqQRNN8NwBrCkM";
const route: string = "http://localhost:3000"

const subscription = async (): Promise<void> => {
  // Service Worker
  console.log("Registering a Service worker");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("New Service Worker");

  // Listen Push Notifications
  console.log("Listening Push Notifications");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log(subscription);

  // Send Notification
  await fetch(route + "/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Subscribed!");
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Service Worker Support
if ("serviceWorker" in navigator) {
  subscription().catch((err: any) => console.log(err));
}

// UI
fetch(route + '/new-message', {
  method: 'POST',
  body: JSON.stringify({ message: "ALICEDEV94" }),
  headers: {
    'Content-Type': 'application/json'
  }
});


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<h1>Typescript</h1>
`

import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import { registerSW } from "virtual:pwa-register";
export default function App() {
  const publicVapidKey = 'BPMAv11HBqKEVzKyaVO3z3jS3JnN30clZChAWS7vpAHAK2et1jRl6YNREIAXbUbflbdkQxUx6haVzXbG-ur6gqk';

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerSW({ immediate: true })
      send().catch(err => console.log(err));
    }

    async function send() {
      const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"

      });
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });
      await axios.post("http://localhost:8080/api/v1/therapist/notification-sw/656bf1890d77cce511556287", subscription)
      // await axios.post("https://mind-care-backend-7dd9b4794b38.herokuapp.com/api/v1/therapist/notification-sw/656bf1890d77cce511556287", subscription)
    }
  }, []);

  return (
    <div>
      <h1>Web Push</h1>
    </div>
  );
}
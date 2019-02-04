import {initializeApp} from 'firebase'

const app = initializeApp({
    apiKey: "AIzaSyAEL7t3qcwYBmWTyeTSdaZoysXsKHHB-VQ",
    authDomain: "fuel-manager-d9581.firebaseapp.com",
    databaseURL: "https://fuel-manager-d9581.firebaseio.com",
    projectId: "fuel-manager-d9581",
    storageBucket: "",
    messagingSenderId: "854632812853"
  })

  export const db = app.database()
  export const refuelsRef = db.ref('refuels')
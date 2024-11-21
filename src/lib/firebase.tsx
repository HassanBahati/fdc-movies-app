import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  connectDataConnectEmulator,
  getDataConnect,
} from "firebase/data-connect";
import { connectorConfig } from "@firebasegen/default-connector";
import { createContext } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebaseApp);
const dataconnect = getDataConnect(firebaseApp, connectorConfig);

if (process.env.NODE_ENV === "development") {
  connectDataConnectEmulator(
    dataconnect,
    window.location.hostname,
    undefined,
    true
  );
}

const AuthContext = createContext(auth);

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };

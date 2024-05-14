"use client";

import styles from "./index.module.css";

export default function LoginWithGoogle() {
  const redirectToGoogleLogin = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_SERVER_BASE_URI}/auth/google`;
    window.location.href = redirectUri;
  };

  return (
    <div className={styles.center}>
      <div className={styles.card}>
        <h2 onClick={redirectToGoogleLogin}>Login with Google</h2>
      </div>
    </div>
  );
}

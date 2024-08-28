import { SignUpButton, SignInButton, UserButton } from "@clerk/nextjs";
import styles from './page.module.css'; 

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.appBar}>
        <h1>App Title</h1>
        <div>
          <SignUpButton mode="modal">
            <button>Sign Up</button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button>Login</button>
          </SignInButton>
          <UserButton />
        </div>
      </header>

      <main className={styles.mainContent}>
        <h2 className={styles.title}>Title</h2>

        <div className={styles.contentRow}>
          <div className={styles.demoVideo}>
            <p>Demo Video</p>
          </div>
          <div className={styles.statement}>
            <p>Statement</p>
          </div>
        </div>

        <button className={styles.getStarted}>Get Started</button>

        <div className={styles.bullets}>
          <p>Bullets go here</p>
        </div>

        <div className={styles.eyecatchers}>
          <div className={styles.eyecatcher}>
            <p>Eyecatcher 1</p>
          </div>
          <div className={styles.eyecatcher}>
            <p>Eyecatcher 2</p>
          </div>
          <div className={styles.eyecatcher}>
            <p>Eyecatcher 3</p>
          </div>
        </div>
      </main>
    </div>
  );
}

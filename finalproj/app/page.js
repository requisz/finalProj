// page.js
import { SignUpButton, SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <header>
        <nav>
          <SignUpButton mode="modal">
            <button>Sign Up</button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button>Sign In</button>
          </SignInButton>
          <UserButton />
        </nav>
      </header>

      <main>
        <h1>Welcome to the App</h1>
        <p>This is your home page content.</p>
      </main>
    </div>
  );
}

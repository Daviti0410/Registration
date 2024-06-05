import { useRouter } from "next/navigation";

export default function MyButton({
  loginName,
  email,
  password,
  confirmPassword,
  setLoginName,
  setEmail,
  setPassword,
  setConfirmPassword,
  apiUrl,
}) {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!loginName || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/registerUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setLoginName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Registration successful!");
      router.push("/Log-In");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(`Registration failed: ${error.message}`);
    }
  }

  return (
    <button
      type="submit"
      className="btn-gradient text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleSubmit}
    >
      Sign Up
    </button>
  );
}

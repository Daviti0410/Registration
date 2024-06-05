import { useRouter } from "next/navigation";

export default function MyLoginButton({
  loginName,
  password,
  apiUrl,
  setLoginName,
  setPassword,
}) {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!loginName || !password) {
      alert("All fields are required");
    }
    try {
      const response = await fetch(`${apiUrl}/getUser`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (loginName != data.loginName || password != data.password) {
        throw new Error(`Invalid Login or Password`);
      }

      setLoginName("");
      setPassword("");
      alert("Registration successful!");
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(`Registration failed: ${error.message}`);
    }
  }

  return (
    <button
      type="submit"
      className="btn-gradient text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onChange={handleSubmit}
    >
      Login
    </button>
  );
}

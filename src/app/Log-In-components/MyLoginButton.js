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
      return;
    }

    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loginName, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Login failed: ${error.message}`);
      return;
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    setLoginName("");
    setPassword("");
    alert("Login successful!");
    router.push("/");
  }

  return (
    <button
      type="submit"
      className="btn-gradient text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleSubmit}
    >
      Login
    </button>
  );
}

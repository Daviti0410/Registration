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
    event.preventDefault(); // Prevent default form submission behavior

    if (!loginName || !password) {
      alert("All fields are required");
      return;
    }

    const url = new URL(`${apiUrl}/getUser`);
    url.searchParams.append("loginName", loginName);
    url.searchParams.append("password", password);

    try {
      const response = await fetch(url.toString(), {
        method: "GET", // Using GET method
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json(); // Await the JSON response

      if (data.error) {
        throw new Error(data.error);
      }

      setLoginName("");
      setPassword("");
      alert("Login successful!");
      router.push("/"); // Navigate to the main page
    } catch (error) {
      console.error("Login failed:", error);
      alert(`Login failed: ${error.message}`);
    }
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

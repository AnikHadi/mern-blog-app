"use server";

export async function signup(prevState, queryData) {
  const username = queryData.get("username");
  const email = queryData.get("email");
  const password = queryData.get("password");

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
}

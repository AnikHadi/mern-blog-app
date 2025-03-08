"use server";

export async function signin(prevState, queryData) {
  const email = queryData.get("email");
  const password = queryData.get("password");

  try {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
}

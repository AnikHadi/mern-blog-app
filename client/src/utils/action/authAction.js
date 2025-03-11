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

export async function signin(prevState, queryData) {
  const email = queryData.get("email");
  const password = queryData.get("password");

  if (!email || !password || email === "" || password === "") {
    return { success: false, message: "All fields are required" };
  }

  try {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}

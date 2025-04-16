"use server";

export async function imageUpload(file) {
  try {
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "mern-blog");
    imageData.append("cloud_name", "dmxub0wye");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmxub0wye/image/upload",
      {
        method: "POST",
        body: imageData,
      }
    );
    const data = await res.json();
    return data.url;
  } catch (error) {
    return error;
  }
}

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

export async function updateProfile(prevState, queryData) {
  const username = queryData.get("username");
  const email = queryData.get("email");
  const password = queryData.get("password");
  const avatar = queryData.get("avatar");

  const userInfo = {};
  userInfo.username = username;
  userInfo.email = email;
  if (password) {
    userInfo.password = password;
  }

  try {
    // Uploading profile image to cloudinary
    if (avatar?.size > 0) {
      // async function imageUpload() {
      //   const imageData = new FormData();
      //   imageData.append("file", avatar);
      //   imageData.append("upload_preset", "mern-blog");
      //   imageData.append("cloud_name", "dmxub0wye");

      //   const res = await fetch(
      //     "https://api.cloudinary.com/v1_1/dmxub0wye/image/upload",
      //     {
      //       method: "POST",
      //       body: imageData,
      //     }
      //   );
      //   const data = await res.json();
      //   userInfo.avatar = await data.url;
      // }
      // await imageUpload();
      const imageUrl = await imageUpload(avatar);
      userInfo.avatar = imageUrl;
    }

    // Updating user profile
    const res = await fetch(`/api/user/update/${prevState.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

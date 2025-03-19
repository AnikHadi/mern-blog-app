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
      async function imageUpload() {
        const imageData = new FormData();
        imageData.append("file", avatar);
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
        userInfo.avatar = await data.url;
      }
      await imageUpload();
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

export async function deleteProfile(userId) {
  try {
    const res = await fetch(`/api/user/delete/${userId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

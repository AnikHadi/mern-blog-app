export async function getAllUsers(
  startIndex = 0,
  limit = 9,
  order = "desc" // default order is "desc" or "asc"
) {
  try {
    const res = await fetch(
      `/api/user/get-users?&order=${order}&limit=${limit}&startIndex=${startIndex}`
    );
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

export async function signOutAction() {
  try {
    const res = await fetch(`/api/user/signout`, {
      method: "POST",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

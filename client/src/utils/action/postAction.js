export async function createPost(postData) {
  if (!postData.image) {
    delete postData.image; // remove image property if not provided
  }
  if (!postData.category) {
    delete postData.category; // remove category property if not provided
  }
  try {
    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function getPost(
  userId = "",
  startIndex = 0,
  category = "",
  slug = "",
  postId = "",
  searchTerm = "",
  order = "desc", // default order is "desc" or "asc"
  limit = 9
) {
  try {
    const res = await fetch(
      `/api/post/get-posts?userId=${userId}&startIndex=${startIndex}&category=${category}&slug=${slug}&postId=${postId}&searchTerm=${searchTerm}&order=${order}&limit=${limit}`
    );
    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function deletePost(postId, userId) {
  if (!postId) {
    return { success: false, message: "Post ID is required" };
  }
  if (!userId) {
    return { success: false, message: "User ID is required" };
  }
  // Check if the user is an admin or the owner of the
  try {
    const res = await fetch(`/api/post/delete-post/${postId}/${userId}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function updatePost(postId, postData) {
  if (!postId) {
    return { success: false, message: "Post ID is required" };
  }
  if (!postData) {
    return { success: false, message: "Post data is required" };
  }
  try {
    const res = await fetch(`/api/post/edit/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}

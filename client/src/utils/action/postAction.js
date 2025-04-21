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

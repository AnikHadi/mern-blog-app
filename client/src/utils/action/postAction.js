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

export async function getPost(userId, category, slug, postId, searchTerm) {
  try {
    const res = await fetch(
      `/api/post/get-posts?userId=${userId}&category=${category}&slug=${slug}&postId=${postId}&searchTerm=${searchTerm}`
    );
    return await res.json();
  } catch (error) {
    return error;
  }
}

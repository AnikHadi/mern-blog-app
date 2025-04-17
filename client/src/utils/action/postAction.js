export async function createPost(postData) {
  if (!postData.image) {
    delete postData.image; // remove image property if not provided
  }
  if (!postData.category) {
    // postData.category = "67de83d02691fd0db88a2f2e"; // default category is "Uncategorized"
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

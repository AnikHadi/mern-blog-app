export async function createPost(postData) {
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

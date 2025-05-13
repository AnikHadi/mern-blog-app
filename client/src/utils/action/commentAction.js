"use server";

export async function getAllComment(postId) {
  try {
    const res = await fetch(`/api/comment/getComments/${postId}`);
    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function createComment(data, postId, userId) {
  try {
    const res = await fetch(`/api/comment/create/${postId}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function likeComment(commentId) {
  try {
    const res = await fetch(`/api/comment/likeComment/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}

"use server";

export async function getAllComment() {
  try {
    const res = await fetch("/api/comment/getAllComments");
    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function getAllSinglePostComment(postId) {
  try {
    const res = await fetch(`/api/comment/getSinglePostComments/${postId}`);
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
export async function editComment(commentId, data) {
  try {
    const res = await fetch(`/api/comment/editComment/${commentId}`, {
      method: "PUT",
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

export async function deleteComment(commentId) {
  try {
    const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}

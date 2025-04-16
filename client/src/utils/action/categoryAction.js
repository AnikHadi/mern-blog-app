"use server";

export async function getAllCategories() {
  try {
    const res = await fetch("/api/category/all");
    return await res.json();
  } catch (error) {
    return error;
  }
}
export async function createCategory(categoryData) {
  try {
    const res = await fetch("/api/category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    return await res.json();
  } catch (error) {
    return error;
  }
}

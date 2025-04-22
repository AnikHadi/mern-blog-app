export const updateSearchParams = (key, value) => {
  if ("URLSearchParams" in window) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    history.pushState(null, "", url);
  }
};

export const deleteSearchParams = (key) => {
  if ("URLSearchParams" in window) {
    const url = new URL(window.location);
    url.searchParams.delete(key);
    history.pushState(null, "", url);
  }
};

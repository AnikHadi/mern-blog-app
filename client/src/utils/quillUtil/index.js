export const theme = "snow";

export const placeholder = "Enter your content to compose an epic...";

export const modules = {
  history: {
    // Enable with custom configurations
    delay: 2500,
    userOnly: true,
  },
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["direction", { align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ script: "sub" }, { script: "super" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    ["code-block", "code"],
    [{ color: [] }, { background: [] }],
    ["clean"],
    ["formula"],
    ["blockquote"],
    ["font"],
    // ["emoji"],
    // ["hr"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "direction",
  "align",
  "list",
  "indent",
  "script",
  "size",
  "header",
  "link",
  "image",
  "video",
  "code-block",
  "code",
  "color",
  "background",

  "formula",
  "blockquote",
  "font",
  // "bullet",
  // "emoji",
  // "clean",
];

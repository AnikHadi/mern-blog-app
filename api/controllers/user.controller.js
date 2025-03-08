export const test = (req, res) => {
  res.json({ message: "Welcome to the User API Routes!" });
};

export const getUsers = async (req, res) => {
  //   const users = await User.find();
  res.json("users");
};

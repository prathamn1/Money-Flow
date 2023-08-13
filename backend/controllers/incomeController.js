const incomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  const { userId, title, amount, date, description, category, type } = req.body;
  const incomeTransaction = incomeSchema({
    userId,
    title,
    amount,
    date,
    description,
    category,
  });

  try {
    if (!userId) {
      return res.status(400).json("message : UserId not Present or Invalid");
    } else if (!title || !category || !date || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    } else if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive value " });
    }

    // console.log(req.body)
    // console.log(incomeTransaction)

    await incomeTransaction.save();

    return res
      .status(200)
      .json({ message: "Income transaction Added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error! Please Try Again" });
  }
};

exports.getAllIncomes = async (req, res) => {
  try {
    const { userId } = req.params;
    const allIncomes = await incomeSchema
      .find({ userId: userId })
      .sort({ createdAt: -1 });
    res.status(200).json(allIncomes);
  } catch (error) {
    return res.status(500).json({ message: "Server Error! Please Try Again" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { transactId } = req.params; // here transactId parameter must be same as defined in route request
  // console.log(req);
  // console.log(transactId);
  incomeSchema
    .findByIdAndDelete(transactId)
    .then(() => {
      return res.status(200).json({ message: "income Deleted" });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Server Error! Please Try Again" });
    });
};

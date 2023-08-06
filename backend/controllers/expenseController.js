const expenseSchema = require('../models/expenseModel')



exports.addExpense = async (req,res) => {
    const {title, amount, date, description, category} = req.body;
    const expenseTransaction = expenseSchema ( {
        title,
        amount,
        date,
        description,
        category
    });
    // console.log(req.body);
    try {
        if(!title || !category || !date || !amount) {
            return res.status(400).json({message : 'All fields are required'})
        }
        if(amount<=0 ) {
            return res.status(400).json({message : 'Amount must be a positive value '})
        }

        // console.log(req.body)
        // console.log(expenseTransaction)

        await expenseTransaction.save();

        return res.status(200).json({message : 'Expense transaction Added successfully'})

    } catch (error) {
        return res.status(500).json({message : 'Server Error! Please Try Again'})
    }
}


exports.getAllExpenses = async (req,res) => {

    try {
        const allExpenses = await expenseSchema.find().sort({createdAt : -1})
        res.status(200).json(allExpenses);

    } catch (error) {
        return res.status(500).json({message : 'Server Error! Please Try Again'})
    }
}

// exports.deleteExpense = async (req,res) => {
//     const { transactId } =req.params;   // here transactId parameter must be same as defined in route request
//     // console.log(req);
//     // console.log(transactId);
//     expenseSchema.findByIdAndDelete(transactId)
//         .then(()=> {
//             return res.status(200).json({message : "Expense Deleted Successfully"});
//         }).catch((err) => {
//             return res.status(500).json({message : "Server Error! Please Try Again"});
//         }) 
// }

exports.deleteExpense = async (req, res) => {
    try {
      const { transactId } = req.params;
      await expenseSchema.findByIdAndDelete(transactId);
      return res.status(200).json({ message: "Expense Deleted Successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error! Please Try Again" });
    }
  };
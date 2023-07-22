const IncomeSchema = require('../models/incomeModel')



exports.addIncome = async (req,res) => {
    const {title, amount, date, description, category,type} = req.body;
    const incomeTransaction = IncomeSchema ( {
        title,
        amount,
        date,
        description,
        category
    });
    
    try {
        if(!title || !category || !date || !description || !amount) {
            return res.status(400).json({message : 'All fields are required'})
        }
        if(amount<=0 || !(typeof amount==='number')) {
            return res.status(400).json({message : 'Amount must be a positive value '})
        }

        // console.log(req.body)
        // console.log(incomeTransaction)

        await incomeTransaction.save();

        return res.status(200).json({message : 'Income transaction Added successfully'})

    } catch (error) {
        return res.status(500).json({message : 'Server Error! Please Try Again'})
    }
}


exports.getAllIncomes = async (req,res) => {
    
    try {
        const allIncomes = await IncomeSchema.find().sort({createdAt : -1})
        res.status(200).json(allIncomes);

    } catch (error) {
        return res.status(500).json({message : 'Server Error! Please Try Again'})
    }
}

exports.deleteIncome = async (req,res) => {
    const { transactId } =req.params;   // here transactId parameter must be same as defined in route request
    // console.log(req);
    // console.log(transactId);
    IncomeSchema.findByIdAndDelete(transactId)
        .then(()=> {
            return res.status(200).json({message : "income Deleted"});
        }).catch((err) => {
            return res.status(500).json({message : "Server Error! Please Try Again"});
        }) 
}
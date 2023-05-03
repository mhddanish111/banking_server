const mongoose = require("mongoose");
const AccountType = require("../models/AccountType");
const AccountCategory = require("../models/AccountCategory");

module.exports = {
  createAccount: async (req) => {
    try {
      const { name, type } = req?.typeInput;
      const existAccountType = await AccountType.findOne({ name: name });
      if (existAccountType) {
        return { message: `${name} already exist` };
      }
      const typeData = new AccountType({
        name,
        type,
        isActive: true,
      });
      return await typeData.save();
    } catch (err) {
      throw err;
    }
  },
  createCategory: async (req) => {
    try {
      const { name, benefit, accountTypeId, minAmount, maxAmount, limit, charge } = req?.categoryInput;
      const categoryProps = await AccountCategory.findOne({
        accountTypeId,
        name,
      });
      if (categoryProps) {
        return { message: `${name} already exist` };
      }
      const categoryData = new AccountCategory({
        name,
        benefit,
        isActive: true,
        minAmount,
        maxAmount,
        limit,
        charge,
        accountTypeId: mongoose.Types.ObjectId(accountTypeId),
      });
      return await categoryData.save();
    } catch (err) {
      throw err;
    }
  },
  getAccountType: async () => {
    return new Promise((resolve, reject) => {
      return AccountType.aggregate([
        {
          $lookup: {
            from: "accountcategories",
            as: "category",
            let: { accountTypeId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$accountTypeId", "$$accountTypeId"] },
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            isActive: 1,
            type:1,
            category: 1,
          },
        },
      ]).exec(async (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  },
  getAccountCategory: async () => {
    try{
     const category = await AccountCategory.find().populate({path:'accountTypeId', select:['name', 'type']});
     return category;
    } catch(err){
        throw err;
    }
  },
};

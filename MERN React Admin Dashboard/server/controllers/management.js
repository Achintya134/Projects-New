import mongoose from 'mongoose'
import User from "../model/User.js"
import Transaction from '../model/Transactions.js'

export const getAdmins = async(req,res)=>{
    try{
        const admin = await User.find({role:"admin"}).select("-password")
        res.status(200).json(admin)
    }catch(error){
        res.status(404).json({message:error.message})
    }

}


export const getPerformance = async(req,res) => {
    try{
        const {id} = req.params
        const userWithStats=await User.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(id)}},
            {
                $lookup: {
                    from: "affiliatestats",
                    localField:"_id",
                    foreignField:"userId",
                    as:"affiliateStats"

                }
            },
            {$unwind: "$affiliateStats"}
        ])

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id)=>{
                return Transaction.findById(id)
            })
        )

        const filteredStat = saleTransactions.filter(
            (transaction) => transaction!== null
        )
        
        res.status(200).json({user: userWithStats[0], sales: filteredStat})
    }catch(error){
        res.status(404).json({message:error.message})
    }

}



const expenditure =[];

const addExpenditure = (userid, storeName, itemName, amountSpent, dateOfExpenditure) =>{
    if(!itemName || !storeName || !amountSpent || !dateOfExpenditure){
        return 'Information Missing'
    }
    expenditure.push({expId:newExpId(), userid, itemName, storeName, amountSpent, dateOfExpenditure});
    msg="Expense added successfully."
    return msg;
}

const getAllExpenses = (userid) => {
    const getExpenses = expenditure.filter(e => e.userid === userid);
    return getExpenses;
}

const editExpenditure = (itemName, storeName, amountSpent, dateOfExpenditure, editJobId) =>
{
        objIndex = expenditure.findIndex((exp => exp.expId === editJobId));
        expenditure[objIndex]={
            ...expenditure[objIndex],
            itemName: itemName || expenditure[objIndex].itemName,
            storeName: storeName || expenditure[objIndex].storeName,
            amountSpent: amountSpent || expenditure[objIndex].amountSpent,
            dateOfExpenditure: dateOfExpenditure || expenditure[objIndex].dateOfExpenditure,
            expId:newExpId()}

}

const deleteExpenditure = (expId) => {
    objIndex = expenditure.findIndex((obj => obj.expId === expId));
    expenditure.splice(objIndex,1);
}

function newExpId(){
    let expId=1
    if(!expenditure.find(j => j.expId))
    {
        expId=1;
    }
    else
    {
        expId=Math.max(...expenditure.map(exp => exp.expId))+1;
    }

    return expId;
}


module.exports = {
    addExpenditure,
    getAllExpenses,
    editExpenditure,
    deleteExpenditure,
    expenditure,
};
import { useState, useEffect } from "react";
import "../layout/DashboardPage.css";
import  AlertMessage  from '../components/AlertMessage';
import  FormInput  from '../components/FormInput';
import ExpenseContainer from '../components/ExpenseContainer'
 import { useContextApp } from "../context/contextApp";
 import Info from "../components/Info";

const ExpenditureTracking = () => {
  const { showAlert, isLoading, addExpenditure, getProfile, userid, getAllExpenses, clearValues, editExpenditure, isEditing, storeName, itemName, expenses, amountSpent, dateOfExpenditure } = useContextApp();

  const [storename, setStorename] = useState(storeName);
  const [itemname, setItemname] = useState(itemName);
  const [amount, setAmountSpent] = useState(amountSpent);
  const [date, setDate] = useState(dateOfExpenditure);

  const handleSubmit = (e) => {
    e.preventDefault();
    //checking for empty values in the profile page
    if (!amount || !storename || !date || !itemname) {
      showAlert();
      return;
    }
    if (isEditing) {
      editExpenditure(userid,storename,
        itemname, 
        amount, 
        date);
        setStorename('');
        setItemname('');
        setAmountSpent(0);
        setDate(new Date);
        getAllExpenses(userid);
      return;
    }
    addExpenditure(userid,storename,
      itemname, 
      amount, 
      date);
      showAlert();
      getAllExpenses(userid);
  };

  useEffect(() => {
    // Update the document title using the browser API
    getAllExpenses(userid);
    
  },[userid, isEditing]);
  let totalExpenses = 0;
  expenses.map(e=>{
    totalExpenses = totalExpenses + (1*e.amountSpent);
  });

  return (
    <div className="jobCommon">
      <form onSubmit={handleSubmit} className="form">
        <h3>Track Expenditure</h3>
        <div>
          <Info text={totalExpenses} icon={"Total Expenditure"}></Info>
         </div>
        {showAlert && <AlertMessage />}
        <div className="form-center">
          <FormInput
            type="text"
            name="Item Name"
            value={itemname}
            handleChange={(e) => setItemname(e.target.value)}
            placeholder = "The item you spent on"
          />
          <FormInput
            type="text"
            name="Store Name"
            value={storename}
            handleChange={(e) => setStorename(e.target.value)}
            placeholder = "Enter the name of the store"
          />
          <FormInput
            type="number"
            min="0.0"
            labelText="Amount Spent"
            name="amountSpent"
            value={amount}
            handleChange={(e) => setAmountSpent(e.target.value)}
            placeholder = "Enter the amount spent"
          />
          <FormInput
            type="date"
            labelText="Date of Expenditure"
            name="dateOfExpenditure"
            value={date}
            handleChange={(e) => setDate(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
             {isLoading ? "Loading.." : "Save"} 
          </button>
        </div>
      </form>
      <ExpenseContainer></ExpenseContainer>
    </div>
  );
};

export default ExpenditureTracking;

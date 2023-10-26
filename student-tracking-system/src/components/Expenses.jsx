
import { useContextApp } from "../context/contextApp";
import "../layout/Jobs.css";
import Info from "./Info";

const Expenses = ({
  userid, itemName, amountSpent, storeName, dateOfExpenditure, expId 
}) => {
  const { setEditExpense, deleteExpenditure } = useContextApp();


  return (
    <div className="jCommon">
      <header>
        <div className="main-icon">{itemName.charAt(0)}</div>
        <div className="info">
          <h5>{itemName}</h5>
          <p>Amount Spent:{amountSpent}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
        {/* //add icon */}
          <Info text={dateOfExpenditure} icon={"Date Of Expenditure"}/>
          <Info text={storeName} icon={"Store Name"}/>
          <Info text={amountSpent} icon={"Total Amount"}/>

        </div>
        <footer>
          <div>
            <a
              className="btn edit-btn"
              onClick={() => setEditExpense(expId)}
            >
              Edit
            </a>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteExpenditure(expId)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Expenses;

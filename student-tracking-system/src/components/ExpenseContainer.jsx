import { useContextApp } from "../context/contextApp";
import { useEffect } from "react";
import Loading from "./Loading";
import Expenses from "./Expenses";
import "../layout/JobContainer.css";

const ExpenseContainer = () => {
  const {
    getJobs,
    isLoading,
    getAllExpenses,
    page,
    expenses,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    userid,
  } = useContextApp();

  useEffect(() => {
    //getJobs();
    // eslint-disable-next-line
    getAllExpenses(userid);
  }, [userid]);
  if (isLoading) {
     return <Loading center />;
    return;
  }
  if (expenses.length === 0) {
    return (
      <div className="jobContaier">
        <h2>Add Expenses...</h2>
      </div>
    );
  }

  return (
    <div className="jobContaier">
      {/* <h5>
        {totalJobs} job{subjects.length > 1 && "s"} found
      </h5> */}
      <div className="jobs">
        {expenses.map((expenses) => {
          return <Expenses {...expenses} />;
        })}
      </div>
    </div>
  );
};

export default ExpenseContainer;

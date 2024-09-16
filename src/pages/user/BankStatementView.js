import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

function BankStatementView()
{
  const { accountNumber} = useParams();
  const { fromDate} = useParams();
  const { toDate} = useParams();
    return(
        <div className="container mt-5">
          <p className="text-center mt-5 fs-4">Account Statement for Account Number : {accountNumber}</p>
          <p className="text-center mt-5 fs-4">Statement Period is : {fromDate} to {toDate}</p>
        </div>
    )
}
export default BankStatementView;
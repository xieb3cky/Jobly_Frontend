/**
 * Show information about a job : individual "card" for each job.
 * 
 * Receives "appliedTo" (applied jobs) & "applyJob" (apply to a job) functions from parent.
 * 
 * Jobs --> JobCard
 */
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../auth/UserContext";

import "./JobCard.css";


function JobCard({ id, title, salary, equity, companyName }) {
    const { appliedTo, applyJob } = useContext(UserContext);
    const [applied, setApplied] = useState();


    /**
     * Update applied status on "id", "appliedTo" changes.
     */
    useEffect(() => {
        setApplied(appliedTo(id));
    }, [id, appliedTo]);

    /**
     * Handle apply job.
     *
     * If job (id) is in applied job list return.
     * 
     * Else, apply to the job, passing job id --> set applied status to true;
     */
    async function handleApply(evt) {
        if (appliedTo(id)) return;
        applyJob(id);
        setApplied(true);
    };

    return (
        <div className="JobCard card">

            <div className="card-body">
                <h6 className="card-title">{title} </h6>
                <p>
                    {companyName}
                </p>
                {salary && <div><small>Salary: {salary}</small></div>}
                {equity && <div><small>Equity: {equity}</small></div>}
                <button onClick={handleApply} className="btn btn-danger text-uppercase mt-2">
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>

        </div>
    )
}


export default JobCard;
import React from "react";
import JobCard from "./JobCard";

/** Show list of job cards.
 *
 * Company --> JobCardList --> JobCard
 * 
 * Jobs --> JobCardList --> JobCard
 * 
 *
 */

function JobCardList({ jobs }) {
    return (
        <div>
            {jobs.map(job => (
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}
        </div>
    );
}

export default JobCardList;

/**
 * List all jobs.
 * 
 * @ "/jobs"
 * 
 * On mount, load all jobs from API.
 * 
 * Jobs --> JobCardList --> JobCard
 */

import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";
import Search from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingSpinner";

function Jobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        search();
    }, []);

    /**Search from input when submit, request job from API*/

    async function search(title) {
        let res = await JoblyApi.getJobs(title);
        setJobs(res.map(j => ({ ...j })));
    }

    if (!jobs) return <LoadingSpinner />;

    return (
        <div className="JobList col-md-8 offset-md-2">
            <Search searchFor={search} />
            <JobCardList jobs={jobs} />
        </div>
    )
}

export default Jobs;
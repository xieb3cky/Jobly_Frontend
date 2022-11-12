/**
 * Renders details & jobs for a company.
 * 
 * @ "/companies/:handle"
 * 
 * Routes --> Company --> JobCard
 */

import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../jobs/Jobs";
import LoadingSpinner from "../common/LoadingSpinner";

function Company() {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getComp() {
            let res = await JoblyApi.getCompany(handle);
            setCompany(res);
        }
        getComp();
    }, [handle]);

    if (!company) return <LoadingSpinner />;

    return (
        <div>
            <h4 className="col-md-8 offset-md-2 my-2">Jobs</h4>
            <h5 className="col-md-8 offset-md-2">{company.name}</h5>
            <JobCardList jobs={company.jobs} />
        </div>
    );
};

export default Company;
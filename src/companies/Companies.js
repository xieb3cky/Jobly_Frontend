/**
 * List all companies.
 * 
 * On mount, load companies from API.
 * 
 * @ "/companies"
 * 
 * Routes --> Company --> Company Card
 */

import React, { useState, useEffect } from "react";


import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingSpinner";


function Companies() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        search();
    }, []);


    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingSpinner />;

    return (

        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {companies.length
                ? (
                    <>
                        <h4 className="my-3">Companies</h4>
                        <div className="CompanyList-list">
                            {companies.map(c => (
                                <CompanyCard
                                    key={c.handle}
                                    handle={c.handle}
                                    name={c.name}
                                    description={c.description}
                                    logoUrl={c.logoUrl}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    )
}

export default Companies;


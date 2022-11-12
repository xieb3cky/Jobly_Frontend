import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";


function CompanyCard({ name, description, logoUrl, handle }) {

    return (
        <div>
            <Link
                style={{ textDecoration: 'none' }}
                className="CompanyCard card"
                to={`/companies/${handle}`}>
                <div className="card-body">
                    <h6 className="card-title">
                        {name}
                        {logoUrl && <img src={logoUrl}
                            alt={name} />}
                    </h6>
                    <p><small>{description}</small></p>
                </div>
            </Link>
        </div >
    )
}

export default CompanyCard;
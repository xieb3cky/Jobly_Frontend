import React, { useState, useContext } from "react";
import JoblyApi from "../api";
import UserContext from "../auth/UserContext";

/**
 * Edit user profile form. 
 * 
 * Display user information (fist name, last name, email, username, password)
 * 
 * Submit form --> API call to backend --> save updated user info.
 * 
 * Reload through site, displaying updates.
 * 
 */

function ProfileForm() {
    const { currUser, setCurrUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
        username: currUser.username,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);


    /**
     * Handle form submission : 
     * 
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;

        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        // trigger reloading of user information throughout the site
        setCurrUser(updatedUser);
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    }
    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <p className="form-control-plaintext">{formData.username}</p>
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm password to make changes:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {formErrors ?
                            <>{
                                formErrors.map(error => (
                                    <p key={error}>{error}</p>
                                ))
                            }
                            </>
                            : null}

                        <button
                            className="btn btn-primary btn-block mt-4"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default ProfileForm;
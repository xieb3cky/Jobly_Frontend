/**
 * User sign up form.
 * 
 * "/signup"
 * 
 * Redirects user to "/companies"
 * 
 */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignupForm({ signup }) {
    const history = useHistory();
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErr, setFormErr] = useState([]);
    /**
     * Handle form submission
     */

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await signup(formData)
        history.push('/companies');
        if (res.success) {
            history.push('/companies');
        } else {
            setFormErr(res.err);
        }
        setFormData({
            INITIAL_STATE
        })
    }

    /** Update form data */
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const { username, password, firstName, lastName, email } = formData;

    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            name="username"
                            value={username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>First Name</label>
                        <input
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        {formErr ?
                            <>{
                                formErr.map(error => (
                                    <p key={error}>{error}</p>
                                ))
                            }
                            </>
                            : null}
                    </div>

                    <button onSubmit={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}


export default SignupForm;
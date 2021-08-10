import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import { AccountsBarContext } from '../DashBoard';

interface OpenAccountProps {

}

export const OpenAccount: React.FC<OpenAccountProps> = ({ }) => {
  const disableBar = useContext(AccountsBarContext);
  const history = useHistory();
  useEffect(() => {
    disableBar(true);
    return () => disableBar(false);
  }, []);
  
  const handleSubmit = (data: any) => {
    history.push("/dashboard/accountOpening/accountType");
  } 
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <h2>Opening Account</h2>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 text-center">Personal Information</h5>
          </div>
          <div className="card-body">
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: "33%" }}></div>
            </div>
            <form onSubmit={() => handleSubmit(true)} className="form-horizontal">
              <div className="form-group row">
                <label
                  htmlFor="inputName"
                  className="col-sm-2 col-form-label"
                >
                  First Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputName"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputEmail"
                  className="col-sm-2 col-form-label"
                >
                  Last Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputName2"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputName2"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputExperience"
                  className="col-sm-2 col-form-label"
                >
                  Address
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="inputExperience"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputSkills"
                  className="col-sm-2 col-form-label"
                >
                  Phone Number
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputSkills"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="offset-sm-2 col-sm-10">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                    />
                    <label htmlFor="agreeTerms">
                      <span>I agree to the </span>
                      <Link to="/">terms and condition</Link>
                    </label>
                  </div>
                </div>
              </div>
              <div className="float-right">
                <div className="">
                  <ButtonSpinner type="submit" theme="primary">
                    Next
                  </ButtonSpinner>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
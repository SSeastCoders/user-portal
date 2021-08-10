import React, { useContext, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import { AccountsBarContext } from '../DashBoard';

interface AccountRegistrationProps {

}

export const AccountRegistration: React.FC<AccountRegistrationProps> = ({}) => {
  const disableBar = useContext(AccountsBarContext);
  useEffect(() => {
    disableBar(true);
    return () => disableBar(false);
  }, []);

    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <h2>Opening Account</h2>
        </div>
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0 text-center">Account Deposit</h5>
            </div>
            <div className="card-body">
              <div className="progress mb-3">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: "67%" }}></div>
              </div>
              <form className="form-horizontal">
                <div className="form-group row">
                  <label
                    htmlFor="inputName"
                    className="col-sm-2 col-form-label"
                  >
                    Account type
                  </label>
                  <div className="col-sm-10">
                    <select className="form-control">
                      <option>Account Types</option>
                      <option value="0">Checking</option>
                      <option value="1">Saving</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Deposit
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail"
                    />
                  </div>
                </div>
                <div className="float-right">
                  <div className="">
                    <ButtonSpinner type="submit" theme="primary">
                      Submit
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
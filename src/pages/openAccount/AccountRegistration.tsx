import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import { useDisableBar } from '../../hooks/disableBar';
import { ACCOUNT_ENDPOINT } from '../../services/api';

interface AccountRegistrationProps {

}

interface FormValues {
  accountType: string,
  balance: number
  accountName: string
}

export const AccountRegistration: React.FC<AccountRegistrationProps> = ({ }) => {
  useDisableBar();
  const history = useHistory();
  const state = useSelector((state) => state.auth);
  const createAccount = useMutation((update: FormValues) => axios.post(`${ACCOUNT_ENDPOINT}`, update));
  const {register, handleSubmit} = useForm<FormValues>();
  const submitForm = (data: FormValues) => {
    const ids = [Number(state.id)]
    const request = {...data, usersIds: ids}
    createAccount.mutate(request);
    history.push("/dashboard");
  }

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
            <form noValidate onSubmit={handleSubmit(submitForm)} className="form-horizontal">
              <div className="form-group row">
                <label
                  htmlFor="inputName"
                  className="col-sm-2 col-form-label"
                >
                  Account type
                </label>
                <div className="col-sm-10">
                  <select className="form-control" {...register("accountType")}>
                    <option>Account Types</option>
                    <option value="CHECKING">Checking</option>
                    <option value="SAVING">Saving</option>
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
                    {...register("balance")}
                    id="inputEmail"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputEmail"
                  className="col-sm-2 col-form-label"
                >
                  Account Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail"
                    {...register("accountName")}
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
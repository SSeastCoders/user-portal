/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import {InputValidation} from '../../components/form/InputValidation';
import {useDisableBar} from '../../hooks/disableBar';
import {ACCOUNT_ENDPOINT} from '../../services/api';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axiosToken from '../../services/axios';
import {ErrorMessage} from '@hookform/error-message';

interface AccountRegistrationProps {}

interface FormValues {
  accountType: string;
  balance: number;
  nickName: string;
}

const scehma = Yup.object().shape({
  accountType: Yup.string().required(),
  balance: Yup.number().required().min(1, 'deposit must not be less than zero'),
  nickName: Yup.string().required(),
});

export const AccountRegistration: React.FC<AccountRegistrationProps> = ({}) => {
  useDisableBar();
  const history = useHistory();
  const state = useSelector(state => state.auth);
  const createAccount = useMutation((update: any) =>
    axiosToken.post(`${ACCOUNT_ENDPOINT}`, update)
  );
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({resolver: yupResolver(scehma)});
  const submitForm = (data: FormValues) => {
    const ids = [Number(state.id)];
    const request = {...data, usersIds: ids};
    createAccount.mutate(request);
    history.push('/dashboard');
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <h2 className="m-0">Opening Account</h2>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 text-center">Account Deposit</h5>
          </div>
          <div className="card-body">
            <div className="progress mb-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{width: '67%'}}
              ></div>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit(submitForm)}
              className="form-horizontal"
            >
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Account type</label>
                <div className="col-sm-10">
                  <select className="form-control" {...register('accountType')}>
                    <option value="">Account Types</option>
                    <option value="CHECKING">Checking</option>
                    <option value="SAVING">Saving</option>
                  </select>
                  <ErrorMessage
                    className="invalid-feedback d-block"
                    errors={errors}
                    as="span"
                    name="accountType"
                  ></ErrorMessage>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Deposit</label>
                <InputValidation
                  className="col-sm-10"
                  errors={errors}
                  name="balance"
                  register={register('balance')}
                ></InputValidation>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  Account Nick Name
                </label>
                <InputValidation
                  className="col-sm-10"
                  errors={errors}
                  name="nickName"
                  register={register('nickName')}
                ></InputValidation>
              </div>
              <div className="float-right">
                <div className="">
                  <ButtonSpinner
                    isLoading={createAccount.isLoading}
                    type="submit"
                    theme="primary"
                  >
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
};

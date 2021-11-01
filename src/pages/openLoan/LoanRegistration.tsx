import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import { InputValidation } from '../../components/form/InputValidation';
import { useDisableBar } from '../../hooks/disableBar';
import { CARD_ENDPOINT } from '../../services/api';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosToken from '../../services/axios';
import { ErrorMessage } from '@hookform/error-message';
import { LoanType } from '../../services/models/Loan';

interface LoanRegistrationProps {
}

interface FormValues {
  loanType: string,
  nickName: string,
  amountLoaned: number
}

const scehma = Yup.object().shape({
  loanType: Yup.string().required(),
  nickName: Yup.string().required(),
  amountLoaned: Yup.number().required()
})

export const LoanRegistration: React.FC<LoanRegistrationProps> = ({ }) => {
  useDisableBar();
  const history = useHistory();
  const state = useSelector((state) => state.auth);
  const createLoan = useMutation((update: any) => axiosToken.post(`${CARD_ENDPOINT}`, update));
  const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({resolver: yupResolver(scehma)});
  const submitForm = (data: FormValues) => {
    const ids = [Number(state.id)]
    const request = {...data, usersIds: ids}
    console.log(request);
    createLoan.mutate(request);
    history.push("/dashboard");
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <h2 className="m-0">Opening Loan</h2>
      </div>
      <div className="container">
        <div className="loan">
          <div className="loan-body">
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: "67%" }}></div>
            </div>
            <form noValidate onSubmit={handleSubmit(submitForm)} className="form-horizontal">
              <div className="form-group row">
                <label
                  className="col-sm-2 col-form-label"
                >
                  Loan type
                </label>
                <div className="col-sm-10">
                  <select className="form-control" {...register("loanType")}>
                    <option value="">Loan Types</option>
                    <option value="AUTO">Auto</option>
                    <option value="HOME">Home</option>
                    <option value="EDUCATION">Education</option>
                    <option value="BUSINESS">Business</option>
                  </select>
                  <ErrorMessage className="invalid-feedback d-block" errors={errors} as="span" name="loanType"></ErrorMessage>
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-sm-2 col-form-label"
                >
                  Loan Nickname
                </label>
                <InputValidation className="col-sm-10" errors={errors} name="nickName" register={register("nickName")}></InputValidation>
              </div>
              <div className="form-group row">
                <label
                  className="col-sm-2 col-form-label"
                >
                  Loan Amount
                </label>
                <InputValidation className="col-sm-10" errors={errors} name="amountLoaned" register={register("amountLoaned")}></InputValidation>
              </div>
              <div className="float-right">
                <div className="">
                  <ButtonSpinner isLoading={createLoan.isLoading} type="submit" theme="primary">
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
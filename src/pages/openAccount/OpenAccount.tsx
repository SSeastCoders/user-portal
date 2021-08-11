import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { DefaultRootState, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { string } from 'yup/lib/locale';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import { useDisableBar } from '../../hooks/disableBar';
import { BASE_URL } from '../../services/api';
import { User } from '../../services/models/User';
import * as Yup from "yup";
import { InputValidation } from '../../components/form/InputValidation';

interface OpenAccountProps {

}

interface FormValues {
  firstName?: string,
  lastName?: string,
  email?: string,
  address?: string,
  phone?: string,
  checked: boolean
}

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  address: Yup.string().required(),
  email: Yup.string().email("Must be a valid email").required()
  // checked: Yup.bool().isTrue("Terms must be chekced")
})

export const OpenAccount: React.FC<OpenAccountProps> = ({ }) => {
  const state = useSelector((state: DefaultRootState) => state.auth);
  const result = useQuery(['user'], async () => {
    const data = await axios.get(`${BASE_URL}/users/${state.id}`, { headers: { "Authorization": state.token } });
    return data.data;
  });
  let user: User = new User(result.data);
  let { firstName, lastName, email, phone } = user;
  let address = user.addressToString();
  const form: FormValues = useMemo(() => {return { firstName, lastName, email, phone, address: address, checked: false }}, [firstName, lastName, email, phone, address])
  // let form: FormValues = { firstName, lastName, email, phone, address: user.addressToString(), checked: false }
  const history = useHistory();
  const { formState: { errors }, handleSubmit, register, reset } = useForm<FormValues>({ defaultValues: form, resolver: yupResolver(schema) });
  useEffect(() => {
    reset(form)
  }, [form]) // eslint-disable-line
  useDisableBar();

  const nextPage = () => {
    history.push("/dashboard/accountOpening/accountType");
  }
  return (
    <div className="content-wrapper">
      <div className="content-header">
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
            <form noValidate onSubmit={() => history.push("/dashboard/accountOpening/accountType")} className="form-horizontal">
              <div className="form-group row">
                <label
                  htmlFor="inputName"
                  className="col-sm-2 col-form-label"
                >
                  First Name
                </label>
                <InputValidation className="col-sm-10" name="firstName" register={register("firstName")} errors={errors}></InputValidation>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputEmail"
                  className="col-sm-2 col-form-label"
                >
                  Last Name
                </label>
                <InputValidation className="col-sm-10" name="lastName" register={register("lastName")} errors={errors}></InputValidation>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputName2"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <InputValidation className="col-sm-10" name="email" register={register("email")} errors={errors}></InputValidation>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputExperience"
                  className="col-sm-2 col-form-label"
                > 
                  Address
                </label>
                <div className="col-sm-10">
                  <input readOnly type="text" className="form-control" {...register("address")} style={{ border: "none" }}></input>
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
                      // {...register("checked")}
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
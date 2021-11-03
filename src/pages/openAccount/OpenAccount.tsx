/* eslint-disable @typescript-eslint/no-empty-interface */
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useQuery} from 'react-query';
import {DefaultRootState, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import {InputValidation} from '../../components/form/InputValidation';
import {useDisableBar} from '../../hooks/disableBar';
import {getUserById} from '../../services/services';

interface OpenAccountProps {}

interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  phone?: string;
  checked: boolean;
}

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  address: Yup.string().required(),
  email: Yup.string().email('Must be a valid email').required(),
  checked: Yup.bool().isTrue('Terms must be chekced'),
});

export const OpenAccount: React.FC<OpenAccountProps> = ({}) => {
  const state = useSelector((state: DefaultRootState) => state.auth);
  const {data, ...result} = useQuery(['user'], async () => {
    return getUserById(state.id!);
  });
  console.log(data);
  const form: FormValues = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    address: data?.addressToString() ?? '',
    phone: data?.phone,
    checked: false,
  };
  const history = useHistory();
  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm<FormValues>({defaultValues: form, resolver: yupResolver(schema)});
  useEffect(() => {
    reset(form);
  }, [result.isSuccess]) // eslint-disable-line
  useDisableBar();

  const nextPage = () => {
    history.push('/dashboard/accountOpening/accountType');
  };
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
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{width: '33%'}}
              ></div>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit(nextPage)}
              className="form-horizontal"
            >
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">First Name</label>
                <InputValidation
                  className="col-sm-10"
                  name="firstName"
                  register={register('firstName')}
                  errors={errors}
                ></InputValidation>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Last Name</label>
                <InputValidation
                  className="col-sm-10"
                  name="lastName"
                  register={register('lastName')}
                  errors={errors}
                ></InputValidation>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <InputValidation
                  className="col-sm-10"
                  name="email"
                  register={register('email')}
                  errors={errors}
                ></InputValidation>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    {...register('address')}
                    style={{border: 'none'}}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Phone Number</label>
                <InputValidation
                  className="col-sm-10"
                  name="phone"
                  register={register('phone')}
                  errors={errors}
                ></InputValidation>
              </div>
              <div className="form-group row">
                <div className="offset-sm-2 col-sm-10">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      {...register('checked')}
                    />
                    <label htmlFor="agreeTerms">
                      <span>I agree to the </span>
                      <Link to="/">terms and condition</Link>
                    </label>
                  </div>
                  <ErrorMessage
                    className="invalid-feedback d-block"
                    errors={errors}
                    as="span"
                    name="checked"
                  ></ErrorMessage>
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
          {result.isLoading && (
            <div className="overlay dark">
              <i className="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

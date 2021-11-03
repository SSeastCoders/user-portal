/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import {InputValidation} from '../../components/form/InputValidation';
import {BASE_URL} from '../../services/api';
import axiosToken from '../../services/axios';
import {User} from '../../services/models/User';
import {ResErrorObj} from '../../services/responses/ResErrorObj';

interface PersonalInfoTabProps {
  user?: User;
}

interface ProfileForm {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-z0-9A-Z]+$/, 'username must be alphanumeric')
    .min(4, 'username must be greater than 4 characters')
    .max(20, 'username must less than 20 characters')
    .required(),
  email: Yup.string().email('Must be a valid email').required(),
});

export const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({user}) => {
  const state = useSelector(state => state.auth);
  const updateUser = useMutation((update: ProfileForm) =>
    axiosToken.put(`${BASE_URL}/users/${state.id}`, update)
  );
  const {
    formState: {errors},
    handleSubmit,
    register,
    getValues,
    reset,
  } = useForm({defaultValues: user, resolver: yupResolver(schema)});
  useEffect(() => {
    reset(user);
  }, [user, reset]) // eslint-disable-line 
  const onSubmit = (data: ProfileForm) => {
    updateUser.mutate(data);
  };
  const errorRes: ResErrorObj = updateUser.error as any;
  const renderResponse = () => {
    if (updateUser.isError) {
      return (
        <div className="text-center text-danger">
          {errorRes.response.data.message}
        </div>
      );
    } else if (updateUser.isSuccess) {
      return (
        <div className="text-center text-green">User Information updated</div>
      );
    }
  };
  return (
    <div className="card tw-max-w-screen-lg">
      <div className="card-body">
        {renderResponse()}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="form-horizontal"
        >
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              First Name
            </label>
            <InputValidation
              className="col-sm-10"
              name="firstName"
              register={register('firstName')}
              errors={errors}
            ></InputValidation>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
              Last Name
            </label>
            <InputValidation
              className="col-sm-10"
              name="lastName"
              register={register('lastName')}
              errors={errors}
            ></InputValidation>
          </div>
          <div className="form-group row">
            <label htmlFor="inputName2" className="col-sm-2 col-form-label">
              Username
            </label>
            <InputValidation
              className="col-sm-10"
              name="username"
              register={register('username')}
              errors={errors}
            ></InputValidation>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputExperience"
              className="col-sm-2 col-form-label"
            >
              Email
            </label>
            <InputValidation
              className="col-sm-10"
              name="email"
              register={register('email')}
              errors={errors}
            ></InputValidation>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputExperience"
              className="col-sm-2 col-form-label"
            >
              Phone
            </label>
            <InputValidation
              className="col-sm-10"
              name="phone"
              register={register('phone')}
              errors={errors}
            ></InputValidation>
          </div>
          <div className="form-group row">
            <label htmlFor="inputSkills" className="col-sm-2 col-form-label">
              Date Joined
            </label>
            <div className="col-sm-10">
              <span className="form-control" style={{border: 'none'}}>
                {user?.dateJoined?.toFormat('dd LLL yyyy')}
              </span>
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <ButtonSpinner
                isLoading={updateUser.isLoading}
                type="submit"
                theme="danger"
              >
                Submit
              </ButtonSpinner>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

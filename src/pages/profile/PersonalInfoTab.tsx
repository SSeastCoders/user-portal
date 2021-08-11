import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import ButtonSpinner from '../../components/button/ButtonSpinner'
import { InputValidation } from '../../components/form/InputValidation';
import { BASE_URL } from '../../services/api';
import { User } from '../../services/models/User';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResErrorObj } from '../../services/responses/ResErrorObj';

interface PersonalInfoTabProps {
  user: User
}

interface ProfileForm {
  firstName?: string,
  lastName?: string,
  username?: string,
  email?: string,
  phone?: string
}

const schema = Yup.object().shape({
  username: Yup.string().matches(/^[a-z0-9A-Z]+$/, "username must be alphanumeric")
    .min(4, "username must be greater than 4 characters")
    .max(20, "username must less than 20 characters")
    .required(),
  email: Yup.string().email("Must be a valid email").required(),
})

export const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ user }) => {
  // const [data, setData] = useState({});
  const state = useSelector((state) => state.auth);
  const result = useQuery(['user'], async () => {
    const data = await axios.get(`${BASE_URL}/users/${state.id}`, { headers: { "Authorization": state.token } });
    return data.data;
  });
  const updateUser = useMutation((update: ProfileForm) => axios.put(`${BASE_URL}/users/${state.id}`, update, { headers: { "Authorization": state.token } }));
  let { firstName, lastName, email, phone, username } = user;
  let form: ProfileForm = { firstName, lastName, email, phone, username }
  const { formState: { errors }, handleSubmit, register, getValues, reset } = useForm({ defaultValues: form, resolver: yupResolver(schema) });
  useEffect(() => {
    reset(form)
  }, [result.isSuccess, reset]) // eslint-disable-line 

  if (result.isError) {
    return <div>Errored</div>
  }
  const onSubmit = (data: ProfileForm) => {
    updateUser.mutate(data);
  }
  const errorRes: ResErrorObj = updateUser.error as any;
  let renderResponse = () => {
    if (updateUser.isError) {
      return <div className="text-center text-danger">{errorRes.response.data.message}</div>
    } else if (updateUser.isSuccess) {
      return <div className="text-center text-green">User Information updated</div>
    }
  }
  return (
    <div className="card">
      <div className="card-body">
        {renderResponse()}
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
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
              Username
            </label>
            <InputValidation className="col-sm-10" name="username" register={register("username")} errors={errors}></InputValidation>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputExperience"
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
              Phone
            </label>
            <InputValidation className="col-sm-10" name="phone" register={register("phone")} errors={errors}></InputValidation>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputSkills"
              className="col-sm-2 col-form-label"
            >
              Date Joined
            </label>
            <div className="col-sm-10">
              <span className="form-control" style={{ border: "none" }}>{user?.dateJoined?.toLocaleDateString()}</span>
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <ButtonSpinner isLoading={updateUser.isLoading} type="submit" theme="danger">
                Submit
              </ButtonSpinner>
            </div>
          </div>
        </form>
      </div>
      {result.isLoading &&
        <div className="overlay dark">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>}
    </div>
  );
}
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../services/api';
import { Address, User } from '../../services/models/User';
import * as Yup from "yup";
import { ResErrorObj } from '../../services/responses/ResErrorObj';
import { InputValidation } from '../../components/form/InputValidation';
import ButtonSpinner from '../../components/button/ButtonSpinner';

interface ChangeAddressProps {
  user: User
}

const schema = Yup.object().shape({
  streetAddress: Yup.string()
    .max(50, "street address cant not be longer than 50 characters"),
  city: Yup.string()
    .max(50, "city cant not be longer than 50 characters"),
  state: Yup.string()
    .min(2)
    .max(2)
})

export const ChangeAddress: React.FC<ChangeAddressProps> = ({user}) => {
  const state = useSelector((state) => state.auth);
  const updateUser = useMutation((update: {address: Address}) => axios.put(`${BASE_URL}/users/${state.id}`, update, { headers: { "Authorization": state.token } }));
  let { address } = user;
  const { formState: { errors }, handleSubmit, register, getValues, reset } = useForm<Address>({defaultValues: address , resolver: yupResolver(schema) });

  useEffect(() => {
    reset(address)
  }, [address, reset]) // eslint-disable-line
  const onSubmit = (data: Address) => {
    updateUser.mutate({address: data});
  }
  const errorRes: ResErrorObj = updateUser.error as any;
  let renderResponse = () => {
    if (updateUser.isError) {
      return <div className="text-center text-danger">{errorRes.response.data.message}</div>
    } else if (updateUser.isSuccess) {
      return <div className="text-center text-green"> Updated</div>
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
            >Street Address</label>
            <InputValidation className="col-sm-10" name="streetAddress" register={register("streetAddress")} errors={errors}></InputValidation>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputEmail"
              className="col-sm-2 col-form-label"
            >City</label>
            <InputValidation className="col-sm-10" name="city" register={register("city")} errors={errors}></InputValidation>
          </div>
          <div className="form-group row">
            <label
              className="col-sm-2 col-form-label"
            >Zip</label>
            <InputValidation className="col-sm-10" name="zip" register={register("zip")} errors={errors}></InputValidation>
          </div>
          <div className="form-group row">
            <label
              className="col-sm-2 col-form-label"
            >State</label>
            <InputValidation className="col-sm-10" name="state" register={register("state")} errors={errors}></InputValidation>
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
    </div>);
}
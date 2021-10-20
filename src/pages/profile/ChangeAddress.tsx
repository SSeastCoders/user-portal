import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../services/api';
import {Address, User} from '../../services/models/User';
import * as Yup from 'yup';
import {ResErrorObj} from '../../services/responses/ResErrorObj';
import {InputValidation} from '../../components/form/InputValidation';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import {states} from '../../utils/constants/states';
import Select from 'react-select';
import axiosToken from '../../services/axios';

interface ChangeAddressProps {
  user?: User;
}

const schema = Yup.object().shape({
  streetAddress: Yup.string()
    .max(50, 'street address cant not be longer than 50 characters')
    .required(),
  city: Yup.string()
    .max(50, 'city cant not be longer than 50 characters')
    .required(),
  state: Yup.string().min(2).max(2).required(),
  zip: Yup.number().integer('must be a number'),
});

export const ChangeAddress: React.FC<ChangeAddressProps> = ({user}) => {
  const state = useSelector(state => state.auth);
  const updateUser = useMutation((update: {address: Address}) =>
    axiosToken.put(`${BASE_URL}/users/${state.id}`, update)
  );
  const {
    formState: {errors},
    handleSubmit,
    register,
    control,
    reset,
  } = useForm<Address>({
    defaultValues: user?.address,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(user?.address);
  }, [user?.address, reset]) // eslint-disable-line
  const onSubmit = (data: Address) => {
    updateUser.mutate({address: data});
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
      return <div className="text-center text-green"> Updated</div>;
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
            <label className="col-sm-2 col-form-label">Street Address</label>
            <InputValidation
              className="col-sm-10"
              name="streetAddress"
              register={register('streetAddress')}
              errors={errors}
            ></InputValidation>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">City</label>
            <InputValidation
              className="col-sm-10"
              name="city"
              register={register('city')}
              errors={errors}
            ></InputValidation>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Zip</label>
            <InputValidation
              className="col-sm-10"
              name="zip"
              register={register('zip')}
              errors={errors}
            ></InputValidation>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">State</label>
            <Controller
              name="state"
              control={control}
              render={({field: {value, onChange, ...rest}}) => (
                <Select
                  className="col-sm-10"
                  {...rest}
                  value={states.find(v => v.value === value)}
                  onChange={val => onChange(val?.value)}
                  options={states}
                />
              )}
            />
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

import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import ButtonSpinner from '../../components/button/ButtonSpinner';
import {InputPasswordToggle} from '../../components/form/InputPasswordToggle';
import {BASE_URL} from '../../services/api';
import {ResErrorObj} from '../../services/responses/ResErrorObj';

interface ChangePasswordProps {}

interface ProfileForm {
  password: string;
  confirmPassword: string;
}

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
const schema = Yup.object().shape({
  password: Yup.string()
    .required()
    .matches(
      PASSWORD_REGEX,
      'Password must contain a number, uppercase and be 7 characters long'
    )
    .max(20, 'Password must be less than 20 characters'),
  confirmPassword: Yup.string()
    .required('confirm password is a required field')
    .when('password', {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Password does not match'
      ),
    }),
});

export const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const state = useSelector(state => state.auth);
  const updateUser = useMutation((update: ProfileForm) =>
    axios.put(`${BASE_URL}/users/${state.id}`, update, {
      headers: {Authorization: state.token},
    })
  );
  const {
    formState: {errors},
    handleSubmit,
    register,
    getValues,
  } = useForm({resolver: yupResolver(schema)});

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
      return <div className="text-center text-green">Password Updated</div>;
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        {renderResponse()}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="form-horizontal"
        >
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password</label>
            <InputPasswordToggle
              className="col-sm-10"
              name="password"
              register={register('password')}
              errors={errors}
            ></InputPasswordToggle>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Confirm Password</label>
            <InputPasswordToggle
              className="col-sm-10"
              name="confirmPassword"
              register={register('confirmPassword')}
              errors={errors}
            ></InputPasswordToggle>
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

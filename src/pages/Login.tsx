import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import ButtonSpinner from '../components/button/ButtonSpinner';
import {InputPasswordToggle} from '../components/form/InputPasswordToggle';
import {InputValidation} from '../components/form/InputValidation';
import {BASE_URL} from '../services/api';
import {LoginForm} from '../services/formdata/LoginForm';
import * as ActionTypes from '../store/action/actiontypes';

interface loginProps {}

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export const Login: React.FC<loginProps> = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: {errors: formErros},
  } = useForm<LoginForm>({resolver: yupResolver(schema)});
  const dispatch = useDispatch();

  const loginMutation = useMutation(
    (credential: LoginForm) => axios.post(`${BASE_URL}/login`, credential),
    {
      onSuccess: ({headers}) => {
        console.log(headers);
        dispatch({
          type: ActionTypes.LOGIN_USER,
          token: headers.authorization,
          id: headers.id,
        });
        //create store token
        history.push('/dashboard');
      },
    }
  );

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>EastsCoders </b>Bank
          </a>
        </div>
        {/*
        <!-- /.login-logo --> */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {loginMutation.isError && (
                <div className="text-center invalid-feedback d-block">
                  Username or password are invalid
                </div>
              )}
              <InputValidation
                className="mb-3"
                name="username"
                placeholder="username"
                errors={formErros}
                register={register('username')}
                favIcon="fas fa-user"
              ></InputValidation>
              <InputPasswordToggle
                className="mb-3"
                name="password"
                placeholder="password"
                errors={formErros}
                register={register('password')}
              ></InputPasswordToggle>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />{' '}
                    {/* implement rember me later */}
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <ButtonSpinner
                    block
                    isLoading={loginMutation.isLoading}
                    type="submit"
                  >
                    Sign in
                  </ButtonSpinner>
                </div>
              </div>
            </form>

            {/* <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
              </a>
            </div> */}
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <Link to="/register" className="text-center">
                Register an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

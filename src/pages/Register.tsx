import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import { InputValidation } from '../components/form/InputValidation';
import { InputPasswordToggle } from '../components/form/InputPasswordToggle';
import { useMutation } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '../services/api';
import { ResErrorObj } from '../services/responses/ResErrorObj';
import { LoginForm } from '../services/formdata/LoginForm';
import ButtonSpinner from '../components/button/ButtonSpinner';
import {useDispatch} from 'react-redux';
import * as ActionTypes from '../store/action/actiontypes';

interface RegisterProps {

}

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  checked: Boolean;
}

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;

// schema to validate form memebers
const schema = Yup.object().shape({
  username: Yup.string().matches(/^[a-z0-9A-Z]+$/, "username must be alphanumeric")
    .min(4, "username must be greater than 4 characters")
    .max(20, "username must less than 20 characters")
    .required(),
  password: Yup.string()
    .required()
    .matches(PASSWORD_REGEX, "Password must contain a number, uppercase and be 7 characters long")
    .max(20, "Password must be less than 20 characters"),
  confirmPassword: Yup.string().required("confirm password is a required field").when("password", {
    is: (val: any) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref("password")], "Password does not match")
  }),
  email: Yup.string().email("Must be a valid email").required(),
  checked: Yup.bool().isTrue("Must agree to terms")
});

/**
 * A Registration page component to register a user
 * @param param0 props to pass
 * @returns renders the register page
 */
export const Register: React.FC<RegisterProps> = ({ }) => {

  const history = useHistory();

  const dispatch = useDispatch();
  

  //hook that sends a post to create a user.
  const createUserMutation = useMutation((user: FormValues) => axios.post(BASE_URL + "/users", user), {
    onSuccess: () => login(getValues())
  });

  //hook that sends a post to endpoint login to authenticate
  const loginMutation = useMutation((loginInfo: LoginForm) => axios.post(BASE_URL + "/login", loginInfo), {
  onSuccess: ({headers}) => { 
      // TODO add storage of token
      dispatch({ type: ActionTypes.LOGIN_USER, token: headers.Authorization, id: headers.id})
      // console.log(headers);
      history.push("/dashboard") 
    },
    onError: () => {
      history.push("/login");
    }
  });

  // Form validator
  const { register, handleSubmit, getValues, formState: { errors: formErrors } } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  //Error response objects
  const errorRes: ResErrorObj = createUserMutation.error as any;
  const loginErrRes: ResErrorObj = loginMutation.error as any;

  let isLoading = createUserMutation.isLoading || loginMutation.isLoading;

  /**
   * Sends form data when submit button is pressed
   * @param data form data to submit
   */
  const onSubmit = (data: FormValues) => {
    createUserMutation.mutate(data);
  };
  /**
   * Sends in login information to server to authenticate
   * @param data Login form data
   */
  const login = async (data: LoginForm) => {
    const loginData = new LoginForm(data.username, data.password);
    loginMutation.mutate(loginData);
  };

  /**
   * Function that displays error messages from server
   * @returns error response message from server on top of form
   */
  const renderError = () => {
    if (createUserMutation.isError && errorRes.response !== undefined) {
      return <div className="text-center invalid-feedback d-block">{errorRes.response.data.message}</div>;
    } else if (loginMutation.isError && loginErrRes.response !== undefined) {
      return <div className="text-center invalid-feedback d-block">{loginErrRes.response.data.message}</div>;
    }
  };

  let checkboxInvalid = !('checked' in formErrors) ? "" : "text-danger";
  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-logo">
          <b>EastCoders </b>Bank
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderError()}
              <InputValidation className="mb-3" errors={formErrors} favIcon="fas fa-user" name="username" placeholder="username" register={register("username")}></InputValidation>
              <InputValidation className="mb-3" errors={formErrors} favIcon="fas fa-envelope" name="email" placeholder="email" register={register("email")}></InputValidation>
              <InputPasswordToggle className="mb-3" errors={formErrors} name="password" placeholder="password" register={register("password")}></InputPasswordToggle>
              <InputPasswordToggle className="mb-3" errors={formErrors} name="confirmPassword" placeholder="confirm password" register={register("confirmPassword")}></InputPasswordToggle>
              <div className="row">
                <div className="col-7">
                  <div className="icheck-primary">
                    <input type="checkbox" id="agreeTerms" {...register("checked")} />
                    <label className={checkboxInvalid} htmlFor="agreeTerms">
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                  <ErrorMessage className="invalid-feedback d-block" as="span" name="checked" errors={formErrors}></ErrorMessage>
                </div>
                <div className="col-5">
                  <ButtonSpinner block type="submit" isLoading={isLoading}>
                    Register
                  </ButtonSpinner>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <ButtonSpinner block disabled={isLoading} icon="fab fa-facebook">Sign up using Facebook </ButtonSpinner>
              <ButtonSpinner block disabled={isLoading} icon="fab fa-google" theme="danger">Sign up using Google</ButtonSpinner>
            </div>

            <Link to="/login">I already have an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
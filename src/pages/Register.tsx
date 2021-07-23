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
import { USER_URL } from '../services/api';
import { ResErrorObj } from '../services/responses/ResErrorObj';


interface RegisterProps {

}

type FormValues = {
  username: String;
  password: String;
  confirmPassword: String;
  email: String;
  checked: Boolean;
}


const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;

const schema = Yup.object().shape({
  username: Yup.string().matches(/^[a-z0-9A-Z]+$/, "username must be alphanumeric")
    .min(4, "username must be greater than 4 characters")
    .max(20, "username must less than 20 characters")
    .required(),
  password: Yup.string()
    .matches(PASSWORD_REGEX, "Password must contain a number, uppercase and be 7 characters long")
    .max(20, "Password must be less than 20 characters")
    .required(),
  confirmPassword: Yup.string().when("password", {
    is: (val: any) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref("password")], "Password does not match")
  }),
  email: Yup.string().email("Must be a valid email").required(),
  checked: Yup.bool().isTrue("Must agree to terms")
});

export const Register: React.FC<RegisterProps> = ({ }) => {

  const history = useHistory();
  const mutation = useMutation((user: FormValues) => axios.post(USER_URL, user));
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });
  const errorRes: ResErrorObj = mutation.error as any;
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
    // history.push("/home"); 
  };
  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-logo">
          <Link to="/"><b>EastCoders </b>Bank</Link>
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new account</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {mutation.isError ? (                  
                <div className="text-center text-danger">{errorRes.response.data.message}</div>
              ) : null}
              <InputValidation className="mb-3" errors={formErrors} favIcon="fas fa-user" name="username" register={register("username")}></InputValidation>
              <InputValidation className="mb-3" errors={formErrors} favIcon="fas fa-envelope" name="email" register={register("email")}></InputValidation>
              <InputPasswordToggle className="mb-3" errors={formErrors} name="password" register={register("password")}></InputPasswordToggle>
              <InputPasswordToggle className="mb-3" errors={formErrors} name="confirmPassword" register={register("confirmPassword")}></InputPasswordToggle>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="agreeTerms" {...register("checked")} />
                    <label htmlFor="agreeTerms">
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                  <ErrorMessage className="text-danger" as="div" name="checked" errors={formErrors}></ErrorMessage>
                </div>
                {/*
              <!-- /.col --> */}
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                </div>
                {/*
              <!-- /.col --> */}
              </div>
            </form>

            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i>
                Sign up using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i>
                Sign up using Google+
              </a>
            </div>

            <Link to="/login">I already have an account</Link>
          </div>
          {/*
        <!-- /.form-box --> */}
        </div>
      </div>
    </div>
  );
}
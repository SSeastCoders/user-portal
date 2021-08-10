import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../../components/button/ButtonSpinner'
import { BASE_URL } from '../../services/api';

interface PersonalInfoTabProps {

}

export const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ }) => {
  // const [data, setData] = useState({});
  const state = useSelector((state) => state.auth);
  const result = useQuery(['user'], async () => {
    const data = await axios.get(`${BASE_URL}/users/${state.id}`, { headers: { "Authorization": state.token } });
    return data.data;
  });
  // if (result.isLoading) {
  //   return (
  //     <div className="card">
  //       <div className="card-body h">
  //       <div className="overlay dark">
  //         <i className="fas fa-2x fa-sync-alt fa-spin"></i>
  //       </div>
  //       </div>
  //     </div>
  //   );
  // }
  if (result.isError) {
    return <div>Errored</div>
  }
  let user: any = result.data;
  return (
    <div className="card">
      <div className="card-body">
        <form className="form-horizontal">
          <div className="form-group row">
            <label
              htmlFor="inputName"
              className="col-sm-2 col-form-label"
            >
              First Name
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputName"
                placeholder={user?.firstName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputEmail"
              className="col-sm-2 col-form-label"
            >
              Last Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                placeholder={user?.lastName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputName2"
              className="col-sm-2 col-form-label"
            >
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputName2"
                placeholder={user?.username}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputExperience"
              className="col-sm-2 col-form-label"
            >
              Email
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="inputExperience"
                placeholder={user?.email}
                defaultValue=""
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputSkills"
              className="col-sm-2 col-form-label"
            >
              Date Joined
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputSkills"
                placeholder={user?.dateJoined}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <div className="icheck-primary">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="terms"
                  defaultValue="agree"
                />
                <label htmlFor="agreeTerms">
                  <span>I agree to the </span>
                  <Link to="/">terms and condition</Link>
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <ButtonSpinner type="submit" theme="danger">
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
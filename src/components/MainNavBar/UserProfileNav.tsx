import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {DateTime} from 'luxon';
import { BASE_URL } from "../../services/api";
import * as ActionTypes from '../../store/action/actiontypes';


const UserProfileNav = ({}) => {
  const dropdownRef = useRef(null);
  const history = useHistory();
  const state = useSelector((state) => state.auth);
  // const {data, isSuccess} = useQuery('user', async () => {await axios.get(`${BASE_URL}/users/${state.id}`, {headers: {"Authorization": state.token}})});
  const [data, setData] = useState({});
  let user: any = data;
  const dispatch = useDispatch();
  const [dropdownState, updateDropdownState] = useState({
    isDropdownOpen: false
  });

  const toggleDropdown = () => {
    updateDropdownState({ isDropdownOpen: !dropdownState.isDropdownOpen });
  };

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef &&
      dropdownRef.current &&
      //@ts-ignore
      !dropdownRef.current.contains(event.target)
    ) {
      updateDropdownState({ isDropdownOpen: false });
    }
  };

  const logOut = (event: any) => {
    toggleDropdown();
    event.preventDefault();
    dispatch({type: ActionTypes.LOGOUT_USER})
    history.push('/login');
  };

  const getData = async () => {
    let data = await axios.get(`${BASE_URL}/users/${state.id}`, {
      headers: { "Authorization": state.token }
    });
    setData(data.data);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    getData()
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
        false
      );
    };
  }, []);

  let className = 'dropdown-menu dropdown-menu-lg dropdown-menu-right';

  if (dropdownState.isDropdownOpen) {
    className += ' show';
  }

  return (
    <li ref={dropdownRef} className="nav-item dropdown user-menu">
      <button
        onClick={toggleDropdown}
        type="button"
        className="nav-link dropdown-toggle"
        data-toggle="dropdown"
      >
        <img
          src={'/img/default-profile.png'}
          className="user-image img-circle elevation-2"
          alt="User"
        />
        {/* <span className="d-none d-md-inline">{email}</span> */}
      </button>
      <ul className={className}>
        <li className="user-header bg-primary">
          <img
            src='/img/default-profile.png'
            className="img-circle elevation-2"
            alt="User"
          />
          <p>
            {user.email}
            <small>
              <span>Member since </span>
              <span>
                {DateTime.fromISO(user.dateJoined).toFormat(
                  'dd LLL yyyy'
                )}
              </span>
            </small>
          </p>
        </li>
        <li className="user-body">
          <div className="row">
            <div className="col-4 text-center">
              <Link to="/">Loans</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">Cards</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">Accounts</Link>
            </div>
          </div>
        </li>
        <li className="user-footer">
          <Link
            to="/dashboard/profile"
            onClick={toggleDropdown}
            className="btn btn-default btn-flat"
          >
            Profile
          </Link>
          <button
            type="button"
            className="btn btn-default btn-flat float-right"
            onClick={logOut}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </li>
  );
};

export default UserProfileNav;
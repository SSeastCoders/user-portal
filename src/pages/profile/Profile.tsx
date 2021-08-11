import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Col, Nav, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDisableBar } from '../../hooks/disableBar';
import { BASE_URL } from '../../services/api';
import { User } from '../../services/models/User';
import { ChangeAddress } from './ChangeAddress';
import { ChangePassword } from './ChangePassword';
import { PersonalInfoTab } from './PersonalInfoTab'
interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = ({ }) => {
  useDisableBar();
  const state = useSelector((state) => state.auth);
  const result = useQuery(['user'], async () => {
    const data = await axios.get(`${BASE_URL}/users/${state.id}`, { headers: { "Authorization": state.token } });
    return data.data;
  });
  let user: User = new User(result.data);
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <h2 className="m-0">Profile & Settings</h2>
      </div>
      <section className="content">
        <TabContainer defaultActiveKey="profile-info">
          <Row>
            <Col lg={3}>
              <Nav variant="pills" className="flex-column">
                <NavLink as={Link} to="#info" eventKey="profile-info">Personal Information</NavLink>
                <NavLink as={Link} to="#pass" eventKey="pass">Change password</NavLink>
                <NavLink as={Link} to="#address" eventKey="change-address">Change Address</NavLink>
                <NavLink as={Link} to="#settings" eventKey="settings">Settings</NavLink>
              </Nav>
            </Col>
            <Col lg={9}>
              <TabContent>
                <TabPane eventKey="profile-info" id="info"><PersonalInfoTab user={user}></PersonalInfoTab></TabPane>
                <TabPane eventKey="pass" id="pass"><ChangePassword></ChangePassword></TabPane>
                <TabPane eventKey="change-address" id="address"><ChangeAddress user={user}></ChangeAddress></TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Personal Information</a>
                <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Change Password</a>
                <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <PersonalInfoTab></PersonalInfoTab>
                </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
}
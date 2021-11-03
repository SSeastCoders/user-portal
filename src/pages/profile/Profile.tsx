/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import {
  Col,
  Nav,
  NavLink,
  Row,
  TabContainer,
  TabContent,
  TabPane,
} from 'react-bootstrap';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useDisableBar} from '../../hooks/disableBar';
import {getUserById} from '../../services/services';
import {ChangeAddress} from './ChangeAddress';
import {ChangePassword} from './ChangePassword';
import {PersonalInfoTab} from './PersonalInfoTab';
interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  useDisableBar();
  const state = useSelector(state => state.auth);
  const {data: user, ...result} = useQuery(['user', state.id], async () => {
    return getUserById(state.id!);
  });
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
                <NavLink as={Link} to="#info" eventKey="profile-info">
                  Personal Information
                </NavLink>
                <NavLink as={Link} to="#pass" eventKey="pass">
                  Change password
                </NavLink>
                <NavLink as={Link} to="#address" eventKey="change-address">
                  Change Address
                </NavLink>
                <NavLink as={Link} to="#settings" eventKey="settings">
                  Settings
                </NavLink>
              </Nav>
            </Col>
            <Col lg={9}>
              <TabContent>
                <TabPane eventKey="profile-info" id="info">
                  <PersonalInfoTab user={user}></PersonalInfoTab>
                </TabPane>
                <TabPane eventKey="pass" id="pass">
                  <ChangePassword></ChangePassword>
                </TabPane>
                <TabPane eventKey="change-address" id="address">
                  <ChangeAddress user={user}></ChangeAddress>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </section>
    </div>
  );
};

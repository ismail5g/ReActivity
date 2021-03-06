import React,{Fragment, useContext, useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import NavBar from '../../Features/Nav/NavBar';
import { Route, withRouter, RouteComponentProps, Switch} from 'react-router-dom';
import HomePage from '../../Features/Home/HomePage';
import ActivityForm from '../../Features/Activities/Form/ActivityForm';
import ActivityDetails from '../../Features/Activities/Details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import LoginForm from '../../Features/User/LoginForm';
import { RootStoreContext } from '../Stores/rootStore';
import LoadingComponent from './Loader/LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../Features/Profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

const App: React.FC<RouteComponentProps> =({location}) => {

  const rootStore = useContext(RootStoreContext);
  const {appLoaded, setAppLoaded, token} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if(token){
      getUser().finally(() => setAppLoaded())
    }else{
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if(!appLoaded) return <LoadingComponent content='Loading App ...' />

    return(
      <Fragment>
        <ModalContainer />
        <ToastContainer position = 'bottom-right' />
        <Route exact path='/' component = {HomePage} />
        <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar/>
              <Container style={{marginTop: '7em'}}>
              <Switch>
                <PrivateRoute exact path='/activities' component = {ActivityDashboard} />
                <PrivateRoute path='/activities/:id' component = {ActivityDetails} />
                <PrivateRoute key={location.key} path={['/createActivity', '/manage/:id']} component = {ActivityForm} />
                <PrivateRoute path='/profile/:username' component={ProfilePage} />
                <PrivateRoute path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>            
            </Container>
          </Fragment>
        )} />
    </Fragment>
    );
}

export default withRouter(observer(App));

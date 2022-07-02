import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Bills from './components/Bills'
import CreateBill from './components/CreateBill';
import EditBillForm from './components/EditBillModal/EditBillForm';
import SearchBar from './components/SearchBar';
import UserBills from './components/UserBills';
import Friends from './components/Friends';
import AddFriendBill from './components/AddFriendBill';
import { authenticate } from './store/session';
import UserOverview from './components/UserOverview';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/search' exact={true}>
          <SearchBar />
        </ProtectedRoute>
        <ProtectedRoute path='/bills' exact={true}>
          <Bills />
        </ProtectedRoute>
        {/* DELETE AND TURN INTO MODAL ---------->>>>>>>> */}
        <ProtectedRoute path='/bills/createbill' exact={true}>
          <CreateBill />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/bills/:billId' exact={true}>
          <EditBillForm />
        </ProtectedRoute> */}
        <ProtectedRoute path='/friends'>
          <Friends />
        </ProtectedRoute>
        <ProtectedRoute path='/user-overview/:userId'>
          <UserOverview />
        </ProtectedRoute>
        <ProtectedRoute path='/add-bill-friends'>
          <AddFriendBill />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

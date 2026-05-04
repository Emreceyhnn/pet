import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/authSlice';
import SharedLayout from './components/SharedLayout';
import Home from './pages/Home';
import News from './pages/News';
import Notices from './pages/Notices';
import Friends from './pages/Friends';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddPet from './pages/AddPet';
import Loader from './components/Loader';
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children, restricted = false }) => {
  const token = useSelector((state) => state.auth.token);
  if (token && restricted) {
    return <Navigate to="/profile" replace />;
  }
  return children;
};



function App() {
  const dispatch = useDispatch();
  const { token, user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  if (isLoading && token) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="notices" element={<Notices />} />
        <Route path="friends" element={<Friends />} />
        
        <Route path="register" element={<PublicRoute restricted><Register /></PublicRoute>} />
        <Route path="login" element={<PublicRoute restricted><Login /></PublicRoute>} />
        
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="add-pet" element={<PrivateRoute><AddPet /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}

export default App;

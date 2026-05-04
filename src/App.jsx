import React, { useEffect, useState } from 'react';
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
import NotFound from './pages/NotFound';
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
  const [showLoader, setShowLoader] = useState(
    !sessionStorage.getItem('loaderShown')
  );

  useEffect(() => {
    // If we have a token but no user, OR the user object is incomplete (missing pets/favorites)
    // then fetch the full profile.
    if (token && (!user || user.pets === undefined)) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  const handleLoaderDone = () => {
    sessionStorage.setItem('loaderShown', '1');
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <Loader onDone={handleLoaderDone} />}
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

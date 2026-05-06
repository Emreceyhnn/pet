import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/authSlice';
import SharedLayout from './components/SharedLayout';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const News = lazy(() => import('./pages/News'));
const Notices = lazy(() => import('./pages/Notices'));
const Friends = lazy(() => import('./pages/Friends'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const AddPet = lazy(() => import('./pages/AddPet'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
  const { token, user } = useSelector((state) => state.auth);
  const [showLoader, setShowLoader] = useState(
    !sessionStorage.getItem('loaderShown')
  );

  useEffect(() => {

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
      <Suspense fallback={null}>
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
      </Suspense>
    </>
  );
}

export default App;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <Link to="/" className="text-xl font-bold">
        SocialMedia
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden sm:block">Hello, {user.username}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="default" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

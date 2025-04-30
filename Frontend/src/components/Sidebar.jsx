import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from "@/components/ui/avatar"
import { useSelector } from 'react-redux';
import {
  Home,
  User,
  MessageCircle,
  PlusCircle,
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const links = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
    { to: '/chat', label: 'Chat', icon: <MessageCircle size={20} /> },
    { to: '/create', label: 'New Post', icon: <PlusCircle size={20} /> }
  ];
  

  return (
    <aside className="w-20 sm:w-60 bg-white border-r dark:bg-gray-900 dark:border-gray-700 flex flex-col items-center sm:items-start py-6">
      {user && (
        <div className="mb-8 flex items-center gap-3 px-4">
          <Avatar>
            <Avatar.Image src={user.avatarUrl || '/default-avatar.png'} alt="avatar" />
            <Avatar.Fallback>
              {user.username.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
          <span className="hidden sm:inline font-semibold">{user.username}</span>
        </div>
      )}
      <nav className="flex flex-col w-full gap-2">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
              
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

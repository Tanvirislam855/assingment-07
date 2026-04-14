import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getStatusColor } from '../lib/utils';

export default function FriendCard({ friend }) {
  const statusColorClass = getStatusColor(friend.status);
  const [imgError, setImgError] = useState(false);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Link to={`/friends/${friend.id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
        <div className="p-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100 bg-indigo-100 flex items-center justify-center">
              {!imgError ? (
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-indigo-600 font-semibold text-lg">
                  {getInitials(friend.name)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{friend.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{friend.days_since_contact} days since contact</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {friend.tags.map((tag) => (
              <span key={tag} className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <span className={`status-badge ${statusColorClass}`}>
              {friend.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
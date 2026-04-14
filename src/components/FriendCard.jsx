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
        <div className="p-5 flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-gray-100 mb-3">
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
            <div className="flex min-w-0 flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{friend.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{friend.days_since_contact}d ago</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
            {friend.tags.map((tag) => (
              <span key={tag} className="inline-block bg-green-100 text-[#475569] px-3 py-3 rounded-full font-black text-[10px]  uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 bg-amber-500 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusColorClass}`}>
              {friend.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
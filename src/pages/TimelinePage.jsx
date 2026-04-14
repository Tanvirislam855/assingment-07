import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPhoneAlt, FaCommentDots, FaVideo, FaEdit, FaClock, FaArchive, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getStatusColor, formatDate } from '../lib/utils';
import { useTimeline } from '../context/TimelineContext';
import friendsData from '../data/friends.json';
import LoadingSpinner from '../components/LoadingSpinner';
import InteractionItem from '../components/InteractionItem';

export default function FriendDetailPage() {
  const { id } = useParams();
  const { addEvent } = useTimeline();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  useEffect(() => {
    setTimeout(() => {
      const found = friendsData.find(f => f.id === parseInt(id));
      setFriend(found || null);
      setLoading(false);
    }, 200);
  }, [id]);

  const handleQuickCheckIn = (type) => {
    if (!friend) return;
    const newEvent = {
      type,
      friendName: friend.name,
      date: new Date().toISOString(),
      note: `${type} with ${friend.name}`,
    };
    addEvent(newEvent);
    toast.success(`${type} with ${friend.name} logged!`);
  };

  if (loading) return <LoadingSpinner />;
  if (!friend) return <div className="text-center py-20 text-gray-500">Friend not found</div>;

  const statusColorClass = getStatusColor(friend.status);
  const nextDueDate = friend.next_due_date ? formatDate(friend.next_due_date) : 'N/A';
  const recentInteractions = friend.interactions || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-2 ring-gray-100 bg-indigo-100 flex items-center justify-center">
                {!imgError ? (
                  <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="text-indigo-600 font-semibold text-4xl">
                    {getInitials(friend.name)}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{friend.name}</h2>
              <div className="mt-2">
                <span className={`status-badge ${statusColorClass}`}>{friend.status}</span>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {friend.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">"{friend.bio}"</p>
              <p className="mt-2 text-sm text-gray-500">Preferred: {friend.preferred_contact}</p>
              <p className="mt-1 text-sm text-gray-700">{friend.email}</p>

              <div className="mt-6 w-full space-y-2">
                <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <FaClock className="mr-2 text-gray-500" /> Snooze 2 Weeks
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <FaArchive className="mr-2 text-gray-500" /> Archive
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2.5 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 ">
              <p className="text-sm font-medium text-gray-500">Days Since Contact</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{friend.days_since_contact}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500">Goal (Days)</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{friend.goal}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500">Next Due Date</p>
              <p className="mt-1 text-xl font-bold text-gray-900">{nextDueDate}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-green-700">Relationship Goal</h3>
              <button className="text-indigo-600 hover:text-indigo-800 p-1">
                <FaEdit size={18} />
              </button>
            </div>
            <p className="mt-2 text-gray-700">
              Connect every <span className="font-semibold">{friend.goal} days</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Quick Check-In</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleQuickCheckIn('Call')}
                className="flex items-center px-5 py-2.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
              >
                <FaPhoneAlt className="mr-2" /> Call
              </button>
              <button
                onClick={() => handleQuickCheckIn('Text')}
                className="flex items-center px-5 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <FaCommentDots className="mr-2" /> Text
              </button>
              <button
                onClick={() => handleQuickCheckIn('Video')}
                className="flex items-center px-5 py-2.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
              >
                <FaVideo className="mr-2" /> Video
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Interactions</h3>
        {recentInteractions.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
            {recentInteractions.map((interaction, idx) => (
              <InteractionItem key={idx} interaction={interaction} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200">
            No recent interactions.
          </div>
        )}
      </div>
    </div>
  );
}
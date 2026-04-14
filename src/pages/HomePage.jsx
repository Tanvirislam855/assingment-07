import { useState, useEffect } from 'react';
import { FaUserPlus, FaUsers, FaCheckCircle, FaExclamationTriangle, FaCalendarCheck } from 'react-icons/fa';
import FriendCard from '../components/FriendCard';
import SummaryCard from '../components/SummaryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import friendsData from '../data/friends.json';

export default function HomePage() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 600);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length;
  const interactionsThisMonth = 12;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl p-8 md:p-12  mb-10">
        <div className="flex flex-col  md:items-center md:justify-between ">
          <div>
            <h1 className="text-6xl md:text-4xl font-bold leading-tight text-center">
              Friends to keep close in your life
            </h1>
            <p className="mt-3 text-lg max-w-2xl text-gray-600 text-center">
              Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
            </p>
          </div>
          <div className="mt-6 md:mt-8 flex justify-center md:justify-start">
          <button className="inline-flex items-center px-5 py-3 bg-green-700 text-white text-indigo-700 font-medium rounded-lg shadow-md hover:bg-gray-50 transition-colors">
            <FaUserPlus className="mr-2" />
            Add a Friend
          </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        <SummaryCard title="Total Friends" value={totalFriends}/>
        <SummaryCard title="On Track" value={onTrack} />
        <SummaryCard title="Need Attention" value={needAttention} />
        <SummaryCard title="Interactions This Month" value={interactionsThisMonth} />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}
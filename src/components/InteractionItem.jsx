import { FaPhoneAlt, FaCommentDots, FaVideo, FaUsers } from 'react-icons/fa';
import { formatShortDate } from '../lib/utils';

const iconMap = {
  Call: FaPhoneAlt,
  Text: FaCommentDots,
  Video: FaVideo,
  Meetup: FaUsers,
};

const iconColor = {
  Call: 'text-green-600',
  Text: 'text-blue-600',
  Video: 'text-purple-600',
  Meetup: 'text-orange-600',
};

export default function InteractionItem({ interaction, showFriendName = false }) {
  const Icon = iconMap[interaction.type] || FaCommentDots;
  const color = iconColor[interaction.type] || 'text-gray-600';

  const title = showFriendName && interaction.friendName
    ? `${interaction.type} with ${interaction.friendName}`
    : interaction.note || interaction.type;

  return (
    <div className="p-4 flex items-start space-x-4">
      <div className={`mt-0.5 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5">{formatShortDate(interaction.date)}</p>
      </div>
    </div>
  );
}
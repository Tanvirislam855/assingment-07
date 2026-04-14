export const getStatusColor = (status) => {
  switch (status) {
    case 'overdue': return 'status-overdue';
    case 'almost due': return 'status-almost-due';
    case 'on-track': return 'status-on-track';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatShortDate = (dateString) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
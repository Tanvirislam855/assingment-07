export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex justify-between flex-col-reverse items-center">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600 ">{title}</p>
        <span className="text-gray-600 text-lg">{icon}</span>
        
      </div>
      <p className="mt-2 text-3xl font-bold text-green-900">{value}</p>
    </div>
    
  );
}
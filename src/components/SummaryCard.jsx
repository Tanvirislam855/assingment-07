export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex justify-between flex-col-reverse">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 ">{title}</p>
        <span className="text-gray-400 text-lg">{icon}</span>
        
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
    
  );
}
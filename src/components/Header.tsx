interface HeaderProps {
  totalCount: number
  completedCount: number
}

export default function Header({ totalCount, completedCount }: HeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Todo App
      </h1>
      <p className="text-gray-600 mb-4">
        Stay organized and get things done
      </p>
      
      {totalCount > 0 && (
        <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-2 shadow-sm border">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-primary-600">{completedCount}</span>
            <span className="mx-1">of</span>
            <span className="font-medium">{totalCount}</span>
            <span className="ml-1">completed</span>
          </div>
          
          {totalCount > 0 && (
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

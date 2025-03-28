export default function AlertNotification({ alert }) {
    const getAlertColor = () => {
      switch (alert.severity) {
        case 'high': return 'bg-red-100 border-red-400 text-red-700';
        case 'medium': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
        default: return 'bg-blue-100 border-blue-400 text-blue-700';
      }
    };
  
    return (
      <div className={`${getAlertColor()} border-l-4 p-4 mb-2 rounded`}>
        <div className="flex justify-between">
          <p className="font-bold">{alert.type.toUpperCase()}</p>
          <span className="text-sm">
            {new Date(alert.timestamp?.toDate()).toLocaleString()}
          </span>
        </div>
        <p>{alert.message}</p>
      </div>
    );
  }
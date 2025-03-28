export default function DashboardCard({ title, value, unit, icon, status }) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <p className="text-2xl font-bold">
              {value || "--"} {unit}
            </p>
          </div>
          <Icon name={icon} status={status} />
        </div>
      </div>
    );
  }
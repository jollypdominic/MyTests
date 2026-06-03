import { useEffect, useState } from 'react';
import { IBM_CLOUD_REGIONS, getTimeInTimezone, formatTime24, getBusinessHoursStatus } from '../utils/timezones';

interface RegionStatus {
  name: string;
  timezone: string;
  time: string;
  status: 'active' | 'inactive';
}

export const RegionsTable = () => {
  const [regions, setRegions] = useState<RegionStatus[]>([]);

  useEffect(() => {
    const updateRegions = () => {
      const updatedRegions = IBM_CLOUD_REGIONS.map(region => {
        const time = getTimeInTimezone(region.timezone);
        return {
          name: region.name,
          timezone: region.timezone,
          time: formatTime24(time),
          status: getBusinessHoursStatus(time),
        };
      });
      setRegions(updatedRegions);
    };

    updateRegions();
    const interval = setInterval(updateRegions, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-card">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All IBM Cloud Regions Status</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {regions.map((region) => (
              <tr key={region.timezone} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{region.name}</div>
                  <div className="text-xs text-gray-500">{region.timezone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg font-mono font-semibold text-gray-900">{region.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`business-hours-badge ${region.status === 'active' ? 'business-hours-active' : 'business-hours-inactive'}`}>
                    {region.status === 'active' ? '🟢 Business Hours' : '🔴 Non-Business'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Made with Bob

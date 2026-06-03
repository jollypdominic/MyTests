import { useEffect, useState } from 'react';
import { Clock as ClockIcon } from 'lucide-react';
import { formatTime24, formatDate, getBusinessHoursStatus, getTimeInTimezone } from '../utils/timezones';

interface ClockProps {
  title: string;
  timezone?: string;
  isLocal?: boolean;
}

export const Clock = ({ title, timezone, isLocal = false }: ClockProps) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [businessStatus, setBusinessStatus] = useState<'active' | 'inactive'>('inactive');

  useEffect(() => {
    const updateTime = () => {
      const time = timezone ? getTimeInTimezone(timezone) : new Date();
      setCurrentTime(time);
      setBusinessStatus(getBusinessHoursStatus(time));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  const bgColor = businessStatus === 'active' 
    ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
    : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300';

  return (
    <div className={`clock-card border-2 ${bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClockIcon className={businessStatus === 'active' ? 'text-green-600' : 'text-red-600'} size={24} />
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <span className={`business-hours-badge ${businessStatus === 'active' ? 'business-hours-active' : 'business-hours-inactive'}`}>
          {businessStatus === 'active' ? '🟢 Business Hours' : '🔴 Non-Business Hours'}
        </span>
      </div>
      
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 mb-2 font-mono">
          {formatTime24(currentTime)}
        </div>
        <div className="text-lg text-gray-600">
          {formatDate(currentTime)}
        </div>
        {timezone && (
          <div className="text-sm text-gray-500 mt-2">
            Timezone: {timezone}
          </div>
        )}
      </div>
    </div>
  );
};

// Made with Bob

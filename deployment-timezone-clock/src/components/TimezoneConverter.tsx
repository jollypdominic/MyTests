import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { IBM_CLOUD_REGIONS } from '../utils/timezones';

export const TimezoneConverter = () => {
  const [sourceTimezone, setSourceTimezone] = useState(IBM_CLOUD_REGIONS[0].timezone);
  const [targetTimezone, setTargetTimezone] = useState(IBM_CLOUD_REGIONS[1].timezone);
  const [sourceTime, setSourceTime] = useState('09:00');
  const [convertedTime, setConvertedTime] = useState('');

  const handleConvert = () => {
    try {
      // Create a date object with the source time in the source timezone
      const [hours, minutes] = sourceTime.split(':').map(Number);
      const now = new Date();
      now.setHours(hours, minutes, 0, 0);
      
      // Convert to source timezone
      const sourceDate = new Date(now.toLocaleString('en-US', { timeZone: sourceTimezone }));
      
      // Convert to target timezone
      const targetDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: targetTimezone }));
      
      const targetHours = targetDate.getHours().toString().padStart(2, '0');
      const targetMinutes = targetDate.getMinutes().toString().padStart(2, '0');
      
      setConvertedTime(`${targetHours}:${targetMinutes}`);
    } catch (error) {
      setConvertedTime('Error converting time');
    }
  };

  return (
    <div className="clock-card">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Timezone Converter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Source Timezone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Region
          </label>
          <select
            value={sourceTimezone}
            onChange={(e) => setSourceTimezone(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ibm-blue focus:border-ibm-blue"
          >
            {IBM_CLOUD_REGIONS.map((region) => (
              <option key={region.timezone} value={region.timezone}>
                {region.name}
              </option>
            ))}
          </select>
          
          <label className="block text-sm font-medium text-gray-700 mt-3 mb-2">
            Time
          </label>
          <input
            type="time"
            value={sourceTime}
            onChange={(e) => setSourceTime(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ibm-blue focus:border-ibm-blue font-mono text-lg"
          />
        </div>

        {/* Arrow */}
        <div className="flex justify-center items-center pb-2">
          <ArrowRight className="text-ibm-blue" size={32} />
        </div>

        {/* Target Timezone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Region
          </label>
          <select
            value={targetTimezone}
            onChange={(e) => setTargetTimezone(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ibm-blue focus:border-ibm-blue"
          >
            {IBM_CLOUD_REGIONS.map((region) => (
              <option key={region.timezone} value={region.timezone}>
                {region.name}
              </option>
            ))}
          </select>
          
          <label className="block text-sm font-medium text-gray-700 mt-3 mb-2">
            Converted Time
          </label>
          <div className="w-full px-3 py-2 border-2 border-green-300 bg-green-50 rounded-lg font-mono text-lg font-bold text-green-800">
            {convertedTime || '--:--'}
          </div>
        </div>
      </div>

      <button
        onClick={handleConvert}
        className="mt-6 w-full bg-ibm-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-300"
      >
        Convert Time
      </button>
    </div>
  );
};

// Made with Bob

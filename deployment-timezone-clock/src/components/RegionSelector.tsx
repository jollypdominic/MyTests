import { IBM_CLOUD_REGIONS } from '../utils/timezones';

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (timezone: string) => void;
}

export const RegionSelector = ({ selectedRegion, onRegionChange }: RegionSelectorProps) => {
  return (
    <div className="clock-card">
      <label htmlFor="region-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Deployment Region
      </label>
      <select
        id="region-select"
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ibm-blue focus:border-ibm-blue transition-all"
      >
        {IBM_CLOUD_REGIONS.map((region) => (
          <option key={region.timezone} value={region.timezone}>
            {region.name} ({region.city})
          </option>
        ))}
      </select>
    </div>
  );
};

// Made with Bob

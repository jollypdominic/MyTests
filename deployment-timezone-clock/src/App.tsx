import { useState } from 'react';
import { Clock } from './components/Clock';
import { RegionSelector } from './components/RegionSelector';
import { RegionsTable } from './components/RegionsTable';
import { TimezoneConverter } from './components/TimezoneConverter';
import { DeploymentWindowCalculator } from './components/DeploymentWindowCalculator';
import { IBM_CLOUD_REGIONS } from './utils/timezones';

function App() {
  const [selectedRegion, setSelectedRegion] = useState(IBM_CLOUD_REGIONS[0].timezone);

  const selectedRegionData = IBM_CLOUD_REGIONS.find(r => r.timezone === selectedRegion);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            IBM Cloud Deployment Timezone Clock
          </h1>
          <p className="text-lg text-white/90">
            Platform Deployment Team - Global Region Time Tracker
          </p>
        </header>

        {/* Main Clocks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Clock title="Your Local Time" isLocal={true} />
          <Clock 
            title={`${selectedRegionData?.name || 'Selected Region'} Time`}
            timezone={selectedRegion}
          />
        </div>

        {/* Region Selector */}
        <div className="mb-6">
          <RegionSelector 
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        </div>

        {/* Deployment Window Calculator */}
        <div className="mb-6">
          <DeploymentWindowCalculator />
        </div>

        {/* Timezone Converter */}
        <div className="mb-6">
          <TimezoneConverter />
        </div>

        {/* All Regions Table */}
        <div className="mb-6">
          <RegionsTable />
        </div>

        {/* Footer */}
        <footer className="text-center text-white/80 text-sm mt-8">
          <p>Business Hours: 8:00 AM - 6:00 PM (Local Time)</p>
          <p className="mt-2">© 2026 IBM Cloud Platform Deployment Team</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

// Made with Bob

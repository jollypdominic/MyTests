import { useEffect, useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { findOptimalDeploymentWindows, getCurrentWindowStatus } from '../utils/deploymentWindows';
import type { DeploymentWindow } from '../utils/deploymentWindows';

export const DeploymentWindowCalculator = () => {
  const [currentStatus, setCurrentStatus] = useState<{
    regionsInBusinessHours: string[];
    regionsOutOfBusinessHours: string[];
    coverage: number;
  }>({ regionsInBusinessHours: [], regionsOutOfBusinessHours: [], coverage: 0 });
  
  const [optimalWindows, setOptimalWindows] = useState<DeploymentWindow[]>([]);
  const [showAllWindows, setShowAllWindows] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setCurrentStatus(getCurrentWindowStatus());
      setOptimalWindows(findOptimalDeploymentWindows());
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 75) return 'text-green-600 bg-green-100';
    if (coverage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const displayedWindows = showAllWindows ? optimalWindows : optimalWindows.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="clock-card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-ibm-blue" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Current Deployment Window Status</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900">{currentStatus.regionsInBusinessHours.length}</div>
            <div className="text-sm text-gray-600 mt-1">Regions in Business Hours</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900">{currentStatus.regionsOutOfBusinessHours.length}</div>
            <div className="text-sm text-gray-600 mt-1">Regions Out of Business Hours</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-3xl font-bold ${getCoverageColor(currentStatus.coverage).split(' ')[0]}`}>
              {currentStatus.coverage}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Coverage</div>
          </div>
        </div>

        {currentStatus.regionsInBusinessHours.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-sm font-medium text-green-800 mb-2">✅ Regions Currently in Business Hours:</div>
            <div className="text-sm text-green-700">
              {currentStatus.regionsInBusinessHours.join(', ')}
            </div>
          </div>
        )}

        {currentStatus.regionsOutOfBusinessHours.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-sm font-medium text-red-800 mb-2">❌ Regions Currently Out of Business Hours:</div>
            <div className="text-sm text-red-700">
              {currentStatus.regionsOutOfBusinessHours.join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Optimal Deployment Windows */}
      <div className="clock-card">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-ibm-blue" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Optimal Deployment Windows (UTC)</h2>
        </div>
        
        <div className="space-y-3">
          {displayedWindows.map((window, index) => (
            <div
              key={`${window.startTime}-${index}`}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-ibm-blue transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900 font-mono">
                    {window.startTime} - {window.endTime}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCoverageColor(window.coverage)}`}>
                    {window.coverage}% Coverage
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {window.regionsInBusinessHours.length} / {window.totalRegions} regions
                </div>
              </div>
              
              {window.regionsInBusinessHours.length > 0 && (
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Regions: </span>
                  {window.regionsInBusinessHours.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>

        {!showAllWindows && optimalWindows.length > 5 && (
          <button
            onClick={() => setShowAllWindows(true)}
            className="mt-4 w-full py-2 text-ibm-blue font-medium hover:bg-blue-50 rounded-lg transition-colors"
          >
            Show All {optimalWindows.length} Windows
          </button>
        )}

        {showAllWindows && (
          <button
            onClick={() => setShowAllWindows(false)}
            className="mt-4 w-full py-2 text-ibm-blue font-medium hover:bg-blue-50 rounded-lg transition-colors"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

// Made with Bob

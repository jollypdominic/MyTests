import { IBM_CLOUD_REGIONS, getTimeInTimezone, isBusinessHours } from './timezones';

export interface DeploymentWindow {
  startTime: string;
  endTime: string;
  regionsInBusinessHours: string[];
  totalRegions: number;
  coverage: number; // percentage
}

export const findOptimalDeploymentWindows = (): DeploymentWindow[] => {
  const windows: DeploymentWindow[] = [];
  const now = new Date();
  
  // Check each hour of the day
  for (let hour = 0; hour < 24; hour++) {
    const testDate = new Date(now);
    testDate.setHours(hour, 0, 0, 0);
    
    const regionsInBusinessHours: string[] = [];
    
    IBM_CLOUD_REGIONS.forEach(region => {
      const regionTime = getTimeInTimezone(region.timezone);
      regionTime.setHours(hour, 0, 0, 0);
      
      if (isBusinessHours(regionTime.getHours())) {
        regionsInBusinessHours.push(region.name);
      }
    });
    
    const coverage = (regionsInBusinessHours.length / IBM_CLOUD_REGIONS.length) * 100;
    
    windows.push({
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${((hour + 1) % 24).toString().padStart(2, '0')}:00`,
      regionsInBusinessHours,
      totalRegions: IBM_CLOUD_REGIONS.length,
      coverage: Math.round(coverage),
    });
  }
  
  // Sort by coverage (highest first)
  return windows.sort((a, b) => b.coverage - a.coverage);
};

export const getBestDeploymentWindow = (): DeploymentWindow => {
  const windows = findOptimalDeploymentWindows();
  return windows[0];
};

export const getCurrentWindowStatus = (): {
  regionsInBusinessHours: string[];
  regionsOutOfBusinessHours: string[];
  coverage: number;
} => {
  const regionsInBusinessHours: string[] = [];
  const regionsOutOfBusinessHours: string[] = [];
  
  IBM_CLOUD_REGIONS.forEach(region => {
    const regionTime = getTimeInTimezone(region.timezone);
    
    if (isBusinessHours(regionTime.getHours())) {
      regionsInBusinessHours.push(region.name);
    } else {
      regionsOutOfBusinessHours.push(region.name);
    }
  });
  
  const coverage = (regionsInBusinessHours.length / IBM_CLOUD_REGIONS.length) * 100;
  
  return {
    regionsInBusinessHours,
    regionsOutOfBusinessHours,
    coverage: Math.round(coverage),
  };
};

// Made with Bob

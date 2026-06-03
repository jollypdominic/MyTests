export interface Region {
  name: string;
  timezone: string;
  city: string;
}

export const IBM_CLOUD_REGIONS: Region[] = [
  { name: 'Sydney', timezone: 'Australia/Sydney', city: 'Sydney' },
  { name: 'Sao Paulo', timezone: 'America/Sao_Paulo', city: 'Sao Paulo' },
  { name: 'Toronto', timezone: 'America/Toronto', city: 'Toronto' },
  { name: 'Osaka', timezone: 'Asia/Tokyo', city: 'Osaka' },
  { name: 'London', timezone: 'Europe/London', city: 'London' },
  { name: 'Frankfurt', timezone: 'Europe/Berlin', city: 'Frankfurt' },
  { name: 'Paris', timezone: 'Europe/Paris', city: 'Paris' },
  { name: 'Madrid', timezone: 'Europe/Madrid', city: 'Madrid' },
  { name: 'Dallas', timezone: 'America/Chicago', city: 'Dallas' },
  { name: 'Washington', timezone: 'America/New_York', city: 'Washington DC' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', city: 'Tokyo' },
  { name: 'Chennai', timezone: 'Asia/Kolkata', city: 'Chennai' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata', city: 'Mumbai' },
  { name: 'Montreal', timezone: 'America/Toronto', city: 'Montreal' },
];

export const BUSINESS_HOURS = {
  start: 8, // 8 AM
  end: 18,  // 6 PM
};

export const isBusinessHours = (hour: number): boolean => {
  return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
};

export const getBusinessHoursStatus = (date: Date): 'active' | 'inactive' => {
  const hour = date.getHours();
  return isBusinessHours(hour) ? 'active' : 'inactive';
};

export const formatTime24 = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getTimeInTimezone = (timezone: string): Date => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
};

// Made with Bob

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch {
    return 'Invalid date';
  }
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    ON_LEAVE: 'bg-yellow-100 text-yellow-800',
    PLANNING: 'bg-blue-100 text-blue-800',
    ON_HOLD: 'bg-orange-100 text-orange-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getAllocationStatusColor(percentage: number): string {
  if (percentage > 100) return 'text-red-600';
  if (percentage === 100) return 'text-green-600';
  if (percentage >= 80) return 'text-yellow-600';
  return 'text-blue-600';
}

// Made with Bob

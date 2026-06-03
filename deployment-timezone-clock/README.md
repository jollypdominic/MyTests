# IBM Cloud Deployment Timezone Clock

A modern React application designed for IBM Cloud Platform Deployment teams to track time across global production regions and identify optimal deployment windows.

## Features

### 🕐 Dual Clock Display
- **Local Time Clock**: Shows your current local time with business hours indicator
- **Selected Region Clock**: Displays time for any selected IBM Cloud region
- Color-coded backgrounds:
  - 🟢 Green: Business hours (8 AM - 6 PM local time)
  - 🔴 Red: Non-business hours

### 🌍 Supported IBM Cloud Regions
- Sydney, Australia
- Sao Paulo, Brazil
- Toronto, Canada
- Osaka, Japan
- London, United Kingdom
- Frankfurt, Germany
- Paris, France
- Madrid, Spain
- Dallas, USA
- Washington DC, USA
- Tokyo, Japan
- Chennai, India
- Mumbai, India
- Montreal, Canada

### 📊 All Regions Status Table
Real-time table showing:
- Current time in all 14 IBM Cloud regions
- Business hours status for each region
- Timezone information
- Auto-updates every second

### 🔄 Timezone Converter
Convert times between any two IBM Cloud regions:
- Select source and target regions
- Input time in source region
- Get instant conversion to target region time
- Useful for scheduling meetings and deployments

### 📅 Deployment Window Calculator
Intelligent deployment planning tool:
- **Current Status**: Shows how many regions are currently in business hours
- **Coverage Percentage**: Real-time calculation of global coverage
- **Optimal Windows**: Lists the best deployment times (UTC) ranked by coverage
- **Region Details**: See which regions are in business hours for each time window
- Helps identify deployment windows that minimize impact

## Installation

### Prerequisites
- Node.js 18+ and npm

### Setup Steps

1. **Navigate to the project directory:**
   ```bash
   cd deployment-timezone-clock
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The application will automatically open at `http://localhost:3002`

## Usage

### Viewing Time Zones
1. The top section shows your local time and the selected region time
2. Use the dropdown to select different IBM Cloud regions
3. Clocks update in real-time every second

### Finding Optimal Deployment Windows
1. Scroll to the "Optimal Deployment Windows" section
2. View the current coverage percentage
3. See which regions are currently in business hours
4. Review the ranked list of best deployment times
5. Click "Show All Windows" to see all 24 hourly windows

### Converting Time Zones
1. Navigate to the "Timezone Converter" section
2. Select the source region (From)
3. Enter the time you want to convert
4. Select the target region (To)
5. Click "Convert Time" to see the result

### Monitoring All Regions
1. Scroll to the "All IBM Cloud Regions Status" table
2. View real-time status for all 14 regions
3. Green badges indicate business hours
4. Red badges indicate non-business hours

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Technology Stack

- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **date-fns & date-fns-tz**: Timezone handling

## Business Hours Definition

Business hours are defined as:
- **Start**: 8:00 AM local time
- **End**: 6:00 PM local time

These hours apply to each region's local timezone.

## Project Structure

```
deployment-timezone-clock/
├── src/
│   ├── components/          # React components
│   │   ├── Clock.tsx       # Individual clock display
│   │   ├── RegionSelector.tsx
│   │   ├── RegionsTable.tsx
│   │   ├── TimezoneConverter.tsx
│   │   └── DeploymentWindowCalculator.tsx
│   ├── utils/              # Utility functions
│   │   ├── timezones.ts   # Timezone logic
│   │   └── deploymentWindows.ts
│   ├── App.tsx            # Main application
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Regions

To add a new IBM Cloud region:

1. Open `src/utils/timezones.ts`
2. Add the region to the `IBM_CLOUD_REGIONS` array:
   ```typescript
   { name: 'Region Name', timezone: 'Timezone/Identifier', city: 'City Name' }
   ```
3. The region will automatically appear in all components

## Troubleshooting

### Clock not updating
- Ensure JavaScript is enabled in your browser
- Check browser console for errors

### Incorrect timezone
- Verify the timezone identifier in `timezones.ts`
- Use IANA timezone database format (e.g., 'America/New_York')

### Build errors
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 18 or higher

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

## License

© 2026 IBM Cloud Platform Deployment Team

---

**Note**: This application uses browser-based timezone calculations. Ensure your system time and timezone settings are correct for accurate results.
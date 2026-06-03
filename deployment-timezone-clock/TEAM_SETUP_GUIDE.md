# IBM Cloud Deployment Timezone Clock - Team Setup Guide

## 📋 Quick Access Information

**Repository URL:** https://github.com/jollypdominic/MyTests

**Application Directory:** `deployment-timezone-clock/`

**Live Application Port:** http://localhost:3002 (after running locally)

---

## 🚀 Getting Started - For Team Members

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **A modern web browser** (Chrome, Firefox, Safari, or Edge)

To verify your installations, run:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
git --version   # Should show 2.x.x or higher
```

---

## 📥 Step 1: Clone the Repository

### Option A: Using HTTPS (Recommended for most users)

```bash
# Clone the repository
git clone https://github.com/jollypdominic/MyTests.git

# Navigate to the project directory
cd MyTests
```

### Option B: Using SSH (If you have SSH keys set up)

```bash
# Clone the repository
git clone git@github.com:jollypdominic/MyTests.git

# Navigate to the project directory
cd MyTests
```

---

## 🔧 Step 2: Install Dependencies

```bash
# Navigate to the application directory
cd deployment-timezone-clock

# Install all required dependencies
npm install
```

**Note:** This may take 2-5 minutes depending on your internet connection. You'll see a progress bar showing package installations.

---

## ▶️ Step 3: Run the Application

```bash
# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3002/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

The application will automatically open in your default browser at **http://localhost:3002**

---

## 🌐 Accessing the Application

Once the server is running, you can access the application at:

**Local URL:** http://localhost:3002

### If the browser doesn't open automatically:
1. Open your web browser
2. Type `http://localhost:3002` in the address bar
3. Press Enter

---

## 📱 Application Features Overview

### 1. **Dual Clock Display**
- Your local time (left)
- Selected IBM Cloud region time (right)
- Color-coded: 🟢 Green = Business Hours (8 AM - 6 PM), 🔴 Red = Non-Business Hours

### 2. **Region Selector**
- Dropdown menu to select any of the 14 IBM Cloud regions
- Instantly updates the selected region clock

### 3. **Deployment Window Calculator**
- Shows current deployment coverage across all regions
- Lists optimal deployment windows ranked by business hours coverage
- Helps identify the best times to deploy with minimal impact

### 4. **Timezone Converter**
- Convert times between any two IBM Cloud regions
- Useful for scheduling meetings and coordinating deployments

### 5. **All Regions Status Table**
- Real-time view of all 14 regions
- Current time and business hours status for each region
- Updates every second

---

## 🌍 Supported IBM Cloud Regions

The application tracks these 14 production regions:

| Region | City | Timezone |
|--------|------|----------|
| Sydney | Sydney | Australia/Sydney |
| Sao Paulo | Sao Paulo | America/Sao_Paulo |
| Toronto | Toronto | America/Toronto |
| Osaka | Osaka | Asia/Tokyo |
| London | London | Europe/London |
| Frankfurt | Frankfurt | Europe/Berlin |
| Paris | Paris | Europe/Paris |
| Madrid | Madrid | Europe/Madrid |
| Dallas | Dallas | America/Chicago |
| Washington | Washington DC | America/New_York |
| Tokyo | Tokyo | Asia/Tokyo |
| Chennai | Chennai | Asia/Kolkata |
| Mumbai | Mumbai | Asia/Kolkata |
| Montreal | Montreal | America/Toronto |

---

## 🛠️ Troubleshooting

### Issue: Port 3002 is already in use

**Solution:**
```bash
# Stop the current process and try again, or
# Edit vite.config.ts to use a different port
```

### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Application doesn't load

**Solution:**
1. Check if the server is running (you should see the Vite output in terminal)
2. Try accessing http://localhost:3002 directly
3. Clear your browser cache and reload
4. Check browser console for errors (F12 → Console tab)

### Issue: Time zones are incorrect

**Solution:**
- Ensure your system time and timezone are set correctly
- The application uses your browser's timezone settings

---

## 🔄 Updating to Latest Version

To get the latest updates from the repository:

```bash
# Make sure you're in the MyTests directory
cd MyTests

# Pull the latest changes
git pull origin main

# Navigate to the app directory
cd deployment-timezone-clock

# Update dependencies (if needed)
npm install

# Restart the development server
npm run dev
```

---

## 📧 Getting Help

### For Technical Issues:
1. Check the troubleshooting section above
2. Review the main [README.md](README.md) for detailed documentation
3. Contact the repository owner: jollypdominic

### For Feature Requests or Bugs:
- Create an issue on GitHub: https://github.com/jollypdominic/MyTests/issues

---

## 🎯 Best Practices for Team Use

### 1. **For Deployment Planning:**
- Use the Deployment Window Calculator to identify optimal deployment times
- Check the coverage percentage to ensure maximum regions are in business hours
- Review the regions list to see which specific regions will be affected

### 2. **For Meeting Scheduling:**
- Use the Timezone Converter to find suitable meeting times
- Check the All Regions Status Table to see current business hours across regions

### 3. **For Daily Operations:**
- Keep the application open during work hours for quick timezone reference
- Use the dual clock display to track your local time and key deployment regions

---

## 📊 Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Application accessible at http://localhost:3002
- [ ] Tested timezone converter
- [ ] Reviewed deployment windows

---

## 🔐 Repository Access

### For New Team Members:

If you don't have access to the repository, contact the repository owner to:
1. Get added as a collaborator
2. Receive repository access permissions

### Repository Settings:
- **Visibility:** Check with repository owner (Public/Private)
- **Access Level:** Read access is sufficient to clone and run the application

---

## 💡 Tips for Effective Use

1. **Bookmark the local URL** (http://localhost:3002) for quick access
2. **Keep the terminal window open** while using the application
3. **Use the deployment window calculator** before planning any production deployments
4. **Check multiple regions** when scheduling cross-regional activities
5. **Refer to the coverage percentage** to minimize deployment impact

---

## 📝 Additional Resources

- **Main Documentation:** [README.md](README.md)
- **Repository:** https://github.com/jollypdominic/MyTests
- **Node.js Documentation:** https://nodejs.org/docs
- **React Documentation:** https://react.dev

---

## ✅ Success Indicators

You'll know everything is working correctly when:
- ✅ The application loads at http://localhost:3002
- ✅ Both clocks are updating every second
- ✅ You can select different regions from the dropdown
- ✅ The regions table shows all 14 regions with current times
- ✅ The timezone converter produces accurate results
- ✅ The deployment window calculator shows coverage percentages

---

**Last Updated:** June 2026  
**Version:** 1.0.0  
**Maintained by:** jollypdominic
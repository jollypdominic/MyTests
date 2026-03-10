# Headcount Management System - User Manual & Troubleshooting Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Feature Guide](#feature-guide)
5. [Troubleshooting Guide](#troubleshooting-guide)
6. [FAQ](#faq)
7. [Best Practices](#best-practices)

---

## Introduction

### What is the Headcount Management System?

The Headcount Management System is a comprehensive web-based application designed to help organizations:
- Track employees across multiple projects and locations
- Manage percentage-based project allocations
- Generate custom reports with scheduling capabilities
- Maintain audit trails for compliance
- Control access based on user roles

### Key Benefits

- **Centralized Data**: All employee and project information in one place
- **Allocation Tracking**: Ensure employees are properly allocated across projects
- **Compliance**: Complete audit trail of all changes
- **Flexibility**: Custom reports tailored to your needs
- **Security**: Role-based access control protects sensitive data

---

## Getting Started

### Accessing the System

1. **Open your web browser** (Chrome, Firefox, Safari, or Edge)
2. **Navigate to** the system URL provided by your administrator
3. **Login** using your company credentials

### First-Time Login

1. Enter your **username** and **password**
2. If using SSO, click **"Sign in with Company Account"**
3. You'll be directed to your dashboard based on your role

### Dashboard Overview

After logging in, you'll see:
- **Summary Cards**: Quick stats (total employees, active projects, etc.)
- **Recent Activity**: Latest changes and updates
- **Quick Actions**: Buttons for common tasks
- **Alerts**: Notifications about allocation issues or pending tasks

---

## User Roles & Permissions

### Admin
**Full system access**
- ✅ Manage all employees, projects, and allocations
- ✅ Create and manage user accounts
- ✅ Access all reports and analytics
- ✅ Configure system settings
- ✅ View complete audit logs

### HR
**Full access to employee and project data**
- ✅ Manage all employees and their information
- ✅ Create and manage projects
- ✅ Manage all allocations
- ✅ Generate and schedule reports
- ✅ View audit logs
- ❌ Cannot manage user accounts or system settings

### Manager
**Access to their team's data**
- ✅ View and edit their direct reports
- ✅ View projects their team is assigned to
- ✅ Manage allocations for their team members
- ✅ Generate reports for their team
- ❌ Cannot access other teams' data
- ❌ Cannot create new employees or projects

### Employee
**View-only access to personal data**
- ✅ View their own profile
- ✅ View their project allocations
- ✅ View their allocation history
- ❌ Cannot edit any data
- ❌ Cannot view other employees' information

---

## Feature Guide

### 1. Employee Management

#### Viewing Employees

1. Click **"Employees"** in the navigation menu
2. Use **filters** to narrow results:
   - Department
   - Location
   - Employment Status
   - Search by name or ID
3. Click on an employee to view details

#### Adding a New Employee (HR/Admin only)

1. Navigate to **Employees** page
2. Click **"Add Employee"** button
3. Fill in required information:
   - **Basic Info**: Name, Employee ID, Email
   - **Organization**: Department, Location, Manager
   - **Job Details**: Title, Cost Center, Salary Band
   - **Dates**: Join Date, Employment Status
4. Optionally add:
   - Skills (comma-separated)
   - Certifications
   - Performance Rating
5. Click **"Save"**

#### Editing Employee Information (HR/Admin/Manager)

1. Find the employee in the list
2. Click **"Edit"** or click on their name
3. Update the necessary fields
4. Click **"Save Changes"**
5. Changes are automatically logged in the audit trail

#### Deactivating an Employee (HR/Admin only)

1. Open the employee's profile
2. Change **Employment Status** to "Inactive"
3. Click **"Save"**
4. The employee will no longer appear in active employee lists

### 2. Project Management

#### Viewing Projects

1. Click **"Projects"** in the navigation menu
2. Filter by:
   - Status (Active, Completed, On Hold, Cancelled)
   - Location
   - Date Range
3. Click on a project to view details and team composition

#### Creating a New Project (HR/Admin only)

1. Navigate to **Projects** page
2. Click **"Add Project"** button
3. Enter project information:
   - **Project Code**: Unique identifier
   - **Project Name**: Full project name
   - **Description**: Brief description
   - **Dates**: Start and End dates
   - **Location**: Primary location
   - **Owner**: Project owner/manager
   - **Status**: Active, Completed, On Hold, or Cancelled
4. Click **"Create Project"**

#### Updating Project Information (HR/Admin/Owner)

1. Find the project in the list
2. Click **"Edit"**
3. Update necessary fields
4. Click **"Save Changes"**

#### Viewing Project Team

1. Open the project details
2. Click **"Team"** tab
3. View all allocated employees with their allocation percentages
4. See allocation timelines and history

### 3. Allocation Management

#### Understanding Allocations

- Employees can be allocated to **multiple projects**
- Each allocation has a **percentage** (e.g., 50% Project A, 30% Project B)
- Total allocation should **not exceed 100%**
- Allocations have **effective date ranges**

#### Creating an Allocation (HR/Admin/Manager)

1. Navigate to **Allocations** page or employee/project detail page
2. Click **"Add Allocation"**
3. Select:
   - **Employee**: Choose from dropdown
   - **Project**: Choose from dropdown
   - **Percentage**: Enter allocation percentage (1-100)
   - **Effective From**: Start date
   - **Effective To**: End date (optional)
4. System will **validate** that total allocation ≤ 100%
5. If validation passes, click **"Save"**

#### Allocation Validation

The system automatically checks:
- ✅ Total allocation doesn't exceed 100%
- ✅ No overlapping allocations with conflicts
- ✅ Valid date ranges
- ⚠️ Warnings for under-allocation (<100%)

**Example Validation Messages:**
- ✅ "Allocation valid. Employee will be at 85% total allocation."
- ❌ "Error: This allocation would result in 120% total allocation."
- ⚠️ "Warning: Employee will be under-allocated at 60%."

#### Editing an Allocation (HR/Admin/Manager)

1. Find the allocation in the list
2. Click **"Edit"**
3. Update percentage or dates
4. System re-validates the allocation
5. Click **"Save Changes"**

#### Ending an Allocation

1. Open the allocation
2. Set an **"Effective To"** date
3. Click **"Save"**
4. Allocation will automatically become inactive after that date

#### Checking Allocation Conflicts

1. Navigate to **Allocations** → **"Conflicts"**
2. View list of:
   - **Over-allocated employees** (>100%)
   - **Under-allocated employees** (<100%)
   - **Conflicting date ranges**
3. Click on each conflict to resolve

### 4. Reporting

#### Viewing Standard Reports

1. Click **"Reports"** in the navigation menu
2. Select from standard reports:
   - Headcount by Department
   - Headcount by Location
   - Project Utilization
   - Allocation Summary
   - Employee Directory
3. Apply filters as needed
4. Click **"Generate Report"**

#### Creating Custom Reports (HR/Admin)

1. Navigate to **Reports** → **"Create Report"**
2. **Name your report**
3. **Select data to include**:
   - Employee fields
   - Project fields
   - Allocation data
4. **Add filters**:
   - Department
   - Location
   - Date Range
   - Employment Status
   - Project Status
5. **Configure grouping**:
   - Group by Department, Location, Project, or Manager
6. **Preview** the report
7. Click **"Save Report"**

#### Scheduling Reports (HR/Admin)

1. Open a saved report
2. Click **"Schedule"**
3. Configure schedule:
   - **Frequency**: Daily, Weekly, Monthly
   - **Day/Time**: When to run
   - **Recipients**: Email addresses
   - **Format**: Excel, CSV, or PDF
4. Click **"Save Schedule"**
5. Reports will be automatically generated and emailed

#### Exporting Reports

1. Generate or open a report
2. Click **"Export"** button
3. Choose format:
   - **Excel**: For data analysis
   - **CSV**: For importing to other systems
   - **PDF**: For printing or sharing
4. File will download to your computer

### 5. User Profile

#### Viewing Your Profile

1. Click your **name** in the top-right corner
2. Select **"My Profile"**
3. View your:
   - Personal information
   - Current allocations
   - Allocation history
   - Manager information

#### Updating Your Profile (Limited)

Employees can update:
- Contact information (if permitted)
- Skills
- Certifications

Other fields must be updated by HR or Admin.

---

## Troubleshooting Guide

### Login Issues

#### Problem: Cannot log in with credentials

**Possible Causes & Solutions:**

1. **Incorrect username or password**
   - ✅ Verify your credentials
   - ✅ Check Caps Lock is off
   - ✅ Try resetting your password

2. **Account is inactive**
   - ✅ Contact your HR department
   - ✅ Verify your employment status

3. **SSO not working**
   - ✅ Ensure you're on the company network or VPN
   - ✅ Clear browser cache and cookies
   - ✅ Try a different browser
   - ✅ Contact IT support

#### Problem: "Session expired" message

**Solution:**
- Your session timed out after 30 minutes of inactivity
- Simply log in again
- Your work is automatically saved

### Employee Management Issues

#### Problem: Cannot find an employee

**Possible Causes & Solutions:**

1. **Employee is inactive**
   - ✅ Change filter to show "Inactive" employees
   - ✅ Check "All Statuses" option

2. **Insufficient permissions**
   - ✅ Managers can only see their direct reports
   - ✅ Contact HR if you need access to other employees

3. **Search not working**
   - ✅ Try searching by Employee ID instead of name
   - ✅ Check spelling
   - ✅ Use partial name search

#### Problem: Cannot edit employee information

**Possible Causes & Solutions:**

1. **Insufficient permissions**
   - ✅ Only HR, Admin, and the employee's manager can edit
   - ✅ Employees cannot edit their own core information
   - ✅ Request changes through your manager or HR

2. **Employee is inactive**
   - ✅ Inactive employees may have restricted editing
   - ✅ Contact HR to reactivate if needed

#### Problem: "Duplicate Employee ID" error

**Solution:**
- Employee IDs must be unique
- Check if the employee already exists in the system
- Use a different Employee ID
- Contact HR if you believe this is an error

### Project Management Issues

#### Problem: Cannot create a project

**Possible Causes & Solutions:**

1. **Insufficient permissions**
   - ✅ Only HR and Admin can create projects
   - ✅ Request project creation through HR

2. **Duplicate project code**
   - ✅ Project codes must be unique
   - ✅ Choose a different project code

3. **Invalid dates**
   - ✅ End date must be after start date
   - ✅ Check date format

#### Problem: Cannot see all projects

**Solution:**
- Managers only see projects their team is assigned to
- HR and Admin see all projects
- Use filters to find specific projects

### Allocation Issues

#### Problem: "Allocation exceeds 100%" error

**Explanation:**
- The system prevents over-allocation
- An employee's total allocation across all projects cannot exceed 100%

**Solutions:**

1. **Check current allocations**
   - View employee's current allocations
   - Calculate total percentage

2. **Adjust percentages**
   - Reduce allocation on other projects
   - End inactive allocations

3. **Use date ranges**
   - Set end dates on old allocations
   - Start new allocations after old ones end

**Example:**
```
Current Allocations:
- Project A: 60% (Jan 1 - ongoing)
- Project B: 50% (Jan 1 - ongoing)
Total: 110% ❌

Solution 1: Adjust percentages
- Project A: 50%
- Project B: 50%
Total: 100% ✅

Solution 2: Use date ranges
- Project A: 60% (Jan 1 - Mar 31)
- Project B: 50% (Apr 1 - ongoing)
No overlap ✅
```

#### Problem: Cannot delete an allocation

**Possible Causes & Solutions:**

1. **Insufficient permissions**
   - ✅ Only HR, Admin, and managers can delete allocations
   - ✅ Request deletion through your manager

2. **Historical data protection**
   - ✅ Past allocations cannot be deleted (audit trail)
   - ✅ Set an end date instead

3. **Active allocation**
   - ✅ Set "Effective To" date to end the allocation
   - ✅ Allocation will automatically become inactive

#### Problem: Allocation conflicts not showing

**Solution:**
- Click **"Refresh"** button
- Navigate to **Allocations** → **"Check Conflicts"**
- System runs validation across all allocations
- May take a few seconds for large datasets

### Reporting Issues

#### Problem: Report is empty or shows no data

**Possible Causes & Solutions:**

1. **Filters too restrictive**
   - ✅ Remove some filters
   - ✅ Expand date range
   - ✅ Check "All Statuses" option

2. **No data matches criteria**
   - ✅ Verify data exists for your filters
   - ✅ Try different filter combinations

3. **Permission restrictions**
   - ✅ Managers only see their team's data
   - ✅ Contact HR for broader reports

#### Problem: Report generation is slow

**Explanation:**
- Large reports may take up to 30 seconds
- System is processing thousands of records

**Solutions:**
- ✅ Be patient, don't refresh the page
- ✅ Use more specific filters to reduce data
- ✅ Schedule large reports to run overnight
- ✅ Export to Excel for faster local analysis

#### Problem: Scheduled report not received

**Possible Causes & Solutions:**

1. **Check spam/junk folder**
   - ✅ Add system email to safe senders

2. **Incorrect email address**
   - ✅ Verify email in report schedule settings
   - ✅ Update if needed

3. **Report schedule inactive**
   - ✅ Check if schedule is enabled
   - ✅ Verify schedule settings

4. **Email service issue**
   - ✅ Contact IT support
   - ✅ Check system status page

#### Problem: Cannot export report

**Possible Causes & Solutions:**

1. **Browser blocking download**
   - ✅ Check browser's download settings
   - ✅ Allow downloads from the system URL

2. **Report too large**
   - ✅ Add filters to reduce data size
   - ✅ Export in smaller chunks
   - ✅ Use CSV instead of Excel for large datasets

3. **Pop-up blocker**
   - ✅ Disable pop-up blocker for this site
   - ✅ Try a different browser

### Performance Issues

#### Problem: System is slow or unresponsive

**Possible Causes & Solutions:**

1. **Network issues**
   - ✅ Check your internet connection
   - ✅ Try refreshing the page
   - ✅ Contact IT if on company network

2. **Browser issues**
   - ✅ Clear browser cache and cookies
   - ✅ Close unnecessary tabs
   - ✅ Try a different browser
   - ✅ Update your browser to the latest version

3. **Large dataset**
   - ✅ Use filters to reduce data
   - ✅ Paginate through results
   - ✅ Export data for offline analysis

4. **System maintenance**
   - ✅ Check for maintenance notifications
   - ✅ Try again later
   - ✅ Contact support if issue persists

#### Problem: Page not loading

**Solutions:**
1. **Refresh the page** (F5 or Ctrl+R)
2. **Clear cache**: Ctrl+Shift+Delete
3. **Try incognito/private mode**
4. **Check system status page**
5. **Contact IT support**

### Data Issues

#### Problem: Data appears incorrect or outdated

**Solutions:**

1. **Refresh the page**
   - ✅ Click refresh button or press F5
   - ✅ Data updates in real-time

2. **Check audit log**
   - ✅ View change history
   - ✅ Verify who made changes and when

3. **Report data discrepancy**
   - ✅ Contact HR or Admin
   - ✅ Provide specific details (employee ID, date, etc.)

#### Problem: Cannot save changes

**Possible Causes & Solutions:**

1. **Validation errors**
   - ✅ Check for red error messages
   - ✅ Fix highlighted fields
   - ✅ Ensure all required fields are filled

2. **Network timeout**
   - ✅ Check internet connection
   - ✅ Try saving again
   - ✅ Copy your changes before refreshing

3. **Concurrent editing**
   - ✅ Someone else may be editing the same record
   - ✅ Refresh and try again
   - ✅ Coordinate with team members

---

## FAQ

### General Questions

**Q: How often is data updated?**
A: Data is updated in real-time. Changes are immediately visible to all users with appropriate permissions.

**Q: Can I access the system from my mobile device?**
A: Yes, the system is responsive and works on tablets and smartphones. However, some features work best on desktop.

**Q: How long is data retained?**
A: All data is retained indefinitely. Audit logs are kept for 7 years for compliance.

**Q: Can I undo changes?**
A: No automatic undo, but you can view the audit log to see previous values and manually revert changes.

### Employee Management

**Q: How do I add multiple employees at once?**
A: HR and Admin can use the bulk import feature. Navigate to Employees → Import → Upload CSV file.

**Q: What happens to allocations when an employee is deactivated?**
A: Active allocations are automatically ended on the deactivation date. Historical allocations remain for audit purposes.

**Q: Can employees have multiple managers?**
A: No, each employee has one direct manager. For matrix organizations, use project ownership instead.

### Allocation Management

**Q: Can an employee be allocated to the same project twice?**
A: No, but you can have multiple time periods. End the first allocation and create a new one with different dates.

**Q: What if an employee needs to be over 100% allocated temporarily?**
A: The system prevents this for data integrity. Consider:
- Adjusting other allocations
- Using overtime tracking in a separate system
- Documenting exceptions in employee notes

**Q: How far in advance can I create allocations?**
A: You can create allocations for any future date. This helps with resource planning.

**Q: Can I see historical allocations?**
A: Yes, view an employee's profile and click "Allocation History" to see all past and current allocations.

### Reporting

**Q: Can I share reports with external stakeholders?**
A: Export reports and share the files. Do not share system login credentials.

**Q: How do I create a report showing allocation trends over time?**
A: Use the custom report builder with date range filters and grouping by month/quarter.

**Q: Can I schedule reports to multiple recipients?**
A: Yes, enter multiple email addresses separated by commas in the schedule settings.

**Q: What's the difference between Excel and CSV export?**
A: Excel includes formatting and is better for viewing. CSV is plain text and better for importing to other systems.

### Security & Access

**Q: Who can see my personal information?**
A: Your manager, HR, and Admin can view your information. Other employees cannot.

**Q: How do I request access to additional features?**
A: Contact your HR department or system administrator to request role changes.

**Q: Is my data secure?**
A: Yes, the system uses industry-standard encryption, secure authentication, and role-based access control.

**Q: Can I see who viewed or changed my information?**
A: HR and Admin can view audit logs showing all access and changes.

---

## Best Practices

### For All Users

1. **Log out when finished**
   - Especially on shared computers
   - Protects your account and data

2. **Keep information current**
   - Update your profile regularly
   - Report changes to HR promptly

3. **Use filters effectively**
   - Narrow down large lists
   - Save time finding information

4. **Check for notifications**
   - Review alerts on dashboard
   - Address allocation conflicts promptly

### For Managers

1. **Review team allocations weekly**
   - Ensure proper resource distribution
   - Address conflicts early

2. **Plan allocations in advance**
   - Create future allocations for better planning
   - Coordinate with project managers

3. **Keep employee information updated**
   - Update skills and certifications
   - Maintain accurate reporting relationships

4. **Use reports for decision-making**
   - Generate team utilization reports
   - Identify under/over-allocated resources

### For HR & Admin

1. **Regular data audits**
   - Review inactive employees
   - Clean up old projects
   - Check for allocation conflicts

2. **Maintain data quality**
   - Enforce naming conventions
   - Standardize department/location names
   - Validate bulk imports

3. **Monitor system usage**
   - Review audit logs regularly
   - Track user adoption
   - Identify training needs

4. **Schedule reports strategically**
   - Run large reports during off-hours
   - Distribute reports before meetings
   - Archive old reports

5. **Document processes**
   - Create internal guidelines
   - Train new users
   - Maintain FAQ for common issues

### Data Entry Best Practices

1. **Use consistent formatting**
   - Employee IDs: Follow company standard
   - Names: First Last (no middle initials unless required)
   - Dates: Use date picker to avoid format errors

2. **Be specific**
   - Use full department names
   - Include location details
   - Add meaningful project descriptions

3. **Validate before saving**
   - Review all fields
   - Check for typos
   - Verify dates are logical

4. **Add context**
   - Use notes fields for additional information
   - Document special circumstances
   - Reference related records

---

## Getting Help

### Self-Service Resources

1. **This User Manual**: Comprehensive guide to all features
2. **In-App Help**: Click "?" icon for context-sensitive help
3. **Video Tutorials**: Available in the Help Center
4. **System Status Page**: Check for known issues

### Contact Support

**For Technical Issues:**
- Email: it-support@company.com
- Phone: (555) 123-4567
- Hours: Monday-Friday, 8 AM - 6 PM

**For HR/Data Questions:**
- Email: hr@company.com
- Phone: (555) 123-4568
- Hours: Monday-Friday, 9 AM - 5 PM

**For Training:**
- Email: training@company.com
- Schedule: Monthly training sessions

### Reporting Bugs

When reporting issues, include:
1. **What you were trying to do**
2. **What happened instead**
3. **Error messages** (screenshot if possible)
4. **Your role** and **username**
5. **Browser** and **device** information
6. **Steps to reproduce** the issue

---

## Appendix

### Keyboard Shortcuts

- `Ctrl + S`: Save current form
- `Ctrl + F`: Search/Filter
- `Esc`: Close modal/dialog
- `Tab`: Navigate between fields
- `Enter`: Submit form

### Supported Browsers

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### System Requirements

- **Internet Connection**: Broadband recommended
- **Screen Resolution**: 1280x720 minimum
- **JavaScript**: Must be enabled
- **Cookies**: Must be enabled

### Glossary

- **Allocation**: Assignment of an employee to a project with a percentage
- **Audit Log**: Record of all changes made in the system
- **Effective Date**: Start or end date for an allocation
- **Over-allocation**: When total allocation exceeds 100%
- **Under-allocation**: When total allocation is less than 100%
- **RBAC**: Role-Based Access Control
- **SSO**: Single Sign-On

---

**Document Version:** 1.0  
**Last Updated:** 2026-03-10  
**For System Version:** 1.0.0

**Need more help?** Contact your system administrator or HR department.
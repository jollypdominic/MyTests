# Jira Dashboard Automation for VPC Storage SRE Team

This automation script creates Jira filters and dashboards for tracking team velocity and productivity metrics.

## Prerequisites

1. **Python 3.7+** installed on your Mac
2. **Jira API Token** from your IBM Jira account
3. **Access** to STGSRE and STGEOPS projects

---

## Setup Instructions

### Step 1: Install Python Dependencies

```bash
cd jira_dashboard_automation
pip3 install -r requirements.txt
```

### Step 2: Generate Jira API Token

1. Go to: https://id.atlassian.com/manage-profile/security/api-tokens
2. Click **Create API token**
3. Give it a name: "Dashboard Automation"
4. Copy the generated token (you won't see it again!)

### Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` file with your details:
```bash
nano .env
```

3. Fill in your information:
```env
JIRA_URL=https://ibm-iaas.atlassian.net
JIRA_EMAIL=your.email@ibm.com
JIRA_API_TOKEN=your_api_token_here

PROJECT_STGSRE=STGSRE
PROJECT_STGEOPS=STGEOPS

TEAM_NAME=VPC Storage SRE Team
TEAM_GROUP=vpc-storage-sre-team

DASHBOARD_PREFIX=VPC-SRE
```

4. Save and exit (Ctrl+X, then Y, then Enter)

---

## Usage

### Verify Connection

Test your Jira connection and permissions:

```bash
python3 create_dashboards.py --verify
```

Expected output:
```
✓ Connected as: Your Name (your.email@ibm.com)
✓ Access to project: STGSRE (STGSRE)
✓ Access to project: STGEOPS (STGEOPS)
✓ Connection verified successfully
```

### Create Filters Only

Create all 25+ JQL filters:

```bash
python3 create_dashboards.py --create-filters
```

This will create filters like:
- VPC-SRE - Weekly - Completed - STGSRE
- VPC-SRE - Sprint - In Progress
- VPC-SRE - Monthly - Bugs
- And many more...

### Create Dashboards Only

Create the three main dashboards:

```bash
python3 create_dashboards.py --create-dashboards
```

This creates:
1. VPC-SRE - Weekly Velocity
2. VPC-SRE - Sprint Velocity
3. VPC-SRE - Monthly Productivity

### Create Everything

Create both filters and dashboards:

```bash
python3 create_dashboards.py --all
```

---

## What Gets Created

### Filters (25+)

**Weekly Filters:**
- Completed tickets (STGSRE, STGEOPS)
- Created tickets
- In Progress tickets
- High priority tickets

**Sprint Filters:**
- All sprint issues
- Completed in sprint
- In progress
- Carryover issues
- Bugs in sprint

**Monthly Filters:**
- Completed this month
- Created this month
- Reopened tickets
- Long-running issues
- Incidents

**Productivity Filters:**
- Last 30 days resolved
- Bug rate tracking
- Priority distribution
- Team workload
- Individual performance

### Dashboards (3)

1. **Weekly Velocity Dashboard**
   - Current week performance
   - Velocity trends (6 weeks)
   - Priority breakdown
   - Team distribution

2. **Sprint Velocity Dashboard**
   - Sprint commitment vs completion
   - Burndown chart
   - Cumulative flow
   - Sprint-over-sprint comparison

3. **Monthly Productivity Dashboard**
   - Monthly trends (6 months)
   - Resolution time analysis
   - Bug metrics
   - Team productivity heat map

---

## Post-Creation Steps

### 1. Add Gadgets to Dashboards

The script creates empty dashboards. You need to add gadgets manually:

1. Navigate to each dashboard in Jira
2. Click **Add gadget**
3. Follow the layout in `Jira_Dashboard_Design_VPC_Storage_SRE.md`
4. Configure each gadget with the appropriate filter

### 2. Configure Gadgets

For each gadget:
- Select the filter created by the script
- Set display options (chart type, colors, etc.)
- Adjust size and position
- Save configuration

### 3. Share Dashboards

Dashboards are automatically shared with `vpc-storage-sre-team` group.

To share with additional users:
1. Open dashboard
2. Click **•••** (More actions)
3. Select **Share**
4. Add users or groups

---

## Troubleshooting

### Cache Issues (API v2 Deprecated Error)

**Error:** `JiraError HTTP 410 url: .../rest/api/2/search... The requested API has been removed`

**Solution:**
This error occurs when Python is using cached bytecode from an older version of the script. Clear the cache:

**On Mac/Linux:**
```bash
./clear_cache.sh
```

**On Windows:**
```bash
clear_cache.bat
```

**Or manually:**
```bash
# Remove all Python cache files
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
find . -type f -name "*.pyc" -delete 2>/dev/null
```

After clearing the cache, run the script again.

### Connection Errors

**Error:** `Failed to connect to Jira`

**Solutions:**
- Verify JIRA_URL is correct
- Check your API token is valid
- Ensure you have network access to Jira
- Try regenerating your API token

### Permission Errors

**Error:** `Cannot access project`

**Solutions:**
- Verify you have access to STGSRE and STGEOPS projects
- Check project keys are correct in .env
- Contact Jira admin for project access

### Filter Creation Errors

**Error:** `Failed to create filter`

**Solutions:**
- Check JQL syntax is valid
- Verify you have permission to create filters
- Ensure filter name doesn't already exist
- Check for special characters in filter names

### Import Errors

**Error:** `ModuleNotFoundError: No module named 'jira'`

**Solution:**
```bash
pip3 install -r requirements.txt
```

---

## File Structure

```
jira_dashboard_automation/
├── README.md                 # This file
├── requirements.txt          # Python dependencies
├── .env.example             # Environment template
├── .env                     # Your configuration (gitignored)
├── jql_queries.py           # JQL query definitions
├── create_dashboards.py     # Main automation script
└── filter_ids.json          # Created filter IDs (generated)
```

---

## Security Notes

### ⚠️ Important Security Practices

1. **Never commit `.env` file** - It contains your API token
2. **Keep API token secure** - Treat it like a password
3. **Rotate tokens regularly** - Generate new tokens periodically
4. **Use read-only tokens** if possible - For viewing only
5. **Revoke unused tokens** - Clean up old tokens

### API Token Permissions

The API token has the same permissions as your Jira account. It can:
- Create and modify filters
- Create and modify dashboards
- Access all projects you have access to
- Perform actions on your behalf

---

## Advanced Usage

### Custom Filter Creation

To create a custom filter:

```python
from jql_queries import JQLQueries

jql = JQLQueries()
custom_jql = """
project = STGSRE 
AND status = "In Progress"
AND assignee = currentUser()
"""

# Add to automation script
automation.create_filter(
    name="My Custom Filter",
    jql=custom_jql,
    description="Custom filter description"
)
```

### Batch Operations

To create filters for specific categories only:

```python
# Create only weekly filters
weekly_filters = {
    k: v for k, v in jql.get_all_filters().items() 
    if 'Weekly' in k
}

for name, query in weekly_filters.items():
    automation.create_filter(name, query)
```

---

## Support

### Documentation

- **Dashboard Design:** `Jira_Dashboard_Design_VPC_Storage_SRE.md`
- **Implementation Guide:** Section in dashboard design doc
- **JQL Reference:** https://support.atlassian.com/jira-software-cloud/docs/advanced-search-reference-jql-fields/

### Getting Help

1. Check this README
2. Review the dashboard design document
3. Check Jira API documentation
4. Contact your Jira administrator
5. Reach out to VPC Storage SRE team lead

---

## Maintenance

### Regular Updates

**Weekly:**
- Verify filters are working correctly
- Check dashboard accuracy
- Update JQL queries if needed

**Monthly:**
- Review and optimize slow queries
- Add new filters as needed
- Archive unused filters

**Quarterly:**
- Review dashboard effectiveness
- Gather team feedback
- Update based on changing needs

### Updating Filters

To update an existing filter's JQL:

1. Find the filter in Jira
2. Edit the filter
3. Update the JQL query
4. Save changes

Or update via script:
```python
# Modify jql_queries.py
# Re-run: python3 create_dashboards.py --create-filters
```

---

## Changelog

### Version 1.0 (2026-03-11)
- Initial release
- 25+ filter definitions
- 3 dashboard templates
- Automated creation script
- Comprehensive documentation

---

## License

Internal use only - VPC Storage SRE Team

---

## Contributors

- SRE Manager - Initial design and implementation
- VPC Storage SRE Team - Requirements and feedback

---

## Quick Reference

### Common Commands

```bash
# Verify connection
python3 create_dashboards.py --verify

# Create everything
python3 create_dashboards.py --all

# Create filters only
python3 create_dashboards.py --create-filters

# Create dashboards only
python3 create_dashboards.py --create-dashboards

# Install dependencies
pip3 install -r requirements.txt

# Update dependencies
pip3 install --upgrade -r requirements.txt
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| JIRA_URL | Your Jira instance URL | https://ibm-iaas.atlassian.net |
| JIRA_EMAIL | Your IBM email | user@ibm.com |
| JIRA_API_TOKEN | Your API token | abc123... |
| PROJECT_STGSRE | STGSRE project key | STGSRE |
| PROJECT_STGEOPS | STGEOPS project key | STGEOPS |
| TEAM_GROUP | Jira group name | vpc-storage-sre-team |
| DASHBOARD_PREFIX | Dashboard name prefix | VPC-SRE |

---

**Last Updated:** March 11, 2026  
**Version:** 1.0  
**Team:** VPC Storage SRE
# Jira Dashboard Design - VPC Storage SRE Team
## Velocity and Productivity Metrics

**Document Version:** 1.0  
**Last Updated:** March 11, 2026  
**Team:** VPC Storage SRE Team  
**Dashboard URL:** https://ibm-iaas.atlassian.net/jira/dashboards/12000

---

## Executive Summary

This document provides comprehensive Jira dashboard designs for tracking velocity and productivity metrics for the VPC Storage SRE team across three time horizons: weekly, bi-weekly (sprint), and monthly views.

**Team Configuration:**
- **Total Team Size:** 35 members
- **Active Jira Contributors:** 20 members
- **Projects:** STGSRE, STGEOPS
- **Sprint Length:** 2 weeks
- **Workflow Statuses:** Backlog → In Progress → Review → Done
- **Issue Types:** Task, Bug, Incident
- **Priority Levels:** P1, P2, P3, P4
- **Time Tracking:** Enabled (logged hours)
- **Historical Data:** 6 months

---

## Table of Contents

1. [Dashboard Overview](#dashboard-overview)
2. [Weekly Dashboard Design](#weekly-dashboard-design)
3. [Bi-Weekly (Sprint) Dashboard Design](#bi-weekly-sprint-dashboard-design)
4. [Monthly Dashboard Design](#monthly-dashboard-design)
5. [Gadget Configurations](#gadget-configurations)
6. [JQL Queries](#jql-queries)
7. [Implementation Guide](#implementation-guide)
8. [Best Practices](#best-practices)

---

## Dashboard Overview

### Dashboard Structure

We'll create **three separate dashboards** with consistent metrics but different time ranges:

1. **Weekly Velocity Dashboard** - Current week performance
2. **Sprint Velocity Dashboard** - Current and historical sprint performance
3. **Monthly Productivity Dashboard** - Monthly trends and comparisons

### Key Metrics Tracked

**Velocity Metrics:**
- Number of tickets completed (by project)
- Tickets in progress
- Tickets created vs resolved
- Velocity trend over time

**Productivity Metrics:**
- Average resolution time
- Bug rate (bugs vs total tickets)
- Work distribution across team members
- Priority breakdown
- Cycle time (In Progress → Done)
- Lead time (Created → Done)

---

## Weekly Dashboard Design

### Dashboard Name: "VPC Storage SRE - Weekly Velocity"

### Layout (3 columns, 12 rows)

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEEKLY PERFORMANCE OVERVIEW                   │
│                        (Current Week)                            │
├──────────────────────┬──────────────────────┬───────────────────┤
│  Tickets Completed   │  Tickets In Progress │  Tickets Created  │
│    This Week         │    (Current)         │    This Week      │
│  [STGSRE: 15]       │   [STGSRE: 8]       │   [STGSRE: 12]   │
│  [STGEOPS: 10]      │   [STGEOPS: 5]      │   [STGEOPS: 9]   │
│  [Total: 25]        │   [Total: 13]       │   [Total: 21]    │
├──────────────────────┴──────────────────────┴───────────────────┤
│              Weekly Velocity Trend (Last 6 Weeks)                │
│  [Line Chart: Tickets Completed per Week by Project]            │
├──────────────────────┬──────────────────────────────────────────┤
│  Priority Breakdown  │    Work Distribution by Team Member      │
│  [Pie Chart]        │    [Horizontal Bar Chart]                │
│  P1: 5 (20%)        │    Member 1: ████████ 8                 │
│  P2: 10 (40%)       │    Member 2: ██████ 6                   │
│  P3: 8 (32%)        │    Member 3: █████ 5                    │
│  P4: 2 (8%)         │    Member 4: ████ 4                     │
├──────────────────────┴──────────────────────────────────────────┤
│         Average Resolution Time (This Week)                      │
│  [Gauge Chart]                                                   │
│  STGSRE: 2.5 days  |  STGEOPS: 3.1 days  |  Overall: 2.8 days │
├──────────────────────┬──────────────────────────────────────────┤
│  Bug Rate This Week  │    Issue Type Breakdown                  │
│  [Donut Chart]      │    [Stacked Bar Chart]                   │
│  Bugs: 6 (24%)      │    Tasks: ████████████ 15               │
│  Tasks: 15 (60%)    │    Bugs: ████ 6                         │
│  Incidents: 4 (16%) │    Incidents: ███ 4                     │
├──────────────────────┴──────────────────────────────────────────┤
│              Recently Completed Issues (This Week)               │
│  [Issue Table with columns: Key, Summary, Assignee, Priority,   │
│   Resolution Time, Completed Date]                              │
└─────────────────────────────────────────────────────────────────┘
```

### Gadgets for Weekly Dashboard

1. **Filter Results (Top Row - 3 gadgets)**
   - Completed This Week (STGSRE)
   - Completed This Week (STGEOPS)
   - Created This Week (Combined)

2. **Line Chart - Weekly Velocity Trend**
   - X-axis: Last 6 weeks
   - Y-axis: Number of tickets
   - Series: STGSRE, STGEOPS

3. **Pie Chart - Priority Breakdown**
   - Current week completed tickets by priority

4. **Horizontal Bar Chart - Team Member Distribution**
   - Top 10 contributors this week

5. **Gauge Chart - Average Resolution Time**
   - Separate gauges for each project

6. **Donut Chart - Bug Rate**
   - Bugs vs other issue types

7. **Stacked Bar Chart - Issue Type Breakdown**
   - By project

8. **Issue Table - Recently Completed**
   - Last 20 completed issues this week

---

## Bi-Weekly (Sprint) Dashboard Design

### Dashboard Name: "VPC Storage SRE - Sprint Velocity"

### Layout (3 columns, 14 rows)

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPRINT PERFORMANCE OVERVIEW                   │
│                  Sprint XX (Date Range)                          │
├──────────────────────┬──────────────────────┬───────────────────┤
│  Sprint Commitment   │  Sprint Completed    │  Sprint Velocity  │
│  [STGSRE: 30]       │  [STGSRE: 28]       │  [93% Complete]  │
│  [STGEOPS: 25]      │  [STGEOPS: 22]      │  [88% Complete]  │
│  [Total: 55]        │  [Total: 50]        │  [91% Complete]  │
├──────────────────────┴──────────────────────┴───────────────────┤
│           Sprint Velocity Trend (Last 12 Sprints)                │
│  [Line Chart: Tickets Completed per Sprint by Project]          │
│  [Include: Commitment vs Completed lines]                        │
├──────────────────────┬──────────────────────────────────────────┤
│  Sprint Burndown     │    Cumulative Flow Diagram               │
│  [Line Chart]        │    [Area Chart]                          │
│  Ideal: ─────       │    Done: ████████                        │
│  Actual: ─ ─ ─     │    Review: ████                          │
│                      │    In Progress: ███                      │
│                      │    Backlog: ██                           │
├──────────────────────┴──────────────────────────────────────────┤
│              Cycle Time Distribution (This Sprint)               │
│  [Box Plot Chart showing min, max, median, quartiles]           │
│  STGSRE: [1d - 2d - 3d - 5d - 8d]                              │
│  STGEOPS: [1d - 2.5d - 4d - 6d - 10d]                          │
├──────────────────────┬──────────────────────────────────────────┤
│  Sprint Comparison   │    Team Member Sprint Performance        │
│  [Table]            │    [Horizontal Bar Chart]                │
│  Current: 50        │    Member 1: ████████ 8                 │
│  Previous: 48       │    Member 2: ██████ 6                   │
│  Avg (6 sprints): 47│    Member 3: █████ 5                    │
│  Change: +4.3%      │    [Show: Completed, In Progress]       │
├──────────────────────┴──────────────────────────────────────────┤
│         Bug Resolution Rate (This Sprint)                        │
│  [Gauge + Table]                                                 │
│  Bugs Created: 12  |  Bugs Resolved: 10  |  Bug Backlog: +2   │
│  Resolution Rate: 83%                                            │
├──────────────────────┬──────────────────────────────────────────┤
│  Priority Mix        │    Lead Time by Priority                 │
│  [Stacked Bar]      │    [Grouped Bar Chart]                   │
│  This Sprint vs     │    P1: 1.5d  P2: 3d  P3: 5d  P4: 7d    │
│  Previous Sprint    │    [Compare: This vs Previous Sprint]   │
├──────────────────────┴──────────────────────────────────────────┤
│              Sprint Retrospective Metrics                        │
│  [Table with Key Metrics]                                        │
│  - Tickets Completed: 50 (↑ 4.3%)                               │
│  - Avg Resolution Time: 3.2 days (↓ 0.5 days)                  │
│  - Bug Rate: 20% (↓ 3%)                                         │
│  - Reopened Tickets: 2 (4%)                                     │
│  - Carryover to Next Sprint: 5 (9%)                             │
└─────────────────────────────────────────────────────────────────┘
```

### Gadgets for Sprint Dashboard

1. **Sprint Health Gadget**
   - Shows commitment vs completion

2. **Sprint Velocity Chart**
   - Historical trend with commitment line

3. **Sprint Burndown Chart**
   - Ideal vs actual burndown

4. **Cumulative Flow Diagram**
   - Status distribution over sprint

5. **Cycle Time Distribution**
   - Box plot for both projects

6. **Sprint Comparison Table**
   - Current vs previous vs average

7. **Team Member Performance**
   - Individual contributions

8. **Bug Metrics**
   - Creation vs resolution rate

9. **Priority Analysis**
   - Mix and lead time by priority

10. **Sprint Retrospective Table**
    - Key metrics summary

---

## Monthly Dashboard Design

### Dashboard Name: "VPC Storage SRE - Monthly Productivity"

### Layout (3 columns, 16 rows)

```
┌─────────────────────────────────────────────────────────────────┐
│                  MONTHLY PRODUCTIVITY OVERVIEW                   │
│                     Month: March 2026                            │
├──────────────────────┬──────────────────────┬───────────────────┤
│  Monthly Completed   │  Monthly Created     │  Net Change       │
│  [STGSRE: 120]      │  [STGSRE: 115]      │  [STGSRE: -5]    │
│  [STGEOPS: 95]      │  [STGEOPS: 100]     │  [STGEOPS: +5]   │
│  [Total: 215]       │  [Total: 215]       │  [Total: 0]      │
├──────────────────────┴──────────────────────┴───────────────────┤
│           Monthly Velocity Trend (Last 6 Months)                 │
│  [Line Chart: Tickets Completed per Month by Project]           │
│  [Include: 3-month moving average line]                         │
├──────────────────────┬──────────────────────────────────────────┤
│  Monthly Throughput  │    Work Type Distribution (Monthly)      │
│  [Area Chart]        │    [Stacked Area Chart]                  │
│  Week 1: 50         │    Tasks: ████████████                   │
│  Week 2: 55         │    Bugs: ████                            │
│  Week 3: 52         │    Incidents: ███                        │
│  Week 4: 58         │    [Show trend over 6 months]            │
├──────────────────────┴──────────────────────────────────────────┤
│         Average Resolution Time Trend (6 Months)                 │
│  [Multi-line Chart]                                              │
│  STGSRE: ─────  STGEOPS: ─ ─ ─  Target: ─ · ─                │
│  [Show: Current month vs 6-month average]                       │
├──────────────────────┬──────────────────────────────────────────┤
│  Team Productivity   │    Individual Performance Matrix         │
│  [Heat Map]         │    [Bubble Chart]                        │
│  Member vs Week     │    X: Tickets Completed                  │
│  [Color: # tickets] │    Y: Avg Resolution Time                │
│                      │    Size: Bug Resolution Rate             │
├──────────────────────┴──────────────────────────────────────────┤
│              Priority Distribution Over Time                     │
│  [Stacked Bar Chart - Monthly for 6 months]                     │
│  P1: ██  P2: ████  P3: ███  P4: █                             │
├──────────────────────┬──────────────────────────────────────────┤
│  Bug Metrics Monthly │    Reopened Tickets Analysis             │
│  [Combo Chart]      │    [Line + Bar Chart]                    │
│  Created: ████      │    Reopened: ─────                       │
│  Resolved: ████     │    Reopen Rate: ─ ─ ─                   │
│  Backlog: ─────     │    [6-month trend]                       │
├──────────────────────┴──────────────────────────────────────────┤
│         Lead Time by Issue Type (Monthly Average)                │
│  [Grouped Bar Chart comparing 6 months]                          │
│  Tasks: ████ 3.5d  Bugs: ██ 2d  Incidents: █ 1.5d            │
├──────────────────────┬──────────────────────────────────────────┤
│  Top Contributors    │    Work Distribution Equity              │
│  [Leaderboard]      │    [Box Plot]                            │
│  1. Member A: 25    │    [Shows distribution fairness]         │
│  2. Member B: 22    │    Min: 5  Q1: 8  Med: 12  Q3: 15  Max:25│
│  3. Member C: 20    │                                          │
├──────────────────────┴──────────────────────────────────────────┤
│              Monthly Productivity Metrics Summary                │
│  [Scorecard with KPIs]                                           │
│  ✓ Velocity: 215 tickets (↑ 8% vs last month)                  │
│  ✓ Avg Resolution: 3.1 days (↓ 0.3 days)                       │
│  ✓ Bug Rate: 18% (↓ 2%)                                         │
│  ⚠ Reopened Rate: 5% (↑ 1%)                                     │
│  ✓ Team Utilization: 85% (target: 80-90%)                      │
├──────────────────────────────────────────────────────────────────┤
│              Project Comparison (STGSRE vs STGEOPS)              │
│  [Side-by-side comparison table]                                 │
│  Metric          | STGSRE  | STGEOPS | Difference              │
│  Completed       | 120     | 95      | +26%                    │
│  Avg Resolution  | 2.8d    | 3.5d    | -20%                    │
│  Bug Rate        | 15%     | 22%     | -32%                    │
└─────────────────────────────────────────────────────────────────┘
```

### Gadgets for Monthly Dashboard

1. **Monthly Summary Statistics**
   - Completed, created, net change

2. **Monthly Velocity Trend**
   - 6-month line chart with moving average

3. **Weekly Throughput**
   - Area chart showing weekly breakdown

4. **Work Type Distribution**
   - Stacked area chart over 6 months

5. **Resolution Time Trend**
   - Multi-line chart with target line

6. **Team Productivity Heat Map**
   - Member vs week performance

7. **Individual Performance Matrix**
   - Bubble chart for multi-dimensional view

8. **Priority Distribution**
   - Stacked bar chart over time

9. **Bug Metrics**
   - Creation, resolution, backlog trend

10. **Reopened Tickets Analysis**
    - Trend and rate over time

11. **Lead Time by Type**
    - Grouped bar chart comparison

12. **Top Contributors Leaderboard**
    - Monthly rankings

13. **Work Distribution Equity**
    - Box plot showing fairness

14. **Monthly KPI Scorecard**
    - Key metrics with trends

15. **Project Comparison Table**
    - STGSRE vs STGEOPS metrics

---

## Gadget Configurations

### 1. Filter Results Gadget

**Purpose:** Display count of tickets matching specific criteria

**Configuration:**
```
Gadget: Filter Results
Filter: [Create saved filter]
Display: Number only (large font)
Refresh: Auto (every 15 minutes)
```

**Example Filters:**

**Weekly Completed - STGSRE:**
```jql
project = STGSRE 
AND status = Done 
AND resolved >= startOfWeek() 
AND resolved <= endOfWeek()
```

**Weekly Completed - STGEOPS:**
```jql
project = STGEOPS 
AND status = Done 
AND resolved >= startOfWeek() 
AND resolved <= endOfWeek()
```

---

### 2. Created vs Resolved Chart

**Purpose:** Compare tickets created vs resolved over time

**Configuration:**
```
Gadget: Created vs Resolved Chart
Projects: STGSRE, STGEOPS
Period: Weekly/Monthly
Days Previously: 42 (6 weeks) or 180 (6 months)
Chart Type: Line
Show: Separate lines for each project
```

---

### 3. Average Age Chart

**Purpose:** Show average resolution time

**Configuration:**
```
Gadget: Average Age Chart
Filter: [Resolved tickets]
Period: Weekly/Monthly
Days Previously: 42 or 180
Group By: Project
Chart Type: Column
```

---

### 4. Pie Chart

**Purpose:** Show distribution (priority, type, etc.)

**Configuration:**
```
Gadget: Pie Chart
Filter: [Relevant filter]
Stat Type: Issue Count
Group By: Priority / Issue Type / Assignee
Show: Top 10
Include Others: Yes
```

---

### 5. Two Dimensional Filter Statistics

**Purpose:** Matrix view of metrics

**Configuration:**
```
Gadget: Two Dimensional Filter Statistics
Filter: [Relevant filter]
X-Axis: Assignee
Y-Axis: Week / Sprint
Stat Type: Issue Count
Sort: Descending
```

---

### 6. Sprint Health Gadget

**Purpose:** Show sprint progress

**Configuration:**
```
Gadget: Sprint Health Gadget
Board: [Your Scrum Board]
Sprint: Current Sprint
Display: Commitment vs Completed
Show: Both projects
```

---

### 7. Sprint Burndown Gadget

**Purpose:** Track sprint progress

**Configuration:**
```
Gadget: Sprint Burndown Gadget
Board: [Your Scrum Board]
Sprint: Current Sprint
Display: Remaining work
Show: Ideal line
```

---

### 8. Cumulative Flow Diagram

**Purpose:** Visualize work flow through statuses

**Configuration:**
```
Gadget: Cumulative Flow Diagram
Board: [Your Kanban Board]
Days: 14 (sprint) or 30 (monthly)
Columns: Backlog, In Progress, Review, Done
```

---

### 9. Issue Statistics Gadget

**Purpose:** Detailed statistics table

**Configuration:**
```
Gadget: Issue Statistics
Filter: [Relevant filter]
Stat Type: Issue Count, Average Age, etc.
Sort By: [Metric]
Number of Results: 20
```

---

### 10. Activity Stream

**Purpose:** Show recent activity

**Configuration:**
```
Gadget: Activity Stream
Filter: [Relevant filter]
Show: Last 20 activities
Include: Comments, Status Changes, Assignments
```

---

## JQL Queries

### Weekly Queries

**1. Completed This Week - STGSRE**
```jql
project = STGSRE 
AND status = Done 
AND resolved >= startOfWeek() 
AND resolved <= endOfWeek()
ORDER BY resolved DESC
```

**2. Completed This Week - STGEOPS**
```jql
project = STGEOPS 
AND status = Done 
AND resolved >= startOfWeek() 
AND resolved <= endOfWeek()
ORDER BY resolved DESC
```

**3. Created This Week - Both Projects**
```jql
project IN (STGSRE, STGEOPS) 
AND created >= startOfWeek() 
AND created <= endOfWeek()
ORDER BY created DESC
```

**4. In Progress - Current**
```jql
project IN (STGSRE, STGEOPS) 
AND status IN ("In Progress", "Review")
ORDER BY priority DESC, updated DESC
```

**5. High Priority This Week**
```jql
project IN (STGSRE, STGEOPS) 
AND priority IN (P1, P2)
AND (created >= startOfWeek() OR updated >= startOfWeek())
ORDER BY priority ASC, created DESC
```

---

### Sprint Queries

**1. Current Sprint - All Issues**
```jql
project IN (STGSRE, STGEOPS) 
AND sprint IN openSprints()
ORDER BY status ASC, priority ASC
```

**2. Current Sprint - Completed**
```jql
project IN (STGSRE, STGEOPS) 
AND sprint IN openSprints()
AND status = Done
ORDER BY resolved DESC
```

**3. Current Sprint - In Progress**
```jql
project IN (STGSRE, STGEOPS) 
AND sprint IN openSprints()
AND status IN ("In Progress", "Review")
ORDER BY priority ASC, updated DESC
```

**4. Sprint Carryover**
```jql
project IN (STGSRE, STGEOPS) 
AND sprint IN openSprints()
AND status != Done
AND created < startOfWeek(-2w)
ORDER BY created ASC
```

**5. Bugs in Current Sprint**
```jql
project IN (STGSRE, STGEOPS) 
AND sprint IN openSprints()
AND type = Bug
ORDER BY priority ASC, created DESC
```

---

### Monthly Queries

**1. Completed This Month - Both Projects**
```jql
project IN (STGSRE, STGEOPS) 
AND status = Done 
AND resolved >= startOfMonth() 
AND resolved <= endOfMonth()
ORDER BY resolved DESC
```

**2. Created This Month - Both Projects**
```jql
project IN (STGSRE, STGEOPS) 
AND created >= startOfMonth() 
AND created <= endOfMonth()
ORDER BY created DESC
```

**3. Reopened This Month**
```jql
project IN (STGSRE, STGEOPS) 
AND status changed TO "In Progress" 
AFTER status WAS "Done"
AND updated >= startOfMonth()
ORDER BY updated DESC
```

**4. Long Running Issues (>7 days)**
```jql
project IN (STGSRE, STGEOPS) 
AND status IN ("In Progress", "Review")
AND updated <= -7d
ORDER BY updated ASC
```

**5. Team Member Performance - Individual**
```jql
project IN (STGSRE, STGEOPS) 
AND assignee = currentUser()
AND resolved >= startOfMonth()
AND resolved <= endOfMonth()
ORDER BY resolved DESC
```

---

### Productivity Metrics Queries

**1. Average Resolution Time - Last 30 Days**
```jql
project IN (STGSRE, STGEOPS) 
AND status = Done 
AND resolved >= -30d
ORDER BY resolved DESC
```

**2. Bug Rate - Last Sprint**
```jql
project IN (STGSRE, STGEOPS) 
AND type = Bug
AND resolved >= -14d
ORDER BY priority ASC
```

**3. Priority Distribution - Current**
```jql
project IN (STGSRE, STGEOPS) 
AND status != Done
ORDER BY priority ASC, created DESC
```

**4. Work Distribution - Active Contributors**
```jql
project IN (STGSRE, STGEOPS) 
AND assignee IN membersOf("vpc-storage-sre-team")
AND resolved >= startOfMonth()
ORDER BY assignee ASC, resolved DESC
```

**5. Incidents This Month**
```jql
project IN (STGSRE, STGEOPS) 
AND type = Incident
AND created >= startOfMonth()
ORDER BY priority ASC, created DESC
```

---

## Implementation Guide

### Step 1: Create Saved Filters

1. Navigate to **Filters** → **View all filters**
2. Click **Create filter**
3. Enter JQL query from above
4. Click **Save as** and name appropriately
5. Set sharing permissions (Team or Public)
6. Repeat for all required filters

**Recommended Filter Naming Convention:**
```
[Team] - [Timeframe] - [Metric] - [Project]

Examples:
- VPC-SRE - Weekly - Completed - STGSRE
- VPC-SRE - Sprint - In Progress - Both
- VPC-SRE - Monthly - Bugs - STGEOPS
```

---

### Step 2: Create Dashboards

#### Weekly Dashboard Creation

1. Navigate to **Dashboards** → **Create dashboard**
2. Name: "VPC Storage SRE - Weekly Velocity"
3. Description: "Weekly performance metrics for VPC Storage SRE team"
4. Sharing: Share with "vpc-storage-sre-team" group
5. Layout: Choose "Three column" layout
6. Click **Create**

#### Add Gadgets to Weekly Dashboard

**Row 1: Summary Statistics**
1. Click **Add gadget**
2. Select **Filter Results**
3. Configure:
   - Filter: "VPC-SRE - Weekly - Completed - STGSRE"
   - Display: Number only
   - Title: "STGSRE Completed This Week"
4. Click **Save**
5. Repeat for STGEOPS and Created metrics

**Row 2: Velocity Trend**
1. Add **Created vs Resolved Chart** gadget
2. Configure:
   - Projects: STGSRE, STGEOPS
   - Period: Weekly
   - Days: 42 (6 weeks)
   - Chart type: Line
3. Resize to span full width

**Row 3: Priority and Distribution**
1. Add **Pie Chart** gadget (left column)
   - Filter: Weekly completed
   - Group by: Priority
2. Add **Two Dimensional Filter Statistics** (right columns)
   - X-axis: Assignee
   - Y-axis: Priority
   - Filter: Weekly completed

**Continue adding remaining gadgets...**

---

### Step 3: Configure Sprint Dashboard

1. Create new dashboard: "VPC Storage SRE - Sprint Velocity"
2. Add **Sprint Health Gadget**
   - Select your Scrum board
   - Current sprint
3. Add **Sprint Burndown Gadget**
   - Same board
   - Show ideal line
4. Add **Cumulative Flow Diagram**
   - 14-day view
   - All statuses
5. Add remaining gadgets per design

---

### Step 4: Configure Monthly Dashboard

1. Create new dashboard: "VPC Storage SRE - Monthly Productivity"
2. Follow similar process with monthly filters
3. Use 180-day (6-month) historical data
4. Add trend analysis gadgets
5. Include comparison metrics

---

### Step 5: Set Up Automatic Refresh

1. Edit each dashboard
2. Click **Configure** (gear icon)
3. Set **Auto-refresh**: 15 minutes
4. Enable **Automatic layout**
5. Save configuration

---

### Step 6: Create Dashboard Links

Create a "Dashboard Hub" page with links to all three dashboards:

1. Create Confluence page: "VPC Storage SRE - Dashboard Hub"
2. Add links to:
   - Weekly Velocity Dashboard
   - Sprint Velocity Dashboard
   - Monthly Productivity Dashboard
3. Add brief description of each
4. Pin to team space

---

## Best Practices

### Dashboard Maintenance

**Weekly:**
- Review dashboard accuracy
- Verify filters are working
- Check for missing data
- Update any broken gadgets

**Monthly:**
- Review and update JQL queries
- Add new metrics if needed
- Archive old dashboards
- Gather team feedback

**Quarterly:**
- Comprehensive dashboard review
- Update based on team needs
- Optimize performance
- Document changes

---

### Performance Optimization

1. **Limit Historical Data**
   - Use appropriate time ranges
   - Don't load more than 6 months
   - Use pagination for large result sets

2. **Optimize JQL Queries**
   - Use indexed fields (project, status, assignee)
   - Avoid complex OR conditions
   - Use saved filters instead of inline JQL

3. **Gadget Limits**
   - Maximum 15-20 gadgets per dashboard
   - Use tabs for additional metrics
   - Consider separate dashboards for different audiences

4. **Caching**
   - Enable gadget caching
   - Set appropriate refresh intervals
   - Use static filters where possible

---

### Team Adoption

**Training:**
1. Conduct dashboard walkthrough session
2. Create quick reference guide
3. Record demo video
4. Provide hands-on practice time

**Communication:**
1. Announce dashboard availability
2. Share dashboard links in team channels
3. Include in team onboarding
4. Regular reminders to use dashboards

**Feedback Loop:**
1. Collect team feedback monthly
2. Iterate on dashboard design
3. Add requested metrics
4. Remove unused gadgets

---

### Metrics Interpretation Guide

**Velocity:**
- **Increasing trend**: Good, team is improving
- **Decreasing trend**: Investigate blockers
- **High variability**: Review sprint planning
- **Target**: Consistent velocity ±10%

**Resolution Time:**
- **Increasing**: Complexity or blockers
- **Decreasing**: Process improvements working
- **Target**: <3 days average

**Bug Rate:**
- **Increasing**: Quality issues
- **Decreasing**: Better testing/development
- **Target**: <20% of total tickets

**Work Distribution:**
- **Uneven**: Rebalance workload
- **Even**: Good team collaboration
- **Target**: Standard deviation <30%

---

## Advanced Configurations

### Custom Calculated Metrics

**1. Velocity Consistency Score**
```
(Current Sprint Velocity / Average Last 6 Sprints) * 100
Target: 90-110%
```

**2. Team Efficiency**
```
(Tickets Completed / Tickets Committed) * 100
Target: >85%
```

**3. Bug Escape Rate**
```
(Bugs Found in Production / Total Tickets) * 100
Target: <5%
```

**4. Cycle Time Improvement**
```
((Previous Cycle Time - Current Cycle Time) / Previous Cycle Time) * 100
Target: Positive trend
```

---

### Integration with Other Tools

**1. Confluence Integration**
- Embed dashboards in Confluence pages
- Create automated reports
- Link to sprint retrospectives

**2. Slack Integration**
- Daily dashboard summaries
- Alert on metric thresholds
- Weekly velocity reports

**3. Email Reports**
- Schedule weekly email reports
- Include key metrics
- Send to stakeholders

---

### Dashboard Variants

**Management Dashboard:**
- High-level metrics only
- Trend analysis focus
- Executive summary format
- Monthly/quarterly view

**Team Member Dashboard:**
- Individual performance
- Personal task list
- Team comparison
- Daily/weekly view

**Technical Lead Dashboard:**
- Technical debt tracking
- Code review metrics
- Incident analysis
- Sprint health

---

## Troubleshooting

### Common Issues

**1. Gadget Not Loading**
- Check filter permissions
- Verify JQL syntax
- Clear browser cache
- Check Jira performance

**2. Incorrect Data**
- Verify filter date ranges
- Check timezone settings
- Validate workflow statuses
- Review field mappings

**3. Slow Dashboard**
- Reduce number of gadgets
- Optimize JQL queries
- Increase refresh interval
- Use saved filters

**4. Missing Team Members**
- Verify group membership
- Check assignee field
- Update team roster
- Refresh user cache

---

## Appendix A: Complete JQL Query Library

### Time-Based Filters

**Last 7 Days:**
```jql
resolved >= -7d
```

**Current Week:**
```jql
resolved >= startOfWeek() AND resolved <= endOfWeek()
```

**Last Week:**
```jql
resolved >= startOfWeek(-1w) AND resolved <= endOfWeek(-1w)
```

**Current Month:**
```jql
resolved >= startOfMonth() AND resolved <= endOfMonth()
```

**Last Month:**
```jql
resolved >= startOfMonth(-1M) AND resolved <= endOfMonth(-1M)
```

**Current Quarter:**
```jql
resolved >= startOfYear() AND resolved <= endOfQuarter()
```

**Last 6 Months:**
```jql
resolved >= -180d
```

---

### Status-Based Filters

**All Open Issues:**
```jql
status != Done
```

**In Progress:**
```jql
status IN ("In Progress", "Review")
```

**Blocked Issues:**
```jql
status = "In Progress" AND updated <= -3d
```

**Recently Completed:**
```jql
status = Done AND resolved >= -7d
```

---

### Priority-Based Filters

**High Priority Open:**
```jql
priority IN (P1, P2) AND status != Done
```

**P1 Issues:**
```jql
priority = P1 AND status != Done
```

**Priority Distribution:**
```jql
project IN (STGSRE, STGEOPS) AND status != Done
```

---

### Team-Based Filters

**My Open Issues:**
```jql
assignee = currentUser() AND status != Done
```

**Unassigned Issues:**
```jql
assignee IS EMPTY AND status != Done
```

**Team Workload:**
```jql
assignee IN membersOf("vpc-storage-sre-team") AND status != Done
```

---

## Appendix B: Dashboard Export/Import

### Export Dashboard Configuration

1. Navigate to dashboard
2. Click **•••** (More actions)
3. Select **Export**
4. Choose format (JSON recommended)
5. Save file

### Import Dashboard Configuration

1. Navigate to **Dashboards**
2. Click **•••** → **Import**
3. Select exported file
4. Review configuration
5. Click **Import**
6. Update filter references if needed

---

## Appendix C: Automation Rules

### Auto-Update Dashboard Filters

**Rule 1: Update Sprint Filter on Sprint Start**
```
Trigger: Sprint started
Condition: Sprint name contains "VPC-SRE"
Action: Update saved filter "Current Sprint"
```

**Rule 2: Weekly Summary Email**
```
Trigger: Scheduled (Monday 9 AM)
Condition: Always
Action: Send email with dashboard link
Recipients: vpc-storage-sre-team
```

**Rule 3: Alert on Low Velocity**
```
Trigger: Scheduled (End of sprint)
Condition: Sprint velocity < 80% of average
Action: Send Slack notification
Channel: #vpc-sre-alerts
```

---

## Document Control

**Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-11 | SRE Manager | Initial dashboard design |

**Review Schedule:**
- Weekly: Dashboard accuracy check
- Monthly: Metrics review and optimization
- Quarterly: Comprehensive dashboard review

**Contact Information:**
- **Dashboard Owner:** SRE Manager
- **Jira Admin:** [Contact]
- **Support:** vpc-sre-team@ibm.com

---

**END OF DOCUMENT**
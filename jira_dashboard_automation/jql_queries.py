"""
JQL Queries for VPC Storage SRE Team Dashboards
"""

class JQLQueries:
    """Collection of JQL queries for dashboard filters"""
    
    def __init__(self, project_stgsre="STGSRE", project_stgeops="STGEOPS"):
        self.project_stgsre = project_stgsre
        self.project_stgeops = project_stgeops
        self.both_projects = f"({project_stgsre}, {project_stgeops})"
    
    # Weekly Queries
    def weekly_completed_stgsre(self):
        return f"""
        project = {self.project_stgsre} 
        AND status = Done 
        AND resolved >= startOfWeek() 
        AND resolved <= endOfWeek()
        ORDER BY resolved DESC
        """
    
    def weekly_completed_stgeops(self):
        return f"""
        project = {self.project_stgeops} 
        AND status = Done 
        AND resolved >= startOfWeek() 
        AND resolved <= endOfWeek()
        ORDER BY resolved DESC
        """
    
    def weekly_created_both(self):
        return f"""
        project IN {self.both_projects} 
        AND created >= startOfWeek() 
        AND created <= endOfWeek()
        ORDER BY created DESC
        """
    
    def weekly_in_progress(self):
        return f"""
        project IN {self.both_projects} 
        AND status IN ("In Progress", "Review")
        ORDER BY priority DESC, updated DESC
        """
    
    def weekly_high_priority(self):
        return f"""
        project IN {self.both_projects} 
        AND priority IN (P1, P2)
        AND (created >= startOfWeek() OR updated >= startOfWeek())
        ORDER BY priority ASC, created DESC
        """
    
    # Sprint Queries
    def current_sprint_all(self):
        return f"""
        project IN {self.both_projects} 
        AND sprint IN openSprints()
        ORDER BY status ASC, priority ASC
        """
    
    def current_sprint_completed(self):
        return f"""
        project IN {self.both_projects} 
        AND sprint IN openSprints()
        AND status = Done
        ORDER BY resolved DESC
        """
    
    def current_sprint_in_progress(self):
        return f"""
        project IN {self.both_projects} 
        AND sprint IN openSprints()
        AND status IN ("In Progress", "Review")
        ORDER BY priority ASC, updated DESC
        """
    
    def sprint_carryover(self):
        return f"""
        project IN {self.both_projects} 
        AND sprint IN openSprints()
        AND status != Done
        AND created < startOfWeek(-2w)
        ORDER BY created ASC
        """
    
    def sprint_bugs(self):
        return f"""
        project IN {self.both_projects} 
        AND sprint IN openSprints()
        AND type = Bug
        ORDER BY priority ASC, created DESC
        """
    
    # Monthly Queries
    def monthly_completed_both(self):
        return f"""
        project IN {self.both_projects} 
        AND status = Done 
        AND resolved >= startOfMonth() 
        AND resolved <= endOfMonth()
        ORDER BY resolved DESC
        """
    
    def monthly_created_both(self):
        return f"""
        project IN {self.both_projects} 
        AND created >= startOfMonth() 
        AND created <= endOfMonth()
        ORDER BY created DESC
        """
    
    def monthly_reopened(self):
        return f"""
        project IN {self.both_projects} 
        AND status changed TO "In Progress" 
        AFTER status WAS "Done"
        AND updated >= startOfMonth()
        ORDER BY updated DESC
        """
    
    def monthly_long_running(self):
        return f"""
        project IN {self.both_projects} 
        AND status IN ("In Progress", "Review")
        AND updated <= -7d
        ORDER BY updated ASC
        """
    
    def monthly_incidents(self):
        return f"""
        project IN {self.both_projects} 
        AND type = Incident
        AND created >= startOfMonth()
        ORDER BY priority ASC, created DESC
        """
    
    # Productivity Metrics Queries
    def last_30_days_resolved(self):
        return f"""
        project IN {self.both_projects} 
        AND status = Done 
        AND resolved >= -30d
        ORDER BY resolved DESC
        """
    
    def last_sprint_bugs(self):
        return f"""
        project IN {self.both_projects} 
        AND type = Bug
        AND resolved >= -14d
        ORDER BY priority ASC
        """
    
    def current_priority_distribution(self):
        return f"""
        project IN {self.both_projects} 
        AND status != Done
        ORDER BY priority ASC, created DESC
        """
    
    def team_workload_current(self):
        return f"""
        project IN {self.both_projects} 
        AND assignee IN membersOf("vpc-storage-sre-team")
        AND status != Done
        ORDER BY assignee ASC, priority ASC
        """
    
    def team_completed_this_month(self):
        return f"""
        project IN {self.both_projects} 
        AND assignee IN membersOf("vpc-storage-sre-team")
        AND resolved >= startOfMonth()
        ORDER BY assignee ASC, resolved DESC
        """
    
    # Historical Queries
    def last_6_weeks_completed(self):
        return f"""
        project IN {self.both_projects} 
        AND status = Done 
        AND resolved >= -42d
        ORDER BY resolved DESC
        """
    
    def last_6_months_completed(self):
        return f"""
        project IN {self.both_projects} 
        AND status = Done 
        AND resolved >= -180d
        ORDER BY resolved DESC
        """
    
    # Priority-Based Queries
    def p1_open_issues(self):
        return f"""
        project IN {self.both_projects} 
        AND priority = P1 
        AND status != Done
        ORDER BY created ASC
        """
    
    def p2_open_issues(self):
        return f"""
        project IN {self.both_projects} 
        AND priority = P2 
        AND status != Done
        ORDER BY created ASC
        """
    
    # User-Specific Queries
    def my_open_issues(self):
        return f"""
        project IN {self.both_projects} 
        AND assignee = currentUser() 
        AND status != Done
        ORDER BY priority ASC, created DESC
        """
    
    def unassigned_issues(self):
        return f"""
        project IN {self.both_projects} 
        AND assignee IS EMPTY 
        AND status != Done
        ORDER BY priority ASC, created DESC
        """
    
    # Get all filter definitions
    def get_all_filters(self):
        """Returns a dictionary of all filter names and their JQL queries"""
        return {
            # Weekly Filters
            "VPC-SRE - Weekly - Completed - STGSRE": self.weekly_completed_stgsre(),
            "VPC-SRE - Weekly - Completed - STGEOPS": self.weekly_completed_stgeops(),
            "VPC-SRE - Weekly - Created - Both": self.weekly_created_both(),
            "VPC-SRE - Weekly - In Progress": self.weekly_in_progress(),
            "VPC-SRE - Weekly - High Priority": self.weekly_high_priority(),
            
            # Sprint Filters
            "VPC-SRE - Sprint - All Issues": self.current_sprint_all(),
            "VPC-SRE - Sprint - Completed": self.current_sprint_completed(),
            "VPC-SRE - Sprint - In Progress": self.current_sprint_in_progress(),
            "VPC-SRE - Sprint - Carryover": self.sprint_carryover(),
            "VPC-SRE - Sprint - Bugs": self.sprint_bugs(),
            
            # Monthly Filters
            "VPC-SRE - Monthly - Completed - Both": self.monthly_completed_both(),
            "VPC-SRE - Monthly - Created - Both": self.monthly_created_both(),
            "VPC-SRE - Monthly - Reopened": self.monthly_reopened(),
            "VPC-SRE - Monthly - Long Running": self.monthly_long_running(),
            "VPC-SRE - Monthly - Incidents": self.monthly_incidents(),
            
            # Productivity Filters
            "VPC-SRE - Last 30 Days - Resolved": self.last_30_days_resolved(),
            "VPC-SRE - Last Sprint - Bugs": self.last_sprint_bugs(),
            "VPC-SRE - Current - Priority Distribution": self.current_priority_distribution(),
            "VPC-SRE - Current - Team Workload": self.team_workload_current(),
            "VPC-SRE - Monthly - Team Completed": self.team_completed_this_month(),
            
            # Historical Filters
            "VPC-SRE - Last 6 Weeks - Completed": self.last_6_weeks_completed(),
            "VPC-SRE - Last 6 Months - Completed": self.last_6_months_completed(),
            
            # Priority Filters
            "VPC-SRE - P1 - Open Issues": self.p1_open_issues(),
            "VPC-SRE - P2 - Open Issues": self.p2_open_issues(),
            
            # User Filters
            "VPC-SRE - My Open Issues": self.my_open_issues(),
            "VPC-SRE - Unassigned Issues": self.unassigned_issues(),
        }

# Made with Bob

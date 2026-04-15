#!/usr/bin/env python3
"""
Jira Dashboard Automation Script
Creates dashboards and filters for VPC Storage SRE Team

Usage:
    python3 create_dashboards.py --create-filters
    python3 create_dashboards.py --create-dashboards
    python3 create_dashboards.py --all
"""

import os
import sys
import argparse
import json
import requests
from jira import JIRA
from dotenv import load_dotenv
from jql_queries import JQLQueries

# Load environment variables
load_dotenv()

class JiraDashboardAutomation:
    """Automates Jira dashboard and filter creation"""
    
    def __init__(self):
        """Initialize Jira connection"""
        jira_url = os.getenv('JIRA_URL')
        jira_email = os.getenv('JIRA_EMAIL')
        jira_api_token = os.getenv('JIRA_API_TOKEN')
        
        if not all([jira_url, jira_email, jira_api_token]):
            raise ValueError("Missing required environment variables. Check your .env file.")
        
        # Type-safe assignment after validation
        self.jira_url: str = jira_url  # type: ignore
        self.jira_email: str = jira_email  # type: ignore
        self.jira_api_token: str = jira_api_token  # type: ignore
        
        print(f"Connecting to Jira: {self.jira_url}")
        print(f"Using email: {self.jira_email}")
        
        try:
            self.jira = JIRA(
                server=self.jira_url,
                basic_auth=(self.jira_email, self.jira_api_token)
            )
            print("✓ Successfully connected to Jira")
        except Exception as e:
            print(f"✗ Failed to connect to Jira: {str(e)}")
            sys.exit(1)
        
        # Initialize JQL queries
        self.jql = JQLQueries(
            project_stgsre=os.getenv('PROJECT_STGSRE', 'STGSRE'),
            project_stgeops=os.getenv('PROJECT_STGEOPS', 'STGEOPS')
        )
        
        self.created_filters = {}
    
    def create_filter(self, name, jql, description="", share_with_group=None):
        """Create a Jira filter"""
        try:
            # Check if filter already exists using REST API
            # Search for filters owned by current user with pagination
            url = f"{self.jira_url}/rest/api/3/filter/search"
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
            # Get all filters (paginated)
            start_at = 0
            max_results = 50
            all_filters = []
            
            while True:
                response = requests.get(
                    url,
                    auth=(self.jira_email, self.jira_api_token),
                    headers=headers,
                    params={'startAt': start_at, 'maxResults': max_results}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    filters = data.get('values', [])
                    all_filters.extend(filters)
                    
                    # Check if we've retrieved all filters
                    if len(filters) < max_results:
                        break
                    start_at += max_results
                else:
                    break
            
            # Check if filter with exact name already exists
            for filter_obj in all_filters:
                if filter_obj.get('name') == name:
                    print(f"  ⚠ Filter '{name}' already exists (ID: {filter_obj.get('id')}), skipping...")
                    return filter_obj.get('id')
            
            # Create new filter
            filter_data = {
                'name': name,
                'jql': jql.strip(),
                'description': description,
                'favourite': False
            }
            
            # Note: The jira-python library doesn't have direct filter creation
            # We'll use the REST API directly
            url = f"{self.jira_url}/rest/api/3/filter"
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
            response = requests.post(
                url,
                json=filter_data,
                auth=(self.jira_email, self.jira_api_token),
                headers=headers
            )
            
            if response.status_code == 201:
                filter_id = response.json()['id']
                print(f"  ✓ Created filter: {name} (ID: {filter_id})")
                
                # Share with group if specified
                if share_with_group:
                    self.share_filter(filter_id, share_with_group)
                
                return filter_id
            elif response.status_code == 400:
                # Handle duplicate filter name error
                error_data = response.json()
                if 'errors' in error_data and 'filterName' in error_data['errors']:
                    print(f"  ⚠ Filter '{name}' already exists (detected on creation), skipping...")
                    # Try to find the existing filter ID
                    for filter_obj in all_filters:
                        if filter_obj.get('name') == name:
                            return filter_obj.get('id')
                    return None
                else:
                    print(f"  ✗ Failed to create filter '{name}': {response.text}")
                    return None
            else:
                print(f"  ✗ Failed to create filter '{name}': {response.text}")
                return None
                
        except Exception as e:
            print(f"  ✗ Error creating filter '{name}': {str(e)}")
            return None
    
    def share_filter(self, filter_id, group_name):
        """Share filter with a group"""
        try:
            url = f"{self.jira_url}/rest/api/3/filter/{filter_id}/permission"
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
            permission_data = {
                'type': 'group',
                'groupname': group_name
            }
            
            response = requests.post(
                url,
                json=permission_data,
                auth=(self.jira_email, self.jira_api_token),
                headers=headers
            )
            
            if response.status_code == 201:
                print(f"    ✓ Shared filter with group: {group_name}")
            else:
                print(f"    ⚠ Could not share filter with group: {response.text}")
                
        except Exception as e:
            print(f"    ⚠ Error sharing filter: {str(e)}")
    
    def create_all_filters(self):
        """Create all filters for the dashboards"""
        print("\n" + "="*60)
        print("Creating Jira Filters")
        print("="*60)
        
        team_group = os.getenv('TEAM_GROUP', 'vpc-storage-sre-team')
        all_filters = self.jql.get_all_filters()
        
        print(f"\nTotal filters to create: {len(all_filters)}")
        print(f"Sharing with group: {team_group}\n")
        
        for filter_name, jql_query in all_filters.items():
            filter_id = self.create_filter(
                name=filter_name,
                jql=jql_query,
                description=f"Auto-generated filter for VPC Storage SRE Team",
                share_with_group=team_group
            )
            
            if filter_id:
                self.created_filters[filter_name] = filter_id
        
        print(f"\n✓ Created {len(self.created_filters)} filters successfully")
        
        # Save filter IDs to file for dashboard creation
        with open('filter_ids.json', 'w') as f:
            json.dump(self.created_filters, f, indent=2)
        print("✓ Saved filter IDs to filter_ids.json")
    
    def create_dashboard(self, name, description=""):
        """Create a Jira dashboard"""
        try:
            url = f"{self.jira_url}/rest/api/3/dashboard"
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
            dashboard_data = {
                'name': name,
                'description': description,
                'sharePermissions': [
                    {
                        'type': 'group',
                        'group': {
                            'name': os.getenv('TEAM_GROUP', 'vpc-storage-sre-team')
                        }
                    }
                ]
            }
            
            response = requests.post(
                url,
                json=dashboard_data,
                auth=(self.jira_email, self.jira_api_token),
                headers=headers
            )
            
            if response.status_code == 201:
                dashboard_id = response.json()['id']
                print(f"  ✓ Created dashboard: {name} (ID: {dashboard_id})")
                return dashboard_id
            else:
                print(f"  ✗ Failed to create dashboard '{name}': {response.text}")
                return None
                
        except Exception as e:
            print(f"  ✗ Error creating dashboard '{name}': {str(e)}")
            return None
    
    def add_gadget_to_dashboard(self, dashboard_id, gadget_config):
        """Add a gadget to a dashboard"""
        try:
            url = f"{self.jira_url}/rest/api/3/dashboard/{dashboard_id}/gadget"
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
            response = requests.post(
                url,
                json=gadget_config,
                auth=(self.jira_email, self.jira_api_token),
                headers=headers
            )
            
            if response.status_code == 201:
                return True
            else:
                print(f"    ⚠ Could not add gadget: {response.text}")
                return False
                
        except Exception as e:
            print(f"    ⚠ Error adding gadget: {str(e)}")
            return False
    
    def create_weekly_dashboard(self):
        """Create the Weekly Velocity Dashboard"""
        print("\n" + "="*60)
        print("Creating Weekly Velocity Dashboard")
        print("="*60 + "\n")
        
        dashboard_name = f"{os.getenv('DASHBOARD_PREFIX', 'VPC-SRE')} - Weekly Velocity"
        description = "Weekly performance metrics for VPC Storage SRE team"
        
        dashboard_id = self.create_dashboard(dashboard_name, description)
        
        if not dashboard_id:
            print("✗ Failed to create weekly dashboard")
            return
        
        print("\nNote: Gadget configuration requires manual setup in Jira UI")
        print("Please follow the implementation guide to add gadgets to this dashboard")
        print(f"Dashboard URL: {self.jira_url}/jira/dashboards/{dashboard_id}")
    
    def create_sprint_dashboard(self):
        """Create the Sprint Velocity Dashboard"""
        print("\n" + "="*60)
        print("Creating Sprint Velocity Dashboard")
        print("="*60 + "\n")
        
        dashboard_name = f"{os.getenv('DASHBOARD_PREFIX', 'VPC-SRE')} - Sprint Velocity"
        description = "Sprint performance metrics for VPC Storage SRE team (2-week sprints)"
        
        dashboard_id = self.create_dashboard(dashboard_name, description)
        
        if not dashboard_id:
            print("✗ Failed to create sprint dashboard")
            return
        
        print("\nNote: Gadget configuration requires manual setup in Jira UI")
        print("Please follow the implementation guide to add gadgets to this dashboard")
        print(f"Dashboard URL: {self.jira_url}/jira/dashboards/{dashboard_id}")
    
    def create_monthly_dashboard(self):
        """Create the Monthly Productivity Dashboard"""
        print("\n" + "="*60)
        print("Creating Monthly Productivity Dashboard")
        print("="*60 + "\n")
        
        dashboard_name = f"{os.getenv('DASHBOARD_PREFIX', 'VPC-SRE')} - Monthly Productivity"
        description = "Monthly productivity metrics and trends for VPC Storage SRE team"
        
        dashboard_id = self.create_dashboard(dashboard_name, description)
        
        if not dashboard_id:
            print("✗ Failed to create monthly dashboard")
            return
        
        print("\nNote: Gadget configuration requires manual setup in Jira UI")
        print("Please follow the implementation guide to add gadgets to this dashboard")
        print(f"Dashboard URL: {self.jira_url}/jira/dashboards/{dashboard_id}")
    
    def create_all_dashboards(self):
        """Create all three dashboards"""
        self.create_weekly_dashboard()
        self.create_sprint_dashboard()
        self.create_monthly_dashboard()
        
        print("\n" + "="*60)
        print("Dashboard Creation Complete")
        print("="*60)
        print("\nNext Steps:")
        print("1. Navigate to each dashboard in Jira")
        print("2. Add gadgets following the implementation guide")
        print("3. Configure each gadget with the appropriate filters")
        print("4. Refer to: Jira_Dashboard_Design_VPC_Storage_SRE.md")
    
    def verify_connection(self):
        """Verify Jira connection and permissions"""
        print("\n" + "="*60)
        print("Verifying Jira Connection")
        print("="*60 + "\n")
        
        try:
            # Get current user
            myself = self.jira.myself()
            print(f"✓ Connected as: {myself['displayName']} ({myself['emailAddress']})")
            
            # Check projects
            projects = [os.getenv('PROJECT_STGSRE'), os.getenv('PROJECT_STGEOPS')]
            for project_key in projects:
                if project_key:  # Check if project_key is not None
                    try:
                        project = self.jira.project(project_key)
                        print(f"✓ Access to project: {project.name} ({project_key})")
                    except Exception as e:
                        print(f"✗ Cannot access project {project_key}: {str(e)}")
                else:
                    print(f"⚠ Skipping None project key")
            
            # Check permissions
            print("\n✓ Connection verified successfully")
            return True
            
        except Exception as e:
            print(f"✗ Verification failed: {str(e)}")
            return False


def main():
    """Main execution function"""
    parser = argparse.ArgumentParser(
        description='Automate Jira dashboard creation for VPC Storage SRE Team'
    )
    parser.add_argument(
        '--create-filters',
        action='store_true',
        help='Create all Jira filters'
    )
    parser.add_argument(
        '--create-dashboards',
        action='store_true',
        help='Create all dashboards'
    )
    parser.add_argument(
        '--all',
        action='store_true',
        help='Create both filters and dashboards'
    )
    parser.add_argument(
        '--verify',
        action='store_true',
        help='Verify Jira connection and permissions'
    )
    
    args = parser.parse_args()
    
    # Show help if no arguments
    if not any(vars(args).values()):
        parser.print_help()
        return
    
    try:
        automation = JiraDashboardAutomation()
        
        if args.verify:
            automation.verify_connection()
        
        if args.create_filters or args.all:
            automation.create_all_filters()
        
        if args.create_dashboards or args.all:
            automation.create_all_dashboards()
        
        print("\n" + "="*60)
        print("Automation Complete!")
        print("="*60)
        
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n✗ Error: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()

# Made with Bob

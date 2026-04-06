# VPC Storage SRE Team - Migration Plan Customization
## Team-Specific Configuration Details

**Document Version:** 1.0  
**Last Updated:** March 10, 2026  
**Team:** VPC Storage SRE Team

---

## Team Configuration Summary

### Team Size and Structure
- **Total Team Members:** 35 engineers
- **Geographic Distribution:** Multi-timezone (US, India, Costa Rica)
- **Rotation Patterns:**
  - **India Team:** Daily rotation
  - **US Team:** Weekly rotation
  - **Costa Rica Team:** Weekly rotation

### Timezone Coverage
- **India (IST):** UTC+5:30
- **United States (EST/PST):** UTC-5 to UTC-8
- **Costa Rica (CST):** UTC-6

**Coverage Model:** Follow-the-sun with regional rotations

---

## Current PagerDuty Configuration

### Schedule Details
- **PagerDuty Schedule ID:** PBL54OA
- **Schedule URL:** https://ibm.pagerduty.com/schedules/PBL54OA
- **Schedule Type:** Multi-region with different rotation patterns

### Integration Inventory

| Integration | Type | Purpose | Priority |
|-------------|------|---------|----------|
| Grafana | Monitoring | Metrics and alerting | High |
| Splunk | Log Management | Log-based alerts | High |
| ServiceNow | ITSM | Incident management | High |
| Microsoft Teams | Communication | Team notifications | Medium |
| Slack | Communication | Team notifications | Medium |
| Email | Notification | Backup notification | High |
| SMS | Notification | Critical alerts | High |

### Escalation Policy

**4-Level Escalation Structure:**

| Level | Escalation Time | Notification Target | Notification Methods |
|-------|----------------|---------------------|---------------------|
| Level 1 | 15 minutes | Primary On-Call (Regional) | Email, SMS, Phone, App |
| Level 2 | 15 minutes | Secondary On-Call (Regional) | Email, SMS, Phone, App |
| Level 3 | 30 minutes | Team Lead (Regional) | Email, SMS, Phone, App |
| Level 4 | 30 minutes | SRE Manager + Backup Manager | Email, SMS, Phone |

**Total Escalation Time:** 90 minutes (1.5 hours)

**Escalation Flow:**
```
Alert Triggered → Level 1 (Primary On-Call)
    ↓ (15 min no ack)
Level 2 (Secondary On-Call)
    ↓ (15 min no ack)
Level 3 (Team Lead)
    ↓ (30 min no ack)
Level 4 (SRE Manager + Backup)
```

---

## Migration Timeline

### Target Duration
**10 Weeks Total** (March 10, 2026 - May 18, 2026)

### Phase Breakdown

| Phase | Duration | Start Date | End Date | Key Activities |
|-------|----------|------------|----------|----------------|
| Phase 0: Discovery & Planning | 2 weeks | Week 1 | Week 2 | Document config, plan migration |
| Phase 1: Environment Setup | 1 week | Week 3 | Week 3 | Setup IBM OCM test instance |
| Phase 2: Configuration Migration | 2 weeks | Week 4 | Week 5 | Replicate all configs |
| Phase 3: Testing & Validation | 2 weeks | Week 6 | Week 7 | Comprehensive testing |
| Phase 4: Parallel Run | 3 weeks | Week 8 | Week 10 | Run both systems |
| Phase 5: Production Cutover | During Week 10 | Week 10 | Week 10 | Switch to IBM OCM |
| Phase 6: Stabilization | 2 weeks | Week 11 | Week 12 | Monitor and optimize |

### Blackout Periods
- **To be identified:** Coordinate with team to identify critical business periods
- **Recommended avoidance:** Month-end, quarter-end, major release windows
- **Holiday considerations:** Account for regional holidays (US, India, Costa Rica)

### Parallel Run Period
**3 Weeks** - Extended duration due to:
- Large team size (35 members)
- Multi-timezone complexity
- Multiple rotation patterns
- Critical integrations requiring thorough validation

---

## Team-Specific Considerations

### Multi-Timezone Challenges

#### Challenge 1: Schedule Coordination
**Issue:** Different rotation patterns across regions (daily vs weekly)

**Solution:**
- Create separate schedules per region in IBM OCM
- Link schedules through escalation policy
- Test handoff times between regions carefully
- Validate timezone handling for each region

#### Challenge 2: Training Coordination
**Issue:** Training 35 team members across multiple timezones

**Solution:**
- Conduct region-specific training sessions
- Record training sessions for asynchronous viewing
- Provide 24/7 access to training materials
- Schedule training during overlap hours when possible
- Assign regional champions for local support

#### Challenge 3: Communication During Migration
**Issue:** Keeping all 35 members informed across timezones

**Solution:**
- Use multiple communication channels (Email, Slack, Teams)
- Send updates at times visible to all regions
- Create dedicated migration Slack/Teams channel
- Maintain migration status dashboard
- Schedule regional Q&A sessions

### Large Team Considerations

#### Onboarding Complexity
**Challenge:** Onboarding 35 team members to IBM OCM

**Approach:**
- Phased onboarding by region
- Buddy system for new users
- Regional super-users for support
- Extended UAT period (2 weeks instead of 1)
- Multiple training sessions per region

#### Testing Scale
**Challenge:** Ensuring all 35 members test their configurations

**Approach:**
- Mandatory UAT checklist for each member
- Track completion by region
- Provide dedicated testing windows
- Offer one-on-one support sessions
- Gamify testing with completion tracking

#### Schedule Complexity
**Challenge:** Managing multiple rotation patterns in one system

**Approach:**
- Create separate schedules for each region
- Document rotation rules clearly
- Test schedule transitions extensively
- Validate coverage for 6 months (not just 3)
- Create schedule management runbook

---

## Integration-Specific Migration Details

### Grafana Integration
**Current Setup:**
- Alert routing to PagerDuty
- Webhook-based integration
- Multiple Grafana instances

**Migration Steps:**
1. Identify all Grafana instances sending alerts
2. Document webhook configurations
3. Create equivalent webhooks in IBM OCM
4. Test alert delivery from each instance
5. Validate alert formatting and routing
6. Configure alert deduplication rules

**Testing Requirements:**
- Test alerts from each Grafana instance
- Verify alert grouping works correctly
- Test high-volume scenarios
- Validate alert resolution sync

---

### Splunk Integration
**Current Setup:**
- Log-based alerting to PagerDuty
- Custom alert actions
- Multiple Splunk environments

**Migration Steps:**
1. Document Splunk alert configurations
2. Identify IBM OCM integration method (webhook/email/API)
3. Configure Splunk alert actions for IBM OCM
4. Test alert delivery and formatting
5. Validate alert context and details
6. Test alert acknowledgment flow

**Testing Requirements:**
- Test various log-based alert scenarios
- Verify alert context is preserved
- Test alert volume handling
- Validate search-based alerts

---

### ServiceNow Integration
**Current Setup:**
- Bi-directional integration with PagerDuty
- Incident creation and updates
- Status synchronization

**Migration Steps:**
1. Document current ServiceNow integration
2. Identify IBM OCM ServiceNow connector
3. Configure bi-directional sync
4. Test incident creation from IBM OCM
5. Test incident updates sync
6. Validate status synchronization
7. Test incident resolution flow

**Testing Requirements:**
- Test incident creation from alerts
- Verify incident updates sync correctly
- Test resolution synchronization
- Validate assignment group handling
- Test priority mapping

---

### Microsoft Teams Integration
**Current Setup:**
- Team notifications via PagerDuty
- Alert summaries posted to channels
- On-call schedule visibility

**Migration Steps:**
1. Identify Teams channels for notifications
2. Configure IBM OCM Teams connector
3. Set up notification templates
4. Test alert posting to channels
5. Configure schedule visibility
6. Test interactive features (ack from Teams)

**Testing Requirements:**
- Test notifications to all relevant channels
- Verify message formatting
- Test interactive acknowledgment
- Validate schedule display

---

### Slack Integration
**Current Setup:**
- Team notifications via PagerDuty
- Alert routing to specific channels
- On-call schedule bot

**Migration Steps:**
1. Identify Slack channels for notifications
2. Configure IBM OCM Slack app
3. Set up channel routing rules
4. Test alert posting
5. Configure schedule bot
6. Test slash commands and interactions

**Testing Requirements:**
- Test notifications to all channels
- Verify alert routing rules
- Test interactive features
- Validate schedule queries

---

## Regional Migration Approach

### India Team Migration
**Team Size:** ~15-18 members  
**Rotation:** Daily  
**Timezone:** IST (UTC+5:30)

**Approach:**
1. Conduct training during IST business hours
2. Test daily rotation handoffs thoroughly
3. Validate notifications during IST hours
4. Assign India-based super-user
5. Schedule cutover during low-activity period

**Specific Considerations:**
- Test daily handoff automation
- Validate holiday calendar for India
- Test notification delivery in IST timezone
- Ensure mobile app works in India region

---

### US Team Migration
**Team Size:** ~10-12 members  
**Rotation:** Weekly  
**Timezone:** EST/PST (UTC-5 to UTC-8)

**Approach:**
1. Conduct training during US business hours
2. Test weekly rotation transitions
3. Validate notifications across US timezones
4. Assign US-based super-user
5. Coordinate with India team for handoffs

**Specific Considerations:**
- Test weekly rotation automation
- Validate US holiday calendar
- Test cross-timezone handoffs with India
- Ensure coverage during US business hours

---

### Costa Rica Team Migration
**Team Size:** ~5-7 members  
**Rotation:** Weekly  
**Timezone:** CST (UTC-6)

**Approach:**
1. Conduct training during Costa Rica business hours
2. Test weekly rotation with US team
3. Validate notifications in CST timezone
4. Coordinate with US team for support
5. Test handoffs with other regions

**Specific Considerations:**
- Test weekly rotation coordination with US
- Validate Costa Rica holiday calendar
- Test notification delivery in CST
- Ensure mobile app works in Costa Rica

---

## Enhanced Risk Assessment

### Additional Risks for Large Multi-Timezone Team

#### Risk: Coordination Complexity
**Impact:** High | **Probability:** Medium

**Description:** Coordinating 35 team members across 3 regions and multiple timezones increases complexity and risk of miscommunication.

**Mitigation:**
- Assign regional coordinators
- Create detailed communication plan
- Use multiple communication channels
- Maintain migration status dashboard
- Schedule regular sync meetings across regions
- Document everything clearly

---

#### Risk: Training Gaps Across Regions
**Impact:** Medium | **Probability:** Medium

**Description:** Ensuring all 35 members are adequately trained across different timezones and schedules.

**Mitigation:**
- Record all training sessions
- Provide 24/7 access to materials
- Conduct multiple training sessions per region
- Assign regional champions
- Offer one-on-one sessions
- Track training completion by region

---

#### Risk: Schedule Configuration Errors
**Impact:** High | **Probability:** Medium

**Description:** Complex multi-region schedules with different rotation patterns increase risk of configuration errors.

**Mitigation:**
- Create separate schedules per region
- Triple-check all schedule configurations
- Validate schedules for 6 months
- Test handoffs between regions extensively
- Have each team member verify their slots
- Conduct dry-run before parallel run

---

#### Risk: Integration Overload
**Impact:** Medium | **Probability:** Low

**Description:** Multiple critical integrations (Grafana, Splunk, ServiceNow, Teams, Slack) increase complexity and failure points.

**Mitigation:**
- Test each integration individually
- Prioritize critical integrations (Grafana, Splunk, ServiceNow)
- Have fallback methods for each integration
- Test high-volume scenarios
- Monitor integration health during parallel run
- Maintain integration troubleshooting guide

---

## Success Criteria - Team Specific

### Onboarding Success
- [ ] All 35 team members have IBM OCM access
- [ ] 100% completion of UAT checklist across all regions
- [ ] All team members comfortable with IBM OCM (survey score >4/5)
- [ ] Regional super-users identified and trained
- [ ] Training materials accessible 24/7

### Schedule Success
- [ ] India daily rotation working correctly
- [ ] US weekly rotation working correctly
- [ ] Costa Rica weekly rotation working correctly
- [ ] Cross-region handoffs functioning properly
- [ ] No coverage gaps for 6-month period
- [ ] Override and time-off working for all regions

### Integration Success
- [ ] Grafana alerts flowing correctly (99%+ success rate)
- [ ] Splunk alerts working properly (99%+ success rate)
- [ ] ServiceNow bi-directional sync functioning (99%+ success rate)
- [ ] Teams notifications working (95%+ success rate)
- [ ] Slack notifications working (95%+ success rate)
- [ ] All notification channels operational

### Operational Success
- [ ] Zero missed critical alerts during migration
- [ ] All 4 escalation levels functioning correctly
- [ ] Escalation timing accurate (15/15/30/30 min)
- [ ] Multi-timezone notifications working
- [ ] 24/7 coverage maintained throughout migration

---

## Customized Timeline

### Detailed 10-Week Schedule

**Week 1-2: Discovery & Planning**
- Export PagerDuty configuration for all regions
- Document all 5 integrations in detail
- Map 35 team members to regions
- Validate escalation policy (4 levels)
- Finalize migration plan
- Obtain stakeholder approval

**Week 3: Environment Setup**
- Provision IBM OCM test instance
- Configure SSO for all 35 members
- Set up regional admin access
- Test connectivity to all integrations
- Create initial documentation

**Week 4-5: Configuration Migration**
- Create 3 regional schedules (India daily, US weekly, Costa Rica weekly)
- Configure 4-level escalation policy (15/15/30/30 min)
- Set up all 5 integrations (Grafana, Splunk, ServiceNow, Teams, Slack)
- Add all 35 team members with contact info
- Configure notification preferences per region

**Week 6-7: Testing & Validation**
- Conduct regional training sessions (3 sessions)
- Perform integration testing (5 integrations)
- Execute UAT with all 35 members
- Test cross-region handoffs
- Validate 4-level escalation
- Test high-volume scenarios

**Week 8-10: Parallel Run (3 weeks)**
- Configure IBM OCM production
- Enable dual alerting (PagerDuty + IBM OCM)
- Monitor both systems continuously
- Daily reviews with regional leads
- Track metrics and discrepancies
- Prepare for cutover

**Week 10: Production Cutover**
- Final go/no-go decision
- Execute cutover during low-activity window
- Disable PagerDuty integrations
- Enable IBM OCM integrations
- Monitor intensively for 48 hours
- Keep PagerDuty as backup

**Week 11-12: Stabilization**
- Continue monitoring IBM OCM
- Address any issues promptly
- Gather feedback from all regions
- Optimize configurations
- Conduct retrospective
- Decommission PagerDuty

---

## Regional Contact Information

### India Team
- **Regional Lead:** [To be assigned]
- **Super-User:** [To be assigned]
- **Team Size:** ~15-18 members
- **Primary Timezone:** IST (UTC+5:30)
- **Rotation:** Daily

### US Team
- **Regional Lead:** [To be assigned]
- **Super-User:** [To be assigned]
- **Team Size:** ~10-12 members
- **Primary Timezone:** EST/PST (UTC-5 to UTC-8)
- **Rotation:** Weekly

### Costa Rica Team
- **Regional Lead:** [To be assigned]
- **Super-User:** [To be assigned]
- **Team Size:** ~5-7 members
- **Primary Timezone:** CST (UTC-6)
- **Rotation:** Weekly

---

## Next Steps

1. **Review and Approve:** Review this customization document with stakeholders
2. **Assign Roles:** Identify regional leads and super-users
3. **Finalize Timeline:** Confirm start date and blackout periods
4. **Begin Phase 0:** Start discovery and planning activities
5. **Communication:** Announce migration to all 35 team members
6. **Preparation:** Gather PagerDuty configuration details
7. **Coordination:** Schedule kickoff meetings with regional teams

---

**Document Owner:** SRE Manager, VPC Storage SRE Team  
**Last Updated:** March 10, 2026  
**Next Review:** Upon stakeholder approval
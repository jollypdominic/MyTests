# NFS over IPsec Migration - Action Plan & Risk Assessment

## Executive Summary

**Issue:** Customers using NFS over IPsec are at risk of data path loss during NetApp node takeovers/givebacks due to an SDN issue.

**Timeline:** Network fix requires 3-4 months to develop.

**Affected Customers:** 5 customers total (3 internal, 2 external)

**Proposed Solution:** Migrate customers from IPsec to non-IPsec NFS mounts with customer consent.

---

## 🎯 Action Items for SRE Team

### **Aparna Srinivasan (apasrini) - Primary Responsibilities**

#### 1. **Customer Identification & Tracking** ⏰ Priority: HIGH
- [ ] Execute existing script to identify all customers currently using IPsec
- [ ] Set up automated daily monitoring for new IPsec adoptions
- [ ] Maintain updated list of affected customers (currently 5 identified)
- [ ] Categorize customers: Internal (3) vs External (2)

#### 2. **Technical Documentation** ⏰ Priority: HIGH
- [ ] Document complete migration procedure with discrete steps
- [ ] Create UI selection guide for console-based migration
- [ ] Document mount command options and syntax
- [ ] Prepare customer-facing migration instructions
- [ ] Include rollback procedures in case of issues

#### 3. **Migration Validation** ⏰ Priority: CRITICAL
- [ ] Validate data persistence after SMT migration from IPsec to None
- [ ] Test complete migration workflow in non-production environment
- [ ] Verify 3-minute service disruption estimate
- [ ] Document validation results and findings

#### 4. **Customer Communication Preparation**
- [ ] Prepare communication templates for internal customers
- [ ] Coordinate with ACS for external customer communication
- [ ] Include risk disclosure and consent requirements
- [ ] Prepare FAQ document for customer questions

---

### **Srividhya (Storage SRE) - Primary Responsibilities**

#### 1. **Technical Investigation** ⏰ Priority: HIGH
- [ ] Investigate alternative solutions to IPsec migration
- [ ] Assess feasibility of maintaining IPsec during network fix development
- [ ] Evaluate impact of NetApp node takeovers/givebacks on IPsec mounts
- [ ] Research industry best practices for similar scenarios

#### 2. **Risk Assessment & Mitigation**
- [ ] Document all identified risks with migration approach
- [ ] Develop mitigation strategies for each risk category
- [ ] Create contingency plans for migration failures
- [ ] Establish rollback criteria and procedures

#### 3. **Migration Support**
- [ ] Provide technical support during customer migrations
- [ ] Monitor migration progress and success rates
- [ ] Troubleshoot any issues during migration process
- [ ] Document lessons learned for future migrations

#### 4. **Collaboration with Network Team**
- [ ] Maintain communication with network team on fix timeline
- [ ] Provide feedback on customer impact and urgency
- [ ] Coordinate testing of network fix when available
- [ ] Plan re-migration strategy if customers want to return to IPsec

---

## ⚠️ Potential Risks & Mitigation Strategies

### **1. Service Disruption Risks**

#### Risk: 3-Minute Service Disruption
- **Impact:** Customer applications may experience downtime during migration
- **Severity:** MEDIUM
- **Mitigation:**
  - Schedule migrations during customer maintenance windows
  - Provide advance notice (minimum 7 days)
  - Offer to perform migration during off-peak hours
  - Have rollback plan ready if disruption exceeds 3 minutes

#### Risk: Extended Downtime
- **Impact:** Migration may take longer than estimated 3 minutes
- **Severity:** HIGH
- **Mitigation:**
  - Thoroughly test migration procedure beforehand
  - Have SRE team on standby during migration
  - Prepare detailed troubleshooting guide
  - Establish clear escalation path

---

### **2. Data Integrity Risks**

#### Risk: Data Loss During Migration
- **Impact:** Customer data may be lost or corrupted during SMT transition
- **Severity:** CRITICAL
- **Mitigation:**
  - **MANDATORY:** Validate data persistence before customer migrations
  - Require customers to perform backup before migration
  - Test with non-production data first
  - Implement data verification checks post-migration
  - Document data validation procedures

#### Risk: In-Flight Data Loss
- **Impact:** Data being written during migration may be lost
- **Severity:** HIGH
- **Mitigation:**
  - Require application quiesce before unmounting
  - Verify all writes are flushed to storage
  - Implement pre-migration checklist
  - Monitor for any pending I/O operations

---

### **3. Customer Adoption Risks**

#### Risk: Customer Refusal to Migrate
- **Impact:** Customers may decline migration, remaining at risk
- **Severity:** MEDIUM
- **Mitigation:**
  - Clearly communicate risks of staying on IPsec
  - Provide detailed risk vs. benefit analysis
  - Offer technical support throughout migration
  - Document customer decisions for liability purposes

#### Risk: Customer Dissatisfaction
- **Impact:** Customers may be unhappy with forced migration
- **Severity:** MEDIUM
- **Mitigation:**
  - Emphasize this is a temporary workaround (3-4 months)
  - Offer to migrate back to IPsec once network fix is available
  - Provide white-glove migration support
  - Consider compensation for business impact

---

### **4. Operational Risks**

#### Risk: Incomplete Customer Identification
- **Impact:** Some IPsec customers may be missed
- **Severity:** HIGH
- **Mitigation:**
  - Run comprehensive script across all regions
  - Implement daily automated monitoring
  - Cross-reference with billing/provisioning systems
  - Establish process for newly onboarded customers

#### Risk: Script Automation Failures
- **Impact:** Daily monitoring may miss new IPsec adoptions
- **Severity:** MEDIUM
- **Mitigation:**
  - Implement alerting for script failures
  - Have manual backup verification process
  - Test script reliability regularly
  - Document script maintenance procedures

#### Risk: Communication Breakdown
- **Impact:** Customers may not receive migration instructions
- **Severity:** HIGH
- **Mitigation:**
  - Use multiple communication channels (email, portal, ACS)
  - Require acknowledgment of receipt
  - Follow up with non-responsive customers
  - Maintain communication log

---

### **5. Technical Execution Risks**

#### Risk: Incorrect Migration Steps
- **Impact:** Migration may fail or cause additional issues
- **Severity:** HIGH
- **Mitigation:**
  - Create detailed step-by-step documentation
  - Include screenshots and command examples
  - Perform dry-run with internal customers first
  - Have SRE review all customer-facing documentation

#### Risk: Mount Target Recreation Issues
- **Impact:** New mount target may not function correctly
- **Severity:** HIGH
- **Mitigation:**
  - Test mount target creation/deletion thoroughly
  - Verify network connectivity before customer migration
  - Have pre-migration validation checklist
  - Prepare troubleshooting guide for common issues

#### Risk: Remount Failures
- **Impact:** Customers may be unable to remount shares
- **Severity:** CRITICAL
- **Mitigation:**
  - Provide exact mount commands with all parameters
  - Test mount commands in customer-like environments
  - Have SRE available during customer migrations
  - Prepare emergency rollback procedure

---

### **6. Timeline & Resource Risks**

#### Risk: Network Fix Delays Beyond 3-4 Months
- **Impact:** Customers remain on non-IPsec longer than expected
- **Severity:** MEDIUM
- **Mitigation:**
  - Maintain regular updates from network team
  - Keep customers informed of timeline changes
  - Ensure non-IPsec solution is stable long-term
  - Plan for potential permanent non-IPsec option

#### Risk: Insufficient SRE Resources
- **Impact:** Unable to support all customer migrations simultaneously
- **Severity:** MEDIUM
- **Mitigation:**
  - Prioritize migrations (external customers first)
  - Stagger migration schedule
  - Create self-service documentation for internal customers
  - Request additional resources if needed

---

## 📋 Migration Procedure (High-Level)

### **Phase 1: Pre-Migration (Aparna & Srividhya)**
1. Identify all affected customers using script
2. Validate data persistence in test environment
3. Create detailed migration documentation
4. Prepare customer communication materials

### **Phase 2: Customer Communication**
1. Contact internal customers directly (3 customers)
2. Coordinate with ACS for external customers (2 customers)
3. Obtain customer consent and schedule migrations
4. Provide migration instructions and support contact

### **Phase 3: Migration Execution**
1. Customer unmounts NFS share
2. Delete mount target with IPsec transit encryption
3. Create new mount target with transit encryption = None
4. Customer remounts share with new mount target
5. Verify data accessibility and integrity

### **Phase 4: Post-Migration**
1. Confirm successful migration with customer
2. Monitor for any issues in first 24-48 hours
3. Document any problems and resolutions
4. Update customer tracking spreadsheet

---

## 🔄 Rollback Strategy

### **If Migration Fails:**
1. Recreate mount target with IPsec enabled
2. Provide customer with original mount commands
3. Verify customer can access data
4. Document failure reason for investigation
5. Schedule retry after issue resolution

### **If Customer Wants to Revert:**
1. Wait for network fix completion (3-4 months)
2. Follow reverse migration procedure
3. Test IPsec functionality thoroughly
4. Monitor for original SDN issue

---

## 📊 Success Metrics

- [ ] 100% of affected customers identified
- [ ] Data persistence validated successfully
- [ ] All 5 customers migrated within planned timeline
- [ ] Zero data loss incidents
- [ ] Service disruption ≤ 3 minutes per customer
- [ ] Customer satisfaction maintained
- [ ] Daily monitoring operational

---

## 🚨 Escalation Path

1. **Technical Issues:** Srividhya → Storage SRE Lead → Engineering
2. **Customer Issues:** Aparna → Customer Success → Management
3. **Timeline Issues:** Deva Karalil → Network Team → Leadership
4. **Data Loss:** IMMEDIATE escalation to all stakeholders

---

## 📅 Timeline

| Phase | Duration | Owner | Status |
|-------|----------|-------|--------|
| Customer Identification | 1-2 days | Aparna | Pending |
| Data Persistence Validation | 3-5 days | Aparna & Srividhya | In Progress |
| Documentation Creation | 3-5 days | Aparna | Pending |
| Internal Customer Migration | 1 week | Both | Pending |
| External Customer Migration | 2 weeks | Both + ACS | Pending |
| Post-Migration Monitoring | Ongoing | Both | Pending |
| Network Fix Deployment | 3-4 months | Network Team | Pending |

---

## 📝 Notes & Considerations

1. **Customer Consent:** Mandatory before any migration
2. **Backup Requirement:** Strongly recommend customer backups
3. **Testing Priority:** Internal customers should migrate first
4. **Communication:** Over-communicate rather than under-communicate
5. **Documentation:** Keep detailed logs of all migrations
6. **Monitoring:** Watch for new IPsec adoptions daily
7. **Network Fix:** Plan for re-migration once available

---

**Document Owner:** Deva Karalil  
**Last Updated:** June 4, 2026  
**Review Frequency:** Weekly until all migrations complete  
**Next Review:** [To be scheduled]
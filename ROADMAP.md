# COS Portal - Product Roadmap

## Vision

Create a secure, self-service Certificate of Sponsorship (CoS) management platform that allows administrators to manage applications and applicants to submit and maintain information through secure magic-link access.

---

# ✅ Sprint 1 - Core MVP (Complete)

## Database

- [x] SQLite database
- [x] Applications table
- [x] Members table
- [x] Automatic application IDs

## Application Creation

- [x] Create application form
- [x] Generate application records
- [x] Store contact details
- [x] Store venue information
- [x] Store member counts

## Member Management

- [x] Add members
- [x] View members
- [x] Delete members
- [x] Store passport data
- [x] Upload passport files

## Dashboard

- [x] Application listing
- [x] Progress tracking
- [x] Search applications
- [x] Delete applications

## Drafts

- [x] Save draft applications
- [x] Resume draft applications

---

# ✅ Sprint 2 - Admin Portal & Security (Complete)

## Authentication

- [x] Admin login
- [x] Session management
- [x] Logout
- [x] Protected APIs

## Magic Links

- [x] UUID token generation
- [x] Unique access links
- [x] Token validation
- [x] Invalid token handling

## Dashboard

- [x] Dashboard as root route
- [x] Application status display
- [x] Progress bars
- [x] Copy magic links
- [x] Open application links

## Security Improvements

- [x] Admin protected delete actions
- [x] Session checks
- [x] Token validation

---

# ✅ Sprint 2.5 - Applicant Portal (Complete)

## Applicant Dashboard

- [x] Applicant dashboard page
- [x] Magic links open dashboard
- [x] Progress display
- [x] Member count display
- [x] Completion tracking

## Applicant Workflow

- [x] Applicant dashboard
- [x] Add member button
- [x] Back to dashboard navigation
- [x] Redirect after save

## User Experience

- [x] Separate admin and applicant experiences
- [x] Dashboard → Application workflow
- [x] Clear user journey

---

# 🚀 Sprint 3 - Member Management

## Member Editing

- [ ] Edit member information
- [ ] Update passport details
- [ ] Replace passport uploads
- [ ] View individual member records
- [ ] Member detail page

## Applicant Improvements

- [ ] Autosave member forms
- [ ] Save incomplete member forms
- [ ] Unsaved changes warnings
- [ ] Form success messages
- [ ] Better validation messages

## Completion Features

- [ ] Mark application complete
- [ ] Applicant completion screen
- [ ] Lock completed applications
- [ ] Confirmation summary page

---

# 🚀 Sprint 4 - CoS Workflow

## Application Status System

- [ ] Draft
- [ ] Awaiting Information
- [ ] In Progress
- [ ] Completed
- [ ] Submitted
- [ ] Approved
- [ ] Rejected

## Internal Notes

- [ ] Admin notes
- [ ] Staff comments
- [ ] Internal reminders
- [ ] Application history

## Application Reviews

- [ ] Review queue
- [ ] Missing information flags
- [ ] Validation checks
- [ ] Submission checklist

---

# 🚀 Sprint 5 - Document Management

## File Management

- [ ] Download uploaded passports
- [ ] Replace uploaded documents
- [ ] Delete uploaded files
- [ ] Preview uploaded files

## Validation

- [ ] File type restrictions
- [ ] File size restrictions
- [ ] Passport expiry warnings
- [ ] Missing document checks

## Exports

- [ ] PDF application pack
- [ ] Member roster export
- [ ] CSV export
- [ ] Audit report export

---

# 🚀 Sprint 6 - Email Automation

## Applicant Emails

- [ ] Send magic links automatically
- [ ] Reminder emails
- [ ] Recovery emails
- [ ] Completion confirmation emails

## Admin Emails

- [ ] Application created alerts
- [ ] Application completed alerts
- [ ] Missing information alerts
- [ ] Daily activity summary

## Templates

- [ ] Email template management
- [ ] Custom email branding

---

# 🚀 Sprint 7 - Security & Compliance

## Authentication

- [ ] Environment variables
- [ ] Remove hard-coded credentials
- [ ] bcrypt password hashing
- [ ] Password reset workflow
- [ ] Session expiry

## Security

- [ ] Helmet middleware
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Input sanitisation
- [ ] Upload virus scanning

## Access Control

- [ ] Fully protect dashboard.html
- [ ] Fully protect create-application.html
- [ ] Role-based permissions
- [ ] Audit logging

---

# 🚀 Sprint 8 - Production Deployment

## Infrastructure

- [ ] Production environment
- [ ] HTTPS
- [ ] SSL certificate
- [ ] Reverse proxy
- [ ] Environment configuration

## Hosting

- [ ] VPS deployment
- [ ] Database backups
- [ ] Automated backups
- [ ] Monitoring
- [ ] Error logging

## Operations

- [ ] Disaster recovery plan
- [ ] Backup restoration testing
- [ ] Performance monitoring

---

# 🚀 Sprint 9 - Commercial Features

## Client Management

- [ ] Multiple organisations
- [ ] Client accounts
- [ ] Organisation branding

## Billing

- [ ] Subscription plans
- [ ] Stripe integration
- [ ] Usage tracking
- [ ] Invoicing

## Reporting

- [ ] Application analytics
- [ ] Usage dashboards
- [ ] Completion rates
- [ ] Exportable reports

---

# Current Architecture

```text
ADMIN

login.html
    ↓

dashboard.html
    ├── Search Applications
    ├── Create Application
    ├── View Progress
    ├── Delete Applications
    └── Generate Magic Links

create-application.html

────────────────────────────

APPLICANT

applicant.html?token=xxxxx
    ├── View Progress
    ├── View Submitted Members
    ├── Add Member
    └── Completion Status

application.html?token=xxxxx
    └── Member Entry Form
```

---

# Current User Journey

```text
Admin Login
    ↓
Dashboard
    ↓
Create Application
    ↓
Generate Magic Link
    ↓
Applicant Dashboard
    ↓
Add Member
    ↓
Save Member
    ↓
Applicant Dashboard
    ↓
Application Complete
```

---

# Current Release Status

### Version

**v0.3.0 - Applicant Portal MVP**

### Completed

✅ Admin Portal

✅ Magic Links

✅ Applicant Dashboard

✅ Member Submission

✅ Progress Tracking

✅ Session Authentication

✅ SQLite Persistence

✅ Passport Uploads

### Next Milestone

🎯 **v0.4.0 - Member Management**

Primary focus:

- Member editing
- Application completion workflow
- Improved applicant experience
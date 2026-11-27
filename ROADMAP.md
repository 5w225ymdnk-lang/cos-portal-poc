# COS Portal Roadmap

## ✅ Sprint 1 - Core Application (Complete)

### Application Management
- [x] Create application
- [x] Generate application IDs
- [x] Store application data in SQLite
- [x] Application search

### Member Management
- [x] Add members
- [x] View members
- [x] Delete members
- [x] Member validation

### File Uploads
- [x] Passport uploads
- [x] File storage with Multer

### Dashboard
- [x] Application dashboard
- [x] Progress tracking
- [x] Member counts
- [x] Application deletion

### Drafts
- [x] Save draft applications
- [x] Resume draft applications

---

## ✅ Sprint 2 - Admin Portal & Magic Links (Complete)

### Authentication
- [x] Admin login
- [x] Session management
- [x] Logout functionality
- [x] Protected dashboard API

### Application Access
- [x] UUID-based access tokens
- [x] Magic link generation
- [x] Token validation
- [x] Invalid token protection (404)

### Admin Workflow
- [x] Dashboard as main entry point
- [x] Admin-only application creation
- [x] Copy magic links
- [x] Application management

### Security Improvements
- [x] Protected application deletion
- [x] Session authentication checks
- [x] Applicant/admin workflow separation

### User Journey
- [x] Admin creates application
- [x] Magic link generated
- [x] Applicant accesses application
- [x] Applicant submits members
- [x] Dashboard updates progress

---

## 🚀 Sprint 3 - Security & Production Readiness

### Authentication
- [ ] Move credentials to environment variables
- [ ] Replace hard-coded admin password
- [ ] Add bcrypt password hashing
- [ ] Password reset capability
- [ ] Session timeout handling

### Security
- [ ] Restrict upload file types
- [ ] Restrict upload file size
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Security headers (Helmet)
- [ ] Input sanitisation

### Admin Protection
- [ ] Lock down dashboard.html
- [ ] Lock down create-application.html
- [ ] Remove public access to admin pages
- [ ] Admin middleware for all admin routes

### Applicant Experience
- [ ] Autosave member form
- [ ] Better error messages
- [ ] Completion confirmation screen
- [ ] Resume incomplete applications

---

## 🚀 Sprint 4 - CoS Workflow Features

### Application States
- [ ] Draft
- [ ] Awaiting Information
- [ ] Complete
- [ ] Submitted
- [ ] Approved
- [ ] Rejected

### Admin Features
- [ ] Internal notes
- [ ] Staff comments
- [ ] Audit history
- [ ] Activity timeline

### Documents
- [ ] Download uploaded passports
- [ ] Document checklist
- [ ] Missing document warnings

---

## 🚀 Sprint 5 - Email Automation

### Applicant Emails
- [ ] Magic link emails
- [ ] Recovery emails
- [ ] Reminder emails
- [ ] Completion emails

### Admin Emails
- [ ] Application created notifications
- [ ] Application completed notifications
- [ ] Missing information alerts

---

## 🚀 Sprint 6 - Deployment

### Infrastructure
- [ ] Environment variables
- [ ] HTTPS
- [ ] SSL certificate
- [ ] Reverse proxy (Nginx)
- [ ] Logging
- [ ] Monitoring

### Hosting
- [ ] VPS deployment
- [ ] Automated backups
- [ ] Database backup strategy
- [ ] Custom domain

---

# Sprint 2 Deliverable

✅ Admin Login

✅ Dashboard

✅ Create Application

✅ Generate Magic Link

✅ Applicant Access via Token

✅ Member Submission

✅ Progress Tracking

✅ Application Management

✅ Logout

---

# Pre-Push Checklist

- [ ] Fix email regex
- [ ] Rename `index.html` → `create-application.html`
- [ ] Remove dashboard link from `application.html`
- [ ] Remove copy-link button from `application.html`
- [ ] Test login
- [ ] Test dashboard
- [ ] Test create application
- [ ] Test magic link
- [ ] Test member creation
- [ ] Test delete member
- [ ] Test delete application
- [ ] Test logout
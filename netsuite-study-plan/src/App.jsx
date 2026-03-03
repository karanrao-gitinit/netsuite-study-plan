import { useState } from "react";

// ─── PHASES DATA ─────────────────────────────────────────────────────────────
const phases = [
  {
    id: 1, title: "Accounting Foundations", color: "#F59E0B", accent: "#FDE68A", icon: "📊",
    duration: "Weeks 1–5 · Mar 3 – Apr 5",
    goal: "Understand financial statements, NetSuite accounting setup & period management",
    weeks: [
      { num: 1, dates: "Mar 3–9", title: "Bookkeeping Basics", hours: 27, milestone: null, tasks: ["Double-entry bookkeeping — debits & credits","Chart of Accounts: types, hierarchy, mapping","Journal entries: manual & system-generated","Resource: Coursera 'Intro to Financial Accounting' (free audit)"] },
      { num: 2, dates: "Mar 10–16", title: "Financial Statements", hours: 27, milestone: null, tasks: ["P&L, Balance Sheet, Cash Flow Statement — structure & logic","How NetSuite generates these reports natively","Practice: Pull & interpret standard NS financial reports","Resource: NetSuite LCS — Accounting Fundamentals course"] },
      { num: 3, dates: "Mar 17–23", title: "NetSuite Accounting Setup", hours: 27, milestone: null, tasks: ["Accounting Periods & Fiscal Year configuration","Multi-book accounting & subsidiaries","Revenue Recognition basics in NS","Resource: SuiteAnswers + Sandbox hands-on practice"] },
      { num: 4, dates: "Mar 24–30", title: "Advanced NS Accounting", hours: 27, milestone: null, tasks: ["Deferred Revenue & Amortization (reinforce existing knowledge)","Intercompany transactions & elimination","Bank Reconciliation in NetSuite","Resource: NS Help Center + Sandbox simulations"] },
      { num: 5, dates: "Mar 31–Apr 5", title: "Accounting Consolidation", hours: 27, milestone: "Can independently configure accounting in NS and explain financial statements to any client", tasks: ["End-to-end accounting scenario in sandbox: setup to close","Explain P&L and Balance Sheet to a mock non-finance client","Review weak areas from Weeks 1–4","Buffer: catch up on anything missed"] },
    ],
  },
  {
    id: 2, title: "Advanced Workflows", color: "#10B981", accent: "#A7F3D0", icon: "⚙️",
    duration: "Weeks 6–9 · Apr 6 – May 3",
    goal: "Build complex, multi-level workflows from scratch without any guidance",
    weeks: [
      { num: 6, dates: "Apr 6–12", title: "Workflow Deep Dive", hours: 27, milestone: null, tasks: ["Multi-level approval routing — conditions, escalations","Custom actions: Send Email, Set Field Value, Create Record","Workflow states, transitions & buttons","Resource: SuiteAnswers — Advanced Workflow documentation"] },
      { num: 7, dates: "Apr 13–19", title: "Complex Workflow Scenarios", hours: 27, milestone: null, tasks: ["Scheduled workflows — triggers, recurrence","Sublist actions on transactions","Error handling, locking & unlocking records","Build 2 complex workflows from scratch in sandbox"] },
      { num: 8, dates: "Apr 20–26", title: "Workflow + Integration Patterns", hours: 27, milestone: null, tasks: ["Workflow + Saved Search combinations for dynamic conditions","Workflow + Email alert templates","Workflow + SuiteScript trigger hooks (preview)","Build: Full PO approval workflow with 3-level escalation"] },
      { num: 9, dates: "Apr 27–May 3", title: "Workflow Mastery Sprint", hours: 27, milestone: "Can independently design and build any business workflow — no documentation needed", tasks: ["Build a full workflow suite for Sales Order to Invoice lifecycle","Document your workflows like a client deliverable","Peer review: explain your workflows to someone unfamiliar","Buffer: refine and fix any workflow gaps"] },
    ],
  },
  {
    id: 3, title: "SuiteScript Fundamentals", color: "#6366F1", accent: "#C7D2FE", icon: "💻",
    duration: "Weeks 10–14 · May 4 – Jun 7",
    goal: "Write basic scripts, understand all script types, collaborate effectively with developers",
    weeks: [
      { num: 10, dates: "May 4–10", title: "JavaScript Foundations", hours: 27, milestone: null, tasks: ["Variables, functions, arrays, objects — JS fundamentals","ES6+: arrow functions, destructuring, promises, async/await","DOM basics — not required for NS but builds mental model","Resource: freeCodeCamp JavaScript Algorithms course (free)"] },
      { num: 11, dates: "May 11–17", title: "SuiteScript 2.x Architecture", hours: 27, milestone: null, tasks: ["SuiteScript 2.x module system — define(), require()","N/record and N/search modules — core building blocks","Entry point functions overview for each script type","Resource: NetSuite Developer Documentation (official)"] },
      { num: 12, dates: "May 18–24", title: "Client & User Event Scripts", hours: 27, milestone: null, tasks: ["Client Scripts: pageInit, fieldChanged, validateField, saveRecord","User Event Scripts: beforeLoad, beforeSubmit, afterSubmit","Practice: Build field auto-populate & validation script","Deploy scripts in sandbox — test & debug"] },
      { num: 13, dates: "May 25–31", title: "Suitelets & Scheduled Scripts", hours: 27, milestone: null, tasks: ["Suitelet basics — custom UI pages & forms","Scheduled Scripts — automating background jobs","Map/Reduce script type — bulk data processing intro","Practice: Build a scheduled script that runs a saved search & emails results"] },
      { num: 14, dates: "Jun 1–7", title: "SuiteScript Integration Week", hours: 27, milestone: "Can write basic scripts, understand all 6 script types, meaningfully collaborate with devs", tasks: ["RESTlet basics — external system integration","When to use each script type — decision framework","How to read & understand a developer's script (code review skills)","Build: Mini project combining workflow + user event script"] },
    ],
  },
  {
    id: 4, title: "Certification Prep", color: "#EF4444", accent: "#FECACA", icon: "🏅",
    duration: "Weeks 15–18 · Jun 8 – Jul 5",
    goal: "Pass SuiteFoundation + ERP Consultant certification exams",
    weeks: [
      { num: 15, dates: "Jun 8–14", title: "SuiteFoundation Exam Prep", hours: 27, milestone: null, tasks: ["Review NS core concepts: roles, permissions, customization","SuiteFoundation exam guide — all topic areas","Practice questions: 50 questions/day minimum","Resource: NS Learning Cloud Support (LCS) — exam prep guides"] },
      { num: 16, dates: "Jun 15–21", title: "ERP Consultant Exam Prep", hours: 27, milestone: null, tasks: ["Financial Management module deep-dive for exam","Order Management & procurement exam topics","Module configuration scenarios — practice in sandbox","Full mock exam under timed conditions"] },
      { num: 17, dates: "Jun 22–28", title: "Mock Exams & Weak Areas", hours: 27, milestone: null, tasks: ["2 full timed mock exams (SuiteFoundation)","Identify & aggressively target weak topic areas","1 full timed mock exam (ERP Consultant)","Final review — flashcards on missed concepts"] },
      { num: 18, dates: "Jun 29–Jul 5", title: "Exam Week", hours: 27, milestone: "SuiteFoundation & ERP Consultant certifications achieved", tasks: ["Take SuiteFoundation exam — target: 75%+ to pass","Take ERP Consultant exam within same week","If failed: rebook immediately, note weak areas","Celebrate — you are now certified or very close"] },
    ],
  },
  {
    id: 5, title: "Job Hunt & Offer", color: "#8B5CF6", accent: "#DDD6FE", icon: "🚀",
    duration: "Weeks 19–22 · Jul 6 – Jul 31",
    goal: "Land a 14 LPA offer before July 31",
    weeks: [
      { num: 19, dates: "Jul 6–12", title: "Profile & Resume Overhaul", hours: 27, milestone: null, tasks: ["Update resume: certs + Advanced Workflow + SuiteScript skills","LinkedIn: headline, about, skills section optimisation","Target list: NetSuite partner firms, Big 4, Oracle/NetSuite direct","Apply to first 10 positions — focus on 12–16 LPA range"] },
      { num: 20, dates: "Jul 13–19", title: "Active Applications", hours: 27, milestone: null, tasks: ["Apply to 10 more positions — total 20+ applications","Interview prep: STAR format for your 4 E2E implementation stories","Technical prep: be ready to explain workflows & accounting config","Mock interview with a peer or record yourself"] },
      { num: 21, dates: "Jul 20–26", title: "Interview Sprint", hours: 27, milestone: null, tasks: ["Active interview phase — 2–4 interviews this week","Follow up on all pending applications","Negotiate: anchor at 15 LPA, accept 13.5+ LPA","Continue applying — never stop until offer is signed"] },
      { num: 22, dates: "Jul 27–31", title: "Offer & Close", hours: 15, milestone: "14 LPA offer signed. Goal achieved.", tasks: ["Evaluate all offers on table","Counter-negotiate if needed — you have certs + skills now","Sign the offer letter","Notice period planning with current employer"] },
    ],
  },
];

// ─── PROJECTS DATA ────────────────────────────────────────────────────────────
const workflowProjects = [
  {
    id:"wf1", level:"Beginner", levelColor:"#10B981", week:"Week 6–7", recordType:"Purchase Order",
    title:"Purchase Order 3-Level Approval Workflow",
    scenario:"A mid-sized manufacturing company needs a Purchase Order approval process. POs below Rs 50,000 need 1 approval, between Rs 50,000 and Rs 5,00,000 need 2 approvals, and above Rs 5,00,000 need 3 approvals including the CFO.",
    objective:"Build a conditional multi-level PO approval workflow with email notifications and automatic escalation after 48 hours of inaction.",
    sections:[
      { title:"Business Requirements", items:["PO Amount below Rs 50,000 — Auto-route to Purchasing Manager only","PO Amount Rs 50,000 to Rs 5,00,000 — Purchasing Manager then Finance Manager","PO Amount above Rs 5,00,000 — All three: Purchasing Manager, Finance Manager, then CFO","Each approver receives an email with PO details and Approve/Reject button","If no action in 48 hrs, escalate to the next level approver automatically","On final approval, PO status changes to Approved and a confirmation email goes to requester","On rejection at any level, PO status changes to Rejected and requester is notified with reason"] },
      { title:"Workflow States to Build", items:["State 1: Pending Submission — Initial state when PO is saved as draft","State 2: Pending L1 Approval — Routes to Purchasing Manager","State 3: Pending L2 Approval — Routes to Finance Manager (conditional on amount)","State 4: Pending L3 Approval — Routes to CFO (conditional on amount)","State 5: Approved — Final approval state, triggers confirmation email","State 6: Rejected — Terminal state with reason captured"] },
      { title:"Transitions & Conditions", items:["Transition: Submit to L1 on button click Submit for Approval","Condition L1 to L2: PO Amount >= 50000 AND L1 Approved = true","Condition L2 to L3: PO Amount >= 500000 AND L2 Approved = true","Scheduled Trigger: If in L1, L2 or L3 state for 48+ hrs — escalate to next approver","Reject Transition: Available at any approval state, prompts approver for written reason"] },
      { title:"Custom Fields Required", items:["custbody_approval_level (Integer) — tracks current approval level number","custbody_rejection_reason (Long Text) — stores rejection notes from approver","custbody_submitted_by (Select Employee) — auto-populated on submit","custbody_approved_l1 (Checkbox) — L1 approval flag","custbody_approved_l2 (Checkbox) — L2 approval flag"] },
      { title:"Email Templates to Create", items:["Template 1: PO Approval Request — sent to each approver with PO summary table","Template 2: PO Approved — sent to requester on final approval","Template 3: PO Rejected — sent to requester with rejection reason included","Template 4: Escalation Notice — sent to next approver when 48hr timeout triggers"] },
      { title:"Acceptance Criteria", items:["Test 1: Create a PO for Rs 30,000 — verify only L1 approval route triggers","Test 2: Create a PO for Rs 2,00,000 — verify L1 then L2 approval required","Test 3: Create a PO for Rs 6,00,000 — verify all 3 levels required in sequence","Test 4: Reject at L2 — verify requester receives rejection email with reason","Test 5: Simulate 48hr timeout — verify escalation email triggers to next approver"] },
    ],
  },
  {
    id:"wf2", level:"Intermediate", levelColor:"#F59E0B", week:"Week 8", recordType:"Sales Order",
    title:"Sales Order Credit Check & Fulfilment Lock Workflow",
    scenario:"An e-commerce company wants to automatically check customer credit limits before a Sales Order is approved for fulfilment. Orders exceeding the credit limit must be put on hold and reviewed by the Finance team.",
    objective:"Build a workflow that checks credit limit at SO save, locks fulfilment if credit is exceeded, and notifies finance for manual review with approve or reject options.",
    sections:[
      { title:"Business Requirements", items:["On SO save, compare SO Total against Customer's available credit limit","If credit is sufficient — auto-approve and move to fulfilment queue","If credit is exceeded — set SO status to Credit Hold, lock all fulfilment actions","Send notification to Finance Manager with customer credit details and SO amount","Finance Manager can Approve Override (releases hold) or Reject (cancels SO)","If approved override, send confirmation to the Sales Rep who created the order","Log all credit check decisions in a custom field on the SO record"] },
      { title:"Workflow States to Build", items:["State 1: Credit Check — Entry state triggered on beforeSubmit event","State 2: Approved — Pending Fulfilment — Credit passed, ready to ship","State 3: Credit Hold — Credit exceeded, awaiting Finance review","State 4: Override Approved — Finance manually approved despite credit issue","State 5: Cancelled — Finance rejected the override request"] },
      { title:"Conditions & Actions", items:["Condition: SO Total > (Customer.creditlimit minus Customer.balance) — go to Credit Hold","Action on Credit Hold: Set custbody_hold_reason, lock SO buttons, send Finance email","Action on Override Approved: Clear hold, unlock SO buttons, send Sales Rep notification","Action on Cancelled: Set SO status = Cancelled, send cancellation email to customer"] },
      { title:"Custom Fields Required", items:["custbody_credit_check_result (Select: Passed / Failed / Override) — auto-set by workflow","custbody_hold_reason (Long Text) — populated automatically on credit hold","custbody_credit_checked_date (DateTime) — timestamp when credit check ran","custbody_finance_reviewer (Select Employee) — who reviewed and actioned the override"] },
      { title:"Acceptance Criteria", items:["Test 1: Create SO within credit limit — verify auto-approval, no hold state","Test 2: Create SO exceeding credit — verify Credit Hold state and Finance email sent","Test 3: Finance approves override — verify SO released and Sales Rep notified","Test 4: Finance rejects — verify SO cancelled and customer email triggered","Test 5: Verify custbody_credit_check_result is correctly stamped on all four paths"] },
    ],
  },
  {
    id:"wf3", level:"Advanced", levelColor:"#EF4444", week:"Week 9", recordType:"Expense Report",
    title:"Employee Expense Report Full Lifecycle Workflow",
    scenario:"A consulting firm needs an automated expense report management system with different approval rules for domestic vs international expenses, auto-creation of Vendor Bills, and scheduled reminders.",
    objective:"Build a complete expense lifecycle workflow with receipt validation, role-based routing, scheduled reminders, and auto-creation of a Vendor Bill on final approval.",
    sections:[
      { title:"Business Requirements", items:["Employee submits Expense Report — auto-assigns to their Department Manager","Domestic expenses up to Rs 10,000 — Manager approval only, then direct to payment","Domestic expenses above Rs 10,000 — Manager plus Finance VP approval required","All International expenses — Manager, Finance VP, and CFO approval always required","Receipts must be attached — workflow validates attachment exists on submission","Approved reports must auto-create a Vendor Bill for payment processing","Scheduled reminder every 24 hours to approver if not actioned","Employee can recall the report before first approval (moves back to Draft)"] },
      { title:"Workflow States to Build", items:["State 1: Draft — Employee filling in expense details","State 2: Submitted — Awaiting Department Manager review","State 3: Manager Approved — Pending Finance VP (conditional on amount or type)","State 4: Finance VP Approved — Pending CFO (conditional for international only)","State 5: Fully Approved — Ready for payment, triggers Vendor Bill creation","State 6: Paid — Vendor Bill has been paid, report is closed","State 7: Rejected — Any approver can reject with mandatory written reason","State 8: Recalled — Employee pulled back before first approval action"] },
      { title:"Validation Rules", items:["On Submit: Validate that at least 1 file is attached to the record","On Submit: Validate expense date is within current or previous fiscal quarter","On Submit: Validate that all expense lines have a category selected","On Rejection: Require custbody_rejection_reason is not empty before state saves"] },
      { title:"Scheduled Actions", items:["Every 24 hrs: If state = Submitted and no approver action — send reminder email","Every 24 hrs: If state = Manager Approved and no Finance VP action — send escalation","After 72 hrs of total inaction: Auto-escalate to the skip-level approver","On last day of month: Send pending expense summary report to Finance VP"] },
      { title:"Custom Fields Required", items:["custbody_expense_type (Select: Domestic or International)","custbody_rejection_reason (Long Text)","custbody_total_claim_amount (Currency — sum of expense sublist)","custbody_approver_l1 (Employee) — Department Manager auto-populated on submit","custbody_payment_status (Select: Pending / Processing / Paid)","custbody_vendor_bill_link (Text — stores linked Vendor Bill internal ID)"] },
      { title:"Acceptance Criteria", items:["Test 1: Submit domestic Rs 8,000 report — verify only Manager approval needed","Test 2: Submit domestic Rs 15,000 report — verify Manager then Finance VP required","Test 3: Submit international report — verify all 3 approvals required in sequence","Test 4: Submit without attachment — verify workflow blocks submission with error","Test 5: Approve fully — verify Vendor Bill is auto-created and ID stored on report","Test 6: Simulate 24hr inaction — verify reminder email is sent to pending approver","Test 7: Recall a submitted report — verify it returns to Draft state correctly"] },
    ],
  },
];

const scriptProjects = [
  {
    id:"ss1", level:"Beginner", levelColor:"#10B981", week:"Week 12", scriptType:"Client Script + User Event Script",
    title:"Smart Sales Order Form — Auto-Populate & Validate",
    scenario:"The sales team wastes time manually filling delivery address, payment terms, and price level each time they create a Sales Order. Finance has also raised issues with orders being saved without a valid PO number for B2B customers.",
    objective:"Build a Client Script that auto-populates key fields when a customer is selected, and a User Event Script that validates required fields before the record is saved to NetSuite.",
    sections:[
      { title:"Client Script Requirements — pageInit and fieldChanged", items:["On pageInit: If mode = create, set default Order Date to today's date automatically","On fieldChanged (entity field): When customer is selected, auto-populate these four fields:","  Shipping Address from customer's default shipping address record","  Payment Terms from the customer record's payment terms field","  Price Level from the customer's assigned price level","  Sales Rep from the customer's assigned sales rep field","On fieldChanged (custbody_is_b2b checkbox): If checked, make PO Number field mandatory","On validateField (amount): If line item amount exceeds Rs 5,00,000 show confirmation warning"] },
      { title:"User Event Script Requirements — beforeSubmit", items:["Validate: If customer is B2B (custentity_is_b2b = true) AND custbody_po_number is empty — throw error PO Number is required for B2B orders","Validate: If SO has zero line items — throw error Cannot save an empty Sales Order","Auto-stamp: Set custbody_created_department equal to current logged-in user's department","Auto-stamp: Set custbody_fiscal_quarter derived from order date (Q1/Q2/Q3/Q4 + Year format)","Log: Write to execution log with SO number, customer name, total amount, and submitting user"] },
      { title:"Modules to Use", items:["N/record — to load customer record and read field values in the UE script","N/search — to look up the customer's sales rep if not directly on the record","N/log — for writing execution log entries in beforeSubmit","N/currentRecord — for client-side access to the current form record"] },
      { title:"Deployment Instructions", items:["Client Script: Deploy on Sales Order record, All Events, Status = Testing first","User Event Script: Deploy on Sales Order, Before Submit only, Status = Testing","Test using a real customer record in sandbox that has all fields populated","After full testing and sign-off: change both scripts to Released status"] },
      { title:"Acceptance Criteria", items:["Test 1: Create new SO, select a customer — verify all 4 fields auto-populate correctly","Test 2: Check the B2B checkbox — verify PO Number field becomes visually mandatory","Test 3: Try to save B2B order without PO Number — verify error message blocks save","Test 4: Try to save SO with no line items — verify block message appears","Test 5: Save a valid SO — verify custbody_fiscal_quarter is correctly stamped","Test 6: Open the execution log after save — verify the log entry was written correctly"] },
    ],
  },
  {
    id:"ss2", level:"Intermediate", levelColor:"#F59E0B", week:"Week 13", scriptType:"Scheduled Script + Suitelet",
    title:"Overdue Invoice Automated Email Digest",
    scenario:"The Finance team manually checks for overdue invoices every Monday and sends individual emails to sales reps. This takes 3 hours per week. They want it fully automated with an on-demand dashboard too.",
    objective:"Build a Scheduled Script that runs every Monday, finds all overdue invoices grouped by sales rep, and emails each rep their own personalised overdue invoice summary in a clean HTML table.",
    sections:[
      { title:"Scheduled Script Requirements", items:["Trigger: Every Monday at 8:00 AM IST via Scheduled Script deployment settings","Search for all Invoices where: status = Open AND due date is before today","Group all results by Sales Rep field on the invoice","For each Sales Rep, build an HTML email table with these columns:","  Invoice Number, Customer Name, Invoice Date, Due Date, Amount Due, Days Overdue","Calculate Days Overdue as the difference between today and the due date","Send one consolidated email per Sales Rep — never one email per invoice","CC Finance Manager on every email sent","If a Sales Rep has zero overdue invoices, do not send them any email at all","Write execution log summary: total overdue invoices found and total emails sent"] },
      { title:"Suitelet — On-Demand Overdue Dashboard", items:["Create a Suitelet accessible from a custom menu under Transactions > Finance","Page Title: Overdue Invoice Dashboard","Show a date filter: Show invoices overdue by more than X days (default = 0)","Display results in an HTML table grouped by Sales Rep with subtotals","Add a button: Send Email Digests Now — triggers the same email logic on demand","Show total overdue amount across all customers at the bottom of the page"] },
      { title:"Modules to Use", items:["N/search — to find and iterate through all overdue invoices efficiently","N/email — to send emails with fully formatted HTML body content","N/record — to load Sales Rep record and retrieve their email address","N/log — for execution summary logging at end of script run","N/ui/serverWidget — for Suitelet form, filter fields, results sublist, and action button","N/format — for date formatting and calculating the days overdue figure"] },
      { title:"Search Criteria to Build", items:["Record Type: Invoice (Transaction search)","Filter 1: Status = Open (use list/multiple value filter type)","Filter 2: Due Date before today — use formula or relative date filter","Columns: Internal ID, Document Number, Customer, Invoice Date, Due Date, Amount Remaining, Sales Rep","Sort order: By Sales Rep name ascending, then by Days Overdue descending"] },
      { title:"Acceptance Criteria", items:["Test 1: Create 3 test invoices with past due dates for 2 different sales reps — run script — verify 2 separate emails are sent","Test 2: Verify each email contains correct invoice rows in properly formatted HTML table","Test 3: Verify Finance Manager is CC'd on all emails without exception","Test 4: Create an invoice due today (not yet overdue) — verify it is excluded from results","Test 5: Open Suitelet URL — verify dashboard loads with working filter and results table","Test 6: Click Send Email Digests Now button from Suitelet — verify emails are triggered","Test 7: Check execution log after run — verify summary entry was written correctly"] },
    ],
  },
  {
    id:"ss3", level:"Advanced", levelColor:"#EF4444", week:"Week 14", scriptType:"Map/Reduce + User Event Script",
    title:"Bulk Customer Tier Re-classification Engine",
    scenario:"Every quarter the company reclassifies 2,000+ customers into tiers based on trailing 12-month purchase value. Doing this manually takes 2 full working days. This must be fully automated without hitting governance limits.",
    objective:"Build a Map/Reduce script that processes all customers in bulk, calculates each customer's 12-month spend, assigns the correct tier, and updates the customer record with full error handling.",
    sections:[
      { title:"Tier Classification Rules", items:["Bronze: Total 12-month purchases below Rs 1,00,000","Silver: Rs 1,00,000 to Rs 4,99,999","Gold: Rs 5,00,000 to Rs 19,99,999","Platinum: Rs 20,00,000 and above","Customers with zero transactions in 12 months — set tier to Inactive","Store the previous tier before overwriting it (required for change tracking and audit)","Send a summary report email to Finance VP after all records are processed"] },
      { title:"Map/Reduce Script Phases", items:["getInputData(): Search for all active customers and return their internal IDs as input","map(context): For each customer ID, search all Invoices in last 365 days and sum the total amount. Output the customer ID and calculated total spend.","reduce(context): Receive spend data per customer, determine the correct tier, update custentity_customer_tier and custentity_previous_tier on the customer record","summarize(context): Count total records processed and tier changes made. Email the summary report to Finance VP. Log all errors encountered."] },
      { title:"Error Handling Requirements", items:["Wrap each reduce() call in try/catch — log individual failures without stopping the entire job","In summarize(), report the count of failed records as a separate figure","If total failures exceed 10% of all records — send an alert email to the system admin","Store the last run date and processed count in a Custom Record called Script Run Log for full audit trail"] },
      { title:"Supporting User Event Script", items:["Deploy on Customer record afterSubmit event","When custentity_customer_tier changes value, auto-create a Note on the customer record","Note content: Tier changed from [previous value] to [new value] on [date] by [script or user name]","This creates a permanent, automatic audit log of every tier change on each customer"] },
      { title:"Modules to Use", items:["N/search — getInputData() customer search and per-customer invoice search in map()","N/record — to load and submit-update customer records in reduce()","N/email — for summarize() final report and admin alert emails","N/log — for logging all phases and individual record errors","N/runtime — to check remaining governance units inside map() before processing","N/task — to trigger the Map/Reduce script on demand from a Suitelet button if needed"] },
      { title:"Acceptance Criteria", items:["Test 1: Create 5 test customers with varying invoice totals — run script — verify correct tier assigned to each","Test 2: Verify a customer with zero invoices in 12 months gets the Inactive tier","Test 3: Run the script twice — verify previous tier is preserved before overwrite","Test 4: Verify a Note/Message is created on the customer record every time the tier changes","Test 5: Simulate a failed record update in reduce() — verify error is logged but remaining records continue","Test 6: Check the Script Run Log custom record — verify last run date and count were written","Test 7: Verify Finance VP receives the summary email with correct totals and tier change counts"] },
    ],
  },
];

// ─── INTERVIEW QA DATA ────────────────────────────────────────────────────────
const interviewQA = [
  {
    category: "Accounting", color: "#F59E0B",
    questions: [
      { q: "Explain the difference between a debit and a credit in NetSuite's context.", a: "In double-entry accounting, every transaction has equal debits and credits. In NetSuite, Assets and Expenses increase with debits; Liabilities, Equity, and Revenue increase with credits. For example, when you post a customer Invoice, NetSuite debits Accounts Receivable (asset increases) and credits Revenue. Understanding this is critical when troubleshooting journal entry imbalances or configuring custom GL impact on transactions." },
      { q: "What is the purpose of Accounting Periods in NetSuite and how do you close them?", a: "Accounting Periods define the fiscal calendar used for financial reporting. They prevent users from posting transactions to closed periods, ensuring data integrity. To close a period: navigate to Setup > Accounting > Manage Accounting Periods, select the period, and change its status to Closed. You can do a soft close (restricts most users) or a hard close (restricts all users including admins). Always run the Pre-Close Checklist first to identify unposted transactions." },
      { q: "What is multi-book accounting in NetSuite and when would a client need it?", a: "Multi-book accounting allows a company to maintain multiple sets of books for the same transactions — for example, one following IFRS and another following US GAAP, or one in INR and another in USD. A client would need this if they operate in multiple countries with different statutory reporting requirements, or if their parent company requires reporting in a different accounting standard than local law mandates. Each book can have its own chart of accounts, currency, and accounting periods." },
      { q: "How does Revenue Recognition work in NetSuite?", a: "NetSuite's Revenue Recognition (Rev Rec) module automates the deferral and recognition of revenue over time. When a Sales Order or Invoice is created, if a revenue recognition rule is assigned to the item, NetSuite creates a Revenue Arrangement. The revenue is deferred to a Deferred Revenue liability account and then recognised into the Revenue account on a schedule — either straight-line over time, percent complete, or event-based. This is critical for SaaS companies and professional services firms that cannot recognise revenue upfront." },
      { q: "What is the difference between a Journal Entry and a Revenue Recognition Journal Entry in NetSuite?", a: "A standard Journal Entry (JE) is a manual entry you create to record accounting adjustments, accruals, or corrections. A Revenue Recognition Journal Entry is system-generated by NetSuite's Rev Rec module and follows the revenue schedule automatically — you cannot manually alter the amounts. Both appear in the GL, but Rev Rec JEs are linked to Revenue Arrangements and cannot be edited directly. If a client sees unexpected GL entries, check Revenue Arrangements first before looking at manual JEs." },
    ],
  },
  {
    category: "Workflows", color: "#10B981",
    questions: [
      { q: "What is the difference between a Workflow Trigger and a Workflow Condition?", a: "A Trigger determines when the workflow runs — for example, 'Before Record Submit', 'After Record Save', or on a schedule. A Condition is a filter applied within the workflow that determines whether a specific state, action, or transition should execute. For example, you can trigger a workflow on every Sales Order save, but use conditions to only send an approval email when the order amount exceeds Rs 1,00,000. Mixing up triggers and conditions is the most common mistake beginners make." },
      { q: "When would you use a Scheduled Workflow versus a Scheduled Script?", a: "Use a Scheduled Workflow when the automation is configuration-based and does not require complex logic — for example, sending a reminder email every 24 hours if a record is in a certain state, or updating a field on a recurring basis. Use a Scheduled Script when you need complex logic such as looping through thousands of records, calling external APIs, performing multi-step calculations, or bulk updating records — things a workflow cannot handle efficiently. As a functional consultant, knowing this boundary is key to scoping client requirements correctly." },
      { q: "How do you prevent users from editing a record once it reaches a certain approval state?", a: "Use the Lock Record action within a workflow state. Navigate to the workflow state where you want to lock the record, add a Set State action, and enable the 'Lock Record' option. This prevents all field edits. If you want to selectively prevent editing of specific fields only, use the 'Set Field Display Type' action to set those fields as Disabled or Hidden. For buttons, use 'Remove Button' action to prevent users from taking certain actions from that state." },
      { q: "Explain how you would build a workflow that routes differently based on the record's creator's role.", a: "Use the condition editor on the transition to check the Current User's role using the formula field. In the workflow transition condition, set the field to 'Current User: Role' and compare it to the required role using the 'is' operator. You can also use a workflow field to stamp the creator's role on the record at submission time using a 'Set Field Value' action in the initial state, and then use that stamped field for routing conditions throughout the workflow. This is more reliable than checking current user at later stages." },
      { q: "What happens if a workflow has a syntax error or throws an error at runtime? How do you debug it?", a: "If a workflow throws an error, the record save may be blocked (for synchronous workflows) or the workflow may stop silently (for asynchronous). To debug: first check the System Notes on the record — workflow events are logged there. Then go to Setup > Workflow > Workflow History (or check the specific record's Workflow tab) to see the execution path and any error messages. For scheduled workflows, check the Workflow Execution Log under Setup. Always test workflows in a sandbox environment with a test user before deploying to production." },
      { q: "How would you handle a scenario where a client wants approval notifications but the approver changes depending on the subsidiary?", a: "This is a dynamic routing scenario. The cleanest approach is to store the approver on the record itself using a custom field (e.g., custbody_approver), and populate it using a 'Set Field Value' action at submission based on a condition that checks the subsidiary. Then in the workflow email action, use the dynamic field reference to send to whoever is stored in that field rather than hardcoding a specific employee. This makes the workflow reusable across all subsidiaries without duplication." },
      { q: "Can two workflows run simultaneously on the same record? How do you manage conflicts?", a: "Yes, multiple workflows can be active on the same record simultaneously. NetSuite runs them in order of their internal workflow ID. Conflicts typically arise when two workflows try to set the same field to different values, or when one workflow locks the record that another is trying to update. Best practice: design workflows to be independent with non-overlapping field ownership, document all workflows for a given record type, and use workflow naming conventions that indicate their purpose and scope. In complex implementations, consolidate into fewer workflows to reduce conflict risk." },
    ],
  },
  {
    category: "SuiteScript", color: "#6366F1",
    questions: [
      { q: "What are the 6 SuiteScript 2.x script types and when do you use each?", a: "Client Script runs in the browser on forms — use for real-time field validation and auto-population. User Event Script runs on the server when a record is saved — use for data validation and stamping values on save. Scheduled Script runs on a timer — use for batch jobs and automated processing. Map/Reduce Script handles large data volumes in parallel — use when processing thousands of records without hitting governance limits. Suitelet creates custom web pages inside NetSuite — use for dashboards and custom tools. RESTlet exposes endpoints for external integration — use when third-party systems need to push or pull data from NetSuite." },
      { q: "What is a governance unit and why does it matter in SuiteScript?", a: "NetSuite enforces execution limits called governance units to prevent any single script from consuming too many server resources. Each script type has a unit budget — for example, Scheduled Scripts get 10,000 units per execution. Common operations cost units: a record load costs 10 units, a search result retrieval costs 10 units. If your script exceeds the budget, it throws a GOVERNANCE_LIMIT_EXCEEDED error and stops. To handle this in Scheduled Scripts, use the getRemainingUsage() method from N/runtime to check remaining units inside your loop and reschedule the script to continue from where it left off." },
      { q: "Explain the difference between record.save() and record.submitFields() in N/record.", a: "record.load() followed by record.save() loads the entire record into memory, allows you to modify multiple fields, and then saves the full record object — this is resource-intensive but necessary for complex changes. record.submitFields() is a lightweight alternative that updates only specific fields on a record without loading it fully — it costs fewer governance units and is much faster. Use submitFields() when you only need to update one or two fields on a known record ID. Use load() + save() when you need to read other field values, add sublist lines, or make interdependent changes." },
      { q: "What is the N/search module and what are the two main ways to run a search?", a: "N/search is used to query NetSuite data programmatically. The two main approaches are: search.create() which builds a new search inline in your script with custom filters and columns, and search.load() which loads an existing Saved Search by its script ID and runs it. search.create() gives you full control at runtime while search.load() is cleaner and allows non-developers to modify the search criteria without touching the script. For large result sets, always use search.run().each() with a callback function rather than search.run().getRange() to avoid hitting the 4,000-result limit." },
      { q: "How would you auto-populate a field on a Sales Order when the customer is selected?", a: "Use a Client Script with a fieldChanged entry point. Define the function to trigger when the fieldId equals 'entity' (the customer field). Inside the function, use currentRecord.getValue() to get the selected customer's internal ID, then load the Customer record using N/record (or more efficiently use N/search to look up just the fields you need). Read the required values and use currentRecord.setValue() to populate the target fields on the form. Always wrap in a try/catch and use N/log to debug during development. Deploy the script to the Sales Order record type." },
      { q: "What is a Map/Reduce script and when should you use it over a Scheduled Script?", a: "A Map/Reduce script processes large datasets in parallel using three defined stages: getInputData (collects all records to process), map (processes each record individually — runs in parallel across multiple queues), and reduce (aggregates results per key). Use Map/Reduce when processing more than a few hundred records, as it handles governance limits automatically by splitting work across multiple execution contexts. A Scheduled Script runs sequentially in a single context — fine for small jobs under a few hundred records, but it will hit governance limits on large datasets. For bulk customer updates, mass data migrations, or complex batch jobs, always choose Map/Reduce." },
      { q: "A client reports that a User Event Script is causing their record save to be very slow. How do you troubleshoot?", a: "Start by checking the script's execution log in Setup > Scripts > Scripts, filter for that script, and review the log entries to find where time is being spent. Common causes of slow saves: unnecessary record.load() calls inside a loop, running searches with too many results, making synchronous HTTP calls to external services in beforeSubmit, or loading records in afterSubmit that trigger cascading saves. Fix strategies: replace record.load() with record.submitFields() where possible, replace search.run().getRange() with search.run().each(), move non-blocking operations to an afterSubmit trigger or even to a Scheduled Script, and use N/log timestamps to isolate the exact bottleneck." },
    ],
  },
  {
    category: "Functional & Modules", color: "#EF4444",
    questions: [
      { q: "Walk me through a full Procure to Pay cycle in NetSuite.", a: "The P2P cycle starts with a Purchase Requisition (optional) which is approved and converted to a Purchase Order. The PO is sent to the vendor. When goods arrive, an Item Receipt is created against the PO, updating inventory. The vendor sends an invoice which is entered as a Vendor Bill matched to the PO and receipt (3-way match). After approval, the Vendor Bill is paid using Bill Payment, which reduces the bank balance and clears the AP balance. Each step creates GL entries: PO has no GL impact, Item Receipt debits Inventory and credits Accrued Purchases, Vendor Bill replaces Accrued Purchases with AP, and Payment clears AP." },
      { q: "What is SuiteTax and how does it differ from the legacy Tax Engine?", a: "SuiteTax is NetSuite's modern tax framework that replaces the older Tax Groups and Tax Codes system. It uses Tax Types, Tax Groups, Nexuses, and Tax Control Accounts to calculate taxes. The key differences: SuiteTax supports more complex tax scenarios like GST India with multiple components (CGST, SGST, IGST), provides more granular control over tax liability accounts per nexus, and integrates with external tax providers like Avalara. For India GST implementation, SuiteTax is mandatory. You configure it under Setup > Tax > SuiteTax, define nexuses for each state, set up tax schedules, and assign them to items and customers." },
      { q: "Explain how Saved Searches differ from Report Builder reports in NetSuite.", a: "Saved Searches are real-time queries that run against live data and return results as a list, summary, or matrix. They support formula fields, complex filters, and can be used as data sources for dashboards, workflows, and scripts. Report Builder creates formatted financial and operational reports with subtotals, grouping, and visual layouts — they are slower as they process more data but offer better presentation. Use Saved Searches for operational data, dashboards, and automation. Use Report Builder for period-end financial reports that need headers, footers, and formatted output for management." },
      { q: "A client is live on NetSuite and reporting that their inventory valuation is incorrect. What is your diagnostic approach?", a: "First, identify which items are affected and what valuation method they use — FIFO, LIFO, Average Cost, or Standard Cost. Run the Inventory Valuation Summary report and compare it against the General Ledger balance for the Inventory asset account. If there is a discrepancy, run the Inventory Valuation Detail report to find specific transactions causing the variance. Common causes: items with wrong costing method set up, Cost of Goods Sold not posting correctly (check item's COGS account), receiving items at wrong costs, or adjustments made directly to the GL without creating inventory adjustments. Always make corrections through Inventory Adjustments, not journal entries." },
      { q: "What is the Fixed Asset Management module in NetSuite and what are the key configurations?", a: "The FAM module manages the full lifecycle of fixed assets: acquisition, depreciation, disposal, and revaluation. Key configurations: Asset Types (define the asset category and default depreciation method), Depreciation Methods (Straight Line, Double Declining Balance, Sum of Years Digits, etc.), Asset Accounts (the GL accounts for asset cost, accumulated depreciation, and gain/loss on disposal), and Depreciation Books (which can be aligned to different accounting standards). In practice, you create an Asset record either manually or auto-created from a Vendor Bill line item. The system then generates depreciation journal entries automatically each period based on the depreciation schedule." },
    ],
  },
  {
    category: "Behavioural", color: "#8B5CF6",
    questions: [
      { q: "Tell me about a time you handled a difficult client during an implementation.", a: "Use the STAR format. Situation: describe the project context and what made the client difficult — for example, changing requirements late in the project or resistance to the new system. Task: your responsibility in managing the relationship and keeping the project on track. Action: explain specific steps you took — scheduling dedicated calls, documenting decisions formally, escalating to the project manager when needed, or creating custom training materials to address their concerns. Result: quantify the outcome — project delivered on time, client satisfaction improved, or scope was formally managed. Emphasise that you stayed calm, documented everything, and kept communication transparent." },
      { q: "Describe how you approach explaining a complex NetSuite concept to a non-technical client.", a: "The key is to understand your audience first — what is their business role and what decisions do they need to make? Then translate the technical concept into a business outcome they care about. For example, instead of explaining that a User Event Script runs in beforeSubmit, say: this means the system checks the rule automatically every time someone tries to save the record, before the save completes — so no one can accidentally bypass the validation. Use analogies from their own industry, draw simple flowcharts, and always confirm understanding by asking them to repeat the concept back to you in their own words." },
      { q: "Give an example of how you managed scope creep during a support project.", a: "Use a specific example from one of your 4 support projects. Describe a situation where a client started requesting features outside the original support scope — for example, asking for a new custom report or workflow as part of a bug-fix ticket. Explain how you acknowledged the request positively, documented it separately, explained the impact on timeline and cost, and raised it as a change request through the formal process. The key message interviewers want to hear: you are client-focused but commercially aware, you protect both the client's interests and your firm's profitability." },
      { q: "Why do you want to move from 9 LPA to 14 LPA — how do you justify that jump?", a: "Be direct and evidence-based. Say: I have 4 end-to-end implementations behind me, I handle client communication and stakeholder management independently, I have deep expertise across P2P, O2C, SuiteTax India GST, Fixed Assets, and Project Management modules. I have now added Advanced Workflow, SuiteScript fundamentals, and core accounting knowledge — which makes me a technical-functional hybrid, not just a configuration consultant. I have also completed my SuiteFoundation certification. The market rate for this profile at mid-size consulting firms and product companies is Rs 13–16 LPA. I am targeting the midpoint." },
      { q: "Where do you see yourself in 2 years after this role?", a: "Be ambitious but realistic. A strong answer: In 2 years I want to be leading my own implementation streams — ideally as a Senior NetSuite Consultant or Solution Architect. I plan to complete the ERP Consultant certification and then work toward the SuiteCloud Developer certification to deepen my technical-functional profile. I am also interested in pre-sales and solution design as I grow, because I enjoy the client-facing and problem-solving aspects of the role. I want to be the person clients trust not just for configuration but for strategic NetSuite advice." },
    ],
  },
];

// ─── RESOURCES DATA ───────────────────────────────────────────────────────────
const resourcePhases = [
  {
    phase: "Phase 1 — Accounting", icon: "📊", color: "#F59E0B",
    categories: [
      {
        name: "Free Courses",
        resources: [
          { title: "Intro to Financial Accounting — Coursera (UPenn)", type: "Course", url: "https://www.coursera.org/learn/wharton-accounting", note: "Free audit available. Covers debits, credits, P&L, Balance Sheet — exactly what you need for Weeks 1–2." },
          { title: "Accounting Basics — Khan Academy", type: "Video", url: "https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-stateme", note: "Short videos, completely free. Great for building intuition around journal entries and financial statements." },
        ],
      },
      {
        name: "NetSuite Official",
        resources: [
          { title: "NetSuite LCS — Accounting Fundamentals", type: "LCS Course", url: "https://learningcloud.netsuite.com", note: "Login with your NS credentials. Search 'Accounting Fundamentals'. Covers NS-specific accounting configuration." },
          { title: "SuiteAnswers — Accounting Periods", type: "Documentation", url: "https://suiteanswers.custhelp.com", note: "Search 'Accounting Periods' and 'Period Close Checklist'. Read the official NetSuite documentation on period management." },
          { title: "Help Center — Multi-Book Accounting", type: "Documentation", url: "https://system.netsuite.com/app/help/helpcenter.nl", note: "Search 'Multi-Book Accounting Overview' in the Help Center for subsidiary and multi-book configuration." },
        ],
      },
    ],
  },
  {
    phase: "Phase 2 — Advanced Workflows", icon: "⚙️", color: "#10B981",
    categories: [
      {
        name: "NetSuite Official",
        resources: [
          { title: "SuiteAnswers — SuiteFlow User Guide", type: "Documentation", url: "https://suiteanswers.custhelp.com", note: "Search 'SuiteFlow User Guide'. The definitive reference for workflow states, transitions, actions, and conditions." },
          { title: "NetSuite LCS — Advanced Workflow Training", type: "LCS Course", url: "https://learningcloud.netsuite.com", note: "Search 'Advanced Workflow'. Covers complex scenarios, scheduled workflows, and sublist actions." },
          { title: "Help Center — Workflow Actions Reference", type: "Documentation", url: "https://system.netsuite.com/app/help/helpcenter.nl", note: "Search 'Workflow Action Reference' for a complete list of every available action and its parameters." },
        ],
      },
      {
        name: "Community & Practice",
        resources: [
          { title: "NetSuite Community — Workflow Forum", type: "Community", url: "https://community.oracle.com/netsuite", note: "Search for workflow questions. Many real-world problems and solutions posted by practitioners." },
          { title: "YouTube — NetSuite Workflow Tutorials", type: "Video", url: "https://www.youtube.com/results?search_query=netsuite+workflow+tutorial", note: "Search 'NetSuite workflow approval' on YouTube. Several tutorial channels cover practical examples." },
        ],
      },
    ],
  },
  {
    phase: "Phase 3 — SuiteScript", icon: "💻", color: "#6366F1",
    categories: [
      {
        name: "JavaScript Foundation",
        resources: [
          { title: "freeCodeCamp — JavaScript Algorithms & Data Structures", type: "Course", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures", note: "Completely free. Do the first 5 sections (Basic JS, ES6, Regular Expressions, Debugging, Data Structures) — this is enough to start SuiteScript." },
          { title: "JavaScript.info — The Modern JavaScript Tutorial", type: "Reference", url: "https://javascript.info", note: "Best free JS reference on the internet. Use it for looking up specific concepts like promises, async/await, and arrow functions as you encounter them." },
        ],
      },
      {
        name: "NetSuite Official",
        resources: [
          { title: "SuiteScript 2.x API Reference", type: "Documentation", url: "https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4220266836.html", note: "The official SuiteScript 2.x documentation. Bookmark this — you will use it constantly. Start with N/record and N/search modules." },
          { title: "NetSuite Developer Resources Portal", type: "Portal", url: "https://developers.netsuite.com", note: "Contains tutorials, API docs, and sample code. Use the SuiteScript 2.x Getting Started guide here." },
          { title: "SuiteAnswers — SuiteScript Best Practices", type: "Documentation", url: "https://suiteanswers.custhelp.com", note: "Search 'SuiteScript Best Practices'. Important for understanding governance, error handling, and deployment." },
          { title: "NetSuite LCS — SuiteScript Fundamentals", type: "LCS Course", url: "https://learningcloud.netsuite.com", note: "Search 'SuiteScript 2.0 Fundamentals'. The official guided course — highly recommended before writing your first script." },
        ],
      },
      {
        name: "Community",
        resources: [
          { title: "GitHub — NetSuite SuiteScript Samples", type: "Code Samples", url: "https://github.com/search?q=suitescript+2.0", note: "Search GitHub for 'SuiteScript 2.0' to find real-world example scripts. Excellent for learning patterns." },
          { title: "NetSuite Professionals Slack Community", type: "Community", url: "https://netsuiteprofessionals.com", note: "Active community of NetSuite developers and consultants. Great for asking SuiteScript questions." },
        ],
      },
    ],
  },
  {
    phase: "Phase 4 — Certification", icon: "🏅", color: "#EF4444",
    categories: [
      {
        name: "Official Exam Resources",
        resources: [
          { title: "Oracle University — NetSuite Certification Page", type: "Official", url: "https://education.oracle.com/netsuite", note: "Register for exams here. Review the SuiteFoundation and ERP Consultant exam study guides — they list every topic that will be tested." },
          { title: "NetSuite LCS — Certification Prep Courses", type: "LCS Course", url: "https://learningcloud.netsuite.com", note: "Search 'SuiteFoundation Certification Preparation'. These are the official pre-exam courses — take them before booking your exam." },
          { title: "SuiteFoundation Exam Study Guide (PDF)", type: "Study Guide", url: "https://education.oracle.com/netsuite", note: "Download from Oracle University. Read it end-to-end and make flashcards for every topic listed. This document is your syllabus." },
        ],
      },
      {
        name: "Practice & Community",
        resources: [
          { title: "NetSuite Community — Certification Forum", type: "Community", url: "https://community.oracle.com/netsuite", note: "Search 'SuiteFoundation exam tips'. Many practitioners share their experience and which areas to focus on." },
          { title: "YouTube — NetSuite Certification Tips", type: "Video", url: "https://www.youtube.com/results?search_query=netsuite+suitefoundation+certification", note: "Search 'NetSuite SuiteFoundation exam' on YouTube for tips from people who have recently passed." },
        ],
      },
    ],
  },
  {
    phase: "Phase 5 — Job Hunt", icon: "🚀", color: "#8B5CF6",
    categories: [
      {
        name: "Job Platforms",
        resources: [
          { title: "Naukri.com — NetSuite Functional Consultant", type: "Job Board", url: "https://www.naukri.com/netsuite-functional-consultant-jobs", note: "Best platform for India. Set up job alerts for 'NetSuite Functional Consultant' and 'NetSuite ERP Consultant'. Filter by 12–18 LPA." },
          { title: "LinkedIn Jobs — NetSuite India", type: "Job Board", url: "https://www.linkedin.com/jobs/search/?keywords=netsuite+functional+consultant&location=India", note: "Apply directly and also connect with recruiters. Many NetSuite partner firms post only on LinkedIn." },
          { title: "Oracle NetSuite Partner Locator", type: "Directory", url: "https://www.netsuite.com/portal/partners/search.shtml", note: "Find all official NetSuite partner firms in India. Target these companies directly — they always need experienced functional consultants." },
        ],
      },
      {
        name: "Community & Networking",
        resources: [
          { title: "LinkedIn — NetSuite Professionals India Group", type: "Community", url: "https://www.linkedin.com/search/results/groups/?keywords=netsuite+india", note: "Join NetSuite-focused LinkedIn groups and engage with posts. Many opportunities come through connections, not job boards." },
          { title: "NetSuite Professionals Community", type: "Community", url: "https://netsuiteprofessionals.com", note: "Global community of NetSuite practitioners. Networking here can lead to referrals and direct opportunities." },
        ],
      },
    ],
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const totalWeeks = 22;

export default function StudyPlan() {
  const [activeTab, setActiveTab] = useState("plan");
  const [activePhase, setActivePhase] = useState(0);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [completedWeeks, setCompletedWeeks] = useState(new Set());
  const [projectType, setProjectType] = useState("workflow");
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedSection, setExpandedSection] = useState({});
  const [qaCategory, setQaCategory] = useState("Accounting");
  const [expandedQ, setExpandedQ] = useState(null);
  const [resourcePhase, setResourcePhase] = useState(0);

  const toggleWeek = (n) => setExpandedWeek(expandedWeek === n ? null : n);
  const toggleComplete = (e, n) => {
    e.stopPropagation();
    setCompletedWeeks((p) => { const s = new Set(p); s.has(n) ? s.delete(n) : s.add(n); return s; });
  };
  const toggleSection = (projId, secTitle) => {
    const key = `${projId}-${secTitle}`;
    setExpandedSection((p) => ({ ...p, [key]: !p[key] }));
  };
  const isSectionOpen = (projId, secTitle) => expandedSection[`${projId}-${secTitle}`] !== false;

  const phase = phases[activePhase];
  const completedCount = completedWeeks.size;
  const progressPct = Math.round((completedCount / totalWeeks) * 100);
  const projects = projectType === "workflow" ? workflowProjects : scriptProjects;
  const accentColor = projectType === "workflow" ? "#10B981" : "#6366F1";
  const currentQA = interviewQA.find(c => c.category === qaCategory);
  const currentResources = resourcePhases[resourcePhase];

  const TABS = [
    { key: "plan", label: "📅  Study Plan" },
    { key: "projects", label: "🛠  Projects" },
    { key: "interview", label: "📝  Interview Prep" },
    { key: "resources", label: "🔖  Resources" },
  ];

  // ── Shared styles ──
  const cardBase = { background: "#13111E", borderRadius: 12, overflow: "hidden", transition: "border 0.2s" };
  const tagStyle = (color) => ({ fontSize: 10, fontFamily: "monospace", padding: "2px 9px", borderRadius: 20, border: `1px solid ${color}55`, color, background: `${color}15` });

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#0D0D14", minHeight: "100vh", color: "#E8E6F0" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "linear-gradient(135deg,#0D0D14 0%,#1A1528 100%)", borderBottom: "1px solid #2A2540", padding: "26px 24px 0" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, paddingBottom: 18 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#6B63A8", textTransform: "uppercase", marginBottom: 7, fontFamily: "monospace" }}>NetSuite Career Accelerator · 2026</div>
              <h1 style={{ margin: 0, fontSize: 25, fontWeight: 700, color: "#F0EEF8", letterSpacing: "-0.5px" }}>22-Week Study Plan</h1>
              <div style={{ marginTop: 5, color: "#9B94C8", fontSize: 13 }}>Mar 3 → Jul 31, 2026 · Target: <span style={{ color: "#F59E0B", fontWeight: 600 }}>₹14 LPA</span></div>
            </div>
            <div style={{ background: "#1A1528", border: "1px solid #2A2540", borderRadius: 12, padding: "11px 17px", textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#F0EEF8" }}>{progressPct}%</div>
              <div style={{ fontSize: 10, color: "#6B63A8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Complete</div>
              <div style={{ fontSize: 11, color: "#9B94C8", marginTop: 1 }}>{completedCount}/{totalWeeks} weeks</div>
            </div>
          </div>
          <div style={{ background: "#1A1528", borderRadius: 4, height: 4, overflow: "hidden", marginBottom: 18 }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg,#6366F1,#F59E0B)", borderRadius: 4, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                padding: "9px 18px", border: "none", background: "transparent", cursor: "pointer",
                fontFamily: "monospace", fontSize: 12, letterSpacing: "0.04em",
                color: activeTab === t.key ? "#E8E6F0" : "#5A5480",
                borderBottom: activeTab === t.key ? "2px solid #6366F1" : "2px solid transparent",
                transition: "all 0.2s", marginBottom: -1, whiteSpace: "nowrap",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STUDY PLAN TAB ══ */}
      {activeTab === "plan" && (
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "22px 24px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            {phases.map((p, i) => (
              <button key={p.id} onClick={() => setActivePhase(i)} style={{ padding: "5px 13px", borderRadius: 20, border: activePhase === i ? `1px solid ${p.color}` : "1px solid #2A2540", background: activePhase === i ? `${p.color}22` : "transparent", color: activePhase === i ? p.color : "#6B63A8", fontSize: 12, cursor: "pointer", fontFamily: "monospace", transition: "all 0.2s", whiteSpace: "nowrap" }}>{p.icon} Phase {p.id}</button>
            ))}
          </div>
          <div style={{ background: "#1A1528", border: `1px solid ${phase.color}44`, borderRadius: 14, padding: "16px 20px", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 7 }}>
              <span style={{ fontSize: 20 }}>{phase.icon}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: 17, color: phase.color, fontWeight: 700 }}>{phase.title}</h2>
                <div style={{ fontSize: 11, color: "#6B63A8", fontFamily: "monospace", marginTop: 2 }}>{phase.duration}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#C4BFDE", lineHeight: 1.6, borderLeft: `3px solid ${phase.color}`, paddingLeft: 12 }}>
              <strong style={{ color: "#E8E6F0" }}>Goal:</strong> {phase.goal}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {phase.weeks.map((week) => {
              const isExp = expandedWeek === week.num, isDone = completedWeeks.has(week.num);
              return (
                <div key={week.num} style={{ ...cardBase, background: isDone ? "#0F1F14" : "#13111E", border: isDone ? "1px solid #10B98144" : isExp ? `1px solid ${phase.color}55` : "1px solid #2A2540", cursor: "pointer" }} onClick={() => toggleWeek(week.num)}>
                  <div style={{ padding: "13px 17px", display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={(e) => toggleComplete(e, week.num)} style={{ width: 23, height: 23, borderRadius: "50%", border: isDone ? "none" : "2px solid #3A3560", background: isDone ? "#10B981" : "transparent", color: "#fff", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>{isDone ? "✓" : ""}</button>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "monospace", fontSize: 10, color: phase.color, background: `${phase.color}18`, padding: "1px 7px", borderRadius: 4 }}>Week {week.num}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: isDone ? "#6B9E7A" : "#E8E6F0" }}>{week.title}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#5A5480", marginTop: 2, fontFamily: "monospace" }}>{week.dates} · ~{week.hours} hrs</div>
                    </div>
                    <span style={{ color: "#3A3560", fontSize: 11, transform: isExp ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                  </div>
                  {isExp && (
                    <div style={{ padding: "0 17px 15px", borderTop: "1px solid #2A2540" }}>
                      <div style={{ paddingTop: 13 }}>
                        <div style={{ fontSize: 10, color: "#5A5480", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 9, fontFamily: "monospace" }}>Tasks</div>
                        {week.tasks.map((t, i) => (
                          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                            <span style={{ color: phase.color, flexShrink: 0, fontSize: 10, marginTop: 3 }}>→</span>
                            <span style={{ fontSize: 13, color: "#C4BFDE", lineHeight: 1.5 }}>{t}</span>
                          </div>
                        ))}
                        {week.milestone && (
                          <div style={{ marginTop: 13, background: `${phase.color}14`, border: `1px solid ${phase.color}33`, borderRadius: 8, padding: "9px 13px", fontSize: 12, color: phase.accent, lineHeight: 1.5 }}>
                            <span style={{ fontWeight: 700, color: phase.color }}>Milestone: </span>{week.milestone}
                          </div>
                        )}
                        <div style={{ marginTop: 11, display: "flex", justifyContent: "flex-end" }}>
                          <button onClick={(e) => toggleComplete(e, week.num)} style={{ padding: "5px 15px", borderRadius: 6, cursor: "pointer", fontSize: 11, border: isDone ? "1px solid #10B98155" : `1px solid ${phase.color}55`, background: isDone ? "#10B98122" : `${phase.color}18`, color: isDone ? "#10B981" : phase.color, fontFamily: "monospace" }}>{isDone ? "✓ Marked Complete" : "Mark as Complete"}</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 22, background: "#1A1528", border: "1px solid #2A2540", borderRadius: 12, padding: "15px 18px" }}>
            <div style={{ fontSize: 10, color: "#5A5480", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 11 }}>Weekly Hour Commitment</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 9 }}>
              {[["Weekdays (3h×5)","15 hrs"],["Weekends (6h×2)","12 hrs"],["Total / Week","~27 hrs"],["Total 22 Weeks","~594 hrs"]].map(([l,v]) => (
                <div key={l} style={{ background: "#13111E", borderRadius: 8, padding: "9px 12px" }}>
                  <div style={{ fontSize: 10, color: "#5A5480", fontFamily: "monospace" }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#E8E6F0", marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 11, background: "#110D1E", border: "1px solid #2A2540", borderRadius: 12, padding: "15px 18px" }}>
            <div style={{ fontSize: 10, color: "#5A5480", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 11 }}>🔑 Key Rules for Success</div>
            {["Always practice in a sandbox — theory without hands-on does not stick in NetSuite","Start applying from Week 19 — never wait until you feel 100% ready","Your 4 E2E implementation stories are your biggest interview asset — refine them","If you fall behind, invoke the +1 hr/day rule rather than letting weeks slip","Certifications before interviews — even one cert changes the salary conversation"].map((tip,i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                <span style={{ color: "#F59E0B", flexShrink: 0, marginTop: 2, fontSize: 10 }}>◆</span>
                <span style={{ fontSize: 12, color: "#A89EC8", lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ PROJECTS TAB ══ */}
      {activeTab === "projects" && (
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "22px 24px" }}>
          <div style={{ background: "#1A1528", border: "1px solid #2A2540", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "#6B63A8", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 5 }}>Practice Projects</div>
            <p style={{ margin: 0, fontSize: 13, color: "#C4BFDE", lineHeight: 1.7 }}>Each project is a <strong style={{ color: "#E8E6F0" }}>full requirement document</strong> written like a real client brief. Build each one in your sandbox during the corresponding study week. Document your solutions as portfolio pieces for interviews.</p>
          </div>
          <div style={{ display: "flex", gap: 9, marginBottom: 20 }}>
            {[{key:"workflow",label:"⚙️  Workflow Projects",color:"#10B981"},{key:"script",label:"💻  SuiteScript Projects",color:"#6366F1"}].map(t => (
              <button key={t.key} onClick={() => { setProjectType(t.key); setExpandedProject(null); setExpandedSection({}); }} style={{ padding: "8px 18px", borderRadius: 24, border: projectType === t.key ? `1px solid ${t.color}` : "1px solid #2A2540", background: projectType === t.key ? `${t.color}22` : "transparent", color: projectType === t.key ? t.color : "#6B63A8", fontSize: 12, cursor: "pointer", fontFamily: "monospace", transition: "all 0.2s" }}>{t.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {projects.map((proj) => {
              const isOpen = expandedProject === proj.id;
              return (
                <div key={proj.id} style={{ ...cardBase, border: isOpen ? `1px solid ${accentColor}55` : "1px solid #2A2540" }}>
                  <div style={{ padding: "16px 20px", cursor: "pointer", display: "flex", gap: 13, alignItems: "flex-start" }} onClick={() => setExpandedProject(isOpen ? null : proj.id)}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
                        <span style={tagStyle(proj.levelColor)}>{proj.level}</span>
                        <span style={tagStyle("#6B63A8")}>{proj.week}</span>
                        {proj.scriptType && <span style={tagStyle(accentColor)}>{proj.scriptType}</span>}
                        {proj.recordType && <span style={tagStyle("#5A5480")}>{proj.recordType}</span>}
                      </div>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#F0EEF8", lineHeight: 1.3 }}>{proj.title}</h3>
                      <p style={{ margin: "7px 0 0", fontSize: 12.5, color: "#7B72A8", lineHeight: 1.6 }}>{proj.scenario}</p>
                    </div>
                    <span style={{ color: "#3A3560", fontSize: 12, flexShrink: 0, marginTop: 3, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop: "1px solid #2A2540" }}>
                      <div style={{ background: `${accentColor}12`, borderBottom: "1px solid #2A2540", padding: "11px 20px", display: "flex", gap: 9, alignItems: "flex-start" }}>
                        <span style={{ color: accentColor, flexShrink: 0, fontSize: 13 }}>🎯</span>
                        <div>
                          <div style={{ fontSize: 10, color: accentColor, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Objective</div>
                          <div style={{ fontSize: 12.5, color: "#C4BFDE", lineHeight: 1.6 }}>{proj.objective}</div>
                        </div>
                      </div>
                      <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 7 }}>
                        {proj.sections.map((sec) => {
                          const secOpen = isSectionOpen(proj.id, sec.title);
                          return (
                            <div key={sec.title} style={{ background: "#0D0D14", border: "1px solid #1E1C30", borderRadius: 9, overflow: "hidden" }}>
                              <div style={{ padding: "10px 15px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => toggleSection(proj.id, sec.title)}>
                                <div style={{ fontSize: 10, fontFamily: "monospace", color: accentColor, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>{sec.title}</div>
                                <span style={{ color: "#3A3560", fontSize: 10, transform: secOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                              </div>
                              {secOpen && (
                                <div style={{ padding: "0 15px 13px", borderTop: "1px solid #1E1C30" }}>
                                  {sec.items.map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: 8, marginTop: 7, alignItems: "flex-start" }}>
                                      <span style={{ color: accentColor, flexShrink: 0, fontSize: 9, marginTop: 4 }}>▸</span>
                                      <span style={{ fontSize: 12, color: item.startsWith("  ") ? "#6B63A8" : "#B8B2D0", lineHeight: 1.55, fontFamily: item.startsWith("  ") ? "monospace" : "inherit" }}>{item.trim()}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ margin: "0 20px 16px", background: "#0D0D14", border: `1px dashed ${accentColor}33`, borderRadius: 8, padding: "9px 13px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: "#F59E0B", flexShrink: 0 }}>💡</span>
                        <span style={{ fontSize: 11.5, color: "#7B72A8", lineHeight: 1.55 }}>Build this in your sandbox and document it like a real client deliverable — screenshots + a write-up of what each component does. This becomes a portfolio piece for interviews.</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 22, background: "#1A1528", border: "1px solid #2A2540", borderRadius: 12, padding: "15px 18px" }}>
            <div style={{ fontSize: 10, color: "#5A5480", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 12 }}>📦 What You Will Have Built by Jul 31</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 9 }}>
              {[["Workflow Projects","3 complete","#10B981"],["SuiteScript Projects","3 complete","#6366F1"],["Script Types Covered","5 of 6","#6366F1"],["Portfolio Pieces","6 documented","#F59E0B"]].map(([l,v,c]) => (
                <div key={l} style={{ background: "#13111E", borderRadius: 8, padding: "9px 13px" }}>
                  <div style={{ fontSize: 10, color: "#5A5480", fontFamily: "monospace" }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: c, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ INTERVIEW PREP TAB ══ */}
      {activeTab === "interview" && (
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "22px 24px" }}>
          <div style={{ background: "#1A1528", border: "1px solid #2A2540", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "#6B63A8", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 5 }}>Interview Preparation</div>
            <p style={{ margin: 0, fontSize: 13, color: "#C4BFDE", lineHeight: 1.7 }}>
              <strong style={{ color: "#E8E6F0" }}>30 real NetSuite interview questions</strong> with model answers, organised by category. Read the question first, formulate your own answer, then reveal the model answer to compare. The goal is to internalise the thinking, not memorise word-for-word.
            </p>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {interviewQA.map(cat => (
              <button key={cat.category} onClick={() => { setQaCategory(cat.category); setExpandedQ(null); }} style={{ padding: "6px 14px", borderRadius: 20, border: qaCategory === cat.category ? `1px solid ${cat.color}` : "1px solid #2A2540", background: qaCategory === cat.category ? `${cat.color}22` : "transparent", color: qaCategory === cat.category ? cat.color : "#6B63A8", fontSize: 12, cursor: "pointer", fontFamily: "monospace", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                {cat.category} ({cat.questions.length})
              </button>
            ))}
          </div>

          {/* Category info */}
          <div style={{ background: `${currentQA.color}12`, border: `1px solid ${currentQA.color}33`, borderRadius: 10, padding: "11px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 10, color: currentQA.color, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {currentQA.category} · {currentQA.questions.length} Questions
            </div>
            <div style={{ fontSize: 11, color: "#6B63A8", marginLeft: "auto" }}>Click a question to reveal the model answer</div>
          </div>

          {/* Q&A Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {currentQA.questions.map((qa, i) => {
              const qKey = `${qaCategory}-${i}`;
              const isOpen = expandedQ === qKey;
              return (
                <div key={qKey} style={{ ...cardBase, border: isOpen ? `1px solid ${currentQA.color}55` : "1px solid #2A2540", cursor: "pointer" }} onClick={() => setExpandedQ(isOpen ? null : qKey)}>
                  <div style={{ padding: "14px 18px", display: "flex", gap: 13, alignItems: "flex-start" }}>
                    <div style={{ background: `${currentQA.color}20`, border: `1px solid ${currentQA.color}44`, borderRadius: 8, padding: "4px 9px", fontSize: 11, fontWeight: 700, color: currentQA.color, fontFamily: "monospace", flexShrink: 0, marginTop: 1 }}>Q{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#E8E6F0", lineHeight: 1.5 }}>{qa.q}</div>
                      {!isOpen && <div style={{ fontSize: 11, color: "#5A5480", marginTop: 5, fontFamily: "monospace" }}>Click to reveal model answer ↓</div>}
                    </div>
                    <span style={{ color: "#3A3560", fontSize: 11, flexShrink: 0, marginTop: 3, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop: "1px solid #2A2540", padding: "14px 18px" }}>
                      <div style={{ fontSize: 10, color: currentQA.color, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Model Answer</div>
                      <div style={{ fontSize: 13.5, color: "#C4BFDE", lineHeight: 1.75 }}>{qa.a}</div>
                      <div style={{ marginTop: 14, background: "#0D0D14", border: `1px dashed ${currentQA.color}33`, borderRadius: 8, padding: "9px 13px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: "#F59E0B", flexShrink: 0, fontSize: 12 }}>💡</span>
                        <span style={{ fontSize: 11.5, color: "#7B72A8", lineHeight: 1.55 }}>Practice saying this answer out loud. Time yourself — aim for 90–120 seconds per answer. Then ask a colleague or record yourself to check your clarity and confidence.</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interview stats */}
          <div style={{ marginTop: 22, background: "#1A1528", border: "1px solid #2A2540", borderRadius: 12, padding: "15px 18px" }}>
            <div style={{ fontSize: 10, color: "#5A5480", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 12 }}>📊 Interview Question Coverage</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 9 }}>
              {interviewQA.map(cat => (
                <div key={cat.category} style={{ background: "#13111E", borderRadius: 8, padding: "9px 13px" }}>
                  <div style={{ fontSize: 10, color: "#5A5480", fontFamily: "monospace" }}>{cat.category}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: cat.color, marginTop: 2 }}>{cat.questions.length} Questions</div>
                </div>
              ))}
              <div style={{ background: "#13111E", borderRadius: 8, padding: "9px 13px" }}>
                <div style={{ fontSize: 10, color: "#5A5480", fontFamily: "monospace" }}>Total</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#F0EEF8", marginTop: 2 }}>30 Questions</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ RESOURCES TAB ══ */}
      {activeTab === "resources" && (
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "22px 24px" }}>
          <div style={{ background: "#1A1528", border: "1px solid #2A2540", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "#6B63A8", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 5 }}>Resources Library</div>
            <p style={{ margin: 0, fontSize: 13, color: "#C4BFDE", lineHeight: 1.7 }}>
              Curated resources for every phase of your study plan. Each resource is annotated with exactly what to use it for and when. Select the phase using the tabs below.
            </p>
          </div>

          {/* Phase tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {resourcePhases.map((rp, i) => (
              <button key={i} onClick={() => setResourcePhase(i)} style={{ padding: "6px 13px", borderRadius: 20, border: resourcePhase === i ? `1px solid ${rp.color}` : "1px solid #2A2540", background: resourcePhase === i ? `${rp.color}22` : "transparent", color: resourcePhase === i ? rp.color : "#6B63A8", fontSize: 11, cursor: "pointer", fontFamily: "monospace", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                {rp.icon} {rp.phase.split("—")[0].trim()}
              </button>
            ))}
          </div>

          {/* Phase header */}
          <div style={{ background: `${currentResources.color}12`, border: `1px solid ${currentResources.color}33`, borderRadius: 12, padding: "14px 18px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>{currentResources.icon}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: currentResources.color }}>{currentResources.phase}</div>
              <div style={{ fontSize: 11, color: "#6B63A8", marginTop: 2 }}>{currentResources.categories.reduce((acc, c) => acc + c.resources.length, 0)} curated resources across {currentResources.categories.length} categories</div>
            </div>
          </div>

          {/* Resource categories */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {currentResources.categories.map((cat) => (
              <div key={cat.name}>
                <div style={{ fontSize: 10, color: "#5A5480", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 9, paddingLeft: 2 }}>{cat.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {cat.resources.map((res, i) => (
                    <div key={i} style={{ background: "#13111E", border: "1px solid #2A2540", borderRadius: 11, padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start", transition: "border 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${currentResources.color}55`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "#2A2540"}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap", marginBottom: 6 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: "#E8E6F0" }}>{res.title}</span>
                          <span style={{ fontSize: 10, fontFamily: "monospace", padding: "1px 8px", borderRadius: 20, border: `1px solid ${currentResources.color}44`, color: currentResources.color, background: `${currentResources.color}15` }}>{res.type}</span>
                        </div>
                        <div style={{ fontSize: 12.5, color: "#8B84B0", lineHeight: 1.6 }}>{res.note}</div>
                        <div style={{ marginTop: 8 }}>
                          <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: currentResources.color, fontFamily: "monospace", textDecoration: "none", opacity: 0.8 }}
                            onClick={e => e.stopPropagation()}>
                            {res.url.length > 55 ? res.url.slice(0, 55) + "…" : res.url} ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary count */}
          <div style={{ marginTop: 22, background: "#1A1528", border: "1px solid #2A2540", borderRadius: 12, padding: "15px 18px" }}>
            <div style={{ fontSize: 10, color: "#5A5480", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 12 }}>📚 Total Resources by Phase</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 9 }}>
              {resourcePhases.map((rp, i) => (
                <div key={i} style={{ background: "#13111E", borderRadius: 8, padding: "9px 13px" }}>
                  <div style={{ fontSize: 10, color: "#5A5480", fontFamily: "monospace" }}>{rp.phase.split("—")[1]?.trim() || rp.phase}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: rp.color, marginTop: 2 }}>{rp.categories.reduce((a, c) => a + c.resources.length, 0)} resources</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
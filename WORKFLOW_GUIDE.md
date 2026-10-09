# 📘 PixelFlow Enterprise System - Complete Operational & Technical Workflow Guide

এই ডকুমেন্টটিতে **PixelFlow Photo Editing Automation & Audit System**-টি শুরু থেকে শেষ পর্যন্ত কীভাবে কাজ করে, তার সম্পূর্ণ বিবরণ বিস্তারিতভাবে তুলে ধরা হলো।

---

## 📑 সুচিপত্র (Table of Contents)

1. [সম্পূর্ণ ওয়ার্কফ্লো ডায়াগ্রাম (End-to-End Workflow Diagram)](#1-সম্পূর্ণ-ওয়ার্কফ্লো-ডায়াগ্রাম-end-to-end-workflow-diagram)
2. [ধাপ ১: অর্ডার সংগ্রহ ও টিস্টা অ্যাপ প্রসেসিং (Order Collection & Tista Processing)](#ধাপ-১-অর্ডার-সংগ্রহ-ও-টিস্টা-অ্যাপ-প্রসেসিং)
3. [ধাপ ২: ক্যাটাগরি ও সার্ভিস অ্যাসাইনমেন্ট (Category & Complexity Assignment)](#ধাপ-২-ক্যাটাগরি-ও-সার্ভিস-অ্যাসাইনমেন্ট)
4. [ধাপ ৩: ফটোশপ স্মার্ট QC প্লাগইন ও ফাইল লকিং (Photoshop UXP Smart QC & File Locking)](#ধাপ-৩-ফটোশপ-স্মার্ট-qc-প্লাগইন-ও-ফাইল-লকিং)
5. [ধাপ ৪: ১মে লেয়ার ও ২য় লেয়ার অডিট (Dual-Layer Quality & Category Audit)](#ধাপ-৪-১মে-লেয়ার-ও-২য়-লেয়ার-অডিট)
6. [ধাপ ৫: ডাটা সিঙ্ক ইঞ্জিন ও টগল সুইচ (Data Sync Engine & Toggle Switch)](#ধাপ-৫-ডাটা-সিঙ্ক-ইঞ্জিন-ও-টগল-সুইচ)
7. [ধাপ ৬: রিপোর্টিং ও অটো ইমেইল জেনারেটর (Reporting & Automated Vendor Emailing)](#ধাপ-৬-রিপোর্টিং-ও-অটো-ইমেইল-জেনারেটর)
8. [টেকনিক্যাল সেটআপ ও ডিপ্লয়মেন্ট গাইড (Technical Setup & Deployment Guide)](#টেকনিক্যাল-সেটআপ-ও-ডিপ্লয়মেন্ট-গাইড)

---

## 1. সম্পূর্ণ ওয়ার্কফ্লো ডায়াগ্রাম (End-to-End Workflow Diagram)

```mermaid
flowchart TD
    subgraph Order Ingestion & Storage
        Customer[1. Customer Order on Website] --> Tista[2. Tista App REST API]
        Customer --> DropboxRaw[3. Upload Raw Image to Dropbox: /{Vendor}/Order_ID/Original/]
    end

    subgraph Production & Editing
        Tista --> ProdAssign[4. Production Mgr Verifies Instruction & Sets Category 1,2,3...]
        ProdAssign --> Designer[5. Designer Downloads Raw File & Edits in Photoshop]
    end

    subgraph Photoshop UXP Smart QC Layer
        Designer --> UXPPanel[6. Open Photoshop UXP Extension Panel]
        UXPPanel <-->|Fetch Specs & Instructions| Tista
        UXPPanel --> TechAutoCheck[7. System Auto Inspections: DPI 300, RGB, Size, Clipping Path, #FFFFFF BG, Layers]
        UXPPanel --> InstructionChecklist[8. Interactive Instruction Checklist Checkoff]
        
        TechAutoCheck --> LockDecision{All QC Rules & Checklist Passed?}
        InstructionChecklist --> LockDecision
        
        LockDecision -- NO --> LockEnforce[🚫 Save / Upload Button LOCKED]
        LockDecision -- YES --> UnlockEnforce[✅ Unlock & Auto Upload to Dropbox: /{Vendor}/Order_ID/Complete/]
    end

    subgraph Dual-Layer Audit & Data Sync Layer
        UnlockEnforce --> Layer1Delivery[9. Delivery Link Set in Tista App]
        Layer1Delivery --> Layer2Audit[10. 2nd Layer Audit: Vendor Guidelines & Category Verification]
        
        Layer2Audit --> CentralDB[(11. Cloud PostgreSQL Central Database)]
        CentralDB <--> SyncToggle{12. Sync ON/OFF Toggle Switch}
        
        SyncToggle -- Sync ON --> GSheets[13. Real-Time Auto Sync to Google Sheets API]
        SyncToggle -- Sync OFF --> SyncQueue[14. Queue Pending Sync Items Safely]
    end

    subgraph Executive Analytics & Vendor Chargebacks
        CentralDB --> AdminPortal[15. Standalone Admin Reporting Web App]
        AdminPortal --> QualityReport[Quality Audit Report: Vendor Faults & Auditor Insights]
        AdminPortal --> CategoryReport[Service & Category Accuracy Report: SM/ASM Breakdown]
        AdminPortal --> EmailEngine[Automated Vendor Chargeback Email & Slide Deck Generator]
    end
```

---

## 🔍 ধাপে ধাপে বিস্তারিত কাজের প্রক্রিয়া (Step-by-Step Breakdown)

### ধাপ ১: অর্ডার সংগ্রহ ও টিস্টা অ্যাপ প্রসেসিং
1. কাস্টমার ওয়েবসাইটে ছবি ও নির্দেশনাবলী দিয়ে অর্ডার সাবমিট করে।
2. অর্ডার তথ্য সরাসরি কাস্টম **Tista Job Management App**-এ চলে আসে।
3. কাস্টমারের অরিজিনাল ছবিগুলো ড্রপবক্সের ভেন্ডর-ভিত্তিক লোকেশনে আপলোড হয়:
   `/{Vendor_Name}/{Order_ID}/Original/`

---

### ধাপ ২: ক্যাটাগরি ও সার্ভিস অ্যাসাইনমেন্ট
1. প্রডাকশন ম্যানেজার ইমেজের জটিলতা দেখে ক্যাটাগরি (Category 1 - Simple, Category 2 - Medium, Category 3 - Complex) এবং সার্ভিস টাইপ যাচাই করে অ্যাসাইন করেন।
2. এই ক্যাটাগরির ওপর ভেন্ডরের প্রডাকশন কস্ট ও কোম্পানির প্রফিট মার্জিন নির্ভর করে।

---

### ধাপ ৩: ফটোশপ স্মার্ট QC প্লাগইন ও ফাইল লকিং (Photoshop UXP Extension)
ডিজাইনার বা ১ম লেয়ার QC ফটোশপে কাজ শেষ করার পর প্লাগইনে Order ID ইনপুট দেবে। প্লাগইনটি ৩টি স্তরে ফাইল ভেরিফাই করবে:

1. **ইঞ্জিন এ (অটো টেকনিক্যাল ইন্সপেকশন):**
   - **DPI/Resolution Check:** ফাইল ৩০০ DPI কিনা সিস্টেম স্বয়ংক্রিয়ভাবে স্ক্র্যান করে।
   - **Color Mode Check:** কালার মোড RGB নাকি CMYK তা যাচাই করে।
   - **Dimensions & Aspect Ratio:** অর্ডারের সাথে ছবির পিক্সেল সাইজ মেলায়।
   - **Clipping Path Check:** ফটোশপের Path প্যালেটে `Path 1` নামের স্মুথ ক্লিপিং পাথ রয়েছে কিনা তা ডিটেক্ট করে।
   - **Pure White Background Check:** ইমেজের বর্ডার বা কর্নার পিক্সেল ১০০% বিশুদ্ধ সাদা (`#FFFFFF` বা RGB 255,255,255) কিনা অটো ডিটেক্ট করে।
   - **Layer Structure Check:** অ্যাডজাস্টমেন্ট লেয়ার এবং ব্যাকগ্রাউন্ড ট্রান্সপারেন্সি ঠিক আছে কিনা ভেরিফাই করে।

2. **ইঞ্জিন বি (ডাইনামিক ইনস্ট্রাকশন চেকলিস্ট):**
   - Tista App থেকে ঐ নির্দিষ্ট অর্ডারের টেক্সট ইনস্ট্রাকশনগুলো এনে প্লাগইনে ডায়নামিক চেকলিস্ট আকারে দেখায় (যেমন: "Soft shadow drop", "Wrinkle removal")।

3. **ইঞ্জিন সি (ফাইল লকিং প্রসেস):**
   - **ফাইল লকিং নিয়ম:** যতক্ষণ না **অটো টেকনিক্যাল চেকের সব পয়েন্ট + ইনস্ট্রাকশন চেকলিস্টের সব টিকমার্ক পাস করবে**, ততক্ষণ ফটোশপের "Complete & Upload to Dropbox" বাটনটি **লাল রঙের ওয়ার্নিং সহ সম্পূর্ণ লক (Disabled)** থাকবে।
   - পাস করার সাথে সাথে সবুজ গ্লো এনিমেশনসহ বাটন আনলক হবে এবং ড্রপবক্সে অটো ফাইল আপলোড হবে: `/{Vendor_Name}/{Order_ID}/Complete/`

---

### ধাপ ৪: ১ম লেয়ার ও ২য় লেয়ার অডিট (Dual-Layer Audit)

1. **১ম লেয়ার প্রডাকশন QC:** ফটোশপ ইউএক্সপি প্লাগইনে পাশ করার পর ফাইল কমপ্লিট হয়ে ড্রপবক্স ডেলিভারি লিঙ্ক Tista App-এ সেট হয়।
2. **২য় লেয়ার কোয়ালিটি ও ক্যাটাগরি অডিট:**
   - অডিট টিম ভেন্ডরের কাজ রিভিউ করে দেখে কাস্টমার গাইডলাইন মানা হয়েছে কিনা।
   - প্রডাকশন ম্যানেজার সঠিক ক্যাটাগরি ও সার্ভিস দিয়েছে কিনা অডিট টিম ভেরিফাই করে। ভুল ক্যাটাগরি দিলে তা **Category Difference (High/Low)** হিসেবে ফ্ল্যাগড হয়।

---

### ধাপ ৫: ডাটা সিঙ্ক ইঞ্জিন ও টগল সুইচ (Data Sync Engine with ON/OFF Toggle)

- **সেন্ট্রাল ক্লাউড ডাটাবেজ:** সব অডিট এবং অর্ডারের ডাটা PostgreSQL ডাটাবেজে রিয়েলটাইমে সেভ হয়।
- **Google Sheets API Auto-Sync:**
  - সিস্টেমের শীর্ষে একটি **Sync Toggle Switch (On/Off)** দেওয়া রয়েছে।
  - **Sync ON থাকলে:** যেকোনো অডিট এন্ট্রি বা QC পাসের সাথে সাথে গুগলের মাস্টার শিটে লাইব ডাটা আপডেট হবে।
  - **Sync OFF থাকলে:** কোনো নেটওয়ার্ক ধীরগতি বা শিট মেইনটেনেন্সের সময় সিঙ্ক বন্ধ রাখা যাবে। এই সময়ে জমা হওয়া ডাটা নিরাপদ Queue-তে প্রসেস হয়ে থাকবে এবং সিঙ্ক অন করার সাথে সাথে Force Sync হয়ে শিটে আপডেট হবে।

---

### ধাপ ৬: রিপোর্টিং ও অটো ইমেইল জেনারেটর (Executive Admin Web App)

এডমিন পোর্টাল ওয়েব অ্যাপটিতে প্রধানত ৩টি শক্তিশালী মডিউল রয়েছে:

#### ১. Quality Audit Report (কোয়ালিটি অডিট রিপোর্ট):
- **All Vendor Summary:** মোট সংগৃহীত অর্ডার, অডিট সংখ্যা, অডিট পাসের শতকরা হার।
- **Individual Auditor Performance:** অডিটরের নাম, কতটি অর্ডার চেক করেছে, অডিট %, কতটি ফল্ট খুঁজে পেয়েছে।
- **Path Quality Audit Insight Table:** ভেন্ডর ও হাব লোকেশন অনুযায়ী অর্ডারের ভুল ও সার্ভিসের ভুল শতকরা হারে হিসাব।
- **Weekly Quality Audit Comparison:** সপ্তাহভিত্তিক (Week 1 vs Week 2) ভেন্ডর ভুলের তুলনামূলক চিত্র।

#### ২. Service & Category Accuracy Report (সার্ভিস ও ক্যাটাগরি রিপোর্ট):
- **Master Summary:** মোট অর্ডার এন্ট্রি, সঠিক এন্ট্রি, সার্ভিস মিসম্যাচ (Wrong/Missing Service), ক্যাটাগরি ডিফারেন্স (High/Low Category Diff) এবং নোট ইস্যু।
- **Individual Lead Breakdown (SM/ASM):** টাস্ক অ্যাসাইনমেন্টে প্রডাকশন লিডদের ভুলের হিসাব।
- **Weekly Comparison:** সপ্তাহের ভিত্তিতে ভুল কমানোর পারফরম্যান্স ট্র্যাকিং।

#### ৩. Automated Vendor Email & Slide Generator (অটো ইমেইল ও স্লাইড জেনারেটর):
- ১ ক্লিকে ভেন্ডরের জন্য ১৬:৯ এইচডি স্লাইড প্রেজেন্টেশন (Slide Deck) জেনারেট হয়।
- প্রতিটি ভুলের জন্য $4.50 ডলার চার্জব্যাক কেটে অটোমেটিক চার্জব্যাক স্টেটমেন্ট সহ ভেন্ডরের ইমেইলে সরাসরি স্পেসিফিক অডিট রিপোর্ট মেল করা যায়।

---

## 🛠️ টেকনিক্যাল সেটআপ ও রান করার নিয়ম (Technical Deployment)

### প্রজেক্ট ক্লাউন ও রান করার নির্দেশাবলী:

```bash
# ১. গিটহাব থেকে প্রজেক্ট ক্লোন করুন
git clone https://github.com/bishojit-byte/Audit-Automation.git

# ২. প্রজেক্ট ডিরেক্টরিতে যান
cd Audit-Automation

# ৩. প্রয়োজনীয় প্যাকেজ ইনস্টল করুন
npm install

# ৪. লোকাল ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev
```

সার্ভার চালু হলে ব্রাউজারে অপেন করুন: `http://localhost:5173/`

### বিল্ড তৈরি করার জন্য:
```bash
npm run build
```

---
*ডকুমেন্টেশন ফাইল তৈরি ও আপডেট করেছেন Antigravity AI Engine (Google DeepMind).*

# Veritas Hire

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

An AI-powered resume analyzer that helps job seekers understand how well their resume matches a job description. The app provides a match score, keyword analysis, strengths, weaknesses, and transferable skills — giving candidates actionable feedback to improve their applications.

🔗 **Live Demo:**
[veritas-hire.vercel.app](https://veritas-hire.vercel.app/)


## 🚀 Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS  
- **Backend:** Django REST Framework (coming soon)  
- **Database:** PostgreSQL  
- **AI Integration:** OpenAI API  



## ✨ Features (MVP)
- Upload your resume (PDF/DOCX)
- Paste a job description
- Receive AI-generated analysis including:
  - ✅ Overall Match Score (%)
  - 🧠 Skills Match:
    - 📝 Keyword insights (matched & missing)
  - 💼 Experience Match
  - 🪴 Growth Potential / Transferable Skills
  - 💪 Strengths & Weaknesses
  - 💬 Actionable recommendations
  - 📚 Overall Summary




## 📂 Project Structure
```
veritas-hire/
├── frontend/   # Next.js app (deployed on Vercel)
└── backend/    # Django app (coming soon)
```



## 🛠 Development Roadmap
1. **✅ Frontend Skeleton** → Resume upload & job description input (Next.js + Tailwind).
2. **🧱 Backend Setup** → Django REST API with `/analyze` endpoint (mock data initially).
3. **📄 Resume Parsing** → Extract text from PDF/DOCX via Python libraries.
4. **🤖 AI Integration** → Connect OpenAI API for intelligent analysis & scoring.  
5. **💾 Database** → Store resumes, job descriptions, and results in PostgreSQL.  
6. **🎨 UI Polish** → Add progress indicators/animations, keyword highlights, and history view.  



## 📦 Getting Started

### Clone the repo
```
git clone https://github.com/ellisPae/veritas-hire.git
cd veritas_hire
```

#### Frontend
```
cd frontend
yarn install
yarn dev
```
Frontend runs at: ```http://localhost:3000```


#### Backend (coming soon)
```
cd backend
python manage.py runserver
```
Backend will run at: ```http://localhost:8000```


## 📸 Screenshots
**Landing Page:**
<img width="1727" height="960" alt="Screenshot 2025-10-23 at 12 48 12 PM" src="https://github.com/user-attachments/assets/2c72ee14-4370-4c44-a12b-7e40b7852e2a" />

**Resume Upload Page:**
<img width="1728" height="956" alt="Screenshot 2025-10-23 at 12 46 18 PM" src="https://github.com/user-attachments/assets/63eaa882-5077-4b2b-8b68-f9c545018044" />

**Job Listing Page:**
<img width="1728" height="958" alt="Screenshot 2025-10-23 at 12 46 32 PM" src="https://github.com/user-attachments/assets/e47af1d9-50ed-4d7b-8be8-afaa4e0797d0" />

**Results Page:**
<img width="1728" height="957" alt="Screenshot 2025-10-23 at 12 45 55 PM" src="https://github.com/user-attachments/assets/452ebe0c-ad5a-47a5-9716-82bf88589123" />
<img width="1727" height="957" alt="Screenshot 2025-10-23 at 12 46 09 PM" src="https://github.com/user-attachments/assets/4af1afd4-c9ea-4301-992a-326ee6de8abd" />



## 📊 Analytics & Recruiter Insights (Coming Soon)

Veritas Hire is evolving beyond resume analysis — it’s becoming a **data-driven hiring intelligence tool**.

### Planned Analytics Features
- **Job-Level Insights** – Aggregate analysis data for each job posting to understand overall applicant quality.  
- **Top Candidates Ranking** – Automatically identify the **top 10 prospects** based on AI-generated fit scores, keyword relevance, and transferable skills.  
- **Visual Analytics Dashboard** – Interactive recruiter dashboard with charts showing score distributions, keyword trends, and average fit metrics per role.  
- **Data Export & Collaboration** – Export candidate analytics (CSV/PDF) or share recruiter dashboards for team review.  

### Technical Overview
The analytics system will:
- Store all applicant analyses linked to their job listings in the backend (Django + PostgreSQL).  
- Use AI-driven scoring to rank applicants.  
- Expose a `/jobs/:id/analytics` API endpoint for aggregated results and top candidate retrieval.  
- Power a **Recruiter Dashboard** in Next.js featuring:  
  - 📈 Fit score distribution charts  
  - 🏆 Ranked candidate list  
  - 🧠 Keyword heatmaps and trend summaries  

This will enable recruiters to **quickly identify the most qualified candidates** and gain deeper insights into their applicant pools.


## 🧭 Future Enhancements
  - 🔐 User authentication (save multiple resumes & analyses)
  - ✍️ Resume rewriting suggestions (ATS optimization)
  - 📨 Cover letter analyzer & generator
  - 📊 Dashboard with analysis history
  - 👔 Recruiter mode (bulk resume/job description comparisons)


## 📄 License

This project is for personal learning and portfolio purposes.
© 2025 Ellis Pae — All rights reserved.

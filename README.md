# Veritas Hire

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

An AI-powered resume analyzer that helps job seekers understand how well their resume matches a job description. The app provides a match score, keyword analysis, strengths, weaknesses, and transferable skills — giving candidates actionable feedback to improve their applications.



## 🚀 Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS  
- **Backend:** Django REST Framework (coming soon)  
- **Database:** PostgreSQL  
- **AI Integration:** OpenAI API  



## ✨ Features (MVP)
- Upload a resume (PDF/DOCX)  
- Paste a job description  
- AI-generated analysis including:  
  - Overall Match Score (%)  
  - Keywords (matched & missing)  
  - Strengths & Weaknesses  
  - Transferable Skills  
  - Intangibles  



## 📂 Project Structure
```
veritas_hire/
frontend/   # Next.js app
backend/    # Django app (coming soon)
```



## 🛠 Development Roadmap
1. **Frontend Skeleton** → Resume upload + job description form (Next.js + Tailwind).  
2. **Backend Setup** → Django REST API with `/analyze` endpoint (dummy JSON at first).  
3. **Resume Parsing** → Extract text from PDF/DOCX using Python libraries.  
4. **AI Integration** → Connect OpenAI API for analysis & scoring.  
5. **Database** → Store resumes, job descriptions, and results (PostgreSQL).  
6. **UI Polish** → Add progress indicators, keyword highlights, and history view.  



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



## 📸 Screenshots (Coming Soon)
UI previews of the resume upload form, match score dashboard, and keyword analysis.



## 🧭 Future Enhancements
	•	User authentication (save multiple resumes & analyses)
	•	Resume rewriting suggestions (ATS optimization)
	•	Cover letter analyzer & generator
	•	Dashboard with analysis history
	•	Recruiter mode (bulk resume/job description comparisons)



## 📄 License
This project is for personal learning and portfolio purposes.



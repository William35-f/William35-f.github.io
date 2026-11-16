export const profile = {
  name: "Hein Htet Aung",
  nickname: "William",
  role: "Applied AI & Analytics Student",
  tagline: "Aspiring AI Engineer",
  location: "Singapore",
  school: "Singapore Polytechnic",
  phone: "+65 8026 7364",
  phoneHref: "tel:+6580267364",
  email: "williamhein888@gmail.com",
  linkedin: "https://www.linkedin.com/in/hein-htet-aung-william/",
  github: "https://github.com/William35-f",
  summary:
    "Applied AI & Analytics diploma student at Singapore Polytechnic (GPA 3.95/4.00) seeking an AI engineering internship. Builds end-to-end AI applications, from deep-learning models in TensorFlow/Keras to RAG and LLM tools shipped with FastAPI and React. PolyFinTech100 Hackathon semifinalist as team lead, and NVIDIA DLI certified.",
  resumes: [
    { label: "AI Engineer resume", href: "/docs/Hein_Htet_Aung_Resume_AI_Engineer.pdf" },
    { label: "Data Analyst resume", href: "/docs/Hein_Htet_Aung_Resume_Data_Analyst.pdf" },
  ],
};

export const stats = [
  { value: "3.95", label: "GPA out of 4.00" },
  { value: "13", label: "Projects built" },
  { value: "Lead", label: "PolyFinTech100 semifinal team" },
  { value: "NVIDIA", label: "DLI certified" },
];

export type Category = "ai" | "data" | "software";

export const categoryLabels: Record<Category, string> = {
  ai: "AI & ML",
  data: "Data & Analytics",
  software: "Backend & Software",
};

export type Project = {
  slug: string;
  title: string;
  short: string;
  context: string;
  year: string;
  category: Category;
  featured?: boolean;
  status?: string;
  stack: string[];
  bullets: string[];
  metrics?: { value: string; label: string }[];
  github?: string;
  images: string[];
  cover?: string;
  accent: string;
};

const imgs = (slug: string, n: number, start = 1) =>
  Array.from({ length: n }, (_, i) => `/projects/${slug}/${String(i + start).padStart(2, "0")}.jpg`);

export const projects: Project[] = [
  {
    slug: "regulens",
    title: "ReguLens",
    short: "GenAI compliance assistant for Singapore finance",
    context: "Personal Project",
    year: "2026 – Present",
    category: "ai",
    featured: true,
    status: "In progress",
    stack: ["FastAPI", "Postgres", "pgvector", "RAG", "Hybrid search", "Reranking", "LLM agents"],
    bullets: [
      "Building a RAG assistant that answers MAS regulatory questions with page-level citations, using FastAPI, Postgres/pgvector, and hybrid search with reranking.",
      "Designing a 100-question evaluation pipeline for retrieval and answer accuracy, run in CI.",
      "Developing an agent that extracts SGX report figures into validated JSON and flags risks.",
    ],
    github: "https://github.com/William35-f/AI-compliance-assistant-for-finance",
    images: imgs("regulens", 8),
    accent: "#0F5E66",
  },
  {
    slug: "q-ai",
    title: "Q AI",
    short: "A checking layer for AI assistants in banking",
    context: "OCBC Ignite Innovation Challenge",
    year: "2026",
    category: "ai",
    featured: true,
    stack: ["FastAPI", "React", "TypeScript", "ChromaDB", "Gemini", "OpenAI"],
    bullets: [
      "Built a full-stack prototype (FastAPI, React/TypeScript) that checks AI answers against current bank procedures before staff act on them. It flags outdated sources, unsupported figures and missing compliance steps, sentence by sentence.",
      "Combined plain-Python rule checks, embedding search (ChromaDB) and LLM checks (Gemini), run in parallel, into a rule-based Red/Amber/Green verdict with an explained 0–100 risk score, one self-correction retry, and a human review queue that feeds a golden regression set.",
      "Got 40/40 correct verdicts on a labelled evaluation set (offline mode), with 178 automated tests. The system supports Gemini free tier and OpenAI, with rate limiting and back-off.",
    ],
    metrics: [
      { value: "40/40", label: "Correct verdicts on labelled eval set" },
      { value: "178", label: "Automated tests" },
      { value: "0–100", label: "Explained risk score" },
    ],
    github: "https://github.com/William35-f/OCBC_ignite_QAI",
    images: [],
    accent: "#B4232A",
  },
  {
    slug: "clarity",
    title: "CLARITY",
    short: "Agentic AI insurance navigator",
    context: "PolyFinTech100 Hackathon Semifinalist",
    year: "2026",
    category: "ai",
    featured: true,
    stack: ["OpenAI API", "Node.js", "Express", "MySQL"],
    bullets: [
      "Led the team that built an agentic AI assistant that gathers customer details and answers insurance questions before advisor meetings.",
      "Integrated the OpenAI API with a Node.js/Express backend and MySQL to detect product interest, match customers to advisors, and recommend meeting slots.",
    ],
    metrics: [{ value: "Semifinal", label: "PolyFinTech100, as team lead" }],
    github: "https://github.com/William35-f/Clarity-Agentic-AI-insurance-navigator",
    images: imgs("clarity", 5),
    cover: "/projects/clarity/04.jpg",
    accent: "#D7263D",
  },
  {
    slug: "green-grass-library",
    title: "Green Grass Library",
    short: "Data warehouse & MongoDB index benchmarking",
    context: "Academic Group Project",
    year: "2026",
    category: "data",
    featured: true,
    stack: ["MySQL", "SQL ETL", "Star schema", "MongoDB"],
    bullets: [
      "Built a MySQL OLTP database for a fictional library (500 books, 301 members, 12,344 loans), loading CSVs through staging tables and fixing invalid IDs, inconsistent dates and missing statuses, with corrupted records quarantined.",
      "Designed a star-schema data warehouse (1 fact table, 5 dimensions incl. a role-playing date dimension) and loaded it with SQL ETL using recursive CTEs and surrogate keys; validated 12,343 completed loans with 0 unmatched keys and wrote 6 analytical queries.",
      "Individually exported book data to MongoDB and benchmarked compound-index order on 50,000 documents: an ESR index cut query time from 27 ms (collection scan) to 3 ms and removed the separate sort stage.",
    ],
    metrics: [
      { value: "27→3 ms", label: "Query time with ESR index" },
      { value: "12,343", label: "Loans validated, 0 unmatched keys" },
      { value: "1 + 5", label: "Fact + dimension tables" },
    ],
    images: imgs("green-grass-library", 4),
    cover: "/projects/green-grass-library/02.jpg",
    accent: "#2E7D4F",
  },
  {
    slug: "multilingual-sentiment",
    title: "Multilingual Sentiment Analysis",
    short: "RNN, LSTM and GRU models on English & Malay reviews",
    context: "Academic Project",
    year: "2026",
    category: "ai",
    stack: ["TensorFlow", "Keras", "RNN", "LSTM", "GRU", "NLP"],
    bullets: [
      "Classified English and Malay restaurant reviews into negative, neutral and positive sentiment, comparing 8 SimpleRNN, LSTM and GRU variants in TensorFlow/Keras on original, translated and sentence-split text.",
      "Fitted the tokenizer on training data only to prevent data leakage, and selected models on validation macro F1.",
      "The final translated-text GRU reached 88.6% test accuracy and 87.7% test macro F1.",
    ],
    metrics: [
      { value: "88.6%", label: "Test accuracy" },
      { value: "87.7%", label: "Test macro F1" },
      { value: "8", label: "Model variants compared" },
    ],
    github: "https://github.com/William35-f/Multilingual-Sentiment-Analysis-with-RNN-LSTM-and-GRU-Models",
    images: imgs("multilingual-sentiment", 6),
    cover: "/projects/multilingual-sentiment/06.jpg",
    accent: "#1E3A8A",
  },
  {
    slug: "cnn-letters",
    title: "Handwritten Letter Classification",
    short: "CNN that reads 26 handwritten letters",
    context: "Academic Project",
    year: "2026",
    category: "ai",
    stack: ["TensorFlow", "Keras", "CNN", "Data augmentation"],
    bullets: [
      "Classified 28×28 grayscale handwritten letters into 26 classes (A–Z) with convolutional neural networks.",
      "Cleaned corrupted pixels, duplicate rows and invalid labels, then normalised, one-hot encoded and split the data with stratification; added shear, shift, rotation and zoom augmentation.",
      "Compared a baseline, a regularised (BatchNorm + Dropout) and a deeper 3-block CNN, with early stopping and ReduceLROnPlateau. The deeper CNN reached 95.41% test accuracy.",
      "Used a confusion matrix to find where the model struggles: I ↔ L, G ↔ Q and U ↔ V on messy handwriting.",
    ],
    metrics: [
      { value: "95.41%", label: "Test accuracy" },
      { value: "26", label: "Letter classes" },
    ],
    images: imgs("cnn-letters", 8),
    cover: "/projects/cnn-letters/07.jpg",
    accent: "#0F172A",
  },
  {
    slug: "genai-rl",
    title: "Generative AI & Reinforcement Learning",
    short: "GANs on CIFAR-10 and a DQN that balances a pendulum",
    context: "Academic Coursework",
    year: "2026",
    category: "ai",
    stack: ["TensorFlow", "Keras", "GANs", "DQN", "OpenAI Gym"],
    bullets: [
      "Trained GANs for image generation on the CIFAR-10 dataset.",
      "Built a Deep Q-Network (DQN) agent in TensorFlow/Keras to balance an inverted pendulum (OpenAI Gym Pendulum), using experience replay, a target network and a discretised torque action space.",
      "Compared DQN vs Double DQN, action-space sizes, exploration strategies and learning rates across four gravity settings, judging success by a custom balance criterion (upright within 6° for 25+ steps) rather than reward alone.",
    ],
    github: "https://github.com/William35-f/Generative-AI-Reinforcement-Learning",
    images: imgs("genai-rl", 19),
    cover: "/projects/genai-rl/02.jpg",
    accent: "#111827",
  },
  {
    slug: "ml-prediction-segmentation",
    title: "Machine Learning: Prediction, Segmentation & Forecasting",
    short: "Regression, clustering and time-series forecasting",
    context: "Academic Project",
    year: "2026",
    category: "ai",
    stack: ["Scikit-learn", "Random Forest", "Gradient Boosting", "K-Means", "DBSCAN", "ARIMA"],
    bullets: [
      "Built house-price regression and classification models with Linear Regression, Random Forest and Gradient Boosting, tuned and compared on R², ROC-AUC and feature importance.",
      "Segmented customers with K-Means, hierarchical clustering and DBSCAN, and forecast time series with Holt-Winters vs ARIMA after ADF stationarity testing.",
    ],
    images: imgs("ml-prediction-segmentation", 26),
    cover: "/projects/ml-prediction-segmentation/12.jpg",
    accent: "#1F4E79",
  },
  {
    slug: "multi-model-comparison",
    title: "Multi-Model AI Answer Comparison",
    short: "Compare several LLMs' answers side by side",
    context: "Personal Project",
    year: "2026",
    category: "ai",
    stack: ["FastAPI", "React", "OCR", "LLM APIs"],
    bullets: [
      "Built a FastAPI service and React interface that sends OCR-extracted text to several LLMs and compares their answers and confidence side by side.",
    ],
    github: "https://github.com/William35-f/Assistant-AI-tutor",
    images: [],
    accent: "#4338CA",
  },
  {
    slug: "sg-job-market",
    title: "Singapore Job Market Analysis",
    short: "Salary vs stability across Singapore industries",
    context: "Academic Pair Project",
    year: "2026",
    category: "data",
    stack: ["Pandas", "Matplotlib", "Seaborn", "UiPath RPA"],
    bullets: [
      "Analysed trade-offs between starting salary, job stability and career flexibility across Singapore industries by cleaning and merging Graduate Employment Survey data with two Ministry of Manpower datasets in Pandas.",
      "Built 9 Matplotlib/Seaborn visualisations (scatter, box, KDE and line plots), showing that more stable graduate jobs tend to pay higher starting salaries, while lower-paid occupations saw faster income growth from 2017 to 2022.",
      "Built the team’s UiPath RPA workflow on my own: it downloads the MOM CSV files from the website, moves the latest files into the project folder, runs the Python analysis script and emails the results through Outlook.",
    ],
    metrics: [
      { value: "3", label: "Government datasets merged" },
      { value: "9", label: "Visualisations" },
    ],
    github: "https://github.com/William35-f/Singapore-Job-Market-Analysis-Salary-vs-Stability",
    images: imgs("sg-job-market", 9),
    cover: "/projects/sg-job-market/04.jpg",
    accent: "#B45309",
  },
  {
    slug: "ar-game-data-story",
    title: "AR Game Pilot Location Data Story",
    short: "Power BI story on where to launch an AR game",
    context: "Academic Team Project",
    year: "2026",
    category: "data",
    stack: ["Power BI", "Data storytelling", "Survey analysis"],
    bullets: [
      "Analysed survey data from 200 Singapore residents in Power BI to help recommend where a fictional AR mobile game company should pilot the release of new in-game creatures.",
      "Built a Top 10 bar chart of MRT areas with the most highly active gamers (7+ hours a week), highlighting Choa Chu Kang and Lakeside as strong pilot locations, and a scatter plot showing that these gamers mostly live close to MRT stations and public Wi-Fi hotspots.",
    ],
    metrics: [{ value: "200", label: "Survey respondents analysed" }],
    images: imgs("ar-game-data-story", 10),
    cover: "/projects/ar-game-data-story/01.jpg",
    accent: "#4C1D95",
  },
  {
    slug: "arcane-wellness",
    title: "Arcane Wellness Academy",
    short: "Backend REST API with auth and rewards",
    context: "Academic Project",
    year: "2025 – 2026",
    category: "software",
    stack: ["Node.js", "Express", "MySQL", "REST", "JWT"],
    bullets: [
      "Developed RESTful APIs in Node.js/Express with token-based authentication, a reward points system and MySQL CRUD, plus input validation and error handling.",
    ],
    github: "https://github.com/ST0503-BED/bed-ca2-William35-f",
    images: [],
    accent: "#7C2D12",
  },
  {
    slug: "dsa-sorting",
    title: "Sorting Algorithm Performance Analysis",
    short: "Bubble, Merge, 3-way Quick and Heap Sort, benchmarked",
    context: "Group Project · Data Structures & Algorithms",
    year: "2026",
    category: "software",
    stack: ["Python", "Jupyter Notebook", "Algorithms"],
    bullets: [
      "Collaborated on implementing and comparing four sorting algorithms: Bubble Sort, Merge Sort, 3-way Quick Sort, and Heap Sort.",
      "Developed comparison-counting benchmarks to evaluate algorithm performance across 11 dataset sizes (5 to 100,000 elements) and multiple input patterns, including random, sorted, reverse-sorted, and duplicate-heavy data.",
      "Analysed empirical comparison counts against theoretical time and space complexities, identifying how input characteristics affect algorithm performance.",
      "Investigated sorting stability, explaining how stable algorithms preserve the relative order of records with equal keys and exploring methods to make unstable algorithms stable.",
      "Presented experimental findings through visualisations, a technical report, and a group presentation, highlighting the trade-offs between performance, memory usage, and stability.",
    ],
    metrics: [
      { value: "4", label: "Algorithms compared" },
      { value: "11", label: "Dataset sizes, 5 to 100,000" },
    ],
    github: "https://github.com/William35-f/Data-Structures-Algorithms-Sorting-Algorithm-Performance-Analysis",
    images: imgs("dsa-sorting", 16),
    cover: "/projects/dsa-sorting/01.jpg",
    accent: "#0E7490",
  },
];

export const skills = [
  { group: "AI & ML", items: ["TensorFlow/Keras", "Scikit-learn", "RNN/LSTM/GRU", "GANs", "LLM APIs (OpenAI)", "OCR"] },
  { group: "Languages", items: ["Python", "JavaScript", "SQL", "HTML/CSS"] },
  { group: "Backend & Web", items: ["FastAPI", "Node.js", "Express", "React", "REST APIs"] },
  { group: "Data & Tools", items: ["Pandas", "NumPy", "Matplotlib", "Power BI", "MySQL", "MongoDB", "Git/GitHub", "Jupyter Notebook"] },
];

export const experience = [
  {
    title: "OCBC Ignite Innovation Challenge",
    role: "Participant",
    period: "Ongoing",
    text: "Building Q AI with team Quadrant for Problem Statement 1, “Trusted AI Agents”.",
  },
  {
    title: "PolyFinTech100 Hackathon",
    role: "Team Leader",
    period: "2026",
    text: "Led planning and development for a polytechnic-wide fintech hackathon, taking the team to the semifinals.",
  },
  {
    title: "International Students' Club, SP",
    role: "Subcommittee Member",
    period: "2025 – Now",
    text: "Help plan and run bonding activities for international students.",
  },
];

export const education = [
  {
    school: "Singapore Polytechnic",
    detail: "Diploma in Applied AI & Analytics",
    period: "Expected 2028",
    notes: ["GPA 3.95 / 4.00", "Machine Learning, Deep Learning, Data Structures & Algorithms, Databases"],
  },
  {
    school: "Cambridge IGCSE",
    detail: "Institute of International Professionalism, Myanmar",
    period: "2024",
    notes: ["7 subjects: 5 A*, 2 A", "A* in Biology, Computer Science, ICT, Mathematics, Physics"],
  },
];

export const certifications = [
  { name: "Fundamentals of Deep Learning", issuer: "NVIDIA Deep Learning Institute", date: "Jul 2026", highlight: true },
  { name: "Generative AI Concepts", issuer: "DataCamp", date: "Jul 2026" },
  { name: "Introduction to Deep Learning with Keras", issuer: "DataCamp", date: "Apr 2026" },
  { name: "Introduction to Data Science in Python", issuer: "DataCamp", date: "Nov 2025" },
  { name: "Supervised Learning with scikit-learn", issuer: "DataCamp", date: "Nov 2025" },
  { name: "Masterclass in Public Speaking", issuer: "Speech Academy Asia", date: "Nov 2025" },
  { name: "Intermediate Python for Developers", issuer: "DataCamp", date: "Oct 2025" },
];

export type Semester = {
  term: string;
  stage: string;
  programme: string;
  gpa: string;
  cumulative: string;
  modules: { code: string; name: string; grade: string; credits: number }[];
};

// From official SP examination results slips (admission number left out on purpose).
export const transcript: Semester[] = [
  {
    term: "AY2025/26 Semester 1",
    stage: "Year 1A",
    programme: "Common Infocomm Technology Programme",
    gpa: "3.91",
    cumulative: "3.91",
    modules: [
      { code: "ST0523", name: "Fundamentals of Programming", grade: "DIST", credits: 5 },
      { code: "ST0501", name: "Front-End Web Development", grade: "A", credits: 5 },
      { code: "ST2413", name: "Fundamentals of Computing", grade: "A", credits: 4 },
      { code: "MS0105", name: "Mathematics", grade: "B+", credits: 4 },
      { code: "CC1001", name: "Thinking Critically about the UN SDGs", grade: "A", credits: 2 },
      { code: "CC1007", name: "Collaboration in the Digital Age", grade: "A", credits: 1 },
      { code: "CC2003", name: "Artificial Intelligence & Its Impact", grade: "A", credits: 1 },
      { code: "CC3005", name: "Problem Solving with Creative and Computational Thinking", grade: "A", credits: 1 },
    ],
  },
  {
    term: "AY2025/26 Semester 2",
    stage: "Year 1B",
    programme: "Diploma in Applied AI & Analytics",
    gpa: "3.94",
    cumulative: "3.93",
    modules: [
      { code: "ST0503", name: "Back-End Web Development", grade: "A", credits: 6 },
      { code: "ST1510", name: "Programming for Data Analytics", grade: "A", credits: 5 },
      { code: "ST1511", name: "AI and Machine Learning", grade: "A", credits: 5 },
      { code: "EP0601", name: "Advanced Mathematics 1", grade: "A", credits: 4 },
      { code: "MS0141", name: "Statistics for Data Science", grade: "A", credits: 3 },
      { code: "CC2002", name: "Data Fluency", grade: "B+", credits: 1 },
      { code: "CC1008", name: "Effective Writing for the Workplace", grade: "B", credits: 1 },
    ],
  },
  {
    term: "AY2026/27 Semester 1",
    stage: "Year 2A",
    programme: "Diploma in Applied AI & Analytics",
    gpa: "4.00",
    cumulative: "3.95",
    modules: [
      { code: "ST1501", name: "Data Engineering", grade: "A", credits: 5 },
      { code: "ST1504", name: "Deep Learning", grade: "A", credits: 5 },
      { code: "ST1507", name: "Data Structures and Algorithms (AI)", grade: "A", credits: 4 },
      { code: "EP0814", name: "Game Environment Creation", grade: "A", credits: 4 },
      { code: "CC3004", name: "Persuasive Communication with Data Storytelling", grade: "A", credits: 2 },
      { code: "CC1009", name: "Personal Branding and Career Agility", grade: "A", credits: 2 },
      { code: "CC1006", name: "Digital Communication for Impact", grade: "A", credits: 1 },
    ],
  },
];

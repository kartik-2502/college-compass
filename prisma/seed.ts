import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { extraColleges, type CollegeSeed } from "./extra-colleges";

const prisma = new PrismaClient();

const colleges: CollegeSeed[] = [
  {
    slug: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    type: "IIT",
    feesPerYear: 230000,
    rating: 4.9,
    established: 1958,
    accreditation: "NAAC A++",
    website: "https://www.iitb.ac.in",
    overview:
      "IIT Bombay is India's premier engineering institute, known for cutting-edge research, strong industry ties, and an entrepreneurial ecosystem. Located in Powai, it consistently ranks among Asia's top technical universities.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 230000, seats: 136 },
      { name: "Electrical Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 230000, seats: 120 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 230000, seats: 110 },
    ],
    placement: { year: 2025, avgPackage: 22.5, highestPackage: 3.67, placementRate: 95.2, topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Qualcomm"] },
    reviews: [
      { authorName: "Arjun M.", rating: 5, title: "World-class exposure", content: "Faculty, labs, and peer group are exceptional. Placements and research opportunities are unmatched." },
      { authorName: "Priya S.", rating: 4.8, title: "Intense but rewarding", content: "Academic rigor is high but the campus culture and alumni network make it worthwhile." },
    ],
  },
  {
    slug: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "IIT",
    feesPerYear: 225000,
    rating: 4.85,
    established: 1961,
    accreditation: "NAAC A++",
    website: "https://home.iitd.ac.in",
    overview:
      "IIT Delhi sits at the heart of the capital with strong programs in engineering, design, and management. Its research parks and startup incubators attract top recruiters nationwide.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 225000, seats: 130 },
      { name: "Mathematics & Computing", degree: "B.Tech", duration: "4 years", feesPerYear: 225000, seats: 45 },
      { name: "Electrical Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 225000, seats: 115 },
    ],
    placement: { year: 2025, avgPackage: 21.8, highestPackage: 2.5, placementRate: 94.5, topRecruiters: ["Amazon", "Apple", "McKinsey", "Uber"] },
    reviews: [
      { authorName: "Rahul K.", rating: 4.9, title: "Excellent placements", content: "Strong CS program with great internship pipeline into product companies." },
    ],
  },
  {
    slug: "iit-madras",
    name: "Indian Institute of Technology Madras",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "IIT",
    feesPerYear: 220000,
    rating: 4.82,
    established: 1959,
    accreditation: "NAAC A++",
    website: "https://www.iitm.ac.in",
    overview:
      "IIT Madras is renowned for research output and innovation, hosting India's first research park. Its interdisciplinary programs bridge engineering with humanities and management.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 220000, seats: 125 },
      { name: "Aerospace Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 220000, seats: 50 },
    ],
    placement: { year: 2025, avgPackage: 20.5, highestPackage: 2.1, placementRate: 93.8, topRecruiters: ["Intel", "Samsung", "Tesla", "Flipkart"] },
    reviews: [
      { authorName: "Meera T.", rating: 4.7, title: "Research-focused campus", content: "Great for students interested in deep tech and startups." },
    ],
  },
  {
    slug: "iit-kanpur",
    name: "Indian Institute of Technology Kanpur",
    city: "Kanpur",
    state: "Uttar Pradesh",
    type: "IIT",
    feesPerYear: 218000,
    rating: 4.78,
    established: 1959,
    accreditation: "NAAC A++",
    website: "https://www.iitk.ac.in",
    overview:
      "IIT Kanpur pioneered computer science education in India and maintains strong programs in aerospace, materials, and economics alongside core engineering.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 218000, seats: 120 },
      { name: "Chemical Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 218000, seats: 90 },
    ],
    placement: { year: 2025, avgPackage: 19.2, highestPackage: 1.8, placementRate: 92.1, topRecruiters: ["DE Shaw", "Oracle", "Adobe", "Texas Instruments"] },
    reviews: [
      { authorName: "Vikram P.", rating: 4.6, title: "Strong academics", content: "Rigorous curriculum with excellent faculty in core engineering branches." },
    ],
  },
  {
    slug: "nit-trichy",
    name: "National Institute of Technology Tiruchirappalli",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    type: "NIT",
    feesPerYear: 165000,
    rating: 4.55,
    established: 1964,
    accreditation: "NAAC A+",
    website: "https://www.nitt.edu",
    overview:
      "NIT Trichy is the top NIT, offering excellent ROI with strong placements in IT, core engineering, and finance. Its sprawling campus supports vibrant student clubs and fests.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 165000, seats: 140 },
      { name: "Electronics & Communication", degree: "B.Tech", duration: "4 years", feesPerYear: 165000, seats: 120 },
    ],
    placement: { year: 2025, avgPackage: 14.2, highestPackage: 62, placementRate: 91.5, topRecruiters: ["Microsoft", "Goldman Sachs", "Cisco", "Infosys"] },
    reviews: [
      { authorName: "Karthik R.", rating: 4.5, title: "Best NIT experience", content: "Great balance of academics, placements, and campus life at a reasonable fee." },
    ],
  },
  {
    slug: "nit-warangal",
    name: "National Institute of Technology Warangal",
    city: "Warangal",
    state: "Telangana",
    type: "NIT",
    feesPerYear: 158000,
    rating: 4.48,
    established: 1959,
    accreditation: "NAAC A+",
    website: "https://www.nitw.ac.in",
    overview:
      "NIT Warangal is among the oldest NITs with a legacy in engineering education. It offers solid placements and affordable fees for students across India.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 158000, seats: 130 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 158000, seats: 100 },
    ],
    placement: { year: 2025, avgPackage: 12.8, highestPackage: 45, placementRate: 89.2, topRecruiters: ["TCS", "Wipro", "Amazon", "Deloitte"] },
    reviews: [
      { authorName: "Sneha L.", rating: 4.4, title: "Value for money", content: "Affordable fees with decent placement stats for CSE and ECE." },
    ],
  },
  {
    slug: "bits-pilani",
    name: "Birla Institute of Technology and Science Pilani",
    city: "Pilani",
    state: "Rajasthan",
    type: "Private",
    feesPerYear: 485000,
    rating: 4.65,
    established: 1964,
    accreditation: "NAAC A++",
    website: "https://www.bits-pilani.ac.in",
    overview:
      "BITS Pilani is a top private deemed university with flexible academic structure, strong industry connections, and campuses in Pilani, Goa, and Hyderabad.",
    courses: [
      { name: "Computer Science", degree: "B.E.", duration: "4 years", feesPerYear: 485000, seats: 180 },
      { name: "Electrical & Electronics", degree: "B.E.", duration: "4 years", feesPerYear: 485000, seats: 120 },
    ],
    placement: { year: 2025, avgPackage: 18.5, highestPackage: 60, placementRate: 93.0, topRecruiters: ["Google", "Microsoft", "Visa", "Barclays"] },
    reviews: [
      { authorName: "Ananya G.", rating: 4.6, title: "Flexible curriculum", content: "Practice school and no attendance policy give great freedom to explore." },
    ],
  },
  {
    slug: "vit-vellore",
    name: "Vellore Institute of Technology",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Private",
    feesPerYear: 198000,
    rating: 4.35,
    established: 1984,
    accreditation: "NAAC A++",
    website: "https://vit.ac.in",
    overview:
      "VIT Vellore is one of India's largest private engineering universities, known for international collaborations, research centers, and a diverse student body.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 198000, seats: 600 },
      { name: "Information Technology", degree: "B.Tech", duration: "4 years", feesPerYear: 198000, seats: 400 },
    ],
    placement: { year: 2025, avgPackage: 8.5, highestPackage: 44, placementRate: 85.0, topRecruiters: ["TCS", "Cognizant", "PayPal", "Myntra"] },
    reviews: [
      { authorName: "Rohan D.", rating: 4.2, title: "Large campus, many opportunities", content: "Competitive environment with good infra but fees can add up with hostel." },
    ],
  },
  {
    slug: "manipal-institute-of-technology",
    name: "Manipal Institute of Technology",
    city: "Manipal",
    state: "Karnataka",
    type: "Private",
    feesPerYear: 420000,
    rating: 4.4,
    established: 1957,
    accreditation: "NAAC A++",
    website: "https://manipal.edu/mit.html",
    overview:
      "MIT Manipal offers a holistic campus experience with strong medical and engineering ecosystems. International exposure and modern labs attract students globally.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 420000, seats: 300 },
      { name: "Biotechnology", degree: "B.Tech", duration: "4 years", feesPerYear: 420000, seats: 120 },
    ],
    placement: { year: 2025, avgPackage: 9.2, highestPackage: 52, placementRate: 87.5, topRecruiters: ["Amazon", "Deloitte", "Siemens", "Capgemini"] },
    reviews: [
      { authorName: "Isha N.", rating: 4.3, title: "Great campus life", content: "Beautiful campus with good faculty-student ratio in select branches." },
    ],
  },
  {
    slug: "dtu-delhi",
    name: "Delhi Technological University",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    feesPerYear: 185000,
    rating: 4.42,
    established: 1941,
    accreditation: "NAAC A",
    website: "https://dtu.ac.in",
    overview:
      "Formerly Delhi College of Engineering, DTU is a top state technical university with affordable fees and strong placements in Delhi NCR's tech corridor.",
    courses: [
      { name: "Computer Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 185000, seats: 180 },
      { name: "Software Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 185000, seats: 60 },
    ],
    placement: { year: 2025, avgPackage: 11.5, highestPackage: 48, placementRate: 88.0, topRecruiters: ["Microsoft", "Adobe", "Zomato", "Directi"] },
    reviews: [
      { authorName: "Amit V.", rating: 4.4, title: "Solid Delhi option", content: "Good ROI for Delhi students with strong alumni in tech startups." },
    ],
  },
  {
    slug: "nsut-delhi",
    name: "Netaji Subhas University of Technology",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    feesPerYear: 175000,
    rating: 4.38,
    established: 1983,
    accreditation: "NAAC A",
    website: "https://nsut.ac.in",
    overview:
      "NSUT (formerly NSIT) is a premier Delhi government engineering university with competitive admissions and consistent placement records in software and core roles.",
    courses: [
      { name: "Computer Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 175000, seats: 200 },
      { name: "Electronics & Communication", degree: "B.Tech", duration: "4 years", feesPerYear: 175000, seats: 150 },
    ],
    placement: { year: 2025, avgPackage: 10.8, highestPackage: 42, placementRate: 86.5, topRecruiters: ["Google", "Samsung", "Sprinklr", "Expedia"] },
    reviews: [
      { authorName: "Neha B.", rating: 4.3, title: "Competitive peer group", content: "JEE-based admission ensures motivated classmates and good coding culture." },
    ],
  },
  {
    slug: "iiit-hyderabad",
    name: "International Institute of Information Technology Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    type: "IIIT",
    feesPerYear: 380000,
    rating: 4.72,
    established: 1998,
    accreditation: "NAAC A++",
    website: "https://www.iiit.ac.in",
    overview:
      "IIIT Hyderabad specializes in computer science and research with dual-degree programs. It's a top choice for students focused on CS, AI, and entrepreneurship.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 380000, seats: 150 },
      { name: "Electronics & Communication", degree: "B.Tech", duration: "4 years", feesPerYear: 380000, seats: 80 },
    ],
    placement: { year: 2025, avgPackage: 24.5, highestPackage: 65, placementRate: 96.0, topRecruiters: ["Google", "Microsoft", "Qualcomm", "Rubrik"] },
    reviews: [
      { authorName: "Siddharth A.", rating: 4.8, title: "CS powerhouse", content: "Among the best CS programs outside IITs with incredible research labs." },
    ],
  },
  {
    slug: "iisc-bangalore",
    name: "Indian Institute of Science Bangalore",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Research Institute",
    feesPerYear: 210000,
    rating: 4.88,
    established: 1909,
    accreditation: "NAAC A++",
    website: "https://iisc.ac.in",
    overview:
      "IISc Bangalore is India's leading research institution, offering undergraduate programs with deep research immersion and ties to Bengaluru's tech ecosystem.",
    courses: [
      { name: "Bachelor of Science (Research)", degree: "BS", duration: "4 years", feesPerYear: 210000, seats: 120 },
      { name: "Mathematics", degree: "BS", duration: "4 years", feesPerYear: 210000, seats: 30 },
    ],
    placement: { year: 2025, avgPackage: 18.0, highestPackage: 55, placementRate: 90.0, topRecruiters: ["Google", "Intel", "ISRO", "DRDO"] },
    reviews: [
      { authorName: "Deepak H.", rating: 4.9, title: "Research paradise", content: "Ideal for students who want research-first education with industry options." },
    ],
  },
  {
    slug: "jnu-delhi",
    name: "Jawaharlal Nehru University",
    city: "New Delhi",
    state: "Delhi",
    type: "Central University",
    feesPerYear: 45000,
    rating: 4.5,
    established: 1969,
    accreditation: "NAAC A++",
    website: "https://www.jnu.ac.in",
    overview:
      "JNU is renowned for humanities, social sciences, and sciences with one of India's lowest fee structures. Its School of Engineering offers emerging tech programs.",
    courses: [
      { name: "Computer Science", degree: "M.Tech", duration: "2 years", feesPerYear: 45000, seats: 40 },
      { name: "Data Analytics", degree: "M.Sc", duration: "2 years", feesPerYear: 45000, seats: 30 },
    ],
    placement: { year: 2025, avgPackage: 7.5, highestPackage: 18, placementRate: 72.0, topRecruiters: ["UN Agencies", "Think Tanks", "Startups", "NGOs"] },
    reviews: [
      { authorName: "Fatima Z.", rating: 4.6, title: "Intellectual environment", content: "Unmatched for interdisciplinary learning at minimal cost." },
    ],
  },
  {
    slug: "srm-institute",
    name: "SRM Institute of Science and Technology",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Private",
    feesPerYear: 250000,
    rating: 4.15,
    established: 1985,
    accreditation: "NAAC A++",
    website: "https://www.srmist.edu.in",
    overview:
      "SRM Chennai is a large multi-disciplinary private university with international tie-ups, modern infrastructure, and broad program offerings across engineering and health sciences.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 250000, seats: 500 },
      { name: "Artificial Intelligence", degree: "B.Tech", duration: "4 years", feesPerYear: 250000, seats: 180 },
    ],
    placement: { year: 2025, avgPackage: 6.5, highestPackage: 35, placementRate: 80.0, topRecruiters: ["Infosys", "Wipro", "TCS", "Accenture"] },
    reviews: [
      { authorName: "Harish C.", rating: 4.0, title: "Wide options", content: "Many specializations available; research quality varies by department." },
    ],
  },
  {
    slug: "amity-university-noida",
    name: "Amity University Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    type: "Private",
    feesPerYear: 320000,
    rating: 4.05,
    established: 2005,
    accreditation: "NAAC A+",
    website: "https://www.amity.edu",
    overview:
      "Amity Noida offers a corporate-oriented campus with global partnerships, extensive facilities, and programs spanning engineering, law, and business.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 320000, seats: 400 },
      { name: "Cyber Security", degree: "B.Tech", duration: "4 years", feesPerYear: 320000, seats: 120 },
    ],
    placement: { year: 2025, avgPackage: 5.8, highestPackage: 28, placementRate: 78.0, topRecruiters: ["IBM", "HCL", "Genpact", "KPMG"] },
    reviews: [
      { authorName: "Kavya J.", rating: 3.9, title: "Corporate campus", content: "Good infrastructure and events; verify department-specific placement data." },
    ],
  },
  {
    slug: "christ-university-bangalore",
    name: "Christ University",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Private",
    feesPerYear: 280000,
    rating: 4.25,
    established: 1969,
    accreditation: "NAAC A+",
    website: "https://christuniversity.in",
    overview:
      "Christ University blends liberal arts with professional programs in Bengaluru. Its engineering school emphasizes ethics, communication, and industry readiness.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 280000, seats: 180 },
      { name: "Data Science", degree: "B.Tech", duration: "4 years", feesPerYear: 280000, seats: 60 },
    ],
    placement: { year: 2025, avgPackage: 7.2, highestPackage: 32, placementRate: 82.0, topRecruiters: ["Deloitte", "EY", "Infosys", "Startups"] },
    reviews: [
      { authorName: "Maria P.", rating: 4.2, title: "Holistic education", content: "Strong emphasis on soft skills alongside technical training." },
    ],
  },
  {
    slug: "anna-university-chennai",
    name: "Anna University",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Government",
    feesPerYear: 95000,
    rating: 4.3,
    established: 1978,
    accreditation: "NAAC A",
    website: "https://www.annauniv.edu",
    overview:
      "Anna University is Tamil Nadu's flagship technical university, affiliating hundreds of colleges while running premier campus programs at CEG, MIT campus.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.E.", duration: "4 years", feesPerYear: 95000, seats: 120 },
      { name: "Information Technology", degree: "B.E.", duration: "4 years", feesPerYear: 95000, seats: 100 },
    ],
    placement: { year: 2025, avgPackage: 8.0, highestPackage: 38, placementRate: 84.0, topRecruiters: ["TCS", "Zoho", "Freshworks", "Cognizant"] },
    reviews: [
      { authorName: "Tamilselvan R.", rating: 4.3, title: "Affordable and respected", content: "CEG campus offers excellent value with strong regional recruiter network." },
    ],
  },
  {
    slug: "jadavpur-university",
    name: "Jadavpur University",
    city: "Kolkata",
    state: "West Bengal",
    type: "Government",
    feesPerYear: 12000,
    rating: 4.52,
    established: 1955,
    accreditation: "NAAC A++",
    website: "https://www.jaduniv.edu.in",
    overview:
      "Jadavpur University is West Bengal's premier institution with remarkably low fees and strong engineering, arts, and science programs with deep cultural roots.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.E.", duration: "4 years", feesPerYear: 12000, seats: 60 },
      { name: "Electrical Engineering", degree: "B.E.", duration: "4 years", feesPerYear: 12000, seats: 60 },
    ],
    placement: { year: 2025, avgPackage: 9.5, highestPackage: 40, placementRate: 85.0, topRecruiters: ["Amazon", "PWC", "TCS", "Startups"] },
    reviews: [
      { authorName: "Subhash B.", rating: 4.7, title: "Best ROI in India", content: "Incredible education at almost no cost; highly competitive admissions." },
    ],
  },
  {
    slug: "iit-roorkee",
    name: "Indian Institute of Technology Roorkee",
    city: "Roorkee",
    state: "Uttarakhand",
    type: "IIT",
    feesPerYear: 215000,
    rating: 4.75,
    established: 1847,
    accreditation: "NAAC A++",
    website: "https://www.iitr.ac.in",
    overview:
      "IIT Roorkee is one of the oldest technical institutions in Asia, excelling in civil, earthquake engineering, and hydrology alongside modern CS programs.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 215000, seats: 115 },
      { name: "Civil Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 215000, seats: 100 },
    ],
    placement: { year: 2025, avgPackage: 18.5, highestPackage: 1.5, placementRate: 91.0, topRecruiters: ["Microsoft", "Shell", "L&T", "Google"] },
    reviews: [
      { authorName: "Naveen S.", rating: 4.6, title: "Heritage plus modern labs", content: "Beautiful campus with strong core engineering legacy." },
    ],
  },
  {
    slug: "iit-kharagpur",
    name: "Indian Institute of Technology Kharagpur",
    city: "Kharagpur",
    state: "West Bengal",
    type: "IIT",
    feesPerYear: 218000,
    rating: 4.76,
    established: 1951,
    accreditation: "NAAC A++",
    website: "https://www.iitkgp.ac.in",
    overview:
      "IIT Kharagpur is the first IIT with the largest campus. It offers diverse programs including law, management, and medical sciences alongside engineering.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 218000, seats: 130 },
      { name: "Industrial Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 218000, seats: 70 },
    ],
    placement: { year: 2025, avgPackage: 19.0, highestPackage: 2.0, placementRate: 92.5, topRecruiters: ["Google", "Microsoft", "ITC", "BCG"] },
    reviews: [
      { authorName: "Ankit Y.", rating: 4.7, title: "Massive campus life", content: "Unmatched fest culture and alumni network across industries." },
    ],
  },
  {
    slug: "iit-guwahati",
    name: "Indian Institute of Technology Guwahati",
    city: "Guwahati",
    state: "Assam",
    type: "IIT",
    feesPerYear: 212000,
    rating: 4.7,
    established: 1994,
    accreditation: "NAAC A++",
    website: "https://www.iitg.ac.in",
    overview:
      "IIT Guwahati sits in a scenic Brahmaputra-side campus with growing research in design, biosciences, and data science for Northeast India.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 212000, seats: 100 },
      { name: "Design", degree: "B.Des", duration: "4 years", feesPerYear: 212000, seats: 40 },
    ],
    placement: { year: 2025, avgPackage: 17.5, highestPackage: 1.2, placementRate: 90.5, topRecruiters: ["Amazon", "Qualcomm", "Rivigo", "Ola"] },
    reviews: [
      { authorName: "Bikash D.", rating: 4.5, title: "Growing fast", content: "Improving placements and infrastructure year over year." },
    ],
  },
  {
    slug: "nit-karnataka",
    name: "National Institute of Technology Karnataka",
    city: "Surathkal",
    state: "Karnataka",
    type: "NIT",
    feesPerYear: 162000,
    rating: 4.5,
    established: 1960,
    accreditation: "NAAC A+",
    website: "https://nitk.ac.in",
    overview:
      "NIT Karnataka (Surathkal) benefits from proximity to Bengaluru's tech hub with strong CS placements and a coastal campus environment.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 162000, seats: 135 },
      { name: "Information Technology", degree: "B.Tech", duration: "4 years", feesPerYear: 162000, seats: 90 },
    ],
    placement: { year: 2025, avgPackage: 13.5, highestPackage: 50, placementRate: 90.0, topRecruiters: ["Microsoft", "Oracle", "Intuit", "MediaTek"] },
    reviews: [
      { authorName: "Sanjay M.", rating: 4.5, title: "Strong CS culture", content: "Coding clubs and hackathon culture rival many IITs." },
    ],
  },
  {
    slug: "nit-calicut",
    name: "National Institute of Technology Calicut",
    city: "Calicut",
    state: "Kerala",
    type: "NIT",
    feesPerYear: 155000,
    rating: 4.43,
    established: 1961,
    accreditation: "NAAC A+",
    website: "https://nitc.ac.in",
    overview:
      "NIT Calicut is Kerala's top NIT with respected architecture and engineering programs and steady placement growth in software roles.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 155000, seats: 125 },
      { name: "Electrical & Electronics", degree: "B.Tech", duration: "4 years", feesPerYear: 155000, seats: 100 },
    ],
    placement: { year: 2025, avgPackage: 12.0, highestPackage: 42, placementRate: 88.5, topRecruiters: ["TCS", "Infosys", "UST", "Samsung"] },
    reviews: [
      { authorName: "Aisha K.", rating: 4.3, title: "Peaceful campus", content: "Good academics with beautiful Kerala setting." },
    ],
  },
  {
    slug: "thapar-institute",
    name: "Thapar Institute of Engineering and Technology",
    city: "Patiala",
    state: "Punjab",
    type: "Private",
    feesPerYear: 410000,
    rating: 4.35,
    established: 1956,
    accreditation: "NAAC A+",
    website: "https://www.thapar.edu",
    overview:
      "Thapar Institute is a legacy private engineering college in Punjab with strong industry linkages and consistent placement records in North India.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.E.", duration: "4 years", feesPerYear: 410000, seats: 240 },
      { name: "Mechanical Engineering", degree: "B.E.", duration: "4 years", feesPerYear: 410000, seats: 120 },
    ],
    placement: { year: 2025, avgPackage: 10.5, highestPackage: 45, placementRate: 86.0, topRecruiters: ["Microsoft", "Mahindra", "Hero", "Capgemini"] },
    reviews: [
      { authorName: "Gurpreet S.", rating: 4.2, title: "Reliable choice in Punjab", content: "Established brand with good campus facilities." },
    ],
  },
  {
    slug: "pes-university",
    name: "PES University",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Private",
    feesPerYear: 350000,
    rating: 4.28,
    established: 1972,
    accreditation: "NAAC A",
    website: "https://pes.edu",
    overview:
      "PES University is a Bengaluru-based institution leveraging city startup ecosystem for internships and placements in product companies.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 350000, seats: 300 },
      { name: "Artificial Intelligence & Machine Learning", degree: "B.Tech", duration: "4 years", feesPerYear: 350000, seats: 120 },
    ],
    placement: { year: 2025, avgPackage: 8.8, highestPackage: 40, placementRate: 83.0, topRecruiters: ["Infosys", "Swiggy", "PhonePe", "Razorpay"] },
    reviews: [
      { authorName: "Varun K.", rating: 4.1, title: "Startup proximity helps", content: "Good for internships at Bengaluru startups during semesters." },
    ],
  },
  {
    slug: "coep-pune",
    name: "College of Engineering Pune",
    city: "Pune",
    state: "Maharashtra",
    type: "Government",
    feesPerYear: 85000,
    rating: 4.45,
    established: 1854,
    accreditation: "NAAC A",
    website: "https://www.coep.org.in",
    overview:
      "COEP is one of India's oldest engineering colleges with autonomous status, affordable fees, and strong regional industry connections in Pune.",
    courses: [
      { name: "Computer Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 85000, seats: 120 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 85000, seats: 100 },
    ],
    placement: { year: 2025, avgPackage: 9.8, highestPackage: 36, placementRate: 87.0, topRecruiters: ["TCS", "Bajaj", "Persistent", "Siemens"] },
    reviews: [
      { authorName: "Aditi W.", rating: 4.5, title: "Historic and affordable", content: "MHT-CET gem with strong mechanical and CS outcomes." },
    ],
  },
  {
    slug: "ld-college-ahmedabad",
    name: "LD College of Engineering",
    city: "Ahmedabad",
    state: "Gujarat",
    type: "Government",
    feesPerYear: 15000,
    rating: 4.32,
    established: 1948,
    accreditation: "NAAC A",
    website: "https://www.ldce.ac.in",
    overview:
      "LDCE Ahmedabad is Gujarat's premier government engineering college with extremely low fees and solid placements in manufacturing and IT sectors.",
    courses: [
      { name: "Computer Engineering", degree: "B.E.", duration: "4 years", feesPerYear: 15000, seats: 120 },
      { name: "Information Technology", degree: "B.E.", duration: "4 years", feesPerYear: 15000, seats: 60 },
    ],
    placement: { year: 2025, avgPackage: 7.5, highestPackage: 30, placementRate: 82.0, topRecruiters: ["TCS", "Adani", "Zydus", "Startups"] },
    reviews: [
      { authorName: "Harsh P.", rating: 4.4, title: "Gujarat's best value", content: "Minimal fees with respectable placement stats for Gujarat students." },
    ],
  },
  {
    slug: "iit-bhu",
    name: "Indian Institute of Technology (BHU) Varanasi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    type: "IIT",
    feesPerYear: 210000,
    rating: 4.68,
    established: 1919,
    accreditation: "NAAC A++",
    website: "https://www.iitbhu.ac.in",
    overview:
      "IIT BHU combines IIT status with Banaras Hindu University's heritage, offering strong programs in chemical, ceramic, and computer engineering.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 210000, seats: 110 },
      { name: "Ceramic Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 210000, seats: 50 },
    ],
    placement: { year: 2025, avgPackage: 17.0, highestPackage: 1.1, placementRate: 89.5, topRecruiters: ["Microsoft", "Goldman Sachs", "Samsung", "Flipkart"] },
    reviews: [
      { authorName: "Ritesh O.", rating: 4.5, title: "Unique campus blend", content: "IIT rigor within BHU's massive multidisciplinary campus." },
    ],
  },
  {
    slug: "iit-hyderabad",
    name: "Indian Institute of Technology Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    type: "IIT",
    feesPerYear: 216000,
    rating: 4.74,
    established: 2008,
    accreditation: "NAAC A++",
    website: "https://www.iith.ac.in",
    overview:
      "IIT Hyderabad is a young IIT with modern architecture and rapid rise in rankings, strong in AI, materials, and design innovation.",
    courses: [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 216000, seats: 90 },
      { name: "Artificial Intelligence", degree: "B.Tech", duration: "4 years", feesPerYear: 216000, seats: 40 },
    ],
    placement: { year: 2025, avgPackage: 20.0, highestPackage: 1.6, placementRate: 93.0, topRecruiters: ["Google", "Apple", "NVIDIA", "Qualcomm"] },
    reviews: [
      { authorName: "Lakshmi V.", rating: 4.7, title: "Modern IIT", content: "Beautiful campus with fast-growing research in AI and robotics." },
    ],
  },
  ...extraColleges,
];

async function main() {
  console.log("Seeding database...");

  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.savedComparison.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("demo1234", 12);

  const demoUser = await prisma.user.create({
    data: {
      email: "demo@collegecompass.in",
      name: "Demo Student",
      passwordHash,
    },
  });

  for (const college of colleges) {
    await prisma.college.create({
      data: {
        slug: college.slug,
        name: college.name,
        city: college.city,
        state: college.state,
        type: college.type,
        feesPerYear: college.feesPerYear,
        rating: college.rating,
        overview: college.overview,
        established: college.established,
        accreditation: college.accreditation,
        website: college.website,
        courses: {
          create: college.courses,
        },
        placements: {
          create: {
            ...college.placement,
            topRecruiters: JSON.stringify(college.placement.topRecruiters),
          },
        },
        reviews: {
          create: college.reviews,
        },
      },
    });
  }

  const iitBombay = await prisma.college.findUnique({ where: { slug: "iit-bombay" } });
  const iiitHyd = await prisma.college.findUnique({ where: { slug: "iiit-hyderabad" } });

  if (iitBombay && iiitHyd) {
    await prisma.savedCollege.create({
      data: { userId: demoUser.id, collegeId: iitBombay.id },
    });
    await prisma.savedComparison.create({
      data: {
        userId: demoUser.id,
        name: "Top CS Institutes",
        collegeIds: JSON.stringify([iitBombay.id, iiitHyd.id]),
      },
    });
  }

  console.log(`Seeded ${colleges.length} colleges and demo user (demo@collegecompass.in / demo1234)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

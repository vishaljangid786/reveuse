import {
  faHome,
  faCogs,
  faInfoCircle,
  faBlog,
  faEnvelope,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import img1 from "./home-slider1.jpg";
import img2 from "./home-slider2.jpg";
import img3 from "./home-slider3.jpg";

export {
  img1,
  img2,
  img3
}

export const navLinks = [
  { icon: faHome, label: "Home", link: "/" },
  { icon: faCogs, label: "Services", link: "/services" },
  { icon: faInfoCircle, label: "About Us", link: "/about" },
  { icon: faBlog, label: "Blog", link: "/blog" },
  { icon: faEnvelope, label: "Contact Us", link: "/contact" },
];

export const services = [
  {
    title: "Merchant Cash Advance",
    image: img1,
  },
  {
    title: "Outsource to India",
    image: img2,
  },
  {
    title: "Virtual Employee Services",
    image: img3,
  },
  {
    title: "Data Services",
    image: img3,
  },
  {
    title: "Campaign",
    image: img1,
  },
  {
    title: "Third Party Service Provider",
    image: img3,
  },
  {
    title: "Bussiness Process Outsourcing",
    image: img1,
  },
];

export const images = [
  {
    src: img1,
    title: "SOLVE. DELIVER. EXCEL. Every Time.",
    desc: "Our Consulting and Outsourcing services align with your goals. Driving success, sustaining growth.",
  },
  { src: img2, title: "Slide 2", desc: "Second slide description" },
  { src: img3, title: "Slide 3", desc: "Third slide description" },
];

export const faqs = [
  {
    question: "What services does Reveuse Solution specialize in?",
    answer:
      "We excel in providing comprehensive Business Process Outsourcing (BPO), Knowledge Process Outsourcing (KPO), and specialized underwriting support services, tailored to meet the diverse needs of various industries.",
  },
  {
    question:
      "What security measures does Reveuse Solution implement to protect client data?",
    answer:
      "Our security protocols integrate industry-leading standards and custom solutions, including a range of physical and network security safeguards, including: VPN, SSL, and PGP encryption.",
  },
  {
    question: "Does Reveuse Solution offer customized outsourcing solutions?",
    answer:
      "Yes, We deliver bespoke solutions that cater to the unique requirements of each client, ensuring a customized approach for every project.",
  },
  {
    question: "How does Reveuse  Solution ensure data accuracy?",
    answer:
      "We maintain exceptionally high data accuracy standards, achieving 99.5% to 100% accuracy through robust quality control measures. Our rigorous processes include dual-entry verification, thorough quality assurance, and real-time monitoring to ensure data integrity.",
  },
  {
    question: "What industries does Reveuse Solution serve?",
    answer:
      "We serve a diverse range of industries, including telecommunications, insurance, healthcare, and more, with specialized services tailored to each sector's unique needs.",
  },
];
export const imagesCompanies =[
  img1,
  img2,
  img3
]
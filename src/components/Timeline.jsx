import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const timeline = [
  {
    year: '2026',
    title: 'Began ML Research',
    place: 'Independent Research · Manipal University Jaipur',
    description: 'Started investigating compression strategies for vision-language models — CLIP, BLIP, and LLaVA-1.5. What began as curiosity about why powerful models can\'t run on normal hardware turned into a systematic study involving structured pruning, INT8 quantization, and knowledge distillation. Week 2 baselines are locked. Still in the trenches.',
  },
  {
    year: '2026',
    title: 'Launched Sequence Alignment Engine',
    place: 'Personal Project · lotm-quiz.vercel.app',
    description: 'Built a full-stack personality quiz for Lord of the Mysteries fans — React frontend, Express + MongoDB backend, weighted scoring matrix across 8 Beyonder Pathways, and live global distribution stats. First time I shipped something with a real backend, a database, and users I didn\'t know personally.',
  },
  {
    year: '2025',
    title: 'Head of Research & Development',
    place: 'IEEE CIS MUJ · Jaipur, India',
    description: 'Taking on the R&D lead role at IEEE CIS is what pulled me properly into research. Leading a team to explore new technological opportunities meant I had to go deeper than just building projects — I had to understand what was actually being worked on at the frontier. That exposure is directly what led to the model compression study and the shift from building applications to asking research questions.',
  },
  {
    year: '2025',
    title: 'Data Analytics Extern',
    place: 'Extern · Remote',
    description: 'Working on exploratory data analysis to identify consumer behavior trends, applying NLP techniques for sentiment analysis on large-scale datasets, and translating findings into actionable product insights. First experience collaborating with cross-functional teams in a professional research context.',
  },
  {
    year: '2025',
    title: 'System Design Intern',
    place: 'Metapercept · Pune, India',
    description: 'Engineered a web crawler respecting robots.txt protocols, using Selenium and BeautifulSoup to extract PDFs and XML files at scale. Built a database pipeline for the extracted data and trained an AI model on it, then standardized it against ISO specifications. First time taking something from raw data collection all the way to a compliant, deployed model.',
  },
  {
    year: '2025',
    title: 'Built NyayaMitra — AI Legal Advisor',
    place: 'Personal Project',
    description: 'Built a full RAG pipeline over 600,000+ Indian court cases and IPC statutes. First time going from "I understand how RAG works" to actually making it work — hybrid FAISS + BM25 retrieval, intent classification, four query modes, and citations on every response. Learned that making AI useful in a high-stakes domain is a completely different problem from making it work in a notebook.',
  },
  {
    year: '2024',
    title: 'Started College',
    place: 'Manipal University Jaipur, India',
    description: 'My journey started at Manipal University Jaipur, where I wrote my first line of code and realized this was more than just a subject — it was something I wanted to master. What began as curiosity quickly turned into late-night debugging sessions, small projects, and a growing obsession with building things that actually work. Every bug fixed and every concept understood shaped the way I think today.',
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="timeline-section" id="experience" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        06 — Experience
      </motion.div>

      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        My Journey
      </motion.h2>

      <div className="timeline">
        <div className="timeline-line" />
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="timeline-dot">
              <div className="timeline-dot-inner" />
            </div>
            <div className="timeline-body">
              <span className="timeline-year">{item.year}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <span className="timeline-place">{item.place}</span>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

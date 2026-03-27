import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const projectsData = [
  {
    id: 'ai-legal-advisor',
    title: 'AI Legal Advisor',
    tag: 'AI / Full Stack',
    year: '2025',
    description: 'A RAG-powered legal assistant that answers questions from uploaded documents, summarizes contracts, and provides general legal guidance — built specifically for Indian law.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'FAISS', 'React'],
    liveLink: '#',
    githubLink: 'https://github.com/Pranshu-Singh04/Ai_Legal_Advisor',
    previewBg: 'linear-gradient(135deg, #0f4c75 0%, #00b4d8 100%)',
    previewEmoji: '⚖️',
    previewLabel: 'Legal AI Assistant',
    overview: 'AI Legal Advisor makes legal knowledge accessible to people who cannot afford a lawyer. It uses a Retrieval-Augmented Generation (RAG) pipeline to answer legal queries grounded in actual documents — not hallucinated responses. Built specifically with Indian law in mind, it handles IPC sections, contract clauses, tenancy disputes, and general legal Q&A through a conversational interface.',
    features: [
      'Upload any legal document (PDF/text) and ask questions directly — the RAG pipeline retrieves the most relevant chunks before generating an answer, ensuring every response is grounded in source material',
      'General legal advice chat covering Indian Penal Code (IPC) sections, consumer rights, tenancy law, and employment law — no document upload required',
      'Contract & agreement summarization — paste or upload a contract and get a plain-English breakdown of key clauses, obligations, and red flags',
      'Source citation on every response — the system tells you exactly which section of which document the answer comes from so you can verify it',
      'Conversational multi-turn interface with memory, so follow-up questions build on previous context without losing thread',
    ],
    challenges: 'The core problem with LLMs and legal content is hallucination — a model confidently citing a law that does not exist is worse than saying nothing. The solution was a strict RAG architecture where every answer must be derived from retrieved document chunks. If no relevant chunk is found, the model says so rather than fabricate. Embedding quality was also critical — legal language is dense and technical, so domain-appropriate sentence transformers were used over generic embeddings.',
    docs: 'Full documentation available in the GitHub repository README.',
  },
  {
  id: 'model-compression',
  title: 'Compressing Vision-Language Models',
  tag: 'Research · Ongoing',
  year: '2025',
  description: 'Ongoing research into compressing CLIP, BLIP, and LLaVA using pruning, quantization, and knowledge distillation — targeting deployment on resource-constrained and edge devices.',
  tech: ['Python', 'PyTorch', 'Hugging Face', 'CLIP', 'BLIP', 'LLaVA', 'ONNX Runtime'],
  liveLink: '#',
  githubLink: 'https://github.com/Pranshu-Singh04/compression-multimodal-study',
  previewBg: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)',
  previewEmoji: '🧠',
  previewLabel: 'ML Research',
  overview: 'This research investigates the feasibility of deploying large multimodal vision-language models — specifically CLIP, BLIP, and LLaVA — on resource-constrained hardware through a combined compression strategy of structured pruning, post-training quantization, and knowledge distillation. The goal is to make powerful VLMs deployable in edge and offline AI systems without prohibitive accuracy loss.',
  features: [
    'Structured pruning — removes entire attention heads and feed-forward neurons based on magnitude and gradient sensitivity, producing architecturally smaller models (not just sparse ones)',
    'Post-training quantization — reduces weight precision from FP32/FP16 to INT8 using calibration datasets, shrinking memory footprint and improving inference speed on compatible hardware',
    'Knowledge distillation — trains a smaller student model to replicate the behaviour of the full-size teacher, preserving semantic alignment across vision and language modalities',
    'All three techniques benchmarked on CLIP, BLIP, and LLaVA across identical compression pipelines for fair comparison',
    'Preliminary results: ~60–70% parameter reduction with under 3% accuracy drop on classification tasks using pruning + INT8 quantization combined',
  ],
  challenges: 'Multimodal architectures are harder to compress than single-modality models because you are simultaneously compressing a vision encoder, a language model, and a cross-modal alignment layer — and degradation in any one component compounds across the others. Calibrating how much to prune each sub-module independently, rather than uniformly, was the key insight that improved results significantly.',
  docs: 'Research in progress. Draft and results will be linked here upon completion.',
  },
  {
    id: 'lotm-quiz',
    title: 'LOTM Pathway Quiz',
    tag: 'Web App',
    year: '2025',
    description: 'A psychology-backed personality quiz that matches you to a Beyonder Pathway from Lord of the Mysteries — think Sorting Hat, but built on actual personality psychology and weighted scoring.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    liveLink: '#',
    githubLink: 'https://github.com/Pranshu-Singh04/lotm-quiz',
    previewBg: 'linear-gradient(135deg, #1a0533 0%, #6d28d9 100%)',
    previewEmoji: '🔮',
    previewLabel: 'Pathway Matcher',
    overview: 'A personality quiz for fans of Lord of the Mysteries that determines which Beyonder Pathway you belong to. Each answer maps to personality dimensions that correspond to the nature of each Pathway — so your result feels earned rather than random. The question design draws from Big Five personality psychology, mapping traits like openness, conscientiousness, and dominance to the thematic nature of each of the 22 Pathways.',
    features: [
      'Psychology-backed question design — each question maps to personality axes (order vs chaos, logic vs intuition, will vs emotion) that correspond to the thematic nature of each of the 22 LOTM Pathways',
      'Weighted scoring system — answers shift your affinity across multiple Pathways simultaneously, making results nuanced rather than a simple point-bucket system',
      'Rich result screen — your matched Pathway comes with a full description of its nature, notable Sequences, famous characters who walk it, and why it suits your personality profile',
      'Smooth animated transitions between questions for a polished, immersive feel',
      'Fully responsive — works on mobile without layout breakage',
    ],
    challenges: 'The hardest part was the scoring architecture. Simple "add points to a bucket" systems produce boring, predictable results. Instead, each answer carries a weight vector across all Pathways — so consistent answers land where they should, but mixed answers produce genuinely interesting results. Question writing also took iteration; questions had to feel lore-authentic, not like generic personality test filler.',
    docs: 'Full documentation available in the GitHub repository README.',
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();
  const project = projectsData[active];

  const prev = () => setActive(i => (i - 1 + projectsData.length) % projectsData.length);
  const next = () => setActive(i => (i + 1) % projectsData.length);

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        03 — Projects
      </motion.div>

      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Things I've Built
      </motion.h2>

      <div className="project-dots">
        {projectsData.map((_, i) => (
          <button key={i} className={`project-dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} />
        ))}
      </div>

      {/* Carousel row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button className="carousel-arrow" onClick={prev}>‹</button>

        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center' }}
            >
              {/* Text — left */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.9rem', minWidth: 0 }}>
                <div className="project-card-header">
                  <span className="project-tag">{project.tag}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech-row">
                  {project.tech.map(t => <span key={t} className="project-tech-tag">{t}</span>)}
                </div>
                <div className="project-card-footer">
                  <a href={project.liveLink} className="project-link-btn">Live Demo ↗</a>
                  <button className="project-details-btn" onClick={() => navigate(`/project/${project.id}`)}>
                    Full Details →
                  </button>
                </div>
              </div>

              {/* Preview image — right, inside card */}
              <div style={{
                width: '220px',
                height: '100%',
                minHeight: '200px',
                flexShrink: 0,
                borderRadius: '12px',
                background: project.previewBg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                alignSelf: 'stretch',
              }}>
                {/* Grid overlay */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
                  {[0,1,2,3].map(i => <line key={`v${i}`} x1={`${i*33}%`} y1="0" x2={`${i*33}%`} y2="100%" stroke="white" strokeWidth="0.5" />)}
                  {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={`${i*25}%`} x2="100%" y2={`${i*25}%`} stroke="white" strokeWidth="0.5" />)}
                </svg>
                {/*
                  Replace emoji with screenshot:
                  <img src={`/screenshots/${project.id}.png`} alt={project.title}
                    style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', borderRadius:'12px' }} />
                */}
                <div style={{ fontSize: '2.8rem', position: 'relative', zIndex: 1 }}>{project.previewEmoji}</div>
                <div style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
                  color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em',
                  textTransform: 'uppercase', position: 'relative', zIndex: 1,
                  textAlign: 'center', padding: '0 0.75rem',
                }}>
                  {project.previewLabel}
                </div>
                <div style={{
                  position: 'absolute', bottom: '10px', right: '10px',
                  fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
                  color: 'rgba(255,255,255,0.45)', background: 'rgba(0,0,0,0.25)',
                  padding: '3px 7px', borderRadius: '4px', zIndex: 1,
                }}>
                  {project.year}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="carousel-arrow" onClick={next}>›</button>
      </div>

      <div className="project-progress" style={{ marginTop: '1.5rem' }}>
        <div className="project-progress-fill" style={{ width: `${((active + 1) / projectsData.length) * 100}%` }} />
      </div>
      <p className="project-counter">{active + 1} / {projectsData.length}</p>
    </section>
  );
}

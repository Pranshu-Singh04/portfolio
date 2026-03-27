import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const projectsData = [
  // ============================================================
  // PROJECT 1 — AI LEGAL ADVISOR (NyayaMitra)
  // ============================================================
  {
    id: 'ai-legal-advisor',
    title: 'NyayaMitra — AI Legal Advisor',
    tag: 'AI / Full Stack',
    year: '2025',
    description: 'A RAG-powered legal assistant built for Indian law. Combines hybrid dense + sparse retrieval over 600,000+ court cases and IPC statutes to answer legal questions, predict judgment outcomes, summarise case law, and explain statute sections — with source citations on every response.',
    tech: ['Python', 'Rag Pipeline', 'LLM-Agnostic Retrieval System','LangChain', 'FAISS', 'FastAPI', 'E5-large', 'BM25', 'Gemini API', 'React'],
    liveLink: '#',
    githubLink: '#',
    previewBg: 'linear-gradient(135deg, #0f4c75 0%, #00b4d8 100%)',
    previewEmoji: '⚖️',
    previewLabel: 'Legal AI Assistant',
 
    overview: 'NyayaMitra is a full-stack AI legal advisor built specifically for the Indian legal system. It runs a hybrid retrieval pipeline over 600,000+ court cases (NyayaAnumana dataset) and Indian statutes including the IPC and BNS 2023 — giving answers that are always grounded in real case law and legislation, never hallucinated. It supports four distinct query modes: Legal Q&A, Judgment Prediction, Statute Lookup, and Case Summarisation.',
 
    features: [
      'Hybrid retriever combining FAISS dense search (E5-large embeddings for semantic similarity) with BM25 sparse search (keyword matching), fused via Reciprocal Rank Fusion — consistently outperforms either method alone',
      'Four specialised query modes: Legal Q&A (answer with citations), Legal Judgment Prediction (ALLOWED/DISMISSED + confidence + reasoning from case facts), Statute Lookup (full IPC/BNS provision + plain English explanation), and Case Summarisation (FACTS / ISSUES / HELD / RATIO)',
      'Intent classifier automatically detects query type and routes to the right prompt template — no manual mode selection needed',
      'Model-agnostic LLM layer supporting INLegalBERT, Gemini API, and GPT-3.5 — swap models for benchmarking without changing any other code',
      'Full source citation on every response — the system returns which specific case or statute section each answer came from, so users can verify independently',
      'Covers Indian Penal Code, Bharatiya Nyaya Sanhita 2023, Constitution of India, and 600,000+ Supreme Court and High Court judgments',
    ],
 
    challenges: 'The core danger with LLMs in legal contexts is confident hallucination — a model inventing a section number or case name is worse than saying nothing. The solution was a strict RAG architecture where the LLM is only permitted to generate answers from retrieved document chunks; if no relevant chunk is found above threshold, the system says so. The second hard problem was retrieval quality: legal language is highly technical and keyword-heavy, which is why pure dense retrieval underperformed — adding BM25 sparse search and fusing via RRF was the key insight. Embedding quality was also critical; domain-appropriate E5-large embeddings significantly outperformed general-purpose ones on legal terminology.',
 
    docs: 'Full pipeline documentation across 5 phases in the GitHub repository. Phase 3 README covers the full RAG pipeline setup and all run commands.',
  },
 
  // ============================================================
  // PROJECT 2 — LOTM PATHWAY QUIZ (Sequence Alignment Engine)
  // ============================================================
  {
    id: 'lotm-quiz',
    title: 'Sequence Alignment Engine',
    tag: 'Full Stack Web App',
    year: '2025',
    description: 'A full-stack psychological alignment quiz for Lord of the Mysteries fans. 20 questions drawn from a weighted pool of 40, a trait-weighted scoring matrix across 8 Beyonder Pathways, live global distribution stats from MongoDB, and a result page that actually explains why you got matched.',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Axios', 'Railway', 'Vercel'],
    liveLink: 'https://lotm-quiz.vercel.app',
    githubLink: '#',
    previewBg: 'linear-gradient(135deg, #1a0533 0%, #6d28d9 100%)',
    previewEmoji: '🔮',
    previewLabel: 'Pathway Matcher',
 
    overview: 'Sequence Alignment Engine is a fan-made full-stack web application for Lord of the Mysteries. It is not a BuzzFeed-style quiz — it uses a weighted scoring matrix across 8 psychological trait dimensions, stratified question sampling, and a normalised scoring algorithm to determine which Beyonder Pathway you belong to. Results are persisted to MongoDB and aggregated to show live global pathway distribution statistics across all users.',
 
    features: [
      'Stratified question sampling: 20 questions are randomly drawn each session from a pool of 40, stratified by weight tier (5 from weight-1, 8 from weight-2, 7 from weight-3) — so total maximum score is equal across all sessions regardless of which questions appear',
      'Weighted scoring matrix: each answer carries raw scores for one or more Pathways, multiplied by question weight (1–3). A weight-3 question contributes 3× more than a weight-1 question, making psychologically significant questions matter more',
      'Normalised result display: raw pathway scores are converted to percentages (pathway_score / total_all_scores × 100) so results show relative alignment across all 8 Pathways, not just the winner',
      'Full-stack persistence: every result is POST-ed to an Express backend and stored in MongoDB Atlas, enabling live global distribution analytics via GET /api/analytics/distribution',
      'Multi-page SPA flow: IntroPage → Warning → Quiz → Loading → ResultPage, all client-side routed via React Router v6 with no page reloads',
      'Scoring runs entirely in the browser (computeScores utility) — the backend only handles storage and analytics, keeping the quiz fast even on slow connections',
    ],
 
    challenges: 'The hardest design problem was ensuring result fairness across different question draws. A naive random sample would mean some sessions had harder or easier paths to certain Pathways. The stratified sampling by weight tier solves this — total possible score is constant across all sessions. Writing the 40-question bank was also the most time-consuming part; questions had to feel authentic to the LOTM world and each answer needed carefully tuned scores across multiple Pathways simultaneously, not just adding points to one bucket.',
 
    docs: 'Live demo at lotm-quiz.vercel.app. Full architecture and scoring algorithm documented in the GitHub README.',
  },
 
  // ============================================================
  // PROJECT 3 — MODEL COMPRESSION (Ongoing Research)
  // ============================================================
  {
    id: 'model-compression',
    title: 'Compressing Vision-Language Models',
    tag: 'Research · Ongoing',
    year: '2025',
    description: 'Ongoing research compressing CLIP (151M), BLIP (226M), and LLaVA-1.5-7B using structured pruning, INT8 quantization, and knowledge distillation — targeting edge deployment. Week 2 baselines locked. Currently building pruning modules.',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'CLIP', 'BLIP', 'LLaVA-1.5', 'BitsAndBytes', 'ONNX Runtime', 'Google Colab'],
    liveLink: '#',
    githubLink: '#',
    previewBg: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)',
    previewEmoji: '🧠',
    previewLabel: 'ML Research',
 
    overview: 'A systematic study of compression methods across three architecturally distinct vision-language models: CLIP (contrastive, 151M params), BLIP (encoder-decoder with cross-attention, 226M params), and LLaVA-1.5-7B (multimodal LLM, 7.35B params). Each model represents a different VLM paradigm, making the comparison meaningful beyond just benchmarking numbers. The research applies structured pruning, post-training INT8 quantization, and knowledge distillation, benchmarked identically across all three to identify which compression strategies generalise across VLM architectures.',
 
    features: [
      'Three architecturally distinct models studied: CLIP (no tight vision-language coupling, runs locally at 600MB), BLIP (tight coupling via 12 cross-attention layers, 900MB), and LLaVA-1.5-7B (95.4% of params in the LLM layer, requires Colab T4)',
      'Key architectural finding from Week 1 analysis: in LLaVA-1.5, the vision tower is only 4.2% of parameters and the projector 0.3% — 92%+ lives in the language model, so compression must target the LLM not the vision encoder',
      'Structured pruning removes entire attention heads and feed-forward neurons based on magnitude and gradient sensitivity — produces architecturally smaller models, not just sparse ones, which actually improves inference speed',
      'Post-training INT8 quantization using BitsAndBytes NF4 config — reduces LLaVA from 14GB (FP16) to ~4GB (4-bit) with inference still working correctly, confirmed in Week 1 baseline',
      'Evaluation across VQAv2 (visual question answering), GQA, TextVQA for LLaVA; Flickr30k retrieval for CLIP; COCO captioning (CIDEr) for BLIP — baselines locked after Week 2',
      'Shared evaluation codebase across all three model branches (clip-work, blip-work, llava-work) with a common YAML experiment config system for reproducibility',
    ],
 
    challenges: 'Multimodal models are significantly harder to compress than single-modality ones because degradation compounds across components — compressing the vision encoder, the language model, and the cross-modal alignment layer interact with each other in non-obvious ways. The 4-bit quantization baseline also raised an interesting question: parameter counts appear halved (3.66B shown vs 7.35B reported in the paper) because bitsandbytes reports memory representation, not true parameter count — understanding this distinction was important for correctly reporting results. LLaVA also cannot run locally (14GB weights), requiring all LLaVA experiments to run on Google Colab T4 with a keep-alive loop to prevent session drops during long evaluations.',
 
    docs: 'Research journal and weekly progress in JOURNAL.md. Compression strategy document in llava-work/docs/. Full results and paper forthcoming.',
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

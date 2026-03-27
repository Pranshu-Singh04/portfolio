import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const researchData = [
  {
    id: 'paper-1',
    title: 'Compressing Vision-Language Models for Edge Deployment: A Comparative Study of CLIP, BLIP, and LLaVA',
    journal: 'Independent Research · Ongoing (2025–Present)',
    abstract: 'Modern vision-language models have grown too large for deployment outside well-resourced cloud environments. This study systematically applies structured pruning, post-training INT8 quantization, and knowledge distillation across three architecturally distinct VLMs — CLIP (151M), BLIP (226M), and LLaVA-1.5-7B — to evaluate which compression strategies generalise across multimodal architectures. Unlike single-modality compression studies, this work must account for the interaction between vision encoders, language models, and cross-modal alignment layers, where degradation in any one component compounds across the others. Baselines locked. Pruning modules under active development.',
    tags: ['Model Compression', 'Vision-Language Models', 'Structured Pruning', 'Quantization', 'Knowledge Distillation', 'Edge AI', 'CLIP', 'BLIP', 'LLaVA'],
    pdfLink: '#',
    githubLink: 'https://github.com/Pranshu-Singh04/compression-multimodal-study',
    status: 'in-progress',
    overview: 'State-of-the-art vision-language models are increasingly capable but prohibitively large for deployment outside cloud environments. This research asks: how much can you compress CLIP, BLIP, and LLaVA-1.5 before the accuracy tradeoff becomes unacceptable — and which strategies work best for multimodal architectures specifically? The three models were chosen deliberately to cover the full spectrum of VLM design: CLIP uses no tight vision-language coupling and runs locally at 600MB; BLIP uses tight cross-attention coupling at 900MB; LLaVA-1.5-7B is a full multimodal LLM where 92% of parameters live in the language model, requiring Colab T4 for inference. A key architectural insight from Week 1 analysis: in LLaVA-1.5, the vision tower is only 4.2% of parameters and the projector 0.3% — meaning compression must target the LLM layer, not the vision encoder.',
    methodology: 'Three compression techniques are applied and benchmarked identically across all three model families. Structured pruning removes entire attention heads and feed-forward neurons based on magnitude and gradient sensitivity — producing architecturally smaller models (not just sparse ones) that actually improve inference speed on hardware. Post-training INT8 quantization uses BitsAndBytes NF4 configuration to reduce precision from FP32/FP16, confirmed working in Week 1 (LLaVA reduced from 14GB to ~4GB with correct inference). Knowledge distillation trains a smaller student model to replicate the full-size teacher, preserving cross-modal semantic alignment. Evaluation runs across VQAv2, GQA, and TextVQA for LLaVA; Flickr30k retrieval recall for CLIP; and COCO CIDEr score for BLIP. Baselines are locked after Week 2. A shared YAML experiment config system across all three model branches (clip-work, blip-work, llava-work) ensures reproducibility.',
    findings: 'Research is actively in progress — Week 2 baselines locked, pruning modules under development in Week 3. No final results yet. Progress is tracked publicly on GitHub across three model branches. The repository will be updated weekly as experiments complete. Follow the repo to track results in real time as they come in.',
    flip: false,
  }
];

export default function Research() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="research-section" id="research" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        04 — Research
      </motion.div>

      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Published Work
      </motion.h2>

      <div className="research-list">
        {researchData.map((paper, i) => (
          <motion.div
            key={paper.id}
            className={`research-card ${paper.flip ? 'flip-layout' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(paper.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(`/research/${paper.id}`)}
          >
            <div className="research-image-side">
              <div className="research-img-placeholder">
                <AnimatePresence>
                  {hovered === paper.id && (
                    <motion.div
                      className="research-hover-label"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      View Paper ↗
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="research-text-side">
              <span className="research-journal">{paper.journal}</span>
              <h3 className="research-title">{paper.title}</h3>
              <p className="research-abstract">{paper.abstract}</p>
              <div className="research-tags">
                {paper.tags.map(t => <span key={t} className="research-tag">{t}</span>)}
              </div>
              <span className="research-link">Read full paper ↗</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

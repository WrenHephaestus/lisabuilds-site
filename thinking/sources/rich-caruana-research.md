# Rich Caruana: Comprehensive Research Profile

*Research compiled March 17, 2026. Sources cited throughout.*

---

## 1. Background and Career

**Rich Caruana** is a Senior Principal Researcher at Microsoft Research in Redmond, Washington. He is one of the most influential figures in the interpretable machine learning space, with a career spanning three decades across academia, medical research, and industry.

### Education

- **Ph.D., Computer Science** -- Carnegie Mellon University (1997). His doctoral research was on **Multi-Task Learning**, conducted under the supervision of **Tom Mitchell** and **Herb Simon**. His thesis helped establish the subfield now known as **Transfer Learning**. ([Simons Institute profile](https://simons.berkeley.edu/people/rich-caruana); [Crunch Conference bio](https://crunchconf.com/2021/speaker/RichCaruana))

### Career Trajectory

1. **CMU's Center for Learning and Discovery** -- Early career research position.
2. **UCLA's Medical School** -- Applied ML research in medical settings. This is where some of the foundational healthcare ML work began.
3. **Cornell University, Department of Computer Science** -- Joined as Assistant Professor in Fall 2001. Received NSF CAREER Award (2004). Taught graduate-level courses in empirical methods in machine learning and advanced ML topics. ([Cornell CS page](https://www.cs.cornell.edu/~caruana/))
4. **Microsoft Research** -- Senior Principal Researcher (current). Joined sometime after his Cornell tenure. Has been at MSR for over a decade, leading work on interpretable ML, healthcare applications, deep learning, and computational ecology. ([MSR profile](https://www.microsoft.com/en-us/research/people/rcaruana/))

### Awards and Recognition

- **NSF CAREER Award** (2004) -- for work on Meta Clustering
- **Best Paper Awards** in 2005, 2007, and 2014
- **Co-Chair of KDD** (2007)
- **Area Chair** for NeurIPS (NIPS), ICML, and KDD
- **Visiting Scientist**, Simons Institute, UC Berkeley (Summer 2022) -- for the Interpretable Machine Learning cluster
- Invited keynote speaker at FAT ML (2017), AAAS Annual Meeting (2017), and numerous other venues

([Simons profile](https://simons.berkeley.edu/people/rich-caruana); [Cornell CS page](https://www.cs.cornell.edu/~caruana/); [Crunch Conference bio](https://crunchconf.com/2021/speaker/RichCaruana))

---

## 2. Key Research Contributions

Caruana's work spans several foundational areas of machine learning. The common thread: understanding *what models actually learn* and *whether we should trust them*.

### Multi-Task Learning (MTL)

Caruana's PhD thesis (1997) was the foundational work on **multi-task learning**, the idea that training a model on multiple related tasks simultaneously improves generalization on each task. Instead of learning each task in isolation, MTL uses shared representations so that what is learned for one task can help other tasks.

This work directly seeded the **transfer learning** revolution. The core insight -- that inductive biases from related tasks are a powerful form of regularization -- became one of the most important ideas in modern deep learning (where pre-training on one task and fine-tuning on another is standard practice).

**Key paper:** "Multitask Learning" -- Machine Learning, Vol. 28, 1997.

### Ensemble Methods

Caruana developed **Ensemble Selection from Libraries of Models**, a method for choosing optimal subsets from a library of thousands of diverse trained models to form ensembles that outperform any individual model. Rather than combining all available models, this approach algorithmically selects which ones to include.

**Key paper:** "Ensemble Selection from Libraries of Models" -- ICML, 2004.

### Model Compression / Knowledge Distillation

In 2006, Caruana (with Cristian Bucila and Alexandru Niculescu-Mizil) published **"Model Compression"**, which showed how to compress large ensembles of hundreds or thousands of classifiers into a single smaller, faster model with minimal accuracy loss. The method uses the ensemble to label a large unlabeled dataset, then trains a compact neural network to mimic the ensemble's predictions.

This work was **foundational to the entire field of knowledge distillation**. It predated and directly inspired Hinton et al.'s 2015 "Distilling the Knowledge in a Neural Network," which generalized the approach and popularized the term "knowledge distillation."

**Key paper:** Bucila, Caruana, Niculescu-Mizil. "Model Compression" -- KDD 2006, pp. 535-541. ([Semantic Scholar](https://www.semanticscholar.org/paper/Model-compression-Bucila-Caruana/30c9bb327b7f2b9f1d1e5b69b9d0c97b410948d9); [Cornell PDF](https://www.cs.cornell.edu/~caruana/compression.kdd06.pdf))

Caruana also co-authored the follow-up paper "Do Deep Nets Really Need to Be Deep?" (with Jimmy Ba, 2014), which explored whether shallow networks trained via compression could match deep network performance, further probing the question of *why* depth helps and whether the knowledge can be extracted into simpler structures.

### Empirical Evaluations of Learning Algorithms

Caruana conducted landmark large-scale empirical comparisons of supervised learning algorithms, testing SVMs, neural nets, logistic regression, naive Bayes, random forests, decision trees, boosted trees, and others across multiple datasets and metrics. These studies provided the field with rigorous evidence about which methods actually work best under which conditions.

**Key papers:**
- "An Empirical Comparison of Supervised Learning Algorithms" -- Caruana, Niculescu-Mizil. ICML 2006. ([Cornell PDF](https://www.cs.cornell.edu/~caruana/ctp/ct.papers/caruana.icml06.pdf))
- "An Empirical Evaluation of Supervised Learning in High Dimensions" -- Caruana, Karampatziakis, Yessenalina. ICML 2008. ([ICML PDF](https://icml.cc/Conferences/2008/papers/632.pdf))

### Probability Calibration

Caruana and Niculescu-Mizil studied how well different ML algorithms predict actual probabilities (not just classifications). They found that boosting methods produce characteristically sigmoid-shaped distortions, naive Bayes pushes probabilities toward extremes, while neural nets and bagged trees produce well-calibrated probabilities. They evaluated Platt Scaling and Isotonic Regression as correction methods.

**Key paper:** Niculescu-Mizil, Caruana. "Predicting Good Probabilities with Supervised Learning" -- ICML 2005. ([ACM DL](https://dl.acm.org/doi/10.1145/1102351.1102430))

---

## 3. Interpretable / Explainable ML Work

This is Caruana's defining contribution and the work he's most passionate about. His central thesis: **in high-stakes domains, model accuracy is not enough. You must understand what the model has learned.**

### Generalized Additive Models (GAMs)

In 2012, Caruana and collaborators (Yin Lou, Johannes Gehrke) published the first large-scale empirical study showing that **Generalized Additive Models** -- which model the target as a sum of individual feature functions (shape functions) -- could be made surprisingly accurate using modern ML techniques while remaining fully interpretable. Because GAMs don't include interactions between features, you can visualize exactly how each feature contributes to the prediction.

**Key paper:** Lou, Caruana, Gehrke. "Intelligible Models for Classification and Regression" -- KDD 2012. ([Cornell PDF](https://www.cs.cornell.edu/~caruana/); [DBLP](https://dblp.org/rec/conf/kdd/LouCG12.html))

### GA2M (GAMs with Pairwise Interactions)

The follow-up work added **pairwise interaction terms** to GAMs, creating GA2M models. These include a small number of carefully selected two-feature interaction terms alongside the univariate shape functions, capturing important interaction effects while remaining interpretable through heatmap visualizations.

**Key paper:** Lou, Caruana, Gehrke, Hooker. "Accurate Intelligible Models with Pairwise Interactions" -- KDD 2013. ([Cornell PDF](https://www.cs.cornell.edu/~yinlou/papers/lou-kdd13.pdf))

### Explainable Boosting Machines (EBMs)

EBMs are the production-ready evolution of GA2M. They combine **gradient boosting**, **bagging**, and **automatic interaction detection** into a model that is:
- As accurate as random forests, XGBoost, and other black-box models
- Fully interpretable (you can see exactly how every feature and interaction contributes)
- Editable after training (you can manually correct problematic patterns before deployment)

EBMs are what Caruana calls **"glassbox models"** -- not just explainable after the fact, but transparent by design.

Key technical detail: EBMs train one feature at a time in round-robin fashion, with each feature's contribution learned through many small gradient-boosted trees. This round-robin approach prevents features from compensating for each other, keeping the model additive and interpretable.

### InterpretML

In 2019, Caruana and collaborators released **InterpretML**, an open-source Python framework (MIT-licensed, hosted on GitHub as `interpretml/interpret`) that provides:
- **Glassbox models**: EBMs, decision trees, rule lists, linear/logistic regression
- **Blackbox explainers**: SHAP, LIME, Partial Dependence, Morris Sensitivity Analysis
- A unified API for comparing interpretability methods

The project has **6,800+ GitHub stars** and 778 forks as of 2026.

**Key paper:** Nori, Jenkins, Koch, Caruana. "InterpretML: A Unified Framework for Machine Learning Interpretability" -- arXiv:1909.09223 (2019). ([arXiv](https://arxiv.org/abs/1909.09223); [GitHub](https://github.com/interpretml/interpret))

### Differential Privacy + Interpretability

In 2021, Caruana's team showed that adding **differential privacy** to EBMs yields state-of-the-art accuracy while protecting individual privacy, and that the resulting DP-EBM models suffer surprisingly little accuracy loss even with strong privacy guarantees. Because the models are interpretable, they can be edited after training to correct errors introduced by differential privacy noise.

**Key paper:** Nori, Caruana, Bu, Shen, Kulkarni. "Accuracy, Interpretability, and Differential Privacy via Explainable Boosting" -- ICML 2021 (Spotlight). ([Proceedings](https://proceedings.mlr.press/v139/nori21a.html); [arXiv](https://arxiv.org/abs/2106.09680))

---

## 4. The Healthcare ML Story

This is the story that made Caruana famous in AI safety circles and is arguably the single most important cautionary tale in the history of machine learning deployment.

### The Pneumonia Risk Prediction Problem (1990s)

In the mid-1990s, while at CMU, Caruana's team (working with colleagues at the University of Pittsburgh Medical Center) was tasked with building a model to predict the **probability of death for pneumonia patients**. The clinical goal: identify low-risk patients who could safely be treated as outpatients, freeing hospital resources for high-risk patients who needed intensive care.

They trained multiple models, including neural networks, logistic regression, and rule-based systems. **The neural network was the most accurate model.**

### The Asthma Finding

When the team examined a rule-based (intelligible) model trained on the same data, they discovered something alarming: **the model had learned that a history of asthma *lowers* a patient's risk of dying from pneumonia.**

This was statistically true in the training data. But it was **causally backwards** and **clinically dangerous**.

**Why it appeared in the data:** Patients presenting with pneumonia who had a pre-existing asthma diagnosis were triaged as high-priority. They were immediately admitted to the hospital, often directly to the ICU. They also tended to seek care earlier because they were more attuned to breathing difficulties. As a result, asthmatics with pneumonia received faster and more aggressive treatment, which *did* result in better outcomes.

**Why it was dangerous:** If deployed, the model would have predicted that asthmatic pneumonia patients were low-risk, potentially recommending outpatient treatment for some of the highest-risk patients. Asthmatics with pneumonia who don't receive aggressive treatment are at *elevated* risk of death, not lower.

### The Decision

The team found the asthma pattern because the rule-based model was **intelligible**. They could read the rules and see the problem. But the neural network -- which was more accurate on test data -- was a black box. They couldn't verify whether it had learned the same dangerous pattern, or what other problematic patterns might be hidden inside it.

The team made a landmark decision: **they refused to deploy the more accurate neural network**. They went forward only with intelligible models (logistic regression), accepting lower accuracy in exchange for the ability to inspect, understand, and correct the model's reasoning.

As Caruana later put it in a 2022 CMU HCII talk: they found "surprising patterns in data that would have made deploying black-box models risky."

### The Broader Lesson

Caruana has stated that **"every model ever trained with machine learning on any medical data set has learned a half a dozen things which are wrong."** Not statistically wrong -- the patterns are real in the data -- but wrong in the sense that acting on them could harm patients.

He's identified additional examples beyond asthma:
- Age-based patterns that reflect treatment protocols rather than actual risk
- Biases that arise from the fact that models never observe what would have happened under alternative treatment pathways
- Protocol-based blind spots where models learn the consequences of existing care patterns rather than the underlying disease dynamics

**Key papers:**
- Caruana, Lou, Gehrke, Koch, Sturm, Elhadad. "Intelligible Models for HealthCare: Predicting Pneumonia Risk and Hospital 30-Day Readmission" -- KDD 2015. ([Microsoft Research PDF](https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/KDD2015FinalDraftIntelligibleModels4HealthCare_igt143e-caruanaA.pdf); [ACM DL](https://dl.acm.org/doi/10.1145/2783258.2788613))
- "Opening the 'Black Box': A Conversation with Microsoft's Rich Caruana About AI in Health Care" -- North Carolina Medical Journal, 2025. ([NCMJ](https://ncmedicaljournal.com/article/120567-opening-the-black-box-a-conversation-with-microsoft-s-rich-caruana-about-ai-in-health-care))

([Microsoft Research Podcast](https://www.microsoft.com/en-us/research/podcast/making-intelligence-intelligible-dr-rich-caruana/); [AAAS 2017 abstract](https://aaas.confex.com/aaas/2017/webprogram/Paper19142.html))

---

## 5. His Philosophy on AI

Caruana's views on AI are distinctive and consistent. They boil down to a few core principles:

### "Friends Don't Let Friends Deploy Black-Box Models"

This is the title of his most famous talk, delivered at FAT ML 2017 and repeated at venues worldwide. The argument:

1. **The most accurate models tend to be black boxes.** Neural networks, gradient-boosted tree ensembles, and deep learning models achieve high accuracy but provide no insight into *why* they make their predictions.

2. **In high-stakes domains, accuracy isn't enough.** Healthcare, criminal justice, lending, and other consequential applications require that humans can verify, understand, and correct model decisions.

3. **Interpretable models don't have to sacrifice accuracy.** This is the key empirical finding. EBMs and enhanced GAMs can match black-box accuracy while being fully transparent.

4. **Interpretability enables editing.** When a glassbox model learns something wrong (like the asthma-pneumonia pattern), a human expert can see it and fix it. With a black box, you'd never know.

([FAT ML 2017 talk](https://www.fatml.org/schedule/2017/presentation/invited-talk-rich-caruana-microsoft); [FAT ML slides PDF](https://www.fatml.org/media/documents/2017_rich_caruana_friends_dont_let_friends_deploy_blackbox_models.pdf); [CMU HCII 2022 seminar](https://hcii.cmu.edu/news/event/2022/10/hcii-seminar-series-rich-caruana))

### Three Reasons Models Are Opaque

Caruana identifies three sources of opacity in ML models:
1. **Complexity** -- Millions of parameters/weights that no human can parse
2. **Proprietary protection** -- Models kept opaque to protect intellectual property
3. **Cognitive mismatch** -- Models represent information in ways fundamentally different from human thought patterns

([Microsoft Research Podcast](https://www.microsoft.com/en-us/research/podcast/making-intelligence-intelligible-dr-rich-caruana/))

### "Every Dataset Is Flawed in Surprising Ways"

A recurring theme in Caruana's talks: you cannot trust any dataset fully. Data reflects the biases, protocols, and limitations of how it was collected. Models trained on flawed data will learn those flaws. Only interpretable models let you discover and correct for this.

([Crunch Conference 2021](https://crunchconf.com/2021/speaker/RichCaruana))

### Work on the Part That Worries You Most

Caruana's research philosophy, in his own words: "You should always work on the part of the system that worries you the most, because there's a good chance that that's the fundamental bottleneck."

([Microsoft Research Podcast](https://www.microsoft.com/en-us/research/podcast/making-intelligence-intelligible-dr-rich-caruana/))

### Human-in-the-Loop, Not Human-Out-of-the-Loop

Caruana envisions AI in healthcare as a **"second physician providing a second opinion"** -- a safety net that flags questionable decisions while explaining its reasoning. Not a replacement for human judgment, but an enhancement of it. He notes that many clinicians want simple traffic-light indicators (red/yellow/green) with the ability to inspect deeper reasoning when needed.

His metaphor: building bridges blind vs. with glasses. Once clinicians have used interpretable models, they refuse to go back to black boxes. "Nobody is going to take the glasses off willingly."

([NC Medical Journal interview](https://ncmedicaljournal.com/article/120567-opening-the-black-box-a-conversation-with-microsoft-s-rich-caruana-about-ai-in-health-care))

---

## 6. Recent Work (2022-2025)

Caruana has remained highly active, extending his interpretable ML program into the LLM era and new application domains.

### Rethinking Interpretability in the Era of LLMs (2024)

A position paper arguing that LLMs create new opportunities for interpretable ML: their ability to explain in natural language expands the complexity of patterns that can be communicated to humans. But also new challenges: hallucinated explanations, computational cost, and the need to audit LLMs themselves using interpretability techniques.

**Paper:** Singh, Inala, Galley, Caruana, Gao. "Rethinking Interpretability in the Era of Large Language Models" -- arXiv:2402.01761 (2024). ([arXiv](https://arxiv.org/abs/2402.01761))

### Augmenting Interpretable Models with LLMs (2023)

Published in **Nature Communications**, this work explores using LLMs during the training process of interpretable models, combining the power of large language models with the transparency of GAMs/EBMs.

### Maternal and Fetal Healthcare (2024)

Applied interpretable predictive models to understand risk factors for maternal and fetal outcomes, published in the Journal of Health Informatics Research.

**Paper:** Bosschieter, Xu, Lan, Lengerich, Nori, Painter, Souter, Caruana. "Interpretable Predictive Models to Understand Risk Factors for Maternal and Fetal Outcomes" -- J. Health Informatics Research, Vol. 8, No. 1, pp. 65-87 (2024).

### Hidden Risks in Clinical Practice (2025)

Published in npj Digital Medicine, exploring how round numbers and sharp thresholds in clinical practice create hidden risks that interpretable models can reveal.

**Paper:** Lengerich, Nunnally, Kellis, Caruana. "The hidden risk of round numbers and sharp thresholds in clinical practice" -- npj Digital Medicine, Vol. 8, No. 1 (2025).

### GAMformer (2024)

Exploring in-context learning for Generalized Additive Models, connecting the GAM/EBM framework with transformer architectures.

**Paper:** Mueller, Siems, Nori, Salinas, Zela, Hutter, Caruana. "GAMformer: In-Context Learning for Generalized Additive Models" -- arXiv preprint (2024).

### Missing Values and Imputation in Healthcare (2023)

Studied how missing data and imputation strategies affect interpretable ML in healthcare contexts.

**Paper:** Chen, Tan, Chajewska, Rudin, Caruana. "Missing Values and Imputation in Healthcare Data: Can Interpretable Machine Learning Help?" -- CHIL 2023, pp. 86-99.

### Data Science with LLMs and Interpretable Models (2024)

Exploring the intersection of LLM capabilities and interpretable modeling for data science workflows.

**Paper:** Bordt, Lengerich, Nori, Caruana. "Data Science with LLMs and Interpretable Models" -- arXiv preprint (2024).

### Feature Groups in GAMs (2025)

Investigating how the most important features in Generalized Additive Models might actually be *groups* of features rather than individual ones.

**Paper:** Bosschieter, Franca, Wolk, Wu, Mehta, Dehoney, Kiss, Baker, Zhao, Pohl, Caruana. "The Most Important Features in Generalized Additive Models Might Be Groups of Features" -- arXiv preprint (2025).

([DBLP publication list](https://dblp.org/pid/c/RichCaruana.html))

---

## 7. Key Papers (Chronological)

| Year | Title | Venue | Significance |
|------|-------|-------|-------------|
| 1997 | "Multitask Learning" | Machine Learning, Vol. 28 | Founded the multi-task/transfer learning subfield |
| 2004 | "Ensemble Selection from Libraries of Models" | ICML | Optimal ensemble subset selection |
| 2005 | "Predicting Good Probabilities with Supervised Learning" | ICML | Foundational work on probability calibration |
| 2006 | "An Empirical Comparison of Supervised Learning Algorithms" | ICML | Landmark empirical comparison of 10 algorithms |
| 2006 | "Model Compression" (with Bucila, Niculescu-Mizil) | KDD | **Foundational knowledge distillation paper** |
| 2008 | "An Empirical Evaluation of Supervised Learning in High Dimensions" | ICML | Extended empirical comparisons to high-D data |
| 2012 | "Intelligible Models for Classification and Regression" (with Lou, Gehrke) | KDD | First large-scale study showing GAMs can be competitive |
| 2013 | "Accurate Intelligible Models with Pairwise Interactions" (with Lou, Gehrke, Hooker) | KDD | Introduced GA2M (GAMs + pairwise interactions) |
| 2014 | "Do Deep Nets Really Need to Be Deep?" (with Ba) | NeurIPS | Explored shallow network mimicry of deep networks |
| 2015 | "Intelligible Models for HealthCare: Predicting Pneumonia Risk and Hospital 30-Day Readmission" | KDD | **The pneumonia paper. Classic cautionary tale.** |
| 2019 | "InterpretML: A Unified Framework for Machine Learning Interpretability" | arXiv | Open-source framework with EBMs |
| 2021 | "Accuracy, Interpretability, and Differential Privacy via Explainable Boosting" | ICML (Spotlight) | Privacy-preserving interpretable models |
| 2023 | "Augmenting Interpretable Models with Large Language Models During Training" | Nature Communications | LLM + interpretable model fusion |
| 2024 | "Rethinking Interpretability in the Era of Large Language Models" | arXiv | Position paper on interpretability post-LLM |
| 2025 | "The Hidden Risk of Round Numbers and Sharp Thresholds in Clinical Practice" | npj Digital Medicine | Interpretable models revealing clinical practice risks |

---

## 8. Connections to AI Alignment and Safety

Caruana's work is among the most practically relevant research for the AI safety and alignment conversation, even though he approaches it from a different angle than the "existential risk" community.

### Direct Connections

1. **The pneumonia case is a canonical alignment failure example.** The model learned to optimize for the training objective (predict death risk) in a way that, if deployed, would have harmed the people it was supposed to help. This is a concrete, real-world instance of the "misalignment" problem: a model optimizing for a proxy metric in a way that diverges from the intended goal.

2. **Interpretability as an alignment tool.** Caruana's core argument -- that you must be able to inspect what a model has learned before deploying it -- is fundamentally an alignment argument. If you can't verify that a model's internal representations align with your intentions, you shouldn't trust it with consequential decisions.

3. **Adversarial robustness.** His recent research profile at Microsoft includes work on adversarial robustness, a direct AI safety concern.

4. **FAT ML / Responsible AI.** Caruana has been active in the Fairness, Accountability, and Transparency community, giving keynote talks at FAT ML and contributing to the conversation about algorithmic bias, discrimination, and responsible deployment.

5. **Editing models after training.** A key feature of EBMs is that they can be manually edited by domain experts. This is a form of **human oversight and correction** -- one of the central desiderata in AI safety. Rather than treating the model as an oracle, Caruana's framework treats it as a collaborator that can be debugged and corrected.

### Philosophical Alignment

Caruana's philosophy maps onto several core AI safety principles:

- **Transparency over performance:** When forced to choose, Caruana consistently chooses interpretability. This mirrors the AI safety argument that capabilities without alignment are dangerous.
- **"Do no harm" over "maximize accuracy":** The pneumonia decision was explicitly framed as a medical ethics choice -- the Hippocratic principle applied to ML deployment.
- **Human-in-the-loop:** Caruana's vision of AI as a "second physician" rather than a replacement is deeply aligned with the concept of maintaining human control over AI systems.
- **Every dataset is flawed:** This mirrors the alignment insight that training data and reward signals are imperfect proxies for what we actually want.

### What Caruana's Work Implies for LLM Safety

His 2024 position paper on interpretability in the LLM era directly addresses this: LLMs create both new interpretability opportunities (natural language explanations) and new risks (hallucinated explanations, unfalsifiable reasoning). The need for interpretability doesn't diminish as models get more powerful -- it becomes more urgent.

His decades of work provide empirical evidence for a claim the AI safety community often makes theoretically: **black-box optimization in high-stakes domains is dangerous, and the danger is not hypothetical.**

---

## Summary

Rich Caruana has spent 30 years arguing -- and proving empirically -- that the ML community's obsession with accuracy at the expense of interpretability is dangerous. His work on the pneumonia risk prediction problem remains one of the most powerful real-world examples of what can go wrong when models are deployed without understanding. His development of GAMs, GA2Ms, EBMs, and the InterpretML framework demonstrates that the accuracy-interpretability tradeoff is often a **false tradeoff**: you can have both.

His core message, consistent across three decades: **if you can't understand what your model learned, you can't trust it with things that matter.**

---

## Key Links

- [Microsoft Research profile](https://www.microsoft.com/en-us/research/people/rcaruana/)
- [Cornell CS page](https://www.cs.cornell.edu/~caruana/)
- [Google Scholar](https://scholar.google.com/citations?user=B2U8EUwAAAAJ&hl=en)
- [DBLP publication list](https://dblp.org/pid/c/RichCaruana.html)
- [InterpretML GitHub](https://github.com/interpretml/interpret)
- [Microsoft Research Podcast interview](https://www.microsoft.com/en-us/research/podcast/making-intelligence-intelligible-dr-rich-caruana/)
- [NC Medical Journal interview (2025)](https://ncmedicaljournal.com/article/120567-opening-the-black-box-a-conversation-with-microsoft-s-rich-caruana-about-ai-in-health-care)
- [FAT ML 2017 talk](https://www.fatml.org/schedule/2017/presentation/invited-talk-rich-caruana-microsoft)
- [Simons Institute profile](https://simons.berkeley.edu/people/rich-caruana)

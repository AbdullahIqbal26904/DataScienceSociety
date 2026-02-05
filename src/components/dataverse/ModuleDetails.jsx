import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom'; // 👈 1. IMPORT useLocation

const MODULE_INFO = [
    { 
        id: 'cp', 
        name: 'Competitive Programming', 
        prize: 'PKR 50,000', 
        fee: 'Early: 700 | Normal: 1500', 
        teamSize: '1-3 Members',
        pdf: '/assets/modules/cp_guidelines.pdf', 
        // 🔥 FULL TEXT FORMATTED (Updated Style)
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The Competitive Programming module tests participants’ algorithmic thinking and coding efficiency through a series of timed problem-solving challenges. Emphasis is placed on logic, optimization, and correctness under time constraints. This module is designed to sharpen problem-solving speed and precision.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">PKR 35,000</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">PKR 15,000</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">PKR 50,000</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Overview</h3>
                    <ul class="list-none space-y-2 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Concept:</strong> Solve a set of programming problems of varying difficulty.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Duration:</strong> 3 Hours (Single Continuous Round).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Platform:</strong> Online Judging Platform (HackerRank/Codeforces/etc).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Environment:</strong> Organizer-approved Online IDEs Only.</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Format</h3>
                    <div class="space-y-3">
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-purple-500">
                            <h4 class="font-bold text-white text-sm">📅 Single Round</h4>
                            <ul class="list-disc list-inside text-xs text-gray-400 mt-1">
                                <li><strong>Start:</strong> Problem statements released at start time.</li>
                                <li><strong>Action:</strong> Teams begin submitting solutions immediately.</li>
                                <li><strong>Scoring:</strong> Live leaderboard (frozen in final hour).</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Allowed Languages</h3>
                    <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <h4 class="font-bold text-white text-sm mb-2">Supported Languages</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">C</span>
                            <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">C++</span>
                            <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">Java</span>
                            <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">Python</span>
                        </div>
                        <p class="text-xs text-gray-400 mt-2">
                            *Standard libraries are permitted. No external internet access allowed.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Rules & Guidelines</h3>
                    <ul class="list-disc list-inside space-y-2 text-sm text-gray-300 marker:text-blue-500">
                        <li><strong>Team Size:</strong> Solo, Duo, or Trio (1-3 members).</li>
                        <li><strong>Accounts:</strong> Each team account must be used exclusively by registered members.</li>
                        <li><strong>Collaboration:</strong> Internal collaboration is allowed; external help is strictly prohibited.</li>
                        <li><strong>Resources:</strong> ICPC-style TRD is allowed. No other materials.</li>
                        <li><strong>Scoring:</strong> Based on problems solved + time taken (penalty for wrong submissions).</li>
                    </ul>
                </div>

                <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r mt-4">
                    <h4 class="font-bold text-red-400 mb-1">⚠️ Zero Tolerance Policy</h4>
                    <p class="text-sm text-red-200/80 leading-relaxed">
                        Any attempt to cheat, plagiarize, hack, or disrupt the system will result in <strong>immediate disqualification</strong>. 
                        The decision of the judges is final.
                    </p>
                </div>
            </div>
        `
    },
    { 
        id: 'game-dev', 
        name: 'Game Dev', 
        prize: 'PKR 35,000', 
        fee: 'Early: 500 | Normal: 1000', 
        teamSize: '1-3 Members',
        pdf: '/assets/modules/gamedev_guidelines.pdf',
        // 🔥 FULL TEXT FORMATTED BELOW
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The Game Development module focuses on designing and building interactive games that combine creativity with logical thinking. Participants will work on gameplay mechanics, rules, and user interaction to develop engaging experiences within a limited timeframe.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">PKR 25,000</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">PKR 10,000</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">PKR 35,000</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Overview</h3>
                    <ul class="list-none space-y-2 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Concept:</strong> Create an MVP based on a <strong>Theme</strong> announced at the start.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Duration:</strong> ~24 Hours (Including reviews).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Equipment:</strong> Teams must bring their own machines and backup internet.</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Event Schedule</h3>
                    <div class="space-y-3">
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-purple-500">
                            <h4 class="font-bold text-white text-sm">📅 Day 1: Development</h4>
                            <ul class="list-disc list-inside text-xs text-gray-400 mt-1">
                                <li><strong>10:00 AM:</strong> Theme announced on Discord.</li>
                                <li><strong>Venue:</strong> No physical venue (Remote/Online).</li>
                                <li><strong>Action:</strong> Development begins immediately.</li>
                            </ul>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-green-500">
                            <h4 class="font-bold text-white text-sm">📅 Day 2: Submission & Judging</h4>
                            <ul class="list-disc list-inside text-xs text-gray-400 mt-1">
                                <li><strong>1:00 PM:</strong> Submission Deadline (Strict).</li>
                                <li><strong>2:00 PM:</strong> Live Judging at the announced venue.</li>
                                <li><strong>Requirement:</strong> All members MUST be present.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Allowed Technologies</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-bold text-white text-sm mb-2">Game Engines</h4>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">Unity</span>
                                <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">Godot</span>
                                <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">Unreal Engine</span>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-sm mb-2">Frameworks</h4>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">Raylib (C++)</span>
                                <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">Pygame (Python)</span>
                                <span class="px-2 py-1 bg-gray-700 text-xs rounded border border-gray-600">Others Allowed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Rules & Guidelines</h3>
                    <ul class="list-disc list-inside space-y-2 text-sm text-gray-300 marker:text-blue-500">
                        <li><strong>Team Size:</strong> Solo, Duo, or Trio (1-3 members).</li>
                        <li><strong>Assets:</strong> Only self-created assets or Free assets with licenses (must credit authors) are allowed.</li>
                        <li><strong>Evaluation:</strong> Functionality will be tested based on content and developer advice.</li>
                        <li><strong>Attendance:</strong> Failure to appear for evaluation results in automatic disqualification.</li>
                        <li><strong>No Extensions:</strong> Deadlines are final regardless of technical issues.</li>
                    </ul>
                </div>

                <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r mt-4">
                    <h4 class="font-bold text-red-400 mb-1">⚠️ Zero Tolerance Policy</h4>
                    <p class="text-sm text-red-200/80 leading-relaxed">
                        Plagiarism of any kind is strictly prohibited. If any team argues with the host regarding final decisions, they will be disqualified immediately. Judges' decisions are final.
                    </p>
                </div>
            </div>
        `
    },
    { 
        id: 'shark-tank', 
        name: 'Shark Tank', 
        prize: 'PKR 50,000', 
        fee: 'Early: 700 | Normal: 1500', 
        teamSize: '1-4 Members',
        pdf: '/assets/modules/sharktank_guidelines.pdf',
        // 🔥 FULL TEXT FORMATTED BELOW
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The Shark Tank module provides participants with an opportunity to pitch innovative startup ideas in a simulated entrepreneurial setting. Teams will be evaluated on innovation, feasibility, market understanding, and presentation skills. This module emphasizes strategic thinking, communication, and the ability to defend ideas under critical questioning.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">PKR 35,000</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">PKR 15,000</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">PKR 50,000</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Overview</h3>
                    <div class="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <p class="mb-3">
                            Each team must propose and refine a solution to a real-world challenge aligned with one or more of the following <strong>Sustainable Development Goals (SDGs)</strong>:
                        </p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-2 py-1 bg-green-900/40 border border-green-500/30 text-green-300 text-xs rounded">Agriculture</span>
                            <span class="px-2 py-1 bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs rounded">Tourism</span>
                            <span class="px-2 py-1 bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs rounded">Trade</span>
                            <span class="px-2 py-1 bg-red-900/40 border border-red-500/30 text-red-300 text-xs rounded">Healthcare</span>
                            <span class="px-2 py-1 bg-teal-900/40 border border-teal-500/30 text-teal-300 text-xs rounded">Sustainability</span>
                        </div>
                        <ul class="list-disc list-inside text-sm text-gray-300 space-y-1">
                            <li>Teams are expected to arrive with an <strong>initial concept</strong> addressing one of these themes.</li>
                            <li>Focus is on refining the concept into a viable <strong>business pitch</strong> and a working <strong>prototype</strong> (Design or Tech).</li>
                            <li><strong>Equipment:</strong> Teams must bring their own machines. Backup internet is recommended.</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Timeline & Schedule</h3>
                    <div class="space-y-4">
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-purple-500">
                            <h4 class="font-bold text-white text-sm mb-2">📅 Day 1: Pitch Refinement & Submission</h4>
                            <ul class="list-disc list-inside text-xs text-gray-400 space-y-1">
                                <li><strong>Start:</strong> Begin refining ideas immediately; engage with Mentors to validate assumptions.</li>
                                <li><strong>Mentorship:</strong> Mentors available to challenge assumptions and ensure fit for judging criteria.</li>
                                <li><strong>Submission Deadline:</strong> Submit all deliverables (Video, Slides, Prototype Link, Tech Doc) by end of Day 1.</li>
                                <li><strong>Attendance:</strong> Mandatory for eligibility in Day 2.</li>
                            </ul>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-green-500">
                            <h4 class="font-bold text-white text-sm mb-2">📅 Day 2: Final Presentations</h4>
                            <ul class="list-disc list-inside text-xs text-gray-400 space-y-1">
                                <li><strong>Selection:</strong> Top 10 teams from Day 1 will present to the Judges.</li>
                                <li><strong>Live Pitching:</strong> Presentation at the announced venue.</li>
                                <li><strong>Requirement:</strong> All team members must be present.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Deliverables</h3>
                    <ul class="list-none space-y-2 text-sm text-gray-300">
                        <li class="bg-gray-800/40 p-2 rounded border border-gray-700">
                            <strong>1. Pitch Deck:</strong> Must cover Problem Statement (Gap) and Solution/Product (How it works).
                        </li>
                        <li class="bg-gray-800/40 p-2 rounded border border-gray-700">
                            <strong>2. Prototype / MVP:</strong> Wireframes, mockups, or a physical prototype (Optional but Recommended).
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Judging Focus</h3>
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 class="font-bold text-white mb-1">Phase 1 (Day 1 - Mentors)</h4>
                            <ul class="list-disc list-inside text-gray-400">
                                <li>Idea validation</li>
                                <li>Clarity of thought</li>
                                <li>Receptiveness to feedback</li>
                                <li>Logical foundation</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-white mb-1">Phase 2 (Day 2 - Sharks)</h4>
                            <ul class="list-disc list-inside text-gray-400">
                                <li><strong>Primary:</strong> Investability, Feasibility, Sustainability.</li>
                                <li><strong>Secondary:</strong> Presentation, Visual Appeal, Defense (Q&A).</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r mt-4">
                    <h4 class="font-bold text-red-400 mb-1">⚠️ Team Rules & Integrity</h4>
                    <p class="text-sm text-red-200/80 leading-relaxed">
                        <strong>Originality:</strong> Must be original work. Existing ideas permitted only with significant localization/innovation.<br/>
                        <strong>Integrity:</strong> Plagiarism or falsifying data leads to immediate disqualification.<br/>
                        <strong>Attendance:</strong> All members must be present during Day 1 Mentorship to qualify for Day 2.
                    </p>
                </div>
            </div>
        `
    },
    { 
        id: 'ml', 
        name: 'Machine Learning', 
        prize: '250 USD', 
        fee: 'Early: 700 | Normal: 1500', 
        teamSize: '1-3 Members',
        pdf: '/assets/modules/ml_guidelines.pdf', 
        // 🔥 FULL TEXT FORMATTED BELOW
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The Machine Learning module introduces participants to building and evaluating models that learn from data. Teams will work with datasets to train, test, and improve predictive models while understanding core concepts such as features, evaluation metrics, and model performance. This module emphasizes practical implementation and analytical reasoning.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">150 USD</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">100 USD</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">250 USD</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Overview</h3>
                    <ul class="list-none space-y-2 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Theme:</strong> Train exclusively using high-quality <strong>synthetic data</strong>.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Goal:</strong> Highlight the power of synthetic data for overcoming scarcity and improving robustness.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Duration:</strong> ~24 Hours (Announced at start).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Environment:</strong> BYOD (Bring your own laptops). Internet provided but backup recommended.</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Core Constraints</h3>
                    <div class="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r mb-4">
                        <p class="text-sm text-yellow-200/90 font-semibold">
                            ⚠️ Strict Data Rule: You must train ONLY on the provided synthetic dataset.
                        </p>
                    </div>
                    <ul class="list-disc list-inside space-y-2 text-sm md:text-base marker:text-blue-500 text-gray-300">
                        <li>Do <strong>not</strong> use real-world data, external datasets, or pre-labeled images for training.</li>
                        <li>Evaluation is performed on a separate, unseen set of images.</li>
                        <li>Never use the designated test images for training or validation — doing so results in disqualification.</li>
                        <li>You may modify loss functions, optimizers, and augmentation strategies freely.</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Allowed Technologies</h3>
                    <ul class="list-disc list-inside space-y-2 text-sm text-gray-300 marker:text-blue-500">
                        <li>Any modern framework (PyTorch, TensorFlow, etc.).</li>
                        <li>Any semantic segmentation model/backbone (U-Net, DeepLab, SegFormer, HRNet, Mask2Former, etc.).</li>
                        <li>Standard pre-trained encoders/backbones allowed for fine-tuning.</li>
                        <li>Custom code, notebooks, augmentations, and optimization tricks are encouraged.</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">What to Submit</h3>
                    <div class="space-y-4">
                        <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                            <h4 class="font-bold text-white text-sm mb-1">📄 1. Documentation/Report</h4>
                            <ul class="list-disc list-inside text-xs text-gray-400 pl-2">
                                <li>Approach & training methodology</li>
                                <li>Key choices (architecture, hyperparameters)</li>
                                <li>Performance results & visualizations (loss curves)</li>
                                <li>Challenges faced and solutions</li>
                            </ul>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                            <h4 class="font-bold text-white text-sm mb-1">📁 2. README & Code</h4>
                            <ul class="list-disc list-inside text-xs text-gray-400 pl-2">
                                <li>Step-by-step setup instructions</li>
                                <li>How to run training and inference</li>
                                <li>Package everything in a zipped folder or Private GitHub Repo</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Judging Criteria</h3>
                    <ul class="list-none space-y-2 text-sm text-gray-300">
                        <li class="flex gap-2">
                            <span class="font-bold text-green-400">Primary:</span> 
                            Quality and accuracy of the model on the unseen test set.
                        </li>
                        <li class="flex gap-2">
                            <span class="font-bold text-purple-400">Secondary:</span> 
                            Clarity, reproducibility, and insightfulness of your documentation.
                        </li>
                    </ul>
                </div>

                <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r mt-4">
                    <h4 class="font-bold text-red-400 mb-1">⚠️ Team & Plagiarism Rules</h4>
                    <p class="text-sm text-red-200/80 leading-relaxed">
                        Plagiarism, code copying, or sharing solutions during the event is strictly forbidden and leads to disqualification. 
                        Teams must be available for judging in person. Submission deadlines are strict—no extensions.
                    </p>
                </div>
            </div>
        `
    },
    { 
        id: 'web-dev', 
        name: 'Web Development', 
        prize: 'PKR 35,000', 
        fee: 'Early: 500 | Normal: 1000', 
        teamSize: '1-3 Members',
        pdf: '/assets/modules/webdev_guidelines.pdf',
        // 🔥 FULL TEXT FORMATTED BELOW
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The Web Development module challenges participants to create functional, responsive, and user-friendly websites using modern web technologies. Teams will focus on translating problem statements into practical digital solutions while promoting full-cycle development from concept to deployment.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">PKR 25,000</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">PKR 10,000</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">PKR 35,000</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Overview</h3>
                    <ul class="list-none space-y-2 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Theme:</strong> Problem statement announced at the start.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Duration:</strong> ~24 Hours.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Tools:</strong> All forms of <strong class="text-green-400">AI Tools are ALLOWED</strong>.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Environment:</strong> BYOD (Bring your own laptops). Internet provided (backup recommended).</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Technology Rules</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-green-900/20 border border-green-500/30 p-3 rounded-lg">
                            <h4 class="font-bold text-green-400 text-sm mb-1">✅ Allowed / Encouraged</h4>
                            <ul class="list-disc list-inside text-xs text-gray-300">
                                <li>Any Frontend/Backend Framework</li>
                                <li>Custom Backends (Bonus Points)</li>
                                <li>Firebase / BaaS (Allowed)</li>
                                <li>SQL or NoSQL Databases</li>
                            </ul>
                        </div>
                        <div class="bg-red-900/20 border border-red-500/30 p-3 rounded-lg">
                            <h4 class="font-bold text-red-400 text-sm mb-1">❌ Strictly Prohibited</h4>
                            <ul class="list-disc list-inside text-xs text-gray-300">
                                <li><strong>WordPress</strong> is NOT allowed.</li>
                                <li>No-Code site builders.</li>
                                <li>Plagiarized templates.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Evaluation Criteria</h3>
                    <div class="space-y-3">
                        <div class="bg-gray-800/50 p-3 rounded-lg">
                            <h4 class="font-bold text-white text-sm">1. Functional Completeness & Tech</h4>
                            <p class="text-xs text-gray-400">Core requirements met, error handling, clean code, modular architecture.</p>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg">
                            <h4 class="font-bold text-white text-sm">2. UI/UX Design</h4>
                            <p class="text-xs text-gray-400">Responsiveness (Mobile/Desktop), consistency, and visual appeal.</p>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg">
                            <h4 class="font-bold text-white text-sm">3. Innovation & Demo</h4>
                            <p class="text-xs text-gray-400">Originality, live demo effectiveness, and documentation quality.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r mt-4">
                    <h4 class="font-bold text-red-400 mb-1">⚠️ Important Rules</h4>
                    <ul class="list-disc list-inside text-sm text-red-200/80">
                        <li><strong>Attendance:</strong> Failure to appear for the 10-min evaluation results in disqualification.</li>
                        <li><strong>Extensions:</strong> No deadline extensions regardless of technical issues.</li>
                    </ul>
                </div>
            </div>
        `
    },
    { 
        id: 'data', 
        name: 'Data Analytics', 
        prize: 'PKR 35,000', 
        fee: 'Early: 500 | Normal: 1000', 
        teamSize: '1-2 Members',
        pdf: '/assets/modules/data_guidelines.pdf',
        // 🔥 FULL TEXT FORMATTED BELOW
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The Data Analytics module focuses on extracting meaningful insights from raw data. Participants will work with datasets to identify trends, perform analysis, and visualise data-driven conclusions. This module highlights analytical thinking, interpretation skills, and practical decision-making based on data.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">PKR 25,000</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">PKR 10,000</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">PKR 35,000</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Overview</h3>
                    <ul class="list-none space-y-2 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Theme:</strong> Announced at the start. Teams must implement ideas to solve the problem.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Duration:</strong> ~24 Hours (Including presentations).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Equipment:</strong> BYOD. Teams must bring their own <strong>converters</strong> for projectors.</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Format & Tasks</h3>
                    <div class="space-y-4">
                        <div class="bg-gray-800/50 p-4 rounded-lg border-l-4 border-indigo-500">
                            <h4 class="font-bold text-white text-sm mb-2">📌 Task 1: Design & EDA</h4>
                            <p class="text-sm text-gray-300 leading-relaxed">
                                Given a scenario, you must:
                            </p>
                            <ul class="list-disc list-inside text-xs text-gray-400 mt-1">
                                <li>Design a <strong>Star Schema</strong> for the OLTP dataset.</li>
                                <li>Perform Exploratory Data Analysis (EDA).</li>
                                <li>Justify your design choices.</li>
                            </ul>
                        </div>
                        
                        <div class="bg-gray-800/50 p-4 rounded-lg border-l-4 border-teal-500">
                            <h4 class="font-bold text-white text-sm mb-2">📌 Task 2: Pipeline & Visualization</h4>
                            <p class="text-sm text-gray-300 leading-relaxed">
                                Build a data pipeline using the specified stack:
                            </p>
                            <ul class="list-disc list-inside text-xs text-gray-400 mt-1">
                                <li><strong>Ingestion:</strong> Astro CLI (Airflow) to ingest data from S3.</li>
                                <li><strong>Storage:</strong> Snowflake for Data Warehouse (DWH).</li>
                                <li><strong>Visualization:</strong> Power BI for a simple dashboard.</li>
                                <li><strong>Requirement:</strong> Modular, clean, and well-documented code.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Rules</h3>
                    <ul class="list-disc list-inside space-y-2 text-sm text-gray-300 marker:text-blue-500">
                        <li><strong>AI Policy:</strong> Using AI (ChatGPT etc.) is allowed, but simply copying without understanding or adaptation will be <strong>penalized</strong>. Proper Data Engineering concepts must be implemented.</li>
                        <li><strong>Presentation:</strong> 10–15 minute evaluation. Failure to appear results in disqualification.</li>
                        <li><strong>Hardware:</strong> Bring your own internet (backup) and display converters.</li>
                        <li><strong>Originality:</strong> All work must be original and completed exclusively by the team.</li>
                        <li><strong>Extensions:</strong> No deadline extensions regardless of technical issues.</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Evaluation Criteria</h3>
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div class="bg-gray-800/30 p-3 rounded-lg">
                            <h4 class="font-bold text-indigo-400 mb-1">Task 1 Evaluation</h4>
                            <ul class="list-disc list-inside text-gray-400 text-xs">
                                <li>Star schema design quality</li>
                                <li>EDA Quality</li>
                                <li>Documentation & Justification</li>
                            </ul>
                        </div>
                        <div class="bg-gray-800/30 p-3 rounded-lg">
                            <h4 class="font-bold text-teal-400 mb-1">Task 2 Evaluation</h4>
                            <ul class="list-disc list-inside text-gray-400 text-xs">
                                <li>Pipeline Functionality</li>
                                <li>Code Quality (Modular/Clean)</li>
                                <li>Power BI Dashboard Quality</li>
                                <li>Final Presentation</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r mt-4">
                    <h4 class="font-bold text-red-400 mb-1">⚠️ Final Authority</h4>
                    <p class="text-sm text-red-200/80 leading-relaxed">
                        The decision of the Judges is final and cannot be challenged. Arguments with the host team regarding decisions will lead to disqualification.
                    </p>
                </div>
            </div>
        `
    },
    { 
        id: 'ui-ux', 
        name: 'UI/UX Design', 
        prize: 'PKR 35,000', 
        fee: 'Early: 500 | Normal: 1000', 
        teamSize: '1-2 Members', 
        pdf: '/assets/modules/uiux_guidelines.pdf',
        // 🔥 FULL TEXT FORMATTED BELOW
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The UI/UX Design module focuses on creating practical, user-centered digital experiences. Teams are expected to design a <strong>mobile-first clickable prototype</strong> that demonstrates mandatory user flows, emphasizing accessibility, clarity, and usability.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">PKR 25,000</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">PKR 10,000</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">PKR 35,000</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Overview</h3>
                    <ul class="list-none space-y-2 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Theme:</strong> Problem statement announced at the start.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Duration:</strong> ~24 Hours.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Tool:</strong> <strong>Figma</strong> is preferred.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Output:</strong> Mobile-first <strong>clickable & interactive</strong> prototype.</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Rules & Constraints</h3>
                    <ul class="list-disc list-inside space-y-2 text-sm text-gray-300 marker:text-blue-500">
                        <li><strong>Originality:</strong> All work must be completed exclusively by registered members during the event.</li>
                        <li><strong>AI Policy:</strong> AI tools allowed <em>only</em> for ideation, microcopy, or minor suggestions. Teams must validate all outputs.</li>
                        <li><strong>Submission:</strong> Submit a <strong>Figma link</strong> with a clickable prototype, user flow diagram, and key screens.</li>
                        <li><strong>Attendance:</strong> Failure to appear for evaluation results in automatic disqualification.</li>
                        <li><strong>Hardware:</strong> Bring your own laptops and backup internet.</li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Evaluation Criteria</h3>
                    <div class="space-y-4">
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-indigo-500">
                            <h4 class="font-bold text-white text-sm mb-1">1. User Focus & Problem Solving</h4>
                            <p class="text-xs text-gray-400">Clear problem identification, understanding of target users/pain points, and alignment with real-world context.</p>
                        </div>
                        
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-teal-500">
                            <h4 class="font-bold text-white text-sm mb-1">2. UX & Usability</h4>
                            <p class="text-xs text-gray-400">Logical flows, ease of navigation, hierarchy, and accessibility (low literacy, bilingual support).</p>
                        </div>

                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-pink-500">
                            <h4 class="font-bold text-white text-sm mb-1">3. Visuals & Prototype Quality</h4>
                            <p class="text-xs text-gray-400">Consistent UI (colors/type), meaningful transitions, interaction states, and end-to-end clickable flows.</p>
                        </div>

                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-orange-500">
                            <h4 class="font-bold text-white text-sm mb-1">4. Presentation & Rationale</h4>
                            <p class="text-xs text-gray-400">Clear explanation of design decisions, trade-offs, and professional defense of the solution.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r mt-4">
                    <h4 class="font-bold text-red-400 mb-1">⚠️ Strict Policy</h4>
                    <p class="text-sm text-red-200/80 leading-relaxed">
                        Plagiarism (copying designs or using pre-made solutions) is strictly prohibited. 
                        No deadline extensions will be granted regardless of technical issues. 
                        The judges' decision is final.
                    </p>
                </div>
            </div>
        `
    },
    { 
        id: 'csi', 
        name: 'Crime Scene Investigation', 
        prize: 'PKR 35,000', 
        fee: 'Early: 700 | Normal: 1500', 
        teamSize: '1-3 Members',
        pdf: '/assets/modules/csi_guidelines.pdf',
        // 🔥 FULL TEXT FORMATTED BELOW
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The Crime Scene Investigation module places participants in the role of investigators tasked with solving a simulated case through logical reasoning and evidence analysis. Teams will examine clues, connect timelines, and draw conclusions across multiple themed rooms.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">PKR 25,000</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">PKR 10,000</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">PKR 35,000</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Case Overview</h3>
                    <ul class="list-none space-y-2 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Objective:</strong> Analyze a fictional crime scenario and identify the perpetrator through logical deduction.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Duration:</strong> 2 Days (Different investigative phases each day).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Environment:</strong> Multiple <strong>themed rooms</strong> representing different aspects of the investigation.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Materials:</strong> All investigation materials provided on-site.</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Investigation Rules</h3>
                    <div class="grid grid-cols-1 gap-4">
                        <div class="bg-red-900/20 border border-red-500/30 p-3 rounded-lg">
                            <h4 class="font-bold text-red-400 text-sm mb-1">🚫 Strict Prohibitions</h4>
                            <ul class="list-disc list-inside text-xs text-gray-300 space-y-1">
                                <li><strong>NO AI Tools</strong> allowed.</li>
                                <li>Tampering with evidence is strictly prohibited.</li>
                                <li>Accessing unauthorized areas leads to disqualification.</li>
                                <li>Teams cannot assist one another.</li>
                            </ul>
                        </div>
                        <div class="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg">
                            <h4 class="font-bold text-blue-400 text-sm mb-1">✅ Operational Rules</h4>
                            <ul class="list-disc list-inside text-xs text-gray-300 space-y-1">
                                <li>Teams must move between rooms to collect info & solve puzzles.</li>
                                <li>All tasks must be completed within the allotted time.</li>
                                <li><strong>Attendance:</strong> Mandatory during all investigation and evaluation phases.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Evaluation Criteria</h3>
                    <div class="space-y-3">
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-indigo-500">
                            <h4 class="font-bold text-white text-sm">1. Accuracy & Completeness</h4>
                            <p class="text-xs text-gray-400">Correct identification of clues and the completeness of the investigation log.</p>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-teal-500">
                            <h4 class="font-bold text-white text-sm">2. Logic & Reconstruction</h4>
                            <p class="text-xs text-gray-400">Clarity and logic behind the explanation of the case and the reconstructed sequence of events.</p>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-yellow-500">
                            <h4 class="font-bold text-white text-sm">3. Speed (Tie-Breaker)</h4>
                            <p class="text-xs text-gray-400">Certain clues and points are awarded on a <strong>first-come, first-served basis</strong>.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-800/50 p-4 rounded-lg mt-4 text-center">
                    <p class="text-sm text-gray-400">
                        "Failure to appear for the final evaluation will result in immediate disqualification."
                    </p>
                </div>
            </div>
        `
    },
    { 
        id: 'gen-ai', 
        name: 'Gen AI', 
        prize: 'PKR 35,000', 
        fee: 'Early: 500 | Normal: 1000', 
        teamSize: '1-3 Members',
        pdf: '/assets/modules/genai_guidelines.pdf',
        // 🔥 FULL TEXT FORMATTED BELOW
        guidelines: `
            <div class="space-y-6 text-gray-300">
                
                <p class="text-lg leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-500/10 p-2 rounded-r">
                    The Generative AI module explores modern AI systems capable of generating text, images, and other creative outputs. Participants will engage with generative models to design solutions that encourage responsible and innovative use of AI technologies.
                </p>

                <div>
                    <h3 class="text-xl font-bold text-white mb-2">🏆 Prize Pool Breakdown</h3>
                    <div class="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Winner</span>
                            <span class="text-xl font-bold text-yellow-400">PKR 25,000</span>
                        </div>
                        <div>
                            <span class="block text-xs text-gray-400 uppercase">Runner Up</span>
                            <span class="text-xl font-bold text-gray-300">PKR 10,000</span>
                        </div>
                        <div class="col-span-2 border-t border-gray-700 pt-2 mt-1">
                            <span class="block text-xs text-gray-400">Total Pool: <span class="text-white font-bold">PKR 35,000</span></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Competition Overview</h3>
                    <ul class="list-none space-y-2 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Objective:</strong> Design a solution (standalone or integrated) addressing a specific <strong>Theme</strong> (announced at start).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Duration:</strong> ~24 Hours.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Tools:</strong> All AI tools, APIs (OpenAI, Gemini), and models (LLaMA, Stable Diffusion) allowed unless restricted at launch.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-blue-500 mt-1">➤</span> 
                            <span><strong>Environment:</strong> BYOD (Bring your own laptops). Internet provided (backup recommended).</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Tech & Rules</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg">
                            <h4 class="font-bold text-purple-400 text-sm mb-1">Encouraged Frameworks</h4>
                            <ul class="list-disc list-inside text-xs text-gray-300">
                                <li>LangChain</li>
                                <li>LangGraph</li>
                                <li>LlamaIndex</li>
                                <li>Open Source & API Models</li>
                            </ul>
                        </div>
                        <div class="bg-red-900/20 border border-red-500/30 p-3 rounded-lg">
                            <h4 class="font-bold text-red-400 text-sm mb-1">Restrictions</h4>
                            <ul class="list-disc list-inside text-xs text-gray-300">
                                <li>Organizers may restrict specific models at launch.</li>
                                <li>Datasets must be legal & ethical.</li>
                                <li>Plagiarism of prompts/arch strictly prohibited.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-blue-400 mb-3">Evaluation Criteria</h3>
                    <div class="space-y-3">
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-indigo-500">
                            <h4 class="font-bold text-white text-sm">1. AI System Design & Intelligence</h4>
                            <p class="text-xs text-gray-400">Prompt engineering quality, RAG pipelines, agents, handling hallucinations.</p>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-pink-500">
                            <h4 class="font-bold text-white text-sm">2. Innovation & Functionality</h4>
                            <p class="text-xs text-gray-400">Novelty of idea, non-trivial use of GenAI, functional completeness, and edge case handling.</p>
                        </div>
                        <div class="bg-gray-800/50 p-3 rounded-lg border-l-4 border-green-500">
                            <h4 class="font-bold text-white text-sm">3. Ethics & Implementation</h4>
                            <p class="text-xs text-gray-400">Bias mitigation, transparency, clean modular code, and efficient inference.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r mt-4">
                    <h4 class="font-bold text-red-400 mb-1">⚠️ Submission Policy</h4>
                    <p class="text-sm text-red-200/80 leading-relaxed">
                        Failure to appear for evaluation results in automatic disqualification. No deadline extensions will be granted. The decision of the judges is final.
                    </p>
                </div>
            </div>
        `
    },
    // ... other modules
];

const OVERVIEW_PDF_LINK = "/assets/HxD 2.0 Detailed Module Overview.pdf"; 

export default function ModuleDetails() {
  const [selectedModule, setSelectedModule] = useState(null);
const location = useLocation();
useEffect(() => {
    // Check if we navigated here with a specific module ID
    if (location.state && location.state.openModuleId) {
      const targetModule = MODULE_INFO.find(m => m.id === location.state.openModuleId);
      if (targetModule) {
        setSelectedModule(targetModule);
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen relative overflow-hidden  text-gray-200 font-sans">
      {/* =======================
          BACKGROUND BLOBS
      ======================= */}
      {/* <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-700 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-30" />
        </motion.div>
      </div> */}

      {/* =======================
          CONTENT
      ======================= */}
      <div className="container mx-auto max-w-6xl px-4 pt-20 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
                                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    <span>Back to Home</span>
                                </Link>
            

           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">Module Details</h1>
            <p className="text-gray-400 mt-1">
              Explore rules, prizes, and formats for each competition.
            </p>
          </div>

          <a
            href={OVERVIEW_PDF_LINK}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-sm font-medium transition"
          >
            Download Full Overview
          </a>
        </div>

        {/* =======================
            MODULE GRID
        ======================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MODULE_INFO.map((mod) => (
            <motion.div
              key={mod.id}
              whileHover={{ y: -4 }}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-lg hover:border-blue-500/30 transition cursor-pointer"
              onClick={() => setSelectedModule(mod)}
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {mod.name}
              </h3>

              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Prize Pool</span>
                  <span className="text-yellow-400 font-medium">{mod.prize}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Team Size</span>
                  <span className="text-white">{mod.teamSize}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Fee</span>
                  <span className="text-green-400">{mod.fee}</span>
                </div>
              </div>

              <button className="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition">
                View Guidelines
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =======================
          MODAL
      ======================= */}
      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModule(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-3xl lg:max-w-4xl max-h-[85vh]
           bg-gray-900 border border-gray-800
           rounded-2xl shadow-2xl flex flex-col"

            >
              {/* Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      {selectedModule.name}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Official Guidelines & Rules
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {selectedModule.pdf && (
                      <a
                        href={selectedModule.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-sm hover:bg-gray-700 transition"
                      >
                        PDF
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedModule(null)}
                      className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:bg-red-500 hover:text-white transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-p:text-gray-300">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedModule.guidelines,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-500 hidden md:block">
                  Rules subject to change.
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition"
                  >
                    Close
                  </button>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
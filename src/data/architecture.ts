import type { Branch } from '../lib/types'

// The complete conceptual map of the discipline. Branch IDs are stable keys;
// topic IDs below are the canonical slugs used by every other content file.
export const BRANCHES: Branch[] = [
  // ── MATHEMATICAL FOUNDATIONS ─────────────────────────────────────────────
  { id: 'math-foundations', title: 'Algebra & Mathematical Foundations', short: 'Foundations', part: 'I · Mathematical Foundations', icon: 'sigma', color: '#7c9cff', description: 'Number systems, algebraic structure, functions, complex numbers and the language of physical measurement.',
    topicIds: ['arithmetic-number-systems','algebraic-manipulation','functions-transformations','exponents-logarithms','complex-numbers','polynomials','equations-inequalities','coordinate-systems','dimensional-analysis','mathematical-approximation'] },
  { id: 'calculus', title: 'Calculus & Analysis', short: 'Calculus', part: 'I · Mathematical Foundations', icon: 'activity', color: '#8b8cff', description: 'Limits, derivatives, integrals, vector calculus and the integral theorems that underpin field theories.',
    topicIds: ['limits-continuity','differential-calculus','integral-calculus','multivariable-calculus','partial-derivatives','multiple-integrals','vector-calculus','line-surface-integrals','integral-theorems','differential-equations'] },
  { id: 'linear-algebra', title: 'Linear Algebra', short: 'Linear algebra', part: 'I · Mathematical Foundations', icon: 'grid-3x3', color: '#9b8cff', description: 'Vector spaces, linear maps, eigenvalues, inner products and the Hilbert-space language of quantum theory.',
    topicIds: ['vectors-vector-spaces','matrices-determinants','eigenvalues-eigenvectors','linear-transformations','inner-product-spaces','orthogonality','basis-transformations','tensor-algebra','hilbert-spaces','infinite-dimensional-spaces'] },
  { id: 'advanced-math', title: 'Advanced Mathematics', short: 'Advanced math', part: 'I · Mathematical Foundations', icon: 'infinity', color: '#ac8cff', description: 'Differential equations, Fourier methods, complex analysis, probability, geometry, group theory and functional analysis.',
    topicIds: ['ode','pde','fourier-analysis','laplace-transforms','complex-analysis','probability-theory','statistics','numerical-methods','optimization','variational-calculus','group-theory','lie-theory','differential-geometry','topology','functional-analysis','measure-theory','distributions'] },

  // ── CLASSICAL PHYSICS ────────────────────────────────────────────────────
  { id: 'classical-mechanics', title: 'Classical Mechanics', short: 'Mechanics', part: 'II · Classical Physics', icon: 'orbit', color: '#4dd4c1', description: 'From Newton’s laws to Lagrangian and Hamiltonian mechanics, orbital dynamics and chaos.',
    topicIds: ['kinematics','newtons-laws','work-energy-power','momentum-collisions','rotational-mechanics','gravitation','oscillations','shm','coupled-oscillators','damped-forced-oscillations','resonance','non-inertial-frames','rigid-body-dynamics','central-force-motion','kepler-laws','orbital-mechanics','lagrangian-mechanics','hamiltonian-mechanics','hamilton-jacobi','chaos-theory','nonlinear-dynamics','stability-theory'] },
  { id: 'fluid-mechanics', title: 'Fluid Mechanics', short: 'Fluids', part: 'II · Classical Physics', icon: 'waves', color: '#43c7e8', description: 'Statics, flow conservation, Bernoulli’s principle, the Navier–Stokes equations and turbulence.',
    topicIds: ['fluid-statics','fluid-dynamics','pressure-buoyancy','continuity-equation','bernoulli-principle','navier-stokes','viscosity','turbulence','boundary-layers','compressible-flow','aerodynamics','cfd'] },
  { id: 'thermodynamics', title: 'Thermodynamics', short: 'Thermodynamics', part: 'II · Classical Physics', icon: 'flame', color: '#ff9f5a', description: 'The four laws, entropy, thermodynamic potentials, engines and phase transitions.',
    topicIds: ['temperature-heat','zeroth-law','first-law','second-law','third-law','entropy','enthalpy','heat-engines','carnot-cycle','thermodynamic-potentials','maxwell-relations','phase-transitions','chemical-potential','irreversible-thermodynamics'] },
  { id: 'statistical-mechanics', title: 'Statistical Mechanics', short: 'Statistical mechanics', part: 'II · Classical Physics', icon: 'bar-chart-3', color: '#ffb454', description: 'How microscopic randomness produces macroscopic thermodynamics — ensembles, statistics and critical phenomena.',
    topicIds: ['microstates-macrostates','probability-distributions','boltzmann-distribution','boltzmann-statistics','bose-einstein-statistics','fermi-dirac-statistics','partition-functions','ensemble-theory','canonical-ensemble','grand-canonical-ensemble','quantum-statistical-mechanics','fluctuations','critical-phenomena','renormalization-group','statistical-field-theory'] },

  // ── ELECTROMAGNETISM ─────────────────────────────────────────────────────
  { id: 'electromagnetism', title: 'Electromagnetism', short: 'E&M', part: 'III · Electromagnetism', icon: 'zap', color: '#ffd166', description: 'Charge, fields, circuits, radiation and the complete structure of Maxwell’s equations.',
    topicIds: ['electric-charge','coulomb-law','electric-fields','electric-potential','gauss-law','conductors-insulators','capacitance','dielectrics','electric-current','resistance','kirchhoff-laws','magnetic-fields','biot-savart-law','ampere-law','electromagnetic-induction','faraday-law','lenz-law','inductance','ac-circuits','rlc-circuits','maxwell-equations','electromagnetic-waves','wave-propagation','polarization','reflection-refraction','poynting-vector','electromagnetic-radiation','accelerating-charges','retarded-potentials','gauge-transformations','electromagnetic-field-tensor','covariant-electrodynamics'] },

  // ── WAVES, OPTICS, ACOUSTICS ─────────────────────────────────────────────
  { id: 'waves', title: 'Wave Physics', short: 'Waves', part: 'IV · Waves, Optics & Acoustics', icon: 'audio-lines', color: '#8ee6a1', description: 'The universal mathematics of oscillation, interference, diffraction and nonlinear waves.',
    topicIds: ['wave-motion','wave-equation','superposition-interference','diffraction','standing-waves','doppler-effect','dispersion','nonlinear-waves','solitons'] },
  { id: 'optics', title: 'Optics & Photonics', short: 'Optics', part: 'IV · Waves, Optics & Acoustics', icon: 'aperture', color: '#7fe3b0', description: 'Ray and wave optics, interferometry, lasers, fibres and the quantum boundary of light.',
    topicIds: ['geometrical-optics','physical-optics','lenses-mirrors','interferometers','diffraction-gratings','lasers','fiber-optics','fourier-optics','nonlinear-optics','quantum-optics','photonics'] },
  { id: 'acoustics', title: 'Acoustics', short: 'Acoustics', part: 'IV · Waves, Optics & Acoustics', icon: 'radio', color: '#6fd8b8', description: 'Sound generation, propagation, resonance and its technological applications.',
    topicIds: ['sound-propagation','musical-acoustics','ultrasonics','architectural-acoustics','aeroacoustics','nonlinear-acoustics'] },

  // ── RELATIVITY ───────────────────────────────────────────────────────────
  { id: 'special-relativity', title: 'Special Relativity', short: 'Special relativity', part: 'V · Relativity', icon: 'clock', color: '#ff8fa3', description: 'Spacetime, Lorentz symmetry, causality and the structure of relativistic dynamics.',
    topicIds: ['einstein-postulates','lorentz-transformations','time-dilation-length-contraction','relativity-of-simultaneity','relativistic-momentum','mass-energy-equivalence','four-vectors','minkowski-spacetime','relativistic-energy','relativistic-electrodynamics'] },
  { id: 'general-relativity', title: 'General Relativity', short: 'General relativity', part: 'V · Relativity', icon: 'globe-2', color: '#ff7999', description: 'Curved spacetime, tensor calculus, Einstein’s equations, black holes and gravitational waves.',
    topicIds: ['equivalence-principle','curved-spacetime','metric-tensor','geodesics','christoffel-symbols','curvature-tensors','einstein-field-equations','schwarzschild-solution','kerr-metric','gravitational-time-dilation','gravitational-lensing','black-holes','event-horizons','gravitational-waves','cosmological-solutions','singularity-theorems','numerical-relativity'] },

  // ── QUANTUM & MATTER ─────────────────────────────────────────────────────
  { id: 'quantum-mechanics', title: 'Quantum Mechanics', short: 'Quantum mechanics', part: 'VI · Quantum & Matter', icon: 'atom', color: '#b98cff', description: 'From the ultraviolet catastrophe to entanglement, measurement and quantum computation.',
    topicIds: ['blackbody-radiation','photoelectric-effect','compton-scattering','wave-particle-duality','de-broglie-hypothesis','double-slit-quantum','uncertainty-principle','schrodinger-equation','wavefunctions','operators-observables','eigenstates-eigenvalues','bra-ket','quantum-measurement','quantum-tunneling','quantum-harmonic-oscillator','quantum-angular-momentum','spin','pauli-matrices','hydrogen-atom','identical-particles','exchange-symmetry','entanglement','bell-inequalities','quantum-decoherence','density-matrices','perturbation-theory','variational-methods','wkb-approximation','scattering-theory','path-integral-formulation','quantum-information','quantum-computation'] },
  { id: 'atomic-molecular-optical', title: 'Atomic, Molecular & Optical Physics', short: 'AMO', part: 'VI · Quantum & Matter', icon: 'sparkles', color: '#c68cff', description: 'Atomic spectra, molecular structure, light–matter interaction and ultracold matter.',
    topicIds: ['atomic-structure','atomic-spectra','multi-electron-atoms','fine-structure','hyperfine-structure','zeeman-effect','stark-effect','molecular-bonding','molecular-orbitals','molecular-spectroscopy','laser-physics','light-matter-interaction','cavity-qed','bose-einstein-condensate','ultracold-atoms','optical-trapping','quantum-sensing'] },
  { id: 'condensed-matter', title: 'Condensed Matter Physics', short: 'Condensed matter', part: 'VI · Quantum & Matter', icon: 'boxes', color: '#d28cff', description: 'Crystals, bands, superconductivity, magnetism and topological phases of matter.',
    topicIds: ['crystal-structures','reciprocal-lattices','brillouin-zones','x-ray-diffraction','phonons','band-theory','metals-insulators-semiconductors','superconductivity','bcs-theory','magnetism','ferromagnetism','spintronics','quantum-hall-effect','topological-insulators','strongly-correlated-systems','mott-insulators','graphene','two-dimensional-materials','moire-materials','many-body-physics'] },
  { id: 'nuclear-physics', title: 'Nuclear Physics', short: 'Nuclear', part: 'VI · Quantum & Matter', icon: 'radiation', color: '#a3d98c', description: 'Nuclear structure, decay, reactions, fission and fusion.',
    topicIds: ['nuclear-structure','nuclear-forces','radioactivity','alpha-decay','beta-decay','gamma-decay','nuclear-reactions','nuclear-fission','nuclear-fusion','nuclear-models','neutron-physics','nuclear-astrophysics'] },
  { id: 'particle-physics', title: 'Particle Physics', short: 'Particles', part: 'VI · Quantum & Matter', icon: 'circle-dot', color: '#8cd9b4', description: 'The Standard Model, gauge interactions, accelerators and the search for what lies beyond.',
    topicIds: ['fundamental-particles','quarks-leptons','gauge-bosons','standard-model','qed','qcd','electroweak-theory','higgs-mechanism','symmetry-breaking','feynman-diagrams','scattering-amplitudes','accelerators','detector-physics','neutrino-physics','cp-violation','beyond-standard-model','supersymmetry','gut'] },
  { id: 'quantum-field-theory', title: 'Quantum Field Theory', short: 'QFT', part: 'VI · Quantum & Matter', icon: '-git-branch', color: '#9ad98c', description: 'Fields, symmetries, quantisation, renormalisation and the machinery of modern particle theory.',
    topicIds: ['classical-field-theory','lagrangian-field-theory','noether-theorem','canonical-quantization','creation-annihilation','scalar-fields','dirac-fields','feynman-propagators','wicks-theorem','renormalization','regularization','gauge-theories','path-integrals-qft','effective-field-theories','anomalies','non-abelian-gauge-theories','lattice-field-theory','qft-curved-spacetime'] },

  // ── ASTROPHYSICS & COSMOLOGY ─────────────────────────────────────────────
  { id: 'astrophysics', title: 'Astrophysics', short: 'Astrophysics', part: 'VII · Universe', icon: 'telescope', color: '#7ec8ff', description: 'Stars, compact objects, galaxies and the high-energy universe.',
    topicIds: ['stellar-structure','stellar-evolution','nuclear-burning','white-dwarfs','neutron-stars','pulsars','supernovae','black-hole-astrophysics','accretion-disks','galaxy-formation','dark-matter-astro','cosmic-rays','gravitational-wave-astronomy','exoplanets'] },
  { id: 'cosmology', title: 'Cosmology', short: 'Cosmology', part: 'VII · Universe', icon: 'sparkle', color: '#6bb8ff', description: 'The expanding universe, the Big Bang, inflation, dark energy and cosmic structure.',
    topicIds: ['expanding-universe','hubble-law','friedmann-equations','big-bang','cmb','inflation','dark-energy','large-scale-structure','baryogenesis','primordial-nucleosynthesis','observable-universe','cosmic-horizons','early-universe','quantum-cosmology'] },

  // ── SPECIALISED & INTERDISCIPLINARY ──────────────────────────────────────
  { id: 'plasma-physics', title: 'Plasma & Space Physics', short: 'Plasma', part: 'VIII · Specialised Branches', icon: 'sun', color: '#ffb86b', description: 'Ionised matter, magnetohydrodynamics, the Sun and space environments.',
    topicIds: ['plasma-basics','mhd','space-physics','solar-physics'] },
  { id: 'biophysics-medical', title: 'Biophysics & Medical Physics', short: 'Biophysics', part: 'VIII · Specialised Branches', icon: 'heart-pulse', color: '#ff9eb5', description: 'Physical principles of living systems and medical imaging, therapy and dosimetry.',
    topicIds: ['biophysics','medical-physics','physics-of-living-systems'] },
  { id: 'computational-physics', title: 'Computational Physics', short: 'Computational', part: 'VIII · Specialised Branches', icon: 'cpu', color: '#a0b4ff', description: 'Numerical methods, Monte Carlo techniques and simulation as a third pillar of science.',
    topicIds: ['computational-methods','monte-carlo','simulation-methods','verification-validation'] },
  { id: 'quantum-gravity', title: 'Quantum Gravity', short: 'Quantum gravity', part: 'VIII · Specialised Branches', icon: 'network', color: '#c79cff', description: 'The unfinished unification of general relativity and quantum theory.',
    topicIds: ['string-theory','loop-quantum-gravity','quantum-gravity-phenomenology'] },
  { id: 'complex-systems', title: 'Complex Systems', short: 'Complex systems', part: 'VIII · Specialised Branches', icon: 'share-2', color: '#86d6c2', description: 'Emergence, networks, self-organisation and nonlinear collective behaviour.',
    topicIds: ['nonlinear-complex','network-physics','complex-systems-thermo'] },
  { id: 'experimental-physics', title: 'Experimental Physics & Metrology', short: 'Experimental', part: 'VIII · Specialised Branches', icon: 'microscope', color: '#ffd08a', description: 'Measurement, instrumentation, uncertainty and the design of decisive experiments.',
    topicIds: ['metrology','instrumentation','experimental-design','accelerator-physics'] },
  { id: 'photonics', title: 'Photonics & Optoelectronics', short: 'Photonics', part: 'VIII · Specialised Branches', icon: 'lightbulb', color: '#ffe08a', description: 'Generation, control and detection of light in engineered devices.',
    topicIds: ['optoelectronics','nanophotonics','quantum-photonics'] },
  { id: 'materials-physics', title: 'Materials & Mesoscopic Physics', short: 'Materials', part: 'VIII · Specialised Branches', icon: 'layers-3', color: '#b5d6ff', description: 'Surfaces, nanostructures and the physics of matter between the atomic and the bulk.',
    topicIds: ['surface-physics','mesoscopic-physics','materials-physics-general'] },
  { id: 'space-geophysics', title: 'Atmospheric, Earth & Space Physics', short: 'Earth & space', part: 'VIII · Specialised Branches', icon: 'earth', color: '#8fd0ff', description: 'Fluid and electromagnetic processes in planetary atmospheres and interiors.',
    topicIds: ['atmospheric-physics','geophysics','seismology'] },
]

export const BRANCH_BY_ID = Object.fromEntries(BRANCHES.map(b => [b.id, b])) as Record<string, Branch>

export const ALL_TOPIC_IDS = BRANCHES.flatMap(b => b.topicIds)

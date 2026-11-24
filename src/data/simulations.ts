import type { SimulationMeta } from '../lib/types'

const c = (key: string, label: string, min: number, max: number, step: number, value: number, unit = '') =>
  ({ key, label, min, max, step, value, unit })

export const SIMULATIONS: SimulationMeta[] = [
  {
    id: 'projectile-motion', title: 'Projectile Motion', branchId: 'classical-mechanics',
    description: 'Launch a projectile, watch its trajectory decompose into independent horizontal and vertical motion, and compare with the analytic parabola.',
    controls: [c('v0', 'Launch speed', 2, 40, 0.5, 22, 'm/s'), c('angle', 'Launch angle', 5, 85, 1, 45, '°'), c('g', 'Gravity', 0.5, 20, 0.1, 9.8, 'm/s²'), c('drag', 'Air resistance', 0, 0.4, 0.01, 0, '')],
    equations: ['x(t) = v₀ cosθ · t', 'y(t) = v₀ sinθ · t − ½gt²', 'R = v₀² sin(2θ) / g'],
    reading: ['The horizontal and vertical motions are independent: gravity changes only v_y.', 'The trajectory is a parabola because y is quadratic in x.', 'Maximum range occurs at 45° when drag is absent.', 'Turn on drag to break the symmetry — the optimal angle drops below 45°.'],
  },
  {
    id: 'pendulum', title: 'Simple Pendulum', branchId: 'classical-mechanics',
    description: 'Explore the transition from simple harmonic motion at small angles to anharmonic behaviour at large amplitudes.',
    controls: [c('length', 'Length', 0.5, 4, 0.1, 2, 'm'), c('theta', 'Initial angle', 5, 170, 1, 30, '°'), c('g', 'Gravity', 1, 20, 0.1, 9.8, 'm/s²'), c('damping', 'Damping', 0, 0.5, 0.01, 0, '')],
    equations: ['θ̈ + (g/L) sinθ = 0', 'T₀ = 2π√(L/g)', 'T ≈ T₀(1 + θ₀²/16 + …)'],
    reading: ['For small angles sinθ ≈ θ and the motion is simple harmonic.', 'The period is independent of amplitude only in the small-angle limit.', 'Large amplitudes lengthen the period — the SHM approximation fails.', 'Energy continually exchanges between kinetic and gravitational potential.'],
  },
  {
    id: 'double-pendulum', title: 'Double Pendulum · Chaos', branchId: 'classical-mechanics',
    description: 'Two coupled pendula exhibit deterministic chaos: two nearly identical initial conditions diverge exponentially.',
    controls: [c('theta1', 'Upper angle', 20, 170, 1, 120, '°'), c('theta2', 'Lower angle', 20, 170, 1, 10, '°'), c('perturb', 'Initial offset δ', 0, 0.01, 0.0001, 0.001, 'rad'), c('speed', 'Time scale', 0.2, 3, 0.1, 1, '×')],
    equations: ['L = ½(m₁+m₂)L₁²θ̇₁² + ½m₂L₂²θ̇₂² + m₂L₁L₂θ̇₁θ̇₂cos(θ₁−θ₂) + (m₁+m₂)gL₁cosθ₁ + m₂gL₂cosθ₂', 'Δ(t) ≈ Δ₀ e^{λt}'],
    reading: ['The equations are fully deterministic — no randomness is added.', 'Two trajectories differing by 0.001 rad separate completely over time.', 'This sensitive dependence is the hallmark of chaos.', 'Energy is conserved; the divergence is due to nonlinear coupling, not noise.'],
  },
  {
    id: 'collisions', title: 'Elastic & Inelastic Collisions', branchId: 'classical-mechanics',
    description: 'Collide two bodies on a frictionless track and verify momentum and energy conservation directly.',
    controls: [c('m1', 'Mass A', 0.5, 8, 0.1, 2, 'kg'), c('m2', 'Mass B', 0.5, 8, 0.1, 3, 'kg'), c('v1', 'Velocity A', -8, 8, 0.1, 5, 'm/s'), c('v2', 'Velocity B', -8, 8, 0.1, -2, 'm/s'), c('e', 'Restitution e', 0, 1, 0.05, 1, '')],
    equations: ['m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′', "v₂′ − v₁′ = e(v₁ − v₂)", 'ΔK = ½μ(1−e²)(v₁−v₂)²'],
    reading: ['Momentum is conserved in every collision shown.', 'Kinetic energy is conserved only when e = 1 (perfectly elastic).', 'At e = 0 the bodies leave with a common velocity.', 'The lost kinetic energy becomes internal energy, sound and deformation.'],
  },
  {
    id: 'orbital-mechanics', title: 'Orbital Mechanics', branchId: 'classical-mechanics',
    description: 'Launch a satellite in an inverse-square gravitational field and observe conic-section orbits.',
    controls: [c('v', 'Launch speed', 0.4, 2.2, 0.01, 1, '× v_circ'), c('r', 'Launch radius', 0.5, 3, 0.05, 1.4, 'R'), c('angle', 'Launch angle', -60, 60, 1, 0, '°')],
    equations: ['F = −GMm r̂ / r²', 'ε = v²/2 − GM/r', 'p = h²/GM,  e = √(1 + 2εh²/(GM)²)'],
    reading: ['Bound orbits (ε < 0) are ellipses with the attracting body at one focus.', 'At exactly the circular speed the orbit is a circle.', 'Above escape speed (ε ≥ 0) the trajectory becomes parabolic or hyperbolic.', 'Equal areas are swept in equal times — Kepler’s second law.'],
  },
  {
    id: 'electric-field', title: 'Electric Field Lines', branchId: 'electromagnetism',
    description: 'Place point charges and visualise the resulting electric field with streamlines, equipotentials and a probe test charge.',
    controls: [c('q1', 'Charge A', -3, 3, 0.1, 1, 'q'), c('q2', 'Charge B', -3, 3, 0.1, -1, 'q'), c('sep', 'Separation', 0.5, 5, 0.1, 2.6, 'a'), c('probe', 'Probe speed', 0, 2, 0.05, 0.7, '')],
    equations: ['E⃗(r) = (1/4πε₀) Σ qᵢ (r⃗ − r⃗ᵢ)/|r⃗ − r⃗ᵢ|³', 'V(r) = (1/4πε₀) Σ qᵢ/|r⃗ − r⃗ᵢ|', 'F⃗ = q_test E⃗'],
    reading: ['Field lines start on positive charge and end on negative charge.', 'Line density encodes field magnitude.', 'Equipotential surfaces are everywhere perpendicular to field lines.', 'A dipole’s far field falls as 1/r³, faster than a monopole’s 1/r².'],
  },
  {
    id: 'em-wave', title: 'Electromagnetic Wave', branchId: 'electromagnetism',
    description: 'Watch a plane EM wave propagate: the oscillating E and B fields are mutually perpendicular and in phase.',
    controls: [c('freq', 'Frequency', 0.2, 3, 0.05, 1, '×'), c('amp', 'Amplitude', 0.2, 2, 0.05, 1, ''), c('phase', 'E–B phase', 0, 180, 5, 0, '°')],
    equations: ['E⃗ = E₀ ŷ cos(kx − ωt)', 'B⃗ = B₀ ẑ cos(kx − ωt)', 'c = E₀/B₀ = 1/√(ε₀μ₀)'],
    reading: ['The fields oscillate in phase and are transverse to the propagation direction.', 'E × B points along the direction of energy flow.', 'Changing the phase offset breaks the source-free Maxwell solution.', 'Frequency and wavelength are related by c = λν.'],
  },
  {
    id: 'pv-diagram', title: 'PV Diagram & Ideal Gas', branchId: 'thermodynamics',
    description: 'Drag through thermodynamic paths on a PV diagram and watch work, heat and internal energy update in real time.',
    controls: [c('n', 'Moles', 0.5, 5, 0.1, 1, 'mol'), c('T', 'Temperature', 100, 600, 5, 300, 'K'), c('process', 'Process (0 iso · 1 iso-bar · 2 adiabat)', 0, 2, 1, 0, '')],
    equations: ['PV = nRT', 'W = ∫ P dV', 'ΔU = Q − W', 'PV^γ = const (adiabatic)'],
    reading: ['The area under a curve on a PV diagram equals the work done.', 'For an ideal gas, internal energy depends only on temperature.', 'An isotherm keeps ΔU = 0, so all heat input becomes work.', 'An adiabat has Q = 0, so work comes entirely from internal energy.'],
  },
  {
    id: 'gas-molecules', title: 'Molecular Gas Simulation', branchId: 'statistical-mechanics',
    description: 'Hundreds of elastic hard-disk collisions generate a Maxwell–Boltzmann speed distribution from microscopic dynamics.',
    controls: [c('count', 'Molecules', 50, 500, 10, 240, ''), c('temp', 'Temperature', 0.2, 4, 0.1, 1, '×'), c('radius', 'Molecular radius', 1, 6, 0.2, 2.5, 'px')],
    equations: ['f(v) = 4π (m/2πkT)^{3/2} v² e^{−mv²/2kT}', '⟨v⟩ = √(8kT/πm)', 'PV = NkT'],
    reading: ['No particle is told what distribution to follow — it emerges from collisions.', 'Raising temperature broadens the distribution and shifts its peak.', 'The most probable, mean and RMS speeds are all different.', 'Pressure is the time-averaged momentum flux on the container wall.'],
  },
  {
    id: 'wave-interference', title: 'Wave Interference & Superposition', branchId: 'waves',
    description: 'Superpose two coherent waves and explore constructive and destructive interference, beats and phase difference.',
    controls: [c('f1', 'Frequency A', 0.5, 4, 0.05, 2, 'Hz'), c('f2', 'Frequency B', 0.5, 4, 0.05, 2.2, 'Hz'), c('phase', 'Phase offset', 0, 360, 5, 0, '°'), c('amp', 'Amplitude', 0.3, 2, 0.05, 1, '')],
    equations: ['y = A₁ sin(k₁x − ω₁t) + A₂ sin(k₂x − ω₂t + φ)', 'A_result = 2A cos(Δφ/2)', 'Beat frequency = |f₁ − f₂|'],
    reading: ['In phase, amplitudes add; in antiphase, they cancel.', 'Slightly different frequencies produce beats at the difference frequency.', 'The superposition principle holds only for linear wave equations.', 'Energy is redistributed in space, not created or destroyed.'],
  },
  {
    id: 'double-slit', title: 'Double-Slit Experiment', branchId: 'optics',
    description: 'Build Young’s interference pattern. Vary slit separation, wavelength and screen distance to test the fringe-spacing law.',
    controls: [c('lambda', 'Wavelength', 380, 750, 5, 550, 'nm'), c('d', 'Slit separation', 0.1, 2, 0.02, 0.5, 'mm'), c('L', 'Screen distance', 0.5, 4, 0.1, 2, 'm'), c('slits', 'Number of slits', 1, 5, 1, 2, '')],
    equations: ['d sinθ = mλ  (bright fringes)', 'Δy = λL/d', 'I(θ) = I₀ cos²(πd sinθ/λ)'],
    reading: ['Fringes arise from the path difference between slits.', 'Increasing slit separation makes fringes closer together.', 'Longer wavelengths give wider fringe spacing.', 'The same mathematics appears for matter waves — this is the quantum double slit.'],
  },
  {
    id: 'wavefunction', title: 'Wavefunction & Particle in a Box', branchId: 'quantum-mechanics',
    description: 'Visualise stationary states of an infinite square well, their probability densities and the effect of superposition.',
    controls: [c('n', 'State n', 1, 6, 1, 2, ''), c('mix', 'Superposition n₂', 1, 6, 1, 3, ''), c('weight', 'Mix weight', 0, 1, 0.02, 0, ''), c('L', 'Box width', 1, 6, 0.1, 3, 'a')],
    equations: ['ψₙ(x) = √(2/L) sin(nπx/L)', 'Eₙ = n²π²ℏ²/(2mL²)', 'P(x) = |ψ(x)|²'],
    reading: ['Only discrete energies are allowed — quantisation follows from boundary conditions.', 'ψ itself may be negative; the probability density |ψ|² never is.', 'Higher n states have more nodes and higher kinetic energy.', 'A superposition is not a stationary state: the density oscillates in time.'],
  },
  {
    id: 'quantum-tunneling', title: 'Quantum Tunneling', branchId: 'quantum-mechanics',
    description: 'Send a wave packet at a rectangular barrier and watch the transmitted amplitude decay exponentially with barrier width.',
    controls: [c('E', 'Particle energy', 0.1, 2.5, 0.05, 0.8, '× V₀'), c('width', 'Barrier width', 0.1, 2, 0.02, 0.6, 'a'), c('V0', 'Barrier height', 0.5, 3, 0.05, 1, ''), c('speed', 'Animation speed', 0.2, 3, 0.1, 1, '×')],
    equations: ['κ = √(2m(V₀−E))/ℏ', 'T ≈ e^{−2κa}  (κa ≫ 1)', 'R + T = 1'],
    reading: ['Classically the particle is reflected with certainty when E < V₀.', 'Quantum mechanically the wavefunction decays inside the barrier but does not vanish.', 'Transmission depends exponentially on barrier width — hence its technological sensitivity.', 'The reflected and transmitted probabilities always sum to one.'],
  },
  {
    id: 'spacetime', title: 'Spacetime Diagrams & Lorentz Transform', branchId: 'special-relativity',
    description: 'Compare Galilean and Lorentz transformations on a Minkowski diagram, including light cones and relativity of simultaneity.',
    controls: [c('beta', 'Frame velocity v/c', 0, 0.95, 0.01, 0.6, ''), c('ct', 'Event ct', 0.2, 3, 0.05, 1.4, ''), c('x', 'Event x', -3, 3, 0.05, 1, '')],
    equations: ['ct′ = γ(ct − βx)', 'x′ = γ(x − βct)', 'γ = 1/√(1−β²)', 's² = (ct)² − x² = invariant'],
    reading: ['Worldlines of light always lie at 45° in both frames.', 'Events simultaneous in one frame are not simultaneous in another.', 'The spacetime interval s² is invariant even though space and time separately are not.', 'The Galilean transform is the low-velocity limit β ≪ 1.'],
  },
  {
    id: 'gravitational-lensing', title: 'Gravitational Lensing', branchId: 'general-relativity',
    description: 'Trace light rays past a compact mass and see how spacetime curvature bends them into arcs and Einstein rings.',
    controls: [c('mass', 'Lens mass', 0.2, 4, 0.1, 1.5, 'M'), c('impact', 'Impact parameter', 0.5, 5, 0.1, 2, 'b'), c('alignment', 'Source offset', -3, 3, 0.1, 0.2, '')],
    equations: ['α = 4GM/(c²b)', 'θ_E = √(4GM/c² · D_LS/(D_L D_S))', 'ds² = −(1−2GM/rc²)c²dt² + (1−2GM/rc²)⁻¹dr² + …'],
    reading: ['Light follows null geodesics in curved spacetime.', 'GR predicts twice the deflection of the Newtonian 1911 estimate.', 'Perfect alignment produces an Einstein ring.', 'Lensing is now a standard tool for mapping dark matter.'],
  },
  {
    id: 'particle-collision', title: 'Particle Collision Event', branchId: 'particle-physics',
    description: 'Reconstruct a stylised high-energy collision event, with tracks curving in a magnetic field and invariant-mass calculation.',
    controls: [c('energy', 'Collision energy', 10, 200, 5, 60, 'GeV'), c('B', 'Magnetic field', 0.2, 5, 0.1, 2, 'T'), c('multiplicity', 'Track multiplicity', 4, 30, 1, 14, ''), c('boost', 'Boost along z', 0, 3, 0.1, 0, '')],
    equations: ['p = qBR', 'E² = (pc)² + (mc²)²', 'm² = (ΣE)² − |Σp⃗|²  (c = 1)'],
    reading: ['Charged particles leave curved tracks; the radius measures momentum.', 'Neutral particles are invisible to the tracker and inferred from missing energy.', 'Invariant mass is reconstructed from the four-vectors of decay products.', 'This event is stylised for teaching, not real detector data.'],
  },
  {
    id: 'expanding-universe', title: 'Expanding Universe & Hubble Law', branchId: 'cosmology',
    description: 'Watch cosmic expansion, see galaxies recede with v = H₀d, and explore how the Hubble parameter changes with epoch.',
    controls: [c('H0', 'Hubble constant', 30, 100, 1, 70, 'km/s/Mpc'), c('omegaM', 'Matter density Ωₘ', 0.05, 1.4, 0.01, 0.3, ''), c('omegaL', 'Dark energy ΩΛ', 0, 1.2, 0.01, 0.7, ''), c('t', 'Cosmic time', 0, 14, 0.1, 13.8, 'Gyr')],
    equations: ['H² = H₀²[Ωₘa⁻³ + Ωᵣa⁻⁴ + ΩΛ + (1−Ω)a⁻²]', 'v_rec = H₀ d', 'a(t) ∝ t^{2/3} (matter),  e^{Ht} (Λ)'],
    reading: ['Galaxies recede because space itself expands, not because they fly through a fixed space.', 'The same model fits both nearby Hubble flow and distant supernovae.', 'Dark energy drives accelerated expansion at late times.', 'The Hubble constant measured locally and from the CMB disagree — the Hubble tension.'],
  },
  {
    id: 'carnot-cycle', title: 'Carnot Cycle', branchId: 'thermodynamics',
    description: 'Step through the four reversible strokes of a Carnot engine on a PV diagram and read off the maximum possible efficiency.',
    controls: [c('Th', 'Hot temperature', 350, 900, 10, 600, 'K'), c('Tc', 'Cold temperature', 200, 500, 10, 300, 'K'), c('phase', 'Cycle position', 0, 4, 0.01, 0, 'strokes'), c('n', 'Moles', 0.5, 3, 0.1, 1, 'mol')],
    equations: ['η_max = 1 − T_c/T_h', 'Q_h/T_h + Q_c/T_c = 0', 'W_net = Q_h + Q_c'],
    reading: ['No engine between two reservoirs can exceed Carnot efficiency.', 'Efficiency depends only on the two temperatures, not the working substance.', 'Reaching 100% efficiency would require T_c = 0, forbidden by the third law.', 'Real engines are less efficient because of irreversibility.'],
  },
]

export const SIM_BY_ID = Object.fromEntries(SIMULATIONS.map(s => [s.id, s])) as Record<string, SimulationMeta>

import type { Topic, Derivation, Problem, Experiment } from '../lib/types'

// Content for the Universe branches: astrophysics, cosmology, plasma and space
// physics, biophysics and medical physics, computational physics, quantum
// gravity, complex systems, experimental physics, photonics, materials physics
// and space geophysics. Topic ids are canonical (see architecture.ts); ids for
// derivations, problems and experiments are prefixed with "u-".

export const UNIVERSE_TOPICS: Topic[] = [
  {
    id: 'stellar-structure',
    title: 'Stellar Structure',
    branchId: 'astrophysics',
    level: 'Undergraduate 3',
    summary: 'How a self-gravitating ball of gas stays in equilibrium, transports energy and burns nuclear fuel.',
    prerequisites: [],
    tags: ['stars', 'hydrostatic equilibrium', 'polytropes', 'energy transport'],
    derivationIds: ['u-hydrostatic-equilibrium'],
    blocks: [
      { kind: 'paragraph', text: `A star is a self-gravitating sphere of hot gas in near-perfect mechanical balance. Gravity tries to squeeze every layer inward; the pressure gradient produced by hot matter pushes outward. The whole subject of stellar structure is the study of that balance together with how energy moves from the centre to the surface.` },
      { kind: 'heading', text: 'Core equations of a static star', level: 2 },
      { kind: 'paragraph', text: `For a spherical, non-rotating star we describe the interior by four coupled first-order ordinary differential equations in radius r: hydrostatic equilibrium, mass continuity, energy generation and energy transport. Together with an equation of state and an opacity law they form a well-posed boundary-value problem.` },
      { kind: 'math', latex: String.raw`\frac{dP}{dr}=-\frac{G\,m(r)\,\rho(r)}{r^{2}},\qquad \frac{dm}{dr}=4\pi r^{2}\rho(r)`, display: true, caption: `Pressure falls outward because each shell must support the weight above it.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: String.raw`Imagine a thin shell at radius r. Its inner face feels a slightly larger pressure than its outer face, and that difference must equal the shell's weight per unit area. If pressure were too low the star would collapse on a dynamical timescale of order $\sqrt{R^{3}/GM}$; if it were too high the star would expand. The Sun's central pressure is roughly $2.5\times10^{16}$ Pa and its central temperature about $1.5\times10^{7}$ K, set by the requirement that nuclear burning supply the observed luminosity.` },
      { kind: 'math', latex: String.raw`\frac{dL}{dr}=4\pi r^{2}\rho\,\epsilon,\qquad \frac{dT}{dr}=-\frac{3\kappa\rho L}{16\pi a c\,r^{2}T^{3}}\;(\mathrm{radiative})`, display: true },
      { kind: 'steps', title: 'Building a one-dimensional stellar model', items: [
        { title: 'Choose inputs', text: String.raw`Fix total mass M, chemical composition and the microphysics (equation of state, opacity $\kappa$, nuclear rate $\epsilon$).`, math: String.raw`P=\frac{\rho k_{\rm B}T}{\mu m_{\rm H}}` },
        { title: 'Integrate outward', text: `Start at the centre with m(0)=0, L(0)=0 and a trial T_c, then integrate the structure equations to the surface.`, math: String.raw`m(r)=\int_0^r 4\pi r'^2\rho\,dr'` },
        { title: 'Apply surface boundary', text: String.raw`Require $P(R)\approx 0$ and $L(R)=L_{\rm obs}$; adjust T_c until both conditions hold.` },
        { title: 'Test stability', text: String.raw`Check that the solution is stable against convection using the Schwarzschild criterion $\nabla_{\rm rad}<\nabla_{\rm ad}$.` }
      ] },
      { kind: 'table', headers: ['Regime', 'Transport law', 'Where it occurs'], rows: [
        ['Radiative', String.raw`$F=-\frac{16\pi a c\,r^{2}T^{3}}{3\kappa\rho}\frac{dT}{dr}$`, 'Solar inner regions, massive-star cores'],
        ['Convective', String.raw`$F\approx \rho c_p v_{\rm conv}\,\Delta T$`, 'Cool outer envelopes, massive-star cores'],
        ['Degenerate', String.raw`$P\propto\rho^{5/3}\ \mathrm{or}\ \rho^{4/3}$`, 'White dwarfs, stellar cores late in life']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: String.raw`Established modelling assumes spherical symmetry, hydrostatic equilibrium, Newtonian gravity and local thermodynamic equilibrium. Rotation, magnetic fields, mass loss and large-scale convective motions are usually added as perturbations. Polytropic models replace the energy equation by $P=K\rho^{1+1/n}$; the n=3 polytrope (Eddington standard model) captures the main-sequence Sun surprisingly well.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Helioseismology measures solar oscillation modes and reconstructs the internal sound-speed profile, confirming the standard solar model to better than a percent outside the core. Solar neutrino fluxes directly probe central temperature. Asteroseismology from Kepler and TESS extends such tests to thousands of stars, and eclipsing binaries yield masses and radii that match stellar-structure predictions.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Convection is still treated with the approximate mixing-length prescription rather than from first principles. The solar metallicity problem is a disagreement between spectroscopic abundances and helioseismic inferred opacity. Rotational mixing, magnetic activity and mass loss remain uncertain, especially for low-mass and very massive stars.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Stellar structure is applied thermodynamics and fluid mechanics: it uses the virial theorem, the same pressure-gradient force as in fluid statics, and nuclear reaction rates. It supplies the initial conditions for stellar evolution and the physical context for supernovae and neutron stars.` }
    ]
  },
  {
    id: 'stellar-evolution',
    title: 'Stellar Evolution',
    branchId: 'astrophysics',
    level: 'Undergraduate 3',
    summary: 'Why stars change as they burn fuel, and how mass determines their final fate.',
    prerequisites: ['stellar-structure'],
    tags: ['HR diagram', 'main sequence', 'red giants', 'nucleosynthesis'],
    derivationIds: [],
    problemIds: [],
    blocks: [
      { kind: 'paragraph', text: `A star is not static over its lifetime: nuclear burning changes its composition, opacity and core temperature, forcing the whole structure to readjust. Stellar evolution tracks these changes across the Hertzsprung–Russell diagram and predicts the endpoints: white dwarfs, neutron stars or black holes.` },
      { kind: 'heading', text: 'The main sequence', level: 2 },
      { kind: 'paragraph', text: `Stars spend most of their lives burning hydrogen in their cores. For main-sequence stars the mass–luminosity relation is approximately L proportional to M to the 3.5, steep enough that lifetime falls rapidly with mass. The available fuel is the small fraction of rest mass converted by fusion, with efficiency about 0.007 per unit mass burned.` },
      { kind: 'math', latex: String.raw`L\simeq L_\odot\left(\frac{M}{M_\odot}\right)^{3.5},\qquad t_{\rm MS}\sim \frac{0.007\,f\,Mc^{2}}{L}\approx 10\,{\rm Gyr}\left(\frac{M}{M_\odot}\right)^{-2.5}`, display: true, caption: `Here f is the fraction of the stellar mass that participates in core burning, roughly 0.1 for the Sun.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `A higher-mass star has more fuel but radiates it away disproportionately faster because its core is hotter and fusion rates are steeply temperature dependent. The Sun has roughly 10 Gyr of main-sequence life; a 10 solar mass star has only a few tens of millions of years. When core hydrogen is exhausted, the core contracts while the envelope expands: the 'mirror principle' of post-main-sequence evolution.` },
      { kind: 'math', latex: String.raw`T_{\rm c}\uparrow \Rightarrow \epsilon_{\rm nuc}\propto T^{n}\uparrow \Rightarrow L\uparrow` , display: true },
      { kind: 'steps', title: 'Post-main-sequence sequence for a low-mass star', items: [
        { title: 'Core hydrogen exhaustion', text: `The inert helium core contracts until hydrogen burns in a shell around it.` },
        { title: 'Red giant branch', text: `The envelope expands and cools; the star moves up and to the right in the HR diagram.` },
        { title: 'Helium ignition', text: `For masses below about 2 solar masses the degenerate helium core ignites in a helium flash; above that mass ignition is gradual.` },
        { title: 'Asymptotic giant branch', text: `Shell burning of hydrogen and helium alternates, driving strong winds and pulsations.` },
        { title: 'Remnant', text: `The envelope is expelled as a planetary nebula and the exposed core becomes a carbon–oxygen white dwarf.` }
      ] },
      { kind: 'table', headers: ['Initial mass', 'Late stages', 'Final remnant'], rows: [
        ['Below about 0.5 solar mass', 'Very slow hydrogen burning', 'Helium white dwarf (in principle)'],
        ['About 0.5–8 solar masses', 'Red giant, helium flash or quiet burning, AGB', 'Carbon–oxygen white dwarf'],
        ['Above roughly 8–10 solar masses', 'Successive burning stages up to iron', 'Core-collapse supernova, neutron star or black hole']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Standard tracks assume single, non-rotating stars with solar-like composition and approximate convection and mass loss. Binary interaction, rotation-driven mixing and magnetic braking can radically alter the track. The mass thresholds in the table are approximate and metallicity dependent.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Star-cluster colour–magnitude diagrams show main-sequence turnoffs whose ages agree with the predicted fuel consumption. Gaia and Hipparcos parallaxes calibrate luminosities directly. Observations of planetary nebulae and white dwarfs confirm the low-mass endpoint, while identified supernova progenitors confirm that some massive stars end as core collapse.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `The efficiency of rotational mixing, the mechanism of mass loss during the AGB and the progenitors of Type Ia supernovae are debated. The relative importance of single-star and binary evolution for the most luminous stars remains unsettled.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Stellar evolution ties stellar structure to nuclear astrophysics and to the chemical enrichment of galaxies. It supplies the progenitor conditions for supernovae and neutron stars, the standard candles used in cosmology, and the time clocks used to date star clusters.` }
    ]
  },
  {
    id: 'supernovae',
    title: 'Supernovae',
    branchId: 'astrophysics',
    level: 'Undergraduate 4',
    summary: 'Thermonuclear explosions of white dwarfs and core collapse of massive stars, their light curves and their cosmological use.',
    prerequisites: ['stellar-evolution', 'neutron-stars'],
    tags: ['explosions', 'neutrinos', 'standard candles', 'nucleosynthesis'],
    simulationIds: ['orbital-mechanics'],
    blocks: [
      { kind: 'paragraph', text: `A supernova is the catastrophic disruption of a star, briefly shining with a large fraction of its binding energy. Two physically distinct channels exist: thermonuclear disruption of a carbon–oxygen white dwarf (Type Ia) and gravitational collapse of the iron core of a massive star (Types II, Ib and Ic).` },
      { kind: 'heading', text: 'Two physical channels', level: 2 },
      { kind: 'paragraph', text: `A Type Ia explosion occurs when a white dwarf approaches the Chandrasekhar mass, though sub-Chandrasekhar double-detonation models are also actively studied. A core-collapse supernova begins when an iron core can no longer gain energy from fusion: electron capture and photodisintegration remove pressure support and the core collapses to nuclear density in under a second.` },
      { kind: 'math', latex: String.raw`M_{\rm Ch}\approx \frac{5.83}{\mu_e^{2}}M_\odot\approx 1.44\,M_\odot\;(\mu_e=2),\qquad E_{\rm SN}\sim 10^{51}\,{\rm erg}`, display: true },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Most of the explosion energy is not light: about 99 percent appears as neutrinos from the newly formed proto-neutron star, roughly one percent as kinetic energy of the ejecta and only about 0.01 percent as electromagnetic radiation. The optical light curve is powered not by the explosion directly but by radioactive decay of nickel-56 synthesised in the ejecta.` },
      { kind: 'math', latex: String.raw`L(t)\simeq M_{\rm Ni}\left(\frac{Q_{\rm Ni}}{\tau_{\rm Ni}}e^{-t/\tau_{\rm Ni}}+\frac{Q_{\rm Co}}{\tau_{\rm Co}}e^{-t/\tau_{\rm Co}}\right)`, display: true, caption: `Decay times are about 8.8 days for nickel-56 and 111 days for cobalt-56.` },
      { kind: 'steps', title: 'Core-collapse sequence', items: [
        { title: 'Iron core grows', text: `Fusion no longer releases energy once iron-group nuclei dominate.` },
        { title: 'Collapse', text: `Electron captures and photodisintegration reduce pressure; the core falls at a significant fraction of light speed.` },
        { title: 'Bounce', text: `The inner core reaches nuclear density and rebounds, launching a shock.` },
        { title: 'Shock revival', text: `Neutrino heating behind the stalled shock, aided by convection and turbulence, re-energises it; this is the delayed neutrino mechanism.` },
        { title: 'Remnant and ejecta', text: `A neutron star or black hole remains while the mantle is ejected and enriched with heavy elements.` }
      ] },
      { kind: 'table', headers: ['Class', 'Progenitor', 'Spectral signature'], rows: [
        ['Type Ia', 'White dwarf in a binary', 'No hydrogen, strong silicon line'],
        ['Type II', 'Massive star retaining hydrogen', 'Hydrogen lines'],
        ['Type Ib', 'Stripped massive star', 'No hydrogen, helium lines'],
        ['Type Ic', 'Fully stripped massive star', 'No hydrogen or helium lines']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `The delayed neutrino mechanism is the established working picture, supported by simulations, but the detailed explosion is not yet derived from first principles in full three dimensions. Type Ia light-curve standardisation assumes an empirical relation between peak luminosity and decline rate (the Phillips relation) whose physical origin lies in the amount of nickel produced.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `SN 1987A confirmed neutrino emission from core collapse, with a burst detected hours before the optical light. Historical events such as SN 1054 left identified remnants. Type Ia supernovae at cosmological distances provided the first direct evidence for accelerated expansion, and their light curves remain a pillar of the distance ladder.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Which stars explode and which collapse directly to black holes is not settled. The progenitor systems of Type Ia supernovae (single-degenerate versus double-degenerate) remain debated. Asymmetry, mixing and the exact neutrino-heating conditions require ever larger simulations.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Supernovae connect stellar evolution, nuclear physics, neutrino physics and cosmology. They seed the interstellar medium with heavy elements, drive galactic outflows and provide the standardisable candles that revealed dark energy.` }
    ]
  },
  {
    id: 'neutron-stars',
    title: 'Neutron Stars',
    branchId: 'astrophysics',
    level: 'Undergraduate 4',
    summary: 'Ultradense stellar remnants, their equation of state, relativistic structure and observable pulsar phenomenology.',
    prerequisites: ['supernovae'],
    tags: ['compact objects', 'TOV equation', 'pulsars', 'dense matter'],
    problemIds: ['u-ns-compactness'],
    blocks: [
      { kind: 'paragraph', text: `A neutron star is the collapsed core of a massive star, with a mass of about 1.4 solar masses packed into a radius of roughly 11 to 13 kilometres. Its mean density approaches and exceeds nuclear density, making it a laboratory for matter under conditions unreachable on Earth.` },
      { kind: 'heading', text: 'Structure and equilibrium', level: 2 },
      { kind: 'paragraph', text: `General-relativistic hydrostatic equilibrium is described by the Tolman–Oppenheimer–Volkoff (TOV) equations. For a given equation of state they produce a one-parameter family of stars and a maximum mass; rotation can raise that maximum by roughly 20 percent. Observed masses near 2 solar masses rule out soft equations of state that collapse at lower mass.` },
      { kind: 'math', latex: String.raw`C\equiv\frac{GM}{Rc^{2}}\approx 0.17\left(\frac{M}{1.4M_\odot}\right)\left(\frac{12\,{\rm km}}{R}\right)`, display: true, caption: `Compactness C controls most relativistic observables.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Gravity at the surface is about 10^{12} m/s squared, a billion times terrestrial gravity, and the escape speed is a sizeable fraction of light speed. Light emerging from the surface is gravitationally redshifted. Despite the extreme gravity, the star is supported by neutron degeneracy pressure plus the nuclear repulsive core, not by ongoing fusion.` },
      { kind: 'math', latex: String.raw`z=\left(1-\frac{2GM}{Rc^{2}}\right)^{-1/2}-1\approx 0.2,\qquad \Lambda\sim \frac{k_2}{C^{5}}`, display: true, caption: String.raw`The tidal deformability $\Lambda$ is very sensitive to radius, scaling approximately as C to the minus five.` },
      { kind: 'steps', title: 'Reading a pulsar', items: [
        { title: 'Measure the period', text: `A rotating magnetised star beams radiation along its magnetic axis; pulses are seen when the beam sweeps the line of sight.` },
        { title: 'Time the spin-down', text: `Magnetic dipole radiation removes rotational energy, giving a positive period derivative.` , math: String.raw`\dot E_{\rm rot}=-4\pi^{2}I\frac{\dot P}{P^{3}}` },
        { title: 'Infer magnetic field', text: String.raw`Under the dipole assumption the surface field follows from $P$ and $\dot P$.` },
        { title: 'Look for timing anomalies', text: `Glitches reveal coupling between the solid crust and the superfluid interior; timing arrays search for nanohertz gravitational waves.` }
      ] },
      { kind: 'table', headers: ['Layer', 'Physical content', 'Typical scale'], rows: [
        ['Atmosphere and envelope', 'Electrons, ions, strong magnetic fields', 'Centimetres to metres'],
        ['Solid crust', 'Neutron-rich nuclei, electrons, imprinted lattice', 'About 1 km'],
        ['Outer core', 'Neutrons, protons, electrons, muons; superfluid and superconducting', 'Several km'],
        ['Inner core', 'Possible hyperons, meson condensates or deconfined quarks', 'Hypothetical']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Established results use GR plus a hydrostatic, axisymmetric configuration and a causal equation of state. The composition of the inner core is a hypothesis: hyperons, condensates and quark matter are all proposed but not confirmed. The dipole spin-down estimate for magnetic field is an order-of-magnitude model, not a direct measurement.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Pulsar timing gives precise masses, including stars near 2 solar masses. NICER measures X-ray pulse profiles to infer radii. The gravitational-wave event GW170817 from a binary neutron-star merger constrained tidal deformability and hence the equation of state, while kilonova observations linked such mergers to heavy-element synthesis.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `The true maximum mass, the onset of exotic phases, the mechanism of glitches and the evolution of magnetic fields are open. Whether the heaviest observed neutron stars contain quarks is a live, unresolved question.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Neutron stars join supernova physics, nuclear physics, general relativity and gravitational-wave astronomy. Their strong fields also make them plasma and magnetohydrodynamics laboratories, and their stable rotation underpins tests of gravity.` }
    ]
  },
  {
    id: 'accretion-disks',
    title: 'Accretion Disks',
    branchId: 'astrophysics',
    level: 'Graduate',
    summary: 'How angular momentum transport converts gravitational energy into radiation around compact objects.',
    prerequisites: ['stellar-structure'],
    tags: ['black holes', 'viscosity', 'X-ray binaries', 'jets'],
    problemIds: ['u-eddington-limit'],
    simulationIds: ['orbital-mechanics'],
    blocks: [
      { kind: 'paragraph', text: `Gas falling toward a compact object usually has too much angular momentum to land directly. It forms a rotating, flattened disk in which an effective viscosity transports angular momentum outward and lets mass move inward, releasing gravitational binding energy with high efficiency.` },
      { kind: 'heading', text: 'The alpha-disk model', level: 2 },
      { kind: 'paragraph', text: String.raw`In the Shakura–Sunyaev model the turbulent stress is parameterised as $\tau_{r\phi}=\alpha P$ with $\alpha$ below unity. The disk is geometrically thin, optically thick and in local thermal balance; viscous heating is radiated locally as a multi-temperature blackbody.` },
      { kind: 'math', latex: String.raw`\sigma T_{\rm eff}^{4}=\frac{3GM\dot M}{8\pi R^{3}}\left(1-\sqrt{\frac{R_{\rm in}}{R}}\right)`, display: true, caption: `The factor in parentheses enforces zero torque at the inner edge.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `A parcel of gas gives up roughly half its binding energy while spiralling from infinity to the innermost stable circular orbit. For a non-spinning black hole that orbit lies at 6GM/c squared and the efficiency is about 0.06; for an extremal Kerr black hole it can reach about 0.42, far above the 0.007 of stellar fusion.` },
      { kind: 'math', latex: String.raw`L_{\rm acc}=\eta\dot M c^{2},\qquad R_{\rm ISCO}=6GM/c^{2}\;(\mathrm{non\text{-}spinning})`, display: true },
      { kind: 'steps', title: 'From torque to observed spectrum', items: [
        { title: 'Set the torque', text: String.raw`Assume $\tau_{r\phi}=\alpha P$ and solve for the radial drift speed.` },
        { title: 'Compute dissipation', text: `The local viscous dissipation rate sets T_eff(R) roughly proportional to R to the minus three quarters.` },
        { title: 'Integrate the emission', text: `Sum blackbody annuli to obtain a spectrum with F_nu proportional to nu to the one third.` },
        { title: 'Add relativistic effects', text: `Use the Novikov–Thorne model for the inner region, including gravitational redshift and Doppler boosting.` }
      ] },
      { kind: 'table', headers: ['Regime', 'Condition', 'Behaviour'], rows: [
        ['Thin disk', String.raw`$\dot M\lesssim 0.1\dot M_{\rm Edd}$`, 'Optically thick, quasar-like blue bump'],
        ['ADAF', String.raw`$\dot M\ll\dot M_{\rm Edd}$`, 'Hot, optically thin, radiatively inefficient'],
        ['Slim disk', String.raw`$\dot M\gtrsim\dot M_{\rm Edd}$`, 'Advection dominated, geometrically thick']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: String.raw`The classical model assumes a steady, thin, axisymmetric disk with local thermodynamic equilibrium and an $\alpha$ prescription for stress. The magnetorotational instability is the established mechanism that generates turbulence, but the value of $\alpha$ is not predicted from first principles. Low-accretion-rate flows are not well described by the thin-disk approximation.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Quasar spectral energy distributions show the characteristic thermal component. Broadened iron K-alpha lines in X-ray binaries and active galaxies probe the inner disk and black-hole spin. The Event Horizon Telescope images of M87 and Sagittarius A star resolve emission from near the black hole, and X-ray binaries show state transitions between thin disks and ADAFs.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: String.raw`The balance of angular momentum in winds and jets, the launching of relativistic jets by the Blandford–Znajek mechanism, and the physics of super-Eddington accretion are active topics. Whether $\alpha$ is universal remains unclear.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Accretion disks unite orbital mechanics, fluid dynamics, magnetohydrodynamics and general relativity. They explain quasar energetics, X-ray binaries, gamma-ray bursts and the growth of supermassive black holes across cosmic time.` }
    ]
  },
  {
    id: 'friedmann-equations',
    title: 'Friedmann Equations',
    branchId: 'cosmology',
    level: 'Undergraduate 4',
    summary: 'Einstein’s equations applied to a homogeneous, isotropic universe give the expansion law and the fate of the cosmos.',
    prerequisites: [],
    tags: ['FLRW metric', 'expansion', 'critical density', 'general relativity'],
    derivationIds: ['u-friedmann-from-gr'],
    simulationIds: ['expanding-universe'],
    blocks: [
      { kind: 'paragraph', text: `On the largest scales the universe looks the same in every direction and from every location. Imposing that symmetry on general relativity reduces the field equations to two ordinary differential equations for one function: the scale factor a(t), which tells us how comoving distances grow with time.` },
      { kind: 'heading', text: 'The FLRW spacetime', level: 2 },
      { kind: 'paragraph', text: `The Friedmann–Lemaître–Robertson–Walker metric describes a homogeneous and isotropic spacetime. Comoving observers see galaxies at fixed spatial coordinates; physical separations grow in proportion to a(t). The redshift of light is 1+z equal to a today divided by a at emission.` },
      { kind: 'math', latex: String.raw`ds^{2}=-c^{2}dt^{2}+a^{2}(t)\left[\frac{dr^{2}}{1-kr^{2}}+r^{2}d\Omega^{2}\right]`, display: true, caption: `The curvature parameter k is plus one, zero or minus one for closed, flat and open spatial sections.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `The first Friedmann equation is an energy equation for the cosmic expansion: the kinetic energy of expansion balances the gravitational potential energy of the contents plus a curvature term. The second tells us that ordinary matter and radiation decelerate expansion, while a positive vacuum energy accelerates it because pressure gravitates in general relativity.` },
      { kind: 'math', latex: String.raw`H^{2}\equiv\left(\frac{\dot a}{a}\right)^{2}=\frac{8\pi G}{3}\rho-\frac{kc^{2}}{a^{2}}+\frac{\Lambda c^{2}}{3}`, display: true },
      { kind: 'steps', title: 'How the equations are obtained', items: [
        { title: 'Impose symmetry', text: `Write the most general metric compatible with homogeneity and isotropy, depending only on a(t) and k.` },
        { title: 'Insert into Einstein’s equations', text: `Compute the Einstein tensor for the metric and equate it to the stress tensor of a perfect fluid.` },
        { title: 'Read off two components', text: `The time–time component gives the first Friedmann equation; the space–space component gives the acceleration equation.`, math: String.raw`\frac{\ddot a}{a}=-\frac{4\pi G}{3}\left(\rho+\frac{3p}{c^{2}}\right)+\frac{\Lambda c^{2}}{3}` },
        { title: 'Use energy conservation', text: `Bianchi identities imply the continuity equation, which determines how density changes with expansion.`, math: String.raw`\dot\rho+3H\left(\rho+\frac{p}{c^{2}}\right)=0` }
      ] },
      { kind: 'table', headers: ['Dominant component', 'Equation of state', 'Density scaling', 'Scale factor'], rows: [
        ['Radiation', String.raw`$p=\rho c^{2}/3$`, String.raw`$\rho\propto a^{-4}$`, String.raw`$a\propto t^{1/2}$`],
        ['Non-relativistic matter', String.raw`$p\ll\rho c^{2}$`, String.raw`$\rho\propto a^{-3}$`, String.raw`$a\propto t^{2/3}$`],
        ['Vacuum energy', String.raw`$p=-\rho c^{2}$`, 'Constant', String.raw`$a\propto e^{Ht}$`]
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Established derivation: general relativity, exact homogeneity and isotropy, a perfect-fluid stress tensor and comoving observers. Curvature is treated as a constant spatial curvature parameter. Inhomogeneities are added separately as perturbations; the equations are not valid inside a galaxy or near a black hole.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `The Hubble–Lemaître law, the blackbody form of the cosmic microwave background, light-element abundances and baryon acoustic oscillations all follow from this framework. Supernova distances and CMB measurements together show that the present expansion is accelerating, requiring a component with strongly negative pressure or a modification of gravity.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `The Hubble constant measured from the early universe differs by about five sigma from local distance-ladder values (the Hubble tension). The nature of dark energy, the value of spatial curvature at high precision and the initial conditions for a(t) are unresolved.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `These equations are the backbone of physical cosmology: they set the expansion history used to interpret the CMB, supernova distances, nucleosynthesis and structure growth, and they connect directly to inflation and dark energy.` }
    ]
  },
  {
    id: 'big-bang',
    title: 'The Big Bang',
    branchId: 'cosmology',
    level: 'Undergraduate 2',
    summary: 'The thermal history of an expanding, cooling universe from a hot dense early state to recombination.',
    prerequisites: ['friedmann-equations'],
    tags: ['hot early universe', 'nucleosynthesis', 'recombination', 'thermal history'],
    derivationIds: ['u-planck-law'],
    blocks: [
      { kind: 'paragraph', text: `The Big Bang model says the universe was once far hotter and denser and has been expanding and cooling ever since. It is not an explosion of matter into pre-existing space: it is the expansion of space itself, so every observer sees distant galaxies receding.` },
      { kind: 'heading', text: 'Thermal history', level: 2 },
      { kind: 'paragraph', text: `While the expansion timescale exceeded the interaction timescale, each particle species stayed in thermal equilibrium. As the temperature fell below a species’ mass or binding energy it dropped out of equilibrium. This sequence of freeze-outs produced the light-element abundances and the relic photon background we observe today.` },
      { kind: 'math', latex: String.raw`T\propto a^{-1},\qquad t\sim \left(\frac{45\hbar^{3}c^{5}}{16\pi^{3}G\,g_{*}(k_{\rm B}T)^{4}}\right)^{1/2}`, display: true, caption: `Radiation temperature scales inversely with scale factor; the second expression estimates cosmic time during radiation domination.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `At one second after the expansion began the temperature was around 10^{10} kelvin, hot enough to keep protons and neutrons interconverting. By about three minutes, deuterium could survive and fusion built helium, but the universe expanded too fast to make heavier nuclei. Neutrinos decoupled first, photons later at recombination roughly 380,000 years after the start.` },
      { kind: 'math', latex: String.raw`\eta\equiv\frac{n_b}{n_\gamma}\approx 6\times10^{-10},\qquad Y_{\rm He}\approx 0.25`, display: true, caption: `The baryon-to-photon ratio controls the predicted helium mass fraction.` },
      { kind: 'steps', title: 'A chronological sketch', items: [
        { title: 'Very early epochs', text: `Planck-scale and grand-unified physics are speculative; general relativity and known particle physics are not reliable this far back.` },
        { title: 'Electroweak and QCD eras', text: `As temperature falls below the electroweak scale and then the QCD scale, particle species freeze out; baryogenesis must generate the observed matter asymmetry.` },
        { title: 'Neutrino decoupling', text: `Around one second, neutrinos free-stream and later form a background at a temperature about 0.71 times the photon temperature.` },
        { title: 'Big-bang nucleosynthesis', text: `Between roughly three and twenty minutes, protons and neutrons combine into deuterium, helium-3, helium-4 and lithium-7.` },
        { title: 'Recombination', text: `At about 380,000 years electrons and nuclei combine into neutral hydrogen, photons free-stream and the CMB is released.` },
        { title: 'Dark ages and reionisation', text: `The first stars and galaxies reionise the intergalactic gas over the following few hundred million years.` }
      ] },
      { kind: 'table', headers: ['Epoch', 'Approximate time', 'Temperature', 'Established?'], rows: [
        ['Planck era', 'Before 10^-43 s', 'Above 10^32 K', 'Speculative'],
        ['Electroweak', 'About 10^-12 s', 'About 10^15 K', 'Partly established'],
        ['QCD transition', 'About 10^-5 s', 'About 10^12 K', 'Established in outline'],
        ['Neutrino decoupling', 'About 1 s', 'About 10^10 K', 'Established'],
        ['Nucleosynthesis', '3–20 min', 'About 10^9 K', 'Established'],
        ['Recombination', 'About 380 kyr', 'About 3000 K', 'Established']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `The established model assumes FLRW expansion, thermal equilibrium for much of the early history, standard-model particle content and general relativity. Baryogenesis is required by observation but its mechanism is hypothetical. The extrapolation back to a formal singularity signals the breakdown of classical general relativity, not a demonstrated physical infinity.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Galaxy redshifts show past expansion, the CMB has an almost perfect blackbody spectrum at 2.725 K, and primordial deuterium and helium abundances agree with nucleosynthesis calculations for the independently measured baryon density. The CMB’s extreme uniformity is consistent with a hot, once-coupled plasma.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `What caused the matter–antimatter asymmetry, whether the singularity is resolved by quantum gravity, the cosmological lithium problem and the detailed history of reionisation remain open. The initial conditions for expansion are not explained within the hot Big Bang model itself.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `The hot Big Bang provides the initial conditions for the CMB, inflation, structure formation and nucleosynthesis. It relies on the Friedmann equations and on particle physics, and its extrapolations motivate quantum gravity.` }
    ]
  },
  {
    id: 'cmb',
    title: 'Cosmic Microwave Background',
    branchId: 'cosmology',
    level: 'Undergraduate 4',
    summary: 'The relic radiation from recombination, its near-perfect blackbody spectrum and the information in its tiny anisotropies.',
    prerequisites: ['big-bang', 'friedmann-equations'],
    tags: ['blackbody', 'acoustic peaks', 'polarisation', 'cosmological parameters'],
    derivationIds: ['u-cmb-acoustic-peak', 'u-planck-law'],
    problemIds: ['u-cmb-blackbody-scaling'],
    blocks: [
      { kind: 'paragraph', text: `The cosmic microwave background is the oldest light we can see. Released when the universe became neutral at redshift about 1090, it has been stretched by expansion to a temperature of 2.725 K today. Its spectrum is a blackbody to a few parts in 10^5, and its tiny temperature variations encode the seeds of all cosmic structure.` },
      { kind: 'heading', text: 'Last scattering and the blackbody spectrum', level: 2 },
      { kind: 'paragraph', text: `Before recombination, photons were tightly coupled to the baryon–electron plasma through Thomson scattering. Once neutral hydrogen formed, the mean free path became larger than the horizon and photons free-streamed. Their energy distribution preserved the Bose–Einstein form with essentially zero chemical potential.` },
      { kind: 'math', latex: String.raw`B_\nu(T)=\frac{2h\nu^{3}}{c^{2}}\frac{1}{e^{h\nu/(k_{\rm B}T)}-1}`, display: true, caption: `COBE's FIRAS instrument showed that the CMB matches this form to extraordinary precision.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `The plasma before last scattering behaved like a fluid with sound waves: gravity compressed overdense regions while photon pressure pushed back. The oscillation is frozen into the pattern of hot and cold spots at the moment of decoupling. Because the sound horizon is a known physical length, its apparent angular size is a standard ruler that measures cosmic geometry.` },
      { kind: 'math', latex: String.raw`\frac{\Delta T}{T}\sim 10^{-5},\qquad c_{s}\approx \frac{c}{\sqrt{3}},\qquad \ell_{A}\approx \frac{\pi D_{C}(z_{*})}{r_{s}(z_{*})}\approx 300`, display: true, caption: `The acoustic scale is about 300; the first peak sits near multipole 220 because of baryon loading and driving.` },
      { kind: 'steps', title: 'Anatomy of the angular power spectrum', items: [
        { title: 'Large scales', text: `The Sachs–Wolfe effect gives a nearly flat plateau in the temperature spectrum, set by primordial gravitational potential fluctuations.` },
        { title: 'First peak', text: `The fundamental compression mode of the photon–baryon fluid appears near multipole 220, an angular scale near one degree.` },
        { title: 'Second and third peaks', text: `Alternating compression and rarefaction peaks measure the baryon and cold-dark-matter densities.` },
        { title: 'Damping tail', text: `Photon diffusion (Silk damping) erases small-scale fluctuations, while polarisation spectra test the same physics independently.` }
      ] },
      { kind: 'table', headers: ['Feature', 'Physical origin', 'Constrains'], rows: [
        ['Sachs–Wolfe plateau', 'Gravitational redshift at last scattering', 'Primordial amplitude, curvature'],
        ['First acoustic peak', 'Fundamental sound-wave mode', 'Spatial curvature, angular diameter distance'],
        ['Third peak', 'Baryon loading asymmetry', 'Dark-matter density'],
        ['E-mode polarisation', 'Thomson scattering of local quadrupole', 'Reionisation optical depth']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Interpretation uses linear perturbation theory around an FLRW background, adiabatic and nearly Gaussian initial conditions, a standard recombination history and general relativity. Forecasts of parameter errors rely on assumed foreground removal. Non-linear effects and secondary anisotropies are treated separately.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `COBE discovered the anisotropies and measured the blackbody spectrum; WMAP and then Planck mapped the full sky and measured the acoustic peaks with high precision. Ground-based experiments such as ACT and SPT refined small-scale measurements. Planck’s flat-universe parameters include roughly 4.9 percent baryons, 26 percent dark matter and 69 percent dark energy.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `The Hubble constant inferred under the standard flat model disagrees with local measurements. Large-angle anomalies, possible primordial non-Gaussianity and the exact reionisation history are investigated. Searches for spectral distortions test whether the early universe was exactly thermal.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `The CMB tests inflation, the Friedmann equations, dark matter and dark energy in one data set. Its acoustic physics is ordinary sound-wave physics in a relativistic plasma, and its polarisation links to scattering theory.` }
    ]
  },
  {
    id: 'inflation',
    title: 'Cosmic Inflation',
    branchId: 'cosmology',
    level: 'Graduate',
    summary: 'A proposed early phase of quasi-exponential expansion that explains the flatness and horizon puzzles and generates primordial fluctuations.',
    prerequisites: ['friedmann-equations', 'big-bang'],
    tags: ['slow roll', 'scalar field', 'primordial fluctuations', 'status: hypothesis'],
    simulationIds: ['expanding-universe'],
    blocks: [
      { kind: 'paragraph', text: `Inflation is the hypothesis that the very early universe expanded by at least about 60 e-folds in a nearly de Sitter state. It is not part of the established hot Big Bang model; rather, it is a leading proposal for setting its initial conditions.` },
      { kind: 'heading', text: 'The slow-roll mechanism', level: 2 },
      { kind: 'paragraph', text: `A scalar field with a sufficiently flat potential has energy dominated by potential rather than kinetic energy. Its stress tensor then approximates a cosmological constant and drives accelerated expansion. Small quantum fluctuations in the field are stretched to cosmological scales and become classical density perturbations.` },
      { kind: 'math', latex: String.raw`\rho=\frac{1}{2}\dot\phi^{2}+V(\phi),\qquad p=\frac{1}{2}\dot\phi^{2}-V(\phi),\qquad \epsilon=\frac{M_{\rm Pl}^{2}}{2}\left(\frac{V'}{V}\right)^{2}`, display: true },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Rapid expansion stretches any initial curvature toward flatness, dilutes unwanted relics and brings regions that were once in causal contact far apart, solving the horizon problem. The same stretching turns microscopic quantum jitter into the large-scale seed pattern later imprinted on the CMB.` },
      { kind: 'math', latex: String.raw`n_{s}\approx 1-6\epsilon+2\eta,\qquad r\approx 16\epsilon,\qquad N=\int H\,dt\gtrsim 60`, display: true, caption: `The scalar spectral index n_s and tensor-to-scalar ratio r are the main observational targets.` },
      { kind: 'steps', title: 'Testing an inflationary model', items: [
        { title: 'Choose a potential', text: `Specify V(phi) and check that slow roll holds: the parameters epsilon and eta must be much less than one.` },
        { title: 'Compute the predictions', text: `Evaluate the amplitude, spectral index n_s and tensor-to-scalar ratio r at the field value giving N of about 60.` },
        { title: 'Compare to the CMB', text: `Use the temperature and polarisation spectra to constrain n_s, r and non-Gaussianity.` },
        { title: 'Consider reheating', text: `The inflaton must decay into ordinary particles; the reheating temperature affects the thermal history.` }
      ] },
      { kind: 'table', headers: ['Prediction', 'Observation', 'Status'], rows: [
        ['Nearly scale-invariant spectrum', String.raw`$n_s\approx 0.965$`, 'Strongly supported'],
        ['Spatial flatness', String.raw`$|\Omega_k|\ll 1$`, 'Supported'],
        ['Gaussian, adiabatic fluctuations', 'CMB tests pass so far', 'Supported'],
        ['Primordial gravitational waves', 'Upper limits on r', 'Not yet detected']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `All dynamical statements here are hypotheses: a suitable scalar field, a flat potential, quasi-de Sitter expansion and the standard vacuum prescription for fluctuations. The equations themselves are established applications of field theory in curved spacetime once those assumptions are granted.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `CMB measurements find a nearly scale-invariant, adiabatic, Gaussian spectrum with n_s below one, in broad agreement with slow-roll expectations. Searches by BICEP/Keck and Planck have not detected primordial B-mode polarisation and place upper limits on r, ruling out the simplest large-field models while leaving many viable ones.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `The identity of the inflaton, the initial conditions preceding inflation, the trans-Planckian problem and whether alternatives such as bouncing cosmologies can match the data are unresolved. The observed value of n_s is not yet derived from a unique fundamental theory.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Inflation links quantum field theory in curved spacetime to observable cosmology, and it provides the initial perturbation spectrum for structure formation and the CMB acoustic peaks.` }
    ]
  },
  {
    id: 'dark-energy',
    title: 'Dark Energy',
    branchId: 'cosmology',
    level: 'Undergraduate 4',
    summary: 'The component driving cosmic acceleration, its equation of state, and the gap between observed and theoretical vacuum energy.',
    prerequisites: ['friedmann-equations', 'supernovae'],
    tags: ['cosmological constant', 'acceleration', 'Hubble tension', 'status: established effect, unknown cause'],
    problemIds: ['u-hubble-tension-check'],
    simulationIds: ['expanding-universe'],
    blocks: [
      { kind: 'paragraph', text: `Dark energy is the name given to whatever makes the expansion of the universe accelerate. The simplest explanation is Einstein’s cosmological constant, a uniform energy density of spacetime itself. The effect is established; its microscopic origin is not.` },
      { kind: 'heading', text: 'Acceleration and the equation of state', level: 2 },
      { kind: 'paragraph', text: `In general relativity pressure contributes to gravity. Acceleration requires the combination rho plus three p over c squared to be negative. A component with p approximately minus rho c squared achieves this, and its energy density then stays nearly constant as the universe expands.` },
      { kind: 'math', latex: String.raw`p=w\rho c^{2},\qquad \rho\propto a^{-3(1+w)},\qquad \ddot a>0\ \mathrm{requires}\ w<-\frac{1}{3}`, display: true },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Matter thins out as space expands and its self-gravity slows the expansion. Vacuum energy does not thin out: eventually it dominates and the expansion speeds up. Today roughly 69 percent of the cosmic energy budget behaves this way, with an energy scale of only a few milli-electronvolts.` },
      { kind: 'math', latex: String.raw`\rho_\Lambda\approx (2.3\,{\rm meV})^{4}\approx 6\times10^{-10}\,{\rm J\,m^{-3}},\qquad \Omega_\Lambda\approx 0.69`, display: true },
      { kind: 'steps', title: 'How acceleration is measured', items: [
        { title: 'Standardise candles', text: `Use Type Ia supernovae with empirical light-curve corrections to obtain relative distances.` },
        { title: 'Measure redshifts', text: `Obtain z from host-galaxy spectra, then fit distance versus redshift.` },
        { title: 'Combine probes', text: `Add CMB acoustic scale and baryon acoustic oscillations to break degeneracies among density parameters.` },
        { title: 'Test gravity', text: `Compare growth of structure with expansion history to distinguish dark energy from modified gravity.` }
      ] },
      { kind: 'table', headers: ['Model', 'Equation of state', 'Status'], rows: [
        ['Cosmological constant', String.raw`w=-1 exactly`, 'Fits all current data'],
        ['Quintessence', String.raw`-1<w<-1/3, evolving`, 'Hypothesis, constrained'],
        ['Phantom energy', String.raw`w<-1`, 'Hypothesis, would end in a big rip'],
        ['Modified gravity', 'No dark-energy fluid', 'Hypothesis, actively tested']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Constraints on w assume general relativity, large-scale homogeneity and specific parametrisations such as constant w or w(z)=w_0+w_a z/(1+z). The measurements establish acceleration but do not by themselves prove the existence of a literal vacuum fluid.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Two teams using distant Type Ia supernovae reported acceleration in 1998 and 1999. CMB measurements from Planck, baryon acoustic oscillations and supernova compilations now agree on a flat universe with roughly 31 percent matter and 69 percent dark energy, with w close to minus one.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `The cosmological constant problem is the enormous mismatch between naive quantum-field estimates of vacuum energy and the observed value. The coincidence problem asks why dark energy dominates just when observers exist. The Hubble tension may hint at new physics but could also reflect unaccounted systematics.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Dark energy enters the Friedmann equations, is measured with supernovae and the CMB, and connects cosmology to quantum field theory and tests of general relativity on the largest scales.` }
    ]
  },
  {
    id: 'dark-matter-astro',
    title: 'Dark Matter in Astrophysics',
    branchId: 'astrophysics',
    level: 'Undergraduate 3',
    summary: 'The evidence for unseen mass in galaxies and clusters, what cold dark matter predicts, and the small-scale puzzles.',
    prerequisites: ['friedmann-equations'],
    tags: ['rotation curves', 'lensing', 'halos', 'status: evidence established, particle unknown'],
    simulationIds: ['gravitational-lensing'],
    blocks: [
      { kind: 'paragraph', text: `Many gravitational effects in the universe are stronger than can be accounted for by visible matter. Dark matter is the hypothesis that an additional, non-luminous, effectively collisionless component supplies most of the mass in galaxies and clusters and drives structure formation.` },
      { kind: 'heading', text: 'The case for missing mass', level: 2 },
      { kind: 'paragraph', text: `Spiral-galaxy rotation curves stay approximately flat far beyond the bright disk, implying an extended mass distribution. Galaxy-cluster velocity dispersions, gravitational lensing, the Bullet Cluster and the CMB acoustic peaks independently point to a dominant non-baryonic component.` },
      { kind: 'math', latex: String.raw`v^{2}(r)=\frac{G M(<r)}{r},\qquad M(<r)\propto r\ \mathrm{if}\ v\approx\mathrm{const}`, display: true },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `For a flat rotation curve the enclosed mass must grow linearly with radius, so the light and the mass cannot trace each other. Lensing maps of colliding clusters show the mass following the galaxies rather than the hot X-ray gas, which is difficult to produce with a purely baryonic explanation but natural for a collisionless component.` },
      { kind: 'math', latex: String.raw`\rho_{\rm NFW}(r)=\frac{\rho_s}{(r/r_s)\left(1+r/r_s\right)^{2}},\qquad \Omega_{\rm c}h^{2}\approx 0.12`, display: true, caption: `The Navarro–Frenk–White profile is a standard description of simulated cold-dark-matter halos.` },
      { kind: 'steps', title: 'How dark matter is tested', items: [
        { title: 'Dynamical evidence', text: `Measure rotation curves and velocity dispersions, then infer the mass distribution.` },
        { title: 'Lensing evidence', text: `Reconstruct projected mass from the distortion of background galaxy images.` },
        { title: 'Cosmological evidence', text: `Fit CMB peak heights and large-scale structure to determine the baryon and dark-matter densities.` },
        { title: 'Particle searches', text: `Look for nuclear recoils (XENONnT, LZ), axion conversion (ADMX), indirect gamma-ray signals or missing energy at colliders.` }
      ] },
      { kind: 'table', headers: ['Evidence', 'What it shows', 'Status'], rows: [
        ['Flat rotation curves', 'Extended gravitating halo', 'Established observation'],
        ['Bullet Cluster lensing', 'Mass separated from hot gas', 'Established observation'],
        ['CMB third peak', 'Non-baryonic matter density', 'Established within Lambda-CDM'],
        ['Direct detection', 'Particle identity', 'No confirmed detection yet']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `The interpretation assumes general relativity on galactic and cluster scales. Cold, collisionless dark matter is the working hypothesis that best fits large-scale data. Halo profiles, concentration and the response of dark matter to baryonic feedback are modelled rather than derived exactly.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Vera Rubin’s rotation curves, Fritz Zwicky’s cluster dispersions, gravitational-lensing maps and Planck’s measurement of the cosmic matter budget together make a strong case. Structure simulations with cold dark matter reproduce the observed cosmic web on large scales.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Direct detection has not identified a particle. Small-scale puzzles include the cusp–core question, the missing-satellite problem and the too-big-to-fail problem. Modified Newtonian dynamics and warm or self-interacting dark matter remain alternatives under study.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Dark matter connects galaxy formation, gravitational lensing, CMB physics and particle physics. Its gravitational role is established; identifying the underlying particle is one of the major open problems in science.` }
    ]
  },
  {
    id: 'mhd',
    title: 'Magnetohydrodynamics',
    branchId: 'plasma-physics',
    level: 'Undergraduate 4',
    summary: 'The single-fluid description of electrically conducting plasmas, magnetic flux freezing, waves and reconnection.',
    prerequisites: [],
    tags: ['plasma', 'Alfvén waves', 'frozen-in flux', 'reconnection'],
    problemIds: ['u-alfven-resonance'],
    experimentIds: ['u-alfven-standing-wave'],
    simulationIds: ['wave-interference'],
    blocks: [
      { kind: 'paragraph', text: `Magnetohydrodynamics treats a conducting plasma as a single fluid coupled to a magnetic field. It is the working language of the solar corona, accretion disks, fusion devices and planetary magnetospheres, even though the underlying microphysics is collisionless kinetic theory.` },
      { kind: 'heading', text: 'Ideal MHD equations', level: 2 },
      { kind: 'paragraph', text: `Combining Maxwell’s equations with Ohm’s law for a moving conductor gives the induction equation. In the ideal limit the electric field in the fluid frame vanishes, so magnetic field lines are frozen into the plasma: they are advected with the flow and can only change topology where resistivity or kinetic effects break the assumption.` },
      { kind: 'math', latex: String.raw`\frac{\partial\mathbf{B}}{\partial t}=\nabla\times(\mathbf{v}\times\mathbf{B})+\eta_m\nabla^{2}\mathbf{B},\qquad \nabla\cdot\mathbf{B}=0`, display: true, caption: `The first term advects field with the flow; the diffusive term matters only where the magnetic Reynolds number is not large.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `A magnetic field exerts both pressure perpendicular to itself and tension along bent field lines. That tension supports transverse Alfvén waves, the plasma analogue of waves on a stretched string. The Alfvén speed is the ratio of field strength to the square root of mass density, and it commonly ranges from tens to thousands of kilometres per second in space plasmas.` },
      { kind: 'math', latex: String.raw`v_{\rm A}=\frac{B}{\sqrt{\mu_{0}\rho}},\qquad \omega=k_{\parallel}v_{\rm A},\qquad p_{\rm mag}=\frac{B^{2}}{2\mu_{0}}`, display: true },
      { kind: 'steps', title: 'Deciding whether ideal MHD applies', items: [
        { title: 'Check scales', text: `The system must be much larger than the Debye length and the ion gyroradius, and timescales must exceed the ion gyroperiod.` },
        { title: 'Check collisionality or coupling', text: `Even collisionless plasmas can behave as a fluid if waves keep particles tied to field lines.` },
        { title: 'Compute magnetic Reynolds number', text: `Large R_m means flux freezing; small R_m means diffusion and reconnection are important.`, math: String.raw`R_m=\frac{vL}{\eta_m}` },
        { title: 'Identify the wave branch', text: `Alfvén waves are incompressible; fast and slow magnetosonic waves couple pressure and field.` }
      ] },
      { kind: 'table', headers: ['Phenomenon', 'Governing idea', 'Example'], rows: [
        ['Flux freezing', 'Field advected with plasma', 'Solar wind carrying heliospheric field'],
        ['Alfvén waves', 'Magnetic tension as restoring force', 'Coronal loop oscillations'],
        ['Magnetic reconnection', 'Topology change in diffusion region', 'Solar flares, magnetospheric substorms'],
        ['Dynamo action', 'Flow regenerating field', 'Solar and planetary magnetic fields']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Established ideal MHD assumes quasineutrality, a single fluid velocity, non-relativistic dynamics and scales larger than kinetic scales. Resistive MHD adds a scalar diffusivity; Hall MHD and kinetic models are needed when ion and electron scales separate. Reconnection in collisionless plasmas is not fully captured by simple resistive models.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Sunspots, coronal loops, prominence oscillations and solar-wind measurements confirm flux freezing and Alfvénic fluctuations. Spacecraft such as SOHO, Cluster and Parker Solar Probe measure magnetospheric and heliospheric fields directly. Laboratory plasma devices verify Alfvén wave propagation and reconnection rates.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Why reconnection is often fast remains an active problem. The solar dynamo, coronal heating, turbulent transport and the origin of the solar wind’s high-speed streams are not fully explained. kinetic–fluid coupling across scales is an ongoing challenge.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `MHD joins electromagnetism and fluid mechanics and underpins solar physics, space physics, accretion-disk theory and fusion research. Its waves are a direct analogue of mechanical waves on a string.` }
    ]
  },
  {
    id: 'computational-methods',
    title: 'Computational Methods',
    branchId: 'computational-physics',
    level: 'Undergraduate 3',
    summary: 'Turning continuous physical laws into finite algorithms: discretisation, stability, convergence and verification.',
    prerequisites: [],
    tags: ['numerical methods', 'CFL condition', 'convergence', 'simulation'],
    blocks: [
      { kind: 'paragraph', text: `Computational physics is a third way of doing science alongside theory and experiment. It replaces continuous equations by finite algebraic approximations that a computer can advance in time, then asks whether the answer converges to the physical solution as the grid is refined.` },
      { kind: 'heading', text: 'Discretisation', level: 2 },
      { kind: 'paragraph', text: `A derivative is replaced by a difference quotient on a grid, a continuum field by cell averages, or a function by a truncated spectral expansion. Finite differences are simple, finite volumes conserve fluxes exactly, finite elements handle complex geometry and spectral methods converge exponentially for smooth solutions.` },
      { kind: 'math', latex: String.raw`\frac{\partial u}{\partial x}\approx \frac{u_{i+1}-u_{i-1}}{2\Delta x}+O(\Delta x^{2})`, display: true, caption: `The central difference is second-order accurate: halving the grid spacing quarters the truncation error.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `A numerical scheme is a physical model with a finite resolution. Anything smaller than a few cells is invisible and can masquerade as a real effect. Stability means small rounding errors do not grow without bound; consistency means the discrete operator approaches the continuous one; convergence follows from both for well-posed problems.` },
      { kind: 'math', latex: String.raw`\mathrm{CFL}=\frac{v\,\Delta t}{\Delta x}\lesssim 1,\qquad E(\Delta x)\propto \Delta x^{p}`, display: true },
      { kind: 'steps', title: 'Designing a trustworthy numerical experiment', items: [
        { title: 'Non-dimensionalise', text: `Scale variables so that dimensionless parameters control the problem; this improves conditioning and reveals similarity laws.` },
        { title: 'Choose the representation', text: `Pick grid-based, particle-based or spectral discretisation according to geometry and conservation needs.` },
        { title: 'Pick a time integrator', text: `Explicit schemes are cheap but limited by CFL; implicit schemes handle stiff systems at higher cost per step.` },
        { title: 'Run a refinement study', text: `Repeat at two or more resolutions and verify the expected convergence order.`, math: String.raw`\frac{E(\Delta x)}{E(\Delta x/2)}\approx 2^{p}` },
        { title: 'Compare with benchmarks', text: `Check against analytic solutions, conservation laws and independent codes.` }
      ] },
      { kind: 'table', headers: ['Method', 'Best for', 'Caveat'], rows: [
        ['Finite difference', 'Structured grids, smooth fields', 'Conservation not automatic'],
        ['Finite volume', 'Conservation laws, shocks', 'Reconstruction limits accuracy'],
        ['Finite element', 'Complex geometry', 'Implementation cost'],
        ['Spectral', 'Smooth, periodic problems', 'Poor with discontinuities'],
        ['Particle methods', 'Large deformations, collisionless systems', 'Noise from finite particle number']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `We assume the continuum equations are the right model, that a converged solution exists, that floating-point round-off is negligible compared with truncation error and that boundary conditions are represented faithfully. Sub-grid physics such as turbulence must be modelled when scales are unresolved.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Confidence comes from convergence tests, reproduction of analytic solutions and comparison with laboratory or observational data: simulations of convection, stellar interiors and gravitational-wave templates are checked against measurements and against independent codes.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Reliable turbulence closures, coupling across many orders of magnitude in space and time, algorithm performance on exascale machines and quantitative uncertainty estimates for simulation results are active challenges.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Computational methods serve every branch of physics: they solve the equations of fluid dynamics, general relativity, plasma physics and statistical mechanics, and they share their error analysis with experimental metrology.` }
    ]
  },
  {
    id: 'monte-carlo',
    title: 'Monte Carlo Methods',
    branchId: 'computational-physics',
    level: 'Undergraduate 3',
    summary: 'Using randomness to evaluate high-dimensional integrals and sample complex probability distributions.',
    prerequisites: ['computational-methods'],
    tags: ['random sampling', 'MCMC', 'variance reduction', 'statistical inference'],
    blocks: [
      { kind: 'paragraph', text: `Monte Carlo methods estimate quantities by averaging over random samples. They shine when the dimensionality is high or the geometry is complicated, situations where deterministic quadrature becomes impractical.` },
      { kind: 'heading', text: 'Sampling and statistical error', level: 2 },
      { kind: 'paragraph', text: `The law of large numbers guarantees convergence, while the central limit theorem supplies an error bar. The surprising fact is that the rate is independent of dimension, which is why these methods dominate high-dimensional problems in statistical physics and cosmology.` },
      { kind: 'math', latex: String.raw`\hat I=\frac{1}{N}\sum_{i=1}^{N}f(x_{i}),\qquad \sigma_{\hat I}\approx \sqrt{\frac{\mathrm{Var}(f)}{N}}`, display: true },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Random sampling is like estimating the average depth of a lake by dropping many random probes. Variance is the enemy: importance sampling concentrates probes where the integrand is large, and Markov chain methods build a correlated walk that visits high-probability regions without enumerating the whole space.` },
      { kind: 'math', latex: String.raw`\alpha=\min\left(1,\frac{\pi(x')q(x|x')}{\pi(x)q(x'|x)}\right)`, display: true, caption: `The Metropolis–Hastings acceptance rule enforces detailed balance.` },
      { kind: 'steps', title: 'A Metropolis–Hastings step', items: [
        { title: 'Propose', text: `Draw a trial state x-prime from a proposal distribution centred on the current state.` },
        { title: 'Accept or reject', text: `Accept with probability alpha; otherwise keep the current state, so the chain leaves the target distribution invariant.` },
        { title: 'Burn in', text: `Discard early samples before the chain reaches its stationary distribution.` },
        { title: 'Estimate errors', text: `Account for autocorrelation when computing the effective number of independent samples.`, math: String.raw`N_{\rm eff}\approx \frac{N}{1+2\sum_{k}\rho_{k}}` }
      ] },
      { kind: 'table', headers: ['Technique', 'Purpose', 'Typical use'], rows: [
        ['Importance sampling', 'Reduce variance', 'Rare-event probabilities'],
        ['Stratified sampling', 'Cover space evenly', 'Radiative transfer'],
        ['MCMC', 'Sample complicated posteriors', 'Cosmological parameter inference'],
        ['Quasi-Monte Carlo', 'Low-discrepancy sequences', 'Financial and physics integrals']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Results assume a reliable random or pseudorandom source, an ergodic and correctly targeted Markov chain, and correct weighting. Convergence diagnostics are heuristic: there is no finite test that proves a chain has explored every mode.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Monte Carlo computations reproduce benchmark integrals, generate cosmic microwave background parameter posteriors consistent with independent analyses and simulate detector noise and particle transport in agreement with measurements.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Rare-event estimation, multimodal posteriors, high-dimensional variance growth and the fermionic sign problem in quantum Monte Carlo remain difficult. Certification of convergence for complex chains is an unsolved practical problem.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Monte Carlo methods connect probability theory with statistical mechanics, particle transport, cosmology and computational physics; the same detailed-balance logic underlies thermal equilibrium in physics.` }
    ]
  },
  {
    id: 'string-theory',
    title: 'String Theory',
    branchId: 'quantum-gravity',
    level: 'Graduate',
    summary: 'A candidate quantum theory of gravity in which point particles are replaced by one-dimensional strings.',
    prerequisites: [],
    tags: ['quantum gravity', 'extra dimensions', 'D-branes', 'status: theoretical framework'],
    blocks: [
      { kind: 'paragraph', text: `String theory replaces point-like particles by tiny one-dimensional objects whose vibrational modes appear as different particles. The spectrum of a closed string necessarily contains a massless spin-two state with the properties of a graviton, which is why the framework is a leading candidate for quantum gravity.` },
      { kind: 'heading', text: 'Strings and their spectra', level: 2 },
      { kind: 'paragraph', text: `Quantising a relativistic string gives an infinite tower of states with masses set by the string tension. Consistency requires extra spatial dimensions: ten for superstring theories and eleven for M-theory. The extra dimensions must be compactified on small manifolds whose shape determines the observed low-energy physics.` },
      { kind: 'math', latex: String.raw`M^{2}\simeq\frac{n}{\alpha'},\qquad \ell_{s}\simeq\sqrt{\alpha'},`, display: true, caption: String.raw`The string length $\ell_s$ sets the mass gap between vibrational modes.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `A string smears interactions over its finite size, softening the ultraviolet divergences of point-particle quantum field theory. Open strings can end on D-branes, so gauge forces can live on lower-dimensional surfaces while gravity propagates in the full higher-dimensional bulk.` },
      { kind: 'math', latex: String.raw`g_{s}=e^{\langle\phi\rangle},\qquad G_{N}\sim \frac{g_{s}^{2}\ell_s^{8}}{V_{6}}`, display: true, caption: `The string coupling is the vacuum expectation value of the dilaton; compactification volume V_6 enters the effective Newton constant.` },
      { kind: 'steps', title: 'How gravity emerges', items: [
        { title: 'Quantise the string', text: `Impose conformal invariance on the two-dimensional worldsheet theory.` },
        { title: 'Identify the massless spin-two state', text: `Its low-energy interactions reproduce general relativity plus corrections.` },
        { title: 'Compactify', text: `Choose a six-dimensional compact space whose symmetries can yield gauge groups and matter.` },
        { title: 'Compare to our world', text: `Look for vacua with four large dimensions, small cosmological constant and broken supersymmetry.` }
      ] },
      { kind: 'table', headers: ['Concept', 'Role', 'Status'], rows: [
        ['Graviton in the spectrum', 'Explains quantised gravity', 'Robust theoretical result'],
        ['Supersymmetry', 'Contains tachyons, stabilises spectra', 'Not observed at LHC'],
        ['D-branes', 'Host gauge theories', 'Well established within the theory'],
        ['AdS/CFT duality', 'Non-perturbative definition in special spacetimes', 'Strong theoretical evidence']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Everything in this article is theoretical framework, not experimentally established physics. It assumes supersymmetry, extra dimensions and a consistent choice of compactification. The famous vacua are hypotheses; the duality conjectures are supported by many consistency checks but are not proven in general.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `There is no direct experimental evidence for strings. Collider searches have not found supersymmetric partners or large extra dimensions; precision gravity constrains deviations at short range. Theoretical evidence includes anomaly cancellation, black-hole entropy counting in special cases and the success of gauge/gravity duality calculations.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Selecting a vacuum from the vast landscape, breaking supersymmetry at the right scale, constructing stable de Sitter space and finding observable predictions are unresolved. The swampland programme asks which low-energy theories can consistently descend from string theory.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `String theory connects quantum field theory, general relativity, geometry and black-hole thermodynamics; its dualities link gravity to strongly coupled gauge theories used in nuclear and condensed-matter physics.` }
    ]
  },
  {
    id: 'loop-quantum-gravity',
    title: 'Loop Quantum Gravity',
    branchId: 'quantum-gravity',
    level: 'Graduate',
    summary: 'A background-independent quantisation of general relativity with discrete geometry and spin-network states.',
    prerequisites: [],
    tags: ['quantum gravity', 'background independence', 'spin networks', 'status: theoretical framework'],
    blocks: [
      { kind: 'paragraph', text: `Loop quantum gravity attempts to quantise general relativity directly, without assuming a fixed background spacetime. Its central idea is that geometry itself has discrete spectra: areas and volumes come in quantised units, much as atomic spectra are discrete.` },
      { kind: 'heading', text: 'From holonomies to spin networks', level: 2 },
      { kind: 'paragraph', text: `Using Ashtekar variables, the gravitational field is rewritten as a connection and a conjugate electric field. Quantum states are functions of parallel transports (holonomies) along graphs labelled by spin quantum numbers. These spin-network states form a basis of the kinematical Hilbert space.` },
      { kind: 'math', latex: String.raw`A=8\pi\gamma\ell_{\rm P}^{2}\sum_{p}\sqrt{j_{p}(j_{p}+1)}`, display: true, caption: `The area operator eigenvalues depend on the Immirzi parameter gamma and the spins j on punctures.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Instead of a smooth metric at arbitrarily small scales, the theory pictures spacetime as a network of quantum geometric relations. Because there is a smallest nonzero area, the infinities of point-like singularities may be regulated. The covariant version, spin foams, describes histories of spin networks.` },
      { kind: 'math', latex: String.raw`\ell_{\rm P}=\sqrt{\frac{\hbar G}{c^{3}}}\approx 1.6\times10^{-35}\,{\rm m}`, display: true },
      { kind: 'steps', title: 'Construction of the theory', items: [
        { title: 'Rewrite GR', text: `Express the Einstein–Hilbert action in terms of Ashtekar connection and densitised triad.` },
        { title: 'Quantise', text: `Represent holonomies and fluxes as operators; the algebra is background independent.` },
        { title: 'Solve constraints', text: `Impose Gauss, diffeomorphism and Hamiltonian constraints to obtain physical states.` },
        { title: 'Extract physics', text: `Compute spectra of geometric operators and study semiclassical states and cosmological models.` }
      ] },
      { kind: 'table', headers: ['Element', 'Meaning', 'Status'], rows: [
        ['Spin networks', 'Quantum states of geometry', 'Well defined kinematically'],
        ['Spin foams', 'Covariant histories', 'Active research'],
        ['Black-hole entropy', 'Counted via Chern–Simons states', 'Matches Hawking after fixing gamma'],
        ['Loop quantum cosmology', 'Symmetry-reduced bounce models', 'Hypothetical extension']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `The framework assumes canonical general relativity and quantum mechanics with background independence; it does not require extra dimensions or supersymmetry. Key dynamical questions depend on the Hamiltonian constraint and on the choice of Immirzi parameter, where different approaches exist.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `There is no direct experimental confirmation. Theoretical support comes from the derivation of discrete area and volume spectra, black-hole entropy counting in special settings and bounce solutions in symmetry-reduced models. Astrophysical time-of-flight tests constrain some phenomenological Lorentz-violation ideas but do not test the core theory.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Recovering classical spacetime and low-energy quantum field theory from semiclassical states is the central unresolved problem. The correct dynamics, the value of the Immirzi parameter and testable phenomenology remain debated.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Loop quantum gravity is closely related to gauge theory, black-hole thermodynamics and quantum cosmology. It offers a contrasting approach to string theory, and both motivate quantum-gravity phenomenology.` }
    ]
  },
  {
    id: 'network-physics',
    title: 'Network Physics',
    branchId: 'complex-systems',
    level: 'Undergraduate 3',
    summary: 'Graph structure, degree distributions, small worlds and how topology controls collective dynamics.',
    prerequisites: [],
    tags: ['graphs', 'scale-free networks', 'epidemics', 'emergence'],
    problemIds: ['u-epidemic-threshold'],
    blocks: [
      { kind: 'paragraph', text: `Many complex systems are sets of elements connected by pairwise interactions: neurons, people, computers, proteins and power stations. Network physics studies how the pattern of connections shapes collective behaviour, often producing surprises that the properties of individual nodes cannot predict.` },
      { kind: 'heading', text: 'Describing a graph', level: 2 },
      { kind: 'paragraph', text: `A graph consists of nodes and edges. Its degree distribution P(k) gives the probability that a randomly chosen node has k neighbours. Average path length measures how far apart nodes are, and the clustering coefficient measures how often a node’s neighbours are connected to each other.` },
      { kind: 'math', latex: String.raw`P(k)\propto k^{-\gamma},\qquad \langle k\rangle=\sum_k kP(k),\qquad C=\frac{2E_{\triangle}}{\sum_k k(k-1)}`, display: true },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Random graphs have short paths but little clustering. Regular lattices have high clustering but long paths. The small-world construction rewires a few edges of a lattice and gets both at once. Preferential attachment, where popular nodes gain new links faster, produces heavy-tailed degree distributions and hubs.` },
      { kind: 'math', latex: String.raw`\left(\frac{\beta}{\gamma}\right)_{\rm crit}=\frac{\langle k\rangle}{\langle k^{2}\rangle-\langle k\rangle}`, display: true, caption: `For epidemic spreading the threshold can vanish on large scale-free networks because the second moment diverges.` },
      { kind: 'steps', title: 'Analysing a network', items: [
        { title: 'Build the graph', text: `Decide what constitutes a node and an edge; this choice determines everything that follows.` },
        { title: 'Measure topology', text: `Compute degree distribution, clustering, path lengths and community structure.` },
        { title: 'Compare to null models', text: `Use randomised graphs with the same degree sequence to see which features are nontrivial.` },
        { title: 'Study dynamics', text: `Add spreading, synchronisation or cascades and look for thresholds and phase transitions.` }
      ] },
      { kind: 'table', headers: ['Model', 'Degree distribution', 'Key property'], rows: [
        ['Erdős–Rényi', 'Poisson', 'Short paths, low clustering'],
        ['Watts–Strogatz', 'Narrow', 'Small world with clustering'],
        ['Barabási–Albert', String.raw`$P(k)\propto k^{-3}$`, 'Hubs, robust to random failure'],
        ['Configuration model', 'Prescribed', 'Null model for degree effects']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Most analytic results assume static, undirected, uncorrelated networks and mean-field mixing. Real networks are directed, weighted, temporal and embedded in space; higher-order interactions beyond pairwise edges are an active extension.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Heavy-tailed degrees and small-world properties have been measured in the internet, citation networks, social systems, protein interactions and power grids. Epidemic thresholds and cascade behaviour have been tested on empirical and simulated topologies.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Inferring causal structure from observed links, modelling temporal and higher-order interactions, predicting tipping points and identifying universal features across systems are unresolved.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Network physics draws on statistical mechanics, graph theory and nonlinear dynamics, and connects to computational physics through large-scale simulations and to epidemiology and ecology through spreading models.` }
    ]
  },
  {
    id: 'experimental-design',
    title: 'Experimental Design',
    branchId: 'experimental-physics',
    level: 'Undergraduate 3',
    summary: 'Planning measurements so that the data can actually discriminate between hypotheses.',
    prerequisites: [],
    tags: ['uncertainty', 'hypothesis tests', 'controls', 'Fisher information'],
    blocks: [
      { kind: 'paragraph', text: `A good experiment is designed before data are taken. Its purpose is not simply to collect numbers but to make the anticipated difference between competing hypotheses large compared with the expected noise and systematic uncertainty.` },
      { kind: 'heading', text: 'From hypothesis to measurement', level: 2 },
      { kind: 'paragraph', text: `Start with a falsifiable prediction, choose an observable that depends sensitively on it, and identify every other influence that could mimic the signal. Randomisation, controls and blinding convert ambiguous correlations into defensible inferences.` },
      { kind: 'math', latex: String.raw`I(\theta)=\mathbb{E}\left[\left(\frac{\partial \ln L}{\partial\theta}\right)^{2}\right],\qquad \sigma_{\theta}\geq \frac{1}{\sqrt{I(\theta)}}`, display: true, caption: `The Cramér–Rao bound sets the minimum variance of an unbiased estimator.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Think of the signal as a change in a pointer and the noise as jitter in that pointer. Improving the pointer's resolution helps only until systematic drifts dominate. Replication and independent methods attack different failure modes, which is why a single beautiful curve is weaker than several consistent but imperfect ones.` },
      { kind: 'math', latex: String.raw`\mathrm{SNR}=\frac{|S_{\rm signal}-S_{\rm null}|}{\sqrt{\sigma_{\rm stat}^{2}+\sigma_{\rm syst}^{2}}}`, display: true },
      { kind: 'steps', title: 'Design checklist', items: [
        { title: 'State the question', text: `Write the competing hypotheses and the predicted observable difference.` },
        { title: 'Build an uncertainty budget', text: `List statistical and systematic contributions with estimated magnitudes before running.` },
        { title: 'Choose controls and calibration', text: `Include null measurements and reference standards that can reveal drifts.` },
        { title: 'Pre-register the analysis', text: `Fix the statistic and selection criteria in advance to avoid post-hoc choices.` },
        { title: 'Check the decision rule', text: `Decide what result would confirm, refute or merely fail to resolve the hypothesis.` }
      ] },
      { kind: 'table', headers: ['Threat', 'Remedy', 'Example'], rows: [
        ['Statistical fluctuation', 'More data, averaging', 'Counting statistics in nuclear decay'],
        ['Instrumental drift', 'Calibration, reference channel', 'Thermometer zero drift'],
        ['Observer bias', 'Blinding, randomisation', 'Blinded event classification'],
        ['Look-elsewhere effect', 'Correct trial factor', 'Particle-physics bump hunting']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Statistical bounds assume a correct likelihood, independent measurements and unbiased estimators. Significance thresholds such as five sigma in particle physics are conventions, not laws of nature. Systematics are often correlated and resist simple Gaussian treatment.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Classic examples illustrate the method: Michelson–Morley used rotation to look for an ether wind, Eddington’s eclipse expedition compared star positions with a null control, and LIGO used multiple detectors and careful noise budgeting to claim gravitational-wave detection.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Reproducibility, preregistration and the appropriate use of p-values versus Bayesian evidence are actively debated. Designing experiments with machine-learned controls and quantifying systematics in complex detectors remain difficult.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Experimental design ties together metrology, statistics and instrumentation; the same logic underlies astronomical surveys, particle searches and clinical trials.` }
    ]
  },
  {
    id: 'metrology',
    title: 'Metrology',
    branchId: 'experimental-physics',
    level: 'Undergraduate 2',
    summary: 'The science of measurement: SI units, traceability, uncertainty propagation and quantum standards.',
    prerequisites: [],
    tags: ['SI units', 'uncertainty', 'atomic clocks', 'quantum standards'],
    blocks: [
      { kind: 'paragraph', text: `Metrology makes measurements comparable across laboratories and generations. Since 2019 the SI is defined by fixing exact numerical values of fundamental constants, so units are realised from physics rather than from a physical artefact.` },
      { kind: 'heading', text: 'Units from constants', level: 2 },
      { kind: 'paragraph', text: `The second is defined by the caesium-133 hyperfine transition at 9,192,631,770 hertz, the metre by the speed of light, and the kilogram by the Planck constant through the Kibble balance or silicon-sphere approaches. The ampere, kelvin and mole are likewise tied to the elementary charge, Boltzmann constant and Avogadro constant.` },
      { kind: 'math', latex: String.raw`u_{y}^{2}=\sum_i\left(\frac{\partial f}{\partial x_i}\right)^{2}u_{x_i}^{2}+2\sum_{i<j}\frac{\partial f}{\partial x_i}\frac{\partial f}{\partial x_j}\mathrm{cov}(x_i,x_j)`, display: true, caption: `Propagation of standard uncertainties including correlations.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `A measured value without an uncertainty is not a result. Type A uncertainties come from repeated observations and statistics; Type B come from calibration certificates, specifications and physical judgement. Traceability is the documented chain linking a reading to a primary standard.` },
      { kind: 'math', latex: String.raw`K_{\rm J}=\frac{2e}{h},\qquad R_{\rm K}=\frac{h}{e^{2}},\qquad \frac{\Delta\nu}{\nu}\sim 10^{-18}\;(\mathrm{optical\ clocks})`, display: true },
      { kind: 'steps', title: 'Reporting a measurement', items: [
        { title: 'Define the measurand', text: `State exactly what quantity is being measured, including conditions and corrections.` },
        { title: 'Calibrate', text: `Compare against a traceable standard and document the correction and its uncertainty.` },
        { title: 'Build the budget', text: `List every uncertainty component with its type and estimated magnitude.` },
        { title: 'Combine and round', text: `Combine standard uncertainties in quadrature and quote the result with consistent significant figures.` }
      ] },
      { kind: 'table', headers: ['Standard', 'Physical effect', 'Realises'], rows: [
        ['Caesium clock', 'Hyperfine transition', 'Second'],
        ['Josephson junction', 'AC Josephson effect', 'Volt'],
        ['Quantum Hall device', 'Quantised Hall resistance', 'Ohm'],
        ['Kibble balance', 'Mechanical–electrical power balance', 'Kilogram']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `The SI assumes the fixed constants are genuinely constant and that quantum standards are reproducible. Uncertainty propagation assumes a linearised model and, for simple quadrature, uncorrelated inputs or known covariances.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `International intercomparisons of clocks and electrical standards demonstrate reproducibility at extraordinary levels; optical lattice clocks now reach fractional instabilities near 10^-18, sensitive enough to measure gravitational redshift over centimetre height differences.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `A future redefinition of the second based on optical transitions, tests of fundamental-constant stability, quantum-enhanced sensing and practical dissemination of quantum standards are active topics.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Metrology underpins experimental design and instrumentation, and its quantum standards are direct applications of quantum mechanics and electromagnetism. Precision measurements also test relativity and probe fundamental constants.` }
    ]
  },
  {
    id: 'surface-physics',
    title: 'Surface Physics',
    branchId: 'materials-physics',
    level: 'Undergraduate 4',
    summary: 'The distinct structure and thermodynamics of the few atomic layers at a material boundary.',
    prerequisites: [],
    tags: ['adsorption', 'surface reconstruction', 'STM', '2D materials'],
    blocks: [
      { kind: 'paragraph', text: `At a surface the periodic arrangement of a bulk crystal terminates. Broken bonds, reduced coordination and changed electronic structure make the top few layers behave differently from the interior, which is why surfaces control catalysis, corrosion, adhesion and device contacts.` },
      { kind: 'heading', text: 'Surface energy and adsorption', level: 2 },
      { kind: 'paragraph', text: `Creating a surface costs energy because bonds are cut; the surface free energy gamma is the reversible work per unit area. Crystals lower gamma by rearranging surface atoms, a phenomenon called reconstruction. Adsorption lowers surface energy further and is described by isotherms relating coverage to gas pressure.` },
      { kind: 'math', latex: String.raw`\theta=\frac{Kp}{1+Kp},\qquad \gamma=\left(\frac{\partial G}{\partial A}\right)_{T,p,n}`, display: true, caption: `The Langmuir isotherm assumes equivalent sites and no interactions between adsorbates.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Surface atoms have fewer neighbours than bulk atoms, so dangling bonds can reorganise into new patterns: silicon(100) forms a 2-by-1 reconstruction with dimer rows. Work functions change because the surface dipole changes, and band bending near a surface governs Schottky contacts in semiconductors.` },
      { kind: 'math', latex: String.raw`\Phi=E_{\rm vac}-E_{\rm F},\qquad D\propto \exp\left(-\frac{2\kappa d}{\hbar}\right)`, display: true, caption: `Tunneling current in an STM decays exponentially with tip–sample separation d.` },
      { kind: 'steps', title: 'Studying a surface', items: [
        { title: 'Prepare', text: `Use ultra-high vacuum, cleavage, annealing or ion sputtering to obtain a clean, ordered surface.` },
        { title: 'Determine structure', text: `Low-energy electron diffraction gives long-range order; scanning tunneling microscopy images local structure.` },
        { title: 'Probe composition and electronic states', text: `X-ray photoelectron spectroscopy and ultraviolet photoelectron spectroscopy identify elements and bands.` },
        { title: 'Measure function', text: `Track adsorption or conductivity to connect atomic structure to catalysis or device behaviour.` }
      ] },
      { kind: 'table', headers: ['Technique', 'Information', 'Resolution'], rows: [
        ['LEED', 'Surface crystallography', 'Long-range order'],
        ['STM', 'Local topography and states', 'Atomic'],
        ['AFM', 'Force and topography', 'Atomic to nanoscale'],
        ['XPS/UPS', 'Composition and electronic structure', 'Chemical sensitivity']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Langmuir adsorption assumes a uniform surface, single-layer coverage and no lateral interactions; real surfaces have defects and heterogeneity. Atomically resolved probes usually require ultra-high vacuum and conductive or specially prepared samples.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `LEED patterns directly reveal reconstructions such as Si(100)-(2x1); STM images show individual atoms and adsorbates; XPS measures core-level shifts. These tools established the modern picture of surface structure and bonding.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `Operando characterisation under realistic pressure and temperature, the structure of liquid surfaces, the role of defects in catalysis and twist-angle physics in van der Waals heterostructures are active frontiers.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Surface physics connects quantum mechanics, condensed matter and chemistry, and underpins nanophotonics, semiconductor devices and materials growth.` }
    ]
  },
  {
    id: 'seismology',
    title: 'Seismology',
    branchId: 'space-geophysics',
    level: 'Undergraduate 2',
    summary: 'Using elastic waves from earthquakes to image Earth’s interior and locate sources.',
    prerequisites: [],
    tags: ['P waves', 'S waves', 'Earth structure', 'tomography'],
    simulationIds: ['wave-interference'],
    blocks: [
      { kind: 'paragraph', text: `Seismology is the study of elastic waves travelling through a planet. Because different wave types respond differently to rigidity and density, their travel times reveal the layered structure of Earth’s interior, including the liquid outer core.` },
      { kind: 'heading', text: 'Wave types and speeds', level: 2 },
      { kind: 'paragraph', text: `Body waves comprise compressional P waves and shear S waves. Surface waves travel along the free surface and are slower but more destructive. P waves can pass through liquids; S waves cannot, which is the key evidence that Earth’s outer core is liquid.` },
      { kind: 'math', latex: String.raw`v_{P}=\sqrt{\frac{K+\frac{4}{3}\mu}{\rho}},\qquad v_{S}=\sqrt{\frac{\mu}{\rho}}`, display: true, caption: `K is bulk modulus, mu is shear modulus and rho is density.` },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `Seismic rays bend because speed changes with depth, following Snell’s law just as light does in a graded-index medium. The shadow zone for P waves between roughly 103 and 142 degrees from an epicentre arises from refraction at the core–mantle boundary; the S-wave shadow beyond about 103 degrees shows that shear waves cannot cross the liquid core.` },
      { kind: 'math', latex: String.raw`\frac{\sin\theta_{1}}{v_{1}}=\frac{\sin\theta_{2}}{v_{2}},\qquad M_{w}=\frac{2}{3}\log_{10}M_{0}-6.1`, display: true, caption: `The moment magnitude uses seismic moment M_0 measured in newton metres.` },
      { kind: 'steps', title: 'Locating an earthquake', items: [
        { title: 'Detect arrivals', text: `Pick P-wave and S-wave arrival times at several stations.` },
        { title: 'Estimate distance', text: `The S-minus-P time interval grows with distance because P waves travel faster.` },
        { title: 'Triangulate', text: `Use distances from at least three stations to locate the epicentre; depths need more stations and a velocity model.` },
        { title: 'Invert for structure', text: `Travel-time residuals across many events and stations are inverted to map velocity variations (seismic tomography).` }
      ] },
      { kind: 'table', headers: ['Layer', 'Depth range', 'Diagnostic', 'State'], rows: [
        ['Crust', 'Surface to about 35 km beneath continents', 'Moho discontinuity', 'Solid'],
        ['Mantle', 'To about 2890 km', 'High-speed P and S waves', 'Solid, slowly flowing'],
        ['Outer core', '2890–5150 km', 'No S waves', 'Liquid'],
        ['Inner core', '5150–6371 km', 'PKIKP arrivals', 'Solid']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `Ray theory assumes wavelengths much shorter than structural scales. Standard Earth models such as PREM assume radial symmetry and isotropic elasticity; lateral variations, anisotropy and attenuation are added as perturbations. Source mechanisms are approximated as point double couples.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Global networks record travel-time curves that match layered models, free-oscillation spectra confirm the radial structure, and tomography images subducting slabs and mantle plumes. The InSight lander recorded marsquakes, extending the method to another planet.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `The anisotropy and growth history of the inner core, the nature of the D-double-prime layer at the core–mantle boundary, attenuation mechanisms and reliable earthquake early warning remain active problems.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Seismology applies wave physics, continuum mechanics and signal processing; it links to geophysics, planetary science and engineering, and it shares inverse-problem methods with medical imaging.` }
    ]
  },
  {
    id: 'solar-physics',
    title: 'Solar Physics',
    branchId: 'plasma-physics',
    level: 'Undergraduate 3',
    summary: 'The Sun as a magnetised, convecting plasma: energy generation, oscillations, activity and the solar wind.',
    prerequisites: ['stellar-structure', 'mhd'],
    tags: ['Sun', 'pp chain', 'dynamo', 'corona', 'helioseismology'],
    blocks: [
      { kind: 'paragraph', text: `The Sun is the nearest star and the only one whose interior can be studied in detail. It is a magnetised plasma sphere with a nuclear-burning core, a radiative interior, a convective envelope, a hot corona and an outflowing solar wind that fills the heliosphere.` },
      { kind: 'heading', text: 'Energy generation and transport', level: 2 },
      { kind: 'paragraph', text: `Hydrogen burns mainly through the proton–proton chain in the inner tenth of the Sun, where the temperature reaches about 1.5 times 10^7 kelvin. Energy moves outward by radiation through the radiative zone and by convection in the outer third; the tachocline separates the two regions and is a likely site of dynamo action.` },
      { kind: 'math', latex: String.raw`4\,^{1}{\rm H}\rightarrow\,^{4}{\rm He}+2e^{+}+2\nu_{e}+26.7\,{\rm MeV}`, display: true },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      { kind: 'paragraph', text: `The Sun shines because fusion slowly converts mass into energy, with about 0.7 percent of the burned mass released. Photons take tens of thousands of years to random-walk out of the radiative interior, while neutrinos escape in seconds. The surface radiates at about 5770 kelvin even though the corona reaches a million kelvin, a long-standing heating puzzle.` },
      { kind: 'math', latex: String.raw`L_\odot=3.83\times10^{26}\,{\rm W},\qquad R_\odot=6.96\times10^{8}\,{\rm m},\qquad M_\odot=1.99\times10^{30}\,{\rm kg}`, display: true },
      { kind: 'steps', title: 'Reading solar activity', items: [
        { title: 'Track sunspots', text: `Dark, magnetically active regions trace an approximately 11-year cycle with polarity reversal.` },
        { title: 'Model the dynamo', text: `Differential rotation and convection stretch and regenerate magnetic fields near the tachocline.` },
        { title: 'Watch eruptions', text: `Magnetic reconnection drives flares and coronal mass ejections that disturb the near-Earth environment.` },
        { title: 'Probe the interior', text: `Helioseismology uses surface oscillation modes to infer internal rotation and sound speed.` }
      ] },
      { kind: 'table', headers: ['Region', 'Typical property', 'Physics'], rows: [
        ['Core', 'About 15 MK', 'Proton–proton burning'],
        ['Radiative zone', 'Opacity-dominated transport', 'Photon diffusion'],
        ['Convective zone', 'Unstable to convection', 'Granulation'],
        ['Corona', 'About 1 MK', 'Magnetic heating, conduction']
      ] },
      { kind: 'heading', text: 'Assumptions', level: 3 },
      { kind: 'paragraph', text: `The standard solar model assumes spherical symmetry, hydrostatic equilibrium and mixing-length convection. The solar metallicity problem is a disagreement between measured abundances and helioseismic requirements. Coronal heating and flare energetics are not fully solved.` },
      { kind: 'heading', text: 'Observational evidence', level: 3 },
      { kind: 'paragraph', text: `Helioseismic measurements from SOHO and ground networks confirm the internal sound-speed profile. The solar neutrino problem was resolved by neutrino oscillations confirmed by Super-Kamiokande and SNO. Spacecraft including Parker Solar Probe and Solar Orbiter measure the corona and solar wind in situ.` },
      { kind: 'heading', text: 'Open questions', level: 3 },
      { kind: 'paragraph', text: `The mechanisms of coronal heating and solar-wind acceleration, the origin of the magnetic cycle, flare prediction and the correct solar composition remain open.` },
      { kind: 'callout', tone: 'insight', title: 'Connections', text: `Solar physics is applied stellar structure plus magnetohydrodynamics; it connects to space weather, plasma physics, neutrino physics and the study of other stars.` }
    ]
  },
  {
    id: 'hubble-law',
    title: 'The Hubble–Lemaître Law',
    branchId: 'cosmology',
    level: 'Undergraduate 1',
    summary: 'The observed proportionality between galaxy recession speed and distance, and what it says about expansion.',
    prerequisites: ['friedmann-equations'],
    tags: ['redshift', 'distance ladder', 'Hubble constant'],
    simulationIds: ['expanding-universe'],
    experimentIds: ['u-hubble-diagnostic'],
    blocks: [
      { kind: 'paragraph', text: `Galaxies beyond the Local Group are observed to recede from us at a speed proportional to their distance: v approximately equal to H_0 times d. This is the Hubble–Lemaître law, and it is a natural consequence of a uniformly expanding cosmos rather than motion through a fixed space.` },
      { kind: 'heading', text: 'Distance and redshift', level: 2 },
      { kind: 'math', latex: String.raw`v\simeq H_{0}d,\qquad 1+z=\frac{\lambda_{\rm obs}}{\lambda_{\rm emit}}=\frac{a(t_{0})}{a(t_{\rm emit})}`, display: true, caption: `At low redshift the Doppler-like relation v approximately cz is adequate.` },
      { kind: 'paragraph', text: `Distances come from a ladder: parallaxes calibrate main-sequence stars, Cepheids calibrate Type Ia supernovae, and supernovae reach cosmological distances. Redshifts are measured from spectral lines. The slope H_0 has units of inverse time, conventionally quoted in kilometres per second per megaparsec.` },
      { kind: 'callout', tone: 'insight', title: 'Physical intuition', text: `A uniform expansion is like dots on an inflating balloon: every dot sees all others recede, with speed growing with separation. There is no centre of the expansion within the balloon's surface.` },
      { kind: 'paragraph', text: `Current determinations cluster near 70 km/s/Mpc. Early-universe inference assuming the standard flat cosmological model gives about 67.4, while the Cepheid-supernova distance ladder gives about 73. This difference of roughly five standard deviations is the Hubble tension.` },
      { kind: 'table', headers: ['Method', 'Typical H0 (km/s/Mpc)', 'Status'], rows: [
        ['CMB plus Lambda-CDM', '67.4 ± 0.5', 'Model dependent'],
        ['Cepheids plus supernovae', 'About 73', 'Local distance ladder'],
        ['Baryon acoustic oscillations', 'Around 67–70', 'Consistent with early universe']
      ] },
      { kind: 'callout', tone: 'note', title: 'Assumptions', text: `The simple linear law holds only for small redshift; at larger z the full distance–redshift relation of the Friedmann model is required, and peculiar velocities add scatter.` }
    ]
  },
  {
    id: 'pulsars',
    title: 'Pulsars',
    branchId: 'astrophysics',
    level: 'Undergraduate 3',
    summary: 'Rotating magnetised neutron stars as precise clocks and probes of gravity and dense matter.',
    prerequisites: ['neutron-stars'],
    tags: ['rotation', 'magnetic dipole', 'timing', 'gravitational waves'],
    blocks: [
      { kind: 'paragraph', text: `Pulsars are neutron stars whose beams of radiation sweep past Earth like a lighthouse. Rotation periods range from milliseconds to several seconds, and their extraordinary regularity makes them precise natural clocks.` },
      { kind: 'heading', text: 'Spin-down and recycling', level: 2 },
      { kind: 'math', latex: String.raw`\dot E_{\rm rot}=-4\pi^{2}I\frac{\dot P}{P^{3}},\qquad B_{\rm dip}\propto \sqrt{P\dot P}`, display: true },
      { kind: 'paragraph', text: `Magnetic dipole radiation slows the star, so periods increase slowly; young pulsars have large period derivatives and strong fields. Accretion from a companion can spin a star up to millisecond periods, producing recycled pulsars with weak fields and exceptional stability.` },
      { kind: 'callout', tone: 'insight', title: 'Physical intuition', text: `The pulse period measures rotation, and its derivative measures the energy loss rate. Timing residuals reveal anything that perturbs the arrival times: orbital companions, glitches, interstellar dispersion or a gravitational-wave background.` },
      { kind: 'paragraph', text: `Binary pulsars test general relativity through orbital decay; the Hulse–Taylor system matched the predicted gravitational-wave energy loss. Pulsar timing arrays search for the nanohertz gravitational-wave background expected from supermassive black-hole binaries, and reported evidence for a common-spectrum signal in 2023.` },
      { kind: 'table', headers: ['Class', 'Period', 'Typical origin'], rows: [
        ['Young pulsars', 'About 0.1–2 s', 'Recent core collapse'],
        ['Millisecond pulsars', 'About 1–10 ms', 'Recycled by accretion'],
        ['Magnetars', 'About 2–12 s', 'Extremely strong magnetic fields']
      ] },
      { kind: 'callout', tone: 'note', title: 'Assumptions', text: `The dipole estimate of magnetic field assumes a simple geometry; the true field structure may be far more complex. Timing models require corrections for dispersion, proper motion and clock standards.` }
    ]
  },
  {
    id: 'plasma-basics',
    title: 'Plasma Basics',
    branchId: 'plasma-physics',
    level: 'Undergraduate 2',
    summary: 'Quasineutral ionised gas, collective behaviour, Debye shielding and plasma oscillations.',
    prerequisites: [],
    tags: ['Debye length', 'plasma frequency', 'ionisation', 'space plasmas'],
    blocks: [
      { kind: 'paragraph', text: `A plasma is an ionised gas whose behaviour is dominated by electromagnetic forces between charged particles rather than by neutral collisions. It is quasineutral overall but supports charge separations over short distances, which produces collective phenomena absent in ordinary gases.` },
      { kind: 'heading', text: 'Screening and oscillations', level: 2 },
      { kind: 'math', latex: String.raw`\lambda_{\rm D}=\sqrt{\frac{\epsilon_{0}k_{\rm B}T}{ne^{2}}},\qquad \omega_{\rm p}=\sqrt{\frac{ne^{2}}{\epsilon_{0}m_{e}}}`, display: true },
      { kind: 'paragraph', text: `The Debye length is the scale over which charges rearrange to screen an electric field; a plasma must contain many particles in a Debye sphere for the concept to apply. Electrons oscillate collectively at the plasma frequency when displaced from ions, producing an electromagnetic cutoff at that frequency.` },
      { kind: 'callout', tone: 'insight', title: 'Physical intuition', text: `Unlike a neutral gas, a plasma responds collectively: push the electrons and the ions feel it. This is why plasmas support waves, instabilities and structures such as double layers and sheaths.` },
      { kind: 'paragraph', text: `Plasmas are classified as cold or hot, collisional or collisionless, and magnetised or unmagnetised depending on whether particles complete gyromotion between collisions. Most of the visible universe is plasma, including the solar wind and the interstellar medium.` },
      { kind: 'table', headers: ['Quantity', 'Definition', 'Role'], rows: [
        ['Debye length', 'Screening distance', 'Sets quasi-neutrality scale'],
        ['Plasma frequency', 'Electron oscillation rate', 'Sets wave cutoff'],
        ['Gyroradius', 'Orbit radius in a magnetic field', 'Determines magnetisation']
      ] },
      { kind: 'callout', tone: 'note', title: 'Assumptions', text: `Simple formulas assume Maxwellian electrons, a single ion species and weak coupling; strongly coupled and dusty plasmas require different descriptions.` }
    ]
  },
  {
    id: 'quantum-gravity-phenomenology',
    title: 'Quantum Gravity Phenomenology',
    branchId: 'quantum-gravity',
    level: 'Graduate',
    summary: 'Searching for tiny observable traces of Planck-scale physics in high-energy astrophysics and precision experiments.',
    prerequisites: ['string-theory', 'loop-quantum-gravity'],
    tags: ['Planck scale', 'Lorentz invariance', 'constraints', 'status: speculative searches'],
    problemIds: ['u-planck-scale-dispersion'],
    blocks: [
      { kind: 'paragraph', text: `Direct experiments at the Planck energy are impossible with foreseeable accelerators, so researchers look for minuscule accumulated effects in astronomical observations or precision laboratory measurements. All such signals are hypothetical; so far none has been confirmed.` },
      { kind: 'heading', text: 'The Planck scale', level: 2 },
      { kind: 'math', latex: String.raw`E_{\rm P}=\sqrt{\frac{\hbar c^{5}}{G}}\approx 1.2\times10^{19}\,{\rm GeV},\qquad \ell_{\rm P}=\sqrt{\frac{\hbar G}{c^{3}}}\approx 1.6\times10^{-35}\,{\rm m}`, display: true },
      { kind: 'paragraph', text: `Planck-scale phenomenology considers energy-dependent photon speeds, modified dispersion relations, vacuum birefringence, decoherence of quantum states, minimum lengths and possible variations of fundamental constants. Gamma-ray bursts and active galaxies provide long baselines that amplify tiny effects.` },
      { kind: 'callout', tone: 'insight', title: 'Physical intuition', text: `A fractional speed difference of order E divided by E_P is absurdly small, but over a gigaparsec it can accumulate to seconds of arrival-time difference, which fast gamma-ray timing can constrain.` },
      { kind: 'paragraph', text: `Searches using Fermi-LAT gamma-ray bursts and TeV observations of blazars have generally found no compelling Lorentz-violation signal and place limits at or beyond the Planck scale for some models. Laboratory tests of Lorentz invariance and equivalence-principle experiments constrain other parameterisations.` },
      { kind: 'table', headers: ['Probe', 'Searches for', 'Outcome'], rows: [
        ['Gamma-ray burst timing', 'Energy-dependent speed', 'No confirmed deviation'],
        ['Polarisation of distant sources', 'Vacuum birefringence', 'Strong constraints'],
        ['Atomic clocks', 'Constant variation', 'No confirmed drift'],
        ['Black-hole shadows', 'Modified dispersion', 'Model-dependent bounds']
      ] },
      { kind: 'callout', tone: 'warning', title: 'Assumptions', text: `Constraints apply only to specific phenomenological models. The absence of a signal does not rule out quantum gravity itself, since many approaches preserve Lorentz invariance at observable energies.` }
    ]
  },
  {
    id: 'nanophotonics',
    title: 'Nanophotonics',
    branchId: 'photonics',
    level: 'Undergraduate 4',
    summary: 'Controlling light with structures and materials whose dimensions are comparable to or smaller than the wavelength.',
    prerequisites: [],
    tags: ['plasmonics', 'metamaterials', 'photonic crystals', 'near fields'],
    blocks: [
      { kind: 'paragraph', text: `Nanophotonics engineers the local electromagnetic environment on subwavelength scales. By structuring matter at nanometre dimensions one can confine light far below the diffraction limit, enhance fields, and design optical responses not available in natural materials.` },
      { kind: 'heading', text: 'Plasmons and confinement', level: 2 },
      { kind: 'math', latex: String.raw`k_{\rm SPP}=\frac{\omega}{c}\sqrt{\frac{\epsilon_{m}\epsilon_{d}}{\epsilon_{m}+\epsilon_{d}}}`, display: true },
      { kind: 'paragraph', text: `Surface plasmon polaritons are coupled oscillations of electrons and electromagnetic fields at a metal–dielectric interface. Their field decays exponentially away from the surface, allowing nanometre-scale confinement at the cost of Ohmic loss. Localised plasmons in metal nanoparticles produce strong, colour-dependent scattering.` },
      { kind: 'callout', tone: 'insight', title: 'Physical intuition', text: `A metal's electrons can slosh collectively against the light's electric field. That slosh carries the optical energy along the surface in a much smaller footprint than a free-space wave.` },
      { kind: 'paragraph', text: `Photonic crystals use periodic refractive-index modulation to create band gaps for light, while metasurfaces use arrays of subwavelength scatterers to impose abrupt phase shifts and steer beams. Applications include biosensing, light-emitting devices, solar cells and optical computing.` },
      { kind: 'table', headers: ['Platform', 'Mechanism', 'Strength'], rows: [
        ['Plasmonic metal', 'Collective electron oscillation', 'Extreme confinement'],
        ['Photonic crystal', 'Bragg scattering', 'Low loss, band gaps'],
        ['Metasurface', 'Engineered phase gradients', 'Flat optical components'],
        ['High-index nanoparticle', 'Mie resonances', 'Low-loss magnetic response']
      ] },
      { kind: 'callout', tone: 'note', title: 'Assumptions', text: `Effective-medium descriptions require features much smaller than the wavelength; at the nanoscale, nonlocal response, surface roughness and fabrication disorder can dominate performance.` }
    ]
  },
  {
    id: 'mesoscopic-physics',
    title: 'Mesoscopic Physics',
    branchId: 'materials-physics',
    level: 'Graduate',
    summary: 'Quantum coherence and conductance in systems intermediate between individual atoms and bulk matter.',
    prerequisites: [],
    tags: ['Landauer formula', 'conductance quantisation', 'coherence', 'quantum dots'],
    blocks: [
      { kind: 'paragraph', text: `Mesoscopic systems are large enough to contain many atoms yet small enough that electron waves retain phase coherence across the sample. Their transport is governed by wave interference and quantisation rather than by the classical Drude picture.` },
      { kind: 'heading', text: 'Coherent transport', level: 2 },
      { kind: 'math', latex: String.raw`G=\frac{2e^{2}}{h}\sum_{n}T_{n}`, display: true, caption: `The Landauer formula relates conductance to transmission eigenchannels.` },
      { kind: 'paragraph', text: `A perfect one-dimensional channel has conductance 2e squared over h, about 77.5 microsiemens, independent of its length. In diffusive wires interference produces weak localisation and universal conductance fluctuations; ring geometries show Aharonov–Bohm oscillations as the enclosed magnetic flux is varied.` },
      { kind: 'callout', tone: 'insight', title: 'Physical intuition', text: `When electrons keep their phase, conductance is a wave-transmission problem, like light through a waveguide. Adding a weak magnetic field changes phases and therefore changes the measured resistance.` },
      { kind: 'paragraph', text: `Quantum dots confine electrons in all three dimensions and show discrete spectra and Coulomb blockade. The relevant length scales include the de Broglie wavelength, the mean free path and the phase-coherence length, which shrinks as temperature rises.` },
      { kind: 'table', headers: ['Regime', 'Condition', 'Signature'], rows: [
        ['Ballistic', 'Length below mean free path', 'Quantised conductance'],
        ['Diffusive coherent', 'Coherence length above sample size', 'Weak localisation'],
        ['Quantum dot', 'Confinement in all directions', 'Discrete levels, Coulomb blockade']
      ] },
      { kind: 'callout', tone: 'note', title: 'Assumptions', text: `The Landauer approach assumes non-interacting electrons and well-defined reservoirs; interactions and decoherence modify the simple formula, and the factor of two assumes spin degeneracy.` }
    ]
  }
]

export const UNIVERSE_DERIVATIONS: Derivation[] = [
  {
    id: 'u-hydrostatic-equilibrium',
    title: 'Hydrostatic Stellar Equilibrium',
    topicId: 'stellar-structure',
    statement: String.raw`\frac{dP}{dr}=-\frac{G\,m(r)\,\rho(r)}{r^{2}}`,
    physicalProblem: `Find the pressure profile that prevents a spherical self-gravitating gas sphere from collapsing or flying apart.`,
    assumptions: [
      'Spherical symmetry: all quantities depend only on radius r.',
      'The star is static or changes slowly compared with its dynamical timescale.',
      'Newtonian gravity; the shell theorem gives the field inside a spherical shell.',
      'No net rotation, large-scale magnetic support or bulk acceleration.',
      'Local thermodynamic equilibrium so that a scalar pressure P(r) is meaningful.',
      'Mass is generated by the local density through the continuity equation.'
    ],
    variables: [
      { symbol: 'P(r)', meaning: 'Gas pressure at radius r' },
      { symbol: 'rho(r)', meaning: 'Mass density at radius r' },
      { symbol: 'm(r)', meaning: 'Mass enclosed within radius r' },
      { symbol: 'r', meaning: 'Radial coordinate measured from the centre' },
      { symbol: 'G', meaning: 'Newton’s gravitational constant' },
      { symbol: 'g(r)', meaning: 'Local gravitational acceleration, G m(r)/r squared' },
      { symbol: 'M', meaning: 'Total stellar mass, m(R)' },
      { symbol: 'R', meaning: 'Stellar radius' }
    ],
    tools: ['Shell theorem', 'Force balance on a thin spherical shell', 'Mass continuity equation', 'Ideal-gas equation of state'],
    steps: [
      { title: 'Isolate a thin shell', text: `Consider a shell of thickness dr and area 4 pi r squared. Pressure on its inner face exceeds pressure on its outer face by dP, producing an upward force.`, math: String.raw`F_{P}=-\frac{dP}{dr}\,4\pi r^{2}\,dr` },
      { title: 'Compute its weight', text: `The shell's mass is 4 pi r squared rho dr, and gravity at r is G m(r)/r squared by the shell theorem.`, math: String.raw`F_{g}=-\frac{G\,m(r)}{r^{2}}\,4\pi r^{2}\rho\,dr` },
      { title: 'Set the net force to zero', text: `Static equilibrium requires the pressure force to balance the gravitational force exactly.`, math: String.raw`-\frac{dP}{dr}4\pi r^{2}dr=\frac{G\,m(r)}{r^{2}}4\pi r^{2}\rho\,dr` },
      { title: 'Cancel common factors', text: `Dividing by the shell volume gives the hydrostatic equation and its companion mass equation.`, math: String.raw`\frac{dP}{dr}=-\rho\,g(r)=-\frac{G\,m(r)\rho}{r^{2}},\qquad \frac{dm}{dr}=4\pi r^{2}\rho` },
      { title: 'Estimate the central pressure', text: `Dimensional analysis with P of order GM squared over R to the fourth gives the Sun's central pressure within a factor of order unity.`, math: String.raw`P_{c}\sim\frac{GM^{2}}{R^{4}}\approx 2\times10^{16}\,{\rm Pa}\;({\rm Sun})` }
    ],
    result: String.raw`\frac{dP}{dr}=-\frac{G\,m(r)\rho(r)}{r^{2}}\quad \mathrm{with}\quad \frac{dm}{dr}=4\pi r^{2}\rho`,
    interpretation: `Pressure must decrease outward, and the steeper the density and enclosed mass, the faster it falls. Combined with an equation of state and an energy equation, this determines the star's run of temperature, density and luminosity.`,
    dimensions: String.raw`\left[\frac{dP}{dr}\right]=M\,L^{-2}\,T^{-2}\ \ \mathrm{and}\ \ \left[\frac{Gm\rho}{r^{2}}\right]=(L^{3}M^{-1}T^{-2})(M)(ML^{-3})L^{-2}=M\,L^{-2}\,T^{-2}`,
    limits: [
      'If rho goes to zero the pressure gradient vanishes and the layer is weightless.',
      'For uniform density the central pressure is 3GM squared over 8 pi R to the fourth.',
      'If support is removed the star collapses on a dynamical timescale of order sqrt(R cubed over GM).'
    ],
    examples: [
      `The Sun: P_c is about 2.5 times 10^16 Pa and T_c about 1.5 times 10^7 K.`,
      `An n equals 3 polytrope reproduces the main-sequence mass–radius relation approximately.`,
      `A white dwarf is supported by degeneracy pressure in the same force balance, but with a different equation of state.`
    ],
    applications: [
      'Constructing standard solar and stellar models.',
      'Deriving the virial theorem for bound self-gravitating systems.',
      'Estimating maximum masses of degenerate stars.',
      'Setting the boundary conditions for stellar evolution calculations.'
    ],
    limitations: [
      'Rotation, magnetic fields and turbulence add extra stress terms.',
      'Strong gravity near neutron stars requires the Tolman–Oppenheimer–Volkoff equation.',
      'Rapidly changing stars need a momentum equation instead of static balance.',
      'Convection transports energy by bulk motion, which a purely diffusive model misses.'
    ]
  },
  {
    id: 'u-friedmann-from-gr',
    title: 'The Friedmann Equations from General Relativity',
    topicId: 'friedmann-equations',
    statement: String.raw`H^{2}=\frac{8\pi G}{3}\rho-\frac{kc^{2}}{a^{2}}+\frac{\Lambda c^{2}}{3},\qquad \frac{\ddot a}{a}=-\frac{4\pi G}{3}\left(\rho+\frac{3p}{c^{2}}\right)+\frac{\Lambda c^{2}}{3}`,
    physicalProblem: `Determine how the scale factor of a homogeneous, isotropic universe evolves under gravity, pressure and vacuum energy.`,
    assumptions: [
      'The cosmological principle: spatial homogeneity and isotropy on large scales.',
      'General relativity is the correct theory of gravity.',
      'The FLRW metric with curvature parameter k equal to plus one, zero or minus one, and a(t) having dimensions of length.',
      'Cosmic matter is a perfect fluid with energy density rho and pressure p.',
      'Observers are comoving with the cosmic fluid; there is no preferred location.',
      'Lambda represents a constant vacuum energy and there are no extra fields.'
    ],
    variables: [
      { symbol: 'a(t)', meaning: 'Scale factor with dimensions of length' },
      { symbol: 'H', meaning: 'Hubble parameter, dot a over a' },
      { symbol: 'rho, p', meaning: 'Energy density and pressure of the cosmic fluid' },
      { symbol: 'k', meaning: 'Spatial curvature index, plus one, zero or minus one' },
      { symbol: 'Lambda', meaning: 'Cosmological constant' },
      { symbol: 'G, c', meaning: 'Newton’s constant and the speed of light' },
      { symbol: 'rho_c', meaning: 'Critical density, 3H squared over 8 pi G' },
      { symbol: 'Omega_i', meaning: 'Density parameter rho_i over rho_c' }
    ],
    tools: ['Einstein field equations', 'FLRW metric', 'Perfect-fluid stress tensor', 'Bianchi identities and covariant conservation', 'Thermodynamic first law for an expanding volume'],
    steps: [
      { title: 'Write the metric and stress tensor', text: `Impose homogeneity and isotropy on the line element and model the contents as a perfect fluid.`, math: String.raw`ds^{2}=-c^{2}dt^{2}+a^{2}(t)\left[\frac{dr^{2}}{1-kr^{2}}+r^{2}d\Omega^{2}\right]` },
      { title: 'Take the time–time component', text: `Insert the metric into G_mu nu equals 8 pi G T_mu nu over c to the fourth plus the Lambda term.`, math: String.raw`H^{2}+\frac{kc^{2}}{a^{2}}=\frac{8\pi G}{3}\rho+\frac{\Lambda c^{2}}{3}` },
      { title: 'Take the space–space component', text: `The spatial components give the second independent equation, rewritten as the acceleration equation.`, math: String.raw`\frac{\ddot a}{a}=-\frac{4\pi G}{3}\left(\rho+\frac{3p}{c^{2}}\right)+\frac{\Lambda c^{2}}{3}` },
      { title: 'Use conservation', text: `Covariant conservation of the stress tensor yields the continuity equation, equivalent to the first law for an expanding volume.`, math: String.raw`\dot\rho+3\frac{\dot a}{a}\left(\rho+\frac{p}{c^{2}}\right)=0` },
      { title: 'Solve for simple fluids', text: `With p equal to w rho c squared, density scales as a to the minus three times one plus w.`, math: String.raw`\rho(a)=\rho_{0}\,a^{-3(1+w)}` }
    ],
    result: String.raw`H^{2}=\frac{8\pi G\rho}{3}-\frac{kc^{2}}{a^{2}}+\frac{\Lambda c^{2}}{3},\quad \frac{\ddot a}{a}=-\frac{4\pi G}{3}\left(\rho+\frac{3p}{c^{2}}\right)+\frac{\Lambda c^{2}}{3},\quad \dot\rho+3H\left(\rho+\frac{p}{c^{2}}\right)=0`,
    interpretation: `The first equation is an energy constraint on the expansion, the second shows that pressure gravitates, and the third tracks dilution. Ordinary matter and radiation decelerate expansion; a component with w below minus one third accelerates it.`,
    dimensions: String.raw`[H^{2}]=T^{-2},\quad [G\rho]=T^{-2},\quad \left[\frac{kc^{2}}{a^{2}}\right]=T^{-2},\quad [\Lambda]=L^{-2}`,
    limits: [
      'Matter domination with k and Lambda zero gives a proportional to t to the two thirds.',
      'Radiation domination gives a proportional to t to the one half.',
      'Vacuum domination gives de Sitter expansion with constant H and a proportional to exp(Ht).',
      'At a going to zero the classical equations produce a singularity where the theory breaks down.'
    ],
    examples: [
      `H_0 of 70 km/s/Mpc corresponds to a Hubble time near 14 billion years.`,
      `Planck-like parameters Omega_m about 0.31 and Omega_Lambda about 0.69 give a flat universe today.`,
      `During radiation domination the sound horizon used for the CMB acoustic scale follows directly from this expansion rate.`
    ],
    applications: [
      'Interpreting supernova and BAO distance measurements.',
      'Computing the age and future fate of the universe.',
      'Setting the background for CMB anisotropy calculations.',
      'Estimating the thermal history during nucleosynthesis.'
    ],
    limitations: [
      'Exact homogeneity and isotropy fail on small scales; perturbations are a separate subject.',
      'The equations do not explain the value of Lambda or the initial conditions.',
      'They assume general relativity; modified-gravity theories change the relations.',
      'They cannot describe the Planck-era regime where quantum gravity is needed.'
    ]
  },
  {
    id: 'u-cmb-acoustic-peak',
    title: 'Estimating the First CMB Acoustic Peak',
    topicId: 'cmb',
    statement: String.raw`\ell_{A}\simeq\frac{\pi D_{C}(z_{*})}{r_{s}(z_{*})}\approx 300,\qquad \ell_{1}\approx 220`,
    physicalProblem: `Predict the angular scale of the first acoustic peak in the cosmic microwave background using known physics of the pre-recombination plasma.`,
    assumptions: [
      'A spatially flat Lambda-CDM background with radiation, matter and vacuum energy.',
      'The photon–baryon plasma is tightly coupled before recombination and behaves as a single fluid.',
      'Perturbations are small, adiabatic and evolved with linear theory.',
      'The sound speed is close to c over square root of three, with baryon loading treated as a correction.',
      'Last scattering occurs at redshift z about 1090 with a well-defined sound horizon.',
      'The observed multipole is related to a comoving wavenumber by l approximately k times the comoving distance.'
    ],
    variables: [
      { symbol: 'r_s', meaning: 'Comoving sound horizon at recombination, about 147 Mpc' },
      { symbol: 'D_C', meaning: 'Comoving distance to last scattering, about 13.9 Gpc' },
      { symbol: 'c_s', meaning: 'Sound speed in the photon–baryon fluid' },
      { symbol: 'z_*', meaning: 'Redshift of last scattering, approximately 1090' },
      { symbol: 'ell_A', meaning: 'Acoustic angular scale multipole' },
      { symbol: 'ell_1', meaning: 'Multipole of the first temperature peak' },
      { symbol: 'R', meaning: 'Baryon-to-photon momentum ratio controlling the phase shift' }
    ],
    tools: ['Sound horizon integral', 'Small-angle multipole relation', 'Friedmann expansion rate', 'Boltzmann treatment of photon streaming'],
    steps: [
      { title: 'Find the sound speed', text: `For a relativistic photon gas loaded by baryons, the sound speed is slightly below c over square root of three.`, math: String.raw`c_{s}=\frac{c}{\sqrt{3(1+R)}},\qquad R=\frac{3\rho_{b}}{4\rho_{\gamma}}` },
      { title: 'Compute the sound horizon', text: `Integrate the sound speed over conformal time up to recombination; numerically this gives about 147 Mpc.`, math: String.raw`r_{s}(z_{*})=\int_{z_{*}}^{\infty}\frac{c_{s}(z)}{H(z)}\,dz\approx 147\,{\rm Mpc}` },
      { title: 'Compute the comoving distance', text: `In the flat fiducial cosmology the distance to last scattering is about 13.9 Gpc, giving an angular scale of about 0.6 degrees.`, math: String.raw`\theta_{s}\approx\frac{r_{s}}{D_{C}}\approx 0.0106\,{\rm rad}\approx 0.6^{\circ}` },
      { title: 'Convert to a multipole', text: `Small angular scales correspond to large multipoles, l approximately pi divided by the angle in radians.`, math: String.raw`\ell_{A}\approx\frac{\pi}{\theta_{s}}\approx 300` },
      { title: 'Apply the phase correction', text: `Baryon loading and gravitational driving shift the first compression peak below the acoustic scale; full Boltzmann calculations place it near 220.`, math: String.raw`\ell_{1}\approx 220\;\mathrm{while}\;\ell_{A}\approx 300` }
    ],
    result: String.raw`\ell_{1}\approx 220`,
    interpretation: `The first peak is a standard ruler: its angular position tests spatial curvature and the expansion history. The relative heights of later peaks measure the baryon and dark-matter densities.`,
    dimensions: String.raw`[r_{s}]=L,\quad [D_{C}]=L,\quad [\ell]=1`,
    limits: [
      'Without baryons the peak structure would be symmetric and the phase shift absent.',
      'A strongly curved universe would move the peak to a different multipole.',
      'At high multipoles Silk damping suppresses the peaks and the simple estimate fails.'
    ],
    examples: [
      `Planck's measured acoustic scale is close to l_A about 300 and the first peak near 220.`,
      `The corresponding physical scale of about 147 Mpc is used as a baryon-acoustic-oscillation ruler at lower redshift.`,
      `Changing the assumed curvature while holding the sound horizon fixed shifts all peaks coherently.`
    ],
    applications: [
      'Inferring spatial curvature from CMB peak positions.',
      'Measuring the baryon and cold-dark-matter densities from peak heights.',
      'Calibrating BAO standard rulers in galaxy surveys.',
      'Testing alternatives to the standard recombination history.'
    ],
    limitations: [
      'The estimate assumes a background cosmology and linear physics; precision requires a Boltzmann code.',
      'Foreground subtraction and beam systematics limit real measurements.',
      'Non-standard recombination or early dark energy changes the sound horizon and breaks simple inferences.'
    ]
  },
  {
    id: 'u-jeans-instability',
    title: 'The Jeans Instability Criterion',
    topicId: 'large-scale-structure',
    statement: String.raw`k_{\rm J}^{2}=\frac{4\pi G\rho_{0}}{c_{s}^{2}},\qquad \lambda_{\rm J}=c_{s}\sqrt{\frac{\pi}{G\rho_{0}}}`,
    physicalProblem: `Determine which small density perturbations in a homogeneous gas grow under self-gravity rather than oscillate as sound waves.`,
    assumptions: [
      'An infinite, static, homogeneous gas of density rho_0 and pressure P_0.',
      'Perturbations are small and plane-wave-like, so linearisation is valid.',
      'The gas has an effective sound speed c_s and no viscosity, rotation or magnetic field.',
      'Newtonian gravity with the Poisson equation for the perturbed potential.',
      'The background gravitational field is subtracted (the Jeans swindle), appropriate for an infinite medium.',
      `No cosmic expansion or cooling during the perturbation’s growth.`
    ],
    variables: [
      { symbol: 'rho_0', meaning: 'Background mass density' },
      { symbol: 'delta', meaning: 'Fractional density perturbation, delta rho over rho_0' },
      { symbol: 'c_s', meaning: 'Adiabatic sound speed' },
      { symbol: 'k, lambda', meaning: 'Perturbation wavenumber and wavelength' },
      { symbol: 'omega', meaning: 'Perturbation angular frequency' },
      { symbol: 'Phi', meaning: 'Perturbed gravitational potential' },
      { symbol: 'G', meaning: 'Newton’s gravitational constant' }
    ],
    tools: ['Continuity equation', 'Euler equation', 'Poisson equation', 'Linear plane-wave analysis'],
    steps: [
      { title: 'Linearise the fluid equations', text: `Write rho equal rho_0 times one plus delta, velocity small, and Phi small; keep only first-order terms.`, math: String.raw`\frac{\partial\delta}{\partial t}+\nabla\cdot\mathbf{v}=0` },
      { title: 'Linearise momentum', text: `Pressure gradients provide the c_s squared term and gravity provides the potential gradient.`, math: String.raw`\frac{\partial\mathbf{v}}{\partial t}=-\frac{c_{s}^{2}}{\rho_{0}}\nabla\delta\rho-\nabla\Phi` },
      { title: 'Use Poisson’s equation', text: `The perturbed potential is sourced only by the perturbed density.`, math: String.raw`\nabla^{2}\Phi=4\pi G\,\delta\rho=4\pi G\rho_{0}\delta` },
      { title: 'Combine into a wave equation', text: `Taking a time derivative of continuity and the divergence of momentum eliminates velocity.`, math: String.raw`\frac{\partial^{2}\delta}{\partial t^{2}}=c_{s}^{2}\nabla^{2}\delta+4\pi G\rho_{0}\delta` },
      { title: 'Read the dispersion relation', text: `Substituting a plane wave gives the condition for growth: k below k_J gives imaginary omega and exponential instability.`, math: String.raw`\omega^{2}=c_{s}^{2}k^{2}-4\pi G\rho_{0}` }
    ],
    result: String.raw`\omega^{2}=c_{s}^{2}k^{2}-4\pi G\rho_{0},\qquad \lambda_{\rm J}=c_{s}\sqrt{\frac{\pi}{G\rho_{0}}}`,
    interpretation: `Gravity wins on scales larger than the Jeans length; pressure wins on smaller scales, which oscillate as sound waves. The growth rate on large scales is of order the free-fall time, one over sqrt(4 pi G rho).`,
    dimensions: String.raw`[G\rho_{0}]=T^{-2},\quad [c_{s}^{2}k^{2}]=T^{-2},\quad [\lambda_{\rm J}]=L`,
    limits: [
      'As c_s approaches zero all wavelengths become unstable.',
      'Large c_s or low density stabilises the medium on all but the largest scales.',
      'In an expanding universe the criterion is modified and the perturbation must grow faster than the Hubble rate.'
    ],
    examples: [
      `A molecular cloud at 20 K with molecular hydrogen density 10 to the fourth per cubic centimetre has c_s about 0.27 km/s and a Jeans length near 0.3 parsec.`,
      `For that cloud the Jeans mass is roughly 8 solar masses, comparable to the masses of stellar clusters.`,
      `The intergalactic medium has a much larger Jeans length, of order a megaparsec after reionisation.`
    ],
    applications: [
      'Estimating the mass scale of star-forming clouds.',
      'Setting the initial mass scale for structure formation.',
      'Understanding why galaxies form in filaments and sheets.',
      'Providing the linear seed for nonlinear collapse simulations.'
    ],
    limitations: [
      'The Jeans swindle is not a rigorous treatment of a finite or cosmological medium.',
      'Rotation, magnetic support and turbulence change the effective stability criterion.',
      'Thermal evolution and cooling alter c_s during collapse.',
      'Nonlinear collapse cannot be followed by linear theory.'
    ]
  },
  {
    id: 'u-planck-law',
    title: 'Planck’s Law and the Blackbody Spectrum',
    topicId: 'cmb',
    statement: String.raw`B_{\nu}(T)=\frac{2h\nu^{3}}{c^{2}}\frac{1}{e^{h\nu/(k_{\rm B}T)}-1}`,
    physicalProblem: `Find the spectral radiance of electromagnetic radiation in a cavity at thermal equilibrium, resolving the ultraviolet catastrophe of the Rayleigh–Jeans law.`,
    assumptions: [
      'A large cavity in thermal equilibrium at temperature T.',
      'Photons are a Bose gas with zero chemical potential because photon number is not conserved.',
      'Electromagnetic modes are counted in the frequency interval nu to nu plus dnu.',
      'Each mode is a harmonic oscillator with energy levels n h nu.',
      'The cavity walls are ideal absorbers and emitters.',
      'No spectral distortions from energy injection after thermalisation.'
    ],
    variables: [
      { symbol: 'B_nu', meaning: 'Spectral radiance per unit frequency' },
      { symbol: 'nu', meaning: 'Frequency' },
      { symbol: 'T', meaning: 'Absolute temperature' },
      { symbol: 'h, k_B, c', meaning: 'Planck and Boltzmann constants and the speed of light' },
      { symbol: 'u_nu', meaning: 'Energy density per unit frequency, equal 4 pi B_nu over c' },
      { symbol: 'a', meaning: 'Radiation constant, 4 sigma over c' }
    ],
    tools: ['Density of photon states', 'Bose–Einstein occupation number', 'Geometric-series sum for mean oscillator energy', 'Stefan–Boltzmann integration'],
    steps: [
      { title: 'Count the modes', text: `The number of electromagnetic modes per unit volume per frequency is 8 pi nu squared over c cubed, including two polarisations.`, math: String.raw`g(\nu)d\nu=\frac{8\pi\nu^{2}}{c^{3}}d\nu` },
      { title: 'Find the mean energy per mode', text: `Sum over oscillator levels with Boltzmann weights; the result is h nu divided by exp(h nu over k_B T) minus one.`, math: String.raw`\langle E\rangle=\frac{h\nu}{e^{h\nu/(k_{\rm B}T)}-1}` },
      { title: 'Multiply and convert to radiance', text: `Radiance is c over 4 pi times the energy density per frequency, giving Planck's formula.`, math: String.raw`B_{\nu}=\frac{c}{4\pi}g(\nu)\langle E\rangle=\frac{2h\nu^{3}}{c^{2}}\frac{1}{e^{h\nu/(k_{\rm B}T)}-1}` },
      { title: 'Check the limits', text: `At low frequency the formula reduces to Rayleigh–Jeans; at high frequency it gives the Wien exponential cutoff.`, math: String.raw`B_{\nu}\approx\frac{2\nu^{2}k_{\rm B}T}{c^{2}}\;(\nu\ll k_{\rm B}T/h),\quad B_{\nu}\approx\frac{2h\nu^{3}}{c^{2}}e^{-h\nu/(k_{\rm B}T)}` },
      { title: 'Integrate and locate the peak', text: `Integrating over frequency gives the Stefan–Boltzmann law; the maximum of B_nu occurs at h nu over k_B T about 2.821.`, math: String.raw`u=aT^{4},\qquad \nu_{\rm max}\approx 2.821\,\frac{k_{\rm B}T}{h}` }
    ],
    result: String.raw`B_{\nu}(T)=\frac{2h\nu^{3}}{c^{2}}\left(e^{h\nu/(k_{\rm B}T)}-1\right)^{-1},\quad u=aT^{4},\quad a=\frac{4\sigma}{c}`,
    interpretation: `The exponential suppression of high-frequency modes prevents the divergent energy of classical physics. The spectrum depends on a single parameter, temperature, which is why the CMB is such a precise thermometer.`,
    dimensions: String.raw`[B_{\nu}]={\rm W\,m^{-2}\,sr^{-1}\,Hz^{-1}}=J\,m^{-2}\,sr^{-1}`,
    limits: [
      'The Rayleigh–Jeans limit recovers classical equipartition at low frequency.',
      'The Wien limit gives an exponentially small tail at high frequency.',
      'For a perfect blackbody the total radiance integrates to sigma T to the fourth over pi.'
    ],
    examples: [
      `The CMB at 2.725 K peaks near 160 GHz for B_nu.`,
      `The Sun's photosphere near 5770 K peaks near 3.4 times 10^14 Hz, in the visible.`,
      `COBE/FIRAS confirmed the CMB blackbody shape to a few parts in 10^5.`
    ],
    applications: [
      'Determining the CMB temperature and searching for spectral distortions.',
      'Interpreting stellar photospheric spectra.',
      'Calibrating radiation detectors and thermal sources.',
      'Deriving the radiation energy density in cosmology.'
    ],
    limitations: [
      'Real emitters have emissivity less than one and spectral lines.',
      'Non-equilibrium processes can produce mu and y type distortions.',
      'The B_lambda peak lies at a different numerical frequency than the B_nu peak.'
    ]
  }
]

export const UNIVERSE_PROBLEMS: Problem[] = [
  {
    id: 'u-jeans-mass',
    title: 'Jeans Length and Mass of a Molecular Cloud',
    topicId: 'large-scale-structure',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['Jeans instability', 'isothermal sound speed', 'self-gravity', 'star formation'],
    statement: `A molecular cloud has temperature 20 K and molecular-hydrogen number density 10^4 cm^-3. Take the mean molecular weight to be 2.3 in units of the hydrogen atom mass. Estimate the isothermal sound speed, the Jeans length and the Jeans mass, defined as the mass inside a sphere of diameter equal to the Jeans length. Give the length in parsecs and the mass in solar masses.`,
    hints: [
      `For an isothermal gas the sound speed is sqrt(k_B T divided by mu m_H).`,
      `The mass density is mu m_H times the number density; convert cm^-3 to m^-3 before using SI units.`,
      `The Jeans mass is (pi/6) rho lambda_J cubed when the sphere diameter is lambda_J.`
    ],
    solution: [
      { title: 'Sound speed', text: `Use the isothermal relation with mu equal 2.3 and T equal 20 K.`, math: String.raw`c_{s}=\sqrt{\frac{k_{\rm B}T}{\mu m_{\rm H}}}=\sqrt{\frac{2.76\times10^{-22}}{3.85\times10^{-27}}}\approx 268\,{\rm m\,s^{-1}}` },
      { title: 'Mass density', text: `Convert the density to SI units: 10^4 cm^-3 equals 10^10 m^-3.`, math: String.raw`\rho=\mu m_{\rm H}n=2.3(1.67\times10^{-27})(10^{10})\approx 3.85\times10^{-17}\,{\rm kg\,m^{-3}}` },
      { title: 'Jeans length', text: `Insert density and sound speed into the Jeans criterion.`, math: String.raw`\lambda_{\rm J}=c_{s}\sqrt{\frac{\pi}{G\rho}}\approx 268\sqrt{\frac{3.14}{6.67\times10^{-11}\times3.85\times10^{-17}}}\approx 9.4\times10^{15}\,{\rm m}\approx 0.30\,{\rm pc}` },
      { title: 'Jeans mass', text: `The sphere radius is lambda_J over two, so M equals (pi/6) rho lambda_J cubed.`, math: String.raw`M_{\rm J}=\frac{\pi}{6}\rho\lambda_{\rm J}^{3}\approx 0.524(3.85\times10^{-17})(9.4\times10^{15})^{3}\approx 1.7\times10^{31}\,{\rm kg}\approx 8\,M_\odot` }
    ],
    answer: `c_s is about 0.27 km/s, lambda_J is about 9.4 times 10^15 m, roughly 0.30 pc, and M_J is about 1.7 times 10^31 kg, roughly 8 solar masses.`,
    alternatives: [`If the Jeans radius is used instead of the diameter, the quoted mass changes by a factor of eight; always state which convention is used.`],
    mistakes: [
      `Forgetting to convert cm^-3 to m^-3, which changes the density by a factor of 10^6.`,
      `Using atomic rather than molecular mean molecular weight for a molecular cloud.`,
      `Confusing the Jeans length with the Jeans radius and therefore miscomputing the mass.`
    ],
    further: `How do rotation, magnetic fields and turbulence modify the effective Jeans criterion? Repeat the estimate for a warm ionised medium at 10^4 K and density 10^4 m^-3.`
  },
  {
    id: 'u-eddington-limit',
    title: 'Eddington Luminosity and Accretion Rate',
    topicId: 'accretion-disks',
    level: 'Undergraduate 3',
    type: 'Derivation',
    concepts: ['radiation pressure', 'Thomson scattering', 'accretion efficiency', 'mass accretion rate'],
    statement: `Derive the Eddington luminosity at which radiation pressure on free electrons balances gravity on electron–proton pairs. Evaluate it for one and ten solar masses, then find the accretion rate needed to radiate at that luminosity with efficiency 0.1.`,
    hints: [
      `Set the outward radiation force on an electron equal to the inward gravitational force on an electron–proton pair.`,
      `The Thomson cross section sigma_T is 6.65 times 10^-29 m squared.`,
      `Use L equals eta dot M c squared for the accretion rate.`
    ],
    solution: [
      { title: 'Balance the forces', text: `A flux F gives an electron a radiative force F sigma_T over c, while the pair feels gravity from the proton mass.`, math: String.raw`\frac{L_{\rm Edd}\sigma_{\rm T}}{4\pi r^{2}c}=\frac{GMm_{p}}{r^{2}}` },
      { title: 'Cancel the radial dependence', text: `The result is independent of radius, a hallmark of the inverse-square balance.`, math: String.raw`L_{\rm Edd}=\frac{4\pi GM m_{p}c}{\sigma_{\rm T}}` },
      { title: 'Evaluate numerically', text: `Insert constants for M equal one solar mass.`, math: String.raw`L_{\rm Edd,\odot}\approx 1.26\times10^{31}\,{\rm W}\approx1.3\times10^{38}\,{\rm erg\,s^{-1}}` },
      { title: 'Scale with mass', text: `The luminosity is linear in mass, so a ten solar mass object has L_Edd about 1.26 times 10^32 W.`, math: String.raw`L_{\rm Edd}(10M_\odot)\approx1.26\times10^{32}\,{\rm W}` },
      { title: 'Find the accretion rate', text: `With efficiency eta equal 0.1, dot M equals L divided by eta c squared.`, math: String.raw`\dot M=\frac{1.26\times10^{31}}{0.1(9.0\times10^{16})}\approx1.4\times10^{15}\,{\rm kg\,s^{-1}}\approx2.2\times10^{-8}\,M_\odot\,{\rm yr^{-1}}` }
    ],
    answer: `L_Edd = 4 pi G M m_p c / sigma_T, about 1.26 times 10^31 W for one solar mass and 1.26 times 10^32 W for ten solar masses; the corresponding accretion rate at ten percent efficiency is about 1.4 times 10^15 kg/s or 2.2 times 10^-8 solar masses per year.`,
    mistakes: [
      `Using the electron mass rather than the proton mass in the gravitational force.`,
      `Dropping the factor 4 pi from the flux over a sphere.`,
      `Mixing watts and ergs per second when comparing with textbook values.`
    ],
    further: `How does the limit change for a helium or fully ionised metal plasma? Why can super-Eddington accretion still occur in geometrically thick, optically thick flows?`
  },
  {
    id: 'u-hubble-tension-check',
    title: 'Assessing the Hubble Constant Tension',
    topicId: 'dark-energy',
    level: 'Undergraduate 2',
    type: 'Graph interpretation',
    concepts: ['Hubble constant', 'error propagation', 'cosmological inference', 'model dependence'],
    statement: `The Planck satellite, assuming flat Lambda-CDM, reports H_0 = 67.4 ± 0.5 km/s/Mpc. A Cepheid-calibrated supernova analysis reports H_0 = 73.0 ± 1.0 km/s/Mpc. Compute the discrepancy in standard deviations and the Hubble time implied by each value. State what the comparison does and does not establish.`,
    hints: [
      `For independent Gaussian measurements, combine uncertainties in quadrature.`,
      `The Hubble time is 1/H_0; convert km/s/Mpc to inverse seconds first.`,
      `Distinguish a statistical inconsistency from evidence for new physics.`
    ],
    solution: [
      { title: 'Compute the difference', text: `Subtract the two central values.`, math: String.raw`\Delta H_{0}=73.0-67.4=5.6\,{\rm km\,s^{-1}\,Mpc^{-1}}` },
      { title: 'Combine the uncertainties', text: `Assuming independence, add variances.`, math: String.raw`\sigma_{\Delta}=\sqrt{0.5^{2}+1.0^{2}}\approx1.12\,{\rm km\,s^{-1}\,Mpc^{-1}}` },
      { title: 'Evaluate significance', text: `Divide the difference by the combined uncertainty.`, math: String.raw`Z=\frac{5.6}{1.12}\approx5.0` },
      { title: 'Convert units', text: `One megaparsec is 3.086 times 10^19 km.`, math: String.raw`H_{0}=67.4\,\frac{{\rm km\,s^{-1}}}{{\rm Mpc}}\Rightarrow H_{0}=2.18\times10^{-18}\,{\rm s^{-1}}` },
      { title: 'Hubble times', text: `Take the reciprocal and convert to billions of years.`, math: String.raw`t_{H}(67.4)\approx14.5\,{\rm Gyr},\qquad t_{H}(73.0)\approx13.4\,{\rm Gyr}` }
    ],
    answer: `The two determinations differ by about 5.0 standard deviations. Their Hubble times are about 14.5 Gyr and 13.4 Gyr respectively. This is a significant discrepancy under the stated assumptions, but it is not by itself a proof of new physics: the early-universe value is inferred within Lambda-CDM, and both analyses have systematic uncertainties.`,
    alternatives: [`A Bayesian model-comparison statistic would quantify how much the tension improves if the model is extended, rather than just quoting sigma.`],
    mistakes: [
      `Adding uncertainties linearly instead of in quadrature.`,
      `Forgetting to convert megaparsecs to kilometres when computing the Hubble time.`,
      `Treating the inferred Hubble time as the exact age of the universe; the age depends on the full expansion history.`
    ],
    further: `Investigate which single extension to Lambda-CDM could reconcile the two values, and what independent probe could discriminate it from a calibration error.`
  },
  {
    id: 'u-ns-compactness',
    title: 'Compactness and Redshift of a Neutron Star',
    topicId: 'neutron-stars',
    level: 'Graduate',
    type: 'Numerical',
    concepts: ['Schwarzschild metric', 'gravitational redshift', 'compactness', 'mean density'],
    statement: `A neutron star has mass 1.4 solar masses and radius 12 km. Compute its Schwarzschild radius, compactness GM/(Rc^2), gravitational redshift of light emitted at the surface, mean density and Newtonian surface gravity. State which results require general relativity.`,
    hints: [
      `The Schwarzschild radius is 2GM/c squared, about 3 km per solar mass.`,
      `Surface redshift in the Schwarzschild metric is (1 minus 2GM over Rc squared) to the minus one half, minus one.`,
      `Mean density is three M over four pi R cubed.`
    ],
    solution: [
      { title: 'Schwarzschild radius', text: `Insert the mass in SI units.`, math: String.raw`r_{s}=\frac{2GM}{c^{2}}\approx\frac{2(6.67\times10^{-11})(2.78\times10^{30})}{9.0\times10^{16}}\approx4.1\,{\rm km}` },
      { title: 'Compactness', text: `Compactness is half the Schwarzschild radius divided by the stellar radius.`, math: String.raw`C=\frac{GM}{Rc^{2}}=\frac{r_{s}}{2R}\approx\frac{4.13}{24}\approx0.17` },
      { title: 'Gravitational redshift', text: `Use the Schwarzschild result for a static emitter.`, math: String.raw`z=\left(1-\frac{2GM}{Rc^{2}}\right)^{-1/2}-1\approx(1-0.345)^{-1/2}-1\approx0.24` },
      { title: 'Mean density', text: `Divide mass by volume.`, math: String.raw`\bar\rho=\frac{3M}{4\pi R^{3}}\approx3.8\times10^{17}\,{\rm kg\,m^{-3}},` },
      { title: 'Surface gravity', text: `The Newtonian estimate gives the correct order of magnitude.`, math: String.raw`g_{\rm N}=\frac{GM}{R^{2}}\approx1.3\times10^{12}\,{\rm m\,s^{-2}}` }
    ],
    answer: `Schwarzschild radius about 4.1 km, compactness about 0.17, surface redshift about 0.24, mean density about 3.8 times 10^17 kg/m^3, Newtonian surface gravity about 1.3 times 10^12 m/s^2. The redshift is intrinsically relativistic; the other quantities are order-of-magnitude estimates that receive general-relativistic corrections of tens of percent.`,
    mistakes: [
      `Using the Newtonian escape velocity formula to compute an exact redshift.`,
      `Confusing r_s with the stellar radius in the redshift formula.`,
      `Forgetting that 1.4 solar masses means 2.78 times 10^30 kg.`
    ],
    further: `How would the redshift and tidal deformability change for a more compact 2 solar mass star? Compare with NICER and GW170817 constraints.`
  },
  {
    id: 'u-cmb-blackbody-scaling',
    title: 'Scaling the Cosmic Microwave Background Back in Time',
    topicId: 'cmb',
    level: 'Undergraduate 1',
    type: 'Theoretical',
    concepts: ['blackbody radiation', 'cosmological redshift', 'photon number density', 'baryon-to-photon ratio'],
    statement: `The CMB temperature today is 2.725 K and the present photon number density is about 410 per cubic centimetre. At recombination the redshift was about 1090. Find the temperature, photon number density and radiation energy density at recombination relative to today, and estimate the baryon-to-photon ratio if the baryon density parameter satisfies Omega_b h squared = 0.0224 with h = 0.674.`,
    hints: [
      `Temperature scales as one plus redshift; number density scales as that cubed and energy density as that to the fourth.`,
      `Critical density today is about 8.5 times 10^-27 kg/m^3.`,
      `Compare baryon number density in inverse cubic metres with photon number density in the same units.`
    ],
    solution: [
      { title: 'Temperature', text: `Redshift stretches wavelengths, so temperature scales inversely with scale factor.`, math: String.raw`T(z)=T_{0}(1+z)\approx2.725\times1091\approx3.0\times10^{3}\,{\rm K}` },
      { title: 'Photon number density', text: `Number density dilutes with volume.`, math: String.raw`n_{\gamma}(z)=410(1+z)^{3}\approx5.3\times10^{11}\,{\rm cm^{-3}}` },
      { title: 'Radiation energy density', text: `Each photon is also redshifted in energy.`, math: String.raw`u_{\gamma}(z)=u_{\gamma,0}(1+z)^{4},\quad u_{\gamma,0}\approx4.2\times10^{-14}\,{\rm J\,m^{-3}}` },
      { title: 'Baryon density today', text: `Omega_b equals Omega_b h squared divided by h squared.`, math: String.raw`\Omega_{b}\approx0.049,\quad \rho_{b}\approx0.049(8.5\times10^{-27})\approx4.2\times10^{-28}\,{\rm kg\,m^{-3}}` },
      { title: 'Baryon-to-photon ratio', text: `Convert both densities to the same units.`, math: String.raw`n_{b}\approx0.25\,{\rm m^{-3}},\quad n_{\gamma}\approx4.1\times10^{8}\,{\rm m^{-3}},\quad \eta\approx6\times10^{-10}` }
    ],
    answer: `At recombination T was about 3000 K, photon number density about 5 times 10^11 per cubic centimetre, radiation energy density larger than today by a factor (1091)^4 of order 10^12, and eta about 6 times 10^-10.`,
    alternatives: [`The photometric peak of B_nu occurs at h nu about 2.82 k_B T, so at recombination the CMB peaked in the near infrared.`],
    mistakes: [
      `Using (1+z)^3 rather than (1+z)^4 for energy density.`,
      `Forgetting that 410 per cubic centimetre is 4.1 times 10^8 per cubic metre.`,
      `Using Omega_b h squared directly as Omega_b when h is not one.`
    ],
    further: `Why is eta, rather than Omega_b alone, the parameter that controls primordial nucleosynthesis?`
  },
  {
    id: 'u-alfven-resonance',
    title: 'Alfvén Speed and Standing Wave Frequency',
    topicId: 'mhd',
    level: 'Undergraduate 3',
    type: 'Numerical',
    concepts: ['Alfvén waves', 'magnetic tension', 'mass density', 'standing waves'],
    statement: `A uniform hydrogen plasma has number density 10^19 m^-3 and is threaded by a magnetic field of 0.01 T. Compute the Alfvén speed. If a magnetic field line of length 10 Mm supports a fundamental standing Alfvén wave with nodes at both ends, estimate its frequency and period.`,
    hints: [
      `For hydrogen the mass density is approximately the proton mass times the number density.`,
      `The Alfvén speed is B divided by sqrt(mu_0 rho).`,
      `A standing wave with nodes at both ends has wavelength twice the length.`
    ],
    solution: [
      { title: 'Mass density', text: `Use the proton mass for a hydrogen plasma.`, math: String.raw`\rho\approx m_{p}n=(1.67\times10^{-27})(10^{19})\approx1.67\times10^{-8}\,{\rm kg\,m^{-3}}` },
      { title: 'Alfvén speed', text: `Insert B and rho into the Alfvén formula.`, math: String.raw`v_{\rm A}=\frac{B}{\sqrt{\mu_{0}\rho}}=\frac{0.01}{\sqrt{(4\pi\times10^{-7})(1.67\times10^{-8})}}\approx6.9\times10^{4}\,{\rm m\,s^{-1}}` },
      { title: 'Standing wavelength', text: `The fundamental mode has lambda equal to twice the field-line length.`, math: String.raw`\lambda=2L=2\times10^{7}\,{\rm m}` },
      { title: 'Frequency and period', text: `Use f equals v_A over lambda.`, math: String.raw`f=\frac{v_{\rm A}}{\lambda}\approx3.5\times10^{-3}\,{\rm Hz},\qquad P\approx2.9\times10^{2}\,{\rm s}` }
    ],
    answer: `v_A is about 6.9 times 10^4 m/s, or 69 km/s; the fundamental frequency is about 3.5 mHz and the period about 290 s.`,
    mistakes: [
      `Using electron mass instead of ion mass in the plasma density.`,
      `Taking lambda equal to L rather than 2L for the fundamental mode.`,
      `Confusing angular frequency omega with ordinary frequency f.`
    ],
    further: `How would the frequency change if the plasma contained a significant fraction of helium? What effect does a variation of density along the field line have on the standing-wave spectrum?`
  },
  {
    id: 'u-epidemic-threshold',
    title: 'Epidemic Thresholds on Random and Scale-Free Networks',
    topicId: 'network-physics',
    level: 'Research',
    type: 'Research challenge',
    concepts: ['network topology', 'SIR model', 'degree moments', 'phase transition'],
    statement: `For a susceptible–infected–removed epidemic on an uncorrelated network, the mean-field threshold is beta over gamma equal to <k> divided by (<k squared> minus <k>). Evaluate the threshold for an Erdos–Renyi graph with mean degree 10, and discuss what happens for a scale-free degree distribution with exponent gamma = 2.5 and for gamma = 3 with a finite size cutoff. Propose which features of real contact networks could invalidate the calculation.`,
    hints: [
      `For a Poisson degree distribution, <k squared> equals <k> squared plus <k>.`,
      `For a power law with exponent at most three, the second moment diverges with system size.`,
      `Think about degree correlations, community structure and temporal contacts.`
    ],
    solution: [
      { title: 'Poisson moments', text: `The Erdos–Renyi degree distribution has variance equal to its mean.`, math: String.raw`\langle k^{2}\rangle=\langle k\rangle^{2}+\langle k\rangle=100+10=110` },
      { title: 'Erdos–Renyi threshold', text: `Insert the moments into the mean-field formula.`, math: String.raw`\left(\frac{\beta}{\gamma}\right)_{c}=\frac{10}{110-10}=0.10` },
      { title: 'Scale-free case', text: `When gamma is below three the second moment grows with the cutoff, so the threshold tends to zero as the network grows.`, math: String.raw`\langle k^{2}\rangle\sim k_{\min}^{2}\left(\frac{k_{\max}}{k_{\min}}\right)^{3-\gamma}\to\infty\ \Rightarrow\ \left(\frac{\beta}{\gamma}\right)_{c}\to0` },
      { title: 'Borderline case', text: `For gamma equal three the second moment grows only logarithmically with the cutoff, so the threshold falls slowly with system size.`, math: String.raw`\left(\frac{\beta}{\gamma}\right)_{c}\sim \frac{1}{k_{\min}\ln(k_{\max}/k_{\min})}` },
      { title: 'Limitations of the model', text: `Mean-field theory assumes random mixing and ignores degree correlations, clustering, communities, weighted contacts and time-varying behaviour; these can raise or lower the effective threshold.`, math: String.raw`\mathrm{Assumptions:\ static,\ undirected,\ uncorrelated,\ infinite\ network}` }
    ],
    answer: `An Erdos–Renyi network with mean degree 10 has threshold beta/gamma about 0.10. For gamma equal 2.5 the threshold vanishes in the infinite-size limit; for gamma equal 3 it decreases only logarithmically. Real networks have correlations, communities and temporal contacts that can strongly modify these conclusions.`,
    alternatives: [`A percolation-based derivation gives the same threshold but interprets it as the point where a giant infected cluster first appears.`],
    mistakes: [
      `Using <k> squared in place of <k squared>.`,
      `Assuming all scale-free networks are always epidemic-free for any infection rate at finite size.`,
      `Ignoring that an epidemic threshold computed for an infinite network is not directly measurable in a finite population.`
    ],
    further: `Derive the threshold for a network with degree–degree correlations, or simulate an SIR process on a real contact network and compare with the mean-field prediction.`
  },
  {
    id: 'u-planck-scale-dispersion',
    title: 'Testing Planck-Scale Dispersion with Gamma-Ray Bursts',
    topicId: 'quantum-gravity-phenomenology',
    level: 'Research',
    type: 'Research challenge',
    concepts: ['Planck energy', 'modified dispersion', 'time-of-flight tests', 'Lorentz invariance'],
    statement: `Consider a speculative energy-dependent photon speed v approximately c times (1 minus E over 2 E_QG), with E_QG taken equal to the Planck energy. Estimate the arrival-time difference between a 1 TeV and a much lower-energy photon from a source at redshift about one, corresponding to a distance of roughly 1 Gpc. Assess whether current gamma-ray timing can constrain such a model, and list reasons why a null result would not rule out quantum gravity.`,
    hints: [
      `The Planck energy is about 1.2 times 10^19 GeV.`,
      `The propagation time over 1 Gpc is about 10^17 seconds.`,
      `The time delay is approximately (E over 2 E_QG) times the light travel time.`
    ],
    solution: [
      { title: 'Energy ratio', text: `Express the photon energy in the same units as the Planck energy.`, math: String.raw`\frac{E}{E_{\rm P}}=\frac{10^{3}\,{\rm GeV}}{1.2\times10^{19}\,{\rm GeV}}\approx8.3\times10^{-17}` },
      { title: 'Travel time', text: `One gigaparsec is about 3.1 times 10^25 metres.`, math: String.raw`\frac{L}{c}\approx\frac{3.1\times10^{25}}{3.0\times10^{8}}\approx1.0\times10^{17}\,{\rm s}` },
      { title: 'Accumulated delay', text: `Multiply the fractional speed difference by the travel time.`, math: String.raw`\Delta t\approx\frac{E}{2E_{\rm P}}\frac{L}{c}\approx0.5(8.3\times10^{-17})(1.0\times10^{17})\approx4\,{\rm s}` },
      { title: 'Compare with data', text: `Gamma-ray detectors can resolve millisecond-to-second structure in bursts, so a multi-second energy-dependent lag would be conspicuous; searches with Fermi-LAT and ground-based TeV telescopes find no such effect and push E_QG to or beyond the Planck scale for this parameterisation.` },
      { title: 'Interpretation', text: `A null result constrains only the assumed dispersion relation. Many quantum-gravity approaches preserve Lorentz invariance and predict no energy-dependent speed at leading order.`, math: String.raw`\mathrm{No\ signal}\ \neq\ \mathrm{no\ quantum\ gravity}` }
    ],
    answer: `The estimated delay is roughly 4 seconds, large enough that gamma-ray burst timing strongly constrains linear Planck-scale dispersion; current limits are at or beyond E_P for this model, while many other quantum-gravity scenarios remain untouched.`,
    alternatives: [`A quadratic suppression E squared over E_QG squared would give a delay suppressed by an additional factor of E/E_P and would be far harder to test.`],
    mistakes: [
      `Dropping the factor of one half in the speed expansion.`,
      `Using the source redshift as a distance in light-years without conversion.`,
      `Claiming that the absence of an observed delay disproves all quantum-gravity theories.`
    ],
    further: `How would intrinsic source lags complicate the inference? Design a statistical test using many bursts at different redshifts to separate intrinsic emission delays from propagation effects.`
  }
]

export const UNIVERSE_EXPERIMENTS: Experiment[] = [
  {
    id: 'u-hubble-diagnostic',
    title: 'Measuring the Hubble Law from Supernova Distances',
    topicId: 'hubble-law',
    era: 'Modern observational astronomy, from the 1990s to the present',
    objective: `Determine the Hubble constant from a supplied set of Type Ia supernova redshifts and distance moduli, and compare the result with the value inferred from the cosmic microwave background.`,
    background: `Type Ia supernovae are standardisable candles: after empirical corrections for light-curve shape and colour their peak luminosities are known well enough to measure luminosity distances. Combining those distances with redshifts recovers the Hubble–Lemaître law at low redshift and the full distance–redshift relation at higher redshift. The current disagreement between local and early-universe determinations of H_0 makes this a timely measurement.`,
    apparatus: [
      'A table of published supernova redshifts, distance moduli and measurement uncertainties supplied with the lab',
      'A spectrum plotter for reading host-galaxy redshifts',
      'A light-curve fitter returning corrected peak magnitude',
      'A plotting tool for the Hubble diagram and residual panel',
      'A nonlinear least-squares fitter for cosmological parameters',
      'A reference module for the flat Lambda-CDM luminosity distance'
    ],
    theory: [
      { kind: 'paragraph', text: `The distance modulus combines apparent and absolute magnitude into a logarithmic distance measure. Once the modulus is known, the luminosity distance follows directly.` },
      { kind: 'math', latex: String.raw`\mu=m-M=5\log_{10}\left(\frac{d_{L}}{\rm Mpc}\right)+25`, display: true },
      { kind: 'paragraph', text: `At small redshift the recession speed is approximately c z and the distance is approximately c z over H_0. At larger redshift the luminosity distance depends on the whole expansion history, including the matter and dark-energy densities.` },
      { kind: 'math', latex: String.raw`d_{L}(z)=\frac{c(1+z)}{H_{0}}\int_{0}^{z}\frac{dz'}{\sqrt{\Omega_{m}(1+z')^{3}+\Omega_{\Lambda}}}`, display: true, caption: `Expression shown for a flat universe with negligible radiation.` },
      { kind: 'callout', tone: 'insight', title: 'Physical intuition', text: `A straight line in the nearby Hubble diagram is enough to estimate H_0, but curvature in the diagram at higher redshift is what reveals dark energy. Always fit the model appropriate to the redshift range used.` },
      { kind: 'callout', tone: 'warning', title: 'Assumptions', text: `The method assumes the supernovae have been correctly standardised, that peculiar velocities are small compared with the Hubble flow at the redshifts used, and that the provided calibration is on the same magnitude system as the data.` }
    ],
    procedure: [
      `Load the supplied redshift and distance-modulus table and inspect the redshift distribution.`,
      `Convert each distance modulus to a luminosity distance in megaparsecs.`,
      `Select objects with redshift below about 0.1 and plot apparent recession speed c z against d_L; fit a straight line through the origin to estimate H_0.`,
      `Fit the full flat Lambda-CDM distance relation to all redshifts, leaving H_0 and Omega_m free while fixing Omega_Lambda equal to 1 minus Omega_m.`,
      `Plot residuals in distance modulus and check whether they correlate with redshift or with light-curve quality.`,
      `Repeat the low-redshift fit after artificially changing the assumed absolute magnitude by 0.1 mag and record the shift in H_0.`,
      `Compare your value with a CMB-inferred value and quantify the discrepancy in units of the combined uncertainty.`
    ],
    parameters: [
      { key: 'h0', label: 'Trial Hubble constant', min: 50, max: 90, step: 0.1, value: 70, unit: 'km/s/Mpc' },
      { key: 'omegaM', label: 'Matter density parameter', min: 0.1, max: 0.9, step: 0.01, value: 0.3, unit: '' },
      { key: 'zMax', label: 'Maximum redshift included', min: 0.05, max: 1.5, step: 0.05, value: 0.3, unit: '' },
      { key: 'magOffset', label: 'Magnitude calibration offset', min: -0.2, max: 0.2, step: 0.01, value: 0, unit: 'mag' },
      { key: 'intrinsicScatter', label: 'Assumed intrinsic scatter', min: 0, max: 0.3, step: 0.01, value: 0.1, unit: 'mag' }
    ],
    measurementLabels: [
      'Redshift z',
      'Distance modulus mu (mag)',
      'Luminosity distance d_L (Mpc)',
      'Fitted H_0 (km/s/Mpc)',
      'Fitted Omega_m',
      'Root-mean-square residual (mag)'
    ],
    analysis: [
      `Report the low-redshift slope and its statistical uncertainty, then convert to units of km/s/Mpc.`,
      `Check that doubling the redshift range changes the fitted H_0 by an amount consistent with the onset of cosmological curvature.`,
      `Compute chi squared per degree of freedom for both fits and decide which model the data prefer.`,
      `Show that a 0.1 mag systematic offset in absolute magnitude changes H_0 by roughly five percent.`,
      `Discuss whether your fitted value agrees better with the local distance ladder or with the CMB-under-Lambda-CDM value, and why this is not a decisive test of dark energy by itself.`
    ],
    questions: [
      `Why is a straight line fit appropriate only at low redshift?`,
      `How would peculiar velocities bias the fit if you included objects at redshift below 0.01?`,
      `What is the difference between a statistical error bar and the magnitude-calibration systematic in this experiment?`,
      `What additional data would most effectively distinguish the Hubble tension from an unknown systematic?`
    ],
    simulationId: 'expanding-universe'
  },
  {
    id: 'u-alfven-standing-wave',
    title: 'Standing Alfvén Waves in a Magnetised Plasma Column',
    topicId: 'mhd',
    era: 'Laboratory plasma physics, from the 1950s to the present',
    objective: `Excite a standing Alfvén wave in a uniform magnetised plasma and test the predicted relation between wave speed, magnetic field and mass density by measuring the resonance frequency.`,
    background: `In ideal magnetohydrodynamics magnetic field lines behave like stretched elastic strings. Transverse perturbations travel along them at the Alfvén speed and reflect at boundaries, forming standing modes. Measuring the resonance frequency while varying field strength and density provides a direct test of the magnetic-tension model and of flux freezing.`,
    apparatus: [
      'A vacuum chamber with a uniform axial solenoid field and a Hall probe for field calibration',
      'A plasma source producing a quasineutral hydrogen or argon column',
      'A Langmuir probe for measuring electron density and electron temperature',
      'A pair of magnetic pickup coils and a drive antenna coupled to a function generator',
      'A digitising oscilloscope for amplitude and phase measurements',
      'A computer model of counter-propagating waves for comparison with the observed mode pattern'
    ],
    theory: [
      { kind: 'paragraph', text: `Ideal MHD links the electric field in the plasma frame to the magnetic field and flow. For incompressible transverse perturbations the restoring force is magnetic tension and the wave is nondispersive.` },
      { kind: 'math', latex: String.raw`\frac{\partial\mathbf{B}}{\partial t}=\nabla\times(\mathbf{v}\times\mathbf{B}),\qquad v_{\rm A}=\frac{B}{\sqrt{\mu_{0}\rho}}`, display: true },
      { kind: 'paragraph', text: `For a column of length L with reflecting ends the resonance condition selects wavelengths of two L over n. The fundamental frequency therefore measures the Alfvén speed directly.` },
      { kind: 'math', latex: String.raw`f_{n}=\frac{n\,v_{\rm A}}{2L}=\frac{n\,B}{2L\sqrt{\mu_{0}\rho}}`, display: true },
      { kind: 'callout', tone: 'insight', title: 'Physical intuition', text: `Doubling the magnetic field doubles the tension and should double the frequency; doubling the density lowers the frequency because the same tension must move more mass. These two scalings are independent tests.` },
      { kind: 'callout', tone: 'note', title: 'Assumptions', text: `The model assumes a uniform field and density, negligible damping, wavelengths longer than the ion gyroradius and frequencies below the ion cyclotron frequency. Departures reveal kinetic or inhomogeneity effects.` }
    ],
    procedure: [
      `Evacuate the chamber, set the solenoid current and calibrate B with the Hall probe.`,
      `Ignite the plasma and record the Langmuir probe characteristic to determine the electron density; infer the ion density via quasineutrality.`,
      `Drive the antenna with a swept sinusoidal frequency and record the amplitude from the pickup coils.`,
      `Identify the frequency at which the transmitted amplitude peaks and the phase changes most rapidly.`,
      `Repeat the sweep for at least four magnetic field values at fixed density.`,
      `Repeat for at least four densities at fixed field by changing the discharge power, and check that the ion species is unchanged.`,
      `Plot the measured resonance frequency against B over sqrt(rho) and fit a straight line through the origin; compare its slope with n over 2L.`,
      `Examine the width of the resonance and estimate the damping time from the decay of the oscillation after the drive is switched off.`
    ],
    parameters: [
      { key: 'B', label: 'Axial magnetic field', min: 0.005, max: 0.1, step: 0.001, value: 0.02, unit: 'T' },
      { key: 'density', label: 'Plasma number density', min: 1e17, max: 1e20, step: 1e17, value: 1e19, unit: 'm^-3' },
      { key: 'length', label: 'Plasma column length', min: 0.5, max: 5, step: 0.1, value: 1, unit: 'm' },
      { key: 'frequency', label: 'Drive frequency', min: 1e3, max: 1e6, step: 1e3, value: 5e4, unit: 'Hz' },
      { key: 'ionMass', label: 'Ion mass number', min: 1, max: 40, step: 1, value: 1, unit: 'amu' }
    ],
    measurementLabels: [
      'Magnetic field B (T)',
      'Electron density n_e (m^-3)',
      'Resonance frequency f_1 (Hz)',
      'Measured Alfvén speed (m/s)',
      'Predicted Alfvén speed (m/s)',
      'Resonance full width at half maximum (Hz)'
    ],
    analysis: [
      `Compute rho from the measured density and ion mass, then calculate the predicted Alfvén speed and fundamental frequency.`,
      `Compare measured and predicted frequencies; a systematic ratio suggests an incorrect density calibration or a nonuniform field.`,
      `Fit f_1 versus B at fixed density and verify that the slope scales as one over sqrt(rho).`,
      `Plot the spatial mode shape at resonance and check that it has a single half wavelength between reflecting ends.`,
      `Estimate the damping time and discuss whether resistive diffusion, viscosity or coupling to other wave branches limits the quality factor.`
    ],
    questions: [
      `Why must the wavelength be much larger than the ion gyroradius for ideal MHD to apply?`,
      `What happens to the resonance if the magnetic field is tilted relative to the column axis?`,
      `How would you distinguish an Alfvén resonance from a fast magnetosonic resonance using only pickup-coil measurements?`,
      `Which measured quantity contributes the largest uncertainty to the inferred Alfvén speed?`
    ],
    simulationId: 'wave-interference'
  }
]

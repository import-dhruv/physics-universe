import type { Topic } from '../lib/types'

// Expanded subject-specific content for the waves, optics, acoustics and
// special-relativity branches. All ids are canonical slugs from architecture.ts.

export const EXPANDED_TOPICS_5: Topic[] = [
  {
    id: 'wave-motion',
    title: 'Wave motion',
    branchId: 'waves',
    level: 'Undergraduate 1',
    summary: 'A travelling wave transports energy and phase through a medium without transporting the medium itself; amplitude, wavelength, frequency and wave speed connect the oscillatory and spatial descriptions.',
    prerequisites: ['shm', 'kinematics', 'differential-equations'],
    tags: ['travelling waves', 'phase velocity', 'wave energy', 'transverse and longitudinal'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`A wave is a disturbance that propagates: at every point of the medium some quantity departs from equilibrium, and the pattern of departure moves. In a sinusoidal wave on a string the transverse displacement is $y(x,t)=A\cos(kx-\omega t+\phi)$, where $A$ is amplitude, $k=2\pi/\lambda$ is wavenumber, $\omega=2\pi f$ is angular frequency, and $\phi$ is a phase offset. The same form describes sound pressure, surface elevation of water and the electric field of a light wave, which is why wave motion is a shared language across physics.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Watch a buoy on the sea: it rises and falls while the crest travels past it. The medium oscillates about a fixed equilibrium; what moves is the *phase* of the oscillation. In a transverse wave the displacement is perpendicular to the propagation direction, as on a plucked string. In a longitudinal wave it is parallel, as for sound in air, where layers of gas alternately compress and rarefy. The essential point is that neighbouring elements are coupled: each element pulls its neighbour slightly later in time, so a local oscillation becomes a propagating pattern.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The wave speed is set by the medium, not by how hard you shake it. On a string it is $\sqrt{T/\mu}$; in a gas it is $\sqrt{K/\rho}$, with $K$ the bulk modulus. Shaking faster changes the wavelength through $v=\lambda f$ but leaves $v$ unchanged in a nondispersive medium. The energy carried scales as amplitude squared because both the kinetic and potential contributions are quadratic in the disturbance.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'The sign inside the cosine tells you the direction',
        text: String.raw`In $\cos(kx-\omega t)$ a point of constant phase satisfies $kx-\omega t=\text{const}$, hence $x=(\omega/k)t+\text{const}$: the pattern moves toward positive $x$. Replacing the minus by a plus reverses the direction. This one sign encodes the entire kinematics of travel, and it is the same sign that appears in the retarded-time solutions of the wave equation later in electromagnetism.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Displacement field**: the oscillating quantity $\psi(x,t)$; it is transverse for a string and longitudinal (pressure or density) for sound.`,
          String.raw`**Amplitude $A$**: maximum departure from equilibrium; intensity is proportional to $A^2$.`,
          String.raw`**Wavelength $\lambda$ and wavenumber $k=2\pi/\lambda$**: the spatial period and its angular measure in radians per metre.`,
          String.raw`**Period $T$, frequency $f=1/T$ and angular frequency $\omega=2\pi f$**: the temporal period and its angular measure.`,
          String.raw`**Phase $\phi$**: the argument of the cosine; surfaces of constant phase identify crests and define the direction of travel.`,
          String.raw`**Phase velocity $v_p=\omega/k$**: speed of a crest; in a dispersive medium it differs from the packet or group velocity.`,
          String.raw`**Wave energy and intensity**: energy density is quadratic in $\partial\psi/\partial t$ and $\partial\psi/\partial x$; intensity is energy flux per unit area.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Notation for the first equation: $\psi(x,t)$ is the displacement field, $A$ its maximum amplitude, $\lambda$ the wavelength, $f$ the ordinary frequency in hertz, and $\phi$ a constant phase. The combinations $k=2\pi/\lambda$ and $\omega=2\pi f$ are the wavenumber and angular frequency; their ratio is the phase velocity $v_p$.`,
      },
      { kind: 'math', display: true, latex: String.raw`\psi(x,t)=A\cos(kx-\omega t+\phi),\qquad k=\frac{2\pi}{\lambda},\quad \omega=2\pi f,\quad v_p=\frac{\omega}{k}=\lambda f`, caption: 'The sinusoidal travelling wave and the definitions of its spatial and temporal periods.' },
      {
        kind: 'paragraph',
        text: String.raw`The displacement must obey a local equation of motion. Let $\psi$ be the small transverse displacement of a string with tension $T$ and mass per unit length $\mu$; the net transverse force on an element comes from the curvature $\partial^2\psi/\partial x^2$. This yields the classical wave equation, whose general solution is any sum of a right-moving and a left-moving function (d'Alembert's solution).`,
      },
      { kind: 'math', display: true, latex: String.raw`\frac{\partial^2\psi}{\partial t^2}=v^2\frac{\partial^2\psi}{\partial x^2},\qquad \psi(x,t)=F(x-vt)+G(x+vt),\qquad v=\sqrt{\frac{T}{\mu}}`, caption: 'The one-dimensional wave equation and its general travelling-wave solution.' },
      {
        kind: 'paragraph',
        text: String.raw`Energy is not carried by the material points but by the pattern. For the string, the kinetic energy density is $\tfrac12\mu(\partial_t\psi)^2$ and the elastic contribution is $\tfrac12 T(\partial_x\psi)^2$; for a harmonic wave these are equal on average. The time-averaged power transmitted past a point is proportional to the square of amplitude and to the wave speed.`,
      },
      { kind: 'math', display: true, latex: String.raw`\langle u\rangle=\frac{1}{2}\mu\omega^2A^2,\qquad \langle P\rangle=\frac{1}{2}\mu\omega^2A^2v\propto A^2`, caption: 'Mean energy density and transmitted power for a sinusoidal wave on a string.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'A wave on a stretched string',
        items: [
          { title: 'Find the speed from the medium', text: 'A string has tension 50 N and linear mass density 0.005 kg/m. The speed follows from tension and density alone.', math: String.raw`v=\sqrt{T/\mu}=\sqrt{50/0.005}=\sqrt{10000}=100\ \mathrm{m\,s^{-1}}` },
          { title: 'Find the wavelength', text: 'A 20 Hz oscillation is driven at one end. In this nondispersive string the wavelength follows from v = lambda f.', math: String.raw`\lambda=\frac{v}{f}=\frac{100}{20}=5.0\ \mathrm{m}` },
          { title: 'Convert to angular variables', text: 'Wavenumber and angular frequency are the spatial and temporal rates in radians.', math: String.raw`k=\frac{2\pi}{5.0}=1.257\ \mathrm{rad\,m^{-1}},\qquad \omega=2\pi(20)=125.7\ \mathrm{rad\,s^{-1}}` },
          { title: 'Write the displacement', text: 'Choosing zero phase at x = 0 and t = 0 with amplitude 2 mm, the right-moving wave is fixed.', math: String.raw`y(x,t)=0.002\cos(1.257x-125.7t)\ \mathrm{m},\qquad v_p=\omega/k=100\ \mathrm{m\,s^{-1}}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Linearity is doing most of the work',
        text: 'The superposition and the simple relation v = sqrt(T/mu) assume small slopes and a perfectly flexible, uniform medium. Large amplitudes introduce tension changes, harmonic generation and eventually shocks; inhomogeneity introduces reflection and scattering that a single travelling wave cannot describe.',
      },
      {
        kind: 'list',
        items: [
          'Small-amplitude (linear) response; otherwise the wave equation acquires nonlinear terms.',
          'Uniform medium; density or tension gradients cause refraction, reflection and mode conversion.',
          'Nondispersive assumption when using v = lambda f with a frequency-independent v; in glass or deep water v depends on frequency.',
          'No attenuation; real waves lose amplitude to viscosity, resistance or absorption.',
          'One-dimensional treatment; in two or three dimensions amplitude spreads geometrically (as 1/r for cylindrical and 1/r^2 for spherical waves).',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Thomas Young's 1801 double-slit experiment established that light behaves as a wave by producing an interference pattern that only a superposition of propagating disturbances explains. Franz Melde's 1859 experiments with a string driven by a tuning fork showed the direct relation between tension, frequency and wavelength, and his measured standing patterns confirmed $\sqrt{T/\mu}$. Ripple-tank measurements of surface waves confirmed the different depth laws: shallow-water crests travel at $\sqrt{gh}$ essentially independent of wavelength, while deep-water crests obey $\omega^2=gk$. Ocean swell observed from ships and, later, by satellite altimetry shows the same dispersive spreading predicted by the theory.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**The medium travels with the wave.** It does not; elements oscillate locally while the disturbance advances. A cork bobs, it does not cross the ocean.',
          '**A higher frequency means a faster wave.** In a nondispersive medium the speed is fixed by the medium and the wavelength shortens instead.',
          '**Amplitude affects speed.** For linear waves amplitude affects energy and intensity, not phase speed; amplitude-dependent speed belongs to nonlinear waves.',
          '**Sound and light move the same way.** Sound is a longitudinal pressure wave needing a medium; light is a transverse electromagnetic wave that propagates in vacuum.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Wave motion rests on *shm* for the local oscillator and on the continuum limit of coupled oscillators in *coupled-oscillators*. The governing equation is the prototype studied in *wave-equation*; when the medium is frequency-dependent the description passes to *dispersion*. Superposition leads directly to *superposition-interference* and *standing-waves*, while finite amplitude leads to *nonlinear-waves* and *solitons*. The electromagnetic realisation is *electromagnetic-waves*, and the acoustic one is *sound-propagation*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Seismology: P and S body waves and surface waves are interpreted with the same travel-time and amplitude concepts.',
          'Stringed instruments and piano design: wave speed and wavelength determine pitch and harmonic content.',
          'Underwater acoustics and sonar: pulse propagation, refraction by sound-speed profiles and target echo timing.',
          'Radio and optical fibre links: modulation is imprinted on a travelling carrier and described by the same phase variables.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 1*, chapter 16: Waves and Sound (free at openstax.org).',
          'The Feynman Lectures on Physics, volume I, chapters 48–51 (free online at feynmanlectures.caltech.edu).',
          'MIT OpenCourseWare, 8.03 Vibrations and Waves lecture notes and problem sets.',
        ],
      },
      {
        kind: 'table',
        headers: ['System', 'Restoring agent', 'Wave speed', 'Wave type'],
        rows: [
          ['Stretched string', 'Tension T', String.raw`$\sqrt{T/\mu}$`, 'Transverse'],
          ['Gas or liquid', 'Bulk modulus K', String.raw`$\sqrt{K/\rho}$`, 'Longitudinal'],
          ['Shallow water', 'Gravity, depth h', String.raw`$\sqrt{gh}$`, 'Surface gravity wave'],
          ['Vacuum (light)', 'Maxwell field equations', String.raw`$c$`, 'Transverse electromagnetic'],
        ],
      },
    ],
  },
  {
    id: 'standing-waves',
    title: 'Standing waves and resonance',
    branchId: 'waves',
    level: 'Undergraduate 1',
    summary: 'Two identical counter-propagating waves superpose into a stationary pattern of nodes and antinodes; boundary conditions select a discrete set of resonant frequencies.',
    prerequisites: ['wave-motion', 'superposition-interference', 'shm'],
    tags: ['nodes', 'harmonics', 'resonance', 'boundary conditions'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`When a wave is confined, the outgoing disturbance is reflected back on itself. The incident and reflected waves have equal amplitude and frequency but opposite propagation directions, and their sum is a standing wave: a pattern whose crests do not travel. Instead of a moving profile one finds fixed nodes, where the displacement always vanishes, and antinodes, where it oscillates with maximum amplitude. The allowed pattern is determined entirely by the boundary conditions and the wave speed.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Add a right-moving $A\cos(kx-\omega t)$ to a left-moving $A\cos(kx+\omega t)$ and the trigonometric sum gives $2A\cos(kx)\cos(\omega t)$. The factor $\cos(\omega t)$ says every point oscillates in phase (or exactly out of phase), while $\cos(kx)$ says the amplitude varies from place to place and never moves. Energy no longer flows down the string: it sloshes back and forth between kinetic energy concentrated at the equilibrium-crossing instant and elastic energy concentrated at maximum displacement.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`Confinement quantises the pattern. A string clamped at both ends can only fit an integer number of half wavelengths, so $\lambda_n=2L/n$. A pipe closed at one end and open at the other has a displacement node at the closed end and an antinode at the open end, admitting only odd harmonics, $\lambda_n=4L/(2n-1)$. Resonance is the enhanced response when the drive frequency matches one of these natural frequencies; the sharpness of the response is measured by the quality factor $Q$.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Nodes are places of maximum strain',
        text: String.raw`At a displacement node of a string the transverse motion is zero, but the slope $\partial y/\partial x$ is largest there, so the string is most strongly stretched and the elastic energy density peaks. This is why a vibrating string often breaks near a clamp and why a wind instrument has a pressure antinode at a closed end where the air displacement node sits.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Node**: a fixed point where the displacement vanishes at all times; spacing between adjacent nodes is $\lambda/2$.`,
          String.raw`**Antinode**: a point of maximum oscillation amplitude, midway between nodes.`,
          String.raw`**Fundamental and harmonics**: the lowest allowed mode ($n=1$) and the integer or odd-integer overtones above it.`,
          String.raw`**Boundary condition**: fixed ends force a node; free or open ends force an antinode (displacement) or a pressure node.`,
          String.raw`**Resonance**: large amplitude when a driving frequency coincides with a normal mode; limited by damping.`,
          String.raw`**Quality factor $Q$**: ratio of stored energy to energy lost per radian of oscillation; a high $Q$ gives a narrow resonance peak.`,
          String.raw`**Mode shape**: the spatial eigenfunction, orthogonal to the other modes and complete for expansions of arbitrary initial shapes.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Here $\psi$ is the displacement, $A$ the amplitude of each travelling component, $k=\omega/v$ the wavenumber fixed by the medium, and $L$ the length of the confined region. Summing two opposite waves with the trigonometric identity for $\cos$ gives the factorised standing pattern.`,
      },
      { kind: 'math', display: true, latex: String.raw`\psi(x,t)=A\cos(kx-\omega t)+A\cos(kx+\omega t)=2A\cos(kx)\cos(\omega t)`, caption: 'A standing wave as the superposition of two counter-propagating waves.' },
      {
        kind: 'paragraph',
        text: String.raw`For a string pinned at $x=0$ and $x=L$ the condition $\psi(0,t)=\psi(L,t)=0$ requires $\sin(kL)=0$, hence $k_n=n\pi/L$. Since $\omega=vk$, the normal-mode frequencies are integer multiples of the fundamental; for a pipe closed at one end only odd integers appear because the other end must be an antinode.`,
      },
      { kind: 'math', display: true, latex: String.raw`k_n=\frac{n\pi}{L},\qquad \lambda_n=\frac{2L}{n},\qquad f_n=\frac{n v}{2L}\quad(n=1,2,3,\ldots)`, caption: 'String fixed at both ends; replace n by (2n-1) with denominator 4L for a closed-open pipe.' },
      {
        kind: 'paragraph',
        text: String.raw`With weak viscous or frictional damping $\gamma$, the resonant response to a drive at frequency $\Omega$ is a Lorentzian in amplitude, and the width of the power peak at half maximum is $\Delta\omega=\gamma$. The quality factor $Q=\omega_0/\gamma$ links the temporal decay of a freely ringing mode to the frequency selectivity observed in the laboratory.`,
      },
      { kind: 'math', display: true, latex: String.raw`|\psi_{\max}(\Omega)|\propto\frac{1}{\sqrt{(\omega_0^2-\Omega^2)^2+\gamma^2\Omega^2}},\qquad Q=\frac{\omega_0}{\gamma}`, caption: 'Driven damped oscillator response and the definition of Q.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Harmonics of a clamped string',
        items: [
          { title: 'Get the wave speed', text: 'A string of length 0.60 m is under a tension that gives a transverse wave speed of 120 m/s.', math: String.raw`v=120\ \mathrm{m\,s^{-1}}` },
          { title: 'Compute the fundamental', text: 'Both ends are fixed, so the fundamental fits one half wavelength into the length.', math: String.raw`f_1=\frac{v}{2L}=\frac{120}{2(0.60)}=100\ \mathrm{Hz}` },
          { title: 'Find the third harmonic', text: 'The third mode fits three half wavelengths and has a node at the midpoint.', math: String.raw`f_3=3f_1=300\ \mathrm{Hz},\qquad \lambda_3=\frac{2L}{3}=0.40\ \mathrm{m}` },
          { title: 'Relate pattern to nodes', text: 'There are four nodes including the ends, separated by lambda/3, and three antinodes.', math: String.raw`\frac{\lambda_3}{2}=0.20\ \mathrm{m},\qquad L=3\times 0.20=0.60\ \mathrm{m}\ \checkmark` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Perfect nodes require perfect boundaries',
        text: 'A real clamp has finite stiffness and mass, an open pipe has an end correction of roughly 0.6 times the radius, and damping blurs the resonant peak. The ideal integer-harmonic spectrum therefore only holds approximately.',
      },
      {
        kind: 'list',
        items: [
          'Linear, small-amplitude motion; large amplitudes shift frequencies through nonlinearity.',
          'Ideal rigid or pressure-release boundaries; compliant supports shift and split modes.',
          'Uniform string or uniform pipe cross-section; tapering changes mode spacing.',
          'Weak damping assumed when using f_n = n v/(2L); heavy damping broadens and shifts peaks.',
          'End correction for open pipes: effective length exceeds physical length, lowering observed frequencies.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Ernst Chladni's 1787 experiments sprinkled sand on vibrating metal plates and revealed nodal lines wherever the powder collected; the patterns are two-dimensional standing-wave eigenfunctions. Franz Melde's 1859 string experiment drove a thread with a tuning fork and made the node spacing directly visible, confirming the relation between wavelength, tension and frequency. August Kundt's 1866 dust-tube experiment used fine powder in a glass tube to map pressure nodes of sound in air and to measure the speed of sound in different gases. Organ pipes, from antiquity onward, are a daily demonstration that only discrete resonant frequencies are strongly radiated.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**A standing wave is a wave that stopped moving.** It is two counter-propagating waves; energy is trapped rather than flowing steadily onward.',
          '**All points of a standing wave oscillate together.** Adjacent segments oscillate in antiphase; the sign of cos(kx) flips across each node.',
          '**A closed pipe produces all harmonics.** It supports only odd harmonics of the fundamental because one end is a displacement node and the other an antinode.',
          '**Nodes mean no energy.** Elastic energy density is largest at displacement nodes for a string, and pressure fluctuations are largest there for a closed pipe end.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Standing waves are the finite-domain version of *wave-motion* and a direct consequence of *superposition-interference*. The normal modes are eigenfunctions of the wave operator, the classical analogue of the bound-state spectra in *schrodinger-equation*. Resonant response is treated in *resonance* and *damped-forced-oscillations*, while the acoustic realisation belongs to *musical-acoustics* and *architectural-acoustics*. Optical cavity modes extend the same ideas in *interferometers*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'String and wind instruments: mode structure fixes pitch and timbre.',
          'Laser resonators: only longitudinal and transverse modes satisfying the cavity boundary conditions oscillate.',
          'Ultrasonic transducers: thickness modes set the operating frequency of piezoelectric elements.',
          'Room acoustics: axial, tangential and oblique room modes colour the bass response of small studios.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 1*, sections 16.5–16.6 on standing waves and sound intensity.',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, lectures on normal modes and continuous systems.',
          'The Feynman Lectures on Physics volume I, chapter 49 on modes of a vibrating string.',
        ],
      },
      {
        kind: 'table',
        headers: ['System', 'Boundary condition', 'Allowed wavelengths', 'Frequency sequence'],
        rows: [
          ['String fixed at both ends', 'Node at each end', String.raw`$2L/n$`, String.raw`$n v/2L$`],
          ['Pipe open at both ends', 'Pressure node at each end', String.raw`$2L/n$`, String.raw`$n v/2L$`],
          ['Pipe closed at one end', 'Node closed, antinode open', String.raw`$4L/(2n-1)$`, String.raw`$(2n-1)v/4L$`],
        ],
      },
    ],
  },
  {
    id: 'dispersion',
    title: 'Dispersion and group velocity',
    branchId: 'waves',
    level: 'Undergraduate 2',
    summary: 'When the dispersion relation omega(k) is nonlinear, phase and group velocity differ, wave packets spread, and the shape of a pulse changes as it travels.',
    prerequisites: ['wave-motion', 'fourier-analysis', 'differential-calculus'],
    tags: ['dispersion relation', 'group velocity', 'wave packets', 'refractive index'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`A medium is dispersive when the phase speed of a wave depends on its frequency. The complete physics is then contained in the dispersion relation $\omega(k)$, not in a single number $v$. For light in glass $\omega=ck/n(\omega)$; for deep-water gravity waves $\omega^2=gk$; for waves on a shallow sheet $\omega=k\sqrt{gh}$. Because a pulse is built from a band of wavenumbers, its envelope travels at the group velocity $v_g=d\omega/dk$, which can differ substantially from the phase velocity $\omega/k$.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Imagine two sinusoids of nearly equal wavenumber. Their sum shows a fast-running carrier inside a slowly varying envelope: the beat pattern. The carrier crests move at $v_p=\omega/k$, while the envelope, which carries the energy and the information, moves at the difference quotient $\Delta\omega/\Delta k$, which becomes $d\omega/dk$ in the limit. If the medium's response changes rapidly with frequency, these two speeds separate; a short pulse whose spectrum is broad then has its components pulled apart, so the packet broadens.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The sign of the curvature of $\omega(k)$ decides the behaviour. In the normal dispersion region of glass, $n$ increases with frequency, blue light travels more slowly than red and a prism spreads white light with violet most deviated. In anomalous dispersion, near an absorption line, the ordering reverses and group velocity can even exceed $c$ or become negative without violating relativity, because the peak of a reshaped pulse is not the speed of information or of the front.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Deep-water waves crawl at half the crest speed',
        text: String.raw`For deep-water gravity waves $\omega=\sqrt{gk}$, so $v_p=\sqrt{g/k}$ but $v_g=\tfrac12\sqrt{g/k}$. A group of crests advances at half the speed of an individual crest: new crests are continuously created at the back of the group and disappear at the front. The energy of a storm therefore arrives long before its fastest-looking crest would suggest.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Dispersion relation $\omega(k)$**: the complete mapping between spatial and temporal oscillation rates for a given medium.`,
          String.raw`**Phase velocity $v_p=\omega/k$**: speed of a point of constant phase; can exceed $c$ in a plasma or waveguide without carrying information.`,
          String.raw`**Group velocity $v_g=d\omega/dk$**: speed of the envelope of a narrow-band packet and of energy transport in ordinary media.`,
          String.raw`**Normal dispersion**: $dn/d\omega>0$ in transparent glass; blue delayed relative to red.`,
          String.raw`**Anomalous dispersion**: $dn/d\omega<0$ near resonances; group velocity and pulse shape behave unusually.`,
          String.raw`**Group-velocity dispersion (GVD)**: the curvature $\beta_2=d^2 k/d\omega^2$, which controls pulse broadening in fibres.`,
          String.raw`**Wave packet**: a superposition over a finite band of $k$, written as an integral with envelope $A(k)$.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $k$ be wavenumber, $\omega$ angular frequency and $\omega(k)$ the dispersion relation. A monochromatic component has phase $\theta=kx-\omega t$; holding $\theta$ fixed gives the phase velocity. Expanding $\omega(k)$ about a central wavenumber $k_0$ shows the envelope dynamics up to first order.`,
      },
      { kind: 'math', display: true, latex: String.raw`v_p=\frac{\omega}{k},\qquad v_g=\left.\frac{d\omega}{dk}\right|_{k_0}=v_p+k\frac{dv_p}{dk}=v_p-\lambda\frac{dv_p}{d\lambda}`, caption: 'Phase and group velocity, with equivalent wavelength form of the group velocity.' },
      {
        kind: 'paragraph',
        text: String.raw`A packet is $\psi(x,t)=\int A(k)e^{i(kx-\omega(k)t)}\,dk$. Writing $k=k_0+q$ and expanding $\omega\simeq\omega_0+v_g q+\tfrac12\beta_2^{(k)}q^2$ separates a rigid translation at $v_g$ from a spreading term controlled by the second derivative. Keeping only the quadratic term gives the paraxial wave equation for the envelope, the direct analogue of nonrelativistic Schrödinger evolution.`,
      },
      { kind: 'math', display: true, latex: String.raw`\psi(x,t)=e^{i(k_0x-\omega_0t)}\int A(k_0+q)e^{iq(x-v_gt)}\,e^{-i\frac{1}{2}\omega''(k_0)q^2t}\,dq`, caption: 'Expansion of a wave packet about a central wavenumber; the q-squared term causes spreading.' },
      {
        kind: 'paragraph',
        text: String.raw`For water waves the dispersion relation follows from the balance between gravity and inertia with the appropriate depth $h$; in the shallow limit the wavelength is long compared with $h$ and the medium becomes nondispersive. In optics it is customary to work with $\beta(\omega)=n(\omega)\omega/c$, so that $\beta_2=d^2\beta/d\omega^2$ has units of squared seconds per metre and a Gaussian pulse of duration $\tau$ broadens as $\tau(z)=\tau_0\sqrt{1+(z/L_D)^2}$ with dispersion length $L_D=\tau_0^2/|\beta_2|$.`,
      },
      { kind: 'math', display: true, latex: String.raw`\omega^2=gk\tanh(kh)\ \xrightarrow{kh\ll1}\ \omega=k\sqrt{gh},\qquad \xrightarrow{kh\gg1}\ \omega=\sqrt{gk}`, caption: 'Surface gravity waves: shallow-water and deep-water limits.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Crests versus energy in deep-water swell',
        items: [
          { title: 'Compute the wavenumber', text: 'A deep-water swell has wavelength 10 m. Deep water means the depth greatly exceeds the wavelength.', math: String.raw`k=\frac{2\pi}{10}=0.628\ \mathrm{rad\,m^{-1}}` },
          { title: 'Apply the deep-water relation', text: 'Gravity supplies the restoring force, giving omega squared equal to gk with g = 9.81 m/s squared.', math: String.raw`\omega=\sqrt{gk}=\sqrt{9.81\times0.628}=2.48\ \mathrm{rad\,s^{-1}}` },
          { title: 'Find the phase speed', text: 'Divide angular frequency by wavenumber to get the speed of an individual crest.', math: String.raw`v_p=\frac{\omega}{k}=\frac{2.48}{0.628}=3.95\ \mathrm{m\,s^{-1}}` },
          { title: 'Find the group speed', text: 'Differentiate omega = sqrt(gk), or use the deep-water half relation, to get the envelope speed.', math: String.raw`v_g=\frac{1}{2}\sqrt{\frac{g}{k}}=\frac{v_p}{2}=1.98\ \mathrm{m\,s^{-1}}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Group velocity is not always the signal velocity',
        text: 'In strongly absorbing or anomalously dispersive media the envelope can be distorted so severely that the peak of the pulse moves faster than c or appears to exit before it enters. No energy or information outruns the wave front; the group velocity concept requires a narrow band and weak attenuation.',
      },
      {
        kind: 'list',
        items: [
          'Narrow-band packet assumed when using v_g = dω/dk; broad pulses need the full integral.',
          'Linear medium; nonlinear dispersion depends on amplitude and leads to self-phase modulation.',
          'Small-amplitude water waves; steep waves introduce nonlinear corrections and eventual breaking.',
          'Weak absorption; near resonances the complex refractive index makes v_g ambiguous.',
          'Homogeneous medium; a spatially varying n introduces ray bending on top of temporal dispersion.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Isaac Newton's 1666 prism experiments showed that white light separates into colours, the first clear evidence that the propagation depends on frequency. Joseph von Fraunhofer's dark solar lines in the early 1810s gave precise spectral landmarks for measuring dispersion. Léon Foucault's 1850 rotating-mirror comparison of light speed in water and air showed that light is slower in water, matching the wave prediction; Hippolyte Fizeau's 1851 flowing-water experiment measured the change in light speed caused by moving water and confirmed the dispersive correction to Fresnel's drag coefficient. In the twentieth century, pulse-propagation measurements in optical fibres verified the predicted group-velocity dispersion and its compensation by dispersion-shifted fibre designs.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Dispersion means the medium scatters light.** It means the phase speed depends on frequency; scattering is a separate process.',
          '**Group velocity is always the speed of information.** Only for a narrow-band pulse in a weakly absorbing, forward-propagating medium; the front velocity never exceeds c.',
          '**Prisms split light because violet is heavier.** The deviation comes from a larger refractive index at shorter wavelength, not from any mechanical weight.',
          '**All waves in water are nondispersive.** Only long waves in shallow water are; deep-water swell and capillary ripples are strongly dispersive.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Dispersion generalises *wave-motion* by replacing a single speed with $\omega(k)$, and it is analysed with the Fourier methods of *fourier-analysis*. In optical media it is governed by the material response treated in *dielectrics* and used in *fiber-optics* and *fourier-optics*. The envelope evolution shares its mathematical form with *schrodinger-equation*, and when nonlinearity is added it leads to *nonlinear-waves* and *solitons*. Quantum-mechanical matter waves have their own dispersion relation in *de-broglie-hypothesis*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Telecommunications: dispersion compensation and dispersion-flattened fibres keep high-bit-rate pulses narrow.',
          'Ultrafast optics: chirped mirrors and prism pairs compress stretched laser pulses to femtosecond duration.',
          'Ocean forecasting: swell arrival times are predicted from the group velocity of the frequency components.',
          'Seismology: dispersed surface waves reveal the layered structure of the Earth’s crust and mantle.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 3*, section on dispersion and the refractive index.',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, lectures on wave packets and group velocity.',
          'Agrawal, *Nonlinear Fiber Optics*, chapter 1 (a standard graduate reference; consult via an institutional library).',
        ],
      },
      {
        kind: 'table',
        headers: ['Medium or wave', 'Dispersion relation', 'Phase velocity', 'Group velocity'],
        rows: [
          ['Shallow water', String.raw`$\omega=k\sqrt{gh}$`, String.raw`$\sqrt{gh}$`, String.raw`$\sqrt{gh}$ (equal)`],
          ['Deep water gravity', String.raw`$\omega=\sqrt{gk}$`, String.raw`$\sqrt{g/k}$`, String.raw`$\tfrac12\sqrt{g/k}$`],
          ['Light in glass', String.raw`$k=n(\omega)\omega/c$`, String.raw`$c/n$`, String.raw`$c/(n+\omega\,dn/d\omega)$`],
          ['Waveguide mode', String.raw`$\omega^2=\omega_c^2+c^2k^2$`, String.raw`$>c$`, String.raw`$<c$`],
        ],
      },
    ],
  },
  {
    id: 'nonlinear-waves',
    title: 'Nonlinear waves',
    branchId: 'waves',
    level: 'Undergraduate 3',
    summary: 'When the medium response depends on amplitude, wave speed becomes amplitude-dependent, profiles steepen into shocks, and harmonics or self-focusing appear; nonlinearity and dispersion together shape the evolution.',
    prerequisites: ['wave-motion', 'dispersion', 'differential-equations'],
    tags: ['finite amplitude', 'shock formation', 'harmonic generation', 'Burgers equation'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Linear wave theory assumes the disturbance is too small to change the medium's response. A nonlinear wave violates that assumption: the local propagation speed depends on the local value of the field, so crests can overtake troughs, smooth profiles steepen, and energy originally at one frequency is transferred to new frequencies. The governing equation is no longer solvable by simple superposition, and the competition between nonlinear steepening and dissipative or dispersive smoothing determines whether a shock, a harmonic cascade or a stable localised structure emerges.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`For a right-moving finite-amplitude disturbance in a fluid the characteristic speed is $c(u)=c_0+\beta u$, where $\beta$ is a nonlinear coefficient. Points of the profile with larger $u$ move faster. If the profile rises at the back and falls at the front, the high part catches the low part and the waveform steepens until its slope becomes formally infinite: a shock. Dissipation then takes over and the discontinuity is smoothed into a thin layer where entropy is produced.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`Nonlinearity also mixes frequencies. A sinusoidal input does not remain sinusoidal because a squared or cubed term in the constitutive relation produces components at $2\omega$ and $3\omega$. In optics the Kerr nonlinearity makes the refractive index depend on intensity, $n=n_0+n_2I$, so a beam with a bright centre sees a larger index at its centre and can focus itself. In acoustics, the nonlinear parameter $B/A$ measures the curvature of the pressure–density relation and controls the rate of harmonic growth.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Steepening is a traffic jam, not an instability',
        text: String.raw`The characteristic picture makes shock formation almost obvious: treat each point of the wave as a car whose speed increases with local density. Cars at the back of a dense region travel faster and eventually collide with slower cars ahead. The crossing of characteristics is a geometric event, and the time to crossing can be computed exactly from the initial slope even though the PDE itself is nonlinear.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Amplitude-dependent speed**: $c(u)=c_0+\alpha u$ for a simple wave; the source of steepening.`,
          String.raw`**Characteristics**: curves $dx/dt=c(u)$ along which $u$ is constant; their intersection signals gradient catastrophe.`,
          String.raw`**Shock**: a thin discontinuity across which mass, momentum and energy obey jump conditions and entropy increases.`,
          String.raw`**Harmonic generation**: quadratic or cubic nonlinearities create frequencies at multiples of the drive.`,
          String.raw`**Burgers equation**: $u_t+u u_x=\nu u_{xx}$, the minimal model balancing nonlinear steepening against diffusion.`,
          String.raw`**Kerr nonlinearity**: intensity-dependent refractive index responsible for self-focusing and self-phase modulation.`,
          String.raw`**Modulational instability**: the growth of sidebands when nonlinearity and anomalous dispersion cooperate.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $u(x,t)$ be a scalar disturbance, $c_0$ the small-amplitude speed, and $\alpha$ a coefficient with dimensions chosen so that $\alpha u$ has units of speed. The inviscid simple-wave equation has a particularly transparent solution: $u$ is constant along characteristics whose slope depends on that constant value.`,
      },
      { kind: 'math', display: true, latex: String.raw`\frac{\partial u}{\partial t}+\bigl(c_0+\alpha u\bigr)\frac{\partial u}{\partial x}=0,\qquad \frac{dx}{dt}=c_0+\alpha u,\qquad \frac{du}{dt}=0`, caption: 'Simple-wave equation and its characteristic ODEs.' },
      {
        kind: 'paragraph',
        text: String.raw`A crossing of characteristics occurs at the earliest time when the mapping from initial position to current position loses invertibility. For an initial profile $u(x,0)$, thegradient catastrophe happens where the initial slope is most negative; this gives an explicit breaking time and breaking distance for the first shock.`,
      },
      { kind: 'math', display: true, latex: String.raw`t_b=\frac{-1}{\alpha\,\min_x\left(\partial u/\partial x\right)_{t=0}},\qquad x_b\simeq c_0 t_b`, caption: 'Breaking time from the most negative initial slope; alpha is assumed positive.' },
      {
        kind: 'paragraph',
        text: String.raw`Adding diffusion or dispersion regularises the singularity. Burgers' equation replaces infinite steepness by a stationary shock of thickness $\nu/\Delta u$, while the nonlinear Schrödinger envelope equation for an optical pulse balances group-velocity dispersion $\beta_2$ against the Kerr coefficient $\gamma$. Its cubic term is what generates new spectral components and, in the anomalously dispersive regime, permits envelope solitons.`,
      },
      { kind: 'math', display: true, latex: String.raw`u_t+u u_x=\nu u_{xx},\qquad i\frac{\partial A}{\partial z}+\frac{\beta_2}{2}\frac{\partial^2 A}{\partial T^2}+\gamma|A|^2A=0`, caption: 'Burgers equation and the nonlinear Schrödinger equation for an optical envelope.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'When does a sound wave steepen into a shock?',
        items: [
          { title: 'Set up the profile', text: 'Take a sinusoidal velocity disturbance with amplitude 1.0 m/s and wavelength 1.0 m superposed on still air with c0 = 340 m/s and alpha = 2.', math: String.raw`u(x,0)=1.0\sin(kx)\ \mathrm{m\,s^{-1}},\qquad k=\frac{2\pi}{1.0}=6.283\ \mathrm{rad\,m^{-1}}` },
          { title: 'Find the steepest slope', text: 'The most negative initial slope occurs where the cosine equals minus one.', math: String.raw`\min_x\frac{\partial u}{\partial x}=-k u_0=-6.283\ \mathrm{s^{-1}}` },
          { title: 'Compute breaking time', text: 'Insert the slope into the characteristic crossing formula.', math: String.raw`t_b=\frac{1}{\alpha k u_0}=\frac{1}{2\times6.283\times1.0}=0.0796\ \mathrm{s}` },
          { title: 'Convert to distance', text: 'Multiply by the propagation speed to find where the first shock would form in the absence of dissipation.', math: String.raw`x_b\approx c_0 t_b=340\times0.0796\approx27\ \mathrm{m}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'The inviscid model predicts infinite slope',
        text: 'The crossing of characteristics produces a mathematical discontinuity with zero thickness, which real fluids never achieve. Molecular viscosity, thermal conduction and relaxation processes set a finite shock thickness. The simple-wave reduction also requires a single propagation direction; opposing waves interact and cannot be treated by independent characteristics.',
      },
      {
        kind: 'list',
        items: [
          'Single-direction simple wave; multi-dimensional or counter-propagating fields require the full equations.',
          'Weak dissipation assumed in the inviscid breaking estimate; strong viscosity prevents shock formation.',
          'Local thermodynamic equilibrium so that c(u) and B/A are meaningful state functions.',
          'Paraxial and slowly varying envelope approximations for the nonlinear Schrödinger equation.',
          'No resonance enhancement; near atomic resonances nonlinear response becomes dispersive and lossy.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Ernst Mach and his collaborators photographed shock waves in the 1880s using schlieren and shadowgraph methods, making the steepened front directly visible and measuring its angle against the flow. Shock-tube experiments developed in the mid-twentieth century measured the jump conditions across normal shocks and the finite internal structure predicted by viscous theory. In optics, Peter Franken and co-workers observed second-harmonic generation in quartz in 1961, demonstrating frequency conversion; self-focusing and self-trapping of intense beams in liquids were reported in the 1960s, confirming the intensity-dependent refractive index. Ultrasonic harmonic-growth measurements provide the standard experimental determination of the nonlinear parameter B/A in liquids and biological tissue.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Nonlinear means chaotic.** Nonlinearity is amplitude-dependent response; chaos needs suitable feedback and dimensionality, and simple-wave breaking is perfectly deterministic.',
          '**Shocks violate energy conservation.** They conserve mass, momentum and energy while converting organised wave energy into heat; entropy increases across the front.',
          '**A steepening wave keeps the same speed everywhere.** The high-amplitude part travels faster, which is precisely why the profile changes shape.',
          '**Harmonics appear only in lasers.** Any sufficiently intense acoustic or optical wave in a nonlinear medium generates them.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Nonlinear waves extend *wave-motion* beyond the superposition regime and are the natural companion to *dispersion*. When steepening is exactly balanced by dispersion the result is a *solitons* solution, described by the equations treated here. In optics the same ideas reappear as *nonlinear-optics* and in fibres in *fiber-optics*; in gases they connect to *compressible-flow* and *navier-stokes*, and in sound to *nonlinear-acoustics* and *aeroacoustics*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Supersonic aerodynamics: shock waves around aircraft and in nozzles are designed with nonlinear jump relations.',
          'High-power lasers: self-focusing and filamentation limit the achievable intensity in transparent materials.',
          'Medical ultrasound: harmonic imaging exploits tissue nonlinearity to improve image contrast.',
          'Ocean and river hydraulics: tidal bores and dam-break waves are shallow-water shocks.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 1*, section 16.7 on shock waves and the speed of sound.',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, supplemental notes on nonlinear waves.',
          'Whitham, *Linear and Nonlinear Waves* (Wiley, 1974) — the standard graduate text, often available through libraries.',
        ],
      },
      {
        kind: 'table', headers: ['Effect', 'Competing influence', 'Typical outcome'], rows: [
          ['Characteristic crossing', 'Amplitude-dependent speed', 'Shock formation'],
          ['Burgers damping', 'Steepening versus viscosity', 'Thin steady shock'],
          ['Kerr self-focusing', 'Diffraction versus nonlinear index', 'Filament or self-trapped beam'],
          ['Sideband growth', 'Dispersion versus Kerr nonlinearity', 'Modulational instability or soliton'],
        ] },
    ],
  },
  {
    id: 'solitons',
    title: 'Solitons',
    branchId: 'waves',
    level: 'Undergraduate 3',
    summary: 'A soliton is a localised wave packet that keeps its shape while travelling and survives collisions, because nonlinear steepening is exactly balanced by dispersive spreading.',
    prerequisites: ['nonlinear-waves', 'dispersion', 'wave-motion'],
    tags: ['Korteweg–de Vries', 'sech squared', 'integrable systems', 'optical solitons'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`A soliton is a solitary, self-reinforcing wave pulse. In an ordinary linear dispersive medium a localised pulse spreads; in a nonlinear medium without dispersion it steepens into a shock. When the two effects balance, a pulse can propagate indefinitely without changing shape, and two such pulses can pass through each other emerging with their original forms and only a shift in position. Solitons occur in shallow water, in optical fibres, in plasmas and in Bose–Einstein condensates.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`The balance is dynamical. Dispersion tends to pull the different Fourier components of the pulse apart, because they travel at different phase speeds. Nonlinearity makes the larger-amplitude part travel faster, which tends to pile material up at the front. For a particular amplitude-dependent width the two tendencies cancel at every point of the profile, so the pulse is an exact travelling solution of the full nonlinear equation rather than an approximation.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The shape is a $\mathrm{sech}^2$ bump, not a sine or a Gaussian. Its width shrinks as its amplitude grows: a taller soliton is narrower and travels faster. This coupling between height, width and speed is the signature of the Korteweg–de Vries (KdV) family. Remarkably, solitons also behave like particles in collisions: after a head-on encounter each emerges unchanged apart from a phase shift, a property traced to the existence of an infinite number of conserved quantities in integrable equations.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'A taller soliton is a narrower soliton',
        text: String.raw`Because $L=\sqrt{12\beta/(\alpha A)}$, increasing the amplitude $A$ makes the width $L$ shrink as $A^{-1/2}$ while the speed grows linearly with $A$. No linear system behaves this way. This amplitude–width relation is the practical fingerprint used to identify KdV solitons in water-channel experiments.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Localised travelling pulse**: a solution depending only on $x-vt$ that decays to zero at infinity.`,
          String.raw`**Sech-squared profile**: $u=A\,\mathrm{sech}^2[(x-vt)/L]$, the KdV soliton shape.`,
          String.raw`**Amplitude–width–speed relation**: $v=c_0+\alpha A/3$ and $L=\sqrt{12\beta/(\alpha A)}$.`,
          String.raw`**KdV equation**: the minimal model with weak nonlinearity, weak dispersion and a unidirectional wave.`,
          String.raw`**Elastic collisions**: solitons pass through one another and recover their shapes, with only a positional shift.`,
          String.raw`**Integrability**: conservation laws and inverse scattering make the initial-value problem solvable exactly.`,
          String.raw`**Envelope solitons**: optical pulses governed by the nonlinear Schrödinger equation rather than KdV.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $u(x,t)$ be the surface elevation or field amplitude, $c_0$ the linear long-wave speed, $\alpha$ the nonlinear coefficient and $\beta$ the dispersion coefficient. The Korteweg–de Vries equation keeps the leading nonlinear and third-derivative dispersive corrections; the signs of $\alpha$ and $\beta$ determine whether a positive or negative elevation is supported.`,
      },
      { kind: 'math', display: true, latex: String.raw`\frac{\partial u}{\partial t}+c_0\frac{\partial u}{\partial x}+\alpha u\frac{\partial u}{\partial x}+\beta\frac{\partial^3u}{\partial x^3}=0`, caption: 'The Korteweg–de Vries equation with linear, nonlinear and dispersive terms.' },
      {
        kind: 'paragraph',
        text: String.raw`Seeking a travelling solution $u=f(\xi)$ with $\xi=x-vt$ reduces the PDE to an ordinary differential equation. Integrating twice with the boundary condition that $u$ and its derivatives vanish at infinity gives the closed-form soliton and its velocity and width in terms of the amplitude.`,
      },
      { kind: 'math', display: true, latex: String.raw`u(x,t)=A\,\mathrm{sech}^2\!\left(\frac{x-vt-x_0}{L}\right),\qquad v=c_0+\frac{\alpha A}{3},\qquad L=\sqrt{\frac{12\beta}{\alpha A}}`, caption: 'KdV soliton profile, propagation speed and characteristic width.' },
      {
        kind: 'paragraph',
        text: String.raw`The pulse carries conserved integrals. Integrating the profile gives a mass proportional to $2AL$, a momentum-like invariant proportional to $4A^2L/3$, and a higher invariant that fixes the stability. Because the KdV equation is integrable, multi-soliton solutions can be written explicitly and the asymptotic outcome of an arbitrary initial disturbance is a finite set of solitons plus a dispersing tail.`,
      },
      { kind: 'math', display: true, latex: String.raw`\int_{-\infty}^{\infty}u\,dx=2AL,\qquad \int_{-\infty}^{\infty}u^2\,dx=\frac{4}{3}A^2L`, caption: 'Two conserved integrals of the KdV soliton; higher invariants also exist.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'A soliton in a laboratory water channel',
        items: [
          { title: 'List the channel parameters', text: 'Take a shallow channel with linear speed c0 = 0.30 m/s, nonlinear coefficient alpha = 0.6 and dispersion coefficient beta = 0.02 cubic metres per second.', math: String.raw`c_0=0.30\ \mathrm{m\,s^{-1}},\quad \alpha=0.6,\quad \beta=0.02\ \mathrm{m^3\,s^{-1}}` },
          { title: 'Choose an amplitude and find the speed', text: 'A pulse of amplitude 0.05 m/s travels faster than a small-amplitude long wave by alpha A/3.', math: String.raw`v=0.30+\frac{0.6\times0.05}{3}=0.30+0.01=0.31\ \mathrm{m\,s^{-1}}` },
          { title: 'Compute the width', text: 'The balance of beta and alpha A sets the sech-squared width.', math: String.raw`L=\sqrt{\frac{12(0.02)}{0.6(0.05)}}=\sqrt{8}=2.83\ \mathrm{m}` },
          { title: 'Check the integral', text: 'The integrated pulse strength follows from the amplitude and width, and the profile extends a few L in each direction.', math: String.raw`\int u\,dx=2AL=2(0.05)(2.83)=0.283\ \mathrm{m^2\,s^{-1}}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Solitons need a fine-tuned balance',
        text: 'KdV assumes weak nonlinearity and weak dispersion of comparable size, a predominantly one-directional wave and a homogeneous medium. Real water channels add bottom friction and higher-order dispersion, so pulses slowly lose energy and shed small radiation; the ideal soliton is an asymptotic concept, not a perfectly permanent object.',
      },
      {
        kind: 'list',
        items: [
          'Weak, comparable nonlinearity and dispersion; strong nonlinearity invalidates the KdV truncation.',
          'Unidirectional propagation; counter-propagating solitons require coupled equations.',
          'No damping or forcing over the timescale of interest.',
          'Shallow-water assumption for water solitons: amplitude small relative to depth and wavelength long compared with depth.',
          'Integrability is special to certain equations; perturbations can cause slow decay or fission.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`John Scott Russell observed a solitary elevation wave in the Union Canal near Edinburgh in 1834, followed it on horseback for nearly two kilometres and noted that it kept its shape and speed. Diederik Korteweg and Gustav de Vries derived the equation and its solitary-wave solution in 1895. Norman Zabusky and Martin Kruskal's 1965 numerical study of the KdV equation showed that the objects survived collisions and coined the name soliton. In 1980, Lynn Mollenauer, Roger Gordon and Martin Islam observed soliton propagation in optical fibre, and the technique later became a candidate for long-haul optical communication. Solitary waves are also observed in shallow channels, in plasma ion-acoustic waves and in ultracold atomic gases.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Any localized pulse is a soliton.** Most pulses disperse; a soliton requires the specific nonlinear–dispersive balance.',
          '**Solitons are rigid objects made of matter.** They are patterns in a medium, like a travelling hump of water, not material particles.',
          '**Solitons pass through each other completely unchanged.** They recover their shapes but acquire a measurable phase shift.',
          '**Solitons only occur in water.** Optical fibres, plasmas and Bose–Einstein condensates all support them.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Solitons arise from the interplay of *nonlinear-waves* and *dispersion*. Their equation belongs to the theory of *pde* and *integrable systems*, while optical envelope solitons are described by the same nonlinear Schrödinger equation used in *nonlinear-optics* and *fiber-optics*. Matter-wave solitons connect to *bose-einstein-condensate*, and the associated conservation laws echo *lagrangian-mechanics* and *noether-theorem*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Fibre-optic communication: soliton pulses resist dispersive broadening over long distances.',
          'Hydraulics: tidal bores and solitary waves in channels are modelled with KdV-type equations.',
          'Plasma physics: ion-acoustic solitons are used to interpret space-plasma observations.',
          'Ultracold atoms: bright and dark matter-wave solitons appear in attractively or repulsively interacting condensates.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'The Feynman Lectures on Physics volume I, chapter 51, Waves (free online).',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, notes on solitary waves.',
          'Ablowitz and Clarkson, *Solitons, Nonlinear Evolution Equations and Inverse Scattering* (Cambridge, 1991) for the integrable-systems background.',
        ],
      },
      {
        kind: 'table', headers: ['System', 'Governing equation', 'Soliton type'], rows: [
          ['Shallow water', 'Korteweg–de Vries', String.raw`$A\,\mathrm{sech}^2((x-vt)/L)$ elevation`],
          ['Optical fibre', 'Nonlinear Schrödinger', 'Bright or dark envelope pulse'],
          ['Plasma', 'KdV or Sagdeev equation', 'Ion-acoustic density pulse'],
          ['Bose–Einstein condensate', 'Gross–Pitaevskii equation', 'Matter-wave soliton'],
        ] },
    ],
  },
  {
    id: 'geometrical-optics',
    title: 'Geometrical optics',
    branchId: 'optics',
    level: 'Undergraduate 1',
    summary: 'In the short-wavelength limit light is traced as rays that obey Fermat’s stationary-time principle, giving reflection, refraction and total internal reflection from a single variational rule.',
    prerequisites: ['wave-motion', 'electromagnetic-waves', 'differential-calculus'],
    tags: ['rays', 'Fermat principle', 'Snell law', 'total internal reflection'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Geometrical optics describes light as rays: lines whose direction changes at interfaces but whose wavelength is assumed negligible compared with every aperture and obstacle. The depth of field, the bending of a straw in water and the formation of a mirror image all follow from one principle: a ray follows a path for which the optical travel time is stationary. This is the high-frequency limit of wave optics, just as particle mechanics is the short-wavelength limit of quantum mechanics.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Light travels more slowly inside glass than in air, by the factor $n=c/v$ called the refractive index. A wavefront crossing an interface obliquely has one side enter the slow medium first; that side lags, so the whole front pivots toward the normal. Rays, which are perpendicular to wavefronts, bend with it. This picture, due to Huygens, turns Snell's law into a simple timing argument and explains why the bending is toward the normal on entering a denser medium.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`Fermat's principle is even more general: of all neighbouring paths between two points the actual one has stationary optical path length $\int n\,ds$, often a minimum but sometimes a maximum or a saddle. A plane mirror image appears behind the mirror because the straight-line path from the eye to the virtual image is the shortest route satisfying the equal-angle condition. When the angle of incidence inside a dense medium exceeds the critical angle, no refracted ray can carry energy away and all of it is reflected.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Stationary, not always shortest',
        text: String.raw`For a concave mirror or a gravitational lens, the physical ray can correspond to a maximum or a saddle of the travel time rather than a minimum. Multiple stationary paths produce multiple images. The word *principle of least time* is therefore a convenient shorthand, but *stationary time* is the correct statement and the one that survives in the path-integral formulation of quantum mechanics.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Ray**: the local propagation direction, normal to the wavefront; valid when wavelengths are small relative to apertures.`,
          String.raw`**Refractive index $n=c/v$**: dimensionless measure of optical slowing; air is about 1.0003, typical glass about 1.5.`,
          String.raw`**Fermat's principle**: $\delta\int n\,ds=0$ between two fixed points.`,
          String.raw`**Snell's law**: $n_1\sin\theta_1=n_2\sin\theta_2$ at a plane interface.`,
          String.raw`**Total internal reflection**: occurs for $n_1>n_2$ beyond $\theta_c=\arcsin(n_2/n_1)$.`,
          String.raw`**Real and virtual images**: rays actually converging versus rays only appearing to diverge from a point.`,
          String.raw`**Paraxial approximation**: small angles allow $\sin\theta\approx\tan\theta\approx\theta$ and make lenses appear ideal.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $n(\mathbf{r})$ be the local refractive index and $ds$ an element of the path. The optical path length is $\mathcal{L}=\int n\,ds$, and the physical ray makes this quantity stationary under small variations of the path. Applying the Euler–Lagrange equations recovers straight rays in homogeneous media and refraction at a discontinuity of $n$.`,
      },
      { kind: 'math', display: true, latex: String.raw`\delta\!\int_A^B n(\mathbf{r})\,ds=0,\qquad \frac{d}{ds}\!\left(n\frac{d\mathbf{r}}{ds}\right)=\nabla n`, caption: 'Fermat’s variational principle and the corresponding ray equation in a graded-index medium.' },
      {
        kind: 'paragraph',
        text: String.raw`At a plane boundary, applying the stationarity condition with one point on each side gives Snell's law. Angles $\theta_1$ and $\theta_2$ are measured from the normal. If the ray attempts to leave the denser medium at too large an angle, the sine required by Snell's law would exceed one; the solution becomes an evanescent field and all energy is reflected.`,
      },
      { kind: 'math', display: true, latex: String.raw`n_1\sin\theta_1=n_2\sin\theta_2,\qquad \sin\theta_c=\frac{n_2}{n_1}\quad(n_1>n_2)`, caption: 'Snell’s law and the critical angle for total internal reflection.' },
      {
        kind: 'paragraph',
        text: String.raw`Reflection is the special case $n_2=-n_1$ in a signed convention, giving $\theta_r=\theta_i$. For a spherical surface of radius $R$ separating indices $n_1$ and $n_2$, the paraxial imaging equation follows by requiring stationary optical path to first order in ray height; it is the foundation of the lens and mirror formulae developed in *lenses-mirrors*.`,
      },
      { kind: 'math', display: true, latex: String.raw`\frac{n_1}{s}+\frac{n_2}{s'}=\frac{n_2-n_1}{R},\qquad \theta_i=\theta_r`, caption: 'Paraxial refraction at a spherical surface, with object distance s and image distance s prime.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Refraction and total internal reflection at glass',
        items: [
          { title: 'Refraction from air into glass', text: 'A ray in air meets a glass surface with n = 1.50 at 30 degrees to the normal. Snell’s law determines the internal angle.', math: String.raw`\sin\theta_2=\frac{1.00}{1.50}\sin 30^\circ=\frac{0.5}{1.5}=0.333\ \Rightarrow\ \theta_2=19.5^\circ` },
          { title: 'Find the critical angle', text: 'For the reverse journey, glass to air, there is a largest angle that can escape.', math: String.raw`\theta_c=\arcsin\!\left(\frac{1.00}{1.50}\right)=41.8^\circ` },
          { title: 'Test a larger angle', text: 'A ray inside the glass at 50 degrees cannot satisfy Snell’s law for a propagating refracted ray.', math: String.raw`1.50\sin 50^\circ=1.15>1\quad\Rightarrow\quad\text{total internal reflection}` },
          { title: 'Interpret the result', text: 'The reflected ray leaves at 50 degrees on the other side of the normal, consistent with the equal-angle law.', math: String.raw`\theta_{\mathrm{refl}}=50^\circ` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Rays fail where diffraction matters',
        text: 'Ray optics cannot describe interference, diffraction or the finite penetration of an evanescent field beyond a totally reflecting interface. It also ignores the wavelength dependence of the refractive index, which produces chromatic aberration and rainbows.',
      },
      {
        kind: 'list',
        items: [
          'Short-wavelength limit: aperture and feature sizes must greatly exceed the wavelength.',
          'Local, slowly varying n; abrupt changes are handled as abrupt interfaces.',
          'Incoherent or broadband light is assumed when intensities are added rather than amplitudes.',
          'Isotropic media; crystals with birefringence split rays into ordinary and extraordinary branches.',
          'Paraxial formulas require small angles; spherical and coma aberrations appear at large aperture.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Willebrord Snellius formulated the refraction law in 1621, and René Descartes published an equivalent form in 1637. Pierre de Fermat stated his stationary-time principle in 1657 and derived the equal-angle law of reflection from it. Hippolyte Fizeau used a toothed wheel in 1849 to measure the speed of light through air, and Léon Foucault's 1850 rotating-mirror experiment found light slower in water than in air, confirming the index interpretation against the competing emission theory. Michelson's later rotating-mirror measurements refined the value of $c$. Total internal reflection is demonstrated daily by prisms and by light trapped in a stream of water, the experiment popularised by John Tyndall in the 1870s.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Rays are physical beams of finite width.** They are an idealisation of direction; real beams diffract and cannot be focused to a mathematical point.',
          '**Light always takes the shortest path.** It takes a stationary-time path, which can be a maximum or saddle in focusing systems.',
          '**Refraction occurs because light slows down uniformly across the beam.** It occurs because one side of the wavefront slows before the other, rotating the front.',
          '**Total internal reflection requires a mirror coating.** It relies only on the index contrast and occurs at a clean dielectric interface.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Geometrical optics is the short-wavelength limit of *physical-optics* and *wave-motion*, and its imaging rules are applied in *lenses-mirrors*. Refraction at interfaces is treated microscopically in *dielectrics* and *reflection-refraction*; the ray equation resembles the Hamilton–Jacobi formulation in *hamilton-jacobi*. Guided rays under repeated total reflection lead to *fiber-optics*, and the least-time principle reappears as the classical limit of *path-integral-formulation*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Camera and telescope design: ray tracing predicts image position, distortion and aberration.',
          'Prism and periscope optics: total internal reflection redirects light with almost no loss.',
          'Atmospheric mirages: temperature-dependent refractive index bends rays along curved paths.',
          'Computer graphics: path tracing renders images by following rays and applying Snell’s law at surfaces.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 3*, chapter 25 on geometric optics.',
          'The Feynman Lectures on Physics volume I, chapter 26 on optics (free online).',
          'MIT OpenCourseWare 8.02, lectures on electromagnetic waves and reflection and refraction.',
        ],
      },
      {
        kind: 'table', headers: ['Situation', 'Governing rule', 'Key condition'], rows: [
          ['Plane interface', String.raw`$n_1\sin\theta_1=n_2\sin\theta_2$`, 'Angles from normal'],
          ['Plane mirror', String.raw`$\theta_i=\theta_r$`, 'Stationary optical path'],
          ['Dense to rare interface', String.raw`$\theta_c=\arcsin(n_2/n_1)$`, 'Incidence above critical angle'],
          ['Graded-index medium', String.raw`$d(n\,d\mathbf{r}/ds)/ds=\nabla n$`, 'Smooth spatial variation of n'],
        ] },
    ],
  },
  {
    id: 'physical-optics',
    title: 'Physical optics',
    branchId: 'optics',
    level: 'Undergraduate 2',
    summary: 'Physical optics keeps the wave nature of light: Huygens–Fresnel propagation explains diffraction, interference, the Airy spot and the finite resolving power of every imaging system.',
    prerequisites: ['wave-motion', 'superposition-interference', 'diffraction', 'geometrical-optics'],
    tags: ['Huygens–Fresnel', 'diffraction', 'Airy disk', 'resolution limit'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Physical optics goes beyond rays by treating every point of a wavefront as a secondary source. This Huygens–Fresnel construction makes light bend around apertures, interfere with itself and produce a finite-sized focal spot even for a perfect lens. The subject is the bridge between ray optics, where images are geometric points, and wave optics, where the image of a point source is an Airy pattern whose width sets the ultimate resolution of a telescope or microscope.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Imagine a slit as a row of tiny emitters all oscillating in phase. At the centre of the screen their path lengths are nearly equal and the contributions add. At an oblique angle the path differences accumulate across the slit; when the difference between the two edges equals one wavelength, pairs of emitters separated by half the slit cancel exactly, producing the first dark fringe. The same cancellation in two dimensions at a circular aperture gives the Airy disk: a bright central spot surrounded by faint rings.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The result is that no optical instrument can form a perfect point image. Two point sources are resolved only when their Airy patterns are sufficiently separated, conventionally when the centre of one falls at the first minimum of the other, the Rayleigh criterion. Increasing the aperture diameter shrinks the diffraction spot, which is why astronomical telescopes are built ever larger and why a microscope needs a high numerical aperture.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'The brighter the focus, the smaller it must be',
        text: String.raw`Diffraction imposes a trade-off between angular concentration and aperture: $\theta\sim\lambda/D$. This is the optical analogue of the quantum uncertainty relation between position and transverse momentum. A lens cannot cheat this limit by better polishing; only a shorter wavelength or a larger aperture can improve resolution.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Huygens–Fresnel principle**: each wavefront element radiates a secondary wave; the field at a point is their coherent sum.`,
          String.raw`**Fresnel vs Fraunhofer regimes**: near-field diffraction with curved wavefronts versus far-field diffraction with plane waves and a Fourier relation.`,
          String.raw`**Single-slit minima**: $a\sin\theta=m\lambda$ for integer $m$, from pairwise cancellation across the slit.`,
          String.raw`**Airy pattern**: the two-dimensional diffraction pattern of a circular aperture, with first zero at $1.22\lambda/D$.`,
          String.raw`**Rayleigh criterion**: two incoherent point sources are just resolved at angular separation $1.22\lambda/D$.`,
          String.raw`**Fresnel zones**: concentric annular regions whose contributions alternate in phase, a tool for estimating on-axis intensity.`,
          String.raw`**Diffraction-limited imaging**: performance limited by wave diffraction rather than by aberrations or detector quality.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $U(Q)$ be the complex field at a point $Q$ on an aperture surface $S$, $r=|P-Q|$ the distance to the observation point, $k=2\pi/\lambda$ the wavenumber and $K(\chi)$ an inclination factor. The Huygens–Fresnel integral superposes the secondary contributions with the correct phase delay; it is the scalar diffraction approximation to Maxwell's equations.`,
      },
      { kind: 'math', display: true, latex: String.raw`U(P)=\frac{1}{i\lambda}\int_S U(Q)\,\frac{e^{ikr}}{r}\,K(\chi)\,dS`, caption: 'Scalar Huygens–Fresnel diffraction integral; K(chi) is the obliquity factor.' },
      {
        kind: 'paragraph',
        text: String.raw`For a slit of width $a$ the far-field amplitude is the Fourier transform of a rectangular transmission. The intensity has minima when the path difference across the full width equals an integer number of wavelengths; the central maximum has angular width $2\lambda/a$. A double slit multiplies this envelope by a two-source interference factor.`,
      },
      { kind: 'math', display: true, latex: String.raw`a\sin\theta=m\lambda\ (m\neq0),\qquad I(\theta)=I_0\left[\frac{\sin\beta}{\beta}\right]^2\cos^2\!\left(\frac{\pi d\sin\theta}{\lambda}\right),\quad \beta=\frac{\pi a\sin\theta}{\lambda}`, caption: 'Single-slit minima and the combined single-slit envelope with double-slit fringes.' },
      {
        kind: 'paragraph',
        text: String.raw`For a circular aperture the Fourier transform involves a Bessel function, and the first zero of the intensity occurs when the argument of $J_1$ reaches 3.832. This yields the Airy criterion $\sin\theta=1.22\lambda/D$, where $D$ is the aperture diameter. In a microscope the equivalent statement uses the numerical aperture $\mathrm{NA}=n\sin\alpha$, giving a lateral resolution of order $\lambda/(2\,\mathrm{NA})$.`,
      },
      { kind: 'math', display: true, latex: String.raw`\sin\theta_{\min}=1.22\,\frac{\lambda}{D},\qquad \Delta x\approx\frac{\lambda}{2\,\mathrm{NA}}`, caption: 'Rayleigh criterion for a circular aperture and the microscope resolution limit.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Diffraction limit of a telescope',
        items: [
          { title: 'State the aperture and wavelength', text: 'A telescope mirror of diameter 2.0 m observes yellow-green light at 550 nm.', math: String.raw`D=2.0\ \mathrm{m},\qquad \lambda=550\times10^{-9}\ \mathrm{m}` },
          { title: 'Apply the Airy criterion', text: 'The first diffraction minimum sets the angular resolution in radians.', math: String.raw`\theta_{\min}=1.22\frac{\lambda}{D}=1.22\frac{550\times10^{-9}}{2.0}=3.36\times10^{-7}\ \mathrm{rad}` },
          { title: 'Convert to arcseconds', text: 'One radian is 206265 arcseconds, so the resolution is readily compared with atmospheric seeing.', math: String.raw`\theta_{\min}=3.36\times10^{-7}\times206265=0.069\ \mathrm{arcsec}` },
          { title: 'Interpret', text: 'This is the diffraction limit; ground-based turbulence usually gives about 1 arcsec unless adaptive optics is used.', math: String.raw`\text{resolution limit}\approx0.07''\ \text{(diffraction)}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Scalar theory is an approximation',
        text: 'The Huygens–Fresnel integral ignores polarisation and treats the field as a scalar. It works well for paraxial propagation through modest apertures but fails for tightly focused beams, high-contrast gratings and sub-wavelength structures, where full vector Maxwell solutions are required.',
      },
      {
        kind: 'list',
        items: [
          'Scalar, paraxial approximation; large numerical apertures need a vector treatment.',
          'Coherent monochromatic illumination; broadband light washes out high-order fringes.',
          String.raw`Fraunhofer formulas require the far-field condition $D^2/(\lambda L)\ll1$.`,
          'Perfect aperture and optics; aberrations and surface errors degrade the ideal Airy pattern.',
          'Incoherent sources assumed in the Rayleigh resolution criterion.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Thomas Young's 1801 double-slit experiment demonstrated interference of light and provided the first direct measurement of optical wavelengths. Augustin Fresnel's diffraction work from 1815 and his wavefront construction predicted an unexpected bright spot at the centre of the shadow of a circular obstacle; Siméon Poisson derived it as a reductio ad absurdum, but François Arago observed it in 1818, a decisive victory for the wave theory. The Airy pattern was characterised geometrically by George Airy in 1835. Michelson's stellar interferometer on Mount Wilson in the 1920s used the same fringe visibility ideas to measure stellar angular diameters, and modern adaptive-optics and space telescopes routinely operate near the diffraction limit predicted here.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Diffraction is an imperfection of lenses.** It is a consequence of wave propagation and cannot be eliminated, only shifted by changing wavelength or aperture.',
          '**A perfect lens focuses light to a point.** The focal spot is an Airy pattern of finite width.',
          '**Interference requires two separate light sources.** A single source illuminating two slits is enough, because the fields are mutually coherent.',
          '**The Rayleigh criterion is a fundamental law of nature.** It is a convenient convention; super-resolution techniques can localise emitters more precisely using additional information.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Physical optics rests on *superposition-interference* and *diffraction* and supplies the wave correction to *geometrical-optics*. Its Fourier viewpoint is formalised in *fourier-optics*, its instrument applications in *lenses-mirrors* and *interferometers*, and its grating counterpart in *diffraction-gratings*. The same mathematics describes X-ray crystallography in *x-ray-diffraction* and quantum scattering in *scattering-theory*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Astronomy: diffraction sets telescope resolution and the design of apertures and coronagraphs.',
          'Microscopy: numerical aperture and wavelength determine the resolvable detail; super-resolution methods work around the convention.',
          'Photolithography: short wavelengths and immersion optics push the diffraction limit to print smaller features.',
          'Laser beam shaping: diffraction theory predicts beam divergence and far-field profiles.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 3*, chapter 27 on wave optics.',
          'The Feynman Lectures on Physics volume I, chapters 30–33 on interference and diffraction (free online).',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, lectures on diffraction and Fourier methods.',
        ],
      },
      {
        kind: 'table', headers: ['Aperture', 'Far-field feature', 'Characteristic scale'], rows: [
          ['Single slit of width a', 'Central maximum and side lobes', String.raw`$a\sin\theta=m\lambda$`],
          ['Double slit spacing d', 'Fringes under diffraction envelope', String.raw`$d\sin\theta=m\lambda$`],
          ['Circular aperture diameter D', 'Airy disk and rings', String.raw`$1.22\lambda/D$`],
          ['Grating period d', 'Sharp angular orders', String.raw`$d\sin\theta=m\lambda$`],
        ] },
    ],
  },
  {
    id: 'lenses-mirrors',
    title: 'Lenses and mirrors',
    branchId: 'optics',
    level: 'Undergraduate 1',
    summary: 'Curved refracting and reflecting surfaces transform rays from an object point into an image point; the paraxial imaging equation, magnification and aberrations follow from Fermat’s principle.',
    prerequisites: ['geometrical-optics', 'coordinate-systems', 'algebraic-manipulation'],
    tags: ['thin lens', 'mirror equation', 'magnification', 'aberration'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`A lens or curved mirror turns a diverging bundle of rays from an object point into a converging bundle that forms an image. In the paraxial regime, where rays make small angles with the optical axis, all rays from one object point meet at one image point and the system is described by a few distances: object distance $s$, image distance $s'$, focal length $f$ and radius of curvature $R$. The simplicity of these formulas is a direct consequence of the small-angle approximation.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`A converging lens is thicker in the middle, so rays passing near the centre are delayed more than rays near the edge; the emerging wavefront is bent into a converging spherical shape. A concave mirror does the same by reflection: its curved surface changes the direction of each ray so that parallel rays meet at a focus halfway to the centre of curvature. In both cases the optical path from object to image is stationary, and for a paraboloidal mirror it is exactly equal for all rays, eliminating spherical aberration for on-axis objects.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The sign convention carries the physics. A real image is one where rays actually cross and can be caught on a screen; a virtual image is where extrapolated rays appear to originate. Magnification $m=-s'/s$ combines the size ratio with an inversion: a negative magnification means the image is upside down. A convex mirror or a diverging lens always forms a virtual, upright, reduced image, which is why it gives a wide field of view.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Why the mirror focus is at R/2',
        text: String.raw`For a spherical mirror a ray parallel to the axis is reflected toward the axis. Triangles formed by the centre of curvature and the ray show that, for small aperture, the reflected ray crosses the axis halfway between the mirror vertex and the centre. The result $f=R/2$ is an approximation: the exact crossing point drifts with ray height, which is spherical aberration.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Focal length $f$**: object at infinity images at the focal point; positive for converging systems.`,
          String.raw`**Thin-lens equation**: $1/s+1/s'=1/f$ for a lens whose thickness is negligible compared with object and image distances.`,
          String.raw`**Lensmaker formula**: $1/f=(n-1)(1/R_1-1/R_2)$ connecting material and curvature to power.`,
          String.raw`**Mirror relation**: $f=R/2$ for a spherical mirror, with the sign depending on concave or convex.`,
          String.raw`**Magnification**: $m=-s'/s=y'/y$, negative for inverted images.`,
          String.raw`**Optical power**: measured in dioptres, $P=1/f$ with $f$ in metres; lens powers add for thin lenses in contact.`,
          String.raw`**Aberrations**: spherical, chromatic, coma, astigmatism and field curvature limit real instruments.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $s$ be the object distance measured from the lens, $s'$ the image distance and $f$ the focal length, with signs chosen so that real images have positive $s'$. Tracing two paraxial rays, one through the centre and one parallel to the axis then through the focal point, gives the Gaussian imaging equation and the transverse magnification.`,
      },
      { kind: 'math', display: true, latex: String.raw`\frac{1}{s}+\frac{1}{s'}=\frac{1}{f},\qquad m=\frac{y'}{y}=-\frac{s'}{s}`, caption: 'Thin-lens imaging equation and lateral magnification.' },
     
      {
        kind: 'paragraph',
        text: String.raw`For a thin lens made of index $n$ surrounded by air, with surface radii $R_1$ and $R_2$ signed positive when the centre of curvature lies to the right, applying paraxial refraction at both surfaces gives the lensmaker formula. It shows why a more strongly curved or higher-index lens is more powerful, and why flint glass bends blue light more than crown glass: chromatic aberration arises from the wavelength dependence of $n$.`,
      },
      { kind: 'math', display: true, latex: String.raw`\frac{1}{f}=(n-1)\left(\frac{1}{R_1}-\frac{1}{R_2}\right),\qquad \frac{1}{f_{\mathrm{tot}}}=\sum_i\frac{1}{f_i}`, caption: 'Lensmaker formula and additive powers of thin lenses in contact.' },
      {
        kind: 'paragraph',
        text: String.raw`For a spherical mirror the same imaging algebra holds with $f=R/2$. Newton's form of the imaging equation uses distances $x$ and $x'$ measured from the focal points instead of the lens: $xx'=f^2$. It is often the cleanest way to reason about confocal systems and laser resonators.`,
      },
      { kind: 'math', display: true, latex: String.raw`f=\frac{R}{2},\qquad xx'=f^2`, caption: 'Focal length of a spherical mirror and Newton’s imaging relation.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Image formed by a converging lens',
        items: [
          { title: 'List the given quantities', text: 'A converging lens of focal length 10 cm has an object placed 30 cm in front of it.', math: String.raw`f=+10\ \mathrm{cm},\qquad s=+30\ \mathrm{cm}` },
          { title: 'Solve for the image distance', text: 'Rearrange the thin-lens equation and substitute.', math: String.raw`\frac{1}{s'}=\frac{1}{f}-\frac{1}{s}=\frac{1}{10}-\frac{1}{30}=\frac{2}{30}=\frac{1}{15}\ \Rightarrow\ s'=15\ \mathrm{cm}` },
          { title: 'Find the magnification', text: 'The sign of m describes the orientation of the image.', math: String.raw`m=-\frac{s'}{s}=-\frac{15}{30}=-0.50` },
          { title: 'Interpret the result', text: 'A real image 15 cm behind the lens, inverted and half the object height.', math: String.raw`\text{real, inverted, } |y'|=0.50\,y` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Paraxial optics hides five aberrations',
        text: 'The imaging equation assumes tiny ray angles and a single wavelength. Real systems suffer spherical aberration, coma, astigmatism, field curvature and distortion, plus chromatic aberration from dispersion. Achromatic doublets and aspheric or parabolic surfaces correct the dominant terms but cannot remove all of them simultaneously.',
      },
      {
        kind: 'list',
        items: [
          'Thin-lens approximation: thickness small compared with s, s prime and f.',
          'Paraxial rays: large-angle rays break the one-point-one-image correspondence.',
          'Monochromatic light: dispersion makes f wavelength-dependent.',
          'Parabolic mirror focus is exact only for on-axis parallel rays; off-axis beams show coma.',
          'Sign conventions must be applied consistently; different textbooks use different conventions.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Johannes Kepler's 1611 *Dioptrice* gave the first correct geometrical account of lens imaging and the astronomical telescope. Galileo Galilei used refracting telescopes from 1609 to observe the moons of Jupiter and the phases of Venus, demonstrating the practical power of the lens equation. Isaac Newton built a reflecting telescope in 1668 to avoid the chromatic aberration of refractors, motivated by his prism experiments. Joseph von Fraunhofer developed achromatic objectives in the early nineteenth century and used them to discover the dark solar absorption lines that now bear his name. Modern interferometric testing of telescope mirrors confirms the predicted focus and measures residual aberrations at the nanometre scale.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**A converging lens always forms a real image.** An object inside the focal length produces a magnified virtual image, as a magnifying glass does.',
          '**A concave lens cannot form an image.** It forms a virtual, upright, reduced image on the object side.',
          '**Increasing curvature always improves an image.** Strong curvature increases spherical and chromatic aberration unless corrected.',
          '**The focal length depends on the object position.** Focal length is a property of the optical element and the surrounding medium, not of the object.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Lenses and mirrors apply the ray rules of *geometrical-optics*, and their finite resolution is set by *physical-optics*. The material dependence enters through *dielectrics* and *dispersion*, and achromatic design is an optimisation problem in *optimization*. Mirror resonators built from these elements are central to *lasers* and *interferometers*, while the eye as an optical system is studied in *physics-of-living-systems*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Eyeglasses and contact lenses: optical power in dioptres corrects refractive errors.',
          'Camera and microscope objective design: multi-element groups cancel aberrations.',
          'Reflecting telescopes: large mirrors avoid chromatic aberration and are lighter than equivalent lenses.',
          'Projection and imaging systems: magnification and working distance determined by the lens equation.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 3*, sections 25.7–25.8 on image formation by lenses and mirrors.',
          'The Feynman Lectures on Physics volume I, chapter 26, Optics (free online).',
          'MIT OpenCourseWare 2.71 Optics lecture notes on aberrations and lens design.',
        ],
      },
      {
        kind: 'table', headers: ['Element', 'Focal length sign', 'Image for distant object', 'Typical use'], rows: [
          ['Convex lens', 'Positive', 'Real and inverted', 'Camera, projector'],
          ['Concave lens', 'Negative', 'Virtual and upright', 'Beam expander, eyeglasses'],
          ['Concave mirror', 'Positive', 'Real and inverted', 'Telescope, solar concentrator'],
          ['Convex mirror', 'Negative', 'Virtual and upright', 'Vehicle side mirror'],
        ] },
    ],
  },
  {
    id: 'fiber-optics',
    title: 'Fiber optics',
    branchId: 'optics',
    level: 'Undergraduate 2',
    summary: 'A textile optical fibre guides light by total internal reflection; its numerical aperture, mode count, attenuation windows and dispersion determine the information capacity of a link.',
    prerequisites: ['geometrical-optics', 'reflection-refraction', 'wave-motion'],
    tags: ['numerical aperture', 'guided modes', 'attenuation', 'optical communication'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`An optical fibre is a cylindrical dielectric waveguide: a core of refractive index $n_1$ surrounded by cladding of slightly lower index $n_2$. Light launched within an acceptance cone is trapped by total internal reflection at the core–cladding boundary and can travel tens of kilometres. The same structure that makes guiding possible also sets the limits: the fibre supports a finite number of transverse modes, attenuates light by scattering and absorption, and broadens pulses through dispersion.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`In a step-index fibre the refractive index jumps abruptly at the core boundary. A ray striking that boundary above the critical angle is reflected and zigzags down the fibre; a ray below it leaks into the cladding and is lost. The largest external angle that still leads to guiding is the acceptance angle, whose sine is the numerical aperture. Rays entering at steeper angles follow longer zigzag paths and arrive later, which is modal dispersion and is the dominant bandwidth limit of multimode fibre.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`A wave description refines the picture. The transverse field must form a standing pattern that reproduces itself after each reflection, so only discrete guided modes exist. The normalised frequency $V=(2\pi a/\lambda)\,\mathrm{NA}$ counts them: when $V<2.405$ only the fundamental mode survives and the fibre is single-mode, eliminating modal dispersion. Graded-index fibres instead progressively reduce the index outward, so off-axis rays travel faster in the low-index outer region and arrive with the axial ray.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Why 1550 nm became the telecommunications wavelength',
        text: String.raw`Silica fibre has a local attenuation minimum near 1550 nm of about 0.2 dB/km, limited mainly by Rayleigh scattering that falls as $\lambda^{-4}$; the 1310 nm window has near-zero chromatic dispersion. The choice of operating wavelength is a compromise between loss and pulse spreading, not an arbitrary convention.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Core and cladding**: concentric regions with $n_1>n_2$; the index step confines the mode.`,
          String.raw`**Numerical aperture**: $\mathrm{NA}=\sqrt{n_1^2-n_2^2}$ for air launch, equal to $\sin\theta_{\max}$.`,
          String.raw`**Guided modes**: field patterns satisfying the transverse resonance condition; approximately $V^2/2$ in a multimode step-index fibre.`,
          String.raw`**Single-mode condition**: $V<2.405$ for a step-index fibre of core radius $a$.`,
          String.raw`**Attenuation**: expressed in dB/km, with Rayleigh scattering $\propto\lambda^{-4}$ and infrared absorption at long wavelengths.`,
          String.raw`**Modal and chromatic dispersion**: path-length differences between modes and wavelength-dependent group velocity.`,
          String.raw`**Bend loss**: curvature makes the guided mode radiate when the bend radius is too small.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $n_1$ and $n_2$ be core and cladding indices and let the outside medium be air with $n_0\simeq1$. Applying Snell's law at the fibre face and requiring total internal reflection at the core boundary gives the numerical aperture and the half-angle of the acceptance cone.`,
      },
      { kind: 'math', display: true, latex: String.raw`\mathrm{NA}=n_0\sin\theta_{\max}=\sqrt{n_1^2-n_2^2},\qquad \theta_c=\arcsin\frac{n_2}{n_1}`, caption: 'Numerical aperture, acceptance angle and the critical angle at the core boundary.' },
     
      {
        kind: 'paragraph',
        text: String.raw`The wave nature of light quantises the allowed transverse patterns. The normalised frequency compares core size and wavelength with the index contrast; below a threshold there is a single mode, above it many. For a step-index fibre the number of guided modes is roughly $V^2/2$, and a parabolic graded-index profile reduces intermodal delay dramatically.`,
      },
      { kind: 'math', display: true, latex: String.raw`V=\frac{2\pi a}{\lambda}\,\mathrm{NA},\qquad N_{\mathrm{modes}}\approx\frac{V^2}{2},\qquad a<\frac{2.405\lambda}{2\pi\,\mathrm{NA}}\ \text{(single mode)}`, caption: 'Normalised frequency, approximate mode count and the single-mode core-radius condition.' },
      {
        kind: 'paragraph',
        text: String.raw`Power decreases exponentially along the fibre. In telecommunications the loss coefficient $\alpha$ is quoted in decibels per kilometre, so a link of length $L$ delivers $P_{\mathrm{out}}=P_{\mathrm{in}}\,10^{-\alpha L/10}$. The total information capacity is further limited by pulse broadening from group-velocity dispersion, which is described by the propagation constant $\beta(\omega)$ and its derivatives.`,
      },
      { kind: 'math', display: true, latex: String.raw`P_{\mathrm{out}}=P_{\mathrm{in}}\,10^{-\alpha L/10},\qquad \beta_2=\frac{d^2\beta}{d\omega^2}`, caption: 'Fibre attenuation in dB/km and the group-velocity dispersion parameter.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Acceptance angle and single-mode core',
        items: [
          { title: 'Compute the numerical aperture', text: 'A step-index fibre has core index 1.48 and cladding index 1.46, with air outside.', math: String.raw`\mathrm{NA}=\sqrt{1.48^2-1.46^2}=\sqrt{0.0588}=0.242` },
          { title: 'Find the acceptance half-angle', text: 'The sine of the maximum launch angle equals the numerical aperture.', math: String.raw`\theta_{\max}=\arcsin(0.242)=14.0^\circ` },
          { title: 'Set the single-mode condition', text: 'At 1550 nm the core radius must keep V below 2.405.', math: String.raw`a<\frac{2.405(1.55\ \mu\mathrm{m})}{2\pi(0.242)}=2.45\ \mu\mathrm{m}` },
          { title: 'Interpret the result', text: 'The corresponding core diameter is about 4.9 micrometres, typical of telecommunications single-mode fibre.', math: String.raw`2a\approx4.9\ \mu\mathrm{m}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'A ray picture misses the modes',
        text: 'Total internal reflection explains guiding but not the discrete mode structure, interference between modes, or the fact that a finite fraction of the mode extends into the cladding. It also fails for bend loss and for fibre gratings, where a wave or coupled-mode treatment is essential.',
      },
      {
        kind: 'list',
        items: [
          'Step-index, cylindrical and uniform fibre assumed; real fibres have index perturbations and ovality.',
          'Weak guidance: n1 and n2 are close, justifying the linearly polarised mode approximation.',
          'Linear propagation; at high power Kerr nonlinearity and stimulated scattering become important.',
          'No microbending or macrobending; curvature introduces additional loss.',
          'Attenuation windows are material-specific; 1550 nm applies to silica, not to all fibre compositions.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`John Tyndall demonstrated in the 1870s that light could be guided along a stream of water by total internal reflection, a public lecture demonstration of the guiding principle. Charles Kao proposed in 1966 that purified glass could achieve losses low enough for long-distance communication, a prediction that earned him the 2009 Nobel Prize in Physics. Robert Maurer and colleagues at Corning produced the first low-loss silica fibre in 1970, with attenuation near 20 dB/km and soon far below. The first transatlantic fibre cable, TAT-8, entered service in 1988, and subsequent systems approached the 0.2 dB/km silica minimum near 1550 nm. Erbium-doped fibre amplifiers, developed in the late 1980s, made all-optical long-haul links practical.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Fibre light never touches the cladding.** The guided mode has an evanescent tail in the cladding; only the ideal ray picture confines it strictly.',
          '**Multimode fibre is always faster.** Single-mode fibre avoids modal dispersion and carries far more bandwidth over long distances.',
          '**Total internal reflection is lossless in practice.** Bends, impurities and imperfections cause measurable attenuation.',
          '**Higher index contrast is always better.** A large NA eases coupling but increases modal dispersion and can reduce bandwidth.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Fibre optics applies *geometrical-optics* and *total internal reflection*, while its mode structure belongs to *physical-optics* and its pulse dynamics to *dispersion*. High-power propagation connects to *nonlinear-optics* and *solitons*; the guided-wave viewpoint is shared with *photonics* and integrated waveguides. Detection and amplification link to *optoelectronics* and *lasers*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Global telecommunications: terrestrial and submarine fibre carries the majority of long-distance data traffic.',
          'Medical endoscopy: flexible bundles relay images and laser light inside the body.',
          'Fibre-optic sensors: strain, temperature and rotation measured via phase or Bragg-grating wavelength shifts.',
          'High-power laser delivery: fibres transport beam energy to cutting and welding heads.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 3*, section on total internal reflection and fibre optics.',
          'Agrawal, *Fiber-Optic Communication Systems* (Wiley) for attenuation and dispersion engineering.',
          'MIT OpenCourseWare 6.974 Guided Waves lectures on optical waveguides and modes.',
        ],
      },
      {
        kind: 'table', headers: ['Fibre type', 'Index profile', 'Dominant limitation', 'Typical use'], rows: [
          ['Multimode step-index', 'Abrupt step', 'Strong modal dispersion', 'Short links, illumination'],
          ['Multimode graded-index', 'Parabolic profile', 'Residual modal dispersion', 'Local-area networks'],
          ['Single-mode step-index', 'Abrupt step, small core', 'Chromatic dispersion', 'Long-haul telecommunications'],
        ] },
    ],
  },
  {
    id: 'fourier-optics',
    title: 'Fourier optics',
    branchId: 'optics',
    level: 'Undergraduate 3',
    summary: 'Free propagation and thin lenses perform Fourier transforms on optical fields, so diffraction, imaging and spatial filtering can be analysed with the language of spatial frequencies and transfer functions.',
    prerequisites: ['fourier-analysis', 'physical-optics', 'diffraction'],
    tags: ['spatial frequency', 'Fraunhofer diffraction', 'spatial filtering', 'optical transfer function'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Fourier optics treats a planar optical field as a sum of spatial sinusoids, each labelled by spatial frequencies $(f_x,f_y)$. A lens maps the field in its front focal plane to its Fourier transform in the back focal plane; free-space propagation multiplies each spatial-frequency component by a quadratic phase factor. Diffraction, imaging, filtering and holography then become operations on spectra rather than laborious integrals over apertures.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`A sine grating in an object produces two bright spots at the sides of the focal plane: the positive and negative diffraction orders. A finer grating produces spots farther out, so spatial frequency maps to position. An image is therefore a superposition of gratings of many spacings and orientations, and an optical system is characterised by which spatial frequencies it transmits. Removing the high-frequency components with a mask blurs fine detail; removing the low frequencies leaves edges, a technique known as spatial filtering.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The same viewpoint explains why an imaging system has a passband. A finite pupil truncates the spectrum, so the image of a point is the inverse transform of a disc: the Airy pattern. The optical transfer function, the Fourier transform of the point-spread function, quantifies how contrast falls as detail gets finer and becomes exactly zero beyond the diffraction cutoff frequency.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'A lens is an analogue Fourier computer',
        text: String.raw`Calculating a two-dimensional Fourier transform digitally costs order $N\log N$ operations; a lens performs it essentially instantly at the speed of light. This is why optical correlators and pattern recognisers were studied so intensively before digital processors became fast, and why the Fourier-optical description remains the natural language of holography.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Spatial frequency $(f_x,f_y)$**: inverse period in the transverse plane, measured in cycles per metre.`,
          String.raw`**Fraunhofer diffraction**: the far-field amplitude is the Fourier transform of the aperture transmission.`,
          String.raw`**Lens Fourier transform**: the back focal plane of a lens contains the scaled transform of the front focal plane field.`,
          String.raw`**Spatial filtering**: placing a mask in a Fourier plane selectively modifies frequency components.`,
          String.raw`**Point-spread function**: the image of a point; its transform is the optical transfer function.`,
          String.raw`**Convolution theorem**: propagation through a linear system is a product in frequency space.`,
          String.raw`**Holography**: recording and reconstructing a wavefront by encoding amplitude and phase as an interference pattern.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $f(x,y)$ be a complex field across a plane and $(f_x,f_y)$ the conjugate spatial frequencies. The two-dimensional Fourier transform decomposes the field into plane-wave components; its inverse reconstructs the field. In optics the spatial frequencies are related to the propagation angles by $f_x=\sin\theta_x/\lambda$.`,
      },
      { kind: 'math', display: true, latex: String.raw`F(f_x,f_y)=\iint f(x,y)e^{-i2\pi(f_xx+f_yy)}\,dx\,dy,\qquad f_x=\frac{\sin\theta_x}{\lambda}`, caption: 'Two-dimensional spatial Fourier transform and its link to propagation angle.' },
     
      {
        kind: 'paragraph',
        text: String.raw`In the Fraunhofer regime the field at distance $z$ is proportional to the transform of the aperture evaluated at $f_x=x/(\lambda z)$, up to a quadratic phase factor. A thin lens of focal length $F$ cancels that phase in its back focal plane, giving an exact scaled Fourier transform with scale factor $\lambda F$.`,
      },
      { kind: 'math', display: true, latex: String.raw`U_{\mathrm{focal}}(x,y)\propto F\!\left(\frac{x}{\lambda F},\frac{y}{\lambda F}\right)`, caption: 'Field in the back focal plane of a lens: a scaled Fourier transform.' },
      {
        kind: 'paragraph',
        text: String.raw`For a coherent imaging system the image is the convolution of the object with the amplitude point-spread function. In frequency space this becomes multiplication by the pupil function, so the cutoff spatial frequency for a circular pupil of diameter $D$ is $f_c=D/(\lambda F)=\mathrm{NA}/\lambda$. For incoherent imaging the contrast transfer extends to twice that value but with rapidly declining contrast.`,
      },
      { kind: 'math', display: true, latex: String.raw`U_{\mathrm{img}}=U_{\mathrm{obj}}*h,\qquad \mathcal{F}\\{U_{\mathrm{img}}\\}=F_{\mathrm{obj}}\cdot H,\qquad f_c=\frac{\mathrm{NA}}{\lambda}`, caption: 'Convolution imaging, its Fourier-domain product and the coherent cutoff frequency.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Diffraction orders of a grating in a focal plane',
        items: [
          { title: 'Specify the grating and lens', text: 'A transmission grating has period 10 micrometres and is illuminated at 500 nm. A lens of focal length 0.5 m forms its Fourier transform.', math: String.raw`d=10\times10^{-6}\ \mathrm{m},\quad \lambda=500\times10^{-9}\ \mathrm{m},\quad F=0.5\ \mathrm{m}` },
          { title: 'Find the diffraction angle', text: 'The first order satisfies the grating equation with m = 1.', math: String.raw`\sin\theta_1=\frac{\lambda}{d}=\frac{500\times10^{-9}}{10\times10^{-6}}=0.05\ \Rightarrow\ \theta_1\approx2.86^\circ` },
          { title: 'Map angle to focal-plane position', text: 'The Fourier relationship places the order at x = F tan(theta), approximately F sin(theta) for small angles.', math: String.raw`x_1\approx F\frac{\lambda}{d}=0.5\times0.05=0.025\ \mathrm{m}=2.5\ \mathrm{cm}` },
          { title: 'Check the spatial frequency', text: 'The corresponding spatial frequency is the reciprocal of the grating period.', math: String.raw`f_x=\frac{x_1}{\lambda F}=\frac{0.025}{(500\times10^{-9})(0.5)}=1.0\times10^5\ \mathrm{m^{-1}}=1/d` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Coherence is essential for field transforms',
        text: 'The Fourier relation applies to the complex field, not directly to intensity. With spatially incoherent light the measured intensity is a sum of shifted transforms and the simple spatial-filtering picture fails. Scalar and paraxial assumptions also restrict the treatment to moderate numerical apertures.',
      },
      {
        kind: 'list',
        items: [
          'Coherent monochromatic illumination assumed for field-based Fourier analysis.',
          'Paraxial approximation; large-angle diffraction requires the exact direction cosine sin(theta)/lambda.',
          'Thin lens and finite pupil; real lenses add phase errors and vignetting.',
          'Fraunhofer condition for the far-field transform; finite distances introduce Fresnel phase factors.',
          'Scalar field; polarisation and vector diffraction matter at high NA.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Ernst Abbe's 1873 theory of the microscope explained image formation as the interference of diffraction orders collected by the objective and led to the resolution limit expressed through numerical aperture. Albert Porter demonstrated spatial filtering experimentally in 1906 by placing masks in the diffraction plane of a microscope and showing how the image changed. The Fourier-transforming property of lenses underlies Dennis Gabor's 1948 holography proposal and was verified as holographic reconstruction techniques developed. Modern optical correlators and Fourier-transform spectrometers are direct engineering confirmations of the same relationship.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**The Fourier plane contains an image.** It contains the spatial-frequency spectrum; a second lens or transform is needed to reconstruct the image.',
          '**High spatial frequencies are always noise.** They encode edges and fine detail; removing them blurs the image.',
          '**Fourier optics only applies to lenses.** Free-space propagation itself is a linear filter and is described by the same transfer-function formalism.',
          '**The cutoff frequency can be beaten by better detectors.** Detection cannot recover spatial frequencies never transmitted by the pupil without extra prior information.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Fourier optics is the optical application of *fourier-analysis* and the natural extension of *physical-optics* and *diffraction*. Its transfer functions mirror linear systems in *differential-equations* and signal processing, and its spatial-frequency cutoff is the optical counterpart of the resolution discussion in *lenses-mirrors*. Holography connects to *interferometers* and coherent detection in *photonics*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Microscopy: contrast methods such as phase contrast and dark field are spatial filters.',
          'Machine vision: optical correlators perform pattern matching at line rates.',
          'Holography and data storage: complex wavefields are encoded and retrieved in Fourier space.',
          'Lithography: aerial-image synthesis and pupil engineering rely on Fourier analysis of the mask spectrum.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'Goodman, *Introduction to Fourier Optics* (Roberts and Company) — the standard text; use library or author-approved resources.',
          'MIT OpenCourseWare 2.71 Optics, lecture notes on Fourier optics and spatial filtering.',
          'OpenStax, *University Physics Volume 3*, chapter 27 for the underlying diffraction concepts.',
        ],
      },
      {
        kind: 'table', headers: ['Operation', 'Real-space action', 'Fourier-space action'], rows: [
          ['Free propagation', 'Diffraction integral', 'Multiply by quadratic phase'],
          ['Thin lens', 'Multiply by quadratic phase', 'Fourier transform at focal plane'],
          ['Image formation', 'Convolve with point-spread function', 'Multiply by transfer function'],
          ['Spatial filtering', 'Modify image detail', 'Mask selected spatial frequencies'],
        ] },
    ],
  },
  {
    id: 'nonlinear-optics',
    title: 'Nonlinear optics',
    branchId: 'optics',
    level: 'Undergraduate 3',
    summary: 'Intense light modifies the optical response of a medium, producing frequency conversion, intensity-dependent refraction, self-focusing and four-wave mixing that are impossible at low intensity.',
    prerequisites: ['electromagnetic-waves', 'dielectrics', 'nonlinear-waves'],
    tags: ['second harmonic', 'Kerr effect', 'phase matching', 'frequency conversion'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`In ordinary optics the polarisation of a material is proportional to the electric field, so a light wave passes through unchanged apart from absorption and phase delay. At high intensity the response acquires quadratic and cubic terms. These tiny corrections accumulate over macroscopic distances and produce qualitatively new behaviour: light at one frequency generates light at another, the refractive index depends on intensity, and beams can reshape themselves.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`A quadratic term in the polarisation behaves like a driven oscillator at twice the driving frequency, analogous to a nonlinear audio amplifier producing distortion. Two photons at frequency $\omega$ can be annihilated and one photon at $2\omega$ created, conserving energy. Momentum conservation in a crystal requires phase matching: the generated wave must stay in step with the driving polarisation over the whole crystal, otherwise contributions from successive slices cancel.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The cubic Kerr effect changes the refractive index where the beam is brightest, effectively turning the beam profile into a lens. A Gaussian beam then focuses itself, competing with diffraction that tends to spread it. In time the same effect shifts the instantaneous frequency during a pulse, producing supercontinuum generation. Cubic nonlinearity also permits four-wave mixing, in which three waves combine to generate a fourth, and it underlies the optical solitons of fibre propagation.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Symmetry decides which effects exist',
        text: String.raw`Second-order nonlinearity requires a material without inversion symmetry; in a centrosymmetric medium the $\chi^{(2)}$ term vanishes identically, so no second-harmonic generation occurs in bulk silica glass. Third-order effects survive in all materials. This is why chemists and crystallographers design non-centrosymmetric crystals such as beta-barium borate for frequency conversion.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Nonlinear polarisation**: $P_i=\varepsilon_0[\chi^{(1)}_{ij}E_j+\chi^{(2)}_{ijk}E_jE_k+\chi^{(3)}_{ijkl}E_jE_kE_l+\cdots]$.`,
          String.raw`**Second-harmonic generation**: two photons at $\omega$ combine into one at $2\omega$.`,
          String.raw`**Phase matching**: $\Delta k=2k(\omega)-k(2\omega)$ must be near zero for efficient conversion.`,
          String.raw`**Pockels and Kerr effects**: linear and quadratic dependence of refractive index on applied field or intensity.`,
          String.raw`**Self-focusing and self-phase modulation**: intensity-dependent index reshapes beams and broadens spectra.`,
          String.raw`**Four-wave mixing**: $\omega_4=\omega_1+\omega_2-\omega_3$, the basis of parametric amplification.`,
          String.raw`**Critical power**: the power above which self-focusing overwhelms diffraction.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $E$ be the optical electric field, $\varepsilon_0$ the vacuum permittivity and $\chi^{(n)}$ the $n$-th order susceptibility tensor. The material response is a power series in the field; symmetry determines which tensor components are nonzero. For a scalar illustration we suppress tensor indices and keep only the leading nonlinear terms.`,
      },
      { kind: 'math', display: true, latex: String.raw`P=\varepsilon_0\left(\chi^{(1)}E+\chi^{(2)}E^2+\chi^{(3)}E^3+\cdots\right)`, caption: 'Power-series expansion of the nonlinear polarisation.' },
     
      {
        kind: 'paragraph',
        text: String.raw`Driving a wave at $\omega$ through the quadratic term creates a source at $2\omega$. In a crystal of length $L$ with wavevector mismatch $\Delta k$, the generated amplitude is proportional to the integral of $e^{i\Delta k z}$, giving a sinc function whose width is set by the coherence length $\pi/|\Delta k|$. Birefringent or quasi-phase-matched designs reduce $\Delta k$ to near zero.`,
      },
      { kind: 'math', display: true, latex: String.raw`I_{2\omega}\propto L^2\,\mathrm{sinc}^2\!\left(\frac{\Delta kL}{2}\right),\qquad \Delta k=2k(\omega)-k(2\omega)`, caption: 'Second-harmonic intensity versus phase mismatch and crystal length.' },
      {
        kind: 'paragraph',
        text: String.raw`The cubic response gives an intensity-dependent refractive index $n=n_0+n_2 I$. A beam with power above the critical power collapses inward faster than diffraction can disperse it; the approximate threshold for a Gaussian beam is $P_{\mathrm{cr}}\approx0.148\lambda^2/(n_0n_2)$. The same intensity dependence imprints a time-dependent phase on an ultrashort pulse, generating new spectral components at the leading and trailing edges.`,
      },
      { kind: 'math', display: true, latex: String.raw`n=n_0+n_2 I,\qquad P_{\mathrm{cr}}\approx0.148\,\frac{\lambda^2}{n_0n_2}`, caption: 'Optical Kerr effect and the approximate critical power for self-focusing.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Efficiency of a phase-mismatched doubling crystal',
        items: [
          { title: 'Specify the mismatch and length', text: 'A nonlinear crystal of length 10 mm has a wavevector mismatch of 0.1 per millimetre for doubling.', math: String.raw`\Delta k=0.1\ \mathrm{mm^{-1}},\qquad L=10\ \mathrm{mm}` },
          { title: 'Compute the sinc argument', text: 'The relevant dimensionless phase error is half the total mismatch accumulated along the crystal.', math: String.raw`\frac{\Delta kL}{2}=\frac{0.1\times10}{2}=0.5` },
          { title: 'Evaluate the reduction factor', text: 'Convert to the reduction of generated intensity relative to perfect phase matching.', math: String.raw`\mathrm{sinc}^2(0.5)=\left(\frac{\sin 0.5}{0.5}\right)^2=\left(\frac{0.4794}{0.5}\right)^2=0.919` },
          { title: 'Interpret', text: 'About 92 percent of the ideally phase-matched intensity is obtained; the coherence length is about 31 mm.', math: String.raw`L_{\mathrm{coh}}=\frac{\pi}{|\Delta k|}=31.4\ \mathrm{mm}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Perturbative nonlinear optics has limits',
        text: 'The power-series expansion assumes the nonlinear polarisation is small compared with the linear response. At very high intensity it breaks down, and ionisation, damage and plasma formation dominate. Phase-matching formulas also assume plane waves and ignore beam walk-off, absorption and thermal effects.',
      },
      {
        kind: 'list',
        items: [
          'Weak nonlinearity: chi-squared and chi-cubic terms treated as perturbations.',
          'Monochromatic or slowly varying envelope fields; ultrashort pulses require full spectral treatment.',
          'No depletion of the pump for simple conversion formulas; at high efficiency depletion must be included.',
          'Plane-wave phase matching; focused beams introduce angular spread and walk-off.',
          'Material transparency assumed; multiphoton absorption and damage impose practical intensity limits.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`John Kerr reported the quadratic electro-optic effect in 1875, and Friedrich Pockels described the linear electro-optic effect in 1893, establishing that external fields can control refractive index. Peter Franken and co-workers demonstrated second-harmonic generation in quartz in 1961, the founding experiment of nonlinear optics. Nicolaas Bloembergen and colleagues formulated phase matching in 1962, making efficient frequency conversion practical. Optical self-focusing and self-trapping were observed in liquids in the 1960s, and optical parametric oscillators were demonstrated soon after. These effects are now routine in laser laboratories and commercial systems.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Any bright light generates harmonics.** Only media with the appropriate nonzero susceptibility and good phase matching convert efficiently.',
          '**Frequency conversion creates energy from nothing.** Photon energy is conserved; two lower-energy photons combine into one higher-energy photon.',
          '**Phase matching is only a technical detail.** Without it, different parts of the crystal generate waves that cancel, and conversion is tiny.',
          '**Self-focusing means the beam is attracted to itself.** The index profile created by the beam acts as a graded-index lens.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Nonlinear optics is the optical counterpart of *nonlinear-waves* and depends on material response described in *dielectrics*. The envelope equation it generates is the one used for *solitons*, and propagation in waveguides links it to *fiber-optics* and *photonics*. Quantum descriptions of the generated photons belong to *quantum-optics*, and frequency-conversion processes are an instance of parametric interactions studied in *light-matter-interaction*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Laser frequency conversion: green laser pointers double 1064 nm light to 532 nm.',
          'Ultrafast science: supercontinuum sources and pulse compression rely on Kerr spectral broadening.',
          'Telecommunications: four-wave mixing and parametric amplifiers enable wavelength conversion.',
          'Quantum light sources: spontaneous parametric down-conversion produces entangled photon pairs.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'Boyd and Kleinman, foundational papers on nonlinear optics are available through historical journal archives.',
          'MIT OpenCourseWare 6.974 and 5.74 lecture notes cover nonlinear optical processes.',
          'OpenStax, *University Physics Volume 3*, for background on electromagnetic waves in matter.',
        ],
      },
      {
        kind: 'table', headers: ['Process', 'Susceptibility', 'Frequency relation'], rows: [
          ['Second-harmonic generation', String.raw`$\chi^{(2)}$`, String.raw`$2\omega=\omega+\omega$`],
          ['Sum-frequency generation', String.raw`$\chi^{(2)}$`, String.raw`$\omega_3=\omega_1+\omega_2$`],
          ['Kerr effect', String.raw`$\chi^{(3)}$`, 'Same frequency, index shifted'],
          ['Four-wave mixing', String.raw`$\chi^{(3)}$`, String.raw`$\omega_4=\omega_1+\omega_2-\omega_3$`],
        ] },
    ],
  },
  {
    id: 'quantum-optics',
    title: 'Quantum optics',
    branchId: 'optics',
    level: 'Undergraduate 4',
    summary: 'Quantum optics treats the electromagnetic field itself as quantised: photon number states, coherent and squeezed light, intensity correlations and two-photon interference reveal behaviour with no classical analogue.',
    prerequisites: ['photoelectric-effect', 'quantum-harmonic-oscillator', 'electromagnetic-waves', 'probability-theory'],
    tags: ['photons', 'coherent states', 'antibunching', 'entanglement'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Quantum optics applies quantum mechanics to the electromagnetic field rather than only to matter. Each mode of the field is a harmonic oscillator whose excitations are photons. This viewpoint explains the granularity of light in the photoelectric effect and in single-photon counting, and it predicts states such as squeezed light whose noise is redistributed below the classical limit in one observable at the expense of another.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Anyone who has dimmed a light source knows that a detector clicks discretely, but discreteness alone does not prove field quantisation: a classical wave detected by a quantised detector also clicks. Quantum-optical evidence is subtler. A single photon at a beam splitter cannot divide between two detectors; it is detected in one or the other, and the probability of simultaneous clicks vanishes. This antibunching has no description in terms of a classical stochastic wave intensity.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`A laser field is not a fixed number of photons but a coherent superposition of number states with Poissonian statistics. It is the quantum state that most closely resembles a classical sinusoidal wave: its amplitude and phase fluctuate minimally and equally, sitting at the standard quantum limit. Squeezed states trade one fluctuation for another, and entangled photon pairs show correlations that cannot be explained by any local hidden-variable model.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Antibunching is the sharpest evidence',
        text: String.raw`For coherent light the normalised intensity correlation at zero delay is exactly one; for a thermal source it is two, because photons arrive in bunches. For a single-photon source it falls below one and can approach zero. A value of $g^{(2)}(0)<1$ is impossible for any classical field with positive intensity and is therefore a direct signature of quantised radiation.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Field modes as oscillators**: each wavevector and polarisation has its own ladder of photon-number states.`,
          String.raw`**Fock state $|n\rangle$**: an exact photon number with undefined optical phase.`,
          String.raw`**Coherent state $|\alpha\rangle$**: an eigenstate of the annihilation operator with Poisson photon statistics.`,
          String.raw`**Squeezed state**: reduced variance in one quadrature at the cost of increased variance in the conjugate quadrature.`,
          String.raw`**Second-order coherence $g^{(2)}(\tau)$**: intensity correlation that distinguishes thermal, coherent and sub-Poissonian light.`,
          String.raw`**Hong–Ou–Mandel interference**: two indistinguishable photons arriving at a beam splitter always exit together.`,
          String.raw`**Entanglement and Bell tests**: polarisation or path correlations stronger than any local classical model permits.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`For a single mode of angular frequency $\omega$, let $\hat a$ and $\hat a^\dagger$ be annihilation and creation operators obeying $[\hat a,\hat a^\dagger]=1$, and let $\hat n=\hat a^\dagger\hat a$ count photons. The Hamiltonian reproduces the field energy of a harmonic oscillator with a zero-point term that is physically measurable through the Casimir effect.`,
      },
      { kind: 'math', display: true, latex: String.raw`\hat H=\hbar\omega\left(\hat a^\dagger\hat a+\frac{1}{2}\right),\qquad \hat a|n\rangle=\sqrt{n}\,|n-1\rangle,\qquad \hat a^\dagger|n\rangle=\sqrt{n+1}\,|n+1\rangle`, caption: 'Quantised single-mode Hamiltonian and ladder-operator action.' },
     
      {
        kind: 'paragraph',
        text: String.raw`A coherent state is defined by $\hat a|\alpha\rangle=\alpha|\alpha\rangle$, with complex amplitude $\alpha$. Its photon number follows a Poisson distribution with mean and variance both equal to $\bar n=|\alpha|^2$. A thermal state instead has a geometric photon distribution and variance $\bar n(\bar n+1)$, which is why it is noisier than a laser.`,
      },
      { kind: 'math', display: true, latex: String.raw`P(n)=e^{-|\alpha|^2}\frac{|\alpha|^{2n}}{n!},\qquad \bar n=|\alpha|^2,\qquad (\Delta n)^2=\bar n`, caption: 'Poisson photon statistics of a coherent state.' },
      {
        kind: 'paragraph',
        text: String.raw`The normalised second-order correlation compares joint detection rates with what independent detections would give. Values above one indicate bunching, equal to one coherent light, below one antibunching. A perfect single-photon source gives $g^{(2)}(0)=0$; a thermal source gives two; a coherent state gives one at all delays.`,
      },
      { kind: 'math', display: true, latex: String.raw`g^{(2)}(\tau)=\frac{\left\langle \hat a^\dagger(t)\hat a^\dagger(t+\tau)\hat a(t+\tau)\hat a(t)\right\rangle}{\left\langle \hat a^\dagger\hat a\right\rangle^2}`, caption: 'Normalised intensity correlation function; g-squared at zero delay identifies photon statistics.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Photon statistics of a laser mode',
        items: [
          { title: 'Set the mean photon number', text: 'A weak coherent state has mean photon number four, corresponding to |alpha| squared equal to four.', math: String.raw`|\alpha|^2=\bar n=4` },
          { title: 'Compute the vacuum probability', text: 'The Poisson probability of detecting no photons in the mode follows from the mean.', math: String.raw`P(0)=e^{-4}=0.0183` },
          { title: 'Compute the four-photon probability', text: 'The probability of exactly four photons uses the same distribution.', math: String.raw`P(4)=e^{-4}\frac{4^4}{4!}=0.0183\times\frac{256}{24}=0.195` },
          { title: 'State the fluctuations', text: 'The variance equals the mean, so the standard deviation is the square root of four and g-squared at zero delay is one.', math: String.raw`\Delta n=\sqrt{4}=2,\qquad g^{(2)}(0)=1` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Detection is not the same as the field',
        text: 'Real photodetectors have finite quantum efficiency, dark counts and dead time, which can falsify measured antibunching unless carefully calibrated. Ideal single-mode formulas also ignore multimode structure, spectral filtering and loss, all of which degrade nonclassical correlations.',
      },
      {
        kind: 'list',
        items: [
          'Ideal detectors assumed; finite efficiency and afterpulsing distort photon statistics.',
          'Single-mode treatment; multimode fields require sums over modes and correlations between them.',
          'Losses convert nonclassical states toward classical ones and raise measured g-squared.',
          'Markovian, weakly coupled reservoirs assumed when using simple master-equation decay models.',
          'Indistinguishability required for Hong–Ou–Mandel interference; distinguishability destroys the dip.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Robert Hanbury Brown and Richard Twiss measured intensity correlations of thermal light in 1956, founding the study of photon statistics. H. Jeff Kimble, Mario Dagenais and Leonard Mandel observed antibunching in resonance fluorescence from single atoms in 1977, showing sub-Poissonian light. Alain Aspect, Jean Dalibard and Gérard Roger performed Bell tests with entangled photon pairs in 1982, closing important loopholes in earlier tests. Charles Hong, Zhe-Yu Ou and Leonard Mandel demonstrated the two-photon interference dip in 1987. Single-photon sources and squeezed light are now routinely produced and characterised using these correlation techniques.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Discrete clicks prove light is quantised.** A quantised detector clicking on a classical wave also gives clicks; nonclassical statistics are the decisive evidence.',
          '**A coherent state has exactly a fixed number of photons.** It has a Poisson distribution; only a Fock state has definite photon number.',
          '**A squeezed state is quieter in every way.** Noise is reduced in one quadrature and increased in its conjugate.',
          '**Entangled photons communicate instantly.** Correlations are stronger than classical but cannot transmit information faster than light.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Quantum optics builds on *quantum-harmonic-oscillator*, *photoelectric-effect* and *electromagnetic-waves*, and it uses the operator methods of *operators-observables* and *bra-ket*. Entangled photon experiments connect to *entanglement* and *bell-inequalities*; squeezed light is applied in *gravitational-waves* detection. Frequency conversion and pair generation are realised through *nonlinear-optics*, and applications appear in *quantum-photonics* and *quantum-information*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Quantum cryptography: single-photon and entanglement-based key distribution.',
          'Quantum computing: photonic qubits and linear-optical quantum computation.',
          'Precision metrology: squeezed light improves interference visibility beyond the shot-noise limit.',
          'Single-photon sources and detectors for quantum sensing and lidar.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 3*, chapter 29 on photons and matter waves.',
          'MIT OpenCourseWare 8.05 Quantum Physics II lecture notes on the quantized electromagnetic field.',
          'Gerry and Knight, *Introductory Quantum Optics* (Cambridge) for coherent and squeezed states.',
        ],
      },
      {
        kind: 'table', headers: ['State', 'Photon-number variance', 'g-squared at zero delay', 'Classical analogue?'], rows: [
          ['Thermal', String.raw`$\bar n(\bar n+1)$`, '2', 'Yes, chaotic wave'],
          ['Coherent (laser)', String.raw`$\bar n$`, '1', 'Yes, stable wave'],
          [String.raw`Fock $|n\rangle$`, '0', String.raw`$1-1/n$`, 'No'],
          ['Squeezed', 'Can be below mean', 'Varies', 'No'],
        ] },
    ],
  },
  {
    id: 'photonics',
    title: 'Photonics',
    branchId: 'optics',
    level: 'Undergraduate 3',
    summary: 'Photonics is the engineering of light generation, modulation, guidance and detection; semiconductor sources, waveguides, resonators and photodetectors translate optical concepts into devices.',
    prerequisites: ['quantum-optics', 'fiber-optics', 'metals-insulators-semiconductors', 'optoelectronics'],
    tags: ['optoelectronics', 'integrated photonics', 'photodetectors', 'ring resonators'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Photonics is to light what electronics is to charge: it is the discipline of generating, controlling, transporting and detecting photons in engineered structures. Its building blocks are semiconductor light emitters, waveguides, modulators, resonators, switches and photodetectors. The subject sits at the intersection of quantum mechanics, solid-state physics and electromagnetic wave theory, and it underpins optical communication, sensing and displays.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`A light-emitting diode converts electrical injection into photons when electrons recombine across a semiconductor band gap, so the emitted wavelength is set by the gap energy. A laser diode adds optical feedback in a cavity to make the emission coherent and directional. At the receiving end a photodiode absorbs photons and produces carriers, giving a current proportional to incident optical power; the proportionality constant is the responsivity.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`Guiding and filtering light on a chip uses the same index-contrast physics as optical fibre but at micrometre dimensions. A ring resonator admits only wavelengths whose round-trip phase is a multiple of $2\pi$, so it acts as a narrow-band filter or a sensitive sensor: changing the effective index shifts the resonance. Photonic crystals add a periodic index modulation that opens a band gap, forbidding propagation in a range of wavelengths and enabling precise control of light paths.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Detection efficiency is set by wavelength and material',
        text: String.raw`For an ideal photodiode each absorbed photon produces one electron–hole pair, so the responsivity grows linearly with wavelength until the photon energy falls below the band gap and absorption collapses. This is why silicon detectors peak near 850 nm while telecommunications at 1550 nm require indium gallium arsenide.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Light emission**: spontaneous emission in LEDs and stimulated emission in laser diodes; wavelength set by band gap.`,
          String.raw`**Responsivity**: photocurrent per incident optical power, $R=\eta q/(h\nu)$, in amperes per watt.`,
          String.raw`**Waveguide confinement**: index contrast creates guided transverse modes in planar or channel structures.`,
          String.raw`**Ring resonator**: resonance condition $m\lambda=n_{\mathrm{eff}}L$ and free spectral range $\Delta\lambda\approx\lambda^2/(n_{\mathrm{eff}}L)$.`,
          String.raw`**Photonic band gap**: periodic index modulation creates a wavelength range with no propagating modes.`,
          String.raw`**Modulation**: changing carrier density or index to encode data on an optical beam.`,
          String.raw`**Integration**: combining sources, guides, modulators and detectors on a single chip.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $\eta$ be the internal quantum efficiency, $q$ the elementary charge, $h$ Planck's constant and $\nu$ the optical frequency. Each absorbed photon yields at most one collected carrier pair, so the responsivity follows from the ratio of charge to photon energy. In practical units it is $R\approx\eta\lambda(\mu\mathrm{m})/1.24$ amperes per watt.`,
      },
      { kind: 'math', display: true, latex: String.raw`R=\frac{\eta q}{h\nu}=\frac{\eta q\lambda}{hc}\approx\frac{\eta\,\lambda(\mu\mathrm{m})}{1.24}\ \mathrm{A\,W^{-1}},\qquad I_{\mathrm{ph}}=R P_{\mathrm{opt}}`, caption: 'Photodiode responsivity and the resulting photocurrent.' },
     
      {
        kind: 'paragraph',
        text: String.raw`A ring or Fabry–Pérot resonator supports only those wavelengths for which an integer number of wavelengths fits into the round trip using the effective index $n_{\mathrm{eff}}$ and round-trip length $L$. The spacing between adjacent resonances is the free spectral range; a large index or a long cavity gives closely spaced channels, which is useful for dense wavelength-division multiplexing.`,
      },
      { kind: 'math', display: true, latex: String.raw`m\lambda=n_{\mathrm{eff}}L\ \Rightarrow\ \lambda_m=\frac{n_{\mathrm{eff}}L}{m},\qquad \Delta\lambda\approx\frac{\lambda^2}{n_{\mathrm{eff}}L}`, caption: 'Resonance condition and free spectral range of an optical ring.' },
      {
        kind: 'paragraph',
        text: String.raw`A periodic dielectric stack or photonic crystal satisfies the Bragg condition when the optical path over one period matches half a wavelength. At that point reflections from successive periods add constructively, producing a stop band. The centre wavelength is $\lambda_B=2n_{\mathrm{eff}}\Lambda$, where $\Lambda$ is the lattice period, so the band gap can be placed at a chosen wavelength by lithography.`,
      },
      { kind: 'math', display: true, latex: String.raw`\lambda_B=2n_{\mathrm{eff}}\Lambda,\qquad \Delta\lambda_{\mathrm{gap}}\approx\frac{4\lambda_B}{\pi}\frac{|n_1-n_2|}{n_1+n_2}`, caption: 'Bragg wavelength and an approximate gap width for a two-index periodic stack.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'A telecom photodiode and a ring filter',
        items: [
          { title: 'Compute the responsivity', text: 'An indium gallium arsenide photodiode has quantum efficiency 0.8 at 1.55 micrometres.', math: String.raw`R=\frac{0.8\times1.55}{1.24}=1.0\ \mathrm{A\,W^{-1}}` },
          { title: 'Find the photocurrent', text: 'An incident optical power of 1 mW produces a current of order one milliampere.', math: String.raw`I_{\mathrm{ph}}=1.0\times1.0\times10^{-3}=1.0\ \mathrm{mA}` },
          { title: 'Find the ring mode number', text: 'A ring with effective index 1.5 and round-trip length 100 micrometres resonates near 1.55 micrometres.', math: String.raw`m\approx\frac{n_{\mathrm{eff}}L}{\lambda}=\frac{1.5\times100}{1.55}=96.8\ \Rightarrow\ m=97` },
          { title: 'Compute the exact resonance and spacing', text: 'Round to the nearest integer and evaluate the free spectral range.', math: String.raw`\lambda_{97}=\frac{150}{97}=1.546\ \mu\mathrm{m},\qquad \Delta\lambda\approx\frac{1.55^2}{150}=0.016\ \mu\mathrm{m}=16\ \mathrm{nm}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Ideal device formulas ignore real imperfections',
        text: 'Responsivity assumes every absorbed photon is collected, but surface recombination, incomplete absorption and dark current reduce it. Ring formulas neglect loss, dispersion and coupling, which broaden the resonance and limit extinction. Photonic band gaps depend on precise periodicity and are sensitive to fabrication disorder.',
      },
      {
        kind: 'list',
        items: [
          'Quantum efficiency treated as wavelength-independent over a narrow band.',
          'Single-mode waveguides assumed; multimode interference complicates device response.',
          'Weak coupling and high-Q approximations for resonator formulas.',
          'Room-temperature operation assumed; temperature shifts band gaps and effective indices.',
          'No saturation or space-charge effects in the detector at high optical power.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Nick Holonyak demonstrated the first practical visible-spectrum light-emitting diode in 1962, and laser diodes were demonstrated the same year. The concept of integrated optics was articulated in the late 1960s and low-loss planar waveguides quickly followed. Eli Yablonovitch and Sajeev John independently proposed photonic band-gap materials in 1987, and three-dimensional photonic crystals were fabricated in the 1990s. Silicon photonics matured in the 2000s, leading to commercial optical transceivers that combine modulators, waveguides and detectors on a chip. Responsivity and resonator measurements are now standard characterisation tools in photonics laboratories.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Photonics is just optics with smaller components.** It adds active generation, detection and electronic control, not only miniaturisation.',
          '**A photodiode can detect any wavelength.** Detection stops when the photon energy falls below the semiconductor band gap.',
          '**A ring resonator passes all wavelengths except its resonance.** Depending on coupling design it can either pass or drop a narrow channel.',
          '**Photonic crystals are artificial atoms.** They are periodic dielectric structures whose band gap arises from Bragg interference, not from atomic electronic structure.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Photonics applies *physical-optics*, *fiber-optics* and *quantum-optics* to engineered devices. Semiconductor sources rely on *metals-insulators-semiconductors* and *light-matter-interaction*, while detectors connect to *optoelectronics*. Integrated resonators are analysed with *interferometers*, and quantum light sources and detectors lead into *quantum-photonics* and *quantum-information*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Data-centre and long-haul interconnects using integrated optical transceivers.',
          'Lidar and ranging modules with semiconductor laser sources and avalanche photodiodes.',
          'Biomedical sensing and lab-on-chip fluorescence detection.',
          'Displays, solid-state lighting and optical storage.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'MIT OpenCourseWare 6.974 Guided Waves and optical devices lecture notes.',
          'OpenStax, *University Physics Volume 3*, sections on semiconductors and photoelectric detection.',
          'Yariv and Yeh, *Photonics: Optical Electronics in Modern Communications* (Oxford) for device physics.',
        ],
      },
      {
        kind: 'table', headers: ['Device', 'Physical principle', 'Key figure of merit'], rows: [
          ['LED', 'Spontaneous recombination', 'External quantum efficiency'],
          ['Laser diode', 'Stimulated emission in cavity', 'Threshold current'],
          ['Photodiode', 'Photon absorption and carrier collection', 'Responsivity and dark current'],
          ['Ring resonator', 'Round-trip phase condition', 'Quality factor and free spectral range'],
        ] },
    ],
  },
  {
    id: 'sound-propagation',
    title: 'Sound propagation',
    branchId: 'acoustics',
    level: 'Undergraduate 1',
    summary: 'Sound is a longitudinal pressure wave whose speed is set by the stiffness and density of the medium; intensity, acoustic impedance and attenuation govern how it travels and crosses interfaces.',
    prerequisites: ['wave-motion', 'fluid-statics', 'temperature-heat'],
    tags: ['pressure waves', 'bulk modulus', 'decibel', 'acoustic impedance'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Sound in a fluid is a propagating pattern of compression and rarefaction. The particles of the medium oscillate back and forth along the direction of travel, so the wave is longitudinal. Its speed is determined by how quickly a compressed region can push on its neighbours: a stiff medium responds rapidly and a dense one responds sluggishly, giving $c=\sqrt{K/\rho}$ with $K$ the bulk modulus and $\rho$ the density.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`A piston pushing air creates a compressed layer with slightly higher pressure and density. That layer expands into the next one, passing the disturbance along while each air parcel returns close to its starting point. Because compression also raises temperature, the process in a sound wave is essentially adiabatic, not isothermal; this is why Laplace's correction introduces the ratio of specific heats $\gamma$ into the gas sound speed.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The product $\rho c$ is the characteristic acoustic impedance. It sets how much pressure is needed to drive a given particle velocity and controls reflection at boundaries: a large mismatch, such as air to water, reflects almost all incident sound. Intensity is proportional to the square of pressure amplitude, which is why the logarithmic decibel scale is used for the enormous range of audible levels.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Sound travels faster in warm air',
        text: String.raw`For an ideal gas $c=\sqrt{\gamma RT/M}$ depends on absolute temperature but not on pressure at fixed temperature, because pressure and density rise together. The roughly $0.6\ \mathrm{m\,s^{-1}}$ increase per kelvin explains why sound speed varies with altitude and why a temperature gradient in the atmosphere bends sound rays, carrying distant traffic audibly on some evenings.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Longitudinal disturbance**: particle displacement $\xi$ parallel to propagation, with pressure perturbation $\Delta p=-K\,\partial\xi/\partial x$.`,
          String.raw`**Sound speed**: $c=\sqrt{K/\rho}$ in a fluid and $c=\sqrt{\gamma RT/M}$ in an ideal gas.`,
          String.raw`**Acoustic impedance**: $Z=\rho c$, the ratio of pressure amplitude to particle velocity in a travelling wave.`,
          String.raw`**Intensity**: $I=p_{\mathrm{rms}}^2/(\rho c)$, the average energy flux in watts per square metre.`,
          String.raw`**Decibel level**: $\beta=10\log_{10}(I/I_0)$ with reference $I_0=10^{-12}\ \mathrm{W\,m^{-2}}$ near threshold at 1 kHz.`,
          String.raw`**Attenuation**: absorption from viscosity, thermal conduction and relaxation, growing with frequency.`,
          String.raw`**Reflection coefficient**: $R=\left[(Z_2-Z_1)/(Z_2+Z_1)\right]^2$ at normal incidence.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $\xi(x,t)$ be the longitudinal displacement of a fluid element, $K$ its bulk modulus and $\rho$ its equilibrium density. Combining the continuity equation with the pressure–density relation gives a wave equation for $\xi$ and hence the fundamental sound speed; the same equation holds for the pressure perturbation.`,
      },
      { kind: 'math', display: true, latex: String.raw`\frac{\partial^2\xi}{\partial t^2}=c^2\frac{\partial^2\xi}{\partial x^2},\qquad c=\sqrt{\frac{K}{\rho}},\qquad c_{\mathrm{gas}}=\sqrt{\frac{\gamma RT}{M}}=\sqrt{\frac{\gamma P}{\rho}}`, caption: 'Wave equation and sound speeds for a fluid and an ideal gas.' },
     
      {
        kind: 'paragraph',
        text: String.raw`For a plane travelling wave the pressure and particle velocity are in phase and related by the characteristic impedance, $p=\rho c\,u$. The intensity is the time average of the product of pressure and velocity, giving the pressure-squared formula. Because intensity spans roughly twelve orders of magnitude across audible sound, a logarithmic level is used.`,
      },
      { kind: 'math', display: true, latex: String.raw`p=\rho c\,u,\qquad I=\frac{p_{\mathrm{rms}}^2}{\rho c},\qquad \beta=10\log_{10}\!\left(\frac{I}{I_0}\right)`, caption: 'Plane-wave impedance relation, intensity and sound level in decibels.' },
      {
        kind: 'paragraph',
        text: String.raw`At a plane interface between media with impedances $Z_1$ and $Z_2$, continuity of pressure and particle velocity gives the amplitude reflection coefficient $(Z_2-Z_1)/(Z_2+Z_1)$; the intensity reflection coefficient is its square. This explains why an air-filled lung is a poor acoustic window and why ultrasonic gel is used to remove the air gap between transducer and skin.`,
      },
      { kind: 'math', display: true, latex: String.raw`r=\frac{Z_2-Z_1}{Z_2+Z_1},\qquad R=r^2,\qquad T=1-R\ \text{(lossless normal incidence)}`, caption: 'Reflection and transmission at a normal-incidence impedance boundary.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Speed and level of a sound wave in air',
        items: [
          { title: 'Evaluate the sound speed', text: 'Take dry air at 20 degrees Celsius, 293 K, with gamma 1.4, gas constant 8.314 and molar mass 0.02897 kg/mol.', math: String.raw`c=\sqrt{\frac{1.4\times8.314\times293}{0.02897}}=343\ \mathrm{m\,s^{-1}}` },
          { title: 'Compute intensity from pressure', text: 'A sound wave has rms pressure 1 Pa. Use air density 1.2 kg per cubic metre.', math: String.raw`I=\frac{(1\ \mathrm{Pa})^2}{1.2\times343}=2.43\times10^{-3}\ \mathrm{W\,m^{-2}}` },
          { title: 'Convert to decibels', text: 'Compare with the reference intensity of one picowatt per square metre.', math: String.raw`\beta=10\log_{10}\!\left(\frac{2.43\times10^{-3}}{10^{-12}}\right)=93.9\ \mathrm{dB}` },
          { title: 'Check by doubling pressure', text: 'Doubling rms pressure quadruples intensity and raises the level by about six decibels.', math: String.raw`\Delta\beta=10\log_{10}4=6.0\ \mathrm{dB}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'The linear acoustic equations have limits',
        text: 'The wave equation assumes small pressure perturbations and local thermodynamic equilibrium. Strong shocks violate linearity, and at very high frequencies the continuum description fails when the wavelength approaches the molecular mean free path. Humidity and relaxation processes also alter absorption, especially in air.',
      },
      {
        kind: 'list',
        items: [
          'Small-amplitude perturbations; nonlinear steepening appears for intense sound.',
          'Adiabatic compression assumed; heat conduction across thermal boundary layers causes attenuation.',
          'Homogeneous, stationary medium; wind and temperature gradients refract sound.',
          'Plane-wave impedance formula; spherical waves have geometric spreading in addition to absorption.',
          'Ideal-gas formula assumes known composition and humidity; real air has a weakly varying gamma.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Marin Mersenne measured the speed of sound in the 1630s by timing echoes over known distances. Isaac Newton's 1687 derivation gave a value about 15 percent too low because he assumed isothermal compression; Pierre-Simon Laplace corrected it in 1816 by recognising that the rapid compressions are adiabatic, introducing $\gamma$. August Kundt's 1866 dust-tube experiment measured sound speeds in different gases and confirmed the dependence on molar mass. John William Strutt, Lord Rayleigh, systematised the theory in *The Theory of Sound* (1877–1878), and modern measurements of atmospheric attenuation and speed profiles agree with the formulas above.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Sound particles travel from source to ear.** Air molecules oscillate locally; the disturbance and its energy propagate.',
          '**Sound cannot travel in a liquid or solid.** It propagates in all media; only vacuum is silent.',
          '**Louder sound travels faster.** Amplitude affects intensity, not speed, until nonlinear amplitudes are reached.',
          '**Decibels add linearly.** They are logarithmic; adding two equal incoherent sources raises the level by about 3 dB.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Sound propagation is the fluid-mechanical realisation of *wave-motion* and uses the equation of state from *temperature-heat* and *thermodynamics*. Its pressure–density relation is a compressibility property from *fluid-statics*, and high-amplitude behaviour leads to *nonlinear-acoustics*. Standing versions appear in *standing-waves* and *musical-acoustics*, generated sound in *aeroacoustics*, and medical uses in *ultrasonics*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Weather and climate: acoustic thermometry uses travel times to infer atmospheric temperature.',
          'Sonar and underwater navigation: sound speed profiles determine ray bending and detection range.',
          'Noise control and hearing safety: decibel scales set exposure limits and hearing-protection standards.',
          'Gas sensing: sound speed reveals composition through the dependence on molar mass.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 1*, chapter 17 on sound and sound intensity.',
          'The Feynman Lectures on Physics volume I, chapter 47 on sound (free online).',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, lectures on sound waves and the Doppler effect.',
        ],
      },
      {
        kind: 'table', headers: ['Medium', 'Typical speed', 'Controlling property'], rows: [
          ['Air at 20 °C', String.raw`$\approx343\ \mathrm{m\,s^{-1}}$`, String.raw`$\gamma RT/M$`],
          ['Water', String.raw`$\approx1480\ \mathrm{m\,s^{-1}}$`, String.raw`$\sqrt{K/\rho}$`],
          ['Steel (longitudinal)', String.raw`$\approx5900\ \mathrm{m\,s^{-1}}$`, 'Elastic modulus and density'],
        ] },
    ],
  },
  {
    id: 'musical-acoustics',
    title: 'Musical acoustics',
    branchId: 'acoustics',
    level: 'Undergraduate 1',
    summary: 'Musical instruments are resonant systems whose allowed standing-wave modes determine pitch, while the relative amplitudes of their harmonics determine timbre.',
    prerequisites: ['standing-waves', 'sound-propagation', 'fourier-analysis'],
    tags: ['harmonics', 'timbre', 'equal temperament', 'resonance'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Musical acoustics connects the physics of vibrating strings, air columns and resonant bodies to the perception of pitch and tone colour. A vibrating string fixed at both ends supports harmonics at integer multiples of a fundamental; an air column supports a sequence that depends on whether its ends are open or closed. The fundamental usually determines the perceived note, while the mixture of overtones gives a violin, a flute and a clarinet their distinct timbres even at the same pitch.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Plucking a string excites many normal modes at once. Each mode oscillates at its own frequency and decays at its own rate, so the sound changes with time. Because the modes form a harmonic series, the ear fuses them into a single pitch. A stiff or inharmonic oscillator, such as a bell or a piano string with significant bending stiffness, produces partials that are not exact integers and a less definite pitch.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`Wind instruments exploit resonance in air columns. An open end is a pressure node and displacement antinode; a closed end is a pressure antinode. A pipe open at both ends has all harmonics, while one closed at one end has only odd harmonics, giving the characteristic hollow sound of a stopped organ pipe. The player changes effective length with finger holes or valves, or changes the excitation frequency to jump to a higher register.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Equal temperament is a compromise, not a law of nature',
        text: String.raw`Pure intervals correspond to simple frequency ratios such as 3:2 for a fifth. Twelve-tone equal temperament instead spaces notes by the twelfth root of two, so every interval except the octave is slightly impure. This compromise allows music in every key with one fixed instrument; the small beating it introduces is a physical consequence of the chosen ratio.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**String modes**: $f_n=n v/(2L)$ with $v=\sqrt{T/\mu}$ for a flexible string fixed at both ends.`,
          String.raw`**Open and closed pipes**: all harmonics for open–open, odd harmonics only for closed–open.`,
          String.raw`**Timbre**: the relative spectrum and time envelope of partials, analysable by Fourier decomposition.`,
          String.raw`**Helmholtz resonance**: a cavity with a neck resonates at $f=(c/2\pi)\sqrt{A/(VL_{\mathrm{eff}})}$.`,
          String.raw`**Equal temperament**: adjacent semitones related by $2^{1/12}$, so $f=f_0\,2^{n/12}$.`,
          String.raw`**Beating**: slow amplitude modulation when two nearby frequencies interfere, used in tuning.`,
          String.raw`**Soundboard coupling**: a vibrating body radiates far more efficiently than a thin string alone.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`For a string of length $L$, tension $T$ and linear mass density $\mu$, the fixed-end boundary conditions permit wavelengths $2L/n$, and the wave speed converts them into frequencies. This is the physical content of Mersenne's laws: pitch rises with tension, falls with length and falls with increasing mass per unit length.`,
      },
      { kind: 'math', display: true, latex: String.raw`v=\sqrt{\frac{T}{\mu}},\qquad f_n=\frac{n}{2L}\sqrt{\frac{T}{\mu}}\quad(n=1,2,3,\ldots)`, caption: 'Wave speed and harmonic series of a stretched string.' },
     
      {
        kind: 'paragraph',
        text: String.raw`For an air column of length $L$ in a tube of small radius relative to the wavelength, the boundary conditions select the harmonic sequence. An end correction of roughly 0.6 times the tube radius effectively lengthens an open pipe. The Helmholtz resonator is a different limit, in which the air in the neck behaves as a mass and the cavity air as a spring.`,
      },
      { kind: 'math', display: true, latex: String.raw`f_n^{\mathrm{open}}=\frac{n c}{2L},\qquad f_n^{\mathrm{closed}}=\frac{(2n-1)c}{4L},\qquad f_H=\frac{c}{2\pi}\sqrt{\frac{A}{V L_{\mathrm{eff}}}}`, caption: 'Open-pipe, closed-pipe and Helmholtz resonance frequencies.' },
      {
        kind: 'paragraph',
        text: String.raw`Musical pitch is logarithmic in frequency. Equal temperament divides the octave into twelve equal semitones, so a note $n$ semitones above a reference has frequency $f_0 2^{n/12}$. The smaller unit of cents divides the semitone into a hundred steps, and the interval between two frequencies is $1200\log_2(f_2/f_1)$ cents.`,
      },
      { kind: 'math', display: true, latex: String.raw`f=f_0\,2^{n/12},\qquad \text{cents}=1200\log_2\!\left(\frac{f_2}{f_1}\right)`, caption: 'Equal-tempered frequency relation and the cents interval measure.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'String pitch and a musical interval',
        items: [
          { title: 'Compute the wave speed', text: 'A guitar string of length 0.65 m has tension 80 N and mass per unit length 0.0005 kg/m.', math: String.raw`v=\sqrt{80/0.0005}=\sqrt{160000}=400\ \mathrm{m\,s^{-1}}` },
          { title: 'Find the fundamental', text: 'The fundamental fits one half wavelength in the string length.', math: String.raw`f_1=\frac{v}{2L}=\frac{400}{1.30}=308\ \mathrm{Hz}` },
          { title: 'Compare with a tempered note', text: 'A fifth above concert A at 440 Hz is seven semitones higher.', math: String.raw`f_{\mathrm{fifth}}=440\times2^{7/12}=440\times1.498=659\ \mathrm{Hz}` },
          { title: 'Express the interval in cents', text: 'An equal-tempered fifth is 700 cents; a pure 3:2 fifth differs by about two cents.', math: String.raw`1200\log_2(3/2)=702\ \mathrm{cents}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Real strings are not ideal',
        text: 'Bending stiffness makes high partials slightly sharp, finite width changes the effective length, and damping depends on frequency and on how the string is coupled to the instrument body. The simple harmonic series is an excellent first approximation but not exact for piano strings or bells.',
      },
      {
        kind: 'list',
        items: [
          'Perfectly flexible string; stiffness produces inharmonic partials.',
          'Small amplitudes; very hard plucking excites nonlinear behaviour.',
          'Thin air column; wide tubes change the end correction and mode frequencies.',
          'Temperature affects the speed of sound and therefore wind-instrument tuning.',
          'Equal temperament is a convention; just intonation and other tunings use different ratios.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`The monochord was used in antiquity to demonstrate the relation between string length and pitch, traditionally associated with Pythagoras. Marin Mersenne published the quantitative laws for strings in 1636 and measured the speed of sound, linking pitch to frequency. Hermann von Helmholtz's resonators and his 1863 work on sensation of tone established the role of harmonics and combination tones in timbre. Modern spectrum analysis of instruments confirms the predicted harmonic series and reveals the small inharmonicity of stiff strings and the formant structure of the human voice.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Timbre is the same as pitch.** Pitch depends mainly on fundamental frequency; timbre depends on the spectrum and time evolution.',
          '**A higher harmonic means a louder note.** Harmonics can be weak or strong; the fundamental is not always the largest component.',
          '**A closed pipe has half the harmonics because it is half as long.** It has only odd harmonics because of its boundary conditions.',
          '**Equal temperament is the physically correct tuning.** It is a practical compromise; pure intervals have simpler frequency ratios.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Musical acoustics applies *standing-waves* and *sound-propagation* and analyses tone using *fourier-analysis*. Instrument bodies are resonant mechanical systems treated in *resonance* and *vibrations* in *shm*, while the voice involves flow-generated sound related to *aeroacoustics*. Perception links to *physics-of-living-systems*, and electronic instruments to *signal processing* in *fourier-optics* and *optoelectronics* analogues.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Instrument design: scaling length, tension and bore to set range and timbre.',
          'Piano and guitar setup: intonation corrections account for string stiffness.',
          'Organ building: pipe scaling and voicing control harmonic content.',
          'Speech science and audio engineering: formants and spectral envelopes shape sound quality.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 1*, sections 17.5 and 17.6 on standing sound waves and resonance.',
          'The Feynman Lectures on Physics volume I, chapter 50 on the harmonics of a vibrating string.',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, lectures on musical instruments and normal modes.',
        ],
      },
      {
        kind: 'table', headers: ['System', 'Mode sequence', 'Typical instrument'], rows: [
          ['String fixed at both ends', String.raw`$nf_1$`, 'Guitar, violin, piano'],
          ['Pipe open at both ends', String.raw`$nf_1$`, 'Flute, organ flue pipe'],
          ['Pipe closed at one end', String.raw`$(2n-1)f_1$`, 'Clarinet, stopped organ pipe'],
          ['Helmholtz resonator', 'Single dominant resonance', 'Ocarina, bottle, bass-reflex port'],
        ] },
    ],
  },
  {
    id: 'ultrasonics',
    title: 'Ultrasonics',
    branchId: 'acoustics',
    level: 'Undergraduate 2',
    summary: 'Ultrasound is sound above the human hearing range, generated by piezoelectric transducers; its short wavelength enables imaging, flaw detection, Doppler velocimetry and cavitation-mediated processing.',
    prerequisites: ['sound-propagation', 'wave-motion', 'differential-equations'],
    tags: ['piezoelectric transducer', 'pulse echo', 'Doppler', 'acoustic impedance'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Ultrasound refers to acoustic waves with frequencies above roughly 20 kHz, beyond human hearing. Because the wavelength is short, ultrasound can be formed into narrow beams and can resolve small features. It is generated and detected primarily by piezoelectric transducers, which convert an applied voltage into mechanical strain and vice versa. Medical imaging, industrial non-destructive testing and sonar all exploit the same pulse–echo principle.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`A transducer emits a short burst and then listens for echoes. The round-trip time gives the depth of a reflecting interface through $d=ct/2$; the amplitude of the echo depends on the change in acoustic impedance across that interface. In tissue, most echoes arise from small impedance differences between different structures, while in metal testing a crack presents a large impedance discontinuity. A coupling gel removes the air layer that would otherwise reflect almost all the sound at the skin boundary.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`Resolution follows wavelength. Axial resolution along the beam is about half the spatial length of the pulse, so short broadband pulses give fine detail; lateral resolution is set by the beam width and improves with aperture and focusing. Because attenuation grows with frequency, there is a trade-off: a higher frequency resolves better but penetrates less deeply, which is why abdominal imaging uses a few megahertz while skin or eye imaging can use much higher frequencies.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'The Doppler shift doubles for a reflection',
        text: String.raw`When an ultrasound pulse reflects from a moving target such as blood, the target first acts as a moving receiver and then as a moving source. Both shifts add, giving $\Delta f=2f_0 v\cos\theta/c$. Measuring this small frequency shift allows blood velocity to be mapped non-invasively, and the cosine dependence makes the angle between beam and flow a critical measurement parameter.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Piezoelectric generation**: an applied alternating voltage strains a crystal or ceramic, launching an acoustic pulse.`,
          String.raw`**Pulse–echo ranging**: depth from time of flight, $d=ct/2$.`,
          String.raw`**Axial and lateral resolution**: axial set by pulse length, lateral by beam width and focusing.`,
          String.raw`**Impedance mismatch**: echo strength from $R=\left[(Z_2-Z_1)/(Z_2+Z_1)\right]^2$.`,
          String.raw`**Attenuation**: absorption and scattering grow with frequency; time-gain compensation restores deeper echoes.`,
          String.raw`**Doppler ultrasound**: velocity from the frequency shift of backscattered sound.`,
          String.raw`**Cavitation**: growth and collapse of bubbles under negative pressure, used in cleaning and therapy but a safety concern in imaging.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $c$ be the speed of sound in the medium, $f$ the centre frequency and $\lambda=c/f$ the wavelength. A pulse containing $N$ cycles has spatial length $N\lambda$; the ability to distinguish two interfaces separated along the beam is roughly half this length.`,
      },
      { kind: 'math', display: true, latex: String.raw`\lambda=\frac{c}{f},\qquad \Delta z_{\mathrm{axial}}\approx\frac{N\lambda}{2}=\frac{Nc}{2f}`, caption: 'Wavelength and approximate axial resolution for an N-cycle pulse.' },
     
      {
        kind: 'paragraph',
        text: String.raw`Echo amplitude at a plane interface is governed by the impedance ratio. Let $Z=\rho c$ be the characteristic impedance of each medium; the intensity reflection coefficient is the squared ratio of the impedance difference to the sum. Deep echoes are weaker both from reflection losses and from attenuation, which is often modelled as an exponentially decaying amplitude with distance.`,
      },
      { kind: 'math', display: true, latex: String.raw`R=\left(\frac{Z_2-Z_1}{Z_2+Z_1}\right)^2,\qquad I(x)=I_0e^{-2\alpha x}`, caption: 'Normal-incidence reflection coefficient and exponential attenuation with depth.' },
      {
        kind: 'paragraph',
        text: String.raw`For a target moving with component $v\cos\theta$ along the beam, the round-trip Doppler shift is doubled relative to a single-pass shift. This is the basis of pulsed-wave and colour Doppler systems, which estimate local velocity from the phase change between successive echoes.`,
      },
      { kind: 'math', display: true, latex: String.raw`f_d=\frac{2f_0v\cos\theta}{c}`, caption: 'Doppler frequency shift for a reflected ultrasound beam.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Resolution and blood-flow measurement',
        items: [
          { title: 'Find the wavelength in soft tissue', text: 'A 5 MHz transducer is used with an assumed tissue sound speed of 1540 m/s.', math: String.raw`\lambda=\frac{1540}{5\times10^6}=3.08\times10^{-4}\ \mathrm{m}=0.308\ \mathrm{mm}` },
          { title: 'Estimate axial resolution', text: 'A two-cycle pulse gives a spatial pulse length of two wavelengths.', math: String.raw`\Delta z\approx\frac{2\lambda}{2}=\lambda=0.308\ \mathrm{mm}` },
          { title: 'Compute a Doppler shift', text: 'Blood moves at 0.5 m/s directly toward the transducer, so cos theta is one.', math: String.raw`f_d=\frac{2(5\times10^6)(0.5)}{1540}=3.25\times10^3\ \mathrm{Hz}` },
          { title: 'Find the echo depth', text: 'An echo returns after 100 microseconds; the path is a round trip.', math: String.raw`d=\frac{ct}{2}=\frac{1540\times100\times10^{-6}}{2}=0.077\ \mathrm{m}=7.7\ \mathrm{cm}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Speed-of-sound assumptions create image errors',
        text: 'Ultrasound scanners assume a fixed sound speed, typically 1540 m/s, to convert echo time into depth. Fat, muscle and bone differ substantially, causing displacement and focusing errors. Refraction, multiple scattering and speckle further complicate quantitative interpretation.',
      },
      {
        kind: 'list',
        items: [
          'Constant assumed sound speed; real tissue is heterogeneous and anisotropic.',
          'Plane-wave reflection formula; rough interfaces scatter in many directions.',
          'Linear propagation; high-intensity diagnostic or therapeutic beams can become nonlinear.',
          'Attenuation coefficient is frequency- and tissue-dependent, not universal.',
          'Doppler angle must be known; large errors arise when the beam is nearly perpendicular to flow.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Francis Galton invented the Galton whistle in 1876 to generate high-frequency sound and studied the upper limit of human hearing. Pierre and Jacques Curie discovered the piezoelectric effect in 1880, providing the transducer principle used in modern ultrasonic devices. Paul Langevin developed piezoelectric sonar during the First World War, using ultrasonic pulses to detect submarines. Medical ultrasound imaging developed from the 1940s and entered widespread clinical use from the 1950s and 1960s; Doppler ultrasound followed in the 1970s. Industrial ultrasonic flaw detection was established in the mid-twentieth century and remains a standard non-destructive testing method.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Ultrasound is a different kind of wave.** It is ordinary sound at high frequency; the physics changes with wavelength, not with a new mechanism.',
          '**Higher frequency always gives a better image.** It improves resolution but reduces penetration because attenuation rises with frequency.',
          '**An ultrasound image is a photograph.** It is a reconstructed map of acoustic impedance changes and assumes a sound speed.',
          '**Ultrasound is completely risk-free.** Diagnostic use has an excellent safety record, but high intensities can heat tissue and cause cavitation.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Ultrasonics applies *sound-propagation* and *wave-motion* at short wavelengths, with resonance treated in *standing-waves*. Its imaging is an inverse problem related to *fourier-optics* and *computational-methods*. High intensities lead to *nonlinear-acoustics* and cavitation, and medical applications connect to *medical-physics* and *biophysics*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Diagnostic medical imaging of the abdomen, heart, vessels and fetus.',
          'Non-destructive testing of welds, aircraft components and pipelines.',
          'Ultrasonic cleaning and emulsification driven by cavitation.',
          'Sonar, thickness gauging and high-frequency acoustic microscopy.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 1*, sections on sound intensity and ultrasound applications.',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, notes on reflection and impedance matching.',
          'Medical physics texts such as Bushberg et al., *The Essential Physics of Medical Imaging*, via institutional libraries.',
        ],
      },
      {
        kind: 'table', headers: ['Application', 'Frequency range', 'Physical constraint'], rows: [
          ['Abdominal imaging', '2–5 MHz', 'Penetration versus resolution'],
          ['Vascular Doppler', '2–10 MHz', 'Angle dependence of shift'],
          ['Ultrasonic cleaning', '20–40 kHz', 'Cavitation intensity'],
          ['Acoustic microscopy', '50 MHz and above', 'Very shallow penetration'],
        ] },
    ],
  },
  {
    id: 'architectural-acoustics',
    title: 'Architectural acoustics',
    branchId: 'acoustics',
    level: 'Undergraduate 2',
    summary: 'Room acoustics governs how sound energy decays and distributes in an enclosure: reverberation time, absorption, room modes and diffusion determine speech clarity and musical quality.',
    prerequisites: ['sound-propagation', 'standing-waves', 'statistics'],
    tags: ['reverberation', 'Sabine formula', 'room modes', 'sound absorption'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Architectural acoustics studies how enclosed spaces modify sound. Every surface reflects part of the incident energy and absorbs the rest, so a clap is followed by a decaying tail of reflections called reverberation. Too much reverberation smears speech; too little makes a room sound dry and lacks the blending that musicians and audiences expect. Room shape and surface placement also determine whether the energy is distributed evenly or concentrated in echoes and focusing spots.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Reverberation time is defined as the time for the sound energy density to fall by 60 dB, a factor of one million in energy. A large room with hard surfaces stores energy for a long time because each reflection removes only a small fraction. Adding absorptive seats, curtains or acoustic tiles increases the total absorption and shortens the decay. The contribution of a surface is its area times its absorption coefficient, summed over all materials to give the equivalent absorption area in sabins.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`At low frequencies a room behaves as a three-dimensional resonator rather than as a collection of rays. Axial modes between parallel walls produce peaks and nulls in bass response; tangential and oblique modes add further complexity. Above the frequency where the modal density becomes large, a statistical energy description becomes appropriate and the Sabine formula works well. Diffusing surfaces break up specular reflections and make the energy distribution more uniform.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Occupied seats are the main absorber',
        text: String.raw`In a concert hall an audience and upholstered seats often provide most of the total absorption, especially at mid and high frequencies. A hall designed for full occupancy can sound dramatically more reverberant when empty, which is why rehearsals use occupied-seat equivalents or electronic absorption.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Reverberation time $T_{60}$**: time for a 60 dB energy decay, predicted by Sabine's formula at high modal density.`,
          String.raw`**Equivalent absorption area**: $A=\sum_i\alpha_iS_i$ in square metres of perfect absorber.`,
          String.raw`**Absorption coefficient $\alpha$**: fraction of incident energy not reflected by a surface.`,
          String.raw`**Room modes**: eigenfrequencies of the enclosure, with axial, tangential and oblique families.`,
          String.raw`**Flutter echo and focusing**: repeated reflections between parallel surfaces or concentration by curved surfaces.`,
          String.raw`**Clarity and intelligibility**: early-to-late energy ratios quantify speech and music quality.`,
          String.raw`**Diffusion**: scattering surfaces spread reflections in direction and time.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $V$ be the room volume in cubic metres and $A$ the total equivalent absorption area in square metres. Sabine's formula follows from the rate of energy loss per reflection in a diffuse sound field and gives the reverberation time in seconds.`,
      },
      { kind: 'math', display: true, latex: String.raw`T_{60}=\frac{0.161\,V}{A},\qquad A=\sum_i\alpha_iS_i`, caption: 'Sabine reverberation formula in SI units and the definition of equivalent absorption area.' },
     
      {
        kind: 'paragraph',
        text: String.raw`For rooms with very high absorption the diffuse-field assumption breaks down, and Eyring's formula based on the mean free path between reflections is more accurate. It replaces the linear absorption sum by a logarithm of the mean absorption coefficient and performs better for heavily treated studios and anechoic chambers.`,
      },
      { kind: 'math', display: true, latex: String.raw`T_{60}=\frac{0.161\,V}{-S\ln(1-\bar\alpha)},\qquad \bar\alpha=\frac{A}{S}`, caption: 'Eyring reverberation formula for high absorption; S is the total surface area.' },
      {
        kind: 'paragraph',
        text: String.raw`At low frequencies the eigenfrequencies of a rectangular room follow from the wave equation with rigid-wall boundary conditions, where $n_x,n_y,n_z$ are non-negative integers and at most one may be zero for an axial mode. Below the Schroeder frequency, individual modes dominate and the statistical formula is unreliable.`,
      },
      { kind: 'math', display: true, latex: String.raw`f_{n_xn_yn_z}=\frac{c}{2}\sqrt{\left(\frac{n_x}{L_x}\right)^2+\left(\frac{n_y}{L_y}\right)^2+\left(\frac{n_z}{L_z}\right)^2}`, caption: 'Rectangular-room modal frequencies for rigid walls.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Reverberation time of a hall',
        items: [
          { title: 'State the room and absorption', text: 'A hall has volume 12000 cubic metres and total equivalent absorption area 750 square metres.', math: String.raw`V=12000\ \mathrm{m^3},\qquad A=750\ \mathrm{m^2}` },
          { title: 'Apply Sabine’s formula', text: 'Compute the expected 60 dB decay time.', math: String.raw`T_{60}=\frac{0.161\times12000}{750}=2.58\ \mathrm{s}` },
          { title: 'Compare with a target', text: 'A target of 1.8 seconds for amplified speech requires more absorption.', math: String.raw`A_{\mathrm{req}}=\frac{0.161\times12000}{1.8}=1.07\times10^3\ \mathrm{m^2}` },
          { title: 'Interpret the change', text: 'Additional absorption of roughly 320 square metres of perfect absorber is needed.', math: String.raw`\Delta A\approx1073-750=323\ \mathrm{m^2}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Sabine assumes a diffuse field',
        text: 'Sabine’s formula requires many overlapping modes and a nearly uniform energy density. Flat or highly absorptive rooms, strong coupling between adjacent spaces and non-uniformly distributed absorption violate these conditions and produce decay curves that are not single exponentials.',
      },
      {
        kind: 'list',
        items: [
          'Diffuse, statistically uniform sound field; fails in small or oddly shaped rooms.',
          'Absorption coefficients depend on frequency and angle of incidence.',
          'Air absorption matters at high frequencies and in large spaces.',
          'Occupancy changes absorption substantially, especially upholstered seating.',
          'Eyring improves on Sabine for high absorption but still assumes statistical uniformity.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Wallace Clement Sabine founded the field in the 1890s while solving the poor acoustics of the Fogg Art Museum at Harvard. He measured decay times with organ pipes and a stopwatch, varied the amount of absorbing material, and established the proportionality between reverberation time and volume divided by absorption. Carl Eyring published his improved formula in 1930. Leo Beranek's mid-twentieth-century studies of concert halls correlated measured reverberation and early-reflection patterns with subjective quality, and the measurement procedure is now standardised in ISO 3382.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**More absorption is always better.** Too little reverberation makes music sound lifeless; optimal values depend on room volume and use.',
          '**A larger room always reverberates longer.** It does at fixed absorption, but added seating and surfaces can offset the volume increase.',
          '**Any soft material absorbs all frequencies equally.** Thin absorbers work mainly at high frequencies; bass trapping needs depth or resonant structures.',
          '**Reverberation and echo are the same.** Reverberation is a dense decay; an echo is a distinct delayed repetition.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Architectural acoustics applies *sound-propagation*, *standing-waves* and statistical energy ideas from *statistics*. Its room modes are three-dimensional versions of the modes in *coupled-oscillators*, and its impulse-response analysis uses the convolution tools of *fourier-analysis*. Noise control relates to *aeroacoustics*; concert-hall design combines these with *musical-acoustics*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Concert hall and opera house design: balancing reverberation, clarity and spatial impression.',
          'Recording studio treatment: controlling modes, reflections and background noise.',
          'Classrooms and offices: improving speech intelligibility and reducing fatigue.',
          'Acoustic measurement standards and building codes for noise and reverberation.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 1*, sections on sound intensity and interference as background.',
          'Beranek, *Concert Halls and Opera Houses* (Springer) for measured hall data.',
          'ISO 3382 series for standardised reverberation and spatial-parameter measurement.',
        ],
      },
      {
        kind: 'table', headers: ['Space', 'Typical occupied T60', 'Design priority'], rows: [
          ['Concert hall', '1.8–2.2 s', 'Musical blending and clarity'],
          ['Classroom', '0.4–0.8 s', 'Speech intelligibility'],
          ['Recording studio', '0.2–0.5 s', 'Controlled, even decay'],
          ['Cathedral', 'Several seconds', 'Large-volume reverberance'],
        ] },
    ],
  },
  {
    id: 'aeroacoustics',
    title: 'Aeroacoustics',
    branchId: 'acoustics',
    level: 'Undergraduate 3',
    summary: 'Aeroacoustics studies sound generated by fluid motion; Lighthill’s acoustic analogy separates wave propagation from turbulent sources and explains the steep velocity scaling of jet noise.',
    prerequisites: ['fluid-dynamics', 'sound-propagation', 'navier-stokes'],
    tags: ['Lighthill analogy', 'jet noise', 'dipole and quadrupole', 'turbulence'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Aeroacoustics is concerned with sound produced by flow rather than by a vibrating solid. A turbulent jet produces intense noise even though no surface oscillates; the fluctuating Reynolds stresses within the turbulence act as distributed acoustic sources. The subject combines fluid mechanics and wave propagation, and its central tool is Lighthill's acoustic analogy, which rearranges the Navier–Stokes equations into an exact wave equation with a source term.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Lighthill's insight was to divide the problem conceptually. The left-hand side of his equation describes acoustic waves travelling through a uniform medium at rest; the right-hand side contains the turbulence that generates them. This does not make the problem easy, because the source depends on the flow that the sound may influence, but it identifies the physical origin of different noise types: unsteady mass injection gives monopoles, unsteady force on a surface gives dipoles, and free turbulence gives quadrupoles.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The efficiency of sound generation rises extremely fast with flow speed. For a free jet the acoustic power scales roughly as the eighth power of velocity, the famous $U^8$ law. Doubling jet speed therefore increases noise power by a factor of 256, about 24 dB. Dipole radiation from airfoils and landing gear scales approximately as $U^6$, which is why reducing speed and smoothing geometry are such effective noise-control strategies.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Why jets are such loud quadrupoles',
        text: String.raw`A compact monopole radiates efficiently at low Mach number, but a jet has no net mass injection and little net unsteady force: its dominant source is the turbulent stress tensor, a quadrupole. Quadrupole radiation is inefficient at low Mach number, which is why the acoustic power carries a high power of Mach number and why modest reductions in jet velocity yield large noise benefits.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Lighthill stress tensor**: $T_{ij}=\rho u_iu_j+(p-c_0^2\rho)\delta_{ij}-\sigma_{ij}$, the source of aerodynamic sound.`,
          String.raw`**Monopole, dipole and quadrupole**: sources associated with mass, force and stress fluctuations.`,
          String.raw`**U to the eighth law**: jet acoustic power scales as $\rho_0 U^8L^2/c_0^5$.`,
          String.raw`**Curle's extension**: solid boundaries convert quadrupole-like sources into more efficient dipoles.`,
          String.raw`**Ffowcs Williams–Hawkings equation**: extension to moving surfaces such as rotating blades.`,
          String.raw`**Mach number dependence**: radiated power rises steeply with $M=U/c_0$.`,
          String.raw`**Acoustic analogy**: exact rearrangement of the flow equations, not an approximation to the source.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $\rho'=\rho-\rho_0$ be the density perturbation, $c_0$ the ambient sound speed and $T_{ij}$ Lighthill's stress tensor combining Reynolds stress, pressure deviation and viscous stress. Rearranging continuity and momentum conservation gives an inhomogeneous wave equation whose source is the double divergence of $T_{ij}$.`,
      },
      { kind: 'math', display: true, latex: String.raw`\frac{\partial^2\rho'}{\partial t^2}-c_0^2\nabla^2\rho'=\frac{\partial^2T_{ij}}{\partial x_i\partial x_j},\qquad T_{ij}=\rho u_iu_j+(p-c_0^2\rho)\delta_{ij}-\sigma_{ij}`, caption: 'Lighthill’s acoustic analogy with summation over repeated indices.' },
     
      {
        kind: 'paragraph',
        text: String.raw`Dimensional analysis of the source gives the acoustic power radiated by a jet of characteristic speed $U$ and length $L$. The result scales with the eighth power of velocity; for compact dipole sources the corresponding scaling is the sixth power. The ratio of acoustic to mechanical power grows roughly as the fifth power of Mach number, explaining why high-speed jets are so noisy.`,
      },
      { kind: 'math', display: true, latex: String.raw`W_{\mathrm{jet}}\sim\frac{\rho_0 U^8L^2}{c_0^5},\qquad W_{\mathrm{dipole}}\sim\frac{\rho_0 U^6L^2}{c_0^3},\qquad \frac{W}{P_{\mathrm{mech}}}\sim M^5`, caption: 'Scaling laws for jet and dipole acoustic power.' },
      {
        kind: 'paragraph',
        text: String.raw`From an acoustic pressure measurement one often wants the source strength. A wave propagating into the far field has pressure perturbation related to density by $p'=c_0^2\rho'$, and the intensity is $p_{\mathrm{rms}}'^2/(\rho_0c_0)$. Integrating intensity over a sphere gives total radiated power, and the logarithmic level difference follows from the ratio of powers.`,
      },
      { kind: 'math', display: true, latex: String.raw`p'=c_0^2\rho',\qquad \Delta L=10\log_{10}\!\left(\frac{W_2}{W_1}\right)`, caption: 'Far-field pressure–density relation and the level change from a power ratio.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Noise increase when a jet speeds up',
        items: [
          { title: 'State the velocity change', text: 'A jet exit velocity is increased from 300 to 600 m/s while geometry and density are unchanged.', math: String.raw`\frac{U_2}{U_1}=2` },
          { title: 'Apply the eighth-power law', text: 'For a turbulent jet the radiated power scales as velocity to the eighth.', math: String.raw`\frac{W_2}{W_1}=\left(\frac{U_2}{U_1}\right)^8=2^8=256` },
          { title: 'Convert to decibels', text: 'The sound power level increase is ten times the base-ten logarithm of the power ratio.', math: String.raw`\Delta L=10\log_{10}256=24.1\ \mathrm{dB}` },
          { title: 'Compare with a dipole source', text: 'An airfoil trailing edge scales as velocity to the sixth power, giving a smaller increase.', math: String.raw`2^6=64,\qquad 10\log_{10}64=18.1\ \mathrm{dB}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'The analogy separates but does not decouple',
        text: 'Lighthill’s equation is exact in form, but the source tensor includes the pressure and density fluctuations being sought. Treating it as independent is valid for low Mach number and compact source regions; at high Mach number, refraction by the mean flow and mean-flow interaction with the acoustic field become important.',
      },
      {
        kind: 'list',
        items: [
          'Compact source approximation for simple scaling laws; large jets have distributed sources.',
          'Low Mach number assumption in Lighthill’s original analogy.',
          'Uniform mean flow assumed; shear layers refract and scatter sound.',
          'Scaling laws assume geometrically similar flows and constant density.',
          'Hydrodynamic near-field fluctuations are not sound and must be distinguished in measurements.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`James Lighthill published his acoustic analogy in 1952 and derived the eighth-power law, which was tested against jet-noise measurements in the following decade. N. Curle extended the theory in 1955 to include stationary solid surfaces, explaining why airfoil and landing-gear noise is dominated by dipoles. John Ffowcs Williams and David Hawkings published their equation for moving surfaces in 1969, the basis of modern rotor and propeller noise prediction. Wind-tunnel measurements of jet and airfoil noise and aircraft certification measurements continue to confirm the velocity scalings and directivity patterns, while computational aeroacoustics solves the same equations numerically.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Only vibrating solids make sound.** Turbulent flow generates sound through unsteady stresses without any vibrating surface.',
          '**Jet noise grows linearly with speed.** It grows approximately as the eighth power for a jet.',
          '**Lighthill’s equation approximates the flow.** It is an exact rearrangement; the approximations come when the source is treated as known.',
          '**Silencing an engine means reducing its thrust.** Noise can be reduced by changing nozzle geometry and mixing without eliminating the flow.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Aeroacoustics combines *fluid-dynamics*, *turbulence* and *sound-propagation*. Its source terms come from the *navier-stokes* equations, and its dimensional arguments use *dimensional-analysis*. Moving-surface extensions are applied to rotors in *aerodynamics*, while architectural consequences are treated in *architectural-acoustics* and measurement practice in *experimental-design*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Aircraft engine design: nozzle and chevron geometry reduce jet noise.',
          'Wind turbine siting: trailing-edge and tip noise determine acceptable distances.',
          'Automotive and high-speed train aerodynamics: reducing flow noise at source.',
          'Industrial fan and valve design: controlling dipole radiation from unsteady forces.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'NASA Glenn Research Center aeroacoustics overview and technical reports (publicly available).',
          'MIT OpenCourseWare 8.03 and 2.25 lectures on waves and fluid mechanics.',
          'Lighthill’s 1952 paper on aerodynamic sound generation, available through journal archives.',
        ],
      },
      {
        kind: 'table', headers: ['Source type', 'Physical origin', 'Velocity scaling'], rows: [
          ['Monopole', 'Unsteady mass injection', String.raw`$U^4$`],
          ['Dipole', 'Unsteady force on a surface', String.raw`$U^6$`],
          ['Quadrupole', 'Turbulent stresses', String.raw`$U^8$`],
        ] },
    ],
  },
  {
    id: 'nonlinear-acoustics',
    title: 'Nonlinear acoustics',
    branchId: 'acoustics',
    level: 'Undergraduate 3',
    summary: 'Finite-amplitude sound changes the medium properties as it passes: wave speed depends on particle velocity, profiles steepen into shocks, harmonics grow, and intense fields drive streaming and cavitation.',
    prerequisites: ['nonlinear-waves', 'sound-propagation', 'first-law'],
    tags: ['B over A', 'shock formation', 'cavitation', 'acoustic streaming'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Linear acoustics treats the medium's properties as fixed. At finite amplitude the compressions are strong enough to change the local sound speed, so different parts of a wave travel at different speeds. The waveform steepens, energy cascades into higher harmonics, and a discontinuity can form. Nonlinear acoustics also includes time-averaged effects with no linear counterpart: acoustic streaming, radiation pressure and cavitation.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`For a right-travelling finite-amplitude wave the local propagation speed is $c=c_0+\beta u$, where $u$ is particle velocity and $\beta=1+B/(2A)$ is the coefficient of nonlinearity built from the medium's equation of state. Compressed regions have a higher sound speed than rarefied ones, so the crest catches the trough ahead of it. The initially sinusoidal profile becomes sawtooth-like until dissipation in the shock front balances further steepening.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The parameter $B/A$ measures the curvature of the pressure–density relation: it is the second-order term in the Taylor expansion of pressure with density. Water has a value near five, soft tissue around six to ten, and air an effective value near $\gamma-1$ for adiabatic processes. Measuring $B/A$ is important in medical ultrasonic imaging because it correlates with tissue composition and affects harmonic signal strength.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Cavitation converts sound into chemistry',
        text: String.raw`During the rarefaction half-cycle of an intense acoustic field, the pressure can fall below the vapour pressure and bubbles form. Their collapse concentrates energy into a tiny region with extreme temperature and pressure, producing sonoluminescence and chemically active radicals. The same mechanism cleans surfaces and fragments kidney stones, but it can also damage tissue and implants.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Coefficient of nonlinearity**: $\beta=1+B/(2A)$ from the equation-of-state expansion.`,
          String.raw`**Amplitude-dependent sound speed**: $c(u)=c_0+\beta u$ for a simple wave.`,
          String.raw`**Shock formation distance**: $x_s=c_0^2/(\beta\omega u_0)$ for a sinusoid of particle-velocity amplitude $u_0$.`,
          String.raw`**Harmonic generation**: progressive transfer of spectral energy from the fundamental to higher multiples.`,
          String.raw`**Burgers equation**: $u_t+\beta u u_x=\delta u_{xx}$, balancing steepening against absorption.`,
          String.raw`**Acoustic streaming**: steady mean flow driven by momentum absorbed from an intense wave.`,
          String.raw`**Cavitation**: nucleation, growth and violent collapse of bubbles under acoustic tension.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $p=p_0+A(\rho-\rho_0)/\rho_0+(B/2)((\rho-\rho_0)/\rho_0)^2+\cdots$ define the nonlinearity parameters $A$ and $B$. A right-moving simple wave then travels with a local speed that depends on particle velocity; the coefficient of nonlinearity is $\beta=1+B/(2A)$.`,
      },
      { kind: 'math', display: true, latex: String.raw`p=p_0+A\frac{\rho-\rho_0}{\rho_0}+\frac{B}{2}\left(\frac{\rho-\rho_0}{\rho_0}\right)^2+\cdots,\qquad \beta=1+\frac{B}{2A},\qquad c(u)=c_0+\beta u`, caption: 'Equation-of-state expansion and the finite-amplitude wave speed.' },
     
      {
        kind: 'paragraph',
        text: String.raw`Characteristics of the simple-wave equation intersect when the initial profile has a sufficiently negative slope. For a sinusoidal particle velocity $u_0\sin\omega t$ the earliest crossing occurs at a distance that decreases with frequency and amplitude; this is the shock formation distance. The Burgers equation regularises the crossing by adding a diffusive term that represents thermoviscous absorption.`,
      },
      { kind: 'math', display: true, latex: String.raw`x_s=\frac{c_0^2}{\beta\,\omega\,u_0},\qquad \frac{\partial u}{\partial t}+\beta u\frac{\partial u}{\partial x}=\delta\frac{\partial^2u}{\partial x^2}`, caption: 'Shock formation distance and the Burgers equation for finite-amplitude sound.' },
      {
        kind: 'paragraph',
        text: String.raw`As a wave steepens, its spectrum develops harmonics at $2\omega$, $3\omega$ and so on. Their growth is initially quadratic in propagation distance. This is exploitable: tissue harmonic imaging transmits at one frequency and receives at twice that frequency, suppressing near-field artefacts produced by the body wall. The same physics determines the acoustic radiation force used in elastography.`,
      },
      { kind: 'math', display: true, latex: String.raw`u_2(x)\approx\frac{\beta\,\omega\,u_0^2}{2c_0^2}\,x\quad\text{(early harmonic growth)}`, caption: 'Approximate linear-in-distance growth of the second harmonic before depletion and shock formation.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Shock formation in an intense ultrasonic beam',
        items: [
          { title: 'List the medium and wave parameters', text: 'In water take c0 = 1500 m/s, beta = 3.5, frequency 1 MHz and particle-velocity amplitude 0.05 m/s.', math: String.raw`c_0=1500\ \mathrm{m\,s^{-1}},\quad\beta=3.5,\quad\omega=2\pi\times10^6\ \mathrm{s^{-1}}` },
          { title: 'Evaluate the shock distance', text: 'Use the sinusoid formula for the distance at which characteristics first cross.', math: String.raw`x_s=\frac{1500^2}{3.5(6.283\times10^6)(0.05)}=\frac{2.25\times10^6}{1.10\times10^6}=2.05\ \mathrm{m}` },
          { title: 'Interpret the scale', text: 'The shock forms after about two metres of propagation, much longer than typical diagnostic imaging depths.', math: String.raw`x_s\approx2\ \mathrm{m}` },
          { title: 'Compare the local speeds', text: 'Crests travel faster than troughs by roughly 2 beta u0, about 0.35 m/s here.', math: String.raw`\Delta c\approx2\beta u_0=2(3.5)(0.05)=0.35\ \mathrm{m\,s^{-1}}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'The inviscid shock is unphysical',
        text: 'The crossing of characteristics predicts an infinitely thin discontinuity. Real shocks have a finite thickness set by viscosity and thermal conduction, and their propagation speed differs from the equilibrium sound speed. Cavitation thresholds depend strongly on dissolved gas and nucleation sites, so simple pressure criteria are only guides.',
      },
      {
        kind: 'list',
        items: [
          'Simple-wave assumption; opposing waves and diffraction require full nonlinear field equations.',
          'Local thermodynamic equilibrium for the equation-of-state expansion.',
          'Weak shock approximation; very strong shocks need Rankine–Hugoniot jump conditions.',
          'Thermoviscous absorption represented by a simple diffusion term; relaxation losses may dominate.',
          'Cavitation thresholds depend on impurities, dissolved gas and tensile history.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`John William Strutt, Lord Rayleigh, analysed the collapse of cavitation bubbles in 1917, work motivated by erosion of ship propellers. Johannes Burgers published his nonlinear diffusion equation in 1948 to model finite-amplitude waves. Shock-tube experiments developed in the mid-twentieth century measured the structure and speed of weak acoustic shocks. Measurements of the nonlinearity parameter B/A in water and biological tissue by thermodynamic and ultrasonic harmonic methods began in the 1970s. Tissue harmonic imaging and lithotripsy are direct technological consequences of these observations.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Nonlinear acoustics only concerns very loud sound.** Diagnostic ultrasound is nominally linear but still generates measurable harmonics over many wavelengths.',
          '**Cavitation bubbles simply bounce.** They can grow explosively and collapse asymmetrically, emitting shock waves and light.',
          '**Harmonics are produced by the transducer.** They are generated progressively by the medium as the wave propagates.',
          '**Acoustic streaming is the same as the wave motion.** Streaming is a steady mean flow produced by absorbed momentum, not an oscillation.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Nonlinear acoustics is the acoustic branch of *nonlinear-waves* and uses the equation of state from *thermodynamics*. Its shock physics relates to *compressible-flow* and *fluid-dynamics*, and its harmonic generation to *ultrasonics* and *medical-physics*. Cavitation connects to *phase-transitions* and fluid mechanics, while the Burgers equation is a prototype studied in *pde*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Medical ultrasonic harmonic imaging and elastography.',
          'Extracorporeal shock-wave lithotripsy for kidney stones.',
          'Ultrasonic cleaning, emulsification and sonochemical reactors.',
          'High-intensity focused ultrasound for thermal therapy.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 1*, sections on sound intensity and the Doppler effect as background.',
          'Burgers’ original paper and standard nonlinear acoustics texts are accessible through institutional libraries.',
          'MIT OpenCourseWare 8.03 Vibrations and Waves, notes on shock formation and finite-amplitude waves.',
        ],
      },
      {
        kind: 'table', headers: ['Effect', 'Driver', 'Observable consequence'], rows: [
          ['Wave steepening', 'Amplitude-dependent speed', 'Shock formation'],
          ['Harmonic growth', 'Quadratic equation of state', 'Signal at 2f, 3f'],
          ['Acoustic streaming', 'Absorbed momentum', 'Steady fluid circulation'],
          ['Cavitation', 'Negative pressure cycles', 'Erosion, sonoluminescence'],
        ] },
    ],
  },
  {
    id: 'einstein-postulates',
    title: 'Einstein’s postulates',
    branchId: 'special-relativity',
    level: 'Undergraduate 2',
    summary: 'Special relativity follows from two statements: the laws of physics are identical in all inertial frames, and light in vacuum travels at the same speed c for every inertial observer.',
    prerequisites: ['newtons-laws', 'electromagnetic-waves', 'maxwell-equations'],
    tags: ['inertial frames', 'light speed invariance', 'Lorentz factor', 'aether'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`In 1905 Albert Einstein elevated two empirical facts to principles. First, the laws of physics take the same form in every inertial reference frame; there is no preferred state of rest. Second, light in vacuum propagates at a speed $c$ that is independent of the motion of its source. Together they force a revision of the Newtonian ideas of absolute time and distance, and they yield the Lorentz transformations, time dilation, length contraction and the equivalence of mass and energy.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Under Galilean transformations, velocities add: an observer moving toward a light beam would measure $c+v$. Maxwell's equations instead predict a fixed wave speed $c=1/\sqrt{\varepsilon_0\mu_0}$ with no dependence on the source. If the same Maxwell equations hold in every inertial frame, every observer must measure the same $c$. Something in the transformation between frames must change, and what changes is the regarded-as-obvious relation between space and time coordinates.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The resolution is that moving clocks are not synchronised in the Newtonian sense and moving rods are not the same length as when at rest. Each observer's measurements are internally consistent, but the splitting of spacetime into space and time is frame-dependent. What all observers agree on is the spacetime interval between events and the speed of light that defines the causal structure.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'The second postulate removes the need for an aether',
        text: String.raw`Nineteenth-century physicists imagined a luminiferous aether as the medium carrying light and expected to detect Earth's motion through it. If light always travels at c relative to every inertial observer, an aether rest frame is unnecessary and undetectable in principle. Michelson and Morley's null result becomes expected rather than puzzling.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Inertial frame**: a reference frame in which a free particle moves in a straight line at constant speed.`,
          String.raw`**Relativity principle**: no experiment internal to an inertial frame can detect its uniform velocity.`,
          String.raw`**Light-speed invariance**: all inertial observers measure the same value $c\approx2.998\times10^8\ \mathrm{m\,s^{-1}}$.`,
          String.raw`**Lorentz factor**: $\gamma=1/\sqrt{1-v^2/c^2}$, governing time dilation and length contraction.`,
          String.raw`**Invariant interval**: $c^2\Delta t^2-\Delta x^2$ has the same value in all inertial frames.`,
          String.raw`**Relativistic velocity addition**: $u'=(u-v)/(1-uv/c^2)$ replaces Galilean subtraction.`,
          String.raw`**Causal structure**: light cones separate timelike, spacelike and lightlike separations.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Consider two inertial frames in standard configuration: frame S prime moves at speed $v$ along the positive x axis relative to S. Requiring linearity, the relativity principle and a constant light speed fixes the transformation up to a scale factor; symmetry sets that factor to one, giving the Lorentz transformation and its inverse.`,
      },
      { kind: 'math', display: true, latex: String.raw`x'=\gamma(x-vt),\qquad t'=\gamma\!\left(t-\frac{vx}{c^2}\right),\qquad \gamma=\frac{1}{\sqrt{1-v^2/c^2}}`, caption: 'Lorentz transformation between inertial frames in standard configuration.' },
     
      {
        kind: 'paragraph',
        text: String.raw`Adding velocities by composing two Lorentz transformations gives the relativistic addition law. It always returns a result below c when both input speeds are below c, so no sequence of boosts can accelerate a material object past light speed. For speeds much smaller than c the law reduces to Galilean addition plus small relativistic corrections.`,
      },
      { kind: 'math', display: true, latex: String.raw`u'=\frac{u-v}{1-\dfrac{uv}{c^2}},\qquad u=\frac{u'+v}{1+\dfrac{u'v}{c^2}}`, caption: 'Relativistic velocity addition and its inverse.' },
      {
        kind: 'paragraph',
        text: String.raw`The quantity preserved by Lorentz transformations is not the separate spatial distance or time interval but the Minkowski interval. Choosing the signature convention with time positive, timelike separations have positive squared interval, spacelike negative, and lightlike zero. The value of c is the conversion factor between temporal and spatial units, and it appears in every relativistic formula.`,
      },
      { kind: 'math', display: true, latex: String.raw`\Delta s^2=c^2\Delta t^2-\Delta x^2-\Delta y^2-\Delta z^2=\text{invariant}`, caption: 'The invariant spacetime interval in the (+,-,-,-) convention.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Light speed measured from a moving spacecraft',
        items: [
          { title: 'Set up the frames', text: 'A spacecraft moves at 0.6c relative to Earth and emits a light pulse forward.', math: String.raw`v=0.6c,\qquad u'=c\ \text{(in the spacecraft frame)}` },
          { title: 'Apply relativistic addition', text: 'Transform the light velocity back to the Earth frame.', math: String.raw`u=\frac{u'+v}{1+u'v/c^2}=\frac{c+0.6c}{1+0.6}=c` },
          { title: 'Contrast with Galilean addition', text: 'The Newtonian rule would incorrectly give 1.6c.', math: String.raw`u_{\mathrm{Galilean}}=c+0.6c=1.6c` },
          { title: 'Evaluate the Lorentz factor', text: 'The same speed corresponds to a substantial time-dilation factor.', math: String.raw`\gamma=\frac{1}{\sqrt{1-0.6^2}}=1.25` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Special relativity assumes inertial frames and flat spacetime',
        text: 'The postulates apply to inertial observers in the absence of gravity. Accelerated frames can be handled locally or with general relativity, and gravitational time dilation is not contained in the special theory. At low speeds the theory reduces to Newtonian physics, so daily experience gives no hint of the effects.',
      },
      {
        kind: 'list',
        items: [
          'Inertial frames only; accelerating frames require local comoving inertial frames or general relativity.',
          'Flat spacetime; curvature from mass and energy belongs to general relativity.',
          'Vacuum light speed; the phase velocity in a medium can be less than c.',
          'Point-like events and ideal clocks assumed in the thought experiments.',
          'Low-velocity limit recovers Galilean physics, so relativistic effects are hard to observe at everyday speeds.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Albert Michelson and Edward Morley's 1887 interferometer experiment found no variation of light speed with Earth's motion, ruling out a stationary aether. Kennedy and Thorndike's 1932 experiment extended the test to different arm lengths and boosted velocities. Ives and Stilwell's experiments from 1938 measured the relativistic Doppler shift of fast ions. The 1971 Hafele–Keating experiment flew caesium clocks around the world and observed the combined kinematic and gravitational time shifts, while muon lifetime measurements at accelerators directly show time dilation. Modern particle accelerators would not function without relativistic dynamics built into their design.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**The postulates say nothing can move faster than light in any sense.** Relativity forbids local information transfer faster than c; apparent superluminal spots and phase velocities do not carry signals.',
          '**Relativity means everything is relative.** The speed of light and the spacetime interval are absolute.',
          '**Time dilation is an illusion caused by clock mechanism.** It is a property of spacetime geometry, observed in particle decays and atomic clocks.',
          '**The aether was disproved by a single experiment.** A series of increasingly precise experiments ruled out the required variants.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`The postulates are the foundation of *lorentz-transformations*, *time-dilation-length-contraction* and *relativity-of-simultaneity*. They reshape dynamics in *relativistic-momentum* and *relativistic-energy*, and are expressed geometrically in *minkowski-spacetime* and *four-vectors*. Their consistency with electromagnetism is shown in *relativistic-electrodynamics*, and their limitations lead to *equivalence-principle* and *curved-spacetime*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Global Positioning System: satellite clock rates include special- and general-relativistic corrections.',
          'Particle accelerators: beam dynamics and magnetic rigidity use relativistic momentum.',
          'Cosmic-ray physics: extended muon lifetimes at relativistic speeds explain ground-level detection.',
          'Precision metrology: relativistic time dilation must be corrected in comparisons of optical clocks.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'Einstein’s 1905 paper *On the Electrodynamics of Moving Bodies* is freely available in English translation.',
          'OpenStax, *University Physics Volume 3*, chapter 28 on special relativity.',
          'MIT OpenCourseWare 8.033 Relativity lecture notes on the postulates and Lorentz transformations.',
        ],
      },
      {
        kind: 'table', headers: ['Concept', 'Newtonian view', 'Relativistic view'], rows: [
          ['Time interval', 'Absolute', 'Frame-dependent'],
          ['Spatial length', 'Absolute', 'Frame-dependent'],
          ['Velocity addition', String.raw`$u'+v$`, String.raw`$(u'+v)/(1+u'v/c^2)$`],
          ['Spacetime interval', 'Not defined', 'Invariant'],
        ] },
    ],
  },
  {
    id: 'relativity-of-simultaneity',
    title: 'Relativity of simultaneity',
    branchId: 'special-relativity',
    level: 'Undergraduate 2',
    summary: 'Events simultaneous in one inertial frame are generally not simultaneous in another; the time order of spacelike-separated events depends on the observer’s state of motion.',
    prerequisites: ['einstein-postulates', 'lorentz-transformations', 'minkowski-spacetime'],
    tags: ['simultaneity', 'light cones', 'causality', 'train paradox'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`The relativity of simultaneity is the statement that there is no frame-independent present. Two events occurring at different places at the same time in one inertial frame will, in general, occur at different times in another. This is not a delay in observation caused by light travel time; it is a difference in the times assigned to the events after each observer has corrected for light propagation using their own synchronised clocks.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Einstein's train thought experiment makes this concrete. Two lightning strikes hit the front and rear of a moving train. An observer on the platform, midway between the strike points, receives both flashes together and concludes the strikes were simultaneous. An observer on the train is moving toward the front flash and away from the rear one, so they receive the front flash first. Since they are also midway between the ends of the train in their own frame, they conclude the front strike happened first. Both conclusions are correct in their own frames.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The disagreement is possible because the events are spacelike separated: no light signal can travel from one to the other. Their time order can even reverse in some frames without violating causality, because neither event can influence the other. For timelike-separated events, where a signal slower than light can connect them, all inertial observers agree on the order; causality is protected by the light cone.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Reversed order does not mean reversed cause and effect',
        text: String.raw`If two events are spacelike separated, some observers see A first and others see B first. This is safe because no causal influence can pass between them. If A actually causes B, their separation is timelike or lightlike and every inertial observer agrees on the ordering. Relativity preserves causality precisely where it matters.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Event**: a point in spacetime specified by position and time in some frame.`,
          String.raw`**Einstein synchronisation**: clocks at different places synchronised using light signals and the assumption of isotropic c.`,
          String.raw`**Spacelike separation**: $|\Delta x|>c|\Delta t|$; no causal connection and frame-dependent time order.`,
          String.raw`**Timelike separation**: $c|\Delta t|>|\Delta x|$; a subluminal signal can connect the events and order is invariant.`,
          String.raw`**Light cone**: the boundary $\Delta x=\pm c\Delta t$ separating causally connected from disconnected regions.`,
          String.raw`**Lorentz transformation of time**: $t'=\gamma(t-vx/c^2)$ mixes space into time.`,
          String.raw`**Present slice**: the set of events judged simultaneous depends on the observer's velocity.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`For two events separated by $\Delta x$ and $\Delta t$ along the direction of relative motion, the Lorentz time transformation gives the transformed separation. Even if the events are simultaneous in the unprimed frame, the primed frame assigns a nonzero time difference proportional to the spatial separation and the boost speed.`,
      },
      { kind: 'math', display: true, latex: String.raw`\Delta t'=\gamma\left(\Delta t-\frac{v\,\Delta x}{c^2}\right),\qquad \Delta x'=\gamma(\Delta x-v\Delta t)`, caption: 'Lorentz transformation of event separations along the boost direction.' },
     
      {
        kind: 'paragraph',
        text: String.raw`Setting $\Delta t=0$ makes the effect explicit: simultaneous events separated by a distance are not simultaneous for a moving observer, and the sign of the time difference reverses with the sign of $v$. The interval classification follows from the invariant $c^2\Delta t^2-\Delta x^2$: positive for timelike, negative for spacelike and zero for lightlike separations.`,
      },
      { kind: 'math', display: true, latex: String.raw`\Delta t\big|_{\Delta t'=0}=\gamma\frac{v\,\Delta x}{c^2},\qquad \Delta s^2=c^2\Delta t^2-\Delta x^2`, caption: 'Time separation required for simultaneity in the moving frame, and the invariant interval.' },
      {
        kind: 'paragraph',
        text: String.raw`The velocity needed to reverse the time ordering of spacelike-separated events is $|v|>c^2\Delta t/\Delta x$, which is less than c whenever the separation is spacelike. Since no inertial observer can travel at or above c, the ordering of causally connected events can never be reversed, but that of disconnected events can.`,
      },
      { kind: 'math', display: true, latex: String.raw`|v|>\frac{c^2|\Delta t|}{|\Delta x|}\quad\Rightarrow\quad\text{reversed order (spacelike only)}`, caption: 'Condition for order reversal; possible only when the events are spacelike separated.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Two lightning strikes on a moving train',
        items: [
          { title: 'Define the events in the platform frame', text: 'Two strikes 300 m apart are simultaneous on the platform: delta t = 0 and delta x = 300 m.', math: String.raw`\Delta t=0,\qquad \Delta x=300\ \mathrm{m}` },
          { title: 'Choose the train speed', text: 'The train moves at 0.6c, giving a Lorentz factor of 1.25.', math: String.raw`v=0.6c,\qquad\gamma=1.25` },
          { title: 'Transform the time separation', text: 'Apply the Lorentz transformation for the train frame.', math: String.raw`\Delta t'=-\gamma\frac{v\Delta x}{c^2}=-1.25\frac{0.6\times300}{3\times10^8}=-7.5\times10^{-7}\ \mathrm{s}` },
          { title: 'Interpret the sign', text: 'The strike at larger x happens 0.75 microseconds earlier in the train frame.', math: String.raw`|\Delta t'|=0.75\ \mu\mathrm{s}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Do not confuse seeing with assigning',
        text: 'Observing a flash earlier because of position is a light-travel effect that even Newtonian physics describes. Relativity concerns the times assigned after correcting for propagation using Einstein-synchronised clocks. The train observer’s conclusion persists after all such corrections.',
      },
      {
        kind: 'list',
        items: [
          'Inertial frames assumed; accelerated observers need local comoving frames.',
          'Standard configuration with relative motion along the separation direction.',
          'Ideal clocks synchronised by the Einstein convention in each frame.',
          'Events treated as point-like; finite-size effects require care.',
          'Numerical examples use v well below c for clarity, but the effect exists at any nonzero v.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`The theoretical analysis appears in Einstein's 1905 paper, and the relativity of simultaneity is built into the Lorentz transformations verified by Michelson–Morley and Kennedy–Thorndike type experiments. Ives–Stilwell measurements of the transverse Doppler effect test the time transformation directly. In practical systems, the Global Positioning System must transform clock readings between satellite and ground frames, where simultaneity conventions matter at the nanosecond level. Muon lifetime measurements and accelerator timing provide further confirmation of the underlying transformation.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Simultaneity is subjective perception.** It is a frame-dependent assignment after propagation delays are removed.',
          '**If order can reverse, causality can break.** Only spacelike-separated events reverse order, and they cannot cause one another.',
          '**There is a true present shared by the universe.** Different inertial frames slice spacetime differently; no experiment selects one slice.',
          '**The train observer is wrong because they are moving.** Both frames are inertial and their conclusions are equally valid.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`This topic is a direct consequence of *einstein-postulates* and is expressed through *lorentz-transformations* and *minkowski-spacetime*. It underpins *time-dilation-length-contraction* and the invariant interval used in *four-vectors*. Causal structure is central to *relativistic-electrodynamics* and to *black-holes* in general relativity, while clock synchronization is metrological in *metrology*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Satellite navigation: coordinate time and clock synchronisation across moving frames.',
          'High-energy physics: reconstructing event ordering and decay chains from detector timestamps.',
          'Astrophysics: interpreting variability across widely separated observing sites.',
          'Fundamental discussions of causality and the nature of time in relativity.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'Einstein’s 1905 relativity paper, freely available in translation, sections 1–2.',
          'OpenStax, *University Physics Volume 3*, section 28.2 on simultaneity.',
          'MIT OpenCourseWare 8.033 Relativity, lectures on the light cone and causality.',
        ],
      },
      {
        kind: 'table', headers: ['Separation', 'Interval sign', 'Causal contact', 'Time order'], rows: [
          ['Timelike', String.raw`$c^2\Delta t^2>\Delta x^2$`, 'Possible', 'Same in all frames'],
          ['Lightlike', String.raw`$c^2\Delta t^2=\Delta x^2$`, 'Light signal', 'Same in all frames'],
          ['Spacelike', String.raw`$c^2\Delta t^2<\Delta x^2$`, 'Impossible', 'Frame-dependent'],
        ] },
    ],
  },
  {
    id: 'relativistic-momentum',
    title: 'Relativistic momentum',
    branchId: 'special-relativity',
    level: 'Undergraduate 2',
    summary: 'Momentum must be redefined as p = gamma m v so that conservation holds in every inertial frame; at low speeds it reduces to Newtonian momentum but grows without bound as v approaches c.',
    prerequisites: ['einstein-postulates', 'momentum-collisions', 'work-energy-power'],
    tags: ['gamma factor', 'conservation law', 'synchrotron', 'rest mass'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Newtonian momentum $\mathbf{p}=m\mathbf{v}$ is conserved in collisions only under Galilean transformations. Once velocities transform by Lorentz rules, the conserved quantity changes to $\mathbf{p}=\gamma m\mathbf{v}$, with $\gamma=1/\sqrt{1-v^2/c^2}$. This modification is tiny at everyday speeds but dominant in particle accelerators, where it explains why adding energy increases momentum far more than speed.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`The factor $\gamma$ appears because successive boosts do not add linearly. A particle already moving fast resists further acceleration more strongly, not because its mass changes but because the relationship between force, momentum and velocity is different. The invariant rest mass $m$ stays the same in every frame; what changes is the energy and momentum assigned to the particle.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`Momentum conservation is tied to spatial translation symmetry through Noether's theorem, so the correct momentum is the quantity that is conserved in all inertial frames. Designing an accelerator requires the relativistic expression: the magnetic field needed to bend a beam is set by $p=qB\rho$, and at high energy the momentum is almost $E/c$, so bending becomes progressively harder.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'The old idea of “relativistic mass” is unnecessary',
        text: String.raw`Early textbooks said mass increases with speed, writing $m_{\mathrm{rel}}=\gamma m$. Modern practice keeps mass invariant and assigns the speed dependence to momentum and energy. The four-vector formulation makes this natural: $p^\mu=mU^\mu$ with fixed $m$, and the components change under boosts just like spacetime coordinates.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Relativistic momentum**: $\mathbf{p}=\gamma m\mathbf{v}$, parallel to velocity but larger than $m\mathbf{v}$.`,
          String.raw`**Lorentz factor**: $\gamma=(1-v^2/c^2)^{-1/2}$, equal to one at rest and diverging as $v\to c$.`,
          String.raw`**Conserved quantity**: total relativistic momentum is conserved in all inertial frames.`,
          String.raw`**Force law**: $\mathbf{F}=d\mathbf{p}/dt$ still holds, but F is not generally parallel to acceleration.`,
          String.raw`**Energy–momentum relation**: $E^2=p^2c^2+m^2c^4$, connecting the two conserved quantities.`,
          String.raw`**Low-speed limit**: $\gamma\simeq1+v^2/(2c^2)$, recovering Newtonian mechanics for $v\ll c$.`,
          String.raw`**Cyclotron limitation**: classical cyclotron frequency $\omega=qB/m$ fails at relativistic speeds because the effective inertia rises.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`For a particle of invariant rest mass $m$ moving with velocity $\mathbf{v}$, define the Lorentz factor $\gamma$ and the relativistic momentum. Writing $\boldsymbol{\beta}=\mathbf{v}/c$ makes the speed dependence explicit and shows that momentum diverges as the speed approaches c, preventing a massive particle from reaching c.`,
      },
      { kind: 'math', display: true, latex: String.raw`\gamma=\frac{1}{\sqrt{1-\beta^2}},\qquad \mathbf{p}=\gamma m\mathbf{v}=\frac{m\mathbf{v}}{\sqrt{1-v^2/c^2}},\qquad \beta=\frac{v}{c}`, caption: 'Lorentz factor and relativistic momentum of a massive particle.' },
     
      {
        kind: 'paragraph',
        text: String.raw`The relativistic force law retains the form force equals rate of change of momentum. Because $\gamma$ depends on the direction of motion relative to the applied force, the acceleration is not simply proportional to force: the longitudinal and transverse responses differ. This is why synchrotrons vary the magnetic field as particles accelerate.`,
      },
      { kind: 'math', display: true, latex: String.raw`\mathbf{F}=\frac{d\mathbf{p}}{dt}=\frac{d}{dt}(\gamma m\mathbf{v}),\qquad F_{\parallel}=\gamma^3 m a_{\parallel},\quad F_{\perp}=\gamma m a_{\perp}`, caption: 'Relativistic force and its different longitudinal and transverse responses.' },
      {
        kind: 'paragraph',
        text: String.raw`The momentum and total energy form a single geometric object. Their invariant combination is the rest energy squared, and for a massless particle the relation reduces to $E=pc$. In particle physics it is conventional to quote momentum in units of $\mathrm{MeV}/c$ or $\mathrm{GeV}/c$, making the relation easy to apply numerically.`,
      },
      { kind: 'math', display: true, latex: String.raw`E^2=p^2c^2+m^2c^4,\qquad pc=\sqrt{E^2-m^2c^4},\qquad pc=\gamma\beta\,mc^2`, caption: 'Energy–momentum relation and the convenient energy-equivalent of momentum.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Momentum of a fast electron',
        items: [
          { title: 'Find the Lorentz factor', text: 'An electron moves at 0.8c. Its rest energy is 0.511 MeV.', math: String.raw`\gamma=\frac{1}{\sqrt{1-0.8^2}}=\frac{1}{0.6}=1.667` },
          { title: 'Compute momentum in SI units', text: 'Use the electron mass 9.109 times ten to the minus 31 kilograms.', math: String.raw`p=\gamma m v=1.667(9.109\times10^{-31})(0.8\times3.00\times10^8)=3.64\times10^{-22}\ \mathrm{kg\,m\,s^{-1}}` },
          { title: 'Convert to particle-physics units', text: 'The product pc in MeV follows from gamma beta times the rest energy.', math: String.raw`pc=\gamma\beta\,mc^2=1.667\times0.8\times0.511=0.681\ \mathrm{MeV}` },
          { title: 'State the momentum', text: 'Divide by c to express the momentum in the conventional unit.', math: String.raw`p=0.681\ \mathrm{MeV}/c` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Relativistic does not mean the mass changed',
        text: 'The invariant rest mass is a property of the particle; treating gamma times m as a velocity-dependent mass obscures the geometry and fails for composite systems where internal energy contributes to invariant mass. Keep m fixed and put speed dependence in momentum and energy.',
      },
      {
        kind: 'list',
        items: [
          'Free particle or collision with negligible external fields during the interaction.',
          'Point particle; extended bodies require integrating stress and energy density.',
          'Special-relativistic, flat spacetime; gravity needs general relativity.',
          'Massless particles have no rest frame and require p = E/c rather than gamma m v.',
          'The Newtonian limit requires v much smaller than c.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Walter Kaufmann's experiments from 1901 to 1903 measured the deflection of fast electrons in electric and magnetic fields and found the ratio of charge to effective inertia changing with speed, an early confirmation. Alfred Bucherer's 1908 measurements improved the precision. Modern electron microscopes and synchrotrons require the relativistic momentum in every design calculation, and the bending radius of the Large Electron–Positron collider agreed with predictions using $p=\gamma mv$. Measurements of cosmic-ray muons and atomic recoil further validate the energy–momentum relation.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Mass increases with speed.** Rest mass is invariant; momentum and energy grow with gamma.',
          '**Force and acceleration are always parallel.** Relativistically they need not be, because gamma changes differently along and across the motion.',
          '**A particle can reach c if enough force is applied.** Momentum diverges, so infinite energy would be required.',
          '**Conservation of momentum fails at high speed.** It is exact when the relativistic definition is used.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Relativistic momentum follows from *einstein-postulates* and generalises *momentum-collisions*. It is combined with energy in *relativistic-energy* and expressed geometrically in *four-vectors* and *minkowski-spacetime*. Particle accelerators described in *accelerators* and *accelerator-physics* depend on it, as does the magnetic deflection treated in *lorentz-force* and *relativistic-electrodynamics*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Synchrotron and storage-ring design: bending radius from momentum, not Newtonian mass times velocity.',
          'Electron microscopy: relativistic correction to electron wavelength and focusing.',
          'Particle detector reconstruction: track curvature gives momentum in GeV/c.',
          'Cosmic-ray physics: primary protons at ultra-high energies are essentially momentum E/c.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 3*, section 28.4 on relativistic momentum.',
          'MIT OpenCourseWare 8.033 Relativity, lectures on relativistic dynamics.',
          'The Feynman Lectures on Physics volume I, chapter 16, relativistic effects in dynamics.',
        ],
      },
      {
        kind: 'table', headers: ['Quantity', 'Newtonian form', 'Relativistic form'], rows: [
          ['Momentum', String.raw`$m\mathbf{v}$`, String.raw`$\gamma m\mathbf{v}$`],
          ['Kinetic energy', String.raw`$\tfrac12mv^2$`, String.raw`$(\gamma-1)mc^2$`],
          ['Low-speed limit', 'Exact', String.raw`$\mathbf{p}\approx m\mathbf{v}$`],
          ['Massless particle', 'Undefined', String.raw`$p=E/c$`],
        ] },
    ],
  },
  {
    id: 'four-vectors',
    title: 'Four-vectors',
    branchId: 'special-relativity',
    level: 'Undergraduate 3',
    summary: 'Four-vectors are quantities with four components that transform linearly under Lorentz transformations; their scalar products are invariant and make relativistic laws compact and manifestly covariant.',
    prerequisites: ['einstein-postulates', 'lorentz-transformations', 'tensor-algebra'],
    tags: ['Minkowski space', 'metric signature', 'four-velocity', 'four-momentum'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`In special relativity, space and time form a four-dimensional manifold and physical quantities are organised into four-component objects called four-vectors. Under a Lorentz transformation their components mix exactly as spacetime coordinates do, while scalar products built with the Minkowski metric remain unchanged. This notation turns pages of algebra into a few lines and guarantees that equations written with four-vectors have the same form in every inertial frame.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`A four-vector is to spacetime what an ordinary vector is to space: an object whose components change with the coordinate system but whose geometric identity does not. The position four-vector bundles time and space; the four-velocity is its derivative with respect to proper time, the time measured by a clock travelling with the particle. Because proper time is invariant, the four-velocity transforms cleanly even though coordinate velocity does not.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The Minkowski metric has a different sign for time and space, which is what makes the interval invariant rather than the Euclidean length. Raising and lowering an index with this metric changes the sign of the spatial components. Contracting a four-vector with itself gives a Lorentz scalar, such as $U^\mu U_\mu=c^2$ for four-velocity or $p^\mu p_\mu=m^2c^2$ for four-momentum.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Four-velocity has constant magnitude',
        text: String.raw`Every massive particle, regardless of its speed through space, has four-velocity with invariant magnitude c. A particle at rest has all of its four-velocity in the time component; a fast particle has more in the spatial components. What we call motion through space is a rotation of the four-velocity in spacetime, with its length fixed.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Position four-vector**: $x^\mu=(ct,x,y,z)$ with Greek indices running from 0 to 3.`,
          String.raw`**Minkowski metric**: $\eta_{\mu\nu}=\mathrm{diag}(1,-1,-1,-1)$ in the chosen signature convention.`,
          String.raw`**Proper time**: $d\tau=dt/\gamma$, invariant and measured by a co-moving clock.`,
          String.raw`**Four-velocity**: $U^\mu=dx^\mu/d\tau=\gamma(c,\mathbf{v})$.`,
          String.raw`**Four-momentum**: $p^\mu=mU^\mu=(E/c,\mathbf{p})$.`,
          String.raw`**Covariant and contravariant components**: $x_\mu=\eta_{\mu\nu}x^\nu$, changing spatial signs.`,
          String.raw`**Lorentz scalars**: invariant contractions such as $p^\mu p_\mu=m^2c^2$ and $F^{\mu\nu}F_{\mu\nu}$.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $x^\mu$ denote the position four-vector and $\eta_{\mu\nu}$ the metric with the $(+,-,-,-)$ signature. A Lorentz transformation is a linear map $\Lambda$ that preserves the metric, so the interval $x^\mu x_\mu$ takes the same value in all inertial frames. Repeated indices are summed.`,
      },
      { kind: 'math', display: true, latex: String.raw`x^\mu=(ct,x,y,z),\qquad \eta_{\mu\nu}=\mathrm{diag}(1,-1,-1,-1),\qquad x'^\mu=\Lambda^\mu{}_\nu x^\nu`, caption: 'Position four-vector, metric and general Lorentz transformation.' },
     
      {
        kind: 'paragraph',
        text: String.raw`Proper time is the invariant parameter along a particle's worldline. Dividing the position four-vector by proper time produces the four-velocity, whose time component is $\gamma c$ and spatial components are $\gamma\mathbf{v}$. Its squared magnitude is a Lorentz scalar equal to $c^2$ for massive particles and zero for light.`,
      },
      { kind: 'math', display: true, latex: String.raw`d\tau=\frac{dt}{\gamma},\qquad U^\mu=\frac{dx^\mu}{d\tau}=\gamma(c,\mathbf{v}),\qquad U^\mu U_\mu=c^2`, caption: 'Proper time, four-velocity and its invariant magnitude.' },
      {
        kind: 'paragraph',
        text: String.raw`Multiplying the four-velocity by the invariant rest mass gives the four-momentum, whose time component is energy divided by c and whose spatial components are the relativistic three-momentum. The invariant contraction yields the energy–momentum relation, so a single scalar equation replaces the separate energy and momentum transformations.`,
      },
      { kind: 'math', display: true, latex: String.raw`p^\mu=mU^\mu=\left(\frac{E}{c},\mathbf{p}\right),\qquad p^\mu p_\mu=\frac{E^2}{c^2}-p^2=m^2c^2`, caption: 'Four-momentum and the invariant energy–momentum relation.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Four-velocity and four-momentum of a proton',
        items: [
          { title: 'Determine the Lorentz factor', text: 'A proton moves at 0.6c along the x axis. Its rest energy is 938 MeV.', math: String.raw`\gamma=1.25,\qquad \gamma\beta=1.25\times0.6=0.75` },
          { title: 'Write the four-velocity', text: 'The time component is gamma c and the spatial component is gamma v.', math: String.raw`U^\mu=(1.25c,\ 0.75c,\ 0,\ 0)` },
          { title: 'Verify the invariant', text: 'Contract with the metric to check the magnitude.', math: String.raw`U^\mu U_\mu=(1.25c)^2-(0.75c)^2=c^2(1.5625-0.5625)=c^2` },
          { title: 'Find the four-momentum', text: 'Multiply by mass; energy is gamma times rest energy and momentum follows from gamma beta.', math: String.raw`E=1.25\times938=1173\ \mathrm{MeV},\qquad pc=0.75\times938=704\ \mathrm{MeV}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Signature conventions differ between books',
        text: 'Some authors use the (-,+,+,+) metric, which flips the signs in scalar products and in the definition of raising and lowering indices. The physics is unchanged, but formulas must be translated consistently. This article uses (+,-,-,-).',
      },
      {
        kind: 'list',
        items: [
          'Flat Minkowski spacetime; curved spacetime requires local tetrads and general covariance.',
          'Inertial coordinates for the simple transformation matrix.',
          'Massive particles have a timelike worldline and a well-defined proper time.',
          'Massless particles require an affine parameter instead of proper time.',
          'Index conventions and metric signature must be applied consistently.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Four-vectors are a reformulation of special relativity, so their evidence is the evidence for Lorentz symmetry: the Michelson–Morley and Kennedy–Thorndike experiments, Ives–Stilwell Doppler measurements, Hafele–Keating clock comparisons and muon lifetime observations. Their practical validation is pervasive in particle physics: event reconstruction relies on four-momentum conservation at every collision, and accelerator lattice design uses Lorentz-covariant equations of motion. The invariant mass computed from decay products agrees with the known parent particle mass across experiments.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**A four-vector is just a list of four numbers.** Its components must transform with the Lorentz matrix for the object to be a four-vector.',
          '**The metric is optional.** Without it there is no invariant scalar product and no way to build Lorentz scalars.',
          '**Proper time is the same as coordinate time.** They coincide only for a particle at rest in that frame.',
          '**Four-velocity is the derivative with respect to coordinate time.** It is the derivative with respect to proper time, which is why its magnitude is invariant.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Four-vectors formalise *einstein-postulates* and *lorentz-transformations* within *minkowski-spacetime*. They are built using ideas from *vectors-vector-spaces* and *tensor-algebra*, and they unify *relativistic-momentum* with *relativistic-energy*. The electromagnetic field tensor in *electromagnetic-field-tensor* and *relativistic-electrodynamics* is the natural next rank-two object, and general relativity generalises these ideas in *metric-tensor*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Particle physics: Lorentz-invariant mass and four-momentum conservation in event reconstruction.',
          'Accelerator physics: equations of motion written covariantly for beams in electromagnetic fields.',
          'Relativistic fluid dynamics: stress–energy tensor as a rank-two generalisation.',
          'General relativity: locally Minkowski frames used to define physical measurements.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'MIT OpenCourseWare 8.033 Relativity, notes on four-vectors and covariant notation.',
          'The Feynman Lectures on Physics volume I, chapter 17 on spacetime.',
          'OpenStax, *University Physics Volume 3*, section 28.6 on relativistic momentum and energy vectors.',
        ],
      },
      {
        kind: 'table', headers: ['Object', 'Components', 'Invariant contraction'], rows: [
          [String.raw`Position $x^\mu$`, String.raw`$(ct,x,y,z)$`, String.raw`$c^2t^2-r^2$`],
          [String.raw`Four-velocity $U^\mu$`, String.raw`$\gamma(c,\mathbf{v})$`, String.raw`$c^2$`],
          [String.raw`Four-momentum $p^\mu$`, String.raw`$(E/c,\mathbf{p})$`, String.raw`$m^2c^2$`],
          [String.raw`Four-force $F^\mu$`, String.raw`$dp^\mu/d\tau$`, 'Depends on the scenario'],
        ] },
    ],
  },
  {
    id: 'relativistic-energy',
    title: 'Relativistic energy and mass–energy equivalence',
    branchId: 'special-relativity',
    level: 'Undergraduate 2',
    summary: 'The total energy of a moving particle is E = gamma m c squared; its kinetic part is (gamma minus one) m c squared, and rest energy implies that mass and energy are interchangeable.',
    prerequisites: ['einstein-postulates', 'relativistic-momentum', 'work-energy-power'],
    tags: ['rest energy', 'kinetic energy', 'binding energy', 'pair production'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Relativistic energy completes the replacement of Newtonian dynamics. A particle at rest still possesses rest energy $E_0=mc^2$; when it moves, its total energy is $\gamma mc^2$ and its kinetic energy is the excess $(\gamma-1)mc^2$. The relation $E^2=p^2c^2+m^2c^4$ unifies energy and momentum and applies equally to massive particles and to massless photons, for which $E=pc$.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`The rest energy is not a hidden reservoir waiting to be released from an isolated particle; it is the energy associated with the particle's existence and invariant mass. Changes in the internal energy of a composite system change its invariant mass by $\Delta m=\Delta E/c^2$. Nuclear binding energies are a few MeV per nucleon, roughly a percent of the nucleon rest energy, which is why nuclear reactions release millions of times more energy per unit mass than chemical reactions.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`Work done on a particle increases gamma rather than speeding it up without limit. At low speed the kinetic energy reduces to the familiar $\tfrac12mv^2$; at high speed it grows roughly linearly with momentum, so a particle in a synchrotron gains energy while its speed changes very little. Energy can also convert into new particles when enough is concentrated in a collision, provided all conserved quantities are respected.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Mass is not literally converted into energy in every reaction',
        text: String.raw`In a nuclear reaction the sum of the rest masses of the products can be less than that of the reactants; the difference appears as kinetic energy. The invariant mass of the whole isolated system is still conserved. What decreases is the sum of the rest masses of the separate fragments, because some energy that once contributed to invariant mass is now kinetic.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Rest energy**: $E_0=mc^2$, the energy of a particle in its rest frame.`,
          String.raw`**Total energy**: $E=\gamma mc^2$ for a massive particle in a given frame.`,
          String.raw`**Kinetic energy**: $K=(\gamma-1)mc^2$, reducing to $\tfrac12mv^2$ at low speed.`,
          String.raw`**Massless particles**: photons have $m=0$ and $E=pc=h\nu$.`,
          String.raw`**Invariant mass of a system**: $M^2c^4=E_{\mathrm{tot}}^2-p_{\mathrm{tot}}^2c^2$.`,
          String.raw`**Binding energy**: the mass defect of a bound system equals its binding energy divided by $c^2$.`,
          String.raw`**Pair production and annihilation**: energy converts into particle–antiparticle pairs and back, conserving charge and other quantum numbers.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Let $m$ be invariant rest mass, $\gamma$ the Lorentz factor and $\mathbf{p}=\gamma m\mathbf{v}$ the momentum. The energy of a massive particle follows from integrating the relativistic work–energy relation, and the result combines with momentum into a Lorentz-invariant equation.`,
      },
      { kind: 'math', display: true, latex: String.raw`E=\gamma mc^2,\qquad K=E-mc^2=(\gamma-1)mc^2,\qquad E^2=p^2c^2+m^2c^4`, caption: 'Total energy, kinetic energy and the invariant energy–momentum relation.' },
     
      {
        kind: 'paragraph',
        text: String.raw`Expanding the kinetic energy for small velocities shows that special relativity contains Newtonian mechanics as a limit. The leading correction is of order $v^2/c^2$, which is why the new terms matter only for atomic particles, cosmic rays and precision measurements.`,
      },
      { kind: 'math', display: true, latex: String.raw`K=(\gamma-1)mc^2=\frac{1}{2}mv^2+\frac{3}{8}\frac{mv^4}{c^2}+\cdots\ \xrightarrow{v\ll c}\ \frac{1}{2}mv^2`, caption: 'Low-speed expansion of relativistic kinetic energy.' },
      {
        kind: 'paragraph',
        text: String.raw`For a composite system, adding four-momenta and taking the invariant square defines the system's invariant mass. This mass includes internal kinetic and potential energy, so a hot object is very slightly heavier than a cold one and a bound nucleus is lighter than its separated nucleons. The energy released in a reaction is $Q=(m_{\mathrm{initial}}-m_{\mathrm{final}})c^2$.`,
      },
      { kind: 'math', display: true, latex: String.raw`M^2c^4=E_{\mathrm{tot}}^2-p_{\mathrm{tot}}^2c^2,\qquad Q=\left(m_{\mathrm{initial}}-m_{\mathrm{final}}\right)c^2`, caption: 'Invariant mass of a system and the energy released in a reaction.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'Accelerating an electron and converting mass to energy',
        items: [
          { title: 'Energy gained through a potential', text: 'An electron accelerated through one megavolt gains one MeV of kinetic energy. Its rest energy is 0.511 MeV.', math: String.raw`K=1\ \mathrm{MeV},\qquad mc^2=0.511\ \mathrm{MeV}` },
          { title: 'Find the Lorentz factor', text: 'Use the kinetic-energy relation to obtain gamma.', math: String.raw`\gamma=1+\frac{K}{mc^2}=1+\frac{1}{0.511}=2.957` },
          { title: 'Find the speed', text: 'Invert the definition of gamma to get beta.', math: String.raw`\beta=\sqrt{1-\gamma^{-2}}=\sqrt{1-0.1144}=0.941` },
          { title: 'Compare a macroscopic mass', text: 'One kilogram fully converted to energy gives about 21.5 megatons of TNT equivalent, since one megaton is 4.184 petajoules.', math: String.raw`E=1\times(3.00\times10^8)^2=9.0\times10^{16}\ \mathrm{J}\approx21.5\ \mathrm{Mt}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Mass–energy equivalence is not a recipe for total conversion',
        text: 'Turning rest mass entirely into usable energy requires matter–antimatter annihilation; ordinary nuclear fission and fusion convert only a small fraction of the rest mass. Energy and momentum must both be conserved, and the invariant mass of the complete isolated system never changes.',
      },
      {
        kind: 'list',
        items: [
          'Flat spacetime and inertial frames assumed.',
          'Particle treated as free or interacting over a short, well-localised event.',
          'Massless particles have no rest frame; use E = pc.',
          'Binding energy changes invariant mass only when comparing different bound states.',
          'Low-speed expansion valid only for v much smaller than c.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`John Cockcroft and Ernest Walton's 1932 experiment split lithium nuclei with accelerated protons and measured the energy release in agreement with the mass defect. Nuclear binding-energy measurements across the periodic table confirm $\Delta E=\Delta mc^2$. Pair production and electron–positron annihilation, observed from the 1930s onward, directly demonstrate conversion between photons and matter; positron emission tomography uses annihilation photons routinely in medicine. The Large Electron–Positron collider verified the energy–momentum relation at energies thousands of times the electron rest energy, and solar luminosity is explained by fusion mass defects.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**E = mc squared applies to moving objects as written.** It is the rest energy; a moving particle has $E=\gamma mc^2$.`,
          '**Nuclear reactions destroy mass.** They reduce the sum of rest masses of fragments while total energy and system invariant mass are conserved.',
          String.raw`**Massless means no energy.** Photons have zero rest mass but carry energy $h\nu$ and momentum $E/c$.`,
          '**Any small object could release its rest energy by burning.** Chemical processes tap binding energies of order electronvolts, not the full rest energy.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Relativistic energy builds on *einstein-postulates* and *relativistic-momentum*, and it is naturally written with *four-vectors*. It is essential to *nuclear-reactions*, *nuclear-fission*, *nuclear-fusion* and *mass-energy-equivalence* in nuclear physics, and to *particle-physics* processes such as pair production. Stellar energetics in *nuclear-burning* and *stellar-structure* rely on the same mass defect.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Nuclear power and fusion research: Q values from measured mass differences.',
          'Particle accelerators and colliders: beam energy determines accessible new particles.',
          'Medical physics: positron emission tomography and radiation therapy planning.',
          'Astrophysics: stellar luminosities and supernova energetics from binding-energy changes.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'OpenStax, *University Physics Volume 3*, section 28.5 on relativistic energy and rest energy.',
          'MIT OpenCourseWare 8.033 Relativity, lectures on mass–energy equivalence.',
          'The Feynman Lectures on Physics volume I, chapter 15–16 on conservation of energy and relativistic energy.',
        ],
      },
      {
        kind: 'table', headers: ['System', 'Energy scale', 'Fraction of rest mass'], rows: [
          ['Chemical bond', 'A few eV', String.raw`$\sim10^{-8}$`],
          ['Nuclear binding', 'Several MeV per nucleon', String.raw`$\sim10^{-2}$`],
          ['Electron rest energy', '0.511 MeV', '1'],
          ['Matter–antimatter annihilation', String.raw`$2mc^2$`, 'All rest mass converted'],
        ] },
    ],
  },
  {
    id: 'relativistic-electrodynamics',
    title: 'Relativistic electrodynamics',
    branchId: 'special-relativity',
    level: 'Undergraduate 4',
    summary: 'Maxwell’s equations are Lorentz invariant; electric and magnetic fields are components of one field tensor, so their split depends on the observer while the electromagnetic field itself does not.',
    prerequisites: ['maxwell-equations', 'four-vectors', 'electromagnetic-field-tensor', 'lorentz-transformations'],
    tags: ['field tensor', 'covariant Maxwell equations', 'field transformations', 'radiation'],
    updated: '2026-11-24',
    blocks: [
      {
        kind: 'paragraph',
        text: String.raw`Special relativity was born from the compatibility of Maxwell's electrodynamics with the principle of relativity. In relativistic electrodynamics the electric and magnetic fields are unified into the antisymmetric field tensor $F^{\mu\nu}$, and charge and current form the four-current $J^\mu$. Maxwell's equations collapse into two compact covariant statements, and the Lorentz force law becomes a four-vector equation. Fields that are purely electric in one frame generally have both electric and magnetic components in another.`,
      },
      { kind: 'heading', text: 'Physical intuition', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Magnetism can be viewed as a relativistic effect of moving charges. A line of stationary charges produces only an electric field in its rest frame. An observer moving alongside the line sees a different charge density because of length contraction, and sees moving charges that constitute a current; the transformed field includes a magnetic component. Nothing physically new appears: the same electromagnetic field is decomposed differently by different observers.`,
      },
      {
        kind: 'paragraph',
        text: String.raw`The field tensor is antisymmetric, with six independent components matching the three components each of $\mathbf{E}$ and $\mathbf{B}$. Under a boost, components parallel to the boost direction are unchanged while perpendicular components mix. Two Lorentz invariants can be formed from the tensor: $E^2-c^2B^2$ and $\mathbf{E}\cdot\mathbf{B}$. If one is nonzero, no boost can eliminate the corresponding field entirely, which explains why a pure magnetic field cannot be transformed into a pure electric field in general.`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        title: 'Propagating light has both invariants zero',
        text: String.raw`For a plane electromagnetic wave in vacuum, $E=cB$ and $\mathbf{E}$ is perpendicular to $\mathbf{B}$, so both Lorentz invariants vanish. This is why no observer can transform to a frame where the wave disappears: a light-like field cannot be boosted away, consistent with the invariance of $c$.`,
      },
      { kind: 'heading', text: 'Core concepts', level: 3 },
      {
        kind: 'list',
        items: [
          String.raw`**Field tensor $F^{\mu\nu}$**: an antisymmetric rank-two object containing $\mathbf{E}$ and $\mathbf{B}$.`,
          String.raw`**Four-current**: $J^\mu=(c\rho,\mathbf{J})$, whose conservation is $\partial_\mu J^\mu=0$.`,
          String.raw`**Covariant Maxwell equations**: $\partial_\mu F^{\mu\nu}=\mu_0J^\nu$ and $\partial_{[\alpha}F_{\beta\gamma]}=0$.`,
          String.raw`**Covariant Lorentz force**: $dp^\mu/d\tau=qF^{\mu}{}_{\nu}U^\nu$.`,
          String.raw`**Field transformations**: parallel components unchanged; perpendicular components mix under boosts.`,
          String.raw`**Lorentz invariants**: $E^2-c^2B^2$ and $\mathbf{E}\cdot\mathbf{B}$.`,
          String.raw`**Retarded potentials and radiation**: Liénard–Wiechert fields of an arbitrarily moving charge include a radiation term decaying as $1/R$.`,
        ],
      },
      { kind: 'heading', text: 'Mathematical structure', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Using coordinates $x^\mu=(ct,x,y,z)$ and the convention $F^{0i}=-E_i/c$, the field tensor displays all six field components. Repeated Greek indices are summed from 0 to 3, and raising or lowering indices uses the metric $\eta_{\mu\nu}$ with signature $(+,-,-,-)$.`,
      },
      { kind: 'math', display: true, latex: String.raw`F^{\mu\nu}=\begin{pmatrix}0 & -E_x/c & -E_y/c & -E_z/c\\ E_x/c & 0 & B_z & -B_y\\ E_y/c & -B_z & 0 & B_x\\ E_z/c & B_y & -B_x & 0\end{pmatrix}`, caption: 'Electromagnetic field tensor in the chosen sign convention.' },
     
      {
        kind: 'paragraph',
        text: String.raw`The two inhomogeneous and homogeneous Maxwell equations become a divergence equation and a cyclic identity for the tensor. The Lorentz force law likewise takes a single covariant form in which the rate of change of four-momentum with respect to proper time is linear in the field tensor and the four-velocity.`,
      },
      { kind: 'math', display: true, latex: String.raw`\partial_\mu F^{\mu\nu}=\mu_0J^\nu,\qquad \partial_{[\alpha}F_{\beta\gamma]}=0,\qquad \frac{dp^\mu}{d\tau}=qF^{\mu}{}_{\nu}U^\nu`, caption: 'Covariant Maxwell equations and the covariant Lorentz force law.' },
      {
        kind: 'paragraph',
        text: String.raw`For a boost of speed $v$ along the x axis, the components parallel to the motion are unchanged while the perpendicular components mix. In the late-time or far-field region the Liénard–Wiechert fields of an accelerated charge split into a velocity field falling as $1/R^2$ and a radiation field falling as $1/R$; only the latter transports energy to infinity.`,
      },
      { kind: 'math', display: true, latex: String.raw`E'_{\parallel}=E_{\parallel},\quad B'_{\parallel}=B_{\parallel},\quad \mathbf{E}'_{\perp}=\gamma(\mathbf{E}+\mathbf{v}\times\mathbf{B})_{\perp},\quad \mathbf{B}'_{\perp}=\gamma\!\left(\mathbf{B}-\frac{\mathbf{v}\times\mathbf{E}}{c^2}\right)_{\perp}`, caption: 'Transformation of electromagnetic fields under a Lorentz boost.' },
      { kind: 'heading', text: 'Worked example', level: 3 },
      {
        kind: 'steps',
        title: 'A purely electric field seen from a moving frame',
        items: [
          { title: 'Define the rest-frame field', text: 'A charge at rest in frame S prime produces only a y-directed electric field of 100 kV/m; its magnetic field is zero.', math: String.raw`E'_y=1.0\times10^5\ \mathrm{V\,m^{-1}},\qquad \mathbf{B}'=0` },
          { title: 'Boost along x', text: 'Frame S sees the charge moving in the positive x direction at 0.6c, so gamma is 1.25.', math: String.raw`v=0.6c=1.8\times10^8\ \mathrm{m\,s^{-1}},\qquad\gamma=1.25` },
          { title: 'Transform the field', text: 'Invert the perpendicular transformation with B prime zero.', math: String.raw`E_y=\gamma E'_y=1.25\times10^5\ \mathrm{V\,m^{-1}}` },
          { title: 'Find the induced magnetic field', text: 'The boost generates a z-directed magnetic field.', math: String.raw`B_z=\gamma\frac{vE'_y}{c^2}=\frac{1.25(1.8\times10^8)(1.0\times10^5)}{9.0\times10^{16}}=2.5\times10^{-4}\ \mathrm{T}` },
        ],
      },
      { kind: 'heading', text: 'Assumptions and approximations', level: 3 },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Field transformations are local',
        text: 'The boost formulas relate field values at the same spacetime event, not fields measured at different times or positions. They assume inertial frames and flat spacetime. In material media the polarisation and magnetisation also transform, so simple vacuum formulas must be modified.',
      },
      {
        kind: 'list',
        items: [
          'Inertial frames and flat spacetime assumed.',
          'Vacuum field tensor; macroscopic media require a modified constitutive relation.',
          'Field values compared at the same spacetime event.',
          'Sign conventions for F to the power mu nu vary between texts; consistency is essential.',
          'Retarded-field formulas assume the charge motion is known and ignore radiation reaction.',
        ],
      },
      { kind: 'heading', text: 'Experimental and observational evidence', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Hippolyte Fizeau's 1851 experiment with light in flowing water measured the drag coefficient predicted by the relativistic velocity transformation applied to a medium. Albert Michelson and Edward Morley's 1887 null result is consistent with Lorentz invariance of Maxwell's equations. Ives–Stilwell Doppler measurements tested relativistic time dilation in moving ions. Synchrotron radiation, seen in electron storage rings and astrophysical sources, matches the Liénard–Wiechert prediction, and the magnetic fields measured around moving charge distributions confirm the field transformations in accelerator beam experiments.`,
      },
      { kind: 'heading', text: 'Common misconceptions', level: 3 },
      {
        kind: 'list',
        items: [
          '**Magnetism is only an illusion caused by relativity.** It is a real component of the electromagnetic field; relativity explains why different observers split the same field differently.',
          '**A pure electric field can always be boosted away.** Only if the invariants allow it; a nonzero invariant can forbid the transformation.',
          '**F to the power mu nu has six independent components because there are six fields.** It is antisymmetric by construction, which encodes the absence of magnetic monopoles in the homogeneous equations.',
          '**Retarded fields are a measurement delay only.** They reflect the finite propagation speed of electromagnetic influence, not just instrumental lag.',
        ],
      },
      { kind: 'heading', text: 'Connections across physics', level: 3 },
      {
        kind: 'paragraph',
        text: String.raw`Relativistic electrodynamics unifies *maxwell-equations* with *einstein-postulates* using *four-vectors* and *electromagnetic-field-tensor*. It explains *magnetic-fields* as frame-dependent aspects of one field and underpins *electromagnetic-radiation*, *retarded-potentials* and *accelerating-charges*. Its quantum extension is *qed*, and its role in covariant field theory continues in *covariant-electrodynamics*.`,
      },
      { kind: 'heading', text: 'Where this is used', level: 3 },
      {
        kind: 'list',
        items: [
          'Accelerator physics: transformed fields determine beam focusing and bending in the laboratory frame.',
          'Synchrotron light sources: radiation from relativistic electrons calculated from Liénard–Wiechert fields.',
          'Astrophysics: emission from relativistic jets and pulsar magnetospheres.',
          'Plasma physics and space physics: Lorentz transformations of fields in moving plasmas.',
        ],
      },
      { kind: 'heading', text: 'Further study', level: 3 },
      {
        kind: 'list',
        items: [
          'MIT OpenCourseWare 8.033 Relativity, notes on covariant electrodynamics.',
          'The Feynman Lectures on Physics volume II, chapters 13 and 25 on relativistic effects and field transformations.',
          'Jackson, *Classical Electrodynamics*, chapter 11, for the covariant formulation and Liénard–Wiechert fields.',
        ],
      },
      {
        kind: 'table', headers: ['Quantity', 'Three-vector form', 'Covariant form'], rows: [
          ['Sources', String.raw`$(\rho,\mathbf{J})$`, String.raw`$J^\mu=(c\rho,\mathbf{J})$`],
          ['Fields', String.raw`$(\mathbf{E},\mathbf{B})$`, String.raw`$F^{\mu\nu}$`],
          ['Gauss and Ampère', 'Two equations', String.raw`$\partial_\mu F^{\mu\nu}=\mu_0J^\nu$`],
          ['Lorentz force', String.raw`$q(\mathbf{E}+\mathbf{v}\times\mathbf{B})$`, String.raw`$qF^\mu{}_\nu U^\nu$`],
        ] },
    ],
  },
]













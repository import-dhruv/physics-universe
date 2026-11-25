import type { GeneratedFamily, GeneratedSolution, RNG } from './types'

const fmt = (x: number, d = 2): string => x.toFixed(d)

const H = 6.626e-34          // Planck constant, J s
const HBAR = 1.054571817e-34 // reduced Planck constant, J s
const C = 3.00e8             // speed of light, m/s
const E_CHARGE = 1.602e-19   // elementary charge, C
const M_E = 9.109e-31        // electron rest mass, kg
const HC_EV_NM = 1239.84     // hc/e in eV nm

export const PHYSICS_FAMILIES_5: GeneratedFamily[] = [
  {
    id: 'p5-faraday-law',
    domain: 'physics',
    topicId: 'faraday-law',
    title: 'Faraday induction',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['magnetic flux', 'Faraday law', 'induced emf', 'Lenz law'],
    build(rng: RNG, index: number): GeneratedSolution {
      const turns = rng.int(20, 200) + (index % 5) * 10
      const radius = rng.num(0.05, 0.20, 2)
      const bInitial = rng.num(0.40, 1.20, 2)
      const bFinal = rng.num(0.05, 0.30, 2)
      const duration = rng.num(0.10, 0.80, 2)
      const area = Math.PI * radius * radius
      const deltaB = bInitial - bFinal
      const emf = turns * area * deltaB / duration

      return {
        statement: `A circular coil of ${turns} turns, each of radius ${fmt(radius)} m, lies with its plane perpendicular to a uniform magnetic field. The field is reduced steadily from ${fmt(bInitial)} T to ${fmt(bFinal)} T in ${fmt(duration)} s. Calculate the magnitude of the induced emf in the coil, and state the sense of the induced current.`,
        hints: [
          'The flux through one turn is the field times the area because the field is normal to the coil.',
          'Faraday law uses the rate of change of flux linkage, so use the change in field, not its final value.',
          'Multiply the single-turn emf by the number of turns, then apply Lenz law to decide the current direction.',
        ],
        steps: [
          {
            title: 'Area of one turn',
            text: 'The coil is circular, so the area vector is parallel to the field and the flux per turn is simply BA.',
            math: String.raw`A=\pi r^2=\pi(${fmt(radius)}\,\mathrm{m})^2=${fmt(area, 4)}\,\mathrm{m}^2`,
          },
          {
            title: 'Change of flux per turn',
            text: 'The field falls, so the magnitude of the flux change per turn is the area times the drop in field.',
            math: String.raw`|\Delta\Phi|=A(B_i-B_f)=(${fmt(area, 4)}\,\mathrm{m}^2)(${fmt(bInitial)}-${fmt(bFinal)})\,\mathrm{T}=${fmt(area * deltaB, 4)}\,\mathrm{Wb}`,
          },
          {
            title: 'Apply Faraday law',
            text: 'For N turns the induced emf equals N times the rate of change of flux linkage; the field changes linearly so the rate is constant.',
            math: String.raw`|\mathcal{E}|=N\frac{|\Delta\Phi|}{\Delta t}=${turns}\cdot\frac{${fmt(area * deltaB, 4)}\,\mathrm{Wb}}{${fmt(duration)}\,\mathrm{s}}`,
          },
          {
            title: 'Numerical value',
            text: 'Substituting the numbers gives the emf in volts.',
            math: String.raw`|\mathcal{E}|=${fmt(emf, 3)}\,\mathrm{V}`,
          },
          {
            title: 'Direction from Lenz law',
            text: 'The flux through the coil decreases, so the induced current circulates to produce a field in the same direction as the original field, opposing the decrease.',
          },
        ],
        answer: `Induced emf = ${fmt(emf, 3)} V; the induced current circulates so as to reinforce the decreasing flux.`,
        alternatives: [
          'First compute dB/dt = (B_i - B_f)/Δt and then use |ε| = N A |dB/dt|.',
          'Use the flux-linkage form |ε| = |Δ(NΦ)|/Δt and evaluate the initial and final flux linkages directly.',
        ],
        mistakes: [
          'Forgetting to multiply by the number of turns N.',
          'Using the diameter instead of the radius when computing the coil area.',
          'Substituting the final field instead of the change in field.',
        ],
        further: 'If the coil were slowly rotated until its plane made 60° with the field (so its normal made 30°), how would the emf change? Answer: multiply by cos 30° ≈ 0.866 because only the normal component of the field contributes to flux.',
      }
    },
  },
  {
    id: 'p5-inductance',
    domain: 'physics',
    topicId: 'inductance',
    title: 'Inductance and RL circuits',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['self-inductance', 'RL circuit', 'time constant', 'exponential growth', 'stored energy'],
    build(rng: RNG, index: number): GeneratedSolution {
      const resistance = rng.int(10, 100) + (index % 4) * 5
      const inductance = rng.num(0.10, 0.80, 2)
      const voltage = rng.int(5, 24)
      const ratio = rng.pick([0.5, 1, 2, 3])
      const tau = inductance / resistance
      const time = ratio * tau
      const finalCurrent = voltage / resistance
      const current = finalCurrent * (1 - Math.exp(-time / tau))
      const storedEnergy = 0.5 * inductance * current * current

      return {
        statement: `A resistor of ${resistance} Ω and an inductor of ${fmt(inductance)} H are connected in series to a ${voltage} V battery through a switch. The switch is closed at t = 0 and the current was initially zero. Find the time constant of the circuit, the current at t = ${fmt(time, 3)} s, and the energy then stored in the inductor.`,
        hints: [
          'The inductive time constant of a series RL circuit is L/R.',
          'The current approaches its steady value V/R according to I(t) = I_inf (1 - exp(-t/τ)).',
          'Here the chosen time is a simple multiple of τ, so the exponential factor can be evaluated exactly before multiplying by V/R.',
        ],
        steps: [
          {
            title: 'Time constant',
            text: 'For a series RL circuit the ratio of inductance to resistance sets the exponential time scale.',
            math: String.raw`\tau=\frac{L}{R}=\frac{${fmt(inductance)}\,\mathrm{H}}{${resistance}\,\Omega}=${fmt(tau, 4)}\,\mathrm{s}`,
          },
          {
            title: 'Steady-state current',
            text: 'After a long time the inductor behaves like a plain wire, leaving the battery driving only the resistor.',
            math: String.raw`I_{\infty}=\frac{V}{R}=\frac{${voltage}\,\mathrm{V}}{${resistance}\,\Omega}=${fmt(finalCurrent, 3)}\,\mathrm{A}`,
          },
          {
            title: 'Current at the stated time',
            text: 'The elapsed time is τ times the chosen factor, so the exponent is just minus that factor.',
            math: String.raw`I(t)=I_{\infty}\left(1-e^{-t/\tau}\right)=${fmt(finalCurrent, 3)}\left(1-e^{-${ratio}}\right)\,\mathrm{A}`,
          },
          {
            title: 'Numerical current',
            text: 'Evaluating the exponential gives the current at the requested instant.',
            math: String.raw`I=${fmt(current, 3)}\,\mathrm{A}`,
          },
          {
            title: 'Energy in the magnetic field',
            text: 'The energy stored in an inductor is one half L I squared at the instantaneous current.',
            math: String.raw`U=\frac{1}{2}LI^2=\frac{1}{2}(${fmt(inductance)}\,\mathrm{H})(${fmt(current, 3)}\,\mathrm{A})^2=${fmt(storedEnergy, 4)}\,\mathrm{J}`,
          },
        ],
        answer: `Time constant = ${fmt(tau, 4)} s; current = ${fmt(current, 3)} A; stored energy = ${fmt(storedEnergy, 4)} J.`,
        alternatives: [
          'Solve the loop equation V - IR - L dI/dt = 0 directly by separation of variables.',
          'Write I(t) = I_inf - I_inf exp(-Rt/L) and substitute Rt/L = t/τ.',
        ],
        mistakes: [
          'Using τ = R/L instead of τ = L/R.',
          'Assuming the current jumps instantly to V/R when the switch closes.',
          'Using e^{+t/τ}, which would make the current grow without bound.',
        ],
        further: 'How long after closing the switch does the current reach 90% of its final value? Since 1 - exp(-t/τ) = 0.9, t = τ ln 10 ≈ 2.303τ.',
      }
    },
  },
  {
    id: 'p5-ac-circuits',
    domain: 'physics',
    topicId: 'ac-circuits',
    title: 'AC circuits',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['series RLC circuit', 'reactance', 'impedance', 'phase angle', 'RMS values'],
    build(rng: RNG, index: number): GeneratedSolution {
      const frequency = rng.int(50, 400) + (index % 7) * 5
      const resistance = rng.int(20, 120)
      const inductance = rng.num(0.05, 0.40, 2)
      const capacitance = rng.num(10, 100, 1)
      const vRms = rng.int(110, 240)
      const capacitanceFarads = capacitance * 1e-6
      const omega = 2 * Math.PI * frequency
      const xL = omega * inductance
      const xC = 1 / (omega * capacitanceFarads)
      const netReactance = xL - xC
      const impedance = Math.sqrt(resistance * resistance + netReactance * netReactance)
      const currentRms = vRms / impedance
      const phaseDeg = Math.atan2(netReactance, resistance) * 180 / Math.PI
      const resonance = 1 / (2 * Math.PI * Math.sqrt(inductance * capacitanceFarads))

      return {
        statement: `A series RLC circuit has R = ${resistance} Ω, L = ${fmt(inductance)} H and C = ${fmt(capacitance)} µF. It is driven by an AC supply of frequency ${frequency} Hz with an RMS voltage of ${vRms} V. Determine the RMS current and the phase angle between the supply voltage and the current, stating whether the current leads or lags.`,
        hints: [
          'Compute the inductive reactance ωL and capacitive reactance 1/(ωC) with ω = 2πf and C converted to farads.',
          'The impedance magnitude is the hypotenuse of the resistance and net reactance: Z = √(R² + (X_L - X_C)²).',
          'The phase angle satisfies tan φ = (X_L - X_C)/R; positive net reactance means the voltage leads the current.',
        ],
        steps: [
          {
            title: 'Angular frequency and reactances',
            text: 'Convert the frequency to angular frequency, then find the opposing reactances of the inductor and capacitor.',
            math: String.raw`\omega=2\pi f=2\pi(${frequency})\,\mathrm{Hz}=${fmt(omega, 1)}\,\mathrm{rad\,s^{-1}}`,
          },
          {
            title: 'Individual reactances',
            text: 'The capacitance is given in microfarads, so multiply by 10 to the minus six before using it in SI units.',
            math: String.raw`X_L=\omega L=${fmt(xL, 2)}\,\Omega,\qquad X_C=\frac{1}{\omega C}=\frac{1}{(${fmt(omega, 1)})(${fmt(capacitance)}\times10^{-6}\,\mathrm{F})}=${fmt(xC, 2)}\,\Omega`,
          },
          {
            title: 'Impedance magnitude',
            text: 'The resistance and net reactance add in quadrature because their voltage drops are ninety degrees out of phase.',
            math: String.raw`Z=\sqrt{R^2+(X_L-X_C)^2}=\sqrt{${resistance}^2+(${fmt(xL, 2)}-${fmt(xC, 2)})^2}=${fmt(impedance, 2)}\,\Omega`,
          },
          {
            title: 'RMS current',
            text: 'Ohm law generalises to AC using the impedance magnitude with RMS values.',
            math: String.raw`I_{\mathrm{rms}}=\frac{V_{\mathrm{rms}}}{Z}=\frac{${vRms}\,\mathrm{V}}{${fmt(impedance, 2)}\,\Omega}=${fmt(currentRms, 3)}\,\mathrm{A}`,
          },
          {
            title: 'Phase angle',
            text: 'The arctangent of net reactance over resistance gives the angle by which the voltage leads the current.',
            math: String.raw`\phi=\arctan\frac{X_L-X_C}{R}=\arctan\frac{${fmt(netReactance, 2)}}{${resistance}}=${fmt(phaseDeg, 1)}^\circ`,
          },
        ],
        answer: `RMS current = ${fmt(currentRms, 3)} A; phase angle = ${fmt(Math.abs(phaseDeg), 1)}° with the current ${netReactance > 0 ? 'lagging' : 'leading'} the supply voltage.`,
        alternatives: [
          'Draw the phasor triangle with V_R in phase, V_L leading by 90° and V_C lagging by 90°, then read off Z and φ.',
          'Compare the driving frequency with the resonant frequency f₀ = 1/(2π√(LC)) = ' + fmt(resonance, 1) + ' Hz to predict the sign of the phase angle.',
        ],
        mistakes: [
          'Using the capacitance in microfarads without converting to farads.',
          'Using peak voltage where the question asks for RMS current.',
          'Adding X_L and X_C instead of subtracting them when forming the net reactance.',
        ],
        further: 'At the resonant frequency the reactances cancel, so Z = R and the current would be V_rms/R = ' + fmt(vRms / resistance, 3) + ' A, in phase with the voltage.',
      }
    },
  },
  {
    id: 'p5-wave-motion',
    domain: 'physics',
    topicId: 'wave-motion',
    title: 'Wave parameters',
    level: 'High school',
    type: 'Graph interpretation',
    concepts: ['wavelength', 'period and frequency', 'wave speed', 'amplitude', 'transverse particle speed'],
    build(rng: RNG, index: number): GeneratedSolution {
      const wavelength = rng.num(0.40, 2.00, 2) + (index % 3) * 0.05
      const halfPeriod = rng.num(0.03, 0.25, 3)
      const period = 2 * halfPeriod
      const amplitudeCm = rng.num(2.0, 12.0, 1)
      const amplitudeM = amplitudeCm / 100
      const frequency = 1 / period
      const waveSpeed = wavelength * frequency
      const omega = 2 * Math.PI * frequency
      const maxParticleSpeed = amplitudeM * omega

      return {
        statement: `A snapshot graph of a sinusoidal wave on a string shows successive crests separated by ${fmt(wavelength)} m. At one fixed point on the string the displacement changes from its maximum of +${fmt(amplitudeCm)} cm to its minimum of -${fmt(amplitudeCm)} cm in ${fmt(halfPeriod, 3)} s. Read the wave parameters from this description and find the frequency, the wave speed, and the maximum transverse speed of a point on the string.`,
        hints: [
          'On a displacement against position graph, the crest-to-crest spacing is the wavelength.',
          'Crest to trough at one point is half an oscillation, so double the quoted time to get the period.',
          'A point of the string executes simple harmonic motion, so its maximum speed is Aω = 2πAf; this is not the wave speed.',
        ],
        steps: [
          {
            title: 'Read the wavelength',
            text: 'Adjacent crests are one wavelength apart on a snapshot of a sinusoidal wave.',
            math: String.raw`\lambda=${fmt(wavelength)}\,\mathrm{m}`,
          },
          {
            title: 'Read the period',
            text: 'Going from maximum displacement to minimum displacement takes half a cycle.',
            math: String.raw`\frac{T}{2}=${fmt(halfPeriod, 3)}\,\mathrm{s}\quad\Rightarrow\quad T=2(${fmt(halfPeriod, 3)})=${fmt(period, 3)}\,\mathrm{s}`,
          },
          {
            title: 'Frequency',
            text: 'Frequency is the reciprocal of the period.',
            math: String.raw`f=\frac{1}{T}=\frac{1}{${fmt(period, 3)}\,\mathrm{s}}=${fmt(frequency, 2)}\,\mathrm{Hz}`,
          },
          {
            title: 'Wave speed',
            text: 'The pattern advances one wavelength per period, so the propagation speed is λ divided by T.',
            math: String.raw`v=\frac{\lambda}{T}=\lambda f=(${fmt(wavelength)}\,\mathrm{m})(${fmt(frequency, 2)}\,\mathrm{Hz})=${fmt(waveSpeed, 2)}\,\mathrm{m\,s^{-1}}`,
          },
          {
            title: 'Maximum transverse speed',
            text: 'Convert the amplitude to metres before using it, since the particle velocity is Aω.',
            math: String.raw`A=${fmt(amplitudeCm)}\,\mathrm{cm}=${fmt(amplitudeM, 3)}\,\mathrm{m},\qquad v_{\mathrm{particle,max}}=A\omega=2\pi Af=${fmt(maxParticleSpeed, 2)}\,\mathrm{m\,s^{-1}}`,
          },
        ],
        answer: `Frequency = ${fmt(frequency, 2)} Hz; wave speed = ${fmt(waveSpeed, 2)} m/s; maximum transverse speed of a string point = ${fmt(maxParticleSpeed, 2)} m/s.`,
        alternatives: [
          'Use v = λ/T directly from the definitions instead of computing f first.',
          'Differentiate y = A sin(kx - ωt) with respect to time to obtain the particle velocity Aω cos(kx - ωt).',
        ],
        mistakes: [
          'Treating the crest-to-trough time as a full period rather than half a period.',
          'Using the amplitude in centimetres alongside SI units for frequency.',
          'Confusing the propagation speed of the wave with the much smaller transverse speed of a string element.',
        ],
        further: 'If the string tension were quadrupled with unchanged linear density, the wave speed would double, and with the same frequency the wavelength would double to ' + fmt(2 * wavelength, 2) + ' m.',
      }
    },
  },
  {
    id: 'p5-superposition-interference',
    domain: 'physics',
    topicId: 'superposition-interference',
    title: 'Interference',
    level: 'Undergraduate 1',
    type: 'Experimental',
    concepts: ['Young double slit', 'path difference', 'fringe spacing', 'constructive interference', 'small-angle approximation'],
    build(rng: RNG, index: number): GeneratedSolution {
      const slitSeparationMm = rng.num(0.10, 0.50, 2)
      const screenDistance = rng.num(1.0, 3.0, 2)
      const wavelengthNm = rng.int(450, 700)
      const order = rng.int(2, 5) + (index % 2)
      const slitSeparation = slitSeparationMm * 1e-3
      const wavelength = wavelengthNm * 1e-9
      const fringeSpacingM = wavelength * screenDistance / slitSeparation
      const fringeSpacingMm = fringeSpacingM * 1000
      const brightPositionMm = order * fringeSpacingMm
      const angle = Math.asin(Math.min(1, order * wavelength / slitSeparation)) * 180 / Math.PI

      return {
        statement: `In a Young double-slit experiment a laser of wavelength ${wavelengthNm} nm illuminates two slits separated by ${fmt(slitSeparationMm)} mm. A screen is placed ${fmt(screenDistance)} m from the slits. Calculate the spacing between adjacent bright fringes and the distance from the central maximum to the ${order}${order === 1 ? 'st' : order === 2 ? 'nd' : order === 3 ? 'rd' : 'th'} order bright fringe.`,
        hints: [
          'Bright fringes occur where the path difference equals an integer number of wavelengths.',
          'For small angles the path difference is approximately d y / L, which gives Δy = λL/d.',
          'Convert the wavelength from nanometres and the slit separation from millimetres into metres first.',
        ],
        steps: [
          {
            title: 'Convert to SI units',
            text: 'Write the wavelength and slit separation in metres so that the fringe spacing comes out in metres.',
            math: String.raw`\lambda=${wavelengthNm}\,\mathrm{nm}=${wavelengthNm}\times10^{-9}\,\mathrm{m},\qquad d=${fmt(slitSeparationMm)}\,\mathrm{mm}=${fmt(slitSeparationMm)}\times10^{-3}\,\mathrm{m}`,
          },
          {
            title: 'Path difference condition',
            text: 'Constructive interference requires the extra distance travelled by one ray to be a whole number of wavelengths.',
            math: String.raw`d\sin\theta=m\lambda\quad\Rightarrow\quad \sin\theta\approx\frac{y}{L}`,
          },
          {
            title: 'Fringe spacing',
            text: 'Consecutive bright fringes differ by one wavelength of path difference, giving Δy = λL/d.',
            math: String.raw`\Delta y=\frac{\lambda L}{d}=\frac{(${fmt(wavelengthNm)}\times10^{-9})(${fmt(screenDistance)})}{${fmt(slitSeparationMm)}\times10^{-3}}=${fmt(fringeSpacingM, 5)}\,\mathrm{m}=${fmt(fringeSpacingMm, 2)}\,\mathrm{mm}`,
          },
          {
            title: 'Position of the chosen fringe',
            text: 'Fringes are equally spaced in the small-angle regime, so the m-th bright fringe lies m spacings from the centre.',
            math: String.raw`y_m=m\Delta y=${order}(${fmt(fringeSpacingMm, 2)}\,\mathrm{mm})=${fmt(brightPositionMm, 2)}\,\mathrm{mm}`,
          },
          {
            title: 'Check the small-angle assumption',
            text: 'The corresponding diffraction angle is small, so replacing sin θ and tan θ by y/L is justified.',
            math: String.raw`\theta_m\approx${fmt(angle, 3)}^\circ,\qquad \frac{y_m}{L}\ll 1`,
          },
        ],
        answer: `Fringe spacing = ${fmt(fringeSpacingMm, 2)} mm; ${order}${order === 1 ? 'st' : order === 2 ? 'nd' : order === 3 ? 'rd' : 'th'} bright fringe at ${fmt(brightPositionMm, 2)} mm from the central maximum.`,
        alternatives: [
          'Use the exact relations d sin θ = mλ and y = L tan θ, then compare with the small-angle result.',
          'Count fringes per unit length as 1/Δy and multiply by the measured distance on the screen.',
        ],
        mistakes: [
          'Forgetting to convert nanometres and millimetres to metres.',
          'Using the dark-fringe condition with a half-integer path difference.',
          'Omitting the order number m when locating a fringe away from the centre.',
        ],
        further: 'If the whole apparatus were immersed in water of refractive index 1.33, the wavelength in the medium would fall to λ/1.33 and the fringe spacing would become ' + fmt(fringeSpacingMm / 1.33, 2) + ' mm.',
      }
    },
  },
  {
    id: 'p5-diffraction',
    domain: 'physics',
    topicId: 'diffraction',
    title: 'Diffraction',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['single-slit diffraction', 'minima condition', 'angular width', 'screen geometry', 'small-angle approximation'],
    build(rng: RNG, index: number): GeneratedSolution {
      const wavelengthNm = rng.int(450, 700)
      const slitWidthMm = rng.num(0.05, 0.30, 2)
      const screenDistance = rng.num(1.0, 3.0, 2) + (index % 3) * 0.1
      const wavelength = wavelengthNm * 1e-9
      const slitWidth = slitWidthMm * 1e-3
      const sinTheta = wavelength / slitWidth
      const thetaRad = Math.asin(Math.min(1, sinTheta))
      const thetaDeg = thetaRad * 180 / Math.PI
      const firstMinimumMm = screenDistance * Math.tan(thetaRad) * 1000
      const centralWidthMm = 2 * firstMinimumMm
      const smallAngleMm = screenDistance * sinTheta * 1000

      return {
        statement: `Monochromatic light of wavelength ${wavelengthNm} nm passes through a single slit of width ${fmt(slitWidthMm)} mm and forms a diffraction pattern on a screen ${fmt(screenDistance)} m away. Determine the angular position of the first dark fringe and the full width of the central bright maximum measured on the screen.`,
        hints: [
          'For a single slit, dark fringes satisfy a sin θ = mλ with m = 1, 2, 3 and so on.',
          'The first minimum on one side is at y = L tan θ; the central maximum spans from -y to +y.',
          'Because λ/a is small, the small-angle result y ≈ Lλ/a is a useful check on the exact answer.',
        ],
        steps: [
          {
            title: 'Convert the slit width',
            text: 'Use SI units for the slit width and wavelength before forming their ratio.',
            math: String.raw`a=${fmt(slitWidthMm)}\,\mathrm{mm}=${fmt(slitWidthMm)}\times10^{-3}\,\mathrm{m},\qquad \lambda=${wavelengthNm}\times10^{-9}\,\mathrm{m}`,
          },
          {
            title: 'Condition for the first minimum',
            text: 'The first dark fringe appears when the path difference between rays from the two edges of the slit equals one wavelength.',
            math: String.raw`a\sin\theta_1=\lambda\quad\Rightarrow\quad \sin\theta_1=\frac{${wavelengthNm}\times10^{-9}}{${fmt(slitWidthMm)}\times10^{-3}}=${fmt(sinTheta, 5)}`,
          },
          {
            title: 'Angular position',
            text: 'Take the inverse sine to find the angle of the first dark fringe from the central axis.',
            math: String.raw`\theta_1=\arcsin(${fmt(sinTheta, 5)})=${fmt(thetaDeg, 3)}^\circ`,
          },
          {
            title: 'Position on the screen',
            text: 'Project the angle onto the screen using y = L tan θ. The centre-to-centre width is twice this distance.',
            math: String.raw`y_1=L\tan\theta_1=(${fmt(screenDistance)}\,\mathrm{m})\tan(${fmt(thetaDeg, 3)}^\circ)=${fmt(firstMinimumMm, 2)}\,\mathrm{mm}`,
          },
          {
            title: 'Width of the central maximum',
            text: 'The central bright band runs between the first minima on either side.',
            math: String.raw`W=2y_1=2(${fmt(firstMinimumMm, 2)}\,\mathrm{mm})=${fmt(centralWidthMm, 2)}\,\mathrm{mm}\quad\left(\text{small angle: }${fmt(smallAngleMm, 2)}\,\mathrm{mm}\right)`,
          },
        ],
        answer: `First minimum at ${fmt(thetaDeg, 3)}° from the axis; central maximum width = ${fmt(centralWidthMm, 2)} mm on the screen.`,
        alternatives: [
          'Use the small-angle approximation θ ≈ λ/a and y ≈ Lλ/a, which gives ' + fmt(smallAngleMm, 2) + ' mm for the half-width.',
          'Work from the intensity function I(θ) = I₀ [sin(β)/β]² with β = πa sin θ/λ and locate its first zero.',
        ],
        mistakes: [
          'Using the double-slit bright-fringe condition a sin θ = mλ for maxima rather than minima.',
          'Reporting the half-width as the full width of the central maximum.',
          'Leaving the slit width in millimetres while the wavelength is in metres.',
        ],
        further: 'Doubling the slit width halves the diffraction angle and narrows the central maximum to ' + fmt(centralWidthMm / 2, 2) + ' mm.',
      }
    },
  },
  {
    id: 'p5-photoelectric-effect',
    domain: 'physics',
    topicId: 'photoelectric-effect',
    title: 'Photoelectric effect',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['photon energy', 'work function', 'maximum kinetic energy', 'stopping potential', 'threshold frequency'],
    build(rng: RNG, index: number): GeneratedSolution {
      const wavelengthNm = rng.int(180, 400) - (index % 5) * 5
      const workFunction = rng.num(1.2, 2.6, 2)
      const photonEnergy = HC_EV_NM / wavelengthNm
      const kineticEv = photonEnergy - workFunction
      const kineticJ = kineticEv * E_CHARGE
      const stoppingPotential = kineticEv
      const thresholdHz = workFunction * E_CHARGE / H
      const thresholdIn14 = thresholdHz / 1e14

      return {
        statement: `Ultraviolet light of wavelength ${wavelengthNm} nm shines on a metal whose work function is ${fmt(workFunction)} eV. Taking hc/e = ${HC_EV_NM} eV nm, find the maximum kinetic energy of the emitted electrons in electronvolts and in joules, the stopping potential, and the threshold frequency of the metal.`,
        hints: [
          'The photon energy in electronvolts is conveniently hc/e divided by the wavelength in nanometres.',
          'The work function is the minimum energy needed to free an electron, so subtract it from the photon energy.',
          'One electronvolt per electron charge equals one volt, and the threshold frequency satisfies h f₀ = φ.',
        ],
        steps: [
          {
            title: 'Photon energy',
            text: 'Use the photon energy in electronvolts from the wavelength expressed in nanometres.',
            math: String.raw`E_{\gamma}=\frac{hc}{\lambda}=\frac{${HC_EV_NM}\,\mathrm{eV\,nm}}{${wavelengthNm}\,\mathrm{nm}}=${fmt(photonEnergy, 3)}\,\mathrm{eV}`,
          },
          {
            title: 'Maximum kinetic energy',
            text: 'Einstein equation: the photon energy pays the work function and any remainder becomes electron kinetic energy.',
            math: String.raw`K_{\max}=E_{\gamma}-\phi=${fmt(photonEnergy, 3)}-${fmt(workFunction)}=${fmt(kineticEv, 3)}\,\mathrm{eV}`,
          },
          {
            title: 'Convert to joules',
            text: 'Multiply the electronvolt value by the elementary charge to obtain SI units.',
            math: String.raw`K_{\max}=(${fmt(kineticEv, 3)}\,\mathrm{eV})(1.602\times10^{-19}\,\mathrm{J/eV})=${fmt(kineticJ * 1e19, 2)}\times10^{-19}\,\mathrm{J}`,
          },
          {
            title: 'Stopping potential',
            text: 'The retarding potential that just stops the fastest electrons satisfies e V_s = K_max.',
            math: String.raw`V_s=\frac{K_{\max}}{e}=${fmt(stoppingPotential, 3)}\,\mathrm{V}`,
          },
          {
            title: 'Threshold frequency',
            text: 'Photoemission begins when the photon energy exactly equals the work function.',
            math: String.raw`f_0=\frac{\phi}{h}=\frac{${fmt(workFunction)}(1.602\times10^{-19})}{6.626\times10^{-34}}=${fmt(thresholdIn14, 2)}\times10^{14}\,\mathrm{Hz}`,
          },
        ],
        answer: `K_max = ${fmt(kineticEv, 3)} eV = ${fmt(kineticJ * 1e19, 2)} × 10⁻¹⁹ J; stopping potential = ${fmt(stoppingPotential, 3)} V; threshold frequency = ${fmt(thresholdIn14, 2)} × 10¹⁴ Hz.`,
        alternatives: [
          'Work entirely in frequency: K_max = hf - φ with f = c/λ.',
          'Plot stopping potential against frequency; the slope gives h/e and the intercept gives -φ/e.',
        ],
        mistakes: [
          'Using the wavelength in nanometres directly in E = hc/λ without unit conversion.',
          'Forgetting to subtract the work function from the photon energy.',
          'Mixing electronvolts and joules when computing the threshold frequency.',
        ],
        further: 'If the wavelength were doubled to ' + (wavelengthNm * 2) + ' nm, the photon energy would be ' + fmt(HC_EV_NM / (2 * wavelengthNm), 3) + ' eV; electrons would still be emitted only if this exceeds ' + fmt(workFunction) + ' eV.',
      }
    },
  },
  {
    id: 'p5-schrodinger-equation',
    domain: 'physics',
    topicId: 'schrodinger-equation',
    title: 'Schrödinger equation',
    level: 'Undergraduate 3',
    type: 'Derivation',
    concepts: ['time-independent Schrödinger equation', 'infinite square well', 'boundary conditions', 'energy quantisation', 'photon emission'],
    build(rng: RNG, index: number): GeneratedSolution {
      const wellNm = rng.num(0.50, 3.00, 2)
      const wellM = wellNm * 1e-9
      const nHigh = rng.int(3, 5) + (index % 2)
      const nLow = nHigh - rng.int(1, 2)
      const e1J = H * H / (8 * M_E * wellM * wellM)
      const e1Ev = e1J / E_CHARGE
      const deltaEv = (nHigh * nHigh - nLow * nLow) * e1Ev
      const photonNm = HC_EV_NM / deltaEv
      const doubledNm = photonNm * 4

      return {
        statement: `An electron is confined in a one-dimensional infinite potential well of width ${fmt(wellNm)} nm. Derive the allowed energy levels from the time-independent Schrödinger equation with ψ(0) = ψ(L) = 0. Then compute the ground-state energy and the wavelength of the photon emitted when the electron falls from level n = ${nHigh} to n = ${nLow}. Use h = 6.626 × 10⁻³⁴ J s and mₑ = 9.109 × 10⁻³¹ kg.`,
        hints: [
          'Inside the well the potential is zero, so the solutions are sine and cosine waves with k² = 2mE/ħ².',
          'The boundary condition at x = 0 removes the cosine term, and the condition at x = L quantises k.',
          'The emitted photon energy is the difference E_nHigh - E_nLow = (nHigh² - nLow²)E₁.',
        ],
        steps: [
          {
            title: 'Set up the equation inside the well',
            text: 'With V = 0 for 0 < x < L, the time-independent Schrödinger equation becomes a second-order differential equation with a sinusoidal solution.',
            math: String.raw`-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2}=E\psi\quad\Rightarrow\quad \psi(x)=A\sin kx+B\cos kx,\qquad k^2=\frac{2mE}{\hbar^2}`,
          },
          {
            title: 'Apply the boundary conditions',
            text: 'The infinite walls force the wavefunction to vanish at both ends: ψ(0) = 0 removes the cosine, and ψ(L) = 0 quantises k.',
            math: String.raw`\psi(0)=0\Rightarrow B=0,\qquad \psi(L)=0\Rightarrow \sin(kL)=0\Rightarrow kL=n\pi,\quad n=1,2,3,\ldots`,
          },
          {
            title: 'Energy spectrum',
            text: 'Substituting k = nπ/L gives the familiar n-squared energy spectrum, which can be written with h instead of ħ.',
            math: String.raw`E_n=\frac{n^2\pi^2\hbar^2}{2mL^2}=\frac{n^2h^2}{8mL^2}`,
          },
          {
            title: 'Ground-state energy',
            text: 'Convert the well width to metres and evaluate the n = 1 level, then express it in electronvolts.',
            math: String.raw`L=${fmt(wellNm)}\,\mathrm{nm}=${fmt(wellNm)}\times10^{-9}\,\mathrm{m},\qquad E_1=\frac{(6.626\times10^{-34})^2}{8(9.109\times10^{-31})(${fmt(wellNm)}\times10^{-9})^2}=${fmt(e1J * 1e19, 2)}\times10^{-19}\,\mathrm{J}=${fmt(e1Ev, 4)}\,\mathrm{eV}`,
          },
          {
            title: 'Photon from the transition',
            text: 'The level difference scales with the difference of the squares of the quantum numbers, and the photon wavelength follows from hc/ΔE.',
            math: String.raw`\Delta E=(${nHigh}^2-${nLow}^2)E_1=${fmt(deltaEv, 4)}\,\mathrm{eV},\qquad \lambda_{\gamma}=\frac{${HC_EV_NM}\,\mathrm{eV\,nm}}{\Delta E}=${fmt(photonNm, 1)}\,\mathrm{nm}`,
          },
        ],
        answer: `Energy levels E_n = n²h²/(8mL²); E₁ = ${fmt(e1Ev, 4)} eV; the ${nHigh} → ${nLow} transition emits a photon of ${fmt(deltaEv, 4)} eV and wavelength ${fmt(photonNm, 1)} nm.`,
        alternatives: [
          'Use the de Broglie standing-wave condition L = nλ/2 with p = h/λ, then E = p²/2m.',
          'Solve numerically for a finite square well and recover the infinite-well result in the limit of very high barriers.',
        ],
        mistakes: [
          'Mixing h and ħ by dropping the factor 2π when rewriting the spectrum.',
          'Assuming the energy levels are equally spaced instead of scaling as n².',
          'Using the transition energy in electronvolts directly in joule-based formulas without converting.',
        ],
        further: 'If the well width were doubled, every energy would fall by a factor of four and the emitted photon wavelength would grow to ' + fmt(doubledNm, 1) + ' nm.',
      }
    },
  },
  {
    id: 'p5-quantum-tunneling',
    domain: 'physics',
    topicId: 'quantum-tunneling',
    title: 'Quantum tunneling',
    level: 'Undergraduate 3',
    type: 'Theoretical',
    concepts: ['rectangular potential barrier', 'evanescent wave', 'decay constant', 'transmission coefficient', 'WKB approximation'],
    build(rng: RNG, index: number): GeneratedSolution {
      const energyEv = rng.num(0.50, 2.50, 2) + (index % 3) * 0.10
      const gapEv = rng.num(0.40, 2.00, 2)
      const barrierEv = energyEv + gapEv
      const widthNm = rng.num(0.15, 0.60, 2)
      const widthM = widthNm * 1e-9
      const gapJ = gapEv * E_CHARGE
      const kappa = Math.sqrt(2 * M_E * gapJ) / HBAR
      const kappaA = kappa * widthM
      const prefactor = barrierEv * barrierEv / (4 * energyEv * gapEv)
      const transmission = 1 / (1 + prefactor * Math.sinh(kappaA) ** 2)
      const wkb = 16 * energyEv * gapEv / (barrierEv * barrierEv) * Math.exp(-2 * kappaA)

      return {
        statement: `An electron of kinetic energy ${fmt(energyEv)} eV is incident on a rectangular potential barrier of height ${fmt(barrierEv)} eV and width ${fmt(widthNm)} nm. Since the electron energy is below the barrier height, derive the transmission coefficient for this case and evaluate it. Use mₑ = 9.109 × 10⁻³¹ kg and ħ = 1.055 × 10⁻³⁴ J s.`,
        hints: [
          'Inside the barrier the Schrödinger equation has exponentially decaying and growing solutions with decay constant κ = √(2m(U₀ - E))/ħ.',
          'Matching ψ and its derivative at both edges gives T = [1 + (U₀² sinh²(κa))/(4E(U₀ - E))]⁻¹.',
          'For a thick barrier this reduces to the WKB form T ≈ 16(E/U₀)(1 - E/U₀) exp(-2κa).',
        ],
        steps: [
          {
            title: 'Solve inside the barrier',
            text: 'With E < U₀ the kinetic energy inside the barrier is negative, so the wavefunction is evanescent rather than propagating.',
            math: String.raw`\psi(x)=Ce^{-\kappa x}+De^{\kappa x},\qquad \kappa=\frac{\sqrt{2m(U_0-E)}}{\hbar}`,
          },
          {
            title: 'Match at both interfaces',
            text: 'Continuity of ψ and dψ/dx at x = 0 and x = a gives the exact rectangular-barrier transmission coefficient.',
            math: String.raw`T=\left[1+\frac{U_0^2\sinh^2(\kappa a)}{4E(U_0-E)}\right]^{-1}`,
          },
          {
            title: 'Evaluate the decay constant',
            text: 'Convert the barrier excess energy from electronvolts to joules before computing κ.',
            math: String.raw`U_0-E=${fmt(gapEv)}\,\mathrm{eV}=${fmt(gapEv)}\times1.602\times10^{-19}\,\mathrm{J},\qquad \kappa=\frac{\sqrt{2(9.109\times10^{-31})(${fmt(gapEv)}\times1.602\times10^{-19})}}{1.055\times10^{-34}}=${fmt(kappa / 1e9, 2)}\times10^{9}\,\mathrm{m^{-1}}`,
          },
          {
            title: 'Insert the barrier width',
            text: 'The dimensionless product κa controls the exponential suppression.',
            math: String.raw`a=${fmt(widthNm)}\,\mathrm{nm}=${fmt(widthNm)}\times10^{-9}\,\mathrm{m},\qquad \kappa a=${fmt(kappaA, 3)}`,
          },
          {
            title: 'Transmission probability',
            text: 'Evaluate the prefactor and the hyperbolic sine, then invert to obtain T; the thick-barrier estimate is shown for comparison.',
            math: String.raw`\frac{U_0^2}{4E(U_0-E)}=${fmt(prefactor, 3)},\qquad T=${fmt(transmission, 5)}\quad\left(T_{\mathrm{WKB}}\approx${fmt(wkb, 5)}\right)`,
          },
        ],
        answer: `Transmission probability T = ${fmt(transmission, 5)} (about ${fmt(transmission * 100, 3)}%); thick-barrier estimate ${fmt(wkb, 5)}.`,
        alternatives: [
          'Apply the WKB integral T ≈ exp(-2∫κ dx), which for a constant barrier gives the exponential factor above.',
          'Numerically integrate the Schrödinger equation through the barrier and match the outgoing wave amplitude.',
        ],
        mistakes: [
          'Using the barrier height U₀ instead of the difference U₀ - E in the decay constant.',
          'Using exp(-κa) instead of exp(-2κa) in the thick-barrier approximation.',
          'Applying the E < U₀ formula when the electron energy exceeds the barrier.',
        ],
        further: 'Doubling the barrier width doubles κa and, in the thick-barrier limit, multiplies T by approximately exp(-2κa) = ' + fmt(Math.exp(-2 * kappaA), 5) + '.',
      }
    },
  },
  {
    id: 'p5-radioactivity',
    domain: 'physics',
    topicId: 'radioactivity',
    title: 'Radioactive decay',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['half-life', 'decay constant', 'exponential decay law', 'activity', 'becquerel'],
    build(rng: RNG, index: number): GeneratedSolution {
      const halfLifeDays = rng.num(2, 20, 1)
      const elapsedDays = rng.num(1, 40, 1) + (index % 4) * 0.5
      const n0Scale = rng.num(1.0, 9.9, 1)
      const n0 = n0Scale * 1e20
      const decayPerDay = Math.LN2 / halfLifeDays
      const decayPerSecond = Math.LN2 / (halfLifeDays * 86400)
      const remainingScale = n0Scale * Math.exp(-decayPerDay * elapsedDays)
      const remaining = remainingScale * 1e20
      const activity = decayPerSecond * remaining
      const initialActivity = decayPerSecond * n0
      const timeForTenPercent = halfLifeDays * Math.log(10) / Math.LN2

      return {
        statement: `A sample initially contains ${fmt(n0Scale)} × 10²⁰ nuclei of a radioisotope with a half-life of ${fmt(halfLifeDays)} days. Find the decay constant in s⁻¹, the number of nuclei remaining after ${fmt(elapsedDays)} days, and the activity at that time in becquerels.`,
        hints: [
          'The decay constant and half-life are related by λ = ln 2 / T½.',
          'The number of surviving nuclei obeys N(t) = N₀ exp(-λt), with t measured in the same time units as λ.',
          'Activity is the decay rate A = λN, and this λ must be expressed in inverse seconds to obtain becquerels.',
        ],
        steps: [
          {
            title: 'Decay constant per day',
            text: 'The half-life is the time for half the nuclei to decay, which fixes λ in inverse days.',
            math: String.raw`\lambda_{\mathrm{day}}=\frac{\ln 2}{T_{1/2}}=\frac{0.693}{${fmt(halfLifeDays)}\,\mathrm{d}}=${fmt(decayPerDay, 4)}\,\mathrm{d^{-1}}`,
          },
          {
            title: 'Decay constant per second',
            text: 'Convert days to seconds so that activity comes out in becquerels.',
            math: String.raw`\lambda=\frac{\ln 2}{${fmt(halfLifeDays)}\times86400\,\mathrm{s}}=${fmt(decayPerSecond, 4)}\,\mathrm{s^{-1}}`,
          },
          {
            title: 'Number remaining',
            text: 'Apply the exponential decay law using λ in inverse days and t in days.',
            math: String.raw`N(t)=N_0e^{-\lambda_{\mathrm{day}}t}=(${fmt(n0Scale)}\times10^{20})e^{-(${fmt(decayPerDay, 4)})(${fmt(elapsedDays)})}=${fmt(remainingScale, 2)}\times10^{20}\,\mathrm{nuclei}`,
          },
          {
            title: 'Activity at that time',
            text: 'Activity is the magnitude of dN/dt, so multiply the current number of nuclei by λ in inverse seconds.',
            math: String.raw`A=\lambda N=(${fmt(decayPerSecond, 4)}\,\mathrm{s^{-1}})(${fmt(remainingScale, 2)}\times10^{20})=${fmt(activity / 1e14, 2)}\times10^{14}\,\mathrm{Bq}`,
          },
          {
            title: 'Check with the half-life form',
            text: 'The same survival fraction can be written as a power of one half, and the initial activity is higher by that same factor.',
            math: String.raw`N=N_0\left(\frac{1}{2}\right)^{t/T_{1/2}},\qquad A_0=${fmt(initialActivity / 1e14, 2)}\times10^{14}\,\mathrm{Bq}`,
          },
        ],
        answer: `Decay constant = ${fmt(decayPerSecond, 4)} s⁻¹; nuclei remaining = ${fmt(remainingScale, 2)} × 10²⁰; activity = ${fmt(activity / 1e14, 2)} × 10¹⁴ Bq.`,
        alternatives: [
          'Use N(t) = N₀ (1/2)^(t/T½) directly, then A = A₀ (1/2)^(t/T½).',
          'Solve dN/dt = -λN by separation of variables to recover the exponential law.',
        ],
        mistakes: [
          'Using the half-life itself as the decay constant instead of ln 2 divided by it.',
          'Forgetting to convert days into seconds when calculating activity in becquerels.',
          'Confusing the number of remaining nuclei with the number that have already decayed.',
        ],
        further: 'The time for the activity to fall to 10% of its initial value is T½ log₂(10) ≈ ' + fmt(timeForTenPercent, 1) + ' days, independent of the initial sample size.',
      }
    },
  },
]

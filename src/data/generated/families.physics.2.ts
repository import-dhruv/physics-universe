import type { GeneratedFamily } from './types'

// Deterministic physics problem families: classical mechanics, fluids and heat.
// Every builder closes over rng and index only, so a given (family, variant)
// pair always regenerates the same self-contained problem and solution.

const f = (x: number, d = 2) => x.toFixed(d)

const sciText = (x: number, d = 2) => {
  const p = x.toExponential(d).split('e')
  return p[0] + " × 10^" + Number(p[1])
}

const sciTex = (x: number, d = 2) => {
  const p = x.toExponential(d).split('e')
  return String.raw`${p[0]} \times 10^{${Number(p[1])}}`
}

const g = 9.81
const G = 6.674e-11

export const PHYSICS_FAMILIES_2: GeneratedFamily[] = [

  {
    id: "p2-non-inertial-frames",
    domain: "physics",
    topicId: "non-inertial-frames",
    title: "Fictitious forces",
    level: "Undergraduate 1",
    type: "Conceptual",
    concepts: ["non-inertial frame", "fictitious force", "apparent weight", "free-body diagram", "equilibrium condition"],
    build(rng, index) {
      const upward = index % 2 === 0
      const m = rng.int(58, 74) + (index % 7)
      const a = Number((rng.num(1.0, 3.5, 1) + (index % 97) * 0.001).toFixed(3))
      const N = upward ? m * (g + a) : m * (g - a)
      const scaleKg = N / g
      const sign = upward ? "+" : "-"
      const op = upward ? "opposite" : "along"
      return {
        title: upward ? "Apparent weight in a rising lift" : "Apparent weight in a descending lift",
        statement: "A person of mass " + f(m, 0) + " kg stands on a calibrated bathroom scale on the floor of a lift. The lift accelerates " + (upward ? "upward" : "downward") + " at a constant " + f(a, 3) + " m/s². Take g = 9.81 m/s². Determine the scale reading in newtons, the equivalent reading in kilograms if the scale is calibrated by dividing by g, and compare both with the person's true weight.",
        hints: [
          "Work in the lift's frame: the person is at rest there, so the net force in that frame must be zero.",
          "Add a fictitious force of magnitude ma directed opposite to the lift's acceleration before writing equilibrium.",
          "For upward acceleration the balance is N - mg - ma = 0; reverse the sign of the ma term for downward acceleration."
        ],
        steps: [
          {
            title: "Choose the accelerating frame",
            text: "In the lift frame the passenger does not move, but the frame is non-inertial. Introduce a fictitious force m a whose direction is opposite to the lift's acceleration; it is not an interaction with any other body.",
            math: String.raw`F_{\mathrm{fict}} = m a = (${f(m, 0)}\,\mathrm{kg})(${f(a, 3)}\,\mathrm{m\,s^{-2}}) = ${f(m * a, 1)}\,\mathrm{N}`
          },
          {
            title: "Write vertical equilibrium",
            text: "The normal force from the scale points up, gravity points down, and the fictitious force is " + op + " to the acceleration. Setting the sum to zero gives the normal force.",
            math: String.raw`N - m g ${upward ? "-" : "+"} m a = 0`
          },
          {
            title: "Solve for the apparent weight",
            text: "Insert the numbers. The scale reads the normal force, not the gravitational force.",
            math: String.raw`N = m\left(g ${sign} a\right) = (${f(m, 0)})(${f(g, 2)} ${sign} ${f(a, 3)}) = ${f(N, 1)}\,\mathrm{N}`
          },
          {
            title: "Convert to the scale's mass calibration",
            text: "A bathroom scale divides the measured force by the standard g, so its displayed 'kilograms' are N/g rather than the person's actual mass.",
            math: String.raw`m_{\mathrm{scale}} = \frac{N}{g} = \frac{${f(N, 1)}}{${f(g, 2)}} \approx ${f(scaleKg, 1)}\,\mathrm{kg}`
          },
          {
            title: "Compare with the true weight",
            text: "The true weight is unchanged; only the support force differs. The ratio shows the fractional error a naive scale reading would give.",
            math: String.raw`W = m g = ${f(m * g, 1)}\,\mathrm{N}, \qquad \frac{N}{W} = ${f(N / (m * g), 3)}`
          }
        ],
        answer: "The scale reads " + f(N, 1) + " N, corresponding to " + f(scaleKg, 1) + " kg on a g-calibrated dial, while the true weight is " + f(m * g, 1) + " N.",
        alternatives: [
          "Stay in an inertial frame and apply Newton's second law directly: N - mg = +ma for upward acceleration, giving the same N.",
          "Check limiting cases: a = 0 gives N = mg, and a downward acceleration of g gives weightlessness, N = 0."
        ],
        mistakes: [
          "Using g - a for upward acceleration instead of g + a.",
          "Treating the fictitious force as a real interaction that should appear in an inertial-frame free-body diagram.",
          "Reporting ma as the scale reading; the scale measures the normal force N, not the net force."
        ],
        further: "If the same acceleration a were instead horizontal (a car speeding up), a hanging plumb bob would settle at an angle theta from the vertical with tan(theta) = a/g. Derive this from the same fictitious-force construction and compute theta for the given a."
      }
    }
  },

  {
    id: "p2-rigid-body-dynamics",
    domain: "physics",
    topicId: "rigid-body-dynamics",
    title: "Rigid body rotation",
    level: "Undergraduate 2",
    type: "Numerical",
    concepts: ["moment of inertia", "torque", "angular acceleration", "rotational kinetic energy", "work-energy theorem"],
    build(rng, index) {
      const shapes = [
        { name: "uniform solid disk", c: 0.5, cTex: String.raw`\frac{1}{2}`, cText: "1/2", arm: 1, size: "radius", where: "the rim" },
        { name: "thin hoop", c: 1, cTex: String.raw`1`, cText: "1", arm: 1, size: "radius", where: "the rim" },
        { name: "uniform solid sphere", c: 0.4, cTex: String.raw`\frac{2}{5}`, cText: "2/5", arm: 1, size: "radius", where: "the equator" },
        { name: "uniform thin rod pivoted at its centre", c: 1 / 12, cTex: String.raw`\frac{1}{12}`, cText: "1/12", arm: 0.5, size: "length", where: "one end, perpendicular to the rod" }
      ]
      const shape = shapes[(rng.int(0, shapes.length - 1) + index) % shapes.length]
      const m = rng.num(2.0, 8.0, 1)
      const R = rng.num(0.25, 0.7, 2)
      const F = rng.num(6, 20, 1)
      const t = rng.num(2.0, 5.0, 1)
      const I = shape.c * m * R * R
      const tau = F * shape.arm * R
      const alpha = tau / I
      const omega = alpha * t
      const theta = 0.5 * alpha * t * t
      const KE = 0.5 * I * omega * omega
      return {
        title: "Constant torque on a " + shape.name,
        statement: "A " + shape.name + " of mass " + f(m, 1) + " kg and " + shape.size + " " + f(R, 2) + " m is mounted on a frictionless axle through its centre. A constant force of " + f(F, 1) + " N acts tangentially at " + shape.where + ". Starting from rest, find (i) the moment of inertia about the axle, (ii) the angular acceleration, (iii) the angular speed after " + f(t, 1) + " s, and (iv) the rotational kinetic energy at that instant.",
        hints: [
          "The moment of inertia has the form I = c m R^2; the coefficient c depends only on the shape and mass distribution.",
          "Torque is force times perpendicular lever arm, so use the distance from the axle to the point of application, not the full diameter.",
          "Apply the rotational analogue of F = ma, then integrate the constant angular acceleration from rest."
        ],
        steps: [
          {
            title: "Moment of inertia",
            text: "For the chosen " + shape.name + " the shape coefficient c is " + shape.cText + " in I = c m R^2 (using the full length for the rod).",
            math: String.raw`I = ${shape.cTex}\,m\,R^{2} = ${shape.cTex}(${f(m, 1)}\,\mathrm{kg})(${f(R, 2)}\,\mathrm{m})^{2} = ${f(I, 4)}\,\mathrm{kg\,m^{2}}`
          },
          {
            title: "Torque about the axle",
            text: "The force is perpendicular to the lever arm, so the torque magnitude is simply F times the distance from the axis to " + shape.where + ".",
            math: String.raw`\tau = F\,d = (${f(F, 1)}\,\mathrm{N})(${f(shape.arm * R, 3)}\,\mathrm{m}) = ${f(tau, 3)}\,\mathrm{N\,m}`
          },
          {
            title: "Angular acceleration",
            text: "Newton's second law for rotation gives alpha = tau/I, constant because the applied force is constant.",
            math: String.raw`\alpha = \frac{\tau}{I} = \frac{${f(tau, 3)}}{${f(I, 4)}} \approx ${f(alpha, 3)}\,\mathrm{rad\,s^{-2}}`
          },
          {
            title: "Angular speed after the given time",
            text: "Starting from rest with constant angular acceleration, omega = alpha t.",
            math: String.raw`\omega = \alpha t = (${f(alpha, 3)})(${f(t, 1)}) \approx ${f(omega, 1)}\,\mathrm{rad\,s^{-1}}`
          },
          {
            title: "Rotational energy and work check",
            text: "Compute the kinetic energy directly and verify it equals the work done by the torque through the swept angle theta.",
            math: String.raw`K = \frac{1}{2}I\omega^{2} \approx ${f(KE, 1)}\,\mathrm{J}, \qquad \tau\theta = \tau\left(\frac{1}{2}\alpha t^{2}\right) \approx ${f(tau * theta, 1)}\,\mathrm{J}`
          }
        ],
        answer: "I = " + f(I, 4) + " kg m², alpha = " + f(alpha, 2) + " rad/s², omega = " + f(omega, 1) + " rad/s after " + f(t, 1) + " s, and the rotational kinetic energy is " + f(KE, 1) + " J.",
        alternatives: [
          "Use work-energy alone: the torque does work tau theta with theta = (1/2) alpha t^2, and this equals (1/2) I omega^2.",
          "For the hoop and disk, compare with a point mass at the rim: the disk rotates twice as fast as the hoop under the same torque."
        ],
        mistakes: [
          "Using m R^2 for every shape instead of the correct shape coefficient.",
          "Forgetting the lever arm and taking the torque to be F rather than F d.",
          "Reporting omega in revolutions per second while the formulas assume radians per second."
        ],
        further: "Add a constant frictional torque tau_f at the axle and find the time at which the body reaches half its frictionless angular speed. Show that the net angular acceleration becomes (tau - tau_f)/I."
      }
    }
  },

  {
    id: "p2-central-force-motion",
    domain: "physics",
    topicId: "central-force-motion",
    title: "Central forces",
    level: "Undergraduate 2",
    type: "Derivation",
    concepts: ["inverse-square force", "circular orbit", "effective potential", "orbital stability", "angular momentum"],
    build(rng, index) {
      const m = rng.int(1, 3) + (index % 3)
      const R = rng.num(0.6, 1.8, 2)
      const ac = rng.num(20, 90, 1)
      const v = Math.sqrt(ac / (m * R))
      const L = m * v * R
      const E = -ac / (2 * R)
      const wr = Math.sqrt(ac / (m * R * R * R))
      const period = 2 * Math.PI * R / v
      return {
        statement: "A particle of mass " + f(m, 0) + " kg moves under the attractive central force F(r) = -alpha/r^2 with alpha = " + f(ac, 1) + " N m^2, directed toward the fixed origin. It executes a circular orbit of radius " + f(R, 2) + " m. Derive (i) the orbital speed, (ii) the angular momentum, (iii) the effective potential and the condition for this radius to be an equilibrium, (iv) the stability of that equilibrium and the radial oscillation frequency, and (v) the total mechanical energy.",
        hints: [
          "For a circular path the centripetal requirement is m v^2/R = alpha/R^2.",
          "The effective potential combines the centrifugal term L^2/(2 m r^2) with the potential energy -alpha/r.",
          "Stability follows from the sign of the second derivative of the effective potential at the equilibrium radius."
        ],
        steps: [
          {
            title: "Circular-orbit condition and speed",
            text: "Balance the inward force against the required centripetal acceleration; the radius cancels partly, leaving the speed.",
            math: String.raw`\frac{m v^{2}}{R} = \frac{\alpha}{R^{2}} \;\Rightarrow\; v = \sqrt{\frac{\alpha}{mR}} = \sqrt{\frac{${f(ac, 1)}}{(${f(m, 0)})(${f(R, 2)})}} = ${f(v, 3)}\,\mathrm{m\,s^{-1}}`
          },
          {
            title: "Angular momentum",
            text: "For motion in a plane the angular momentum is conserved; evaluate it on the circular orbit.",
            math: String.raw`L = m v R = \sqrt{m\alpha R} = ${f(L, 3)}\,\mathrm{kg\,m^{2}\,s^{-1}}`
          },
          {
            title: "Effective potential and equilibrium",
            text: "Rewrite the radial energy equation as one-dimensional motion in V_eff. Setting its first derivative to zero reproduces the given radius.",
            math: String.raw`V_{\mathrm{eff}}(r) = \frac{L^{2}}{2mr^{2}} - \frac{\alpha}{r}, \qquad \frac{dV_{\mathrm{eff}}}{dr} = -\frac{L^{2}}{mr^{3}} + \frac{\alpha}{r^{2}} = 0 \;\Rightarrow\; R = \frac{L^{2}}{m\alpha} = ${f(R, 2)}\,\mathrm{m}`
          },
          {
            title: "Stability and radial frequency",
            text: "The second derivative at R is positive, so the circular orbit is stable. The radial frequency equals the orbital angular speed, which is why inverse-square orbits close.",
            math: String.raw`V_{\mathrm{eff}}''(R) = \frac{3L^{2}}{mR^{4}} - \frac{2\alpha}{R^{3}} = \frac{\alpha}{R^{3}} > 0, \qquad \omega_r = \sqrt{\frac{V_{\mathrm{eff}}''(R)}{m}} = \frac{v}{R} = ${f(wr, 3)}\,\mathrm{s^{-1}}`
          },
          {
            title: "Total energy and period",
            text: "Add kinetic and potential energy on the orbit; the result is negative, as it must be for a bound orbit. The period is the circumference divided by the speed.",
            math: String.raw`E = \frac{1}{2}mv^{2} - \frac{\alpha}{R} = -\frac{\alpha}{2R} = ${f(E, 1)}\,\mathrm{J}, \qquad T = \frac{2\pi R}{v} = ${f(period, 2)}\,\mathrm{s}`
          }
        ],
        answer: "v = " + f(v, 2) + " m/s, L = " + f(L, 2) + " kg m²/s, the effective potential is L²/(2mr²) - alpha/r with a stable equilibrium at R = " + f(R, 2) + " m, radial frequency " + f(wr, 3) + " s⁻¹, and total energy " + f(E, 1) + " J (period " + f(period, 1) + " s).",
        alternatives: [
          "Use the Binet equation u'' + u = m alpha/L^2 with u = 1/r; its constant solution is a circle and its perturbations oscillate at exactly the orbital frequency.",
          "Apply the virial theorem for an inverse-square force, 2<T> = -<U>, to obtain E = U/2 = -alpha/(2R) immediately."
        ],
        mistakes: [
          "Taking the potential energy to be +alpha/r instead of -alpha/r for an attractive force.",
          "Omitting the centrifugal term and concluding that V_eff has no minimum.",
          "Confusing the radial frequency with a different frequency and missing that it equals v/R here."
        ],
        further: "Repeat the stability analysis for Hooke's central force F(r) = -k r. Show that V_eff = L^2/(2mr^2) + (1/2)k r^2, that a circular orbit requires v = R sqrt(k/m), and that the radial frequency is twice the orbital angular frequency, so those orbits are also closed."
      }
    }
  },

  {
    id: "p2-kepler-laws",
    domain: "physics",
    topicId: "kepler-laws",
    title: "Kepler’s laws",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["Kepler's third law", "eccentricity", "areal velocity", "vis-viva equation", "elliptical orbit geometry"],
    build(rng, index) {
      const M = rng.num(1.2, 2.8, 2) * 1e30
      const aAx = rng.num(1.2, 2.4, 2) * 1e11
      const e = rng.num(0.12, 0.5, 2) + (index % 3) * 0.02
      const mu = G * M
      const Tp = 2 * Math.PI * Math.sqrt(aAx * aAx * aAx / mu)
      const rp = aAx * (1 - e)
      const ra = aAx * (1 + e)
      const b = aAx * Math.sqrt(1 - e * e)
      const area = Math.PI * aAx * b
      const areal = area / Tp
      const vp = Math.sqrt(mu * (2 / rp - 1 / aAx))
      const va = Math.sqrt(mu * (2 / ra - 1 / aAx))
      return {
        statement: "A planet of negligible mass orbits a star of mass " + sciText(M, 2) + " kg on an ellipse of semi-major axis " + sciText(aAx, 2) + " m and eccentricity " + f(e, 2) + ". Use G = 6.674 × 10^-11 N m²/kg². Find (i) the orbital period, (ii) the perihelion and aphelion distances and the semi-minor axis, (iii) the areal velocity, and (iv) the speed at perihelion and aphelion.",
        hints: [
          "Kepler's third law with Newtonian gravity reads T^2 = 4 pi^2 a^3/(G M).",
          "For an ellipse, r_peri = a(1 - e), r_aphe = a(1 + e) and b = a sqrt(1 - e^2).",
          "Kepler's second law makes the areal velocity constant and equal to half the specific angular momentum; the vis-viva equation gives the endpoint speeds."
        ],
        steps: [
          {
            title: "Period from Kepler's third law",
            text: "Insert the semi-major axis and the stellar mass into the Newtonian form of the third law.",
            math: String.raw`T = 2\pi\sqrt{\frac{a^{3}}{GM}} = 2\pi\sqrt{\frac{(${sciTex(aAx, 2)})^{3}}{(${sciTex(G, 3)})(${sciTex(M, 2)})}} \approx ${sciTex(Tp, 3)}\,\mathrm{s}`
          },
          {
            title: "Ellipse geometry",
            text: "The eccentricity fixes the two apsidal distances and the semi-minor axis of the orbit.",
            math: String.raw`r_p = a(1-e) \approx ${sciTex(rp, 2)}\,\mathrm{m}, \quad r_a = a(1+e) \approx ${sciTex(ra, 2)}\,\mathrm{m}, \quad b = a\sqrt{1-e^{2}} \approx ${sciTex(b, 2)}\,\mathrm{m}`
          },
          {
            title: "Constant areal velocity",
            text: "The swept area over one full period is the area of the ellipse, so the areal velocity is pi a b / T, which also equals sqrt(G M a (1 - e^2))/2.",
            math: String.raw`\frac{dA}{dt} = \frac{\pi a b}{T} = \frac{1}{2}\sqrt{GMa(1-e^{2})} \approx ${sciTex(areal, 3)}\,\mathrm{m^{2}\,s^{-1}}`
          },
          {
            title: "Vis-viva speeds",
            text: "The vis-viva equation gives the speed at any radius; evaluate it at perihelion and aphelion.",
            math: String.raw`v = \sqrt{GM\left(\frac{2}{r}-\frac{1}{a}\right)}, \quad v_p \approx ${f(vp, 0)}\,\mathrm{m\,s^{-1}}, \quad v_a \approx ${f(va, 0)}\,\mathrm{m\,s^{-1}}`
          },
          {
            title: "Consistency check via angular momentum",
            text: "At the apsides the velocity is perpendicular to the radius, so r v / 2 must reproduce the areal velocity.",
            math: String.raw`\frac{r_p v_p}{2} = \frac{r_a v_a}{2} \approx ${sciTex(rp * vp / 2, 3)}\,\mathrm{m^{2}\,s^{-1}}`
          }
        ],
        answer: "T = " + sciText(Tp, 3) + " s, r_peri = " + sciText(rp, 2) + " m, r_aphe = " + sciText(ra, 2) + " m, b = " + sciText(b, 2) + " m, areal velocity = " + sciText(areal, 3) + " m²/s, v_peri = " + f(vp, 0) + " m/s and v_aphe = " + f(va, 0) + " m/s.",
        alternatives: [
          "Use the specific angular momentum h = sqrt(G M a (1 - e^2)) and obtain all endpoint speeds from v = h/r at the apsides.",
          "Express the period in years and the axis in AU, where T^2 = a^3 for a one-solar-mass star, then rescale by sqrt(M_sun/M)."
        ],
        mistakes: [
          "Using the semi-minor axis instead of the semi-major axis in Kepler's third law.",
          "Confusing r_peri = a(1 - e) with r_peri = a(1 + e) when evaluating the vis-viva speed.",
          "Dropping the factor of one half when converting specific angular momentum into areal velocity."
        ],
        further: "If the same star were replaced by one of half the mass while keeping the orbit's semi-major axis fixed, by what factor would the period change, and what eccentricity would give a perihelion half the original perihelion? Derive both answers from the relations used above."
      }
    }
  },

  {
    id: "p2-orbital-mechanics",
    domain: "physics",
    topicId: "orbital-mechanics",
    title: "Orbital speeds",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["circular orbit speed", "escape speed", "gravitational parameter", "orbital period", "specific orbital energy"],
    build(rng, index) {
      const Re = 6.371e6
      const Me = 5.972e24
      const mu = G * Me
      const hKm = rng.int(200, 1500) + (index % 5) * 50
      const r = Re + hKm * 1000
      const vOrb = Math.sqrt(mu / r)
      const vEsc = Math.SQRT2 * vOrb
      const deltaV = vEsc - vOrb
      const period = 2 * Math.PI * r / vOrb
      const gh = mu / (r * r)
      const energy = -mu / (2 * r)
      return {
        statement: "A satellite is in a circular orbit at an altitude of " + f(hKm, 0) + " km above Earth. Use Earth's radius 6.371 × 10^6 m, mass 5.972 × 10^24 kg and G = 6.674 × 10^-11 N m²/kg². Find (i) the orbital radius, (ii) the local gravitational acceleration, (iii) the circular orbit speed, (iv) the escape speed from that same radius and the extra speed needed to escape from orbit, and (v) the orbital period and specific orbital energy.",
        hints: [
          "The orbit radius is Earth's radius plus the altitude, not the altitude alone.",
          "Set GMm/r^2 = m v^2/r; the satellite mass cancels out of the speed.",
          "Escape follows from zero total energy: (1/2) m v_esc^2 = GMm/r, so v_esc = sqrt(2) v_orb."
        ],
        steps: [
          {
            title: "Orbital radius",
            text: "Convert the altitude from kilometres to metres and add Earth's radius.",
            math: String.raw`r = R_E + h = ${sciTex(Re, 4)} + ${f(hKm * 1000, 0)} = ${sciTex(r, 4)}\,\mathrm{m}`
          },
          {
            title: "Gravitational parameter and local gravity",
            text: "The product GM is the gravitational parameter of Earth; local gravity falls as 1/r^2.",
            math: String.raw`\mu = GM_E \approx ${sciTex(mu, 4)}\,\mathrm{m^{3}\,s^{-2}}, \qquad g_h = \frac{\mu}{r^{2}} \approx ${f(gh, 3)}\,\mathrm{m\,s^{-2}}`
          },
          {
            title: "Circular orbit speed",
            text: "Gravity supplies exactly the centripetal acceleration, independent of the satellite's mass.",
            math: String.raw`v_{\mathrm{orb}} = \sqrt{\frac{\mu}{r}} = \sqrt{\frac{${sciTex(mu, 4)}}{${sciTex(r, 4)}}} \approx ${f(vOrb, 0)}\,\mathrm{m\,s^{-1}}`
          },
          {
            title: "Escape speed and the required boost",
            text: "Requiring zero total mechanical energy gives the escape speed; the additional delta-v from a circular orbit is the difference.",
            math: String.raw`v_{\mathrm{esc}} = \sqrt{\frac{2\mu}{r}} = \sqrt{2}\,v_{\mathrm{orb}} \approx ${f(vEsc, 0)}\,\mathrm{m\,s^{-1}}, \qquad \Delta v = (\sqrt{2}-1)v_{\mathrm{orb}} \approx ${f(deltaV, 0)}\,\mathrm{m\,s^{-1}}`
          },
          {
            title: "Period and specific energy",
            text: "The period follows from the circumference divided by the speed, and the bound-orbit energy is negative.",
            math: String.raw`T = \frac{2\pi r}{v_{\mathrm{orb}}} \approx ${f(period, 0)}\,\mathrm{s} \;(=${f(period / 60, 1)}\,\mathrm{min}), \qquad \varepsilon = -\frac{\mu}{2r} \approx ${sciTex(energy, 3)}\,\mathrm{J\,kg^{-1}}`
          }
        ],
        answer: "At " + f(hKm, 0) + " km altitude: r = " + sciText(r, 4) + " m, g = " + f(gh, 3) + " m/s², orbital speed = " + f(vOrb, 0) + " m/s, escape speed = " + f(vEsc, 0) + " m/s (extra " + f(deltaV, 0) + " m/s), period = " + f(period, 0) + " s, specific energy = " + sciText(energy, 3) + " J/kg.",
        alternatives: [
          "Use the surface relation GM = g_0 R_E^2 with g_0 = 9.81 m/s^2 and scale by (R_E/r)^2, avoiding the tabulated Earth mass.",
          "Apply the vis-viva equation with semi-major axis a = r for a circular orbit and with a tending to infinity for escape."
        ],
        mistakes: [
          "Using the altitude alone as the radius instead of adding Earth's radius.",
          "Assuming escape requires twice the orbital speed; the correct factor is sqrt(2).",
          "Including the satellite's mass in the speed formula, when it cancels between gravity and centripetal force."
        ],
        further: "A geostationary satellite must have period equal to one sidereal day, 86164 s. Use r = (mu T^2/(4 pi^2))^(1/3) to find its radius and subtract Earth's radius to get the altitude; compare with 35786 km."
      }
    }
  },

  {
    id: "p2-fluid-statics",
    domain: "physics",
    topicId: "fluid-statics",
    title: "Hydrostatic pressure",
    level: "High school",
    type: "Numerical",
    concepts: ["hydrostatic pressure", "gauge versus absolute pressure", "immiscible fluids", "force on a submerged surface", "density"],
    build(rng, index) {
      const rhoOil = rng.int(720, 860) + (index % 4) * 5
      const hOil = rng.num(0.3, 1.2, 2)
      const hWat = rng.num(1.0, 2.8, 2)
      const area = rng.num(0.2, 1.0, 2)
      const pInt = rhoOil * g * hOil
      const pBot = pInt + 1000 * g * hWat
      const pAbs = 1.01e5 + pBot
      const force = pBot * area
      return {
        statement: "An open tank contains a layer of oil of density " + f(rhoOil, 0) + " kg/m³ and thickness " + f(hOil, 2) + " m floating on top of water of density 1000 kg/m³ and depth " + f(hWat, 2) + " m. The horizontal bottom hatch has area " + f(area, 2) + " m² and the outside of the hatch is exposed to the atmosphere. Take g = 9.81 m/s² and atmospheric pressure 1.01 × 10^5 Pa. Find the gauge pressure at the oil-water interface, the gauge and absolute pressures at the bottom, and the net force on the hatch.",
        hints: [
          "Pressure increases with depth as rho g h in each uniform layer, starting from zero gauge pressure at the free surface.",
          "Pressures in stacked fluids add: cross the oil layer first, then the water layer.",
          "For the net force on the hatch, use gauge pressure because atmospheric pressure acts on both sides and cancels."
        ],
        steps: [
          {
            title: "Pressure at the interface",
            text: "Only the oil column lies above this level, so the gauge pressure is rho_oil g h_oil.",
            math: String.raw`p_{\mathrm{int}} = \rho_o g h_o = (${f(rhoOil, 0)})(${f(g, 2)})(${f(hOil, 2)}) = ${f(pInt, 0)}\,\mathrm{Pa}`
          },
          {
            title: "Gauge pressure at the bottom",
            text: "Add the contribution of the water column to the interface pressure.",
            math: String.raw`p_{\mathrm{bot}} = p_{\mathrm{int}} + \rho_w g h_w = ${f(pInt, 0)} + (1000)(${f(g, 2)})(${f(hWat, 2)}) = ${f(pBot, 0)}\,\mathrm{Pa}`
          },
          {
            title: "Absolute pressure at the bottom",
            text: "Absolute pressure adds atmospheric pressure to the gauge value.",
            math: String.raw`p_{\mathrm{abs}} = p_{\mathrm{atm}} + p_{\mathrm{bot}} = 1.01\times10^{5} + ${f(pBot, 0)} = ${f(pAbs, 0)}\,\mathrm{Pa}`
          },
          {
            title: "Force on the horizontal hatch",
            text: "The outside is at atmospheric pressure, so the net force is the gauge pressure at the bottom times the hatch area.",
            math: String.raw`F_{\mathrm{net}} = p_{\mathrm{bot}}\,A = (${f(pBot, 0)}\,\mathrm{Pa})(${f(area, 2)}\,\mathrm{m^{2}}) = ${f(force, 0)}\,\mathrm{N}`
          },
          {
            title: "Consistency with fluid weight",
            text: "The same pressure is the total weight of the fluid columns divided by the base area, confirming the layer-by-layer sum.",
            math: String.raw`\frac{W_{\mathrm{fluid}}}{A} = \frac{(\rho_o h_o + \rho_w h_w)gA}{A} = ${f(pBot, 0)}\,\mathrm{Pa}`
          }
        ],
        answer: "Interface gauge pressure = " + f(pInt, 0) + " Pa, bottom gauge pressure = " + f(pBot, 0) + " Pa, bottom absolute pressure = " + f(pAbs, 0) + " Pa, and the net downward force on the hatch = " + f(force, 0) + " N.",
        alternatives: [
          "Compute the weight of the entire oil-plus-water column above a one-square-metre base and divide by that area.",
          "Work in absolute pressure throughout and subtract the atmospheric force on the underside of the hatch at the end."
        ],
        mistakes: [
          "Using the water density for the oil layer instead of the given oil density.",
          "Adding atmospheric pressure to the force on the hatch, when it acts on both faces and cancels.",
          "Measuring the water depth from the oil surface rather than from the oil-water interface."
        ],
        further: "If the hatch were vertical, of height H and width W, with its top edge at the free surface of a single fluid of density rho, derive that the total force is (1/2) rho g H^2 W and that the centre of pressure lies at depth 2H/3."
      }
    }
  },

  {
    id: "p2-bernoulli-principle",
    domain: "physics",
    topicId: "bernoulli-principle",
    title: "Bernoulli’s equation",
    level: "Undergraduate 1",
    type: "Experimental",
    concepts: ["Bernoulli equation", "continuity", "Venturi effect", "pressure drop", "steady incompressible flow"],
    build(rng, index) {
      const d1 = rng.num(8, 14, 1) / 100
      const d2 = rng.num(3, 6, 1) / 100
      const Qf = rng.num(2.0, 6.0, 1) / 1000
      const p1 = rng.num(120, 240, 0) * 1000
      const dz = rng.num(0.0, 2.5, 1)
      const rho = 1000
      const A1 = Math.PI * d1 * d1 / 4
      const A2 = Math.PI * d2 * d2 / 4
      const v1 = Qf / A1
      const v2 = Qf / A2
      const p2 = p1 + 0.5 * rho * (v1 * v1 - v2 * v2) - rho * g * dz
      const drop = p1 - p2
      const dyn = 0.5 * rho * (v2 * v2 - v1 * v1)
      const elev = rho * g * dz
      return {
        statement: "In a steady-flow rig, water of density 1000 kg/m³ passes through a pipe that narrows from diameter " + f(d1 * 100, 1) + " cm to " + f(d2 * 100, 1) + " cm while rising " + f(dz, 1) + " m. The measured volume flow rate is " + f(Qf * 1000, 1) + " L/s and the gauge pressure at the wider, lower section is " + f(p1 / 1000, 0) + " kPa. Assuming inviscid incompressible flow and g = 9.81 m/s², find the speeds in both sections, the gauge pressure and pressure drop at the narrow section, and explain how much of the drop is due to the speed change and how much to the rise.",
        hints: [
          "Continuity gives the speeds once you convert each diameter to an area: A = pi d^2/4.",
          "Apply Bernoulli along a streamline: p + (1/2) rho v^2 + rho g z is constant.",
          "Keep gauge pressures on both sides; only differences enter, so the atmospheric offset cancels."
        ],
        steps: [
          {
            title: "Cross-sectional areas",
            text: "Convert the diameters to metres and compute the areas before applying continuity.",
            math: String.raw`A_1 = \frac{\pi d_1^{2}}{4} = ${f(A1, 6)}\,\mathrm{m^{2}}, \qquad A_2 = \frac{\pi d_2^{2}}{4} = ${f(A2, 6)}\,\mathrm{m^{2}}`
          },
          {
            title: "Speeds from continuity",
            text: "The volume flow rate is the same through every cross-section for an incompressible fluid.",
            math: String.raw`v_1 = \frac{Q}{A_1} = ${f(v1, 3)}\,\mathrm{m\,s^{-1}}, \qquad v_2 = \frac{Q}{A_2} = ${f(v2, 3)}\,\mathrm{m\,s^{-1}}`
          },
          {
            title: "Bernoulli along the streamline",
            text: "Equate p + (1/2) rho v^2 + rho g z at the two taps and solve for the downstream gauge pressure.",
            math: String.raw`p_2 = p_1 + \frac{1}{2}\rho\left(v_1^{2}-v_2^{2}\right) - \rho g\Delta z = ${f(p2 / 1000, 2)}\,\mathrm{kPa}`
          },
          {
            title: "Decompose the pressure drop",
            text: "Separate the dynamic contribution from the elevation contribution to see why the narrow section has lower pressure.",
            math: String.raw`\Delta p = \underbrace{\frac{1}{2}\rho(v_2^{2}-v_1^{2})}_{${f(dyn / 1000, 2)}\,\mathrm{kPa}} + \underbrace{\rho g\Delta z}_{${f(elev / 1000, 2)}\,\mathrm{kPa}} = ${f(drop / 1000, 2)}\,\mathrm{kPa}`
          },
          {
            title: "Venturi consistency",
            text: "The measured flow rate can be recovered from the pressure difference, confirming the streamline calculation.",
            math: String.raw`Q = \frac{A_1 A_2}{\sqrt{A_1^{2}-A_2^{2}}}\sqrt{\frac{2\Delta p_{\mathrm{eff}}}{\rho}} \approx ${f(Qf * 1000, 2)}\,\mathrm{L\,s^{-1}}, \quad \Delta p_{\mathrm{eff}} = \Delta p - \rho g\Delta z`
          }
        ],
        answer: "v1 = " + f(v1, 2) + " m/s, v2 = " + f(v2, 2) + " m/s, p2 = " + f(p2 / 1000, 1) + " kPa gauge, total pressure drop = " + f(drop / 1000, 1) + " kPa (" + f(dyn / 1000, 1) + " kPa dynamic, " + f(elev / 1000, 1) + " kPa elevation).",
        alternatives: [
          "Use the Venturi-meter formula directly with the effective pressure difference Delta p - rho g Delta z to recover Q from the manometer reading.",
          "Set the elevation term to zero by moving to a frame following the streamline height, then add the hydrostatic contribution afterwards."
        ],
        mistakes: [
          "Using diameters rather than squared diameters in the continuity equation.",
          "Omitting the rho g Delta z term when the outlet is higher than the inlet.",
          "Mixing absolute and gauge pressures, for example adding atmospheric pressure to only one tap."
        ],
        further: "Water at 20 °C has vapour pressure about 2.3 kPa. Keeping the same flow rate and inlet pressure, determine the maximum elevation rise for which the narrow-section pressure stays above vaporization, and discuss why real pumps must respect cavitation limits."
      }
    }
  },

  {
    id: "p2-continuity-equation",
    domain: "physics",
    topicId: "continuity-equation",
    title: "Continuity",
    level: "High school",
    type: "Numerical",
    concepts: ["conservation of mass", "volume flow rate", "branching pipes", "cross-sectional area", "steady incompressible flow"],
    build(rng, index) {
      const d0 = rng.num(10, 16, 1) / 100
      const d1 = rng.num(4, 8, 1) / 100
      const d2 = rng.num(5, 10, 1) / 100
      const v0 = rng.num(1.0, 2.5, 2)
      const v1 = rng.num(0.3, 1.2, 2)
      const A0 = Math.PI * d0 * d0 / 4
      const A1 = Math.PI * d1 * d1 / 4
      const A2 = Math.PI * d2 * d2 / 4
      const Q0 = A0 * v0
      const Q1 = A1 * v1
      const Q2 = Q0 - Q1
      const v2 = Q2 / A2
      const tankL = rng.int(200, 800) + (index % 4) * 25
      const fillS = (tankL / 1000) / Q0
      return {
        statement: "Water enters a junction through a pipe of diameter " + f(d0 * 100, 1) + " cm at " + f(v0, 2) + " m/s and splits into two outlet pipes of diameters " + f(d1 * 100, 1) + " cm and " + f(d2 * 100, 1) + " cm. The speed in the first outlet is " + f(v1, 2) + " m/s. Find the volume flow rates in all three pipes, the speed in the second outlet, and the time needed for the inlet flow to fill a tank of " + f(tankL, 0) + " L.",
        hints: [
          "For incompressible steady flow, volume flow rate Q = A v is conserved at a junction.",
          "Convert each diameter from centimetres to metres and compute A = pi d^2/4 before multiplying by speed.",
          "The inflow equals the sum of the two outflows; solve for the unknown speed rather than adding speeds directly."
        ],
        steps: [
          {
            title: "Inlet cross-section and inflow",
            text: "Start with the single incoming pipe and compute its flow rate.",
            math: String.raw`A_0 = \frac{\pi d_0^{2}}{4} = ${f(A0, 6)}\,\mathrm{m^{2}}, \qquad Q_0 = A_0 v_0 = ${f(Q0 * 1000, 2)}\,\mathrm{L\,s^{-1}}`
          },
          {
            title: "First outlet flow",
            text: "Use its measured speed and its own cross-sectional area.",
            math: String.raw`A_1 = ${f(A1, 6)}\,\mathrm{m^{2}}, \qquad Q_1 = A_1 v_1 = ${f(Q1 * 1000, 2)}\,\mathrm{L\,s^{-1}}`
          },
          {
            title: "Continuity at the junction",
            text: "What flows in must flow out; the remaining rate goes through the second outlet.",
            math: String.raw`Q_2 = Q_0 - Q_1 = ${f(Q2 * 1000, 2)}\,\mathrm{L\,s^{-1}}`
          },
          {
            title: "Speed in the second outlet",
            text: "Divide the remaining flow rate by the second outlet's area.",
            math: String.raw`v_2 = \frac{Q_2}{A_2} = \frac{${f(Q2, 6)}}{${f(A2, 6)}} = ${f(v2, 2)}\,\mathrm{m\,s^{-1}}`
          },
          {
            title: "Tank filling time and mass check",
            text: "Convert litres to cubic metres to find the filling time, and note that a mass balance with rho = 1000 kg/m^3 gives the same equation because rho cancels.",
            math: String.raw`t = \frac{V}{Q_0} = \frac{${f(tankL / 1000, 3)}}{${f(Q0, 6)}} = ${f(fillS, 0)}\,\mathrm{s}, \qquad \rho Q_0 = \rho(Q_1+Q_2)`
          }
        ],
        answer: "Q_in = " + f(Q0 * 1000, 1) + " L/s, Q_out1 = " + f(Q1 * 1000, 1) + " L/s, Q_out2 = " + f(Q2 * 1000, 1) + " L/s; the second outlet speed is " + f(v2, 2) + " m/s and a " + f(tankL, 0) + " L tank fills in " + f(fillS, 0) + " s.",
        alternatives: [
          "Use mass conservation with rho Q: for water the density factor cancels, reducing to the same volumetric equation.",
          "Write the ratio form A0 v0 = A1 v1 + A2 v2 and solve directly for v2 in terms of the diameters and known speeds."
        ],
        mistakes: [
          "Adding the outlet speeds and equating their sum to v0 instead of adding volume flow rates.",
          "Leaving diameters in centimetres when computing areas, which introduces a factor of 10^4.",
          "Assuming the flow splits in proportion to the diameters rather than to the cross-sectional areas."
        ],
        further: "If the second outlet is closed, what is the new speed in the first outlet? Show that it becomes Q0/A1 and compare it with the original v1, explaining the change using continuity alone."
      }
    }
  },

  {
    id: "p2-viscosity",
    domain: "physics",
    topicId: "viscosity",
    title: "Viscous flow",
    level: "Undergraduate 2",
    type: "Theoretical",
    concepts: ["Poiseuille law", "laminar flow", "Reynolds number", "pressure gradient", "viscosity"],
    build(rng, index) {
      const eta = rng.num(0.6, 1.4, 2)
      const r = rng.num(1.0, 2.5, 2) / 1000
      const L = rng.num(0.2, 0.9, 2)
      const dp = rng.num(20, 80, 0) * 1000
      const rho = rng.int(1200, 1300) + (index % 3) * 10
      const Qf = Math.PI * dp * Math.pow(r, 4) / (8 * eta * L)
      const vAvg = Qf / (Math.PI * r * r)
      const Re = rho * vAvg * 2 * r / eta
      const dpDouble = 2 * dp
      const QDouble = Math.PI * dpDouble * Math.pow(r, 4) / (8 * eta * L)
      return {
        statement: "A liquid of viscosity " + f(eta, 2) + " Pa s and density " + f(rho, 0) + " kg/m³ flows through a horizontal tube of radius " + f(r * 1000, 2) + " mm and length " + f(L, 2) + " m under a pressure difference of " + f(dp / 1000, 0) + " kPa between the ends. Assuming laminar flow, determine the volume flow rate, the average speed, and the Reynolds number. Then find the pressure difference needed to double the flow rate through the same tube.",
        hints: [
          "Poiseuille's law for a circular tube is Q = pi Delta p r^4/(8 eta L).",
          "The average speed is Q divided by pi r^2, and the Reynolds number is rho v_avg (2r)/eta.",
          "For a fixed tube and liquid, Q is linear in Delta p, so doubling Q simply doubles the pressure difference."
        ],
        steps: [
          {
            title: "State the laminar-flow law",
            text: "For steady fully developed laminar flow in a circular tube the parabolic velocity profile integrates to Poiseuille's law; the pressure difference is the drop along the tube, not the absolute pressure.",
            math: String.raw`Q = \frac{\pi\,\Delta p\, r^{4}}{8\eta L}`
          },
          {
            title: "Volume flow rate",
            text: "Substitute the given radius in metres, taking care to convert millimetres and kilopascals.",
            math: String.raw`Q = \frac{\pi(${f(dp / 1000, 0)}\times10^{3})(${f(r, 5)})^{4}}{8(${f(eta, 2)})(${f(L, 2)})} \approx ${f(Qf * 1e6, 3)}\,\mathrm{mL\,s^{-1}}`
          },
          {
            title: "Average speed",
            text: "Divide the flow rate by the tube's cross-sectional area; the maximum speed is twice this value for a parabolic profile.",
            math: String.raw`v_{\mathrm{avg}} = \frac{Q}{\pi r^{2}} = \frac{${f(Qf, 8)}}{\pi(${f(r, 5)})^{2}} \approx ${f(vAvg, 3)}\,\mathrm{m\,s^{-1}}`
          },
          {
            title: "Reynolds number check",
            text: "The characteristic length is the diameter 2r. A value far below about 2000 confirms the laminar assumption used in Poiseuille's law.",
            math: String.raw`Re = \frac{\rho v_{\mathrm{avg}}(2r)}{\eta} = \frac{(${f(rho, 0)})(${f(vAvg, 3)})(${f(2 * r, 5)})}{${f(eta, 2)}} \approx ${f(Re, 2)} \ll 2000`
          },
          {
            title: "Pressure difference for double the flow",
            text: "Since Q is proportional to Delta p for fixed geometry and viscosity, the new pressure difference is twice the original.",
            math: String.raw`Q \propto \Delta p \;\Rightarrow\; \Delta p' = 2\Delta p = ${f(dpDouble / 1000, 0)}\,\mathrm{kPa}, \qquad Q' = ${f(QDouble * 1e6, 3)}\,\mathrm{mL\,s^{-1}}`
          }
        ],
        answer: "Q = " + f(Qf * 1e6, 3) + " mL/s, average speed = " + f(vAvg, 3) + " m/s, Reynolds number = " + f(Re, 2) + " (laminar), and a pressure difference of " + f(dpDouble / 1000, 0) + " kPa is needed to double the flow rate.",
        alternatives: [
          "Derive Poiseuille's law by balancing the pressure force Delta p pi r^2 against viscous shear on the cylindrical surface 2 pi r L with dv/dr, then integrate the parabolic profile.",
          "Use dimensional analysis: Q must scale as Delta p r^4/(eta L), and the dimensionless prefactor pi/8 follows from the circular geometry."
        ],
        mistakes: [
          "Using the tube diameter in place of the radius, which changes the flow rate by a factor of 16.",
          "Writing r^2 instead of r^4 in Poiseuille's law and losing the strong radius dependence.",
          "Checking the Reynolds number with the radius rather than the diameter as the characteristic length."
        ],
        further: "At fixed pressure difference, by what factor does Q increase if the radius is doubled? Show that it is 2^4 = 16, discuss why this makes capillary radius the dominant control in microfluidic devices, and estimate whether the Reynolds number would still justify laminar flow."
      }
    }
  },

  {
    id: "p2-temperature-heat",
    domain: "physics",
    topicId: "temperature-heat",
    title: "Heat transfer",
    level: "High school",
    type: "Numerical",
    concepts: ["steady-state conduction", "thermal resistance", "heat flux", "interface temperature", "energy conservation"],
    build(rng, index) {
      const Tin = rng.int(18, 25)
      const Tout = rng.int(-4, 8)
      const L1 = rng.num(0.10, 0.30, 2)
      const k1 = rng.num(0.6, 1.4, 2)
      const L2 = rng.num(0.05, 0.16, 2)
      const k2 = rng.num(0.02, 0.05, 3)
      const area = rng.int(12, 40)
      const hours = rng.int(2, 10) + (index % 3)
      const dT = Tin - Tout
      const R1 = L1 / k1
      const R2 = L2 / k2
      const flux = dT / (R1 + R2)
      const Tint = Tin - flux * R1
      const energy = flux * area * hours * 3600
      const drop1 = flux * R1
      const drop2 = flux * R2
      return {
        statement: "A wall of area " + f(area, 0) + " m² consists of a structural layer of thickness " + f(L1, 2) + " m and thermal conductivity " + f(k1, 2) + " W/(m K), covered by an insulation layer of thickness " + f(L2, 2) + " m and conductivity " + f(k2, 3) + " W/(m K). The inside is held at " + f(Tin, 0) + " °C and the outside at " + f(Tout, 0) + " °C. In steady state, find the heat flux through the wall, the temperature at the interface between the layers, the temperature drop across each layer, and the total heat energy conducted through the wall in " + f(hours, 0) + " hours.",
        hints: [
          "Treat the two layers as thermal resistances in series: R = L/k for each layer per unit area.",
          "The same heat flux passes through both layers in steady state, so the temperature drops add to the total difference.",
          "Multiply the flux by area and by time in seconds to obtain the total energy in joules."
        ],
        steps: [
          {
            title: "Thermal resistances per unit area",
            text: "For conduction through a slab, the resistance per unit area is thickness divided by conductivity.",
            math: String.raw`R_1 = \frac{L_1}{k_1} = \frac{${f(L1, 2)}}{${f(k1, 2)}} = ${f(R1, 4)}\,\mathrm{m^{2}\,K\,W^{-1}}, \quad R_2 = \frac{L_2}{k_2} = ${f(R2, 4)}\,\mathrm{m^{2}\,K\,W^{-1}}`
          },
          {
            title: "Steady-state heat flux",
            text: "The total temperature difference drives the flux through the summed resistances.",
            math: String.raw`q = \frac{T_{\mathrm{in}}-T_{\mathrm{out}}}{R_1+R_2} = \frac{${f(dT, 0)}}{${f(R1 + R2, 4)}} = ${f(flux, 3)}\,\mathrm{W\,m^{-2}}`
          },
          {
            title: "Interface temperature and layer drops",
            text: "Crossing the first layer lowers the temperature by q R1; the remaining drop occurs across the insulation.",
            math: String.raw`\Delta T_1 = qR_1 = ${f(drop1, 2)}\,\mathrm{K}, \quad \Delta T_2 = qR_2 = ${f(drop2, 2)}\,\mathrm{K}, \quad T_{\mathrm{int}} = ${f(Tin, 0)} - ${f(drop1, 2)} = ${f(Tint, 2)}\,^{\circ}\mathrm{C}`
          },
          {
            title: "Energy transferred in the given time",
            text: "Multiply the flux by the wall area and by the duration converted to seconds.",
            math: String.raw`Q = q\,A\,t = (${f(flux, 3)})(${f(area, 0)})(${f(hours, 0)}\times3600) \approx ${f(energy, 0)}\,\mathrm{J}`
          },
          {
            title: "Consistency check",
            text: "The two computed drops must sum to the imposed temperature difference, confirming energy conservation across the wall.",
            math: String.raw`\Delta T_1 + \Delta T_2 = ${f(drop1, 2)} + ${f(drop2, 2)} = ${f(drop1 + drop2, 2)}\,\mathrm{K} = T_{\mathrm{in}}-T_{\mathrm{out}}`
          }
        ],
        answer: "Heat flux = " + f(flux, 2) + " W/m², interface temperature = " + f(Tint, 1) + " °C, drops = " + f(drop1, 1) + " K across the structural layer and " + f(drop2, 1) + " K across the insulation, total energy in " + f(hours, 0) + " h = " + f(energy, 0) + " J.",
        alternatives: [
          "Use the electrical analogy: heat flux is current, temperature difference is voltage and L/k is resistance for a unit-area slab.",
          "Write Fourier's law in each layer, impose equality of flux at the interface, and solve the two simultaneous equations directly."
        ],
        mistakes: [
          "Using k/L instead of L/k as the thermal resistance, which reverses the effect of thick insulation.",
          "Forgetting to multiply the flux by the wall area when computing total energy.",
          "Converting the temperatures to kelvin for the difference, or assuming the interface temperature is the simple average of the two surface temperatures."
        ],
        further: "Add convective surface films with heat transfer coefficients h_in and h_out, whose resistances per unit area are 1/h_in and 1/h_out. Derive the extended flux q = (T_in - T_out)/(1/h_in + L1/k1 + L2/k2 + 1/h_out) and explain which resistance dominates for well-insulated walls."
      }
    }
  },

]

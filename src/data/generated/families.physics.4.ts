import type { GeneratedFamily } from './types'

// ───────────────────────── PHYSICS FAMILIES, SET 4 ────────────────────────────
// Ten deterministic generator families for the electricity and magnetism
// branch. Every build(rng, index) returns a complete, self-contained problem
// whose numbers are computed together with its worked solution.
// ─────────────────────────────────────────────────────────────────────────────

const KE = 8.99e9               // Coulomb constant, N m^2 C^-2
const EPS0 = 8.854e-12          // vacuum permittivity, F m^-1
const MU0 = 4 * Math.PI * 1e-7  // vacuum permeability, T m A^-1
const G = 9.81                  // gravitational acceleration, m s^-2
const QE = 1.602e-19            // elementary charge, C
const MP = 1.673e-27            // proton mass, kg

/** Readable numeric formatting for prose (double-quoted strings). */
const fmt = (value: number, digits = 3): string => {
  if (value === 0) return "0"
  const magnitude = Math.abs(value)
  if (magnitude >= 1e5 || magnitude < 1e-2) return value.toExponential(digits - 1)
  return Number(value.toPrecision(digits)).toString()
}

/** KaTeX-ready scientific notation, e.g. 8.99\times10^{9}. */
const texSci = (value: number, digits = 2): string => {
  if (value === 0) return "0"
  const parts = value.toExponential(digits).split("e")
  return parts[0] + "\\times10^{" + Number(parts[1]) + "}"
}

const rad = (degrees: number): number => degrees * Math.PI / 180

export const PHYSICS_FAMILIES_4: GeneratedFamily[] = [
  // ── Coulomb force ──────────────────────────────────────────────────────────
  {
    id: "p4-coulomb-law",
    domain: "physics",
    topicId: "coulomb-law",
    title: "Coulomb force",
    level: "Advanced high school",
    type: "Numerical",
    concepts: ["Coulomb's law", "inverse-square law", "electric field of a point charge", "superposition"],
    build(rng, index) {
      const a = rng.int(2, 9)
      let b = rng.int(2, 9)
      const sameSign = rng.bool()
      if (sameSign && b === a) b = a === 9 ? a - 1 : a + 1
      const rCm = rng.int(8, 60)
      const massG = rng.int(2, 25)
      const q1 = a * 1e-6
      const q2 = (sameSign ? b : -b) * 1e-6
      const r = rCm / 100
      const force = KE * Math.abs(q1 * q2) / (r * r)
      const eMid = 4 * KE * (sameSign ? Math.abs(a - b) : a + b) * 1e-6 / (r * r)
      const weight = (massG / 1000) * G
      const ratio = force / weight
      const nature = sameSign ? "repulsive" : "attractive"
      const midDir = sameSign
        ? (a > b ? "toward q2 (the +x direction)" : "toward q1 (the -x direction)")
        : "from the positive charge toward the negative charge (the +x direction)"
      return {
        title: "Coulomb force (configuration " + (index + 1) + ")",
        statement: "Two point charges are fixed in vacuum: q1 = +" + a + " µC at the origin and q2 = " + (sameSign ? "+" : "-") + b + " µC at x = " + rCm + " cm. (a) Find the magnitude of the electrostatic force between them and state whether it is attractive or repulsive. (b) Find the magnitude and direction of the electric field at the midpoint of the line joining them. (c) Express this force as a multiple of the weight of a " + massG + " g mass (take g = 9.81 m/s²).",
        hints: [
          "Convert microcoulombs to coulombs and centimetres to metres before using F = k|q1 q2|/r².",
          "At the midpoint each charge is r/2 away: fields from like charges oppose, fields from unlike charges add.",
          "Weight is mg with the mass in kilograms, so divide the electric force by (mass in kg) times 9.81.",
        ],
        steps: [
          {
            title: "Put the data in SI units",
            text: "The micro- and centi- prefixes must be removed before any Coulomb-law substitution.",
            math: String.raw`q_1=${a}\times10^{-6}\ \mathrm{C},\qquad q_2=${sameSign ? "+" : "-"}${b}\times10^{-6}\ \mathrm{C},\qquad r=${fmt(r)}\ \mathrm{m}`,
          },
          {
            title: "Force magnitude",
            text: "Apply Coulomb's inverse-square law to the two point charges.",
            math: String.raw`F=k\frac{|q_1q_2|}{r^2}=${texSci(KE)}\frac{(${a}\times10^{-6})(${b}\times10^{-6})}{(${fmt(r)})^2}\approx${texSci(force)}\ \mathrm{N}`,
          },
          {
            title: "Nature of the interaction",
            text: "The sign of the charge product decides whether the force pulls or pushes.",
            math: String.raw`q_1q_2${sameSign ? ">" : "<"}0\quad\Rightarrow\quad\text{the force is ${nature}}`,
          },
          {
            title: "Field at the midpoint",
            text: "Each charge is r/2 from the midpoint; add the two fields as vectors along the x-axis.",
            math: sameSign
              ? String.raw`E_{\rm mid}=\frac{4k|q_1-q_2|}{r^2}\approx${texSci(eMid)}\ \mathrm{N/C}`
              : String.raw`E_{\rm mid}=\frac{4k(|q_1|+|q_2|)}{r^2}\approx${texSci(eMid)}\ \mathrm{N/C}`,
          },
          {
            title: "Comparison with a weight",
            text: "Convert the given mass to kilograms and compare mg with the electric force.",
            math: String.raw`W=mg=(${fmt(massG / 1000)}\ \mathrm{kg})(9.81\ \mathrm{m/s^2})\approx${texSci(weight)}\ \mathrm{N},\qquad \frac{F}{W}\approx${fmt(ratio)}`,
          },
        ],
        answer: "F = " + fmt(force) + " N (" + nature + "); E_mid = " + fmt(eMid) + " N/C, " + midDir + "; F/W ≈ " + fmt(ratio) + ".",
        alternatives: [
          "Compute the midpoint field from the two individual fields kq/(r/2)² and subtract or add them directly, which reproduces the compact 4k|q1 ± q2|/r² form.",
          "For part (c), solve for the mass m = F/g whose weight equals the electric force, then compare it with the given mass instead of forming a ratio.",
        ],
        mistakes: [
          "Forgetting to convert microcoulombs to coulombs and centimetres to metres before substituting into Coulomb's law.",
          "Adding the two midpoint fields when the charges have the same sign; at the midpoint those fields point in opposite directions.",
          "Using the mass in grams in W = mg instead of converting it to kilograms first.",
        ],
        further: "A third charge q3 is now placed at the midpoint. Determine the net force on q3, and explain why the position at which a test charge feels no force can be found without knowing the value of q3.",
      }
    },
  },

  // ── Electric fields ────────────────────────────────────────────────────────
  {
    id: "p4-electric-fields",
    domain: "physics",
    topicId: "electric-fields",
    title: "Electric fields",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["electric field vector", "superposition", "Coulomb field", "test-charge force", "vector components"],
    build(rng, index) {
      const a = rng.int(2, 9)
      const b = rng.int(1, a - 1)
      const dCm = rng.int(10, 50)
      const hCm = rng.int(6, 40)
      let q0nC = rng.int(-8, 8)
      if (q0nC === 0) q0nC = 4
      const q1 = a * 1e-6
      const q2 = b * 1e-6
      const d = dCm / 100
      const h = hCm / 100
      const R = Math.hypot(d / 2, h)
      const Ex = KE * (q1 - q2) * (d / 2) / (R * R * R)
      const Ey = KE * (q1 + q2) * h / (R * R * R)
      const E = Math.hypot(Ex, Ey)
      const theta = Math.atan2(Ey, Ex) * 180 / Math.PI
      const q0 = q0nC * 1e-9
      const Fx = q0 * Ex
      const Fy = q0 * Ey
      const F = Math.abs(q0) * E
      const E1alone = KE * q1 / (R * R)
      const ratio = E / E1alone
      return {
        title: "Electric field on a perpendicular bisector (case " + (index + 1) + ")",
        statement: "Two positive point charges q1 = " + a + " µC at (0, 0) and q2 = " + b + " µC at (" + dCm + " cm, 0) are fixed in vacuum. Point P lies on the perpendicular bisector of the segment joining them, a height of " + hCm + " cm above the x-axis. (a) Find the electric field vector at P: its x- and y-components, its magnitude and its angle above the +x axis. (b) A test charge q0 = " + q0nC + " nC is placed at P; find the force vector on it. (c) What is the ratio of the net field at P to the field q1 alone would produce there?",
        hints: [
          "Both charges are the same distance R = sqrt((d/2)² + h²) from P, so start by computing that single distance.",
          "The horizontal components are opposite and proportional to q1 - q2, while the vertical components add and are proportional to q1 + q2.",
          "Once the net field is known, the force on the test charge follows from F = q0 E; a negative q0 reverses the direction.",
        ],
        steps: [
          {
            title: "Geometry of the point",
            text: "P is equidistant from the two charges, which fixes the denominator of every field term.",
            math: String.raw`d=${fmt(d)}\ \mathrm{m},\qquad h=${fmt(h)}\ \mathrm{m},\qquad R=\sqrt{(d/2)^2+h^2}=${fmt(R)}\ \mathrm{m}`,
          },
          {
            title: "Magnitudes of the two fields",
            text: "Each point-charge field has magnitude kq/R² at this distance.",
            math: String.raw`E_1=\frac{kq_1}{R^2}\approx${texSci(E1alone)}\ \mathrm{N/C},\qquad E_2=\frac{kq_2}{R^2}\approx${texSci(KE * q2 / (R * R))}\ \mathrm{N/C}`,
          },
          {
            title: "Resolve into components",
            text: "Projecting along the axes gives a horizontal difference and a vertical sum.",
            math: String.raw`E_x=\frac{k(q_1-q_2)(d/2)}{R^3}\approx${texSci(Ex)}\ \mathrm{N/C},\qquad E_y=\frac{k(q_1+q_2)h}{R^3}\approx${texSci(Ey)}\ \mathrm{N/C}`,
          },
          {
            title: "Resultant field",
            text: "Combine the orthogonal components to get the magnitude and direction.",
            math: String.raw`E=\sqrt{E_x^2+E_y^2}\approx${texSci(E)}\ \mathrm{N/C},\qquad \theta=\tan^{-1}\!\left(\frac{E_y}{E_x}\right)\approx${fmt(theta)}^\circ`,
          },
          {
            title: "Force on the test charge",
            text: "Multiply the field by the signed test charge to obtain the force components.",
            math: String.raw`\mathbf F=q_0\mathbf E\approx(${texSci(Fx)},${texSci(Fy)})\ \mathrm{N},\qquad F=|q_0|E\approx${texSci(F)}\ \mathrm{N}`,
          },
        ],
        answer: "E = (" + fmt(Ex) + ", " + fmt(Ey) + ") N/C, magnitude " + fmt(E) + " N/C at " + fmt(theta) + "° above the +x axis; the force on q0 = " + q0nC + " nC is (" + fmt(Fx) + ", " + fmt(Fy) + ") N with magnitude " + fmt(F) + " N; E/E1 = " + fmt(ratio) + ".",
        alternatives: [
          "Write each field as k q times the radius vector divided by R cubed and add the vectors before resolving them; this yields the same component formulas in one step.",
          "Use symmetry first: if q1 equalled q2 the horizontal component would vanish, so the nonzero E_x here is entirely due to the charge imbalance q1 - q2.",
        ],
        mistakes: [
          "Using the full separation d instead of d/2 as the horizontal leg of the triangle from each charge to P.",
          "Adding the horizontal components when the charges are both positive; they point in opposite directions on the bisector.",
          "Forgetting that a negative test charge reverses the direction of F relative to E.",
        ],
        further: "Find the height h at which the field at P makes a 45° angle with the x-axis for these two charges, and determine whether such a height always exists as h approaches zero and infinity.",
      }
    },
  },

  // ── Electric potential ─────────────────────────────────────────────────────
  {
    id: "p4-electric-potential",
    domain: "physics",
    topicId: "electric-potential",
    title: "Electric potential",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["scalar potential", "potential energy", "work by external agent", "zero-potential surface", "superposition"],
    build(rng, index) {
      const a = rng.int(2, 9)
      const b = rng.int(2, 9)
      const dCm = rng.int(10, 60)
      const Lcm = rng.int(5, 40)
      let q0nC = rng.int(1, 9)
      if (rng.bool()) q0nC = -q0nC
      const q1 = a * 1e-6
      const q2 = -b * 1e-6
      const d = dCm / 100
      const L = Lcm / 100
      const r1 = L
      const r2 = d + L
      const V = KE * (q1 / r1 + q2 / r2)
      const U = (q0nC * 1e-9) * V
      const xZero = a * d / (a + b)
      return {
        title: "Potential of an unlike pair (case " + (index + 1) + ")",
        statement: "A charge q1 = +" + a + " µC sits at x = 0 and a charge q2 = -" + b + " µC sits at x = " + dCm + " cm in vacuum. Point P is on the x-axis at x = -" + Lcm + " cm, to the left of q1. (a) Compute the electric potential at P, taking V = 0 at infinity. (b) An external agent brings a charge q0 = " + q0nC + " nC from infinity to P; find the work done by the agent and the potential energy of q0 at P. (c) Find the point between the two charges where the potential is zero.",
        hints: [
          "Potential is a scalar: V = k(q1/r1 + q2/r2), so include the sign of q2 inside the sum.",
          "P is L cm from q1 and (d + L) cm from q2; remember to convert both distances to metres.",
          "For the zero-potential point between unlike charges, solve a/x = b/(d - x) rather than setting the fields equal.",
        ],
        steps: [
          {
            title: "Distances and signed charges",
            text: "Lay out the source charges and the two distances from P before summing potentials.",
            math: String.raw`q_1=+${a}\times10^{-6}\ \mathrm{C},\qquad q_2=-${b}\times10^{-6}\ \mathrm{C},\qquad r_1=${fmt(r1)}\ \mathrm{m},\qquad r_2=${fmt(r2)}\ \mathrm m`,
          },
          {
            title: "Potential at P",
            text: "Add the scalar contributions, keeping the negative sign of q2.",
            math: String.raw`V_P=k\left(\frac{q_1}{r_1}+\frac{q_2}{r_2}\right)\approx${texSci(V)}\ \mathrm V`,
          },
          {
            title: "Work and potential energy",
            text: "The external work at constant speed equals the change in potential energy, q0 V_P.",
            math: String.raw`W_{\rm ext}=\Delta U=q_0V_P=(${q0nC}\times10^{-9})(${texSci(V)})\approx${texSci(U)}\ \mathrm J`,
          },
          {
            title: "Locating the zero-potential point",
            text: "Between unlike charges the two contributions have opposite signs and can cancel.",
            math: String.raw`\frac{a}{x}=\frac{b}{d-x}\quad\Rightarrow\quad x=\frac{ad}{a+b}=\frac{${a}(${fmt(d)})}{${a + b}}\approx${fmt(xZero)}\ \mathrm m`,
          },
          {
            title: "Verification",
            text: "Substituting the result back gives equal and opposite contributions, hence zero potential.",
            math: String.raw`V(x_{\rm zero})=k\left(\frac{q_1}{x_{\rm zero}}+\frac{q_2}{d-x_{\rm zero}}\right)\approx0\ \mathrm V\quad\checkmark`,
          },
        ],
        answer: "V_P = " + fmt(V) + " V; the external work to bring q0 = " + q0nC + " nC from infinity is W = " + fmt(U) + " J, which is also its potential energy U at P; the potential is zero at x = " + fmt(xZero) + " m from q1 toward q2.",
        alternatives: [
          "Compute each contribution kq/r separately and add them as signed numbers, which makes the sign of the negative source explicit.",
          "Find the zero-potential point from the ratio of distances r1/r2 = a/b and then use r1 + r2 = d, avoiding the algebraic rearrangement.",
        ],
        mistakes: [
          "Dropping the minus sign of q2 when adding potentials, which would give a much larger positive V.",
          "Measuring r2 from P as L instead of d + L when P lies outside the segment on the q1 side.",
          "Confusing the zero-potential point with the zero-field point; for unlike charges the latter lies outside the segment.",
        ],
        further: "Derive the location of the point outside the segment on the q1 side where the electric field vanishes (not the potential), and compare it with the zero-potential point found above.",
      }
    },
  },

  // ── Gauss's law ────────────────────────────────────────────────────────────
  {
    id: "p4-gauss-law",
    domain: "physics",
    topicId: "gauss-law",
    title: "Gauss’s law",
    level: "Undergraduate 1",
    type: "Derivation",
    concepts: ["electric flux", "Gaussian surface", "line charge", "symmetry", "enclosed charge"],
    build(rng, index) {
      const lambdaNC = rng.num(2, 20, 1)
      const rCm = rng.int(5, 40)
      const Lm = rng.num(0.2, 2.0, 2)
      const QnC = rng.int(2, 20)
      const RsCm = rng.int(5, 25)
      const lambda = lambdaNC * 1e-9
      const r = rCm / 100
      const E = lambda / (2 * Math.PI * EPS0 * r)
      const E2 = E / 2
      const fluxCyl = lambda * Lm / EPS0
      const fluxSphere = QnC * 1e-9 / EPS0
      return {
        title: "Gaussian surfaces and flux (case " + (index + 1) + ")",
        statement: "An infinitely long straight wire carries a uniform line charge density λ = " + fmt(lambdaNC) + " nC/m in vacuum. (a) Use a coaxial cylindrical Gaussian surface of radius " + rCm + " cm and length " + fmt(Lm) + " m to derive and evaluate the electric field E(r). (b) What is E at twice that radius? (c) Find the net electric flux through the Gaussian cylinder. (d) A point charge Q = " + QnC + " nC is placed at the centre of a sphere of radius " + RsCm + " cm; find the flux through that sphere.",
        hints: [
          "For an infinite line charge the field is radial and constant on a coaxial cylinder, so the curved surface contributes E(2πrL) and the end caps contribute zero.",
          "Because E falls as 1/r, doubling the radius halves the field but leaves the flux through a longer cylinder determined only by the enclosed charge.",
          "The spherical flux depends on the enclosed point charge alone, not on the sphere's radius.",
        ],
        steps: [
          {
            title: "Choose the Gaussian surface",
            text: "Cylindrical symmetry makes E radial and uniform in magnitude over the curved surface.",
            math: String.raw`\lambda=${fmt(lambdaNC)}\ \mathrm{nC/m}=${texSci(lambda)}\ \mathrm{C/m},\qquad r=${fmt(r)}\ \mathrm m,\qquad L=${fmt(Lm)}\ \mathrm m`,
          },
          {
            title: "Write the flux integral",
            text: "Only the curved wall contributes; the end caps have normals parallel to the wire.",
            math: String.raw`\oint\mathbf E\cdot d\mathbf A=E(2\pi rL)=\frac{\lambda L}{\varepsilon_0}`,
          },
          {
            title: "Solve for the field",
            text: "Divide by the curved area and note the 1/r dependence.",
            math: String.raw`E(r)=\frac{\lambda}{2\pi\varepsilon_0 r}\approx${texSci(E)}\ \mathrm{N/C},\qquad E(2r)=\frac{E(r)}{2}\approx${texSci(E2)}\ \mathrm{N/C}`,
          },
          {
            title: "Flux through the cylinder",
            text: "The radius cancels: the flux is fixed by the enclosed line charge λL.",
            math: String.raw`\Phi_{\rm cyl}=E(2\pi rL)=\frac{\lambda L}{\varepsilon_0}\approx${texSci(fluxCyl)}\ \mathrm{N\,m^2/C}`,
          },
          {
            title: "Flux through the sphere",
            text: "Gauss's law applied to the point charge gives the flux independent of the sphere's size.",
            math: String.raw`\Phi_{\rm sphere}=\frac{Q}{\varepsilon_0}=\frac{${QnC}\times10^{-9}}{${texSci(EPS0)}}\approx${texSci(fluxSphere)}\ \mathrm{N\,m^2/C}`,
          },
        ],
        answer: "E(" + rCm + " cm) = " + fmt(E) + " N/C and E(2r) = " + fmt(E2) + " N/C; the cylinder flux is " + fmt(fluxCyl) + " N m²/C; the flux through the sphere around " + QnC + " nC is " + fmt(fluxSphere) + " N m²/C.",
        alternatives: [
          "Use the integral form directly for the sphere: choose a spherical Gaussian surface so E is radial and constant, giving E = Q/(4πε0 r²) before multiplying by 4πr².",
          "Check the cylinder result with superposition of the field of a finite segment in the limit of infinite length, or by dimensional analysis alone up to the factor 2π.",
        ],
        mistakes: [
          "Including flux through the end caps of the Gaussian cylinder; the field is parallel to those surfaces, so their contribution is zero.",
          "Believing the cylinder flux changes with radius because E changes; the area grows in exactly the compensating way.",
          "Using the sphere's surface area in the point-charge flux formula; flux is Q/ε0 regardless of radius.",
        ],
        further: "Suppose the wire is replaced by a hollow cylindrical shell of radius R carrying the same λ uniformly on its surface. Determine E for r < R and r > R, and explain which symmetry argument changes inside the shell.",
      }
    },
  },

  // ── Capacitance ────────────────────────────────────────────────────────────
  {
    id: "p4-capacitance",
    domain: "physics",
    topicId: "capacitance",
    title: "Capacitance",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["parallel-plate capacitor", "dielectric constant", "stored energy", "isolated capacitor", "work in pulling plates"],
    build(rng, index) {
      const sideCm = rng.num(5, 20, 1)
      const dMm = rng.num(0.5, 3.0, 2)
      const kappa = rng.pick([1, 2, 3, 4, 6])
      const V = rng.int(6, 24)
      const A = Math.pow(sideCm / 100, 2)
      const d = dMm / 1000
      const C = kappa * EPS0 * A / d
      const Q = C * V
      const U = 0.5 * C * V * V
      const C2 = C / 2
      const V2 = 2 * V
      const U2 = 2 * U
      return {
        title: "Parallel-plate capacitor with a dielectric (case " + (index + 1) + ")",
        statement: "A parallel-plate capacitor has square plates of side " + fmt(sideCm) + " cm separated by " + fmt(dMm) + " mm, filled with a dielectric of relative permittivity κ = " + kappa + ". Fringing is negligible. (a) Find its capacitance. (b) Connected to a " + V + " V battery, find the charge on each plate and the energy stored. (c) The battery is then disconnected and the plate separation is doubled. Find the new capacitance, potential difference and stored energy, and account for the change in energy.",
        hints: [
          "Convert the plate side to metres and square it to get A, and convert the gap to metres before using C = κε0 A/d.",
          "While the battery is connected the voltage is fixed, so Q = CV and U = ½CV².",
          "After disconnection the charge is trapped: doubling d halves C, so V = Q/C doubles and U = Q²/(2C) doubles.",
        ],
        steps: [
          {
            title: "Plate area and separation",
            text: "Convert all geometry to SI units before applying the parallel-plate formula.",
            math: String.raw`A=(${fmt(sideCm)}\ \mathrm{cm})^2=(${fmt(sideCm / 100)}\ \mathrm m)^2=${texSci(A)}\ \mathrm{m^2},\qquad d=${fmt(dMm)}\ \mathrm{mm}=${fmt(d)}\ \mathrm m`,
          },
          {
            title: "Capacitance",
            text: "The dielectric multiplies the vacuum capacitance by κ.",
            math: String.raw`C=\kappa\varepsilon_0\frac{A}{d}=${kappa}\frac{(${texSci(EPS0)})(${texSci(A)})}{${fmt(d)}}\approx${texSci(C)}\ \mathrm F`,
          },
          {
            title: "Charge and energy at fixed voltage",
            text: "With the battery attached the potential difference stays equal to V.",
            math: String.raw`Q=CV\approx${texSci(Q)}\ \mathrm C,\qquad U=\tfrac12CV^2\approx${texSci(U)}\ \mathrm J`,
          },
          {
            title: "Doubling the gap at fixed charge",
            text: "After disconnection Q is conserved and the capacitance scales as 1/d.",
            math: String.raw`d'=2d\ \Rightarrow\ C'=\frac{C}{2}\approx${texSci(C2)}\ \mathrm F`,
          },
          {
            title: "New voltage and energy",
            text: "The trapped charge forces the voltage up; the extra stored energy is the mechanical work done in separating the plates.",
            math: String.raw`V'=\frac{Q}{C'}=2V=${2 * V}\ \mathrm V,\qquad U'=\frac{Q^2}{2C'}=2U\approx${texSci(U2)}\ \mathrm J`,
          },
        ],
        answer: "C = " + fmt(C) + " F (" + fmt(C * 1e12) + " pF); with the battery Q = " + fmt(Q) + " C and U = " + fmt(U) + " J; after disconnecting and doubling the gap, C' = " + fmt(C2) + " F, V' = " + V2 + " V and U' = " + fmt(U2) + " J, the increase " + fmt(U2 - U) + " J being the work done in pulling the plates apart.",
        alternatives: [
          "Use energy density: U = ½ε E²(Ad) with E = V/d, which reproduces ½CV² and shows why a larger field at fixed charge raises the energy.",
          "Reason from the series combination: two identical capacitors of half the gap in series give C/2, a quick check on the doubled separation.",
        ],
        mistakes: [
          "Assuming the voltage stays at the battery value after the battery has been disconnected.",
          "Using the plate perimeter instead of the area in C = κε0 A/d.",
          "Forgetting that the energy doubles when the plates are pulled apart at fixed charge; the work done is not zero.",
        ],
        further: "Repeat the problem with the battery left connected while the separation is doubled. Find the new charge, voltage and energy, and explain where the energy goes when it decreases.",
      }
    },
  },

  // ── Resistance ─────────────────────────────────────────────────────────────
  {
    id: "p4-resistance",
    domain: "physics",
    topicId: "resistance",
    title: "Resistance",
    level: "High school",
    type: "Numerical",
    concepts: ["resistivity", "drift and current", "Ohm's law", "Joule heating", "geometry dependence of resistance"],
    build(rng, index) {
      const materials = [
        { name: "copper", rho: 1.68e-8 },
        { name: "aluminium", rho: 2.82e-8 },
        { name: "tungsten", rho: 5.60e-8 },
        { name: "nichrome", rho: 1.10e-6 },
      ]
      const mat = rng.pick(materials)
      const Lm = rng.num(0.5, 5.0, 2)
      const diaMm = rng.num(0.5, 3.0, 2)
      const currentMa = rng.int(50, 800)
      const area = Math.PI * Math.pow(diaMm / 2 * 1e-3, 2)
      const R = mat.rho * Lm / area
      const I = currentMa / 1000
      const Vdrop = I * R
      const power = I * I * R
      const d2 = diaMm / Math.SQRT2
      return {
        title: "Resistance of a uniform wire (case " + (index + 1) + ")",
        statement: "A uniform " + mat.name + " wire has length " + fmt(Lm) + " m and diameter " + fmt(diaMm) + " mm. Take the resistivity of " + mat.name + " to be " + texSci(mat.rho) + " Ω m. (a) Calculate the resistance of the wire. (b) When a steady current of " + currentMa + " mA flows through it, find the potential difference across the wire and the power dissipated as heat. (c) A second wire of the same material and the same length has twice the resistance; what is its diameter?",
        hints: [
          "Find the cross-section from the radius: A = π(d/2)², with d converted from millimetres to metres.",
          "Use R = ρL/A first; then the voltage drop and power follow from V = IR and P = I²R.",
          "At fixed ρ and L, resistance scales as 1/d², so doubling R means dividing d by the square root of two.",
        ],
        steps: [
          {
            title: "Cross-sectional area",
            text: "Halve the diameter to get the radius, convert to metres, then square with π.",
            math: String.raw`A=\pi\left(\frac{${fmt(diaMm)}\times10^{-3}}{2}\right)^2\approx${texSci(area)}\ \mathrm{m^2}`,
          },
          {
            title: "Resistance of the wire",
            text: "Insert the resistivity, length and area into R = ρL/A.",
            math: String.raw`R=\rho\frac{L}{A}=${texSci(mat.rho)}\frac{${fmt(Lm)}}{${texSci(area)}}\approx${fmt(R)}\ \Omega`,
          },
          {
            title: "Voltage drop and heating",
            text: "Convert milliamperes to amperes before applying Ohm's law and the Joule power law.",
            math: String.raw`I=${fmt(I)}\ \mathrm A,\qquad V=IR\approx${texSci(Vdrop)}\ \mathrm V,\qquad P=I^2R\approx${texSci(power)}\ \mathrm W`,
          },
          {
            title: "Wire with twice the resistance",
            text: "With ρ and L fixed, R is inversely proportional to the cross-sectional area and hence to d².",
            math: String.raw`R\propto\frac{1}{d^2}\ \Rightarrow\ 2R=\rho\frac{L}{A'}\ \Rightarrow\ d'=\frac{d}{\sqrt2}\approx${fmt(d2)}\ \mathrm{mm}`,
          },
        ],
        answer: "R = " + fmt(R) + " Ω; at " + currentMa + " mA the potential difference is " + fmt(Vdrop) + " V and the power dissipated is " + fmt(power) + " W; a wire of twice the resistance has diameter " + fmt(d2) + " mm.",
        alternatives: [
          "Use the conductance form G = σA/L with σ = 1/ρ and then take R = 1/G; it is algebraically identical but useful when combining parallel conductors.",
          "For part (c), compare areas directly: A' = A/2, so d' = d/√2 without re-evaluating ρL.",
        ],
        mistakes: [
          "Using the diameter instead of the radius in A = πr², which changes the resistance by a factor of four.",
          "Leaving the diameter in millimetres or the current in milliamperes when substituting into SI formulas.",
          "Thinking that twice the resistance requires twice the diameter; in fact a thicker wire has lower resistance.",
        ],
        further: "If the wire is stretched uniformly to twice its original length while its volume stays constant, find the new resistance in terms of R, and compare this with the result of simply doubling the length at fixed cross-section.",
      }
    },
  },

  // ── Kirchhoff circuits ─────────────────────────────────────────────────────
  {
    id: "p4-kirchhoff-laws",
    domain: "physics",
    topicId: "kirchhoff-laws",
    title: "Kirchhoff circuits",
    level: "Advanced high school",
    type: "Numerical",
    concepts: ["Kirchhoff's voltage law", "series circuit", "power balance", "opposing emfs", "energy conservation"],
    build(rng, index) {
      const E1 = rng.int(9, 18)
      const E2 = rng.int(2, 7)
      const R1 = rng.int(2, 12)
      const R2 = rng.int(2, 12)
      const R3 = rng.int(2, 12)
      const Rtot = R1 + R2 + R3
      const I = (E1 - E2) / Rtot
      const Iaid = (E1 + E2) / Rtot
      const P1 = I * I * R1
      const P2 = I * I * R2
      const P3 = I * I * R3
      const Ptotal = P1 + P2 + P3
      const supplied = E1 * I
      const absorbed = E2 * I
      return {
        title: "Single loop with opposing batteries (case " + (index + 1) + ")",
        statement: "A single series loop contains an emf E1 = " + E1 + " V, an emf E2 = " + E2 + " V connected with opposing polarity (so their contributions subtract around the loop), and three resistors R1 = " + R1 + " Ω, R2 = " + R2 + " Ω and R3 = " + R3 + " Ω. The batteries have negligible internal resistance. (a) Find the current in the loop and state which battery drives it. (b) Find the power dissipated in each resistor and the total power. (c) Check energy conservation by comparing the power delivered by E1 with the power absorbed by E2 plus the resistor losses. (d) If E2 is reversed so the emfs aid each other, what is the new current?",
        hints: [
          "Traverse the loop once: the net emf is E1 - E2 because the batteries oppose, and the total resistance is the series sum.",
          "Power in a resistor is I²R, so once I is known each resistor's dissipation follows immediately.",
          "Energy balance reads E1 I = E2 I + I²(R1 + R2 + R3); reversing E2 changes the emf to E1 + E2.",
        ],
        steps: [
          {
            title: "Net emf around the loop",
            text: "The opposing polarity means one emf is a rise and the other a drop in the traversal direction.",
            math: String.raw`\mathcal{E}_{\rm net}=E_1-E_2=${E1}-${E2}=${E1 - E2}\ \mathrm V`,
          },
          {
            title: "Total resistance and current",
            text: "Series resistors simply add, and Kirchhoff's voltage law fixes the current.",
            math: String.raw`R_{\rm tot}=R_1+R_2+R_3=${R1}+${R2}+${R3}=${Rtot}\ \Omega,\qquad I=\frac{\mathcal{E}_{\rm net}}{R_{\rm tot}}=\frac{${E1 - E2}}{${Rtot}}\approx${fmt(I)}\ \mathrm A`,
          },
          {
            title: "Power in each resistor",
            text: "Each resistor dissipates I²R; these add to the total Joule loss.",
            math: String.raw`P_1\approx${fmt(P1)}\ \mathrm W,\qquad P_2\approx${fmt(P2)}\ \mathrm W,\qquad P_3\approx${fmt(P3)}\ \mathrm W,\qquad P_{\rm tot}\approx${fmt(Ptotal)}\ \mathrm W`,
          },
          {
            title: "Energy-conservation check",
            text: "The larger battery supplies power, part of which charges the smaller battery and the rest of which becomes heat.",
            math: String.raw`E_1I=${fmt(supplied)}\ \mathrm W=E_2I+I^2R_{\rm tot}=${fmt(absorbed)}+${fmt(Ptotal)}\ \mathrm W\quad\checkmark`,
          },
          {
            title: "Batteries aiding",
            text: "Reversing E2 makes both emfs drive the same circulation, so the net emf becomes E1 + E2.",
            math: String.raw`I'=\frac{E_1+E_2}{R_{\rm tot}}=\frac{${E1 + E2}}{${Rtot}}\approx${fmt(Iaid)}\ \mathrm A`,
          },
        ],
        answer: "I = " + fmt(I) + " A, driven by the " + E1 + " V battery; resistor powers are " + fmt(P1) + " W, " + fmt(P2) + " W and " + fmt(P3) + " W, total " + fmt(Ptotal) + " W; with E2 reversed the current becomes " + fmt(Iaid) + " A.",
        alternatives: [
          "Apply Kirchhoff's voltage law as E1 - IR1 - IR2 - IR3 - E2 = 0 and solve directly for I, which is the same equation written as a loop sum.",
          "Use the net-power method: equate E1 I - E2 I to I²Rtot and cancel one factor of I to get the current.",
        ],
        mistakes: [
          "Adding the opposing emfs to get E1 + E2 on the first pass, which would give a much larger current.",
          "Forgetting that the smaller battery absorbs power rather than supplying it in the original configuration.",
          "Treating the three series resistors as parallel and using a reciprocal-sum formula for the total resistance.",
        ],
        further: "Give each battery an internal resistance of 1 Ω and recalculate the current in both the opposing and aiding configurations. Discuss how internal resistance limits the short-circuit current.",
      }
    },
  },

  // ── Magnetic forces ────────────────────────────────────────────────────────
  {
    id: "p4-magnetic-fields",
    domain: "physics",
    topicId: "magnetic-fields",
    title: "Magnetic forces",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["Lorentz force", "cyclotron radius", "cyclotron period", "helical motion", "force on a current-carrying wire"],
    build(rng, index) {
      const v = rng.int(1, 9) * 1e6
      const B = rng.num(0.05, 0.60, 2)
      const thetaDeg = rng.pick([30, 45, 60])
      const Lcm = rng.int(5, 40)
      const I = rng.int(2, 12)
      const theta = rad(thetaDeg)
      const F = QE * v * B
      const radius = MP * v / (QE * B)
      const period = 2 * Math.PI * MP / (QE * B)
      const vpar = v * Math.cos(theta)
      const pitch = vpar * period
      const wireLength = Lcm / 100
      const Fwire = B * I * wireLength
      return {
        title: "Proton in a uniform magnetic field (case " + (index + 1) + ")",
        statement: "A proton (charge 1.602 × 10⁻¹⁹ C, mass 1.673 × 10⁻²⁷ kg) moves in a uniform magnetic field of magnitude " + fmt(B) + " T. (a) If its velocity of " + fmt(v, 3) + " m/s is perpendicular to the field, find the magnetic force magnitude and the radius and period of its circular path. (b) If instead the velocity makes an angle of " + thetaDeg + "° with the field, find the pitch of the resulting helix (the axial distance advanced in one turn). (c) A straight wire of length " + Lcm + " cm carrying a current of " + I + " A is placed perpendicular to the same field; find the force on it.",
        hints: [
          "For perpendicular motion the magnetic force qvB supplies the centripetal force mv²/r; set them equal.",
          "Only the component parallel to B survives unchanged, and the pitch is that component times the cyclotron period.",
          "For the wire use F = BIL with sin 90° = 1; the angle in part (b) does not apply here.",
        ],
        steps: [
          {
            title: "Magnetic force on the proton",
            text: "With velocity perpendicular to the field, sin 90° = 1 in the Lorentz force.",
            math: String.raw`F=qvB=(${texSci(QE)})(${fmt(v)})( ${fmt(B)} )\approx${texSci(F)}\ \mathrm N`,
          },
          {
            title: "Radius of the circular path",
            text: "Equate the magnetic force to the required centripetal force.",
            math: String.raw`qvB=\frac{mv^2}{r}\quad\Rightarrow\quad r=\frac{mv}{qB}\approx${fmt(radius)}\ \mathrm m`,
          },
          {
            title: "Cyclotron period",
            text: "The time for one revolution is the circumference divided by the speed; the speed cancels.",
            math: String.raw`T=\frac{2\pi r}{v}=\frac{2\pi m}{qB}\approx${texSci(period)}\ \mathrm s`,
          },
          {
            title: "Helical pitch",
            text: "The parallel component is unaffected by B, so it carries the proton forward by one pitch per period.",
            math: String.raw`v_\parallel=v\cos(${thetaDeg}^\circ)\approx${fmt(vpar)}\ \mathrm{m/s},\qquad p=v_\parallel T\approx${fmt(pitch)}\ \mathrm m`,
          },
          {
            title: "Force on the wire",
            text: "For a straight conductor perpendicular to a uniform field the force is BIL.",
            math: String.raw`F_{\rm wire}=BI L_{\rm wire}\approx${fmt(Fwire)}\ \mathrm N`,
          },
        ],
        answer: "Perpendicular proton: F = " + fmt(F) + " N, orbit radius r = " + fmt(radius) + " m and period T = " + fmt(period) + " s; at " + thetaDeg + "° the helix pitch is " + fmt(pitch) + " m; the wire experiences a force of " + fmt(Fwire) + " N.",
        alternatives: [
          "Use the cyclotron frequency f = qB/(2πm) and take the period as 1/f; this is often quicker than computing the radius first.",
          "Resolve the velocity into perpendicular and parallel parts at the start: v⊥ sets the radius, v∥ sets the pitch, and neither affects the period.",
        ],
        mistakes: [
          "Including a factor sin θ in the perpendicular-case force, where θ = 90° and the sine is already one.",
          "Thinking the orbital period depends on the speed; a faster proton follows a larger circle in the same time.",
          "Using the total speed instead of the parallel component when computing the helical pitch.",
        ],
        further: "The proton is replaced by an electron at the same speed and field. Compare the radius, period and sense of rotation, and explain why the period changes by the mass ratio while the direction of curvature reverses.",
      }
    },
  },

  // ── Biot–Savart law ────────────────────────────────────────────────────────
  {
    id: "p4-biot-savart-law",
    domain: "physics",
    topicId: "biot-savart-law",
    title: "Biot–Savart law",
    level: "Undergraduate 2",
    type: "Derivation",
    concepts: ["Biot–Savart law", "circular arc", "full current loop", "on-axis field", "vector cross product"],
    build(rng, index) {
      const degArc = rng.pick([60, 90, 120, 180, 270])
      const Rcm = rng.int(2, 12)
      const I = rng.int(2, 10)
      const xcm = rng.int(2, 20)
      const theta = rad(degArc)
      const R = Rcm / 100
      const x = xcm / 100
      const Barc = MU0 * I * theta / (4 * Math.PI * R)
      const Bloop = MU0 * I / (2 * R)
      const Baxis = MU0 * I * R * R / (2 * Math.pow(R * R + x * x, 1.5))
      return {
        title: "Field of a current arc and loop (case " + (index + 1) + ")",
        statement: "A thin wire is bent into a circular arc of radius " + Rcm + " cm subtending an angle of " + degArc + "° at the centre, with two straight radial segments leading away from the arc. A steady current of " + I + " A flows through it. (a) Using the Biot–Savart law, derive and evaluate the magnetic field at the centre of the arc. (b) Find the field at the centre if the arc is closed into a complete circular loop carrying the same current. (c) For that complete loop, find the field on its axis at a distance of " + xcm + " cm from the centre.",
        hints: [
          "For an arc, every element is a distance R from the centre and perpendicular to its radius vector, so integrate dB = μ0 I dℓ/(4πR²).",
          "The radial straight segments contribute nothing at the centre because dℓ is parallel to the vector from the element to the centre.",
          "A full loop corresponds to θ = 2π; the on-axis field replaces R² with (R² + x²) in the denominator with a 3/2 power.",
        ],
        steps: [
          {
            title: "Set up the arc integral",
            text: "Convert the arc angle to radians and the radius to metres before integrating.",
            math: String.raw`\theta=${degArc}^\circ=${fmt(theta)}\ \mathrm{rad},\qquad R=${fmt(R)}\ \mathrm m,\qquad I=${I}\ \mathrm A`,
          },
          {
            title: "Field of the arc",
            text: "Integrating dℓ around the arc gives the arc angle in radians in the numerator.",
            math: String.raw`B_{\rm arc}=\frac{\mu_0 I\theta}{4\pi R}\approx${texSci(Barc)}\ \mathrm T`,
          },
          {
            title: "Why the radial segments vanish",
            text: "At the centre, the vector from each radial element points along the element itself, so the cross product is zero.",
            math: String.raw`B_{\rm radial}=0\quad\text{because } d\ell\parallel\hat{\mathbf r}\ \Rightarrow\ d\ell\times\hat{\mathbf r}=0`,
          },
          {
            title: "Full circular loop",
            text: "Setting θ = 2π recovers the standard loop field at the centre.",
            math: String.raw`B_{\rm loop}=\frac{\mu_0 I}{2R}\approx${texSci(Bloop)}\ \mathrm T`,
          },
          {
            title: "Field on the loop axis",
            text: "Off the centre only the axial components survive by symmetry, giving the (R² + x²)^(3/2) denominator.",
            math: String.raw`B_{\rm axis}=\frac{\mu_0 I R^2}{2(R^2+x^2)^{3/2}}\approx${texSci(Baxis)}\ \mathrm T`,
          },
        ],
        answer: "At the centre of the " + degArc + "° arc, B = " + fmt(Barc) + " T (" + fmt(Barc * 1e6) + " µT); for a full loop the centre field is " + fmt(Bloop) + " T; on the axis at " + xcm + " cm the field is " + fmt(Baxis) + " T.",
        alternatives: [
          "Use the fraction-of-a-loop shortcut: the arc field is (θ/2π) times the full-loop field, which reproduces the μ0 I θ/(4πR) result immediately.",
          "Check the axial result in the limit x = 0, where it must reduce to μ0 I/(2R), and for x ≫ R, where it should fall as 1/x³ like a dipole.",
        ],
        mistakes: [
          "Using the arc angle in degrees instead of radians in B = μ0 I θ/(4πR).",
          "Assigning a nonzero field at the centre to the radial straight segments instead of recognising that dℓ is parallel to r-hat.",
          "Dropping the 3/2 power in the on-axis formula, which changes both the near and far field behaviour.",
        ],
        further: "Two identical loops of radius R separated by a distance R carry equal currents in the same direction. Derive the field at the midpoint between them and determine whether the field near that point is uniform to first or second order in displacement.",
      }
    },
  },

  // ── Ampere's law ───────────────────────────────────────────────────────────
  {
    id: "p4-ampere-law",
    domain: "physics",
    topicId: "ampere-law",
    title: "Ampere’s law",
    level: "Undergraduate 2",
    type: "Derivation",
    concepts: ["Ampère's law", "solenoid", "coaxial cable", "enclosed current", "current density"],
    build(rng, index) {
      const nPerCm = rng.int(10, 50)
      const I1 = rng.num(0.5, 5.0, 2)
      const aMm = rng.num(1.0, 4.0, 1)
      const bMm = rng.num(6.0, 12.0, 1)
      const I2 = rng.int(2, 15)
      const n = nPerCm * 100
      const Bsol = MU0 * n * I1
      const a = aMm / 1000
      const b = bMm / 1000
      const r0 = a / 2
      const r1 = (a + b) / 2
      const r2 = 2 * b
      const B0 = MU0 * I2 * r0 / (2 * Math.PI * a * a)
      const B1 = MU0 * I2 / (2 * Math.PI * r1)
      return {
        title: "Ampèrian loops for a solenoid and a cable (case " + (index + 1) + ")",
        statement: "A long solenoid has " + nPerCm + " turns per centimetre and carries a current of " + fmt(I1) + " A. (a) Use Ampère's law to find the magnetic field inside the solenoid. (b) A separate coaxial cable has a solid inner conductor of radius " + fmt(aMm) + " mm carrying a uniformly distributed current of " + I2 + " A, and a thin outer cylindrical shell of radius " + fmt(bMm) + " mm carrying the return current of -" + I2 + " A. Find the magnetic field at radii " + fmt(aMm / 2) + " mm, " + fmt((aMm + bMm) / 2) + " mm and " + fmt(2 * bMm) + " mm.",
        hints: [
          "For the solenoid choose a rectangular Ampèrian loop with one side inside and one outside; only the inside segment contributes.",
          "Inside the inner conductor the enclosed current is I2(r/a)² because the current density is uniform.",
          "Between the conductors only the inner current is enclosed; outside both conductors the net enclosed current is zero.",
        ],
        steps: [
          {
            title: "Field inside the solenoid",
            text: "With n turns per unit length, the enclosed current of the Ampèrian rectangle is nLI1.",
            math: String.raw`n=${nPerCm}\ \mathrm{turns/cm}=${n}\ \mathrm{turns/m},\qquad B_{\rm sol}=\mu_0 nI_1\approx${texSci(Bsol)}\ \mathrm T`,
          },
          {
            title: "Ampère's law for the cable",
            text: "Cylindrical symmetry gives a circulating field whose circulation is μ0 times the enclosed current.",
            math: String.raw`\oint\mathbf B\cdot d\ell=B(2\pi r)=\mu_0 I_{\rm enc}`,
          },
          {
            title: "Inside the inner conductor",
            text: "Uniform current density means the enclosed current scales with the enclosed area.",
            math: String.raw`I_{\rm enc}=I_2\frac{r_0^2}{a^2}\ \Rightarrow\ B(r_0)=\frac{\mu_0 I_2 r_0}{2\pi a^2}\approx${texSci(B0)}\ \mathrm T,\qquad r_0=${fmt(r0 * 1000)}\ \mathrm{mm}`,
          },
          {
            title: "Between the conductors",
            text: "Here the whole inner current is enclosed but none of the return current is.",
            math: String.raw`r_1=${fmt(r1 * 1000)}\ \mathrm{mm}:\qquad B(r_1)=\frac{\mu_0 I_2}{2\pi r_1}\approx${texSci(B1)}\ \mathrm T`,
          },
          {
            title: "Outside the cable",
            text: "The return current cancels the inner current exactly, so the net enclosed current vanishes.",
            math: String.raw`r_2=${fmt(r2 * 1000)}\ \mathrm{mm}:\qquad I_{\rm enc}=I_2-I_2=0\ \Rightarrow\ B(r_2)=0\ \mathrm T`,
          },
        ],
        answer: "Inside the solenoid B = " + fmt(Bsol) + " T; for the coaxial cable B = " + fmt(B0) + " T at " + fmt(aMm / 2) + " mm, B = " + fmt(B1) + " T at " + fmt((aMm + bMm) / 2) + " mm, and B = 0 T at " + fmt(2 * bMm) + " mm.",
        alternatives: [
          "For the solenoid, sum the fields of individual turns in the tight-winding limit; the same μ0 n I follows without explicitly drawing an Ampèrian loop.",
          "Treat the region outside the cable as a current-free annulus: by Ampère's law and symmetry the circulation must vanish, so B = 0 there.",
        ],
        mistakes: [
          "Using the turn spacing per centimetre directly as n without converting to turns per metre.",
          "Assuming the full current I2 is enclosed at a radius smaller than a; the uniform current density gives only I2(r/a)².",
          "Forgetting the return current on the outer shell and predicting a nonzero 1/r field outside the cable.",
        ],
        further: "Replace the solid inner conductor by a thin shell at radius a carrying the same current. Recalculate the field for r < a and explain how the interior solution differs from the uniform-current case above.",
      }
    },
  },
]

import type { GeneratedFamily } from "./types"

// Shared physical constants and formatting helpers for this family pack.
const g = 9.81
const GRAV = 6.674e-11

/** Fixed-decimal formatting keeps displayed intermediates and the final answer consistent. */
const f = (x: number, decimals = 2): string => x.toFixed(decimals)

/** Split a number into a mantissa and an integer exponent for KaTeX scientific notation. */
const sciParts = (x: number): { mantissa: string; exponent: number } => {
  const parts = x.toExponential(2).split("e")
  return { mantissa: parts[0], exponent: Number(parts[1]) }
}

export const PHYSICS_FAMILIES_1: GeneratedFamily[] = [
  {
    id: "p1-kinematics",
    domain: "physics",
    topicId: "kinematics",
    title: "Constant acceleration and projectiles",
    level: "High school",
    type: "Numerical",
    concepts: ["Projectile motion", "Kinematic equations", "Velocity resolution", "Time of flight"],
    build(rng, index) {
      const v0 = rng.int(16, 36) + (index % 4) * 2
      const thetaDeg = rng.int(25, 65)
      const h0 = rng.int(4, 18) + (index % 3) * 3
      const rad = (thetaDeg * Math.PI) / 180
      const vx = v0 * Math.cos(rad)
      const vy = v0 * Math.sin(rad)
      const tf = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g
      const hmax = h0 + (vy * vy) / (2 * g)
      const range = vx * tf

      return {
        statement:
          "A ball is launched from the edge of a platform " + f(h0, 1) + " m above level ground with speed " +
          f(v0, 1) + " m/s at " + thetaDeg + " degrees above the horizontal. Take the acceleration due to " +
          "gravity as 9.81 m/s² and ignore air resistance. Find the time of flight, the maximum height " +
          "reached above the ground, and the horizontal distance from the launch point where the ball lands.",
        hints: [
          "Treat the horizontal and vertical motions separately: the horizontal velocity is constant while gravity acts only vertically.",
          "Resolve the launch speed into components first, then solve the vertical position equation for the time when the ball reaches the ground.",
          "The peak occurs when the vertical velocity is zero, and the range is the constant horizontal speed multiplied by the total flight time.",
        ],
        steps: [
          {
            title: "Resolve the launch velocity",
            text: "Use trigonometry to split the initial speed into constant horizontal and gravity-affected vertical components.",
            math: String.raw`v_{0x}=v_0\cos\theta=${f(v0, 1)}\cos(${thetaDeg}^\circ)=${f(vx)}\ \text{m/s},\qquad v_{0y}=v_0\sin\theta=${f(vy)}\ \text{m/s}`,
          },
          {
            title: "Vertical motion gives the flight time",
            text: "Set the vertical position to zero at landing and keep the positive root of the quadratic equation.",
            math: String.raw`0=h_0+v_{0y}t-\frac{1}{2}gt^2\ \Rightarrow\ t=\frac{v_{0y}+\sqrt{v_{0y}^2+2gh_0}}{g}=${f(tf)}\ \text{s}`,
          },
          {
            title: "Maximum height above the ground",
            text: "At the peak the vertical velocity vanishes, so apply the time-independent vertical relation and add the platform height.",
            math: String.raw`h_{\max}=h_0+\frac{v_{0y}^2}{2g}=${f(hmax)}\ \text{m}`,
          },
          {
            title: "Horizontal range",
            text: "There is no horizontal acceleration, so the range is the horizontal speed times the total time aloft.",
            math: String.raw`R=v_{0x}\,t=${f(range)}\ \text{m}`,
          },
        ],
        answer:
          "Time of flight " + f(tf) + " s; maximum height above the ground " + f(hmax) + " m; horizontal range " + f(range) + " m.",
        alternatives: [
          "Apply the constant-acceleration vector formula separately along two perpendicular axes and eliminate the time where convenient.",
          "Use conservation of energy to find the maximum height and the landing speed, then recover the flight time from the change in vertical momentum.",
        ],
        mistakes: [
          "Using the full launch speed instead of its vertical component in the vertical-motion equation.",
          "Forgetting to add the platform height when reporting the maximum height measured from the ground.",
          "Assuming the time rising equals the time falling even though launch and landing heights differ.",
        ],
        further:
          "Recompute the flight time and range if the same launch took place on Mars, where the acceleration due to gravity is about 3.71 m/s², and explain the change.",
      }
    },
  },

  {
    id: "p1-newtons-laws",
    domain: "physics",
    topicId: "newtons-laws",
    title: "Newton’s second law",
    level: "High school",
    type: "Numerical",
    concepts: ["Newton's second law", "Kinetic friction", "Free-body diagram", "Constant acceleration"],
    build(rng, index) {
      const m = rng.int(2, 12) + (index % 3)
      const mu = rng.num(0.1, 0.45, 2)
      const F = Math.round(mu * m * g) + rng.int(12, 60)
      const t = rng.int(2, 6)
      const N = m * g
      const fk = mu * N
      const a = (F - fk) / m
      const v = a * t
      const s = 0.5 * a * t * t

      return {
        statement:
          "A crate of mass " + m + " kg rests on a horizontal floor. A constant horizontal force of " + f(F, 1) +
          " N is applied to it, and the coefficient of kinetic friction between the crate and the floor is " +
          f(mu, 2) + ". Starting from rest, the crate is pushed for " + t + " s. Taking g = 9.81 m/s², find the " +
          "acceleration of the crate, its speed at the end of the interval, and the distance it travels.",
        hints: [
          "Draw a free-body diagram; on level ground the vertical forces balance, so the normal force equals the weight.",
          "Kinetic friction has magnitude mu times the normal force and points opposite the motion, so subtract it from the applied force.",
          "With a constant net force the acceleration is constant, so the standard from-rest kinematic formulas apply.",
        ],
        steps: [
          {
            title: "Normal force",
            text: "The crate has no vertical acceleration, so the upward normal force balances the downward weight.",
            math: String.raw`N=mg=${m}\times 9.81=${f(N)}\ \text{N}`,
          },
          {
            title: "Kinetic friction",
            text: "Multiply the normal force by the coefficient of kinetic friction to get the resisting force.",
            math: String.raw`f_k=\mu N=${f(mu, 2)}\times ${f(N)}=${f(fk)}\ \text{N}`,
          },
          {
            title: "Newton's second law",
            text: "The net horizontal force equals mass times acceleration, giving the constant acceleration.",
            math: String.raw`a=\frac{F-f_k}{m}=\frac{${f(F, 1)}-${f(fk)}}{${m}}=${f(a)}\ \text{m/s}^2`,
          },
          {
            title: "Kinematics from rest",
            text: "Starting from rest, the speed grows linearly and the distance grows with the square of the time.",
            math: String.raw`v=at=${f(v)}\ \text{m/s},\qquad s=\frac{1}{2}at^2=${f(s)}\ \text{m}`,
          },
        ],
        answer:
          "Acceleration " + f(a) + " m/s²; speed after " + t + " s is " + f(v) + " m/s; distance travelled " + f(s) + " m.",
        alternatives: [
          "Use the work-energy theorem: the net force times the displacement equals the gain in kinetic energy, which gives the speed after a known distance.",
          "Apply the impulse-momentum theorem, relating the net impulse over the time interval to the change in momentum.",
        ],
        mistakes: [
          "Using the friction formula before confirming that the applied force exceeds the maximum static friction and the crate actually slides.",
          "Setting the normal force equal to the applied horizontal force instead of the weight on level ground.",
          "Dropping the factor of one half in the distance formula for motion starting from rest.",
        ],
        further:
          "Repeat the calculation with the force applied at an angle above the horizontal, so that its vertical component changes the normal force and therefore the friction.",
      }
    },
  },

  {
    id: "p1-work-energy-power",
    domain: "physics",
    topicId: "work-energy-power",
    title: "Work and energy",
    level: "Advanced high school",
    type: "Numerical",
    concepts: ["Work-energy theorem", "Kinetic energy", "Friction work", "Average power"],
    build(rng, index) {
      const m = rng.int(2, 10) + (index % 3)
      const L = rng.int(3, 10)
      const thetaDeg = rng.int(25, 48)
      const mu = rng.num(0.08, 0.28, 2)
      const rad = (thetaDeg * Math.PI) / 180
      const sinTheta = Math.sin(rad)
      const cosTheta = Math.cos(rad)
      const Wg = m * g * L * sinTheta
      const fk = mu * m * g * cosTheta
      const Wf = -fk * L
      const Wnet = Wg + Wf
      const speed = Math.sqrt((2 * Wnet) / m)
      const a = g * (sinTheta - mu * cosTheta)
      const t = Math.sqrt((2 * L) / a)
      const Pavg = Wnet / t

      return {
        statement:
          "A block of mass " + m + " kg slides from rest down a rough incline of length " + L + " m inclined at " +
          thetaDeg + " degrees to the horizontal. The coefficient of kinetic friction is " + f(mu, 2) +
          ". Taking g = 9.81 m/s², determine the work done by gravity, the work done by friction, the speed of " +
          "the block at the bottom, and the average power delivered by the net force during the slide.",
        hints: [
          "The work done by gravity depends on the vertical drop, which is the incline length times the sine of the tilt angle.",
          "Friction acts along the slope, and its work is negative because it opposes the displacement.",
          "Add the works to get the net work, equate that to the change in kinetic energy, and divide the net work by the elapsed time for average power.",
        ],
        steps: [
          {
            title: "Work done by gravity",
            text: "Use the vertical drop of the incline to compute the gravitational work.",
            math: String.raw`W_g=mg(L\sin\theta)=${m}\times 9.81\times ${L}\sin(${thetaDeg}^\circ)=${f(Wg)}\ \text{J}`,
          },
          {
            title: "Work done by friction",
            text: "The friction force is mu times the normal component of the weight and points up the slope.",
            math: String.raw`W_f=-\mu mg\cos\theta\, L=${f(Wf)}\ \text{J}`,
          },
          {
            title: "Work-energy theorem",
            text: "The net work equals the gain in kinetic energy from rest, which fixes the bottom speed.",
            math: String.raw`W_{\text{net}}=W_g+W_f=${f(Wnet)}\ \text{J}=\frac{1}{2}mv^2\ \Rightarrow\ v=${f(speed)}\ \text{m/s}`,
          },
          {
            title: "Elapsed time and average power",
            text: "Find the constant acceleration along the slope, the time from rest, then average power as net work over time.",
            math: String.raw`a=g(\sin\theta-\mu\cos\theta)=${f(a)}\ \text{m/s}^2,\quad t=\sqrt{\frac{2L}{a}}=${f(t)}\ \text{s},\quad P_{\text{avg}}=\frac{W_{\text{net}}}{t}=${f(Pavg)}\ \text{W}`,
          },
        ],
        answer:
          "Gravity does " + f(Wg) + " J of work, friction does " + f(Wf) + " J, the bottom speed is " + f(speed) +
          " m/s, and the average power is " + f(Pavg) + " W.",
        alternatives: [
          "Apply Newton's second law along the incline to obtain the constant acceleration, then use kinematics for the speed and elapsed time.",
          "Use energy conservation including the thermal energy generated by friction, and compute power from the rate of energy transfer.",
        ],
        mistakes: [
          "Taking the gravitational work as mgL instead of using the vertical drop L times the sine of the angle.",
          "Treating friction work as positive because friction 'does work', when here it removes mechanical energy.",
          "Reporting average power as force times final speed instead of total work divided by total time.",
        ],
        further:
          "If the same incline were frictionless, recompute the bottom speed and the average power, and explain why both change in the direction they do.",
      }
    },
  },

  {
    id: "p1-momentum-collisions",
    domain: "physics",
    topicId: "momentum-collisions",
    title: "Collisions",
    level: "Advanced high school",
    type: "Numerical",
    concepts: ["Conservation of momentum", "Coefficient of restitution", "Kinetic energy loss", "Relative velocity"],
    build(rng, index) {
      const m1 = rng.int(1, 8) + (index % 2)
      const m2 = rng.int(1, 7)
      const u1 = rng.int(5, 14)
      const u2 = rng.int(0, 3)
      const e = rng.num(0.2, 1.0, 1)
      const p = m1 * u1 + m2 * u2
      const v1 = (p - m2 * e * (u1 - u2)) / (m1 + m2)
      const v2 = (p + m1 * e * (u1 - u2)) / (m1 + m2)
      const Ki = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2
      const Kf = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2
      const dK = Ki - Kf

      return {
        statement:
          "On a frictionless horizontal track, a cart of mass " + m1 + " kg moving at " + u1 + " m/s catches up with " +
          "a second cart of mass " + m2 + " kg moving in the same direction at " + u2 + " m/s. The collision has " +
          "coefficient of restitution " + f(e, 1) + ". Find the velocity of each cart after the collision and the " +
          "total kinetic energy lost during the impact.",
        hints: [
          "There is no external horizontal force, so the total momentum before and after the collision is the same.",
          "The restitution equation says the relative speed of separation equals e times the relative speed of approach.",
          "Solve the momentum and restitution equations together, then compare total kinetic energy before and after.",
        ],
        steps: [
          {
            title: "Conservation of momentum",
            text: "Add the momenta before impact and set the result equal to the total momentum afterwards.",
            math: String.raw`m_1u_1+m_2u_2=m_1v_1+m_2v_2 \;\Rightarrow\; m_1v_1+m_2v_2=${f(p)}\ \text{kg·m/s}`,
          },
          {
            title: "Restitution relation",
            text: "Relate the separation speed to the approach speed using the given coefficient.",
            math: String.raw`v_2-v_1=e(u_1-u_2)=${f(e, 1)}(${u1}-${u2})=${f(e * (u1 - u2))}\ \text{m/s}`,
          },
          {
            title: "Solve for final velocities",
            text: "Solve the two linear equations simultaneously for the unknown final velocities.",
            math: String.raw`v_1=\frac{p-m_2e(u_1-u_2)}{m_1+m_2}=${f(v1)}\ \text{m/s},\qquad v_2=\frac{p+m_1e(u_1-u_2)}{m_1+m_2}=${f(v2)}\ \text{m/s}`,
          },
          {
            title: "Kinetic energy lost",
            text: "Subtract the final total kinetic energy from the initial total kinetic energy.",
            math: String.raw`K_i=${f(Ki)}\ \text{J},\quad K_f=${f(Kf)}\ \text{J},\quad \Delta K=K_i-K_f=${f(dK)}\ \text{J}`,
          },
        ],
        answer:
          "After the collision the " + m1 + " kg cart moves at " + f(v1) + " m/s and the " + m2 + " kg cart at " +
          f(v2) + " m/s (positive is the original direction); kinetic energy lost is " + f(dK) + " J.",
        alternatives: [
          "In the perfectly elastic case use the result that the relative velocity simply reverses; the general case is the same idea scaled by e.",
          "Transform into the centre-of-mass frame, where the collision only rescales the relative speeds by e, then transform back.",
        ],
        mistakes: [
          "Forgetting that the restitution relation involves relative velocities rather than the individual speeds.",
          "Assuming kinetic energy is conserved for every collision instead of only elastic ones.",
          "Assigning the same sign to both final velocities when the lighter cart can actually rebound.",
        ],
        further:
          "Determine algebraically the condition on the two masses and the restitution coefficient for the struck cart to move backwards after impact, and test it with these values.",
      }
    },
  },

  {
    id: "p1-rotational-mechanics",
    domain: "physics",
    topicId: "rotational-mechanics",
    title: "Torque and angular acceleration",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["Moment of inertia", "Torque", "Rotational dynamics", "No-slip constraint"],
    build(rng, index) {
      const M = rng.int(2, 10) + (index % 3)
      const R = rng.num(0.1, 0.45, 2)
      const m = rng.int(1, 6)
      const I = 0.5 * M * R * R
      const a = (m * g) / (m + 0.5 * M)
      const alpha = a / R
      const T = m * (g - a)

      return {
        statement:
          "A solid uniform disk of mass " + M + " kg and radius " + f(R, 2) + " m rotates about a frictionless " +
          "horizontal axle. A light string wrapped around its rim supports a hanging block of mass " + m +
          " kg, and the string does not slip. Taking g = 9.81 m/s², find the angular acceleration of the disk, " +
          "the downward acceleration of the block, and the tension in the string.",
        hints: [
          "Start from the moment of inertia of a solid disk about its central axis.",
          "The tension exerts a torque on the disk; combine that with the no-slip relation linking linear and angular acceleration.",
          "Apply Newton's second law to the hanging block and solve the coupled equations for the acceleration.",
        ],
        steps: [
          {
            title: "Moment of inertia of the disk",
            text: "For a uniform solid disk about its symmetry axis the moment of inertia is one half of mass times radius squared.",
            math: String.raw`I=\frac{1}{2}MR^2=\frac{1}{2}(${M})(${f(R, 2)})^2=${f(I, 4)}\ \text{kg·m}^2`,
          },
          {
            title: "Torque equation for the disk",
            text: "The string tension produces the torque, and the no-slip condition converts angular to linear acceleration.",
            math: String.raw`TR=I\alpha=\frac{1}{2}MR^2\frac{a}{R}\ \Rightarrow\ T=\frac{1}{2}Ma`,
          },
          {
            title: "Newton's second law for the block",
            text: "The weight exceeds the tension, and the difference accelerates the block downward.",
            math: String.raw`mg-T=ma \;\Rightarrow\; mg=\left(m+\frac{M}{2}\right)a`,
          },
          {
            title: "Solve for acceleration and tension",
            text: "Substitute the given values, then recover the angular acceleration and the string tension.",
            math: String.raw`a=\frac{mg}{m+M/2}=${f(a)}\ \text{m/s}^2,\quad \alpha=\frac{a}{R}=${f(alpha)}\ \text{rad/s}^2,\quad T=m(g-a)=${f(T)}\ \text{N}`,
          },
        ],
        answer:
          "Angular acceleration " + f(alpha) + " rad/s²; block acceleration " + f(a) + " m/s² downward; string tension " + f(T) + " N.",
        alternatives: [
          "Use energy conservation: the block's lost gravitational potential energy becomes translational plus rotational kinetic energy, then differentiate with respect to time.",
          "Treat the rotating disk as an equivalent translational mass I divided by R squared and apply Newton's second law to the combined system.",
        ],
        mistakes: [
          "Using I = M R squared instead of one half M R squared for a solid disk.",
          "Setting the tension equal to the weight of the hanging block instead of less than the weight.",
          "Forgetting the no-slip relation linking the block's acceleration to the disk's angular acceleration.",
        ],
        further:
          "Replace the solid disk with a thin hoop of the same mass and radius, for which the moment of inertia is M R squared, and recompute the acceleration and tension.",
      }
    },
  },

  {
    id: "p1-gravitation",
    domain: "physics",
    topicId: "gravitation",
    title: "Gravitational force",
    level: "High school",
    type: "Numerical",
    concepts: ["Newton's law of gravitation", "Inverse-square law", "Gravitational field", "Equal and opposite forces"],
    build(rng, index) {
      const m1 = (rng.int(3, 9) + (index % 2)) * 1e24
      const m2 = rng.int(1, 6) * 1e24
      const r = rng.int(2, 8) * 1e8 + (index % 3) * 1e7
      const F = (GRAV * m1 * m2) / (r * r)
      const a1 = F / m1
      const a2 = F / m2
      const Fs = sciParts(F)
      const a1s = sciParts(a1)
      const a2s = sciParts(a2)

      return {
        statement:
          "Two spherical bodies have masses " + m1.toExponential(0) + " kg and " + m2.toExponential(0) +
          " kg, with their centres separated by " + r.toExponential(1) + " m. Using a universal gravitational " +
          "constant of 6.674e-11 N·m²/kg², find the magnitude of the gravitational force each exerts on the " +
          "other and the acceleration each body experiences due to that force.",
        hints: [
          "Use Newton's inverse-square law with the centre-to-centre separation, not the distance between surfaces.",
          "The forces form an equal and opposite action-reaction pair, so both bodies feel the same force magnitude.",
          "Divide that common force by each body's own mass to get its acceleration.",
        ],
        steps: [
          {
            title: "Gravitational force",
            text: "Apply Newton's law of gravitation using the centre-to-centre distance.",
            math: String.raw`F=G\frac{m_1m_2}{r^2}=${Fs.mantissa}\times 10^{${Fs.exponent}}\ \text{N}`,
          },
          {
            title: "Acceleration of the first body",
            text: "Divide the common force by the mass of the first body.",
            math: String.raw`a_1=\frac{F}{m_1}=${a1s.mantissa}\times 10^{${a1s.exponent}}\ \text{m/s}^2`,
          },
          {
            title: "Acceleration of the second body",
            text: "Divide the same force by the mass of the second body; the lighter body accelerates more.",
            math: String.raw`a_2=\frac{F}{m_2}=${a2s.mantissa}\times 10^{${a2s.exponent}}\ \text{m/s}^2`,
          },
          {
            title: "Compare the accelerations",
            text: "Equal forces do not mean equal accelerations; the ratio is the inverse mass ratio.",
            math: String.raw`\frac{a_1}{a_2}=\frac{m_2}{m_1}=\frac{${f(m2 / 1e24, 1)}}{${f(m1 / 1e24, 1)}}\approx ${f(a1 / a2, 3)}`,
          },
        ],
        answer:
          "Force magnitude " + F.toExponential(2) + " N; the first body accelerates at " + a1.toExponential(2) +
          " m/s² and the second at " + a2.toExponential(2) + " m/s², directed toward each other.",
        alternatives: [
          "Compute the gravitational field produced by each body at the location of the other, then multiply by the mass to obtain the force.",
          "Scale from a known reference configuration using the inverse-square dependence on separation.",
        ],
        mistakes: [
          "Using the gap between the surfaces instead of the centre-to-centre separation in the inverse-square law.",
          "Assuming the more massive body feels the larger force when the two forces are actually equal and opposite.",
          "Dividing the force by the wrong mass when finding each body's acceleration.",
        ],
        further:
          "Find the separation at which the gravitational force would be exactly half its present value, expressing the answer as a multiple of the original separation r.",
      }
    },
  },

  {
    id: "p1-oscillations",
    domain: "physics",
    topicId: "oscillations",
    title: "Oscillation periods",
    level: "High school",
    type: "Experimental",
    concepts: ["Simple pendulum", "Period measurement", "Small-angle approximation", "Experimental error"],
    build(rng, index) {
      const L = rng.num(0.4, 1.8, 2) + (index % 5) * 0.05
      const N = rng.int(10, 30)
      const factor = rng.num(0.97, 1.03, 3)
      const Ttrue = 2 * Math.PI * Math.sqrt(L / g)
      const tmeas = Number((N * Ttrue * factor).toFixed(2))
      const T = tmeas / N
      const gexp = (4 * Math.PI * Math.PI * L) / (T * T)
      const pct = (Math.abs(gexp - g) / g) * 100

      return {
        statement:
          "A student times " + N + " complete small-angle swings of a simple pendulum of length " + f(L, 2) +
          " m and records a total elapsed time of " + f(tmeas, 2) + " s. Using the small-angle pendulum model, " +
          "determine the experimental period, the value of the acceleration due to gravity implied by the " +
          "measurement, and the percentage difference from the accepted value of 9.81 m/s².",
        hints: [
          "The period is the total timed interval divided by the number of complete oscillations.",
          "For small angles the period follows T equals two pi times the square root of length over g; rearrange it to solve for g.",
          "Express the percentage difference relative to the accepted value 9.81 m/s² and take its magnitude.",
        ],
        steps: [
          {
            title: "Period from the stopwatch",
            text: "Divide the total recorded time by the number of swings to obtain one period.",
            math: String.raw`T=\frac{t}{N}=\frac{${f(tmeas, 2)}}{${N}}=${f(T, 4)}\ \text{s}`,
          },
          {
            title: "Small-angle pendulum law",
            text: "Start from the ideal pendulum period and rearrange it to isolate the gravitational acceleration.",
            math: String.raw`T=2\pi\sqrt{\frac{L}{g}}\ \Rightarrow\ g=\frac{4\pi^2L}{T^2}`,
          },
          {
            title: "Implied gravitational acceleration",
            text: "Insert the measured period and the known string length.",
            math: String.raw`g_{\text{exp}}=\frac{4\pi^2(${f(L, 2)})}{(${f(T, 4)})^2}=${f(gexp)}\ \text{m/s}^2`,
          },
          {
            title: "Percentage difference",
            text: "Compare the experimental value with the accepted value of 9.81 m/s².",
            math: String.raw`\text{error}=\frac{|g_{\text{exp}}-9.81|}{9.81}\times 100\% =${f(pct)}\%`,
          },
        ],
        answer:
          "Experimental period " + f(T, 4) + " s; implied g = " + f(gexp) + " m/s²; percentage difference from 9.81 m/s² is " +
          f(pct) + "%.",
        alternatives: [
          "Time several pendulum lengths and plot the period squared against the length; the slope of the best-fit line equals four pi squared over g.",
          "Derive the period from energy conservation in the small-angle limit and then solve for g in the same way.",
        ],
        mistakes: [
          "Dividing the number of oscillations by the total time instead of the total time by the number of oscillations.",
          "Including the swing amplitude in the small-angle period formula, where it should not appear.",
          "Omitting the absolute value when reporting the percentage difference, which could make it negative.",
        ],
        further:
          "Discuss how the inferred value of g would be affected if the student had timed only five swings with the same reaction-time uncertainty per timing, and justify the direction of the change.",
      }
    },
  },

  {
    id: "p1-shm",
    domain: "physics",
    topicId: "shm",
    title: "Simple harmonic motion",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["Simple harmonic motion", "Angular frequency", "Maximum speed", "Maximum acceleration", "Energy in SHM"],
    build(rng, index) {
      const m = rng.num(0.5, 4, 1)
      const k = rng.int(20, 100) + (index % 5) * 5
      const A = rng.num(0.05, 0.25, 2)
      const x = rng.num(0.3, 0.7, 1) * A
      const omega = Math.sqrt(k / m)
      const period = (2 * Math.PI) / omega
      const vmax = omega * A
      const amax = omega * omega * A
      const vAtX = omega * Math.sqrt(A * A - x * x)

      return {
        statement:
          "A block of mass " + f(m, 1) + " kg is attached to a spring of stiffness " + k +
          " N/m on a frictionless horizontal surface. It is pulled " + f(A, 2) + " m from equilibrium and " +
          "released from rest. Find the angular frequency and period of the motion, the maximum speed and " +
          "maximum acceleration, and the speed when the displacement from equilibrium is " + f(x, 3) + " m.",
        hints: [
          "The angular frequency of a mass-spring oscillator depends only on the stiffness and the mass.",
          "The largest speed occurs at equilibrium and the largest acceleration at the turning points.",
          "Use energy conservation to find the speed at an intermediate displacement.",
        ],
        steps: [
          {
            title: "Angular frequency",
            text: "For a mass on a spring the angular frequency is the square root of stiffness over mass.",
            math: String.raw`\omega=\sqrt{\frac{k}{m}}=\sqrt{\frac{${k}}{${f(m, 1)}}}=${f(omega)}\ \text{rad/s}`,
          },
          {
            title: "Period of oscillation",
            text: "Convert the angular frequency to an ordinary period.",
            math: String.raw`T=\frac{2\pi}{\omega}=${f(period)}\ \text{s}`,
          },
          {
            title: "Maximum speed and acceleration",
            text: "The speed peaks at equilibrium and the acceleration magnitude peaks at maximum displacement.",
            math: String.raw`v_{\max}=\omega A=${f(vmax)}\ \text{m/s},\qquad a_{\max}=\omega^2 A=${f(amax)}\ \text{m/s}^2`,
          },
          {
            title: "Speed at a given displacement",
            text: "Conserve mechanical energy between the turning point and the displacement of interest.",
            math: String.raw`v=\omega\sqrt{A^2-x^2}=${f(vAtX)}\ \text{m/s}\quad (x=${f(x, 3)}\ \text{m})`,
          },
        ],
        answer:
          "Angular frequency " + f(omega) + " rad/s; period " + f(period) + " s; maximum speed " + f(vmax) +
          " m/s; maximum acceleration " + f(amax) + " m/s²; speed at x = " + f(x, 3) + " m is " + f(vAtX) + " m/s.",
        alternatives: [
          "Write the displacement as a cosine function of time and differentiate to obtain velocity and acceleration at any instant.",
          "Use the phase-space relation between velocity and displacement that follows directly from energy conservation.",
        ],
        mistakes: [
          "Using the ratio k over m without taking the square root for the angular frequency.",
          "Claiming the maximum acceleration occurs at the equilibrium position.",
          "Using the displacement itself instead of the square root of amplitude squared minus displacement squared in the speed formula.",
        ],
        further:
          "If kinetic friction were present, derive the decrease in amplitude after each complete oscillation in terms of the friction force and the spring constant.",
      }
    },
  },

  {
    id: "p1-normal-modes",
    domain: "physics",
    topicId: "coupled-oscillators",
    title: "Normal modes",
    level: "Undergraduate 2",
    type: "Theoretical",
    concepts: ["Coupled oscillators", "Normal modes", "Eigenfrequencies", "Symmetry of modes"],
    build(rng, index) {
      const m = rng.num(0.5, 2.5, 1)
      const k = rng.int(10, 50) + (index % 4) * 5
      const w1 = Math.sqrt(k / m)
      const w2 = Math.sqrt((3 * k) / m)
      const T1 = (2 * Math.PI) / w1
      const T2 = (2 * Math.PI) / w2

      return {
        statement:
          "Two identical sliders, each of mass " + f(m, 1) + " kg, move along a frictionless horizontal line. " +
          "Each is attached to a fixed wall by a spring of stiffness " + k + " N/m, and the two sliders are " +
          "joined to each other by an identical spring. Derive the equations of motion, find the two normal-mode " +
          "angular frequencies and their periods, and describe the relative motion of the sliders in each mode.",
        hints: [
          "Write a separate Newton's second law equation for each slider, including the force from the coupling spring.",
          "Assume both sliders oscillate at a common angular frequency and look for the consistency condition on the amplitudes.",
          "Use symmetry: in-phase motion leaves the middle spring unstretched, while out-of-phase motion stretches it strongly.",
        ],
        steps: [
          {
            title: "Equations of motion",
            text: "Each outer spring pulls a slider back to the wall, and the coupling spring pulls toward or away from the other slider.",
            math: String.raw`m\ddot{x}_1=-kx_1-k(x_1-x_2),\qquad m\ddot{x}_2=-kx_2-k(x_2-x_1)`,
          },
          {
            title: "Normal-mode condition",
            text: "Substitute sinusoidal solutions with a common angular frequency and require a nonzero amplitude solution.",
            math: String.raw`(2k-m\omega^2)^2-k^2=0\ \Rightarrow\ m\omega^2=k\ \text{or}\ m\omega^2=3k`,
          },
          {
            title: "Eigenfrequencies",
            text: "The two roots give the symmetric and antisymmetric angular frequencies.",
            math: String.raw`\omega_1=\sqrt{\frac{k}{m}}=${f(w1)}\ \text{rad/s},\qquad \omega_2=\sqrt{\frac{3k}{m}}=${f(w2)}\ \text{rad/s}`,
          },
          {
            title: "Periods and mode shapes",
            text: "Convert to periods and identify which mode corresponds to which frequency.",
            math: String.raw`T_1=\frac{2\pi}{\omega_1}=${f(T1)}\ \text{s}\ (x_1=x_2),\qquad T_2=\frac{2\pi}{\omega_2}=${f(T2)}\ \text{s}\ (x_1=-x_2)`,
          },
        ],
        answer:
          "Symmetric in-phase mode: angular frequency " + f(w1) + " rad/s and period " + f(T1) +
          " s, with the sliders moving together. Antisymmetric out-of-phase mode: angular frequency " + f(w2) +
          " rad/s and period " + f(T2) + " s, with the sliders moving in opposite directions.",
        alternatives: [
          "Use symmetry directly: the in-phase mode leaves the middle spring unchanged so the effective stiffness is k, while the out-of-phase mode gives an effective stiffness of 3k.",
          "Introduce the coordinates x1 plus x2 and x1 minus x2, which diagonalise the system into two independent oscillators.",
        ],
        mistakes: [
          "Forgetting that the coupling spring contributes a restoring force in the antisymmetric mode.",
          "Assuming both normal-mode frequencies equal the square root of k over m just because the masses are identical.",
          "Associating the higher frequency with the in-phase mode instead of the out-of-phase mode.",
        ],
        further:
          "Predict what happens to the two normal-mode frequencies if the middle coupling spring is removed, and explain the result physically.",
      }
    },
  },

  {
    id: "p1-damped-forced-oscillations",
    domain: "physics",
    topicId: "damped-forced-oscillations",
    title: "Damped oscillators",
    level: "Undergraduate 2",
    type: "Numerical",
    concepts: ["Viscous damping", "Damped angular frequency", "Amplitude decay", "Quality factor"],
    build(rng, index) {
      const m = rng.num(0.5, 3, 1)
      const k = rng.int(20, 100) + (index % 4) * 5
      const b = rng.num(0.15, 0.7, 2) * 2 * Math.sqrt(m * k)
      const A0 = rng.num(0.05, 0.2, 2)
      const w0 = Math.sqrt(k / m)
      const gamma = b / (2 * m)
      const wd = Math.sqrt(w0 * w0 - gamma * gamma)
      const tau = 1 / gamma
      const Q = w0 / (2 * gamma)
      // Tie the evaluation time to the decay constant so the remaining amplitude stays meaningful.
      const t = Number((rng.num(0.5, 2, 2) * tau + (index % 3) * 0.1).toFixed(2))
      const At = A0 * Math.exp(-gamma * t)

      return {
        statement:
          "A mass of " + f(m, 1) + " kg attached to a spring of stiffness " + k + " N/m moves through a fluid " +
          "that exerts a viscous drag force of magnitude b times the speed, with b = " + f(b, 3) +
          " kg/s. The mass is displaced " + f(A0, 2) + " m from equilibrium and released from rest. Determine the " +
          "damping regime, the damped angular frequency, the amplitude decay time constant, the amplitude after " +
          f(t, 2) + " s, and the quality factor of the oscillator.",
        hints: [
          "Compare the damping rate b over two m with the undamped natural angular frequency to decide the regime.",
          "The damped angular frequency is the square root of the natural frequency squared minus the damping rate squared.",
          "The amplitude, not the energy, decays exponentially with a rate b over two m.",
        ],
        steps: [
          {
            title: "Natural frequency and damping rate",
            text: "Compute the undamped natural frequency and the exponential amplitude decay rate.",
            math: String.raw`\omega_0=\sqrt{\frac{k}{m}}=${f(w0)}\ \text{rad/s},\qquad \gamma=\frac{b}{2m}=${f(gamma, 3)}\ \text{s}^{-1}`,
          },
          {
            title: "Determine the damping regime",
            text: "Since the damping rate is smaller than the natural frequency, the motion remains underdamped and oscillatory.",
            math: String.raw`\gamma<\omega_0\ \Rightarrow\ \text{underdamped}`,
          },
          {
            title: "Damped angular frequency",
            text: "Damping lowers the oscillation frequency below its undamped value.",
            math: String.raw`\omega_d=\sqrt{\omega_0^2-\gamma^2}=${f(wd)}\ \text{rad/s}`,
          },
          {
            title: "Decay envelope and quality factor",
            text: "Apply the exponential amplitude envelope, its time constant, and the definition of the quality factor.",
            math: String.raw`A(t)=A_0e^{-\gamma t},\quad A(${f(t, 2)}\ \text{s})=${f(At, 4)}\ \text{m},\quad \tau=\frac{1}{\gamma}=${f(tau)}\ \text{s},\quad Q=\frac{\omega_0}{2\gamma}=${f(Q)}`,
          },
        ],
        answer:
          "The oscillator is underdamped; damped angular frequency " + f(wd) + " rad/s; amplitude time constant " +
          f(tau) + " s; amplitude after " + f(t, 2) + " s is " + f(At, 4) + " m; quality factor " + f(Q) + ".",
        alternatives: [
          "Solve the characteristic equation for the motion directly and identify the oscillatory part of the resulting solution.",
          "Estimate the quality factor from the fractional energy lost per cycle and compare with the definition involving the damping constant.",
        ],
        mistakes: [
          "Using b over m instead of b over two m as the exponential decay rate of the amplitude.",
          "Assuming the damped frequency equals the undamped natural frequency even when damping is significant.",
          "Forgetting that the amplitude decays with time constant two m over b, while the energy decays twice as fast.",
        ],
        further:
          "Find the damping constant that would make this system critically damped, and describe qualitatively how the motion differs at that value.",
      }
    },
  },
]

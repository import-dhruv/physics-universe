import type { GeneratedFamily } from './types'

// Deterministic generated problem families for the advanced mathematics topics.
// Every numerical value shown in a statement, hint, step, or answer is computed
// in code from the RNG draw (and the index), so the arithmetic stays consistent.

const fx = (x: number, d = 4): string => x.toFixed(d)
const fmt = (x: number, d = 4): string => (Number.isInteger(x) ? String(x) : x.toFixed(d))

function binom(n: number, k: number): number {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return Math.round(r)
}

export const MATH_FAMILIES_4: GeneratedFamily[] = [
  {
    id: 'm4-tensor-algebra',
    domain: 'math',
    topicId: 'tensor-algebra',
    title: 'Tensor operations',
    level: 'Undergraduate 3',
    type: 'Numerical',
    concepts: ['rank-2 tensor', 'trace', 'determinant', 'tensor contraction', 'matrix square'],
    build(rng, index) {
      const shift = 2 + 5 * index
      let a = rng.int(0, 3) + shift
      let b = rng.int(-3, 5)
      let c = rng.int(-3, 5)
      let d = rng.int(-3, 5)
      let det = a * d - b * c
      let tries = 0
      while (det === 0 && tries++ < 40) {
        a = rng.int(0, 3) + shift
        b = rng.int(-3, 5)
        c = rng.int(-3, 5)
        d = rng.int(-3, 5)
        det = a * d - b * c
      }
      const tr = a + d
      const contraction = a * a + d * d + 2 * b * c
      const s11 = a * a + b * c
      const s12 = b * (a + d)
      const s21 = c * (a + d)
      const s22 = c * b + d * d

      return {
        title: "Trace, determinant and contraction of a rank-2 tensor",
        statement:
          "Let T be the rank-2 tensor with components a = " + a + ", b = " + b + ", c = " + c +
          ", and d = " + d + ", arranged as the 2 by 2 matrix [[a, b], [c, d]]. " +
          "Compute the trace of T, the determinant of T, and the full contraction of T with its transpose, " +
          "that is the sum over i and j of T_ij T_ji. Give all three values.",
        hints: [
          "The trace is simply the sum of the diagonal entries: a + d.",
          "For a 2 by 2 matrix the determinant is a d - b c; watch the sign of the product b c.",
          "The contraction T_ij T_ji equals the trace of T squared, which for 2 by 2 is a^2 + 2 b c + d^2 = (trace)^2 - 2 (determinant).",
        ],
        steps: [
          {
            title: "Write the tensor components",
            text: "Place the four given components into a 2 by 2 array so the index convention is unambiguous.",
            math: String.raw`T = \begin{pmatrix} ${a} & ${b} \\ ${c} & ${d} \end{pmatrix}`,
          },
          {
            title: "Evaluate the trace",
            text: "Sum the diagonal entries a and d.",
            math: String.raw`\operatorname{tr}(T) = ${a} + (${d}) = ${tr}`,
          },
          {
            title: "Evaluate the determinant",
            text: "Apply the 2 by 2 determinant formula and subtract the off-diagonal product.",
            math: String.raw`\det(T) = (${a})(${d}) - (${b})(${c}) = ${det}`,
          },
          {
            title: "Square the tensor",
            text: "Multiply T by itself; the off-diagonal entries both pick up the factor a + d.",
            math: String.raw`T^2 = \begin{pmatrix} ${s11} & ${s12} \\ ${s21} & ${s22} \end{pmatrix}`,
          },
          {
            title: "Contract the indices",
            text: "The contraction with the transpose is the trace of the square, and it agrees with the invariant formula involving trace and determinant.",
            math: String.raw`T_{ij}T_{ji} = ${a}^2 + (${d})^2 + 2(${b})(${c}) = ${contraction} = \operatorname{tr}(T)^2 - 2\det(T)`,
          },
        ],
        answer:
          "tr(T) = " + tr + ", det(T) = " + det + ", and the contraction T_ij T_ji = " + contraction + ".",
        alternatives: [
          "The contraction is also the trace of the square, tr(T squared) = " + contraction + ".",
          "Equivalently, tr(T)^2 - 2 det(T) = " + (tr * tr - 2 * det) + ".",
        ],
        mistakes: [
          "Confusing the contraction T_ij T_ji with the Frobenius norm T_ij T_ij, which would be a^2 + b^2 + c^2 + d^2.",
          "Dropping a minus sign in the determinant and computing a d + b c instead of a d - b c.",
          "Forgetting the cross term 2 b c when expanding the contraction.",
        ],
        further:
          "Harder follow-up: a 3 by 3 tensor has trace 6, trace of its square 14, and determinant 6. " +
          "Use Newton's identities to show that the trace of its cube is 36.",
      }
    },
  },

  {
    id: 'm4-hilbert-spaces',
    domain: 'math',
    topicId: 'hilbert-spaces',
    title: 'Hilbert space calculations',
    level: 'Undergraduate 3',
    type: 'Numerical',
    concepts: ['inner product', 'norm', 'orthogonal projection', 'orthogonality', 'distance in Hilbert space'],
    build(rng, index) {
      const s = rng.int(1, 4)
      const t = rng.int(1, 3) + (index % 2)
      const p = rng.int(1, 5)
      const q = rng.int(1, 5)
      const vv = p * p + q * q
      const u1 = s * p + t * q
      const u2 = s * q - t * p
      const dot = u1 * p + u2 * q
      const cosAngle = s / Math.sqrt(s * s + t * t)
      const distance = t * Math.sqrt(vv)

      return {
        title: "Orthogonal projection in the Hilbert plane",
        statement:
          "In the real Hilbert space R^2 with the standard dot product, let v = (" + p + ", " + q +
          ") and u = (" + u1 + ", " + u2 + "). Find the orthogonal projection of u onto the subspace spanned by v, " +
          "and the distance from u to that subspace.",
        hints: [
          "The projection of u onto v is c v where c equals the inner product of u and v divided by the squared norm of v.",
          "Compute the squared norm of v first: p^2 + q^2. The numbers here are arranged so that the coefficient c comes out a small integer.",
          "After subtracting the projection, the residual must be orthogonal to v; its norm gives the distance.",
        ],
        steps: [
          {
            title: "Compute the inner product",
            text: "Use the standard dot product in R^2.",
            math: String.raw`\langle u,v\rangle = ${u1}\cdot ${p} + (${u2})\cdot ${q} = ${dot}`,
          },
          {
            title: "Compute the squared norm of v",
            text: "The squared norm is the inner product of v with itself.",
            math: String.raw`\|v\|^2 = ${p}^2 + ${q}^2 = ${vv}, \qquad \|v\| = \sqrt{${vv}}`,
          },
          {
            title: "Find the projection coefficient",
            text: "Divide the inner product by the squared norm to obtain the scalar multiplier.",
            math: String.raw`c = \frac{\langle u,v\rangle}{\|v\|^2} = \frac{${dot}}{${vv}} = ${s}`,
          },
          {
            title: "Write the projection",
            text: "Scale v by the coefficient just found.",
            math: String.raw`P_v u = ${s}\,v = (${s * p}, ${s * q})`,
          },
          {
            title: "Check orthogonality and the distance",
            text: "The residual is a multiple of a vector perpendicular to v, so its length is the distance to the subspace.",
            math: String.raw`u - P_v u = (${t * q}, ${-t * p}), \quad \langle u-P_v u, v\rangle = 0, \quad d = ${t}\sqrt{${vv}} \approx ${fx(distance, 4)}`,
          },
        ],
        answer:
          "The projection is (" + (s * p) + ", " + (s * q) + ") and the distance to the span of v is " +
          t + " sqrt(" + vv + "), about " + fx(distance, 4) + ".",
        alternatives: [
          "The cosine of the angle between u and v is s / sqrt(s^2 + t^2) = " + fx(cosAngle, 4) + ".",
          "Equivalently the projection is the closest point of the subspace, since the residual is orthogonal to v.",
        ],
        mistakes: [
          "Dividing by the norm ||v|| instead of the squared norm ||v||^2 when forming the projection coefficient.",
          "Forgetting to negate the second component when writing a vector perpendicular to v.",
          "Reporting the squared distance t^2 (p^2 + q^2) as the distance itself.",
        ],
        further:
          "Harder follow-up: add a third vector w that is not in the span of v, apply the Gram-Schmidt process to get an " +
          "orthonormal basis, and verify that projecting u onto the plane spanned by v and w equals the sum of the two one-dimensional projections.",
      }
    },
  },

  {
    id: 'm4-ode',
    domain: 'math',
    topicId: 'ode',
    title: 'First-order ODE models',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['separable ODE', 'exponential growth', 'doubling time', 'initial condition', 'population model'],
    build(rng, index) {
      const d = rng.int(1, 5)
      const y0 = rng.int(100, 900)
      const m = rng.int(2, 4) + (index % 2)
      const j = rng.int(1, 3)
      const t = m * d
      const tTarget = j * d
      const population = y0 * 2 ** m
      const target = y0 * 2 ** j
      const k = Math.log(2) / d

      return {
        title: "Doubling-time exponential growth model",
        statement:
          "A population satisfies the first-order equation dy/dt = k y with y(0) = " + y0 + ". " +
          "Its size doubles every " + d + " time units. Find the population after " + t + " time units, " +
          "and find how much time is required to reach a population of " + target + ".",
        hints: [
          "Separate the variables to get dy/y = k dt, then integrate both sides.",
          "The doubling condition e^(k d) = 2 fixes the growth constant as k = ln(2)/d.",
          "Once k is known the solution is y(t) = y0 times 2 raised to the power t/d; compare exponents with the target.",
        ],
        steps: [
          {
            title: "Separate the variables",
            text: "Divide by y and multiply by dt to put each variable on its own side.",
            math: String.raw`\frac{dy}{dt} = k y \;\Longrightarrow\; \frac{dy}{y} = k\,dt`,
          },
          {
            title: "Integrate and apply the initial condition",
            text: "Integration gives a logarithm, and y(0) fixes the integration constant.",
            math: String.raw`\ln|y| = kt + C \;\Longrightarrow\; y(t) = ${y0} e^{kt}`,
          },
          {
            title: "Determine the growth constant",
            text: "Use the fact that the population doubles after d time units.",
            math: String.raw`e^{k\cdot ${d}} = 2 \;\Longrightarrow\; k = \frac{\ln 2}{${d}} \approx ${fx(k, 4)}`,
          },
          {
            title: "Evaluate at the requested time",
            text: "Rewrite the solution with base 2 and substitute the time.",
            math: String.raw`y(t) = ${y0}\,2^{t/${d}}, \qquad y(${t}) = ${y0}\,2^{${m}} = ${population}`,
          },
          {
            title: "Solve for the target time",
            text: "Equate exponents because both sides have the same base 2 multiplier.",
            math: String.raw`${y0}\,2^{t/${d}} = ${target} = ${y0}\,2^{${j}} \;\Longrightarrow\; t = ${tTarget}`,
          },
        ],
        answer:
          "After " + t + " time units the population is " + population + ", and reaching " + target +
          " takes " + tTarget + " time units.",
        alternatives: [
          "The solution can be written y(t) = " + y0 + " exp(ln(2) t / " + d + ").",
          "The growth constant is k = ln(2)/" + d + " which is about " + fx(k, 4) + " per time unit.",
        ],
        mistakes: [
          "Treating the growth as linear, y = y0 + k t, instead of exponential.",
          "Forgetting that the doubling time determines k = ln(2)/d rather than k = 2/d.",
          "Confusing doubling time with half-life and using a negative exponent.",
        ],
        further:
          "Harder follow-up: replace the model by the logistic equation dy/dt = r y (1 - y/K) with carrying capacity K. " +
          "Solve it by separation of variables and show that y(t) approaches K as t grows.",
      }
    },
  },

  {
    id: 'm4-pde',
    domain: 'math',
    topicId: 'pde',
    title: 'Separation of variables',
    level: 'Undergraduate 3',
    type: 'Derivation',
    concepts: ['heat equation', 'separation constant', 'boundary conditions', 'eigenmode', 'decay rate'],
    build(rng, index) {
      const n = rng.int(1, 4) + (index % 2)
      const L = rng.int(1, 4)
      const A = rng.int(1, 9)
      const alpha = rng.pick([0.5, 1, 2])
      const rate = alpha * (n * Math.PI / L) ** 2
      const halfLife = Math.log(2) / rate

      return {
        title: "A single Fourier mode of the heat equation",
        statement:
          "Solve the heat equation u_t = " + fx(alpha, 1) + " u_xx on the interval 0 < x < " + L +
          " with u(0, t) = u(" + L + ", t) = 0 and initial temperature u(x, 0) = " + A +
          " sin(" + n + " pi x / " + L + "). Then compute the time at which the amplitude has halved.",
        hints: [
          "Substitute u = X(x) T(t) and divide so that the x-dependent and t-dependent sides are equal to a common constant -lambda.",
          "The boundary conditions force X(x) = sin(n pi x / L) with separation constant lambda = (n pi / L)^2.",
          "The time dependence is a decaying exponential exp(-alpha lambda t); set it equal to 1/2 to get the half-life.",
        ],
        steps: [
          {
            title: "Separate the variables",
            text: "Assume a product solution and isolate the ratio on each side of the equation.",
            math: String.raw`u = X T \;\Longrightarrow\; X T' = ${fx(alpha, 1)} X'' T \;\Longrightarrow\; \frac{T'}{${fx(alpha, 1)} T} = \frac{X''}{X} = -\lambda`,
          },
          {
            title: "Solve the spatial eigenproblem",
            text: "Homogeneous Dirichlet data select sine eigenfunctions with discrete eigenvalues.",
            math: String.raw`X'' + \lambda X = 0,\; X(0)=X(${L})=0 \;\Longrightarrow\; \lambda_n = \left(\frac{${n}\pi}{${L}}\right)^2,\; X_n = \sin\!\left(\frac{${n}\pi x}{${L}}\right)`,
          },
          {
            title: "Solve the time equation",
            text: "The temporal factor obeys a first-order decay equation with rate alpha lambda.",
            math: String.raw`T' = -${fx(alpha, 1)}\lambda_n T \;\Longrightarrow\; T_n(t) = e^{-\lambda_n ${fx(alpha, 1)} t}`,
          },
          {
            title: "Assemble the solution",
            text: "The initial profile is exactly one eigenmode, so a single term suffices.",
            math: String.raw`\alpha\lambda_n = ${fx(rate, 4)}, \qquad u(x,t) = ${A}\sin\!\left(\frac{${n}\pi x}{${L}}\right) e^{-${fx(rate, 4)} t}`,
          },
          {
            title: "Compute the half-life",
            text: "Set the exponential amplitude equal to one half and solve for the time.",
            math: String.raw`e^{-\alpha\lambda_n t_{1/2}} = \tfrac12 \;\Longrightarrow\; t_{1/2} = \frac{\ln 2}{\alpha\lambda_n} \approx ${fx(halfLife, 3)}`,
          },
        ],
        answer:
          "u(x, t) = " + A + " sin(" + n + " pi x / " + L + ") exp(-" + fx(rate, 4) + " t), and the amplitude halves after about " +
          fx(halfLife, 3) + " time units.",
        alternatives: [
          "The decay rate is alpha (n pi / L)^2 = " + fx(rate, 4) + ".",
          "Equivalently the half-life is ln(2) L^2 / (alpha n^2 pi^2) = " + fx(halfLife, 3) + ".",
        ],
        mistakes: [
          "Using lambda = n pi / L instead of (n pi / L)^2 for the separation constant.",
          "Putting a plus sign in the exponent and getting growth instead of decay.",
          "Choosing cosine eigenfunctions, which violate the zero boundary conditions.",
        ],
        further:
          "Harder follow-up: change the initial condition to a constant temperature T0. " +
          "Expand it in a Fourier sine series and show that only odd modes survive, with coefficients 4 T0 / (n pi).",
      }
    },
  },

  {
    id: 'm4-fourier-analysis',
    domain: 'math',
    topicId: 'fourier-analysis',
    title: 'Fourier series',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['odd function', 'Fourier sine series', 'Fourier coefficients', 'Leibniz series', 'partial sum error'],
    build(rng, index) {
      const K = 2 + 4 * index + rng.int(0, 3)
      let partial = 0
      for (let m = 0; m < K; m++) partial += (2 * (m % 2 === 0 ? 1 : -1)) / (2 * m + 1)
      const exact = Math.PI / 2
      const error = Math.abs(partial - exact)
      const bound = 2 / (2 * K + 1)

      return {
        title: "Fourier series of f(x) = x and the Leibniz sum",
        statement:
          "Let f be the 2 pi-periodic odd function equal to f(x) = x on the interval from -pi to pi. " +
          "Write its Fourier series, then compute the partial sum using the first " + K +
          " nonzero odd harmonics at x = pi/2 and compare it with the exact value f(pi/2) = pi/2.",
        hints: [
          "Because f is odd, all cosine coefficients vanish and only sine terms remain.",
          "Integrate x sin(n x) by parts to find b_n = 2 (-1)^(n+1) / n.",
          "At x = pi/2 the even harmonics vanish and the odd ones alternate, leaving the Leibniz series for pi/2.",
        ],
        steps: [
          {
            title: "Identify which coefficients survive",
            text: "An odd function has a zero average and zero cosine coefficients, so only the sine coefficients are needed.",
            math: String.raw`a_0 = a_n = 0 \quad (f\ \text{odd}), \qquad b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} x\sin(nx)\,dx`,
          },
          {
            title: "Integrate by parts",
            text: "Evaluate the integral over the symmetric interval using the even integrand.",
            math: String.raw`b_n = \frac{2}{\pi}\left[-\frac{x\cos(nx)}{n}+\frac{\sin(nx)}{n^2}\right]_0^{\pi} = \frac{2(-1)^{n+1}}{n}`,
          },
          {
            title: "Write the series",
            text: "Insert the coefficients into the sine series.",
            math: String.raw`x = 2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin(nx)`,
          },
          {
            title: "Evaluate at x = pi/2",
            text: "Even n give sin(n pi/2) = 0, while odd n alternate between plus and minus one.",
            math: String.raw`\sin\!\left(\frac{n\pi}{2}\right) = 0\ (n\ \text{even}), \qquad (-1)^{(n-1)/2}\ (n\ \text{odd})`,
          },
          {
            title: "Sum the first K odd harmonics",
            text: "Add the alternating unit fractions and compare with the target value pi/2.",
            math: String.raw`S_{${K}} = 2\sum_{m=0}^{${K - 1}}\frac{(-1)^m}{2m+1} \approx ${fx(partial, 5)}, \qquad \left|S_{${K}}-\frac{\pi}{2}\right| \approx ${fx(error, 5)} < \frac{2}{${2 * K + 1}}`,
          },
        ],
        answer:
          "The Fourier series is 2 times the sum over n of (-1)^(n+1) sin(n x) / n. The " + K +
          "-term partial sum at pi/2 is about " + fx(partial, 5) + ", within about " + fx(error, 5) + " of pi/2.",
        alternatives: [
          "The same computation proves the Leibniz series pi/4 = 1 - 1/3 + 1/5 - 1/7 + ...",
          "The alternating-series remainder guarantees an error smaller than " + fx(bound, 5) + ".",
        ],
        mistakes: [
          "Using b_n = (-1)^(n+1)/n and forgetting the factor 2 from the symmetric interval.",
          "Starting the alternating sign with (-1)^n instead of (-1)^(n+1), reversing every term.",
          "Including even harmonics in the partial sum even though sin(n pi/2) vanishes for them.",
        ],
        further:
          "Harder follow-up: derive the Fourier series of the sawtooth that equals 1 on (0, pi) and -1 on (-pi, 0), " +
          "and use it to evaluate the alternating sum of the odd reciprocals squared.",
      }
    },
  },

  {
    id: 'm4-laplace-transforms',
    domain: 'math',
    topicId: 'laplace-transforms',
    title: 'Laplace transforms',
    level: 'Undergraduate 2',
    type: 'Derivation',
    concepts: ['Laplace transform', 'initial condition', 'partial fractions', 'inverse transform', 'steady state'],
    build(rng, index) {
      const a = rng.int(1, 4)
      const b = rng.int(1, 8) + (index % 2)
      const y0 = rng.int(1, 6)
      const t1 = rng.int(1, 3)
      const eq = b / a
      const y1 = eq + (y0 - eq) * Math.exp(-a * t1)

      return {
        title: "Solving a linear ODE with Laplace transforms",
        statement:
          "Use Laplace transforms to solve y' + " + a + " y = " + b + " with y(0) = " + y0 + ". " +
          "Give y(t) in closed form, evaluate it at t = " + t1 + ", and state the limiting value as t tends to infinity.",
        hints: [
          "The transform of y' is s Y(s) minus the initial value y(0).",
          "Solve for Y(s) and split the term with denominator s(s + a) into partial fractions.",
          "Invert each term using the transforms of the exponential and of the constant function.",
        ],
        steps: [
          {
            title: "Transform the equation",
            text: "Apply the derivative rule and transform the constant right-hand side.",
            math: String.raw`sY(s) - ${y0} + ${a}Y(s) = \frac{${b}}{s}`,
          },
          {
            title: "Solve for Y(s)",
            text: "Collect the Y terms and divide by s + a.",
            math: String.raw`Y(s) = \frac{${y0}}{s+${a}} + \frac{${b}}{s(s+${a})}`,
          },
          {
            title: "Decompose into partial fractions",
            text: "The repeated linear factors separate into a difference of simple fractions.",
            math: String.raw`\frac{1}{s(s+${a})} = \frac{1}{${a}}\left(\frac{1}{s} - \frac{1}{s+${a}}\right)`,
          },
          {
            title: "Invert the transform",
            text: "Use the inverse transforms of 1/(s+a) and 1/s, then combine the exponential terms.",
            math: String.raw`y(t) = ${y0} e^{-${a}t} + ${fmt(eq)}\left(1 - e^{-${a}t}\right) = ${fmt(eq)} + ${fmt(y0 - eq)} e^{-${a}t}`,
          },
          {
            title: "Evaluate and take the limit",
            text: "Substitute the given time and observe that the exponential term decays away.",
            math: String.raw`y(${t1}) = ${fmt(eq)} + (${fmt(y0 - eq)}) e^{-${a}\cdot ${t1}} \approx ${fx(y1, 4)}, \qquad \lim_{t\to\infty} y(t) = ${fmt(eq)}`,
          },
        ],
        answer:
          "y(t) = " + fmt(eq) + " + " + fmt(y0 - eq) + " exp(-" + a + " t). At t = " + t1 +
          " this is about " + fx(y1, 4) + ", and y(t) tends to " + fmt(eq) + ".",
        alternatives: [
          "Equivalently, y(t) = " + y0 + " exp(-" + a + " t) + " + fmt(eq) + " (1 - exp(-" + a + " t)).",
          "The steady state equals the forcing divided by the decay rate, " + b + "/" + a + " = " + fmt(eq) + ".",
        ],
        mistakes: [
          "Dropping the initial condition and taking the transform of y' to be just s Y(s).",
          "Reversing the sign in the partial fraction decomposition of 1/(s(s+a)).",
          "Inverting 1/(s+a) as exp(+a t), producing growth instead of decay.",
        ],
        further:
          "Harder follow-up: solve y'' + " + a + " y' = " + b + " with y(0) = " + y0 +
          " and y'(0) = 0, and identify which part of the transform causes the linear-in-t term.",
      }
    },
  },

  {
    id: 'm4-complex-analysis',
    domain: 'math',
    topicId: 'complex-analysis',
    title: 'Complex analysis',
    level: 'Undergraduate 4',
    type: 'Proof',
    concepts: ['contour integration', 'residue theorem', 'simple pole', 'Jordan form', 'trigonometric integral'],
    build(rng, index) {
      const a = 3 + 4 * index + rng.int(0, 1)
      const b = rng.int(1, 2)
      const root = Math.sqrt(a * a - b * b)
      const value = 2 * Math.PI / root

      return {
        title: "A trigonometric integral by residues",
        statement:
          "Evaluate the integral from 0 to 2 pi of d(theta) / (" + a + " + " + b + " cos(theta)). " +
          "Prove the result by converting it to a contour integral over the unit circle and applying the residue theorem.",
        hints: [
          "Substitute z = exp(i theta), so that cos(theta) = (z + 1/z)/2 and d(theta) = dz/(i z).",
          "The resulting rational function has two simple poles; for a > b > 0 exactly one of them lies inside the unit circle.",
          "The residue at the interior pole is 1/(i sqrt(a^2 - b^2)), and multiplying by 2 pi i finishes the proof.",
        ],
        steps: [
          {
            title: "Map the circle to the complex plane",
            text: "Use the standard substitution that turns a trigonometric integral into a contour integral.",
            math: String.raw`z = e^{i\theta}, \qquad \cos\theta = \frac{z+z^{-1}}{2}, \qquad d\theta = \frac{dz}{iz}`,
          },
          {
            title: "Rewrite the integrand",
            text: "Clear the factor of z to obtain a quadratic denominator.",
            math: String.raw`I = \oint_{|z|=1} \frac{2\,dz}{i\left(${b} z^2 + ${2 * a} z + ${b}\right)}`,
          },
          {
            title: "Locate the poles",
            text: "Solve the quadratic and note that the root with the plus sign has modulus below one when a exceeds b.",
            math: String.raw`${b} z^2 + ${2 * a} z + ${b} = 0 \;\Longrightarrow\; z_{\pm} = \frac{-${a} \pm \sqrt{${a}^2-${b}^2}}{${b}}`,
          },
          {
            title: "Compute the interior residue",
            text: "Differentiate the denominator and evaluate at the interior pole; the numerator contributes a factor 2.",
            math: String.raw`z_{\mathrm{in}} = \frac{-${a}+\sqrt{${a}^2-${b}^2}}{${b}}, \qquad \operatorname{Res} = \frac{2}{2i\sqrt{${a}^2-${b}^2}} = \frac{1}{i\sqrt{${a}^2-${b}^2}}`,
          },
          {
            title: "Apply the residue theorem",
            text: "Multiply the residue by 2 pi i and simplify the denominator.",
            math: String.raw`I = 2\pi i \cdot \frac{1}{i\sqrt{${a}^2-${b}^2}} = \frac{2\pi}{\sqrt{${a}^2-${b}^2}} \approx ${fx(value, 4)}`,
          },
        ],
        answer:
          "The integral equals 2 pi / sqrt(" + a + "^2 - " + b + "^2), which is approximately " + fx(value, 4) + ".",
        alternatives: [
          "The closed form can also be written 2 pi / sqrt(" + (a * a - b * b) + ").",
          "The single interior pole is z = (-" + a + " + sqrt(" + (a * a - b * b) + "))/" + b + ".",
        ],
        mistakes: [
          "Forgetting the Jacobian dz/(i z) when changing variables from theta to z.",
          "Enclosing both poles instead of checking which one lies inside the unit circle.",
          "Dropping the factor 2 from the identity cos(theta) = (z + 1/z)/2.",
        ],
        further:
          "Harder follow-up: evaluate the integral of d(theta) / (a + b cos(theta))^2 by differentiating the answer with respect to a, " +
          "and justify differentiation under the integral sign.",
      }
    },
  },

  {
    id: 'm4-probability-theory',
    domain: 'math',
    topicId: 'probability-theory',
    title: 'Probability',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['binomial distribution', 'combinations', 'expected value', 'variance', 'standard deviation'],
    build(rng, index) {
      const n = 5 + 4 * index + rng.int(0, 2)
      const k = rng.int(1, n - 1)
      const p = rng.pick([0.2, 0.25, 0.4, 0.5, 0.6])
      const choose = binom(n, k)
      const probability = choose * p ** k * (1 - p) ** (n - k)
      const mean = n * p
      const variance = n * p * (1 - p)

      return {
        title: "Binomial coin-toss probabilities and moments",
        statement:
          "A biased coin lands heads with probability " + p + ". It is tossed " + n + " times independently, " +
          "and X counts the number of heads. Find the probability of exactly " + k + " heads, the expected value of X, " +
          "and the variance of X.",
        hints: [
          "The number of heads is binomial with parameters n and p.",
          "There are n choose k orderings, each with probability p^k (1-p)^(n-k).",
          "The mean and variance of a binomial variable are n p and n p (1-p).",
        ],
        steps: [
          {
            title: "Identify the distribution",
            text: "Independent identical trials with two outcomes give a binomial random variable.",
            math: String.raw`X \sim \operatorname{Binomial}(${n}, ${p})`,
          },
          {
            title: "Count the orderings",
            text: "Compute the binomial coefficient for choosing which tosses are heads.",
            math: String.raw`\binom{${n}}{${k}} = \frac{${n}!}{${k}!\,(${n}-${k})!} = ${choose}`,
          },
          {
            title: "Compute the point probability",
            text: "Multiply the number of orderings by the probability of any one ordering.",
            math: String.raw`P(X=${k}) = ${choose}\,(${p})^{${k}} (${fmt(1 - p)})^{${n} - ${k}} \approx ${fx(probability, 5)}`,
          },
          {
            title: "Find the expectation",
            text: "Use the mean of the binomial distribution.",
            math: String.raw`E[X] = np = ${n}\cdot ${p} = ${fmt(mean)}`,
          },
          {
            title: "Find the variance",
            text: "Use the variance formula and take its square root for the spread.",
            math: String.raw`\operatorname{Var}(X) = np(1-p) = ${fmt(variance)}, \qquad \sigma \approx ${fx(Math.sqrt(variance), 4)}`,
          },
        ],
        answer:
          "P(X = " + k + ") is about " + fx(probability, 5) + ", E[X] = " + fmt(mean) +
          ", and Var(X) = " + fmt(variance) + ".",
        alternatives: [
          "The standard deviation is about " + fx(Math.sqrt(variance), 4) + ".",
          "The same probability is " + fx(probability * 100, 3) + " percent of all outcomes.",
        ],
        mistakes: [
          "Using n^k instead of the binomial coefficient to count orderings.",
          "Using p (1-p) instead of n p (1-p) for the variance.",
          "Rounding (1 - p)^(n-k) before multiplying, which distorts the final probability.",
        ],
        further:
          "Harder follow-up: let Y be the number of tails, note that Y = n - X, and derive E[Y] and Var(Y) " +
          "without recomputing any binomial probabilities.",
      }
    },
  },

  {
    id: 'm4-statistics',
    domain: 'math',
    topicId: 'statistics',
    title: 'Statistics and variance',
    level: 'High school',
    type: 'Numerical',
    concepts: ['sample mean', 'deviation', 'population variance', 'sample variance', 'z-score'],
    build(rng, index) {
      const s = rng.int(1, 4)
      const c = 10 + 5 * index + rng.int(0, 3)
      const data = [c - 2 * s, c - s, c, c + s, c + 2 * s]
      const sum = data.reduce((acc, x) => acc + x, 0)
      const mean = sum / data.length
      const ss = data.reduce((acc, x) => acc + (x - mean) ** 2, 0)
      const popVar = ss / data.length
      const sampVar = ss / (data.length - 1)
      const sd = Math.sqrt(popVar)
      const zmax = (data[data.length - 1] - mean) / sd

      return {
        title: "Mean, variance and z-score of five measurements",
        statement:
          "The five measurements " + data.join(", ") + " were recorded. Compute the mean, the population variance, " +
          "the sample variance, the population standard deviation, and the z-score of the largest measurement.",
        hints: [
          "Add the five numbers and divide by five to get the mean.",
          "The deviations from the mean are symmetric here, which makes the sum of squared deviations easy to compute.",
          "Population variance divides by 5, sample variance divides by 4, and the z-score divides the deviation by the population standard deviation.",
        ],
        steps: [
          {
            title: "Compute the mean",
            text: "Sum all observations and divide by the count.",
            math: String.raw`\bar{x} = \frac{${data.join(' + ')}}{5} = ${mean}`,
          },
          {
            title: "List the deviations",
            text: "Subtract the mean from each observation; the pattern is symmetric about zero.",
            math: String.raw`x_i - \bar{x} = (${-2 * s}, ${-s}, 0, ${s}, ${2 * s})`,
          },
          {
            title: "Sum the squared deviations",
            text: "Square each deviation and add them.",
            math: String.raw`\sum (x_i-\bar{x})^2 = ${4 * s * s} + ${s * s} + 0 + ${s * s} + ${4 * s * s} = ${ss}`,
          },
          {
            title: "Form both variances",
            text: "Divide the same sum of squares by 5 for the population and by 4 for the sample.",
            math: String.raw`\sigma^2 = \frac{${ss}}{5} = ${fmt(popVar)}, \qquad s^2 = \frac{${ss}}{4} = ${fmt(sampVar)}`,
          },
          {
            title: "Standard deviation and z-score",
            text: "Take the square root for the spread, then standardize the largest observation.",
            math: String.raw`\sigma = \sqrt{${fmt(popVar)}} \approx ${fx(sd, 4)}, \qquad z_{\max} = \frac{${2 * s}}{${fx(sd, 4)}} \approx ${fx(zmax, 4)}`,
          },
        ],
        answer:
          "Mean = " + mean + ", population variance = " + fmt(popVar) + ", sample variance = " + fmt(sampVar) +
          ", population standard deviation is about " + fx(sd, 4) + ", and the largest value has z-score about " +
          fx(zmax, 4) + ".",
        alternatives: [
          "The sample standard deviation is about " + fx(Math.sqrt(sampVar), 4) + ".",
          "The z-score of the largest measurement equals the square root of two, about " + fx(zmax, 4) + ".",
        ],
        mistakes: [
          "Dividing the sum of squares by 4 when a population variance was requested.",
          "Averaging the deviations without squaring them, which gives zero for symmetric data.",
          "Using the sample standard deviation in the denominator of the z-score.",
        ],
        further:
          "Harder follow-up: prove that adding the same constant to every observation shifts the mean but leaves both " +
          "variances unchanged, while multiplying every observation by a constant scales the variance by that constant squared.",
      }
    },
  },

  {
    id: 'm4-numerical-methods',
    domain: 'math',
    topicId: 'numerical-methods',
    title: 'Numerical methods',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['Newton method', 'iteration', 'quadratic convergence', 'error estimate', 'square root'],
    build(rng, index) {
      let A = 5 + 6 * index + rng.int(0, 4)
      while (Math.sqrt(A) % 1 === 0) A++
      const x0 = Math.ceil(Math.sqrt(A)) + rng.int(0, 2)
      const iterates = [x0]
      for (let i = 0; i < 3; i++) {
        const next = Number((0.5 * (iterates[i] + A / iterates[i])).toFixed(6))
        iterates.push(next)
      }
      const exact = Math.sqrt(A)
      const error = Math.abs(iterates[3] - exact)

      return {
        title: "Newton iterations for a square root",
        statement:
          "Use Newton's method with f(x) = x^2 - " + A + " and starting value x0 = " + x0 +
          " to perform three iterations toward sqrt(" + A + "). Report the iterates and the final error compared with the true value.",
        hints: [
          "Newton's update is x minus f(x) divided by f'(x).",
          "For f(x) = x^2 - A the update simplifies to the average of x and A/x.",
          "Each iterate shown should be rounded to six decimals before being used in the next step.",
        ],
        steps: [
          {
            title: "Derive the iteration formula",
            text: "Substitute f and its derivative into the Newton update and simplify.",
            math: String.raw`f(x)=x^2-${A},\quad f'(x)=2x,\quad x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}=\frac12\left(x_n+\frac{${A}}{x_n}\right)`,
          },
          {
            title: "First iteration",
            text: "Start from the given guess and form the average with A divided by that guess.",
            math: String.raw`x_0 = ${x0}, \qquad x_1 = \frac12\left(${x0}+\frac{${A}}{${x0}}\right) \approx ${fx(iterates[1], 6)}`,
          },
          {
            title: "Second iteration",
            text: "Repeat the update using the first corrected value.",
            math: String.raw`x_2 = \frac12\left(${fx(iterates[1], 6)}+\frac{${A}}{${fx(iterates[1], 6)}}\right) \approx ${fx(iterates[2], 6)}`,
          },
          {
            title: "Third iteration",
            text: "One more update already gives many correct digits because the convergence is quadratic.",
            math: String.raw`x_3 = \frac12\left(${fx(iterates[2], 6)}+\frac{${A}}{${fx(iterates[2], 6)}}\right) \approx ${fx(iterates[3], 6)}`,
          },
          {
            title: "Measure the error",
            text: "Compare the third iterate with the exact square root.",
            math: String.raw`\sqrt{${A}} \approx ${fx(exact, 6)}, \qquad |x_3-\sqrt{${A}}| \approx ${error.toExponential(2)}`,
          },
        ],
        answer:
          "The iterates are " + iterates.map((x, i) => "x" + i + " = " + fx(x, 6)).join(", ") +
          ". The approximation to sqrt(" + A + ") is " + fx(iterates[3], 6) + ", with error about " + error.toExponential(2) + ".",
        alternatives: [
          "The exact square root is about " + fx(exact, 6) + ".",
          "Newton's method converges quadratically, so the third iterate already matches the root to roughly six decimals.",
        ],
        mistakes: [
          "Using x minus f'(x)/f(x) instead of x minus f(x)/f'(x).",
          "Forgetting to round each iterate to six decimals before using it in the next formula.",
          "Choosing A to be a perfect square and reporting a trivial integer root.",
        ],
        further:
          "Harder follow-up: apply Newton's method to f(x) = x^3 - " + A + " starting from the same x0, " +
          "derive the update, and compare its convergence rate with the square-root case.",
      }
    },
  },
]

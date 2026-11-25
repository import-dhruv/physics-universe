import type { GeneratedFamily, RNG } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Small exact-arithmetic helpers shared by the generated math families.
// ─────────────────────────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a))
  let y = Math.abs(Math.trunc(b))
  while (y !== 0) {
    const t = x % y
    x = y
    y = t
  }
  return x || 1
}

function frac(n: number, d: number): string {
  if (d === 0) return "undefined"
  let nn = n
  let dd = d
  if (dd < 0) {
    nn = -nn
    dd = -dd
  }
  const g = gcd(nn, dd)
  nn /= g
  dd /= g
  const sign = nn < 0 ? "-" : ""
  return dd === 1 ? sign + Math.abs(nn) : sign + Math.abs(nn) + "/" + dd
}

function eulerPhi(n: number): number {
  let count = 0
  for (let k = 1; k <= n; k++) if (gcd(k, n) === 1) count++
  return count
}

function divisors(n: number): number[] {
  const out: number[] = []
  for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d)
  return out
}

function distinctPrimeFactors(n: number): number[] {
  const out: number[] = []
  let m = n
  for (let p = 2; p * p <= m; p++) {
    if (m % p === 0) {
      out.push(p)
      while (m % p === 0) m /= p
    }
  }
  if (m > 1) out.push(m)
  return out
}

// Exact values of cos and sin at multiples of 30 degrees, written as
// aNum/2 + (sqrtNum/2)*sqrt(3).
const COS_SURD: Record<number, [number, number]> = {
  0: [2, 0], 30: [0, 1], 60: [1, 0], 90: [0, 0], 120: [-1, 0], 150: [0, -1],
  180: [-2, 0], 210: [0, -1], 240: [-1, 0], 270: [0, 0], 300: [1, 0], 330: [0, 1],
}
const SIN_SURD: Record<number, [number, number]> = {
  0: [0, 0], 30: [1, 0], 60: [0, 1], 90: [2, 0], 120: [0, 1], 150: [1, 0],
  180: [0, 0], 210: [-1, 0], 240: [0, -1], 270: [-2, 0], 300: [0, -1], 330: [-1, 0],
}

// KaTeX forms of the same exact values, kept here as String.raw templates so
// every backslash reaches the renderer intact.
const COS_TEX: Record<number, string> = {
  0: String.raw`1`,
  30: String.raw`\frac{\sqrt{3}}{2}`,
  60: String.raw`\frac{1}{2}`,
  90: String.raw`0`,
  120: String.raw`-\frac{1}{2}`,
  150: String.raw`-\frac{\sqrt{3}}{2}`,
  180: String.raw`-1`,
  210: String.raw`-\frac{\sqrt{3}}{2}`,
  240: String.raw`-\frac{1}{2}`,
  270: String.raw`0`,
  300: String.raw`\frac{1}{2}`,
  330: String.raw`\frac{\sqrt{3}}{2}`,
}
const SIN_TEX: Record<number, string> = {
  0: String.raw`0`,
  30: String.raw`\frac{1}{2}`,
  60: String.raw`\frac{\sqrt{3}}{2}`,
  90: String.raw`1`,
  120: String.raw`\frac{\sqrt{3}}{2}`,
  150: String.raw`\frac{1}{2}`,
  180: String.raw`0`,
  210: String.raw`-\frac{1}{2}`,
  240: String.raw`-\frac{\sqrt{3}}{2}`,
  270: String.raw`-1`,
  300: String.raw`-\frac{\sqrt{3}}{2}`,
  330: String.raw`-\frac{1}{2}`,
}

function formatSurd(aNum: number, bNum: number): string {
  const a = frac(aNum, 2)
  const b = frac(Math.abs(bNum), 2)
  const bText = b === "1" ? "sqrt(3)" : b + " sqrt(3)"
  if (bNum === 0) return a
  if (aNum === 0) return (bNum < 0 ? "-" : "") + bText
  return a + (bNum > 0 ? " + " : " - ") + bText
}

function formatComplex(reN: number, reS: number, imN: number, imS: number): string {
  const re = formatSurd(reN, reS)
  const im = formatSurd(imN, imS)
  let imTerm = ""
  if (im === "1") imTerm = "i"
  else if (im === "-1") imTerm = "-i"
  else if (im !== "0") imTerm = (im.startsWith("-") ? "- " : "+ ") + im.replace("-", "") + " i"
  if (imTerm === "") return re
  if (re === "0") return imTerm.replace("+ ", "").replace("- ", "-").replace(" ", "")
  if (imTerm.startsWith("- ")) return re + " " + imTerm
  return re + " " + imTerm
}

// ─────────────────────────────────────────────────────────────────────────────

export const MATH_FAMILIES_5: GeneratedFamily[] = [
  {
    id: "m5-optimization",
    domain: "math",
    topicId: "optimization",
    title: "Optimization",
    level: "Undergraduate 1",
    type: "Numerical",
    concepts: ["constrained optimization", "derivative tests", "quadratic models", "maximum area"],
    build(rng: RNG, index: number) {
      const L = 4 * (6 + 2 * index + rng.int(0, 1))
      const x = L / 4
      const y = L / 2
      const maxArea = (L * L) / 8
      return {
        statement: "A farmer has " + L + " meters of fencing and wants to enclose a rectangular field that uses a straight river as one boundary, so only three sides need fencing. Let x be the length of each of the two sides perpendicular to the river and y the length of the side parallel to it. Find the dimensions that maximize the enclosed area, and report that maximum area.",
        hints: [
          "Write the fencing constraint: 2x + y = " + L + ", so y = " + L + " - 2x.",
          "The area is A(x) = x y = x(" + L + " - 2x). Differentiate to get A'(x) = " + L + " - 4x.",
          "Set A'(x) = 0 to find x = " + x + ", then y = " + y + ". Check A''(x) = -4 < 0 to confirm a maximum.",
        ],
        steps: [
          { title: "Set up the constraint", text: "Only three sides consume fencing: two of length x and one of length y, so their total is the available " + L + " meters.", math: String.raw`2x+y=${L}\quad\Longrightarrow\quad y=${L}-2x` },
          { title: "Write the area function", text: "Substitute for y so the area depends on the single variable x.", math: String.raw`A(x)=x\left(${L}-2x\right)=${L}x-2x^{2}` },
          { title: "Find the critical point", text: "Differentiate and set the derivative equal to zero.", math: String.raw`A'(x)=${L}-4x=0\quad\Longrightarrow\quad x=\frac{${L}}{4}=${x}` },
          { title: "Verify it is a maximum", text: "The second derivative is a negative constant, so the parabola opens downward and this critical point is the global maximum.", math: String.raw`A''(x)=-4<0` },
          { title: "Compute dimensions and area", text: "Recover y from the constraint and evaluate the area at the critical point.", math: String.raw`y=${L}-2(${x})=${y},\qquad A_{\max}=${x}\cdot ${y}=${maxArea}` },
        ],
        answer: "The optimal rectangle has two sides of " + x + " m perpendicular to the river and one side of " + y + " m parallel to it, giving a maximum area of " + maxArea + " square meters.",
        alternatives: [
          "The graph of A(x) is a downward-opening parabola, so its vertex at x = " + x + " gives the maximum with no calculus.",
          "By AM-GM, (2x)(y) is at most ((2x + y)/2)^2 = (" + (L / 2) + ")^2, so xy is at most " + maxArea + ", with equality when 2x = y = " + y + ".",
        ],
        mistakes: [
          "Using the four-sided constraint 2x + 2y = " + L + ", which ignores that the river replaces one fenced side.",
          "Assuming the maximum lies at an endpoint instead of using the derivative or completing the square.",
          "Reporting the fencing length " + L + " as the area rather than computing x times y.",
        ],
        further: "If the river boundary also has to be fenced, so that all four sides share the same " + L + " m of fencing, what shape now maximizes the area and what is the new maximum?",
      }
    },
  },

  {
    id: "m5-variational-calculus",
    domain: "math",
    topicId: "variational-calculus",
    title: "Variational problems",
    level: "Graduate",
    type: "Derivation",
    concepts: ["Euler-Lagrange equation", "functional extremization", "boundary value problems", "second variation"],
    build(rng: RNG, index: number) {
      const a = 2 + 2 * index + rng.int(0, 1)
      const J = frac(-a * a * a, 48)
      const slope0 = frac(-a, 4)
      return {
        statement: "Find the function y(x) on the interval [0, " + a + "] satisfying y(0) = 0 and y(" + a + ") = 0 that extremizes the functional J[y] = integral from 0 to " + a + " of ((y')^2 + y) dx. Then compute the extremal value of J.",
        hints: [
          "The integrand does not depend on x explicitly; apply the Euler-Lagrange equation d/dx(dL/dy') = dL/dy with L = (y')^2 + y.",
          "Here dL/dy = 1 and dL/dy' = 2y', so the equation reduces to the ODE 2y'' = 1.",
          "Integrate twice to get y = x^2/4 + C1 x + C2, then impose both boundary conditions: C2 = 0 and C1 = " + slope0 + ".",
        ],
        steps: [
          { title: "Write the Euler-Lagrange equation", text: "For a functional with integrand L(y, y'), stationarity requires the Euler-Lagrange equation to hold.", math: String.raw`\frac{\partial L}{\partial y}-\frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right)=0` },
          { title: "Compute the derivatives", text: "Differentiate L = (y')^2 + y with respect to y and y' and substitute.", math: String.raw`\frac{\partial L}{\partial y}=1,\qquad \frac{\partial L}{\partial y'}=2y'\ \Longrightarrow\ 1-2y''=0` },
          { title: "Solve the resulting ODE", text: "The equation y'' = 1/2 integrates twice to a quadratic with two constants.", math: String.raw`y''=\frac{1}{2}\ \Longrightarrow\ y=\frac{x^{2}}{4}+C_1x+C_2` },
          { title: "Apply the boundary conditions", text: "The condition at 0 fixes C2, and the condition at " + a + " fixes C1, giving the extremal.", math: String.raw`C_2=0,\qquad C_1=-\frac{${a}}{4}\ \Longrightarrow\ y(x)=\frac{x^{2}-${a}x}{4}` },
          { title: "Evaluate the functional", text: "Insert y and y' = (2x - " + a + ")/4 into the integral and simplify; the result is negative.", math: String.raw`J[y]=\int_0^{${a}}\left[\left(\frac{2x-${a}}{4}\right)^{2}+\frac{x^{2}-${a}x}{4}\right]dx=-\frac{${a}^{3}}{48}=${J}` },
        ],
        answer: "The extremal function is y(x) = (x^2 - " + a + " x)/4, and the extremal value of the functional is " + J + ".",
        alternatives: [
          "The Legendre condition ∂²L/∂(y')² = 2 > 0, together with linearity of the boundary value problem, shows this extremal is the unique minimizer.",
          "Solve by shooting: choose the initial slope y'(0) so that y(" + a + ") = 0; this gives y'(0) = " + slope0 + " and the same quadratic.",
        ],
        mistakes: [
          "Swapping y and y' in the Euler-Lagrange equation and obtaining y' = 2 instead of y'' = 1/2.",
          "Dropping the factor 2 when differentiating (y')^2 with respect to y'.",
          "Applying only one boundary condition and leaving one integration constant undetermined.",
        ],
        further: "Solve the same problem when the right endpoint is free (y(" + a + ") is not prescribed), using the natural boundary condition y'(" + a + ") = 0, and compare the resulting value of J.",
      }
    },
  },

  {
    id: "m5-group-theory",
    domain: "math",
    topicId: "group-theory",
    title: "Finite groups",
    level: "Undergraduate 2",
    type: "Numerical",
    concepts: ["cyclic groups", "order of an element", "Euler totient", "subgroups"],
    build(rng: RNG, index: number) {
      const n = 12 + 2 * index + rng.int(0, 1)
      const k = rng.int(1, n - 1)
      const g = gcd(n, k)
      const ord = n / g
      const phiN = eulerPhi(n)
      const primes = distinctPrimeFactors(n)
      const target = rng.pick(divisors(n).filter(d => d > 1))
      const phiD = eulerPhi(target)
      const step = n / target
      const elems: number[] = []
      for (let m = 1; m <= target; m++) if (gcd(m, target) === 1) elems.push((step * m) % n)
      return {
        statement: "Let G be the cyclic group Z_" + n + " under addition modulo " + n + ", and let a be the residue " + k + ". (i) Find the order of a. (ii) How many generators does G have? (iii) List every element of G of order " + target + ".",
        hints: [
          "In Z_n the order of a residue k equals n / gcd(n, k).",
          "The generators are exactly the residues coprime to n, so their number is Euler's totient phi(" + n + ").",
          "An element x has order " + target + " when gcd(" + n + ", x) = " + step + "; these are x = " + step + " m with 1 <= m <= " + target + " and gcd(m, " + target + ") = 1.",
        ],
        steps: [
          { title: "Order of the chosen element", text: "Compute the greatest common divisor first, then divide the group order by it.", math: String.raw`\gcd(${n},${k})=${g},\qquad \operatorname{ord}(${k})=\frac{${n}}{${g}}=${ord}` },
          { title: "Count the generators", text: "The distinct primes dividing " + n + " are " + primes.join(", ") + "; apply the product formula for the totient.", math: String.raw`\varphi(${n})=${n}\prod_{p\mid ${n}}\left(1-\frac{1}{p}\right)=${phiN}` },
          { title: "Characterize elements of the given order", text: "Rescale by n/" + target + " so the condition becomes coprimality with " + target + ".", math: String.raw`\frac{n}{d}=\frac{${n}}{${target}}=${step},\qquad x=${step}m,\quad \gcd(m,${target})=1` },
          { title: "List those elements", text: "The admissible multipliers m produce exactly phi(" + target + ") = " + phiD + " residues.", math: String.raw`\{x\in\mathbb{Z}_{${n}}:\operatorname{ord}(x)=${target}\}=\{${elems.join(', ')}\}` },
          { title: "Consistency check", text: "Summing totients over all divisors recovers the group order, confirming the count.", math: String.raw`\sum_{e\mid ${n}}\varphi(e)=${n}` },
        ],
        answer: "The element " + k + " has order " + ord + "; the group Z_" + n + " has " + phiN + " generators; and the elements of order " + target + " are " + elems.join(", ") + " (there are " + phiD + " of them).",
        alternatives: [
          "The cyclic subgroup generated by k is 0, k, 2k, ... and its size n/gcd(n,k) is exactly the order of k.",
          "Each element of order " + target + " has the form (" + step + ")m with gcd(m, " + target + ") = 1, and counting such m gives phi(" + target + ") = " + phiD + ".",
        ],
        mistakes: [
          "Using n/k instead of n/gcd(n,k) as the order of " + k + ".",
          "Counting all n - 1 nonzero residues as generators instead of only the phi(" + n + ") = " + phiN + " coprime ones.",
          "Listing every multiple of " + step + ", including those whose multiplier shares a factor with " + target + " and hence has smaller order.",
        ],
        further: "Determine how many subgroups Z_" + n + " has and list their orders. (Hint: there is exactly one subgroup for each divisor of " + n + ".)",
      }
    },
  },

  {
    id: "m5-lie-theory",
    domain: "math",
    topicId: "lie-theory",
    title: "Lie algebras",
    level: "Undergraduate 4",
    type: "Derivation",
    concepts: ["Lie bracket", "matrix commutator", "structure constants", "sl(2)"],
    build(rng: RNG, index: number) {
      const a = 1 + 2 * index + rng.int(0, 1)
      const b = 1 + rng.int(0, 4)
      const ab = a * b
      const twoA = 2 * a
      const twoB = 2 * b
      return {
        statement: "In the Lie algebra of 2 by 2 real matrices with bracket [P, Q] = PQ - QP, define X as the matrix with first row (0, " + a + ") and second row (0, 0), Y with first row (0, 0) and second row (" + b + ", 0), and H = diag(1, -1). Compute [X, Y], [H, X] and [H, Y], and express each as a scalar multiple of X, Y or H.",
        hints: [
          "Use the definition [P, Q] = PQ - QP and multiply the matrices in the stated order.",
          "Multiplication is not commutative: XY has its nonzero entry in the top-right, while YX has its nonzero entry in the bottom-left.",
          "H is the grading element: conjugation by H multiplies X by +2 and Y by -2 in the commutator.",
        ],
        steps: [
          { title: "Write the basis matrices", text: "Record the three matrices explicitly before multiplying.", math: String.raw`X=\begin{pmatrix}0&${a}\\0&0\end{pmatrix},\quad Y=\begin{pmatrix}0&0\\${b}&0\end{pmatrix},\quad H=\begin{pmatrix}1&0\\0&-1\end{pmatrix}` },
          { title: "Compute the raw products", text: "Multiply XY and YX separately; they differ because the diagonal entries land in opposite corners.", math: String.raw`XY=\begin{pmatrix}${ab}&0\\0&0\end{pmatrix},\qquad YX=\begin{pmatrix}0&0\\0&${ab}\end{pmatrix}` },
          { title: "The bracket of X and Y", text: "Subtract and recognize the result as a multiple of H.", math: String.raw`[X,Y]=XY-YX=\begin{pmatrix}${ab}&0\\0&-${ab}\end{pmatrix}=${ab}H` },
          { title: "The brackets with H", text: "Similar computations give multiples of X and Y with opposite signs.", math: String.raw`[H,X]=\begin{pmatrix}0&${twoA}\\0&0\end{pmatrix}=2X,\qquad [H,Y]=\begin{pmatrix}0&0\\-${twoB}&0\end{pmatrix}=-2Y` },
          { title: "Closure and structure constants", text: "All three brackets stay inside the span of X, Y and H, so this span is a three-dimensional Lie algebra isomorphic to sl(2).", math: String.raw`[X,Y]=${ab}H,\quad [H,X]=2X,\quad [H,Y]=-2Y` },
        ],
        answer: "[X, Y] = " + ab + " H, [H, X] = 2X, and [H, Y] = -2Y.",
        alternatives: [
          "Multiply out PQ - QP directly and match the resulting matrix against the basis, rather than quoting standard sl(2) structure constants.",
          "Since H is diagonal with eigenvalues 1 and -1, the off-diagonal matrices X and Y are eigenvectors of ad_H with eigenvalues +2 and -2.",
        ],
        mistakes: [
          "Computing the anticommutator PQ + QP instead of the commutator PQ - QP.",
          "Assuming XY = YX and concluding that the algebra is abelian.",
          "Sign error in [H, Y], writing +2Y instead of -2Y.",
        ],
        further: "Write the 3 by 3 matrix representing ad_H in the ordered basis (X, Y, H), find its eigenvalues, and verify the Jacobi identity on the triple (H, X, Y).",
      }
    },
  },

  {
    id: "m5-differential-geometry",
    domain: "math",
    topicId: "differential-geometry",
    title: "Curves and curvature",
    level: "Graduate",
    type: "Numerical",
    concepts: ["curvature", "torsion", "space curves", "vector products"],
    build(rng: RNG, index: number) {
      const R = 1 + 2 * index + rng.int(0, 1)
      const c = 1 + rng.int(0, 5)
      const D = R * R + c * c
      return {
        statement: "Consider the circular helix given by x(t) = " + R + " cos(t), y(t) = " + R + " sin(t), z(t) = " + c + " t. Compute its curvature kappa and its torsion tau. Show all intermediate vector products.",
        hints: [
          "Compute r'(t), r''(t) and r'''(t); their squared norms are " + D + ", " + (R * R) + " and " + D + " respectively.",
          "Use kappa = |r' cross r''| / |r'|^3 and tau = ((r' cross r'') dot r''') / |r' cross r''|^2.",
          "Here |r' cross r''| = " + R + " sqrt(" + D + ") and (r' cross r'') dot r''' = " + (c * R * R) + ", so both invariants are constant.",
        ],
        steps: [
          { title: "Differentiate the parametrisation", text: "Three derivatives are needed for the Frenet formulas.", math: String.raw`\mathbf r' = (-${R}\sin t,\ ${R}\cos t,\ ${c}),\quad \mathbf r''=(-${R}\cos t,\ -${R}\sin t,\ 0),\quad \mathbf r'''=(${R}\sin t,\ -${R}\cos t,\ 0)` },
          { title: "Compute the speeds", text: "Squaring components and using sin^2 + cos^2 = 1 gives constant norms.", math: String.raw`|\mathbf r'|=\sqrt{${R}^{2}+${c}^{2}}=\sqrt{${D}},\qquad |\mathbf r''|=${R}` },
          { title: "Cross product and its norm", text: "The cross product of the first two derivatives has a horizontal rotating part and a constant vertical part.", math: String.raw`\mathbf r'\times\mathbf r''=(${c}${R}\sin t,\ -${c}${R}\cos t,\ ${R}^{2}),\qquad |\mathbf r'\times\mathbf r''|=${R}\sqrt{${D}}` },
          { title: "Curvature", text: "Divide the cross-product norm by the cube of the speed.", math: String.raw`\kappa=\frac{${R}\sqrt{${D}}}{(\sqrt{${D}})^{3}}=\frac{${R}}{${D}}=${frac(R, D)}` },
          { title: "Torsion", text: "Dot the cross product with the third derivative and divide by its squared norm.", math: String.raw`(\mathbf r'\times\mathbf r'')\cdot\mathbf r'''=${c}${R}^{2},\qquad \tau=\frac{${c}${R}^{2}}{${R}^{2}${D}}=\frac{${c}}{${D}}=${frac(c, D)}` },
        ],
        answer: "The helix has constant curvature kappa = " + frac(R, D) + " and constant torsion tau = " + frac(c, D) + ".",
        alternatives: [
          "A curve with constant curvature and torsion is congruent to a circular helix, so these two numbers determine the shape up to rigid motion.",
          "The ratio kappa/tau equals " + frac(R, c) + ", which recovers the pitch ratio " + R + "/" + c + " of the helix.",
        ],
        mistakes: [
          "Using |r'|^2 rather than |r'|^3 in the denominator of the curvature formula.",
          "Omitting the absolute value in the torsion numerator so that the sign appears to depend on t.",
          "Interchanging R and c in the numerators of kappa and tau.",
        ],
        further: "Show that kappa/(kappa^2 + tau^2) equals " + R + " and interpret this quantity geometrically in terms of the cylinder on which the helix lies.",
      }
    },
  },

  {
    id: "m5-topology",
    domain: "math",
    topicId: "topology",
    title: "Counting topological invariants",
    level: "Undergraduate 4",
    type: "Theoretical",
    concepts: ["Euler characteristic", "genus", "Betti numbers", "CW decomposition"],
    build(rng: RNG, index: number) {
      const g = 1 + 2 * index + rng.int(0, 1)
      const V = 1
      const E = 2 * g
      const F = 1
      const chi = V - E + F
      const b1 = 2 * g
      return {
        statement: "A closed orientable surface of genus g admits a CW decomposition with one 0-cell, 2g 1-cells and one 2-cell, coming from a 4g-gon whose opposite sides are identified. Take g = " + g + ". Compute the Euler characteristic, recover the genus from it, and determine the Betti numbers b0, b1 and b2.",
        hints: [
          "The Euler characteristic is the alternating cell count chi = V - E + F.",
          "For a closed orientable surface chi = 2 - 2g, so g = (2 - chi)/2.",
          "Poincare duality gives b0 = b2 = 1 for a connected orientable closed surface, and chi = b0 - b1 + b2 forces b1 = 2g.",
        ],
        steps: [
          { title: "Count the cells", text: "The standard polygon decomposition uses one vertex, 2g edges after identification, and one face.", math: String.raw`V=1,\qquad E=2g=${E},\qquad F=1` },
          { title: "Compute the Euler characteristic", text: "Insert the cell counts into the alternating sum and compare with the general formula.", math: String.raw`\chi=V-E+F=${V}-${E}+${F}=${chi}=2-2(${g})` },
          { title: "Recover the genus", text: "Invert the orientable formula chi = 2 - 2g.", math: String.raw`g=\frac{2-\chi}{2}=\frac{2-(${chi})}{2}=${g}` },
          { title: "Determine the Betti numbers", text: "Connectivity and orientability fix the outer Betti numbers; the middle one fills the gap.", math: String.raw`b_0=1,\quad b_1=2g=${b1},\quad b_2=1,\qquad b_0-b_1+b_2=${chi}` },
          { title: "Identify the homology", text: "The first homology group is a free abelian group of rank 2g, and cohomology has the same rank.", math: String.raw`H_1(\Sigma_{${g}};\mathbb{Z})\cong\mathbb{Z}^{${b1}},\qquad H^{1}\cong\mathbb{Z}^{${b1}}` },
        ],
        answer: "For genus " + g + " the Euler characteristic is chi = " + chi + ", the genus is " + g + ", and the Betti numbers are b0 = 1, b1 = " + b1 + ", b2 = 1.",
        alternatives: [
          "The Euler characteristic is a homeomorphism invariant, so any triangulation of the surface must give the same chi as the cell decomposition.",
          "Using the connected sum decomposition as g tori and chi(M # N) = chi(M) + chi(N) - 2 also yields chi = 2 - 2g.",
        ],
        mistakes: [
          "Counting the 4g un-identified polygon edges instead of the 2g edges obtained after side pairing.",
          "Using the nonorientable formula chi = 2 - g for an orientable surface.",
          "Claiming b1 = g instead of b1 = 2g for a genus-g surface.",
        ],
        further: "Compute the Euler characteristic and the rational first Betti number for the connected sum of " + g + " real projective planes, and explain how dropping orientability changes the answers.",
      }
    },
  },

  {
    id: "m5-functional-analysis",
    domain: "math",
    topicId: "functional-analysis",
    title: "Operator norms",
    level: "Graduate",
    type: "Derivation",
    concepts: ["operator norm", "singular values", "symmetric operators", "determinant"],
    build(rng: RNG, index: number) {
      const m = 2 + index
      const legA = m * m - 1
      const legB = 2 * m
      const swap = rng.bool()
      const p = swap ? legB : legA
      const q = swap ? legA : legB
      const N = m * m + 1
      const N2 = N * N
      return {
        statement: "Let T be the linear operator on R^2 with the Euclidean norm represented by the symmetric matrix A whose first row is (" + p + ", " + q + ") and second row is (" + q + ", -" + p + "). Compute the operator norm ||T|| and the eigenvalues of A, and verify that ||T||^2 = -det(A).",
        hints: [
          "For a real matrix the Euclidean operator norm is the largest singular value, the square root of the largest eigenvalue of A^T A.",
          "Because A is symmetric, A^T A = A^2; compute this square explicitly.",
          "Here A^2 = (p^2 + q^2) I = " + N2 + " I, so both singular values equal " + N + ".",
        ],
        steps: [
          { title: "Write the matrix and its squared length", text: "The chosen entries satisfy a Pythagorean identity.", math: String.raw`A=\begin{pmatrix}${p}&${q}\\${q}&-${p}\end{pmatrix},\qquad p^{2}+q^{2}=${p}^{2}+${q}^{2}=${N2}=${N}^{2}` },
          { title: "Square the matrix", text: "Off-diagonal terms cancel and the diagonal entries coincide.", math: String.raw`A^{2}=\begin{pmatrix}${p}^{2}+${q}^{2}&0\\0&${p}^{2}+${q}^{2}\end{pmatrix}=${N2}I` },
          { title: "Read off the operator norm", text: "The eigenvalues of A^T A are both " + N2 + ", so the largest singular value is " + N + ".", math: String.raw`\|T\|=\sqrt{\lambda_{\max}(A^{T}A)}=${N}` },
          { title: "Find the eigenvalues of A", text: "The trace is zero and the determinant is -" + N2 + ", so the characteristic polynomial is lambda^2 - " + N2 + ".", math: String.raw`\lambda^{2}-${N2}=0\ \Longrightarrow\ \lambda=\pm ${N}` },
          { title: "Verify the determinant identity", text: "Squaring the norm reproduces minus the determinant.", math: String.raw`\det A=-${p}^{2}-${q}^{2}=-${N2}\ \Longrightarrow\ \|T\|^{2}=${N2}=-\det A` },
        ],
        answer: "The operator norm is ||T|| = " + N + ", the eigenvalues are +" + N + " and -" + N + ", and ||T||^2 = " + N2 + " = -det(A).",
        alternatives: [
          "For a symmetric matrix the singular values are the absolute values of the eigenvalues, so ||T|| is simply max |lambda| = " + N + ".",
          "Since A^2 = " + N2 + " I, the rescaled matrix A/" + N + " is symmetric and squares to the identity, hence is an orthogonal reflection and ||T|| = " + N + ".",
        ],
        mistakes: [
          "Using the Frobenius norm sqrt(" + (2 * N2) + ") instead of the operator norm " + N + ".",
          "Assuming the operator norm equals the trace, which is zero for this matrix.",
          "Forgetting the minus sign and writing det(A) = p^2 + q^2 = " + N2 + ".",
        ],
        further: "For a general non-symmetric 2 by 2 matrix, compute the operator norm from the eigenvalues of A^T A and explain why it need not equal the largest absolute eigenvalue of A.",
      }
    },
  },

  {
    id: "m5-measure-theory",
    domain: "math",
    topicId: "measure-theory",
    title: "Measure and integration",
    level: "Undergraduate 3",
    type: "Numerical",
    concepts: ["Lebesgue measure", "simple functions", "Lebesgue integral", "level sets"],
    build(rng: RNG, index: number) {
      const p = 2 + 2 * index + rng.int(0, 1)
      const q = p + rng.int(2, 5)
      const r = q + rng.int(2, 5)
      let c1 = rng.int(0, 5)
      let c2 = rng.int(0, 5)
      let c3 = rng.int(0, 5)
      if (c1 < 2 && c2 < 2 && c3 < 2) c2 = 2
      const len1 = p
      const len2 = q - p
      const len3 = r - q
      const integral = c1 * len1 + c2 * len2 + c3 * len3
      const m2 = (c1 >= 2 ? len1 : 0) + (c2 >= 2 ? len2 : 0) + (c3 >= 2 ? len3 : 0)
      return {
        statement: "Define f on [0, " + r + "] by f(x) = " + c1 + " on [0, " + p + "], f(x) = " + c2 + " on (" + p + ", " + q + "], and f(x) = " + c3 + " on (" + q + ", " + r + "]. Compute the Lebesgue integral of f over [0, " + r + "] and the Lebesgue measure of the set where f(x) >= 2.",
        hints: [
          "A simple function integrates as the sum over level sets of (value) times (measure of the level set).",
          "The three intervals have lengths " + len1 + ", " + len2 + " and " + len3 + ".",
          "Multiply each height by its interval length and add; for {f >= 2}, include only the intervals whose height is at least 2.",
        ],
        steps: [
          { title: "Identify the level sets", text: "The function is constant on three disjoint intervals whose union is the whole domain.", math: String.raw`A_1=[0,${p}],\quad A_2=(${p},${q}],\quad A_3=(${q},${r}]` },
          { title: "Find the measures", text: "Lebesgue measure of an interval is its length, and endpoints do not matter.", math: String.raw`\lambda(A_1)=${len1},\quad \lambda(A_2)=${q}-${p}=${len2},\quad \lambda(A_3)=${r}-${q}=${len3}` },
          { title: "Integrate the simple function", text: "Linearity of the integral turns this into a weighted sum.", math: String.raw`\int_{0}^{${r}} f\,d\lambda=${c1}\cdot ${len1}+${c2}\cdot ${len2}+${c3}\cdot ${len3}=${integral}` },
          { title: "Measure the superlevel set", text: "Collect exactly those pieces whose height reaches the threshold 2.", math: String.raw`\{f\ge 2\}=\bigcup_{c_i\ge 2}A_i,\qquad \lambda(\{f\ge 2\})=${m2}` },
          { title: "Check the total measure", text: "The three lengths add back to the length of the whole interval.", math: String.raw`\lambda([0,${r}])=${len1}+${len2}+${len3}=${r}` },
        ],
        answer: "The Lebesgue integral of f over [0, " + r + "] is " + integral + ", and the measure of the set where f >= 2 is " + m2 + ".",
        alternatives: [
          "Write f as " + c1 + " times the indicator of A1 plus " + c2 + " times the indicator of A2 plus " + c3 + " times the indicator of A3 and integrate term by term.",
          "Use the layer-cake representation, integrating the distribution function of f over all thresholds.",
        ],
        mistakes: [
          "Using the right endpoints " + q + " and " + r + " as lengths instead of the true lengths " + len2 + " and " + len3 + ".",
          "Counting shared endpoints twice; Lebesgue measure ignores finitely many points.",
          "Adding all three intervals to the superlevel set regardless of their heights.",
        ],
        further: "Compute the Lebesgue integral of g(x) = x over [0, " + r + "], and explain why it agrees with the Riemann integral for this continuous integrand.",
      }
    },
  },

  {
    id: "m5-distributions",
    domain: "math",
    topicId: "distributions",
    title: "Dirac delta identities",
    level: "Graduate",
    type: "Theoretical",
    concepts: ["Dirac delta", "sifting property", "delta of a function", "distributional identities"],
    build(rng: RNG, index: number) {
      const a = 1 + 2 * index + rng.int(0, 1)
      const b = rng.int(1, 5)
      const c = rng.int(1, 6)
      const fA = a * a + b * a + c
      const i2 = frac(a * a + c, a)
      const i3 = frac(a * a + 2 * a * b + 4 * c, 8)
      return {
        statement: "Let f(x) = x^2 + " + b + " x + " + c + ". Using Dirac delta identities, evaluate I1 = integral over all real x of f(x) delta(x - " + a + ") dx, I2 = integral of f(x) delta(x^2 - " + (a * a) + ") dx, and I3 = integral of f(x) delta(2x - " + a + ") dx.",
        hints: [
          "Use the sifting property: the integral of f(x) delta(x - x0) over the reals equals f(x0).",
          "For delta(g(x)), sum f(x_i)/|g'(x_i)| over all simple roots x_i of g.",
          "For g(x) = x^2 - " + (a * a) + " the roots are +" + a + " and -" + a + " with |g'| = " + (2 * a) + "; for g(x) = 2x - " + a + " the single root is " + a + "/2 with |g'| = 2.",
        ],
        steps: [
          { title: "Delta at a single point", text: "Apply the sifting property directly at x = " + a + ".", math: String.raw`I_1=f(${a})=${a}^{2}+${b}\cdot ${a}+${c}=${fA}` },
          { title: "Roots and derivatives", text: "The quadratic has two simple zeros, and the absolute derivative is the same at each.", math: String.raw`g(x)=x^{2}-${a*a}:\quad x=\pm ${a},\qquad |g'(x)|=2|x|=2${a}` },
          { title: "Delta of a quadratic", text: "The linear terms in b cancel between the two roots, leaving a clean fraction.", math: String.raw`I_2=\frac{f(${a})+f(-${a})}{2${a}}=\frac{(${a*a}+${b*a}+${c})+(${a*a}-${b*a}+${c})}{2${a}}=\frac{${a*a}+${c}}{${a}}=${i2}` },
          { title: "Scaling the argument", text: "Use delta(2x - a) = (1/2) delta(x - a/2) and sift at a/2.", math: String.raw`\delta(2x-${a})=\frac{1}{2}\delta\!\left(x-\frac{${a}}{2}\right)\ \Longrightarrow\ I_3=\frac{f(${a}/2)}{2}=\frac{${a*a}+2\cdot ${a}\cdot ${b}+4\cdot ${c}}{8}=${i3}` },
          { title: "Summary", text: "Collect the three computed values.", math: String.raw`I_1=${fA},\qquad I_2=${i2},\qquad I_3=${i3}` },
        ],
        answer: "I1 = " + fA + ", I2 = " + i2 + ", and I3 = " + i3 + ".",
        alternatives: [
          "Use the change-of-variables rule delta(h(x)) = delta(x - x0)/|h'(x0)| at each simple zero of h.",
          "Expand delta(x^2 - " + (a * a) + ") as (delta(x - " + a + ") + delta(x + " + a + "))/(" + (2 * a) + ") and sift twice.",
        ],
        mistakes: [
          "Keeping only the positive root when integrating against delta(x^2 - " + (a * a) + ").",
          "Forgetting the factor 1/|g'| and missing the denominator " + (2 * a) + ".",
          "Treating delta(2x - " + a + ") as delta(x - " + a + ") and losing the factor 1/2.",
        ],
        further: "Compute the integral over the reals of f(x) exp(-x) delta(x^2 - " + (a * a) + ") dx and simplify your answer using cosh(" + a + ") and sinh(" + a + ").",
      }
    },
  },

  {
    id: "m5-complex-numbers",
    domain: "math",
    topicId: "complex-numbers",
    title: "De Moivre and roots of unity",
    level: "Undergraduate 2",
    type: "Numerical",
    concepts: ["De Moivre theorem", "polar form", "roots of unity", "complex powers"],
    build(rng: RNG, index: number) {
      const t = 1 + rng.int(0, 4)
      const n = rng.int(2, 4)
      const r = 2 + index
      const deg = 30 * t
      const rawAngle = n * deg
      const total = ((rawAngle % 360) + 360) % 360
      const rN = r ** n
      const cosPair = COS_SURD[total]
      const sinPair = SIN_SURD[total]
      const reN = rN * cosPair[0]
      const reS = rN * cosPair[1]
      const imN = rN * sinPair[0]
      const imS = rN * sinPair[1]
      const rectangle = formatComplex(reN, reS, imN, imS)
      return {
        statement: "Let z = r(cos(theta) + i sin(theta)) with modulus r = " + r + " and argument theta = " + deg + " degrees. Use De Moivre's theorem to compute z^" + n + ". Give the exact rectangular form a + b i, and state the modulus and argument of the result.",
        hints: [
          "De Moivre says (cos(theta) + i sin(theta))^n = cos(n theta) + i sin(n theta).",
          "The modulus is r^n = " + rN + " and the raw argument is " + rawAngle + " degrees, which reduces to " + total + " degrees.",
          "At " + total + " degrees the exact sine and cosine are among 0, plus or minus 1/2, plus or minus 1 and plus or minus sqrt(3)/2.",
        ],
        steps: [
          { title: "Write z in polar form", text: "Insert the given modulus and argument.", math: String.raw`z=${r}\left(\cos ${deg}^{\circ}+i\sin ${deg}^{\circ}\right)` },
          { title: "Apply De Moivre", text: "Raise the modulus to the power n and multiply the angle by n.", math: String.raw`z^{${n}}=${r}^{${n}}\left(\cos ${rawAngle}^{\circ}+i\sin ${rawAngle}^{\circ}\right)` },
          { title: "Reduce the angle", text: "Subtract full turns to land in the range 0 to 360 degrees.", math: String.raw`${rawAngle}^{\circ}\equiv ${total}^{\circ}\pmod{360^{\circ}}` },
          { title: "Insert exact trigonometric values", text: "Use the standard exact values at " + total + " degrees.", math: String.raw`z^{${n}}=${rN}\left(${COS_TEX[total]}+i\,${SIN_TEX[total]}\right)` },
          { title: "Simplify and read off the geometry", text: "Hence z^" + n + " = " + rectangle + ", with modulus " + rN + " and argument " + total + " degrees.", math: String.raw`|z^{${n}}|=${rN},\qquad \arg\left(z^{${n}}\right)=${total}^{\circ}` },
        ],
        answer: "z^" + n + " = " + rectangle + "; its modulus is " + rN + " and its argument is " + total + " degrees.",
        alternatives: [
          "Convert z to rectangular form first and expand the power by repeated multiplication as an independent check.",
          "Use Euler's formula z^n = r^n exp(i n theta) and read off the modulus and argument directly before converting back.",
        ],
        mistakes: [
          "Forgetting to raise the modulus r to the n-th power and keeping only the angular part.",
          "Using n theta without reducing modulo 360 degrees before looking up sine and cosine.",
          "Losing the sign of the sine or cosine in the quadrant containing " + total + " degrees.",
        ],
        further: "Describe all solutions of w^" + n + " = z^" + n + " as z multiplied by an " + n + "-th root of unity, and compute them explicitly for k = 0 through " + (n - 1) + ".",
      }
    },
  },
]

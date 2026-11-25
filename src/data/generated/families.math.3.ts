import type { GeneratedFamily } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// MATHEMATICS FAMILIES, SET 3 (m3- prefix).
// Ten deterministic generators for upper-undergraduate topics. Every number
// that appears in a statement, hint, step or answer is computed in code, so a
// fixed (rng seed, index) pair always reproduces the same fully solvable task.
// ─────────────────────────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b !== 0) {
    const t = a % b
    a = b
    b = t
  }
  return a || 1
}

function reduceFraction(num: number, den: number): [number, number] {
  const g = gcd(num, den)
  return [num / g, den / g]
}

function parallel(a: readonly number[], b: readonly number[]): boolean {
  return a[1] * b[2] - a[2] * b[1] === 0
    && a[2] * b[0] - a[0] * b[2] === 0
    && a[0] * b[1] - a[1] * b[0] === 0
}

// Integer vectors in R^3 whose squared norm is a perfect square.
const NICE_3D: readonly [number, number, number][] = [
  [1, 2, 2], [2, 3, 6], [2, 1, 2], [3, 2, 6],
  [6, 3, 2], [4, 4, 2], [1, 4, 8], [8, 4, 1],
  [2, 2, 1], [6, 2, 3], [2, 6, 3], [3, 6, 2],
]

export const MATH_FAMILIES_3: GeneratedFamily[] = [

  // ── 1. Vector integral theorems (Green's theorem on a rectangle) ──────────
  {
    id: 'm3-vector-integral-theorems',
    domain: 'math',
    topicId: 'integral-theorems',
    title: 'Vector integral theorems',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ["Green's theorem", 'line integrals', 'double integrals', 'positive orientation', 'curl in the plane'],
    build(rng, index) {
      const m = 1 + rng.int(0, 2)
      const n = m + 1 + index
      const a = 2 + rng.int(0, 2)
      const b = 2 + rng.int(0, 2)
      const diff = n - m
      const answer = diff * a * a * b * b / 2

      return {
        statement: "Let C be the positively oriented (counterclockwise) boundary of the rectangle R = [0, " + a + "] x [0, " + b + "]. Define P(x, y) = " + m + " x y^2 and Q(x, y) = " + n + " x^2 y. Use Green's theorem to evaluate the line integral of P dx + Q dy around C.",
        hints: [
          "Green's theorem turns the line integral into a double integral of (dQ/dx - dP/dy) over the rectangle.",
          "Both partial derivatives are constant multiples of x y, so the integrand factors as a constant times x y.",
          "The double integral separates into a product of two single-variable integrals over [0, " + a + "] and [0, " + b + "].",
        ],
        steps: [
          {
            title: "Apply Green's theorem",
            text: "For a positively oriented simple closed curve bounding R, the circulation equals the flux of the planar curl through R.",
            math: String.raw`\oint_C (P\,dx+Q\,dy)=\iint_R\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA`,
          },
          {
            title: "Compute the two partial derivatives",
            text: "Differentiate Q with respect to x and P with respect to y, then subtract.",
            math: String.raw`\frac{\partial Q}{\partial x}=2${n}xy,\qquad \frac{\partial P}{\partial y}=2${m}xy,\qquad \frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}=2(${diff})xy=${2 * diff}xy`,
          },
          {
            title: "Set up the iterated integral",
            text: "Over the rectangle the integrand factors, so the bounds are independent.",
            math: String.raw`\iint_R 2(${diff})xy\,dA=\int_0^{${a}}\int_0^{${b}}2(${diff})xy\,dy\,dx`,
          },
          {
            title: "Integrate with respect to y",
            text: "Treating x as constant, the inner integral contributes a factor b squared over two.",
            math: String.raw`\int_0^{${b}}2(${diff})xy\,dy=(${diff})x${b}^2`,
          },
          {
            title: "Integrate with respect to x",
            text: "The remaining one-variable integral gives the circulation.",
            math: String.raw`\int_0^{${a}}(${diff})${b}^2x\,dx=(${diff})${b}^2\frac{${a}^2}{2}=${answer}`,
          },
          {
            title: "Check the orientation",
            text: "Reversing the traversal direction negates the result, which is why the hypothesis matters.",
            math: String.raw`\oint_{C_{\rm cw}}(P\,dx+Q\,dy)=-${answer}`,
          },
        ],
        answer: String.raw`\oint_C(P\,dx+Q\,dy)=${answer}`,
        alternatives: [
          "Parametrize the four edges separately and add the four line integrals; each edge is a short polynomial integral.",
          "Use linearity: split the field into its P and Q parts and note that the area contribution is the difference of the two curl terms.",
        ],
        mistakes: [
          "Forgetting that Green's theorem assumes counterclockwise orientation; a clockwise traversal flips the sign.",
          "Dropping the factor 2 when differentiating x^2 y or x y^2.",
          "Integrating over the rectangle but using dA = dx only instead of dx dy.",
        ],
        further: "Replace the rectangle by a disk of radius R centered at the origin. Would the same double-integral method work, and how would the bounds change in polar coordinates?",
      }
    },
  },

  // ── 2. Separable differential equations (exponential growth) ──────────────
  {
    id: 'm3-separable-differential-equations',
    domain: 'math',
    topicId: 'differential-equations',
    title: 'Separable differential equations',
    level: 'Undergraduate 2',
    type: 'Derivation',
    concepts: ['separation of variables', 'exponential growth', 'doubling time', 'initial value problem'],
    build(rng, index) {
      const y0 = 2 + rng.int(0, 8)
      const D = 2 + rng.int(0, 3)
      const q = 2 + rng.int(0, 2)
      const r = 1 + index
      const value = y0 * Math.pow(2, q)
      const finalTime = r * D

      return {
        statement: "A population satisfies the differential equation dy/dt = k y with y(0) = " + y0 + ". Its doubling time is " + D + " time units, meaning y(" + D + ") = " + (2 * y0) + ". (a) Find the constant k. (b) Find y(" + (q * D) + "). (c) How long until the population reaches " + Math.pow(2, r) + " times its initial value?",
        hints: [
          "The equation dy/dt = k y is separable: divide by y and integrate both sides.",
          "The doubling time means e^(k D) = 2, so k = ln(2)/D.",
          "At t = q D the exponent is q ln 2, so y(q D) = y0 2^q; for a factor 2^r use t = r D.",
        ],
        steps: [
          {
            title: "Separate the variables",
            text: "Move all y dependence to one side and t dependence to the other.",
            math: String.raw`\frac{dy}{y}=k\,dt`,
          },
          {
            title: "Integrate both sides",
            text: "The integral of 1/y is ln|y|, and the initial condition fixes the constant.",
            math: String.raw`\ln|y|=kt+C\quad\Rightarrow\quad y=y_0e^{kt},\qquad y_0=${y0}`,
          },
          {
            title: "Use the doubling time",
            text: "Requiring y(D) = 2 y0 determines the growth rate.",
            math: String.raw`e^{k${D}}=2\quad\Rightarrow\quad k=\frac{\ln 2}{${D}}`,
          },
          {
            title: "Evaluate at t = q D",
            text: "The exponent k q D simplifies to q ln 2, giving an exact power of two.",
            math: String.raw`y(${q * D})=y_0e^{k${q * D}}=${y0}\cdot 2^{${q}}=${value}`,
          },
          {
            title: "Time to reach a given multiple",
            text: "Set the exponential equal to 2^r times the initial value and solve for t.",
            math: String.raw`e^{kt}=2^{${r}}\quad\Rightarrow\quad kt=${r}\ln 2\quad\Rightarrow\quad t=${r}${D}=${finalTime}`,
          },
        ],
        answer: String.raw`k=\frac{\ln 2}{${D}},\qquad y(${q * D})=${value},\qquad t=${finalTime}`,
        alternatives: [
          "Solve directly with the growth law y = y0 2^(t/D), which skips the explicit separation step.",
          "Rescale time by setting s = t/D; the equation becomes dy/ds = (ln 2) y and the answers follow in units of D.",
        ],
        mistakes: [
          "Treating k as the doubling time itself rather than ln(2)/D.",
          "Writing y(q D) = y0 + q k D instead of y0 e^(k q D).",
          "Confusing the time to reach 2^r y0 with r divided by D instead of r times D.",
        ],
        further: "If the law were dy/dt = k y (M - y) with carrying capacity M, explain why separation still works and how the long-time behavior differs from unbounded growth.",
      }
    },
  },

  // ── 3. Second-order linear ODEs (distinct real roots) ──────────────────────
  {
    id: 'm3-second-order-linear-odes',
    domain: 'math',
    topicId: 'differential-equations',
    title: 'Second-order linear ODEs',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['characteristic equation', 'distinct real roots', 'general solution', 'initial conditions'],
    build(rng, index) {
      const r1 = 1 + rng.int(0, 3)
      const r2 = -(1 + rng.int(0, 3))
      const p = -(r1 + r2)
      const q = r1 * r2
      const c1 = 1 + rng.int(0, 3)
      const c2 = 1 + index
      const A0 = c1 + c2
      const B0 = r1 * c1 + r2 * c2
      const denom = r1 - r2

      return {
        statement: "Solve the initial-value problem y'' " + (p >= 0 ? "+ " : "- ") + Math.abs(p) + " y' " + (q >= 0 ? "+ " : "- ") + Math.abs(q) + " y = 0, with y(0) = " + A0 + " and y'(0) = " + B0 + ". Give the particular solution in closed form.",
        hints: [
          "Write down the characteristic equation r^2 + p r + q = 0 and factor it.",
          "With two distinct real roots r1 and r2 the general solution is C1 e^(r1 x) + C2 e^(r2 x).",
          "Impose y(0) = A0 and y'(0) = B0 to get C1 + C2 = A0 and r1 C1 + r2 C2 = B0.",
        ],
        steps: [
          {
            title: "Form the characteristic equation",
            text: "Substitute y = e^(r x) into the homogeneous constant-coefficient equation.",
            math: String.raw`r^2 ${p >= 0 ? '+' : '-'} ${Math.abs(p)}r ${q >= 0 ? '+' : '-'} ${Math.abs(q)}=0`,
          },
          {
            title: "Factor to find the roots",
            text: "The polynomial splits into two distinct linear factors.",
            math: String.raw`(r-${r1})(r-${r2})=0\quad\Rightarrow\quad r_1=${r1},\ r_2=${r2}`,
          },
          {
            title: "Write the general solution",
            text: "Distinct real roots give two independent exponential solutions.",
            math: String.raw`y=C_1e^{${r1}x}+C_2e^{${r2}x}`,
          },
          {
            title: "Impose the initial conditions",
            text: "Evaluate y and y' at x = 0 to obtain two linear equations.",
            math: String.raw`C_1+C_2=${A0},\qquad ${r1}C_1+(${r2})C_2=${B0}`,
          },
          {
            title: "Solve for the constants",
            text: "Eliminate one constant using the difference of the roots, which is nonzero.",
            math: String.raw`C_1=\frac{${B0}-(${r2})(${A0})}{${denom}}=${c1},\qquad C_2=\frac{${r1}(${A0})-${B0}}{${denom}}=${c2}`,
          },
          {
            title: "State the particular solution",
            text: "Insert the constants back into the general solution.",
            math: String.raw`y=${c1}e^{${r1}x}+${c2}e^{${r2}x}`,
          },
        ],
        answer: String.raw`y=${c1}e^{${r1}x}+${c2}e^{${r2}x}`,
        alternatives: [
          "Use the operator factorization (D - r1)(D - r2) y = 0, with D = d/dx, to read off the same general solution.",
          "Substitute the final expression back into the ODE and both initial conditions as an independent verification.",
        ],
        mistakes: [
          "Using r^2 - p r + q = 0 instead of r^2 + p r + q = 0 for y'' + p y' + q y = 0.",
          "Forgetting to differentiate the exponentials when imposing y'(0) = B0.",
          "Treating the negative root as its absolute value; the root is r2 itself, including its sign.",
        ],
        further: "What happens to the solution form if the characteristic equation has a repeated root r1 = r2 = r? Derive the second linearly independent solution using reduction of order.",
      }
    },
  },

  // ── 4. Vector spaces (a plane through the origin as a subspace) ────────────
  {
    id: 'm3-vector-spaces',
    domain: 'math',
    topicId: 'vectors-vector-spaces',
    title: 'Vector spaces',
    level: 'Undergraduate 1',
    type: 'Proof',
    concepts: ['subspace', 'closure axioms', 'spanning set', 'linear independence', 'dimension'],
    build(rng, index) {
      const a = 1 + rng.int(0, 3)
      const b = 1 + index
      const c = 1 + rng.int(0, 3)

      return {
        statement: "Let S = {(x, y, z) in R^3 : " + a + " x + " + b + " y + " + c + " z = 0}. (a) Prove that S is a subspace of R^3. (b) Find a basis for S and state its dimension.",
        hints: [
          "The defining equation is homogeneous and linear, so check the zero vector and the two closure properties.",
          "Pair off coefficients: the vectors (b, -a, 0) and (c, 0, -a) both satisfy the equation.",
          "Test independence using the second and third coordinates, which force the scalar multiples to vanish because a is nonzero.",
        ],
        steps: [
          {
            title: "The zero vector belongs to S",
            text: "Substituting the origin satisfies the homogeneous equation.",
            math: String.raw`${a}(0)+${b}(0)+${c}(0)=0\quad\Rightarrow\quad \mathbf 0\in S`,
          },
          {
            title: "Closure under addition",
            text: "Add two solutions and use linearity of the defining equation.",
            math: String.raw`${a}(u_1+v_1)+${b}(u_2+v_2)+${c}(u_3+v_3)=0+0=0`,
          },
          {
            title: "Closure under scalar multiplication",
            text: "Scale a solution and the defining equation scales with it.",
            math: String.raw`${a}(\lambda u_1)+${b}(\lambda u_2)+${c}(\lambda u_3)=\lambda(${a}u_1+${b}u_2+${c}u_3)=0`,
          },
          {
            title: "Exhibit a spanning pair",
            text: "Construct two vectors that each satisfy the constraint by cancelling coefficient pairs.",
            math: String.raw`\mathbf v_1=(${b},-${a},0),\quad \mathbf v_2=(${c},0,-${a}),\quad \mathbf v_1,\mathbf v_2\in S`,
          },
          {
            title: "Every vector in S is a combination",
            text: "Use the constraint to replace x by -(b y + c z)/a and match coefficients.",
            math: String.raw`(x,y,z)=\left(-\frac{y}{${a}}\right)\mathbf v_1+\left(-\frac{z}{${a}}\right)\mathbf v_2`,
          },
          {
            title: "Independence and dimension",
            text: "The second and third coordinates force both coefficients to vanish, so the pair is a basis.",
            math: String.raw`\alpha\mathbf v_1+\beta\mathbf v_2=\mathbf 0\ \Rightarrow\ -${a}\alpha=0,\ -${a}\beta=0\ \Rightarrow\ \alpha=\beta=0,\quad \dim S=2`,
          },
        ],
        answer: String.raw`S=\operatorname{span}\left\{(${b},-${a},0),\ (${c},0,-${a})\right\},\qquad \dim S=2`,
        alternatives: [
          "Apply rank-nullity: one nonzero linear constraint on R^3 gives a null space of dimension 3 - 1 = 2.",
          "Describe S geometrically as the plane through the origin with normal vector (" + a + ", " + b + ", " + c + ").",
        ],
        mistakes: [
          "Checking closure under addition but forgetting scalar multiplication or the zero vector.",
          "Choosing spanning vectors that do not actually satisfy the defining equation.",
          "Claiming the dimension is 3 simply because S is a subset of R^3.",
        ],
        further: "If the right-hand side were a nonzero constant instead of 0, would the set still be a subspace? Explain exactly which closure property fails first.",
      }
    },
  },

  // ── 5. Matrix algebra (determinant and inverse of a 2x2 matrix) ────────────
  {
    id: 'm3-matrix-algebra',
    domain: 'math',
    topicId: 'matrices-determinants',
    title: 'Matrix algebra',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['determinant', 'invertibility', 'adjugate', 'matrix inverse', 'trace'],
    build(rng, index) {
      const a = 1 + rng.int(0, 4)
      const b = 1 + rng.int(0, 4)
      const c = 1 + index
      let d = 1 + rng.int(0, 4)
      while (a * d - b * c === 0) d += 1
      const det = a * d - b * c
      const trace = a + d

      return {
        statement: "Let A be the 2 by 2 matrix with first row (" + a + ", " + b + ") and second row (" + c + ", " + d + "). (a) Compute det(A) and tr(A). (b) Determine whether A is invertible. (c) If it is, find A inverse explicitly.",
        hints: [
          "For a 2 by 2 matrix the determinant is a d - b c; a nonzero value guarantees invertibility.",
          "Swap the diagonal entries, negate the off-diagonal entries, then divide every entry by the determinant.",
          "Multiply A by your inverse and confirm the product is the identity matrix.",
        ],
        steps: [
          {
            title: "Write the matrix",
            text: "Record the entries before computing any invariants.",
            math: String.raw`A=\begin{pmatrix}${a}&${b}\\${c}&${d}\end{pmatrix}`,
          },
          {
            title: "Compute the determinant",
            text: "Subtract the product of the off-diagonal entries from the product of the diagonal entries.",
            math: String.raw`\det A=${a}(${d})-(${b})(${c})=${det}`,
          },
          {
            title: "Check invertibility",
            text: "The determinant is nonzero, so the inverse exists.",
            math: String.raw`\det A=${det}\neq 0\quad\Rightarrow\quad A\ \text{is invertible}`,
          },
          {
            title: "Form the adjugate",
            text: "Swap the diagonal and negate the off-diagonal entries.",
            math: String.raw`\operatorname{adj}(A)=\begin{pmatrix}${d}&${-b}\\${-c}&${a}\end{pmatrix}`,
          },
          {
            title: "Divide by the determinant",
            text: "The inverse is the adjugate scaled by the reciprocal of the determinant.",
            math: String.raw`A^{-1}=\frac{1}{${det}}\begin{pmatrix}${d}&${-b}\\${-c}&${a}\end{pmatrix},\qquad \operatorname{tr}(A)=${trace}`,
          },
        ],
        answer: String.raw`\det A=${det},\qquad \operatorname{tr}A=${trace},\qquad A^{-1}=\frac{1}{${det}}\begin{pmatrix}${d}&${-b}\\${-c}&${a}\end{pmatrix}`,
        alternatives: [
          "Solve the two systems A x = e1 and A x = e2 simultaneously; the solutions form the columns of the inverse.",
          "Check the result by direct multiplication A A^{-1} = I rather than relying only on the formula.",
        ],
        mistakes: [
          "Forgetting to divide the adjugate by the determinant.",
          "Computing the determinant as a d + b c instead of a d - b c.",
          "Assuming every 2 by 2 matrix is invertible without checking the determinant.",
        ],
        further: "What does a zero determinant mean geometrically for the map with matrix A, and how is that related to the area of the image of the unit square?",
      }
    },
  },

  // ── 6. Eigenvalues and eigenvectors (upper triangular 2x2 matrix) ─────────
  {
    id: 'm3-eigenvalues-eigenvectors',
    domain: 'math',
    topicId: 'eigenvalues-eigenvectors',
    title: 'Eigenvalues and eigenvectors',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['characteristic polynomial', 'eigenvalue', 'eigenvector', 'diagonalization', 'trace invariant'],
    build(rng, index) {
      const a = 1 + rng.int(0, 3)
      const d = a + 1 + index
      const b = 1 + rng.int(0, 3)
      const gap = d - a
      const trace = a + d
      const det = a * d

      return {
        statement: "Let A be the upper triangular matrix with first row (" + a + ", " + b + ") and second row (0, " + d + "). (a) Find the eigenvalues. (b) Find an eigenvector for each eigenvalue. (c) Write a diagonalization A = P D P inverse using your eigenvectors.",
        hints: [
          "A triangular matrix has its eigenvalues on the diagonal.",
          "For lambda = a solve (A - a I)v = 0; for lambda = d solve (A - d I)v = 0.",
          "Place the eigenvectors as columns of P and verify A P = P D.",
        ],
        steps: [
          {
            title: "Characteristic polynomial",
            text: "For a triangular matrix the determinant of A minus lambda I factors immediately.",
            math: String.raw`\det(A-\lambda I)=(${a}-\lambda)(${d}-\lambda)=0`,
          },
          {
            title: "Read off the eigenvalues",
            text: "The two diagonal entries are the roots, and they are distinct.",
            math: String.raw`\lambda_1=${a},\qquad \lambda_2=${d}`,
          },
          {
            title: "Eigenvector for lambda 1",
            text: "The second row forces the second component to vanish.",
            math: String.raw`A-${a}I=\begin{pmatrix}0&${b}\\0&${gap}\end{pmatrix}\quad\Rightarrow\quad \mathbf v_1=(1,0)`,
          },
          {
            title: "Eigenvector for lambda 2",
            text: "The first row gives a relation between the two components.",
            math: String.raw`(${a}-${d})v_1+${b}v_2=0\quad\Rightarrow\quad \mathbf v_2=(${b},${gap})`,
          },
          {
            title: "Assemble the diagonalization",
            text: "The eigenvector columns and diagonal eigenvalues give A = P D P inverse.",
            math: String.raw`P=\begin{pmatrix}1&${b}\\0&${gap}\end{pmatrix},\qquad D=\begin{pmatrix}${a}&0\\0&${d}\end{pmatrix},\qquad A=PDP^{-1}`,
          },
          {
            title: "Verify with invariants",
            text: "Trace and determinant are preserved under similarity.",
            math: String.raw`\lambda_1+\lambda_2=${trace}=\operatorname{tr}(A),\qquad \lambda_1\lambda_2=${det}=\det A`,
          },
        ],
        answer: String.raw`\lambda_1=${a},\ \mathbf v_1=(1,0);\qquad \lambda_2=${d},\ \mathbf v_2=(${b},${gap});\qquad A=PDP^{-1}`,
        alternatives: [
          "Use the invariants lambda1 + lambda2 = trace and lambda1 lambda2 = determinant to check the eigenvalues.",
          "Compute A^n = P D^n P inverse and verify against direct multiplication for n = 2.",
        ],
        mistakes: [
          "Assuming a triangular matrix has the off-diagonal entry as an eigenvalue.",
          "Forgetting that eigenvectors are determined only up to a nonzero scalar multiple.",
          "Building P with eigenvector rows rather than columns when forming P D P inverse.",
        ],
        further: "If the diagonal entries were equal, when would the matrix still be diagonalizable? Relate your answer to whether A minus a I has a nonzero off-diagonal entry.",
      }
    },
  },

  // ── 7. Linear transformations (matrix of a map and area factor) ────────────
  {
    id: 'm3-linear-transformations',
    domain: 'math',
    topicId: 'linear-transformations',
    title: 'Linear transformations',
    level: 'Undergraduate 2',
    type: 'Theoretical',
    concepts: ['linearity', 'standard matrix', 'basis images', 'determinant', 'area scaling'],
    build(rng, index) {
      const a = 1 + rng.int(0, 3)
      const b = 1 + index
      const c = 1 + rng.int(0, 3)
      let d = 1 + rng.int(0, 3)
      while (a * d - b * c === 0) d += 1
      const det = a * d - b * c
      const u = 2 + rng.int(0, 2)
      const v = 2 + rng.int(0, 2)
      const Tu0 = a * u + b * v
      const Tu1 = c * u + d * v

      return {
        statement: "Define T from R^2 to R^2 by T(x, y) = (" + a + " x + " + b + " y, " + c + " x + " + d + " y). (a) Verify T is linear directly from the definition. (b) Find its matrix in the standard basis. (c) Compute T(" + u + ", " + v + "). (d) By what factor does T scale area?",
        hints: [
          "Check T(alpha p + beta q) = alpha T(p) + beta T(q) component by component.",
          "The columns of the matrix are the images of the standard basis vectors e1 and e2.",
          "The absolute value of the determinant is the area scaling factor.",
        ],
        steps: [
          {
            title: "Verify linearity",
            text: "Both components are linear combinations of x and y, so superposition holds.",
            math: String.raw`T(\alpha\mathbf p+\beta\mathbf q)=\alpha T(\mathbf p)+\beta T(\mathbf q)`,
          },
          {
            title: "Find the images of the basis vectors",
            text: "Substitute e1 and e2 into the formula for T.",
            math: String.raw`T(1,0)=(${a},${c}),\qquad T(0,1)=(${b},${d})`,
          },
          {
            title: "Assemble the standard matrix",
            text: "Basis images become the columns, not the rows, of the matrix.",
            math: String.raw`[T]=\begin{pmatrix}${a}&${b}\\${c}&${d}\end{pmatrix}`,
          },
          {
            title: "Apply T to the given vector",
            text: "Multiply the matrix by the coordinate column.",
            math: String.raw`T(${u},${v})=(${Tu0},${Tu1})`,
          },
          {
            title: "Interpret the determinant",
            text: "The signed area of the image of the unit square is the determinant.",
            math: String.raw`\det[T]=${a}(${d})-(${b})(${c})=${det},\qquad \text{area factor}=${Math.abs(det)}`,
          },
        ],
        answer: String.raw`[T]=\begin{pmatrix}${a}&${b}\\${c}&${d}\end{pmatrix},\quad T(${u},${v})=(${Tu0},${Tu1}),\quad \det[T]=${det}`,
        alternatives: [
          "Represent T by a matrix first, then verify linearity from distributivity of matrix multiplication over linear combinations.",
          "Track the images of the four vertices of the unit square to interpret the determinant as a signed area.",
        ],
        mistakes: [
          "Putting T(e1) and T(e2) into the rows of the matrix instead of the columns.",
          "Dropping the absolute value when interpreting the determinant as an area scale.",
          "Assuming the map is nonlinear because the coefficients are large; fixed coefficients still define a linear map.",
        ],
        further: "Find the image of the unit circle under T and describe the resulting ellipse in terms of the singular values of the matrix.",
      }
    },
  },

  // ── 8. Inner products (Cauchy-Schwarz via the Lagrange identity) ───────────
  {
    id: 'm3-inner-products',
    domain: 'math',
    topicId: 'inner-product-spaces',
    title: 'Inner products',
    level: 'Undergraduate 2',
    type: 'Proof',
    concepts: ['dot product', 'norm', 'Cauchy-Schwarz inequality', 'Lagrange identity', 'angle between vectors'],
    build(rng, index) {
      const iu = (rng.int(0, NICE_3D.length - 1) + index) % NICE_3D.length
      let iv = (iu + 1 + rng.int(1, NICE_3D.length - 1)) % NICE_3D.length
      while (parallel(NICE_3D[iu], NICE_3D[iv])) iv = (iv + 1) % NICE_3D.length
      const u = NICE_3D[iu]
      const base = NICE_3D[iv]
      const k = 1 + index
      const v = [k * base[0], k * base[1], k * base[2]]
      const dot0 = u[0] * base[0] + u[1] * base[1] + u[2] * base[2]
      const dot = k * dot0
      const n2u = u[0] * u[0] + u[1] * u[1] + u[2] * u[2]
      const n2v = v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
      const nu = Math.sqrt(n2u)
      const nv = Math.sqrt(n2v)
      const lagrange = Math.pow(u[1] * v[2] - u[2] * v[1], 2)
        + Math.pow(u[2] * v[0] - u[0] * v[2], 2)
        + Math.pow(u[0] * v[1] - u[1] * v[0], 2)
      const gap = n2u * n2v - dot * dot
      const [rn, rd] = reduceFraction(dot0, nu * (nv / k))

      return {
        statement: "In R^3 with the standard dot product let u = (" + u[0] + ", " + u[1] + ", " + u[2] + ") and v = (" + v[0] + ", " + v[1] + ", " + v[2] + "). (a) Compute the inner product and both norms. (b) Prove the Cauchy-Schwarz inequality for this pair using the Lagrange identity. (c) Find the cosine of the angle between them.",
        hints: [
          "Compute the dot product and the two squared norms directly from the components.",
          "Use ||u||^2 ||v||^2 - <u,v>^2 = sum of three squared 2 by 2 minors, which is nonnegative.",
          "The cosine of the angle is <u,v> / (||u|| ||v||); reduce the fraction at the end.",
        ],
        steps: [
          {
            title: "Compute the inner product",
            text: "Sum the componentwise products.",
            math: String.raw`\langle\mathbf u,\mathbf v\rangle=${u[0]}(${v[0]})+${u[1]}(${v[1]})+${u[2]}(${v[2]})=${dot}`,
          },
          {
            title: "Compute the squared norms",
            text: "Each squared norm is the dot product of a vector with itself.",
            math: String.raw`\lVert\mathbf u\rVert^2=${n2u}\Rightarrow\lVert\mathbf u\rVert=${nu},\qquad \lVert\mathbf v\rVert^2=${n2v}\Rightarrow\lVert\mathbf v\rVert=${nv}`,
          },
          {
            title: "Apply the Lagrange identity",
            text: "The gap between the product of squared norms and the squared inner product is a sum of squares.",
            math: String.raw`\lVert\mathbf u\rVert^2\lVert\mathbf v\rVert^2-\langle\mathbf u,\mathbf v\rangle^2=${gap}=\sum_{i<j}(u_iv_j-u_jv_i)^2=${lagrange}\ge 0`,
          },
          {
            title: "Conclude Cauchy-Schwarz",
            text: "Nonnegativity of the sum of squares gives the inequality; it is strict because the vectors are not parallel.",
            math: String.raw`|\langle\mathbf u,\mathbf v\rangle|=${Math.abs(dot)}\le ${nu * nv}=\lVert\mathbf u\rVert\lVert\mathbf v\rVert`,
          },
          {
            title: "Find the cosine of the angle",
            text: "Divide the inner product by the product of the norms and reduce.",
            math: String.raw`\cos\theta=\frac{${dot}}{${nu * nv}}=\frac{${rn}}{${rd}}`,
          },
        ],
        answer: String.raw`\langle\mathbf u,\mathbf v\rangle=${dot},\quad \lVert\mathbf u\rVert=${nu},\quad \lVert\mathbf v\rVert=${nv},\quad \cos\theta=\frac{${dot}}{${nu * nv}}`,
        alternatives: [
          "Prove Cauchy-Schwarz by considering the quadratic ||u - t v||^2 >= 0 and requiring its discriminant to be nonpositive.",
          "Compute the angle from the dot product formula and confirm it lies between 0 and pi.",
        ],
        mistakes: [
          "Using <u,v>^2 in place of |<u,v>| when comparing with ||u|| ||v||.",
          "Forgetting to take the square root when converting a squared norm into a norm.",
          "Assuming equality in Cauchy-Schwarz whenever both vectors have integer components.",
        ],
        further: "For the same u and v, compute the component of u perpendicular to v and check that its squared norm equals ||u||^2 - <u,v>^2 / ||v||^2.",
      }
    },
  },

  // ── 9. Orthogonal projection (onto a line spanned by u) ────────────────────
  {
    id: 'm3-orthogonal-projection',
    domain: 'math',
    topicId: 'orthogonality',
    title: 'Orthogonal projection',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['orthogonal projection', 'inner product', 'residual', 'orthogonality', 'Pythagorean identity'],
    build(rng, index) {
      const u = NICE_3D[rng.int(0, NICE_3D.length - 1)]
      const t = 1 + rng.int(0, 2)
      const s = 1 + index
      const n2u = u[0] * u[0] + u[1] * u[1] + u[2] * u[2]
      const b = [t * u[0] + s * u[1], t * u[1] - s * u[0], t * u[2]]
      const dot = b[0] * u[0] + b[1] * u[1] + b[2] * u[2]
      const proj = [t * u[0], t * u[1], t * u[2]]
      const residual = [b[0] - proj[0], b[1] - proj[1], b[2] - proj[2]]
      const resDot = residual[0] * u[0] + residual[1] * u[1] + residual[2] * u[2]
      const projNorm2 = proj[0] * proj[0] + proj[1] * proj[1] + proj[2] * proj[2]
      const resNorm2 = residual[0] * residual[0] + residual[1] * residual[1] + residual[2] * residual[2]
      const bNorm2 = b[0] * b[0] + b[1] * b[1] + b[2] * b[2]

      return {
        statement: "In R^3 let u = (" + u[0] + ", " + u[1] + ", " + u[2] + ") and b = (" + b[0] + ", " + b[1] + ", " + b[2] + "). Find the orthogonal projection of b onto the line spanned by u, and verify that the residual is perpendicular to u.",
        hints: [
          "The projection of b onto the line spanned by u is (<b,u> / <u,u>) u.",
          "Here <b,u> = t <u,u>, so the scalar multiplier is exactly t.",
          "Subtract the projection from b and check that the residual has zero dot product with u.",
        ],
        steps: [
          {
            title: "Recall the projection formula",
            text: "The projection is the scalar coefficient along u times u itself.",
            math: String.raw`\operatorname{proj}_{\mathbf u}\mathbf b=\frac{\langle\mathbf b,\mathbf u\rangle}{\langle\mathbf u,\mathbf u\rangle}\mathbf u`,
          },
          {
            title: "Compute the denominator",
            text: "The squared norm of u is an integer.",
            math: String.raw`\langle\mathbf u,\mathbf u\rangle=${n2u}`,
          },
          {
            title: "Compute the numerator",
            text: "The construction makes the inner product an exact multiple of the denominator.",
            math: String.raw`\langle\mathbf b,\mathbf u\rangle=${dot}=${t}\cdot ${n2u}`,
          },
          {
            title: "Evaluate the projection",
            text: "The coefficient is t, so scale u by t.",
            math: String.raw`\operatorname{proj}_{\mathbf u}\mathbf b=${t}(${u[0]},${u[1]},${u[2]})=(${proj[0]},${proj[1]},${proj[2]})`,
          },
          {
            title: "Check orthogonality of the residual",
            text: "Subtract the projection and take the dot product with u.",
            math: String.raw`\mathbf b-\operatorname{proj}_{\mathbf u}\mathbf b=(${residual[0]},${residual[1]},${residual[2]}),\quad \langle\mathbf b-\operatorname{proj}_{\mathbf u}\mathbf b,\mathbf u\rangle=${resDot}`,
          },
          {
            title: "Confirm the Pythagorean identity",
            text: "The squared norm of b splits into the projection and residual parts.",
            math: String.raw`\lVert\mathbf b\rVert^2=${bNorm2}=${projNorm2}+${resNorm2}=\lVert\operatorname{proj}_{\mathbf u}\mathbf b\rVert^2+\lVert\mathbf b-\operatorname{proj}_{\mathbf u}\mathbf b\rVert^2`,
          },
        ],
        answer: String.raw`\operatorname{proj}_{\mathbf u}\mathbf b=${t}(${u[0]},${u[1]},${u[2]})=(${proj[0]},${proj[1]},${proj[2]})`,
        alternatives: [
          "Normalize u to a unit vector first, project onto it, then rescale by the norm of u.",
          "Verify by checking orthogonality of the residual and then using the Pythagorean relation to confirm the norm.",
        ],
        mistakes: [
          "Using <u,u> in the numerator instead of the denominator of the coefficient.",
          "Reporting the scalar coefficient instead of the projected vector.",
          "Assuming the residual is parallel to u rather than perpendicular to it.",
        ],
        further: "Extend the formula to projection onto the plane spanned by two orthogonal vectors u1 and u2, and test it on the same b.",
      }
    },
  },

  // ── 10. Change of basis (coordinate conversion in R^2) ─────────────────────
  {
    id: 'm3-change-of-basis',
    domain: 'math',
    topicId: 'basis-transformations',
    title: 'Change of basis',
    level: 'Undergraduate 3',
    type: 'Derivation',
    concepts: ['basis', 'change-of-basis matrix', 'coordinate vector', 'matrix inverse', 'verification'],
    build(rng, index) {
      const a = 1 + rng.int(0, 3)
      const b = 1 + index
      const c = 1 + rng.int(0, 3)
      let d = 1 + rng.int(0, 3)
      while (a * d - b * c === 0) d += 1
      const det = a * d - b * c
      const alpha = 1 + rng.int(0, 3)
      const beta = 1 + rng.int(0, 3)
      const x0 = alpha * a + beta * b
      const x1 = alpha * c + beta * d

      return {
        statement: "In R^2 let B = {v1, v2} with v1 = (" + a + ", " + c + ") and v2 = (" + b + ", " + d + "), and let E be the standard basis. The vector x has standard coordinates (" + x0 + ", " + x1 + "). (a) Find the change-of-basis matrix P whose columns are v1 and v2, converting B-coordinates to E-coordinates. (b) Find P inverse. (c) Find the coordinate vector of x in the basis B. (d) Verify your answer.",
        hints: [
          "The columns of P are the basis vectors of B written in standard coordinates.",
          "Standard coordinates satisfy [x]_E = P [x]_B, so [x]_B = P inverse times [x]_E.",
          "For a 2 by 2 matrix, P inverse equals (1 / det P) times the matrix with d and a swapped and b and c negated.",
        ],
        steps: [
          {
            title: "Build the change-of-basis matrix",
            text: "Place the new basis vectors as columns to convert B-coordinates into standard coordinates.",
            math: String.raw`P=\begin{pmatrix}${a}&${b}\\${c}&${d}\end{pmatrix},\qquad [\mathbf x]_E=P[\mathbf x]_B`,
          },
          {
            title: "Check that B is a basis",
            text: "A nonzero determinant confirms the two vectors are independent.",
            math: String.raw`\det P=${a}(${d})-(${b})(${c})=${det}\neq 0`,
          },
          {
            title: "Invert the matrix",
            text: "Use the 2 by 2 inverse formula.",
            math: String.raw`P^{-1}=\frac{1}{${det}}\begin{pmatrix}${d}&${-b}\\${-c}&${a}\end{pmatrix}`,
          },
          {
            title: "Convert the coordinates",
            text: "Multiply the standard coordinate column by the inverse matrix.",
            math: String.raw`[\mathbf x]_B=P^{-1}\begin{pmatrix}${x0}\\${x1}\end{pmatrix}=\begin{pmatrix}${alpha}\\${beta}\end{pmatrix}`,
          },
          {
            title: "Verify by reconstructing x",
            text: "Multiplying back by P must recover the original standard coordinates.",
            math: String.raw`P\begin{pmatrix}${alpha}\\${beta}\end{pmatrix}=${alpha}(${a},${c})+${beta}(${b},${d})=(${x0},${x1})=[\mathbf x]_E`,
          },
        ],
        answer: String.raw`P=\begin{pmatrix}${a}&${b}\\${c}&${d}\end{pmatrix},\qquad [\mathbf x]_B=\begin{pmatrix}${alpha}\\${beta}\end{pmatrix}`,
        alternatives: [
          "Solve x = alpha v1 + beta v2 directly as a 2 by 2 linear system for alpha and beta.",
          "Write P inverse explicitly using the adjugate formula and multiply it by the coordinate column of x.",
        ],
        mistakes: [
          "Using the basis vectors as rows instead of columns of P.",
          "Multiplying by P instead of P inverse when converting standard coordinates into B-coordinates.",
          "Assuming the change-of-basis matrix is orthogonal; in general it is not.",
        ],
        further: "If B were an orthonormal basis, how would finding [x]_B simplify, and what would the change-of-basis matrix look like?",
      }
    },
  },
]

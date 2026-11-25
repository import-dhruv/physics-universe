import type { GeneratedFamily } from './types'

// ── small shared helpers ──────────────────────────────────────────────────────
// These only format numbers that were computed by the build functions below;
// no result is ever hard-coded into a statement, hint, step, or answer.

const gcd = (a: number, b: number): number => {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b !== 0) {
    const t = a % b
    a = b
    b = t
  }
  return a === 0 ? 1 : a
}

/** Reduced fraction as plain text, e.g. "3/4", "-2", "0". */
const frac = (n: number, d: number): string => {
  if (n === 0) return '0'
  const g = gcd(n, d)
  const nn = Math.abs(n) / g
  const dd = Math.abs(d) / g
  const sign = (n < 0) !== (d < 0) ? '-' : ''
  return dd === 1 ? `${sign}${nn}` : `${sign}${nn}/${dd}`
}

/** Reduced fraction as KaTeX, e.g. "\\frac{3}{4}", "-2", "0". */
const fracTex = (n: number, d: number): string => {
  if (n === 0) return '0'
  const g = gcd(n, d)
  const nn = Math.abs(n) / g
  const dd = Math.abs(d) / g
  const sign = (n < 0) !== (d < 0) ? '-' : ''
  return dd === 1 ? `${sign}${nn}` : `${sign}\\frac{${nn}}{${dd}}`
}

/** Signed coefficient appended to a term: " + 3x", " - 5", or "". */
const signedCoef = (c: number, term: string): string => {
  if (c === 0) return ''
  const sign = c > 0 ? ' + ' : ' - '
  const mag = Math.abs(c)
  // A coefficient of 1 is only implicit when there is a variable term.
  const coef = mag === 1 && term !== '' ? '' : String(mag)
  return `${sign}${coef}${term}`
}

/** Signed fraction appended to a term: "+ \\frac{5}{3}x" or "". */
const signedFracTex = (n: number, d: number, term: string): string => {
  if (n === 0) return ''
  const sign = (n < 0) !== (d < 0) ? '-' : '+'
  return `${sign} ${fracTex(Math.abs(n), Math.abs(d))}${term}`
}

/** A signed monic quadratic x^2 + Bx + C with coefficients already computed. */
const quad = (A: number, B: number, C: number): string => {
  const lead = A === 1 ? '' : String(A)
  return `${lead}x^2${signedCoef(B, 'x')}${signedCoef(C, '')}`
}

/** A linear binomial x + v in a readable (not "x + -3") form. */
const bin = (v: number): string => `x ${v < 0 ? '-' : '+'} ${Math.abs(v)}`

/** A complex number a + bi in a readable form, used in prose and in math. */
const cstr = (re: number, im: number): string =>
  `${re} ${im < 0 ? '-' : '+'} ${Math.abs(im)}i`

const variantTitle = (base: string, index: number): string =>
  `${base} - variant ${index + 1}`

// ── the ten families ──────────────────────────────────────────────────────────

export const MATH_FAMILIES_1: GeneratedFamily[] = [
  {
    id: 'm1-fractions-ratios',
    domain: 'math',
    topicId: 'arithmetic-number-systems',
    title: 'Fractions and ratios',
    level: 'High school',
    type: 'Numerical',
    concepts: ['ratios', 'fraction simplification', 'greatest common divisor', 'part-whole reasoning'],
    build(rng, index) {
      let a = rng.int(2, 9)
      let b = rng.int(2, 9)
      const g0 = gcd(a, b)
      a /= g0
      b /= g0
      if (a === b) a += 1 // avoid the trivial 1:1 case

      const k = rng.int(2, 11) + index
      const total = k * (a + b)
      const qa = k * a
      const qb = k * b
      const fracA = frac(a, a + b)
      const fracB = frac(b, a + b)

      return {
        title: variantTitle('Fractions and ratios', index),
        statement: `Two quantities are in the ratio ${a}:${b}, and their sum is ${total}. Find the two quantities, then express each one as a fraction of the total in lowest terms.`,
        hints: [
          'A ratio a:b means the quantities have the form k times a and k times b for a common scale factor k.',
          `Add the ratio parts first: ${a} + ${b} = ${a + b}. Then the scale factor is the total divided by that sum.`,
          `Here k = ${total}/${a + b} = ${k}. Multiply each ratio part by k, then reduce each part/(a+b) using the greatest common divisor.`,
        ],
        steps: [
          {
            title: 'Represent the ratio',
            text: 'Write both quantities as a common scale factor k multiplied by each ratio part.',
            math: String.raw`q_1 = k a,\qquad q_2 = k b`,
          },
          {
            title: 'Find one part',
            text: `The ratio parts add to ${a} + ${b} = ${a + b}. Dividing the given total ${total} by ${a + b} gives k = ${k}.`,
            math: String.raw`k = \frac{${total}}{${a + b}} = ${k}`,
          },
          {
            title: 'Compute both quantities',
            text: `Multiplying: q1 = ${k} times ${a} = ${qa}, and q2 = ${k} times ${b} = ${qb}.`,
            math: String.raw`q_1 = ${qa},\qquad q_2 = ${qb}`,
          },
          {
            title: 'Fractions of the total',
            text: `The first quantity is ${a}/${a + b} = ${fracA} of the total, and the second is ${b}/${a + b} = ${fracB}.`,
            math: String.raw`\frac{q_1}{T} = \frac{${qa}}{${total}} = ${fracTex(a, a + b)},\qquad \frac{q_2}{T} = ${fracTex(b, a + b)}`,
          },
          {
            title: 'Check the sum',
            text: `The two quantities add back to ${qa} + ${qb} = ${total}, which matches the total given in the problem.`,
            math: String.raw`${qa} + ${qb} = ${total}`,
          },
        ],
        answer: `The quantities are ${qa} and ${qb}; as fractions of the total they are ${fracA} and ${fracB}.`,
        alternatives: [
          'Set up q1/q2 = a/b together with q1 + q2 = T and solve the resulting linear system.',
          'Work backwards from the fraction of the total each part occupies, then multiply by T.',
        ],
        mistakes: [
          'Using the ratio parts a and b as the actual quantities and forgetting the scale factor k.',
          'Mistaking a + b for the total instead of treating it as the number of equal parts.',
          'Leaving the final fractions unreduced, such as writing 4/10 instead of 2/5.',
        ],
        further: `If the ratio were reversed to ${b}:${a} with the same total ${total}, what would the new quantities be, and how would each fraction of the total change?`,
      }
    },
  },

  {
    id: 'm1-algebraic-manipulation',
    domain: 'math',
    topicId: 'algebraic-manipulation',
    title: 'Algebraic simplification',
    level: 'High school',
    type: 'Derivation',
    concepts: ['distributive law', 'collecting like terms', 'polynomial expansion', 'evaluation'],
    build(rng, index) {
      let a = rng.int(-5, 6) + index - 1
      const b = rng.int(-5, 6)
      const c = rng.int(1, 5)
      const d = rng.int(-4, 5)
      let A = a + b - c
      let B = a * b - c * d
      if (A === 0 && B === 0) {
        a += 1
        A = a + b - c
        B = a * b - c * d
      }
      const n = rng.int(1, 5) + index
      const value = n * n + A * n + B
      const expr = `x^2${signedCoef(A, 'x')}${signedCoef(B, '')}`
      const productExpr = quad(1, a + b, a * b)

      return {
        title: variantTitle('Algebraic simplification', index),
        statement: `Expand and simplify (${bin(a)})(${bin(b)}) - ${c}(${bin(d)}), then evaluate the simplified expression at x = ${n}.`,
        hints: [
          'First multiply the two binomials; then distribute the minus sign over the second bracket.',
          `The product gives x^2 with x-coefficient ${a + b} and constant ${a * b}. The second bracket contributes x-coefficient ${-c} and constant ${-c * d}.`,
          `Collecting like terms gives an x-coefficient of ${A} and a constant of ${B}; substitute x = ${n} last.`,
        ],
        steps: [
          {
            title: 'Expand the product',
            text: `Using the distributive law, (${bin(a)})(${bin(b)}) expands to ${productExpr}.`,
            math: String.raw`(${bin(a)})(${bin(b)}) = ${productExpr}`,
          },
          {
            title: 'Distribute the second bracket',
            text: `The term -${c}(${bin(d)}) expands to ${signedCoef(-c, 'x').trim()} ${signedCoef(-c * d, '').trim()}.`,
            math: String.raw`-${c}(${bin(d)}) = ${signedCoef(-c, 'x')}${signedCoef(-c * d, '')}`,
          },
          {
            title: 'Collect like terms',
            text: `The x-coefficient is ${a} + ${b} - ${c} = ${A}, and the constant is ${a * b} - ${c * d} = ${B}.`,
            math: String.raw`A = ${a} + ${b} - ${c} = ${A},\qquad B = ${a}\cdot ${b} - ${c}\cdot ${d} = ${B}`,
          },
          {
            title: 'State the simplified polynomial',
            text: `Combining everything, the original expression simplifies to ${expr}.`,
            math: String.raw`(${bin(a)})(${bin(b)}) - ${c}(${bin(d)}) = ${expr}`,
          },
          {
            title: 'Evaluate at the given x',
            text: `Substituting x = ${n} gives ${n}^2 + (${A})(${n}) + (${B}) = ${value}.`,
            math: String.raw`p(${n}) = (${n})^2 + (${A})(${n}) + (${B}) = ${value}`,
          },
        ],
        answer: `Simplified expression: ${expr}. Its value at x = ${n} is ${value}.`,
        alternatives: [
          'Distribute term by term (each of the four products) instead of using a FOIL-style shortcut.',
          'Substitute x = n into the original unsimplified expression as an independent check.',
        ],
        mistakes: [
          'Dropping the minus sign when distributing -c across both terms of (x + d).',
          'Combining the x-coefficient with the constant term because both are numbers.',
          'Forgetting to subtract c times d from the constant term entirely.',
        ],
        further: `How would the simplified expression change if the last term were +${c}(${bin(d)}) instead of -${c}(${bin(d)})? Compute the new coefficients.`,
      }
    },
  },

  {
    id: 'm1-function-composition',
    domain: 'math',
    topicId: 'functions-transformations',
    title: 'Function composition',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['composition order', 'polynomial substitution', 'binomial expansion', 'evaluation'],
    build(rng, index) {
      const a = rng.int(1, 4) + index
      const b = rng.int(-3, 4)
      const c = rng.int(1, 4)
      const d = rng.int(-3, 4)
      const n = rng.int(1, 4) + index

      // (f∘g)(x) = a(c x^2 + d) + b = ac x^2 + (ad + b)
      const fgA = a * c
      const fgC = a * d + b
      // (g∘f)(x) = c(a x + b)^2 + d = a^2 c x^2 + 2abc x + (c b^2 + d)
      const gfA = a * a * c
      const gfB = 2 * a * b * c
      const gfC = c * b * b + d
      const fgN = fgA * n * n + fgC
      const gfN = gfA * n * n + gfB * n + gfC

      return {
        title: variantTitle('Function composition', index),
        statement: `Let f(x) = ${a}x${signedCoef(b, '')} and g(x) = ${c}x^2${signedCoef(d, '')}. Find (f composed with g)(x) and (g composed with f)(x), then evaluate each at x = ${n}.`,
        hints: [
          'The notation (f composed with g)(x) means f(g(x)): the inner function is applied first.',
          `For f(g(x)), substitute the whole expression ${c}x^2${signedCoef(d, '')} in place of x in f.`,
          `For g(f(x)), you must expand (${a}x${signedCoef(b, '')})^2 before multiplying by ${c} and adding ${d}.`,
        ],
        steps: [
          {
            title: 'Compose f after g',
            text: `Substitute g(x) into f: multiply ${c}x^2${signedCoef(d, '')} by ${a}, then add ${b}.`,
            math: String.raw`(f\circ g)(x) = ${a}(${c}x^2${signedCoef(d, '')})${signedCoef(b, '')} = ${quad(fgA, 0, fgC)}`,
          },
          {
            title: 'Compose g after f',
            text: `Substitute f(x) into g and expand the square to obtain the full quadratic.`,
            math: String.raw`(g\circ f)(x) = ${c}(${a}x${signedCoef(b, '')})^2${signedCoef(d, '')} = ${quad(gfA, gfB, gfC)}`,
          },
          {
            title: 'Evaluate f composed with g',
            text: `At x = ${n}, the first composite is ${fgA} times ${n}^2, plus ${fgC}.`,
            math: String.raw`(f\circ g)(${n}) = ${fgA}\cdot ${n}^2 + (${fgC}) = ${fgN}`,
          },
          {
            title: 'Evaluate g composed with f',
            text: `At x = ${n}, the second composite is ${gfA} times ${n}^2, plus ${gfB} times ${n}, plus ${gfC}.`,
            math: String.raw`(g\circ f)(${n}) = ${gfA}\cdot ${n}^2 + (${gfB})\cdot ${n} + (${gfC}) = ${gfN}`,
          },
          {
            title: 'Compare the two results',
            text: `The order of composition matters: at x = ${n} the two composites give ${fgN} and ${gfN} respectively.`,
            math: String.raw`(f\circ g)(${n}) = ${fgN},\qquad (g\circ f)(${n}) = ${gfN}`,
          },
        ],
        answer: `(f composed with g)(x) = ${quad(fgA, 0, fgC)}, (g composed with f)(x) = ${quad(gfA, gfB, gfC)}. At x = ${n} the values are ${fgN} and ${gfN}.`,
        alternatives: [
          'Evaluate the inner function numerically first, then feed that number into the outer function.',
          'Make a table of values for both composites at several x and use it to check the algebraic forms.',
        ],
        mistakes: [
          'Reversing the order and computing g(f(x)) when f(g(x)) was requested.',
          'Expanding (ax+b)^2 as a^2 x^2 + b^2 and forgetting the middle term 2abx.',
          'Treating composition as ordinary multiplication, f(x) times g(x).',
        ],
        further: `Find every real x for which (f composed with g)(x) equals (g composed with f)(x), using the functions from this problem.`,
      }
    },
  },

  {
    id: 'm1-exponents-logarithms',
    domain: 'math',
    topicId: 'exponents-logarithms',
    title: 'Exponent and logarithm laws',
    level: 'Undergraduate 1',
    type: 'Derivation',
    concepts: ['power rule', 'product and quotient rules', 'change of base', 'logarithm of a power'],
    build(rng, index) {
      const base = rng.int(2, 5)
      const u = rng.int(1, 4) + index
      const v = rng.int(1, 4)
      const w = rng.int(1, 4)
      const E = 3 * u + v - w
      const arg = E >= 0 ? Math.pow(base, E) : 1 / Math.pow(base, -E)
      const argTex = E >= 0 ? String(Math.pow(base, E)) : `\\frac{1}{${Math.pow(base, -E)}}`
      const checkValue = (Math.log(arg) / Math.log(base)).toFixed(4)

      return {
        title: variantTitle('Exponent and logarithm laws', index),
        statement: `Let b = ${base}, m = b^${u}, n = b^${v}, and p = b^${w}. Evaluate log base ${base} of (m cubed times n, divided by p) exactly, and confirm your answer using natural logarithms.`,
        hints: [
          'Write m, n, and p as powers of the same base b, then use log base b of b^k = k.',
          `The power rule gives m cubed = b^${3 * u}, so m cubed times n = b^${3 * u + v}.`,
          `Dividing by p = b^${w} subtracts ${w} from the exponent, leaving b^${E}.`,
        ],
        steps: [
          {
            title: 'Rewrite each factor as a power',
            text: `By definition, m = ${base}^${u}, n = ${base}^${v}, and p = ${base}^${w}.`,
            math: String.raw`m = ${base}^{${u}},\qquad n = ${base}^{${v}},\qquad p = ${base}^{${w}}`,
          },
          {
            title: 'Apply the power rule',
            text: `Raising m to the third power multiplies its exponent by 3.`,
            math: String.raw`m^3 = (${base}^{${u}})^3 = ${base}^{${3 * u}}`,
          },
          {
            title: 'Combine product and quotient',
            text: `Multiplying adds exponents and dividing subtracts them, giving a single power of ${base}.`,
            math: String.raw`\frac{m^3 n}{p} = \frac{${base}^{${3 * u}}\cdot ${base}^{${v}}}{${base}^{${w}}} = ${base}^{${E}}`,
          },
          {
            title: 'Take the logarithm',
            text: `The logarithm base ${base} of ${base} to any power is just that power.`,
            math: String.raw`\log_{${base}}\left(\frac{m^3 n}{p}\right) = ${E}`,
          },
          {
            title: 'Numerical confirmation',
            text: `Using the change-of-base formula with natural logs gives the same value, ${checkValue}.`,
            math: String.raw`\frac{\ln\left(${argTex}\right)}{\ln\left(${base}\right)} \approx ${checkValue}`,
          },
        ],
        answer: `log base ${base} of (m cubed times n divided by p) equals ${E}; the natural-log check gives ${checkValue}.`,
        alternatives: [
          'Apply the change-of-base formula first and simplify using natural-log rules.',
          'Expand the expression as 3 log_b(m) + log_b(n) - log_b(p) and substitute u, v, w.',
        ],
        mistakes: [
          'Applying the power rule incorrectly as log_b(m^3) = (log_b m)^3.',
          'Adding exponents when dividing by p instead of subtracting them.',
          'Assuming log_b(b) = 0 rather than log_b(b) = 1 when simplifying.',
        ],
        further: `In terms of u, v, and w, evaluate log base ${base} of (n squared times p divided by m).`,
      }
    },
  },

  {
    id: 'm1-complex-numbers',
    domain: 'math',
    topicId: 'complex-numbers',
    title: 'Complex arithmetic',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['imaginary unit', 'complex conjugate', 'modulus squared', 'rationalising'],
    build(rng, index) {
      let a = rng.int(-6, 6)
      let b = rng.int(-6, 6) + index - 1
      let c = rng.int(-6, 6)
      let d = rng.int(-6, 6)
      if (b === 0) b = 2 // keep a genuine imaginary part
      if (c === 0 && d === 0) d = 1 // keep the denominator non-zero

      const sumR = a + c
      const sumI = b + d
      const prodR = a * c - b * d
      const prodI = a * d + b * c
      const conjR = a * c + b * d
      const conjI = b * c - a * d
      const denom = c * c + d * d

      const qTex = `${fracTex(conjR, denom)} ${conjI < 0 ? '-' : '+'} ${fracTex(Math.abs(conjI), denom)}i`
      const qPlain = `${frac(conjR, denom)} ${conjI < 0 ? '-' : '+'} ${frac(Math.abs(conjI), denom)}i`

      return {
        title: variantTitle('Complex arithmetic', index),
        statement: `Let z1 = ${cstr(a, b)} and z2 = ${cstr(c, d)}. Compute z1 + z2, z1 times z2, and z1 divided by z2, giving exact results.`,
        hints: [
          'Add or subtract real and imaginary parts separately for the sum.',
          `For the product, use i squared = -1: the real part is ac - bd and the imaginary part is ad + bc.`,
          `For the quotient, multiply top and bottom by the conjugate of z2; the denominator becomes c^2 + d^2 = ${denom}.`,
        ],
        steps: [
          {
            title: 'Add the complex numbers',
            text: `Combine real parts and imaginary parts separately.`,
            math: String.raw`z_1 + z_2 = (${cstr(a, b)}) + (${cstr(c, d)}) = ${cstr(sumR, sumI)}`,
          },
          {
            title: 'Multiply using i squared = -1',
            text: `Expand the product and replace i squared by -1 to obtain the real and imaginary parts.`,
            math: String.raw`z_1 z_2 = (ac - bd) + (ad + bc)i = ${cstr(prodR, prodI)}`,
          },
          {
            title: 'Prepare the quotient',
            text: `Multiply numerator and denominator by the conjugate of z2, whose modulus squared is ${c}^2 + ${d}^2 = ${denom}.`,
            math: String.raw`\frac{z_1}{z_2} = \frac{z_1 \overline{z_2}}{|z_2|^2},\qquad |z_2|^2 = ${denom}`,
          },
          {
            title: 'Multiply by the conjugate',
            text: `The numerator becomes ${cstr(conjR, conjI)} after expanding and using i squared = -1.`,
            math: String.raw`z_1\overline{z_2} = (${cstr(a, b)})(${cstr(c, -d)}) = ${cstr(conjR, conjI)}`,
          },
          {
            title: 'Reduce the fractions',
            text: `Divide each numerator component by ${denom} and reduce the fractions.`,
            math: String.raw`\frac{z_1}{z_2} = ${qTex}`,
          },
        ],
        answer: `z1 + z2 = ${cstr(sumR, sumI)}, z1 times z2 = ${cstr(prodR, prodI)}, and z1 divided by z2 = ${qPlain}.`,
        alternatives: [
          'Convert to polar form: multiply moduli and add arguments for the product, then divide moduli and subtract arguments for the quotient.',
          'Write z2 times (x + yi) = z1 and solve the two real linear equations for x and y.',
        ],
        mistakes: [
          'Forgetting that i squared equals -1 when expanding the product.',
          'Dividing only the real part by the denominator while leaving the imaginary part unchanged.',
          'Using c^2 + d^2 but forgetting to flip the sign of the imaginary part of the conjugate.',
        ],
        further: `Using your value of z1 divided by z2, compute its square and express the answer in the form p + qi.`,
      }
    },
  },

  {
    id: 'm1-polynomial-roots',
    domain: 'math',
    topicId: 'polynomials',
    title: 'Polynomial roots',
    level: 'Undergraduate 1',
    type: 'Derivation',
    concepts: ["Vieta's relations", 'discriminant', 'factorisation', 'quadratic formula'],
    build(rng, index) {
      let r = rng.int(-6, 6) + index - 2
      let s = rng.int(-6, 6) + index - 1
      if (r === s) s += 2 // keep two distinct roots
      if (r === 0 && s === 0) s = 1 // avoid the trivial zero polynomial

      const sum = r + s
      const prod = r * s
      const disc = sum * sum - 4 * prod // equals (r - s)^2
      const k = Math.round(Math.sqrt(disc))
      const rFac = `(x ${r < 0 ? '+' : '-'} ${Math.abs(r)})`
      const sFac = `(x ${s < 0 ? '+' : '-'} ${Math.abs(s)})`
      const expr = `x^2${signedCoef(-sum, 'x')}${signedCoef(prod, '')}`

      return {
        title: variantTitle('Polynomial roots', index),
        statement: `The polynomial P(x) = ${expr} has integer coefficients. Factor it, find both roots, and verify your answer using the sum and product of the roots.`,
        hints: [
          `For a monic quadratic x^2 + bx + c, the roots satisfy r1 + r2 = -b and r1 r2 = c. Here the coefficient of x is ${-sum}.`,
          `The discriminant is (${sum})^2 - 4(${prod}) = ${disc}, which is the perfect square ${k}^2.`,
          `The roots are (${sum} + ${k})/2 and (${sum} - ${k})/2; simplify these two fractions.`,
        ],
        steps: [
          {
            title: "Set up Vieta's relations",
            text: `The sum of the roots is ${sum} and their product is ${prod}.`,
            math: String.raw`r_1 + r_2 = -b = ${sum},\qquad r_1 r_2 = c = ${prod}`,
          },
          {
            title: 'Compute the discriminant',
            text: `The discriminant is (${sum})^2 - 4(${prod}) = ${disc}, the perfect square ${k}^2.`,
            math: String.raw`\Delta = (${sum})^2 - 4(${prod}) = ${disc} = ${k}^2`,
          },
          {
            title: 'Apply the quadratic formula',
            text: `For this monic polynomial the formula reduces to (${sum} plus or minus ${k})/2.`,
            math: String.raw`x = \frac{${sum} \pm ${k}}{2}`,
          },
          {
            title: 'Factor the polynomial',
            text: `The two linear factors are ${rFac} and ${sFac}.`,
            math: String.raw`P(x) = ${rFac}${sFac}`,
          },
          {
            title: 'Verify with Vieta',
            text: `Indeed ${r} + ${s} = ${sum} and ${r} times ${s} = ${prod}, matching the coefficients.`,
            math: String.raw`${r} + ${s} = ${sum},\qquad ${r}\cdot ${s} = ${prod}`,
          },
        ],
        answer: `The roots are x = ${r} and x = ${s}.`,
        alternatives: [
          'Solve by completing the square and then take square roots.',
          'Use the rational root theorem to test integer candidates, then divide the polynomial.',
        ],
        mistakes: [
          'A sign error in Vieta: taking r1 + r2 = b instead of -b.',
          'Computing the discriminant as b^2 + 4ac instead of b^2 - 4ac.',
          'Dropping one of the two roots after factoring.',
        ],
        further: `Find a monic cubic polynomial with integer coefficients whose roots are ${r}, ${s}, and ${r + s}.`,
      }
    },
  },

  {
    id: 'm1-quadratic-equations',
    domain: 'math',
    topicId: 'equations-inequalities',
    title: 'Quadratic equations',
    level: 'High school',
    type: 'Numerical',
    concepts: ['quadratic formula', 'discriminant', 'real roots', 'sign of a parabola'],
    build(rng, index) {
      const a = rng.int(1, 3)
      let b = rng.int(-6, 6) + index - 1
      let c = rng.int(-6, 6)
      let D = b * b - 4 * a * c
      while (D <= 0) {
        c -= 1
        D = b * b - 4 * a * c
      }
      const sqrtD = Math.sqrt(D)
      const k = Math.round(sqrtD)
      const isSquare = k * k === D
      const x1 = (-b + sqrtD) / (2 * a)
      const x2 = (-b - sqrtD) / (2 * a)
      const x1s = x1.toFixed(4)
      const x2s = x2.toFixed(4)
      const small = Math.min(x1, x2).toFixed(4)
      const large = Math.max(x1, x2).toFixed(4)
      const lead = a === 1 ? '' : String(a)
      const expr = `${lead}x^2${signedCoef(b, 'x')}${signedCoef(c, '')}`
      const exact = isSquare
        ? `${frac(-b + k, 2 * a)} and ${frac(-b - k, 2 * a)}`
        : `(${-b} plus or minus sqrt(${D}))/${2 * a}`

      return {
        title: variantTitle('Quadratic equations', index),
        statement: `Solve ${expr} = 0. Give the exact roots and decimal approximations, and state the interval on which the quadratic is negative.`,
        hints: [
          `Identify a = ${a}, b = ${b}, c = ${c} and compute the discriminant b^2 - 4ac.`,
          `The discriminant is ${D}, which is positive, so there are two distinct real roots.`,
          `Substitute into x = (${-b} plus or minus sqrt(${D}))/${2 * a}, then decide the sign using the fact that a is positive.`,
        ],
        steps: [
          {
            title: 'Identify coefficients',
            text: `Read off the coefficients of ${expr} = 0.`,
            math: String.raw`a = ${a},\qquad b = ${b},\qquad c = ${c}`,
          },
          {
            title: 'Compute the discriminant',
            text: `The discriminant is ${b}^2 - 4(${a})(${c}) = ${D}, which is positive, so two real roots exist.`,
            math: String.raw`\Delta = (${b})^2 - 4(${a})(${c}) = ${D} > 0`,
          },
          {
            title: 'Apply the quadratic formula',
            text: `Substitute the coefficients into the general formula.`,
            math: String.raw`x = \frac{${-b} \pm \sqrt{${D}}}{${2 * a}}`,
          },
          {
            title: 'Simplify the roots',
            text: isSquare
              ? `Since sqrt(${D}) = ${k}, the roots simplify to ${exact}.`
              : `Since sqrt(${D}) is not an integer, the exact roots keep the radical; numerically they are ${x1s} and ${x2s}.`,
            math: isSquare
              ? String.raw`\sqrt{${D}} = ${k},\quad x_1 = ${fracTex(-b + k, 2 * a)},\quad x_2 = ${fracTex(-b - k, 2 * a)}`
              : String.raw`\sqrt{${D}} \approx ${sqrtD.toFixed(4)},\quad x_1 \approx ${x1s},\quad x_2 \approx ${x2s}`,
          },
          {
            title: 'Determine where the quadratic is negative',
            text: `Because a = ${a} is positive, the parabola opens upward, so the expression is negative strictly between its roots.`,
            math: String.raw`${expr} < 0 \quad \text{for} \quad ${small} < x < ${large}`,
          },
        ],
        answer: `The roots are approximately ${x1s} and ${x2s} (exactly ${exact}); the quadratic is negative for x between ${small} and ${large}.`,
        alternatives: [
          'Solve by completing the square and taking square roots.',
          'When the discriminant is a perfect square, factor over the integers instead of using the formula.',
        ],
        mistakes: [
          'Using b^2 + 4ac instead of b^2 - 4ac inside the square root.',
          'Forgetting the plus-or-minus sign and reporting only one root.',
          'Dividing only one term of the numerator by 2a.',
        ],
        further: `Find the vertex of this parabola and the minimum value of the quadratic expression.`,
      }
    },
  },

  {
    id: 'm1-coordinate-geometry',
    domain: 'math',
    topicId: 'coordinate-systems',
    title: 'Coordinate geometry',
    level: 'High school',
    type: 'Numerical',
    concepts: ['distance formula', 'midpoint', 'slope', 'line equation'],
    build(rng, index) {
      const x1 = rng.int(-6, 6)
      const y1 = rng.int(-6, 6)
      let x2 = rng.int(-6, 6)
      const y2 = rng.int(-6, 6) + index - 1
      if (x1 === x2) x2 += 2 // avoid a vertical line and a zero slope denominator

      const dx = x2 - x1
      const dy = y2 - y1
      const d2 = dx * dx + dy * dy
      const dist = Math.sqrt(d2)
      const k = Math.round(dist)
      const isSquare = k * k === d2
      const mx = frac(x1 + x2, 2)
      const my = frac(y1 + y2, 2)
      const slope = frac(dy, dx)
      const interceptNum = y1 * dx - dy * x1
      const intercept = frac(interceptNum, dx)

      return {
        title: variantTitle('Coordinate geometry', index),
        statement: `The points P = (${x1}, ${y1}) and Q = (${x2}, ${y2}) are given. Find the distance PQ, the midpoint of PQ, the slope of line PQ, and the y-intercept of that line.`,
        hints: [
          `Start with the coordinate differences: delta x = ${dx} and delta y = ${dy}.`,
          `Distance uses the square root of delta x squared plus delta y squared; midpoint averages the coordinates.`,
          `Slope is delta y over delta x = ${slope}; then use y - y1 = m(x - x1) to solve for the intercept.`,
        ],
        steps: [
          {
            title: 'Coordinate differences',
            text: `Subtract the coordinates of P from those of Q.`,
            math: String.raw`\Delta x = ${x2} - (${x1}) = ${dx},\qquad \Delta y = ${y2} - (${y1}) = ${dy}`,
          },
          {
            title: 'Distance between the points',
            text: isSquare
              ? `The squared distance is ${d2}, a perfect square, so PQ = ${k}.`
              : `The squared distance is ${d2}, so PQ is approximately ${dist.toFixed(4)}.`,
            math: isSquare
              ? String.raw`PQ = \sqrt{${d2}} = ${k}`
              : String.raw`PQ = \sqrt{${d2}} \approx ${dist.toFixed(4)}`,
          },
          {
            title: 'Midpoint of the segment',
            text: `Average the two x-coordinates and the two y-coordinates.`,
            math: String.raw`M = \left(\frac{${x1} + ${x2}}{2}, \frac{${y1} + ${y2}}{2}\right) = (${fracTex(x1 + x2, 2)}, ${fracTex(y1 + y2, 2)})`,
          },
          {
            title: 'Slope of the line',
            text: `The slope is delta y divided by delta x, reduced to lowest terms.`,
            math: String.raw`m = \frac{\Delta y}{\Delta x} = \frac{${dy}}{${dx}} = ${fracTex(dy, dx)}`,
          },
          {
            title: 'Equation and y-intercept',
            text: `Using point-slope form with P, solve for y to read off the intercept ${intercept}.`,
            math: String.raw`y - ${y1} = ${fracTex(dy, dx)}(x - ${x1}) \;\Rightarrow\; y = ${fracTex(dy, dx)}x ${signedFracTex(interceptNum, dx, '')}`,
          },
        ],
        answer: `PQ = ${isSquare ? k : dist.toFixed(4)}, the midpoint is (${mx}, ${my}), the slope is ${slope}, and the y-intercept is ${intercept}.`,
        alternatives: [
          'Draw a right triangle on the grid and use Pythagoras for the distance.',
          'Use the two-point form of a line directly, then rearrange into slope-intercept form.',
        ],
        mistakes: [
          'Reversing the slope and computing delta x over delta y.',
          'Forgetting to average both coordinates when finding the midpoint.',
          'A sign error when solving y - y1 = m(x - x1) for the intercept.',
        ],
        further: `Find the equation of the line through the midpoint that is perpendicular to PQ, and compute its distance from the origin.`,
      }
    },
  },

  {
    id: 'm1-dimensional-analysis',
    domain: 'math',
    topicId: 'dimensional-analysis',
    title: 'Dimensional analysis',
    level: 'Undergraduate 1',
    type: 'Conceptual',
    concepts: ['fundamental dimensions', 'exponent equations', 'dimensional consistency', 'scaling'],
    build(rng, index) {
      const variants = [
        { dim: 'T', dimTex: String.raw`\mathrm{T}`, form: 'sqrt(L/g)', formTex: String.raw`\sqrt{L/g}`, alpha: 0, beta: 0, gamma: 1 },
        { dim: 'L T^-1', dimTex: String.raw`\mathrm{L}\mathrm{T}^{-1}`, form: 'sqrt(Lg)', formTex: String.raw`\sqrt{Lg}`, alpha: 1, beta: 0, gamma: -1 },
        { dim: 'M L T^-2', dimTex: String.raw`\mathrm{M}\mathrm{L}\mathrm{T}^{-2}`, form: 'mg', formTex: String.raw`mg`, alpha: 1, beta: 1, gamma: -2 },
        { dim: 'M L^2 T^-2', dimTex: String.raw`\mathrm{M}\mathrm{L}^{2}\mathrm{T}^{-2}`, form: 'mLg', formTex: String.raw`mLg`, alpha: 2, beta: 1, gamma: -2 },
        { dim: 'L T^-2', dimTex: String.raw`\mathrm{L}\mathrm{T}^{-2}`, form: 'g', formTex: String.raw`g`, alpha: 1, beta: 0, gamma: -2 },
      ]
      const v = variants[(rng.int(0, variants.length - 1) + index) % variants.length]
      const aNum = 2 * v.alpha + v.gamma // exponent of L is aNum/2
      const cNum = -v.gamma // exponent of g is cNum/2
      const L = Number((rng.num(0.5, 5, 2) + 0.01 * index).toFixed(2))
      const m = rng.num(0.5, 3, 2)
      const g = rng.num(9, 10, 2)
      const value = Math.pow(L, aNum / 2) * Math.pow(m, v.beta) * Math.pow(g, cNum / 2)

      return {
        title: variantTitle('Dimensional analysis', index),
        statement: `A quantity Q with dimensions ${v.dim} is believed to depend on a length L, a mass m, and gravitational acceleration g through Q proportional to L^a m^b g^c. Use dimensional analysis to find a, b, and c, write the resulting combination, and evaluate it for L = ${L}, m = ${m}, g = ${g}.`,
        hints: [
          'In dimensions, L contributes L, m contributes M, and g contributes L T^-2.',
          `Equating powers of M gives b = ${v.beta}; equate powers of T to find c.`,
          `Since -2c = ${v.gamma}, c = ${frac(cNum, 2)}; then match powers of L to get a = ${frac(aNum, 2)}.`,
        ],
        steps: [
          {
            title: 'Write the dimensions of each factor',
            text: `The building blocks have dimensions L, M, and L T^-2 respectively.`,
            math: String.raw`[L] = \mathrm{L},\qquad [m] = \mathrm{M},\qquad [g] = \mathrm{L}\mathrm{T}^{-2}`,
          },
          {
            title: 'Set up exponent equations',
            text: `Multiplying the powers gives L to the (a+c), M to the b, and T to the (-2c). This must match Q's dimensions ${v.dim}.`,
            math: String.raw`[L^a m^b g^c] = \mathrm{L}^{a+c}\mathrm{M}^{b}\mathrm{T}^{-2c} = ${v.dimTex}`,
          },
          {
            title: 'Solve for b',
            text: `Matching the powers of mass gives b = ${v.beta} directly.`,
            math: String.raw`b = ${v.beta}`,
          },
          {
            title: 'Solve for c and a',
            text: `Matching time gives -2c = ${v.gamma}, so c = ${frac(cNum, 2)}; matching length then gives a = ${frac(aNum, 2)}.`,
            math: String.raw`-2c = ${v.gamma} \;\Rightarrow\; c = ${fracTex(cNum, 2)},\qquad a = ${v.alpha} - c = ${fracTex(aNum, 2)}`,
          },
          {
            title: 'Write and evaluate the result',
            text: `The combination is proportional to ${v.form}; substituting the given numbers yields about ${value.toFixed(3)}.`,
            math: String.raw`Q \propto ${v.formTex},\qquad ${L}^{${fracTex(aNum, 2)}} ${m}^{${v.beta}} ${g}^{${fracTex(cNum, 2)}} \approx ${value.toFixed(3)}`,
          },
        ],
        answer: `a = ${frac(aNum, 2)}, b = ${v.beta}, c = ${frac(cNum, 2)}, so Q is proportional to ${v.form}; numerically the combination is about ${value.toFixed(3)}.`,
        alternatives: [
          'Solve the three exponent equations as a linear system in a, b, and c.',
          'Test each candidate combination by substituting the dimensions and checking consistency with Q.',
        ],
        mistakes: [
          'Forgetting that the proportionality constant is dimensionless and cannot change the dimensions.',
          'Assigning g the dimension L T^2 instead of L T^-2.',
          'Solving only two of the three exponent equations and ignoring the third.',
        ],
        further: `Repeat the analysis for a quantity with dimensions M L^2 T^-3, which corresponds to power.`,
      }
    },
  },

  {
    id: 'm1-numerical-approximation',
    domain: 'math',
    topicId: 'mathematical-approximation',
    title: 'Numerical approximation',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['Newton iteration', 'convergence', 'absolute error', 'relative error'],
    build(rng, index) {
      let N = rng.int(2, 200)
      while (Math.sqrt(N) % 1 === 0) N += 1 // avoid perfect squares

      let x = rng.int(1, 20) + index + 1 // always positive, so N/x is defined
      const xs = [x]
      for (let i = 0; i < 3; i++) {
        x = Number(((x + N / x) / 2).toFixed(6))
        xs.push(x)
      }
      const trueVal = Math.sqrt(N)
      const absErr = Math.abs(xs[3] - trueVal)
      const relErr = absErr / trueVal

      return {
        title: variantTitle('Numerical approximation', index),
        statement: `Use Newton's method (the Babylonian iteration x next = (x + N/x)/2) to approximate the square root of ${N}, starting from x0 = ${xs[0]}. Perform three iterations and report the absolute and relative errors against the true value.`,
        hints: [
          `Each step averages the current guess ${xs[0]} with N divided by that guess.`,
          'Keep at least six decimal places at every step so that the convergence is visible.',
          `Compare your third iterate with the calculator value of the square root of ${N}.`,
        ],
        steps: [
          {
            title: 'Set up the iteration',
            text: `The update rule uses N = ${N} and the starting guess ${xs[0]}.`,
            math: String.raw`x_{n+1} = \frac{1}{2}\left(x_n + \frac{${N}}{x_n}\right),\qquad x_0 = ${xs[0]}`,
          },
          {
            title: 'First iteration',
            text: `Averaging ${xs[0]} with ${N}/${xs[0]} gives ${xs[1]}.`,
            math: String.raw`x_1 = \frac{1}{2}\left(${xs[0]} + \frac{${N}}{${xs[0]}}\right) \approx ${xs[1].toFixed(6)}`,
          },
          {
            title: 'Second iteration',
            text: `Repeating the update with ${xs[1]} gives ${xs[2]}.`,
            math: String.raw`x_2 = \frac{1}{2}\left(${xs[1].toFixed(6)} + \frac{${N}}{${xs[1].toFixed(6)}}\right) \approx ${xs[2].toFixed(6)}`,
          },
          {
            title: 'Third iteration',
            text: `One more update gives ${xs[3]}, accurate to many decimal places.`,
            math: String.raw`x_3 = \frac{1}{2}\left(${xs[2].toFixed(6)} + \frac{${N}}{${xs[2].toFixed(6)}}\right) \approx ${xs[3].toFixed(6)}`,
          },
          {
            title: 'Error analysis',
            text: `The true value is about ${trueVal.toFixed(6)}; the absolute error is ${absErr.toFixed(8)} and the relative error is ${relErr.toFixed(8)}.`,
            math: String.raw`\sqrt{${N}} \approx ${trueVal.toFixed(6)},\qquad |x_3 - \sqrt{${N}}| \approx ${absErr.toFixed(8)}`,
          },
        ],
        answer: `After three iterations, the square root of ${N} is approximately ${xs[3].toFixed(6)} (true value ${trueVal.toFixed(6)}).`,
        alternatives: [
          'Use the linear approximation sqrt(a+h) about a nearby perfect square a.',
          'Apply the secant method to the equation x^2 - N = 0.',
        ],
        mistakes: [
          'Using (x + N)/2 instead of averaging x with N/x.',
          'Starting from x0 = 0, which makes the term N/x0 undefined.',
          'Rounding too aggressively between iterations and destroying the quadratic convergence.',
        ],
        further: `How many iterations would be needed to guarantee an absolute error below 10^-10? Explain your reasoning.`,
      }
    },
  },
]

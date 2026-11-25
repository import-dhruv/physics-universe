import type { GeneratedFamily } from './types'

// Deterministic generated families for the mathematics topics (set 2).
// Every family produces a self-contained, fully solvable variant from its RNG
// and variant index; all displayed numbers are computed in code.

function gcd(a: number, b: number): number {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    const t = x % y
    x = y
    y = t
  }
  return x || 1
}

function frac(n: number, d: number): string {
  const g = gcd(n, d)
  return String.raw`\frac{${n / g}}{${d / g}}`
}

/** Drop a redundant leading coefficient of one when displaying a term. */
function c(n: number): string {
  return n === 1 ? '' : String(n)
}

export const MATH_FAMILIES_2: GeneratedFamily[] = [
  {
    id: 'm2-evaluating-limits',
    domain: 'math',
    topicId: 'limits-continuity',
    title: 'Evaluating limits',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['factoring', '0/0 forms', 'limits at infinity', 'one-sided limits'],
    build(rng, index) {
      const a = rng.int(1, 6) + index
      const b = a + rng.int(1, 4)
      const p = rng.int(2, 7)
      let q = rng.int(2, 7)
      if (q === p) q += 1
      const sum = a + b
      const prod = a * b
      const lim = a - b
      return {
        statement: "Let a = " + a + ", b = " + b + ", p = " + p + " and q = " + q + ". Define f(x) = (x^2 - " + sum + "x + " + prod + ")/(x - " + a + ") for x not equal to " + a + ", and g(x) = (" + p + "x^2 + 3x + 1)/(" + q + "x^2 - 2x + 5). (1) Find the limit of f(x) as x tends to " + a + ". (2) Find the limit of g(x) as x tends to infinity. (3) For h(x) = |x - " + a + "|/(x - " + a + "), find the left- and right-hand limits at x = " + a + " and state whether the two-sided limit exists.",
        hints: [
          "The numerator of f factors as (x - a)(x - b); cancel the common factor before substituting x = a.",
          "For the limit at infinity, divide the numerator and denominator of g by x squared and let the reciprocal terms vanish.",
          "Write |x - a| as x - a when x is greater than a and as a - x when x is less than a; the ratio then becomes plus or minus one.",
        ],
        steps: [
          { title: "Factor the numerator", text: "The quadratic is built from the roots a and b, so it splits into two linear factors.", math: String.raw`x^2-${sum}x+${prod}=(x-${a})(x-${b})` },
          { title: "Cancel and substitute", text: "For x different from a the common factor may be cancelled, and the resulting linear function can be evaluated directly.", math: String.raw`\lim_{x\to ${a}}\frac{x^2-${sum}x+${prod}}{x-${a}}=\lim_{x\to ${a}}(x-${b})=${a}-${b}=${lim}` },
          { title: "Limit at infinity", text: "Divide numerator and denominator by x squared; every term containing 1/x tends to zero.", math: String.raw`\lim_{x\to\infty}\frac{${p}x^2+3x+1}{${q}x^2-2x+5}=\lim_{x\to\infty}\frac{${p}+\frac{3}{x}+\frac{1}{x^2}}{${q}-\frac{2}{x}+\frac{5}{x^2}}=\frac{${p}}{${q}}` },
          { title: "One-sided behaviour of h", text: "The absolute value changes sign across x = a, giving a different constant on each side.", math: String.raw`x>${a}\Rightarrow \frac{|x-${a}|}{x-${a}}=1,\qquad x<${a}\Rightarrow \frac{|x-${a}|}{x-${a}}=-1` },
          { title: "Conclusion for h", text: "The one-sided limits disagree, so the two-sided limit does not exist.", math: String.raw`\lim_{x\to ${a}^+}\frac{|x-${a}|}{x-${a}}=1,\qquad \lim_{x\to ${a}^-}\frac{|x-${a}|}{x-${a}}=-1,\qquad 1\ne -1` },
        ],
        answer: String.raw`\lim_{x\to ${a}}f(x)=${lim};\quad \lim_{x\to\infty}g(x)=\frac{${p}}{${q}};\quad \text{one-sided limits }1\text{ and }-1,\ \text{two-sided limit does not exist}.`,
        alternatives: [
          "Apply L'Hopital's rule to the first limit: differentiating numerator and denominator gives 2a - (a + b), which equals a - b.",
          "For the limit at infinity, compare only the leading x squared terms; for large x they dominate all lower powers, so the ratio tends to p/q.",
        ],
        mistakes: [
          "Substituting x = a straight into the original fraction and reporting the indeterminate form 0/0 as the limit.",
          "Taking the ratio of the x coefficients 3 and -2 for the limit at infinity instead of the x squared coefficients.",
          "Averaging the one-sided limits of h to get zero; unequal one-sided limits mean the two-sided limit does not exist.",
        ],
        further: "Find every value of k for which the limit as x tends to 2 of (x^2 - kx + 4)/(x - 2) exists, and evaluate the limit for each such k. Then state the general condition on a numerator and denominator that makes a limit at a root of the denominator removable.",
      }
    },
  },
  {
    id: 'm2-derivatives-elementary',
    domain: 'math',
    topicId: 'differential-calculus',
    title: 'Derivatives of elementary functions',
    level: 'Undergraduate 1',
    type: 'Derivation',
    concepts: ['power rule', 'exponential derivative', 'trigonometric derivative', 'chain rule', 'tangent line'],
    build(rng, index) {
      const A = rng.int(1, 3) + index
      const B = rng.int(2, 5)
      const C = rng.int(1, 4)
      const k = rng.int(1, 3)
      const m = rng.int(1, 3)
      const isSin = rng.pick([true, false])
      const slope = isSin ? B * k + C * m : B * k
      const f0 = isSin ? B : B + C
      const kx = k === 1 ? 'x' : `${k}x`
      const mx = m === 1 ? 'x' : `${m}x`
      const kxPlain = kx
      const mxPlain = mx
      const cmCoef = C * m === 1 ? '' : String(C * m)
      const bkCoef = B * k === 1 ? '' : String(B * k)
      const trigDerivTex = isSin
        ? String.raw`+${cmCoef}\cos(${mx})`
        : String.raw`-${cmCoef}\sin(${mx})`
      return {
        statement: "Let f(x) = " + c(A) + "x^3 + " + B + "e^(" + kxPlain + ") + " + C + " " + (isSin ? "sin" : "cos") + "(" + mxPlain + "). (a) Find f'(x). (b) Find the slope of the tangent line to y = f(x) at x = 0. (c) Write the equation of that tangent line.",
        hints: [
          "Differentiate the three terms separately; the derivative of a sum is the sum of the derivatives.",
          "Include the chain-rule factors: the derivative of e^(kx) is k times e^(kx), and the derivative of sin(mx) is m times cos(mx), while the derivative of cos(mx) is minus m times sin(mx).",
          "At x = 0, e^0 = 1, sin 0 = 0 and cos 0 = 1; then use y = f(0) + f'(0)x for the tangent line.",
        ],
        steps: [
          { title: "Polynomial term", text: "Apply the power rule to the cubic term.", math: String.raw`\frac{d}{dx}\left(${c(A)}x^3\right)=${3 * A}x^2` },
          { title: "Exponential term", text: "The chain rule supplies the factor k from the exponent.", math: String.raw`\frac{d}{dx}\left(${B}e^{${kx}}\right)=${B}\cdot ${k}e^{${kx}}=${bkCoef}e^{${kx}}` },
          { title: "Trigonometric term", text: isSin ? "The derivative of sine is cosine, with the chain-rule factor m." : "The derivative of cosine is minus sine, with the chain-rule factor m.", math: isSin ? String.raw`\frac{d}{dx}\left(${C}\sin(${mx})\right)=${C}\cdot ${m}\cos(${mx})=${cmCoef}\cos(${mx})` : String.raw`\frac{d}{dx}\left(${C}\cos(${mx})\right)=-${C}\cdot ${m}\sin(${mx})=-${cmCoef}\sin(${mx})` },
          { title: "Combine the terms", text: "Add the three derivatives to obtain f'(x).", math: String.raw`f'(x)=${3 * A}x^2+${bkCoef}e^{${kx}}${trigDerivTex}` },
          { title: "Tangent line at zero", text: "Evaluate f and f' at zero, then insert them into the point-slope form with x-coordinate zero.", math: isSin ? String.raw`f(0)=${B},\qquad f'(0)=${B * k}+${C * m}=${slope},\qquad y=${f0}+${slope}x` : String.raw`f(0)=${B}+${C}=${f0},\qquad f'(0)=${B * k}-${C * m}\sin 0=${slope},\qquad y=${f0}+${slope}x` },
        ],
        answer: String.raw`f'(x)=${3 * A}x^2+${bkCoef}e^{${kx}}${trigDerivTex};\quad f'(0)=${slope};\quad y=${f0}+${slope}x.`,
        alternatives: [
          "Compute the derivative at zero from the difference quotient and evaluate the three resulting limits separately.",
          "Check the tangent line numerically: for small h, compare f(h) with f(0) + f'(0)h and confirm the difference is of order h squared.",
        ],
        mistakes: [
          "Omitting the chain-rule factor k in the exponential term and writing B e^(kx) instead of Bk e^(kx).",
          "Dropping the minus sign when differentiating the cosine term.",
          "Writing the tangent line as y = f'(0)x and forgetting the constant term f(0).",
        ],
        further: "Compute f''(0) for your function and decide whether the graph is concave up at the origin. Explain exactly how the choice of sine rather than cosine changes the conclusion, and what role the cubic term plays.",
      }
    },
  },
  {
    id: 'm2-product-quotient',
    domain: 'math',
    topicId: 'differential-calculus',
    title: 'Product and quotient rules',
    level: 'Undergraduate 1',
    type: 'Derivation',
    concepts: ['product rule', 'quotient rule', 'evaluating derivatives', 'rational functions'],
    build(rng, index) {
      const A = rng.int(1, 3) + index
      const B = rng.int(2, 5)
      const C = rng.int(1, 3)
      const D = rng.int(2, 5)
      const E = rng.int(1, 3)
      const F = rng.int(1, 3)
      const G = rng.int(2, 4)
      const f1 = 2 * A * (1 + C) + (A + B) * (3 + C)
      const DF = D * F
      const twoDG = 2 * D * G
      const FE = F * E
      const num1 = DF + twoDG - FE
      const den2 = (F + G) * (F + G)
      const g1 = frac(num1, den2)
      return {
        statement: "Let f(x) = (" + c(A) + "x^2 + " + B + ")(x^3 + " + c(C) + "x) and g(x) = (" + c(D) + "x^2 + " + E + ")/(" + c(F) + "x + " + G + "). (a) Find f'(x) and evaluate it at x = 1. (b) Find g'(x) and evaluate it at x = 1, giving the result as a fraction in lowest terms.",
        hints: [
          "For f use (uv)' = u'v + uv' with u = Ax^2 + B and v = x^3 + Cx.",
          "For g use (u/v)' = (u'v - uv')/v squared; the denominator of the derivative is the square of the original denominator.",
          "Substitute x = 1 only after differentiating: f'(1) = 2A(1 + C) + (A + B)(3 + C).",
        ],
        steps: [
          { title: "Identify the product factors", text: "Name the two factors and compute their individual derivatives.", math: String.raw`u=${c(A)}x^2+${B},\quad v=x^3+${c(C)}x,\quad u'=${2 * A}x,\quad v'=3x^2+${C}` },
          { title: "Apply the product rule", text: "Assemble u'v plus uv' without expanding first.", math: String.raw`f'(x)=(${2 * A}x)(x^3+${c(C)}x)+(${c(A)}x^2+${B})(3x^2+${C})` },
          { title: "Evaluate f' at one", text: "Substitute x = 1 into the product-rule expression and simplify to an integer.", math: String.raw`f'(1)=${2 * A}(1+${C})+(${A}+${B})(3+${C})=${f1}` },
          { title: "Apply the quotient rule", text: "Put the derivative of the numerator times the denominator minus the numerator times the derivative of the denominator over the denominator squared.", math: String.raw`g'(x)=\frac{(${2 * D}x)(${c(F)}x+${G})-${F}(${c(D)}x^2+${E})}{(${c(F)}x+${G})^2}` },
          { title: "Simplify and evaluate g'", text: "Collect like terms in the numerator, then substitute x = 1 and reduce the fraction.", math: String.raw`g'(x)=\frac{${DF}x^2+${twoDG}x-${FE}}{(${c(F)}x+${G})^2},\qquad g'(1)=\frac{${num1}}{${den2}}=${g1}` },
        ],
        answer: String.raw`f'(x)=(${2 * A}x)(x^3+${c(C)}x)+(${c(A)}x^2+${B})(3x^2+${C}),\quad f'(1)=${f1};\qquad g'(x)=\frac{${DF}x^2+${twoDG}x-${FE}}{(${c(F)}x+${G})^2},\quad g'(1)=${g1}.`,
        alternatives: [
          "Expand f into a single polynomial and differentiate term by term; the result must agree with the product rule.",
          "Approximate g'(1) with the difference quotient (g(1.001) - g(1))/0.001 and compare with the exact fraction.",
        ],
        mistakes: [
          "Forgetting to square the denominator in the quotient rule and leaving (Fx + G) instead of (Fx + G)^2.",
          "Treating the product as a composition and keeping only one of the two product-rule terms.",
          "Substituting x = 1 into f and g before differentiating instead of into the derivatives.",
        ],
        further: "Find all real x where g'(x) = 0 and determine whether g has a horizontal tangent there. Then decide whether f'(x) = 0 has any real solutions for your coefficients, justifying your answer from the sign of each term.",
      }
    },
  },
  {
    id: 'm2-indefinite-integrals',
    domain: 'math',
    topicId: 'integral-calculus',
    title: 'Indefinite integrals',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['linearity of integration', 'power rule', 'logarithm integral', 'exponential integral', 'constant of integration'],
    build(rng, index) {
      const alpha = rng.int(1, 2) + index
      const B = rng.int(2, 5)
      const k = rng.int(1, 3) + (index % 2)
      const cMult = rng.int(2, 4)
      const C = k * cMult
      const m = rng.int(1, 3) + ((index >> 1) % 2)
      const dMult = rng.int(2, 4)
      const D = m * dMult
      const A = 4 * alpha
      return {
        statement: "Evaluate the indefinite integral of " + A + "x^3 + " + B + "/x + " + C + "e^(" + k + "x) + " + D + "cos(" + m + "x) with respect to x, for x > 0. Include the constant of integration.",
        hints: [
          "Integrate term by term; the integral of a sum equals the sum of the integrals.",
          "Use the integral of x cubed, the integral of 1/x on x > 0, and remember the factors 1/k and 1/m coming from the exponential and cosine terms.",
          "Differentiate your answer term by term as a check; each derivative must reproduce the original integrand exactly.",
        ],
        steps: [
          { title: "Split the integral", text: "Linearity separates the integrand into four elementary pieces.", math: String.raw`\int\left(${A}x^3+\frac{${B}}{x}+${C}e^{${k}x}+${D}\cos(${m}x)\right)dx=${A}\int x^3dx+${B}\int\frac{dx}{x}+${C}\int e^{${k}x}dx+${D}\int\cos(${m}x)dx` },
          { title: "Power and logarithm terms", text: "The cubic gives a quartic and the reciprocal gives a logarithm; coefficients were chosen so the quartic coefficient is an integer.", math: String.raw`${A}\int x^3dx=\frac{${A}}{4}x^4=${c(alpha)}x^4,\qquad ${B}\int\frac{dx}{x}=${B}\ln x` },
          { title: "Exponential term", text: "Substitute u = kx to see the factor 1/k.", math: String.raw`\int e^{${k}x}dx=\frac{1}{${k}}e^{${k}x}\quad\Rightarrow\quad ${C}\int e^{${k}x}dx=${cMult}e^{${k}x}` },
          { title: "Cosine term", text: "Substitute u = mx to see the factor 1/m.", math: String.raw`\int\cos(${m}x)dx=\frac{1}{${m}}\sin(${m}x)\quad\Rightarrow\quad ${D}\int\cos(${m}x)dx=${dMult}\sin(${m}x)` },
          { title: "Assemble the antiderivative", text: "Combine the four pieces and add an arbitrary constant.", math: String.raw`\int\left(${A}x^3+\frac{${B}}{x}+${C}e^{${k}x}+${D}\cos(${m}x)\right)dx=${c(alpha)}x^4+${B}\ln x+${cMult}e^{${k}x}+${dMult}\sin(${m}x)+K` },
        ],
        answer: String.raw`${c(alpha)}x^4+${B}\ln x+${cMult}e^{${k}x}+${dMult}\sin(${m}x)+K`,
        alternatives: [
          "Verify the result by differentiating each term: the derivative of the proposed antiderivative must equal the integrand.",
          "Perform the substitutions u = kx and u = mx explicitly for the last two terms before integrating them.",
        ],
        mistakes: [
          "Forgetting the factor 1/k when integrating e^(kx), so reporting C times e^(kx) instead of C/k times e^(kx).",
          "Writing the integral of 1/x as ln x without noting the restriction x > 0 (or the absolute value for negative x).",
          "Omitting the arbitrary constant K from an indefinite integral.",
        ],
        further: "Evaluate the definite integral of the same integrand from x = 1 to x = 2. Which term needs the most care because of the logarithm, and exactly what happens to the constant K when the limits are applied?",
      }
    },
  },
  {
    id: 'm2-definite-integrals',
    domain: 'math',
    topicId: 'integral-calculus',
    title: 'Definite integrals',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['Fundamental Theorem', 'antiderivative', 'signed area', 'quadratic integrand'],
    build(rng, index) {
      const a = rng.int(-3, 1) + (index % 2)
      const b = a + rng.int(2, 5)
      const alpha = rng.int(1, 3) + index
      let beta = rng.int(-2, 3) + (index % 2)
      if (beta === 0) beta = 1
      const C = rng.int(1, 5)
      const A = 3 * alpha
      const B = 2 * beta
      const sB = B < 0 ? `- ${-B}` : `+ ${B}`
      const sC = `+ ${C}`
      const sBetaTex = beta < 0 ? `- ${-beta}` : `+ ${beta}`
      const Fa = alpha * a * a * a + beta * a * a + C * a
      const Fb = alpha * b * b * b + beta * b * b + C * b
      const value = Fb - Fa
      return {
        statement: "Let a = " + a + " and b = " + b + ". Evaluate the definite integral from x = " + a + " to x = " + b + " of " + A + "x^2 " + sB + "x " + sC + ". The coefficients are multiples of three and two so that the antiderivative has integer coefficients.",
        hints: [
          "Find an antiderivative first: the integral of x squared is x cubed over three, and the integral of x is x squared over two.",
          "Evaluate the antiderivative at the upper limit and subtract its value at the lower limit, in that order.",
          "Both limits may be negative; compute the cubic and quadratic values carefully before subtracting.",
        ],
        steps: [
          { title: "Find the antiderivative", text: "The factors three and two cancel the denominators from the power rule.", math: String.raw`\int\left(${A}x^2 ${sB}x ${sC}\right)dx=${alpha}x^3${sBetaTex}x^2+${C}x+K` },
          { title: "Value at the upper limit", text: "Substitute x = b into the antiderivative.", math: String.raw`F(${b})=${alpha}(${b})^3${sBetaTex}(${b})^2+${C}(${b})=${Fb}` },
          { title: "Value at the lower limit", text: "Substitute x = a into the same antiderivative.", math: String.raw`F(${a})=${alpha}(${a})^3${sBetaTex}(${a})^2+${C}(${a})=${Fa}` },
          { title: "Apply the Fundamental Theorem", text: "Subtract the lower-limit value from the upper-limit value.", math: String.raw`\int_{${a}}^{${b}}\left(${A}x^2 ${sB}x ${sC}\right)dx=F(${b})-F(${a})=${Fb}-(${Fa})=${value}` },
          { title: "Interpret the sign", text: "The result is a signed area; a negative value would mean the graph lies mostly below the x axis on this interval.", math: String.raw`\text{Signed area on }[${a},${b}]\text{ equals }${value}` },
        ],
        answer: String.raw`\int_{${a}}^{${b}}\left(${A}x^2 ${sB}x ${sC}\right)dx=${value}`,
        alternatives: [
          "Integrate each monomial over the interval separately and add the three resulting numbers.",
          "Approximate with a Riemann sum using several subintervals to check that the sign and rough magnitude of the exact value are plausible.",
        ],
        mistakes: [
          "Reversing the subtraction and computing F(a) minus F(b), which changes the sign of the answer.",
          "Reporting only F(b) and forgetting to subtract the lower-limit value.",
          "Using x cubed over three for the first term even though the coefficient is already a multiple of three, so losing a factor of three.",
        ],
        further: "Keeping a fixed, find a value of b greater than a for which this definite integral equals zero. Explain geometrically what must happen to the signed area for that to occur.",
      }
    },
  },
  {
    id: 'm2-multivariable-functions',
    domain: 'math',
    topicId: 'multivariable-calculus',
    title: 'Multivariable functions',
    level: 'Undergraduate 2',
    type: 'Conceptual',
    concepts: ['level curves', 'domain and range', 'quadratic form', 'ellipses', 'contours'],
    build(rng, index) {
      const a = rng.num(1, 3, 0)
      const b = rng.int(2, 4) + index
      const m = rng.int(1, 3)
      const n = rng.int(1, 3) + ((index >> 1) % 2)
      const x0 = a * m
      const y0 = b * n
      const val = m * m + n * n
      const cLabel = rng.pick(['level curve', 'contour line'])
      return {
        statement: "Consider the function f(x,y) = x^2/" + a + "^2 + y^2/" + b + "^2. (a) Compute f(" + x0 + ", " + y0 + "). (b) Write the equation of the " + cLabel + " through that point and find its intercepts with the coordinate axes. (c) For which real numbers c is the level set f = c empty, and what exactly is the level set when c = 0?",
        hints: [
          "The point was chosen as x = a times m and y = b times n, so the two fractions simplify to m squared and n squared.",
          "A level curve is the set of all points where f has a fixed value; use the number from part (a) as that value.",
          "Both terms in f are squares divided by positive numbers, so their sum can never be negative.",
        ],
        steps: [
          { title: "Evaluate the function", text: "Substitute the given point; the scaling of the coordinates makes the fractions integers.", math: String.raw`f(${x0},${y0})=\frac{${x0}^2}{${a}^2}+\frac{${y0}^2}{${b}^2}=${m}^2+${n}^2=${val}` },
          { title: "Level curve through the point", text: "Hold the function value fixed at the number just computed.", math: String.raw`\text{${cLabel}}\quad \frac{x^2}{${a}^2}+\frac{y^2}{${b}^2}=${val}` },
          { title: "Axis intercepts", text: "Set y = 0 for the x-intercepts and x = 0 for the y-intercepts.", math: String.raw`y=0\Rightarrow x=\pm ${x0};\qquad x=0\Rightarrow y=\pm ${y0}` },
          { title: "Existence of level sets", text: "Non-negativity rules out negative levels, and zero is achieved only at the origin.", math: String.raw`\frac{x^2}{${a}^2}+\frac{y^2}{${b}^2}\ge 0\quad\Rightarrow\quad c<0\text{ has no points},\quad c=0\Rightarrow (x,y)=(0,0)` },
          { title: "Shape for positive levels", text: "For positive c the curve is an ellipse whose semi-axes scale with the square root of c.", math: String.raw`c>0\quad\Rightarrow\quad \frac{x^2}{(${a}\sqrt{c})^2}+\frac{y^2}{(${b}\sqrt{c})^2}=1\quad\text{(ellipse)}` },
        ],
        answer: String.raw`f(${x0},${y0})=${val};\quad \frac{x^2}{${a}^2}+\frac{y^2}{${b}^2}=${val},\ \text{intercepts }(\pm ${x0},0),(0,\pm ${y0});\quad \text{empty for }c<0,\ \{(0,0)\}\ \text{for }c=0.`,
        alternatives: [
          "Rescale coordinates by u = x/a and v = y/b; then f = u squared plus v squared and the contours are circles in the uv plane.",
          "Sketch the levels c = 1, c = 4 and c = 9 to see that they are similar ellipses centred at the origin, growing like the square root of c.",
        ],
        mistakes: [
          "Confusing a level curve in the xy plane with the surface z = f(x,y) in three dimensions.",
          "Setting x = 0 when looking for the x-intercepts instead of setting y = 0.",
          "Claiming the level set is empty only for negative integer c; it is empty for every negative real c.",
        ],
        further: "Replace f by g(x,y) = x^2/a^2 - y^2/b^2. Describe the level sets g = c separately for c positive, zero and negative, and explain why changing the sign produces hyperbolas instead of ellipses.",
      }
    },
  },
  {
    id: 'm2-partial-derivatives',
    domain: 'math',
    topicId: 'partial-derivatives',
    title: 'Partial derivatives',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['partial derivative', 'holding variables constant', 'power rule', 'gradient vector'],
    build(rng, index) {
      const A = rng.int(1, 3) + index
      const B = rng.int(2, 5)
      const C = rng.int(1, 3)
      const D = rng.int(1, 3) + ((index >> 1) % 2)
      const x0 = rng.int(1, 3)
      const y0 = rng.int(1, 2)
      const fx = 3 * A * x0 * x0 * y0 * y0 + B * y0 + 2 * D * x0
      const fy = 2 * A * x0 * x0 * x0 * y0 + B * x0 + 3 * C * y0 * y0
      return {
        statement: "Let f(x,y) = " + c(A) + "x^3y^2 + " + B + "xy + " + c(C) + "y^3 + " + c(D) + "x^2. Find the partial derivatives f_x and f_y, then evaluate both at the point (" + x0 + ", " + y0 + ").",
        hints: [
          "When differentiating with respect to x treat y as a constant, and when differentiating with respect to y treat x as a constant.",
          "Apply the power rule to each monomial separately; a term involving only the other variable differentiates to zero.",
          "Find the general partial derivatives first and substitute the point only at the end.",
        ],
        steps: [
          { title: "Partial derivative with respect to x", text: "Differentiate term by term while holding y fixed; the y cubed term disappears.", math: String.raw`\frac{\partial f}{\partial x}=${3 * A}x^2y^2+${B}y+0+${2 * D}x` },
          { title: "Partial derivative with respect to y", text: "Now hold x fixed; the x squared term disappears.", math: String.raw`\frac{\partial f}{\partial y}=${2 * A}x^3y+${B}x+${3 * C}y^2+0` },
          { title: "Evaluate f_x at the point", text: "Insert x = x0 and y = y0 into the first partial derivative.", math: String.raw`f_x(${x0},${y0})=${3 * A}(${x0})^2(${y0})^2+${B}(${y0})+${2 * D}(${x0})=${fx}` },
          { title: "Evaluate f_y at the point", text: "Insert the same coordinates into the second partial derivative.", math: String.raw`f_y(${x0},${y0})=${2 * A}(${x0})^3(${y0})+${B}(${x0})+${3 * C}(${y0})^2=${fy}` },
          { title: "Gradient vector", text: "The two partial derivatives are the components of the gradient at that point.", math: String.raw`\nabla f(${x0},${y0})=\langle ${fx},\ ${fy}\rangle` },
        ],
        answer: String.raw`f_x=${3 * A}x^2y^2+${B}y+${2 * D}x,\quad f_y=${2 * A}x^3y+${B}x+${3 * C}y^2;\quad f_x(${x0},${y0})=${fx},\quad f_y(${x0},${y0})=${fy}.`,
        alternatives: [
          "Use the limit definition of the partial derivative with a small increment and expand to confirm the power-rule result.",
          "Compute the gradient vector first from the general formulas and then read off its two components at the point.",
        ],
        mistakes: [
          "Differentiating the term C y cubed with respect to x and writing 3C y squared instead of zero.",
          "Forgetting the factor two when differentiating D x squared with respect to x.",
          "Swapping the two partial derivatives, so reporting f_y where f_x was requested.",
        ],
        further: "Find all points where both partial derivatives vanish simultaneously for your coefficients. Are such points critical points, and how would you classify them using the second-derivative test?",
      }
    },
  },
  {
    id: 'm2-double-integrals',
    domain: 'math',
    topicId: 'multiple-integrals',
    title: 'Double integrals',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['iterated integrals', 'rectangular region', 'Fubini theorem', 'volume under a plane'],
    build(rng, index) {
      const alpha = rng.int(1, 3) + index
      const beta = rng.int(1, 3) + ((index >> 1) % 2)
      const p = rng.int(2, 4)
      const q = rng.int(2, 4)
      const A = 2 * alpha
      const B = 2 * beta
      const termX = alpha * p * p * q
      const termY = beta * p * q * q
      const result = termX + termY
      return {
        statement: "Let R be the rectangle defined by 0 <= x <= " + p + " and 0 <= y <= " + q + ". Evaluate the double integral over R of " + A + "x + " + B + "y, first integrating with respect to y and then x, and then confirm the same value by reversing the order.",
        hints: [
          "For fixed x, integrate with respect to y from 0 to q, treating x as a constant.",
          "The inner integral of 2 beta times y from 0 to q equals beta times q squared.",
          "After the outer integration the answer factors as p q (alpha p + beta q).",
        ],
        steps: [
          { title: "Set up the iterated integral", text: "Write the integral over the rectangle with y as the inner variable.", math: String.raw`\iint_R (${A}x+${B}y)\,dA=\int_0^{${p}}\int_0^{${q}}(${A}x+${B}y)\,dy\,dx` },
          { title: "Inner integral in y", text: "The x term is constant in y and the y term integrates to a square.", math: String.raw`\int_0^{${q}}(${A}x+${B}y)\,dy=\left[${A}xy+${beta}y^2\right]_{0}^{${q}}=${A * q}x+${beta * q * q}` },
          { title: "Outer integral in x", text: "Integrate the resulting linear function of x over 0 to p.", math: String.raw`\int_0^{${p}}(${A * q}x+${beta * q * q})\,dx=\left[${alpha * q}x^2+${beta * q * q}x\right]_{0}^{${p}}=${termX}+${termY}=${result}` },
          { title: "Reverse the order", text: "Integrate first in x; the antiderivative is alpha x squared plus B y x.", math: String.raw`\int_0^{${p}}(${A}x+${B}y)\,dx=\left[${c(alpha)}x^2+${B}yx\right]_{0}^{${p}}=${alpha * p * p}+${B * p}y` },
          { title: "Finish the reversed integral", text: "Integrate the expression in y and confirm it matches.", math: String.raw`\int_0^{${q}}\left(${alpha * p * p}+${B * p}y\right)dy=${termX}+${termY}=${result}` },
          { title: "Factored form", text: "Both orders give the same value, which factors neatly.", math: String.raw`\iint_R(${A}x+${B}y)\,dA=${p * q}(${alpha * p}+${beta * q})=${result}` },
        ],
        answer: String.raw`\iint_R(${A}x+${B}y)\,dA=${result}`,
        alternatives: [
          "Compute the integrals of 2 alpha x and 2 beta y separately; each factors into a product of one-dimensional integrals.",
          "Interpret the value as the volume under the plane z = 2 alpha x + 2 beta y; the average height over the rectangle times its area gives the same answer.",
        ],
        mistakes: [
          "Forgetting that the 2 alpha x term is constant in y and contributes 2 alpha x q to the inner integral.",
          "Using q as the upper limit for x instead of p when setting up the iterated integral.",
          "Losing the factor one half when integrating 2 alpha q x, giving 2 alpha q p squared instead of alpha q p squared.",
        ],
        further: "Replace R by the triangle 0 <= y <= x <= p (so take q = p). Set up and evaluate the double integral of the same integrand over that triangle, and explain why the limits in the iterated integral must change.",
      }
    },
  },
  {
    id: 'm2-gradient-div-curl',
    domain: 'math',
    topicId: 'vector-calculus',
    title: 'Gradient divergence and curl',
    level: 'Undergraduate 3',
    type: 'Theoretical',
    concepts: ['gradient', 'divergence', 'curl', 'scalar field', 'vector field'],
    build(rng, index) {
      const A = rng.int(1, 3) + index
      const B = rng.int(1, 3)
      const C = rng.int(1, 3) + ((index >> 1) % 2)
      const x0 = rng.int(1, 2)
      const y0 = rng.int(1, 2)
      const z0 = rng.int(1, 2)
      const gx = 2 * A * x0 * y0 + C * z0
      const gy = A * x0 * x0 + B * z0 * z0
      const gz = 2 * B * y0 * z0 + C * x0
      const div = A * y0 + B * z0 + C * x0
      const cx = -B * y0
      const cy = -C * z0
      const cz = -A * x0
      return {
        statement: "Let phi(x,y,z) = " + c(A) + "x^2y + " + B + "yz^2 + " + C + "xz and let F(x,y,z) = (" + c(A) + "xy, " + B + "yz, " + C + "xz). At the point (" + x0 + ", " + y0 + ", " + z0 + ") find (a) the gradient of phi, (b) the divergence of F, and (c) the curl of F.",
        hints: [
          "The gradient has components consisting of the three partial derivatives of phi; differentiate with respect to one variable at a time.",
          "Divergence is the sum of the three partial derivatives of the components of F and is a scalar, while curl is a vector built from cross partials.",
          "Each component of F is missing one coordinate, so several of the partial derivatives in the curl are zero.",
        ],
        steps: [
          { title: "Partial derivatives of phi", text: "Differentiate the scalar field with respect to x, y and z separately.", math: String.raw`\phi_x=${2 * A}xy+${C}z,\qquad \phi_y=${c(A)}x^2+${B}z^2,\qquad \phi_z=${2 * B}yz+${C}x` },
          { title: "Gradient at the point", text: "Collect the three partials into a vector and substitute the coordinates.", math: String.raw`\nabla\phi(${x0},${y0},${z0})=\langle ${gx},\ ${gy},\ ${gz}\rangle` },
          { title: "Divergence formula", text: "Differentiate the first component in x, the second in y and the third in z, then add.", math: String.raw`\nabla\cdot F=\frac{\partial}{\partial x}(${c(A)}xy)+\frac{\partial}{\partial y}(${B}yz)+\frac{\partial}{\partial z}(${C}xz)=${c(A)}y+${B}z+${C}x` },
          { title: "Divergence at the point", text: "Substitute the coordinates into the scalar expression.", math: String.raw`\nabla\cdot F(${x0},${y0},${z0})=${A}(${y0})+${B}(${z0})+${C}(${x0})=${div}` },
          { title: "Curl formula", text: "Expand the determinant form of the curl, noting which cross derivatives vanish.", math: String.raw`\nabla\times F=\left(\frac{\partial(${C}xz)}{\partial y}-\frac{\partial(${B}yz)}{\partial z},\ \frac{\partial(${c(A)}xy)}{\partial z}-\frac{\partial(${C}xz)}{\partial x},\ \frac{\partial(${B}yz)}{\partial x}-\frac{\partial(${c(A)}xy)}{\partial y}\right)=\langle -${B}y,\ -${C}z,\ -${c(A)}x\rangle` },
          { title: "Curl at the point", text: "Substitute the coordinates into the curl vector.", math: String.raw`\nabla\times F(${x0},${y0},${z0})=\langle ${cx},\ ${cy},\ ${cz}\rangle` },
        ],
        answer: String.raw`\nabla\phi(${x0},${y0},${z0})=\langle ${gx},${gy},${gz}\rangle;\quad \nabla\cdot F(${x0},${y0},${z0})=${div};\quad \nabla\times F(${x0},${y0},${z0})=\langle ${cx},${cy},${cz}\rangle.`,
        alternatives: [
          "Write the curl as a formal determinant with rows i, j, k and the partial derivative operators, and expand along the first row.",
          "Estimate the divergence at the point from the flux of F through a small axis-aligned box divided by the box volume.",
        ],
        mistakes: [
          "Reporting the divergence as a vector rather than as a single scalar number.",
          "Using the opposite sign convention for curl, for example putting the derivative of the second component with respect to z first with a plus sign.",
          "Assuming F must be conservative because phi was supplied, and therefore setting curl F to zero without computing it.",
        ],
        further: "Find every point where the curl of F vanishes. Is F conservative on any open region of three-dimensional space? Justify your answer, and if a potential exists on such a region, construct it.",
      }
    },
  },
  {
    id: 'm2-line-integrals',
    domain: 'math',
    topicId: 'line-surface-integrals',
    title: 'Line integrals',
    level: 'Undergraduate 3',
    type: 'Derivation',
    concepts: ['parametrisation', 'vector line integral', 'dot product', 'conservative field', 'potential function'],
    build(rng, index) {
      const alpha = rng.int(1, 3) + index
      const beta = rng.int(1, 3) + ((index >> 1) % 2)
      const a = rng.int(1, 3)
      const Ux = 2 * alpha
      const Wy = 2 * beta
      const a2 = a * a
      const value = alpha * a2 + beta * a2 * a2
      return {
        statement: "Let C be the arc of the parabola y = x^2 from (0, 0) to (" + a + ", " + a2 + "), traversed in that direction. Let F(x,y) = (" + Ux + "x, " + Wy + "y). Evaluate the line integral of F dot dr along C.",
        hints: [
          "Parametrise the curve by x = t and y = t squared, with t running from 0 to a.",
          "Compute dr = (1, 2t) dt and take the dot product with F evaluated at the parametrisation.",
          "Notice that F is the gradient of alpha x squared plus beta y squared, so the integral equals the change in that potential between the endpoints.",
        ],
        steps: [
          { title: "Parametrise the curve", text: "Use the x-coordinate as the parameter; the differential of y follows by the chain rule.", math: String.raw`\mathbf{r}(t)=(t,t^2),\quad 0\le t\le ${a},\quad d\mathbf{r}=(1,2t)\,dt` },
          { title: "Substitute into the field", text: "Replace x and y by their parametrisations.", math: String.raw`F(\mathbf{r}(t))=(${Ux}t,\ ${Wy}t^2)` },
          { title: "Form the dot product", text: "Multiply corresponding components and add.", math: String.raw`F\cdot d\mathbf{r}=(${Ux}t)(1)+(${Wy}t^2)(2t)=${Ux}t+${4 * beta}t^3` },
          { title: "Integrate over the parameter", text: "Integrate the resulting polynomial from t = 0 to t = a.", math: String.raw`\int_0^{${a}}\left(${Ux}t+${4 * beta}t^3\right)dt=\left[${c(alpha)}t^2+${c(beta)}t^4\right]_0^{${a}}=${c(alpha)}(${a})^2+${c(beta)}(${a})^4=${value}` },
          { title: "Conservative-field check", text: "The field is a gradient, so the integral depends only on the endpoints.", math: String.raw`F=\nabla\left(${alpha}x^2+${beta}y^2\right)\ \Rightarrow\ \int_C F\cdot d\mathbf{r}=\phi(${a},${a2})-\phi(0,0)=${value}` },
        ],
        answer: String.raw`\int_C F\cdot d\mathbf{r}=${c(alpha)}(${a})^2+${c(beta)}(${a})^4=${value}`,
        alternatives: [
          "Use the potential function directly: evaluate alpha x squared plus beta y squared at (a, a squared) and subtract its value at the origin.",
          "Integrate with respect to x, replacing dy by 2x dx, and confirm the integrand is 2 alpha x plus 4 beta x cubed.",
        ],
        mistakes: [
          "Forgetting that dy = 2x dx and dropping the cubic contribution from the second component of F.",
          "Reversing the direction of traversal and keeping the same sign; the integral would change sign.",
          "Treating F dot dr as a scalar line integral of the magnitude of F and integrating the length element instead.",
        ],
        further: "Replace the parabola by the straight segment from (0, 0) to (a, a squared). Would the line integral change? Explain using conservativeness and confirm by computing the integral along the segment directly.",
      }
    },
  },
]

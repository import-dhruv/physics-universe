import type { GeneratedFamily, RNG } from './types'

const r0 = (x: number) => x.toFixed(0)
const r1 = (x: number) => x.toFixed(1)
const r2 = (x: number) => x.toFixed(2)
const r3 = (x: number) => x.toFixed(3)
const r4 = (x: number) => x.toFixed(4)
const r5 = (x: number) => x.toFixed(5)

const factorial = (n: number) => {
  let value = 1
  for (let i = 2; i <= n; i++) value *= i
  return value
}
const binomial = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k))

export const PHYSICS_FAMILIES_3: GeneratedFamily[] = [
  // 1 — First law of thermodynamics -----------------------------------------
  {
    id: 'p3-first-law',
    domain: 'physics',
    topicId: 'first-law',
    title: 'First law of thermodynamics',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['First law of thermodynamics', 'Internal energy', 'Heat and work sign convention', 'Monatomic ideal gas', 'Energy conservation'],
    build(rng: RNG, index: number) {
      const n = rng.int(1, 4) + (index % 2)
      const Q = rng.int(500, 1300)
      const W = rng.int(60, 380)
      const Ti = rng.int(280, 340)
      const R = 8.314
      const dU = Q - W
      const nCv = (3 / 2) * n * R
      const dT = dU / nCv
      const Tf = Ti + dT
      return {
        title: 'Heating a monatomic ideal gas in a piston',
        statement: "A movable-piston cylinder contains " + n + " mol of a monatomic ideal gas initially at " + Ti + " K. The gas absorbs " + Q + " J of heat while it expands and does " + W + " J of work on its surroundings. Taking the molar gas constant as R = 8.314 J/(mol K), determine the change in internal energy, the change in temperature, and the final temperature.",
        hints: [
          "Use the first law with the convention that absorbed heat is positive and work done by the gas is positive: ΔU = Q − W.",
          "For a monatomic ideal gas the internal energy is U = (3/2)nRT, so ΔU = (3/2)nR ΔT.",
          "Solve ΔT = ΔU/[(3/2)nR] and add it to the initial temperature.",
        ],
        steps: [
          { title: "Choose a sign convention", text: "The gas gains energy Q as heat and loses energy W by doing work on the surroundings, so the first law reads ΔU = Q − W.", math: String.raw`\Delta U = Q - W` },
          { title: "Evaluate the internal energy change", text: "Insert the two energy transfers in joules.", math: String.raw`\Delta U = ` + Q + String.raw` - ` + W + String.raw` = ` + r0(dU) + String.raw`\ \mathrm{J}` },
          { title: "Connect ΔU to temperature", text: "A monatomic ideal gas has molar heat capacity at constant volume C_V = 3R/2, so its internal energy depends only on temperature.", math: String.raw`\Delta U = n C_V \Delta T = \frac{3}{2} n R \Delta T` },
          { title: "Solve for the temperature change", text: "The thermal capacity of this sample is nC_V = " + r2(nCv) + " J/K, which gives the temperature rise.", math: String.raw`\Delta T = \frac{\Delta U}{\frac{3}{2} n R} = \frac{` + r0(dU) + String.raw`}{` + r2(nCv) + String.raw`} = ` + r2(dT) + String.raw`\ \mathrm{K}` },
          { title: "Find the final temperature", text: "Add the rise to the initial temperature.", math: String.raw`T_f = T_i + \Delta T = ` + Ti + String.raw` + ` + r2(dT) + String.raw` = ` + r2(Tf) + String.raw`\ \mathrm{K}` },
        ],
        answer: "ΔU = " + r0(dU) + " J, ΔT = " + r2(dT) + " K, and the final temperature is " + r2(Tf) + " K.",
        alternatives: [
          "Take work done on the gas as positive: ΔU = Q + W_on with W_on = −" + W + " J; this gives exactly the same ΔU.",
          "Use the molar heat capacity C_V = 3R/2 = 12.47 J/(mol K) directly in ΔU = nC_V ΔT.",
        ],
        mistakes: [
          "Adding the heat and the work, ΔU = Q + W, by using the wrong sign convention for W.",
          "Using C_V = 5R/2, the diatomic value, for a monatomic gas.",
          "Quoting ΔU in kJ without converting from joules.",
        ],
        further: "If instead the gas were compressed so that " + (W + 100) + " J of work is done on it while it releases " + (Q - 200) + " J of heat, determine the signs of ΔU and ΔT and compute the new temperature change.",
      }
    },
  },

  // 2 — Engine efficiency ---------------------------------------------------
  {
    id: 'p3-second-law',
    domain: 'physics',
    topicId: 'second-law',
    title: 'Engine efficiency',
    level: 'Undergraduate 1',
    type: 'Numerical',
    concepts: ['Heat engine', 'Thermal efficiency', 'Carnot limit', 'Second law of thermodynamics', 'Kelvin–Planck statement'],
    build(rng: RNG, index: number) {
      const Th = rng.int(500, 700) + (index % 5) * 10
      const Tc = rng.int(280, 350)
      const Qh = rng.int(900, 1600)
      const ratio = rng.num(Tc / Th + 0.05, 0.90, 3)
      const Qc = Math.round(Qh * ratio)
      const W = Qh - Qc
      const eff = W / Qh
      const effC = 1 - Tc / Th
      const allowed = eff <= effC
      return {
        title: 'Is this engine allowed by the second law?',
        statement: "A heat engine operates between a hot reservoir at " + Th + " K and a cold reservoir at " + Tc + " K. In each cycle it absorbs " + Qh + " J from the hot reservoir and rejects " + Qc + " J to the cold reservoir. Calculate the net work per cycle, the actual thermal efficiency, the Carnot (maximum possible) efficiency, and state whether the engine is physically allowed.",
        hints: [
          "Energy conservation over a closed cycle gives W = Q_h − Q_c.",
          "Efficiency is the useful fraction of absorbed heat: η = W/Q_h = 1 − Q_c/Q_h.",
          "The Carnot limit is η_C = 1 − T_c/T_h; the second law demands η ≤ η_C. Use absolute temperatures in kelvin.",
        ],
        steps: [
          { title: "Work per cycle", text: "Because the working substance returns to its initial state each cycle, its internal energy does not change, so the net work equals the net heat absorbed.", math: String.raw`W = Q_h - Q_c = ` + Qh + String.raw` - ` + Qc + String.raw` = ` + r0(W) + String.raw`\ \mathrm{J}` },
          { title: "Actual efficiency", text: "Divide the work output by the heat taken from the hot reservoir.", math: String.raw`\eta = \frac{W}{Q_h} = 1 - \frac{Q_c}{Q_h} = ` + r3(eff) + String.raw` = ` + r1(eff * 100) + String.raw`\%` },
          { title: "Carnot efficiency", text: "The maximum efficiency depends only on the absolute reservoir temperatures.", math: String.raw`\eta_{\mathrm{C}} = 1 - \frac{T_c}{T_h} = 1 - \frac{` + Tc + String.raw`}{` + Th + String.raw`} = ` + r3(effC) + String.raw` = ` + r1(effC * 100) + String.raw`\%` },
          { title: "Second-law test", text: "Compare the actual efficiency with the Carnot bound.", math: String.raw`\eta = ` + r3(eff) + String.raw`\ \le\ \eta_{\mathrm{C}} = ` + r3(effC) },
          { title: "Interpretation", text: allowed ? "The inequality holds, so the engine is allowed but irreversible; equality would be required for a reversible engine." : "The inequality fails, so this engine cannot exist — it would violate the second law.", math: String.raw`\eta_{\mathrm{actual}} \le 1 - \frac{T_c}{T_h}` },
        ],
        answer: "W = " + r0(W) + " J, η = " + r3(eff) + " (" + r1(eff * 100) + "%), and η_C = " + r3(effC) + " (" + r1(effC * 100) + "%). Since η does not exceed η_C, the engine is " + (allowed ? "physically allowed but irreversible" : "impossible") + ".",
        alternatives: [
          "Compute η directly as 1 − Q_c/Q_h without first evaluating the work.",
          "Test the equivalent second-law condition Q_c/Q_h ≥ T_c/T_h on the heat ratios.",
        ],
        mistakes: [
          "Using η = Q_c/Q_h, the rejected-heat fraction, instead of W/Q_h.",
          "Inserting Celsius temperatures into η_C = 1 − T_c/T_h.",
          "Claiming an efficiency above Carnot could be reached with a cleverer working substance.",
        ],
        further: "If the cold reservoir were cooled to " + (Tc - 30) + " K while Q_h and Q_c stayed fixed, would the engine still satisfy the second law? What if it were warmed to " + (Tc + 40) + " K? Determine the new Carnot limits and compare.",
      }
    },
  },

  // 3 — Entropy changes -----------------------------------------------------
  {
    id: 'p3-entropy',
    domain: 'physics',
    topicId: 'entropy',
    title: 'Entropy changes',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['Entropy', 'Clausius definition', 'Reversible isothermal expansion', 'Ideal gas', 'Second law of thermodynamics'],
    build(rng: RNG, index: number) {
      const n = rng.int(1, 3) + (index % 2)
      const T = rng.int(290, 360)
      const Vi = rng.int(2, 7)
      const kfac = Number((rng.num(1.6, 3.1, 2) + (index % 3) * 0.1).toFixed(2))
      const Vf = Number((Vi * kfac).toFixed(2))
      const R = 8.314
      const dS = n * R * Math.log(kfac)
      const Qrev = T * dS
      return {
        title: 'Reversible expansion versus free expansion',
        statement: "A sample of " + n + " mol of ideal gas is held at a constant " + T + " K while its volume increases from " + Vi + " L to " + Vf + " L, a factor k = " + kfac + ". Use R = 8.314 J/(mol K). (a) For a reversible isothermal expansion, find the heat absorbed and the entropy change of the gas. (b) If the same gas instead expands freely into an evacuated, thermally insulated chamber between the same two volumes, find the entropy change of the gas, of the surroundings, and of the universe.",
        hints: [
          "For a reversible isothermal ideal-gas expansion, Q_rev = nRT ln(V_f/V_i) = nRT ln k.",
          "Entropy is a state function defined by ΔS = ∫δQ_rev/T, so for an isothermal step ΔS_gas = Q_rev/T = nR ln k.",
          "In a free expansion of an ideal gas, Q = W = 0 and ΔU = 0, so the gas temperature and its ΔS are unchanged, while the insulated surroundings exchange no heat.",
        ],
        steps: [
          { title: "Set up the volume ratio", text: "Only the dimensionless ratio of final to initial volume enters the logarithm.", math: String.raw`k = \frac{V_f}{V_i} = \frac{` + r2(Vf) + String.raw`}{` + Vi + String.raw`} = ` + kfac },
          { title: "Reversible heat input", text: "At constant temperature the ideal-gas internal energy is unchanged, so all the reversible heat becomes work.", math: String.raw`Q_{\mathrm{rev}} = nRT\ln k = ` + r0(Qrev) + String.raw`\ \mathrm{J}` },
          { title: "Entropy of the gas", text: "Divide the reversible heat by the constant temperature.", math: String.raw`\Delta S_{\mathrm{gas}} = \frac{Q_{\mathrm{rev}}}{T} = nR\ln k = ` + r3(dS) + String.raw`\ \mathrm{J\,K^{-1}}` },
          { title: "Free expansion of an ideal gas", text: "The chamber is insulated and the gas expands into vacuum, so no heat flows and no work is done; since U depends only on T, the temperature does not change. The gas ends in the same state as in part (a), so its entropy change is identical.", math: String.raw`Q = 0,\quad W = 0,\quad \Delta U = 0\ \Rightarrow\ \Delta T = 0` },
          { title: "Total entropy change", text: "The insulated surroundings receive no heat, so their entropy change is zero and the universe's entropy increases by the gas entropy alone.", math: String.raw`\Delta S_{\mathrm{surr}} = 0,\quad \Delta S_{\mathrm{univ}} = \Delta S_{\mathrm{gas}} + \Delta S_{\mathrm{surr}} = ` + r3(dS) + String.raw`\ \mathrm{J\,K^{-1}} > 0` },
        ],
        answer: "Reversible case: Q_rev = " + r0(Qrev) + " J and ΔS_gas = " + r3(dS) + " J/K. Free expansion: ΔS_gas = " + r3(dS) + " J/K, ΔS_surr = 0, and ΔS_univ = " + r3(dS) + " J/K > 0.",
        alternatives: [
          "Use the general ideal-gas formula ΔS = nC_V ln(T_f/T_i) + nR ln(V_f/V_i); the first term vanishes because T_f = T_i.",
          "For the free expansion, compute ΔS along any convenient reversible path connecting the same initial and final states.",
        ],
        mistakes: [
          "Setting ΔS = 0 for the free expansion just because Q = 0; entropy depends on the endpoints, not the path.",
          "Using log base 10 instead of the natural logarithm in ΔS = nR ln k.",
          "Counting the insulated chamber as surroundings that absorb heat.",
        ],
        further: "If the chamber were not insulated and the gas stayed at temperature T by drawing heat from a single reservoir, find the reservoir's entropy change and the total entropy change of the universe. Would that process be reversible?",
      }
    },
  },

  // 4 — Carnot cycle --------------------------------------------------------
  {
    id: 'p3-carnot-cycle',
    domain: 'physics',
    topicId: 'carnot-cycle',
    title: 'Carnot cycle',
    level: 'Undergraduate 2',
    type: 'Derivation',
    concepts: ['Carnot cycle', 'Clausius equality', 'Reversible adiabat', 'Thermal efficiency', 'Entropy'],
    build(rng: RNG, index: number) {
      const Th = rng.int(460, 700) + (index % 4) * 10
      const Tc = rng.int(280, 370)
      const Qh = rng.int(700, 1500)
      const ratio = Tc / Th
      const Qc = Qh * ratio
      const W = Qh - Qc
      const eff = 1 - ratio
      return {
        title: 'Deriving the Carnot heat ratio',
        statement: "A Carnot engine operates between reservoirs at " + Th + " K and " + Tc + " K. During its isothermal expansion at " + Th + " K it absorbs " + Qh + " J. (a) Prove that the heat rejected to the cold reservoir satisfies Q_c/Q_h = T_c/T_h. (b) Using this result, compute the rejected heat, the net work per cycle, and the efficiency.",
        hints: [
          "For any reversible cycle the Clausius equality holds: the closed integral of δQ_rev/T is zero.",
          "The two adiabatic legs exchange no heat; only the isotherms contribute, +Q_h/T_h and −Q_c/T_c.",
          "Hence Q_h/T_h = Q_c/T_c, and η = 1 − Q_c/Q_h = 1 − T_c/T_h. Use temperatures in kelvin.",
        ],
        steps: [
          { title: "Clausius equality for a reversible cycle", text: "A Carnot cycle is entirely reversible, so the integral of δQ_rev/T around the loop vanishes.", math: String.raw`\oint \frac{\delta Q_{\mathrm{rev}}}{T} = 0` },
          { title: "Contributions of the four legs", text: "The adiabats have δQ = 0. The hot isotherm takes in Q_h at T_h and the cold isotherm rejects Q_c at T_c.", math: String.raw`\frac{Q_h}{T_h} - \frac{Q_c}{T_c} = 0` },
          { title: "Heat ratio and rejected heat", text: "Rearranging gives the ratio of heats, which fixes the rejected heat for this engine.", math: String.raw`\frac{Q_c}{Q_h} = \frac{T_c}{T_h} = \frac{` + Tc + String.raw`}{` + Th + String.raw`} = ` + r3(ratio) + String.raw`\ \Rightarrow\ Q_c = ` + r1(Qc) + String.raw`\ \mathrm{J}` },
          { title: "Net work per cycle", text: "Since the working substance returns to its starting state, the net work equals the net heat absorbed.", math: String.raw`W = Q_h - Q_c = ` + Qh + String.raw` - ` + r1(Qc) + String.raw` = ` + r1(W) + String.raw`\ \mathrm{J}` },
          { title: "Efficiency", text: "The efficiency depends only on the reservoir temperatures, in agreement with Carnot's theorem.", math: String.raw`\eta = 1 - \frac{T_c}{T_h} = ` + r3(eff) + String.raw` = ` + r1(eff * 100) + String.raw`\%` },
        ],
        answer: "Q_c = " + r1(Qc) + " J, W = " + r1(W) + " J, and η = " + r3(eff) + " (" + r1(eff * 100) + "%). The ratio Q_c/Q_h equals T_c/T_h = " + r3(ratio) + " as required for a reversible cycle.",
        alternatives: [
          "Use T V^{γ−1} = constant on the two adiabats to show V_2/V_1 = V_3/V_4, and hence Q_c/Q_h = T_c/T_h for an ideal gas.",
          "Read the cycle on a T–S diagram: Q_h = T_h ΔS, Q_c = T_c ΔS, and the enclosed area is W = (T_h − T_c)ΔS, so η = 1 − T_c/T_h.",
        ],
        mistakes: [
          "Using Celsius temperatures in η = 1 − T_c/T_h.",
          "Assuming the adiabatic legs exchange heat with the reservoirs.",
          "Taking Q_c = Q_h because ΔU = 0 over the cycle, and therefore claiming zero work.",
        ],
        further: "If T_h were raised to " + (Th + 60) + " K while T_c and Q_h stayed fixed, calculate the new efficiency and work output and their percentage increases relative to the values found above.",
      }
    },
  },

  // 5 — Thermodynamic potentials --------------------------------------------
  {
    id: 'p3-thermodynamic-potentials',
    domain: 'physics',
    topicId: 'thermodynamic-potentials',
    title: 'Thermodynamic potentials',
    level: 'Undergraduate 3',
    type: 'Theoretical',
    concepts: ['Internal energy', 'Enthalpy', 'Helmholtz free energy', 'Gibbs free energy', 'Legendre transform'],
    build(rng: RNG, index: number) {
      const dH = rng.num(25, 110, 1)
      const dS = rng.num(70, 170, 1)
      const T = rng.int(260, 420) + (index % 5) * 10
      const TdS = T * dS / 1000
      const dG = dH - TdS
      const Teq = dH * 1000 / dS
      const spontaneous = dG < 0
      return {
        title: 'Legendre transforms and the Gibbs criterion',
        statement: "A transformation held at constant pressure and temperature " + T + " K has enthalpy change ΔH = +" + r1(dH) + " kJ/mol and entropy change ΔS = +" + r1(dS) + " J/(mol K). (a) Starting from dU = T dS − P dV, perform the Legendre transforms that define H, F and G, and state the natural variables of each potential. (b) Calculate ΔG at this temperature and decide whether the transformation is spontaneous. (c) Find the temperature at which the system would be at equilibrium.",
        hints: [
          "H = U + PV replaces the variable V by P: dH = T dS + V dP.",
          "F = U − TS replaces S by T: dF = −S dT − P dV; G = H − TS replaces both: dG = −S dT + V dP.",
          "At fixed T and P, ΔG = ΔH − TΔS; spontaneous means ΔG < 0 and equilibrium means ΔG = 0. Convert ΔS to kJ/(mol K) before combining with ΔH.",
        ],
        steps: [
          { title: "Fundamental relation", text: "The internal energy is naturally a function of entropy and volume, with T and P as its conjugate variables.", math: String.raw`dU = T\,dS - P\,dV,\qquad U = U(S,V)` },
          { title: "Enthalpy and Helmholtz energy", text: "Adding PV removes V as a natural variable; subtracting TS removes S as a natural variable.", math: String.raw`H = U + PV \Rightarrow dH = T\,dS + V\,dP,\qquad F = U - TS \Rightarrow dF = -S\,dT - P\,dV` },
          { title: "Gibbs free energy", text: "Combining both transforms yields the potential whose natural variables are T and P, the variables fixed in this problem.", math: String.raw`G = H - TS = U + PV - TS \Rightarrow dG = -S\,dT + V\,dP` },
          { title: "Evaluate ΔG", text: "At T = " + T + " K the product TΔS is " + r2(TdS) + " kJ/mol, so the Gibbs energy change is.", math: String.raw`\Delta G = \Delta H - T\Delta S = ` + r1(dH) + String.raw` - ` + r2(TdS) + String.raw` = ` + r2(dG) + String.raw`\ \mathrm{kJ\,mol^{-1}}` },
          { title: "Equilibrium temperature", text: "Setting ΔG = 0 gives the crossover temperature, using ΔH in J/mol.", math: String.raw`T_{\mathrm{eq}} = \frac{\Delta H}{\Delta S} = \frac{` + r0(dH * 1000) + String.raw`\ \mathrm{J\,mol^{-1}}}{` + r1(dS) + String.raw`\ \mathrm{J\,mol^{-1}\,K^{-1}}} = ` + r0(Teq) + String.raw`\ \mathrm{K}` },
        ],
        answer: "ΔG = " + r2(dG) + " kJ/mol, so the transformation is " + (spontaneous ? "spontaneous" : "not spontaneous") + " at " + T + " K. Equilibrium (ΔG = 0) occurs at T_eq = " + r0(Teq) + " K.",
        alternatives: [
          "Integrate dG = −S dT + V dP at constant pressure from a reference temperature and combine with ΔH to recover ΔG = ΔH − TΔS.",
          "Use the Maxwell relation (∂S/∂P)_T = −(∂V/∂T)_P to express the entropy change through measurable equation-of-state derivatives.",
        ],
        mistakes: [
          "Using ΔS in J/(mol K) directly with ΔH in kJ/mol, giving ΔG wrong by a factor of 1000.",
          "Interpreting ΔG < 0 as a fast transformation rather than a thermodynamically favourable one.",
          "Claiming that enthalpy H is a natural function of T and V instead of S and P.",
        ],
        further: "If both ΔH and ΔS were negative, show that spontaneity would require T < ΔH/ΔS. Evaluate the spontaneous temperature range for ΔH = −" + r1(dH) + " kJ/mol and ΔS = −" + r1(dS) + " J/(mol K).",
      }
    },
  },

  // 6 — Latent heat ---------------------------------------------------------
  {
    id: 'p3-phase-transitions',
    domain: 'physics',
    topicId: 'phase-transitions',
    title: 'Latent heat',
    level: 'Advanced high school',
    type: 'Numerical',
    concepts: ['Latent heat of fusion', 'Phase transition', 'Specific heat capacity', 'Power and energy', 'Energy conservation'],
    build(rng: RNG, index: number) {
      const m = rng.num(0.3, 1.4, 2)
      const P = rng.int(500, 1100) + (index % 3) * 50
      const Lf = 334000
      const c = 4186
      const tMin = m * Lf / P
      const tMax = (m * Lf + m * c * 85) / P
      const lo = Math.ceil(tMin) + 15
      const hi = Math.floor(tMax)
      const t = rng.int(lo, hi)
      const E = P * t
      const Qm = m * Lf
      const Qw = E - Qm
      const Tf = Qw / (m * c)
      return {
        title: 'Melting ice with a constant heater',
        statement: "A block of ice of mass " + r2(m) + " kg at 0 °C is heated electrically at a constant power of " + P + " W for " + t + " s. The latent heat of fusion of ice is 334 kJ/kg and the specific heat capacity of liquid water is 4186 J/(kg K). Assuming no heat losses, determine (a) the total energy supplied, (b) the energy needed to melt all of the ice, and (c) the final temperature of the water.",
        hints: [
          "Energy supplied at constant power is E = P t.",
          "Melting at 0 °C requires Q_melt = m L_f and produces no temperature change.",
          "Any leftover energy warms the liquid water according to Q = m c ΔT, starting from 0 °C.",
        ],
        steps: [
          { title: "Total energy delivered", text: "Multiply the power by the heating time, then convert joules to kilojoules.", math: String.raw`E = Pt = ` + P + String.raw`\ \mathrm{W} \times ` + t + String.raw`\ \mathrm{s} = ` + r0(E) + String.raw`\ \mathrm{J} = ` + r1(E / 1000) + String.raw`\ \mathrm{kJ}` },
          { title: "Energy to melt the ice", text: "Because E exceeds this amount, all of the ice melts and the remaining energy warms the water.", math: String.raw`Q_{\mathrm{melt}} = mL_f = ` + r2(m) + String.raw`\ \mathrm{kg} \times 334\ \mathrm{kJ\,kg^{-1}} = ` + r1(Qm / 1000) + String.raw`\ \mathrm{kJ}` },
          { title: "Energy left for warming", text: "Subtract the latent-heat cost from the supplied energy.", math: String.raw`Q_{\mathrm{warm}} = E - Q_{\mathrm{melt}} = ` + r1(Qw / 1000) + String.raw`\ \mathrm{kJ}` },
          { title: "Final water temperature", text: "Starting from 0 °C, the temperature rise equals the warming energy divided by m c.", math: String.raw`\Delta T = \frac{Q_{\mathrm{warm}}}{mc} = ` + r1(Tf) + String.raw`\ ^\circ\mathrm{C}` },
          { title: "Check for boiling", text: "The chosen heating time keeps the rise below 100 °C, so no vaporisation needs to be considered.", math: String.raw`T_f = ` + r1(Tf) + String.raw`\ ^\circ\mathrm{C} < 100\ ^\circ\mathrm{C}` },
        ],
        answer: "Energy supplied = " + r1(E / 1000) + " kJ, energy to melt the ice = " + r1(Qm / 1000) + " kJ, warming energy = " + r1(Qw / 1000) + " kJ, and the final water temperature is " + r1(Tf) + " °C.",
        alternatives: [
          "Plot temperature against supplied energy: a horizontal plateau of width m L_f at 0 °C followed by a straight rise of slope 1/(mc).",
          "Work in kilojoules throughout, using c = 4.186 kJ/(kg K) together with L_f = 334 kJ/kg.",
        ],
        mistakes: [
          "Using the specific heat capacity of ice during the melting stage instead of the latent heat.",
          "Forgetting to subtract m L_f before computing the temperature rise of the water.",
          "Using L_f = 334 J/kg rather than 334 kJ/kg.",
        ],
        further: "If the heater were switched off at the instant the last ice melted, how many additional seconds at the same power would be required to bring the water to 50 °C? Derive the answer from m c (50 °C)/P.",
      }
    },
  },

  // 7 — Counting microstates ------------------------------------------------
  {
    id: 'p3-microstates-macrostates',
    domain: 'physics',
    topicId: 'microstates-macrostates',
    title: 'Counting microstates',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['Microstate', 'Macrostate', 'Multiplicity', 'Boltzmann entropy', 'Combinatorics'],
    build(rng: RNG, index: number) {
      const N = rng.int(8, 16) + (index % 3)
      const n = rng.int(1, N - 1)
      let n2 = rng.int(1, N - 1)
      while (n2 === n || binomial(N, n2) === binomial(N, n)) n2 = rng.int(1, N - 1)
      const kB = 1.380649e-23
      const OmA = binomial(N, n)
      const OmB = binomial(N, n2)
      const lnA = Math.log(OmA)
      const lnB = Math.log(OmB)
      const SA = kB * lnA
      const SB = kB * lnB
      const ratio = OmA / OmB
      return {
        title: 'Multiplicity of two spin macrostates',
        statement: "A system consists of " + N + " distinguishable spin-1/2 particles, each either up or down. Macrostate A has " + n + " spins up and macrostate B has " + n2 + " spins up. Taking k_B = 1.380649 × 10^-23 J/K, (a) count the microstates Ω_A and Ω_B belonging to each macrostate, (b) compute the Boltzmann entropies in units of k_B and in J/K, and (c) state which macrostate is more probable and by what factor.",
        hints: [
          "The number of ways to choose which n of N distinguishable spins are up is the binomial coefficient C(N, n) = N!/(n!(N−n)!).",
          "Boltzmann's entropy is S = k_B ln Ω, so in units of k_B it is simply ln Ω.",
          "The macrostate with larger Ω has larger entropy; the probability ratio is Ω_A/Ω_B.",
        ],
        steps: [
          { title: "Multiplicity formula", text: "A macrostate specified only by the number of up spins groups together all corresponding spin configurations.", math: String.raw`\Omega(N,n) = \binom{N}{n} = \frac{N!}{n!\,(N-n)!}` },
          { title: "Count both macrostates", text: "Evaluate the binomial coefficients for the two given values of n.", math: String.raw`\Omega_A = \binom{` + N + String.raw`}{` + n + String.raw`} = ` + r0(OmA) + String.raw`,\qquad \Omega_B = \binom{` + N + String.raw`}{` + n2 + String.raw`} = ` + r0(OmB) },
          { title: "Entropy of macrostate A", text: "The natural logarithm of the multiplicity gives the entropy in units of k_B; multiply by k_B for SI units.", math: String.raw`S_A = k_B\ln\Omega_A = ` + r3(lnA) + String.raw`\,k_B = ` + r2(SA * 1e23) + String.raw`\times 10^{-23}\ \mathrm{J\,K^{-1}}` },
          { title: "Entropy of macrostate B", text: "Repeat the calculation for the second macrostate.", math: String.raw`S_B = k_B\ln\Omega_B = ` + r3(lnB) + String.raw`\,k_B = ` + r2(SB * 1e23) + String.raw`\times 10^{-23}\ \mathrm{J\,K^{-1}}` },
          { title: "Compare probabilities", text: "For equal a priori microstates, probability is proportional to multiplicity.", math: String.raw`\frac{\Omega_A}{\Omega_B} = ` + r2(ratio) + String.raw`\quad\Rightarrow\quad S_A - S_B = k_B\ln\!\left(\frac{\Omega_A}{\Omega_B}\right)` },
        ],
        answer: "Ω_A = " + r0(OmA) + " and Ω_B = " + r0(OmB) + "; S_A = " + r3(lnA) + " k_B = " + r2(SA * 1e23) + " × 10^-23 J/K, S_B = " + r3(lnB) + " k_B = " + r2(SB * 1e23) + " × 10^-23 J/K. Macrostate " + (ratio > 1 ? "A" : "B") + " is more likely by a factor of " + r2(Math.max(ratio, 1 / ratio)) + ".",
        alternatives: [
          "Use the symmetry C(N, n) = C(N, N−n) to reduce the factorial work whenever n > N/2.",
          "For large N apply Stirling's approximation ln N! ≈ N ln N − N to estimate ln Ω analytically.",
        ],
        mistakes: [
          "Using N^n, the total number of microstates, instead of C(N, n) for a fixed macrostate.",
          "Using log base 10 rather than the natural logarithm in S = k_B ln Ω.",
          "Quoting S in J/K while omitting the factor k_B.",
        ],
        further: "Using Stirling's approximation, estimate ln Ω for N = 1000 spins with n = 500 up spins, and convert the result to an entropy in J/K. Compare your estimate with ln 2^N.",
      }
    },
  },

  // 8 — Boltzmann factors ---------------------------------------------------
  {
    id: 'p3-boltzmann-distribution',
    domain: 'physics',
    topicId: 'boltzmann-distribution',
    title: 'Boltzmann factors',
    level: 'Undergraduate 2',
    type: 'Numerical',
    concepts: ['Boltzmann factor', 'Population ratio', 'Energy level spacing', 'Thermal equilibrium', 'Absolute temperature'],
    build(rng: RNG, index: number) {
      const kB = 8.617333262e-5
      const dE = rng.num(0.02, 0.12, 3)
      const T = rng.int(260, 560) + (index % 4) * 10
      const kBT = kB * T
      const x = dE / kBT
      const factor = Math.exp(-x)
      const P2 = factor / (1 + factor)
      return {
        title: 'Populating two energy levels',
        statement: "A system has two energy levels separated by ΔE = " + r3(dE) + " eV. At a temperature of " + T + " K, (a) compute k_B T, (b) the Boltzmann factor exp(−ΔE/k_B T), (c) the ratio of upper-to-lower level populations N₂/N₁, and (d) the fraction of systems occupying the upper level if only these two levels exist. Use k_B = 8.617 × 10^-5 eV/K.",
        hints: [
          "The Boltzmann factor of a state of energy E is exp(−E/k_B T); for a population ratio only the gap ΔE matters.",
          "N₂/N₁ = exp[−(E₂ − E₁)/(k_B T)] = exp(−ΔE/k_B T).",
          "For a two-level system, P₂ = (N₂/N₁)/(1 + N₂/N₁). Keep energies in eV with k_B in eV/K.",
        ],
        steps: [
          { title: "Thermal energy scale", text: "Multiply Boltzmann's constant by the absolute temperature.", math: String.raw`k_B T = (8.617\times 10^{-5}\ \mathrm{eV\,K^{-1}})(` + T + String.raw`\ \mathrm{K}) = ` + r4(kBT) + String.raw`\ \mathrm{eV}` },
          { title: "Dimensionless exponent", text: "Form the ratio of the level spacing to the thermal energy.", math: String.raw`x = \frac{\Delta E}{k_B T} = \frac{` + r3(dE) + String.raw`}{` + r4(kBT) + String.raw`} = ` + r3(x) },
          { title: "Boltzmann factor", text: "The exponential suppression of the upper level is the Boltzmann factor.", math: String.raw`\exp(-x) = \exp(-` + r3(x) + String.raw`) = ` + r4(factor) },
          { title: "Population ratio", text: "At thermal equilibrium the ratio of populations equals the ratio of Boltzmann factors.", math: String.raw`\frac{N_2}{N_1} = \exp\!\left(-\frac{\Delta E}{k_B T}\right) = ` + r4(factor) },
          { title: "Upper-level fraction", text: "Normalise the two populations so that P₁ + P₂ = 1.", math: String.raw`P_2 = \frac{N_2/N_1}{1 + N_2/N_1} = \frac{` + r4(factor) + String.raw`}{1 + ` + r4(factor) + String.raw`} = ` + r3(P2) + String.raw` = ` + r1(P2 * 100) + String.raw`\%` },
        ],
        answer: "k_B T = " + r4(kBT) + " eV, exp(−ΔE/k_B T) = " + r4(factor) + ", N₂/N₁ = " + r4(factor) + ", and the upper-level fraction is " + r3(P2) + " (" + r1(P2 * 100) + "%).",
        alternatives: [
          "Compute the two-level partition function Z = 1 + exp(−ΔE/k_B T) and then use P₂ = exp(−ΔE/k_B T)/Z.",
          "Take logarithms of the population ratio, ln(N₂/N₁) = −ΔE/(k_B T), to infer a level spacing from measured populations.",
        ],
        mistakes: [
          "Mixing an energy gap in eV with k_B expressed in J/K.",
          "Using exp(+ΔE/k_B T), which incorrectly makes the upper level more populated.",
          "Reporting the ratio N₂/N₁ as a probability without dividing by 1 + N₂/N₁.",
        ],
        further: "Find the temperature at which the upper level would be 25% populated. Show that this requires exp(−ΔE/k_B T) = 1/3, hence T = ΔE/(k_B ln 3), and evaluate it for this ΔE.",
      }
    },
  },

  // 9 — Partition functions -------------------------------------------------
  {
    id: 'p3-partition-functions',
    domain: 'physics',
    topicId: 'partition-functions',
    title: 'Partition functions',
    level: 'Undergraduate 3',
    type: 'Numerical',
    concepts: ['Canonical partition function', 'Two-level system', 'Boltzmann factor', 'Helmholtz free energy', 'Mean energy'],
    build(rng: RNG, index: number) {
      const kB = 8.617333262e-5
      const eps = rng.num(0.02, 0.12, 3)
      const T = rng.int(220, 560) + (index % 4) * 10
      const kBT = kB * T
      const x = eps / kBT
      const q = Math.exp(-x)
      const Z = 1 + q
      const Pexc = q / Z
      const F = -kBT * Math.log(Z)
      const U = eps * Pexc
      return {
        title: 'Canonical statistics of a two-level system',
        statement: "A two-level system has energies 0 and ε = " + r3(eps) + " eV. At temperature T = " + T + " K, with k_B = 8.617 × 10^-5 eV/K, compute (a) the canonical partition function Z, (b) the probability of finding the system in the excited level, (c) the Helmholtz free energy F = −k_B T ln Z, and (d) the mean energy ⟨E⟩.",
        hints: [
          "For levels {0, ε}, the canonical partition function is Z = 1 + exp(−ε/k_B T).",
          "The excited-state probability is P_exc = exp(−ε/k_B T)/Z.",
          "The free energy is F = −k_B T ln Z, and the mean energy is ⟨E⟩ = −∂(ln Z)/∂β = ε P_exc with β = 1/(k_B T).",
        ],
        steps: [
          { title: "Thermal energy scale", text: "Use k_B in eV/K so that all energies are consistently measured in electronvolts.", math: String.raw`k_B T = (8.617\times 10^{-5}\ \mathrm{eV\,K^{-1}})(` + T + String.raw`\ \mathrm{K}) = ` + r4(kBT) + String.raw`\ \mathrm{eV}` },
          { title: "Boltzmann factor for the excited level", text: "Set the ground-state energy to zero, so its Boltzmann factor is 1.", math: String.raw`q = \exp\!\left(-\frac{\varepsilon}{k_B T}\right) = \exp(-` + r3(x) + String.raw`) = ` + r4(q) },
          { title: "Partition function", text: "Sum the Boltzmann factors of both levels.", math: String.raw`Z = 1 + q = ` + r4(Z) },
          { title: "Level probabilities", text: "Divide each Boltzmann factor by Z; the probabilities sum to one.", math: String.raw`P_0 = \frac{1}{Z} = ` + r4(1 / Z) + String.raw`,\qquad P_{\mathrm{exc}} = \frac{q}{Z} = ` + r4(Pexc) },
          { title: "Helmholtz free energy", text: "Evaluate F from the logarithm of the partition function.", math: String.raw`F = -k_B T\ln Z = -(` + r4(kBT) + String.raw`)\ln(` + r4(Z) + String.raw`) = ` + r4(F) + String.raw`\ \mathrm{eV}` },
          { title: "Mean energy", text: "Weight each level energy by its probability.", math: String.raw`\langle E\rangle = \varepsilon P_{\mathrm{exc}} = ` + r3(eps) + String.raw` \times ` + r4(Pexc) + String.raw` = ` + r4(U) + String.raw`\ \mathrm{eV}` },
        ],
        answer: "Z = " + r4(Z) + ", P_exc = " + r4(Pexc) + " (" + r1(Pexc * 100) + "%), F = " + r4(F) + " eV, and ⟨E⟩ = " + r4(U) + " eV.",
        alternatives: [
          "Differentiate ln Z with respect to β = 1/(k_B T) to obtain ⟨E⟩ = ε e^{−βε}/(1 + e^{−βε}) directly.",
          "Cross-check the free energy using F = ⟨E⟩ − TS with S = k_B(ln Z + β⟨E⟩).",
        ],
        mistakes: [
          "Taking β = k_B T instead of β = 1/(k_B T).",
          "Forgetting to divide the excited-state Boltzmann factor by Z when computing the probability.",
          "Using eV for energies but joules for k_B in F = −k_B T ln Z.",
        ],
        further: "At what temperature would the two levels be equally populated? Show that this requires ε/k_B T → 0, i.e. T ≫ ε/k_B, and evaluate the characteristic temperature ε/k_B = " + r0(eps / kB) + " K.",
      }
    },
  },

  // 10 — Canonical averages -------------------------------------------------
  {
    id: 'p3-canonical-ensemble',
    domain: 'physics',
    topicId: 'canonical-ensemble',
    title: 'Canonical averages',
    level: 'Undergraduate 3',
    type: 'Numerical',
    concepts: ['Canonical ensemble', 'Harmonic oscillator', 'Mean energy', 'Energy fluctuations', 'Heat capacity'],
    build(rng: RNG, index: number) {
      const kB = 8.617333262e-5
      const eps = rng.num(0.03, 0.11, 3)
      const T = rng.int(260, 660) + (index % 4) * 10
      const kBT = kB * T
      const x = eps / kBT
      const q = Math.exp(-x)
      const Z = 1 / (1 - q)
      const U = eps * q / (1 - q)
      const varE = eps * eps * q / ((1 - q) * (1 - q))
      const stdE = Math.sqrt(varE)
      const C = kB * x * x * q / ((1 - q) * (1 - q))
      return {
        title: 'Canonical averages for a quantum oscillator',
        statement: "A quantum harmonic oscillator has equally spaced energy levels E_n = n ε (n = 0, 1, 2, …) with ε = " + r3(eps) + " eV. At temperature T = " + T + " K, with k_B = 8.617 × 10^-5 eV/K, compute (a) the partition function Z, (b) the mean energy ⟨E⟩, (c) the standard deviation ΔE of the energy, and (d) the heat capacity C = k_B β²⟨(ΔE)²⟩ where β = 1/(k_B T).",
        hints: [
          "Sum the geometric series: Z = Σ_n exp(−nβε) = 1/(1 − exp(−βε)) for βε > 0.",
          "⟨E⟩ = −∂(ln Z)/∂β = ε exp(−βε)/[1 − exp(−βε)] = ε/[exp(βε) − 1].",
          "The variance is ⟨(ΔE)²⟩ = ∂²(ln Z)/∂β² = ε² exp(−βε)/[1 − exp(−βε)]², and C = k_B β²⟨(ΔE)²⟩.",
        ],
        steps: [
          { title: "Thermal energy and exponent", text: "Form the dimensionless ratio βε = ε/(k_B T) that controls every canonical average.", math: String.raw`k_B T = ` + r4(kBT) + String.raw`\ \mathrm{eV},\qquad x = \beta\varepsilon = \frac{\varepsilon}{k_B T} = ` + r3(x) },
          { title: "Geometric-series factor", text: "Define q = exp(−βε); the partition sum converges because 0 < q < 1.", math: String.raw`q = e^{-x} = \exp(-` + r3(x) + String.raw`) = ` + r4(q) },
          { title: "Partition function", text: "Sum the geometric series over all oscillator levels.", math: String.raw`Z = \sum_{n=0}^{\infty} q^n = \frac{1}{1 - q} = ` + r4(Z) },
          { title: "Mean energy", text: "Differentiate ln Z with respect to β, or equivalently weight each level by its Boltzmann factor.", math: String.raw`\langle E\rangle = \frac{\varepsilon q}{1 - q} = ` + r4(U) + String.raw`\ \mathrm{eV}` },
          { title: "Energy fluctuations", text: "The second derivative of ln Z gives the variance; its square root is the standard deviation.", math: String.raw`\langle(\Delta E)^2\rangle = \frac{\varepsilon^2 q}{(1-q)^2} = ` + r5(varE) + String.raw`\ \mathrm{eV}^2,\qquad \Delta E = ` + r4(stdE) + String.raw`\ \mathrm{eV}` },
          { title: "Heat capacity", text: "Apply the fluctuation–response relation with β = 1/(k_B T).", math: String.raw`C = k_B x^2 \frac{q}{(1-q)^2} = ` + r2(C * 1e5) + String.raw`\times 10^{-5}\ \mathrm{eV\,K^{-1}}` },
        ],
        answer: "Z = " + r4(Z) + ", ⟨E⟩ = " + r4(U) + " eV, ⟨(ΔE)²⟩ = " + r5(varE) + " eV² with ΔE = " + r4(stdE) + " eV, and C = " + r2(C * 1e5) + " × 10^-5 eV/K.",
        alternatives: [
          "Use the Planck forms ⟨E⟩ = ε/(e^{βε} − 1) and C = k_B (βε)² e^{βε}/(e^{βε} − 1)².",
          "Use the fluctuation relation ⟨(ΔE)²⟩ = k_B T² C to obtain ΔE directly once the heat capacity is known.",
        ],
        mistakes: [
          "Summing the geometric series with ratio exp(+βε), which diverges.",
          "Confusing the variance ⟨(ΔE)²⟩ with its square root, the standard deviation ΔE.",
          "Using C = k_B β⟨(ΔE)²⟩ instead of C = k_B β²⟨(ΔE)²⟩.",
        ],
        further: "Show that in the high-temperature limit βε ≪ 1 the oscillator obeys equipartition, ⟨E⟩ ≈ k_B T and C ≈ k_B. Evaluate ⟨E⟩ at T = " + r0(T * 5) + " K to test how well the approximation holds there.",
      }
    },
  },
]

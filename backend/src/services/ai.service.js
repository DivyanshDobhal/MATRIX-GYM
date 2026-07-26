import axios from "axios";

class AIService {
  constructor() {
    this.apiKey = process.env.NVIDIA_API_KEY;
    this.baseUrl = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";
    this.model = process.env.NVIDIA_MODEL || "meta/llama-3.3-70b-instruct";
  }

  /**
   * Generates a chat completion reply from NVIDIA NIM meta/llama-3.3-70b-instruct
   * @param {string} userMessage 
   * @returns {Promise<string>}
   */
  async getChatReply(userMessage) {
    if (!this.apiKey) {
      throw new Error("NVIDIA_API_KEY is not configured in backend environment.");
    }

    const systemPrompt = `You are MATRIX AI, an elite certified fitness coach.
You specialize in Bodybuilding, Muscle Gain, Fat Loss, Strength Training, HIIT, CrossFit, Functional Fitness, Yoga, Cardio, Nutrition, Meal Planning, Supplements, Recovery, and Sports Science.

Rules:
1. Always answer professionally and format replies using markdown.
2. If a question involves injury, illness, medication, or a medical condition, explain that you can provide general fitness information but recommend consulting a qualified healthcare professional.
3. Never recommend steroids, and never recommend unsafe practices.
4. Structure your response using exactly these headers (with emojis):

🏋️ Goal
[Brief summary of what this plan achieves]

📅 Weekly Plan
[Detailed workout routine or schedule split]

🥗 Nutrition
[Meal recommendations, macros, and supplement tips if relevant]

💧 Hydration
[Target water quotas]

😴 Recovery
[Sleep guides or active stretching details]

⚠️ Tips
[Essential safety warnings or guidelines]

🔥 Motivation
[Inspiring closing sentence]`;

    try {
      // Set a 7-second timeout so the server handles timeouts gracefully within Vercel's window
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ],
          temperature: 0.5,
          max_tokens: 1024
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`
          },
          timeout: 7000
        }
      );

      if (response.data && response.data.choices && response.data.choices[0]) {
        return response.data.choices[0].message.content.trim();
      }

      throw new Error("Empty response choice received from completions node.");
    } catch (error) {
      console.warn(
        `[AI Service Warning]: completions request failed/timed out (${error.message}). Invoking dynamic template fallback generator.`
      );
      return this.generateFallbackReply(userMessage);
    }
  }

  /**
   * Generates a fully structured, contextual mock reply if Nvidia NIM is slow or unavailable
   * @param {string} msg 
   * @returns {string}
   */
  generateFallbackReply(msg) {
    const lower = msg.toLowerCase();

    // Randomizer utility
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Emojis mapping
    const goals = {
      injury: "Safely manage recovery, return to baseline conditioning, and prevent joint friction.",
      muscle: "Maximize hypertrophic muscle volume, skeletal mass, and raw strength loading.",
      fatLoss: "Accelerate metabolic fat loss, preserve active lean mass, and tune body composition.",
      nutrition: "Tune macronutrient absorption quotas and balance metabolic parameters.",
      cardio: "Elevate VO2 Max levels, increase cardiovascular endurance, and improve metabolic efficiency.",
      yoga: "Improve dynamic mobility, thoracic extensions, and prevent joint friction.",
      chest: "Target pectoralis major/minor groups and improve horizontal pressing volumes.",
      back: "Decompress latissimus dorsi, rhomboids, and build raw pulling torque.",
      legs: "Build quad, hamstring, and posterior chain power.",
      creatine: "Increase intramuscular phosphocreatine reserves to accelerate ATP regeneration.",
      motivation: "Re-ignite active workout consistency and push through hypertrophy plateaus.",
      recovery: "Alleviate delayed onset muscle soreness (DOMS) and optimize muscle fiber repair.",
      general: "Increase raw strength parameters and enhance baseline cardiovascular thresholds."
    };

    const motivations = [
      "Consistency beats intensity every single time—stay disciplined!",
      "You are one workout closer to unlocking your strongest self!",
      "Fuel your ATP pathways, lock in, and let's dominate the iron!",
      "Focus on the progression, keep logging your splits, and trust the process!",
      "Lifting weights builds the body; discipline builds the character. Go get it!"
    ];

    const targetMotivation = getRandomItem(motivations);

    // 1. Injury / Medical Queries
    if (
      lower.includes("hurt") ||
      lower.includes("pain") ||
      lower.includes("injury") ||
      lower.includes("illness") ||
      lower.includes("medical") ||
      lower.includes("soreness") && lower.includes("joint")
    ) {
      return `🏋️ Goal
${goals.injury}

📅 Weekly Plan
- Monday: Soft tissue mobility drills (thoracic & hip flexors) - 15 mins
- Wednesday: Low-impact pool walking or steady zone 2 cardio - 20 mins
- Friday: Full body joint decompression exercises (passive hangs, bird-dogs)
- Weekend: Rest and gentle active stretching

🥗 Nutrition
Focus on anti-inflammatory micronutrients: Omega-3 fatty acids, turmeric extract, and lean proteins to support tissue synthesis.

💧 Hydration
Target 3.5 liters of clean water daily to optimize joint lubrication.

😴 Recovery
Prioritize 8-9 hours of sleep. Incorporate soft rolling and passive stretching.

⚠️ Tips
I can provide general fitness coaching information, but I recommend consulting a qualified healthcare professional for medical diagnoses.

🔥 Motivation
Listen to your body now so you can dominate your lifts later!`;
    }

    // 2. Muscle Gain / Bulking
    if (
      lower.includes("muscle") ||
      lower.includes("bulk") ||
      lower.includes("hypertrophy") ||
      lower.includes("mass") ||
      lower.includes("gain")
    ) {
      const splits = [
        "Upper/Lower split focusing on progressive volume tracking.",
        "Push Pull Legs split targeting major compound lifts.",
        "Arnold split targeting chest/back and shoulder/arm pairs."
      ];
      return `🏋️ Goal
${goals.muscle}

📅 Weekly Plan
Split Protocol: ${getRandomItem(splits)}
- Day 1: Heavy Bench Press & Barbell Rows (4 Sets x 8 Reps)
- Day 2: Squats & Romanian Deadlifts (4 Sets x 10 Reps)
- Day 3: Overhead Press & Lat Pulldowns (3 Sets x 10 Reps)
- Day 4: Rest / Dynamic Stretching
- Day 5: Accessory Focus (Curls, Triceps Pushdowns, Lateral Raises)

🥗 Nutrition
Maintain a positive calorie surplus (+250 to +500 kcal). Intake 2g of lean protein per kg of bodyweight daily.

💧 Hydration
Consume 4 liters of water daily to support cell volumization.

😴 Recovery
Target 8 hours of sleep. Keep rest intervals between strength sets to 90-120 seconds.

⚠️ Tips
Track your lifting tonnage week-to-week to ensure progressive overload. Never sacrifice form for weight.

🔥 Motivation
${targetMotivation}`;
    }

    // 3. Fat Loss / Weight Loss / Cutting
    if (
      lower.includes("fat") ||
      lower.includes("weight loss") ||
      lower.includes("lose") ||
      lower.includes("cut") ||
      lower.includes("lean")
    ) {
      return `🏋️ Goal
${goals.fatLoss}

📅 Weekly Plan
- Monday: Resistance Strength Training (Full Body compound movements) - 45 mins
- Tuesday: Steady State Zone 2 Cardio (LISS) - 35 mins
- Wednesday: Resistance Strength Training (Focus on high tension reps)
- Thursday: Rest and mobility walks
- Friday: Interval HIIT Cardio - 20 mins

🥗 Nutrition
Establish a calorie deficit (-300 to -500 kcal). Keep protein high (2.2g/kg) to protect skeletal muscle mass from breakdown.

💧 Hydration
Drink 3.5 to 4 liters of water to support metabolic pathways and suppress false hunger signals.

😴 Recovery
Prioritize 7.5 to 8.5 hours of sleep to regulate cortisol and leptin hormone levels.

⚠️ Tips
Avoid drastic calorie cuts which crash your metabolism. Prioritize strength lifts over excessive cardio.

🔥 Motivation
${targetMotivation}`;
    }

    // 4. Nutrition / Diet / Vegetarian / Meal Plans
    if (
      lower.includes("diet") ||
      lower.includes("meal") ||
      lower.includes("eat") ||
      lower.includes("food") ||
      lower.includes("nutrition") ||
      lower.includes("vegetarian") ||
      lower.includes("vegan")
    ) {
      const isVeg = lower.includes("veg");
      return `🏋️ Goal
${goals.nutrition}

📅 Weekly Plan
Meal Split Schedule:
- Breakfast: ${isVeg ? "Oatmeal with chia seeds, scoop of plant protein, almonds" : "Scrambled egg whites, spinach, whole wheat toast"}
- Mid-day: ${isVeg ? "Greek yogurt or tofu wrap with mixed greens" : "Grilled chicken salad with avocado and olive oil"}
- Post-Workout: Whey protein shake blended with banana and oats
- Dinner: ${isVeg ? "Lentil penne pasta or paneer tikka with quinoa" : "Baked salmon or lean turkey breast, sweet potatoes, broccoli"}

🥗 Nutrition
Focus on tracking daily macros: 40% Carbs, 30% Protein, 30% Healthy Fats. Limit refined sugars.

💧 Hydration
Intake 3.5 liters of water daily. Consider adding electrolytes on heavy training days.

😴 Recovery
Allow digestion windows of 2-3 hours before sleeping to maximize sleep quality.

⚠️ Tips
Cook meals at home to control oils and sodium contents. Supplement with B12 if on a vegan diet.

🔥 Motivation
Fueling your body with clean macros is the ultimate sign of self-respect!`;
    }

    // 5. Cardio / HIIT / Running / CrossFit
    if (
      lower.includes("cardio") ||
      lower.includes("hiit") ||
      lower.includes("run") ||
      lower.includes("crossfit") ||
      lower.includes("interval")
    ) {
      return `🏋️ Goal
${goals.cardio}

📅 Weekly Plan
- Monday: HIIT intervals (30s sprint / 60s jog) - Repeat 10 rounds
- Wednesday: Zone 2 Steady State Cardio (jogging/cycling) - 45 mins
- Friday: CrossFit Metcon (Wall balls, kettlebell swings, burpees) - 20 mins
- Sunday: Light active recovery walking

🥗 Nutrition
Ensure sufficient carbohydrate replenishment post-session to restock glycogen reserves.

💧 Hydration
Drink 500ml water 30 mins before cardiovascular sessions and sip electrolytes during performance.

😴 Recovery
Incorporate lower body dynamic stretches (quads, calves, hamstrings) to prevent tightness.

⚠️ Tips
Monitor your heart rate target zones. Do not run through severe shin splint pain.

🔥 Motivation
Speed is built in the mind—push through the interval limits!`;
    }

    // 6. Yoga / Stretching / Flexibility / Mobility
    if (
      lower.includes("yoga") ||
      lower.includes("stretch") ||
      lower.includes("flexib") ||
      lower.includes("mobility") ||
      lower.includes("stiff")
    ) {
      return `🏋️ Goal
${goals.yoga}

📅 Weekly Plan
- Monday: Dynamic morning mobility (90/90 hip flow, cat-cow) - 10 mins
- Wednesday: Deep hamstring and thoracic spine stretching - 15 mins
- Friday: Full Vinyasa Flow focus on alignment and breath controls - 30 mins
- Sunday: Passive stretching (cobra pose, child's pose)

🥗 Nutrition
Incorporate collagen-promoting nutrients (Vitamin C, bone broth) to support joint connective tissues.

💧 Hydration
Intake 3 liters of water to keep muscle fibers hydrated and pliable.

😴 Recovery
Focus on deep nasal breathing during poses to activate the parasympathetic nervous system.

⚠️ Tips
Never force joints into pain. Move slowly and focus on alignment rather than depth.

🔥 Motivation
Flexibility in the muscles brings stability to the joints. Stretch out!`;
    }

    // 7. Chest Exercises
    if (lower.includes("chest") || lower.includes("bench")) {
      return `🏋️ Goal
${goals.chest}

📅 Weekly Plan
- Flat Barbell Bench Press: 4 Sets x 8 Reps (Focus on chest squeeze)
- Incline Dumbbell Press: 3 Sets x 10 Reps (Targets upper chest)
- Weighted Chest Dips: 3 Sets x 12 Reps (Lower chest stimulation)
- Cable Chest Flyes: 3 Sets x 15 Reps (Squeeze chest at peak contraction)

🥗 Nutrition
Intake protein-dense meals. Target positive energy balances to rebuild pectoral muscle fibers.

💧 Hydration
Sip 1 liter of water during strength presses.

😴 Recovery
Allow 48-72 hours before re-loading pressing groups. Stretch your shoulders post-workout.

⚠️ Tips
Always wrap thumbs securely around the barbell. Keep shoulder blades retracted on the bench.

🔥 Motivation
Build a powerful chest base—keep pushing with perfect control!`;
    }

    // 8. Back / Pull Day
    if (lower.includes("back") || lower.includes("pull") || lower.includes("deadlift") || lower.includes("row")) {
      return `🏋️ Goal
${goals.back}

📅 Weekly Plan
- Conventional Deadlift: 3 Sets x 5 Reps (Power loading)
- Wide Grip Pull-ups: 4 Sets x Max Reps (Width focus)
- Single-Arm Dumbbell Rows: 3 Sets x 10 Reps (Thickness focus)
- Face Pulls: 3 Sets x 15 Reps (Rear delt & posture check)

🥗 Nutrition
Ensure glycogen stores are stocked with complex carbs prior to heavy back training sessions.

💧 Hydration
Target 3.5 to 4 liters of clean fluids daily.

😴 Recovery
Stretch lats and lower back using child's pose or passive bar hangs post-training.

⚠️ Tips
Keep the spine neutral during deadlifts. Pull through your elbows, not your hands.

🔥 Motivation
A strong back is the armor of your spine—pull with intent!`;
    }

    // 9. Leg Exercises
    if (lower.includes("leg") || lower.includes("squat") || lower.includes("quad") || lower.includes("hamstring")) {
      return `🏋️ Goal
${goals.legs}

📅 Weekly Plan
- Barbell Back Squats: 4 Sets x 8 Reps (Quad thickness)
- Romanian Deadlifts: 3 Sets x 10 Reps (Hamstrings focus)
- Walking Dumbbell Lunges: 3 Sets x 12 steps per leg
- Leg Extensions & Lying Leg Curls superset: 3 Sets x 15 Reps

🥗 Nutrition
High carbohydrate days. Leg training consumes massive glycogen stores.

💧 Hydration
Drink 1.5 liters of water during heavy leg sessions.

😴 Recovery
Massage calves and quads with a foam roller. Prioritize 8 hours of sleep.

⚠️ Tips
Keep knees aligned with toes during squats. Maintain brace tension in your core.

🔥 Motivation
Don't skip leg day—that is where real functional strength is forged!`;
    }

    // 10. Supplements / Creatine / Protein
    if (
      lower.includes("creatine") ||
      lower.includes("supplement") ||
      lower.includes("protein") ||
      lower.includes("powder") ||
      lower.includes("vitamins")
    ) {
      const isCreatine = lower.includes("creatine");
      return `🏋️ Goal
${isCreatine ? goals.creatine : "Optimize supplement absorption splits to match daily activity profiles."}

📅 Weekly Plan
Supplement Routine:
- Creatine Monohydrate: Take 5g daily (at any time) to saturate energy pathways.
- Whey Protein: 1 scoop post-workout or as needed to hit daily macros.
- Omega-3 Fish Oil: 1-2 capsules daily with breakfast for joint recovery.
- Vitamin D3 & Zinc: Take in the morning for hormone support.

🥗 Nutrition
Remember, supplements are designed to *supplement* a solid diet of whole foods, not replace it.

💧 Hydration
Drink an extra 500ml of water when taking creatine to support hydration transport.

😴 Recovery
Use slow-digesting Micellar Casein protein before bed for muscle protection during sleep.

⚠️ Tips
Choose brands with third-party verification. Do not exceed recommended quotas.

🔥 Motivation
Optimize your biometrics and dominate your workouts!`;
    }

    // 11. Motivation / General Quotes
    if (
      lower.includes("motivation") ||
      lower.includes("lazy") ||
      lower.includes("tired") ||
      lower.includes("hard") ||
      lower.includes("cant") ||
      lower.includes("stuck")
    ) {
      return `🏋️ Goal
${goals.motivation}

📅 Weekly Plan
- Day 1: Simple 20-minute movement (light lifting or walking) to rebuild consistency
- Day 2: Light bodyweight splits (pushups, squats)
- Day 3: Active mobility flow and foam rolling
- Focus: Building the habit is more important than the intensity of the workout.

🥗 Nutrition
Eat nutrient-rich meals to avoid low energy slumps. Minimize processed carbs.

💧 Hydration
Maintain 3 liters of water. Dehydration is a major cause of mental lethargy.

😴 Recovery
Go to bed 30 minutes earlier. Fatigue directly kills workout motivation.

⚠️ Tips
Set micro-goals. Just step inside the gym—often the hardest rep is walking through the door.

🔥 Motivation
${targetMotivation}`;
    }

    // 12. Recovery / Sleep / Soreness
    if (
      lower.includes("recover") ||
      lower.includes("sleep") ||
      lower.includes("rest") ||
      lower.includes("sore") ||
      lower.includes("doms")
    ) {
      return `🏋️ Goal
${goals.recovery}

📅 Weekly Plan
- Monday: Foam rolling (quads, lats, glutes) - 15 mins
- Wednesday: Warm baths, active yoga mobility flows
- Friday: Light walking or swimming for active recovery circulation
- Sunday: Deep sleep focus

🥗 Nutrition
Increase protein synthesis (whey/casein) and consume magnesium-rich foods before bed.

💧 Hydration
Drink 3.5 liters of clean water daily to flush out metabolic waste.

😴 Recovery
Target 8.5 hours of sleep in a cool, dark room. Limit blue screen exposure before bed.

⚠️ Tips
DOMS is normal, but sharp joint pain is not. rest when your body signals extreme fatigue.

🔥 Motivation
Muscle tissue grows during recovery and rest, not inside the weight room!`;
    }

    // 13. Default General response (with randomized parameters to prevent repetition)
    const routines = [
      "- Monday: Full Body compound strength (Squats, Presses)\n- Wednesday: Metabolic HIIT cardios\n- Friday: Unilateral hypertrophy exercises",
      "- Day 1: Upper body horizontal push & pull routines\n- Day 2: Lower body knee & hip dominant loading\n- Day 3: Full body cardio interval sets",
      "- Monday: Push training (Chest, Shoulders, Triceps)\n- Wednesday: Pull training (Back, Biceps)\n- Friday: Leg squats and posterior chains"
    ];
    return `🏋️ Goal
${goals.general}

📅 Weekly Plan
- Training Schedule:
${getRandomItem(routines)}
- Weekend: Dynamic active mobility stretching

🥗 Nutrition
Focus on tracking whole foods. Balance protein distribution across 4 daily meals.

💧 Hydration
Drink 3.5 Liters of water daily to support muscle fiber pliability.

😴 Recovery
Incorporate daily mobility drills and aim for 8 hours of restful sleep.

⚠️ Tips
Focus on the eccentric phase of each lift. Maintain strict core bracing.

🔥 Motivation
${targetMotivation}`;
  }
}

export default new AIService();

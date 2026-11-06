// The long-form content for each lesson page, keyed by lesson slug. Merged into LESSONS in lessons.ts.
//   videos: short YouTube tutorials. id = the part after watch?v=. The first one plays by default.
//   tutorial.steps: title + paragraphs. Add `prompt` to show a copyable prompt in the step, `tip` for a side note.
//   kit: the tools used in the lesson. Each prompt says when to use it (`step` matches a tutorial step number).
//   links: slides and anything else worth keeping.
// Prompts: put the parts people fill in inside [BRACKETS]. They show highlighted on the page.

export type Video = { id: string; title: string; by: string; mins: number; about: string };
export type Step = { title: string; body: string[]; prompt?: { tool: string; text: string }; tip?: string };
export type Prompt = { title: string; step?: number; when: string; text: string };
export type KitTool = { name: string; icon: string; href: string; role: string; note?: string; prompts?: Prompt[] };
export type Guide = {
  videos?: Video[];
  tutorial?: { intro?: string; steps: Step[] };
  kit?: KitTool[];
  links?: { label: string; href: string; kind: string }[];
};

const slides = (personal: string, school: string, n: number, pptx = false) => {
  const url = (id: string) => `https://docs.google.com/presentation/d/${id}/edit?usp=sharing${pptx ? "&rtpof=true&sd=true" : ""}`;
  return [
    { label: `Meeting ${n} slides (personal email)`, href: url(personal), kind: "Slides" },
    { label: `Meeting ${n} slides (school email)`, href: url(school), kind: "Slides" },
  ];
};

export const GUIDES: Record<string, Guide> = {
  "intro-session": {
    links: slides("1V4XKkLo5uc1SPFOwIqpwd-rVMAlZi_KyQvn3oBzHEB0", "1XaPeAmTWsA9yI0EK8bfCufeXiZL3zgp4CpIegWvzawM", 1),
  },

  /* ------------------------------------------------------------------ Meeting 2 */
  "freelancing-with-ai": {
    videos: [
      { id: "h6hbCtA4dXQ", title: "Build a full website just by chatting with YouWare", by: "AI Expert", mins: 8, about: "Watch a site get built from one prompt, then changed by describing what to fix. This is step 5 and 6 of the tutorial." },
      { id: "MRXDI-U7TU0", title: "A complete website in 5 minutes with YouWare", by: "How Tech", mins: 5, about: "A faster run through the same flow: describe the site, generate it, edit it and publish it." },
      { id: "mUAPt0FM-kQ", title: "Rebuild a real local business website with Claude", by: "Profit Studio", mins: 15, about: "Find an outdated local business site, plan a better one with Claude, and fix the copy and the mobile layout. This is how you make a sample for a real client." },
    ],
    tutorial: {
      intro: "By the end you will have a homepage for a local business, built with AI, and a plan for how you would sell it. Plan with Claude, build with YouWare, then test it before anyone sees it.",
      steps: [
        {
          title: "Pick the business you are building for",
          body: [
            "For practice, pick a made-up local business: a landscaping company, a cleaning service, a barbershop or a handyman. Give it a name and a town.",
            "Want to build for a real business instead? Find one near you with no website, an old website, a confusing list of services or no easy way to contact them. Those are the problems you are fixing.",
          ],
        },
        {
          title: "Research the business and its customers",
          body: [
            "Before you build anything, write down who the customers are (homeowners? busy parents?), what services the business offers, and what is wrong with its current site.",
            "If it is a real business, only use information you can see in public: their Google listing, their old site, their social pages. Never make up reviews, prices, awards or contact details.",
          ],
        },
        {
          title: "Plan the pages with Claude",
          body: [
            "Open Claude and give it your notes. Ask it to plan the pages, write the headline and service descriptions, and suggest a simple design.",
            "A good small business site needs a homepage with a clear headline, a services section, an about section, the area they serve, and a contact section with one big button such as “Request a quote”.",
          ],
          prompt: { tool: "Claude", text: "I'm building a website for [BUSINESS NAME], a [TYPE OF BUSINESS] in [TOWN]. Their customers are [WHO]. They offer [SERVICES].\nPlan a one-page website with these sections: hero, services, about, service area, contact. For each section, write the headline and the text. Suggest a color scheme and one main call-to-action button. Only use the facts I gave you. Don't invent reviews, prices, awards or contact details." },
        },
        {
          title: "Write a strong build prompt",
          body: [
            "The secret is in the prompt. “Make a website for a landscaping business” gives you something generic. A good prompt says who the customer is, what the site is for, which sections it needs, how it should look, and what the AI must not do.",
            "Ask Claude to turn your plan into one build prompt. You will paste it into YouWare in the next step.",
          ],
          prompt: { tool: "Claude", text: "Turn the plan above into one build prompt for an AI website builder. Include: the customer, the purpose of the site, every section in order, the colors and style, mobile-friendly layout, a big \"Request a quote\" button, and this rule: use only the business information provided, and don't invent reviews, certifications, prices or contact details." },
        },
        {
          title: "Build it in YouWare",
          body: [
            "Open YouWare, start a new project and paste your build prompt. Let it generate the first version.",
            "Don't expect it to be perfect. The first draft is just the starting point. Look at it on your laptop and on your phone before changing anything.",
          ],
          tip: "Need a booking form, a quote calculator or a customer login? That is an app, not a website. Use Base44 for it.",
        },
        {
          title: "Improve it, one change at a time",
          body: [
            "Tell YouWare exactly what to change, in plain words: “make the quote button bigger and put it at the top”, “the services text is too long, cut it in half”. One change per message works better than five at once.",
            "If a change makes it worse, ask it to undo the last change. Keep going until the site looks like something you would be proud to show a business owner.",
          ],
        },
        {
          title: "Test it before you share it",
          body: [
            "Click every link and button. Open the site on your phone. Read every word for spelling mistakes. Fill in the contact form and check it works.",
            "If you used sample information, mark it clearly, for example “Sample phone number”. Professional work means checking the AI's work, not just trusting it.",
          ],
        },
        {
          title: "Decide what you would charge",
          body: [
            "Starting points (not guarantees): a one-page landing page could be $100 to $200, a simple small business site $200 to $500, and a bigger site with several pages $500 or more. Extra changes the client asks for later are priced separately.",
            "Remember that revenue is not profit. If you charge $300, spend $30 and work 6 hours, you earn about $45 an hour. If it takes 12 hours, that drops to $22.50. Track your time and agree on how many rounds of changes are included before you start.",
          ],
          tip: "Don't promise online payments, complex features or ongoing support unless you know how to deliver them.",
        },
        {
          title: "Find your first client",
          body: [
            "Pick one niche, like landscapers. Search Google Maps for them in your area and look for the ones with an old or missing website. Find one real problem, such as no contact button or services that are hard to find.",
            "Build a sample redesign using their real public information, then reach out politely. Explain the one thing you would improve, and show the sample. Don't pretend you were hired, and don't promise it will get them more customers. Let them decide.",
          ],
          tip: "Under 18? Fiverr requires 13 to 17 year olds to use an account owned by a parent or guardian, with their permission. Upwork has its own age rules. Never use a fake birth date.",
        },
        {
          title: "Present your idea",
          body: [
            "Be ready to answer four questions: Who is your customer? What problem are you solving? What would you charge, and what does that include? Where would you find your first client?",
            "A site that looks good is a start. A site that solves a real problem is a business.",
          ],
        },
      ],
    },
    kit: [
      {
        name: "Claude", icon: "anthropic", href: "https://claude.ai", role: "Think and plan. Use it for research, the page plan, all the words on the site, and your build prompt.",
        prompts: [
          { title: "Plan the whole site", step: 3, when: "Before you open YouWare, once you know the business and its customers.", text: "I'm building a website for [BUSINESS NAME], a [TYPE OF BUSINESS] in [TOWN]. Their customers are [WHO]. They offer [SERVICES].\nPlan a one-page website with these sections: hero, services, about, service area, contact. For each section, write the headline and the text. Suggest a color scheme and one main call-to-action button. Only use the facts I gave you. Don't invent reviews, prices, awards or contact details." },
          { title: "Write the build prompt", step: 4, when: "Right after the plan. Paste the result into YouWare.", text: "Turn the plan above into one build prompt for an AI website builder. Include: the customer, the purpose of the site, every section in order, the colors and style, mobile-friendly layout, a big \"Request a quote\" button, and this rule: use only the business information provided, and don't invent reviews, certifications, prices or contact details." },
          { title: "Rewrite the words so they sound human", step: 6, when: "When the text on your site sounds stiff, salesy or too long.", text: "Here is the text from my website for [BUSINESS NAME]:\n[PASTE TEXT]\nRewrite it so it sounds like a friendly local business owner talking to a neighbor. Keep every sentence short. Cut anything that doesn't help a customer decide to call. Don't add any facts I didn't give you." },
          { title: "Audit a real business's website", step: 9, when: "When you are looking for a client and found a business with an old site.", text: "I'm looking at the website for [BUSINESS NAME], a [TYPE OF BUSINESS]. Here is what's on it:\n[PASTE THE TEXT FROM THEIR SITE, OR DESCRIBE IT]\nList the 5 biggest problems a customer would have with this site, starting with the worst. For each one, say how I would fix it. Keep it simple enough to explain to the owner in one minute." },
          { title: "Write a polite first message to a business", step: 9, when: "After you have built a sample for them.", text: "Write a short, polite message to the owner of [BUSINESS NAME]. I'm a student who builds websites. I noticed their site [ONE SPECIFIC PROBLEM]. I made a free sample of how it could look: [LINK]. Ask if they would like to see it in more detail. Don't promise more customers or results. Under 100 words." },
          { title: "Check my price", step: 8, when: "Before you tell a client what it costs.", text: "I'm building a [NUMBER]-page website for a local [TYPE OF BUSINESS]. It includes [WHAT'S INCLUDED]. I think it will take me [HOURS] hours and cost me $[EXPENSES]. I'm thinking of charging $[PRICE].\nWhat would I earn per hour? Is this price reasonable for a beginner? What should I say is included, and how many rounds of changes should I allow?" },
          { title: "Write my Fiverr gig", step: 9, when: "When you (or your parent's account) are ready to list a service on Fiverr.", text: "Write a Fiverr gig for a beginner who builds simple websites for local businesses using AI tools. Include: a short title, a description under 150 words, 3 packages (Basic, Standard, Premium) with what each includes and a price, and 3 FAQs. Be honest: no fake reviews or claims of experience I don't have." },
        ],
      },
      {
        name: "YouWare", icon: "youware", href: "https://www.youware.com/ai-website-builder", role: "Build the website. Paste your build prompt, then keep describing changes until it's right.",
        prompts: [
          { title: "First message: build the site", step: 5, when: "The very first message in a new YouWare project. Use your own build prompt from Claude, or this one.", text: "Create a modern, professional website for a local landscaping business called [NAME] in [TOWN]. The target customers are homeowners. Include a homepage, services section, about section, service-area section and contact section. Use a clean green-and-white design, clear headings, mobile-friendly layouts and a prominent button to request a quote. Use only the business information provided. Do not invent reviews, certifications, prices or contact details." },
          { title: "Fix how it looks on phones", step: 6, when: "After you open the site on your phone and something looks off.", text: "On phone screens, [WHAT LOOKS WRONG, e.g. the menu covers the headline]. Fix the mobile layout so everything is easy to read and tap. Don't change the desktop design." },
          { title: "Make the main button stand out", step: 6, when: "When the call-to-action gets lost on the page.", text: "Make the \"Request a quote\" button the most obvious thing on the page. Put it in the hero section and again at the bottom. Make it bigger and use a color that stands out from the background." },
          { title: "Change the style", step: 6, when: "When the layout is right but it doesn't feel like the business.", text: "Keep the same sections and text, but change the style to feel [WORDS, e.g. calm and premium / bold and friendly]. Use [COLORS] and a cleaner font. Add more space between sections." },
          { title: "Add a working contact form", step: 6, when: "When the contact section is just text.", text: "Replace the contact section with a simple form: name, phone or email, what service they need, and a message. Add a clear thank-you message after they send it. Mark the business phone number as \"Sample number\"." },
          { title: "Undo a bad change", step: 6, when: "When the last change made it worse.", text: "Undo the last change you made and go back to the previous version. Then tell me what you changed so I can ask for it differently." },
        ],
      },
      {
        name: "Base44", icon: "base44", href: "https://base44.com", role: "Build an app when a website isn't enough: bookings, quote calculators, dashboards or customer logins.",
        prompts: [
          { title: "Quote request app", step: 5, when: "When a client wants customers to get a price estimate online.", text: "Build a quote request app for [BUSINESS NAME], a [TYPE OF BUSINESS]. Customers pick a service from [LIST OF SERVICES], enter their address and the size of the job, and see a rough estimate based on these rules: [PRICING RULES]. They can then send their name and phone number. Give the owner a simple page listing every request." },
          { title: "Booking app", step: 5, when: "When a client like a barbershop wants online appointments.", text: "Build a booking app for [BUSINESS NAME]. Customers choose a service, pick an open time slot, and enter their name and phone number. Opening hours are [HOURS]. The owner can see today's bookings and mark them as done. Keep it simple and mobile-friendly." },
        ],
      },
      { name: "Fiverr", icon: "fiverr", href: "https://www.fiverr.com", role: "List a service like “small business website” and let clients find you.", note: "Ages 13 to 17 need an account owned by a parent or guardian. Write your gig with the Claude prompt above." },
      { name: "Upwork", icon: "upwork", href: "https://www.upwork.com", role: "Clients post jobs and freelancers send proposals.", note: "Check Upwork's age rules before you sign up." },
    ],
    links: slides("1AKmw6pBrQMqxGs9qpNHJaF8fwm1fcyXZ", "1ObwB6dZz_UkB1eU26Wm6ZZsd5BXy8TDL", 2, true),
  },

  /* ------------------------------------------------------------------ Meeting 3 */
  "app-dev-day-1": {
    videos: [
      { id: "x9TFKNgaDjo", title: "How to find app ideas people will actually pay for", by: "SJCodes", mins: 9, about: "Find a real problem by reading what people complain about, which is exactly the niche and gap part of this lesson." },
      { id: "OlP57plalDo", title: "Design a mobile app from scratch with AI", by: "Steven Cravotta", mins: 5, about: "Generate app screens with AI and improve them round by round before you build." },
      { id: "Y-QCP2EMml4", title: "Build complete apps with Claude", by: "TechPP", mins: 5, about: "Turn a plain-English description into a working app you can click through and share." },
    ],
    tutorial: {
      intro: "Four parts: Niche, Gap, Price, Build. You will pick a group of people with a problem, find what other apps get wrong, decide what to charge, and build a first working version.",
      steps: [
        {
          title: "Pick a niche",
          body: [
            "A niche is a small group of people who share one problem, again and again. It passes three tests: you know these people, they have the problem every week (not once), and you could ask 5 of them about it.",
            "Not sure where to start? Ask yourself what you waste time on every week, what your friends keep complaining about, what you know better than most people, and what you wish an app did.",
          ],
        },
        {
          title: "Narrow it down to one sentence",
          body: [
            "“Students” is too wide: millions of people with different problems. “Students with many classes” is closer. “Students who lose track of what is due” is good: one group, one repeated problem.",
            "Write it as: My niche is ____, for people who ____. Tell a partner. If you can't name 5 real people who have this problem, narrow it more.",
          ],
          prompt: { tool: "Claude", text: "My niche idea is [YOUR IDEA]. Help me narrow it down. Give me 3 narrower versions, each written as: \"My niche is ____, for people who ____.\" For each one, tell me how often they have the problem and where I could find 5 of them to ask." },
        },
        {
          title: "Find the top 3 apps already in your niche",
          body: [
            "Search the App Store or Google Play using your niche words. Open the 3 most popular apps.",
            "For each one, write down how it makes money and what it costs: free, a one-time price, or a monthly price.",
          ],
        },
        {
          title: "Read the bad reviews",
          body: [
            "Scroll to the 1 to 3 star reviews. These are gold. Look for three things: the pain (what annoys people), the workaround (what they do instead), and the wish (what they want the app to do).",
            "Copy the reviews that complain. That list is where your app idea comes from.",
          ],
        },
        {
          title: "Speed it up with Perplexity",
          body: [
            "Perplexity searches the web and shows its sources, so it is good for research. Ask it for four things: the most popular apps in your niche, what each one costs, what people complain about in their bad reviews, and what gap is still left.",
            "Save its answer. You will give it to Claude in a minute.",
          ],
          prompt: { tool: "Perplexity", text: "I'm researching apps for [YOUR NICHE]. Find:\n1. The 3 to 5 most popular apps for this.\n2. What each one costs (free, one-time or monthly, and the price).\n3. The most common complaints in their 1 to 3 star reviews.\n4. What problem none of them solve well yet, and why.\nShow your sources." },
        },
        {
          title: "Pick your price",
          body: [
            "Answer three questions. What do the top 3 apps charge? How big is the annoyance your app removes? (A small annoyance is worth a small price.) Would you honestly pay for it yourself?",
            "Choose how you will earn: ads, a one-time price, monthly, or free with an upgrade. Most apps use three tiers: Free (the basics, so people try it), Plus (everything most people need, the one you want them to pick) and Pro (extras for power users).",
          ],
        },
        {
          title: "Get the idea and build prompt from Claude",
          body: [
            "Paste your Perplexity research into Claude. Ask for one app idea, not ten: focus beats a long list. Ask for only three features, so the first version stays small, and three pricing options with a recommendation.",
            "Then ask for a build prompt with four parts: Role (who the AI should act as), Goal (what to build), Context (who it's for and why) and Format (how it should look and work).",
          ],
          prompt: { tool: "Claude", text: "Here is my research on [YOUR NICHE]:\n[PASTE PERPLEXITY ANSWER]\nGive me:\n1. One app idea that fixes the biggest gap. Just one.\n2. Three features for the first version. Keep it small.\n3. Three pricing options (Free, Plus, Pro) with a recommendation and why.\n4. A build prompt I can paste into an AI app builder, with four parts: Role, Goal, Context, Format." },
        },
        {
          title: "Design two screens with ChatGPT",
          body: [
            "Ask ChatGPT for two screens: the home screen and the screen where people do the main action. Two is enough for a first prototype.",
            "Then say exactly what is wrong: what is confusing, missing or too busy. Ask again and fix one thing each round. Save every version (v1, v2, v3) so you can go back.",
          ],
          prompt: { tool: "ChatGPT", text: "Design 2 mobile app screens for [APP NAME], an app that helps [WHO] [DO WHAT]. Screen 1: the home screen. Screen 2: the screen where they [MAIN ACTION]. Clean, modern, easy to use with one hand. Show them side by side as a realistic phone mockup." },
        },
        {
          title: "Build the first prototype",
          body: [
            "Open YouWare (or Claude) and paste the four-part build prompt. Attach your best screen designs so the app looks like your design.",
            "Run it. Open the preview and click through the main action like a real user would. If something breaks or looks wrong, describe it and ask for a fix.",
          ],
        },
        {
          title: "Bring these next week",
          body: [
            "Your stack: Perplexity for research, Claude for the idea and the prompt, ChatGPT for the screens, YouWare or Claude Code to build it.",
            "Bring a working prototype, 3 screenshots, your price next to what the top 3 apps charge, and a web version or landing page. Next week is launch day.",
          ],
        },
      ],
    },
    kit: [
      {
        name: "Perplexity", icon: "perplexity", href: "https://www.perplexity.ai", role: "Research. Find the competitors, their prices and their bad reviews, with sources.",
        prompts: [
          { title: "Full niche research", step: 5, when: "Once you have your niche sentence. Do this first.", text: "I'm researching apps for [YOUR NICHE]. Find:\n1. The 3 to 5 most popular apps for this.\n2. What each one costs (free, one-time or monthly, and the price).\n3. The most common complaints in their 1 to 3 star reviews.\n4. What problem none of them solve well yet, and why.\nShow your sources." },
          { title: "Dig into one competitor", step: 4, when: "When one app keeps coming up and you want to know where it falls short.", text: "What do users dislike most about [APP NAME]? Look at App Store and Google Play reviews and Reddit. Group the complaints into themes and give a real example quote for each." },
          { title: "Check if people really have this problem", step: 2, when: "Before you commit to a niche.", text: "Are people actively looking for a solution to [PROBLEM]? Find Reddit threads, forum posts or reviews where [WHO] talk about it. How often does it come up, and what do they use today?" },
          { title: "Compare prices", step: 6, when: "When you are choosing your price.", text: "Make a table of apps for [YOUR NICHE] with: app name, free plan (yes/no), paid price, billing (monthly, yearly or one-time) and what the paid plan adds." },
        ],
      },
      {
        name: "Claude", icon: "anthropic", href: "https://claude.ai", role: "Think it through. Narrow your niche, pick one idea, set the price and write the build prompt.",
        prompts: [
          { title: "Narrow my niche", step: 2, when: "When your niche feels too wide.", text: "My niche idea is [YOUR IDEA]. Help me narrow it down. Give me 3 narrower versions, each written as: \"My niche is ____, for people who ____.\" For each one, tell me how often they have the problem and where I could find 5 of them to ask." },
          { title: "Find the gap in these reviews", step: 4, when: "After you copied the bad reviews from the app store.", text: "Here are 1 to 3 star reviews from the top apps in [YOUR NICHE]:\n[PASTE REVIEWS]\nSort them into: pains (what annoys people), workarounds (what they do instead) and wishes (what they want). Then tell me the one gap that shows up the most." },
          { title: "Idea, features, price and build prompt", step: 7, when: "After your Perplexity research. This is the main one.", text: "Here is my research on [YOUR NICHE]:\n[PASTE PERPLEXITY ANSWER]\nGive me:\n1. One app idea that fixes the biggest gap. Just one.\n2. Three features for the first version. Keep it small.\n3. Three pricing options (Free, Plus, Pro) with a recommendation and why.\n4. A build prompt I can paste into an AI app builder, with four parts: Role, Goal, Context, Format." },
          { title: "Fill in my price sentence", step: 6, when: "When you know what the top 3 apps charge.", text: "The top 3 apps in my niche charge [PRICE 1], [PRICE 2] and [PRICE 3]. My app [WHAT IT DOES] and removes this annoyance: [ANNOYANCE]. Should I use ads, one-time, monthly or free plus upgrade? Finish this sentence for me: \"My price is $__ because ____.\"" },
          { title: "Write my landing page", step: 10, when: "When the prototype works and you need a page that explains it.", text: "Write the text for a one-page landing page for [APP NAME], which helps [WHO] [DO WHAT]. Include: a headline under 8 words, one sentence under it, 3 benefits, a Free vs Plus vs Pro pricing table using [PRICES], and a \"Try it free\" button. Keep it simple and honest." },
        ],
      },
      {
        name: "ChatGPT", icon: "openai", href: "https://chatgpt.com", role: "Design the screens. Make a mockup, say what's wrong, and fix one thing each round.",
        prompts: [
          { title: "First two screens", step: 8, when: "After Claude gives you the idea and three features.", text: "Design 2 mobile app screens for [APP NAME], an app that helps [WHO] [DO WHAT]. Screen 1: the home screen. Screen 2: the screen where they [MAIN ACTION]. Clean, modern, easy to use with one hand. Show them side by side as a realistic phone mockup." },
          { title: "Fix one thing", step: 8, when: "Every round after the first. One change at a time.", text: "Keep everything the same except this: [ONE SPECIFIC CHANGE, e.g. the add button is hard to find, make it a big round button at the bottom right]." },
          { title: "Get honest feedback", step: 8, when: "When you can't tell what's wrong with a screen.", text: "Look at this screen as a [WHO] seeing it for the first time. What is confusing, what is missing and what is too busy? Give me the 3 most important fixes." },
          { title: "Match a style you like", step: 8, when: "When you found an app whose look you like.", text: "Redesign my screens in a style similar to this screenshot: same feel, spacing and colors, but keep my layout and my features. Don't copy their logo or name." },
        ],
      },
      {
        name: "YouWare", icon: "youware", href: "https://www.youware.com", role: "Build the prototype. Paste the build prompt, attach your screens and click through it.",
        prompts: [
          { title: "Build the prototype", step: 9, when: "Once you have the build prompt and your best screens.", text: "[PASTE THE 4-PART BUILD PROMPT FROM CLAUDE]\nI've attached my screen designs. Make the app look like them. Start with the home screen and the [MAIN ACTION] screen, and make the main action actually work." },
          { title: "Fix what broke", step: 9, when: "When you click something and it doesn't work.", text: "When I [WHAT YOU DID], [WHAT HAPPENED] instead of [WHAT SHOULD HAPPEN]. Fix it without changing anything else." },
          { title: "Add a landing page", step: 10, when: "When the app works and you need a page to send people to.", text: "Add a landing page before the app with: a headline, one sentence about what it does, 3 benefits, Free vs Plus vs Pro pricing at [PRICES], and a \"Try it free\" button that opens the app." },
          { title: "Make it work on phones", step: 9, when: "Before you take your 3 screenshots.", text: "Make the whole app work well on a phone screen. Buttons big enough to tap, text easy to read, nothing cut off at the edges." },
        ],
      },
    ],
    links: slides("1UeEgzBaFCXaYi03vhbx1oQ0OIopOdHXHtiwvw35ALAY", "1XvNVRcvNF6GctobT6K6-5ojGtlxo6-sEloIFbaiAyDc", 3),
  },

  /* ------------------------------------------------------------------ Meeting 4 */
  "app-dev-day-2": {
    videos: [
      { id: "uEZ3kNbc-wc", title: "Make a Claude Code website live with GitHub and Vercel", by: "Duncan Rogoff", mins: 7, about: "Build with Claude Code, push it to GitHub and deploy it on Vercel. The exact flow from steps 6 and 7." },
      { id: "5OdmR1-3jvQ", title: "Add logins and a database with Supabase and Claude Code", by: "SkillAgents AI", mins: 6, about: "Create a Supabase project and add email sign-up, login and saved data, all through plain-English prompts." },
      { id: "sB6bPOvvlgw", title: "Set up “Sign in with Google” in Supabase", by: "Arielle Phoenix", mins: 6, about: "The Google Cloud and Supabase settings you need so the Google button works." },
    ],
    tutorial: {
      intro: "Today your app gets a real link anyone can open, a landing page, and a way to take payments. One prompt does most of the build. The rest is connecting GitHub and Vercel.",
      steps: [
        {
          title: "Get set up before you start",
          body: [
            "You need three things: your app from App dev day 1, a GitHub account (github.com) and a Vercel account (vercel.com). Sign up for Vercel with your GitHub account so the two are already connected.",
            "You will build with Claude Code. Open your app's folder in it so it can see and change your files.",
          ],
        },
        {
          title: "Fill in the one big prompt",
          body: [
            "This one prompt builds the landing page, the Pro plan, the payment check and the security. Fill in every part in [BRACKETS] before you paste it: your app's name, who it's for, your payment handles and the feature you want to lock behind Pro.",
          ],
          prompt: { tool: "Claude Code", text: "Build on my app [NAME]. It helps [WHO] [DO WHAT].\nAdd a landing page with a headline, 3 benefits, Free vs Pro ($5/month) pricing and a \"Try it free\" button. Put the app at /app.\nAdd a Pro plan: $5 for 30 days by Venmo (venmo.com/u/[NAME]), Cash App (cash.app/$[TAG]/5) or Zelle ([EMAIL/PHONE]), with a code in the payment note. Add login if I need it.\nSecurity system: connect to the email inbox [EMAIL] that gets the payment alerts. When an alert comes in, only trust the real Venmo, Cash App or bank sender, check the code and the $5 amount, then turn on Pro for that user automatically. Log every payment.\nLock [PRO FEATURE] on the server, keep my API keys out of the browser, and get it ready to deploy on Vercel." },
        },
        {
          title: "Let Claude Code work, then check it",
          body: [
            "Paste the prompt and let it run. It may ask you questions or ask permission to run commands. Read them and say yes when they make sense.",
            "When it's done, ask it to start the app on your computer. Open the landing page, click “Try it free”, and make sure the app opens at /app.",
          ],
        },
        {
          title: "Understand how payments work",
          body: [
            "Each user gets a short code. They pay $5 by Venmo, Cash App or Zelle and put that code in the payment note. When the payment alert email arrives, your app checks it came from the real sender, matches the code and the amount, and turns on Pro for 30 days.",
            "Pro features must be locked on the server, not just hidden in the page. Hiding a button is not security: anyone can find it. Your API keys must never be in the browser code either.",
          ],
          tip: "Venmo, Cash App and Zelle have age rules. If you're under 18, ask a parent to set up the account. Later you can switch to Stripe for card payments.",
        },
        {
          title: "Add sign-in with Supabase (if your app needs accounts)",
          body: [
            "If people need their own saved data, they need to log in. Supabase gives you a free database and user accounts. Create a free project at supabase.com, then ask Claude Code to connect it.",
            "Email login is the easiest to start with. “Sign in with Google” takes a few extra settings in Google Cloud. The third video walks through them.",
          ],
          prompt: { tool: "Claude Code", text: "Add user accounts to my app with Supabase. I created a project called [PROJECT NAME]. Add sign up and log in with email, and \"Continue with Google\". Save each user's [DATA] so it's there when they come back. Tell me exactly which keys to copy from Supabase and where to put them, and keep the secret keys out of the browser." },
        },
        {
          title: "Push your code to GitHub",
          body: [
            "GitHub stores your code online. Vercel reads it from there. Tell Claude Code: “Create a GitHub repo and push my code.”",
            "If it asks you to sign in to GitHub, follow the link it gives you. When it's done, open github.com and you should see your project.",
          ],
          prompt: { tool: "Claude Code", text: "Create a GitHub repo called [APP-NAME] and push my code. Make sure no passwords, API keys or .env files get uploaded." },
        },
        {
          title: "Deploy it on Vercel",
          body: [
            "Go to vercel.com/new. Click Continue with GitHub, find your repo and click Import, then click Deploy.",
            "Wait about a minute. When it says it's ready, click Visit. That's your app's real link. Anyone in the world can open it.",
          ],
          tip: "Your app uses secret keys (Supabase, email)? Add them in Vercel under Settings, then Environment Variables, before you deploy. Ask Claude Code which ones you need.",
        },
        {
          title: "Fix red errors",
          body: [
            "Red error on Vercel or in your terminal? Don't panic. Copy the whole error, paste it into Claude Code and say “fix this”. Most errors are fixed in one round.",
            "If the same error keeps coming back, ask Claude Code to explain what's causing it in simple words before it tries again.",
          ],
        },
        {
          title: "Make changes after it's live",
          body: [
            "Changed something? Tell Claude Code “push my changes”. Vercel sees the new code on GitHub and updates your live site by itself, usually in under a minute.",
          ],
        },
        {
          title: "You're done when",
          body: [
            "Your landing page and app are built, they're live on a Vercel link, the Pro plan shows your payment links, and you've sent the link to at least one person.",
            "Goal for this week: send your link to 10 people. Next week is cold calling, so bring your phone.",
          ],
        },
      ],
    },
    kit: [
      {
        name: "Claude Code", icon: "anthropic", href: "https://claude.com/product/claude-code", role: "Builds, fixes and ships your app. It works right inside your project's files.",
        prompts: [
          { title: "The one big prompt", step: 2, when: "The first thing you paste today. Fill in every [BRACKET] first.", text: "Build on my app [NAME]. It helps [WHO] [DO WHAT].\nAdd a landing page with a headline, 3 benefits, Free vs Pro ($5/month) pricing and a \"Try it free\" button. Put the app at /app.\nAdd a Pro plan: $5 for 30 days by Venmo (venmo.com/u/[NAME]), Cash App (cash.app/$[TAG]/5) or Zelle ([EMAIL/PHONE]), with a code in the payment note. Add login if I need it.\nSecurity system: connect to the email inbox [EMAIL] that gets the payment alerts. When an alert comes in, only trust the real Venmo, Cash App or bank sender, check the code and the $5 amount, then turn on Pro for that user automatically. Log every payment.\nLock [PRO FEATURE] on the server, keep my API keys out of the browser, and get it ready to deploy on Vercel." },
          { title: "Run it on my computer", step: 3, when: "After the build, before you put it online.", text: "Start my app on my computer and give me the link to open it. Tell me what to click to test the landing page, the app and the Pro plan." },
          { title: "Push to GitHub", step: 6, when: "When it works on your computer.", text: "Create a GitHub repo called [APP-NAME] and push my code. Make sure no passwords, API keys or .env files get uploaded." },
          { title: "Which keys does Vercel need?", step: 7, when: "Before you click Deploy, if your app uses Supabase or email.", text: "List every environment variable my app needs on Vercel. For each one, tell me what it's for and exactly where I find the value. Don't print the actual secret values." },
          { title: "Fix this", step: 8, when: "Any time you see a red error.", text: "Fix this:\n[PASTE THE WHOLE ERROR]" },
          { title: "Explain the error first", step: 8, when: "When the same error comes back after a fix.", text: "This error keeps coming back:\n[PASTE ERROR]\nBefore you change anything, explain in simple words what is causing it and what you plan to do. Then fix it." },
          { title: "Push my changes", step: 9, when: "Every time you change something and want it live.", text: "Push my changes." },
          { title: "Safety check before sharing", step: 10, when: "Before you send the link to 10 people.", text: "Check my app before I share it. Can anyone get Pro without paying? Are any API keys or passwords visible in the browser? Can one user see another user's data? List any problems and fix them." },
        ],
      },
      {
        name: "Supabase", icon: "supabase", href: "https://supabase.com/dashboard", role: "Free database and user accounts, so people can sign up and keep their data.",
        note: "Create a free project here first. Then use these prompts in Claude Code.",
        prompts: [
          { title: "Add email and Google sign-in", step: 5, when: "When your app needs each user to have their own account.", text: "Add user accounts to my app with Supabase. I created a project called [PROJECT NAME]. Add sign up and log in with email, and \"Continue with Google\". Save each user's [DATA] so it's there when they come back. Tell me exactly which keys to copy from Supabase and where to put them, and keep the secret keys out of the browser." },
          { title: "Save Pro status in the database", step: 4, when: "After sign-in works, so Pro stays on when they log in again.", text: "Store each user's plan (free or pro) and the date Pro ends in Supabase. Only the server can change it. Check it on the server every time someone opens a Pro feature." },
          { title: "Lock down the data", step: 10, when: "Before launch.", text: "Turn on Row Level Security for every Supabase table and add rules so users can only read and change their own rows. Explain each rule in one sentence." },
        ],
      },
      { name: "GitHub", icon: "github", href: "https://github.com", role: "Stores your code online. Vercel reads it from here.", note: "Make an account before class. Claude Code does the pushing for you." },
      { name: "Vercel", icon: "vercel", href: "https://vercel.com/new", role: "Puts your app online. Every push to GitHub updates the live site.", note: "Sign up with GitHub. Then: Continue with GitHub, Import your repo, Deploy, Visit." },
      {
        name: "Google AI Studio", icon: "aistudio", href: "https://aistudio.google.com", role: "A free alternative for building the app if you don't have Claude Code.",
        prompts: [
          { title: "Build the app in AI Studio", step: 2, when: "If you are building in AI Studio instead of Claude Code. Use Build mode.", text: "Build a web app called [NAME] that helps [WHO] [DO WHAT]. Include a landing page with a headline, 3 benefits, Free vs Pro pricing and a \"Try it free\" button, and put the app itself on its own page. Keep the design clean and mobile-friendly." },
        ],
      },
    ],
    links: slides("1Hyiq-vZSXGE2hTFSGQS0IZxaDwCC_b7O-iS233r89OA", "1JdwqgFsaW4HiXvWVrcx6Zda9niONB19erTxW3o3nAjU", 4),
  },
};

// The long-form content for each lesson page, keyed by lesson slug. Merged into LESSONS in lessons.ts.
//   videos: short YouTube tutorials. id = the part after watch?v=. The first one plays by default.
//   tutorial.steps: title + paragraphs. Add `prompt` to show a copyable prompt in the step, `tip` for a side note.
//   kit: the tools used in the lesson. Each prompt says when to use it (`step` matches a tutorial step number).
//   links: slides and anything else worth keeping.
// Prompts: put the parts people fill in inside [BRACKETS]. They show highlighted on the page.

export type Video = { id: string; title: string; by: string; mins: number; about: string };
export type Step = { title: string; body: string[]; prompt?: { tool: string; text: string }; tip?: string };
export type Prompt = { title: string; step?: number; when: string; text: string };
// pasteInto: where the prompts go when it is not the tool itself (Supabase prompts go into Claude Code).
export type KitTool = { name: string; icon: string; href: string; role: string; note?: string; pasteInto?: string; prompts?: Prompt[] };
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
    tutorial: {
      intro: "AIBA is about using AI to build, sell and solve real problems, not just learning how AI works. Do these before the first build lesson so you're ready to go.",
      steps: [
        {
          title: "Join the Discord",
          body: [
            "Every prompt, slide deck and answer to \u201cmy thing broke\u201d gets posted in the AIBA Discord. Join it and turn on notifications for announcements.",
          ],
        },
        {
          title: "Make your accounts",
          body: [
            "Sign up for Claude (claude.ai), ChatGPT (chatgpt.com) and Perplexity (perplexity.ai). The free versions are enough to start. Some tools, like Claude and ChatGPT, have paid plans that give you more use, but you don't need them on day one.",
            "Check each tool's age rules when you sign up. Use your real birth date. If a tool needs a parent's permission, ask them.",
          ],
        },
        {
          title: "Bring a device every week",
          body: [
            "Most meetings have a build activity, and you can't do it without a laptop or phone. A laptop is best. Anything you don't finish, you can keep working on at home and bring back next week.",
          ],
        },
        {
          title: "Learn the four parts of a good prompt",
          body: [
            "Almost every prompt in this club has four parts. Role: who the AI should act as. Goal: what you want. Context: who it's for and the facts it needs. Format: what the answer should look like.",
            "Try it now. Ask Claude the same question twice, once in one line and once with all four parts, and compare the answers.",
          ],
          prompt: { tool: "Claude", text: "Role: You are a business coach for high school students.\nGoal: Help me find 3 ways I could make my first $100 with AI this semester.\nContext: I'm in [GRADE], I'm good at [SOMETHING YOU'RE GOOD AT], and I have about [HOURS] hours a week.\nFormat: A short list. For each idea: what I'd sell, who would buy it, and the first step I'd take this week." },
        },
        {
          title: "Start thinking about your business",
          body: [
            "This year builds up to the end-of-year competition: you'll create a business on your own or with a team, use AI to build and market it, and compete for the most money made and the most sales.",
            "Start a note on your phone. Every time you or a friend complains about something, write it down. Those are business ideas.",
          ],
        },
      ],
    },
    kit: [
      {
        name: "Claude", icon: "anthropic", href: "https://claude.ai", role: "Thinking, planning and writing. We use it in almost every lesson.",
        prompts: [
          { title: "Four-part prompt practice", step: 4, when: "Right after you make your account, to see how much the prompt matters.", text: "Role: You are a business coach for high school students.\nGoal: Help me find 3 ways I could make my first $100 with AI this semester.\nContext: I'm in [GRADE], I'm good at [SOMETHING YOU'RE GOOD AT], and I have about [HOURS] hours a week.\nFormat: A short list. For each idea: what I'd sell, who would buy it, and the first step I'd take this week." },
          { title: "Turn complaints into business ideas", step: 5, when: "Once your note has a few complaints in it.", text: "Here are problems I've heard people complain about:\n[PASTE YOUR LIST]\nFor each one, suggest an app, website or service that could fix it, who would pay for it, and roughly how much. Then tell me which one is the easiest to start as a student." },
        ],
      },
      {
        name: "ChatGPT", icon: "openai", href: "https://chatgpt.com", role: "Brainstorming, images and screen designs.",
        prompts: [
          { title: "Improve my prompt", step: 4, when: "Any time an answer comes back generic. Paste your prompt in and let it fix it.", text: "Here is a prompt I wrote:\n[PASTE YOUR PROMPT]\nRewrite it using Role, Goal, Context and Format so I get a much more useful answer. Ask me for any details you need first." },
        ],
      },
      {
        name: "Perplexity", icon: "perplexity", href: "https://www.perplexity.ai", role: "Research with sources. Good for checking facts and finding competitors.",
        prompts: [
          { title: "Check if an idea already exists", step: 5, when: "When you have a business idea and want to know who else does it.", text: "Is there already an app, website or business that [YOUR IDEA]? List the main ones, what they charge and what people complain about. Show your sources." },
        ],
      },
    ],
    links: slides("1V4XKkLo5uc1SPFOwIqpwd-rVMAlZi_KyQvn3oBzHEB0", "1XaPeAmTWsA9yI0EK8bfCufeXiZL3zgp4CpIegWvzawM", 1),
  },

  /* ------------------------------------------------------------------ Meeting 2 */
  "freelancing-with-ai": {
    videos: [
      { id: "BkVUDuQtEYI", title: "YouWare built this website for me (fully working, no code)", by: "Ben's Cyber Life", mins: 10, about: "A full site built by chatting with YouWare, then changed by describing what to fix. This is steps 5 and 6 of the tutorial." },
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
      { id: "19bVwESg7TU", title: "How to design your app UI in 6 minutes with AI", by: "Steven Cravotta", mins: 6, about: "Generate app screens with AI and improve them round by round before you build. Step 8 of the tutorial." },
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
      { id: "zNpKCd754og", title: "Add Google login to any website or app with Supabase", by: "Profit Studio", mins: 14, about: "The Google Cloud and Supabase settings you need so the \u201cContinue with Google\u201d button works, step by step." },
    ],
    tutorial: {
      intro: "Today your app gets a real link anyone can open, a landing page, and a way to take payments. One prompt does most of the build. The rest is connecting GitHub and Vercel.",
      steps: [
        {
          title: "Get set up before you start",
          body: [
            "You need three things: your app from App dev day 1, a GitHub account (github.com) and a Vercel account (vercel.com). Sign up for Vercel with your GitHub account so the two are already connected.",
            "You will build with Claude Code, which needs a paid Claude plan. No paid plan? Use Google AI Studio instead: it's free, and there's a prompt for it in Resources.",
            "Built your Day 1 app in YouWare or in a Claude chat? Then there is no folder on your computer yet. Make a new empty folder, open it in Claude Code, and paste your Day 1 build prompt first so it rebuilds the app there. Then do the next step.",
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
          { title: "Rebuild my Day 1 app here", step: 1, when: "Only if your Day 1 app lives in YouWare or a Claude chat, not in a folder.", text: "I built the first version of my app somewhere else. Rebuild it here as a web app I can deploy on Vercel. Here is the build prompt I used:\n[PASTE YOUR DAY 1 BUILD PROMPT]\nKeep it simple and make the main action work first." },
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
        note: "Create a free project here first. Then paste these prompts into Claude Code.", pasteInto: "Claude Code",
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

  /* ------------------------------------------------------------------ Meeting 5 */
  "ai-services-for-local-businesses": {
    videos: [
      { id: "zIR6APkKhco", title: "How to book 3 to 5 meetings a day cold calling (full script)", by: "Pavlo", mins: 12, about: "His full cold call script, line by line, with real calls to local business owners. Listen to how short and casual the opener is, and how fast he gets to the one problem he noticed." },
      { id: "QpJIlQ9MgbA", title: "If you\u2019re at zero clients, just do this", by: "Pavlo", mins: 16, about: "What to do when you have no clients and no results to show yet. Pairs with steps 3 and 13: start warm, give the first one free, and turn it into proof." },
      { id: "0ezv6zRdM7c", title: "How I book 3 to 5 meetings a day selling websites", by: "Pavlo", mins: 16, about: "More real calls, with owners pushing back (“we already have a website”, “send me a sample”, “I'm driving”) and how he stays chill and still gets a next step. Then how he follows up when nobody answers." },
    ],
    tutorial: {
      intro: "Today is about actually getting clients. You'll pick something to sell, find 25 businesses that need it, practice with Claude, then pick up the phone. When someone says yes, Claude Code builds it and you text them the link within 10 minutes.",
      steps: [
        {
          title: "Pick what you'll sell",
          body: [
            "You don't only have to sell websites. Review replies ($30 to $50 a month) are the easiest first sell: no website needed, and you can write them on your phone. Other options: a Google page cleanup ($40 one time), Instagram posts ($50 to $100 a month), a digital menu ($50), a quote or booking form ($50), a simple one-page website ($100 to $200), or site updates ($20 a month).",
            "Monthly services are better than one-time jobs because the money keeps coming. Keep prices low: cheap and easy to say yes to beats expensive and ignored. Do the first one free, and raise your prices after 3 happy clients.",
          ],
          tip: "Never take money before the owner has seen the work, and have a parent help with payments.",
        },
        {
          title: "Pick one niche",
          body: [
            "Call the same type of business all week, with the same script. You get better fast because you hear the same questions again and again.",
            "For your first client, call restaurants and salons: there are lots of them, owners pick up, and they need review replies, menus and posts. Once you have results to show, try roofers, HVAC and plumbers, dentists, med spas, auto repair or real estate agents. One customer is worth a lot to them, so they pay more, but they're also pickier.",
          ],
          tip: "Dentists and med spas handle patient information. Never ask for or touch patient data.",
        },
        {
          title: "Start with people you know",
          body: [
            "Your first client might be someone you already know. Write down 20 people: your parents and their friends, relatives who own a business, your coach, tutor, barber or dentist, places you go every week, and friends' parents.",
            "Text them first. It's practice with lower stakes, and one real result gives you proof for every cold call after that. After every job, ask: “Do you know anyone else who might want this?”",
          ],
          prompt: { tool: "Claude", text: "Write a short, friendly text to [PERSON], who owns [BUSINESS]. I'm [YOUR NAME], [HOW THEY KNOW YOU]. I'm starting a small business doing [SERVICE] for local businesses and I'd love to do one for them for free so I have a real example. Casual, under 50 words, no pressure." },
        },
        {
          title: "Find 25 leads in 30 minutes",
          body: [
            "Open Google Maps and search “[niche] in [town]”, like “roofers in Glendale”. Open each listing. No website button? That's a lead. Sort the reviews by newest: no owner replies? Lead. Only a few old or blurry photos? Lead.",
            "The perfect lead has something like 4 stars and 30 reviews but zero owner replies: they have customers, they just aren't managing their reputation. Skip businesses that already have a great site and reply to every review.",
            "Put every lead in a Google Sheet with columns for business name, phone, the problem you saw, and what happened when you called. You can also find businesses in your town's Facebook groups, on Nextdoor, or by searching your town under Places on Instagram.",
          ],
        },
        {
          title: "Find the one problem for each lead",
          body: [
            "Before you call, know exactly what you'd fix. Copy their Google reviews and some text from their website (if they have one) and paste it into Claude. Ask for the one most obvious thing you could fix, and one casual sentence to say about it on the call.",
            "Write that sentence in your sheet next to their number so it's right there when you dial.",
          ],
          prompt: { tool: "Claude", text: "Here are [BUSINESS]'s Google reviews and website text: [PASTE REVIEWS AND WEBSITE TEXT]. What's the most obvious thing I could fix with [SERVICE]? Give me one casual sentence to say on a call." },
        },
        {
          title: "Write your script",
          body: [
            "Your script is short: who you are, that it's a cold call, the one problem you saw, and an offer to make it free in about 10 minutes. Being a student is your advantage. Owners get sales calls all day from adults with scripts, so be upfront: “I'm a junior at [school], I'm making websites for local businesses, so the first one's free.”",
            "Another opener that works: ask for advice first. “I'm not selling anything right now. Can I ask one question? What's the hardest part of getting new customers?” Then offer to help with exactly what they said.",
          ],
          prompt: { tool: "Claude", text: "Write a 30-second cold call script for [NICHE] owners. I'm a high school student offering [SERVICE]. Honest opener, one specific problem, offer to make it free in 10 minutes. Sound casual, not salesy." },
        },
        {
          title: "Practice 5 calls with Claude first",
          body: [
            "Open the Claude app on your phone and turn on voice mode. Ask it to play a busy, skeptical owner who interrupts you and pushes back. Do the whole call out loud, then ask it what you did wrong.",
            "Do at least 5 practice calls before your first real one. The first real call is way less scary when you've already heard “not interested” five times.",
          ],
          prompt: { tool: "Claude", text: "Pretend you're the busy owner of a [TYPE OF BUSINESS]. I'm cold calling you. Be skeptical, interrupt me, push back. After, tell me exactly what I did wrong." },
        },
        {
          title: "Call at the right time",
          body: [
            "In general, 10 to 11 AM is the best time to call and 2 to 3 PM is second best. Avoid before 9 AM, 12 to 1 PM and after 4 PM. Thursday is the best day, then Tuesday. Monday and Friday are the worst.",
            "Local businesses run on their own clock, so match their slow hours. Restaurants: 2 to 4 PM, between lunch and dinner, which is perfect right after school. Roofers, HVAC and plumbers: early morning or end of day. Salons: midday, between appointments. Never call during their rush.",
          ],
        },
        {
          title: "Make the call",
          body: [
            "Call, don't email. A call gets you a yes or no in 2 minutes. Keep it casual, like you're talking to a friend's parent, not like a salesman. Example: “Hey, is this Maria? Hey Maria, I'm Alex, I go to [school]. Honestly this is a cold call, but I'll be quick. So Rosa's has a lot of Google reviews, but none of them have replies. Want me to do your 3 newest ones right now? Free. I'll text them to you.”",
            "Don't build anything before the call. Offer it on the call, and say you can make it, not that you already did. If an owner asks to see it and it doesn't exist yet, you lose the deal. If they say yes, get their name, the best number to text, and what they want on it.",
          ],
        },
        {
          title: "Handle pushback",
          body: [
            "You'll hear no way more than yes. That's normal. “Not interested” usually means “I'm busy and don't know you”, not “I'd never want this”. One polite try is fine: “Fair enough. Can I text you a free sample anyway, in case it's useful later?”",
            "“Just send me an email”: “For sure. Real quick though, what would you want it to fix?” “How much?”: “The first one's free. After that it's $40 a month if you want it.” “You're a kid”: “I am. That's why the first one's free. You only pay if it's good.” “We already have someone”: “Got it. If that ever changes, I'm around.”",
            "A clear no is a no. Say thanks, write “no” in your sheet and call the next one. Never argue.",
          ],
          prompt: { tool: "Claude", text: "An owner told me \"[WHAT THEY SAID].\" Give me 3 short, casual things I could say back that keep the door open without being pushy." },
        },
        {
          title: "Build it in 10 minutes and text the link",
          body: [
            "They said yes. Make a new folder, open it in Claude Code, and paste the build prompt with their real info from their Google page: name, services, hours, phone, address and 3 real reviews. Add anything the owner told you on the call.",
            "Open it and check how it looks at phone size. Ask Claude Code to fix anything that's off. Then tell it to deploy to Vercel and you'll get a live link. Text it right away: “Hey Mike, it's Alex. Here's your site. What would you change?” Then call: “Did you get a chance to look at it?”",
          ],
          prompt: { tool: "Claude Code", text: "Build a one-page website for [BUSINESS], a [TYPE] in [TOWN]. Here's their info: [PASTE NAME, SERVICES, HOURS, PHONE, ADDRESS, 3 GOOD REVIEWS FROM GOOGLE]. Mobile-first, big \"Call now\" button at the top, services section, reviews and a map. Clean and modern, colors that fit a [TYPE]. Footer: \"Site by [YOUR NAME].\" Set it up so I can deploy it on Vercel." },
          tip: "Practice this whole loop once on a made-up business before you start calling, so the first real yes isn't the first time you've done it. Only use real info: never make up reviews, prices or claims.",
        },
        {
          title: "Call back, then follow up",
          body: [
            "No answer isn't a no. Owners miss calls because they're busy. Day 0: call, leave a 15-second voicemail, call again later. Day 2: call again (“Hey Maria, it's Alex again, the student who called about your reviews”). Day 4: text. Day 7: call one more time, or walk in. Day 14: a last friendly text. After that, stop.",
            "Right after every real call, write quick notes and paste them into Claude to see what to say differently next time.",
          ],
          prompt: { tool: "Claude", text: "Write 2 short follow-up texts to [OWNER] at [BUSINESS] after I called about [SERVICE]. Casual, friendly, not pushy. Under 30 words each." },
          tip: "Don't record calls without permission.",
        },
        {
          title: "Turn the free sample into a paying client",
          body: [
            "Deliver when you said you would. Then ask: “Did this work for you? Anything you'd change?” If they like it, make the offer: “Want me to keep doing this every month? It's $40.” Put it in one email: what you'll do, the price and when they pay. Have a parent help with payments.",
            "Always ask for a referral: “Know another owner who might want this?” Even if they don't pay, ask if you can use the work as a portfolio example.",
          ],
        },
        {
          title: "This week's challenge",
          body: [
            "Pick one niche. Make 30 calls, phone first, and only text or email if they ask. Build for every yes and text the link the same day. Everyone who didn't answer gets two more calls.",
            "Next meeting we start with results: how many calls, how many no's, any yeses. The person with the most no's gets celebrated too, because that's who's actually doing the work. Post your results in the Discord.",
          ],
        },
      ],
    },
    kit: [
      {
        name: "Claude", icon: "anthropic", href: "https://claude.ai", role: "Prep and practice. Find the problem, write your script, practice calls in voice mode and review how they went.",
        note: "Use the Claude app on your phone for practice calls: tap the voice button.",
        prompts: [
          { title: "Text someone you know", step: 3, when: "Before any cold calls. Start with your list of 20 people.", text: "Write a short, friendly text to [PERSON], who owns [BUSINESS]. I'm [YOUR NAME], [HOW THEY KNOW YOU]. I'm starting a small business doing [SERVICE] for local businesses and I'd love to do one for them for free so I have a real example. Casual, under 50 words, no pressure." },
          { title: "Find the problem", step: 5, when: "Before you call each lead.", text: "Here are [BUSINESS]'s Google reviews and website text: [PASTE REVIEWS AND WEBSITE TEXT]. What's the most obvious thing I could fix with [SERVICE]? Give me one casual sentence to say on a call." },
          { title: "Niche script", step: 6, when: "Once you've picked your niche, before practice calls.", text: "Write a 30-second cold call script for [NICHE] owners. I'm a high school student offering [SERVICE]. Honest opener, one specific problem, offer to make it free in 10 minutes. Sound casual, not salesy." },
          { title: "Practice the call (voice mode)", step: 7, when: "5 times before your first real call. Turn on voice mode.", text: "Pretend you're the busy owner of a [TYPE OF BUSINESS]. I'm cold calling you. Be skeptical, interrupt me, push back. After, tell me exactly what I did wrong." },
          { title: "Handle a no", step: 10, when: "When an owner says something you didn't know how to answer.", text: "An owner told me \"[WHAT THEY SAID].\" Give me 3 short, casual things I could say back that keep the door open without being pushy." },
          { title: "Review my call", step: 12, when: "Right after each real call, while you remember it.", text: "Here's what I said and what the owner said: [NOTES FROM THE CALL]. What should I say differently next time?" },
          { title: "Call-back texts", step: 12, when: "Day 4 and day 14 of following up.", text: "Write 2 short follow-up texts to [OWNER] at [BUSINESS] after I called about [SERVICE]. Casual, friendly, not pushy. Under 30 words each." },
          { title: "Write a post for local groups", step: 4, when: "If you want owners to come to you. Read the group's rules first.", text: "Write a short, friendly post for my town's Facebook community group. I'm a [GRADE] at [SCHOOL] and I make affordable [SERVICE] for local businesses. The first one is free so they can see if they like it. Ask business owners to DM me. Casual, under 60 words, one emoji max." },
        ],
      },
      {
        name: "Claude Code", icon: "anthropic", href: "https://claude.com/product/claude-code", role: "Builds what you sell: websites, menus, forms, review replies and posts. Then puts it online.",
        note: "Set up Claude Code and Vercel before you call anyone, so you can deliver within 10 minutes of a yes.",
        prompts: [
          { title: "Build their site", step: 11, when: "Right after they say yes. Copy their info from their Google page.", text: "Build a one-page website for [BUSINESS], a [TYPE] in [TOWN]. Here's their info: [PASTE NAME, SERVICES, HOURS, PHONE, ADDRESS, 3 GOOD REVIEWS FROM GOOGLE]. Mobile-first, big \"Call now\" button at the top, services section, reviews and a map. Clean and modern, colors that fit a [TYPE]. Footer: \"Site by [YOUR NAME].\" Set it up so I can deploy it on Vercel." },
          { title: "Put it online", step: 11, when: "When the site looks right at phone size. The first time, it asks you to log in to Vercel.", text: "Deploy this to Vercel and give me the live link." },
          { title: "Owner wants changes", step: 13, when: "When the owner texts back with changes. Same link, updated site.", text: "The owner wants: [PASTE WHAT THEY SAID]. Update the site to match. Don't change anything else. Then redeploy to Vercel." },
          { title: "Their own domain", step: 13, when: "When the owner buys a domain like theirbusiness.com.", text: "The owner bought [DOMAIN.COM]. Walk me through connecting it to my Vercel project, step by step." },
          { title: "Review replies ($30 to 50 a month)", step: 1, when: "The easiest first sell. No website needed.", text: "Here are [BUSINESS]'s 10 newest Google reviews: [PASTE REVIEWS]. Write a reply to each in the owner's voice. Short, warm, mention something specific from each review. No corporate language." },
          { title: "Digital menu ($50)", step: 1, when: "For restaurants. Attach a clear photo of their menu to the message.", text: "Here's a photo of [RESTAURANT]'s menu (attached). Turn it into a clean mobile menu page with sections and prices. Add it to the site at /menu." },
          { title: "Quote form ($50)", step: 1, when: "For roofers, plumbers, cleaners and anyone who gives estimates. Make a free Formspree account first.", text: "Add a \"Get a free quote\" form with name, phone and what they need. Send each request to [OWNER EMAIL] using Formspree." },
          { title: "Google page description ($40)", step: 1, when: "Part of a Google page cleanup. The owner pastes it into their Google Business Profile.", text: "Write a Google Business Profile description for [BUSINESS], a [TYPE] in [TOWN]. They do [SERVICES]. Under 750 characters, friendly, mention the town, no hype words." },
          { title: "Instagram posts ($50 to 100 a month)", step: 1, when: "For salons, restaurants and anyone who lives on Instagram.", text: "Write 12 Instagram captions for [BUSINESS], a [TYPE] in [TOWN]. Mix: 4 showing their work, 4 tips for customers, 4 about the owner/team. Short, casual, 3–5 local hashtags each." },
        ],
      },
      { name: "Google Maps", icon: "googlemaps", href: "https://maps.google.com", role: "Find leads. No website, no review replies or bad photos means a business needs you.", note: "Search “[niche] in [town]” and open every listing." },
      { name: "Google Sheets", icon: "googlesheets", href: "https://sheets.new", role: "Track every lead and call: name, phone, problem, what happened, when to call back.", note: "sheets.new opens a blank sheet right away." },
      { name: "Vercel", icon: "vercel", href: "https://vercel.com", role: "Puts the site online. Claude Code deploys it and you get a free live link to text the owner.", note: "Log in once before your first call." },
      { name: "Formspree", icon: "formspree", href: "https://formspree.io", role: "Sends quote form requests straight to the owner's email. Free to start." },
    ],
    links: slides("1FbUyjLLXqA5xxpHiqDO7RsDmKYSq7x1SWeIItjsmN7E", "1qPX9tI-FOApT0hj8h8vvJde-Z1vPHIQMeDZ2sqU3M7Q", 5),
  },

  /* ------------------------------------------------------------------ Chrome extension lesson */
  "ai-chrome-extension": {
    videos: [
      { id: "lOBgdz-YfZY", title: "Build and publish your first Chrome extension in 5 minutes", by: "ambITious | AI", mins: 5, about: "Claude Code builds a right-click “explain this” extension, it gets tested in Chrome, then published to the Chrome Web Store. The whole lesson in 5 minutes." },
      { id: "356Iq9NkDI4", title: "How to build a Chrome extension with Claude and make money", by: "Panstag", mins: 8, about: "From idea to code with Claude, then testing, publishing and ways to make money from it. Steps 2 to 10 of the tutorial in 8 minutes." },
      { id: "7BbNHBucSIg", title: "Create and publish your first Chrome extension (2026)", by: "The Coding Bus", mins: 5, about: "Builds a full-page screenshot extension, then walks through the Chrome Web Store dashboard, upload and review. Step 10 of the tutorial." },
      { id: "Z-aDxX0o9P4", title: "I monetized 100+ Chrome extensions. Here\u2019s what works", by: "Vitalii Vasianovych", mins: 12, about: "Which ways of charging actually work for extensions (and which ones get you in trouble), from someone who has launched over 100. Helps with steps 5 and 9." },
    ],
    tutorial: {
      intro: "A Chrome extension is a small tool that lives in the browser. People use Chrome all day, so a tool that saves them a few minutes every day is easy to say yes to. You'll pick an idea, check it with Claude, build it with Claude Code, test it in Chrome, add a paid plan and publish it.",
      steps: [
        {
          title: "Understand what an extension can do",
          body: [
            "An extension can add a button next to the address bar that opens a little popup, change or read the page you're on, add an option to the right-click menu, or run quietly in the background (like a timer or a blocker).",
            "Good extensions do one job well. Examples: summarize the page you're on, save highlights from any article, block distracting sites during homework, turn a recipe page into just the ingredients, or rewrite a selected email so it sounds friendlier.",
          ],
        },
        {
          title: "Pick an idea from your own browser",
          body: [
            "Think about what you do in Chrome every day that's annoying or slow. Copying the same thing over and over? Opening the same 5 tabs? Getting distracted? Your own repeated problem is the easiest one to build for.",
            "Write it as one sentence: “My extension [does what] for [who].” If it takes more than one sentence, it's too big for a first version.",
          ],
        },
        {
          title: "Research what already exists",
          body: [
            "Search the Chrome Web Store for your idea, or let Claude do it. Find 3 to 5 extensions that already do something similar, what they charge, and how they make money.",
            "Don't panic if something similar exists. That proves people want it. Your job is to find the one thing they do badly and do it better.",
          ],
          prompt: { tool: "Claude", text: "I'm about to build a Chrome extension that [DOES X]. Search for 3-5 extensions that already do something similar, tell me what they charge and how they make money, and point out one gap or weakness I could do better." },
        },
        {
          title: "Check the idea before you code",
          body: [
            "Ask Claude for an honest opinion: is this actually useful, has it been done to death, and would a real person install it? Ask for one tweak that would make it stand out.",
            "Then ask 3 friends: “Would you install this?” If nobody would, change the idea now. It's a lot cheaper than finding out after you build it.",
          ],
          prompt: { tool: "Claude", text: "I want to build a Chrome extension that [ONE-SENTENCE IDEA]. Before writing any code, tell me honestly: is this actually useful, has it been done to death, and would a real person install it? Suggest one tweak that would make it stand out." },
        },
        {
          title: "Plan the free and paid versions",
          body: [
            "The simplest model is a free version that's actually useful, plus one paid feature for people who use it a lot. For example: 5 summaries a day free, unlimited for $3 a month.",
            "The free version has to give real value on its own, or nobody will keep it long enough to upgrade. Decide this before you build so Claude Code builds it in from the start.",
          ],
          prompt: { tool: "Claude", text: "My extension does [X] for [WHO IT'S FOR]. Based on what similar tools charge, suggest a simple pricing model (free tier + one paid feature), and tell me exactly what the free version should include so people still get real value without paying." },
        },
        {
          title: "Build it with Claude Code",
          body: [
            "Make a new empty folder and open it in Claude Code. Paste the build prompt with your idea and your free and paid features. Claude Code writes all the files, including manifest.json, which is the file that tells Chrome what your extension is and what it's allowed to do.",
            "Keep the first version small: the one main job, working well. You can add more after people start using it.",
          ],
          prompt: { tool: "Claude Code", text: "Build a Chrome extension (Manifest V3) called [NAME]. It [WHAT IT DOES] for [WHO]. Main way to use it: [POPUP BUTTON / RIGHT-CLICK MENU / RUNS ON CERTAIN PAGES]. Free version: [FREE FEATURES]. Paid feature, locked for now: [PAID FEATURE]. Keep it simple and clean, ask for as few permissions as possible, add placeholder icons, and tell me exactly how to load it in Chrome." },
          tip: "Ask for as few permissions as possible. Extensions that want to “read and change all your data on all websites” scare people off, and take longer to get approved.",
        },
        {
          title: "Load it into Chrome",
          body: [
            "Open a new tab and go to chrome://extensions. Turn on Developer mode (top right). Click Load unpacked and choose your extension's folder. It shows up in the list, and you can pin it with the puzzle icon next to the address bar.",
            "Every time Claude Code changes the files, go back to chrome://extensions and click the reload arrow on your extension, then refresh the page you're testing on.",
          ],
        },
        {
          title: "Fix errors",
          body: [
            "If something doesn't work, look for a red Errors button on your extension's card in chrome://extensions. Copy the exact error. In Claude Code, paste it and say what you were doing when it broke. It can see your files, so it fixes them directly.",
            "Using the Claude chat instead? Paste the error plus your manifest.json and the file that broke, so it has everything it needs.",
          ],
          prompt: { tool: "Claude", text: "My Chrome extension isn't working. Here's the error from chrome://extensions: [PASTE EXACT ERROR]. Here's my manifest.json and [FILE NAME]: [PASTE CODE]. Walk me through what's wrong and fix it." },
        },
        {
          title: "Add the paid plan",
          body: [
            "ExtensionPay is a service made for this. It handles the Stripe payments and remembers who paid, so you don't need your own server. Make a free account at extensionpay.com, register your extension, then ask Claude Code to connect it and unlock your paid feature for people who pay.",
            "Test it in Stripe's test mode first, with Stripe's test card, before you take any real money.",
          ],
          prompt: { tool: "Claude Code", text: "Add a paid plan to my extension with ExtensionPay. My extension ID on ExtensionPay is [EXTENSIONPAY ID]. Free users get [FREE FEATURES]. Paying users ($[PRICE]/month) unlock [PAID FEATURE]. Add an \"Upgrade\" button in the popup that opens the payment page, show \"Pro\" once they've paid, and tell me how to test it in test mode." },
          tip: "Stripe needs an adult to own the account. If you're under 18, set up ExtensionPay and Stripe with a parent.",
        },
        {
          title: "Publish it on the Chrome Web Store",
          body: [
            "Ask Claude Code to make a zip of your extension and real icons. Register for a Chrome Web Store developer account at chrome.google.com/webstore/devconsole/register (one-time $5 fee, and you may need a parent to register it). Then click New item and upload the zip.",
            "Fill in the listing: description, at least one screenshot (1280 by 800), a category, and the privacy questions about what data you collect. Then submit it for review. Review can take a few days, so submit early.",
            "Want more users? Microsoft Edge and Opera run Chrome extensions, so you can usually upload the same zip to their stores for free. Firefox is free too but needs a few small changes, so ask Claude Code to make a Firefox version. Safari needs a Mac and Apple's $99-a-year developer program, so save it for later. All the links are in Resources.",
          ],
          prompt: { tool: "Claude", text: "Write a Chrome Web Store listing for my extension: [NAME], which does [WHAT IT DOES]. Give me a short description (under 132 characters), a longer description, and 3 bullet points of key features — no made-up claims or fake stats." },
        },
        {
          title: "Get 10 installs, then ask each to upgrade",
          body: [
            "Once it's approved, send the store link to people who have the problem it solves. Post it in the AIBA Discord, group chats and anywhere your users hang out. Ask each person to try it for a few days.",
            "Then ask what they think and whether they'd pay for the paid feature. Every “no” tells you what to fix. The goal this week: 10 installs, and ask every one of them to upgrade.",
          ],
          tip: "While you wait for review, friends can test it by loading your folder with Load unpacked, just like you did.",
        },
      ],
    },
    kit: [
      {
        name: "Claude", icon: "anthropic", href: "https://claude.ai", role: "Research, check the idea, plan pricing and write the store listing. Turn on web search for the research prompt.",
        prompts: [
          { title: "Research competitors before building", step: 3, when: "As soon as you have your one-sentence idea.", text: "I'm about to build a Chrome extension that [DOES X]. Search for 3-5 extensions that already do something similar, tell me what they charge and how they make money, and point out one gap or weakness I could do better." },
          { title: "Validate the idea before coding", step: 4, when: "After the research, before you open Claude Code.", text: "I want to build a Chrome extension that [ONE-SENTENCE IDEA]. Before writing any code, tell me honestly: is this actually useful, has it been done to death, and would a real person install it? Suggest one tweak that would make it stand out." },
          { title: "Plan the monetization", step: 5, when: "Before you build, so the paid feature is part of the plan.", text: "My extension does [X] for [WHO IT'S FOR]. Based on what similar tools charge, suggest a simple pricing model (free tier + one paid feature), and tell me exactly what the free version should include so people still get real value without paying." },
          { title: "Debug a broken extension", step: 8, when: "When you see a red Errors button in chrome://extensions and you're using the chat, not Claude Code.", text: "My Chrome extension isn't working. Here's the error from chrome://extensions: [PASTE EXACT ERROR]. Here's my manifest.json and [FILE NAME]: [PASTE CODE]. Walk me through what's wrong and fix it." },
          { title: "Write the store listing", step: 10, when: "Right before you upload to the Chrome Web Store.", text: "Write a Chrome Web Store listing for my extension: [NAME], which does [WHAT IT DOES]. Give me a short description (under 132 characters), a longer description, and 3 bullet points of key features — no made-up claims or fake stats." },
          { title: "Ask users for feedback", step: 11, when: "A few days after someone installs it.", text: "Write a short, casual message to a friend who installed my Chrome extension [NAME]. Ask what they liked, what was confusing, and whether they'd pay $[PRICE]/month for [PAID FEATURE]. Under 50 words." },
        ],
      },
      {
        name: "Claude Code", icon: "anthropic", href: "https://claude.com/product/claude-code", role: "Writes every file of the extension, fixes errors, adds payments and packages it for the store.",
        prompts: [
          { title: "Build the extension", step: 6, when: "In a new empty folder, once you've checked the idea and picked your free and paid features.", text: "Build a Chrome extension (Manifest V3) called [NAME]. It [WHAT IT DOES] for [WHO]. Main way to use it: [POPUP BUTTON / RIGHT-CLICK MENU / RUNS ON CERTAIN PAGES]. Free version: [FREE FEATURES]. Paid feature, locked for now: [PAID FEATURE]. Keep it simple and clean, ask for as few permissions as possible, add placeholder icons, and tell me exactly how to load it in Chrome." },
          { title: "Fix an error", step: 8, when: "When something breaks. Claude Code can see your files, so you only need the error.", text: "My extension shows this error in chrome://extensions:\n[PASTE EXACT ERROR]\nIt happened when I [WHAT YOU DID]. Find the cause and fix it." },
          { title: "Change one thing", step: 7, when: "After you've tried it in Chrome and want something different.", text: "When I [WHAT YOU DID], [WHAT HAPPENED]. I want it to [WHAT YOU WANT INSTEAD]. Change only that." },
          { title: "Add the paid plan", step: 9, when: "After you've made an ExtensionPay account and registered your extension.", text: "Add a paid plan to my extension with ExtensionPay. My extension ID on ExtensionPay is [EXTENSIONPAY ID]. Free users get [FREE FEATURES]. Paying users ($[PRICE]/month) unlock [PAID FEATURE]. Add an \"Upgrade\" button in the popup that opens the payment page, show \"Pro\" once they've paid, and tell me how to test it in test mode." },
          { title: "Get it ready for the store", step: 10, when: "When it works and you're ready to publish.", text: "Get my extension ready for the Chrome Web Store: make proper icons in every size the store needs, remove any permissions I don't use, check the manifest for problems, and make a zip file I can upload. Then list what I'll need to fill in on the store listing, including the privacy questions." },
          { title: "Make it work in other browsers", step: 10, when: "After it's live on Chrome, if you want to publish on Firefox, Edge or Opera too.", text: "Make my Chrome extension ready to publish on [FIREFOX / EDGE / OPERA] too. Change only what that browser needs, keep the Chrome version working, and make a separate zip for it. Tell me anything I need to fill in differently on that store." },
          { title: "Write a privacy policy", step: 10, when: "If the store asks for one (it will if you collect any user data).", text: "Write a short, honest privacy policy for my Chrome extension [NAME]. It collects [WHAT DATA, OR \"NO DATA\"] and uses it to [WHY]. Make it a simple web page I can host for free and link from the store listing." },
        ],
      },
      { name: "Chrome Web Store", icon: "googlechrome", href: "https://chrome.google.com/webstore/devconsole/register", role: "Where you publish for Chrome (Brave and other Chrome-based browsers use it too). Register, pay the fee, then upload your zip.", note: "One-time $5 registration fee. Check the age rules, and ask a parent to register if needed." },
      { name: "ExtensionPay", icon: "extensionpay", href: "https://extensionpay.com", role: "Adds Stripe payments to an extension without your own server, and remembers who paid.", note: "Under 18? A parent needs to own the Stripe account." },
      { name: "Microsoft Edge Add-ons", icon: "microsoftedge", href: "https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/create-dev-account", role: "Publish for Edge. Edge runs Chrome extensions, so you can usually upload the same zip.", note: "Free to register." },
      { name: "Firefox Add-ons", icon: "firefoxbrowser", href: "https://addons.mozilla.org/en-US/developers/", role: "Publish for Firefox. Needs a few small changes first, which Claude Code can make.", note: "Free to register." },
      { name: "Opera Add-ons", icon: "opera", href: "https://addons.opera.com/developer/", role: "Publish for Opera. Opera runs Chrome extensions, so the same zip usually works.", note: "Free to register." },
      { name: "Safari", icon: "safari", href: "https://developer.apple.com/documentation/safariservices/converting-a-web-extension-for-safari", role: "Publish for Safari on Mac and iPhone. Apple converts your extension into an app with Xcode.", note: "Needs a Mac and the Apple Developer Program ($99 a year). Save this one for later." },
    ],
    links: [
      { label: "Register for the Chrome Web Store ($5 one time)", href: "https://chrome.google.com/webstore/devconsole/register", kind: "Store" },
      { label: "Chrome Web Store developer dashboard", href: "https://chrome.google.com/webstore/devconsole", kind: "Store" },
      { label: "Microsoft Edge: create a developer account (free)", href: "https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/create-dev-account", kind: "Store" },
      { label: "Firefox Add-ons developer hub (free)", href: "https://addons.mozilla.org/en-US/developers/", kind: "Store" },
      { label: "Opera Add-ons developer page (free)", href: "https://addons.opera.com/developer/", kind: "Store" },
      { label: "Safari: convert a web extension (Apple, $99 a year)", href: "https://developer.apple.com/documentation/safariservices/converting-a-web-extension-for-safari", kind: "Docs" },
    ],
  },
};

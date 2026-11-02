export type Tool = { name: string; icon: string; use: string; url?: string };
// Add a tool = add a line. icon = simpleicons.org slug; slugs they don't have show a letter mark instead (see BrandIcon).
export type Cost = { sub: "yes" | "optional" | "no"; price: string; note: string };

// Prices checked in Nov 2026 and they change, so check each tool's own site before buying anything.
// Anything not listed here gets DEFAULT_COST. `sub: "yes"` means our team needs a paid plan for it.
export const DEFAULT_COST: Cost = { sub: "optional", price: "Free plan available", note: "Paid plans add more usage and features. Check their site for current prices." };
export const COST: Record<string, Cost> = {
  ChatGPT: { sub: "yes", price: "$20 per month (Plus)", note: "The club uses a paid plan for the longer limits and newer models. The free version works to get started." },
  Claude: { sub: "yes", price: "$20 per month (Pro), or $17 per month billed yearly", note: "The club uses Pro for longer chats and heavier work. The free version works to get started." },
  Higgsfield: { sub: "yes", price: "Paid plans from about $19 per month", note: "The free plan has no generation credits, so teams making videos need a paid plan. Prices vary by region." },
  Clerk: { sub: "no", price: "Free for up to 50,000 monthly returning users", note: "The Pro plan is $25 per month if an app ever outgrows that." },
  Firebase: { sub: "no", price: "Free Spark plan", note: "The pay-as-you-go Blaze plan is only needed if your app grows large." },
  "Google Cloud Console": { sub: "no", price: "Free to use. You pay only for the services you turn on.", note: "New accounts often get free credits. Check Google for current offers." },
  "Google AI Studio": { sub: "no", price: "Free to use", note: "Free use has rate limits. Heavy API use is billed by how much you use." },
  "Apple Intelligence": { sub: "no", price: "Free on supported Apple devices", note: "You need a compatible iPhone, iPad or Mac." },
  Xcode: { sub: "no", price: "Free (Mac only)", note: "Publishing an app on the App Store needs the Apple Developer Program: $99 per year (about $100)." },
  "Google Vids": { sub: "optional", price: "Free version, with more AI features on paid Google plans", note: "Plans change, so check Google's pricing before paying for anything." },
  Python: { sub: "no", price: "Free", note: "Free and open source." },
  GitHub: { sub: "no", price: "Free plan", note: "Free for public and private projects. Paid plans add team features." },
  Vercel: { sub: "no", price: "Free Hobby plan", note: "The free plan is enough for a school project site." },
  Supabase: { sub: "no", price: "Free plan", note: "Free projects can pause after a week of no use." },
  Midjourney: { sub: "optional", price: "Mostly paid", note: "There is no ongoing free plan. Check their site for current prices." },
  GoHighLevel: { sub: "optional", price: "Paid platform", note: "It is a business tool without a long-term free plan. Check their site for current prices." },
  Stripe: { sub: "no", price: "No monthly fee. You pay a fee on each payment.", note: "Check Stripe for the current fee in your country." },
};
export const costOf = (name: string): Cost => COST[name] ?? DEFAULT_COST;

export const TOOL_GROUPS: { group: string; tools: Tool[] }[] = [
  { group: "AI assistants", tools: [
    { name: "ChatGPT", icon: "openai", use: "Brainstorming, code help, and drafting.", url: "https://chatgpt.com/pricing" },
    { name: "Claude", icon: "anthropic", use: "Long documents and careful coding.", url: "https://claude.com/pricing" },
    { name: "Gemini", icon: "googlegemini", use: "Google's AI for writing, research and images.", url: "https://gemini.google/subscriptions/" },
    { name: "Grok", icon: "grok", use: "xAI's chatbot, with live access to posts on X." },
    { name: "Copilot", icon: "copilot", use: "Microsoft's AI assistant, built into Word, Excel and Windows." },
    { name: "DeepSeek", icon: "deepseek", use: "A free AI model that's strong at reasoning and code." },
    { name: "Mistral", icon: "mistralai", use: "Le Chat, a fast AI assistant from a French lab." },
    { name: "Perplexity", icon: "perplexity", use: "An AI search engine that shows its sources." },
    { name: "NotebookLM", icon: "notebooklm", use: "Upload notes and chat with them, or turn them into a podcast." },
    { name: "Apple Intelligence", icon: "apple", use: "Apple's built-in AI for writing, summaries and images on iPhone, iPad and Mac.", url: "https://www.apple.com/apple-intelligence/" },
    { name: "Google AI Studio", icon: "aistudio", use: "Try Google's Gemini models and build prompts, free in the browser.", url: "https://aistudio.google.com" },
  ] },
  { group: "Building", tools: [
    { name: "Cursor", icon: "cursor", use: "An AI code editor for building apps.", url: "https://cursor.com/pricing" },
    { name: "Windsurf", icon: "windsurf", use: "Another AI code editor, good for beginners." },
    { name: "v0", icon: "v0", use: "Turn prompts into UI components." },
    { name: "Bolt", icon: "bolt", use: "Build a full web app from a prompt, in the browser." },
    { name: "Lovable", icon: "lovable", use: "Turn a prompt into a full web app with a database." },
    { name: "YouWare", icon: "youware", use: "Describe an app and get a working version you can share." },
    { name: "Replit", icon: "replit", use: "Build and run code in the browser, with an AI helper." },
    { name: "GitHub", icon: "github", use: "Store your code and work on it as a team.", url: "https://github.com/pricing" },
    { name: "Firebase", icon: "firebase", use: "Add logins and a simple database to your app.", url: "https://firebase.google.com/pricing" },
    { name: "Supabase", icon: "supabase", use: "A free database and user accounts for your project.", url: "https://supabase.com/pricing" },
    { name: "Xcode", icon: "xcode", use: "Apple's free tool for building iPhone and Mac apps.", url: "https://developer.apple.com/xcode/" },
    { name: "Google Cloud Console", icon: "googlecloud", use: "The control panel for Google's cloud: keys, databases and hosting for your app.", url: "https://console.cloud.google.com" },
    { name: "Clerk", icon: "clerk", use: "Add sign-up, login and user accounts to your app in minutes.", url: "https://clerk.com/pricing" },
    { name: "Vercel", icon: "vercel", use: "One-click hosting for our sites.", url: "https://vercel.com/pricing" },
    { name: "Webflow", icon: "webflow", use: "Design and publish websites visually, no code." },
    { name: "WordPress", icon: "wordpress", use: "The most-used website platform, good for blogs and small shops." },
  ] },
  { group: "Design and media", tools: [
    { name: "Figma", icon: "figma", use: "Interface and brand design.", url: "https://www.figma.com/pricing/" },
    { name: "Framer", icon: "framer", use: "Design and publish a polished website visually." },
    { name: "Midjourney", icon: "midjourney", use: "Concept art and imagery." },
    { name: "Canva", icon: "canva", use: "Quick social graphics and decks.", url: "https://www.canva.com/pricing/" },
    { name: "Gamma", icon: "gamma", use: "Generate slide decks and one-page sites from a prompt." },
    { name: "Runway", icon: "runway", use: "Generate and edit video with AI." },
    { name: "Google Vids", icon: "googlevids", use: "Turn a script into a short video with slides, stock media and an AI voice.", url: "https://workspace.google.com/products/vids/" },
    { name: "Higgsfield", icon: "higgsfield", use: "Make AI videos and cinematic images from a prompt or a photo.", url: "https://higgsfield.ai/pricing" },
    { name: "ElevenLabs", icon: "elevenlabs", use: "Realistic AI voices for videos and demos." },
    { name: "HeyGen", icon: "heygen", use: "Make talking-avatar videos from a script." },
    { name: "Suno", icon: "suno", use: "Make original music and jingles from a text prompt." },
  ] },
  { group: "Sales and marketing", tools: [
    { name: "HubSpot", icon: "hubspot", use: "A free CRM for tracking leads and customers." },
    { name: "GoHighLevel", icon: "gohighlevel", use: "Funnels, texts, emails and booking in one platform." },
    { name: "Notion", icon: "notion", use: "Planning and content calendars.", url: "https://www.notion.com/pricing" },
    { name: "Mailchimp", icon: "mailchimp", use: "Email campaigns." },
    { name: "CapCut", icon: "capcut", use: "Short-form video editing." },
    { name: "Loom", icon: "loom", use: "Record quick screen videos to show your product." },
    { name: "Buffer", icon: "buffer", use: "Schedule posts across social media." },
    { name: "Calendly", icon: "calendly", use: "Let people book time with you." },
    { name: "Typeform", icon: "typeform", use: "Surveys and sign-up forms that feel like a conversation." },
    { name: "Shopify", icon: "shopify", use: "Open an online store." },
    { name: "Stripe", icon: "stripe", use: "Take payments online." },
  ] },
  { group: "Data and automation", tools: [
    { name: "Google Sheets", icon: "googlesheets", use: "Tracking sales and users." },
    { name: "Airtable", icon: "airtable", use: "A spreadsheet-style database for tracking your project." },
    { name: "Zapier", icon: "zapier", use: "Automating repetitive workflows." },
    { name: "n8n", icon: "n8n", use: "Build automations that connect your apps, with AI steps." },
    { name: "Python", icon: "python", use: "Cleaning and analyzing data." },
  ] },
];

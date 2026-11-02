// TODO: dates, prizes, teams and scores are placeholders
export const CUP = {
  name: "AIBA Cup", deadline: "2027-05-30T23:59:00",
  // The Cup opens in March and runs five weeks. The start is Wednesday, March 24, 2027. TODO: set the time to when lunch starts.
  start: "2027-03-24T11:30:00", weeks: 5, startLabel: "March 24, 2027", updated: "Last updated Friday",
  tracks: [
    { key: "revenue", label: "Most revenue", unit: "$", teams: [
      { name: "Team Alpha", members: "Maya, Dev, Sam", built: "Study Buddy", score: 1240, delta: 1 },
      { name: "Team Bravo", members: "Leo, Ana", built: "Campus Eats", score: 910, delta: -1 },
      { name: "Team Charlie", members: "Priya, Jon, Kai", built: "Logo Lab", score: 640, delta: 0 },
      { name: "Team Delta", members: "Zoe, Max", built: "Sales Signal", score: 220, delta: 0 } ] },
    { key: "sales", label: "Most sales", unit: "", teams: [
      { name: "Team Bravo", members: "Leo, Ana", built: "Campus Eats", score: 134, delta: 2 },
      { name: "Team Alpha", members: "Maya, Dev, Sam", built: "Study Buddy", score: 98, delta: -1 },
      { name: "Team Delta", members: "Zoe, Max", built: "Sales Signal", score: 71, delta: -1 },
      { name: "Team Charlie", members: "Priya, Jon, Kai", built: "Logo Lab", score: 40, delta: 0 } ] },
    { key: "users", label: "Most users", unit: "", teams: [
      { name: "Team Alpha", members: "Maya, Dev, Sam", built: "Study Buddy", score: 820, delta: 0 },
      { name: "Team Charlie", members: "Priya, Jon, Kai", built: "Logo Lab", score: 455, delta: 1 },
      { name: "Team Bravo", members: "Leo, Ana", built: "Campus Eats", score: 300, delta: -1 },
      { name: "Team Delta", members: "Zoe, Max", built: "Sales Signal", score: 150, delta: 0 } ] },
  ],
  how: [
    { t: "Form a team", d: "2 to 5 people. Pick an idea at a Wednesday meeting." },
    { t: "Build and launch", d: "Use AI tools to make a product and get it in front of real people." },
    { t: "Report your numbers", d: "Send revenue, sales and user counts with proof every Friday." },
    { t: "Awards night", d: "Final scores are locked on May 30 and the trophies go out." },
  ],
  rules: ["Teams of 2–5 members.", "Products must be built with AI tools.", "Only verifiable revenue, sales and users count.", "Scores are updated every Friday.", "No buying users or fake sales. Teams caught doing it are out."],
  timeline: [{ date: "Oct", label: "Teams form" }, { date: "Jan", label: "Midpoint check-in" }, { date: "Apr", label: "Build freeze" }, { date: "May 30", label: "Final scores + awards" }],
  prizes: [{ place: "1st", title: "Overall champion", prize: "$200 + trophy" }, { place: "2nd", title: "Runner-up", prize: "$100" }, { place: "3rd", title: "Third place", prize: "$50" }],
  trackPrize: "Each track winner also gets $100.",
};

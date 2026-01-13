// Mock inbox data
export const initialMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    subject: "Q4 Marketing Strategy Review",
    preview:
      "Hi team, I wanted to share the updated marketing strategy for Q4. Please review the attached document and let me know your thoughts...",
    content:
      "Hi team,\n\nI wanted to share the updated marketing strategy for Q4. Please review the attached document and let me know your thoughts before our meeting on Friday.\n\nKey highlights:\n- New social media campaigns\n- Updated PPC budget allocation\n- Influencer partnerships\n\nLooking forward to your feedback!\n\nBest,\nSarah",
    date: "2 min ago",
    read: false,
    starred: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    category: "inbox",
  },
  {
    id: 2,
    sender: "Dev Team",
    email: "dev@company.com",
    subject: "Sprint Retrospective Summary",
    preview:
      "Team, here's the summary from yesterday's retrospective. We discussed the wins, challenges, and action items for the next sprint...",
    content:
      "Team,\n\nHere's the summary from yesterday's retrospective.\n\nWins:\n- Successfully deployed v2.3\n- Reduced bug count by 40%\n- Improved CI/CD pipeline\n\nChallenges:\n- Code review turnaround time\n- Documentation gaps\n\nAction Items:\n- Implement async code reviews\n- Schedule documentation sprints\n\nGreat work everyone!",
    date: "1 hour ago",
    read: false,
    starred: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devteam",
    category: "inbox",
  },
  {
    id: 3,
    sender: "Alex Chen",
    email: "alex.chen@partner.io",
    subject: "Partnership Proposal",
    preview:
      "Hello! We've been impressed with your platform and would like to explore partnership opportunities. Our team believes there's great synergy...",
    content:
      "Hello!\n\nWe've been impressed with your platform and would like to explore partnership opportunities.\n\nOur team believes there's great synergy between our products, and we'd love to discuss:\n\n1. API integration possibilities\n2. Co-marketing initiatives\n3. Revenue sharing models\n\nWould you be available for a call next week?\n\nBest regards,\nAlex Chen\nPartner Relations, TechCorp",
    date: "3 hours ago",
    read: true,
    starred: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    category: "inbox",
  },
  {
    id: 4,
    sender: "HR Department",
    email: "hr@company.com",
    subject: "New Benefits Package Available",
    preview:
      "Dear employees, we're excited to announce our updated benefits package for 2026. This includes enhanced health coverage, wellness programs...",
    content:
      "Dear employees,\n\nWe're excited to announce our updated benefits package for 2026!\n\nNew Benefits Include:\n• Enhanced health coverage\n• Mental wellness programs\n• Flexible work arrangements\n• Learning & development budget\n• Gym membership subsidies\n\nPlease review the full details in the employee portal and reach out with any questions.\n\nBest,\nHR Team",
    date: "Yesterday",
    read: true,
    starred: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hr",
    category: "inbox",
  },
  {
    id: 5,
    sender: "Emily Watson",
    email: "emily.w@design.co",
    subject: "Design Assets Ready for Review",
    preview:
      "Hi! The new design assets for the dashboard redesign are ready. I've uploaded everything to Figma. Please take a look and share feedback...",
    content:
      "Hi!\n\nThe new design assets for the dashboard redesign are ready. I've uploaded everything to Figma.\n\nThe package includes:\n- New component library\n- Dark mode variants\n- Mobile responsive layouts\n- Animation prototypes\n\nLink: figma.com/file/dashboard-v3\n\nLet me know if you need any revisions!\n\nCheers,\nEmily",
    date: "Yesterday",
    read: true,
    starred: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    category: "inbox",
  },
  {
    id: 6,
    sender: "System Notifications",
    email: "noreply@system.com",
    subject: "Security Alert: New Login Detected",
    preview:
      "We noticed a new login to your account from a different device. If this was you, you can ignore this message. Otherwise, please secure your account...",
    content:
      "We noticed a new login to your account.\n\nDetails:\n- Device: MacBook Pro\n- Location: New York, US\n- Time: Today at 9:42 AM\n- Browser: Chrome 120\n\nIf this was you, no action is needed.\n\nIf you don't recognize this activity, please:\n1. Change your password immediately\n2. Enable two-factor authentication\n3. Review recent account activity\n\n- Security Team",
    date: "2 days ago",
    read: true,
    starred: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=system",
    category: "inbox",
  },
];

export type Message = (typeof initialMessages)[0];

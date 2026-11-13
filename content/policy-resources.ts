// The USG / AI Policy Resource List, shown at /resources/policy.
// Edit entries here; the page renders them in this order.

export type Link = { name: string; href: string };
export type Entry = Link & { note: string; also?: Link };
export type Group = { title: string; intro?: string; entries: Entry[] };

export const updated = "2026-11-11";

export const startHere: { label: string; links: Link[] }[] = [
  {
    label: "Policy and research",
    links: [
      { name: "IAPS", href: "https://www.iaps.ai/" },
      { name: "GovAI", href: "https://www.governance.ai/about-us" },
      { name: "ARI", href: "https://ari.us/" },
      { name: "CSET", href: "https://cset.georgetown.edu/about-us/" },
      { name: "IFP", href: "https://ifp.org/" },
      { name: "RAND CAST", href: "https://www.rand.org/global-and-emerging-risks/centers/ai-security-and-technology.html" },
    ],
  },
  {
    label: "Government decisions",
    links: [
      { name: "SI Force", href: "https://apnews.com/article/b8689ea07de9102a52bd1cd2049b5901" },
      { name: "OSTP", href: "https://www.whitehouse.gov/ostp/" },
      { name: "CAISSI", href: "https://www.nist.gov/caissi" },
      { name: "BIS", href: "https://www.bis.gov/" },
      { name: "Senate Commerce", href: "https://www.commerce.senate.gov/hearings/?ID=059064F8-8D58-4725-98BC-61CC53DBCB08" },
    ],
  },
];

export const xList: Link = { name: "AI policy X list", href: "https://x.com/i/lists/2118930097231044951" };

export const newsletters: Link[] = [
  { name: "Launchpad", href: "https://horizonlaunchpad.substack.com/" },
  { name: "Transformer News", href: "https://www.transformernews.ai/" },
  { name: "AI Policy Newsletter, AIPI", href: "https://theaipi.org/about/" },
  { name: "AI Safety Newsletter, CAIS", href: "https://newsletter.safe.ai/" },
  { name: "The First Scattering, Jason Hausenloy", href: "https://firstscattering.com/" },
  { name: "The Frontier, FAI", href: "https://www.frontier.thefai.org/" },
  { name: "IFP", href: "https://instituteforprogress.substack.com/" },
  { name: "The Power Law, Peter Wildeford", href: "https://blog.peterwildeford.com/" },
  { name: "Richard Hanania", href: "https://www.richardhanania.com/" },
  { name: "Rising Tide, Helen Toner", href: "https://helentoner.substack.com/" },
  { name: "Threading the Needle, Anton Leicht", href: "https://writing.antonleicht.me/" },
  { name: "EpochAI", href: "https://epochai.substack.com/" },
  { name: "SemiAnalysis", href: "https://newsletter.semianalysis.com/" },
  { name: "AI Futures Project", href: "https://blog.aifutures.org/" },
  { name: "Geopolitics of AGI, RAND", href: "https://geopoliticsagi.substack.com/" },
  { name: "The Substrate, Eric Grundewald", href: "https://www.the-substrate.net/" },
  { name: "Policy Gradients, FAI", href: "https://policygradients.thefai.org/" },
  { name: "AI Policy Bulletin", href: "https://newsletter.aipolicybulletin.org/" },
  { name: "AI Frontiers, CAIS", href: "https://substack.com/@aifrontiersmedia" },
  { name: "Dean Ball", href: "https://substack.com/@deanwball" },
  { name: "Statecraft, Santi Ruiz", href: "https://www.statecraft.pub/" },
  { name: "China AI Bulletin, Emmie Hine", href: "https://chinaaibulletin.substack.com/" },
  { name: "AI Safety in China, Concordia", href: "https://aisafetychina.substack.com/" },
];

export const organizations: Group[] = [
  {
    title: "AI policy organizations",
    entries: [
      { name: "Americans for Responsible Innovation (ARI)", href: "https://ari.us/", note: "Follow federal AI proposals, legislative advocacy, and analysis of safety and innovation." },
      { name: "Institute for AI Policy and Strategy (IAPS)", href: "https://www.iaps.ai/", note: "Follow research on frontier AI security, compute policy, and international strategy." },
      { name: "Secure AI Project (SAIP)", href: "https://secureaiproject.org/", note: "Follow state legislation and proposals for transparency and safeguards against severe AI harms." },
      { name: "Alliance for Secure AI", href: "https://secureainow.org/", note: "Follow its public campaigns and advocacy for safeguards, national security, and human control of advanced AI." },
      { name: "Horizon Institute for Public Service", href: "https://horizonpublicservice.org/", note: "Follow policy fellowships, career resources, and programs that connect technical experts with government." },
      { name: "Centre for the Governance of AI (GovAI)", href: "https://www.governance.ai/about-us", note: "Follow research on advanced AI governance, security, economics, and institutional responses, plus its fellowships." },
      { name: "SaferAI", href: "https://www.safer-ai.org/", note: "Follow research on frontier AI risk management, evaluations, standards, and company safety frameworks." },
      { name: "Safe AI Forum (SAIF)", href: "https://saif.org/", note: "Follow international dialogues and efforts to coordinate responses to extreme AI risks." },
      { name: "Encode AI", href: "https://encodeai.org/", note: "Follow federal and state advocacy on AI safety, civil liberties, children’s safety, and human control." },
      { name: "AI Policy Network (AIPN)", href: "https://theaipn.org/about/", note: "Follow federal advocacy on advanced AI preparedness, security, and American leadership." },
      { name: "Institute for Law & AI (LawAI)", href: "https://law-ai.org/about-the-institute-for-law-ai/", note: "Follow legal research and analysis that informs AI legislation, institutions, and governance." },
      { name: "Concordia AI", href: "https://concordia-ai.com/about-us/faqs/", note: "Follow developments in China and Singapore, safety evaluations, standards, and international dialogue." },
      { name: "ControlAI", href: "https://controlai.org/about", note: "Follow campaigns and legislative proposals that seek to prevent loss of human control and extinction risks." },
      { name: "Machine Intelligence Research Institute (MIRI)", href: "https://intelligence.org/blog/", note: "Follow its analysis of superintelligence risks, international agreements, and proposals to restrict unsafe development." },
      { name: "Artificial Intelligence Policy Institute (AIPI)", href: "https://theaipi.org/about/", note: "Follow public opinion surveys and research on advanced AI and its policy implications." },
      { name: "Center for AI Safety (CAIS)", href: "https://safe.ai/about", note: "Follow safety research, standards advocacy, and its AI Safety Newsletter." },
      { name: "Future of Life Institute (FLI)", href: "https://futureoflife.org/", note: "Follow U.S. and European AI advocacy, policy proposals, and work on catastrophic risks." },
      { name: "Center for Democracy & Technology (CDT) — AI Governance Lab", href: "https://cdt.org/topics/ai-governance-lab/", note: "Follow work on AI audits, accountability, safety, civil rights, and practical governance." },
      { name: "AI Now Institute", href: "https://ainowinstitute.org/", note: "Follow analysis of AI industry power, public accountability, labor impacts, and data center policy." },
    ],
  },
  {
    title: "Think tanks and university policy centers",
    entries: [
      { name: "Institute for Progress (IFP)", href: "https://ifp.org/", note: "Follow AI infrastructure, research policy, talent, compute access, and U.S. competitiveness." },
      { name: "Foundation for American Innovation (FAI)", href: "https://www.thefai.org/about-us", note: "Follow technology policy proposals, AI governance debates, and analysis of American innovation and security." },
      { name: "RAND — Center on AI, Security, and Technology (RAND CAST)", href: "https://www.rand.org/global-and-emerging-risks/centers/ai-security-and-technology.html", note: "Follow AI security, biosecurity, energy, and geopolitical research. CAST builds on the former Technology and Security Policy Center and Meselson Center." },
      { name: "Georgetown — Center for Security and Emerging Technology (CSET)", href: "https://cset.georgetown.edu/about-us/", note: "Follow data and policy research on AI, advanced computing, biotechnology, and national security." },
      { name: "Center for Strategic and International Studies (CSIS) — Wadhwani AI Center", href: "https://www.csis.org/programs/wadhwani-ai-center", note: "Follow AI geopolitics, national security, economic competitiveness, and global governance." },
      { name: "Center for a New American Security (CNAS)", href: "https://www.cnas.org/ai-security", note: "Follow AI security and stability, compute governance, military applications, and competition with China." },
      { name: "Brookings Institution", href: "https://www.brookings.edu/topics/artificial-intelligence/", note: "Follow AI research and events across economic policy, governance, education, and international affairs." },
      { name: "Carnegie Endowment for International Peace — Technology and International Affairs", href: "https://carnegieendowment.org/programs/technology-and-international-affairs/collections/artificial-intelligence", note: "Follow international AI governance, security, assessment, and cooperation." },
      { name: "Stanford Institute for Human-Centered Artificial Intelligence (HAI)", href: "https://hai.stanford.edu/policy", note: "Follow policy briefs, government education programs, and the AI Index." },
      { name: "Information Technology and Innovation Foundation (ITIF)", href: "https://itif.org/issues/artificial-intelligence/", note: "Follow AI innovation, adoption, competitiveness, and regulatory policy proposals." },
      { name: "Federation of American Scientists (FAS)", href: "https://fas.org/initiative/artificial-intelligence/", note: "Follow AI policy proposals, government capacity initiatives, and opportunities for technical experts to enter public service." },
    ],
  },
  {
    title: "Super Intelligence Force and related offices",
    entries: [
      { name: "Super Intelligence Force (SIF)", href: "https://apnews.com/article/b8689ea07de9102a52bd1cd2049b5901", note: "This White House task force coordinates federal policy on advanced AI. Its announced leads include Jay Clayton, Andrew Ferguson, Emil Michael, and Scott Kupor. Follow its mandate, reports, appointments, and commitments from AI companies." },
      { name: "Office of the Director of National Intelligence (ODNI)", href: "https://www.odni.gov/", note: "Follow intelligence assessments and statements from the office of SI Force chair Jay Clayton." },
      { name: "Federal Trade Commission (FTC)", href: "https://www.ftc.gov/legal-library/browse/policy-statements", note: "Follow AI policy statements and enforcement under consumer protection and competition law." },
      { name: "Pentagon — Office of Research and Engineering; Chief Digital and Artificial Intelligence Office (CDAO)", href: "https://www.cto.mil/about/", note: "Follow military AI policy, evaluations, technology programs, and procurement.", also: { name: "CDAO newsroom", href: "https://www.ai.mil/News/" } },
      { name: "Office of Personnel Management (OPM)", href: "https://www.opm.gov/", note: "Follow federal workforce policy, technical recruitment, and AI skills initiatives." },
      { name: "Department of Justice — Super Intelligence Task Force (DOJ-SITF)", href: "https://www.justice.gov/opa/pr/department-justice-launches-super-intelligence-task-force", note: "Follow enforcement priorities, cases involving AI misuse, and coordination with the White House SI Force. DOJ announced this separate task force on November 5, 2026." },
    ],
  },
  {
    title: "Other U.S. government offices and agencies",
    entries: [
      { name: "White House — Office of Science and Technology Policy (OSTP)", href: "https://www.whitehouse.gov/ostp/", note: "Follow executive policy, research priorities, consultations, and the President’s Council of Advisors on Science and Technology (PCAST)." },
      { name: "White House — Office of Management and Budget (OMB)", href: "https://www.whitehouse.gov/omb/", note: "Follow memoranda on federal AI use, procurement, agency governance, and budgets." },
      { name: "National Institute of Standards and Technology (NIST) — Center for Advancing Innovation and Standards for Super Intelligence (CAISSI)", href: "https://www.nist.gov/caissi", note: "Follow frontier model evaluations, security guidance, incident readiness, and standards. CAISSI is the current center name; older materials use CAISI or U.S. AI Safety Institute." },
      { name: "Commerce — Bureau of Industry and Security (BIS)", href: "https://www.bis.gov/", note: "Follow advanced chip export controls, licensing, enforcement, and restrictions that affect access to compute." },
      { name: "National Telecommunications and Information Administration (NTIA)", href: "https://www.ntia.gov/", note: "Follow AI policy consultations, accountability work, and communications infrastructure initiatives." },
      { name: "Department of Energy (DOE) and its national laboratories", href: "https://www.energy.gov/topics/super-intelligence", note: "Follow the Genesis Mission, scientific AI, computing infrastructure, and national security research." },
      { name: "Cybersecurity and Infrastructure Security Agency (CISA)", href: "https://www.cisa.gov/ai", note: "Follow guidance on secure AI systems and risks to critical infrastructure." },
      { name: "Department of State", href: "https://www.state.gov/", note: "Follow international AI agreements, technology diplomacy, and U.S. positions in multilateral forums." },
      { name: "National Science Foundation (NSF)", href: "https://www.nsf.gov/focus-areas/si", note: "Follow AI research programs, funding opportunities, and the National Artificial Intelligence Research Resource (NAIRR)." },
    ],
  },
  {
    title: "Congressional committees",
    intro: "Follow hearings, draft bills, committee votes, and statements from both majority and minority members.",
    entries: [
      { name: "Senate Committee on Commerce, Science, and Transportation", href: "https://www.commerce.senate.gov/hearings/?ID=059064F8-8D58-4725-98BC-61CC53DBCB08", note: "Follow technology legislation, standards, research, and commercial AI policy." },
      { name: "Senate Committee on the Judiciary", href: "https://www.judiciary.senate.gov/", note: "Follow AI oversight, liability, intellectual property, competition, and civil rights." },
      { name: "Senate Committee on Homeland Security and Governmental Affairs", href: "https://www.hsgac.senate.gov/media/dems/peters-lankford-introduce-bipartisan-bill-to-require-transparency-around-federal-governments-use-of-ai/", note: "Follow federal AI use, transparency, procurement, and government oversight." },
      { name: "House Committee on Energy and Commerce", href: "https://energycommerce.house.gov/", note: "Follow commercial AI policy, consumer protection, privacy, and energy infrastructure." },
      { name: "House Committee on Science, Space, and Technology", href: "https://science.house.gov/", note: "Follow AI research, standards, and oversight of federal science agencies." },
    ],
  },
  {
    title: "State government offices",
    entries: [
      { name: "California — Governor’s Office, Legislature, and Attorney General", href: "https://www.gov.ca.gov/2026/09/30/californias-nation-leading-ai-framework-just-got-stronger-governor-newsom-signs-more-first-in-the-nation-worker-protections-and-more/", note: "Follow frontier AI transparency, safety legislation, implementation, and enforcement." },
      { name: "New York — Governor’s Office, Legislature, and Department of Financial Services", href: "https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models", note: "Follow implementation of the Responsible AI Safety and Education (RAISE) Act and oversight of frontier AI developers." },
    ],
  },
  {
    title: "Selected international government bodies",
    entries: [
      { name: "United Kingdom — AI Security Institute (AISI)", href: "https://www.aisi.gov.uk/", note: "Follow frontier model evaluations, risk research, and international technical cooperation." },
      { name: "European Commission — European AI Office", href: "https://digital-strategy.ec.europa.eu/en/policies/ai-office", note: "Follow AI Act implementation, general-purpose AI rules, guidance, and enforcement." },
      { name: "Organisation for Economic Co-operation and Development (OECD)", href: "https://www.oecd.org/en/topics/ai-principles.html", note: "Follow international AI principles, comparative policy analysis, and the OECD.AI Policy Observatory." },
    ],
  },
];

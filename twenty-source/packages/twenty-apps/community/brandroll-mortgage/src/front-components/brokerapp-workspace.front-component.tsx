import { defineFrontComponent } from 'twenty-sdk/define';

export const BROKERAPP_DEALDASH_FRONT_COMPONENT_ID =
  '6b6d0000-4100-4000-8000-000000000001';

const leadStages = [
  { number: '1.', name: 'New Lead', count: 5, amount: '$0.56M', open: true },
  {
    number: '2.',
    name: 'Attempted Contact 1',
    count: 1,
    amount: '$0.53M',
    open: true,
  },
  {
    number: '3.',
    name: 'Attempted Contact 2',
    count: 0,
    amount: '$0.00M',
    open: false,
  },
  {
    number: '4.',
    name: 'Attempted Contact 3',
    count: 0,
    amount: '$0.00M',
    open: false,
  },
  {
    number: '5.',
    name: 'Initial Call Held > Get Docs',
    count: 1,
    amount: '$0.00M',
    open: true,
  },
  {
    number: '6.',
    name: 'Docs Requested',
    count: 0,
    amount: '$0.00M',
    open: false,
  },
  {
    number: '7.',
    name: 'Research > Servicing',
    count: 0,
    amount: '$0.00M',
    open: false,
  },
  {
    number: '8.',
    name: 'Prepare Loan Proposal',
    count: 0,
    amount: '$0.00M',
    open: false,
  },
  {
    number: '9.',
    name: 'Loan Proposal Presented',
    count: 0,
    amount: '$0.00M',
    open: false,
  },
  {
    number: '10.',
    name: 'Client Accepted > Handover',
    count: 0,
    amount: '$0.00M',
    open: false,
  },
  { number: '11.', name: 'On Hold', count: 0, amount: '$0.00M', open: false },
  { number: '12.', name: 'Lost Opps', count: 0, amount: '$0.00M', open: false },
];

const leadCards = [
  {
    lender: 'WBC',
    name: 'Home Improvement - Maria Rosharie',
    owner: 'Broker',
    amount: '$534,850',
    financeDate: '-',
    settlementDate: '23/06/2025',
    stageDueDate: '24/09/2025',
    urgent: true,
  },
  {
    lender: 'ANZ',
    name: 'Renovation - Refinance',
    owner: 'Broker',
    amount: '$562,975',
    financeDate: '-',
    settlementDate: '23/06/2025',
    stageDueDate: '17/03/2026',
    urgent: true,
  },
  {
    lender: 'AFG',
    name: 'Shiva Tavakoli',
    owner: 'Broker',
    amount: '$0',
    financeDate: '-',
    settlementDate: '-',
    stageDueDate: '08/01/2026',
    urgent: false,
  },
];

const dealStages = [
  'Outstanding Supporting Documents',
  'Prepare for Submission',
  'App Docs With Client',
  'Signed App Docs Returned',
  'Application Lodged',
  'AIP Issued',
  'AIP > Full Conversion',
  'Conditional/MIRs',
  'Conditions/MIRs With Client',
  'Conditions/MIRs With Lender',
  'Formal Approval',
  'Mortgage Docs Issued',
  'Mortgage Docs Returned',
  'Ready To Settle',
  'Settlement Booked',
  'Settlement',
  'Lost/Declined',
];

const factFindSections = [
  ['Goals', 'Loan purpose, objectives, desired features, priority ranking'],
  ['Applicants', 'Primary, co-applicant, up to four residential applicants'],
  ['Dependants', 'Age, relationship, expense impact'],
  ['Employment', 'PAYG, self-employed, probation, industry, tenure'],
  ['Income', 'Base, overtime, bonus, commission, rental, other income'],
  ['Assets', 'Property, savings, vehicles, shares, super, other assets'],
  ['Liabilities', 'Home loans, personal loans, credit cards, BNPL, HECS'],
  ['Living Expenses', 'HEM categories, declared expenses, exceptions'],
  ['Financial Security', 'Insurance, buffers, exit strategy, hardship risks'],
];

const strategySections = [
  ['Interview Guide', 'Structured broker interview and customer objectives'],
  ['Security', 'Property, valuation, ownership, title, zoning, construction'],
  ['Funding Position', 'Funds to complete, contribution, grants, rebates'],
  ['Serviceability', 'Lender calculators, policy checks, sensitised result'],
  ['Product Search', 'AFG product import, filters, shortlist, reason codes'],
  ['Credit Proposal', 'Options compared, recommendation, BID rationale'],
];

const lodgementSections = [
  ['Lodgement Funding', 'ApplyOnline / AFG Flex readiness and payload gaps'],
  ['Credit Proposal', 'Generate proposal, compare lenders, capture consent'],
  ['Submission', 'Package validation, lender reference, status backchannel'],
  ['Conditions', 'MIRs, approval conditions, document request stack'],
];

const rightRailTools = [
  'Notes',
  'Checklists',
  'Tasks',
  'Emails',
  'Texts',
  'Key Dates',
  'Reports',
  '1-Click Workflows',
];

const checklistItems = [
  ['Credit guide sent', 'Ready'],
  ['Privacy consent acknowledged', 'Ready'],
  ['Fact-find complete', 'In progress'],
  ['KYC/CDD complete', 'Blocked'],
  ['Serviceability assessed', 'Not started'],
  ['Credit proposal approved', 'Not started'],
];

const styles = {
  shell: {
    minHeight: '100%',
    background: '#f8f9fb',
    color: '#252a31',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    padding: '0',
  },
  topbar: {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    borderBottom: '1px solid #e5e8ee',
    background: '#ffffff',
    padding: '0 14px',
  },
  topbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0,
  },
  newButton: {
    background: '#18a66a',
    border: '1px solid #148d5a',
    color: '#ffffff',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 700,
    padding: '7px 13px',
  },
  countText: {
    fontWeight: 700,
    fontSize: '13px',
    whiteSpace: 'nowrap',
  },
  search: {
    width: '220px',
    height: '28px',
    border: '1px solid #d8dce4',
    borderRadius: '4px',
    padding: '0 10px',
    color: '#727986',
    background: '#ffffff',
  },
  iconButton: {
    width: '30px',
    height: '30px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #d8dce4',
    borderRadius: '4px',
    background: '#ffffff',
    color: '#34425a',
    fontWeight: 800,
  },
  canvas: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 332px',
    gap: '12px',
    padding: '12px',
  },
  boardWrap: {
    background: '#ffffff',
    border: '1px solid #e2e6ed',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  boardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderBottom: '1px solid #eceff3',
  },
  board: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '8px',
    overflowX: 'auto' as const,
    minHeight: '520px',
    padding: '8px',
  },
  column: {
    width: '255px',
    minWidth: '255px',
    background: '#eef0f2',
    borderRadius: '5px',
    padding: '8px',
  },
  collapsedColumn: {
    width: '42px',
    minWidth: '42px',
    background: '#eef0f2',
    borderRadius: '5px',
    padding: '8px 4px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalText: {
    writingMode: 'vertical-rl' as const,
    transform: 'rotate(180deg)',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  },
  columnTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 800,
  },
  small: {
    color: '#626b78',
    fontSize: '12px',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #ff6c64',
    borderRadius: '5px',
    boxShadow: '0 1px 0 rgba(20, 26, 35, 0.04)',
    marginTop: '8px',
    padding: '9px',
  },
  cardTitle: {
    color: '#2d72b7',
    fontWeight: 800,
    fontSize: '13px',
    lineHeight: 1.25,
  },
  bars: {
    display: 'flex',
    gap: '5px',
    marginBottom: '6px',
  },
  barRed: {
    width: '26px',
    height: '6px',
    background: '#d6182d',
    borderRadius: '8px',
  },
  barLime: {
    width: '26px',
    height: '6px',
    background: '#c6ec59',
    borderRadius: '8px',
  },
  dots: {
    color: '#e51d35',
    letterSpacing: '2px',
    fontWeight: 900,
    margin: '3px 0 6px',
  },
  pillRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '4px',
    marginTop: '6px',
  },
  pill: {
    borderRadius: '4px',
    background: '#788391',
    color: '#ffffff',
    textAlign: 'center' as const,
    padding: '4px 3px',
    fontSize: '11px',
    fontWeight: 800,
  },
  pillHot: {
    borderRadius: '4px',
    background: '#ff5f46',
    color: '#ffffff',
    textAlign: 'center' as const,
    padding: '4px 3px',
    fontSize: '11px',
    fontWeight: 800,
  },
  panelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '10px',
    marginTop: '12px',
  },
  panel: {
    background: '#ffffff',
    border: '1px solid #e2e6ed',
    borderRadius: '6px',
    padding: '12px',
  },
  tabRow: {
    display: 'flex',
    gap: '6px',
    borderBottom: '1px solid #e5e8ee',
    padding: '8px 8px 0',
    background: '#ffffff',
  },
  tab: {
    border: '1px solid #dce1e8',
    borderBottom: '0',
    borderRadius: '6px 6px 0 0',
    background: '#f7f8fa',
    padding: '8px 11px',
    fontSize: '13px',
    fontWeight: 800,
  },
  activeTab: {
    border: '1px solid #dce1e8',
    borderBottom: '0',
    borderRadius: '6px 6px 0 0',
    background: '#ffffff',
    padding: '8px 11px',
    fontSize: '13px',
    fontWeight: 800,
    color: '#0e7450',
  },
  workspaceBody: {
    padding: '12px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
    gap: '12px',
  },
  sectionList: {
    display: 'grid',
    gap: '8px',
  },
  sectionItem: {
    display: 'grid',
    gridTemplateColumns: '150px minmax(0, 1fr)',
    gap: '8px',
    border: '1px solid #e6e9ef',
    borderRadius: '5px',
    padding: '8px',
    background: '#ffffff',
  },
  rail: {
    background: '#ffffff',
    border: '1px solid #e2e6ed',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  railHeader: {
    padding: '12px',
    borderBottom: '1px solid #e5e8ee',
    background: '#ffffff',
  },
  railTool: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #edf0f4',
    padding: '10px 12px',
  },
  statusOk: {
    color: '#0d8057',
    fontWeight: 800,
  },
  statusWarn: {
    color: '#b66f00',
    fontWeight: 800,
  },
  statusBlock: {
    color: '#c9362b',
    fontWeight: 800,
  },
  gate: {
    margin: '12px',
    border: '1px solid #f0c44c',
    background: '#fff8df',
    borderRadius: '6px',
    padding: '10px',
  },
} as const;

const renderCard = (card: (typeof leadCards)[number]) => (
  <div style={styles.card} key={card.name}>
    <div style={styles.bars}>
      <span style={styles.barRed} />
      <span style={styles.barLime} />
    </div>
    <div style={styles.cardTitle}>{card.name}</div>
    <div style={{ ...styles.small, marginTop: '4px' }}>
      <strong>Owner:</strong> {card.owner}
    </div>
    <div style={styles.dots}>....</div>
    <div style={styles.pillRow}>
      <div>
        <div style={styles.pill}>Finance</div>
        <div style={{ ...styles.small, textAlign: 'center' }}>
          {card.financeDate}
        </div>
      </div>
      <div>
        <div style={styles.pill}>Settlement</div>
        <div style={{ ...styles.small, textAlign: 'center' }}>
          {card.settlementDate}
        </div>
      </div>
      <div>
        <div style={styles.pillHot}>Stage Due</div>
        <div style={{ ...styles.small, color: '#ff5f46', textAlign: 'center' }}>
          {card.stageDueDate}
        </div>
      </div>
    </div>
  </div>
);

const renderSection = ([title, description]: string[]) => (
  <div style={styles.sectionItem} key={title}>
    <strong>{title}</strong>
    <span style={styles.small}>{description}</span>
  </div>
);

export const BrokerAppWorkspace = () => {
  return (
    <div style={styles.shell}>
      <div style={styles.topbar}>
        <div style={styles.topbarLeft}>
          <button style={styles.newButton}>+ New</button>
          <span style={styles.countText}>7 Leads</span>
          <span style={styles.countText}>$1.10M</span>
          <span style={styles.small}>BrokerApp DealDash</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input style={styles.search} value="Find Deal" readOnly />
          <button style={styles.iconButton}>F</button>
          <button style={styles.iconButton}>E</button>
          <button style={styles.iconButton}>B</button>
        </div>
      </div>

      <div style={styles.canvas}>
        <main>
          <section style={styles.boardWrap}>
            <div style={styles.boardHeader}>
              <div>
                <strong>Lead Board</strong>
                <span style={{ ...styles.small, marginLeft: '8px' }}>
                  Broker-style kanban with active stages expanded and empty
                  stages collapsed.
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={styles.iconButton}>C</button>
                <button style={styles.iconButton}>L</button>
              </div>
            </div>
            <div style={styles.board}>
              {leadStages.map((stage, index) =>
                stage.open ? (
                  <div key={stage.name} style={styles.column}>
                    <div style={styles.columnTitle}>
                      <span>
                        {stage.number} {stage.name}
                      </span>
                      <span>C</span>
                    </div>
                    <div style={styles.small}>
                      {stage.count} Records / {stage.amount}
                    </div>
                    {index === 0 && leadCards.slice(1).map(renderCard)}
                    {index === 1 && leadCards.slice(0, 1).map(renderCard)}
                    {index === 4 && leadCards.slice(2).map(renderCard)}
                  </div>
                ) : (
                  <div key={stage.name} style={styles.collapsedColumn}>
                    <strong>{stage.number}</strong>
                    <div style={styles.verticalText}>{stage.name}</div>
                    <div style={styles.verticalText}>
                      {stage.count} Records / {stage.amount}
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          <section style={{ ...styles.boardWrap, marginTop: '12px' }}>
            <div style={styles.tabRow}>
              <div style={styles.activeTab}>Overview</div>
              <div style={styles.tab}>Fact Find</div>
              <div style={styles.tab}>Strategy</div>
              <div style={styles.tab}>Lodgement</div>
              <div style={styles.tab}>Client Portal</div>
            </div>
            <div style={styles.workspaceBody}>
              <div>
                <h2 style={{ margin: '0 0 8px', fontSize: '18px' }}>
                  Deal Workspace
                </h2>
                <div style={styles.sectionList}>
                  {factFindSections.map(renderSection)}
                </div>
              </div>
              <div>
                <h2 style={{ margin: '0 0 8px', fontSize: '18px' }}>
                  Strategy and Lodgement
                </h2>
                <div style={styles.sectionList}>
                  {strategySections.map(renderSection)}
                  {lodgementSections.map(renderSection)}
                </div>
              </div>
            </div>
          </section>

          <section style={styles.panelGrid}>
            <div style={styles.panel}>
              <strong>Client Fact Find</strong>
              <p style={styles.small}>
                Conversational form intake, autosave, conditional applicants,
                desired loan features, objectives, and declarations.
              </p>
            </div>
            <div style={styles.panel}>
              <strong>KYC/CDD</strong>
              <p style={styles.small}>
                Consent, IDV events, evidence strength, AML/CTF reason codes,
                and lender-specific readiness.
              </p>
            </div>
            <div style={styles.panel}>
              <strong>Product Search</strong>
              <p style={styles.small}>
                Import AFG product matrices, filter lender products, capture
                comparison and product-fit rationale.
              </p>
            </div>
            <div style={styles.panel}>
              <strong>Serviceability</strong>
              <p style={styles.small}>
                Lender calculators, policy references, assessment status, and
                broker review before recommendation.
              </p>
            </div>
          </section>

          <section style={{ ...styles.boardWrap, marginTop: '12px' }}>
            <div style={styles.boardHeader}>
              <strong>Deal Board Stages</strong>
              <span style={styles.small}>
                Used for list, kanban, stage due warnings, bulk edit, and
                workflow triggers.
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '8px',
                padding: '12px',
              }}
            >
              {dealStages.map((stage, index) => (
                <div key={stage} style={styles.panel}>
                  <strong>
                    {index + 1}. {stage}
                  </strong>
                  <div style={styles.small}>Stage due, task gate, checklist</div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside style={styles.rail}>
          <div style={styles.railHeader}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Right Rail</h2>
            <div style={styles.small}>
              Deal actions, templates, key dates, reports, and workflow gates.
            </div>
          </div>

          {rightRailTools.map((tool) => (
            <div key={tool} style={styles.railTool}>
              <strong>{tool}</strong>
              <span style={styles.small}>Open</span>
            </div>
          ))}

          <div style={styles.gate}>
            <strong>Submission gate</strong>
            <div style={{ ...styles.small, marginTop: '6px' }}>
              Blocks lodgement until fact-find, CDD/KYC, serviceability,
              product comparison, compliance acknowledgements, and credit
              proposal are ready.
            </div>
          </div>

          <div style={{ padding: '0 12px 12px' }}>
            <h3 style={{ margin: '8px 0', fontSize: '15px' }}>Checklist</h3>
            {checklistItems.map(([item, status]) => (
              <div key={item} style={styles.railTool}>
                <span>{item}</span>
                <span
                  style={
                    status === 'Ready'
                      ? styles.statusOk
                      : status === 'Blocked'
                        ? styles.statusBlock
                        : styles.statusWarn
                  }
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default defineFrontComponent({
  universalIdentifier: BROKERAPP_DEALDASH_FRONT_COMPONENT_ID,
  name: 'BrokerApp DealDash',
  description:
    'Broker-facing workspace for boards, fact-find, strategy, lodgement, checklists, KYC, and client portal tasks.',
  component: BrokerAppWorkspace,
});

import { defineFrontComponent } from 'twenty-sdk/define';

const leadStages = [
  { name: '1. New Lead', count: 5, amount: '$0.56M', open: true },
  { name: '2. Attempted Contact 1', count: 1, amount: '$0.53M', open: true },
  { name: '3. Attempted Contact 2', count: 0, amount: '$0.00M', open: false },
  { name: '4. Attempted Contact 3', count: 0, amount: '$0.00M', open: false },
  { name: '5. Initial Call Held > Get Docs', count: 1, amount: '$0.00M', open: true },
  { name: '6. Docs Requested', count: 0, amount: '$0.00M', open: false },
  { name: '7. Research > Servicing', count: 0, amount: '$0.00M', open: false },
  { name: '8. Prepare Loan Proposal', count: 0, amount: '$0.00M', open: false },
  { name: '9. Loan Proposal Presented', count: 0, amount: '$0.00M', open: false },
  { name: '10. Client Accepted > Handover', count: 0, amount: '$0.00M', open: false },
  { name: '11. On Hold', count: 0, amount: '$0.00M', open: false },
  { name: '12. Lost Opps', count: 0, amount: '$0.00M', open: false },
];

const factFindSections = [
  'Goals',
  'Applicants',
  'Dependants',
  'Employment',
  'Income',
  'Assets',
  'Liabilities',
  'Living Expenses',
  'Other Income',
  'Financial Security',
];

const strategyTools = [
  'Interview Guide',
  'Security',
  'Funding Position',
  'Serviceability',
  'Product Search',
  'Credit Proposal',
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

const styles = {
  page: {
    minHeight: '100%',
    background: '#f6f7f9',
    color: '#22252a',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '12px',
  },
  button: {
    border: '1px solid #d5d8df',
    background: '#ffffff',
    borderRadius: '6px',
    padding: '8px 12px',
    fontWeight: 600,
  },
  primaryButton: {
    border: '1px solid #1a8f61',
    background: '#1f9d68',
    color: '#ffffff',
    borderRadius: '6px',
    padding: '8px 12px',
    fontWeight: 700,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 320px',
    gap: '12px',
  },
  band: {
    background: '#ffffff',
    border: '1px solid #e1e4ea',
    borderRadius: '8px',
    padding: '12px',
  },
  board: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto' as const,
    paddingBottom: '8px',
  },
  column: {
    width: '260px',
    minWidth: '260px',
    background: '#eef0f2',
    borderRadius: '6px',
    padding: '8px',
  },
  collapsedColumn: {
    width: '44px',
    minWidth: '44px',
    height: '520px',
    background: '#eef0f2',
    borderRadius: '6px',
    padding: '8px 4px',
    writingMode: 'vertical-rl' as const,
    textOrientation: 'mixed' as const,
    fontWeight: 700,
    fontSize: '12px',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #ff6b63',
    borderRadius: '6px',
    padding: '10px',
    marginTop: '8px',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#e8eef6',
    color: '#34445a',
    borderRadius: '4px',
    padding: '3px 6px',
    fontSize: '11px',
    fontWeight: 700,
    marginRight: '4px',
    marginTop: '4px',
  },
  toolGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '8px',
  },
  tool: {
    border: '1px solid #e1e4ea',
    borderRadius: '6px',
    padding: '10px',
    background: '#ffffff',
  },
  small: {
    color: '#69707d',
    fontSize: '12px',
  },
} as const;

export const BrokerAppWorkspace = () => {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>BrokerApp DealDash</h1>
          <div style={styles.small}>
            Boards, fact-find, strategy, lodgement, KYC, checklists, and client portal tasks in one broker workspace.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={styles.button}>Column Settings</button>
          <button style={styles.button}>Bulk Edit</button>
          <button style={styles.primaryButton}>New Deal</button>
        </div>
      </div>

      <div style={styles.grid}>
        <div>
          <div style={{ ...styles.band, marginBottom: '12px' }}>
            <div style={styles.header}>
              <div>
                <strong>Lead Board</strong>
                <span style={{ ...styles.small, marginLeft: '10px' }}>
                  Collapse empty stages, expand active work, drag stages in native board views.
                </span>
              </div>
              <div style={styles.small}>Mortgage broking pipeline</div>
            </div>
            <div style={styles.board}>
              {leadStages.map((stage) =>
                stage.open ? (
                  <div key={stage.name} style={styles.column}>
                    <strong>{stage.name}</strong>
                    <div style={styles.small}>
                      {stage.count} Records / {stage.amount}
                    </div>
                    <div style={styles.card}>
                      <div style={{ fontWeight: 700, color: '#2f6fb0' }}>
                        Home loan refinance
                      </div>
                      <div style={styles.small}>Owner: Broker</div>
                      <span style={styles.pill}>Finance</span>
                      <span style={styles.pill}>Settlement</span>
                      <span style={{ ...styles.pill, background: '#ff6347', color: '#ffffff' }}>
                        Stage Due
                      </span>
                    </div>
                  </div>
                ) : (
                  <div key={stage.name} style={styles.collapsedColumn}>
                    {stage.name} ({stage.count})
                  </div>
                ),
              )}
            </div>
          </div>

          <div style={{ ...styles.band, marginBottom: '12px' }}>
            <h2 style={{ marginTop: 0, fontSize: '18px' }}>Deal Workspace</h2>
            <div style={styles.toolGrid}>
              <div style={styles.tool}>
                <strong>Overview</strong>
                <div style={styles.small}>DealDash, Team, Lender, Related Parties</div>
              </div>
              <div style={styles.tool}>
                <strong>Fact Find</strong>
                <div style={styles.small}>{factFindSections.join(', ')}</div>
              </div>
              <div style={styles.tool}>
                <strong>Strategy</strong>
                <div style={styles.small}>{strategyTools.join(', ')}</div>
              </div>
              <div style={styles.tool}>
                <strong>Lodgement</strong>
                <div style={styles.small}>Lodgement funding, credit proposal, ApplyOnline / AFG Flex submission readiness</div>
              </div>
            </div>
          </div>

          <div style={styles.band}>
            <h2 style={{ marginTop: 0, fontSize: '18px' }}>Client Portal Flow</h2>
            <div style={styles.toolGrid}>
              <div style={styles.tool}>Credit guide and privacy consent</div>
              <div style={styles.tool}>Conversational fact-find up to four applicants</div>
              <div style={styles.tool}>KYC/CDD, ID verification, consent records</div>
              <div style={styles.tool}>Document requests and open banking tasks</div>
            </div>
          </div>
        </div>

        <aside style={styles.band}>
          <h2 style={{ marginTop: 0, fontSize: '18px' }}>Right Rail</h2>
          {rightRailTools.map((tool) => (
            <div key={tool} style={{ ...styles.tool, marginBottom: '8px' }}>
              <strong>{tool}</strong>
              <div style={styles.small}>Deal-level actions and history</div>
            </div>
          ))}
          <div style={{ ...styles.tool, borderColor: '#f2c94c', background: '#fff9e8' }}>
            <strong>Submission gate</strong>
            <div style={styles.small}>
              Blocks lodgement until CDD, fact-find, serviceability, product rationale, and credit proposal are ready.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default defineFrontComponent({
  universalIdentifier: '6b6d0000-4100-4000-8000-000000000001',
  name: 'BrokerApp DealDash',
  description:
    'Broker-facing workspace for boards, fact-find, strategy, lodgement, checklists, KYC, and client portal tasks.',
  component: BrokerAppWorkspace,
  command: {
    universalIdentifier: '6b6d0000-4100-4000-8000-000000000002',
    label: 'Open BrokerApp DealDash',
    icon: 'IconHomeDollar',
    isPinned: true,
  },
});

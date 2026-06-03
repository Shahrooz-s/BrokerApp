<template>
  <MainLayout :scrollable="false" no-padding>
    <div class="brokerapp">
      <div class="brokerapp-switcher">
        <div>
          <p class="brokerapp-eyebrow">BrokerApp on Concord</p>

          <h1>Residential Loan Onboarding</h1>
        </div>

        <div class="brokerapp-switcher-actions">
          <button
            type="button"
            :class="['brokerapp-pill', mode === 'board' ? 'is-active' : '']"
            @click="mode = 'board'"
          >
            Boards
          </button>

          <button
            type="button"
            :class="['brokerapp-pill', mode === 'workspace' ? 'is-active' : '']"
            @click="mode = 'workspace'"
          >
            Loan Workspace
          </button>
        </div>
      </div>

      <section v-if="mode === 'board'" class="loan-board-page">
        <div class="loan-board-toolbar">
          <label class="loan-search">
            <Icon icon="MagnifyingGlassSolid" />

            <input
              v-model="boardSearch"
              placeholder="Find loan"
              type="search"
            />
          </label>

          <button class="toolbar-button" type="button">
            <Icon icon="Filter" />
            Filters
          </button>

          <button class="toolbar-button" type="button" @click="expandAllStages">
            <Icon icon="Eye" />
            Expand all
          </button>

          <button
            class="toolbar-button"
            type="button"
            @click="collapseEmptyStages"
          >
            <Icon icon="ViewColumns" />
            Collapse empty
          </button>

          <button
            class="toolbar-button"
            type="button"
            @click="expandStagesOneToFour"
          >
            <Icon icon="ArrowsPointingOut" />
            Stages 1 - 4
          </button>

          <button
            type="button"
            :class="['toolbar-button', boardView === 'list' ? 'is-active' : '']"
            @click="boardView = boardView === 'board' ? 'list' : 'board'"
          >
            <Icon
              :icon="boardView === 'board' ? 'ListBullet' : 'ViewColumns'"
            />
            {{ boardView === 'board' ? 'List' : 'Board' }}
          </button>
        </div>

        <div v-if="boardView === 'board'" class="loan-board">
          <article
            v-for="stage in filteredBoardStages"
            :key="stage.id"
            :class="['loan-stage', stage.collapsed ? 'is-collapsed' : '']"
            @click="stage.collapsed ? toggleStage(stage.number) : null"
          >
            <header class="loan-stage-header">
              <div>
                <h2>
                  <span>{{ stage.number }}.</span>

                  <template v-if="!stage.collapsed">
                    {{ stage.name }}
                  </template>
                </h2>

                <p v-if="!stage.collapsed">
                  ({{ stage.cards.length }} Records / {{ stage.total }})
                </p>
              </div>

              <button
                v-if="!stage.collapsed"
                class="stage-collapse-button"
                type="button"
                @click.stop="toggleStage(stage.number)"
              >
                <Icon icon="ChevronLeftSolid" />
              </button>
            </header>

            <div v-if="stage.collapsed" class="collapsed-stage-label">
              <strong>{{ stage.name }}</strong>

              <span
                >({{ stage.cards.length }} Records / {{ stage.total }})</span
              >
            </div>

            <div v-else class="loan-card-list">
              <button
                v-for="card in stage.cards"
                :key="card.id"
                class="loan-card"
                type="button"
                @click.stop="openQuickView(card)"
              >
                <div class="loan-card-top">
                  <span class="lender-mark">{{ card.logo }}</span>

                  <span class="loan-card-title">{{ card.name }}</span>

                  <Icon icon="EllipsisHorizontalSolid" />
                </div>

                <p><strong>Owner:</strong> {{ card.owner }}</p>

                <div class="warning-dots">
                  <span v-for="dot in 4" :key="dot" />
                </div>

                <div class="loan-card-dates">
                  <span>Finance<br />{{ card.financeDate }}</span>

                  <span>Settlement<br />{{ card.settlementDate }}</span>

                  <span class="danger"
                    >Stage Due<br />{{ card.stageDueDate }}</span
                  >
                </div>
              </button>
            </div>
          </article>
        </div>

        <div v-else class="loan-list-view">
          <table>
            <thead>
              <tr>
                <th>Loan</th>

                <th>Stage</th>

                <th>Owner</th>

                <th>Finance</th>

                <th>Settlement</th>

                <th>Stage Due</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="card in filteredCards"
                :key="card.id"
                @click="openQuickView(card)"
              >
                <td>{{ card.name }}</td>

                <td>{{ stageLabel(card.stageNumber) }}</td>

                <td>{{ card.owner }}</td>

                <td>{{ card.financeDate }}</td>

                <td>{{ card.settlementDate }}</td>

                <td>{{ card.stageDueDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-else class="loan-workspace">
        <div class="loan-alert">
          <Icon icon="ExclamationTriangle" />
          Credit Guide & Privacy Consent is required
          <button type="button">Not Required</button>

          <button class="primary" type="button">Get Started</button>
        </div>

        <header class="loan-topbar">
          <div class="loan-title-area">
            <button class="icon-button" type="button" @click="mode = 'board'">
              <Icon icon="ArrowLeft" />
            </button>

            <div>
              <h2>{{ sampleLoan.title }}</h2>

              <p>{{ sampleLoan.owner }}</p>
            </div>
          </div>

          <div class="loan-topbar-actions">
            <button class="icon-button" type="button">
              <Icon icon="Tag" />
            </button>

            <select v-model.number="workspaceStageNumber">
              <option
                v-for="stage in dealStages"
                :key="stage.id"
                :value="stage.number"
              >
                {{ stage.number }}. {{ stage.name }}
              </option>
            </select>

            <button class="toolbar-button" type="button">
              <Icon icon="Refresh" />
              Sync
            </button>

            <button class="icon-button" type="button">
              <Icon icon="Link" />
            </button>

            <button class="icon-button" type="button">
              <Icon icon="EllipsisVerticalSolid" />
            </button>
          </div>
        </header>

        <div class="loan-workspace-body">
          <aside class="loan-sidebar">
            <nav>
              <section
                v-for="group in loanNavigationGroups"
                :key="group.group"
                class="loan-nav-group"
              >
                <h3>
                  {{ group.group }}
                  <span v-if="group.badge">{{ group.badge }}</span>
                </h3>

                <button
                  v-for="item in group.items"
                  :key="item"
                  type="button"
                  :class="[
                    'loan-nav-item',
                    activePage === item ? 'is-active' : '',
                  ]"
                  @click="activePage = item"
                >
                  <span class="loan-nav-dot" />
                  {{ item }}
                </button>
              </section>
            </nav>
          </aside>

          <main class="loan-page">
            <div class="loan-page-header">
              <div>
                <p class="brokerapp-eyebrow">{{ activeGroupLabel }}</p>

                <h2>{{ activePage }}</h2>
              </div>

              <div class="autosave-state">
                <Icon icon="CheckCircleSolid" />
                Auto saved 10 minutes ago
              </div>
            </div>

            <LoanDashPage
              v-if="activePage === 'LoanDash'"
              :sample-loan="sampleLoan"
              :checklist-items="checklistItems"
            />

            <TeamPage v-else-if="activePage === 'Team'" />

            <LenderPage v-else-if="activePage === 'Lender'" />

            <LivingExpensesPage
              v-else-if="activePage === 'Living Expenses'"
              :categories="livingExpenseCategories"
            />

            <GenericLoanPage
              v-else
              :page-name="activePage"
              :page-config="activePageConfig"
              :applicants="sampleLoan.applicants"
            />
          </main>

          <aside class="right-rail">
            <button
              v-for="tool in rightRailTools"
              :key="tool.id"
              type="button"
              :class="[
                'rail-tool',
                activeRightTool === tool.id ? 'is-active' : '',
              ]"
              @click="activeRightTool = tool.id"
            >
              <span v-if="tool.badge" class="rail-badge">{{ tool.badge }}</span>

              <Icon :icon="tool.icon" />

              <span>{{ tool.label }}</span>
            </button>
          </aside>

          <aside class="tool-drawer">
            <ToolDrawer
              :active-tool="activeRightTool"
              :right-rail-tools="rightRailTools"
              :checklist-items="checklistItems"
              :key-dates="keyDates"
              :report-templates="reportTemplates"
              :workflow-templates="workflowTemplates"
              @set-tool="activeRightTool = $event"
            />
          </aside>
        </div>
      </section>

      <aside v-if="quickViewOpen" class="quick-view">
        <div class="quick-view-panel">
          <header>
            <button
              class="primary-action"
              type="button"
              @click="mode = 'workspace'"
            >
              View Full Loan
            </button>

            <button
              class="close-button"
              type="button"
              @click="quickViewOpen = false"
            >
              <Icon icon="XSolid" />
            </button>
          </header>

          <section class="quick-view-summary">
            <div>
              <h2>{{ selectedCard.name }}</h2>

              <p>{{ selectedCard.owner }}</p>

              <p><strong>ID:</strong> {{ sampleLoan.id }}</p>

              <p>{{ sampleLoan.lender }}</p>
            </div>

            <div class="quick-tags">
              <span>Finance<br />{{ selectedCard.financeDate }}</span>

              <span>Settlement<br />{{ selectedCard.settlementDate }}</span>

              <span class="green"
                >Stage Due<br />{{ selectedCard.stageDueDate }}</span
              >
            </div>
          </section>

          <label class="stage-select">
            <select v-model.number="selectedCard.stageNumber">
              <option
                v-for="stage in dealStages"
                :key="stage.id"
                :value="stage.number"
              >
                {{ stage.number }} {{ stage.name }}
              </option>
            </select>

            <span>Current status</span>
          </label>

          <div class="quick-tabs">
            <button
              v-for="tab in quickTabs"
              :key="tab"
              type="button"
              :class="activeQuickTab === tab ? 'is-active' : ''"
              @click="activeQuickTab = tab"
            >
              {{ tab }}
            </button>
          </div>

          <QuickTabPanel
            :active-tab="activeQuickTab"
            :sample-loan="sampleLoan"
          />
        </div>
      </aside>
    </div>
  </MainLayout>
</template>

<script setup>
import { computed, defineComponent, h, reactive, ref } from 'vue'

import {
  checklistItems,
  dealStages,
  genericPageFallback,
  keyDates,
  livingExpenseCategories,
  loanNavigationGroups,
  pageCatalog,
  reportTemplates,
  rightRailTools,
  sampleLoan,
  workflowTemplates,
} from '../config/loanWorkspaceConfig'

const urlParams = new URLSearchParams(window.location.search)
const mode = ref(urlParams.get('view') === 'workspace' ? 'workspace' : 'board')
const boardSearch = ref('')
const boardView = ref('board')
const expandedStageNumbers = ref(new Set([1, 2, 16, 17]))
const activePage = ref('LoanDash')
const activeRightTool = ref('workflows')
const workspaceStageNumber = ref(sampleLoan.stageNumber)
const quickViewOpen = ref(false)
const selectedCard = ref(null)
const activeQuickTab = ref('Note')

const quickTabs = [
  'Note',
  'Task',
  'Email',
  'SMS',
  'Interview Guide',
  'Products',
]

const cards = ref([
  {
    id: 'deal-shahrooz',
    logo: 'A',
    name: 'Shahrooz',
    owner: 'Shahrooz Safanejad',
    stageNumber: 1,
    financeDate: '-',
    settlementDate: '-',
    stageDueDate: '07/05/2026',
    amount: '$0.00',
  },
  {
    id: 'deal-khanizadeh',
    logo: 'ANZ',
    name: 'Khanizadeh - First Home...',
    owner: 'Shahrooz Safanejad',
    stageNumber: 2,
    financeDate: '-',
    settlementDate: '-',
    stageDueDate: '15/04/2026',
    amount: '$0.90M',
  },
  {
    id: 'deal-maria-cabardo',
    logo: 'HL',
    name: 'Maria Rosharie Cabardo ...',
    owner: 'Shahrooz Safanejad',
    stageNumber: 16,
    financeDate: '-',
    settlementDate: '23/06/2025',
    stageDueDate: '23/06/2025',
    amount: '$0.60M',
  },
  {
    id: 'deal-borna-masoudi',
    logo: 'NAB',
    name: 'Borna Masoudi',
    owner: 'Shahrooz Safanejad',
    stageNumber: 16,
    financeDate: '13/03/2025',
    settlementDate: '11/04/2025',
    stageDueDate: '11/04/2025',
    amount: '$0.59M',
  },
  {
    id: 'deal-zahra-sarab',
    logo: 'GB',
    name: 'Zahra Dadollahi Sarab',
    owner: 'Shahrooz Safanejad',
    stageNumber: 17,
    financeDate: '01/11/2025',
    settlementDate: '19/12/2025',
    stageDueDate: '17/12/2025',
    amount: '$1.30M',
  },
])

const filteredCards = computed(() => {
  const query = boardSearch.value.trim().toLowerCase()

  if (!query) {
    return cards.value
  }

  return cards.value.filter(card =>
    [card.name, card.owner, stageLabel(card.stageNumber)]
      .join(' ')
      .toLowerCase()
      .includes(query)
  )
})

const filteredBoardStages = computed(() =>
  dealStages.map(stage => {
    const stageCards = filteredCards.value.filter(
      card => card.stageNumber === stage.number
    )

    const total = stageCards.length
      ? stageCards
          .map(card => Number(card.amount.replace(/[^0-9.]/g, '')) || 0)
          .reduce((sum, value) => sum + value, 0)
      : 0

    return {
      ...stage,
      cards: stageCards,
      total: total ? `$${total.toFixed(2)}M` : '$0.00M',
      collapsed:
        stageCards.length === 0 &&
        !expandedStageNumbers.value.has(stage.number),
    }
  })
)

const activePageConfig = computed(
  () => pageCatalog[activePage.value] || genericPageFallback(activePage.value)
)

const activeGroupLabel = computed(() => {
  const group = loanNavigationGroups.find(group =>
    group.items.includes(activePage.value)
  )

  return group?.group || 'Loan'
})

function stageLabel(stageNumber) {
  const stage = dealStages.find(stage => stage.number === Number(stageNumber))

  return stage ? `${stage.number}. ${stage.name}` : 'Unassigned'
}

function replaceExpandedStages(nextStages) {
  expandedStageNumbers.value = new Set(nextStages)
}

function toggleStage(stageNumber) {
  const nextStages = new Set(expandedStageNumbers.value)

  if (nextStages.has(stageNumber)) {
    nextStages.delete(stageNumber)
  } else {
    nextStages.add(stageNumber)
  }

  replaceExpandedStages(nextStages)
}

function expandAllStages() {
  replaceExpandedStages(dealStages.map(stage => stage.number))
}

function collapseEmptyStages() {
  const populatedStages = cards.value.map(card => card.stageNumber)

  replaceExpandedStages(populatedStages)
}

function expandStagesOneToFour() {
  const populatedStages = cards.value.map(card => card.stageNumber)

  replaceExpandedStages([...new Set([1, 2, 3, 4, ...populatedStages])])
}

function openQuickView(card) {
  selectedCard.value = card
  activeQuickTab.value = 'Note'
  quickViewOpen.value = true
}

const FieldRenderer = defineComponent({
  props: {
    field: { type: Object, required: true },
  },

  setup(props) {
    const value = ref('')

    return () =>
      h('label', { class: 'form-field' }, [
        h('span', props.field.label),
        props.field.type === 'textarea'
          ? h('textarea', {
              placeholder: 'Type something...',
              rows: 3,
              value: value.value,
              onInput: event => (value.value = event.target.value),
            })
          : props.field.type === 'checkbox'
            ? h('input', {
                type: 'checkbox',
                checked: Boolean(value.value),
                onChange: event => (value.value = event.target.checked),
              })
            : props.field.options?.length
              ? h(
                  'select',
                  {
                    value: value.value,
                    onChange: event => (value.value = event.target.value),
                  },
                  [
                    h('option', { value: '' }, 'Select'),
                    ...props.field.options.map(option =>
                      h('option', { value: option }, option)
                    ),
                  ]
                )
              : props.field.type === 'status'
                ? h('strong', { class: 'status-pill blocked' }, 'Not recorded')
                : props.field.type === 'table'
                  ? h('div', { class: 'mini-table' }, [
                      h('span', 'Configured by workflow templates'),
                    ])
                  : h('input', {
                      type: props.field.type === 'date' ? 'date' : 'text',
                      placeholder:
                        props.field.type === 'money'
                          ? '$ Enter Amount'
                          : 'Enter value',
                      value: value.value,
                      onInput: event => (value.value = event.target.value),
                    }),
        props.field.help ? h('small', props.field.help) : null,
      ])
  },
})

const LoanDashPage = defineComponent({
  props: {
    sampleLoan: { type: Object, required: true },
    checklistItems: { type: Array, required: true },
  },

  setup(props) {
    return () =>
      h('div', { class: 'loandash-grid' }, [
        h('section', { class: 'dashboard-panel deal-snapshot' }, [
          h('header', [
            h('h3', 'Deal'),
            h('span', `ID: ${props.sampleLoan.id}`),
          ]),
          h('p', 'Loan Amount'),
          h('strong', props.sampleLoan.amount),
          h('div', { class: 'date-strip' }, [
            h('span', `Stage Due ${props.sampleLoan.stageDueDate}`),
            h('span', `Finance ${props.sampleLoan.financeDate}`),
            h('span', `Settlement ${props.sampleLoan.settlementDate}`),
          ]),
        ]),
        h('section', { class: 'dashboard-panel' }, [
          h('header', [h('h3', 'FinanceVault'), h('span', 'Draft')]),
          h('p', `Status: ${props.sampleLoan.portalStatus}`),
          h('p', `Due Date: ${props.sampleLoan.portalDueDate}`),
          h('div', { class: 'portal-status' }, [
            h('span', '0 Approved'),
            h('span', '0 Pending'),
            h('span', '0 Rejected'),
          ]),
        ]),
        h('section', { class: 'dashboard-panel stage-due-card' }, [
          h('header', [h('h3', 'Stage Due')]),
          h('strong', 'May 7'),
          h('span', 'Thursday'),
        ]),
        h('section', { class: 'dashboard-panel activity-panel' }, [
          h('header', [h('h3', 'Recent Activity'), h('span', '8')]),
          [
            '01. Outstanding Supporting Docs (SMS only)',
            '01. Outstanding Supporting Docs',
            'Loan Event',
          ].map(item =>
            h('article', { class: 'activity-row' }, [
              h('span', 'Workflow'),
              h('strong', item),
              h(
                'div',
                { class: 'progress-bar' },
                h('i', { style: 'width: 50%' })
              ),
            ])
          ),
        ]),
        h('section', { class: 'dashboard-panel applicants-panel' }, [
          h('header', [h('h3', 'Applicants')]),
          h(
            'div',
            { class: 'applicant-grid' },
            props.sampleLoan.applicants.map(applicant =>
              h('article', [
                h('span', applicant.role),
                h('strong', applicant.name),
                h('p', applicant.phone),
                h('p', applicant.email),
                h('small', `Equifax Credit Report: ${applicant.creditReport}`),
              ])
            )
          ),
        ]),
        h('section', { class: 'dashboard-panel' }, [
          h('header', [h('h3', 'Credit Guide & Privacy Consent')]),
          props.sampleLoan.applicants.map(applicant =>
            h('p', { class: 'consent-row' }, [
              h('span', applicant.name),
              h('strong', applicant.consent),
            ])
          ),
        ]),
        h('section', { class: 'dashboard-panel' }, [
          h('header', [h('h3', 'Team')]),
          h('strong', 'Shahrooz Safanejad'),
          h('p', 'Loan Processor'),
        ]),
        h('section', { class: 'dashboard-panel' }, [
          h('header', [h('h3', 'Lender'), h('span', 'Ref: -')]),
          h('strong', props.sampleLoan.lender),
          h('p', `Broker Code: ${props.sampleLoan.brokerCode}`),
        ]),
        h('section', { class: 'dashboard-panel pending-panel' }, [
          h('header', [h('h3', 'Pending')]),
          h('strong', '1'),
          h('span', 'Task'),
        ]),
      ])
  },
})

const TeamPage = defineComponent({
  setup() {
    const activeTab = ref('Broker')
    const tabs = ['Broker', 'Team Roles', 'Assigned Team']

    const sections = [
      'Broker Details',
      'Contact Details',
      'Email and Report Preferences',
      'Brands',
      'Addresses',
      'Review Links',
      'Scheduled Client Reviews',
      'Fixed Rate Expiry Reviews',
      'Interest-Only Expiry Reviews',
      'Client Birthday Reviews',
    ]

    return () =>
      h('div', { class: 'form-page' }, [
        h(
          'div',
          { class: 'tab-strip' },
          tabs.map(tab =>
            h(
              'button',
              {
                class: activeTab.value === tab ? 'is-active' : '',
                onClick: () => (activeTab.value = tab),
              },
              tab
            )
          )
        ),
        h('section', { class: 'form-section is-open' }, [
          h('header', [
            h(
              'h3',
              activeTab.value === 'Broker' ? 'Broker Details' : activeTab.value
            ),
          ]),
          h('div', { class: 'form-grid' }, [
            h(FieldRenderer, {
              field: {
                label: '* Broker',
                options: ['Shahrooz Safanejad (shahrooz@lendaloan.com.au)'],
              },
            }),
            h(FieldRenderer, {
              field: {
                label: '* Lender',
                options: ['Other', 'ANZ', 'NAB', 'Westpac', 'CBA'],
              },
            }),
            h(FieldRenderer, {
              field: {
                label: '* Default Broker Brand',
                options: ['LEND A LOAN (Shahrooz Safanejad)'],
              },
            }),
            h(
              'button',
              { class: 'primary-action', type: 'button' },
              'Set Broker'
            ),
          ]),
        ]),
        sections
          .slice(1)
          .map(section =>
            h('section', { class: 'accordion-row' }, [
              h('strong', section),
              h('span', '>'),
            ])
          ),
      ])
  },
})

const LenderPage = defineComponent({
  setup() {
    const activeTab = ref('Lender')
    const tabs = ['Lender', 'Lender BDM', 'Outgoing Lender']

    const accordions = [
      'Lender Notes',
      'Lender Contact Details',
      'Assessor Details',
      'Lender BDM',
      'Lender Legal',
      'Linked Branch Details',
      'Post Settlement Details',
      'Business Banker Details',
      'Web Tracking',
      'Policy Details',
      'Construction',
      'Valuations',
      'Variations',
      'Pricing',
      'Insurance',
      'Mortgage Documents Return Address',
      'First Home Owners Grant',
      'Discharges',
      'Reports',
    ]

    return () =>
      h('div', { class: 'form-page' }, [
        h(
          'div',
          { class: 'tab-strip' },
          tabs.map(tab =>
            h(
              'button',
              {
                class: activeTab.value === tab ? 'is-active' : '',
                onClick: () => (activeTab.value = tab),
              },
              tab
            )
          )
        ),
        activeTab.value === 'Lender'
          ? h('section', { class: 'form-section is-open' }, [
              h('header', [h('h3', 'Lender')]),
              h('div', { class: 'form-grid' }, [
                h(FieldRenderer, {
                  field: {
                    label: 'Lender Name',
                    options: [
                      'Other',
                      'Society One',
                      'St George',
                      'Suncorp',
                      'Teachers Mutual Bank',
                      'uBank',
                      'UniBank',
                      'Westpac',
                      'Wisr',
                    ],
                  },
                }),
                h(FieldRenderer, { field: { label: 'Broker Code' } }),
                h(FieldRenderer, { field: { label: 'Lender Reference' } }),
                h(FieldRenderer, {
                  field: {
                    label: 'Authority to Debit Available',
                    type: 'checkbox',
                  },
                }),
              ]),
            ])
          : activeTab.value === 'Lender BDM'
            ? h('section', { class: 'form-section is-open' }, [
                h('header', [h('h3', 'Lender Details')]),
                h('div', { class: 'form-grid' }, [
                  h(FieldRenderer, { field: { label: 'Name' } }),
                  h(FieldRenderer, { field: { label: 'Phone' } }),
                  h(FieldRenderer, { field: { label: 'Email' } }),
                ]),
              ])
            : h('section', { class: 'form-section is-open info-box' }, [
                h(
                  'p',
                  'Ensure to add a default security in the Loan Structure section prior to setting up outgoing lender.'
                ),
              ]),
        accordions.map(section =>
          h('section', { class: 'accordion-row' }, [
            h('strong', section),
            h('span', '>'),
          ])
        ),
      ])
  },
})

const LivingExpensesPage = defineComponent({
  props: {
    categories: { type: Array, required: true },
  },

  setup(props) {
    const expanded = ref(
      new Set(['groceries', 'clothing-personal-care', 'education', 'insurance'])
    )

    const comments = reactive({})

    function toggle(id) {
      const next = new Set(expanded.value)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      expanded.value = next
    }

    return () =>
      h('div', { class: 'living-expenses-page' }, [
        h('div', { class: 'broker-view-notice' }, [
          h('strong', 'Welcome to the Broker View of the Fact Find'),
          h(
            'p',
            'This is a broker-side compact view of the client fact find. Use the lock feature before client edits are enabled.'
          ),
        ]),
        h('section', { class: 'household-summary' }, [
          h('strong', "Shahrooz Safanejad's Household"),
          h('p', 'Monthly Living Expenses'),
          h('h3', '$0.00'),
        ]),
        props.categories.map(category =>
          h('section', { class: ['expense-category', category.status] }, [
            h(
              'button',
              {
                class: 'expense-header',
                type: 'button',
                onClick: () => toggle(category.id),
              },
              [h('strong', category.title), h('span', '$0.00 per month')]
            ),
            expanded.value.has(category.id)
              ? h('div', { class: 'expense-body' }, [
                  ...category.fields.map(label =>
                    h('div', { class: 'expense-row' }, [
                      h(FieldRenderer, { field: { label, type: 'money' } }),
                      h(FieldRenderer, {
                        field: {
                          label: 'Frequency',
                          options: [
                            'Weekly',
                            'Fortnightly',
                            'Monthly',
                            'Quarterly',
                            'Annual',
                          ],
                        },
                      }),
                    ])
                  ),
                  h('label', { class: 'form-field full-width' }, [
                    h('span', 'Comments'),
                    h('textarea', {
                      rows: 2,
                      placeholder: 'Type something...',
                      value: comments[category.id] || '',
                      onInput: event =>
                        (comments[category.id] = event.target.value),
                    }),
                    category.zeroCommentRequired && !comments[category.id]
                      ? h(
                          'small',
                          { class: 'validation-error' },
                          `If your ${category.title.toLowerCase()} expenses are $0, please add a comment explaining why.`
                        )
                      : null,
                  ]),
                ])
              : null,
          ])
        ),
      ])
  },
})

const GenericLoanPage = defineComponent({
  props: {
    pageName: { type: String, required: true },
    pageConfig: { type: Object, required: true },
    applicants: { type: Array, required: true },
  },

  setup(props) {
    const applicantTab = ref(props.applicants[0]?.id)

    return () =>
      h('div', { class: 'form-page' }, [
        h('p', { class: 'page-intro' }, props.pageConfig.intro),
        ['Applicants', 'Assets', 'Other Income', 'Liabilities'].includes(
          props.pageName
        )
          ? h(
              'div',
              { class: 'tab-strip' },
              props.applicants.map(applicant =>
                h(
                  'button',
                  {
                    class:
                      applicantTab.value === applicant.id ? 'is-active' : '',
                    onClick: () => (applicantTab.value = applicant.id),
                  },
                  applicant.role
                )
              )
            )
          : null,
        props.pageConfig.sections.map(section =>
          h('section', { class: 'form-section is-open' }, [
            h('header', [
              h('div', [
                h('h3', section.title),
                h('p', section.description || ''),
              ]),
              h('span', 'v'),
            ]),
            h(
              'div',
              { class: 'form-grid' },
              section.fields.map(field => h(FieldRenderer, { field }))
            ),
            section.actions?.length
              ? h(
                  'div',
                  { class: 'section-actions' },
                  section.actions.map(action =>
                    h(
                      'button',
                      { class: 'toolbar-button', type: 'button' },
                      action
                    )
                  )
                )
              : null,
          ])
        ),
      ])
  },
})

const ToolDrawer = defineComponent({
  props: {
    activeTool: { type: String, required: true },
    rightRailTools: { type: Array, required: true },
    checklistItems: { type: Array, required: true },
    keyDates: { type: Array, required: true },
    reportTemplates: { type: Array, required: true },
    workflowTemplates: { type: Array, required: true },
  },

  emits: ['setTool'],
  setup(props, { emit }) {
    const title = computed(
      () =>
        props.rightRailTools.find(tool => tool.id === props.activeTool)?.label
    )

    return () =>
      h('div', { class: 'tool-drawer-content' }, [
        h('header', [
          h('button', { class: 'icon-button', type: 'button' }, [
            h('span', '<'),
          ]),
          h('h3', title.value),
          h(
            'button',
            {
              class: 'icon-button',
              type: 'button',
              onClick: () => emit('setTool', 'workflows'),
            },
            [h('span', '+')]
          ),
        ]),
        props.activeTool === 'checklists'
          ? h(
              'div',
              { class: 'drawer-list' },
              props.checklistItems.map(item =>
                h('article', [
                  h('span', {
                    class: item[1] === 'Completed' ? 'check complete' : 'check',
                  }),
                  h('strong', item[0]),
                  h('span', '>'),
                ])
              )
            )
          : props.activeTool === 'tasks'
            ? h('div', { class: 'task-drawer' }, [
                h('p', '02 May 2026'),
                h('h4', 'Request Outstanding Documents'),
                h('div', { class: 'task-grid' }, [
                  h(FieldRenderer, {
                    field: { label: 'Due Date', type: 'date' },
                  }),
                  h(FieldRenderer, {
                    field: {
                      label: 'Assignee',
                      options: ['Shahrooz Safanejad'],
                    },
                  }),
                ]),
                h(
                  'button',
                  { class: 'toolbar-button', type: 'button' },
                  'Mark as Completed'
                ),
                h(
                  'button',
                  { class: 'toolbar-button', type: 'button' },
                  'Snooze Task'
                ),
              ])
            : props.activeTool === 'emails'
              ? h('div', { class: 'empty-tool' }, [
                  h('div', { class: 'empty-icon' }, 'Email'),
                  h('h4', "It's empty here! Let's start with an email"),
                  h(
                    'button',
                    {
                      class: 'primary-action disabled',
                      type: 'button',
                      disabled: true,
                    },
                    'Compose an Email'
                  ),
                  h(
                    'p',
                    'Provider gated: email sending stays disabled until mailbox credentials are approved.'
                  ),
                ])
              : props.activeTool === 'texts'
                ? h(
                    'div',
                    { class: 'sms-history' },
                    sampleLoan.applicants.map(applicant =>
                      h('article', [
                        h('p', [
                          'Sent to: ',
                          h('strong', `${applicant.name} (${applicant.phone})`),
                        ]),
                        h('strong', { class: 'failed' }, 'Failed to send'),
                        h(
                          'p',
                          { class: 'sms-bubble' },
                          "Hi Shahrooz and Shahrooz - just checking in on how you're going with the document request I emailed through a couple of days ago via FinanceVault."
                        ),
                        h(
                          'span',
                          { class: 'status-pill blocked' },
                          'Insufficient Credits.'
                        ),
                      ])
                    )
                  )
                : props.activeTool === 'key-dates'
                  ? h(
                      'div',
                      { class: 'key-date-list' },
                      props.keyDates.map(date =>
                        h('article', [
                          h(
                            'span',
                            {
                              class: date[2]
                                ? 'date-label active'
                                : 'date-label',
                            },
                            date[0]
                          ),
                          h('button', { type: 'button' }, date[1]),
                        ])
                      )
                    )
                  : props.activeTool === 'reports'
                    ? h(
                        'div',
                        { class: 'report-list' },
                        props.reportTemplates.map(report =>
                          h('article', [
                            h('strong', report),
                            h('button', { type: 'button' }, 'PDF'),
                            h('button', { type: 'button' }, 'Word'),
                          ])
                        )
                      )
                    : props.activeTool === 'workflows'
                      ? h(
                          'div',
                          { class: 'drawer-list workflow-list' },
                          props.workflowTemplates.map(workflow =>
                            h('article', [
                              h('span', { class: 'check' }),
                              h('strong', workflow),
                              h('button', { type: 'button' }, '*'),
                            ])
                          )
                        )
                      : h('div', { class: 'empty-tool' }, [
                          h('h4', `No ${title.value?.toLowerCase()} yet`),
                          h(
                            'button',
                            { class: 'primary-action', type: 'button' },
                            `Create a ${title.value?.slice(0, -1)}`
                          ),
                        ]),
      ])
  },
})

const QuickTabPanel = defineComponent({
  props: {
    activeTab: { type: String, required: true },
    sampleLoan: { type: Object, required: true },
  },

  setup(props) {
    return () =>
      h('div', { class: 'quick-tab-panel' }, [
        props.activeTab === 'Note'
          ? h('textarea', { rows: 4, placeholder: 'Write a note...' })
          : props.activeTab === 'Task'
            ? h('div', { class: 'quick-form' }, [
                h(FieldRenderer, {
                  field: {
                    label: 'Use Template',
                    options: [
                      'Request Outstanding Documents',
                      'Follow up applicant',
                    ],
                  },
                }),
                h(FieldRenderer, { field: { label: 'Name' } }),
                h(FieldRenderer, {
                  field: { label: 'Assignee', options: ['Shahrooz Safanejad'] },
                }),
                h(FieldRenderer, {
                  field: {
                    label: 'Priority',
                    options: ['Low', 'Medium', 'High'],
                  },
                }),
                h(FieldRenderer, {
                  field: { label: 'Due Date', type: 'date' },
                }),
                h(FieldRenderer, {
                  field: { label: 'Description', type: 'textarea' },
                }),
              ])
            : props.activeTab === 'Email'
              ? h('div', { class: 'quick-form' }, [
                  h(FieldRenderer, {
                    field: {
                      label: 'Use Template',
                      options: ['Document request', 'Follow up'],
                    },
                  }),
                  h(FieldRenderer, { field: { label: 'From' } }),
                  h(FieldRenderer, { field: { label: 'To' } }),
                  h(FieldRenderer, { field: { label: '* Subject' } }),
                  h('textarea', {
                    rows: 7,
                    placeholder: 'Write your email here',
                  }),
                  h(
                    'button',
                    {
                      class: 'primary-action disabled',
                      disabled: true,
                      type: 'button',
                    },
                    'Send disabled until email provider is connected'
                  ),
                ])
              : props.activeTab === 'SMS'
                ? h('div', { class: 'quick-form' }, [
                    h(FieldRenderer, {
                      field: {
                        label: 'To',
                        options: props.sampleLoan.applicants.map(
                          applicant => applicant.phone
                        ),
                      },
                    }),
                    h(FieldRenderer, {
                      field: { label: 'Message', type: 'textarea' },
                    }),
                    h(
                      'button',
                      {
                        class: 'primary-action disabled',
                        disabled: true,
                        type: 'button',
                      },
                      'SMS disabled until provider credits are available'
                    ),
                  ])
                : props.activeTab === 'Interview Guide'
                  ? h('div', { class: 'quick-form' }, [
                      h(FieldRenderer, {
                        field: {
                          label: 'Requirements and Objectives',
                          type: 'textarea',
                        },
                      }),
                      h(FieldRenderer, {
                        field: { label: 'BID rationale', type: 'textarea' },
                      }),
                    ])
                  : h('div', { class: 'quick-form' }, [
                      h(FieldRenderer, { field: { label: 'Lender' } }),
                      h(FieldRenderer, { field: { label: 'Product' } }),
                      h(FieldRenderer, {
                        field: { label: 'Selected', type: 'checkbox' },
                      }),
                    ]),
        h('div', { class: 'quick-detail-tabs' }, [
          h('section', [
            h('h3', 'Deal Details'),
            h('p', `Client Portal Status: ${props.sampleLoan.portalStatus}`),
            ...props.sampleLoan.applicants.map(applicant =>
              h('p', [
                h('strong', applicant.role + ': '),
                `${applicant.name} - ${applicant.email}`,
              ])
            ),
            h('p', `Team: ${props.sampleLoan.owner}`),
            h('p', `Lender: ${props.sampleLoan.lender}`),
          ]),
          h('section', [
            h('h3', 'Upcoming Activities'),
            h('p', 'Request Outstanding Documents'),
            h('p', 'Date Due: 02 May 2026'),
          ]),
        ]),
      ])
  },
})
</script>

<style scoped>
.brokerapp {
  --brokerapp-blue: #243b5f;
  --brokerapp-ink: #252a32;
  --brokerapp-border: #d8dde5;
  --brokerapp-soft: #eef2f6;
  background: #d4dce7;
  color: var(--brokerapp-ink);
  height: calc(100vh - var(--navbar-height));
  overflow: hidden;
}

.brokerapp-switcher,
.loan-board-toolbar,
.loan-topbar {
  align-items: center;
  background: #fff;
  border-bottom: 1px solid var(--brokerapp-border);
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 12px 18px;
}

.brokerapp-switcher h1,
.loan-topbar h2,
.loan-page-header h2 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
}

.brokerapp-eyebrow {
  color: #6b7280;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 2px;
  text-transform: uppercase;
}

.brokerapp-switcher-actions {
  display: flex;
  gap: 8px;
}

.brokerapp-pill,
.toolbar-button,
.icon-button,
.primary-action,
.tool-drawer button,
.quick-tabs button {
  align-items: center;
  border: 1px solid var(--brokerapp-border);
  border-radius: 6px;
  display: inline-flex;
  gap: 6px;
  min-height: 34px;
  padding: 0 12px;
}

.brokerapp-pill.is-active,
.toolbar-button.is-active,
.primary-action {
  background: var(--brokerapp-blue);
  border-color: var(--brokerapp-blue);
  color: #fff;
}

.loan-board-page {
  height: calc(100% - 69px);
  overflow: hidden;
}

.loan-search {
  align-items: center;
  border: 1px solid var(--brokerapp-border);
  border-radius: 8px;
  display: flex;
  gap: 8px;
  min-width: 280px;
  padding: 0 10px;
}

.loan-search input {
  border: 0;
  height: 40px;
  outline: none;
  width: 100%;
}

.loan-board {
  display: flex;
  gap: 8px;
  height: calc(100% - 66px);
  overflow: auto;
  padding: 8px;
}

.loan-stage {
  background: #eef0f2;
  border-radius: 6px;
  display: flex;
  flex: 0 0 316px;
  flex-direction: column;
  min-height: 100%;
}

.loan-stage.is-collapsed {
  cursor: pointer;
  flex-basis: 48px;
}

.loan-stage-header {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  padding: 12px 10px 6px;
}

.loan-stage-header h2 {
  font-size: 15px;
  font-weight: 800;
  margin: 0;
  white-space: normal;
}

.loan-stage-header p,
.collapsed-stage-label span {
  color: #616875;
  font-size: 13px;
  margin: 4px 0 0;
}

.stage-collapse-button {
  background: #222832;
  border-radius: 999px;
  color: #fff;
  height: 24px;
  width: 24px;
}

.collapsed-stage-label {
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  padding: 12px 0;
  writing-mode: vertical-rl;
}

.loan-card-list {
  display: grid;
  gap: 10px;
  padding: 8px;
}

.loan-card {
  background: #fff;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 12px;
  text-align: left;
  width: 100%;
}

.loan-card:hover {
  border-color: #ef4444;
}

.loan-card-top {
  align-items: center;
  display: flex;
  gap: 8px;
}

.lender-mark {
  align-items: center;
  display: inline-flex;
  font-weight: 800;
  height: 28px;
  justify-content: center;
  min-width: 34px;
}

.loan-card-title {
  color: #3477bd;
  flex: 1;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loan-card p {
  font-size: 13px;
  margin: 6px 0;
}

.warning-dots {
  display: flex;
  gap: 3px;
  margin: 6px 0;
}

.warning-dots span {
  background: #ff2f43;
  border-radius: 999px;
  height: 5px;
  width: 5px;
}

.loan-card-dates,
.date-strip,
.portal-status,
.quick-tags {
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.loan-card-dates span,
.date-strip span,
.portal-status span,
.quick-tags span {
  background: #858f9d;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 5px;
  text-align: center;
}

.loan-card-dates .danger,
.quick-tags .green {
  background: #28a978;
}

.loan-list-view {
  background: #fff;
  height: calc(100% - 66px);
  overflow: auto;
  padding: 12px;
}

.loan-list-view table {
  border-collapse: collapse;
  width: 100%;
}

.loan-list-view th,
.loan-list-view td {
  border-bottom: 1px solid var(--brokerapp-border);
  padding: 12px;
  text-align: left;
}

.loan-list-view tr {
  cursor: pointer;
}

.loan-workspace {
  height: calc(100% - 69px);
  overflow: hidden;
}

.loan-alert {
  align-items: center;
  background: #fff7dc;
  border-bottom: 1px solid #f3e9bd;
  display: flex;
  gap: 8px;
  height: 34px;
  padding: 0 16px;
}

.loan-alert button {
  border: 1px solid var(--brokerapp-border);
  border-radius: 4px;
  margin-left: auto;
  padding: 2px 10px;
}

.loan-alert button + button {
  margin-left: 4px;
}

.loan-alert .primary {
  background: var(--brokerapp-blue);
  color: #fff;
}

.loan-title-area,
.loan-topbar-actions {
  align-items: center;
  display: flex;
  gap: 12px;
}

.loan-title-area p {
  margin: 2px 0 0;
}

.loan-topbar select,
.stage-select select {
  border: 1px solid var(--brokerapp-border);
  border-radius: 6px;
  height: 36px;
  min-width: 280px;
  padding: 0 10px;
}

.loan-workspace-body {
  display: grid;
  grid-template-columns: 224px minmax(560px, 1fr) 64px 380px;
  height: calc(100% - 91px);
  overflow: hidden;
}

.loan-sidebar {
  background: #f5f7fa;
  border-right: 1px solid var(--brokerapp-border);
  overflow: auto;
}

.loan-nav-group {
  border-bottom: 1px solid var(--brokerapp-border);
  padding: 14px 8px;
}

.loan-nav-group h3 {
  align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: 800;
  justify-content: space-between;
  margin: 0 0 8px;
  padding: 0 6px;
}

.loan-nav-group h3 span {
  border: 1px solid #8bc34a;
  border-radius: 4px;
  color: #6b9c24;
  font-size: 11px;
  padding: 0 4px;
}

.loan-nav-item {
  align-items: center;
  border-radius: 7px;
  color: #606873;
  display: flex;
  font-weight: 700;
  gap: 8px;
  min-height: 38px;
  padding: 0 12px;
  text-align: left;
  width: 100%;
}

.loan-nav-item.is-active {
  background: #d4dbe5;
  color: #242b35;
}

.loan-nav-dot {
  background: #f4b21b;
  border-radius: 999px;
  height: 6px;
  width: 6px;
}

.loan-page {
  overflow: auto;
  padding: 10px;
}

.loan-page-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.autosave-state {
  align-items: center;
  color: #4c7a20;
  display: flex;
  gap: 6px;
  font-size: 13px;
}

.right-rail {
  background: var(--brokerapp-blue);
  color: #fff;
  overflow: auto;
  padding: 8px 4px;
}

.rail-tool {
  align-items: center;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  gap: 3px;
  min-height: 58px;
  padding: 7px 3px;
  position: relative;
  width: 100%;
}

.rail-tool.is-active {
  background: rgba(255, 255, 255, 0.12);
  outline: 1px solid rgba(255, 255, 255, 0.22);
}

.rail-badge {
  background: #3e81c5;
  border-radius: 999px;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  position: absolute;
  right: 6px;
  top: 4px;
  width: 18px;
}

.tool-drawer {
  background: #fff;
  border-left: 1px solid var(--brokerapp-border);
  overflow: auto;
}

.tool-drawer-content > header {
  align-items: center;
  border-bottom: 1px solid var(--brokerapp-border);
  display: flex;
  gap: 10px;
  height: 62px;
  padding: 0 12px;
}

.tool-drawer-content h3 {
  flex: 1;
  font-size: 18px;
  font-weight: 800;
  margin: 0;
}

.loandash-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 1.3fr 1.3fr 0.55fr;
}

.dashboard-panel,
.form-section,
.broker-view-notice,
.household-summary {
  background: #fff;
  border: 1px solid var(--brokerapp-border);
  border-radius: 6px;
}

.dashboard-panel {
  min-height: 116px;
  padding: 14px;
}

.dashboard-panel header,
.form-section header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.dashboard-panel h3,
.form-section h3 {
  font-size: 15px;
  font-weight: 800;
  margin: 0;
}

.deal-snapshot strong,
.stage-due-card strong,
.pending-panel strong {
  display: block;
  font-size: 28px;
  line-height: 1.1;
}

.activity-panel {
  grid-row: span 4;
}

.applicants-panel {
  grid-column: span 1;
}

.activity-row {
  border-bottom: 1px solid #eef0f3;
  padding: 12px 0;
}

.activity-row span,
.applicant-grid span {
  color: #7a8290;
  font-size: 12px;
}

.progress-bar {
  background: #edf0f3;
  border-radius: 999px;
  height: 5px;
  margin-top: 8px;
}

.progress-bar i {
  background: var(--brokerapp-blue);
  border-radius: inherit;
  display: block;
  height: 100%;
}

.applicant-grid {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.applicant-grid article {
  background: #f7f9fb;
  border-radius: 5px;
  padding: 10px;
}

.consent-row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.form-page {
  display: grid;
  gap: 10px;
}

.tab-strip {
  display: flex;
  gap: 2px;
}

.tab-strip button {
  background: #d6dde7;
  border: 1px solid #c6cfda;
  border-radius: 7px 7px 0 0;
  font-weight: 700;
  min-height: 42px;
  padding: 0 20px;
}

.tab-strip button.is-active {
  background: #fff;
  color: var(--brokerapp-blue);
}

.form-section {
  border-radius: 0;
  padding: 16px;
}

.form-grid {
  display: grid;
  gap: 14px 18px;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
}

.form-field {
  display: grid;
  gap: 6px;
}

.form-field span {
  font-weight: 600;
}

.form-field input,
.form-field select,
.form-field textarea {
  border: 1px solid var(--brokerapp-border);
  border-radius: 6px;
  min-height: 38px;
  padding: 8px 10px;
}

.form-field input[type='checkbox'] {
  height: 18px;
  min-height: 18px;
  width: 18px;
}

.form-field.full-width {
  grid-column: 1 / -1;
}

.accordion-row {
  align-items: center;
  background: #fff;
  border-bottom: 1px solid var(--brokerapp-border);
  display: flex;
  justify-content: space-between;
  min-height: 54px;
  padding: 0 16px;
}

.page-intro,
.info-box p {
  background: #f7f9fb;
  border: 1px solid #c2ccd9;
  border-radius: 6px;
  margin: 0;
  padding: 12px;
}

.section-actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

.living-expenses-page {
  background: #fff;
  border: 1px solid var(--brokerapp-border);
}

.broker-view-notice,
.household-summary {
  margin: 10px;
  padding: 14px;
}

.expense-category {
  border-top: 1px solid var(--brokerapp-border);
}

.expense-header {
  align-items: center;
  background: #fff2f2;
  color: #e21d32;
  display: flex;
  font-weight: 800;
  justify-content: space-between;
  min-height: 48px;
  padding: 0 22px;
  width: 100%;
}

.expense-category.complete .expense-header {
  background: #f6faf4;
  color: #4f8d20;
}

.expense-body {
  display: grid;
  gap: 14px;
  padding: 18px 22px;
}

.expense-row {
  display: grid;
  gap: 18px;
  grid-template-columns: minmax(220px, 1fr) minmax(180px, 280px);
}

.validation-error {
  color: #e21d32;
}

.drawer-list article,
.report-list article,
.key-date-list article {
  align-items: center;
  border-bottom: 1px solid var(--brokerapp-border);
  display: flex;
  gap: 12px;
  min-height: 58px;
  padding: 0 16px;
}

.drawer-list strong,
.report-list strong {
  flex: 1;
}

.check {
  border: 2px solid #c8cdd4;
  border-radius: 999px;
  height: 20px;
  width: 20px;
}

.check.complete {
  background: #75b80d;
  border-color: #75b80d;
}

.task-drawer,
.empty-tool {
  padding: 22px;
}

.task-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
}

.empty-tool {
  text-align: center;
}

.disabled,
.disabled:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.sms-history article {
  border-bottom: 1px solid var(--brokerapp-border);
  padding: 20px 22px;
}

.failed,
.status-pill.blocked,
.date-label.active {
  color: #9d0014;
}

.sms-bubble {
  background: #f2f4f7;
  border-radius: 16px;
  font-size: 16px;
  line-height: 1.5;
  padding: 18px;
}

.status-pill.blocked {
  border: 1px solid #ff9aa7;
  border-radius: 5px;
  padding: 3px 8px;
}

.date-label {
  border: 1px solid var(--brokerapp-border);
  border-radius: 5px;
  min-width: 135px;
  padding: 5px 10px;
}

.report-list button,
.key-date-list button {
  border: 1px solid var(--brokerapp-border);
  border-radius: 5px;
  padding: 6px 12px;
}

.quick-view {
  background: rgba(27, 35, 47, 0.32);
  inset: 0;
  position: fixed;
  z-index: 60;
}

.quick-view-panel {
  background: #f6f7f9;
  box-shadow: -20px 0 40px rgba(31, 41, 55, 0.22);
  height: 100%;
  margin-left: auto;
  overflow: auto;
  width: min(880px, calc(100vw - 56px));
}

.quick-view-panel > header {
  align-items: center;
  background: #fff;
  border-bottom: 1px solid var(--brokerapp-border);
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
}

.close-button {
  color: #8a8f98;
}

.quick-view-summary,
.stage-select {
  background: #fff;
  border-bottom: 1px solid var(--brokerapp-border);
  display: flex;
  gap: 18px;
  justify-content: space-between;
  padding: 20px 24px;
}

.stage-select {
  align-items: center;
}

.stage-select span {
  color: #b2b5bb;
  font-weight: 800;
  text-transform: uppercase;
}

.quick-tabs {
  background: #f3f4f6;
  border-bottom: 1px solid var(--brokerapp-border);
  display: flex;
  gap: 2px;
  padding-left: 24px;
}

.quick-tabs button {
  background: #fff;
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  min-height: 50px;
}

.quick-tabs button.is-active {
  color: var(--brokerapp-blue);
  outline: 1px solid var(--brokerapp-blue);
}

.quick-tab-panel {
  display: grid;
  gap: 20px;
  padding: 20px 28px;
}

.quick-tab-panel > textarea,
.quick-form textarea {
  border: 1px solid var(--brokerapp-border);
  border-radius: 6px;
  padding: 12px;
}

.quick-form {
  background: #fff;
  border: 1px solid var(--brokerapp-border);
  display: grid;
  gap: 14px;
  padding: 18px;
}

.quick-detail-tabs {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr 1fr;
}

.quick-detail-tabs section {
  background: #fff;
  border: 1px solid var(--brokerapp-border);
  padding: 16px;
}

@media (max-width: 980px) {
  .brokerapp {
    overflow: auto;
  }

  .loan-workspace,
  .loan-board-page {
    min-width: 1040px;
  }

  .brokerapp-switcher,
  .loan-board-toolbar {
    min-width: 1040px;
  }
}
</style>

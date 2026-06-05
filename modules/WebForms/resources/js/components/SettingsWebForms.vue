<template>
  <div
    class="flex h-[calc(100vh-8rem)] min-h-[760px] flex-col overflow-hidden border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
  >
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-700"
    >
      <div>
        <h2
          class="text-base font-semibold text-neutral-900 dark:text-neutral-100"
        >
          {{ activePage.title }}
        </h2>

        <p class="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
          {{ activePage.description }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <IButton
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="sm"
          text="Open SSO login"
          :href="loginUrl"
        />

        <IButton
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
          text="Open in OpnForm"
          :href="iframeSrc"
        />

        <IButton
          v-for="page in pages"
          :key="page.route"
          size="sm"
          :to="{ name: page.route }"
          :variant="page.route === $route.name ? 'primary' : 'secondary'"
          :text="page.title"
        />
      </div>
    </div>

    <div
      class="dark:bg-warning-950/20 border-b border-warning-200 bg-warning-50 px-4 py-3 text-sm text-warning-900 dark:border-warning-700/40 dark:text-warning-200"
    >
      Google and OIDC sign-in must open as a top-level page. Use
      <a
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium underline"
        :href="loginUrl"
      >
        Open SSO login
      </a>
      if this embedded workspace asks you to sign in.
    </div>

    <iframe
      :key="iframeSrc"
      title="Lend A Loan Forms"
      class="h-full w-full flex-1 border-0"
      allow="clipboard-read; clipboard-write; fullscreen"
      :src="iframeSrc"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const opnFormBaseUrl = 'https://form.lendaloan.com.au'

const pages = [
  {
    route: 'web-forms-index',
    title: 'Forms Dashboard',
    description: 'Manage Lend A Loan forms and open existing form builders.',
    path: '/home',
  },
  {
    route: 'web-form-create',
    title: 'Create Form',
    description: 'Start a new form inside the Concord forms workspace.',
    path: '/forms/create',
  },
  {
    route: 'web-form-integrations',
    title: 'Integrations',
    description: 'Connect form automations and delivery channels.',
    path: '/integrations',
  },
  {
    route: 'web-form-account',
    title: 'Form Account',
    description: 'Manage the Lend A Loan forms workspace profile and account.',
    path: '/home',
  },
]

const route = useRoute()

const loginUrl = `${opnFormBaseUrl}/login`

const activePage = computed(() => {
  return pages.find(page => page.route === route.name) || pages[0]
})

const iframeSrc = computed(() => {
  return `${opnFormBaseUrl}${activePage.value.path}`
})
</script>

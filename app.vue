<template>
  <NuxtLayout>
    <UContainer :ui="{ padding: 'py-4', base: 'max-w-4xl' }">
      <NuxtPage />
    </UContainer>

    <UNotifications />
  </NuxtLayout>
</template>

<style>
body {
  @apply antialiased font-sans  dark:text-gray-200  dark:bg-gray-900;
}
</style>

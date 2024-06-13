<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError,
});
</script>

<template>
  <div>
    <NuxtLayout>
      <UContainer class="my-4 max-w-4xl flex flex-col items-center gap-8">
        <div v-if="error?.statusCode !== 404">
          <h1 class="text-2xl font-bold">Page not found</h1>
        </div>

        <div v-else>
          <h1 class="text-2xl font-bold">Unknown error</h1>
          <p>{{ error?.message }}</p>
        </div>

        <UButton to="/groups">Back to home</UButton>
      </UContainer>

      <UNotifications />
    </NuxtLayout>
  </div>
</template>

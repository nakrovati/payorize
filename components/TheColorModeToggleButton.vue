<script setup lang="ts">
const colorMode = useColorMode();

const items = [
  [
    {
      label: "Light",
      click: () => (colorMode.preference = "light"),
    },
    {
      label: "Dark",
      click: () => (colorMode.preference = "dark"),
    },
    {
      label: "System",
      click: () => (colorMode.preference = "system"),
    },
  ],
];
</script>

<template>
  <UDropdown :items="items">
    <UButton
      variant="ghost"
      color="gray"
      aria-label="Select website theme color"
      ><UIcon
        v-if="colorMode.value === 'light'"
        name="i-heroicons-sun"
        class="w-5 h-5"
      ></UIcon>
      <UIcon
        v-else-if="colorMode.value === 'dark'"
        name="i-heroicons-moon"
        class="w-5 h-5"
      >
      </UIcon>
    </UButton>
  </UDropdown>
</template>

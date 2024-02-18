<script setup>
const route = useRoute();

const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const items = [
  [
    {
      label: user.value?.email,
      to: "/account",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-pencil-square-20-solid",
      shortcuts: ["O"],
      click: () => auth.signOut(),
    },
  ],
];
</script>

<template>
  <header>
    <UContainer class="py-4 flex flex-row justify-between items-center">
      <div v-if="route.path === '/'">Home</div>
      <NuxtLink v-else to="/">Home</NuxtLink>

      <div class="flex gap-2">
        <TheColorModeToggleButton></TheColorModeToggleButton>
        <UDropdown
          v-if="user"
          :items="items"
          :popper="{ placement: 'bottom-start' }"
        >
          <UAvatar alt="avatar"></UAvatar>
        </UDropdown>
        <UButton v-else to="/login">Login</UButton>
      </div>
    </UContainer>

    <UDivider></UDivider>
  </header>
</template>

<script setup lang="ts">
import type { Database } from "~/types/supabase";

definePageMeta({ middleware: "auth" });

const user = useSupabaseUser();
const client = useSupabaseClient<Database>();
const isOpen = ref(false);

const { data: groups, refresh } = await useAsyncData("groups", async () => {
  const { data } = await client
    .from("groups")
    .select(`id, name, group_members!inner (user_id)`)
    .eq("group_members.user_id", user.value!.id);

  return data;
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="font-semibold text-2xl">Groups</h1>

    <ul v-if="groups" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <li v-for="group in groups" :key="group.id">
        <NuxtLink :to="`groups/${group.id}`">
          <UCard>
            <h3 class="font-bold">{{ group.name }}</h3>
          </UCard>
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="text-center">You don't have any groups</p>

    <UButton class="mx-auto max-w-fit mt-4" @click="isOpen = true"
      >Create group</UButton
    >

    <TheCreateGroupModal
      v-model="isOpen"
      @refresh="refresh"
    ></TheCreateGroupModal>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "~/types/database.types";

definePageMeta({ middleware: "auth" });

const user = useSupabaseUser();
const client = useSupabaseClient<Database>();
const isOpen = ref(false);

const { data: groups, refresh } = await useAsyncData("groups", async () => {
  const { data } = await client
    .from("group_members")
    .select("group_info:groups(id,name)")
    .eq("user_id", user.value!.id);

  return data;
});
</script>

<template>
  <div class="mt-4 flex flex-col gap-4">
    <h1 class="font-semibold text-2xl">Groups</h1>

    <ul v-if="groups" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <li v-for="group in groups" :key="group.group_info?.id">
        <NuxtLink :to="`groups/${group.group_info?.id}`">
          <UCard>
            <h3 class="font-bold">{{ group.group_info?.name }}</h3>
          </UCard>
        </NuxtLink>
      </li>
    </ul>

    <UButton class="mx-auto max-w-fit mt-4" @click="isOpen = true"
      >Create group</UButton
    >

    <TheCreateGroupModal
      v-model="isOpen"
      @refresh="refresh"
    ></TheCreateGroupModal>
  </div>
</template>

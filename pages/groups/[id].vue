<script setup lang="ts">
const route = useRoute();
definePageMeta({
  middleware: ["check-group-existence"],
});

const supabase = useSupabaseClient();

const isOpen = ref(false);

const { data: group } = await useAsyncData(
  "group",
  async () => {
    const { data } = await supabase
      .from("groups")
      .select(`id, name, group_members!inner (user_id)`)
      .eq("id", route.params.id)
      .single();
    return data;
  },
  { server: false },
);
</script>

<template>
  <div>
    <div>
      Group: {{ group?.name }}
      <UButton @click="isOpen = true">Add expense</UButton>
    </div>

    <TheCreateBillModal
      v-model="isOpen"
      :group-id="route.params.id.toString()"
    ></TheCreateBillModal>
  </div>
</template>

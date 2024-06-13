<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { objectAsync, string, type Input, number } from "valibot";
import type { Database } from "~/types/supabase";

const supabase = useSupabaseClient<Database>();
const route = useRoute();
const isOpen = defineModel<boolean>();
const schema = objectAsync({
  description: string(),
  currency: string(),
  amount: number(),
  group: string(),
  paidBy: string(),
});
const user = useSupabaseUser();
type Schema = Input<typeof schema>;

const props = defineProps({
  groupId: {
    type: String,
    required: true,
  },
});

const { data: groupMembers } = useAsyncData("group-members", async () => {
  const { data } = await supabase
    .from("users")
    .select(`id, email, group_members!inner (group_id)`)
    .eq("group_members.group_id", props.groupId);

  return data;
});

const currencies = ["USD", "EUR"];

const state = reactive({
  description: "",
  currency: currencies[0],
  amount: 0,
  group: route.params.id,
  paidBy: user.value?.id,
});

const selectedUsers = ref<string[]>([]);
function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
}
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
          <UInput v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Amount" name="title">
          <div class="flex flex-row gap-2">
            <USelect v-model="state.currency" :options="currencies"></USelect>
            <UInput
              v-model="state.amount"
              placeholder="0.00"
              type="number"
            ></UInput>
          </div>
        </UFormGroup>
        <UFormGroup label="Paid by">
          <USelect
            v-model="state.paidBy"
            :options="groupMembers!"
            value-attribute="id"
            option-attribute="email"
          ></USelect>
        </UFormGroup>
        <UFormGroup label="Members">
          <ul v-if="groupMembers">
            <li v-for="member in groupMembers" :key="member.id">
              <UCheckbox
                v-model="selectedUsers"
                :name="member.id"
                :label="member.email"
                :value="member.id"
              >
                {{ member.id }}</UCheckbox
              >
            </li>
          </ul>
        </UFormGroup>

        <UButton class="mt-4" block type="submit">Create bill</UButton>
        <div>State:{{ state }}</div>
      </UForm>
    </div>
  </UModal>
</template>

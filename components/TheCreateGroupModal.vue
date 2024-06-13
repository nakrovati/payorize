<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { string, objectAsync, minLength, type Input, maxLength } from "valibot";
import type { Database } from "~/types/supabase";

const isModalOpen = defineModel<boolean>();

const groupSchema = objectAsync({
  name: string([
    minLength(3, "Group name should be at least 3 characters long"),
    maxLength(50, "Group name should be at most 50 characters long"),
  ]),
});

type GroupSchema = Input<typeof groupSchema>;

const emit = defineEmits<{ refresh: [] }>();

const groupFormState = reactive({
  name: "",
});

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

const errorToast = useToast();

async function onSubmit(event: FormSubmitEvent<GroupSchema>) {
  if (!user.value) throw new Error("User not authorised");

  try {
    const { data: group, error: groupError } = await supabase
      .from("groups")
      .insert({
        name: event.data.name,
      })
      .select()
      .single();
    if (groupError) throw new Error(groupError.message);

    const { error: memberError } = await supabase
      .from("group_members")
      .insert({ group_id: group.id, user_id: user.value.id });
    if (memberError) throw new Error(memberError.message);

    emit("refresh");
    isModalOpen.value = false;
    errorToast.add({ title: `The ${event.data.name} group has been created` });
  } catch (error) {
    if (error instanceof Error) {
      errorNotification.add({
        title: error.message,
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    }
  }
}

const errorNotification = useToast();
</script>

<template>
  <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-sm' }">
    <div class="p-4">
      <UForm
        :schema="groupSchema"
        :state="groupFormState"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Group name" name="name">
          <UInput v-model="groupFormState.name" type="text" />
        </UFormGroup>

        <UButton type="submit">Submit</UButton>
      </UForm>
    </div>
  </UModal>
</template>

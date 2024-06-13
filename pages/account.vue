<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { email, objectAsync, string, type Input } from "valibot";

definePageMeta({ middleware: "auth" });

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const toast = useToast();

const items = [
  { key: "account", label: "Account" },
  {
    key: "security",
    label: "Security",
  },
];

const accountSchema = objectAsync({
  email: string([email("Invalid email")]),
});

const accountFormState = reactive({
  email: user.value?.email,
});

type AccountSchema = Input<typeof accountSchema>;

async function updateEmail(email: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email,
    });
    if (error) throw error;
    accountFormState.email = data.user.email;
  } catch (error) {
    if (error instanceof Error) {
      toast.add({ color: "red", title: "Failed to update account settings" });
    }
  }
}

async function onSubmit(event: FormSubmitEvent<AccountSchema>) {
  if (event.data.email !== user.value?.email) {
    await updateEmail(event.data.email);
  }
}

const isAccountDeleteModalOpen = ref(false);

async function handleDeleteAccount() {
  try {
    if (!user.value) throw new Error("User not authorised");

    const { error } = await supabase.auth.admin.deleteUser(user.value.id);
    if (error) throw error;
    toast.add({ color: "green", title: "Account deleted" });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      toast.add({ color: "red", title: "Failed to delete account" });
    }
  }
}
</script>

<template>
  <UTabs
    :items="items"
    orientation="vertical"
    :ui="{ wrapper: 'flex items-start gap-8', list: { width: 'w-48' } }"
  >
    <template #item="{ item }">
      <div v-if="item.key === 'account'">
        <UForm
          :state="accountFormState"
          :schema="accountSchema"
          @submit="onSubmit"
        >
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="accountFormState.email"
              class="w-full max-w-72"
            ></UInput>
          </UFormGroup>

          <UButton class="mt-4" type="submit">Save account settings</UButton>
        </UForm>
      </div>

      <div v-else-if="item.key === 'security'">
        <h1 class="font-bold text-2xl">Security</h1>
        <div class="grid gap-4 mt-8">
          <div class="">
            <h2 class="font-bold text-lg">Dangerous</h2>
            <div>
              <h3>Delete account</h3>
              <UButton color="red" @click="isAccountDeleteModalOpen = true"
                >Delete account</UButton
              >
            </div>
          </div>
        </div>

        <UModal v-model="isAccountDeleteModalOpen">
          <UCard
            :ui="{
              ring: '',
              divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            }"
          >
            <template #header>
              <h2 class="font-bold text-lg">
                Are you sure you want to delete the account?
              </h2>
            </template>

            <p>
              This action cannot be undone. All data will be permanently
              deleted.
            </p>

            <template #footer>
              <div class="flex justify-between">
                <UButton color="red" @click="handleDeleteAccount"
                  >Yes, delete account!</UButton
                >
                <UButton @click="isAccountDeleteModalOpen = false"
                  >No, don't delete</UButton
                >
              </div>
            </template>
          </UCard>
        </UModal>
      </div>
    </template>
  </UTabs>
</template>

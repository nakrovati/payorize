<script setup lang="ts">
import { string, objectAsync, email, type Input } from "valibot";
import type { FormSubmitEvent } from "#ui/types";

const supabase = useSupabaseClient();

const schema = objectAsync({
  email: string([email("Invalid email")]),
});

type Schema = Input<typeof schema>;

const state = reactive({
  email: undefined,
});

const loading = ref(false);
const toast = useToast();

async function signInWithOtp(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: event.data.email,
    });
    if (error) throw error;
    toast.add({ title: "Check your email for the login link!" });
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex justify-center">
    <UCard class="max-w-lg w-full mt-8">
      <template #header>
        <h1 class="font-bold text-3xl">Login</h1>
        <p>Enter your email and password to login to your account.</p>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col gap-4"
        @submit="signInWithOtp"
      >
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="state.email"
            placeholder="email@example.com"
          ></UInput>
        </UFormGroup>

        <UButton :loading="loading" block type="submit"
          >Sign In with E-Mail</UButton
        >
      </UForm>
    </UCard>
  </div>
</template>

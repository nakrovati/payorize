<template>
  <div>
    <div class="flex flex-col min-h-dvh">
      <TheHeader></TheHeader>

      <main class="flex-1">
        <slot />
      </main>
    </div>

    <TheFooter></TheFooter>
  </div>
</template>

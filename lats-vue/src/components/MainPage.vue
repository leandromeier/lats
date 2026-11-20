<script setup>
import { useRouter } from 'vue-router'  
const router = useRouter()              
</script>

<template>
    <div>
      <h1>Look at the stars</h1>
      <!-- Your existing main page content goes here -->
      <p>This is a WIP online implementation of the board game "look at the stars".</p>
    </div>
  <div style="padding: 2rem;">
    <button class="navigation-button" @click="router.push('/game')">Start a new game</button>
    <button class="navigation-button" @click="router.push('/guide')">Learn the rules</button>
  </div>

</template>

<script setup></script>



<style scoped></style>


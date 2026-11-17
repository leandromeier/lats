<script setup>
import { useRouter } from 'vue-router'  
const router = useRouter()              
</script>

<template>
    <div>
      <h1>Look at the stars</h1>
      <!-- Your existing main page content goes here -->
      <p>Welcome to this online implementation of look at the stars.</p>
    </div>
  <div style="padding: 2rem;">
    <button @click="router.push('/game')">new game</button>
  </div>
</template>

<script setup></script>



<style scoped></style>


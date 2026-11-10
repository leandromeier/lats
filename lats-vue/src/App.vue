<template>
  <router-view />
</template>

<style>
.navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #2c3e50;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.nav-link.router-link-active {
  text-decoration: underline;
}
.content {
  padding: 2rem;
}
</style>
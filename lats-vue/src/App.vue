<template>
  <router-view />
</template>

<style>
html,
body {
  margin: 0;
  min-height: 100vh;
  background: #05015e;
  color: white;
}

h1 {
  color: white;
}

button:not(.celestial-body) {
  font-family: 'Trebuchet MS', 'Segoe UI', Helvetica, sans-serif;
  font-size: 1.15rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: white;
  background: linear-gradient(135deg, #2a1fa8, #4a3fd6);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  padding: 0.7em 1.8em;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(120, 110, 255, 0.45);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

button:not(.celestial-body):hover {
  box-shadow: 0 0 20px rgba(160, 150, 255, 0.8);
  transform: translateY(-2px);
}

button:not(.celestial-body):active {
  transform: translateY(0);
}

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
<template>
  <header class="brand-header">
    <div class="logo-section">
      <div class="logo-icon">
        <MonitorIcon size="26" />
      </div>
      <div>
        <h1 class="brand-title">IT Asset Management System</h1>
        <p class="brand-subtitle">Module 7 • Prototype Implementation • Aaron Jacob B. Capulong (BSCS 3A)</p>
      </div>
    </div>

    <div class="header-actions">
      <div class="db-status-badge" :class="dbStatus.connected ? 'connected' : 'local'">
        <span class="pulse-dot"></span>
        <span>Storage: {{ dbStatus.mode }}</span>
      </div>
      <button class="btn btn-secondary btn-sm" @click="$emit('reset-data')" title="Reset sample dataset">
        <RotateCcwIcon size="14" />
        <span>Reset Sample Data</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { Monitor as MonitorIcon, RotateCcw as RotateCcwIcon } from 'lucide-vue-next';

defineProps({
  dbStatus: {
    type: Object,
    default: () => ({ mode: 'localStorage (Browser Offline)', connected: false })
  }
});

defineEmits(['reset-data']);
</script>

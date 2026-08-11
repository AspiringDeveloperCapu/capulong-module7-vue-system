<template>
  <div class="table-responsive">
    <table class="asset-table">
      <thead>
        <tr>
          <th>Asset Information</th>
          <th>Category</th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Location / Dept</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asset in assets" :key="asset._id || asset.id">
          <td>
            <div class="asset-name-cell">
              <span class="asset-name-title">{{ asset.assetName }}</span>
              <span class="asset-sn">SN: {{ asset.serialNumber }}</span>
            </div>
          </td>
          <td>
            <span class="type-pill">{{ asset.assetType }}</span>
          </td>
          <td>
            <span :style="{ fontWeight: asset.assignedTo !== 'Unassigned' ? '600' : '400', color: asset.assignedTo !== 'Unassigned' ? '#e0e7ff' : '#6b7280' }">
              {{ asset.assignedTo }}
            </span>
          </td>
          <td>
            <span class="badge" :class="getStatusBadgeClass(asset.status)">
              <span class="pulse-dot"></span>
              {{ asset.status }}
            </span>
          </td>
          <td>
            <div style="font-size: 13px;">{{ asset.location }}</div>
            <div style="font-size: 11px; color: var(--text-dim);">{{ asset.department }}</div>
          </td>
          <td style="font-weight: 600; font-family: monospace;">
            ${{ formatCurrency(asset.cost || 0) }}
          </td>
          <td>
            <div class="action-group">
              <button class="icon-btn" title="Quick Assign" @click="$emit('assign', asset)">
                <UserPlusIcon size="16" />
              </button>
              <button class="icon-btn" title="Edit Asset" @click="$emit('edit', asset)">
                <Edit3Icon size="16" />
              </button>
              <button class="icon-btn delete" title="Delete Asset" @click="$emit('delete', asset)">
                <Trash2Icon size="16" />
              </button>
            </div>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="assets.length === 0">
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-icon">📦</div>
              <h3>No assets found</h3>
              <p>Try adjusting your search filters or click "Add New Asset" to create one.</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { UserPlus as UserPlusIcon, Edit3 as Edit3Icon, Trash2 as Trash2Icon } from 'lucide-vue-next';

defineProps({
  assets: {
    type: Array,
    default: () => []
  }
});

defineEmits(['edit', 'delete', 'assign']);

const formatCurrency = (val) => {
  return Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Available': return 'badge-available';
    case 'Assigned': return 'badge-assigned';
    case 'Under Maintenance': return 'badge-maintenance';
    case 'Retired': return 'badge-retired';
    default: return '';
  }
};
</script>

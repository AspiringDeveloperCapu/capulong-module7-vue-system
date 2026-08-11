<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="modal-title">{{ isEditing ? 'Edit Asset Record' : 'Register New Asset' }}</h2>
        <button class="icon-btn" @click="$emit('close')"><XIcon size="18" /></button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="modal-body">
          <div class="form-grid">
            <div class="form-group full-width">
              <label class="form-label">Asset Name *</label>
              <input type="text" v-model="formData.assetName" class="input-field" placeholder="e.g. MacBook Pro 16 M3" required />
            </div>

            <div class="form-group">
              <label class="form-label">Asset Category *</label>
              <select v-model="formData.assetType" class="select-field" required>
                <option v-for="type in assetTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Serial Number *</label>
              <input type="text" v-model="formData.serialNumber" class="input-field" placeholder="e.g. SN-894210" required />
            </div>

            <div class="form-group">
              <label class="form-label">Status *</label>
              <select v-model="formData.status" class="select-field" required>
                <option value="Available">Available</option>
                <option value="Assigned">Assigned</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Retired">Retired</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Assigned To</label>
              <input type="text" v-model="formData.assignedTo" class="input-field" placeholder="e.g. Jane Doe or Unassigned" />
            </div>

            <div class="form-group">
              <label class="form-label">Purchase Value ($)</label>
              <input type="number" step="0.01" v-model="formData.cost" class="input-field" placeholder="0.00" />
            </div>

            <div class="form-group">
              <label class="form-label">Purchase Date</label>
              <input type="date" v-model="formData.purchaseDate" class="input-field" />
            </div>

            <div class="form-group">
              <label class="form-label">Department</label>
              <input type="text" v-model="formData.department" class="input-field" placeholder="e.g. IT Operations" />
            </div>

            <div class="form-group">
              <label class="form-label">Location / Desk</label>
              <input type="text" v-model="formData.location" class="input-field" placeholder="e.g. HQ - Floor 3" />
            </div>

            <div class="form-group full-width">
              <label class="form-label">Notes & Specifications</label>
              <textarea v-model="formData.notes" class="input-field" rows="3" placeholder="Additional details, warranty specs, repair notes..."></textarea>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn btn-primary">
            <SaveIcon size="16" />
            <span>{{ isEditing ? 'Update Asset' : 'Create Asset' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Save as SaveIcon, X as XIcon } from 'lucide-vue-next';

const props = defineProps({
  show: Boolean,
  isEditing: Boolean,
  assetData: Object,
  assetTypes: Array
});

const emit = defineEmits(['close', 'save']);

const formData = ref({ ...props.assetData });

watch(() => props.assetData, (newVal) => {
  formData.value = { ...newVal };
}, { deep: true });

const handleSubmit = () => {
  emit('save', { ...formData.value });
};
</script>

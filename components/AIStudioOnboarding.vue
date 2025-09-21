<template>
  <div class="ai-onboarding">
    <div class="container">
      <div class="onboarding-header">
        <h2 class="text-white">AI-Powered Studio Onboarding</h2>
        <p class="text-muted">
          Simply provide your website URL and our AI will automatically create your complete studio profile.
        </p>
      </div>

      <div class="onboarding-form">
        <div class="url-input-section">
          <label class="input-label text-white">Studio Website URL</label>
          <div class="url-input-wrapper">
            <input
              v-model="websiteUrl"
              type="url"
              placeholder="https://yourstudio.com"
              class="url-input"
              :disabled="isAnalyzing"
              @keyup.enter="analyzeWebsite"
            />
            <button
              @click="analyzeWebsite"
              :disabled="!websiteUrl || isAnalyzing"
              class="btn btn--primary analyze-btn"
            >
              <Icon v-if="isAnalyzing" name="lucide:loader-2" class="animate-spin" />
              <Icon v-else name="lucide:sparkles" />
              {{ isAnalyzing ? 'Analyzing...' : 'Analyze with AI' }}
            </button>
          </div>
        </div>

        <!-- Analysis Progress -->
        <div v-if="isAnalyzing" class="analysis-progress">
          <div class="progress-steps">
            <div class="progress-step" :class="{ active: currentStep >= 1 }">
              <Icon name="lucide:globe" />
              <span>Fetching Website</span>
            </div>
            <div class="progress-step" :class="{ active: currentStep >= 2 }">
              <Icon name="lucide:brain" />
              <span>AI Analysis</span>
            </div>
            <div class="progress-step" :class="{ active: currentStep >= 3 }">
              <Icon name="lucide:check-circle" />
              <span>Profile Generated</span>
            </div>
          </div>
        </div>

        <!-- Analysis Results -->
        <div v-if="analysisResult" class="analysis-results">
          <div class="results-header">
            <h3 class="text-white">AI-Generated Profile</h3>
            <div class="confidence-score">
              <span class="text-muted">Confidence:</span>
              <span class="confidence-value" :class="getConfidenceClass(analysisResult.confidence)">
                {{ Math.round(analysisResult.confidence * 100) }}%
              </span>
            </div>
          </div>

          <div class="profile-preview">
            <div class="profile-section">
              <label class="section-label text-white">Studio Name</label>
              <input v-model="analysisResult.name" class="profile-input" />
            </div>

            <div class="profile-section">
              <label class="section-label text-white">Tagline</label>
              <input v-model="analysisResult.tagline" class="profile-input" />
            </div>

            <div class="profile-section">
              <label class="section-label text-white">Description</label>
              <textarea v-model="analysisResult.description" class="profile-textarea"></textarea>
            </div>

            <div class="profile-section">
              <label class="section-label text-white">Specialties</label>
              <div class="specialty-tags">
                <span
                  v-for="(specialty, index) in analysisResult.specialties"
                  :key="index"
                  class="specialty-tag"
                >
                  {{ specialty }}
                  <button @click="removeSpecialty(index)" class="remove-tag">×</button>
                </span>
                <input
                  v-model="newSpecialty"
                  @keyup.enter="addSpecialty"
                  placeholder="Add specialty..."
                  class="add-specialty-input"
                />
              </div>
            </div>

            <div class="profile-grid">
              <div class="profile-section">
                <label class="section-label text-white">Location</label>
                <input v-model="analysisResult.location" class="profile-input" />
              </div>

              <div class="profile-section">
                <label class="section-label text-white">Team Size</label>
                <select v-model="analysisResult.teamSize" class="profile-select">
                  <option value="1">Solo</option>
                  <option value="2-5">2-5 people</option>
                  <option value="6-15">6-15 people</option>
                  <option value="16-50">16-50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </div>

              <div class="profile-section">
                <label class="section-label text-white">Price Range</label>
                <select v-model="analysisResult.priceRange" class="profile-select">
                  <option value="$">$ Budget-friendly</option>
                  <option value="$$">$$ Mid-range</option>
                  <option value="$$$">$$$ Premium</option>
                </select>
              </div>

              <div class="profile-section">
                <label class="section-label text-white">Founded</label>
                <input
                  v-model="analysisResult.foundedYear"
                  type="number"
                  min="1900"
                  :max="new Date().getFullYear()"
                  class="profile-input"
                />
              </div>
            </div>

            <div class="profile-section">
              <label class="section-label text-white">Contact Information</label>
              <div class="contact-grid">
                <input
                  v-model="analysisResult.contactEmail"
                  type="email"
                  placeholder="Email"
                  class="profile-input"
                />
                <input
                  v-model="analysisResult.phone"
                  type="tel"
                  placeholder="Phone"
                  class="profile-input"
                />
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button @click="resetForm" class="btn btn--text">
              Start Over
            </button>
            <button @click="saveProfile" class="btn btn--secondary" :disabled="isSaving">
              <Icon v-if="isSaving" name="lucide:loader-2" class="animate-spin" />
              {{ isSaving ? 'Saving...' : 'Save Profile' }}
            </button>
          </div>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error-state">
          <Icon name="lucide:alert-circle" class="error-icon" />
          <h3 class="text-white">Analysis Failed</h3>
          <p class="text-muted">{{ error }}</p>
          <button @click="resetForm" class="btn btn--secondary">Try Again</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const websiteUrl = ref('')
const isAnalyzing = ref(false)
const currentStep = ref(0)
const analysisResult = ref(null)
const error = ref(null)
const newSpecialty = ref('')
const isSaving = ref(false)

const analyzeWebsite = async () => {
  if (!websiteUrl.value) return
  
  isAnalyzing.value = true
  currentStep.value = 0
  error.value = null
  
  try {
    currentStep.value = 1
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate progress
    
    currentStep.value = 2
    const response = await $fetch('/api/ai/analyze-studio', {
      method: 'POST',
      body: { websiteUrl: websiteUrl.value }
    })
    
    currentStep.value = 3
    await new Promise(resolve => setTimeout(resolve, 500))
    
    analysisResult.value = response.data
  } catch (err) {
    console.error('Analysis error:', err)
    error.value = err.data?.message || 'Failed to analyze website. Please check the URL and try again.'
  } finally {
    isAnalyzing.value = false
  }
}

const addSpecialty = () => {
  if (newSpecialty.value.trim() && !analysisResult.value.specialties.includes(newSpecialty.value.trim())) {
    analysisResult.value.specialties.push(newSpecialty.value.trim())
    newSpecialty.value = ''
  }
}

const removeSpecialty = (index) => {
  analysisResult.value.specialties.splice(index, 1)
}

const getConfidenceClass = (confidence) => {
  if (confidence >= 0.8) return 'confidence-high'
  if (confidence >= 0.6) return 'confidence-medium'
  return 'confidence-low'
}

const saveProfile = async () => {
  isSaving.value = true
  try {
    // Here you would save to Supabase or your database
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate save
    
    // Emit success event or navigate
    await navigateTo('/dashboard')
  } catch (err) {
    console.error('Save error:', err)
    error.value = 'Failed to save profile. Please try again.'
  } finally {
    isSaving.value = false
  }
}

const resetForm = () => {
  websiteUrl.value = ''
  analysisResult.value = null
  error.value = null
  currentStep.value = 0
  isAnalyzing.value = false
}
</script>

<style lang="scss" scoped>
.ai-onboarding {
  padding: var(--space-3xl) 0;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
}

.onboarding-header {
  text-align: center;
  margin-bottom: var(--space-3xl);

  h2 {
    font-size: var(--step-4);
    margin-bottom: var(--space-m);
  }

  p {
    font-size: var(--step-0);
    max-width: 600px;
    margin: 0 auto;
  }
}

.onboarding-form {
  max-width: 800px;
  margin: 0 auto;
}

.url-input-section {
  margin-bottom: var(--space-2xl);
}

.input-label {
  display: block;
  font-weight: 600;
  margin-bottom: var(--space-s);
}

.url-input-wrapper {
  display: flex;
  gap: var(--space-m);

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.url-input {
  flex: 1;
  padding: var(--space-m);
  font-size: var(--step-0);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-heading);
  transition: border-color var(--transition-base);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.analyze-btn {
  white-space: nowrap;
  min-width: 160px;
}

.analysis-progress {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 10%;
    right: 10%;
    height: 2px;
    background-color: var(--color-border);
    z-index: 1;
  }
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-s);
  position: relative;
  z-index: 2;
  opacity: 0.5;
  transition: opacity var(--transition-base);

  &.active {
    opacity: 1;
  }

  svg {
    width: 40px;
    height: 40px;
    padding: var(--space-s);
    background-color: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: 50%;
    color: var(--color-text-muted);
  }

  &.active svg {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }

  span {
    font-size: var(--step--1);
    font-weight: 500;
    color: var(--color-text-muted);
  }

  &.active span {
    color: var(--color-heading);
  }
}

.analysis-results {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--space-2xl);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2xl);
  padding-bottom: var(--space-m);
  border-bottom: 1px solid var(--color-border);
}

.confidence-score {
  display: flex;
  align-items: center;
  gap: var(--space-s);
}

.confidence-value {
  font-weight: 700;
  
  &.confidence-high { color: var(--color-accent-2); }
  &.confidence-medium { color: var(--color-accent-1); }
  &.confidence-low { color: var(--color-accent-3); }
}

.profile-preview {
  display: flex;
  flex-direction: column;
  gap: var(--space-l);
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.section-label {
  font-weight: 600;
  font-size: var(--step--1);
}

.profile-input,
.profile-textarea,
.profile-select {
  padding: var(--space-m);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-heading);
  font-size: var(--step-0);
  transition: border-color var(--transition-base);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}

.profile-textarea {
  min-height: 100px;
  resize: vertical;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-l);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-m);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.specialty-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
  align-items: center;
}

.specialty-tag {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-s);
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--border-radius);
  font-size: var(--step--1);
}

.remove-tag {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  margin-left: var(--space-xs);

  &:hover {
    opacity: 0.7;
  }
}

.add-specialty-input {
  padding: var(--space-xs) var(--space-s);
  background-color: var(--color-background);
  border: 1px dashed var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-heading);
  font-size: var(--step--1);
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    border-style: solid;
  }
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-2xl);
  padding-top: var(--space-l);
  border-top: 1px solid var(--color-border);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-m);
  }
}

.error-state {
  text-align: center;
  padding: var(--space-3xl);
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
}

.error-icon {
  width: 48px;
  height: 48px;
  color: var(--color-accent-3);
  margin-bottom: var(--space-m);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>


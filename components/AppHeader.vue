<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <NuxtLink to="/" class="logo">
          <span class="logo-text">Atelier</span>
          <span class="logo-accent">Designs</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="nav-desktop" aria-label="Main navigation">
          <NuxtLink to="/" class="nav-link">Directory</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <NuxtLink to="/submit" class="nav-link">Submit Studio</NuxtLink>
        </nav>

        <!-- CTA Button -->
        <div class="header-actions">
          <NuxtLink to="/auth/login" class="btn btn--text">Sign In</NuxtLink>
          <NuxtLink to="/auth/register" class="btn btn--primary">Join Directory</NuxtLink>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :class="{ 'is-active': isMobileMenuOpen }"
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav 
      class="nav-mobile"
      :class="{ 'is-open': isMobileMenuOpen }"
      aria-label="Mobile navigation"
    >
      <div class="nav-mobile-content">
        <NuxtLink to="/" class="nav-mobile-link" @click="closeMobileMenu">Directory</NuxtLink>
        <NuxtLink to="/about" class="nav-mobile-link" @click="closeMobileMenu">About</NuxtLink>
        <NuxtLink to="/submit" class="nav-mobile-link" @click="closeMobileMenu">Submit Studio</NuxtLink>
        <div class="nav-mobile-actions">
          <NuxtLink to="/auth/login" class="btn btn--secondary" @click="closeMobileMenu">Sign In</NuxtLink>
          <NuxtLink to="/auth/register" class="btn btn--primary" @click="closeMobileMenu">Join Directory</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div 
      class="mobile-menu-overlay"
      :class="{ 'is-visible': isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </header>
</template>

<script setup>
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background-color: rgba(25, 25, 25, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-s) 0;
  min-height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
  font-family: var(--font-family-serif);
  font-size: var(--step-1);
  font-weight: 600;
  text-decoration: none;
  color: var(--color-heading);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-primary);
  }
}

.logo-text {
  color: var(--color-heading);
}

.logo-accent {
  color: var(--color-primary);
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: var(--space-l);

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  font-size: var(--step-0);
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  position: relative;
  transition: color var(--transition-fast);

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: var(--color-primary);
    transition: width var(--transition-base);
  }

  &:hover,
  &.router-link-active {
    color: var(--color-heading);

    &::after {
      width: 100%;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-s);

  @media (max-width: 768px) {
    display: none;
  }
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 100%;
    height: 2px;
    background-color: var(--color-heading);
    transition: all var(--transition-base);
    transform-origin: center;
  }

  &.is-active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
}

.nav-mobile {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  transform: translateY(-100%);
  transition: transform var(--transition-base);
  z-index: var(--z-dropdown);

  &.is-open {
    transform: translateY(0);
  }
}

.nav-mobile-content {
  padding: var(--space-l) var(--container-padding);
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.nav-mobile-link {
  font-size: var(--step-1);
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  padding: var(--space-s) 0;
  border-bottom: 1px solid var(--color-border);
  transition: color var(--transition-fast);

  &:hover,
  &.router-link-active {
    color: var(--color-primary);
  }
}

.nav-mobile-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  margin-top: var(--space-m);
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-base);
  z-index: calc(var(--z-dropdown) - 1);

  &.is-visible {
    opacity: 1;
    visibility: visible;
  }
}
</style>


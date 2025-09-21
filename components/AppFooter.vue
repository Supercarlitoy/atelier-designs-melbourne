<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <!-- Main Footer Content -->
        <div class="footer-main">
          <!-- Brand Section -->
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-text">Atelier</span>
              <span class="logo-accent">Designs</span>
            </div>
            <p class="footer-description">
              The definitive, curated index of Melbourne's finest design talent. 
              Discover award-winning studios, agencies, and independent designers.
            </p>
            <div class="footer-social">
              <a href="#" class="social-link" aria-label="Instagram">
                <Icon name="lucide:instagram" />
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <Icon name="lucide:linkedin" />
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <Icon name="lucide:twitter" />
              </a>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="footer-nav">
            <div class="footer-nav-section">
              <h3 class="footer-nav-title">Directory</h3>
              <ul class="footer-nav-list">
                <li><NuxtLink to="/" class="footer-nav-link">Browse Studios</NuxtLink></li>
                <li><NuxtLink to="/categories/branding" class="footer-nav-link">Branding</NuxtLink></li>
                <li><NuxtLink to="/categories/web-design" class="footer-nav-link">Web Design</NuxtLink></li>
                <li><NuxtLink to="/categories/graphic-design" class="footer-nav-link">Graphic Design</NuxtLink></li>
              </ul>
            </div>

            <div class="footer-nav-section">
              <h3 class="footer-nav-title">For Studios</h3>
              <ul class="footer-nav-list">
                <li><NuxtLink to="/submit" class="footer-nav-link">Submit Your Studio</NuxtLink></li>
                <li><NuxtLink to="/auth/register" class="footer-nav-link">Create Account</NuxtLink></li>
                <li><NuxtLink to="/pricing" class="footer-nav-link">Pricing</NuxtLink></li>
                <li><NuxtLink to="/analytics" class="footer-nav-link">Analytics</NuxtLink></li>
              </ul>
            </div>

            <div class="footer-nav-section">
              <h3 class="footer-nav-title">Company</h3>
              <ul class="footer-nav-list">
                <li><NuxtLink to="/about" class="footer-nav-link">About</NuxtLink></li>
                <li><NuxtLink to="/contact" class="footer-nav-link">Contact</NuxtLink></li>
                <li><NuxtLink to="/privacy" class="footer-nav-link">Privacy Policy</NuxtLink></li>
                <li><NuxtLink to="/terms" class="footer-nav-link">Terms of Service</NuxtLink></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p class="footer-copyright">
              © {{ currentYear }} Atelier Designs. All rights reserved.
            </p>
            <p class="footer-location">
              Made with ❤️ in Melbourne, Australia
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-3xl);
}

.footer-content {
  padding: var(--space-3xl) 0 var(--space-xl);
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-3xl);
  margin-bottom: var(--space-2xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }
}

.footer-brand {
  max-width: 400px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
  font-family: var(--font-family-serif);
  font-size: var(--step-2);
  font-weight: 600;
  margin-bottom: var(--space-m);

  .logo-text {
    color: var(--color-heading);
  }

  .logo-accent {
    color: var(--color-primary);
  }
}

.footer-description {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--space-l);
}

.footer-social {
  display: flex;
  gap: var(--space-s);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-text);
  transition: all var(--transition-base);

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-background);
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-l);
  }
}

.footer-nav-section {
  h3.footer-nav-title {
    font-family: var(--font-family-sans);
    font-size: var(--step-0);
    font-weight: 600;
    color: var(--color-heading);
    margin-bottom: var(--space-m);
  }
}

.footer-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: var(--space-s);
  }
}

.footer-nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--step--1);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-primary);
  }
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-l);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-m);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
}

.footer-copyright,
.footer-location {
  font-size: var(--step--1);
  color: var(--color-text);
  margin: 0;
}

.footer-location {
  @media (max-width: 768px) {
    order: -1;
  }
}
</style>


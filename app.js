const MEALDB = 'https://www.themealdb.com/api/json/v1/1';

const AREA_IMAGES = {
  'Indian': 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Italian': 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Chinese': 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=800',
  'American': 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mexican': 'https://images.pexels.com/photos/6546394/pexels-photo-6546394.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Japanese': 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Thai': 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800',
  'French': 'https://images.pexels.com/photos/381856/pexels-photo-381856.jpeg?auto=compress&cs=tinysrgb&w=800',
  'British': 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Greek': 'https://images.pexels.com/photos/3747306/pexels-photo-3747306.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Spanish': 'https://images.pexels.com/photos/6248933/pexels-photo-6248933.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Vietnamese': 'https://images.pexels.com/photos/4491395/pexels-photo-4491395.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Moroccan': 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Turkish': 'https://images.pexels.com/photos/4491396/pexels-photo-4491396.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Egyptian': 'https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Jamaican': 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const AREA_FILTER_MAP = {
  'Indian': 'India',
  'American': 'United States',
  'French': 'France',
  'British': 'British',
  'Italian': 'Italian',
  'Chinese': 'Chinese',
  'Mexican': 'Mexican',
  'Japanese': 'Japanese',
  'Thai': 'Thai',
  'Greek': 'Greek',
  'Spanish': 'Spanish',
  'Vietnamese': 'Vietnamese',
  'Moroccan': 'Moroccan',
  'Turkish': 'Turkish',
  'Egyptian': 'Egyptian',
  'Jamaican': 'Jamaican',
};

const FEATURED_AREAS = ['Indian', 'Italian', 'Chinese', 'American', 'Mexican', 'Japanese', 'Thai', 'French', 'British', 'Greek', 'Spanish', 'Vietnamese', 'Moroccan', 'Turkish', 'Egyptian', 'Jamaican'];

const MEAL_TYPE_CATS = {
  'Breakfast': ['Breakfast'],
  'Lunch': ['Starter', 'Side'],
  'Dinner': ['Beef', 'Chicken', 'Lamb', 'Pork', 'Seafood', 'Pasta', 'Vegetarian', 'Vegan', 'Goat', 'Miscellaneous'],
  'Snacks': ['Starter', 'Side', 'Dessert'],
};

const HEART_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
const CLOCK_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
const USERS_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
const CHEF_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>';
const EXTERNAL_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>';

let favorites = JSON.parse(localStorage.getItem('gf_favorites') || '[]');
let recent = JSON.parse(localStorage.getItem('gf_recent') || '[]');
let allRecipes = [];
let categories = [];
let areas = [];

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.statusText);
  return r.json();
}

function parseMeal(raw) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = raw[`strIngredient${i}`];
    const measure = raw[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure?.trim() || '' });
    }
  }
  return {
    id: raw.idMeal,
    name: raw.strMeal,
    category: raw.strCategory || '',
    area: raw.strArea || '',
    instructions: raw.strInstructions || '',
    image: raw.strMealThumb || '',
    tags: raw.strTags ? raw.strTags.split(',').map(t => t.trim()) : [],
    youtube: raw.strYoutube || '',
    source: raw.strSource || null,
    ingredients,
  };
}

async function getRecipeById(id) {
  const data = await fetchJSON(`${MEALDB}/lookup.php?i=${id}`);
  return data.meals?.[0] ? parseMeal(data.meals[0]) : null;
}

async function searchRecipes(q) {
  const data = await fetchJSON(`${MEALDB}/search.php?s=${encodeURIComponent(q)}`);
  return (data.meals || []).map(parseMeal);
}

async function getRecipesByArea(area) {
  const filter = AREA_FILTER_MAP[area] || area;
  const data = await fetchJSON(`${MEALDB}/filter.php?a=${encodeURIComponent(filter)}`);
  const meals = data.meals || [];
  const recipes = await Promise.all(meals.slice(0, 12).map(m => getRecipeById(m.idMeal)));
  return recipes.filter(r => r);
}

async function getRecipesByCategory(cat) {
  const data = await fetchJSON(`${MEALDB}/filter.php?c=${encodeURIComponent(cat)}`);
  const meals = data.meals || [];
  const recipes = await Promise.all(meals.slice(0, 12).map(m => getRecipeById(m.idMeal)));
  return recipes.filter(r => r);
}

async function getCategories() {
  const data = await fetchJSON(`${MEALDB}/list.php?c=list`);
  return (data.meals || []).map(c => c.strCategory);
}

async function getAreas() {
  const data = await fetchJSON(`${MEALDB}/list.php?a=list`);
  return (data.meals || []).map(a => a.strArea);
}

function isFavorite(id) {
  return favorites.some(f => f.id === id);
}

function toggleFavorite(recipe) {
  const idx = favorites.findIndex(f => f.id === recipe.id);
  if (idx >= 0) {
    favorites.splice(idx, 1);
  } else {
    favorites.push(recipe);
  }
  localStorage.setItem('gf_favorites', JSON.stringify(favorites));
  updateFavCount();
  renderFavorites();
  renderRecipeCards();
}

function addRecent(recipe) {
  recent = recent.filter(r => r.id !== recipe.id);
  recent.unshift(recipe);
  if (recent.length > 10) recent = recent.slice(0, 10);
  localStorage.setItem('gf_recent', JSON.stringify(recent));
  renderRecent();
}

function updateFavCount() {
  const el = document.getElementById('fav-count');
  if (el) el.textContent = favorites.length;
}

function createRecipeCard(recipe, showFavBtn = true) {
  const fav = isFavorite(recipe.id);
  const div = document.createElement('div');
  div.className = 'recipe-card';
  div.innerHTML = `
    <div class="recipe-card-img">
      <img src="${recipe.image || 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'}"
           alt="${recipe.name}" loading="lazy"
           onerror="this.src='https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'">
      ${showFavBtn ? `<button class="fav-btn ${fav ? 'active' : ''}" data-id="${recipe.id}" aria-label="Toggle favorite">
        ${HEART_SVG}
      </button>` : ''}
    </div>
    <div class="recipe-card-body">
      <div class="recipe-card-tags">
        <span class="badge-category">${recipe.category || 'Recipe'}</span>
        <span class="badge-country">${recipe.area || 'World'}</span>
      </div>
      <h3 class="recipe-card-title">${recipe.name}</h3>
      <p class="recipe-card-desc">${(recipe.instructions || '').slice(0, 100).replace(/\n/g, ' ')}...</p>
      <div class="recipe-card-meta">
        <span>${CHEF_SVG} ${recipe.ingredients.length} ingredients</span>
        <span>${EXTERNAL_SVG}</span>
      </div>
    </div>
  `;
  div.addEventListener('click', (e) => {
    if (e.target.closest('.fav-btn')) return;
    openModal(recipe);
  });
  const favBtn = div.querySelector('.fav-btn');
  if (favBtn) {
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(recipe);
      favBtn.classList.toggle('active');
    });
  }
  return div;
}

function renderRecipeCards(container, recipes) {
  container.innerHTML = '';
  recipes.forEach(r => container.appendChild(createRecipeCard(r)));
}

function renderFavorites() {
  const grid = document.getElementById('favorites-grid');
  const empty = document.getElementById('favorites-empty');
  if (!grid) return;
  grid.innerHTML = '';
  if (favorites.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    empty.style.display = 'none';
    favorites.forEach(r => grid.appendChild(createRecipeCard(r)));
  }
}

function renderRecent() {
  const grid = document.getElementById('recent-grid');
  const empty = document.getElementById('recent-empty');
  if (!grid) return;
  grid.innerHTML = '';
  if (recent.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    empty.style.display = 'none';
    recent.forEach(r => grid.appendChild(createRecipeCard(r)));
  }
}

function renderCountries() {
  const grid = document.getElementById('country-grid');
  if (!grid) return;
  grid.innerHTML = '';
  FEATURED_AREAS.forEach(country => {
    const btn = document.createElement('button');
    btn.className = 'country-card';
    btn.innerHTML = `
      <img src="${AREA_IMAGES[country] || 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'}"
           alt="${country}" loading="lazy">
      <div class="country-card-overlay">
        <div class="country-card-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${country}
        </div>
        <h3 class="country-card-name">${country}</h3>
        <div class="country-card-hint">
          <span>Explore recipes</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    `;
    btn.addEventListener('click', () => handleCountryClick(country, btn));
    grid.appendChild(btn);
  });
}

let selectedCountry = null;

async function handleCountryClick(country, btn) {
  const container = document.getElementById('country-recipes');
  const grid = document.getElementById('country-recipes-grid');
  const loading = document.getElementById('country-loading');
  const name = document.getElementById('country-name');
  const allBtns = document.querySelectorAll('.country-card');

  if (selectedCountry === country) {
    selectedCountry = null;
    container.style.display = 'none';
    allBtns.forEach(b => b.classList.remove('active'));
    return;
  }

  selectedCountry = country;
  allBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  container.style.display = 'block';
  name.textContent = country + ' Recipes';
  grid.innerHTML = '';
  loading.style.display = 'block';

  try {
    const recipes = await getRecipesByArea(country);
    loading.style.display = 'none';
    recipes.forEach(r => grid.appendChild(createRecipeCard(r)));
  } catch {
    loading.style.display = 'none';
    grid.innerHTML = '<p class="no-results">No recipes found for ' + country + '.</p>';
  }
}

function openModal(recipe) {
  addRecent(recipe);
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const fav = isFavorite(recipe.id);

  const instructions = (recipe.instructions || '').split('\n').filter(l => l.trim()).map(l => `<p>${l.trim()}</p>`).join('');
  const ingredients = recipe.ingredients.map(ing => `
    <div class="ingredient-item">
      <span class="ingredient-dot"></span>
      <span>${ing.measure} ${ing.name}</span>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="modal-hero">
      <img src="${recipe.image || 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'}"
           alt="${recipe.name}" onerror="this.src='https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'">
      <div class="modal-hero-overlay">
        <h2 class="modal-title">${recipe.name}</h2>
      </div>
    </div>
    <div class="modal-tags">
      <span class="badge-category">${recipe.category || 'Recipe'}</span>
      <span class="badge-country">${recipe.area || 'World'}</span>
    </div>
    <div class="modal-meta">
      <div class="modal-meta-item">${CLOCK_SVG} 30-45 min</div>
      <div class="modal-meta-item">${USERS_SVG} 4 servings</div>
      <div class="modal-meta-item">${CHEF_SVG} ${recipe.ingredients.length} ingredients</div>
    </div>
    <div class="modal-section">
      <h3>${CHEF_SVG} Ingredients</h3>
      <div class="ingredients-list">${ingredients}</div>
    </div>
    <div class="modal-section">
      <h3>${CLOCK_SVG} Instructions</h3>
      <div class="instructions-text">${instructions}</div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-fav ${fav ? 'active' : ''}" id="modal-fav-btn">
        ${HEART_SVG} ${fav ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <a href="${recipe.source || '#' /* View source */}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        ${EXTERNAL_SVG} View Source
      </a>
    </div>
  `;

  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const favBtn = document.getElementById('modal-fav-btn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      toggleFavorite(recipe);
      favBtn.classList.toggle('active');
      favBtn.innerHTML = `${HEART_SVG} ${isFavorite(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}`;
    });
  }
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

function renderActiveFilters() {
  const container = document.getElementById('active-filters');
  const cat = document.getElementById('category-filter').value;
  const area = document.getElementById('area-filter').value;
  const mt = document.getElementById('mealtype-filter').value;
  const letter = document.getElementById('letter-filter')?.value || '';

  let html = '';
  if (cat) html += `<span class="badge bg-primary-100 text-primary-700">${cat}</span>`;
  if (area) html += `<span class="badge bg-accent-100 text-accent-700">${area}</span>`;
  if (mt) html += `<span class="badge bg-green-100 text-green-700">${mt}</span>`;
  if (letter) html += `<span class="badge bg-gray-100 text-gray-700">Letter: ${letter}</span>`;
  if (html) html += `<button id="clear-filters" class="text-sm text-red-500 hover:text-red-600 ml-2" style="background:none;border:none;cursor:pointer;">Clear all</button>`;
  container.innerHTML = html;

  const clearBtn = document.getElementById('clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.getElementById('category-filter').value = '';
      document.getElementById('area-filter').value = '';
      document.getElementById('mealtype-filter').value = '';
      const lf = document.getElementById('letter-filter');
      if (lf) lf.value = '';
      renderActiveFilters();
      runSearch();
    });
  }
}

async function runSearch() {
  const query = document.getElementById('search-input').value.trim();
  const cat = document.getElementById('category-filter').value;
  const area = document.getElementById('area-filter').value;
  const mt = document.getElementById('mealtype-filter').value;
  const grid = document.getElementById('results-grid');
  const loading = document.getElementById('search-loading');
  const noResults = document.getElementById('no-results');

  if (!query && !cat && !area && !mt) {
    grid.innerHTML = '';
    noResults.style.display = 'none';
    return;
  }

  loading.style.display = 'block';
  noResults.style.display = 'none';
  grid.innerHTML = '';

  let recipes = [];
  try {
    if (query) {
      recipes = await searchRecipes(query);
    } else if (cat) {
      recipes = await getRecipesByCategory(cat);
    } else if (area) {
      recipes = await getRecipesByArea(area);
    } else {
      recipes = await searchRecipes('a');
    }

    if (cat && recipes.length) {
      recipes = recipes.filter(r => r.category === cat);
    }
    if (area && recipes.length) {
      recipes = recipes.filter(r => r.area === area);
    }
    if (mt && recipes.length) {
      const allowed = MEAL_TYPE_CATS[mt] || [];
      recipes = recipes.filter(r => allowed.includes(r.category));
    }
    const letter = document.getElementById('letter-filter')?.value;
    if (letter && recipes.length) {
      recipes = recipes.filter(r => r.name.toUpperCase().startsWith(letter));
    }
  } catch {
    recipes = [];
  }

  loading.style.display = 'none';
  if (recipes.length === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
    recipes.forEach(r => grid.appendChild(createRecipeCard(r)));
  }

  renderActiveFilters();
}

// Init
async function init() {
  updateFavCount();
  renderFavorites();
  renderRecent();
  renderCountries();

  // Load categories and areas
  try {
    categories = await getCategories();
    areas = await getAreas();

    const catSelect = document.getElementById('category-filter');
    categories.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      catSelect.appendChild(opt);
    });

    const areaSelect = document.getElementById('area-filter');
    areas.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a;
      opt.textContent = a;
      areaSelect.appendChild(opt);
    });
  } catch {}

  // Pre-load trending
  try {
    const trending = await searchRecipes('a');
    allRecipes = trending;
    const searchGrid = document.getElementById('results-grid');
    if (searchGrid && !document.getElementById('search-input').value) {
      trending.slice(0, 8).forEach(r => searchGrid.appendChild(createRecipeCard(r)));
    }
  } catch {}

  // Event listeners
  document.getElementById('search-input').addEventListener('input', debounce(runSearch, 400));
  document.getElementById('category-filter').addEventListener('change', runSearch);
  document.getElementById('area-filter').addEventListener('change', runSearch);
  document.getElementById('mealtype-filter').addEventListener('change', runSearch);
  const lf = document.getElementById('letter-filter');
  if (lf) lf.addEventListener('change', runSearch);

  const heroInput = document.getElementById('hero-search-input');
  const heroBtn = document.getElementById('hero-search-btn');
  if (heroInput) {
    heroInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && heroInput.value.trim()) {
        document.getElementById('search-input').value = heroInput.value.trim();
        runSearch();
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      if (heroInput.value.trim()) {
        document.getElementById('search-input').value = heroInput.value.trim();
        runSearch();
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  document.getElementById('close-country').addEventListener('click', () => {
    selectedCountry = null;
    document.getElementById('country-recipes').style.display = 'none';
    document.querySelectorAll('.country-card').forEach(b => b.classList.remove('active'));
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('gf_theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('gf_theme', isDark ? 'light' : 'dark');
  });

  // Back to top
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

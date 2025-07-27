# Framework di Sviluppo - DogsAndCats

## 1. Stack Tecnologico

### 1.1 Frontend
#  Frontend Guidelines - CSS3 & Vanilla JavaScript

Documento di riferimento per lo sviluppo frontend della **Piattaforma dogsandcats** usando **CSS3 puro** e **Vanilla JavaScript**, garantendo accessibilità e markup semantico.

---

## 1. Struttura HTML Semantica

1. Usa tag HTML5 appropriati (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
2. Ogni pagina deve avere un solo `<h1>`; usa titoli annidati (`<h2>…<h6>`) per sottosezioni.
3. Liste: usa `<ul>`/`<ol>` per elenchi puntati/ordinati.
4. Tabelle di dati reali: usa `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
5. Moduli: usa `<form>`, `<fieldset>`, `<legend>`, `<label for="id">`, `<input>`, `<textarea>`, `<button>`.
6. Link: `<a href="...">` con testo descrittivo (no “clicca qui”).
7. Immagini: `<img src="..." alt="Descrizione alt testuale">` e `<figure>/<figcaption>` per illustrazioni complesse.

---

## 2. CSS3 Architecture & Naming

### 2.1 Reset & Base Styles

* Includi un reset minimal (es. normalize.css manuale) all’inizio.
* Definisci variabili CSS (`:root { --primary-color: #...; }`).
* Stili base per `body`, `p`, `a`, `button`, `form`, ecc.

### 2.2 Naming Conventions (BEM)

* Blocchi: `.block {}`
* Elementi: `.block__element {}`
* Modificatori: `.block--modifier {}` o `.block__element--modifier {}`

*Esempio:*

```css
.header {}
.header__logo {}
.header__nav {}
.header__nav--mobile { display: none; }
```

### 2.3 Organizzazione File CSS

```
/css
├── reset.css       /* reset e base styles */
├── variables.css   /* custom properties */
├── layout.css      /* grid, flex, container */
├── components/
│   ├── header.css
│   ├── button.css
│   ├── card.css
│   └── form.css
└── utilities.css   /* helper classes (.sr-only, .visually-hidden) */
```

---

## 3. Responsive Design

1. Usa layout Fluid/Flexible e unità relative (`rem`, `%`, `vh`, `vw`).
2. Media query mobile-first:

```css
@media (min-width: 768px) {
  /* tablet+ */
}
@media (min-width: 1024px) {
  /* desktop+ */
}
```

3. Flexbox e CSS Grid per layout avanzati.
4. Immagini e media fluidi: `max-width: 100%; height: auto;`.

---

## 4. Accessibilità (WCAG 2.1 AA)

1. Contrasto colori sufficiente (WCAG AA: ratio ≥ 4.5:1 per testo normale).
2. Focus visibile per interattivi (`:focus { outline: 2px solid var(--primary-color); }`).
3. Ruoli ARIA minimi e labels: `role="navigation"`, `aria-label="Menu principale"`.
4. Componenti custom accessibili (menu, modali, dropdown) devono gestire tab-index, focus trapping e tasti ESC.
5. Usa `.visually-hidden` per testo solo screen reader:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

---

## 5. Vanilla JavaScript Best Practices

### 5.1 Organizzazione File

```plaintext
/js
├── utils.js        /* funzioni di utilità */
├── api.js          /* chiamate fetch */
├── dom.js          /* helper DOM manipulation */
├── components/
│   ├── modal.js
│   ├── carousel.js
│   └── form-validation.js
└── main.js         /* entry point */
```

### 5.2 Modularità & Pattern

1. Usa **ES6 Modules** (`import`/`export`) per separare responsabilità.
2. Evita variabili globali: incapsula in IIFE o moduli.
3. Usa `const` e `let`; evita `var`.
4. Promesse e `async/await` per chiamate asincrone:

```js
// api.js
export async function fetchAnimals() {
  const res = await fetch('/api/animals');
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
```

### 5.3 DOM Manipulation & Event Handling

1. Selettori semantici:`document.querySelector('[data-js="button-submit"]')`.
2. Event delegation dove possibile:

```js
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.btn--delete')) handleDelete(e);
});
```

3. Gestione dello stato con classi CSS (`.is-active`, `.is-hidden`).
4. Accesso keyboard-friendly: `element.tabIndex = 0` e listener `keydown`.

---

## 6. Performance & Progressive Enhancement

1. Minifica e concatena CSS/JS in produzione.
2. Caricamento asincrono JS (`<script defer src="main.js"></script>`).
3. Lazy-load immagini (`loading="lazy"`).
4. Contenuto critico inline nel `<head>` (critical CSS).
5. Fallback HTML per utenti senza JS.

---

## 7. Testing & Validazione

1. Validatore HTML e CSS (W3C).
2. Lighthouse: performance, accessibilità, SEO.
3. Test manuali con screen reader (NVDA, VoiceOver).
4. Cross-browser: Chrome, Firefox, Safari, Edge.

---

*Fine Frontend Guidelines per dogsandcats*


### 1.2 Backend
<!-- Descrivi le tecnologie backend utilizzate -->
# Laravel (PHP 8.3)

# Laravel Package Development Guide (PHP 8.3)

You are a highly skilled Laravel package developer tasked with creating a new package. Your goal is to provide a detailed plan and code structure for the package based on the given project description and specific requirements.

## Development Guidelines
- **PHP 8.3+ Features**: Utilize PHP 8.3+ features where appropriate to leverage the latest language improvements.
- **Laravel Conventions**: Follow Laravel conventions and best practices to ensure consistency and maintainability.
- **Spatie Package Tools**: Use the `spatie/laravel-package-tools` boilerplate as a starting point for streamlined package development.
- **Pint Configuration**: Implement a default Pint configuration for consistent code styling.
- **Helpers Over Facades**: Prefer using helpers over facades when possible for better readability and simplicity.
- **Developer Experience (DX)**: Focus on creating code that provides excellent developer experience, including better autocompletion, type safety, and comprehensive docblocks.

## Coding Standards and Conventions
- **File Names**: Use kebab-case (e.g., `my-class-file.php`).
- **Class and Enum Names**: Use PascalCase (e.g., `MyClass`).
- **Method Names**: Use camelCase (e.g., `myMethod`).
- **Variable and Property Names**: Use snake_case (e.g., `my_variable`).
- **Constants and Enum Cases**: Use SCREAMING_SNAKE_CASE (e.g., `MY_CONSTANT`).

## Package Structure and File Organization
- **Directory Structure**:
  - `src/`: Core package logic and classes.
  - `config/`: Configuration files for the package.
  - `database/`: Migrations and seeders.
  - `resources/`: Views, assets, and other resources.
  - `tests/`: Unit and feature tests.
  - `routes/`: API and web routes.
  - `lang/`: Language files for localization.
- **Integration**: Explain how the package will be integrated into a Laravel application, including service providers, facades, and configuration publishing.

## Testing and Documentation
- **Testing Strategy**:
  - **Unit Tests**: Test individual components and methods.
  - **Feature Tests**: Test the package's functionality within a Laravel application.
- **Documentation Structure**:
  - **README.md**: Overview, installation instructions, and basic usage.
  - **Usage Examples**: Detailed examples of how to use the package.
  - **API References**: Comprehensive documentation of all public methods and classes.

Remember to adhere to the specified coding standards, development guidelines, and Laravel best practices throughout your plan and code samples. Ensure that your response is detailed, well-structured, and provides a clear roadmap for developing the Laravel package based on the given project description and requirements.


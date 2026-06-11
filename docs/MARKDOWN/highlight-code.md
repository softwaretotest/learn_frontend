## highlight code in MD

## 🎨 How to Fix Code Highlighting in Docusaurus (.env and Bash/CMD)

By default, Docusaurus does not highlight `.env` files or terminal commands (`bash`, `cmd`). You need to add them to your configuration file.

---

## 🛠️ Step-by-Step Fix

1. Open **`docusaurus.config.js`** (or `docusaurus.config.ts`) at the root of your Docusaurus project.
2. Find the `themeConfig` section, then look for `prism`.
3. Add `'ini'` and `'bash'` to the `additionalLanguages` array.

### Configuration Example:

```javascript
module.exports = {
    // ... other configs
    themeConfig: {
        // ... other theme configs
        prism: {
            theme: require("prism-react-renderer/themes/github"),
            darkTheme: require("prism-react-renderer/themes/dracula"),

            // 👇 ADD THIS LINE TO ENABLE HIGHLIGHTING
            additionalLanguages: ["ini", "bash", "php", "json"],
        },
    },
};
```

---

## 📝 Correct Code Block Tags to Use

After updating the config, make sure you use the correct tags in your Markdown (`.md`) files:

### 1. For .env files (Use `ini`)

````markdown
```ini
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
```
````

### 2. For Terminal Commands / Bash / CMD (Use `bash`)

````markdown
```bash
cd my-ecommerce
composer require laravel/breeze --dev
php artisan migrate
```
````

---

💡 **Note:** After saving `docusaurus.config.js`, you must **restart your Docusaurus development server** (`npm run start`) for the changes to take effect.

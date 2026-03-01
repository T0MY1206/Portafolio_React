# Portfolio React

Portfolio web moderno y responsive hecho con React, TypeScript y Vite. Incluye modo oscuro/claro, soporte multiidioma (inglés/español), formulario de contacto con EmailJS y diseño profesional.

## 🚀 Tech Stack

- **React 18** – UI
- **TypeScript** – Tipado
- **Vite** – Build y dev server
- **React Router** – Navegación
- **EmailJS** – Envío de mensajes del formulario de contacto

## ✨ Features

- 🌓 Modo oscuro/claro con persistencia en `localStorage`
- 🌍 Multiidioma (EN/ES) con Context API
- 📱 Diseño responsive
- ⚡ Alta performance con Vite
- ♿ Accesible y amigable para SEO
- 📧 Formulario de contacto con validación y envío por EmailJS
- 📊 Secciones: Home, About, Experience, Skills, Projects, Contact

## 📁 Estructura del proyecto

```
portfolio-react/
├── public/
├── src/
│   ├── components/    # Layout, Navbar, Footer, Mascot
│   ├── pages/        # Home, About, Experience, Skills, Projects, Contact
│   ├── context/      # LanguageContext
│   ├── hooks/        # useTheme
│   ├── i18n/         # translations.json
│   ├── data/         # profile.json
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example      # Ejemplo de variables de entorno
├── .github/workflows/ # Deploy a GitHub Pages
├── package.json
└── vite.config.ts
```

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd Portafolio_React
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Variables de entorno** (ver sección siguiente)
   ```bash
   copy .env.example .env
   ```
   Editar `.env` con tus valores.

4. **Arrancar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Build para producción**
   ```bash
   npm run build
   ```

6. **Previsualizar el build**
   ```bash
   npm run preview
   ```

---

## ⚙️ Configuración

### Variables de entorno

En la raíz del proyecto existe `.env.example`. Copialo a `.env` y completá los valores. **No subas `.env` a Git** (está en `.gitignore`).

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `VITE_EMAILJS_PUBLIC_KEY` | Sí (para contacto) | Public Key de tu cuenta EmailJS |
| `VITE_EMAILJS_SERVICE_ID` | Sí (para contacto) | ID del servicio de email (Gmail/Outlook) |
| `VITE_EMAILJS_TEMPLATE_ID` | Sí (para contacto) | ID de la plantilla de email |
| `VITE_MASCOT_ENABLED` | No | `true` o `false` – mostrar u ocultar la mascota (por defecto: visible) |
| `VITE_DEFAULT_THEME` | No | `light` o `dark` – tema por defecto si el usuario no tiene preferencia guardada |

Cualquier variable que empiece con `VITE_` se lee en el código con `import.meta.env.VITE_NOMBRE`.

---

### Configurar EmailJS (formulario de contacto)

Para que los mensajes del formulario lleguen a tu correo:

1. **Cuenta EmailJS**  
   Crear cuenta o iniciar sesión en [emailjs.com](https://www.emailjs.com/).

2. **Servicio de email**  
   - En el menú: **Email Services** → **Add New Service**.  
   - Elegir **Gmail** u **Outlook** y conectar tu cuenta.  
   - Anotar el **Service ID** (ej: `service_abc123`).

3. **Plantilla de email**  
   - **Email Templates** → **Create New Template**.  
   - **Name**: ej. `Contact portfolio`.  
   - **Content** (cuerpo). Usar exactamente estas variables:
     - `{{from_name}}` – nombre de quien escribe  
     - `{{from_email}}` – correo de quien escribe  
     - `{{message}}` – mensaje  

     Ejemplo de cuerpo:
     ```
     Nuevo mensaje desde el portafolio.

     Nombre: {{from_name}}
     Email: {{from_email}}

     Mensaje:
     {{message}}
     ```
   - **Subject**: ej. `Mensaje del portafolio - {{from_name}}`.  
   - **To email**: tu correo para recibir los mensajes.  
   - Anotar el **Template ID** (ej: `template_xyz789`).

4. **Public Key**  
   En **Account** → **General** (o API), copiar la **Public Key** (User ID).

5. **Completar `.env`**
   ```env
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   ```

6. **Probar**  
   Reiniciar `npm run dev`, ir a Contact, enviar un mensaje y revisar tu bandeja (y spam). En EmailJS, **History** muestra si el envío se registró o falló.

---

## 📦 Despliegue en GitHub Pages

El repo incluye un workflow en `.github/workflows/deploy.yml` que hace build y despliega en GitHub Pages en cada push a `main`.

### Por qué no se sube el `.env`

El archivo `.env` no se sube al repositorio (está en `.gitignore`) para no exponer claves. En GitHub Actions el build se ejecuta en los servidores de GitHub, donde no existe tu `.env` local. Por eso hay que configurar **Secrets** y **Variables** en el repositorio.

### Cómo configurar Secrets y Variables en GitHub

1. En el repo: **Settings** → **Security** → **Secrets and variables** → **Actions**.

2. **Secrets** (datos sensibles; no se muestran en logs):
   - **New repository secret** y crear estos tres (los usa el workflow):
     - `VITE_EMAILJS_PUBLIC_KEY` → Public Key de EmailJS  
     - `VITE_EMAILJS_SERVICE_ID` → ID del servicio  
     - `VITE_EMAILJS_TEMPLATE_ID` → ID de la plantilla  

3. **Variables** (config no sensible; opcional):
   - Pestaña **Variables** → **New repository variable**.  
   - Si querés fijar comportamiento en producción:
     - `VITE_MASCOT_ENABLED` → `true` o `false`  
     - `VITE_DEFAULT_THEME` → `light` o `dark`  
   - Si no las creás, la mascota se muestra y el tema usa la preferencia del sistema.

4. Tras guardar Secrets (y opcionalmente Variables), el próximo push a `main` hará el build con esos valores y el formulario de contacto funcionará en GitHub Pages.

### Si no configurás nada en GitHub

- El sitio se despliega igual.  
- El formulario de contacto **no** enviará correos (las claves quedarán `undefined` en el build).  
- Mascota y tema usan los valores por defecto (mascota visible, tema según sistema).

---

## 🎨 Personalización

- **Datos del perfil:** editar `src/data/profile.json`.  
- **Textos e idiomas:** editar `src/i18n/translations.json`.  
- **Colores del tema:** variables CSS en `src/index.css`.

---

## 👤 Autor

**Tomas Tutor Onetto**  
Email: tomas2000tutor@gmail.com · Ubicación: Buenos Aires, Argentina

---

## 📄 Licencia

Proyecto de código abierto bajo MIT License.

# 🧾 Keynua Contract Creator — Frontend

Aplicación web desarrollada en **Next.js 14 + TypeScript + ShadCN UI + React Query**, que permite crear contratos a través del API de **Keynua** y visualizar el detalle del contrato creado (firmantes, documentos, etapas, etc).

---

## 🚀 Tecnologías principales

- ⚛️ **Next.js 16 (App Router)**
- 🧩 **TypeScript**
- 🎨 **TailwindCSS + ShadCN UI**
- 🔄 **TanStack React Query**
- 🧠 **Zod + React Hook Form**
- 📦 **Axios**
- 📁 **PNPM (Package Manager)**

---

## ⚙️ Instalación y configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/keynua-contracts-frontend.git
cd keynua-contracts-frontend
```

### 2️⃣ Instalar dependencias

```bash
pnpm install
```

### 3️⃣ Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con lo siguiente:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api-v1
```

*(El backend NestJS debe estar corriendo en ese puerto y prefijo global)*

---

## 🧩 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `pnpm dev` | Inicia el servidor de desarrollo (http://localhost:3000) |
| `pnpm build` | Genera la build de producción |
| `pnpm start` | Inicia la aplicación en modo producción |
| `pnpm lint` | Analiza el código con Biome o ESLint |
| `pnpm format` | Formatea el código automáticamente |

---

## 💡 Flujo de funcionamiento

1. **Formulario de creación**  
   - Se ingresan datos del contrato (título, descripción, expiración, etc).  
   - Se cargan archivos PDF y se convierten a Base64.  
   - Se definen firmantes según el canal de notificación (Email, WhatsApp, SMS).

2. **Creación del contrato**  
   - El frontend envía el payload al backend NestJS (`POST /contracts/create`),  
     el cual conecta con el **API de Keynua**.

3. **Visualización del contrato creado**  
   - Al crearse el contrato, se obtiene el `id`.  
   - El usuario es redirigido a `/contracts/:id` donde se muestran los datos completos:
     - Información general del contrato  
     - Firmantes  
     - Documentos  
     - Etapas del proceso

---

## 🧠 Estructura principal

```
/modules/contract/
├── components/
│   ├── ContractFormMain.tsx
│   ├── ContractFirmantes.tsx
│   ├── contract-section-document-data.tsx
│   ├── contract-section-upload-files.tsx
│   ├── contract-reminder-alerts.tsx
│   └── contract-signature-process.tsx
├── schema/
│   └── contract-schema.ts
├── services/
│   ├── contract-api.service.ts
│   ├── contract-query.ts
│   └── contract-mutation.ts
├── utils/
│   ├── prepare-contract-payload.ts
│   └── clean-type-notification.ts
└── states/
    └── contract-form.states.ts
```

---

## 🧪 Ejecución local

### Backend
Asegúrate de tener tu API de **NestJS** corriendo:

```bash
pnpm start:dev
```

### Frontend
En otra terminal, levanta el proyecto de React/Next.js:

```bash
pnpm dev
```

Abre en tu navegador: 👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧰 Herramientas adicionales

- **React Hook Form + Zod** para validaciones reactivas.  
- **ShadCN UI** para componentes accesibles y personalizables.  
- **React Query** para manejo de cache y fetching eficiente.  
- **Sonner** para notificaciones UX.  

---

## 📸 Capturas

📘 **Formulario de creación de contrato**
> Carga de documentos, firmantes y configuraciones.

📄 **Detalle del contrato**
> Visualiza la información completa del contrato recién creado.

*(Agrega tus screenshots en `/public/screenshots` y enlázalas aquí)*

---

## 🧑‍💻 Autor

**Desarrollado por:** Rodrigo Rumpler  
📧 [rodrigo@example.com](mailto:javier.fullstack.qr@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/javier-rojas-287989209/) · [GitHub](https://github.com/JavierLQR?tab=repositories)

---

## 🛠️ Licencia

Este proyecto es de uso educativo y demostrativo — no oficial de Keynua.  
Puedes modificarlo o extenderlo libremente para pruebas técnicas o portafolio.
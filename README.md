# TB1 - App Comercial

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Components Documentation](#components-documentation)
- [Views](#views)
- [Data Models](#data-models)
- [Styles](#styles)
- [Development](#development)
- [Roadmap](#roadmap)

---

## 📖 Overview

**TB1 - App Comercial** is an enterprise web application built with Angular 20.3.0 for comprehensive commercial activity management, client tracking, and sales team productivity monitoring. The system enables client portfolio management, activity scheduling, commercial opportunity tracking, and team performance monitoring.

### Project Context

Developed as part of the "Web Environment Development" course at Universidad Peruana de Ciencias Aplicadas (UPC) during the 2025-2 cycle. The project simulates a real CRM (Customer Relationship Management) system used in B2B service companies.

---

## ✨ Features

### Main Functionalities

- **Client Management**: Complete CRUD of companies with detailed information (tax data, contacts, locations)
- **Commercial Tracking**: Customer interaction tracking system
- **Activity History**: Chronological record of all activities with each client
- **Document Management**: Upload and management of protocols and quotations
- **Daily Agenda**: View of scheduled activities for the current date
- **Pending Management**: Tracking of accumulated and forgotten tasks with advanced filters
- **Supervisor Assignment**: Weekly calendar to assign and visualize team activities
- **Closed Dashboard**: Closed contract metrics with visualizations
- **Daily Productivity**: Individual performance monitoring with comparative charts

### Technical Features

- **Standalone Components Architecture**: Uses Angular 20's new standalone architecture
- **Reactive Forms**: Real-time validations with Angular Forms
- **Two-way Data Binding**: Automatic synchronization between view and model
- **Dynamic Filters**: Multi-criteria filtering system
- **Responsive Design**: Adaptive interface using Bootstrap 5.3.8
- **Tab Navigation System**: Multiple navigation levels
- **Edit States**: Granular control of editing permissions per section

---

## 🛠️ Technologies

### Frontend Framework

- **Angular 20.3.0**: Main framework
  - `@angular/core`: Core framework
  - `@angular/common`: Common directives (NgIf, NgFor)
  - `@angular/forms`: Reactive and template-driven forms
  - `@angular/router`: Routing system
  - `@angular/platform-browser`: Browser rendering

### UI Framework

- **Bootstrap 5.3.8**: CSS framework
  - Grid system for responsive layouts
  - Pre-designed components (cards, buttons, tables)
  - Spacing and typography utilities

### Build & Development Tools

- **Angular CLI 20.3.10**: Command line tool
- **TypeScript 5.9.2**: Programming language
- **esbuild**: Ultra-fast bundler
- **Karma + Jasmine**: Testing framework

---

## 📁 Project Structure

```
TB1/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── app-comercial/
│   │   │       ├── app-comercial.ts    (642 lines) - Component logic
│   │   │       ├── app-comercial.html  (1570+ lines) - HTML template
│   │   │       └── app-comercial.css   (366 lines) - Component styles
│   │   ├── app.ts           - Root component
│   │   ├── app.html         - Root template
│   │   ├── app.config.ts    - App configuration
│   │   └── app.routes.ts    - Route definitions
│   ├── index.html           - Main HTML
│   ├── main.ts              - Entry point
│   └── styles.css           - Global styles
├── public/                  - Static assets
├── angular.json             - Angular configuration
├── package.json             - Dependencies
├── tsconfig.json            - TypeScript config
└── README.md                - This file
```

---

## 🚀 Installation

### Prerequisites

- **Node.js**: v18.19 or higher
- **npm**: v9.0 or higher
- **Git**: For cloning the repository

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/TB1.git
cd TB1
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm start
# or
ng serve --open
```

The application will be available at `http://localhost:4200/`

---

## 📖 Usage Guide

### Main Navigation

The application has 7 main views accessible from the top tab bar:

1. **BÚSQUEDA**: Default view to search and manage clients
2. **AGENDA DEL DÍA**: Activities scheduled for today
3. **PENDIENTES ACUMULADOS**: Pending tasks with filters
4. **PENDIENTES OLVIDADOS**: Overdue tasks
5. **ASIG. SUPERVISOR**: Team assignment calendar
6. **CERRADOS**: Closed contracts dashboard
7. **PROD. DÍA**: Team productivity

### Typical Workflow

#### 1. Search and Select Client

```
Sidebar → Search Client → Select from list → View details
```

- Use search field to filter by name, contact, phone, or user
- Click on a table row to select the client
- Data loads automatically in tabs

#### 2. Manage Company Data

```
Tab "DATOS EMPRESA" → Edit → Modify fields → Save
```

- Click "Editar" to enable fields
- Modify necessary information
- Click "Guardar" to persist changes
- Click "Cancelar" to discard changes

#### 3. Record Tracking

```
Tab "SEGUIMIENTO" → Edit → Complete form → Save
```

- Register client type, communication, and status
- Add detailed observations
- Save to update record

---

## 🧩 Components Documentation

### AppComercialComponent

**Location**: `src/app/pages/app-comercial/app-comercial.ts`

#### Main Properties

```typescript
// Navigation
viewTabs: string[] - 7 main views
activeView: number - Active view (0-6)
tabs: string[] - 4 sub-tabs
activeTab: number - Active tab (0-3)

// Edit States
isEditMode: boolean - Company data edit mode
isSeguimientoEditMode: boolean - Tracking edit mode
isHistoricoEditMode: boolean - History edit mode
isProtocolosEditMode: boolean - Protocols edit mode

// Reactive Forms
datosEmpresaForm: FormGroup - Company data form with validations
seguimientoForm: FormGroup - Tracking form

// Data
companies: Company[] - List of companies
selected: Company - Currently selected company
pendientesOlvidados: Pendiente[] - Forgotten pending tasks
pendientesAcumulados: Pendiente[] - Accumulated pending tasks
prodDiaUsers: ProdDiaUser[] - Daily productivity users
```

#### Main Methods

```typescript
// Navigation
selectCompany(c: Company): void - Select a company
onSearchChange(value: string): void - Update search filter

// Company Data Management
editarEmpresa(): void - Enable company form editing
guardarEmpresa(): void - Save company data
cancelarEdicion(): void - Cancel company editing

// Tracking Management
editarSeguimiento(): void - Enable tracking form editing
guardarSeguimiento(): void - Save tracking data
cancelarSeguimiento(): void - Cancel tracking editing

// History Management
agregarRegistroHistorico(): void - Add new history record
editarHistorico(index: number): void - Edit history record
guardarHistorico(index: number): void - Save history record
cancelarHistorico(): void - Cancel history editing
eliminarHistorico(index: number): void - Delete history record

// Document Management
agregarProtocolo(): void - Add new protocol
agregarCotizacion(): void - Add new quotation

// Computed Properties
get filteredCompanies(): Company[] - Filtered companies by search
get companiesAgendaHoy(): Company[] - Today's scheduled companies
get filteredPendientesOlvidados(): Pendiente[] - Filtered forgotten tasks
get filteredPendientesAcumulados(): Pendiente[] - Filtered accumulated tasks

// Utilities
getUltimaFechaContacto(company: Company): string - Get last contact date
parseFecha(fecha: string): Date - Parse DD/MM/YYYY date
limpiarFiltrosOlvidados(): void - Clear forgotten tasks filters
limpiarFiltrosAcumulados(): void - Clear accumulated tasks filters
agregarNuevaEmpresa(): void - Add new company
```

---

## 🎨 Views

### 1. BÚSQUEDA (Search) - activeView === 0

**Purpose**: Main view to search, select and manage clients.

**Components**:
- **Left Sidebar**:
  - Real-time search field
  - Campaign selector (POTENCIALES)
  - User selector (MVELASQUEZ)
  - Quick actions
  
- **Main Area**:
  - **Companies Table**: Scrollable list (max 4 visible rows)
    - Columns: Company, Contact, Phone, User
    - Row selection by click
    - "New Client" button
    
  - **Secondary Tabs**:
    1. **DATOS EMPRESA**: 13-field form
       - Identification: Business Name, RUC, Main Office, Address
       - Contact: Name, Position, Email, Phone
       - Classification: Company Type, Workers, Economic Activity, Risk, Offices
       - Buttons: Edit/Save/Cancel (bottom right corner)
    
    2. **SEGUIMIENTO**: 12-field form + observations
       - 2-column grid
       - Fields: Client Type, 1st Contact Date, Communication Type, Portfolio Type, Business Line, Client Status, Sub-line, Status Detail, Credit Type, Call Type, Budget
       - Textarea for observations
       - Buttons: Edit/Save/Cancel
    
    3. **HISTORICO**: Activities table
       - Columns: Date, Status, Contact, User, Actions
       - Inline editing per row
       - Buttons: Add/Edit/Delete per record
    
    4. **PROTOCOLOS Y COTIZACIONES**: Two independent sections
       - Protocols Sent by Client (table)
       - Quotations Sent to Client (table)
       - Columns: Date, Path, Name, User, Actions
       - Buttons: Add Protocol, Add Quotation

### 2. AGENDA DEL DÍA (Daily Agenda) - activeView === 1

**Purpose**: Show all companies with activities scheduled for today.

**Differences from BÚSQUEDA**:
- Table automatically filtered by current date
- Dynamic header: "AGENDA DEL DÍA - {today's date}"
- Same tab and form system as BÚSQUEDA

### 3. PENDIENTES ACUMULADOS (Accumulated Pending) - activeView === 2

**Purpose**: Manage pending tasks with filter system.

**Components**:
- **Filter Bar**:
  - Priority: Dropdown (All, High, Medium, Low)
  - Date Range: Two date inputs (From - To)
  - Clear Filters button
  
- **Pending Table**:
  - Columns: Date, Client, Contact, Priority, Actions
  - Real-time reactive filtering
  - Infinite scroll (no pagination)

### 4. PENDIENTES OLVIDADOS (Forgotten Pending) - activeView === 3

**Purpose**: Manage overdue or untracked tasks.

**Structure**: Identical to PENDIENTES ACUMULADOS but with:
- Different dataset (`pendientesOlvidados`)
- Independent filters
- Separate methods

### 5. ASIG. SUPERVISOR (Supervisor Assignment) - activeView === 4

**Purpose**: Weekly calendar view for team activity assignment.

**Layout**:
- **Left Sidebar (col-md-3)**:
  - **Color Legend**:
    - 🔵 Meeting (blue)
    - 🟢 Visit (green)
    - 🟠 Follow-up (orange)
    - 🔴 Presentation (red)
    - 🟣 High Value Client (purple)
  
  - **Summary**:
    - Total Activities: 15
    - Completed: 8
    - Pending: 7
  
  - **Button**: "+ New activity"

- **Calendar Area (col-md-9)**:
  - **Top Filters**:
    - Week: Dropdown
    - User: Dropdown
    - "View All" button
  
  - **Calendar Grid**:
    - **Header**: Mon 18 Nov | Tue 19 Nov | ... | Sun 24 Nov
    - **Body**: Time grid (09:00 - 19:00) x 7 days
    - **Events**: Color blocks with hover effects
      - Title
      - Subtitle
      - Visual duration

**CSS Grid Structure**:
```css
.calendar-grid {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
}

.time-row {
  grid-template-columns: 80px repeat(7, 1fr);
  min-height: 80px;
}
```

### 6. CERRADOS (Closed) - activeView === 5

**Purpose**: Closed contracts dashboard with metrics and visualizations.

**Sections**:

1. **Metric Cards (row with 3 col-md-4)**:
   - **Green Card** (metric-card-green):
     - Weekly Accumulated Amount: S/ 10,650.00
     - Gradient: #6dd5a4 → #5bc491
   
   - **Blue Card** (metric-card-blue):
     - Closed Contracts: 4
     - Gradient: #6c9eff → #5a8de8
   
   - **Primary Card** (metric-card-primary):
     - Weekly Goal: 85%
     - Progress bar
     - Gradient: #4e73df → #2e59d9

2. **Charts and Table (row with 2 col-md-6)**:
   - **Daily Performance**:
     - 5 CSS vertical bars
     - Monday (40%), Tuesday (45%), Wednesday (75%), Thursday (85%), Friday (95%)
     - Blue vertical gradient
     - Hover effects
   
   - **Recent History**:
     - Table with 3 records
     - Columns: Company, Service, Date, Amount, Status
     - Realistic Peruvian company data
     - Green "Closed" badges

### 7. PROD. DÍA (Daily Productivity) - activeView === 6

**Purpose**: Individual team productivity monitoring.

**Sections**:

1. **Productivity Table**:
   - **Header** (dark teal: #1a5a7d):
     - Columns: user | Name | Scheduled Executive | Assigned supervisor | Assign
   
   - **Rows** (alternating light blue/white):
     - 4 users: jperez, aserrano, avaldiviezo, jsanchez
     - **Horizontal Bars**:
       - Blue (Scheduled): #2e7db5
       - Orange (Assigned): #ff8c42
       - Value inside bar
       - Proportional width (width: N%)
     - Green "Assign" button per user

2. **Visualization per User** (2 columns):
   - Card per user
   - 2 horizontal bars per metric
   - Values at end of each bar
   - Light gray borders and background

3. **Legend**:
   - 🔵 Scheduled Executive
   - 🟠 Assigned supervisor

---

## 📊 Data Models

### Company

```typescript
interface Company {
  // Identification
  id: number;
  name: string;          // Business Name
  ruc: string;           // 11 digits
  sedePrincipal: string;
  domicilio: string;
  
  // Contact
  contact: string;       // Main contact name
  cargo: string;
  email: string;
  phone: string;         // 9 digits
  
  // Classification
  tipoEmpresa: string;
  nroTrabajadores: string;
  actEconomica: string;
  riesgo: string;
  sedes: string;
  
  // Assignment
  user: string;          // Assigned user
  
  // Tracking
  follow: FollowData;
  
  // Collections
  history: HistoryRecord[];
  protocols: Protocol[];
  quotes: Quote[];
}
```

### FollowData

```typescript
interface FollowData {
  tipoCliente: string;      // Corporate, SME, etc.
  fecha1erCto: string;      // DD/MM/YYYY
  tipoComunic: string;      // Phone, Email, In-person
  tipoCartera: string;      // Active, Potential, Inactive
  lineaNegocio: string;
  estatusCliente: string;   // Pending, Active, Closed
  subLinea: string;
  detalleEstatus: string;
  tipoCredito: string;
  tipoLlamada: string;
  presupuesto: string;
  observaciones: string;
}
```

### HistoryRecord

```typescript
interface HistoryRecord {
  fecha: string;         // DD/MM/YYYY
  status: string;        // PENDING, AGENDA TODAY, NEW, CLOSED
  contacto: string;      // Contact name
  usuario: string;       // User who registered
}
```

### Protocol / Quote

```typescript
interface Protocol {
  fecha: string;         // DD/MM/YYYY
  ruta: string;          // File path
  nombre: string;        // File name
  usuario: string;       // User who uploaded
}
```

### Pendiente

```typescript
interface Pendiente {
  fecha: string;         // DD/MM/YYYY
  cliente: string;       // Company name
  contacto: string;      // Contact name
  prioridad: 'Alta' | 'Media' | 'Baja';
}
```

### ProdDiaUser

```typescript
interface ProdDiaUser {
  usuario: string;       // Username
  nombre: string;        // Full name
  agendados: number;     // Scheduled Executive (0-100)
  asignados: number;     // Assigned supervisor (0-100)
}
```

---

## 🎨 Styles

### Color Palette

**Primary Colors**:
- Primary: `#0d6efd` (Bootstrap blue)
- Success: `#198754` (Green)
- Danger: `#dc3545` (Red)

**Background Colors**:
- App: `#f5f5f5` (Light gray)
- Sidebar: `#fafafa`
- Cards: `#ffffff`

**Event Colors** (Calendar):
- Meeting: `#6c9eff` (Blue)
- Visit: `#6dd5a4` (Green)
- Follow-up: `#ffb347` (Orange)
- Presentation: `#ff6b6b` (Red)
- High Value: `#b8a3ff` (Purple)

**Metric Colors**:
- Green: `linear-gradient(135deg, #6dd5a4, #5bc491)`
- Blue: `linear-gradient(135deg, #6c9eff, #5a8de8)`
- Primary: `linear-gradient(135deg, #4e73df, #2e59d9)`

**Productivity Colors**:
- Scheduled: `linear-gradient(90deg, #2e7db5, #3a99d9)`
- Assigned: `linear-gradient(90deg, #ff8c42, #ffa366)`

### Typography

**Fonts**: System fonts (Apple, Segoe UI, Roboto, Arial)

**Sizes**:
- H4 (Header): `1.1rem`, `font-weight: 600`
- H6 (Section): `font-weight: 700`
- Body: `0.95rem`
- Small: `0.875rem`
- Metric Value: `1.75rem`, `font-weight: 700`

### Spacing

Bootstrap spacing utilities (rem-based):
- `.p-2`: `0.5rem` (8px)
- `.p-3`: `1rem` (16px)
- `.mb-2`: `0.5rem` margin-bottom
- `.mb-3`: `1rem` margin-bottom

### Shadows

```css
box-shadow: 0 1px 3px rgba(0,0,0,0.1);     /* Header */
box-shadow: 0 2px 6px rgba(0,0,0,0.1);     /* Cards */
box-shadow: 0 2px 4px rgba(0,0,0,0.1);     /* Metrics */
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm start                  # ng serve
npm run watch              # ng build --watch

# Build
npm run build              # ng build (prod)

# Testing
npm test                   # ng test
```

### Commit Structure

Use **Conventional Commits**:

```
<type>(<scope>): <subject>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Test changes

**Examples**:
```bash
git commit -m "feat(calendar): add high value events"
git commit -m "fix(tracking): correct RUC validation"
git commit -m "docs(readme): update installation guide"
```

### Development Workflow

1. **Create Branch**:
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Develop and Test**:
   ```bash
   ng serve
   ng test
   ```

3. **Commit and Push**:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   git push origin feature/new-feature
   ```

4. **Pull Request**:
   - Create PR on GitHub
   - Detailed description of changes
   - Screenshots if applicable

---

## 🗺️ Roadmap

### Current Version (v0.1.0)

✅ Implemented:
- Complete interface with 7 views
- Company CRUD with validations
- Tab navigation system
- Advanced filters in pending tasks
- Weekly assignment calendar
- Metrics dashboard
- CSS-based chart visualizations
- Responsive design

### Version 0.2.0 (Next)

🔄 Planned:
- [ ] REST API backend integration
- [ ] JWT authentication and authorization
- [ ] Route guards by roles
- [ ] Lazy loading of modules
- [ ] State management with NgRx/Signals
- [ ] Local persistence with LocalStorage
- [ ] Real file upload
- [ ] PDF/Excel export
- [ ] Real-time notifications

### Version 0.3.0 (Future)

💡 Ideas:
- [ ] Interactive charts with Chart.js/D3.js
- [ ] Drag & drop in calendar
- [ ] Saved filters per user
- [ ] Customizable dashboard
- [ ] Automated reports
- [ ] External CRM integration
- [ ] Mobile app with Ionic/Capacitor
- [ ] PWA (Progressive Web App)
- [ ] Dark mode
- [ ] Internationalization (i18n)

---

## 📄 License

This project is for academic use at Universidad Peruana de Ciencias Aplicadas (UPC).

**Restrictions**:
- Commercial use not allowed without authorization
- Code is open source for educational purposes
- Attribution to original author required

---

## 👥 Authors

- **Developer**: [Your Name]
- **Course**: Web Environment Development
- **Institution**: Universidad Peruana de Ciencias Aplicadas (UPC)
- **Cycle**: 2025-2

---

## 🙏 Acknowledgments

- Angular Team for the excellent framework
- Bootstrap Team for the design system
- Stack Overflow community
- UPC professors and classmates

---

**Last Update**: November 20, 2025
**Version**: 0.1.0

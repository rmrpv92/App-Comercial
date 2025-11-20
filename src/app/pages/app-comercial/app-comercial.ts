// ...existing code...
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-app-comercial',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app-comercial.html',
  styleUrls: ['./app-comercial.css']
})
export class AppComercialComponent implements OnInit {
  viewTabs = ['BÚSQUEDA', 'AGENDA DEL DÍA', 'PENDIENTES ACUMULADOS', 'PENDIENTES OLVIDADOS', 'ASIG. SUPERVISOR', 'CERRADOS', 'PROD. DÍA'];
  activeView: number = 0; // tracks which top navigation tab is active
  
  tabs = ['DATOS EMPRESA', 'SEGUIMIENTO', 'HISTORICO', 'PROTOCOLOS Y COTIZACIONES'];
  activeTab: number = 0;

  searchText = '';

  // Edit mode state for each tab
  isEditMode = false;
  isSeguimientoEditMode = false;
  isHistoricoEditMode = false;
  isProtocolosEditMode = false;

  // Track which row is being edited
  editingHistoricoIndex: number | null = null;
  editingProtocoloIndex: number | null = null;
  editingCotizacionIndex: number | null = null;

  // Backup for cancel functionality
  historicoBackup: any = null;
  protocoloBackup: any = null;
  cotizacionBackup: any = null;

  // Reactive form for DATOS EMPRESA
  datosEmpresaForm = this.fb.group({
    razonSocial: ['', Validators.required],
    ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    sedePrincipal: [''],
    domicilio: [''],
    nombreContacto: ['', Validators.required],
    cargo: [''],
    email: ['', Validators.email],
    telefono: ['', Validators.pattern(/^\d{9}$/)],
    tipoEmpresa: [''],
    nroTrabajadores: ['', Validators.min(1)],
    actEconomica: [''],
    riesgo: [''],
    sedes: ['']
  });

  // Reactive form for SEGUIMIENTO
  seguimientoForm = this.fb.group({
    tipoCliente: [''],
    fecha1erCto: [''],
    tipoComunic: [''],
    tipoCartera: [''],
    lineaNegocio: [''],
    estatusCliente: [''],
    subLinea: [''],
    detalleEstatus: [''],
    tipoCredito: [''],
    tipoLlamada: [''],
    presupuesto: [''],
    observaciones: ['']
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadCompanyToForm();
    // Disable all form controls initially
    this.datosEmpresaForm.disable();
    this.seguimientoForm.disable();
  }

  companies = [
    {
      id: 1,
      name: 'EMPRESA SEGUIMIENTO 1',
      contact: 'Juan Perez',
      phone: '999999999',
      user: 'MGUERRA',
      ruc: '',
      sedePrincipal: '',
      domicilio: '',
      cargo: '',
      email: '',
      tipoEmpresa: '',
      nroTrabajadores: '',
      actEconomica: '',
      riesgo: '',
      sedes: '',
      follow: {
        tipoCliente: 'Corporativo',
        fecha1erCto: '23/01/2025',
        tipoComunic: 'Teléfono',
        tipoCartera: 'Activa',
        lineaNegocio: 'Servicios',
        estatusCliente: 'Pendiente',
        subLinea: 'Retail',
        detalleEstatus: 'Cita pendiente',
        tipoCredito: 'Corto plazo',
        tipoLlamada: 'Primera',
        presupuesto: '15000',
        observaciones: 'Cliente solicita demo y cotización.'
      },
      history: [
        { fecha: '23/01/2025', status: 'PENDIENTE', contacto: 'JUAN PEREZ', usuario: 'MGUERRA' },
        { fecha: '25/01/2025', status: 'PENDIENTE', contacto: 'JUAN PEREZ', usuario: 'MGUERRA' },
        { fecha: '03/02/2025', status: 'PENDIENTE', contacto: 'CARLOS MUNAYCO', usuario: 'JNOBILE' },
        { fecha: new Date().toLocaleDateString('es-PE'), status: 'AGENDA HOY', contacto: 'JUAN PEREZ', usuario: 'MGUERRA' }
      ],
      protocols: [
        { fecha: '23/01/2025', ruta: 'K:\\comercial\\', nombre: 'protocolo.pdf', usuario: 'MGUERRA' },
        { fecha: '25/01/2025', ruta: 'K:\\comercial\\', nombre: 'protocolo.xlsx', usuario: 'MGUERRA' }
      ],
      quotes: [
        { fecha: '23/01/2025', ruta: 'K:\\comercial\\', nombre: 'cotizacion.pdf', usuario: 'MGUERRA' },
        { fecha: '25/01/2025', ruta: 'K:\\comercial\\', nombre: 'cotizacion.xlsx', usuario: 'MGUERRA' }
      ]
    },
    {
      id: 2,
      name: 'EMPRESA SEGUIMIENTO 2',
      contact: 'Ana López',
      phone: '999999998',
      user: 'MGUERRA',
      ruc: '',
      sedePrincipal: '',
      domicilio: '',
      cargo: '',
      email: '',
      tipoEmpresa: '',
      nroTrabajadores: '',
      actEconomica: '',
      riesgo: '',
      sedes: '',
      follow: { tipoCliente: 'Pyme', fecha1erCto: '10/02/2025', tipoComunic: 'Email', tipoCartera: 'Potencial', lineaNegocio: '', estatusCliente: 'Activo', subLinea: '', detalleEstatus: '', tipoCredito: '', tipoLlamada: '', presupuesto: '', observaciones: '' },
      history: [],
      protocols: [],
      quotes: []
    },
    {
      id: 3,
      name: 'EMPRESA SEGUIMIENTO 3',
      contact: 'Carlos Munayco',
      phone: '999999997',
      user: 'JNOBILE',
      ruc: '',
      sedePrincipal: '',
      domicilio: '',
      cargo: '',
      email: '',
      tipoEmpresa: '',
      nroTrabajadores: '',
      actEconomica: '',
      riesgo: '',
      sedes: '',
      follow: { tipoCliente: '', fecha1erCto: '', tipoComunic: '', tipoCartera: '', lineaNegocio: '', estatusCliente: '', subLinea: '', detalleEstatus: '', tipoCredito: '', tipoLlamada: '', presupuesto: '', observaciones: '' },
      history: [],
      protocols: [],
      quotes: []
    },
    {
      id: 4,
      name: 'EMPRESA SEGUIMIENTO 4',
      contact: 'Luis Ramos',
      phone: '999999996',
      user: 'MGUERRA',
      ruc: '',
      sedePrincipal: '',
      domicilio: '',
      cargo: '',
      email: '',
      tipoEmpresa: '',
      nroTrabajadores: '',
      actEconomica: '',
      riesgo: '',
      sedes: '',
      follow: { tipoCliente: '', fecha1erCto: '', tipoComunic: '', tipoCartera: '', lineaNegocio: '', estatusCliente: '', subLinea: '', detalleEstatus: '', tipoCredito: '', tipoLlamada: '', presupuesto: '', observaciones: '' },
      history: [],
      protocols: [],
      quotes: []
    }
  ];

  selected = this.companies[0];

  // Today's date for AGENDA DEL DÍA
  fechaHoy = new Date().toLocaleDateString('es-PE');

  // Filtered companies for AGENDA DEL DÍA (today's contacts)
  get companiesAgendaHoy() {
    const today = new Date();
    const todayStr = today.toLocaleDateString('es-PE');
    
    return this.companies.filter(company => {
      const ultimaFecha = this.getUltimaFechaContacto(company);
      return ultimaFecha === todayStr;
    });
  }

  // Data for PENDIENTES OLVIDADOS view
  pendientesOlvidados = [
    { fecha: '22/04/2024', cliente: 'EMPRESA SEGUIMIENTO 1', contacto: 'Juan Perez 1', prioridad: 'Alta' },
    { fecha: '23/04/2024', cliente: 'EMPRESA SEGUIMIENTO 2', contacto: 'Juan Perez 1', prioridad: 'Media' },
    { fecha: '23/04/2024', cliente: 'EMPRESA SEGUIMIENTO 3', contacto: 'Juan Perez 1', prioridad: 'Alta' }
  ];

  // Data for PENDIENTES ACUMULADOS view
  pendientesAcumulados = [
    { fecha: '22/04/2024', cliente: 'EMPRESA SEGUIMIENTO 1', contacto: 'Juan Perez 1', prioridad: 'Alta' },
    { fecha: '23/04/2024', cliente: 'EMPRESA SEGUIMIENTO 2', contacto: 'Juan Perez 1', prioridad: 'Media' },
    { fecha: '23/04/2024', cliente: 'EMPRESA SEGUIMIENTO 3', contacto: 'Juan Perez 1', prioridad: 'Alta' },
    { fecha: '23/04/2024', cliente: 'EMPRESA SEGUIMIENTO 4', contacto: 'Juan Perez 1', prioridad: 'Baja' },
    { fecha: '23/04/2024', cliente: 'EMPRESA SEGUIMIENTO 5', contacto: 'Juan Perez 1', prioridad: 'Alta' }
  ];

  // Filters for PENDIENTES OLVIDADOS
  prioridadFilterOlvidados = 'Todos';
  fechaInicioOlvidados = '';
  fechaFinOlvidados = '';

  // Filters for PENDIENTES ACUMULADOS
  prioridadFilterAcumulados = 'Todos';
  fechaInicioAcumulados = '';
  fechaFinAcumulados = '';

  // Data for PROD. DÍA view
  prodDiaUsers = [
    { usuario: 'jperez', nombre: 'jperez', agendados: 20, asignados: 62 },
    { usuario: 'aserrano', nombre: 'aserrano', agendados: 10, asignados: 70 },
    { usuario: 'avaldiviezo', nombre: 'avaldiviezo', agendados: 50, asignados: 25 },
    { usuario: 'jsanchez', nombre: 'jsanchez', agendados: 40, asignados: 48 }
  ];

  get filteredPendientesOlvidados() {
    return this.pendientesOlvidados.filter(p => {
      if (this.prioridadFilterOlvidados !== 'Todos' && p.prioridad !== this.prioridadFilterOlvidados) {
        return false;
      }
      
      // Date filtering
      if (this.fechaInicioOlvidados || this.fechaFinOlvidados) {
        const fechaPendiente = this.parseFecha(p.fecha);
        if (this.fechaInicioOlvidados) {
          const fechaInicio = new Date(this.fechaInicioOlvidados);
          if (fechaPendiente < fechaInicio) return false;
        }
        if (this.fechaFinOlvidados) {
          const fechaFin = new Date(this.fechaFinOlvidados);
          if (fechaPendiente > fechaFin) return false;
        }
      }
      
      return true;
    });
  }

  get filteredPendientesAcumulados() {
    return this.pendientesAcumulados.filter(p => {
      if (this.prioridadFilterAcumulados !== 'Todos' && p.prioridad !== this.prioridadFilterAcumulados) {
        return false;
      }
      
      // Date filtering
      if (this.fechaInicioAcumulados || this.fechaFinAcumulados) {
        const fechaPendiente = this.parseFecha(p.fecha);
        if (this.fechaInicioAcumulados) {
          const fechaInicio = new Date(this.fechaInicioAcumulados);
          if (fechaPendiente < fechaInicio) return false;
        }
        if (this.fechaFinAcumulados) {
          const fechaFin = new Date(this.fechaFinAcumulados);
          if (fechaPendiente > fechaFin) return false;
        }
      }
      
      return true;
    });
  }

  parseFecha(fecha: string): Date {
    // Parse DD/MM/YYYY format
    const parts = fecha.split('/');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(fecha);
  }

  limpiarFiltrosOlvidados() {
    this.prioridadFilterOlvidados = 'Todos';
    this.fechaInicioOlvidados = '';
    this.fechaFinOlvidados = '';
  }

  limpiarFiltrosAcumulados() {
    this.prioridadFilterAcumulados = 'Todos';
    this.fechaInicioAcumulados = '';
    this.fechaFinAcumulados = '';
  }

  // returns the companies filtered by the search text
  get filteredCompanies() {
    const q = (this.searchText || '').trim().toLowerCase();
    if (!q) { return this.companies; }
    return this.companies.filter(c =>
      (c.name || '').toLowerCase().includes(q) ||
      (c.contact || '').toLowerCase().includes(q) ||
      (c.phone || '').includes(q) ||
      ((c.user || '').toLowerCase().includes(q))
    );
  }

  // update search text from input
  onSearchChange(value: string) {
    this.searchText = value;
    // if the currently selected company is no longer visible, select the first one
    const visible = this.filteredCompanies;
    if (this.selected && !visible.find(c => c.id === this.selected.id)) {
      this.selected = visible[0] || null;
    }
  }

  selectCompany(c: any) {
    this.selected = c;
    this.activeTab = 0;
    this.isEditMode = false;
    this.isSeguimientoEditMode = false;
    this.isHistoricoEditMode = false;
    this.isProtocolosEditMode = false;
    this.editingHistoricoIndex = null;
    this.editingProtocoloIndex = null;
    this.editingCotizacionIndex = null;
    this.historicoBackup = null;
    this.protocoloBackup = null;
    this.cotizacionBackup = null;
    this.loadCompanyToForm();
    this.loadSeguimientoToForm();
    this.datosEmpresaForm.disable();
    this.seguimientoForm.disable();
  }

  loadCompanyToForm() {
    this.datosEmpresaForm.patchValue({
      razonSocial: this.selected.name || '',
      ruc: this.selected.ruc || '',
      sedePrincipal: this.selected.sedePrincipal || '',
      domicilio: this.selected.domicilio || '',
      nombreContacto: this.selected.contact || '',
      cargo: this.selected.cargo || '',
      email: this.selected.email || '',
      telefono: this.selected.phone || '',
      tipoEmpresa: this.selected.tipoEmpresa || '',
      nroTrabajadores: this.selected.nroTrabajadores || '',
      actEconomica: this.selected.actEconomica || '',
      riesgo: this.selected.riesgo || '',
      sedes: this.selected.sedes || ''
    });
  }

  loadSeguimientoToForm() {
    this.seguimientoForm.patchValue({
      tipoCliente: this.selected.follow.tipoCliente || '',
      fecha1erCto: this.selected.follow.fecha1erCto || '',
      tipoComunic: this.selected.follow.tipoComunic || '',
      tipoCartera: this.selected.follow.tipoCartera || '',
      lineaNegocio: this.selected.follow.lineaNegocio || '',
      estatusCliente: this.selected.follow.estatusCliente || '',
      subLinea: this.selected.follow.subLinea || '',
      detalleEstatus: this.selected.follow.detalleEstatus || '',
      tipoCredito: this.selected.follow.tipoCredito || '',
      tipoLlamada: this.selected.follow.tipoLlamada || '',
      presupuesto: this.selected.follow.presupuesto || '',
      observaciones: this.selected.follow.observaciones || ''
    });
  }

  editarEmpresa() {
    this.isEditMode = true;
    this.datosEmpresaForm.enable();
    this.loadCompanyToForm();
  }

  guardarEmpresa() {
    // Check validity while form is still enabled
    const isValid = this.datosEmpresaForm.valid;
    
    if (isValid) {
      // Update selected company with form values
      const formValues = this.datosEmpresaForm.value;
      this.selected.name = formValues.razonSocial || '';
      this.selected.ruc = formValues.ruc || '';
      this.selected.sedePrincipal = formValues.sedePrincipal || '';
      this.selected.domicilio = formValues.domicilio || '';
      this.selected.contact = formValues.nombreContacto || '';
      this.selected.cargo = formValues.cargo || '';
      this.selected.email = formValues.email || '';
      this.selected.phone = formValues.telefono || '';
      this.selected.tipoEmpresa = formValues.tipoEmpresa || '';
      this.selected.nroTrabajadores = formValues.nroTrabajadores || '';
      this.selected.actEconomica = formValues.actEconomica || '';
      this.selected.riesgo = formValues.riesgo || '';
      this.selected.sedes = formValues.sedes || '';
      
      this.isEditMode = false;
      this.datosEmpresaForm.disable();
      console.log('Empresa guardada:', this.selected);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.datosEmpresaForm.controls).forEach(key => {
        this.datosEmpresaForm.get(key)?.markAsTouched();
      });
      alert('Por favor, complete todos los campos requeridos correctamente.');
    }
  }

  cancelarEdicion() {
    this.isEditMode = false;
    this.datosEmpresaForm.disable();
    this.loadCompanyToForm();
  }

  editarSeguimiento() {
    this.isSeguimientoEditMode = true;
    this.seguimientoForm.enable();
    this.loadSeguimientoToForm();
  }

  guardarSeguimiento() {
    if (this.seguimientoForm.valid) {
      const formValues = this.seguimientoForm.value;
      this.selected.follow.tipoCliente = formValues.tipoCliente || '';
      this.selected.follow.fecha1erCto = formValues.fecha1erCto || '';
      this.selected.follow.tipoComunic = formValues.tipoComunic || '';
      this.selected.follow.tipoCartera = formValues.tipoCartera || '';
      this.selected.follow.lineaNegocio = formValues.lineaNegocio || '';
      this.selected.follow.estatusCliente = formValues.estatusCliente || '';
      this.selected.follow.subLinea = formValues.subLinea || '';
      this.selected.follow.detalleEstatus = formValues.detalleEstatus || '';
      this.selected.follow.tipoCredito = formValues.tipoCredito || '';
      this.selected.follow.tipoLlamada = formValues.tipoLlamada || '';
      this.selected.follow.presupuesto = formValues.presupuesto || '';
      this.selected.follow.observaciones = formValues.observaciones || '';
      
      this.isSeguimientoEditMode = false;
      this.seguimientoForm.disable();
      console.log('Seguimiento guardado:', this.selected.follow);
    }
  }

  cancelarSeguimiento() {
    this.isSeguimientoEditMode = false;
    this.seguimientoForm.disable();
    this.loadSeguimientoToForm();
  }

  agregarRegistroHistorico() {
    const today = new Date();
    const fecha = today.toLocaleDateString('es-PE');
    const newRecord = {
      fecha: fecha,
      status: 'NUEVO',
      contacto: this.selected.contact || 'Sin contacto',
      usuario: 'MGUERRA'
    };
    this.selected.history.push(newRecord);
    console.log('Registro histórico agregado:', newRecord);
  }

  agregarProtocolo() {
    const today = new Date();
    const fecha = today.toLocaleDateString('es-PE');
    const newProtocol = {
      fecha: fecha,
      ruta: 'K:\\comercial\\',
      nombre: 'nuevo_protocolo.pdf',
      usuario: 'MGUERRA'
    };
    this.selected.protocols.push(newProtocol);
    console.log('Protocolo agregado:', newProtocol);
  }

  agregarCotizacion() {
    const today = new Date();
    const fecha = today.toLocaleDateString('es-PE');
    const newQuote = {
      fecha: fecha,
      ruta: 'K:\\comercial\\',
      nombre: 'nueva_cotizacion.pdf',
      usuario: 'MGUERRA'
    };
    this.selected.quotes.push(newQuote);
    console.log('Cotización agregada:', newQuote);
  }

  editarHistorico(index: number) {
    // Create backup for cancel functionality
    this.historicoBackup = { ...this.selected.history[index] };
    this.editingHistoricoIndex = index;
  }

  guardarHistorico(index: number) {
    // Changes are already applied via two-way binding
    this.editingHistoricoIndex = null;
    this.historicoBackup = null;
    console.log('Registro histórico guardado:', this.selected.history[index]);
  }

  cancelarHistorico() {
    // Restore from backup
    if (this.editingHistoricoIndex !== null && this.historicoBackup) {
      this.selected.history[this.editingHistoricoIndex] = this.historicoBackup;
    }
    this.editingHistoricoIndex = null;
    this.historicoBackup = null;
  }

  eliminarHistorico(index: number) {
    if (confirm('¿Está seguro de eliminar este registro histórico?')) {
      this.selected.history.splice(index, 1);
      console.log('Registro histórico eliminado');
    }
  }

  editarProtocolo(index: number) {
    // Create backup for cancel functionality
    this.protocoloBackup = { ...this.selected.protocols[index] };
    this.editingProtocoloIndex = index;
  }

  guardarProtocolo(index: number) {
    // Changes are already applied via two-way binding
    this.editingProtocoloIndex = null;
    this.protocoloBackup = null;
    console.log('Protocolo guardado:', this.selected.protocols[index]);
  }

  cancelarProtocolo() {
    // Restore from backup
    if (this.editingProtocoloIndex !== null && this.protocoloBackup) {
      this.selected.protocols[this.editingProtocoloIndex] = this.protocoloBackup;
    }
    this.editingProtocoloIndex = null;
    this.protocoloBackup = null;
  }

  eliminarProtocolo(index: number) {
    if (confirm('¿Está seguro de eliminar este protocolo?')) {
      this.selected.protocols.splice(index, 1);
      console.log('Protocolo eliminado');
    }
  }

  editarCotizacion(index: number) {
    // Create backup for cancel functionality
    this.cotizacionBackup = { ...this.selected.quotes[index] };
    this.editingCotizacionIndex = index;
  }

  guardarCotizacion(index: number) {
    // Changes are already applied via two-way binding
    this.editingCotizacionIndex = null;
    this.cotizacionBackup = null;
    console.log('Cotización guardada:', this.selected.quotes[index]);
  }

  cancelarCotizacion() {
    // Restore from backup
    if (this.editingCotizacionIndex !== null && this.cotizacionBackup) {
      this.selected.quotes[this.editingCotizacionIndex] = this.cotizacionBackup;
    }
    this.editingCotizacionIndex = null;
    this.cotizacionBackup = null;
  }

  eliminarCotizacion(index: number) {
    if (confirm('¿Está seguro de eliminar esta cotización?')) {
      this.selected.quotes.splice(index, 1);
      console.log('Cotización eliminada');
    }
  }

  // Get the most recent contact date from history
  getUltimaFechaContacto(company: any): string {
    if (!company.history || company.history.length === 0) {
      return 'Sin contacto';
    }
    
    // Sort history by date (most recent first) and return the first one
    const sortedHistory = [...company.history].sort((a, b) => {
      const dateA = this.parseFecha(a.fecha);
      const dateB = this.parseFecha(b.fecha);
      return dateB.getTime() - dateA.getTime();
    });
    
    return sortedHistory[0].fecha;
  }

  // Add new company
  agregarNuevaEmpresa() {
    const newId = Math.max(...this.companies.map(c => c.id)) + 1;
    const newCompany = {
      id: newId,
      name: `EMPRESA SEGUIMIENTO ${newId}`,
      contact: '',
      phone: '',
      user: 'MGUERRA',
      ruc: '',
      sedePrincipal: '',
      domicilio: '',
      cargo: '',
      email: '',
      tipoEmpresa: '',
      nroTrabajadores: '',
      actEconomica: '',
      riesgo: '',
      sedes: '',
      follow: {
        tipoCliente: '',
        fecha1erCto: '',
        tipoComunic: '',
        tipoCartera: '',
        lineaNegocio: '',
        estatusCliente: '',
        subLinea: '',
        detalleEstatus: '',
        tipoCredito: '',
        tipoLlamada: '',
        presupuesto: '',
        observaciones: ''
      },
      history: [],
      protocols: [],
      quotes: []
    };
    
    this.companies.push(newCompany);
    this.selectCompany(newCompany);
    // Automatically enter edit mode for new company
    this.editarEmpresa();
    console.log('Nueva empresa agregada:', newCompany);
  }
}
// ...existing code...
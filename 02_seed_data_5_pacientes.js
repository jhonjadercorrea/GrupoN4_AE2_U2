/**
 * ==============================================================================
 * PROYECTO DE AULA: HISTORIA CLÍNICA ELECTRÓNICA - GOBERNACIÓN DE ANTIOQUIA
 * ASIGNATURA: BASES DE DATOS II (NOSQL) - UNIDAD 2 - ACTIVIDAD DE APRENDIZAJE 2
 * INTEGRANTES (GRUPO 4): Jhon Jader Correa Ruiz - Juan Esteban Castaño Montoya
 * DOCENTE: Oralia Cortés Grajales
 * INSTITUCIÓN UNIVERSITARIA PASCUAL BRAVO - MEDELLÍN, COLOMBIA - 2026
 * ==============================================================================
 * SCRIPT 02: CARGA DE DATOS DE PRUEBA (SEED DATA) - 5 PACIENTES COMPLETOS
 * Base de Datos: HCE_Hospitalizacion_Antioquia
 * Colección: episodios_hospitalizacion
 * ==============================================================================
 */

use HCE_Hospitalizacion_Antioquia;

db.episodios_hospitalizacion.insertMany([
  // ----------------------------------------------------------------------------
  // PACIENTE 1: Camila Andrea Zuleta Mejía (Medellín - Hospital General de Medellín)
  // ----------------------------------------------------------------------------
  {
    codigo_admision: "ADM-HGM-2026-0891",
    estado: "ACTIVO",
    hospital: {
      id_hospital: 1,
      nombre: "Hospital General de Medellín Luz Castro de Gutiérrez E.S.E.",
      nivel_complejidad: "Alta",
      subregion: "Valle de Aburrá",
      municipio: "Medellín"
    },
    paciente: {
      id_paciente: 101,
      tipo_documento: "CC",
      numero_documento: "1017444555",
      nombre_completo: "Camila Andrea Zuleta Mejía",
      edad: 34,
      sexo: "F",
      tipo_sangre: "B+",
      alergias_criticas: ["Penicilina", "AINEs (Ibuprofeno/Naproxeno)"]
    },
    ubicacion_actual: {
      pabellon: "Medicina Interna - Pabellón Norte",
      piso: 3,
      cama: "C-302"
    },
    fecha_ingreso: new Date("2026-10-10T14:30:00Z"),
    triage_origen: {
      clasificacion: "Triage II",
      motivo: "Crisis asmatiforme refractaria y neumonía basal derecha con disnea progresiva.",
      fecha_triage: new Date("2026-10-10T12:15:00Z")
    },
    evoluciones_medicas: [
      {
        id_evolucion: "EVO-HGM-001-01",
        fecha_registro: new Date("2026-10-11T08:00:00Z"),
        medico_tratante: {
          id_medico: 201,
          nombre: "Dr. Carlos Mario Montoya Ospina",
          registro_medico: "RM-05128-ANT",
          especialidad: "Medicina Interna"
        },
        soap: {
          subjetivo: "Paciente refiere persistencia de dificultad respiratoria nocturna y tos con expectoración mucopurulenta. No presenta dolor torácico pleurítico.",
          objetivo: "Afebril (37.1°C), taquipneica leve (FR: 22 rpm). Auscultación: murmullo vesicular disminuido en base derecha con estertores crepitantes y sibilancias bilaterales espiratorias. SpO2: 93% con cánula nasal a 2 L/min.",
          analisis: "Neumonía bacteriana comunitaria en lóbulo inferior derecho asociada a broncoespasmo por asma preexistente. Alerta por antecedente alérgico a beta-lactámicos.",
          plan: "Iniciar cubrimiento antibiótico de amplio espectro respetando barrera de alergia, micronebulizaciones c/6h, oxigenoterapia por cánula y control radiológico."
        },
        diagnosticos_cie10: [
          { codigo: "J18.9", descripcion: "Neumonía bacteriana, no especificada", tipo: "Principal" },
          { codigo: "J45.9", descripcion: "Asma, no especificada", tipo: "Relacionado" }
        ]
      },
      {
        id_evolucion: "EVO-HGM-001-02",
        fecha_registro: new Date("2026-10-13T09:30:00Z"),
        medico_tratante: {
          id_medico: 201,
          nombre: "Dr. Carlos Mario Montoya Ospina",
          registro_medico: "RM-05128-ANT",
          especialidad: "Medicina Interna"
        },
        soap: {
          subjetivo: "Paciente reporta franca mejoría ventilatoria, tolera decúbito sin disnea paroxística, cede la tos productiva.",
          objetivo: "Hemodinámicamente estable (TA: 118/76 mmHg, FC: 78 lpm). Murmullo vesicular conservado sin ruidos agregados. SpO2: 97% al aire ambiente sin oxígeno suplementario.",
          analisis: "Evolución clínica altamente favorable con resolución del broncoespasmo y control del proceso infeccioso pulmonar.",
          plan: "Destete completo de oxígeno, desescalamiento a medicación inhalada de mantenimiento y completar esquema parenteral."
        },
        diagnosticos_cie10: [
          { codigo: "J18.9", descripcion: "Neumonía bacteriana, no especificada", tipo: "Principal" },
          { codigo: "J45.9", descripcion: "Asma, no especificada", tipo: "Relacionado" }
        ]
      }
    ],
    ultimos_signos_vitales: [
      {
        fecha_hora: new Date("2026-10-14T06:00:00Z"),
        sistolica: 118,
        diastolica: 76,
        fc: 78,
        fr: 18,
        temp: 36.6,
        spo2: 97,
        glucometria: 94,
        enfermero: "Enf. Yurani Berrío"
      },
      {
        fecha_hora: new Date("2026-10-14T12:00:00Z"),
        sistolica: 120,
        diastolica: 80,
        fc: 82,
        fr: 19,
        temp: 36.8,
        spo2: 96,
        glucometria: 102,
        enfermero: "Enf. Mateo Echeverri"
      }
    ],
    medicamentos_activos: [
      {
        medicamento: "Claritromicina 500mg IV",
        principio_activo: "Claritromicina",
        dosis: "500 mg",
        via: "IV",
        frecuencia: "c/12h",
        fecha_inicio: new Date("2026-10-10T16:00:00Z"),
        medico_prescriptor: "Dr. Carlos Mario Montoya Ospina",
        estado_orden: "ACTIVA"
      },
      {
        medicamento: "Salbutamol 100mcg Inhalador",
        principio_activo: "Salbutamol",
        dosis: "2 puff",
        via: "Inhalatoria",
        frecuencia: "c/6h",
        fecha_inicio: new Date("2026-10-10T16:00:00Z"),
        medico_prescriptor: "Dr. Carlos Mario Montoya Ospina",
        estado_orden: "ACTIVA"
      }
    ],
    notas_enfermeria: [
      {
        id_nota: "NOT-ENF-001",
        turno: "Mañana",
        fecha_hora: new Date("2026-10-14T11:30:00Z"),
        enfermero: "Enf. Yurani Berrío",
        procedimientos: "Canalización venosa permeable en MSD sin signos de flebitis. Se administra infusión de antibiótico sin eventos adversos.",
        balance_hidrico: { ingresos_ml: 1200, egresos_ml: 950, total_balance_ml: 250 }
      }
    ],
    resumen_alta: {
      emitido: false,
      fecha_alta: null,
      diagnostico_egreso_cie10: null,
      condicion_salida: "En hospitalización activa",
      medico_firmante: null,
      recomendaciones_egreso: null
    }
  },

  // ----------------------------------------------------------------------------
  // PACIENTE 2: Carlos Andrés Henao Restrepo (Rionegro - Hosp. San Juan de Dios)
  // ----------------------------------------------------------------------------
  {
    codigo_admision: "ADM-HSJD-2026-1042",
    estado: "ACTIVO",
    hospital: {
      id_hospital: 2,
      nombre: "Hospital San Juan de Dios E.S.E. de Rionegro",
      nivel_complejidad: "Media",
      subregion: "Oriente",
      municipio: "Rionegro"
    },
    paciente: {
      id_paciente: 102,
      tipo_documento: "CC",
      numero_documento: "71392811",
      nombre_completo: "Carlos Andrés Henao Restrepo",
      edad: 68,
      sexo: "M",
      tipo_sangre: "O+",
      alergias_criticas: ["Sulfamidas (Trimetoprim Sulfametoxazol)", "Tartrazina"]
    },
    ubicacion_actual: {
      pabellon: "Medicina Interna - Cuidados Especiales",
      piso: 2,
      cama: "C-215"
    },
    fecha_ingreso: new Date("2026-10-11T20:10:00Z"),
    triage_origen: {
      clasificacion: "Triage II",
      motivo: "Exacerbación de EPOC, disnea en reposo y cianosis peribucal.",
      fecha_triage: new Date("2026-10-11T18:40:00Z")
    },
    evoluciones_medicas: [
      {
        id_evolucion: "EVO-HSJD-002-01",
        fecha_registro: new Date("2026-10-12T07:45:00Z"),
        medico_tratante: {
          id_medico: 202,
          nombre: "Dra. Marcela Restrepo Gómez",
          registro_medico: "RM-08941-ANT",
          especialidad: "Neumología / Medicina Interna"
        },
        soap: {
          subjetivo: "Paciente adulto mayor con antecedente de tabaquismo pesado, refiere disnea grado IV mMRC y fatiga muscular ventilatoria.",
          objetivo: "Tórax en tonel, tirajes intercostales, espiración prolongada y roncus dispersos. Gasometría arterial con acidosis respiratoria moderada hipercapnica (PaCO2: 52 mmHg). SpO2: 89% con Venturi al 35%.",
          analisis: "Exacerbación aguda infecciosa de EPOC fenotipo enfisematoso y cor pulmonale descompensado.",
          plan: "Ventilación mecánica no invasiva (BiPAP) nocturna, terapia broncodilatadora dual, corticoterapia sistémica y profilaxis antitrombótica."
        },
        diagnosticos_cie10: [
          { codigo: "J44.1", descripcion: "Enfermedad pulmonar obstructiva crónica con exacerbación aguda", tipo: "Principal" },
          { codigo: "I50.9", descripcion: "Insuficiencia cardíaca, no especificada", tipo: "Comorbilidad" }
        ]
      }
    ],
    ultimos_signos_vitales: [
      {
        fecha_hora: new Date("2026-10-14T07:00:00Z"),
        sistolica: 135,
        diastolica: 85,
        fc: 92,
        fr: 24,
        temp: 37.2,
        spo2: 91,
        glucometria: 115,
        enfermero: "Enf. Santiago Cano"
      },
      {
        fecha_hora: new Date("2026-10-14T13:00:00Z"),
        sistolica: 130,
        diastolica: 82,
        fc: 88,
        fr: 21,
        temp: 36.9,
        spo2: 93,
        glucometria: 110,
        enfermero: "Enf. Santiago Cano"
      }
    ],
    medicamentos_activos: [
      {
        medicamento: "Bromuro de Ipratropio + Fenoterol Solución",
        principio_activo: "Bromuro de Ipratropio",
        dosis: "20 gotas micronebulizadas",
        via: "Inhalatoria",
        frecuencia: "c/6h",
        fecha_inicio: new Date("2026-10-11T21:00:00Z"),
        medico_prescriptor: "Dra. Marcela Restrepo Gómez",
        estado_orden: "ACTIVA"
      },
      {
        medicamento: "Metilprednisolona 40mg IV",
        principio_activo: "Metilprednisolona",
        dosis: "40 mg",
        via: "IV",
        frecuencia: "c/12h",
        fecha_inicio: new Date("2026-10-11T21:00:00Z"),
        medico_prescriptor: "Dra. Marcela Restrepo Gómez",
        estado_orden: "ACTIVA"
      },
      {
        medicamento: "Enoxaparina 40mg SC",
        principio_activo: "Enoxaparina sódica",
        dosis: "40 mg",
        via: "SC",
        frecuencia: "c/24h",
        fecha_inicio: new Date("2026-10-12T08:00:00Z"),
        medico_prescriptor: "Dra. Marcela Restrepo Gómez",
        estado_orden: "ACTIVA"
      }
    ],
    notas_enfermeria: [
      {
        id_nota: "NOT-ENF-002",
        turno: "Mañana",
        fecha_hora: new Date("2026-10-14T10:00:00Z"),
        enfermero: "Enf. Santiago Cano",
        procedimientos: "Asistencia en terapia con BiPAP durante 4 horas. Paciente tolera adecuadamente interfase oronasal. Micronebulización administrada puntualmente.",
        balance_hidrico: { ingresos_ml: 1500, egresos_ml: 1400, total_balance_ml: 100 }
      }
    ],
    resumen_alta: {
      emitido: false,
      fecha_alta: null,
      diagnostico_egreso_cie10: null,
      condicion_salida: "En hospitalización activa",
      medico_firmante: null,
      recomendaciones_egreso: null
    }
  },

  // ----------------------------------------------------------------------------
  // PACIENTE 3: María Lucía Gómez Urrego (Caldas - Hosp. San Vicente de Paúl)
  // ----------------------------------------------------------------------------
  {
    codigo_admision: "ADM-HSVP-2026-0518",
    estado: "ACTIVO",
    hospital: {
      id_hospital: 3,
      nombre: "Hospital San Vicente de Paúl E.S.E. de Caldas",
      nivel_complejidad: "Media",
      subregion: "Valle de Aburrá",
      municipio: "Caldas"
    },
    paciente: {
      id_paciente: 103,
      tipo_documento: "CC",
      numero_documento: "1036987412",
      nombre_completo: "María Lucía Gómez Urrego",
      edad: 26,
      sexo: "F",
      tipo_sangre: "A+",
      alergias_criticas: ["Sin alergias medicamentosas conocidas (NKDA)"]
    },
    ubicacion_actual: {
      pabellon: "Cirugía General - Postoperatorio",
      piso: 1,
      cama: "C-108"
    },
    fecha_ingreso: new Date("2026-10-12T04:15:00Z"),
    triage_origen: {
      clasificacion: "Triage I",
      motivo: "Dolor abdominal agudo en fosa ilíaca derecha con signos de irritación peritoneal (Blumberg positivo).",
      fecha_triage: new Date("2026-10-12T02:30:00Z")
    },
    evoluciones_medicas: [
      {
        id_evolucion: "EVO-HSVP-003-01",
        fecha_registro: new Date("2026-10-13T08:15:00Z"),
        medico_tratante: {
          id_medico: 203,
          nombre: "Dr. Felipe Morales Villa",
          registro_medico: "RM-11204-ANT",
          especialidad: "Cirugía General"
        },
        soap: {
          subjetivo: "Postoperatorio día 1 de apendicectomía laparoscópica por apendicitis perforada. Refiere dolor en herida quirúrgica controlado (EVA: 3/10). Inicia expulsión de gases.",
          objetivo: "Abdomen blando, depresible, dolor moderado a la palpación periincisional. Puertos laparoscópicos limpios y secos, sin sangrado ni eritema. Drenaje de Jackson-Pratt con escaso líquido serohemático (30 cc). Ruidos hidroaéreos presentes.",
          analisis: "Evolución postquirúrgica satisfactoria. Tránsito intestinal restablecido.",
          plan: "Iniciar tolerancia a dieta líquida clara, continuar analgesia escalonada, antibiótico profiláctico IV y deambulación temprana asistida."
        },
        diagnosticos_cie10: [
          { codigo: "K35.8", descripcion: "Apendicitis aguda, otra y la no especificada (con peritonitis localizada)", tipo: "Principal" }
        ]
      }
    ],
    ultimos_signos_vitales: [
      {
        fecha_hora: new Date("2026-10-14T06:30:00Z"),
        sistolica: 110,
        diastolica: 70,
        fc: 74,
        fr: 16,
        temp: 36.5,
        spo2: 99,
        glucometria: 88,
        enfermero: "Enf. Paula Andrea Tabares"
      },
      {
        fecha_hora: new Date("2026-10-14T14:00:00Z"),
        sistolica: 115,
        diastolica: 72,
        fc: 76,
        fr: 17,
        temp: 36.7,
        spo2: 98,
        glucometria: 92,
        enfermero: "Enf. Paula Andrea Tabares"
      }
    ],
    medicamentos_activos: [
      {
        medicamento: "Ceftriaxona 1g IV",
        principio_activo: "Ceftriaxona",
        dosis: "1 g",
        via: "IV",
        frecuencia: "c/24h",
        fecha_inicio: new Date("2026-10-12T06:00:00Z"),
        medico_prescriptor: "Dr. Felipe Morales Villa",
        estado_orden: "ACTIVA"
      },
      {
        medicamento: "Metronidazol 500mg IV",
        principio_activo: "Metronidazol",
        dosis: "500 mg",
        via: "IV",
        frecuencia: "c/8h",
        fecha_inicio: new Date("2026-10-12T06:00:00Z"),
        medico_prescriptor: "Dr. Felipe Morales Villa",
        estado_orden: "ACTIVA"
      },
      {
        medicamento: "Dipirona 1g IV",
        principio_activo: "Metamizol sódico (Dipirona)",
        dosis: "1 g",
        via: "IV",
        frecuencia: "c/8h",
        fecha_inicio: new Date("2026-10-12T06:00:00Z"),
        medico_prescriptor: "Dr. Felipe Morales Villa",
        estado_orden: "ACTIVA"
      }
    ],
    notas_enfermeria: [
      {
        id_nota: "NOT-ENF-003",
        turno: "Mañana",
        fecha_hora: new Date("2026-10-14T09:00:00Z"),
        enfermero: "Enf. Paula Andrea Tabares",
        procedimientos: "Curación de heridas quirúrgicas bajo técnica aséptica, apósitos limpios. Drenaje vaciado: 25 ml de serohemático.",
        balance_hidrico: { ingresos_ml: 1800, egresos_ml: 1650, total_balance_ml: 150 }
      }
    ],
    resumen_alta: {
      emitido: false,
      fecha_alta: null,
      diagnostico_egreso_cie10: null,
      condicion_salida: "En hospitalización activa",
      medico_firmante: null,
      recomendaciones_egreso: null
    }
  },

  // ----------------------------------------------------------------------------
  // PACIENTE 4: Jorge Iván Ceballos Morales (Caucasia - Hosp. César Uribe)
  // ----------------------------------------------------------------------------
  {
    codigo_admision: "ADM-HCUP-2026-0319",
    estado: "ACTIVO",
    hospital: {
      id_hospital: 4,
      nombre: "Hospital César Uribe Piedrahita E.S.E. de Caucasia",
      nivel_complejidad: "Media",
      subregion: "Bajo Cauca",
      municipio: "Caucasia"
    },
    paciente: {
      id_paciente: 104,
      tipo_documento: "CC",
      numero_documento: "98542136",
      nombre_completo: "Jorge Iván Ceballos Morales",
      edad: 52,
      sexo: "M",
      tipo_sangre: "O-",
      alergias_criticas: ["Betabloqueadores (Metoprolol/Propranolol)", "Medios de Contraste Yodados"]
    },
    ubicacion_actual: {
      pabellon: "Medicina Interna / Aislamiento Metabólico",
      piso: 2,
      cama: "C-204"
    },
    fecha_ingreso: new Date("2026-10-11T16:20:00Z"),
    triage_origen: {
      clasificacion: "Triage I",
      motivo: "Descompensación metabólica severa con aliento cetónico, respiración de Kussmaul y deshidratación grave.",
      fecha_triage: new Date("2026-10-11T15:10:00Z")
    },
    evoluciones_medicas: [
      {
        id_evolucion: "EVO-HCUP-004-01",
        fecha_registro: new Date("2026-10-12T06:30:00Z"),
        medico_tratante: {
          id_medico: 204,
          nombre: "Dra. Claudia Patricia Álvarez Ruiz",
          registro_medico: "RM-07319-ANT",
          especialidad: "Medicina Interna"
        },
        soap: {
          subjetivo: "Paciente con antecedente de DM2 de 15 años de evolución sin adherencia a tratamiento. Refiere somnolencia, polidipsia intensa y dolor abdominal difuso.",
          objetivo: "Glucometría inicial de ingreso: 485 mg/dL. Cetonuria positiva (+++). Gases arteriales: pH 7.22, HCO3 12 mEq/L, Anion Gap elevado (20). Mucosas secas, signos de deshidratación grado II.",
          analisis: "Cetoacidosis diabética moderada detonada por infección de tejidos blandos en hallux derecho (Wagner grado II).",
          plan: "Protocolo de rehidratación agresiva con cristaloides (SSN 0.9%), bomba de infusión continua de insulina regular a 0.1 UI/kg/h con monitoreo horario de potasio y glucometría."
        },
        diagnosticos_cie10: [
          { codigo: "E11.1", descripcion: "Diabetes mellitus tipo 2, con cetoacidosis", tipo: "Principal" },
          { codigo: "E11.5", descripcion: "Diabetes mellitus tipo 2, con complicaciones circulatorias periféricas (pie diabético)", tipo: "Relacionado" }
        ]
      }
    ],
    ultimos_signos_vitales: [
      {
        fecha_hora: new Date("2026-10-14T06:00:00Z"),
        sistolica: 125,
        diastolica: 78,
        fc: 84,
        fr: 18,
        temp: 36.8,
        spo2: 98,
        glucometria: 180,
        enfermero: "Enf. Juan Camilo Quiroz"
      },
      {
        fecha_hora: new Date("2026-10-14T12:00:00Z"),
        sistolica: 120,
        diastolica: 75,
        fc: 80,
        fr: 18,
        temp: 36.6,
        spo2: 98,
        glucometria: 162,
        enfermero: "Enf. Juan Camilo Quiroz"
      }
    ],
    medicamentos_activos: [
      {
        medicamento: "Insulina Cristalina en Infusión Continua",
        principio_activo: "Insulina humana regular",
        dosis: "4 UI/hora según protocolo dinámico",
        via: "IV",
        frecuencia: "Infusión continua",
        fecha_inicio: new Date("2026-10-11T17:00:00Z"),
        medico_prescriptor: "Dra. Claudia Patricia Álvarez Ruiz",
        estado_orden: "ACTIVA"
      },
      {
        medicamento: "Clindamicina 600mg IV",
        principio_activo: "Clindamicina fosfato",
        dosis: "600 mg",
        via: "IV",
        frecuencia: "c/6h",
        fecha_inicio: new Date("2026-10-11T17:30:00Z"),
        medico_prescriptor: "Dra. Claudia Patricia Álvarez Ruiz",
        estado_orden: "ACTIVA"
      },
      {
        medicamento: "Ciprofloxacino 400mg IV",
        principio_activo: "Ciprofloxacino",
        dosis: "400 mg",
        via: "IV",
        frecuencia: "c/12h",
        fecha_inicio: new Date("2026-10-11T17:30:00Z"),
        medico_prescriptor: "Dra. Claudia Patricia Álvarez Ruiz",
        estado_orden: "ACTIVA"
      }
    ],
    notas_enfermeria: [
      {
        id_nota: "NOT-ENF-004",
        turno: "Mañana",
        fecha_hora: new Date("2026-10-14T11:00:00Z"),
        enfermero: "Enf. Juan Camilo Quiroz",
        procedimientos: "Control estricto de glucometría horaria en meta (162 mg/dL). Ajuste de bomba de insulina según escala móvil médica. Curación plana de lesión en pie derecho.",
        balance_hidrico: { ingresos_ml: 2500, egresos_ml: 2100, total_balance_ml: 400 }
      }
    ],
    resumen_alta: {
      emitido: false,
      fecha_alta: null,
      diagnostico_egreso_cie10: null,
      condicion_salida: "En hospitalización activa",
      medico_firmante: null,
      recomendaciones_egreso: null
    }
  },

  // ----------------------------------------------------------------------------
  // PACIENTE 5: Valeria Montoya Higuita (Medellín - Hospital La María - EGRESADA)
  // ----------------------------------------------------------------------------
  {
    codigo_admision: "ADM-HLM-2026-0720",
    estado: "EGRESADO",
    hospital: {
      id_hospital: 5,
      nombre: "Hospital La María E.S.E. de Medellín",
      nivel_complejidad: "Alta",
      subregion: "Valle de Aburrá",
      municipio: "Medellín"
    },
    paciente: {
      id_paciente: 105,
      tipo_documento: "CC",
      numero_documento: "1020456789",
      nombre_completo: "Valeria Montoya Higuita",
      edad: 22,
      sexo: "F",
      tipo_sangre: "AB+",
      alergias_criticas: ["Dipirona (Metamizol)", "Morfina / Opiáceos"]
    },
    ubicacion_actual: {
      pabellon: "Neurología / Observación Hospitalaria",
      piso: 4,
      cama: "C-410"
    },
    fecha_ingreso: new Date("2026-10-08T09:00:00Z"),
    triage_origen: {
      clasificacion: "Triage II",
      motivo: "Traumatismo craneoencefálico leve-moderado por accidente de tránsito como parrillera de motocicleta.",
      fecha_triage: new Date("2026-10-08T07:30:00Z")
    },
    evoluciones_medicas: [
      {
        id_evolucion: "EVO-HLM-005-01",
        fecha_registro: new Date("2026-10-09T08:00:00Z"),
        medico_tratante: {
          id_medico: 205,
          nombre: "Dr. Jorge Eliécer Barrientos Peña",
          registro_medico: "RM-03487-ANT",
          especialidad: "Neurocirugía"
        },
        soap: {
          subjetivo: "Paciente lúcida, orientada en las tres esferas. Refiere cefalea occipital leve (EVA: 2/10). No presenta episodios eméticos ni amnesia retrógrada.",
          objetivo: "Escala de Glasgow 15/15 (Ocular 4, Verbal 5, Motor 6). Pupilas isocóricas reactivas a la luz de 3 mm. Fuerza y tono muscular conservados (5/5). TAC cerebral simple de control: resolución de edema subgaleal sin hematomas epidurales ni subdurales.",
          analisis: "Evolución clínica satisfactoria de traumatismo craneoencefálico leve con TAC normal y estabilidad neurológica durante 72 horas de observación continua.",
          plan: "Definir alta hospitalaria con pautas de alarma neurológica y cita de control por consulta externa de neurocirugía."
        },
        diagnosticos_cie10: [
          { codigo: "S06.0", descripcion: "Conmoción cerebral (Traumatismo craneoencefálico)", tipo: "Principal" }
        ]
      }
    ],
    ultimos_signos_vitales: [
      {
        fecha_hora: new Date("2026-10-11T08:00:00Z"),
        sistolica: 115,
        diastolica: 72,
        fc: 68,
        fr: 16,
        temp: 36.4,
        spo2: 99,
        glucometria: 85,
        enfermero: "Enf. Luz Marina Zapata"
      }
    ],
    medicamentos_activos: [
      {
        medicamento: "Acetaminofén 1g VO",
        principio_activo: "Paracetamol (Acetaminofén)",
        dosis: "1 g",
        via: "VO",
        frecuencia: "c/8h",
        fecha_inicio: new Date("2026-10-08T10:00:00Z"),
        medico_prescriptor: "Dr. Jorge Eliécer Barrientos Peña",
        estado_orden: "FINALIZADA"
      }
    ],
    notas_enfermeria: [
      {
        id_nota: "NOT-ENF-005",
        turno: "Mañana",
        fecha_hora: new Date("2026-10-11T10:00:00Z"),
        enfermero: "Enf. Luz Marina Zapata",
        procedimientos: "Retiro de catéter venoso periférico, entrega de pertenencias, firma de consentimiento de egreso y explicación detallada de signos de alarma.",
        balance_hidrico: { ingresos_ml: 800, egresos_ml: 750, total_balance_ml: 50 }
      }
    ],
    resumen_alta: {
      emitido: true,
      fecha_alta: new Date("2026-10-11T11:00:00Z"),
      diagnostico_egreso_cie10: "S06.0 - Conmoción cerebral",
      condicion_salida: "Mejoría clínica",
      medico_firmante: "Dr. Jorge Eliécer Barrientos Peña (RM-03487-ANT)",
      recomendaciones_egreso: "Reposo físico relativo por 7 días, evitar actividades de impacto, no conducir y acudir inmediatamente a urgencias ante cefalea intensa progresiva o vómito persistente."
    }
  }
]);

print(">> Carga de datos exitosa: 5 pacientes con registros clínicos completos insertados en HCE_Hospitalizacion_Antioquia.");

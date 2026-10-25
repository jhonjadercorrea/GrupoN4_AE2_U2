/**
 * ==============================================================================
 * PROYECTO DE AULA: HISTORIA CLÍNICA ELECTRÓNICA - GOBERNACIÓN DE ANTIOQUIA
 * ASIGNATURA: BASES DE DATOS II (NOSQL) - UNIDAD 2 - ACTIVIDAD DE APRENDIZAJE 2
 * INTEGRANTES (GRUPO 4): Jhon Jader Correa Ruiz - Juan Esteban Castaño Montoya
 * DOCENTE: Oralia Cortés Grajales
 * INSTITUCIÓN UNIVERSITARIA PASCUAL BRAVO - MEDELLÍN, COLOMBIA - 2026
 * ==============================================================================
 * SCRIPT 01: DEFINICIÓN DDL Y VALIDACIÓN DE ESQUEMA ($jsonSchema) EN MONGODB
 * Base de Datos: HCE_Hospitalizacion_Antioquia
 * Colección Principal: episodios_hospitalizacion
 * ==============================================================================
 */

// 1. Selección y uso de la base de datos departamental
use HCE_Hospitalizacion_Antioquia;

// Limpieza previa si existe la colección para ejecuciones idempotentes
db.episodios_hospitalizacion.drop();

// 2. Creación de la colección con Reglas de Validación Estricta BSON ($jsonSchema)
db.createCollection("episodios_hospitalizacion", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "codigo_admision",
        "estado",
        "hospital",
        "paciente",
        "ubicacion_actual",
        "fecha_ingreso",
        "triage_origen",
        "evoluciones_medicas",
        "ultimos_signos_vitales",
        "medicamentos_activos",
        "notas_enfermeria",
        "resumen_alta"
      ],
      properties: {
        codigo_admision: {
          bsonType: "string",
          pattern: "^ADM-[A-Z]{3,4}-[0-9]{4}-[0-9]{4}$",
          description: "Código estandarizado de admisión hospitalaria (ej. ADM-HGM-2026-0891)."
        },
        estado: {
          enum: ["ACTIVO", "EGRESADO", "REMITIDO", "FALLECIDO"],
          description: "Estado clínico-administrativo del episodio de hospitalización."
        },
        hospital: {
          bsonType: "object",
          required: ["id_hospital", "nombre", "nivel_complejidad", "subregion", "municipio"],
          properties: {
            id_hospital: { bsonType: "int", description: "ID único de la ESE hospitalaria." },
            nombre: { bsonType: "string", description: "Nombre oficial de la institución." },
            nivel_complejidad: { enum: ["Baja", "Media", "Alta"], description: "Nivel de atención en salud." },
            subregion: { bsonType: "string", description: "Subregión de Antioquia (Valle de Aburrá, Oriente, Bajo Cauca, etc.)." },
            municipio: { bsonType: "string", description: "Municipio sede del hospital." }
          }
        },
        paciente: {
          bsonType: "object",
          required: ["id_paciente", "tipo_documento", "numero_documento", "nombre_completo", "tipo_sangre", "alergias_criticas"],
          description: "Patrón de Referencia Extendida (Extended Reference) con datos inmutables críticos.",
          properties: {
            id_paciente: { bsonType: "int", description: "Identificador foráneo del maestro de pacientes." },
            tipo_documento: { enum: ["CC", "TI", "CE", "RC", "PA"], description: "Tipo de documento de identidad." },
            numero_documento: { bsonType: "string", description: "Número de documento del paciente." },
            nombre_completo: { bsonType: "string", description: "Nombres y apellidos completos del paciente." },
            edad: { bsonType: "int", minimum: 0, maximum: 120, description: "Edad cronológica al momento de ingreso." },
            sexo: { enum: ["M", "F", "OTRO"], description: "Sexo biológico / legal." },
            tipo_sangre: { enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], description: "Grupo sanguíneo y factor Rh." },
            alergias_criticas: {
              bsonType: "array",
              items: { bsonType: "string" },
              description: "Listado de principios activos o sustancias que provocan anafilaxia o eventos adversos."
            }
          }
        },
        ubicacion_actual: {
          bsonType: "object",
          required: ["pabellon", "piso", "cama"],
          properties: {
            pabellon: { bsonType: "string", description: "Pabellón asistencial (Medicina Interna, Cirugía, UCI, Pediatría)." },
            piso: { bsonType: "int", description: "Número de piso físico en el hospital." },
            cama: { bsonType: "string", description: "Identificador físico de la cama asignada (ej. C-302)." }
          }
        },
        fecha_ingreso: {
          bsonType: "date",
          description: "Marca temporal precisa de recepción e internamiento en hospitalización."
        },
        triage_origen: {
          bsonType: "object",
          required: ["clasificacion", "motivo", "fecha_triage"],
          properties: {
            clasificacion: { enum: ["Triage I", "Triage II", "Triage III", "Triage IV", "Triage V"], description: "Priorización clínica de entrada." },
            motivo: { bsonType: "string", description: "Motivo clínico de consulta de urgencia o derivación." },
            fecha_triage: { bsonType: "date", description: "Fecha y hora del registro de triage." }
          }
        },
        evoluciones_medicas: {
          bsonType: "array",
          minItems: 1,
          description: "Histórico evolutivo de notas de ronda médica bajo metodología estandarizada SOAP.",
          items: {
            bsonType: "object",
            required: ["id_evolucion", "fecha_registro", "medico_tratante", "soap", "diagnosticos_cie10"],
            properties: {
              id_evolucion: { bsonType: "string", description: "Identificador único de la nota evolutiva." },
              fecha_registro: { bsonType: "date", description: "Fecha y hora de la ronda médica." },
              medico_tratante: {
                bsonType: "object",
                required: ["id_medico", "nombre", "registro_medico", "especialidad"],
                properties: {
                  id_medico: { bsonType: "int" },
                  nombre: { bsonType: "string" },
                  registro_medico: { bsonType: "string" },
                  especialidad: { bsonType: "string" }
                }
              },
              soap: {
                bsonType: "object",
                required: ["subjetivo", "objetivo", "analisis", "plan"],
                properties: {
                  subjetivo: { bsonType: "string", description: "S: Manifestaciones subjetivas reportadas por el paciente." },
                  objetivo: { bsonType: "string", description: "O: Hallazgos clínicos del examen físico y signos actuales." },
                  analisis: { bsonType: "string", description: "A: Interpretación clínica, juicio médico y estado del cuadro patológico." },
                  plan: { bsonType: "string", description: "P: Conducta terapéutica, medicamentos ordenados y paraclínicos solicitados." }
                }
              },
              diagnosticos_cie10: {
                bsonType: "array",
                minItems: 1,
                items: {
                  bsonType: "object",
                  required: ["codigo", "descripcion", "tipo"],
                  properties: {
                    codigo: { bsonType: "string", description: "Código CIE-10 oficial (ej. J18.9)." },
                    descripcion: { bsonType: "string", description: "Nombre de la patología según CIE-10." },
                    tipo: { enum: ["Principal", "Relacionado", "Comorbilidad"], description: "Jerarquía clínica del diagnóstico." }
                  }
                }
              }
            }
          }
        },
        ultimos_signos_vitales: {
          bsonType: "array",
          description: "Subset Pattern: Últimas tomas de constantes vitales para monitoreo ágil en piso.",
          items: {
            bsonType: "object",
            required: ["fecha_hora", "sistolica", "diastolica", "fc", "fr", "temp", "spo2", "enfermero"],
            properties: {
              fecha_hora: { bsonType: "date", description: "Marca temporal de la toma de signos." },
              sistolica: { bsonType: "int", minimum: 40, maximum: 260, description: "Presión arterial sistólica (mmHg)." },
              diastolica: { bsonType: "int", minimum: 20, maximum: 160, description: "Presión arterial diastólica (mmHg)." },
              fc: { bsonType: "int", minimum: 30, maximum: 220, description: "Frecuencia cardíaca (lpm)." },
              fr: { bsonType: "int", minimum: 8, maximum: 60, description: "Frecuencia respiratoria (rpm)." },
              temp: { bsonType: "double", minimum: 32.0, maximum: 43.0, description: "Temperatura axilar (°C)." },
              spo2: { bsonType: "int", minimum: 50, maximum: 100, description: "Saturación periférica de oxígeno (%)." },
              glucometria: { bsonType: "int", description: "Glucemia capilar (mg/dL) opcional." },
              enfermero: { bsonType: "string", description: "Nombre y firma del profesional de enfermería responsable." }
            }
          }
        },
        medicamentos_activos: {
          bsonType: "array",
          description: "Órdenes farmacológicas vigentes cruzadas con antecedentes de alergias de triage.",
          items: {
            bsonType: "object",
            required: ["medicamento", "principio_activo", "dosis", "via", "frecuencia", "fecha_inicio", "medico_prescriptor", "estado_orden"],
            properties: {
              medicamento: { bsonType: "string", description: "Nombre comercial o presentación del fármaco." },
              principio_activo: { bsonType: "string", description: "Molécula base para control de alergias cruzadas." },
              dosis: { bsonType: "string", description: "Cantidad administrada (ej. 1.5g, 500mg, 2 puff)." },
              via: { enum: ["IV", "VO", "IM", "SC", "Inhalatoria", "Tópica"], description: "Vía de administración." },
              frecuencia: { bsonType: "string", description: "Intervalo posológico (ej. c/6h, c/8h, c/12h, c/24h)." },
              fecha_inicio: { bsonType: "date", description: "Inicio del esquema de medicación." },
              medico_prescriptor: { bsonType: "string", description: "Médico tratante que ordenó la dosis." },
              estado_orden: { enum: ["ACTIVA", "SUSPENDIDA", "FINALIZADA"], description: "Estado de la prescripción." }
            }
          }
        },
        notas_enfermeria: {
          bsonType: "array",
          description: "Bitácora continua de procedimientos, curaciones y cuidados de piso.",
          items: {
            bsonType: "object",
            required: ["id_nota", "turno", "fecha_hora", "enfermero", "procedimientos", "balance_hidrico"],
            properties: {
              id_nota: { bsonType: "string" },
              turno: { enum: ["Mañana", "Tarde", "Noche"], description: "Turno asistencial de enfermería." },
              fecha_hora: { bsonType: "date" },
              enfermero: { bsonType: "string" },
              procedimientos: { bsonType: "string", description: "Detalle de cuidados, curaciones y estado general del paciente." },
              balance_hidrico: {
                bsonType: "object",
                required: ["ingresos_ml", "egresos_ml", "total_balance_ml"],
                properties: {
                  ingresos_ml: { bsonType: "int" },
                  egresos_ml: { bsonType: "int" },
                  total_balance_ml: { bsonType: "int" }
                }
              }
            }
          }
        },
        resumen_alta: {
          bsonType: "object",
          required: ["emitido", "fecha_alta", "diagnostico_egreso_cie10", "condicion_salida"],
          properties: {
            emitido: { bsonType: "bool", description: "Indicador de si la epicrisis final fue firmada y emitida." },
            fecha_alta: { bsonType: ["date", "null"], description: "Marca temporal de egreso o null si sigue hospitalizado." },
            diagnostico_egreso_cie10: { bsonType: ["string", "null"], description: "Diagnóstico final de cierre de estancia." },
            condicion_salida: { enum: ["En hospitalización activa", "Mejoría clínica", "Curación", "Remisión a mayor complejidad", "Defunción", "Alta voluntaria"] },
            medico_firmante: { bsonType: ["string", "null"] },
            recomendaciones_egreso: { bsonType: ["string", "null"] }
          }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// 3. Creación de Índices Estratégicos para Alta Concurrencia Asistencial
db.episodios_hospitalizacion.createIndex({ codigo_admision: 1 }, { unique: true, name: "idx_codigo_admision_unique" });
db.episodios_hospitalizacion.createIndex({ "paciente.id_paciente": 1, estado: 1 }, { name: "idx_paciente_estado" });
db.episodios_hospitalizacion.createIndex({ "hospital.id_hospital": 1, "ubicacion_actual.piso": 1, "ubicacion_actual.cama": 1 }, { name: "idx_censo_camas" });
db.episodios_hospitalizacion.createIndex({ "evoluciones_medicas.diagnosticos_cie10.codigo": 1 }, { name: "idx_cie10_diagnosticos" });
db.episodios_hospitalizacion.createIndex({ "medicamentos_activos.principio_activo": 1, "medicamentos_activos.estado_orden": 1 }, { name: "idx_farmacoseguridad" });

print(">> Base de datos HCE_Hospitalizacion_Antioquia y colección episodios_hospitalizacion configuradas con éxito ($jsonSchema + Índices).");

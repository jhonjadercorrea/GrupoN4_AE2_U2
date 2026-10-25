/**
 * ==============================================================================
 * PROYECTO DE AULA: HISTORIA CLÍNICA ELECTRÓNICA - GOBERNACIÓN DE ANTIOQUIA
 * ASIGNATURA: BASES DE DATOS II (NOSQL) - UNIDAD 2 - ACTIVIDAD DE APRENDIZAJE 2
 * INTEGRANTES (GRUPO 4): Jhon Jader Correa Ruiz - Juan Esteban Castaño Montoya
 * DOCENTE: Oralia Cortés Grajales
 * INSTITUCIÓN UNIVERSITARIA PASCUAL BRAVO - MEDELLÍN, COLOMBIA - 2026
 * ==============================================================================
 * SCRIPT 03: CONSULTAS DE VALIDACIÓN CLÍNICA (FIND & AGGREGATE PIPELINES)
 * Base de Datos: HCE_Hospitalizacion_Antioquia
 * Colección: episodios_hospitalizacion
 * ==============================================================================
 */

use HCE_Hospitalizacion_Antioquia;

print("==============================================================================");
print("CONSULTA 1: CENSO ASISTENCIAL DE PACIENTES ACTIVOS CON PATOLOGÍAS RESPIRATORIAS");
print("Propósito: Identificar pacientes con diagnósticos CIE-10 respiratorios (J18.9, J44.1)");
print("==============================================================================");

const consulta1 = db.episodios_hospitalizacion.find(
  {
    estado: "ACTIVO",
    "evoluciones_medicas.diagnosticos_cie10.codigo": { $in: ["J18.9", "J44.1"] }
  },
  {
    codigo_admision: 1,
    "hospital.nombre": 1,
    "paciente.nombre_completo": 1,
    "paciente.edad": 1,
    "paciente.alergias_criticas": 1,
    "ubicacion_actual.pabellon": 1,
    "ubicacion_actual.cama": 1,
    "ultimos_signos_vitales": { $slice: -1 } // Proyecta únicamente la última constante vital registrada
  }
).pretty();

printjson(consulta1.toArray());


print("\n==============================================================================");
print("CONSULTA 2: PIPELINE DE AGREGACIÓN - HISTÓRICO Y CURVA TÉRMICA/HEMODINÁMICA");
print("Propósito: Reconstrucción cronológica de constantes vitales para monitoreo clínico");
print("==============================================================================");

const consulta2 = db.episodios_hospitalizacion.aggregate([
  // Etapa 1: Filtrar el episodio específico del paciente de interés
  {
    $match: {
      codigo_admision: "ADM-HGM-2026-0891"
    }
  },
  // Etapa 2: Aplanar el array de constantes vitales para tratar cada toma como un documento independiente
  {
    $unwind: "$ultimos_signos_vitales"
  },
  // Etapa 3: Ordenamiento temporal cronológico ascendente por fecha y hora de medición
  {
    $sort: {
      "ultimos_signos_vitales.fecha_hora": 1
    }
  },
  // Etapa 4: Proyección limpia de los parámetros hemodinámicos y ventilatorios
  {
    $project: {
      _id: 0,
      codigo_admision: "$codigo_admision",
      paciente: "$paciente.nombre_completo",
      cama: "$ubicacion_actual.cama",
      fecha_hora_medicion: "$ultimos_signos_vitales.fecha_hora",
      presion_arterial: {
        $concat: [
          { $toString: "$ultimos_signos_vitales.sistolica" },
          "/",
          { $toString: "$ultimos_signos_vitales.diastolica" },
          " mmHg"
        ]
      },
      frecuencia_cardiaca_lpm: "$ultimos_signos_vitales.fc",
      frecuencia_respiratoria_rpm: "$ultimos_signos_vitales.fr",
      temperatura_grados_c: "$ultimos_signos_vitales.temp",
      saturacion_oxigeno_pct: "$ultimos_signos_vitales.spo2",
      enfermero_responsable: "$ultimos_signos_vitales.enfermero"
    }
  }
]);

printjson(consulta2.toArray());


print("\n==============================================================================");
print("CONSULTA 3: PIPELINE DE AGREGACIÓN - AUDITORÍA FARMACOLÓGICA DE PISO");
print("Propósito: Consolidar medicamentos activos prescritos, dosis y médicos tratantes");
print("==============================================================================");

const consulta3 = db.episodios_hospitalizacion.aggregate([
  // Etapa 1: Filtrar episodios en hospitalización activa
  {
    $match: {
      estado: "ACTIVO"
    }
  },
  // Etapa 2: Desanidar el array de órdenes farmacológicas
  {
    $unwind: "$medicamentos_activos"
  },
  // Etapa 3: Filtrar solo las prescripciones que se encuentran activas en el turno
  {
    $match: {
      "medicamentos_activos.estado_orden": "ACTIVA"
    }
  },
  // Etapa 4: Agrupar por principio activo para auditoría farmacéutica departamental
  {
    $group: {
      _id: "$medicamentos_activos.principio_activo",
      total_pacientes_en_tratamiento: { $sum: 1 },
      presentaciones_prescritas: { $addToSet: "$medicamentos_activos.medicamento" },
      vias_administracion: { $addToSet: "$medicamentos_activos.via" },
      medicos_prescriptores: { $addToSet: "$medicamentos_activos.medico_prescriptor" },
      detalle_camas: {
        $push: {
          paciente: "$paciente.nombre_completo",
          cama: "$ubicacion_actual.cama",
          hospital: "$hospital.nombre",
          dosis: "$medicamentos_activos.dosis",
          frecuencia: "$medicamentos_activos.frecuencia"
        }
      }
    }
  },
  // Etapa 5: Ordenar por volumen de uso descendente
  {
    $sort: {
      total_pacientes_en_tratamiento: -1
    }
  }
]);

printjson(consulta3.toArray());

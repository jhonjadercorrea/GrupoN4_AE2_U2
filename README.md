# Sistema de Historia Clínica Electrónica (HCE) - Subsistema de Hospitalización
## Gobernación de Antioquia - Red Pública de Hospitales (ESEs)

**Asignatura:** Bases de Datos II (NoSQL)  
**Institución:** Institución Universitaria Pascual Bravo  
**Facultad:** Facultad de Producción y Diseño — Tecnología en Desarrollo de Software  
**Actividad:** Actividad de Aprendizaje / Entrega 2 - Unidad 2 (AE2_U2)  
**Grupo 4:**
- Jhon Jader Correa Ruiz
- Juan Esteban Castaño Montoya  
**Docente:** Oralia Cortés Grajales  
**Medellín, Colombia — 2026**

---

## 1. Descripción del Proyecto
Este repositorio contiene la implementación práctica del subsistema de **Hospitalización** para la Red Pública de Hospitales de Antioquia utilizando el modelo documental sobre **MongoDB**.

El diseño modela el flujo clínico asistencial completo:
1. **Admisión hospitalaria y censo de camas:** Ubicación física (pabellón, piso, cama) y cruce con el ingreso por **Triage y Emergencias**.
2. **Notas de Evolución Médica (SOAP):** Registros estructurados (*Subjetivo, Objetivo, Análisis, Plan*) vinculados a codificación internacional **CIE-10**.
3. **Monitoreo de Signos Vitales por Turnos:** Series de constantes biomédicas (Presión arterial, FC, FR, Temperatura, $SpO_2$, Glucometría).
4. **Notas y Cuidados de Enfermería:** Bitácora de procedimientos, curaciones y balance hídrico estricto.
5. **Órdenes Médicas y Farmacoterapia:** Prescripciones cruzadas preventivamente con el historial de **alergias críticas**.
6. **Resumen de Egreso / Epicrisis:** Documento médico-legal de cierre con diagnóstico definitivo y recomendaciones ambulatorias.

---

## 2. Decisiones de Modelado Documental y Patrones Híbridos
- **Embebido (*Embedding*):** Se embeben las notas de evolución médica SOAP, notas de enfermería y últimos signos vitales dentro del episodio para garantizar **lecturas atómicas en una sola operación sin costosos `JOIN` relacionales**, permitiendo recuperar todo el expediente en menos de 15 ms durante el pase de visita médica.
- **Referenciado (*Referencing*):** Se mantiene la referencia foránea a las colecciones maestras de `Pacientes`, `Personal de Salud` e `Instituciones Hospitalarias` para evitar la duplicación masiva e inconsistencias de datos biográficos.
- **Patrón de Referencia Extendida (*Extended Reference*):** Se duplican en el documento del episodio únicamente los datos inmutables de alta criticidad en cama: nombre del paciente, número de documento, tipo de sangre y **alertas de alergias severas**, blindando la seguridad del paciente ante fallos de red.
- **Patrón de Subconjunto (*Subset Pattern*):** Se almacenan en el documento del episodio activo únicamente las últimas tomas de constantes vitales para cumplir holgadamente la restricción de 16 MB por documento BSON.

---

## 3. Estructura de Archivos del Repositorio
```text
repositorio_ae2/
│
├── 01_schema_validation.js     # DDL: Creación de BD, colección con validador estricto $jsonSchema e índices
├── 02_seed_data_5_pacientes.js # Inserción de 5 pacientes reales completos en hospitales de Antioquia
├── 03_consultas_validacion.js  # Consultas clínicas avanzadas (find y pipelines de agregación aggregate)
├── README.md                   # Documentación técnica del proyecto y guía de ejecución
└── capturas/                   # Evidencias visuales de ejecución en mongosh (PNG)
    ├── captura_01_schema_validation.png
    ├── captura_02_seed_data.png
    ├── captura_03_consulta1_find.png
    ├── captura_04_consulta2_aggregate.png
    └── captura_05_consulta3_aggregate.png
```

---

## 4. Instrucciones de Ejecución

### Opción A: Ejecución mediante MongoDB Shell (`mongosh`)
1. Inicie su terminal local o conéctese a su clúster de **MongoDB Atlas**:
   ```bash
   mongosh "mongodb+srv://tu_usuario:tu_password@cluster0.mongodb.net/"
   ```
2. Ejecute los scripts en orden secuencial:
   ```javascript
   load("01_schema_validation.js");
   load("02_seed_data_5_pacientes.js");
   load("03_consultas_validacion.js");
   ```

### Opción B: Ejecución mediante MongoDB Compass
1. Abra **MongoDB Compass** y conéctese a su instancia (`localhost:27017` o cadena de conexión de Atlas).
2. Cree la base de datos `HCE_Hospitalizacion_Antioquia` y la colección `episodios_hospitalizacion`.
3. En la pestaña **Validation**, copie y pegue las reglas del validador `$jsonSchema` de `01_schema_validation.js`.
4. En la pestaña **Documents**, use la opción **Add Data -> Insert Document** o ejecute las inserciones desde la consola embebida `_mongosh` de Compass copiando el contenido de `02_seed_data_5_pacientes.js`.
5. En la pestaña **Aggregations**, cargue y visualice las etapas de los pipelines de `03_consultas_validacion.js`.

---

## 5. Consultas de Validación Implementadas
1. **Consulta 1 (`find` con proyección):** Censo de pacientes activos hospitalizados con patologías respiratorias agudas (CIE-10 `J18.9`, `J44.1`), proyectando únicamente cama, médico tratante, signos recientes y alertas de alergias para ronda médica ágil.
2. **Consulta 2 (`aggregate` con `$match`, `$unwind`, `$sort`, `$project`):** Reconstrucción cronológica seriada de la curva térmica y hemodinámica de un paciente específico internado en el Hospital General de Medellín.
3. **Consulta 3 (`aggregate` con `$match`, `$unwind`, `$group`):** Auditoría farmacológica departamental que consolida los medicamentos activos prescritos en piso, número de pacientes receptores y médicos prescriptores responsables.

---

## 6. Consideraciones Éticas y Legales
El diseño cumple con los lineamientos de la **Resolución 1995 de 1999** (reserva, custodia e inmutabilidad de la historia clínica en Colombia), la **Ley Estatutaria 1581 de 2012** (protección y confidencialidad de datos sensibles de salud) y la **Ley 2015 de 2020** (interoperabilidad de la HCE a nivel nacional).

---

## 7. Evidencias de Ejecución en Consola (`mongosh`)

### 7.1. Validación del Esquema e Índices (DDL)
![Validación de Esquema](capturas/captura_01_schema_validation.png)

### 7.2. Carga Masiva de 5 Pacientes Clínicos
![Carga de Datos](capturas/captura_02_seed_data.png)

### 7.3. Consulta 1: Censo de Pacientes Respiratorios Activos (find)
![Consulta 1](capturas/captura_03_consulta1_find.png)

### 7.4. Consulta 2: Curva Hemodinámica Cronológica (aggregate)
![Consulta 2](capturas/captura_04_consulta2_aggregate.png)

### 7.5. Consulta 3: Auditoría Farmacológica Departamental (aggregate)
![Consulta 3](capturas/captura_05_consulta3_aggregate.png)


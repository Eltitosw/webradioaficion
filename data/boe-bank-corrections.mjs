/**
 * Correcciones del banco frente a BOE-A-2013-7624 (y marco vigente).
 * El examen oficial se prepara con normativa actual, no con redacciones FEDI obsoletas.
 */
import { BOE_REG_AFICIONADOS_VIGENTE } from "./boe-normativa.mjs";

export const BOE_REF = BOE_REG_AFICIONADOS_VIGENTE;

/** Sustitución en texto de opciones (todas las fuentes del banco). */
export {
  OPTION_TEXT_REPLACEMENTS,
  STEM_TEXT_REPLACEMENTS,
} from "../lib/boe-bank-rules.mjs";

/**
 * Corrección por id de pregunta.
 * @type {Record<string, {
 *   correctIndex?: number,
 *   optionPatches?: { index: number, text: string }[],
 *   explain?: string,
 * }>}
 */
export const QUESTION_CORRECTIONS = {
  "fedi-ab-053": {
    optionPatches: [
      {
        index: 2,
        text: "Sí, previa autorización administrativa conforme a los arts. 24 y 25 del reglamento.",
      },
    ],
    explain: `El reglamento (${BOE_REF}) autoriza estaciones automáticas desatendidas (repetidores, radiobalizas, etc.) con resolución administrativa; no están prohibidas. La respuesta correcta es «Sí, previa autorización administrativa conforme a los arts. 24 y 25 del reglamento.».`,
  },
  "quijotes-84-1883": {
    optionPatches: [
      {
        index: 1,
        text: "Sí, previa autorización administrativa conforme al reglamento.",
      },
    ],
    explain: `Los repetidores son estaciones automáticas desatendidas reguladas en el art. 24 y autorizables según el art. 25 (${BOE_REF}). La respuesta correcta es «Sí, previa autorización administrativa conforme al reglamento.».`,
  },
  "fedi-a-074": {
    optionPatches: [
      {
        index: 3,
        text: "La Administración competente en telecomunicaciones (inspección del espectro)",
      },
    ],
    explain: `Las estaciones de aficionado quedan sometidas a la inspección de la Administración competente en materia de espectro (art. 33, ${BOE_REF}). «La Administración competente en telecomunicaciones (inspección del espectro)».`,
  },
  "fedi-b-288": {
    optionPatches: [
      {
        index: 2,
        text: "La Administración competente en espectro radioeléctrico",
      },
    ],
    explain: `Para utilizar una estación de radioaficionado hace falta la autorización de operador y, para emitir, la licencia de estación cuando proceda; lo gestiona la Administración competente (${BOE_REF}). «La Administración competente en espectro radioeléctrico».`,
  },
  "fedi-x-055": {
    optionPatches: [
      {
        index: 1,
        text: "Sí, previa autorización administrativa conforme a los arts. 24 y 25 del reglamento.",
      },
    ],
    correctIndex: 1,
    explain: `Los repetidores son estaciones automáticas desatendidas reguladas en el art. 24 y autorizables según el art. 25 (${BOE_REF}). La respuesta correcta es «Sí, previa autorización administrativa conforme a los arts. 24 y 25 del reglamento.».`,
  },
  "fedi-f-050": {
    correctIndex: 1,
    explain: `Las infracciones del sector telecomunicaciones se tipifican en la Ley 11/2022 (BOE-A-2022-10757), no en el reglamento de aficionados. «Ley 11/2022, de 28 de junio, General de Telecomunicaciones».`,
  },
  "quijotes-84-2085": {
    correctIndex: 1,
    explain: `Las infracciones del sector telecomunicaciones se tipifican en la Ley 11/2022 (BOE-A-2022-10757). «Ley 11/2022, de 28 de junio, General de Telecomunicaciones».`,
  },
  "quijotes-84-2077": {
    explain: `Según la Ley 11/2022 (BOE-A-2022-10757), retrasar injustificadamente la aportación de datos exigidos por la Administración puede ser infracción leve. «Leve.».`,
  },
  "fedi-f-042": {
    explain: `Según la Ley 11/2022 (BOE-A-2022-10757), retrasar injustificadamente la aportación de datos exigidos por la Administración puede ser infracción leve. «Leve.».`,
  },
  "fedi-h-060": {
    correctIndex: 1,
    explain: `Art. 25.h (${BOE_REF}): en VHF/UHF, estaciones automáticas desatendidas no superan 50 W de salida fuera del casco urbano (10 W dentro). «50 W.».`,
  },
  "quijotes-84-1810": {
    correctIndex: 3,
    explain: `Art. 25.h (${BOE_REF}): fuera del casco urbano, potencia de salida máxima de 50 W en VHF/UHF desatendidas (salvo circunstancias especiales motivadas). «50 W.».`,
  },
  "fedi-d-563": {
    explain: `No atender el requerimiento de eliminar interferencias a radiodifusión/TV puede tipificarse como infracción grave según la Ley 11/2022 (BOE-A-2022-10757). «Grave».`,
  },
  "fedi-d-574": {
    explain: `El traslado de una estación móvil a otro vehículo debe notificarse a la Administración competente en el plazo que fija el reglamento (${BOE_REF}). «DIEZ días».`,
  },
  "fedi-d-431": {
    explain: `Cambiar el sistema radiante suele requerir informar a la Administración competente en telecomunicaciones; no es un cambio libre sin avisar (${BOE_REF}). «Sí, genéricamente con la obligación de informarlo a la Administración competente en telecomunicaciones.».`,
  },
  "quijotes-84-1875": {
    explain: `Tras cancelar la licencia, conservar el sistema radiante solo para recepción requiere autorización escrita del propietario o de la comunidad de propietarios (${BOE_REF}). «Autorización por escrito de la propiedad del inmueble o, en su caso, de la comunidad de propietarios.».`,
  },
  "quijotes-84-1936": {
    explain: `Cualquier modificación sustancial de la instalación exige comunicación o autorización ante la Administración competente, con el mismo procedimiento que una nueva instalación (${BOE_REF}). «Se debe solicitar a la Administración competente y seguir el mismo procedimiento que si se tratase de la primera instalación.».`,
  },
  "fedi-ag-011": {
    optionPatches: [
      { index: 0, text: "Transformador → rectificador → filtro → regulador" },
      { index: 1, text: "Rectificador → transformador → filtro → regulador" },
      { index: 2, text: "Regulador → filtro → transformador → rectificador" },
      { index: 3, text: "Filtro → transformador → regulador → rectificador" },
    ],
    correctIndex: 0,
    explain:
      "En una fuente lineal: el transformador adapta y aísla la CA de red, el rectificador convierte a CC pulsante, el filtro suaviza el rizado y el regulador estabiliza la tensión de salida. El orden habitual es transformador → rectificador → filtro → regulador.",
  },
};

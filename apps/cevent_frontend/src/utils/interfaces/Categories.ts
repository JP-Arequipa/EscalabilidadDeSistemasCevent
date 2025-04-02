/**
 * Interface for Event Category
 * @interface
 * @property {string} keyWord - e.g. 'Events'
 * @property {string} phrase - e.g. 'Events happening near you'
 * @property {string} color - e.g. '#FFC107'
 */
export interface EventCategory {
  keyWord: string;
  phrase: string;
  color: string;
}

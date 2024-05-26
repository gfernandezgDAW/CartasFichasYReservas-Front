export type SuggestionStatusType = 'Creada' | 'Aceptada' | 'Denegada';

export class Suggestion {
  createdAt: Date;
  title: string;
  description: string;
  status: SuggestionStatusType;
}

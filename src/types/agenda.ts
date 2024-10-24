export interface AgendaItem {
  id: number;
  title: string;
  department: string;
  attendees: string[];
  startTime?: string;
  checkedInDepts?: string[];
  presenterCheckedIn?: boolean;
}
export interface IEnricoHoliday {
  date: {
    day: number,
    month: number,
    year: number,
  };
  dateTo?: {
    day: number,
    month: number,
    year: number,
  }
  name: [{
    lang: string,
    text: string,
  }]
  holidayType: string;
}



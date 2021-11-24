import { eachDayOfInterval, format } from 'date-fns';

import { MarkedDateProps, DayProps } from '.';
import { getPlataformDate } from '../../utils/getPlataformDate'
import theme from '../../styles/theme';

export function generateInterval(start: DayProps, end: DayProps){
  let interval: MarkedDateProps = {};
    /* Função que gera um array de intervalo de datas */
  eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp)})
  /* start : new Date(start.timestamp) , end : new Date(end.timestamp) */
  .forEach(( item ) => {
    const date = format(getPlataformDate(item), 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        color: start.dateString === date || end.dateString === date
        ? theme.colors.main : theme.colors.mainLight,

        textColor: start.dateString === date || end.dateString === date
        ? theme.colors.mainLight : theme.colors.main,        
      }
    }
  });

  return interval;
}
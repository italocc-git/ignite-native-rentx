import React from 'react'
import {Feather} from '@expo/vector-icons'
import {useTheme} from 'styled-components'
import {Calendar as CustomCalendar , LocaleConfig , DateCallbackHandler} from 'react-native-calendars'
import {ptBR} from './localeConfig'
import {generateInterval} from './generateInterval'
LocaleConfig.locales['pt-br'] = ptBR

LocaleConfig.defaultLocale='pt-br'


interface MarkedDateProps {
    [date : string] : {
        color: string;
        textColor: string;
        disabled ?: boolean;
        disabledTouchEvent ?: boolean;
    }
}

interface DayProps {
    day: number;
    dateString: string;
    month: number;
    timestamp: number;
    year: number;
    
}

interface CalendarProps {
    markedDates : MarkedDateProps;
    onDayPress : DateCallbackHandler;
}



function Calendar( {markedDates , onDayPress} : CalendarProps){
    const theme = useTheme();

    return(
        <CustomCalendar
            renderArrow={(direction) => 
            <Feather  size={24} color={theme.colors.text}
            name={direction === 'left' ? 'chevron-left' : 'chevron-right'} /> }
            
            headerStyle={{
                backgroundColor : theme.colors.backgroundSecondary,
                borderBottomWidth : 0.5,
                borderBottomColor : theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom : 10,
            }}
            theme={{
                textDayFontFamily : theme.fonts.primary400,
                textDayHeaderFontFamily : theme.fonts.primary500,
                textDayFontSize : 10,
                textMonthFontSize: 20,
                textMonthFontFamily : theme.fonts.secondary600,
                monthTextColor : theme.colors.title,
                arrowStyle : {
                    marginHorizontal : -15,
                }
            }}
            firstDay={1}
            minDate={new Date()}
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType='period'
        />

    )
}

export {
    generateInterval,
    DayProps,
    MarkedDateProps,
    Calendar

}
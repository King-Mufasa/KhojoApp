import React from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

class ScheduleAppointment extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <Calendar
                    // Initially visible month. Default = Date()
                //     current='2021-09-01'
                //     // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                //     // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                //     // Handler which gets executed on day press. Default = undefined
                //     onDayPress={(day) => {console.log('selected day', day)}}
                // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                //     monthFormat='yyyy MM'
                // // Handler which gets executed when visible month changes in calendar. Default = undefined
                // onMonthChange={(month) => {console.log('month changed', month)}}
                //                 // Hide month navigation arrows. Default = false
                // hideArrows={true}
                // // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={(direction) => {<Arrow />}}
                // // Do not show days of other months in month page. Default = false
                // hideExtraDays={true}
                // // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                // // day from another month that is visible in calendar page. Default = false
                // disableMonthChange={true}
                // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                // firstDay={1}
                markedDates={{
                '2020-09-16': {selected: true, marked: true},
                '2020-09-17': {marked: true},
                '2020-09-18': {disabled: true}
                }}
                />
            </SafeAreaView>
        )
    }

}



export default ScheduleAppointment
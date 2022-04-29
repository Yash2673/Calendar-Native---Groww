import React from 'react';
import { Button, ScrollView, Picker, Text, TextInput, View } from 'react-native';

class Calendar extends React.Component {

    months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"];

    weekDays = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    state = {
        activeDate: new Date(),
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        dateToRet : 1,
        weekRet : 1
    }

    _onPress = (item) => {
        this.setState(() => {
            if (!item.match && item != -1) {
                this.state.activeDate.setDate(item);
                return this.state;
            }
        });
    };

    getDays = () => {
        var days = [];
        for (var i = 1; i <= this.nDays[this.state.month]; i++) {
            days.push(i);
        }
        return days;
    }

    getYears = () => {
        var years = [];
        for (var i = 1978; i <= new Date().getFullYear(); i++) {
            years.push(i);
        }
        return years;
    }

    getWeek = (val, matrix) => {
        for (var row = 1; row < 7; row++) {
            for (var col = 0; col < 7; col++) {
                if (matrix[row][col] == val) {
                   this.setState({
                       weekRet : row
                   })
                   return;
                }
            }
        }
    }

    setYear = (val) => {
        this.setState({
            year: val
        })
    }

    setMonth = (val) => {
        this.setState({
            month: val
        })
    }

    setCalendar = () => {
        this.setState({
            activeDate: new Date(this.state.year, this.state.month)
        })
    }

    setDateToRet = (val, matrix) => {
        this.setState({
            dateToRet: val
        })
        this.getWeek(val, matrix);
    }

    generateMatrix() {
        var matrix = [];
        matrix[0] = this.weekDays;

        var year = this.state.activeDate.getFullYear();
        var month = this.state.activeDate.getMonth();

        var firstDay = new Date(year, month, 1).getDay();
        var maxDays = this.nDays[month];
        if (month == 1) {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    matrix[row][col] = counter++;
                }
            }
        }

        return matrix;
    }

    render() {
        var matrix = this.generateMatrix();
        var rows = [];
        var years = this.getYears();
        var days = this.getDays();
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                return (
                    <Text
                        style={{
                            flex: 1,
                            key: rowIndex,
                            height: 20,
                            textAlign: 'center',
                            backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
                            color: colIndex == 0 ? '#a00' : '#000',
                            fontWeight: item == this.state.activeDate.getDate()
                                ? 'bold' : ''
                        }}
                        onPress={() => this._onPress(item)}>
                        {item != -1 ? item : ''}
                    </Text>
                );
            });
            return (
                <View
                    style={{
                        flex: 1,
                        key: rowIndex,
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    {rowItems}
                </View>
            );
        });
        return (
            <View style={{
                height: "100%",
                width: "100%"
            }}>
                <View style={{
                    margin: 20
                }}>
                    <Text>Enter Year : </Text>
                    <View
                        style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 6,
                            fontSize: 20,
                            marginTop: 10,
                            marginBottom: 20
                        }}>
                        <Picker
                            selectedValue={String(this.state.year)}
                            onValueChange={(val) => this.setYear(val)}
                        >
                            {years.map((val, index) => {
                                return (
                                    <Picker.Item label={String(val)} value={String(val)} />
                                )
                            })}
                        </Picker>
                    </View>

                    <Text>Enter Month : </Text>
                    <View
                        style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 6,
                            fontSize: 20,
                            marginTop: 10,
                            marginBottom: 20
                        }}>
                        <Picker
                            selectedValue={String(this.state.month)}

                            onValueChange={(val) => this.setMonth(val)}
                        >
                            <Picker.Item label="January" value="0" />
                            <Picker.Item label="February" value="1" />
                            <Picker.Item label="March" value="2" />
                            <Picker.Item label="April" value="3" />
                            <Picker.Item label="May" value="4" />
                            <Picker.Item label="June" value="5" />
                            <Picker.Item label="July" value="6" />
                            <Picker.Item label="August" value="7" />
                            <Picker.Item label="September" value="8" />
                            <Picker.Item label="October" value="9" />
                            <Picker.Item label="November" value="10" />
                            <Picker.Item label="December" value="11" />
                        </Picker>
                    </View>
                    <Button title='Go' onPress={this.setCalendar} />
                </View>

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center'
                }}>
                    {this.months[this.state.activeDate.getMonth()]} &nbsp;
                    {this.state.activeDate.getFullYear()}
                </Text>

                <ScrollView>
                    {rows}
                    <Text
                        style={{
                            marginLeft: 20,
                        }}>Enter Date of the week (to be retrived) : 
                    </Text>
                    <View
                        style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 6,
                            fontSize: 20,
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop:10
                        }}>
                        <Picker
                            selectedValue={String(this.state.dateToRet)}
                            onValueChange={(val) => this.setDateToRet(val, matrix)}
                        >
                            {days.map((val, index) => {
                                return (
                                    <Picker.Item label={String(val)} value={String(val)} />
                                )
                            })}
                        </Picker>
                    </View>
                    <Text
                        style={{
                            marginLeft: 20,
                            marginTop:10
                        }}>Ans : {this.state.weekRet}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

export default Calendar
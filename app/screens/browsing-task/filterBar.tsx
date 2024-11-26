import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { useState } from 'react';
import { Appbar, Modal, Portal, Text, Button, PaperProvider, TextInput, Switch } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { i18n } from "@app/locales/i18n";
import MultiSlider from '@ptomasroos/react-native-multi-slider';



const FilterBar = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [sortMode, setSortMode] = useState("recommended");

    const [sortVisible, setSortVisible] = useState(false);
    const [distance, setDistance] = useState(0);
    const [multiSliderValue, setMultiSliderValue] = useState([0, 9999]);
    const [showAvailableOnly, setShowAvailableOnly] = useState(true);
    const [showNoOffers, setShowNoOffers] = useState(true);

    const multiSliderValuesChange = (values: any) => setMultiSliderValue(values);

    const showSortModal = () => setSortVisible(true);
    const hideSortModal = () => setSortVisible(false);

    const resetFilters = () => { 
        setSortMode('recommended'); 
        setMultiSliderValue([0, 9999]); 
        setDistance(0);
        setShowAvailableOnly(true);
        setShowNoOffers(true);
    }



    const priceRangeOptions = [
        0, 5, 10, 20, 50, 100, 150, 200, 300, 400, 500, 750, 1000, 2000, 3000, 5000, 7500, 9999
    ]


    return (
        <View>
            <Appbar.Header style={{ height: 38 }}>
                <View style={styles.container}>
                    <Button style={[styles.box]} mode="text" icon="filter-variant"
                        onPress={() => { showModal() }}>
                        <AirCarerText>Filter</AirCarerText>
                    </Button>
                    <Button style={[styles.box]} mode="text" icon="menu-down"
                        onPress={() => { showSortModal() }}>
                        <AirCarerText>Sort</AirCarerText>
                    </Button>
                </View>
            </Appbar.Header>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Button style={[styles.box]} mode="text" icon="arrow-left-thin"
                        onPress={() => { hideModal() }}>
                        <AirCarerText>Filter</AirCarerText>
                    </Button>
                    {/* 
                                    <AirCarerText>Categories</AirCarerText>

                                    <MultipleSelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={data} 
                        save="value"
                    />

                    <AirCarerText>To be done</AirCarerText>

                    <TouchableOpacity
                        style={[styles.option, toBeDone === 'inPerson' && styles.selectedOption]}
                        onPress={() => setToBeDone('inPerson')}
                    >
                        <AirCarerText style={styles.optionText}>
                            In Person
                        </AirCarerText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.option, toBeDone === 'remotely' && styles.selectedOption]}
                        onPress={() => setToBeDone('remotely')}
                    >
                            <AirCarerText style={styles.optionText}>
                            Remotely 
                        </AirCarerText>
                    </TouchableOpacity> 


                    <TouchableOpacity
                        style={[styles.option, toBeDone === 'all' && styles.selectedOption]}
                        onPress={() => setToBeDone('all')}
                    >
                        <AirCarerText style={styles.optionText}>
                            All
                        </AirCarerText>
                    </TouchableOpacity>
                    */}

                    <AirCarerText>Location</AirCarerText>

                    <TextInput
                        mode='outlined'
                        style={styles.input}
                        label='suburb'
                        outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
                    />

                    <AirCarerText>Distance: {distance.toFixed(0)} KMs</AirCarerText>


                    <MultiSlider
                        min={0}
                        max={200}
                        values={[distance]}
                        containerStyle={styles.sliderBar}
                        onValuesChangeFinish={(v) => { setDistance(v[0]) }}
                        onValuesChange={(v) => { setDistance(v[0]) }}
                    />

                    <AirCarerText>Price: ${multiSliderValue[0]} to ${multiSliderValue[1]}</AirCarerText>
                    <MultiSlider
                        containerStyle={styles.sliderBar}
                        values={[multiSliderValue[0], multiSliderValue[1]]}
                        onValuesChange={multiSliderValuesChange}
                        optionsArray={priceRangeOptions}
                        allowOverlap={false}
                        snapped
                    />

                    <View style={styles.row}>
                        <AirCarerText>Available jobs only</AirCarerText>
                        <Switch value={showAvailableOnly} onValueChange={() => { setShowAvailableOnly(!showAvailableOnly)}} />
                    </View>
                    <View style={styles.row}>
                        <AirCarerText>Show jobs with no offers</AirCarerText>
                        <Switch value={showNoOffers} onValueChange={() => { setShowNoOffers(!showNoOffers)}} />
                    </View>

                    <View style={styles.row}>
                        <Button mode="contained" style={styles.resetButton} onPress={() => {resetFilters();hideModal();}}>
                            <AirCarerText variant="button" style={styles.resetButtonText}>Reset</AirCarerText>
                        </Button>
                        <Button mode="contained" style={styles.applyButton} onPress={() => hideModal()}>
                            <AirCarerText variant="button" style={styles.applyButtonText}>Apply</AirCarerText>
                        </Button>
                    </View>
                </Modal>
                <Modal visible={sortVisible} onDismiss={hideSortModal} contentContainerStyle={styles.modalContainer}>
                    <Button style={[styles.box]} mode="text" icon="arrow-left-thin"
                        onPress={() => { hideSortModal() }}>
                        <AirCarerText>Sort</AirCarerText>
                    </Button>

                    <Button mode="text" 
                        icon={ 'recommended'=== sortMode ? 'check' : ''} 
                        onPress={() => {setSortMode('recommended'); setSortVisible(false)}}>
                       Recommended
                    </Button>
                    <Button mode="text" 
                     icon={ 'priceHigh'=== sortMode ? 'check' : ''} 
                     onPress={() => {setSortMode('priceHigh'); setSortVisible(false)}}>
                       Price: High to low
                    </Button>
                    <Button mode="text" 
                     icon={ 'priceLow'=== sortMode ? 'check' : ''} 
                     onPress={() => {setSortMode('priceLow'); setSortVisible(false)}}>
                    Price: Low to high
                    </Button>
                    <Button mode="text" 
                     icon={ 'newest'=== sortMode ? 'check' : ''} 
                     onPress={() => {setSortMode('newest'); setSortVisible(false)}}>
                    Newest tasks
                    </Button>
                    <Button mode="text" 
                     icon={ 'oldest'=== sortMode ? 'check' : ''} 
                     onPress={() => {setSortMode('oldest'); setSortVisible(false)}}>
                    Oldest tasks
                    </Button>
                    <Button mode="text" 
                     icon={ 'closest'=== sortMode ? 'check' : ''} 
                     onPress={() => {setSortMode('closest'); setSortVisible(false)}}>
                    Closes to me
                    </Button>
                </Modal>
            </Portal>

        </View>

    );
};


const styles = StyleSheet.create({
    sliderBar: {
        marginLeft: 20,
    },
    applyButton: {
        backgroundColor: theme.colors.primary,
    },
    applyButtonText: {

    },
    resetButton: {
        backgroundColor: '#e0e0e0'
    },
    resetButtonText: {
        color: "#555"
    },
    input: {
        width: '100%',
    },
    optionText: {
        fontSize: 16,
    },
    selectedOption: {
        backgroundColor: '#e0e0e0',
    },
    option: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        alignItems: 'center',
    },
    filterAppBarContainer: {

    },
    container: {
        flex: 1,
        flexWrap: 'wrap',
        alignContent: 'space-between',
    },
    box: {
        width: 80,
    },
    modalContainer: {
        margin: 10,

        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 10,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 0,
    }
})
export default FilterBar;
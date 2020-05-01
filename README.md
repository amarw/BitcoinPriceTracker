# BitcoinPriceTracker
React Native application that tracks Bitcoin price using Coindesk API

## Prerequisites
- MacOS machine
- Install react-native-cli using command 
- For running mobile app on iOS simulator, please setup Xcode, command line tools, cocoapods. 
- For running mobile app on android emulator, please setup Android Studio and create a virtual device 

## Run
- Clone this repository on your machine.
- `cd BitcoinPriceTracker`
- `yarn install`
- `cd ios && pod install`

To run your project, navigate to your project directory and run one of the following yarn commands.

- `cd BitcoinPriceTracker`
- `yarn ios`
- `yarn android`

## External libraries
**BitcoinPriceTracker** project makes use of following external libraries and documentation,

- `axios` (networking)
- `victory-native` & `react-native-svg` (chart)
- `react-native-keyboard-aware-scroll-view`
- `lodash`
- `@react-native-community/async-storage` (user input storage)

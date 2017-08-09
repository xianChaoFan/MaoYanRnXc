

import React, { PureComponent } from 'react'
import { StatusBar } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import color from './widget/color'
import { screen, system, tool } from './common'
import TabBarItem from './widget/TabBarItem'

import HomeScene from './scene/Home/HomeScene'
import MovieScene from './scene/Movie/MovieScene'
import CinemaScene from './scene/Cinema/CinemaScene'
import ShowScene from './scene/Show/ShowScene'
import MineScene from './scene/Mine/MineScene'

import WebScene from './widget/WebScene'
import GroupPurchaseScene from './scene/GroupPurchase/GroupPurchaseScene'
import MovieDetailScene from './scene/MovieDetail/MovieDetailScene'

const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

// create a component
class RootScene extends PureComponent {
    constructor() {
        super()

        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content')
                            } else {
                                StatusBar.setBarStyle('dark-content')
                            }
                        }
                    }
                }
            />
        );
    }
}

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '首页',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        // normalImage={require('./img/tabbar/pfb_tabbar_homepage@2x.png')}
                        // selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected@2x.png')}
                    />
                )
            }),
        },

        Movie: {
            screen: MovieScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '电影',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        // normalImage={require('./img/tabbar/pfb_tabbar_merchant@2x.png')}
                        // selectedImage={require('./img/tabbar/pfb_tabbar_merchant_selected@2x.png')}
                    />
                )
            }),
        },

        Cinema: {
            screen: CinemaScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '影院',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        // normalImage={require('./img/tabbar/pfb_tabbar_order@2x.png')}
                        // selectedImage={require('./img/tabbar/pfb_tabbar_order_selected@2x.png')}
                    />
                )
            }),
        },

        Show: {
            screen: ShowScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '演出',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        // normalImage={require('./img/tabbar/pfb_tabbar_order@2x.png')}
                        // selectedImage={require('./img/tabbar/pfb_tabbar_order_selected@2x.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        // normalImage={require('./img/tabbar/pfb_tabbar_mine@2x.png')}
                        // selectedImage={require('./img/tabbar/pfb_tabbar_mine_selected@2x.png')}
                    />
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },
    }

);

const Navigator = StackNavigator(
    {
        Tab: { screen: Tab },
        Web: { screen: WebScene },
        GroupPurchase: { screen: GroupPurchaseScene },
        MovieDetail: { screen: MovieDetailScene },
    },
    {
        navigationOptions: {
            // headerStyle: { backgroundColor: color.theme }
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        },
    }
);
//make this component available to the app
export default RootScene;

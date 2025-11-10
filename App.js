// ...existing code...
import * as React from 'react';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'RecentExpenses') {
            iconName = 'time-outline';
          } else if (route.name === 'AllExpenses') {
            iconName = 'list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={({ navigation }) => ({
          title: 'Recent Expenses',
          headerRight: ({ tintColor }) => (
            <Pressable
              onPress={() => {}}
              style={({ pressed }) => ({ marginRight: 16, opacity: pressed ? 0.7 : 1 })}
            >
              <Ionicons name="add" size={24} color={tintColor || '#000'} />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={({ navigation }) => ({
          title: 'All Expenses',
          headerRight: ({ tintColor }) => (
            <Pressable
              onPress={() => {}}
              style={({ pressed }) => ({ marginRight: 16, opacity: pressed ? 0.7 : 1 })}
            >
              <Ionicons name="add" size={24} color={tintColor || '#000'} />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CreateExpense" component={() => {}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
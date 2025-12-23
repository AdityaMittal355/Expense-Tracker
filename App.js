import * as React from 'react';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpenses';
import { Ionicons } from '@expo/vector-icons';
import NewExpense from './components/NewExpense';
import ExpensesContextProvider from './contexts/ExpensesContext';

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
        options={{
          title: 'Recent Expenses',
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpenses} />
          <Stack.Screen name="CreateExpense" component={NewExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
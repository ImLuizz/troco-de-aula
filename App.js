import { Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NewExpenseScreen from './screens/NewExpenseScreen';

const Tabs = createBottomTabNavigator();
const green = '#124D40';
const gold = '#FFD065';
const tabIcons = { Semana: 'time-outline', 'Novo gasto': 'add-circle-outline', Histórico: 'calendar-outline' };

function WeekScreen() {
  return (
    <View style={styles.page}>
      <Image style={styles.coin} source={require('./assets/android-icon-foreground.png')} />
      <Text style={styles.title}>Gastos da semana</Text>
      <Text style={styles.body}>Nenhum gasto registrado nos últimos 7 dias.</Text>
    </View>
  );
}

function HistoryScreen() {
  return (
    <View style={styles.page}>
      <Ionicons name="calendar-outline" size={48} color={gold} />
      <Text style={styles.title}>Histórico de gastos</Text>
      <Text style={styles.body}>Os gastos registrados durante o semestre aparecerão aqui.</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tabs.Navigator screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: green },
        headerTintColor: '#FFFFFF',
        tabBarStyle: { backgroundColor: green },
        tabBarActiveTintColor: gold,
        tabBarInactiveTintColor: '#D6E4DF',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} size={size} color={color} />
        ),
      })}>
        <Tabs.Screen name="Semana" component={WeekScreen} options={{ title: 'Troco de Aula', tabBarLabel: 'Semana' }} />
        <Tabs.Screen name="Novo gasto" component={NewExpenseScreen} />
        <Tabs.Screen name="Histórico" component={HistoryScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28, backgroundColor: '#163C34' },
  coin: { width: 112, height: 112 },
  title: { fontSize: 26, fontWeight: '700', color: '#FFF5D8', marginVertical: 12, textAlign: 'center' },
  body: { color: '#D6E4DF', fontSize: 16, lineHeight: 24, maxWidth: 320, textAlign: 'center' },
});

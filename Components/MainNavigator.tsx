import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegistroScreen";
import OperacionesScreen from "../Screens/OperacionesScreen";
import HistorialScreen from "../Screens/HistorialScreen";
import PerfilScreen from "../Screens/PerfilScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name="Registro" component={RegisterScreen} />
     <Stack.Screen name="Tab" component={MyTab} />
    </Stack.Navigator>
  );
}

function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Operaciones" component={OperacionesScreen} />
      <Tab.Screen name="Historial" component={HistorialScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function Navegador() {
  return (
   <NavigationContainer>
      <MyStack/>
      </NavigationContainer>
  );
}
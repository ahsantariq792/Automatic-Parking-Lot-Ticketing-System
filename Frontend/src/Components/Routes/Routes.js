import { Routes as AppRoutes, Route } from "react-router-dom";
import BillingReceiptScreen from "../Screens/BillingReceiptScreen/BillingReceiptScreen";
import ConfirmationScreen from "../Screens/ConfirmationScreen/ConfirmationScreen";
import StartOverScreen from "../Screens/StartOverScreen/StartOverScreen";
import WelcomeScreen from "../Screens/WelcomeScreen/WelcomeScreen";
import Dashboard from "../Screens/Dashboard/Dashboard";

const Routes = () => {

    return (
        <AppRoutes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/confirmVehicle" element={<ConfirmationScreen />} />
            <Route path="/billing" element={<BillingReceiptScreen />} />
            <Route path="/startOver" element={<StartOverScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </AppRoutes>
    )
}

export default Routes

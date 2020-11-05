<script>
import Home from '../pages/Home.vue'
import PageLogin from "@/pages/auth/PageLogin";
import NewService from "@/pages/NewService";
import newServicePivot from "@/pages/newServicePivot";
import NewConsultaMedica from "@/pages/NewConsultaMedica";
import newConsultaMedicaPivot from "@/pages/newConsultaMedicaPivot";
import HistorialServicios from "@/pages/HistorialServicios";
import HistorialCalendario from "@/pages/HistorialCalendario";
import Mascotas from "@/pages/clientes/Mascotas";
import MascotasPivot from "@/pages/MascotasPivot";
import ReporteGeneral from "@/pages/reportes/ReporteGeneral";
import Barrios from "@/pages/configuracion/Barrios";
import Desparasitantes from "@/pages/configuracion/Desparasitantes";
import Vacunas from "@/pages/configuracion/Vacunas";
import Usuarios from "@/pages/configuracion/Usuarios";


const routes = [
    {path: "/",component: Home},
    {path: '/home', component: Home , name:'home'},
    {path: '/service/new/safe', component: newServicePivot , name:'newServicePivot'},
    {path: '/service/new', component: NewService , name:'newService'},
    {path: '/medical/new/safe', component: newConsultaMedicaPivot , name:'newMedicalPivot'},
    {path: '/medical/new', component: NewConsultaMedica , name:'newMedical'},
    {path: "/service/older/:id", component: NewService, name: 'service'},
    {path: "/medical/older/:id", component: NewConsultaMedica, name: 'consulta'},
    {path: '/login', component: PageLogin, name: 'login'},
    {path: "/service/history", name: 'historyServices', component: HistorialServicios},
    {path: "/calendar/history", name: 'historyCalendar', component: HistorialCalendario},
    {path: "/customers/pets", name: 'listPets', component: Mascotas},
    {path: "/customers/pets/safe", name: 'listPetsPivot', component: MascotasPivot},
    {path: "/report/general", name: 'reportGeneral', component: ReporteGeneral},
    {path: "/settings/locations", name: 'settingsLocations', component: Barrios},
    {path: "/settings/deworming", name: 'settingsDeworming', component: Desparasitantes},
    {path: "/settings/vaccinates", name: 'settingsVaccinates', component: Vacunas},
    {path: "/settings/users", name: 'settingsUsers', component: Usuarios},

]

export default routes;
</script>

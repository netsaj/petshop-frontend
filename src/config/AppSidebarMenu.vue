<script>
const appSidebarMenu = [{
    text: 'Navegación',
    is_header: true
},
    {
        url: '/home',
        icon: 'fa fa-home',
        text: 'Inicio',
    },
    {
        text: 'Servicios',
        is_header: true
    },
    {
        url: '/service/new/safe',
        icon: 'fas fa-store',
        text: 'Nuevo servicio',
        pivot: {
            'newService': true,
        }

    },
    {
        url: '/medical/new/safe',
        icon: 'fas fa-stethoscope',
        text: 'Nueva consulta',
        pivot: {
            'newMedical': true,
        }

    },
    {
        url: '#',
        icon: 'fa fa-home',
        text: 'Servicio',
        showIf: {
            'service': true,
        }

    },
    {
        text: 'Clientes',
        is_header: true
    },
    {
        url: '/customers/pets/safe',
        icon: 'fas fa-paw',
        text: 'Listado mascotas',
        pivot: {
            'listPets': true,
        }
    },
    {
        text: 'Reportes',
        is_header: true
    },
    {
        url: '/service/history',
        icon: 'fas fa-history',
        text: 'Historial servicios'
    },
    {
        url: '/calendar/history',
        icon: 'fas fa-calendar-alt',
        text: 'Historial agenda'
    },
    {
        url: '/report/general',
        icon: 'fas fa-chart-line',
        text: 'Reporte general'
    },

];

export default appSidebarMenu;
</script>

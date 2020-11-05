module.exports.mascotaModel = () => {
    return {
        "id": "",
        "tercero_id": "",
        "nombre": "",
        "especie": "Perro",
        "raza": "",
        "peso": 0,
        "color": "",
        "sexo": "Macho",
        "edad": 0,
        "fecha_nacimiento": Date(),
        "rfid_card_id": "",
        "historia_clinica": ""
    };
};

module.exports.clienteModel = () => {
    return {
        "id": "",
        "nombre": "",
        "cedula": "",
        "telefono": "",
        "celular": "",
        "direccion": "",
        "barrio": "",
        "email": ""
    };
};

module.exports.PeluqueriaModel = () => {
    return {
        "observaciones": "",
        "total": 0,
        "abono": 0
    }
};

module.exports.VacunacionModel = () => {
    return {
        "grupo_vacuna_id": "",
        "vacuna_id": "",
        "revacunacion": new Date(),
        "total": 0,
        "abono": 0
    }
};

module.exports.DesparasitacionModel = () => {
    return {
        "grupo_desparasitante_id": 0,
        "desparasitante_id": 0,
        "redesparacitacion": new Date(),
        "total": 0,
        "abono": 0,
        "dosis": ""

    }
}

module.exports.HistoriaClinicaModel = () => {
    return {
        "documento_id" : "00000000-0000-0000-0000-000000000000",
        "created_at": new Date(),
        "timeline":[],
        "total": 0,
        "abono": 0,
        "terminado": false,
        "mascota_id" : '',
        "cliente_id" : '',
        "usuario_id": '',
        "contenido":{
            anamnesis: {
                dieta: "",
                enfermedad_previa: "",
                esterilizado: "si",
                num_partos: 0,
                cirugias_previas: "",
                esquema_vacunal: "",
                ultima_desparacitacion: "",
                tratamientos_recientes: "",
                motivo_consulta: "",
            },
            complementarios: {
                condicion_corporal: "1",
                temperatura: 0,
                tllc: "",
                fc: "",
                fr: "",
                pulso: "",
                porc_deshidratacion: "",
                mucosas: "",
                organos_sentidos: "",
                piel_pelaje: "",
                ganglios_linfaticos: "",
                sistema_digestivo: "",
                sistema_respiratorio: "",
                sistema_urinario: "",
                sistema_endocrino: "",
                sistema_nervioso: "",
                sistema_musculo_esqueletico: "",
                sistema_reproductivo: ""
            },
            diagnostico: {
                descripcion: ""
            },
            plan_terapeutico: {
                descripcion: ""
            },
            pronostico: {
                descripcion: ""
            },
        },
        "evolucion": {
            "items": [{
                "fecha": "",
                "hora": "",
                "observaciones": ""
            }]
        },
        "observaciones": "",
        "anexos": [],
    }
}

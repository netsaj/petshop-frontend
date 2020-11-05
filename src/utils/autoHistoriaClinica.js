const models = require("./models");
const calendar = require('./calendar')


module.exports.generar = (documentos) => {

    let historiaClinica = models.HistoriaClinicaModel()
    // exquema vacunal
    documentos.forEach(row => {
        if (row['vacunacion'].id !== '00000000-0000-0000-0000-000000000000') {
            historiaClinica.timeline.push({
                'employee':`${row['usuario'].nombres} ${row['usuario'].apellidos}`,
                'date': calendar.getDateOnly(row['vacunacion'].created_at),
                'title': 'Vacunación',
                'description': `${row['vacunacion']['vacuna'].nombre} (${row['vacunacion']['grupo_vacuna'].nombre})`
            })
            historiaClinica.contenido.anamnesis.esquema_vacunal+=`${row['vacunacion']['vacuna'].nombre} (${row['vacunacion']['grupo_vacuna'].nombre})`
        }
        if (row['desparasitacion'].id !== '00000000-0000-0000-0000-000000000000') {
            historiaClinica.timeline.unshift({
                'employee':'',
                'date': calendar.getDateOnly(row['desparasitacion'].created_at),
                'title': 'Desparasitación',
                'description': `${row['desparasitacion']['desparasitante'].nombre} (${row['desparasitacion']['grupo_desparasitante'].nombre})`
            })
            if (historiaClinica.contenido.anamnesis.ultima_desparacitacion === "") historiaClinica.contenido.anamnesis.ultima_desparacitacion = calendar.getDateOnly(row['desparasitacion'].created_at)
        }
    })

    return historiaClinica
}

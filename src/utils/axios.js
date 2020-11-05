const alerts = require("./alerts");

module.exports.axiosErrorHandler = (err) => {
    if (err.message === "Network Error") {
        alerts.show("Error de conexión", "Error de comunicación con el servidor.<br>Revise su conexión a la red y confirme la disponibilidad del equipo servidor.")
    } else if (err.message.indexOf("Request failed") > -1) {
        // eslint-disable-next-line no-unused-vars
        let errorTittle = "";
        let errorMessage = "";
        //console.log(err);
        if (err.response.status === 409) {
            //console.log(err.response.data);
            errorMessage = "Ya existe un registro con información que no puede ser repetida.<br><br><u>Detalle del error:</u><br>";
        } else if (err.response.status === 404) {
            errorMessage = "El recursos solicitado no pudo ser encontrado.<br><br><u>Detalle del error:</u><br>";
        } else if (err.response.status === 400) {
            errorMessage = "El formulario esta incompleto o es invalido.<br><br><u>Detalle del error:</u><br>"
        } else if (err.response.status === 401) {
            errorMessage = "El usuario no esta autorizado para realizar la acción.<br><br><u>Detalle del error:</u><br>"
        }
        //console.log(err);
        if (err.response.status !== 500 && err.response.data["error"]) {
            const error = err.response.data['error'] !== undefined ? err.response.data['error'] : err.response.data;
            //console.log(`error: ${error}`)
            if (typeof error === "string") {
                if (err === "http: no such file") {
                    errorMessage = "No se ha seleccionado ningún archivo para cargar al servidor."
                } else {
                    errorMessage += "<br>" + error.replace(/\n/g, "<br/>");
                }
            } else {
                for (const key in error) {
                    errorMessage += `${key} : ${error[key]}<br>`
                }
            }
        } else {
            errorMessage += err.toString()
        }
        alerts.show("Error en el formulario", errorMessage)
    } else {
        //console.log(err);
        alerts.show("Error inesperado", `Ha ocurrido un error inesperado.<br><br><u>Detalle del error:</u><br>${err.message}`)
    }
};

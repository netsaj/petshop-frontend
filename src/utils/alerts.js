const bootbox = require('bootbox');
const alertify = require('alertifyjs');
//const jQuery = require('jquery');

bootbox.setDefaults({
    locale: "es",

});

alertify.set('notifier', 'position', 'top-right');

module.exports.show = (title, message, callback = undefined) => {
    const body = `<h4>${title}</h4><hr/>${message}`;
    bootbox.alert(body, callback)
};

module.exports.confirm = (title, message,callback = undefined, confirm=" Continuar ", cancel=" Cancelar ") => {
    bootbox.confirm({
        message: `<h4>${title}</h4><hr/>${message}`,
        buttons: {
            confirm: {
                label: confirm,
                className: 'btn-primary'
            },
            cancel: {
                label: cancel,
                className: 'btn-secondary'
            }
        },
        callback: function (result) {
            if (result) {
                callback()
            }
        }
    });
}

module.exports.notification = (message) => {
    console.log("notification: ", message)
    alertify.success(message);
};

module.exports.notificationError = (message) => {
    alertify.error(message);
};
module.exports.notificationWarn = (message) => {
    alertify.warning(message);
};
module.exports.notificationInfo = (message) => {
    alertify.success(message);
};


exports.sucesss = function (req, res, mensaje, status){
    const statusCode = status || 200;
    const mensajeOK = mensaje || "";
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: mensajeOK
    });
}

exports.error = function (req, res, mensaje, status){
    const statusCode = status || 500;
    const mensajeError = mensaje || "Error interno";
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: mensajeError
    });
}
use actix_web::{post, web, HttpResponse, Responder};
use serde_json;

use crate::handle::calcular;
use crate::model::Operacion;

#[post("/calcular")]
pub async fn manejar_calcular(op: web::Json<Operacion>) -> impl Responder {
    match calcular(&op.into_inner()) {
        Ok(resultado) => HttpResponse::Ok().json(serde_json::json!({ "resultado": resultado })),
        Err(mensaje_error) => {
            HttpResponse::BadRequest().json(serde_json::json!({ "error": mensaje_error }))
        }
    }
}

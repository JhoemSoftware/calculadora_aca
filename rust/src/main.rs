use actix_cors::Cors;
use actix_web::{App, HttpServer};
use dotenvy::dotenv;
use std::env;

mod api;
mod handle;
mod model;

use api::manejar_calcular;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let port = env::var("PORT")
        .expect("Falta la variable de entorno PORT")
        .parse::<u16>()
        .expect("El puerto debe ser un número válido");

    println!(" ");
    println!("🚀 Servicio en ejecución en http://localhost:{}", port);
    println!(" ");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE]);

        App::new().wrap(cors).service(manejar_calcular)
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}

use serde::Deserialize;
// Estructura para deserializar el JSON de entrada
#[derive(Deserialize)]
pub struct Operacion {
    pub num1: f64,
    pub num2: f64,
    pub operador: String,
}
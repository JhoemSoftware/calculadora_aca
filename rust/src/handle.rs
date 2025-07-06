use crate::model::Operacion;

pub fn calcular(op: &Operacion) -> Result<f64, String> {
    match op.operador.as_str() {
        "+" => Ok(op.num1 + op.num2),
        "-" => Ok(op.num1 - op.num2),
        "*" => Ok(op.num1 * op.num2),
        "/" => {
            if op.num2 == 0.0 {
                Err("División por cero no es permitida".to_string())
            } else {
                Ok(op.num1 / op.num2)
            }
        }
        _ => Err("Operador no válido. Use +, -, *, /".to_string()),
    }
}

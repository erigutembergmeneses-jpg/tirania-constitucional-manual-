# IPI - Cálculo conforme Capítulo 9
PESOS <- c(D1 = 0.25, D2 = 0.20, D3 = 0.20, D4 = 0.20, D5 = 0.15)

calcular_ipi <- function(d1, d2, d3, d4, d5) {
  dimensoes <- c(D1 = d1, D2 = d2, D3 = d3, D4 = d4, D5 = d5)
  if (any(is.na(dimensoes))) {
    return(list(ipi = NA, status = "NAO_CALCULAVEL", dimensoes = dimensoes))
  }
  if (any(dimensoes < 0 | dimensoes > 10)) {
    stop("Todas as dimensões devem estar na escala 0 a 10.")
  }
  ipi <- round(sum(dimensoes * PESOS), 4)
  classif <- if (ipi < 4) "muito comprometida"
             else if (ipi < 6) "fragilizada"
             else if (ipi < 8) "intermediária"
             else "relativamente elevada"
  list(ipi = ipi, classificacao = classif, status = "CALCULADO", dimensoes = dimensoes)
}

# Exemplo
resultado <- calcular_ipi(8, 7, 6, 8, 5)
cat("IPI:", resultado$ipi, "|", resultado$classificacao, "\n")

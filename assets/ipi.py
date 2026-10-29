# ===================================================
# IPI - Indice de Preservacao Institucional
# Calculo conforme Apendice B (B.4.2) da obra
# "A Tirania Constitucional" - Erigutemberg Meneses
# Licenca: CC-BY-4.0
# ===================================================

PESOS = {"D1": 0.25, "D2": 0.20, "D3": 0.20, "D4": 0.20, "D5": 0.15}


def classificar_ipi(ipi):
    if ipi < 4:
        return "Preservacao institucional muito comprometida"
    if ipi < 6:
        return "Preservacao institucional fragilizada"
    if ipi < 8:
        return "Preservacao institucional intermediaria"
    return "Preservacao institucional relativamente elevada"


def calcular_ipi(d1, d2, d3, d4, d5):
    dimensoes = {"D1": d1, "D2": d2, "D3": d3, "D4": d4, "D5": d5}

    ausentes = [k for k, v in dimensoes.items() if v is None]
    if ausentes:
        return {
            "ipi": None,
            "classificacao": None,
            "status": "NAO_CALCULAVEL",
            "dimensoes": dimensoes,
            "dimensoes_ausentes": ausentes,
        }

    for nome, valor in dimensoes.items():
        if not isinstance(valor, (int, float)) or not 0 <= valor <= 10:
            raise ValueError(
                f"{nome} deve ser numerico e estar entre 0 e 10."
            )

    ipi = round(sum(dimensoes[k] * PESOS[k] for k in PESOS), 4)
    return {
        "ipi": ipi,
        "classificacao": classificar_ipi(ipi),
        "status": "CALCULADO",
        "dimensoes": dimensoes,
        "dimensoes_ausentes": [],
    }


if __name__ == "__main__":
    resultado = calcular_ipi(8, 7, 6, 8, 5)
    print(resultado)  # IPI: 6.95; faixa intermediaria

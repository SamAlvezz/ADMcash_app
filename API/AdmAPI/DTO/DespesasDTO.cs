using System;

namespace AdmAPI.DTO
{
    public class DespesaDTO
    {
        public int COD_DESP { get; set; }
        public string NOME_DESP { get; set; }
        public double VALOR_DESP { get; set; }
        public string DESCRICAO { get; set; }
        public DateTime DATA_VENCIMENTO { get; set; }

    }
}

using System;

namespace AdmAPI.DTO
{
    public class ReceitasDTO
    {
        public int COD_RCT { get; set; }
        public string NOME_RCT { get; set; }
        public double VALOR_RCT { get; set; }
        public string DESCRICAO { get; set; }
        public DateTime DATA_RECEBIMENTO { get; set; }

    }
}

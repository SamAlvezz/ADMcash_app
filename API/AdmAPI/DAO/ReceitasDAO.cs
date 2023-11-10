using AdmAPI.DTO;

namespace AdmAPI.DAO
{
    public class ReceitasDAO
    {
        public List<ReceitasDTO> ListarReceitas()
        {

            string hoje = DateTime.Now.ToString("d");
            string format = "d";

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM RECEITAS";

            var comando = new MySqlCommand(query, conexao);
            var dataReader = comando.ExecuteReader();

            var receitas = new List<ReceitasDTO>();

            while (dataReader.Read())
            {
                var receita = new ReceitasDTO();
                receita.COD_RCT = int.Parse(dataReader["COD_RCT"].ToString());
                receita.NOME_RCT = dataReader["NOME_RCT"].ToString();
                receita.VALOR_RCT = float.Parse(dataReader["VALOR_RCT"].ToString());
                receita.DESCRICAO = dataReader["DESCRICAO"].ToString();
                receita.DATA_RECEBIMENTO = DateOnly.ParseExact(hoje, format);

                receitas.Add(receita);
            }
            conexao.Close();

            return receitas;
        }

        public List<ReceitasDTO> BuscarReceitas(string filtro)
        {
            string hoje = DateTime.Now.ToString("d");
            string format = "d";

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM RECEITAS Where Nome Like '%" + filtro + "%'";

            var comando = new MySqlCommand(query, conexao);
            var dataReader = comando.ExecuteReader();

            var receitas = new List<ReceitasDTO>();

            while (dataReader.Read())
            {
                var receita = new ReceitasDTO();
                receita.COD_RCT = int.Parse(dataReader["COD_RCT"].ToString());
                receita.NOME_RCT = dataReader["NOME_RCT"].ToString();
                receita.VALOR_RCT = float.Parse(dataReader["VALOR_RCT"].ToString());
                receita.DESCRICAO = dataReader["DESCRICAO"].ToString();
                receita.DATA_RECEBIMENTO = DateOnly.ParseExact(hoje, format);

                receitas.Add(receita);
            }
            conexao.Close();

            return receitas;
        }

        public void CriarReceita(ReceitasDTO receita)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"INSERT INTO RECEITAS (NOME_RCT, VALOR_RCT, DESCRICAO, DATA_RECEBIMENTO) VALUES
            (@NOME_RCT, @VALOR_RCT, @DESCRICAO, @DATA_RECEBIMENTO);";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@NOME_RCT", receita.NOME_RCT);
            comando.Parameters.AddWithValue("@VALOR_RCT", receita.VALOR_RCT);
            comando.Parameters.AddWithValue("@DESCRICAO", receita.DESCRICAO);
            comando.Parameters.AddWithValue("@DATA_RECEBIMENTO", receita.DATA_RECEBIMENTO);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void AlterarReceita(ReceitasDTO receita)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"UPDATE RECEITAS SET NOME_RCT = @NOME_RCT, VALOR_RCT = @VALOR_RCT, DESCRICAO = @DESCRICAO, DATA_RECEBIMENTO = @DATA_RECEBIMENTO
            where COD_RCT = @COD_RCT";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@COD_RCT", despesa.COD_RCT);
            comando.Parameters.AddWithValue("@NOME_RCT", despesa.NOME_RCT);
            comando.Parameters.AddWithValue("@VALOR_RCT", despesa.VALOR_RCT);
            comando.Parameters.AddWithValue("@DESCRICAO", despesa.DESCRICAO);
            comando.Parameters.AddWithValue("@DATA_RECEBIMENTO", despesa.DATA_RECEBIMENTO);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void RemoverReceita(int COD_RCT)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"DELETE FROM RECEITAS WHERE COD_RCT = @COD_RCT;";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@COD_RCT", COD_RCT);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
    }
}

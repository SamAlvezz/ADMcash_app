using AdmAPI.DTO;
using MySql.Data.MySqlClient;

namespace AdmAPI.DAO
{
    public class MetasDAO
    {
        public List<MetasDTO> ListarMetas()
        {

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM METAS";

            var comando = new MySqlCommand(query, conexao);
            var dataReader = comando.ExecuteReader();

            var metas = new List<MetasDTO>();

            while (dataReader.Read())
            {
                var meta = new MetasDTO();
                meta.COD_MT = int.Parse(dataReader["COD_MT"].ToString());
                meta.NOME_MT = dataReader["NOME_MT"].ToString();
                meta.VALOR_MT = float.Parse(dataReader["VALOR_MT"].ToString());

                metas.Add(meta);
            }
            conexao.Close();

            return metas;
        }

        public List<MetasDTO> BuscarMetas(string filtro)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM METAS Where NOME_MT Like '%" + filtro + "%'";

            var comando = new MySqlCommand(query, conexao);
            var dataReader = comando.ExecuteReader();

            var metas = new List<MetasDTO>();

            while (dataReader.Read())
            {
                var meta = new MetasDTO();
                meta.COD_MT = int.Parse(dataReader["COD_MT"].ToString());
                meta.NOME_MT = dataReader["NOME_MT"].ToString();
                meta.VALOR_MT = float.Parse(dataReader["VALOR_MT"].ToString());
                
                metas.Add(meta);
            }
            conexao.Close();

            return metas;
        }

        public void CriarMeta(MetasDTO meta)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"INSERT INTO METAS (NOME_MT, VALOR_MT) VALUES
            (@NOME_MT, @VALOR_MT);";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@NOME_MT", meta.NOME_MT);
            comando.Parameters.AddWithValue("@VALOR_MT", meta.VALOR_MT);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void AlterarMeta(MetasDTO meta)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"UPDATE METAS SET NOME_MT = @NOME_MT, VALOR_MT = @VALOR_MT
            where COD_MT = @COD_MT";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@COD_MT", meta.COD_MT);
            comando.Parameters.AddWithValue("@NOME_MT", meta.NOME_MT);
            comando.Parameters.AddWithValue("@VALOR_MT", meta.VALOR_MT);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void RemoverMeta(int COD_MT)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"DELETE FROM METAS WHERE COD_MT = @COD_MT;";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@COD_MT", COD_MT);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
    }
}




using AdmAPI.DTO;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using static Org.BouncyCastle.Bcpg.Attr.ImageAttrib;

namespace AdmAPI.DAO
{
    public class DespesaDAO
    {

        public List<DespesaDTO> ListarDespesas()
        {
            
            string hoje = DateTime.Now.ToString("d");
            string format = "d";

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM DESPESAS";

            var comando = new MySqlCommand(query, conexao);
            var dataReader = comando.ExecuteReader();

            var despesas = new List<DespesaDTO>();

            while (dataReader.Read())
            {
                var despesa = new DespesaDTO();
                despesa.COD_DESP = int.Parse(dataReader["COD_DESP"].ToString());
                despesa.NOME_DESP = dataReader["NOME_DESP"].ToString();
                despesa.VALOR_DESP = float.Parse(dataReader["VALOR_DESP"].ToString());
                despesa.DESCRICAO = dataReader["DESCRICAO"].ToString();
                despesa.DATA_VENCIMENTO = DateTime.Parse(dataReader["DATA_VENCIMENTO"].ToString());

                despesas.Add(despesa);
            }
            conexao.Close();

            return despesas;
        }

        public List<DespesaDTO> BuscarDespesas(string filtro)
        {
            string hoje = DateTime.Now.ToString("d");
            string format = "d";

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM DESPESAS Where Nome Like '%" + filtro + "%'";

            var comando = new MySqlCommand(query, conexao);
            var dataReader = comando.ExecuteReader();

            var despesas = new List<DespesaDTO>();

            while (dataReader.Read())
            {
                var despesa = new DespesaDTO();
                despesa.COD_DESP = int.Parse(dataReader["COD_DESP"].ToString());
                despesa.NOME_DESP = dataReader["NOME_DESP"].ToString();
                despesa.VALOR_DESP = float.Parse(dataReader["VALOR_DESP"].ToString());
                despesa.DESCRICAO = dataReader["DESCRICAO"].ToString();
                despesa.DATA_VENCIMENTO = DateTime.Parse(dataReader["DATA_VENCIMENTO"].ToString());

                despesas.Add(despesa);
            }
            conexao.Close();

            return despesas;
        }

        public void CriarDespesa(DespesaDTO despesa)
        {
            var dateOnly = despesa.DATA_VENCIMENTO.Date;

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"INSERT INTO DESPESAS (NOME_DESP, VALOR_DESP, DESCRICAO, DATA_VENCIMENTO) VALUES
            (@NOME_DESP, @VALOR_DESP, @DESCRICAO, @DATA_VENCIMENTO);";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@NOME_DESP", despesa.NOME_DESP);
            comando.Parameters.AddWithValue("@VALOR_DESP", despesa.VALOR_DESP);
            comando.Parameters.AddWithValue("@DESCRICAO", despesa.DESCRICAO);
            comando.Parameters.AddWithValue("@DATA_VENCIMENTO", dateOnly);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void AlterarDespesa(DespesaDTO despesa)
        {
            var dateOnly = despesa.DATA_VENCIMENTO.Date;
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"UPDATE DESPESAS SET NOME_DESP = @NOME_DESP, VALOR_DESP = @VALOR_DESP, DESCRICAO = @DESCRICAO, DATA_VENCIMENTO = @DATA_VENCIMENTO
            where COD_DESP = @COD_DESP";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@COD_DESP", despesa.COD_DESP);
            comando.Parameters.AddWithValue("@NOME_DESP", despesa.NOME_DESP);
            comando.Parameters.AddWithValue("@VALOR_DESP", despesa.VALOR_DESP);
            comando.Parameters.AddWithValue("@DESCRICAO", despesa.DESCRICAO);
            comando.Parameters.AddWithValue("@DATA_VENCIMENTO", dateOnly);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
            public void RemoverDespesa(int COD_DESP)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"DELETE FROM DESPESAS WHERE COD_DESPESAS = @COD_DESPESAS;";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@COD_DESP", COD_DESP);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
    }
}

using AdmAPI.DTO;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace AdmAPI.DAO
{
    public class ReceitasDAO
    {
        public List<ReceitasDTO> ListarReceitas()
        {


            string hoje = DateTime.Now.ToString("d");
            

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM RECEITA";

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
                receita.DATA_RECEBIMENTO = DateTime.Parse(dataReader["DATA_RECEBIMENTO"].ToString());


                receitas.Add(receita);
            }
            conexao.Close();

            return receitas;
        }

        public List<ReceitasDTO> BuscarReceitas(string filtro)
        {
            
            CultureInfo provider = CultureInfo.InvariantCulture;


            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM RECEITA Where NOME_RCT Like '%" + filtro + "%'";

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
                receita.DATA_RECEBIMENTO = DateTime.Parse(dataReader["DATA_RECEBIMENTO"].ToString());


                receitas.Add(receita);
            }
            conexao.Close();

            return receitas;
        }

        public void CriarReceita(ReceitasDTO receita)
        {
            var dateOnly = receita.DATA_RECEBIMENTO.Date;
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"INSERT INTO RECEITA (NOME_RCT, VALOR_RCT, DESCRICAO, DATA_RECEBIMENTO) VALUES
            (@NOME_RCT, @VALOR_RCT, @DESCRICAO, @DATA_RECEBIMENTO);";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@NOME_RCT", receita.NOME_RCT);
            comando.Parameters.AddWithValue("@VALOR_RCT", receita.VALOR_RCT);
            comando.Parameters.AddWithValue("@DESCRICAO", receita.DESCRICAO);
            comando.Parameters.AddWithValue("@DATA_RECEBIMENTO", dateOnly);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void AlterarReceita(ReceitasDTO receita)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"UPDATE RECEITA SET NOME_RCT = @NOME_RCT, VALOR_RCT = @VALOR_RCT, DESCRICAO = @DESCRICAO, DATA_RECEBIMENTO = @DATA_RECEBIMENTO
                where COD_RCT = @COD_RCT";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@COD_RCT", receita.COD_RCT);
            comando.Parameters.AddWithValue("@NOME_RCT", receita.NOME_RCT);
            comando.Parameters.AddWithValue("@VALOR_RCT", receita.VALOR_RCT);
            comando.Parameters.AddWithValue("@DESCRICAO", receita.DESCRICAO);
            comando.Parameters.AddWithValue("@DATA_RECEBIMENTO", receita.DATA_RECEBIMENTO);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void RemoverReceita(int COD_RCT)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"DELETE FROM RECEITA WHERE COD_RCT = @COD_RCT;";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@COD_RCT", COD_RCT);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
    }
}

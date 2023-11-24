using AdmAPI.DTO;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace AdmAPI.DAO
{
    public class UsuarioDAO
    {
        public List<UsuarioDTO> ListarUsuarios()
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM USUARIO";

            var comando = new MySqlCommand(query, conexao);
            var dataReader = comando.ExecuteReader();

            var usuarios = new List<UsuarioDTO>();

            while (dataReader.Read())
            {
                var usuario = new UsuarioDTO();
                usuario.ID_USU = int.Parse(dataReader["ID_USU"].ToString());
                usuario.NOME = dataReader["NOME"].ToString();
                usuario.EMAIL = dataReader["EMAIL"].ToString();
                usuario.SENHA = dataReader["SENHA"].ToString();

                usuarios.Add(usuario);
            }
            conexao.Close();

            return usuarios;
        }

        public List<UsuarioDTO> BuscarUsuarios(string filtro)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = "SELECT*FROM DESPESAS Where Nome Like '%" + filtro + "%'";

            var comando = new MySqlCommand(query, conexao);
            var dataReader = comando.ExecuteReader();

            var usuarios = new List<UsuarioDTO>();

            while (dataReader.Read())
            {
                var usuario = new UsuarioDTO();
                usuario.ID_USU = int.Parse(dataReader["ID_USU"].ToString());
                usuario.NOME = dataReader["NOME"].ToString();
                usuario.EMAIL = dataReader["EMAIL"].ToString();
                usuario.SENHA = dataReader["SENHA"].ToString();


                usuarios.Add(usuario);
            }
            conexao.Close();

            return usuarios;
        }

        public void CriarUsuarios(UsuarioDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"INSERT INTO USUARIO (NOME, EMAIL, SENHA) VALUES
            (@NOME, @EMAIL, @SENHA);";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@NOME", usuario.NOME);
            comando.Parameters.AddWithValue("@EMAIL", usuario.EMAIL);
            comando.Parameters.AddWithValue("@SENHA", usuario.SENHA);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void AlterarUsuarios(UsuarioDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"UPDATE USUARIO SET NOME = @NOME, EMAIL = @EMAIL, SENHA = @SENHA
            where ID_USU = @ID_USU";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@NOME", usuario.NOME);
            comando.Parameters.AddWithValue("@EMAIL", usuario.EMAIL);
            comando.Parameters.AddWithValue("@SENHA", usuario.SENHA);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
        public void RemoverUsuarios(int ID_USU)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            var query = @"DELETE FROM USUARIO WHERE ID_USU = @ID_USU;";

            var comando = new MySqlCommand(query, conexao);
            comando.Parameters.AddWithValue("@ID_USU", ID_USU);

            comando.ExecuteNonQuery();
            conexao.Close();
        }
    }
}

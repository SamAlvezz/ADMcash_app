using MySql.Data.MySqlClient;

namespace AdmAPI.DAO
{
    public class ConnectionFactory
    {
     public static MySqlConnection Build()
        {
            return new MySqlConnection("Server=localhost;Database=Bcadm_login;Uid=root;Pwd=root;");
        }
    }
}

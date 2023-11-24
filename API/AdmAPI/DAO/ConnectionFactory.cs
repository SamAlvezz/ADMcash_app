using MySql.Data.MySqlClient;

namespace AdmAPI.DAO
{
    public class ConnectionFactory
    {
     public static MySqlConnection Build()
        {
            return new MySqlConnection("Server=admcash.mysql.database.azure.com;Database=Bcadm_login;Uid=Tiago_Chaves;Pwd=Laurindo1;");
        }
    }
}

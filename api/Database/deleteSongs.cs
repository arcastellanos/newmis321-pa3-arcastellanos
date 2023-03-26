using MySql.Data;
using MySql.Data.MySqlClient;
using api.Interface;

namespace api.Database
{
    public class deleteSongs : IDeleteSongs{
        public static void DropSongTable(){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"DROP TABLE IF EXISTS songs";

            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();
        }
        void IDeleteSongs.DeleteSongs(int id){
            throw new System.NotImplementedException();
        }
    }
}

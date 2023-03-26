using MySql.Data.MySqlClient;
using api.Interface;
namespace api.Models
{
    public class ReadSongData : IGetAllSongs
    {
        public List<Songs> GetAllSongs()
        {
            ConnectionString myConnectionString = new ConnectionString();
            string cs = myConnectionString.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM qgzctppht71vdyea.songs";
            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Songs> allSongs = new List<Songs>();
            while(rdr.Read()){
                allSongs.Add(new Songs(){ID = rdr.GetInt32(0), Title = rdr.GetString(1), Artist = rdr.GetString(2), DateAdded = rdr.GetString(3), Favorited = rdr.GetBoolean(4) , Deleted = rdr.GetBoolean(5)});
            }
            return allSongs;
            //throw new NotImplementedException();
        }

        public Songs GetSongs(int ID)
        {
            ConnectionString myConnectionString = new ConnectionString();
            string cs = myConnectionString.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM songs WHERE id = @id";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@id",ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new Songs(){ID = rdr.GetInt32(0), Title = rdr.GetString(1), Artist = rdr.GetString(2), DateAdded = rdr.GetString(3), Favorited = rdr.GetBoolean(4) , Deleted = rdr.GetBoolean(5)};



            //throw new NotImplementedException();
        }

        
    }
}


using api.Interface;
using api.Models;
using MySql.Data.MySqlClient;

namespace api.Database
{
 
    public class SaveSongs : ISaveSongs
    {
        public void CreateSong(Songs mySong){
            
            // ConnectionString myConnection = new ConnectionString();
            // string cs = myConnection.cs;

            // using var con = new MySqlConnection(cs);
            // con.Open();
            ConnectionString myConnectionString = new ConnectionString();
            string cs = myConnectionString.cs;
            using var con = new MySqlConnection(cs);
            con.Open();




            string stm = @"INSERT INTO songs (title, artist, dateAdded, favorited, deleted)
            VALUES (@title, @artist, @dateAdded, @favorited, @deleted);";
            MySqlCommand cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@title", mySong.Title);
            cmd.Parameters.AddWithValue("@artist", mySong.Artist);
            cmd.Parameters.AddWithValue("@dateAdded", mySong.DateAdded);
            cmd.Parameters.AddWithValue("@deleted", mySong.Deleted);
            cmd.Parameters.AddWithValue("@favorited", mySong.Favorited);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close();
        }

        public void SaveSong(int id, Songs mySong){
            
            ConnectionString myConnectionString = new ConnectionString();
            string cs = myConnectionString.cs;
            using var con = new MySqlConnection(cs);
            con.Open();


            string stm = @"UPDATE songs set title = @title, artist = @artist, dateAdded = @dateAdded, favorited = @favorited, deleted = @deleted WHERE id = @id";
            MySqlCommand cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@id", mySong.ID);
            cmd.Parameters.AddWithValue("@title", mySong.Title);
            cmd.Parameters.AddWithValue("@artist", mySong.Artist);
            cmd.Parameters.AddWithValue("@dateAdded", mySong.DateAdded);
            cmd.Parameters.AddWithValue("@deleted", mySong.Deleted);
            cmd.Parameters.AddWithValue("@favorited", mySong.Favorited);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close();



        }





        void ISaveSongs.SaveSong(Songs mySong)
        {
            throw new NotImplementedException();
        }
    }
}
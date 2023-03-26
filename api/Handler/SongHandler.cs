using api.Models;
namespace api.Handler
{
    public class SongHandler
    {
        public static List<Songs> AllSongs = new List<Songs>();

        public SongHandler(){

        }

        public List<Songs> GetAllSongs(){
            return AllSongs;
        }

        public void AddSong(Songs newSong){
            AllSongs.Add(newSong);
        }

        public void EditSong(int id, Songs editSong){
            int index = AllSongs.FindIndex(c => c.ID == id);
            AllSongs.RemoveAt(index);

            AllSongs.Add(editSong);
        }
            public void DeleteSong(int id){
                int index = AllSongs.FindIndex(c => c.ID == id);
                AllSongs.RemoveAt(index);
        }
    }

}
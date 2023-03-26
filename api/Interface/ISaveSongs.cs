using api.Models;
namespace api.Interface
{
    public interface ISaveSongs
    {
        public void CreateSong(Songs mySong);
        public void SaveSong(Songs mySong); 
    }
}
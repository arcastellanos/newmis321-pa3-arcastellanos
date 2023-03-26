using api.Models;
namespace api.Interface
{
    public interface IGetSong
    {
         Songs GetSongs(int ID);
    }
}
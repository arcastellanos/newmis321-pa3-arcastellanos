using api.Models;
namespace api.Interface

{
    public interface IGetAllSongs
    {
         public List<Songs> GetAllSongs();
    }
}
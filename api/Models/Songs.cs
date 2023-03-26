using api.Interface;
using api.Database;
namespace api.Models

{
    public class Songs
    {
        public int ID {get; set;}
        public string Title {get; set;}
        public string Artist {get; set;}
        public string DateAdded {get; set;}
        public bool Favorited {get; set;}
        public bool Deleted {get;set;}

        // public ISaveSongs Save {get;set;}

        // public Songs(){
        //     //Save = new SaveSongs();

            

        // }

        // public override string ToString(){
        //     return $"{ID} {Title} {Artist} {DateAdded} {Favorited} {Deleted}";
        // }
    }
}
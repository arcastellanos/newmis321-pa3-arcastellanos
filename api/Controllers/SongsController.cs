using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using api.Models;
using api.Handler;
using api.Database;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        // GET: api/Songs
        [HttpGet]
        public List<Songs> Get(){

            ReadSongData rdr = new ReadSongData();
            return rdr.GetAllSongs();

        }

        // // GET: api/Songs/5
        // [HttpGet("{id}", Name = "Get")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // POST: api/Songs
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Songs value)
        {
            SaveSongs writer = new SaveSongs();

            writer.CreateSong(value);
        }

        // PUT: api/Songs/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Songs value)
        {
           SaveSongs editor = new SaveSongs();
           editor.SaveSong(id, value);
        }

        // DELETE: api/Songs/5
        // [EnableCors("OpenPolicy")]
        // [HttpDelete("{id}")]
        // public void Delete(int id)
        // {
        //     SongHandler mySongHandler = new SongHandler();
        //     mySongHandler.DeleteSong(id);
        // }
    }
}

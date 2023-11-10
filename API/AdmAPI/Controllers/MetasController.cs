using AdmAPI.DAO;
using AdmAPI.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AdmAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetasController : Controller
    {
        [HttpGet]
        [Route("listarmetas")]
        public IActionResult Index()
        {

            var dao = new MetasDAO();
            var METAS = dao.ListarMetas();
            return Ok(METAS);
        }
        [HttpGet]
        [Route("buscarmetas")]
        public IActionResult BuscarMeta(string filtro)
        {
            var dao = new MetasDAO();
            var METAS = dao.BuscarMetas(filtro);
            return Ok(METAS);
        }
        [HttpPost]
        [Route("criarmeta")]
        public IActionResult CriarMeta([FromBody] MetasDTO meta)
        {
            var dao = new MetasDAO();
            dao.CriarMeta(meta);
            return Ok();
        }
        [Route("removermeta")]
        [HttpDelete]
        public IActionResult RemoverMeta(int COD_MT)
        {
            var dao = new MetasDAO();
            dao.RemoverMeta(COD_MT);
            return Ok();
        }
        [HttpPut]
        [Route("alterarmeta")]
        public IActionResult AlterarMeta([FromBody] MetasDTO meta)
        {
            var dao = new MetasDAO();
            dao.AlterarMeta(meta);
            return Ok();
        }

    }
}

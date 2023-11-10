using AdmAPI.DAO;
using AdmAPI.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AdmAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DespesasController : Controller
    {
        [HttpGet]
        [Route("listardespesa")]
        public IActionResult ListarDespesas()
        {
            var dao = new DespesaDAO();
            var DESPESAS = dao.ListarDespesas();
            return Ok(DESPESAS);
        }
        [HttpGet]
        [Route("buscardespesa")]
        public IActionResult BuscarDespesas(string filtro)
        {
            var dao = new DespesaDAO();
            var DESPESAS = dao.BuscarDespesas(filtro);
            return Ok(DESPESAS);
        }

        [HttpPost]
        [Route("criardespesa")]
        public IActionResult CriarDespesa([FromBody] DespesaDTO despesa)
        {
            var dao = new DespesaDAO();
            dao.CriarDespesa(despesa);
            return Ok();
        }

        [Route("removerdespesa")]
        [HttpDelete]
        public IActionResult RemoverDespesa(int COD_DESP)
        {
            var dao = new DespesaDAO();
            dao.RemoverDespesa(COD_DESP);
            return Ok();
        }

        [HttpPut]
        [Route("alterardespesa")]
        public IActionResult AlterarDespesa([FromBody] DespesaDTO despesa)
        {
            var dao = new DespesaDAO();
            dao.AlterarDespesa(despesa);
            return Ok();
        }
    }
}


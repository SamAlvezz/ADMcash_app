using AdmAPI.DAO;
using AdmAPI.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

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

        [Route("removerdespesa/{COD_DESP}")]
        [HttpDelete]
        public IActionResult RemoverDespesa([FromRoute] int COD_DESP)
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

        [HttpGet]
        [Route("relatorio")]
        public IActionResult GerarRelatorio()
        {

            var despesaDAO = new DespesaDAO();
            var despesas = despesaDAO.ListarDespesas();

            var receitasDAO = new ReceitasDAO();
            var receitas = receitasDAO.ListarReceitas();

            var totalDespesas = despesas.Sum(despesa => despesa.VALOR_DESP);
            var totalReceitas = receitas.Sum(receita => receita.VALOR_RCT);
            var resultado = totalReceitas - totalDespesas;
            var percentualDepesas = totalDespesas * 100 / resultado;
            var percentualReceitas = totalReceitas * 100 / resultado;

            return Ok(new { totalDespesas , totalReceitas, resultado, percentualDepesas, percentualReceitas, despesas });
        }
    }
}


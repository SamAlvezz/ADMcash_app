using AdmAPI.DAO;
using AdmAPI.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace AdmAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceitasController : Controller
    {
        [HttpGet]
        [Route("listarreceita")]
        public IActionResult ListarReceitas()
        {
            var dao = new ReceitasDAO();
            var RECEITAS = dao.ListarReceitas();
            return Ok(RECEITAS);
        }
        [HttpGet]
        [Route("buscarreceitas")]
        public IActionResult BuscarReceitas(string filtro)
        {
            var dao = new ReceitasDAO();
            var RECEITAS = dao.BuscarReceitas(filtro);
            return Ok(RECEITAS);
        }

        [HttpPost]
        [Route("criarreceita")]
        public IActionResult CriarReceita([FromBody] ReceitasDTO receita)
        {
            var dao = new ReceitasDAO();
            dao.CriarReceita(receita);
            return Ok();
        }

        [Route("removerreceita/{COD_RCT}")]
        [HttpDelete]
        public IActionResult RemoverReceita(int COD_RCT)
        {
            var dao = new ReceitasDAO();
            dao.RemoverReceita(COD_RCT);
            return Ok();
        }

        [HttpPut]
        [Route("alterarreceita")]
        public IActionResult AlterarReceita([FromBody] ReceitasDTO receita)
        {
            var dao = new ReceitasDAO();
            dao.AlterarReceita(receita);
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

            return Ok(new { totalDespesas, totalReceitas, resultado, percentualDepesas, percentualReceitas });
        }
    }
}

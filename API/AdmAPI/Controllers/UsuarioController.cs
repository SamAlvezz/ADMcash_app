using AdmAPI.DAO;
using AdmAPI.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AdmAPI.Controllers
{
    public class UsuarioController : Controller
    {
        [HttpGet]
        [Route("listarusuario")]
        public IActionResult ListarUsuario()
        {
            var dao = new UsuarioDAO();
            var USUARIOS = dao.ListarUsuarios();
            return Ok(USUARIOS);
        }
        [HttpGet]
        [Route("buscarusuario")]
        public IActionResult BuscarUsuarios(string filtro)
        {
            var dao = new UsuarioDAO();
            var USUARIOS = dao.BuscarUsuarios(filtro);
            return Ok(USUARIOS);
        }

        [HttpPost]
        [Route("criarusuario")]
        public IActionResult CriarUsuarios([FromBody] UsuarioDTO usuario)
        {
            var dao = new UsuarioDAO();
            dao.CriarUsuarios(usuario);
            return Ok();
        }

        [Route("removerusuario")]
        [HttpDelete]
        public IActionResult RemoverUsuario(int ID_USU)
        {
            var dao = new UsuarioDAO();
            dao.RemoverUsuarios(ID_USU);
            return Ok();
        }

        [HttpPut]
        [Route("alterarusuario")]
        public IActionResult AlterarUsuario([FromBody] UsuarioDTO usuario)
        {
            var dao = new UsuarioDAO();
            dao.AlterarUsuarios(usuario);
            return Ok();
        }
    }
}

